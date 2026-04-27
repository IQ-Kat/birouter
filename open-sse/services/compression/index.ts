export type {
  CompressionMode,
  CompressionConfig,
  CompressionStats,
  CompressionResult,
  CavemanConfig,
  CavemanRule,
} from "./types.ts";

export { DEFAULT_COMPRESSION_CONFIG, DEFAULT_CAVEMAN_CONFIG } from "./types.ts";

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
  applyCompression,
  getEffectiveMode,
  checkComboOverride,
  shouldAutoTrigger,
} from "./strategySelector.ts";

export { applyLiteCompression } from "./lite.ts";
