/**
 * Local Provider Health Check
 *
 * Background polling of local provider_nodes (localhost) to detect
 * when they are up or down. Uses GET /models with a 5s timeout.
 *
 * Health status is stored in-memory (no DB migration needed).
 * Backoff schedule: 30s → 60s → 120s → 300s max on consecutive failures.
 * Resets to 30s on first success after failure.
 *
 * Uses Promise.allSettled so one slow/down node doesn't block others.
 */

import { getProviderNodes } from "@/lib/localDb";

// ── Types ────────────────────────────────────────────────────────────────

export interface HealthStatus {
  nodeId: string;
  prefix: string;
  isHealthy: boolean;
  lastCheck: Date;
  lastError?: string;
  consecutiveFailures: number;
  responseTimeMs?: number;
}

// ── Config ───────────────────────────────────────────────────────────────

const BACKOFF_SCHEDULE = [30_000, 60_000, 120_000, 300_000];
const CHECK_TIMEOUT_MS = 5_000;
const INITIAL_DELAY_MS = 15_000; // Wait for server boot before first sweep
const LOG_PREFIX = "[LocalHealthCheck]";

// ── State ────────────────────────────────────────────────────────────────

const healthCache = new Map<string, HealthStatus>();
let initialized = false;
let sweepTimer: ReturnType<typeof setTimeout> | null = null;

// ── Helpers ──────────────────────────────────────────────────────────────

function isLocalhostUrl(baseUrl: string): boolean {
  try {
    const u = new URL(baseUrl);
    // Block credentials in URL to prevent SSRF via user@host (e.g., http://localhost@evil.com)
    if (u.username || u.password) return false;
    // Note: URL.hostname returns "[::1]" WITH brackets for IPv6 — both forms checked.
    // Verified: node -e "new URL('http://[::1]:8080').hostname" → "[::1]"
    return (
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1" ||
      u.hostname === "::1" ||
      u.hostname === "[::1]"
    );
  } catch {
    return false;
  }
}

function getNextInterval(failures: number): number {
  return BACKOFF_SCHEDULE[Math.min(failures, BACKOFF_SCHEDULE.length - 1)];
}

// ── Core ─────────────────────────────────────────────────────────────────

async function checkNode(node: {
  id: string;
  prefix: string;
  baseUrl: string;
}): Promise<HealthStatus> {
  const url = `${node.baseUrl.replace(/\/+$/, "")}/models`;
  const start = Date.now();
  const prev = healthCache.get(node.id);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(CHECK_TIMEOUT_MS) });
    // Consume/cancel response body to free resources
    res.body?.cancel().catch(() => {});
    const isHealthy = res.ok || res.status === 401; // 401 = server up but auth required
    return {
      nodeId: node.id,
      prefix: node.prefix,
      isHealthy,
      lastCheck: new Date(),
      consecutiveFailures: isHealthy ? 0 : (prev?.consecutiveFailures ?? 0) + 1,
      responseTimeMs: Date.now() - start,
      lastError: isHealthy ? undefined : `HTTP ${res.status}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Connection failed";
    return {
      nodeId: node.id,
      prefix: node.prefix,
      isHealthy: false,
      lastCheck: new Date(),
      consecutiveFailures: (prev?.consecutiveFailures ?? 0) + 1,
      responseTimeMs: Date.now() - start,
      lastError: message,
    };
  }
}

let sweepInProgress = false;

/** Single sweep: check all local provider_nodes in parallel. */
export async function sweep(): Promise<void> {
  if (sweepInProgress) return; // Prevent concurrent sweeps
  sweepInProgress = true;

  try {
    let nodes: Array<{ id: string; prefix: string; baseUrl: string }>;
    try {
      const raw = await getProviderNodes();
      nodes = (Array.isArray(raw) ? raw : []).filter(
        (n: Record<string, unknown>) =>
          typeof n.baseUrl === "string" && isLocalhostUrl(n.baseUrl as string)
      ) as Array<{ id: string; prefix: string; baseUrl: string }>;
    } catch (err) {
      console.error(LOG_PREFIX, "Failed to load provider_nodes:", err);
      return;
    }

    // Prune stale entries for deleted nodes
    const currentNodeIds = new Set(nodes.map((n) => n.id));
    for (const key of healthCache.keys()) {
      if (!currentNodeIds.has(key)) healthCache.delete(key);
    }

    if (nodes.length === 0) return;

    const results = await Promise.allSettled(nodes.map((node) => checkNode(node)));

    for (const result of results) {
      if (result.status === "fulfilled") {
        const status = result.value;
        const prev = healthCache.get(status.nodeId);

        // Log state transitions
        if (prev && prev.isHealthy !== status.isHealthy) {
          const emoji = status.isHealthy ? "✅" : "❌";
          console.log(
            LOG_PREFIX,
            `${emoji} ${status.prefix} is now ${status.isHealthy ? "healthy" : "unhealthy"}${status.lastError ? ` (${status.lastError})` : ""} [${status.responseTimeMs}ms]`
          );
        }

        healthCache.set(status.nodeId, status);
      }
    }
  } finally {
    sweepInProgress = false;
    // Schedule next sweep with backoff based on worst-case failure count
    scheduleSweep();
  }
}

function scheduleSweep(): void {
  if (!initialized) return; // Don't schedule if stopped
  if (sweepTimer) clearTimeout(sweepTimer);

  // Use the maximum consecutive failures across all nodes to determine interval
  let maxFailures = 0;
  for (const status of healthCache.values()) {
    if (status.consecutiveFailures > maxFailures) {
      maxFailures = status.consecutiveFailures;
    }
  }

  const interval = getNextInterval(maxFailures);
  sweepTimer = setTimeout(sweep, interval);
}

// ── Public API ───────────────────────────────────────────────────────────

/** Get health status for a specific provider_node. */
export function getHealthStatus(nodeId: string): HealthStatus | undefined {
  return healthCache.get(nodeId);
}

/** Check if a provider_node is healthy. Returns true if never checked (optimistic). */
export function isNodeHealthy(nodeId: string): boolean {
  const status = healthCache.get(nodeId);
  return status?.isHealthy ?? true;
}

/** Get all health statuses (for monitoring API). */
export function getAllHealthStatuses(): Record<string, HealthStatus> {
  return Object.fromEntries(healthCache);
}

/** Start the health check scheduler (idempotent). */
export function initLocalHealthCheck(): void {
  if (initialized) return;
  initialized = true;

  console.log(
    LOG_PREFIX,
    `Starting local provider health check (initial delay ${INITIAL_DELAY_MS / 1000}s)`
  );

  // Delay first sweep to let the server finish booting
  sweepTimer = setTimeout(() => {
    sweep().catch((err) => console.error(LOG_PREFIX, "Initial sweep failed:", err));
  }, INITIAL_DELAY_MS);
}

/** Stop the scheduler (for tests / hot-reload). */
export function stopLocalHealthCheck(): void {
  if (sweepTimer) {
    clearTimeout(sweepTimer);
    sweepTimer = null;
  }
  initialized = false;
}

// Auto-initialize on first import (same pattern as tokenHealthCheck.ts:272)
initLocalHealthCheck();
