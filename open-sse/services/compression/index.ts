export type {
  CompressionMode,
  CompressionConfig,
  CompressionStats,
  CompressionResult,
  CavemanConfig,
  CavemanRule,
} from "./types.ts";

export { DEFAULT_COMPRESSION_CONFIG, DEFAULT_CAVEMAN_CONFIG } from "./types.ts";

export {
  applyLiteCompression,
  collapseWhitespace,
  dedupSystemPrompt,
  compressToolResults,
  removeRedundantContent,
  replaceImageUrls,
} from "./lite.ts";

export { cavemanCompress, applyRulesToText } from "./caveman.ts";
export { getRulesForContext, CAVEMAN_RULES } from "./cavemanRules.ts";
export { extractPreservedBlocks, restorePreservedBlocks } from "./preservation.ts";

export {
  estimateCompressionTokens,
  createCompressionStats,
  trackCompressionStats,
  getDefaultCompressionConfig,
} from "./stats.ts";

export {
  selectCompressionStrategy,
  getEffectiveMode,
  applyCompression,
  checkComboOverride,
  shouldAutoTrigger,
} from "./strategySelector.ts";
