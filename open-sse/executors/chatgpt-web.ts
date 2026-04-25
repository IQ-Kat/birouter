/**
 * ChatGptWebExecutor — ChatGPT Web Session Provider
 *
 * Routes requests through chatgpt.com's internal SSE API using a Plus/Pro
 * subscription session cookie, translating between OpenAI chat completions
 * format and ChatGPT's internal protocol.
 *
 * Auth pipeline (per request):
 *   1. exchangeSession()          GET  /api/auth/session       cookie → JWT accessToken (cached ~5min)
 *   2. prepareChatRequirements()  POST /backend-api/sentinel/chat-requirements
 *                                                              → { proofofwork.seed, difficulty, persona }
 *   3. solveProofOfWork()         SHA3-512 hash loop           → "gAAAAAB…" sentinel proof token
 *   4. fetch /backend-api/conversation                         with Bearer + sentinel-proof-token + browser UA
 *
 * Response is the standard ChatGPT SSE format (cumulative `parts[0]` strings, not deltas).
 */

import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { createHash, randomUUID, randomBytes } from "node:crypto";
import {
  tlsFetchChatGpt,
  TlsClientUnavailableError,
  type TlsFetchOptions,
  type TlsFetchResult,
} from "../services/chatgptTlsClient.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

const CHATGPT_BASE = "https://chatgpt.com";
const SESSION_URL = `${CHATGPT_BASE}/api/auth/session`;
const SENTINEL_PREPARE_URL = `${CHATGPT_BASE}/backend-api/sentinel/chat-requirements/prepare`;
const SENTINEL_CR_URL = `${CHATGPT_BASE}/backend-api/sentinel/chat-requirements`;
const CONV_URL = `${CHATGPT_BASE}/backend-api/f/conversation`;

const CHATGPT_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:150.0) Gecko/20100101 Firefox/150.0";

// Captured from a real chatgpt.com browser session (April 2026).
const OAI_CLIENT_VERSION = "prod-81e0c5cdf6140e8c5db714d613337f4aeab94029";
const OAI_CLIENT_BUILD_NUMBER = "6128297";

// Stable per-process device ID (matches the browser's persistent oai-did cookie behaviour).
const DEVICE_ID = randomUUID();

// OmniRoute model ID → ChatGPT internal slug. ChatGPT's web routes use
// dash-separated IDs (e.g. "gpt-5-3" not "gpt-5.3-instant").
const MODEL_MAP: Record<string, string> = {
  "gpt-5.3-instant": "gpt-5-3",
  "gpt-5-3": "gpt-5-3",
};

// ─── Browser-like default headers ──────────────────────────────────────────

function browserHeaders(): Record<string, string> {
  return {
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    Origin: CHATGPT_BASE,
    Pragma: "no-cache",
    Referer: `${CHATGPT_BASE}/`,
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": CHATGPT_USER_AGENT,
  };
}

/** Headers ChatGPT's web client sends on backend-api requests. */
function oaiHeaders(sessionId: string): Record<string, string> {
  return {
    "OAI-Language": "en-US",
    "OAI-Device-Id": DEVICE_ID,
    "OAI-Client-Version": OAI_CLIENT_VERSION,
    "OAI-Client-Build-Number": OAI_CLIENT_BUILD_NUMBER,
    "OAI-Session-Id": sessionId,
  };
}

// ─── Session token cache ────────────────────────────────────────────────────

interface TokenEntry {
  accessToken: string;
  accountId: string | null;
  expiresAt: number;
  refreshedCookie?: string;
}

const TOKEN_TTL_MS = 5 * 60 * 1000; // 5min — accessTokens are short-lived
const tokenCache = new Map<string, TokenEntry>();

