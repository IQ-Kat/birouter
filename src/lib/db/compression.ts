import { backupDbFile } from "./backup";
import { getDbInstance } from "./core";
import { invalidateDbCache } from "./readCache";
import {
  DEFAULT_CAVEMAN_CONFIG,
  DEFAULT_COMPRESSION_CONFIG,
  type CavemanConfig,
  type CompressionConfig,
  type CompressionMode,
} from "@omniroute/open-sse/services/compression/types.ts";

const NAMESPACE = "compression";
const COMPRESSION_MODES = new Set<CompressionMode>([
  "off",
  "lite",
  "standard",
  "aggressive",
  "ultra",
]);

type JsonRecord = Record<string, unknown>;

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

function normalizeCavemanConfig(value: unknown): CavemanConfig {
  const record = toRecord(value);
  return {
    ...DEFAULT_CAVEMAN_CONFIG,
    ...record,
    compressRoles: Array.isArray(record.compressRoles)
      ? record.compressRoles.filter(
          (role): role is "user" | "assistant" | "system" =>
            role === "user" || role === "assistant" || role === "system"
        )
      : DEFAULT_CAVEMAN_CONFIG.compressRoles,
    skipRules: Array.isArray(record.skipRules)
      ? record.skipRules.filter((rule): rule is string => typeof rule === "string")
      : DEFAULT_CAVEMAN_CONFIG.skipRules,
    minMessageLength:
      typeof record.minMessageLength === "number" && Number.isFinite(record.minMessageLength)
        ? Math.max(0, Math.floor(record.minMessageLength))
        : DEFAULT_CAVEMAN_CONFIG.minMessageLength,
    preservePatterns: Array.isArray(record.preservePatterns)
      ? record.preservePatterns.filter((pattern): pattern is string => typeof pattern === "string")
      : DEFAULT_CAVEMAN_CONFIG.preservePatterns,
  };
}

export async function getCompressionSettings(): Promise<CompressionConfig> {
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
    if (!key || rawValue === null) continue;
    const parsed = parseJsonSafe(rawValue);
    if (parsed === undefined) continue;

    switch (key) {
      case "enabled":
        config.enabled = parsed === true;
        break;
      case "defaultMode":
        if (typeof parsed === "string" && COMPRESSION_MODES.has(parsed as CompressionMode)) {
          config.defaultMode = parsed as CompressionMode;
        }
        break;
      case "autoTriggerTokens":
        config.autoTriggerTokens =
          typeof parsed === "number" && Number.isFinite(parsed)
            ? Math.max(0, Math.floor(parsed))
            : 0;
        break;
      case "cacheMinutes":
        config.cacheMinutes =
          typeof parsed === "number" && Number.isFinite(parsed)
            ? Math.max(1, Math.floor(parsed))
            : DEFAULT_COMPRESSION_CONFIG.cacheMinutes;
        break;
      case "preserveSystemPrompt":
        config.preserveSystemPrompt = parsed !== false;
        break;
      case "comboOverrides":
        if (parsed && typeof parsed === "object") {
          const overrides: Record<string, CompressionMode> = {};
          for (const [comboId, mode] of Object.entries(parsed as Record<string, unknown>)) {
            if (typeof mode === "string" && COMPRESSION_MODES.has(mode as CompressionMode)) {
              overrides[comboId] = mode as CompressionMode;
            }
          }
          config.comboOverrides = overrides;
        }
        break;
      case "cavemanConfig":
        config.cavemanConfig = normalizeCavemanConfig(parsed);
        break;
    }
  }

  return config;
}

export async function updateCompressionSettings(
  updates: Partial<CompressionConfig>
): Promise<CompressionConfig> {
  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );

  const tx = db.transaction(() => {
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined) continue;
      insert.run(NAMESPACE, key, JSON.stringify(value));
    }
  });

  tx();
  backupDbFile("pre-write");
  invalidateDbCache();
  return getCompressionSettings();
}
