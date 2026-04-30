/**
 * Compression Pipeline — Phase 1 (Lite mode)
 *
 * Modular prompt compression that runs BEFORE the existing reactive context manager.
 * Lite mode: 5 techniques, ~10-15% token savings, <1ms latency.
 */

// Types
export type {
  CompressionMode,
  CompressionConfig,
  CompressionStats,
  CompressionResult,
} from "./types";
export { DEFAULT_COMPRESSION_CONFIG } from "./types";

// Lite compression techniques
export {
  applyLiteCompression,
  collapseWhitespace,
  dedupSystemPrompt,
  compressToolResults,
  removeRedundantContent,
  replaceImageUrls,
} from "./lite";

// Strategy selector
export { selectCompressionStrategy, getEffectiveMode, applyCompression } from "./strategySelector";

// Stats tracking
export { estimateCompressionTokens, createCompressionStats, trackCompressionStats } from "./stats";
