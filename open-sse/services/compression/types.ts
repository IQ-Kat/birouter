/**
 * Compression Pipeline Types — Phase 1 (Lite) + Phase 2 (Standard/Caveman) + Phase 3 (Aggressive)
 *
 * Shared type definitions for the compression pipeline.
 * Phase 1: 'off' and 'lite' modes.
 * Phase 2: 'standard' mode (caveman engine).
 * Phase 3: 'aggressive' mode (summarization + tool compression + aging).
 */

export type CompressionMode = "off" | "lite" | "standard" | "aggressive" | "ultra";

export interface CavemanRule {
  name: string;
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
  context: "all" | "user" | "system" | "assistant";
  preservePatterns?: RegExp[];
}

export interface CavemanConfig {
  enabled: boolean;
  compressRoles: ("user" | "assistant" | "system")[];
  skipRules: string[];
  minMessageLength: number;
  preservePatterns: string[];
}

export interface CompressionConfig {
  enabled: boolean;
  defaultMode: CompressionMode;
  autoTriggerTokens: number;
  cacheMinutes: number;
  preserveSystemPrompt: boolean;
  comboOverrides: Record<string, CompressionMode>;
  cavemanConfig?: CavemanConfig;
  aggressive?: AggressiveConfig;
}

export interface CompressionStats {
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  techniquesUsed: string[];
  mode: CompressionMode;
  timestamp: number;
  rulesApplied?: string[];
  durationMs?: number;
  aggressive?: {
    summarizerSavings: number;
    toolResultSavings: number;
    agingSavings: number;
  };
}

export interface CompressionResult {
  body: Record<string, unknown>;
  compressed: boolean;
  stats: CompressionStats | null;
}

export const DEFAULT_COMPRESSION_CONFIG: CompressionConfig = {
  enabled: false,
  defaultMode: "off",
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  comboOverrides: {},
};

export const DEFAULT_CAVEMAN_CONFIG: CavemanConfig = {
  enabled: true,
  compressRoles: ["user"],
  skipRules: [],
  minMessageLength: 50,
  preservePatterns: [],
};

/** Aging thresholds for progressive message degradation (Phase 3) */
export interface AgingThresholds {
  fullSummary: number;
  moderate: number;
  light: number;
  verbatim: number;
}

/** Tool result compression strategy toggles (Phase 3) */
export interface ToolStrategiesConfig {
  fileContent: boolean;
  grepSearch: boolean;
  shellOutput: boolean;
  json: boolean;
  errorMessage: boolean;
}

/** Configuration for aggressive compression mode (Phase 3) */
export interface AggressiveConfig {
  thresholds: AgingThresholds;
  toolStrategies: ToolStrategiesConfig;
  summarizerEnabled: boolean;
  maxTokensPerMessage: number;
  minSavingsThreshold: number;
}

/** Options for the Summarizer interface (Phase 3) */
export interface SummarizerOpts {
  maxLen?: number;
  preserveCode?: boolean;
}

/** Summarizer interface — rule-based default, LLM-ready for future drop-in (Phase 3) */
export interface Summarizer {
  summarize(messages: unknown[], opts?: SummarizerOpts): string;
}

/** Default aggressive configuration (Phase 3) */
export const DEFAULT_AGGRESSIVE_CONFIG: AggressiveConfig = {
  thresholds: { fullSummary: 5, moderate: 3, light: 2, verbatim: 2 },
  toolStrategies: {
    fileContent: true,
    grepSearch: true,
    shellOutput: true,
    json: true,
    errorMessage: true,
  },
  summarizerEnabled: true,
  maxTokensPerMessage: 2048,
  minSavingsThreshold: 0.05,
};
