/**
 * Compression Pipeline Types — Phase 1 (Lite) + Phase 2 (Standard/Caveman)
 *
 * Shared type definitions for the compression pipeline.
 * Phase 1: 'off' and 'lite' modes.
 * Phase 2: 'standard' mode (caveman engine).
 */

/** Compression mode levels */
export type CompressionMode = "off" | "lite" | "standard" | "aggressive" | "ultra";

/** A single caveman compression rule (Phase 2) */
export interface CavemanRule {
  name: string;
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
  context: "all" | "user" | "system" | "assistant";
  preservePatterns?: RegExp[];
}

/** Configuration for the caveman compression engine (Phase 2) */
export interface CavemanConfig {
  enabled: boolean;
  compressRoles: ("user" | "assistant" | "system")[];
  skipRules: string[];
  minMessageLength: number;
  preservePatterns: string[];
}

/** Per-request compression statistics */
export interface CompressionStats {
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  techniquesUsed: string[];
  mode: CompressionMode;
  timestamp: number;
  rulesApplied?: string[];
  durationMs?: number;
}

/** Result of a compression operation */
export interface CompressionResult {
  body: Record<string, unknown>;
  compressed: boolean;
  stats: CompressionStats | null;
}

/** Compression configuration stored in DB */
export interface CompressionConfig {
  enabled: boolean;
  defaultMode: CompressionMode;
  autoTriggerTokens: number;
  cacheMinutes: number;
  preserveSystemPrompt: boolean;
  comboOverrides: Record<string, CompressionMode>;
  cavemanConfig?: CavemanConfig;
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

/** Default caveman configuration (Phase 2) */
export const DEFAULT_CAVEMAN_CONFIG: CavemanConfig = {
  enabled: true,
  compressRoles: ["user"],
  skipRules: [],
  minMessageLength: 50,
  preservePatterns: [],
};
