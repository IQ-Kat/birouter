/**
 * Dashboard Auto-Combo Panel — /dashboard/auto-combo
 *
 * Shows provider scores, scoring factors, exclusions, mode packs, and routing history.
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { Card } from "@/shared/components";

interface ProviderScore {
  provider: string;
  model: string;
  score: number;
  factors: Record<string, number>;
}

interface ExclusionEntry {
  provider: string;
  excludedAt: string;
  cooldownMs: number;
  reason: string;
}

type AutoComboRecord = {
  candidatePool?: unknown;
  weights?: unknown;
};

type HealthRecord = {
  providerHealth?: Record<string, { state?: string; lastFailure?: string | null }>;
  circuitBreakers?: Array<{
    provider?: string;
    name?: string;
    state?: string;
    lastFailure?: string | null;
  }>;
};

export default function AutoComboDashboard() {
  const [scores, setScores] = useState<ProviderScore[]>([]);
  const [exclusions, setExclusions] = useState<ExclusionEntry[]>([]);
  const [incidentMode, setIncidentMode] = useState(false);
  const [modePack, setModePack] = useState("ship-fast");

  const fetchData = useCallback(async () => {
    try {
      const [combosRes, healthRes] = await Promise.allSettled([
        fetch("/api/combos/auto"),
        fetch("/api/monitoring/health"),
      ]);

      if (combosRes.status === "fulfilled") {
        const comboPayload = await combosRes.value.json();
        const combos = Array.isArray(comboPayload?.combos)
          ? (comboPayload.combos as AutoComboRecord[])
          : [];
        const firstCombo = combos[0] || null;
        const candidatePool = Array.isArray(firstCombo?.candidatePool)
          ? firstCombo.candidatePool.filter((entry): entry is string => typeof entry === "string")
          : [];
        const rawWeights =
          firstCombo?.weights &&
          typeof firstCombo.weights === "object" &&
          !Array.isArray(firstCombo.weights)
            ? (firstCombo.weights as Record<string, unknown>)
            : {};
        const factors = Object.fromEntries(
          Object.entries(rawWeights).map(([k, v]) => [k, typeof v === "number" ? v : 0])
        );
        const baseScore = candidatePool.length > 0 ? 1 / candidatePool.length : 0;
        setScores(
          candidatePool.map((provider) => ({
            provider,
            model: "auto",
            score: baseScore,
            factors,
          }))
        );
      } else {
        setScores([]);
      }

      if (healthRes.status === "fulfilled") {
        const health = (await healthRes.value.json()) as HealthRecord;
        const providerHealth =
          health?.providerHealth && typeof health.providerHealth === "object"
            ? health.providerHealth
            : {};
        const breakersFromProviderHealth = Object.entries(providerHealth).map(
          ([provider, status]) => ({
            provider,
            state: status?.state || "CLOSED",
            lastFailure: status?.lastFailure || null,
          })
        );
        const breakersFromArray = Array.isArray(health?.circuitBreakers)
          ? health.circuitBreakers
          : [];
        const breakers =
          breakersFromArray.length > 0
            ? breakersFromArray.map((breaker) => ({
                provider: breaker.provider || breaker.name || "unknown",
                state: breaker.state || "CLOSED",
                lastFailure: breaker.lastFailure || null,
              }))
            : breakersFromProviderHealth;

        const openBreakers = breakers.filter((breaker) => breaker.state === "OPEN");
        setIncidentMode(openBreakers.length / Math.max(breakers.length, 1) > 0.5);
        setExclusions(
          openBreakers.map((breaker) => ({
            provider: breaker.provider,
            excludedAt: breaker.lastFailure || new Date().toISOString(),
            cooldownMs: 5 * 60 * 1000,
            reason: "Circuit breaker OPEN",
          }))
        );
      } else {
        setIncidentMode(false);
        setExclusions([]);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(fetchData, 0);
    const interval = setInterval(fetchData, 30_000);
    return () => {
      clearTimeout(id);
      clearInterval(interval);
    };
  }, [fetchData]);

  const FACTOR_LABELS: Record<string, string> = {
    quota: "📊 Quota",
    health: "💚 Health",
    costInv: "💰 Cost",
    latencyInv: "⚡ Latency",
    taskFit: "🎯 Task Fit",
    stability: "📈 Stability",
    tierPriority: "🏷️ Tier",
  };

  const MODE_PACKS = [
    { id: "ship-fast", label: "🚀 Ship Fast" },
    { id: "cost-saver", label: "💰 Cost Saver" },
    { id: "quality-first", label: "🎯 Quality First" },
    { id: "offline-friendly", label: "📡 Offline Friendly" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">⚡ Auto-Combo Engine</h1>
          <p className="text-sm text-text-muted mt-1">
            Smart routing automatically adapting to latency, health, and throughput
          </p>
        </div>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Status Overview</h2>
            <div className="flex flex-col gap-3">
              <div
                className={`p-4 rounded-lg border flex items-center justify-between ${
                  incidentMode
                    ? "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300"
                    : "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">
                    {incidentMode ? "warning" : "check_circle"}
                  </span>
                  <div>
                    <h3 className="font-semibold">
                      {incidentMode ? "Incident Mode" : "Normal Operation"}
                    </h3>
                    <p className="text-sm opacity-80">
                      {incidentMode
                        ? "High circuit breaker trip rate detected"
                        : "All providers reporting healthy metrics"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border/50 bg-surface/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px] text-blue-500">tune</span>
                  <div>
                    <h3 className="font-semibold">Active Mode Pack</h3>
                    <p className="text-sm text-text-muted">
                      {MODE_PACKS.find((m) => m.id === modePack)?.label || modePack}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Mode Pack</h2>
            <div className="grid grid-cols-2 gap-2">
              {MODE_PACKS.map((mp) => (
                <button
                  key={mp.id}
                  onClick={() => setModePack(mp.id)}
                  className={`flex flex-col items-start p-3 rounded-lg border transition-all ${
                    modePack === mp.id
                      ? "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20"
                      : "border-border/50 hover:border-border hover:bg-surface/30"
                  }`}
                >
                  <span className={`font-medium ${modePack === mp.id ? "text-blue-500" : ""}`}>
                    {mp.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                leaderboard
              </span>
            </div>
            <h3 className="text-lg font-semibold">Provider Scores</h3>
          </div>

          {scores.length === 0 ? (
            <p className="text-sm text-text-muted py-4">
              No auto-combo configured or data loading... Create one via{" "}
              <code>POST /api/combos/auto</code>.
            </p>
          ) : (
            <div className="space-y-3">
              {scores.map((s) => (
                <div
                  key={s.provider}
                  className="p-3 bg-surface/30 rounded-lg border border-border/50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">
                      {s.provider} / {s.model}
                    </span>
                    <span className="font-bold text-lg text-blue-500">
                      {(s.score * 100).toFixed(0)}%
                    </span>
                  </div>
                  {/* Score Bar */}
                  <div className="h-1.5 bg-border/50 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${s.score * 100}%` }}
                    />
                  </div>
                  {/* Factor Breakdown */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-text-muted">
                    {Object.entries(s.factors || {}).map(([key, val]) => (
                      <div
                        key={key}
                        className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-border/30"
                      >
                        {FACTOR_LABELS[key] || key}:{" "}
                        <span className="font-medium text-text-main">
                          {((val as number) * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                block
              </span>
            </div>
            <h3 className="text-lg font-semibold">Excluded Providers</h3>
          </div>

          {exclusions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-text-muted">
              <span className="material-symbols-outlined text-[32px] mb-2 text-border">
                verified
              </span>
              <p className="text-sm">No providers currently excluded.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {exclusions.map((e) => (
                <div
                  key={e.provider}
                  className="p-3 bg-red-500/5 rounded-lg border border-red-500/20"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-red-600 dark:text-red-400">
                        {e.provider}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 font-medium">
                      Cooldown: {Math.round(e.cooldownMs / 60000)}m
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">info</span>
                    {e.reason}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
