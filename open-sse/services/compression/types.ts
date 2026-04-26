/**
 * Compression Pipeline Types — Phase 1 (Lite mode)
 *
 * Modular prompt compression that runs BEFORE the existing reactive context manager.
 */

/** Compression mode levels (only 'off' and 'lite' are active in Phase 1) */
export type CompressionMode = "off" | "lite" | "standard" | "aggressive" | "ultra";

/** Compression configuration stored in DB */
export interface CompressionConfig {
  enabled: boolean;
  defaultMode: CompressionMode;
  autoTriggerTokens: number;
  cacheMinutes: number;
  preserveSystemPrompt: boolean;
  comboOverrides: Record<string, CompressionMode>;
}

/** Per-request compression statistics */
export interface CompressionStats {
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  techniquesUsed: string[];
  mode: CompressionMode;
  timestamp: number;
}

/** Result of a compression operation */
export interface CompressionResult {
  body: Record<string, unknown>;
  compressed: boolean;
  stats: CompressionStats | null;
}

/** Default compression config values */
export const DEFAULT_COMPRESSION_CONFIG: CompressionConfig = {
  enabled: false,
  defaultMode: "off",
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  comboOverrides: {},
};
