/**
 * In-memory combo metrics tracker
 * Tracks per-combo and per-model request counts, latency, success/failure rates
 * Provides API for reading metrics from the dashboard
 */

interface ModelMetrics {
  requests: number;
  successes: number;
  failures: number;
  totalLatencyMs: number;
  lastStatus: "ok" | "error" | null;
  lastUsedAt: string | null;
}

interface ComboMetricsEntry {
  totalRequests: number;
  totalSuccesses: number;
  totalFailures: number;
  totalFallbacks: number;
  totalLatencyMs: number;
  strategy: string;
  lastUsedAt: string | null;
  intentCounts: Record<string, number>;
  byModel: Record<string, ModelMetrics>;
}

interface ComboMetricsView extends ComboMetricsEntry {
  avgLatencyMs: number;
  successRate: number;
  fallbackRate: number;
  byModel: Record<
    string,
    ModelMetrics & {
      avgLatencyMs: number;
      successRate: number;
    }
  >;
}

// In-memory store
const metrics = new Map<string, ComboMetricsEntry>();

/**
 * Record a combo request result
 * @param {string} comboName
 * @param {string} modelStr - The model that handled the request (or null if all failed)
 * @param {Object} options
 * @param {boolean} options.success
 * @param {number} options.latencyMs
 * @param {number} options.fallbackCount - How many fallbacks occurred
 * @param {string} [options.strategy] - "priority" or "weighted"
 */
export function recordComboRequest(
  comboName: string,
  modelStr: string | null,
  {
    success,
    latencyMs,
    fallbackCount = 0,
    strategy = "priority",
  }: { success: boolean; latencyMs: number; fallbackCount?: number; strategy?: string }
): void {
  if (!metrics.has(comboName)) {
    metrics.set(comboName, {
      totalRequests: 0,
      totalSuccesses: 0,
      totalFailures: 0,
      totalFallbacks: 0,
      totalLatencyMs: 0,
      strategy,
      lastUsedAt: null,
      intentCounts: {},
      byModel: {},
    });
  }

  const combo = metrics.get(comboName);
  if (!combo) return;
  combo.totalRequests++;
  combo.totalLatencyMs += latencyMs;
  combo.totalFallbacks += fallbackCount;
  combo.lastUsedAt = new Date().toISOString();
  combo.strategy = strategy;

  if (success) {
    combo.totalSuccesses++;
  } else {
    combo.totalFailures++;
  }

  // Per-model tracking
  if (modelStr) {
    if (!combo.byModel[modelStr]) {
      combo.byModel[modelStr] = {
        requests: 0,
        successes: 0,
        failures: 0,
        totalLatencyMs: 0,
        lastStatus: null,
        lastUsedAt: null,
      };
    }
    const modelMetric = combo.byModel[modelStr];
    modelMetric.requests++;
    modelMetric.totalLatencyMs += latencyMs;
    modelMetric.lastUsedAt = new Date().toISOString();

    if (success) {
      modelMetric.successes++;
      modelMetric.lastStatus = "ok";
    } else {
      modelMetric.failures++;
      modelMetric.lastStatus = "error";
    }
  }
}

/**
 * Get metrics for a specific combo
 * @param {string} comboName
 * @returns {Object|null}
 */
export function getComboMetrics(comboName: string): ComboMetricsView | null {
  const combo = metrics.get(comboName);
  if (!combo) return null;

  return {
    ...combo,
    avgLatencyMs:
      combo.totalRequests > 0 ? Math.round(combo.totalLatencyMs / combo.totalRequests) : 0,
    successRate:
      combo.totalRequests > 0 ? Math.round((combo.totalSuccesses / combo.totalRequests) * 100) : 0,
    fallbackRate:
      combo.totalRequests > 0 ? Math.round((combo.totalFallbacks / combo.totalRequests) * 100) : 0,
    intentCounts: { ...combo.intentCounts },
    byModel: Object.fromEntries(
      Object.entries(combo.byModel).map(([model, m]) => [
        model,
        {
          ...m,
          avgLatencyMs: m.requests > 0 ? Math.round(m.totalLatencyMs / m.requests) : 0,
          successRate: m.requests > 0 ? Math.round((m.successes / m.requests) * 100) : 0,
        },
      ])
    ),
  };
}

/**
 * Get metrics for all combos
 * @returns {Object} Map of comboName → metrics
 */
export function getAllComboMetrics(): Record<string, ComboMetricsView | null> {
  const result: Record<string, ComboMetricsView | null> = {};
  for (const [name] of metrics) {
    result[name] = getComboMetrics(name);
  }
  return result;
}

/**
 * Record detected prompt intent for a combo (used by multilingual routing analytics).
 */
export function recordComboIntent(comboName: string, intent: string): void {
  if (!metrics.has(comboName)) {
    metrics.set(comboName, {
      totalRequests: 0,
      totalSuccesses: 0,
      totalFailures: 0,
      totalFallbacks: 0,
      totalLatencyMs: 0,
      strategy: "priority",
      lastUsedAt: null,
      intentCounts: {},
      byModel: {},
    });
  }

  const combo = metrics.get(comboName);
  if (!combo) return;
  const key = String(intent || "unknown");
  combo.intentCounts[key] = (combo.intentCounts[key] || 0) + 1;
}

/**
 * Reset metrics for a specific combo
 */
export function resetComboMetrics(comboName: string): void {
  metrics.delete(comboName);
}

/**
 * Reset all combo metrics
 */
export function resetAllComboMetrics(): void {
  metrics.clear();
}
