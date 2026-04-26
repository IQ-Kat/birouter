import type { CompressionConfig, CompressionMode, CompressionResult } from "./types";
import { applyLiteCompression } from "./lite";

export function checkComboOverride(
  config: CompressionConfig,
  comboId: string | null
): CompressionMode | null {
  if (!comboId || !config.comboOverrides) return null;
  return config.comboOverrides[comboId] ?? null;
}

export function shouldAutoTrigger(config: CompressionConfig, estimatedTokens: number): boolean {
  return config.autoTriggerTokens > 0 && estimatedTokens >= config.autoTriggerTokens;
}

export function getEffectiveMode(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number
): CompressionMode {
  if (!config.enabled) return "off";

  const comboMode = checkComboOverride(config, comboId);
  if (comboMode) return comboMode;

  if (shouldAutoTrigger(config, estimatedTokens)) return "lite";

  return config.defaultMode;
}

export function selectCompressionStrategy(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number
): CompressionMode {
  return getEffectiveMode(config, comboId, estimatedTokens);
}

export function applyCompression(
  body: Record<string, unknown>,
  mode: CompressionMode,
  options?: { model?: string }
): CompressionResult {
  if (mode === "off") {
    return { body, compressed: false, stats: null };
  }
  if (mode === "lite") {
    return applyLiteCompression(body, options);
  }
  return { body, compressed: false, stats: null };
}
