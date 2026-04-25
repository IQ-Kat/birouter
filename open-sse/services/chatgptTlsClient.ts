/**
 * Browser-TLS-impersonating HTTP client for chatgpt.com.
 *
 * Why this exists: ChatGPT's Cloudflare config pins `cf_clearance` to the
 * client's TLS fingerprint (JA3/JA4) + HTTP/2 SETTINGS frame ordering.
 * Node's Undici fetch presents an obvious "not a browser" handshake and
 * gets challenged with `cf-mitigated: challenge` — even with all the right
 * cookies. This module wraps `tls-client-node` (native shared library
 * built from bogdanfinn/tls-client) to send a Firefox handshake instead.
 *
 * The first call lazily starts the managed sidecar; subsequent calls reuse
 * a singleton TLSClient. Process exit hooks stop the sidecar cleanly.
 */

import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdtemp, open, unlink, rmdir, stat } from "node:fs/promises";
import { randomUUID } from "node:crypto";

let clientPromise: Promise<unknown> | null = null;
let exitHookInstalled = false;

const CHATGPT_PROFILE = "firefox_148"; // matches the Firefox 150 UA we send
const DEFAULT_TIMEOUT_MS = 60_000;

function installExitHook(): void {
  if (exitHookInstalled) return;
  exitHookInstalled = true;
  const stop = async () => {
    if (!clientPromise) return;
    try {
      const c = (await clientPromise) as { stop?: () => Promise<unknown> };
      await c.stop?.();
    } catch {
      // ignore
    }
  };
  process.once("beforeExit", stop);
  process.once("SIGINT", () => {
    void stop();
  });
  process.once("SIGTERM", () => {
    void stop();
  });
}

async function getClient(): Promise<{
  request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
}> {
  if (!clientPromise) {
    clientPromise = (async () => {
      try {
        const mod = await import("tls-client-node");
        const TLSClient = (mod as { TLSClient: new (opts?: Record<string, unknown>) => unknown })
          .TLSClient;
        // Native mode loads the shared library directly via koffi, avoiding the
        // managed sidecar's localhost HTTP calls that OmniRoute's global fetch
        // proxy patch interferes with.
        const client = new TLSClient({ runtimeMode: "native" }) as {
          start: () => Promise<void>;
          request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
        };
        await client.start();
         
        console.log("[CGPT-TLS] Native runtime ready (Firefox 148 fingerprint).");
        installExitHook();
        return client;
      } catch (err) {
        clientPromise = null;
        const msg = err instanceof Error ? err.message : String(err);
         
        console.log(`[CGPT-TLS] FAILED to start: ${msg}`);
        throw new TlsClientUnavailableError(
          `TLS impersonation client failed to start: ${msg}. ` +
            `Verify tls-client-node is installed and its native binary downloaded.`
        );
      }
    })();
  }
  return clientPromise as Promise<{
    request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike>;
  }>;
}

interface TlsResponseLike {
  status: number;
  headers: Record<string, string[]>;
  body: string; // for non-streaming requests, the full response body
  cookies?: Record<string, string>;
  text: () => Promise<string>;
  bytes: () => Promise<Uint8Array>;
  json: <T = unknown>() => Promise<T>;
}

export class TlsClientUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TlsClientUnavailableError";
  }
}

export interface TlsFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
  timeoutMs?: number;
  signal?: AbortSignal | null;
  /**
   * If true, the response body is streamed to a temp file and exposed as a
   * ReadableStream<Uint8Array>. Use for SSE responses (the conversation
   * endpoint). Otherwise, the full body is read into memory.
   */
  stream?: boolean;
  /** EOF marker the upstream sends to signal end of stream (default: "[DONE]"). */
  streamEofSymbol?: string;
}

export interface TlsFetchResult {
  status: number;
  headers: Headers;
  /** Full response body as text — only populated for non-streaming requests. */
  text: string | null;
  /** Streaming body — only populated when options.stream === true. */
  body: ReadableStream<Uint8Array> | null;
}

// Test-only injection point. Tests call __setTlsFetchOverrideForTesting()
// to replace the real TLS client with a mock; production never touches this.
let testOverride: ((url: string, options: TlsFetchOptions) => Promise<TlsFetchResult>) | null =
  null;

export function __setTlsFetchOverrideForTesting(fn: typeof testOverride): void {
  testOverride = fn;
}

/**
 * Make a single HTTP request to chatgpt.com with a Firefox-like TLS fingerprint.
 *
 * Throws TlsClientUnavailableError if the native binary failed to load.
 */