function cookieKey(cookie: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < cookie.length; i++) {
    hash ^= cookie.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

function tokenLookup(cookie: string): TokenEntry | null {
  const entry = tokenCache.get(cookieKey(cookie));
  if (!entry) return null;
  if (Date.now() >= entry.expiresAt) {
    tokenCache.delete(cookieKey(cookie));
    return null;
  }
  return entry;
}

function tokenStore(cookie: string, entry: TokenEntry): void {
  tokenCache.set(cookieKey(cookie), entry);
  // Trim to 200 entries (matches Perplexity executor's session cache)
  if (tokenCache.size > 200) {
    const firstKey = tokenCache.keys().next().value;
    if (firstKey) tokenCache.delete(firstKey);
  }
}

// ─── Conversation continuity cache ──────────────────────────────────────────
// Keyed by FNV hash of message history → { conversationId, lastMessageId }.
// Same pattern as perplexity-web.ts:50-99.

interface ConvEntry {
  conversationId: string;
  lastMessageId: string;
  ts: number;
}

const CONV_TTL_MS = 60 * 60 * 1000;
const CONV_MAX = 200;
const convCache = new Map<string, ConvEntry>();

function historyKey(history: Array<{ role: string; content: string }>): string {
  const parts = history.map((h) => `${h.role}:${h.content}`).join("\n");
  let hash = 0x811c9dc5;
  for (let i = 0; i < parts.length; i++) {
    hash ^= parts.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

function convLookup(
  history: Array<{ role: string; content: string }>
): { conversationId: string; lastMessageId: string } | null {
  if (history.length === 0) return null;
  const key = historyKey(history);
  const entry = convCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CONV_TTL_MS) {
    convCache.delete(key);
    return null;
  }
  return { conversationId: entry.conversationId, lastMessageId: entry.lastMessageId };
}

function convStore(
  history: Array<{ role: string; content: string }>,
  currentMsg: string,
  responseText: string,
  conversationId: string,
  lastMessageId: string
): void {
  if (!conversationId || !lastMessageId) return;
  const full = [
    ...history,
    { role: "user", content: currentMsg },
    { role: "assistant", content: responseText },
  ];
  const key = historyKey(full);
  convCache.set(key, { conversationId, lastMessageId, ts: Date.now() });
  if (convCache.size > CONV_MAX) {
    let oldestKey: string | null = null;
    let oldestTs = Infinity;
    for (const [k, v] of convCache) {
      if (v.ts < oldestTs) {
        oldestTs = v.ts;
        oldestKey = k;
      }
    }
    if (oldestKey) convCache.delete(oldestKey);
  }
}

// ─── /api/auth/session — exchange cookie for JWT ────────────────────────────

interface SessionResponse {
  accessToken?: string;
  expires?: string;
  user?: { id?: string };
}

function extractRefreshedCookie(setCookieHeader: string | null): string | null {
  if (!setCookieHeader) return null;
  // Set-Cookie can rotate either an unchunked token or any of the chunks.
  // Capture all relevant chunks and re-emit them as a single Cookie header value.
  const matches = Array.from(
    setCookieHeader.matchAll(/(__Secure-next-auth\.session-token(?:\.\d+)?)=([^;,\s]+)/g)
  );
  if (matches.length === 0) return null;
  return matches.map((m) => `${m[1]}=${m[2]}`).join("; ");
}

/**
 * Build the Cookie header value from whatever the user pasted.
 *
 * Accepts:
 *   - A bare value:                       "eyJhbGc..."  →  prepended with __Secure-next-auth.session-token=
 *   - An unchunked cookie line:           "__Secure-next-auth.session-token=eyJ..."
 *   - A chunked cookie line:              "__Secure-next-auth.session-token.0=...; __Secure-next-auth.session-token.1=..."
 *   - The full DevTools cookie header:    "Cookie: __Secure-next-auth.session-token.0=...; cf_clearance=..."
 *
 * If the user pastes a chunked token, we pass the cookies through verbatim —
 * NextAuth's server reassembles them on its side.
 */
function buildSessionCookieHeader(rawInput: string): string {
  let s = rawInput.trim();
  if (/^cookie\s*:\s*/i.test(s)) s = s.replace(/^cookie\s*:\s*/i, "");
  if (/__Secure-next-auth\.session-token(?:\.\d+)?\s*=/.test(s)) {
    return s;
  }
  return `__Secure-next-auth.session-token=${s}`;
}

async function exchangeSession(
  cookie: string,
  signal: AbortSignal | null | undefined
): Promise<TokenEntry> {
  const cached = tokenLookup(cookie);
  if (cached) return cached;

  const headers: Record<string, string> = {
    ...browserHeaders(),
    Accept: "application/json",
    Cookie: buildSessionCookieHeader(cookie),
  };

  const response = await tlsFetchChatGpt(SESSION_URL, {
    method: "GET",
    headers,
    timeoutMs: 30_000,
    signal,
  });

  if (response.status === 401 || response.status === 403) {
    throw new SessionAuthError("Invalid session cookie");
  }
  if (response.status >= 400) {
    throw new Error(`Session exchange failed (HTTP ${response.status})`);
  }

  const refreshed = extractRefreshedCookie(response.headers.get("set-cookie"));
  let data: SessionResponse = {};
  try {
    data = JSON.parse(response.text || "{}");
  } catch {
    /* empty body or non-JSON */
  }
  if (!data.accessToken) {
    throw new SessionAuthError("Session response missing accessToken — cookie likely expired");
  }

  const expiresAt = data.expires ? new Date(data.expires).getTime() : Date.now() + TOKEN_TTL_MS;
  const entry: TokenEntry = {
    accessToken: data.accessToken,
    accountId: data.user?.id ?? null,
    expiresAt: Math.min(expiresAt, Date.now() + TOKEN_TTL_MS),
    refreshedCookie: refreshed ?? undefined,
  };
  tokenStore(cookie, entry);
  return entry;
}

class SessionAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SessionAuthError";
  }
}

// ─── /backend-api/sentinel/chat-requirements ────────────────────────────────

interface ChatRequirements {
  /** Returned by /chat-requirements (the "real" chat requirements token). */
  token?: string;
  /** Returned by /chat-requirements/prepare (sent as a prerequisite header). */
  prepare_token?: string;
  persona?: string;
  proofofwork?: {
    required?: boolean;
    seed?: string;
    difficulty?: string;
  };
  turnstile?: {
    required?: boolean;
    dx?: string;
  };
}

// ─── Session warmup ────────────────────────────────────────────────────────
// Mimics chatgpt.com's page-load fetch sequence so Sentinel sees a "warm"
// browsing session. Cached per (cookie, access-token) pair for 60s to avoid
// hammering the warmup endpoints on every chat completion.

const warmupCache = new Map<string, number>();
const WARMUP_TTL_MS = 60_000;

