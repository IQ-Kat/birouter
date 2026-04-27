/**
 * Lite compression — minimal prompt compression for Phase 1.
 * Strips trailing whitespace, collapses multiple blank lines,
 * and trims system prompts when auto-triggered.
 */
import type { CompressionConfig, CompressionMode, CompressionResult } from "./types.ts";
import { createCompressionStats, estimateCompressionTokens } from "./stats.ts";

export function applyLiteCompression(
  body: Record<string, unknown>,
  _options?: { model?: string; config?: CompressionConfig }
): CompressionResult {
  if (!body.messages || !Array.isArray(body.messages)) {
    return { body, compressed: false, stats: null };
  }

  let modified = false;
  const messages = body.messages as Array<{ role?: string; content?: string | unknown }>;

  const compressedMessages = messages.map((msg) => {
    if (typeof msg.content !== "string" || !msg.content) return msg;

    let content = msg.content;

    const trimmed = content
      .replace(/\n{3,}/g, "\n\n")
      .replace(/  +$/gm, "")
      .trimEnd();
    if (trimmed !== content) {
      modified = true;
      content = trimmed;
    }

    return { ...msg, content };
  });

  if (!modified) {
    return { body, compressed: false, stats: null };
  }

  const compressedBody = { ...body, messages: compressedMessages };
  const stats = createCompressionStats(body, compressedBody, "lite" as CompressionMode, [
    "whitespace-collapse",
    "blank-line-reduction",
  ]);

  return { body: compressedBody, compressed: true, stats };
}
