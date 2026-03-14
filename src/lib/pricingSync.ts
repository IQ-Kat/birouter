/**
 * pricingSync.ts — External pricing sync engine.
 *
 * Fetches pricing data from external sources (LiteLLM) and stores it
 * in a separate namespace (`pricing_synced`) so user overrides are
 * never touched.
 *
 * Resolution order: user overrides > synced external > hardcoded defaults
 *
 * Opt-in via PRICING_SYNC_ENABLED=true (default: false).
 */

import { getDbInstance } from "./db/core";
import { invalidateDbCache } from "./db/readCache";
import { backupDbFile } from "./db/backup";

// ─── Types ───────────────────────────────────────────────

type PricingEntry = {
  input: number;
  output: number;
  cached?: number;
  cache_creation?: number;
};

type PricingModels = Record<string, PricingEntry>;
type PricingByProvider = Record<string, PricingModels>;

interface LiteLLMModelInfo {
  input_cost_per_token?: number;
  output_cost_per_token?: number;
  cache_read_input_token_cost?: number;
  cache_creation_input_token_cost?: number;
  litellm_provider?: string;
  mode?: string;
}

interface SyncStatus {
  enabled: boolean;
  lastSync: string | null;
  lastSyncModelCount: number;
  nextSync: string | null;
  intervalMs: number;
  sources: string[];
}

interface SyncResult {
  success: boolean;
  modelCount: number;
  providerCount: number;
  source: string;
  dryRun: boolean;
  data?: PricingByProvider;
  error?: string;
}

// ─── Configuration ───────────────────────────────────────

const SYNC_INTERVAL_MS = parseInt(process.env.PRICING_SYNC_INTERVAL || "86400", 10) * 1000;
const SYNC_SOURCES = (process.env.PRICING_SYNC_SOURCES || "litellm")
  .split(",")
  .map((s) => s.trim());

const LITELLM_PRICING_URL =
  "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json";

// ─── Provider mapping: LiteLLM provider → OmniRoute aliases ─────

const LITELLM_PROVIDER_MAP: Record<string, string[]> = {
  openai: ["openai", "cx"],
  anthropic: ["anthropic", "cc"],
  vertex_ai: ["gemini", "gc"],
  "vertex_ai-anthropic_models": ["anthropic"],
  google: ["gemini", "gc"],
  deepseek: ["if"],
  groq: ["groq"],
  together_ai: ["openrouter"],
  bedrock: ["kiro"],
  fireworks_ai: ["fireworks"],
  cerebras: ["cerebras"],
  nvidia_nim: ["nvidia"],
  siliconflow: ["siliconflow"],
};

// ─── Periodic sync state ─────────────────────────────────

let syncTimer: ReturnType<typeof setInterval> | null = null;
let lastSyncTime: string | null = null;
let lastSyncModelCount = 0;

// ─── Core: Fetch + Transform ─────────────────────────────

/**
 * Fetch raw pricing data from LiteLLM GitHub.
 */
export async function fetchLiteLLMPricing(): Promise<Record<string, LiteLLMModelInfo>> {
  const response = await fetch(LITELLM_PRICING_URL, {
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    throw new Error(`LiteLLM fetch failed [${response.status}]: ${response.statusText}`);
  }
  return response.json() as Promise<Record<string, LiteLLMModelInfo>>;
}

/**
 * Transform LiteLLM raw data → OmniRoute PricingByProvider format.
 *
 * Conversion: cost_per_token × 1_000_000 → $/1M tokens (OmniRoute format)
 * Filters: only chat/completion modes (skip image/audio/embedding)
 */
export function transformToOmniRoute(raw: Record<string, LiteLLMModelInfo>): PricingByProvider {
  const result: PricingByProvider = {};

  for (const [modelKey, info] of Object.entries(raw)) {
    // Skip non-chat models
    if (info.mode && !["chat", "completion"].includes(info.mode)) continue;

    // Must have at least input pricing
    if (!info.input_cost_per_token && info.input_cost_per_token !== 0) continue;

    const inputCost = (info.input_cost_per_token || 0) * 1_000_000;
    const outputCost = (info.output_cost_per_token || 0) * 1_000_000;

    const entry: PricingEntry = {
      input: Math.round(inputCost * 1000) / 1000,
      output: Math.round(outputCost * 1000) / 1000,
    };

    if (info.cache_read_input_token_cost != null) {
      entry.cached = Math.round(info.cache_read_input_token_cost * 1_000_000 * 1000) / 1000;
    }
    if (info.cache_creation_input_token_cost != null) {
      entry.cache_creation =
        Math.round(info.cache_creation_input_token_cost * 1_000_000 * 1000) / 1000;
    }

    // Extract model name (strip provider prefix from key)
    // LiteLLM keys look like: "openai/gpt-4o", "anthropic/claude-3-opus"
    const slashIdx = modelKey.indexOf("/");
    const modelName = slashIdx >= 0 ? modelKey.slice(slashIdx + 1) : modelKey;

    // Map to OmniRoute providers
    const litellmProvider = info.litellm_provider || "";
    const omniRouteProviders = LITELLM_PROVIDER_MAP[litellmProvider];

    if (omniRouteProviders) {
      for (const provider of omniRouteProviders) {
        if (!result[provider]) result[provider] = {};
        result[provider][modelName] = entry;
      }
    } else if (litellmProvider) {
      // Use litellm_provider as-is for unknown providers
      if (!result[litellmProvider]) result[litellmProvider] = {};
      result[litellmProvider][modelName] = entry;
    }
  }

  return result;
}

// ─── DB: Synced pricing namespace ────────────────────────

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

/**
 * Read synced pricing from `pricing_synced` namespace.
 */
export function getSyncedPricing(): PricingByProvider {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing_synced'")
    .all();
  const synced: PricingByProvider = {};
  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    synced[key] = JSON.parse(rawValue) as PricingModels;
  }
  return synced;
}

