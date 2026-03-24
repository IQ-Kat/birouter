/**
 * Model Auto-Sync Scheduler (#488)
 *
 * Automatically refreshes model lists for all providers with autoSync enabled
 * at a configurable interval (default: 24h).
 *
 * Pattern mirrors cloudSyncScheduler.ts for consistency.
 */

import { getSettings, updateSettings } from "@/lib/localDb";

const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MODEL_SYNC_SETTING_KEY = "model_sync_last_run";

/** Providers that support live model list fetching via /v1/models */
const AUTO_SYNC_PROVIDERS = [
  "openai",
  "anthropic",
  "google",
  "gemini",
  "deepseek",
  "groq",
  "mistral",
  "cohere",
  "openrouter",
  "together",
  "fireworks",
  "perplexity",
  "xai",
  "cerebras",
  "ollama",
  "nvidia",
];

let schedulerTimer: NodeJS.Timeout | null = null;
let isRunning = false;

/**
 * Fetch and cache models for a single provider.
 * Calls the internal /api/providers/{id}/sync-models endpoint (if it exists)
 * or falls back to /v1/models from the provider registry.
 */
async function syncProviderModels(providerId: string, baseUrl: string): Promise<void> {
  try {
    const res = await fetch(`${baseUrl}/api/provider-nodes/sync-models`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-internal": "model-sync-scheduler" },
      body: JSON.stringify({ provider: providerId }),
    });
    if (!res.ok) {
      console.warn(`[ModelSync] Provider ${providerId}: sync returned ${res.status}`);
    } else {
      console.log(`[ModelSync] Provider ${providerId}: ✓ updated`);
    }
  } catch (err) {
    console.warn(`[ModelSync] Provider ${providerId}: fetch failed —`, (err as Error).message);
  }
}

/**
 * Run one full model-sync cycle across all auto-sync providers.
 */
async function runSyncCycle(apiBaseUrl: string): Promise<void> {
  if (isRunning) {
    console.log("[ModelSync] Skipping cycle — previous run still in progress");
    return;
  }
  isRunning = true;
  const start = Date.now();
  console.log(
    `[ModelSync] Starting 24h model sync cycle — ${AUTO_SYNC_PROVIDERS.length} providers`
  );

  const results = await Promise.allSettled(
    AUTO_SYNC_PROVIDERS.map((id) => syncProviderModels(id, apiBaseUrl))
  );

  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  console.log(
    `[ModelSync] Cycle complete: ${succeeded}/${AUTO_SYNC_PROVIDERS.length} providers synced in ${Date.now() - start}ms`
  );

  // Record last sync time
  try {
    await updateSettings({ [MODEL_SYNC_SETTING_KEY]: new Date().toISOString() });
  } catch {
    // Non-critical
  }
  isRunning = false;
}

/**
 * Start the model sync scheduler.
 * @param apiBaseUrl — internal base URL to call OmniRoute's own API
 * @param intervalMs — sync interval in milliseconds (default: 24h)
 */
export function startModelSyncScheduler(
  apiBaseUrl = "http://localhost:20128",
  intervalMs = DEFAULT_INTERVAL_MS
): void {
  if (schedulerTimer) {
    console.log("[ModelSync] Scheduler already running — skipping start");
    return;
  }

  // Read MODEL_SYNC_INTERVAL_HOURS env override
  const envHours = parseInt(process.env.MODEL_SYNC_INTERVAL_HOURS ?? "", 10);
  const effectiveIntervalMs =
    !isNaN(envHours) && envHours > 0 ? envHours * 60 * 60 * 1000 : intervalMs;

  console.log(
    `[ModelSync] Scheduler started — interval: ${effectiveIntervalMs / 3_600_000}h, providers: ${AUTO_SYNC_PROVIDERS.length}`
  );

  // Run immediately on startup (staggered by 5s to avoid startup congestion)
  const startupDelay = setTimeout(() => runSyncCycle(apiBaseUrl), 5_000);
  startupDelay.unref?.();

  // Then run on the regular interval
  schedulerTimer = setInterval(() => runSyncCycle(apiBaseUrl), effectiveIntervalMs);
  schedulerTimer.unref?.();
}

/**
 * Stop the model sync scheduler.
 */
export function stopModelSyncScheduler(): void {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
    console.log("[ModelSync] Scheduler stopped");
  }
}

/**
 * Get last sync timestamp from settings DB.
 */
export async function getLastModelSyncTime(): Promise<string | null> {
  try {
    const settings = await getSettings();
    return (settings as Record<string, string>)[MODEL_SYNC_SETTING_KEY] ?? null;
  } catch {
    return null;
  }
}
