import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";

const DEFAULT_COMPRESSION_CONFIG = {
  enabled: false,
  defaultMode: "off" as const,
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  comboOverrides: {},
};

type CompressionConfig = typeof DEFAULT_COMPRESSION_CONFIG & {
  comboOverrides: Record<string, "off" | "lite" | "standard" | "aggressive" | "ultra">;
};

export async function getCompressionSettings(): Promise<CompressionConfig> {
  const db = getDbInstance();
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'compression'").all();
  const settings: Record<string, unknown> = { ...DEFAULT_COMPRESSION_CONFIG };
  for (const row of rows) {
    const record = row as Record<string, unknown>;
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    try {
      settings[key] = JSON.parse(rawValue);
    } catch {
      // skip malformed JSON
    }
  }
  return settings as CompressionConfig;
}

export async function updateCompressionSettings(
  updates: Partial<CompressionConfig>
): Promise<CompressionConfig> {
  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression', ?, ?)"
  );
  const tx = db.transaction(() => {
    for (const [key, value] of Object.entries(updates)) {
      insert.run(key, JSON.stringify(value));
    }
  });
  tx();
  backupDbFile("pre-write");
  return getCompressionSettings();
}
