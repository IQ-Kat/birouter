export type {
  CompressionMode,
  CompressionConfig,
  CompressionStats,
  CompressionResult,
  CavemanConfig,
  CavemanRule,
  CavemanIntensity,
  CavemanOutputModeConfig,
  AggressiveConfig,
  AgingThresholds,
  ToolStrategiesConfig,
  SummarizerOpts,
  Summarizer,
} from "./types.ts";

export {
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG,
  DEFAULT_AGGRESSIVE_CONFIG,
} from "./types.ts";

export {
  applyLiteCompression,
  collapseWhitespace,
  dedupSystemPrompt,
  compressToolResults,
  removeRedundantContent,
  replaceImageUrls,
} from "./lite.ts";

export { cavemanCompress, applyRulesToText } from "./caveman.ts";
export { getRulesForContext, getCavemanRuleMetadata, CAVEMAN_RULES } from "./cavemanRules.ts";
export {
  extractPreservedBlocks,
  restorePreservedBlocks,
  findFencedCodeBlocks,
} from "./preservation.ts";
export type { PreservedBlock, PreservationOptions } from "./preservation.ts";
export { validateCompression } from "./validation.ts";
export type { ValidationResult } from "./validation.ts";
export {
  applyCavemanOutputMode,
  buildCavemanOutputInstruction,
  shouldBypassCavemanOutputMode,
} from "./outputMode.ts";
export type { CavemanOutputModeResult } from "./outputMode.ts";
export { buildCompressionDiff, buildCompressionPreviewDiff } from "./diffHelper.ts";
export type { CompressionDiffSegment, CompressionPreviewDiff } from "./diffHelper.ts";

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

export { RuleBasedSummarizer, createSummarizer } from "./summarizer.ts";

export { compressToolResult } from "./toolResultCompressor.ts";
export type { CompressionResult as ToolCompressionResult } from "./toolResultCompressor.ts";

export { applyAging } from "./progressiveAging.ts";

export { compressAggressive } from "./aggressive.ts";

export { STOPWORDS, FORCE_PRESERVE_RE, scoreToken, pruneByScore } from "./ultraHeuristic.ts";

export type { SLMInterface, UltraCompressResult } from "./ultra.ts";
export { createSLMStub, ultraCompress } from "./ultra.ts";

export type { UltraConfig } from "./types.ts";
export { DEFAULT_ULTRA_CONFIG } from "./types.ts";
