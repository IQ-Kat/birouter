import {
  type CompressionMode,
  type CompressionStats,
  type CompressionConfig,
  type CompressionResult,
  DEFAULT_CAVEMAN_CONFIG,
} from "./types.ts";

const CHARS_PER_TOKEN = 4;

export function estimateTokensForStats(text: string | object | null | undefined): number {
  if (!text) return 0;
  const str = typeof text === "string" ? text : JSON.stringify(text);
  return Math.ceil(str.length / CHARS_PER_TOKEN);
}

export function createCompressionStats(
  originalTokens: number,
  compressedTokens: number,
  mode: string,
  rulesApplied?: string[]
): CompressionStats {
  const savingsPercent =
    originalTokens > 0
      ? Math.round(((originalTokens - compressedTokens) / originalTokens) * 100)
      : 0;
  return {
    mode,
    originalTokens,
    compressedTokens,
    savingsPercent,
    durationMs: 0,
    ...(rulesApplied ? { rulesApplied } : {}),
  };
}

export function trackCompressionStats(stats: CompressionStats): void {
  if (process.env.COMPRESSION_DEBUG === "1") {
    console.log("[compression]", JSON.stringify(stats));
  }
}

export function getDefaultCompressionConfig(): CompressionConfig {
  return {
    mode: "off",
    enabled: false,
    cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG },
  };
}