/**
 * Save synced pricing to `pricing_synced` namespace (full replace).
 */
export function saveSyncedPricing(data: PricingByProvider): void {
  const db = getDbInstance();
  const del = db.prepare("DELETE FROM key_value WHERE namespace = 'pricing_synced'");
  const insert = db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('pricing_synced', ?, ?)"
  );
  const tx = db.transaction(() => {
    del.run();
    for (const [provider, models] of Object.entries(data)) {
      insert.run(provider, JSON.stringify(models));
    }
  });
  tx();
  backupDbFile("pre-write");
  invalidateDbCache("pricing");
}

/**
 * Clear all synced pricing data.
 */
export function clearSyncedPricing(): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'pricing_synced'").run();
  backupDbFile("pre-write");
  invalidateDbCache("pricing");
}

// ─── Main sync function ─────────────────────────────────

/**
 * Fetch, transform, and save pricing from external sources.
 */
export async function syncPricingFromSources(opts?: {
  sources?: string[];
  dryRun?: boolean;
}): Promise<SyncResult> {
  const sources = opts?.sources || SYNC_SOURCES;
  const dryRun = opts?.dryRun ?? false;

  try {
    let aggregated: PricingByProvider = {};

    for (const source of sources) {
      if (source === "litellm") {
        const raw = await fetchLiteLLMPricing();
        const transformed = transformToOmniRoute(raw);
        // Merge into aggregated
        for (const [provider, models] of Object.entries(transformed)) {
          if (!aggregated[provider]) aggregated[provider] = {};
          Object.assign(aggregated[provider], models);
        }
      }
    }

    const modelCount = Object.values(aggregated).reduce(
      (sum, models) => sum + Object.keys(models).length,
      0
    );
    const providerCount = Object.keys(aggregated).length;

    if (!dryRun) {
      saveSyncedPricing(aggregated);
      lastSyncTime = new Date().toISOString();
      lastSyncModelCount = modelCount;
    }

    return {
      success: true,
      modelCount,
      providerCount,
      source: sources.join(","),
      dryRun,
      ...(dryRun ? { data: aggregated } : {}),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn("[PRICING_SYNC] Sync failed:", message);
    return {
      success: false,
      modelCount: 0,
      providerCount: 0,
      source: sources.join(","),
      dryRun,
      error: message,
    };
  }
}

// ─── Periodic sync ───────────────────────────────────────

/**
 * Start periodic pricing sync (non-blocking).
 */
export function startPeriodicSync(intervalMs?: number): void {
  if (syncTimer) return; // Already running

  const interval = intervalMs ?? SYNC_INTERVAL_MS;
  console.log(`[PRICING_SYNC] Starting periodic sync every ${interval / 1000}s`);

  // Initial sync (non-blocking)
  syncPricingFromSources().then((result) => {
    if (result.success) {
      console.log(
        `[PRICING_SYNC] Initial sync complete: ${result.modelCount} models from ${result.providerCount} providers`
      );
    }
  });

  syncTimer = setInterval(() => {
    syncPricingFromSources().then((result) => {
      if (result.success) {
        console.log(`[PRICING_SYNC] Periodic sync complete: ${result.modelCount} models`);
      }
    });
  }, interval);
}

/**
 * Stop periodic sync and cleanup timer.
 */
export function stopPeriodicSync(): void {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log("[PRICING_SYNC] Periodic sync stopped");
  }
}

/**
 * Get current sync status.
 */
export function getSyncStatus(): SyncStatus {
  const enabled = process.env.PRICING_SYNC_ENABLED === "true";
  return {
    enabled,
    lastSync: lastSyncTime,
    lastSyncModelCount,
    nextSync:
      syncTimer && lastSyncTime
        ? new Date(new Date(lastSyncTime).getTime() + SYNC_INTERVAL_MS).toISOString()
        : null,
    intervalMs: SYNC_INTERVAL_MS,
    sources: SYNC_SOURCES,
  };
}

// ─── Init (called from server-init.ts) ───────────────────

/**
 * Initialize pricing sync if enabled.
 */
export async function initPricingSync(): Promise<void> {
  if (process.env.PRICING_SYNC_ENABLED !== "true") {
    console.log("[PRICING_SYNC] Disabled (set PRICING_SYNC_ENABLED=true to enable)");
    return;
  }
  startPeriodicSync();
}
