import type { CompressionStats, CompressionMode } from "./types";

const CHARS_PER_TOKEN = 4;

export function estimateCompressionTokens(text: string | object | null | undefined): number {
  if (!text) return 0;
  const str = typeof text === "string" ? text : JSON.stringify(text);
  return Math.ceil(str.length / CHARS_PER_TOKEN);
}

export function createCompressionStats(
  originalBody: Record<string, unknown>,
  compressedBody: Record<string, unknown>,
  mode: CompressionMode,
  techniquesUsed: string[]
): CompressionStats {
  const originalTokens = estimateCompressionTokens(originalBody);
  const compressedTokens = estimateCompressionTokens(compressedBody);
  const savingsPercent =
    originalTokens > 0
      ? Math.round(((originalTokens - compressedTokens) / originalTokens) * 10000) / 100
      : 0;
  return {
    originalTokens,
    compressedTokens,
    savingsPercent,
    techniquesUsed,
    mode,
    timestamp: Date.now(),
  };
}

export function trackCompressionStats(stats: CompressionStats): void {
  if (stats.originalTokens <= 0) return;
  console.log(
    `[COMPRESSION] mode=${stats.mode} tokens=${stats.originalTokens}->${stats.compressedTokens} savings=${stats.savingsPercent}% techniques=${stats.techniquesUsed.join(",")}`
  );
}