export async function tlsFetchChatGpt(
  url: string,
  options: TlsFetchOptions = {}
): Promise<TlsFetchResult> {
  if (testOverride) return testOverride(url, options);
  const client = await getClient();

  const requestOptions: Record<string, unknown> = {
    method: options.method || "GET",
    headers: options.headers || {},
    body: options.body,
    tlsClientIdentifier: CHATGPT_PROFILE,
    timeoutMilliseconds: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    followRedirects: true,
    withRandomTLSExtensionOrder: true,
  };

  if (options.stream) {
    return await tlsFetchStreaming(client, url, requestOptions, options.streamEofSymbol);
  }

  const tlsResponse = await client.request(url, requestOptions);
  return {
    status: tlsResponse.status,
    headers: toHeaders(tlsResponse.headers),
    text: tlsResponse.body,
    body: null,
  };
}

function toHeaders(raw: Record<string, string[]>): Headers {
  const h = new Headers();
  for (const [k, vs] of Object.entries(raw || {})) {
    for (const v of vs) h.append(k, v);
  }
  return h;
}

// ─── Streaming via temp file ────────────────────────────────────────────────
// tls-client-node's streaming primitive writes the response body chunk-by-chunk
// to a file path, terminating when the upstream sends `streamOutputEOFSymbol`.
// We tail the file from a worker and surface the bytes as a ReadableStream.

async function tlsFetchStreaming(
  client: { request: (url: string, opts: Record<string, unknown>) => Promise<TlsResponseLike> },
  url: string,
  requestOptions: Record<string, unknown>,
  eofSymbol = "[DONE]"
): Promise<TlsFetchResult> {
  const dir = await mkdtemp(join(tmpdir(), "cgpt-stream-"));
  const path = join(dir, `${randomUUID()}.sse`);

  const streamOpts = {
    ...requestOptions,
    streamOutputPath: path,
    streamOutputBlockSize: 1024,
    streamOutputEOFSymbol: eofSymbol,
  };

  // Kick off the request in the background — we don't await it because
  // tls-client returns headers eagerly but the body keeps writing to the file.
  const requestPromise = client.request(url, streamOpts);

  // Wait for the file to exist, then build a tailing reader.
  const ready = await waitForFile(path, 5_000);
  if (!ready) {
    // If the file never appeared, the request likely errored out — surface that.
    const r = await requestPromise.catch(
      (e) => ({ status: 502, headers: {}, body: String(e) }) as TlsResponseLike
    );
    return {
      status: r.status,
      headers: toHeaders(r.headers),
      text: r.body,
      body: null,
    };
  }

  // Tail the file. requestPromise resolves with status/headers once Cloudflare
  // accepts and the body finishes streaming.
  const stream = tailFile(
    path,
    eofSymbol,
    requestPromise.then((r) => r)
  );
  // We don't have headers/status until the request resolves, so resolve
  // asynchronously but expose a sentinel for callers that only care about body.
  const meta = await Promise.race([
    requestPromise,
    new Promise<never>((_, rej) => setTimeout(() => rej(new Error("stream meta timeout")), 30_000)),
  ]).catch((e) => ({ status: 502, headers: {}, body: String(e) }) as TlsResponseLike);

  // Cleanup of the temp file/dir happens inside tailFile when EOF is reached.
  void dir; // keep ref for type-checker

  return {
    status: meta.status,
    headers: toHeaders(meta.headers),
    text: null,
    body: stream,
  };
}

async function waitForFile(path: string, timeoutMs: number): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await stat(path);
      return true;
    } catch {
      await sleep(25);
    }
  }
  return false;
}

function tailFile(
  path: string,
  eofSymbol: string,
  done: Promise<TlsResponseLike>
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const fd = await open(path, "r");
      const buf = Buffer.alloc(64 * 1024);
      let offset = 0;
      let finished = false;

      // Mark when the request completes so we know to drain the rest.
      done.finally(() => {
        finished = true;
      });

      try {
        while (true) {
          const { bytesRead } = await fd.read(buf, 0, buf.length, offset);
          if (bytesRead > 0) {
            const chunk = buf.subarray(0, bytesRead);
            offset += bytesRead;
            const text = chunk.toString("utf8");
            if (text.includes(eofSymbol)) {
              const cutAt = text.indexOf(eofSymbol) + eofSymbol.length;
              controller.enqueue(new Uint8Array(chunk.subarray(0, cutAt)));
              break;
            }
            controller.enqueue(new Uint8Array(chunk));
          } else if (finished) {
            // No more data and request completed — drain done.
            break;
          } else {
            await sleep(25);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        await fd.close().catch(() => {});
        await unlink(path).catch(() => {});
        const dir = path.substring(0, path.lastIndexOf("/"));
        await rmdir(dir).catch(() => {});
        controller.close();
      }
    },
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