async function runSessionWarmup(
  accessToken: string,
  accountId: string | null,
  sessionId: string,
  cookie: string,
  signal: AbortSignal | null | undefined,
  log: { debug?: (tag: string, msg: string) => void } | null | undefined
): Promise<void> {
  const key = cookieKey(cookie) + ":" + accessToken.slice(-8);
  const now = Date.now();
  const last = warmupCache.get(key);
  if (last && now - last < WARMUP_TTL_MS) return;
  warmupCache.set(key, now);

  const headers: Record<string, string> = {
    ...browserHeaders(),
    ...oaiHeaders(sessionId),
    Accept: "*/*",
    Authorization: `Bearer ${accessToken}`,
    Cookie: buildSessionCookieHeader(cookie),
    Priority: "u=1, i",
  };
  if (accountId) headers["chatgpt-account-id"] = accountId;

  const urls = [
    `${CHATGPT_BASE}/backend-api/me`,
    `${CHATGPT_BASE}/backend-api/conversations?offset=0&limit=28&order=updated`,
    `${CHATGPT_BASE}/backend-api/models?history_and_training_disabled=false`,
  ];

  for (const url of urls) {
    try {
      const r = await tlsFetchChatGpt(url, {
        method: "GET",
        headers,
        timeoutMs: 15_000,
        signal,
      });
      log?.debug?.("CGPT-WEB", `warmup ${url.split("/backend-api/")[1]} → ${r.status}`);
    } catch (err) {
      log?.debug?.(
        "CGPT-WEB",
        `warmup ${url} failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
}

async function prepareChatRequirements(
  accessToken: string,
  accountId: string | null,
  sessionId: string,
  cookie: string,
  dplInfo: { dpl: string; scriptSrc: string },
  signal: AbortSignal | null | undefined
): Promise<ChatRequirements> {
  const config = buildPrekeyConfig(CHATGPT_USER_AGENT, dplInfo.dpl, dplInfo.scriptSrc);
  const prekey = buildPrepareToken(config);

  const headers: Record<string, string> = {
    ...browserHeaders(),
    ...oaiHeaders(sessionId),
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    Cookie: buildSessionCookieHeader(cookie),
    Priority: "u=1, i",
  };
  if (accountId) headers["chatgpt-account-id"] = accountId;

  // Stage 1: POST /chat-requirements/prepare → { prepare_token, ... }
  const prepResp = await tlsFetchChatGpt(SENTINEL_PREPARE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ p: prekey }),
    timeoutMs: 30_000,
    signal,
  });
  if (prepResp.status === 401 || prepResp.status === 403) {
    throw new SentinelBlockedError(`Sentinel /prepare blocked (HTTP ${prepResp.status})`);
  }
  if (prepResp.status >= 400) {
    throw new Error(`Sentinel /prepare failed (HTTP ${prepResp.status})`);
  }
  let prepData: ChatRequirements = {};
  try {
    prepData = JSON.parse(prepResp.text || "{}") as ChatRequirements;
  } catch {
    /* keep empty */
  }
  // Stage 2: POST /chat-requirements with the prepare_token in the body. This
  // is the call that actually returns the chat-requirements-token used on the
  // conversation request.
  if (!prepData.prepare_token) {
    return prepData; // pass through whatever we got — caller handles missing fields
  }

  const crBody: Record<string, unknown> = { p: prekey, prepare_token: prepData.prepare_token };
  const crResp = await tlsFetchChatGpt(SENTINEL_CR_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(crBody),
    timeoutMs: 30_000,
    signal,
  });
  if (crResp.status === 401 || crResp.status === 403) {
    throw new SentinelBlockedError(`Sentinel /chat-requirements blocked (HTTP ${crResp.status})`);
  }
  if (crResp.status >= 400) {
    // Fall back to whatever /prepare returned — some accounts may not need stage 2.
    return prepData;
  }
  try {
    const crData = JSON.parse(crResp.text || "{}") as ChatRequirements;
    // Merge: prepare_token from stage 1, everything else from stage 2.
    return { ...crData, prepare_token: prepData.prepare_token };
  } catch {
    return prepData;
  }
}

class SentinelBlockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SentinelBlockedError";
  }
}

// ─── Proof-of-work solver ──────────────────────────────────────────────────
// Mimics the openai-sentinel / chat2api algorithm. The browser sends a base64-encoded
// JSON config string; the server combines it with a seed and expects a SHA3-512 hash
// whose hex-prefix is ≤ the difficulty target.
//
// Reference: github.com/leetanshaj/openai-sentinel, github.com/lanqian528/chat2api
// Returns "gAAAAAB" + base64 of the winning config (server-recognised prefix).

// ─── DPL / script-src cache (warmup) ────────────────────────────────────────
// Sentinel's prekey check inspects whether config[5]/config[6] reference a real
// chatgpt.com deployment (DPL hash + a script URL from the HTML). We GET / once
// per hour to scrape these — same trick chat2api uses.

interface DplInfo {
  dpl: string;
  scriptSrc: string;
  expiresAt: number;
}
let dplCache: DplInfo | null = null;
const DPL_TTL_MS = 60 * 60 * 1000;

async function fetchDpl(
  cookie: string,
  signal: AbortSignal | null | undefined
): Promise<{ dpl: string; scriptSrc: string }> {
  if (dplCache && Date.now() < dplCache.expiresAt) {
    return { dpl: dplCache.dpl, scriptSrc: dplCache.scriptSrc };
  }
  const headers: Record<string, string> = {
    ...browserHeaders(),
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    Cookie: buildSessionCookieHeader(cookie),
  };
  const response = await tlsFetchChatGpt(`${CHATGPT_BASE}/`, {
    method: "GET",
    headers,
    timeoutMs: 20_000,
    signal,
  });
  const html = response.text || "";
  const dplMatch = html.match(/data-build="([^"]+)"/);
  const dpl = dplMatch ? `dpl=${dplMatch[1]}` : `dpl=${OAI_CLIENT_VERSION.replace(/^prod-/, "")}`;
  const scriptMatch = html.match(/<script[^>]+src="(https?:\/\/[^"]*\.js[^"]*)"/);
  const scriptSrc =
    scriptMatch?.[1] ?? `${CHATGPT_BASE}/_next/static/chunks/webpack-${randomHex(16)}.js`;
  dplCache = { dpl, scriptSrc, expiresAt: Date.now() + DPL_TTL_MS };
  return { dpl, scriptSrc };
}

function randomHex(n: number): string {
  return randomBytes(Math.ceil(n / 2))
    .toString("hex")
    .slice(0, n);
}

// ─── Browser fingerprint key lists (used in prekey config[10..12]) ─────────
// Chosen to look like real navigator/document/window inspection. The unicode
// MINUS SIGN (U+2212) in the navigator strings matches what `Object.toString()`
// produces in real browsers — Sentinel checks for it.

const NAVIGATOR_KEYS = [
  "webdriver−false",
  "geolocation",
  "languages",
  "language",
  "platform",
  "userAgent",
  "vendor",
  "hardwareConcurrency",
  "deviceMemory",
  "permissions",
  "plugins",
  "mediaDevices",
];

const DOCUMENT_KEYS = [
  "_reactListeningkfj3eavmks",
  "_reactListeningo743lnnpvdg",
  "location",
  "scrollingElement",
  "documentElement",
];

const WINDOW_KEYS = [
  "webpackChunk_N_E",
  "__NEXT_DATA__",
  "chrome",
  "history",
  "screen",
  "navigation",
  "scrollX",
  "scrollY",
];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildPrekeyConfig(userAgent: string, dpl: string, scriptSrc: string): unknown[] {
  const screenSizes = [3000, 4000, 3120, 4160] as const;
  const cores = [8, 16, 24, 32] as const;
  const dateStr = new Date().toString();
  const perfNow = performance.now();
  const epochOffset = Date.now() - perfNow;

  return [
    pick(screenSizes),
    dateStr,
    4294705152,
    0, // mutated by solver
    userAgent,
    scriptSrc,
    dpl,
    "en-US",
    "en-US,en",
    0, // mutated by solver
    pick(NAVIGATOR_KEYS),
    pick(DOCUMENT_KEYS),
    pick(WINDOW_KEYS),
    perfNow,
    randomUUID(),
    "",
    pick(cores),
    epochOffset,
  ];
}

/**
 * Build the `p` (prekey) value sent in the chat-requirements POST body.
 *
 * Format: "gAAAAAC" + base64(JSON(config)), with a brief PoW solver loop
 * (difficulty "0fffff") mutating config[3] to find a hash whose hex prefix
 * is ≤ the difficulty. Mirrors chat2api / openai-sentinel.
 */
function buildPrepareToken(config: unknown[]): string {
  const target = "0fffff";
  const cfg = [...config];
  for (let i = 0; i < 100_000; i++) {
    cfg[3] = i;
    const json = JSON.stringify(cfg);
    const b64 = Buffer.from(json).toString("base64");
    const hash = createHash("sha3-512").update(b64).digest("hex");
    if (hash.slice(0, target.length) <= target) {
      return `gAAAAAC${b64}`;
    }
  }
  // Fallback — submit unsolved; some clients do this and it still works.
  const b64 = Buffer.from(JSON.stringify(cfg)).toString("base64");
  return `gAAAAAC${b64}`;
}

function solveProofOfWork(seed: string, difficulty: string, config: unknown[]): string {
  const target = (difficulty || "").toLowerCase();
  const cfg = [...config];
  const maxIter = 500_000;

  for (let i = 0; i < maxIter; i++) {
    cfg[3] = i;
    const json = JSON.stringify(cfg);
    const b64 = Buffer.from(json).toString("base64");
    const hash = createHash("sha3-512")
      .update(seed + b64)
      .digest("hex");
    if (target && hash.slice(0, target.length) <= target) {
      return `gAAAAAB${b64}`;
    }
  }

  // Fallback: submit unsolved with the gAAAAAB prefix; some clients do this
  // and the request still goes through on legacy/low-friction prompts.
  const b64 = Buffer.from(JSON.stringify(cfg)).toString("base64");
  return `gAAAAAB${b64}`;
}

// ─── OpenAI → ChatGPT message translation ───────────────────────────────────

interface ParsedMessages {
  systemMsg: string;
  history: Array<{ role: string; content: string }>;
  currentMsg: string;
}

function parseOpenAIMessages(messages: Array<Record<string, unknown>>): ParsedMessages {
  let systemMsg = "";
  const history: Array<{ role: string; content: string }> = [];

  for (const msg of messages) {
    let role = String(msg.role || "user");
    if (role === "developer") role = "system";

    let content = "";
    if (typeof msg.content === "string") {
      content = msg.content;
    } else if (Array.isArray(msg.content)) {
      content = (msg.content as Array<Record<string, unknown>>)
        .filter((c) => c.type === "text")
        .map((c) => String(c.text || ""))
        .join(" ");
    }
    if (!content.trim()) continue;

    if (role === "system") {
      systemMsg += (systemMsg ? "\n" : "") + content;
    } else if (role === "user" || role === "assistant") {
      history.push({ role, content });
    }
  }

  let currentMsg = "";
  if (history.length > 0 && history[history.length - 1].role === "user") {
    currentMsg = history.pop()!.content;
  }

  return { systemMsg, history, currentMsg };
}

interface ChatGptMessage {
  id: string;
  author: { role: string };
  content: { content_type: "text"; parts: string[] };
}

function buildConversationBody(
  parsed: ParsedMessages,
  modelSlug: string,
  conversationId: string | null,
  parentMessageId: string
): Record<string, unknown> {
  const messages: ChatGptMessage[] = [];

  if (parsed.systemMsg.trim() && !conversationId) {
    messages.push({
      id: randomUUID(),
      author: { role: "system" },
      content: { content_type: "text", parts: [parsed.systemMsg.trim()] },
    });
  }

  // Replay history only on a brand-new conversation; ChatGPT remembers prior turns
  // server-side once a conversation_id exists.
  if (!conversationId) {
    for (const h of parsed.history) {
      messages.push({
        id: randomUUID(),
        author: { role: h.role },
        content: { content_type: "text", parts: [h.content] },
      });
    }
  }

  messages.push({
    id: randomUUID(),
    author: { role: "user" },
    content: { content_type: "text", parts: [parsed.currentMsg || ""] },
  });

  return {
    action: "next",
    messages,
    model: modelSlug,
    conversation_id: conversationId,
    parent_message_id: parentMessageId,
    timezone_offset_min: -new Date().getTimezoneOffset(),
    history_and_training_disabled: true,
    suggestions: [],
    websocket_request_id: randomUUID(),
  };
}

// ─── ChatGPT SSE parsing ────────────────────────────────────────────────────

interface ChatGptStreamEvent {
  message?: {
    id?: string;
    author?: { role?: string };
    content?: { content_type?: string; parts?: unknown[] };
    status?: string;
    metadata?: Record<string, unknown>;
  };
  conversation_id?: string;
  error?: string | { message?: string; code?: string };
  type?: string;
  v?: unknown;
}

async function* readChatGptSseEvents(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): AsyncGenerator<ChatGptStreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let dataLines: string[] = [];

  function flush(): ChatGptStreamEvent | null | "done" {
    if (dataLines.length === 0) return null;
    const payload = dataLines.join("\n");
    dataLines = [];
    const trimmed = payload.trim();
    if (!trimmed || trimmed === "[DONE]") return "done";
    try {
      return JSON.parse(trimmed) as ChatGptStreamEvent;
    } catch {
      return null;
    }
  }

  try {
    while (true) {
      if (signal?.aborted) return;
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      while (true) {
        const idx = buffer.indexOf("\n");
        if (idx < 0) break;
        const rawLine = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;

        if (line === "") {
          const parsed = flush();
          if (parsed === "done") return;
          if (parsed) yield parsed;
          continue;
        }
        if (line.startsWith("data:")) {
          dataLines.push(line.slice(5).trimStart());
        }
      }
    }

    buffer += decoder.decode();
    if (buffer.trim().startsWith("data:")) {
      dataLines.push(buffer.trim().slice(5).trimStart());
    }
    const tail = flush();
    if (tail && tail !== "done") yield tail;
  } finally {
    reader.releaseLock();
  }
}

// ─── Content extraction ─────────────────────────────────────────────────────
// ChatGPT SSE chunks contain CUMULATIVE content (full text so far in `parts[0]`),
// not deltas. Diff against `seenLen` to emit incremental tokens — same pattern
// perplexity-web.ts uses for markdown blocks (lines 386-397).

interface ContentChunk {
  delta?: string;
  answer?: string;
  conversationId?: string;
  messageId?: string;
  error?: string;
  done?: boolean;
}

async function* extractContent(
  eventStream: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): AsyncGenerator<ContentChunk> {
  let fullAnswer = "";
  let seenLen = 0;
  let conversationId: string | null = null;
  let messageId: string | null = null;
  // ChatGPT may echo prior messages in the stream for context before sending
  // the new assistant turn. Track which message id we're currently consuming
  // so we reset the accumulator when a new turn starts, and so "finished_*"
  // on an old echoed message doesn't end the stream prematurely.

  for await (const event of readChatGptSseEvents(eventStream, signal)) {
    if (event.error) {
      const msg =
        typeof event.error === "string"
          ? event.error
          : event.error.message || "ChatGPT stream error";
      yield { error: msg, done: true };
      return;
    }

    if (event.conversation_id) conversationId = event.conversation_id;

    const m = event.message;
    if (!m) continue;

    const role = m.author?.role ?? "";
    if (role !== "assistant") continue;

    const id = m.id ?? null;
    if (id && id !== messageId) {
      // A new assistant message has started — reset accumulator. The previous
      // message was either an echo of prior context or an aside; we only emit
      // content for the latest message.
      messageId = id;
      fullAnswer = "";
      seenLen = 0;
    }

    const parts = m.content?.parts ?? [];
    if (parts.length === 0) continue;
    const cumulative = parts.map((p) => (typeof p === "string" ? p : "")).join("");

    if (cumulative.length > seenLen) {
      const delta = cumulative.slice(seenLen);
      fullAnswer = cumulative;
      seenLen = cumulative.length;
      yield {
        delta,
        answer: fullAnswer,
        conversationId: conversationId ?? undefined,
        messageId: messageId ?? undefined,
      };
    }
    // Don't break on finished_successfully here — the server may still send
    // the new turn after echoing prior messages. Let the stream end naturally
    // (when the upstream closes or sends [DONE]).
  }

  yield {
    delta: "",
    answer: fullAnswer,
    conversationId: conversationId ?? undefined,
    messageId: messageId ?? undefined,
    done: true,
  };
}

// ─── OpenAI SSE format ──────────────────────────────────────────────────────

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function buildStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  history: Array<{ role: string; content: string }>,
  currentMsg: string,
  signal?: AbortSignal | null
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [
                { index: 0, delta: { role: "assistant" }, finish_reason: null, logprobs: null },
              ],
            })
          )
        );

        let fullAnswer = "";
        let respConversationId: string | null = null;
        let respMessageId: string | null = null;

        for await (const chunk of extractContent(eventStream, signal)) {
          if (chunk.conversationId) respConversationId = chunk.conversationId;
          if (chunk.messageId) respMessageId = chunk.messageId;

          if (chunk.error) {
            controller.enqueue(
              encoder.encode(
                sseChunk({
                  id: cid,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  system_fingerprint: null,
                  choices: [
                    {
                      index: 0,
                      delta: { content: `[Error: ${chunk.error}]` },
                      finish_reason: null,
                      logprobs: null,
                    },
                  ],
                })
              )
            );
            break;
          }

          if (chunk.done) {
            fullAnswer = chunk.answer || fullAnswer;
            break;
          }

          if (chunk.delta) {
            const cleaned = cleanChatGptText(chunk.delta);
            if (cleaned) {
              controller.enqueue(
                encoder.encode(
                  sseChunk({
                    id: cid,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    system_fingerprint: null,
                    choices: [
                      {
                        index: 0,
                        delta: { content: cleaned },
                        finish_reason: null,
                        logprobs: null,
                      },
                    ],
                  })
                )
              );
            }
          }
          if (chunk.answer) fullAnswer = chunk.answer;
        }

        controller.enqueue(
          encoder.encode(
            sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [{ index: 0, delta: {}, finish_reason: "stop", logprobs: null }],
            })
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));

        if (respConversationId && respMessageId) {
          convStore(history, currentMsg, fullAnswer, respConversationId, respMessageId);
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [
                {
                  index: 0,
                  delta: {
                    content: `[Stream error: ${err instanceof Error ? err.message : String(err)}]`,
                  },
                  finish_reason: "stop",
                  logprobs: null,
                },
              ],
            })
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } finally {
        controller.close();
      }
    },
  });
}

async function buildNonStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  history: Array<{ role: string; content: string }>,
  currentMsg: string,
  signal?: AbortSignal | null
): Promise<Response> {
  let fullAnswer = "";
  let respConversationId: string | null = null;
  let respMessageId: string | null = null;

  for await (const chunk of extractContent(eventStream, signal)) {
    if (chunk.conversationId) respConversationId = chunk.conversationId;
    if (chunk.messageId) respMessageId = chunk.messageId;
    if (chunk.error) {
      return new Response(
        JSON.stringify({
          error: { message: chunk.error, type: "upstream_error", code: "CHATGPT_ERROR" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    if (chunk.done) {
      fullAnswer = chunk.answer || fullAnswer;
      break;
    }
    if (chunk.answer) fullAnswer = chunk.answer;
  }

  if (respConversationId && respMessageId) {
    convStore(history, currentMsg, fullAnswer, respConversationId, respMessageId);
  }

  fullAnswer = cleanChatGptText(fullAnswer);
  const promptTokens = Math.ceil(currentMsg.length / 4);
  const completionTokens = Math.ceil(fullAnswer.length / 4);

  return new Response(
    JSON.stringify({
      id: cid,
      object: "chat.completion",
      created,
      model,
      system_fingerprint: null,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: fullAnswer },
          finish_reason: "stop",
          logprobs: null,
        },
      ],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// ─── Error response helpers ─────────────────────────────────────────────────

function errorResponse(status: number, message: string, code?: string): Response {
  return new Response(
    JSON.stringify({ error: { message, type: "upstream_error", ...(code ? { code } : {}) } }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class ChatGptWebExecutor extends BaseExecutor {
  constructor() {
    super("chatgpt-web", { id: "chatgpt-web", baseUrl: CONV_URL });
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    onCredentialsRefreshed,
  }: ExecuteInput) {
    const messages = (body as Record<string, unknown> | null)?.messages as
      | Array<Record<string, unknown>>
      | undefined;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        response: errorResponse(400, "Missing or empty messages array"),
        url: CONV_URL,
        headers: {},
        transformedBody: body,
      };
    }

    if (!credentials.apiKey) {
      return {
        response: errorResponse(
          401,
          "ChatGPT auth failed — paste your __Secure-next-auth.session-token cookie value."
        ),
        url: CONV_URL,
        headers: {},
        transformedBody: body,
      };
    }

    // Pass the user's pasted cookie blob through to exchangeSession; the helper
    // accepts bare values, unchunked cookies, chunked (.0/.1) cookies, and full
    // "Cookie: ..." DevTools lines.
    const cookie = credentials.apiKey;

    // 1. Token exchange
    let tokenEntry: TokenEntry;
    try {
      tokenEntry = await exchangeSession(cookie, signal);
    } catch (err) {
      if (err instanceof SessionAuthError) {
        log?.warn?.("CGPT-WEB", err.message);
        return {
          response: errorResponse(
            401,
            "ChatGPT auth failed — re-paste your __Secure-next-auth.session-token cookie from chatgpt.com.",
            "HTTP_401"
          ),
          url: SESSION_URL,
          headers: {},
          transformedBody: body,
        };
      }
      log?.error?.(
        "CGPT-WEB",
        `Session exchange failed: ${err instanceof Error ? err.message : String(err)}`
      );
      return {
        response: errorResponse(
          502,
          `ChatGPT session exchange failed: ${err instanceof Error ? err.message : String(err)}`
        ),
        url: SESSION_URL,
        headers: {},
        transformedBody: body,
      };
    }

    // Surface any rotated cookie back to the caller so the DB credential is refreshed.
    if (tokenEntry.refreshedCookie && tokenEntry.refreshedCookie !== cookie) {
      const updated: ProviderCredentials = { ...credentials, apiKey: tokenEntry.refreshedCookie };
      try {
        await onCredentialsRefreshed?.(updated);
      } catch (err) {
        log?.warn?.(
          "CGPT-WEB",
          `Failed to persist refreshed cookie: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }

    // 2a. Warmup — GET / to scrape DPL + script src so the prekey looks legit.
    let dplInfo: { dpl: string; scriptSrc: string };
    try {
      dplInfo = await fetchDpl(cookie, signal);
    } catch (err) {
      log?.warn?.(
        "CGPT-WEB",
        `DPL warmup failed (continuing with fallback): ${err instanceof Error ? err.message : String(err)}`
      );
      dplInfo = {
        dpl: `dpl=${OAI_CLIENT_VERSION.replace(/^prod-/, "")}`,
        scriptSrc: `${CHATGPT_BASE}/_next/static/chunks/webpack-${randomHex(16)}.js`,
      };
    }

    // 2a'. Browser-like session warmup. Sentinel scores the session by whether
    // the client recently hit /me, /conversations, /models — same as a real
    // browser does on page load. Failures here are non-fatal; the worst case
    // is Sentinel still escalates to Turnstile.
    const sessionId = randomUUID();
    await runSessionWarmup(
      tokenEntry.accessToken,
      tokenEntry.accountId,
      sessionId,
      cookie,
      signal,
      log
    );

    // 2b. Sentinel chat-requirements
    let reqs: ChatRequirements;
    try {
      reqs = await prepareChatRequirements(
        tokenEntry.accessToken,
        tokenEntry.accountId,
        sessionId,
        cookie,
        dplInfo,
        signal
      );
    } catch (err) {
      if (err instanceof SentinelBlockedError) {
        log?.warn?.("CGPT-WEB", err.message);
        return {
          response: errorResponse(
            403,
            "ChatGPT blocked the request (Sentinel/Turnstile required). Try again later or open chatgpt.com in a browser to refresh state.",
            "SENTINEL_BLOCKED"
          ),
          url: SENTINEL_PREPARE_URL,
          headers: {},
          transformedBody: body,
        };
      }
      log?.error?.(
        "CGPT-WEB",
        `Sentinel failed: ${err instanceof Error ? err.message : String(err)}`
      );
      return {
        response: errorResponse(
          502,
          `ChatGPT sentinel failed: ${err instanceof Error ? err.message : String(err)}`
        ),
        url: SENTINEL_PREPARE_URL,
        headers: {},
        transformedBody: body,
      };
    }

    log?.debug?.(
      "CGPT-WEB",
      `sentinel: token=${reqs.token ? "y" : "n"} pow=${reqs.proofofwork?.required ? "y" : "n"} turnstile=${reqs.turnstile?.required ? "y" : "n"}`
    );

    // Optional: if a turnstile token was supplied via providerSpecificData,
    // pass it through. Otherwise, send the request anyway — sometimes Sentinel
    // reports turnstile.required even when the conversation endpoint accepts
    // requests without it.
    const turnstileToken =
      typeof credentials.providerSpecificData?.turnstileToken === "string"
        ? credentials.providerSpecificData.turnstileToken
        : null;

    // 3. Solve PoW (if required) — reuses the same browser-fingerprint config
    // shape as the prekey, just with the server-provided seed + difficulty.
    let proofToken: string | null = null;
    if (reqs.proofofwork?.required && reqs.proofofwork.seed && reqs.proofofwork.difficulty) {
      const powConfig = buildPrekeyConfig(CHATGPT_USER_AGENT, dplInfo.dpl, dplInfo.scriptSrc);
      proofToken = solveProofOfWork(reqs.proofofwork.seed, reqs.proofofwork.difficulty, powConfig);
    }

    // 4. Build conversation request
    const parsed = parseOpenAIMessages(messages);
    if (!parsed.currentMsg.trim() && parsed.history.length === 0) {
      return {
        response: errorResponse(400, "Empty user message"),
        url: CONV_URL,
        headers: {},
        transformedBody: body,
      };
    }

    // Conversation continuity is intentionally disabled here. The conversation
    // body sets `history_and_training_disabled: true` (Temporary Chat mode),
    // and chatgpt.com expires those conversation_ids quickly — re-using them
    // returns 404. Open WebUI and most OpenAI-API clients send the full
    // history each turn anyway, so we just always start a fresh conversation.
    // (The convCache is kept around in case we re-enable persistent chats
    // later, but lookups are skipped here.)
    const conversationId: string | null = null;
    const parentMessageId = randomUUID();

    const modelSlug = MODEL_MAP[model] ?? model;
    const cgptBody = buildConversationBody(parsed, modelSlug, conversationId, parentMessageId);

    const headers: Record<string, string> = {
      ...browserHeaders(),
      ...oaiHeaders(sessionId),
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `Bearer ${tokenEntry.accessToken}`,
      Cookie: buildSessionCookieHeader(cookie),
    };
    if (tokenEntry.accountId) headers["chatgpt-account-id"] = tokenEntry.accountId;
    if (reqs.token) headers["openai-sentinel-chat-requirements-token"] = reqs.token;
    if (reqs.prepare_token)
      headers["openai-sentinel-chat-requirements-prepare-token"] = reqs.prepare_token;
    if (proofToken) headers["openai-sentinel-proof-token"] = proofToken;
    if (turnstileToken) headers["openai-sentinel-turnstile-token"] = turnstileToken;

    log?.info?.(
      "CGPT-WEB",
      `Conversation request → ${modelSlug} (continue=${!!conversationId}, pow=${!!proofToken})`
    );

    let response: TlsFetchResult;
    try {
      response = await tlsFetchChatGpt(CONV_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(cgptBody),
        timeoutMs: 120_000, // generations can take a while
        signal,
      });
    } catch (err) {
      log?.error?.("CGPT-WEB", `Fetch failed: ${err instanceof Error ? err.message : String(err)}`);
      const code = err instanceof TlsClientUnavailableError ? "TLS_UNAVAILABLE" : undefined;
      return {
        response: errorResponse(
          502,
          `ChatGPT connection failed: ${err instanceof Error ? err.message : String(err)}`,
          code
        ),
        url: CONV_URL,
        headers,
        transformedBody: cgptBody,
      };
    }

    if (response.status >= 400) {
      const status = response.status;
      // Always log the upstream body on 4xx/5xx — error responses are small
      // and the upstream message is much more useful than our wrapper.
       
      console.log(`[CGPT-WEB] conv ${status}: ${(response.text || "").slice(0, 400)}`);
      let errMsg = `ChatGPT returned HTTP ${status}`;
      if (status === 401 || status === 403) {
        errMsg =
          "ChatGPT auth failed — session may have expired. Re-paste your __Secure-next-auth.session-token.";
        tokenCache.delete(cookieKey(cookie));
      } else if (status === 404) {
        errMsg =
          "ChatGPT returned 404 — usually a stale conversation_id or the model is no longer available on this account. The next request will start a fresh conversation.";
        // Clear conv cache so any stale ids are dropped (defensive — we don't
        // currently use the cache, but this also clears anything left over).
        convCache.clear();
      } else if (status === 429) {
        errMsg = "ChatGPT rate limited. Wait a moment and retry.";
      }
      log?.warn?.("CGPT-WEB", errMsg);
      return {
        response: errorResponse(status, errMsg, `HTTP_${status}`),
        url: CONV_URL,
        headers,
        transformedBody: cgptBody,
      };
    }

    // The TLS client buffers the full response body for non-streaming requests.
    // Wrap it in a ReadableStream so the existing SSE parser can consume it.
    if (!response.text) {
      return {
        response: errorResponse(502, "ChatGPT returned empty response body"),
        url: CONV_URL,
        headers,
        transformedBody: cgptBody,
      };
    }

    const bodyStream = stringToStream(response.text);

    const cid = `chatcmpl-cgpt-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    let finalResponse: Response;
    if (stream) {
      const sseStream = buildStreamingResponse(
        bodyStream,
        model,
        cid,
        created,
        parsed.history,
        parsed.currentMsg,
        signal
      );
      finalResponse = new Response(sseStream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    } else {
      finalResponse = await buildNonStreamingResponse(
        bodyStream,
        model,
        cid,
        created,
        parsed.history,
        parsed.currentMsg,
        signal
      );
    }

    return { response: finalResponse, url: CONV_URL, headers, transformedBody: cgptBody };
  }
}

// Strip ChatGPT's internal entity markup. The browser renders these as proper
// inline citations / chips via JS; for a plain text completion we just want
// the human-readable form.
//   entity["city","Paris","capital of France"]  →  Paris
//   entity["…","value", …]                       →  value
const ENTITY_RE = /entity\["[^"]*","([^"]*)"[^\]]*\]/g;

function cleanChatGptText(text: string): string {
  return text.replace(ENTITY_RE, "$1");
}

function stringToStream(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

// Test-only: clear caches between tests
export function __resetChatGptWebCachesForTesting(): void {
  tokenCache.clear();
  convCache.clear();
}
