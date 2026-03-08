/**
 * quotaMonitor.ts — Feature 06
 * Monitoramento de Quota em Sessão Ativa
 *
 * Toggle: providerSpecificData.quotaMonitorEnabled (default: false)
 * Polling adaptativo: NORMAL (60s) → CRITICAL (15s) → EXHAUSTED
 * timer.unref() garante que o processo pode fechar normalmente.
 * Alertas deduplicados por sessão (janela de 5min).
 */

import { registerQuotaFetcher, type QuotaFetcher } from "./quotaPreflight.ts";

export { registerQuotaFetcher };
export type { QuotaFetcher };

const NORMAL_INTERVAL_MS = 60_000;
const CRITICAL_INTERVAL_MS = 15_000;
const WARN_THRESHOLD = 0.8;
const EXHAUSTION_THRESHOLD = 0.95;
const ALERT_SUPPRESS_WINDOW_MS = 5 * 60_000;

interface MonitorState {
  timer: ReturnType<typeof setTimeout> | null;
  stopped: boolean;
  provider: string;
  accountId: string;
}

const activeMonitors = new Map<string, MonitorState>();
const alertSuppression = new Map<string, number>();
// Registry mirror from quotaPreflight (same Map reference via re-export)
const quotaFetcherRegistry = new Map<string, QuotaFetcher>();
export function registerMonitorFetcher(provider: string, fetcher: QuotaFetcher): void {
  quotaFetcherRegistry.set(provider, fetcher);
  registerQuotaFetcher(provider, fetcher);
}

export function isQuotaMonitorEnabled(connection: Record<string, unknown>): boolean {
  const psd = connection?.providerSpecificData as Record<string, unknown> | undefined;
  return psd?.quotaMonitorEnabled === true;
}

function suppressedAlert(
  sessionId: string,
  provider: string,
  accountId: string,
  percentUsed: number
): void {
  const key = `${sessionId}:${provider}:${accountId}`;
  const last = alertSuppression.get(key) ?? 0;
  if (Date.now() - last < ALERT_SUPPRESS_WINDOW_MS) return;
  alertSuppression.set(key, Date.now());
  console.warn(
    `[QuotaMonitor] session=${sessionId} ${provider}/${accountId}: ${(percentUsed * 100).toFixed(1)}% quota used`
  );
}

function scheduleNextPoll(sessionId: string, intervalMs: number): void {
  const state = activeMonitors.get(sessionId);
  if (!state || state.stopped) return;

  const { provider, accountId } = state;
  const timer = setTimeout(async () => {
    const current = activeMonitors.get(sessionId);
    if (!current || current.stopped) return;

    try {
      const fetcher = quotaFetcherRegistry.get(provider);
      if (!fetcher) {
        scheduleNextPoll(sessionId, NORMAL_INTERVAL_MS);
        return;
      }
      const quota = await fetcher(accountId);
      const percentUsed = quota?.percentUsed ?? 0;

      if (percentUsed >= EXHAUSTION_THRESHOLD) {
        suppressedAlert(sessionId, provider, accountId, percentUsed);
        console.info(
          `[QuotaMonitor] session=${sessionId}: marking ${accountId} for next-session cooldown`
        );
        scheduleNextPoll(sessionId, CRITICAL_INTERVAL_MS);
      } else if (percentUsed >= WARN_THRESHOLD) {
        suppressedAlert(sessionId, provider, accountId, percentUsed);
        scheduleNextPoll(sessionId, CRITICAL_INTERVAL_MS);
      } else {
        scheduleNextPoll(sessionId, NORMAL_INTERVAL_MS);
      }
    } catch {
      scheduleNextPoll(sessionId, NORMAL_INTERVAL_MS);
    }
  }, intervalMs);

  if (typeof timer.unref === "function") timer.unref();
  state.timer = timer;
}

export function startQuotaMonitor(
  sessionId: string,
  provider: string,
  accountId: string,
  connection: Record<string, unknown>
): void {
  if (!isQuotaMonitorEnabled(connection)) return;
  if (activeMonitors.has(sessionId)) return;

  activeMonitors.set(sessionId, { timer: null, stopped: false, provider, accountId });
  scheduleNextPoll(sessionId, NORMAL_INTERVAL_MS);
}

export function stopQuotaMonitor(sessionId: string): void {
  const state = activeMonitors.get(sessionId);
  if (!state) return;
  state.stopped = true;
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
  activeMonitors.delete(sessionId);
  for (const key of alertSuppression.keys()) {
    if (key.startsWith(`${sessionId}:`)) alertSuppression.delete(key);
  }
}

export function getActiveMonitorCount(): number {
  return activeMonitors.size;
}
