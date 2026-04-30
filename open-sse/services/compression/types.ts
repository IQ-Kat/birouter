/**
 * Compression Pipeline Types — Phase 1 (Lite) + Phase 2 (Standard/Caveman)
 *
 * Shared type definitions for the compression pipeline.
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
