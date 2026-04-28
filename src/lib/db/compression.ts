import { getDbInstance } from "./core.ts";
import { invalidateDbCache } from "./readCache.ts";
import {
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  DEFAULT_AGGRESSIVE_CONFIG,
  DEFAULT_ULTRA_CONFIG,
} from "../../../open-sse/services/compression/types.ts";
import type {
  CompressionConfig,
  CavemanConfig,
  CompressionMode,
  AggressiveConfig,
  UltraConfig,
} from "../../../open-sse/services/compression/types.ts";

const NAMESPACE = "compression";

type JsonRecord = Record<string, unknown>;

// TTL cache for compression settings (5s)
let compressionSettingsCache: { value: CompressionConfig; expiresAt: number } | null = null;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function parseJsonSafe(raw: string | null): unknown {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export function getCompressionSettings(): CompressionConfig {
  // Check TTL cache
  if (compressionSettingsCache && Date.now() < compressionSettingsCache.expiresAt) {
    return compressionSettingsCache.value;
  }

  const db = getDbInstance();
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = ?").all(NAMESPACE);

  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG },
  };

  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || !rawValue) continue;
    const parsed = parseJsonSafe(rawValue);
    if (parsed === undefined) continue;

    switch (key) {
      case "enabled":
        config.enabled = !!parsed;
        break;
      case "defaultMode":
        if (["off", "lite", "standard", "aggressive", "ultra"].includes(parsed as string)) {
          config.defaultMode = parsed as CompressionMode;
        }
        break;
      case "autoTriggerTokens":
        config.autoTriggerTokens = typeof parsed === "number" ? parsed : 0;
        break;
      case "cacheMinutes":
        config.cacheMinutes = typeof parsed === "number" ? parsed : 5;
        break;
      case "preserveSystemPrompt":
        config.preserveSystemPrompt = !!parsed;
        break;
      case "comboOverrides":
        if (typeof parsed === "object" && parsed !== null) {
          config.comboOverrides = parsed as Record<string, CompressionMode>;
        }
        break;
      case "cavemanConfig":
        if (typeof parsed === "object" && parsed !== null) {
          config.cavemanConfig = {
            ...DEFAULT_CAVEMAN_CONFIG,
            ...(parsed as Partial<CavemanConfig>),
          };
        }
        break;
      case "aggressiveConfig":
        if (typeof parsed === "object" && parsed !== null) {
          config.aggressive = {
            ...DEFAULT_AGGRESSIVE_CONFIG,
            ...(parsed as Partial<AggressiveConfig>),
            thresholds: {
              ...DEFAULT_AGGRESSIVE_CONFIG.thresholds,
              ...(((parsed as Record<string, unknown>).thresholds as Partial<
                typeof DEFAULT_AGGRESSIVE_CONFIG.thresholds
              >) ?? {}),
            },
            toolStrategies: {
              ...DEFAULT_AGGRESSIVE_CONFIG.toolStrategies,
              ...(((parsed as Record<string, unknown>).toolStrategies as Partial<
                typeof DEFAULT_AGGRESSIVE_CONFIG.toolStrategies
              >) ?? {}),
            },
          };
        }
        break;
      case "ultraConfig":
        if (typeof parsed === "object" && parsed !== null) {
          config.ultra = {
            ...DEFAULT_ULTRA_CONFIG,
            ...(parsed as Partial<UltraConfig>),
          };
        }
        break;
    }
  }

  // Store in TTL cache (5s expiry)
  compressionSettingsCache = {
    value: config,
    expiresAt: Date.now() + 5000,
  };

  return config;
}

export function updateCompressionSettings(settings: Record<string, unknown>): void {
  const db = getDbInstance();
  const upsert = db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?) ON CONFLICT(namespace, key) DO UPDATE SET value = excluded.value"
  );

  const transaction = db.transaction(() => {
    for (const [key, value] of Object.entries(settings)) {
      upsert.run(NAMESPACE, key, JSON.stringify(value));
    }
  });

  transaction();
  // Clear TTL cache on update
  compressionSettingsCache = null;
  invalidateDbCache();
}

export function getDefaultAggressiveConfig(): AggressiveConfig {
  return {
    ...DEFAULT_AGGRESSIVE_CONFIG,
    thresholds: { ...DEFAULT_AGGRESSIVE_CONFIG.thresholds },
    toolStrategies: { ...DEFAULT_AGGRESSIVE_CONFIG.toolStrategies },
  };
}

export function getDefaultUltraConfig(): UltraConfig {
  return { ...DEFAULT_ULTRA_CONFIG };
}
