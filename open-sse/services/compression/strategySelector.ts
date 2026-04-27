import { type CompressionMode, type CompressionConfig, type CompressionResult } from "./types.ts";
import { createCompressionStats } from "./stats.ts";
import { cavemanCompress } from "./caveman.ts";

export function selectCompressionStrategy(
  config: CompressionConfig | null,
  _body: unknown,
  _tokenCount: number,
  _provider: string
): CompressionMode {
  if (!config || !config.enabled) return "off";
  return config.mode || "caveman";
}

export function applyCompression(
  body: unknown,
  mode: CompressionMode,
  config: CompressionConfig | null
): CompressionResult {
  if (mode === "off" || !config?.enabled) {
    return { body, compressed: false, stats: createCompressionStats(0, 0, "off") };
  }
  if (mode === "caveman" && config.cavemanConfig) {
    return cavemanCompress(body as Parameters<typeof cavemanCompress>[0], config.cavemanConfig);
  }
  return { body, compressed: false, stats: createCompressionStats(0, 0, mode) };
}

export function getEffectiveMode(
  comboOverride: string | null,
  _autoTrigger: boolean,
  defaultMode: string
): CompressionMode {
  if (comboOverride && ["off", "lite", "caveman", "aggressive", "ultra"].includes(comboOverride)) {
    return comboOverride as CompressionMode;
  }
  if (defaultMode === "standard") return "caveman";
  if (["off", "lite", "caveman", "aggressive", "ultra"].includes(defaultMode)) {
    return defaultMode as CompressionMode;
  }
  return "off";
}
