import { randomUUID } from "crypto";
import { setUserAgentHeader } from "../executors/base.ts";

/**
 * Header keys that are forwarded from the client to the upstream provider.
 * Used by both OpencodeExecutor and DefaultExecutor.
 */
const OPENCODE_HEADER_KEYS = [
  "x-opencode-session",
  "x-opencode-request",
  "x-opencode-project",
  "x-opencode-client",
] as const;

/**
 * Case-insensitive lookup for a header in a headers record.
 */
function findHeader(headers: Record<string, string>, name: string): string | undefined {
  return Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1];
}

/**
 * Forward OpenCode client request metadata headers to the upstream provider.
 *
 * Shared logic used by OpencodeExecutor and DefaultExecutor:
 * 1. Forwards User-Agent from clientHeaders via `setUserAgentHeader()`
 * 2. Forwards x-opencode-session, x-opencode-request, x-opencode-project,
 *    x-opencode-client headers (case-insensitive match)
 *
 * @param headers - The outbound headers record to mutate
 * @param clientHeaders - The client-provided headers to forward from
 * @param options.synthesizeRequestId - When true (OpencodeExecutor only), maps
 *   x-session-affinity / x-session-id to x-opencode-session when the latter is
 *   missing, and synthesizes a UUID for x-opencode-request if also missing.
 * @param options.cliDefaults - When provided (OpencodeExecutor only), synthesize
 *   the OpenCode CLI identity headers that Cloudflare requires on VPS egress
 *   (User-Agent, x-opencode-client, x-opencode-project) plus fresh request/session
 *   UUIDs, but ONLY for keys the client did not already supply. Client values always
 *   win; these defaults only fill gaps. (#5997)
 */
export function forwardOpencodeClientHeaders(
  headers: Record<string, string>,
  clientHeaders: Record<string, string>,
  options?: {
    synthesizeRequestId?: boolean;
    cliDefaults?: { userAgent: string; client: string; project: string };
  }
): void {
  // 1. Forward User-Agent
  const clientUA = clientHeaders["User-Agent"] || clientHeaders["user-agent"];
  if (clientUA) {
    setUserAgentHeader(headers, clientUA);
  }

  // 2. Forward x-opencode-* metadata headers
  for (const headerName of OPENCODE_HEADER_KEYS) {
    const value = findHeader(clientHeaders, headerName);
    if (value) {
      headers[headerName] = value;
    }
  }

  // 3. OpencodeExecutor-only: synthesize session/request id from fallback headers
  if (options?.synthesizeRequestId && !headers["x-opencode-session"]) {
    const sessionAffinity =
      findHeader(clientHeaders, "x-session-affinity") || findHeader(clientHeaders, "x-session-id");
    if (sessionAffinity) {
      headers["x-opencode-session"] = sessionAffinity;

      if (!headers["x-opencode-request"]) {
        headers["x-opencode-request"] = randomUUID();
      }
    }
  }

  // 4. OpencodeExecutor-only: synthesize the OpenCode CLI identity Cloudflare expects
  //    on VPS egress, for any key the client did not supply (#5997).
  if (options?.cliDefaults) {
    applyCliDefaults(headers, options.cliDefaults);
  }
}

/**
 * True when a User-Agent string looks like a web browser (blink/webkit/gecko).
 * A browser UA is NOT a valid OpenCode client identity — forwarding it alongside
 * the synthesized `x-opencode-client: cli` produces a mixed identity that
 * Cloudflare rejects with 429 (#5997 follow-up). Playground requests always
 * carry one, so CLI synthesis must override it.
 */
function isBrowserLikeUserAgent(userAgent: string): boolean {
  const lower = String(userAgent || "").toLowerCase();
  return (
    lower.includes("mozilla/") ||
    lower.includes("applewebkit") ||
    lower.includes("chrome/") ||
    lower.includes("safari") ||
    lower.includes("firefox") ||
    lower.includes("edg/")
  );
}

/**
 * Fill the OpenCode CLI identity headers Cloudflare requires on VPS egress, but only for
 * keys the client did not already supply (client values always win). (#5997)
 *
 * User-Agent is special-cased: a client-supplied browser UA (the playground's
 * Chrome UA) is not a valid OpenCode client identity and gets 429'd when paired
 * with `x-opencode-client: cli`. Browser-like UAs are therefore replaced by the
 * synthesized CLI UA; any non-browser client UA (a real OpenCode client or tool
 * forwarding its own identity) is kept untouched.
 */
function applyCliDefaults(
  headers: Record<string, string>,
  cliDefaults: { userAgent: string; client: string; project: string }
): void {
  const existingUA = headers["User-Agent"] || headers["user-agent"];
  if (!existingUA || isBrowserLikeUserAgent(existingUA)) {
    setUserAgentHeader(headers, cliDefaults.userAgent);
  }
  headers["x-opencode-client"] ||= cliDefaults.client;
  headers["x-opencode-project"] ||= cliDefaults.project;
  headers["x-opencode-request"] ||= randomUUID();
  headers["x-opencode-session"] ||= randomUUID();
}
