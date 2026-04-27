import { getDbInstance } from "./core.ts";
import { invalidateDbCache } from "./readCache.ts";
import { DEFAULT_CAVEMAN_CONFIG } from "../../open-sse/services/compression/types.ts";
import type { CavemanConfig } from "../../open-sse/services/compression/types.ts";

const NAMESPACE = "compression";

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

export interface CompressionSettings {
  mode: string;
  enabled: boolean;
  cavemanConfig: CavemanConfig;
}

export function getCompressionSettings(): CompressionSettings {
  const db = getDbInstance();
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = ?").all(NAMESPACE);

  const defaults: CompressionSettings = {
    mode: "off",
    enabled: false,
    cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG },
  };

  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || !rawValue) continue;
    try {
      const parsed = JSON.parse(rawValue);
      if (key === "mode") defaults.mode = parsed;
      else if (key === "enabled") defaults.enabled = parsed;
      else if (key === "cavemanConfig")
        defaults.cavemanConfig = { ...DEFAULT_CAVEMAN_CONFIG, ...parsed };
    } catch {
      // skip malformed JSON
    }
  }

  return defaults;
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
  invalidateDbCache();
}
