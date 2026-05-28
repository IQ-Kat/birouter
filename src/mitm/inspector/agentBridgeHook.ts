/**
 * Inspector hook called from `MitmHandlerBase` (F3) on every intercepted
 * AgentBridge request. Centralises buffer push/update so handlers do not need
 * to know the inspector internals.
 *
 * Contract: see `_orchestration/master-plan-group-A.md` §3.11.
 */

import { randomUUID } from "node:crypto";
import type { IncomingMessage } from "node:http";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { maskSecret } from "../maskSecrets.ts";
import { sanitizeHeaders } from "../sanitizeHeaders.ts";
import type { AgentId } from "../types.ts";
import { globalTrafficBuffer } from "./buffer.ts";
import type { InterceptedRequest } from "./types.ts";

export interface RecordRequestStartOpts {
  req: IncomingMessage;
  body: Buffer;
  agentId: AgentId;
  mappedModel: string;
  sourceModel?: string | null;
  sessionId?: string;
}

export interface RecordRequestCompleteOpts {
  status: number;
  responseHeaders: Record<string, string>;
  responseBody: string | null;
  responseSize: number;
  proxyLatencyMs: number;
  upstreamLatencyMs: number;
}

/**
 * Build the initial buffer entry and push it. Returned object is mutable by
 * design — handlers call `recordRequestComplete()` (or `recordRequestError`)
 * with the same reference once the upstream call resolves.
 */
export async function recordRequestStart(
  opts: RecordRequestStartOpts
): Promise<InterceptedRequest> {
  const requestBody = opts.body.length > 0 ? maskSecret(opts.body.toString("utf8")) : null;
  const intercepted: InterceptedRequest = {
    id: randomUUID(),
    source: "agent-bridge",
    agent: opts.agentId,
    timestamp: new Date().toISOString(),
    method: opts.req.method ?? "GET",
    host: opts.req.headers.host ?? "",
    path: opts.req.url ?? "/",
    requestHeaders: sanitizeHeaders(opts.req.headers),
    requestBody,
    requestSize: opts.body.length,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: "in-flight",
    sourceModel: opts.sourceModel ?? null,
    mappedModel: opts.mappedModel,
  };
  if (opts.sessionId) intercepted.sessionId = opts.sessionId;

  globalTrafficBuffer.push(intercepted);
  return intercepted;
}

/**
 * Finalise the buffer entry with the upstream response data. Latencies are
 * stored as-given and combined into `totalLatencyMs`.
 */
export function recordRequestComplete(
  intercepted: InterceptedRequest,
  opts: RecordRequestCompleteOpts
): void {
  intercepted.status = opts.status;
  intercepted.responseHeaders = opts.responseHeaders;
  intercepted.responseBody =
    opts.responseBody != null ? maskSecret(opts.responseBody) : null;
  intercepted.responseSize = opts.responseSize;
  intercepted.proxyLatencyMs = opts.proxyLatencyMs;
  intercepted.upstreamLatencyMs = opts.upstreamLatencyMs;
  intercepted.totalLatencyMs = opts.proxyLatencyMs + opts.upstreamLatencyMs;

  globalTrafficBuffer.update(intercepted.id, intercepted);
}

/**
 * Mark the buffer entry as failed. Error messages are sanitized so stack
 * traces or absolute paths cannot leak to dashboards/exports (Hard Rule #12).
 */
export function recordRequestError(
  intercepted: InterceptedRequest,
  err: unknown
): void {
  intercepted.status = "error";
  intercepted.error = sanitizeErrorMessage(err);
  globalTrafficBuffer.update(intercepted.id, intercepted);
}
