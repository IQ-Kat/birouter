/**
 * Compression Types — Phase 1 + Phase 2 (Caveman)
 *
 * Shared type definitions for the compression pipeline.
 * No implementation logic — types only.
 */

/** Supported compression modes */
export type CompressionMode = "off" | "lite" | "caveman" | "aggressive" | "ultra";

/** A single caveman compression rule */
export interface CavemanRule {
  name: string;
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
  context: "all" | "user" | "system" | "assistant";
  preservePatterns?: RegExp[];
}

/** Configuration for the caveman compression engine */
export interface CavemanConfig {
  enabled: boolean;
  compressRoles: ("user" | "assistant" | "system")[];
  skipRules: string[];
  minMessageLength: number;
  preservePatterns: string[];
}

/** Statistics for a single compression operation */
export interface CompressionStats {
  mode: string;
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  durationMs: number;
  rulesApplied?: string[];
}

/** Result of a compression operation */
export interface CompressionResult {
  body: unknown;
  compressed: boolean;
  stats: CompressionStats;
}

/** Top-level compression configuration */
export interface CompressionConfig {
  mode: CompressionMode;
  enabled: boolean;
  cavemanConfig?: CavemanConfig;
}

/** Default caveman configuration */
export const DEFAULT_CAVEMAN_CONFIG: CavemanConfig = {
  enabled: true,
  compressRoles: ["user"],
  skipRules: [],
  minMessageLength: 50,
  preservePatterns: [],
};
