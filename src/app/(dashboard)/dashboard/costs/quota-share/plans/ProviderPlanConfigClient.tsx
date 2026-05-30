"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { knownProviders, getKnownPlan } from "@/lib/quota/planRegistry";
import type { QuotaDimension, QuotaUnit, QuotaWindow } from "@/lib/quota/dimensions";

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

interface Connection {
  id: string;
  provider: string;
  name?: string;
  displayName?: string;
  email?: string;
}

interface ProviderPlanOverride {
  connectionId: string;
  provider: string;
  dimensions: QuotaDimension[];
  source: "auto" | "manual";
}

// ────────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────────

const UNIT_OPTIONS: QuotaUnit[] = ["percent", "requests", "tokens", "usd"];
const WINDOW_OPTIONS: QuotaWindow[] = ["5h", "hourly", "daily", "weekly", "monthly"];

// ────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────

export default function ProviderPlanConfigClient() {
  const t = useTranslations("quotaPlans");

  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState("");
  const [overrides, setOverrides] = useState<Record<string, ProviderPlanOverride>>({});
  const [editDimensions, setEditDimensions] = useState<QuotaDimension[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reverting, setReverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // ── Load connections and existing overrides ───────────────────────────────

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/providers/client")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch("/api/quota/plans")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([connsData, plansData]) => {
        const conns: Connection[] = Array.isArray(connsData?.connections)
          ? connsData.connections
          : [];
        setConnections(conns);

        if (Array.isArray(plansData)) {
          const map: Record<string, ProviderPlanOverride> = {};
          for (const p of plansData as ProviderPlanOverride[]) {
            if (p.connectionId) map[p.connectionId] = p;
          }
          setOverrides(map);
        }
      })
      .catch(() => {
        setError("Failed to load data");
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Derived: selected connection and plan info ────────────────────────────

  const selectedConn = connections.find((c) => c.id === selectedConnectionId);
  const selectedProvider = selectedConn?.provider || "";

  const existingOverride = selectedConnectionId ? overrides[selectedConnectionId] : undefined;
  const catalogPlan = selectedProvider ? getKnownPlan(selectedProvider) : null;

  const detectedSource = existingOverride?.source || (catalogPlan ? "auto" : null);

  const connLabel = (c: Connection) =>
    `${c.provider} / ${c.name || c.email || c.displayName || c.id.slice(0, 12)}`;

  // ── When connection changes, populate edit dimensions ─────────────────────

  useEffect(() => {
    if (!selectedConnectionId) {
      setEditDimensions([]);
      return;
    }
    // Priority: manual override > catalog
    if (existingOverride && existingOverride.source === "manual") {
      setEditDimensions(existingOverride.dimensions);
    } else if (catalogPlan) {
      setEditDimensions([...catalogPlan.dimensions]);
    } else {
      setEditDimensions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConnectionId]);

  // ── Dimension editors ─────────────────────────────────────────────────────

  const addDimension = () => {
    setEditDimensions((prev) => [...prev, { unit: "percent", window: "daily", limit: 100 }]);
  };

  const removeDimension = (i: number) => {
    setEditDimensions((prev) => prev.filter((_, idx) => idx !== i));
  };

  const updateDimension = (i: number, patch: Partial<QuotaDimension>) => {
    setEditDimensions((prev) => prev.map((d, idx) => (idx === i ? { ...d, ...patch } : d)));
  };

  // ── Save override ─────────────────────────────────────────────────────────

  const handleSaveOverride = useCallback(async () => {
    if (!selectedConnectionId) return;
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch(`/api/quota/plans/${selectedConnectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dimensions: editDimensions }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Refresh overrides
      const data = (await res.json()) as ProviderPlanOverride;
      setOverrides((prev) => ({ ...prev, [selectedConnectionId]: data }));
      setSuccessMsg(t("saveOverrideButton") + " — saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }, [selectedConnectionId, editDimensions, t]);

  // ── Revert to catalog ─────────────────────────────────────────────────────

  const handleRevertToCatalog = useCallback(async () => {
    if (!selectedConnectionId) return;
    setReverting(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch(`/api/quota/plans/${selectedConnectionId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOverrides((prev) => {
        const next = { ...prev };
        delete next[selectedConnectionId];
        return next;
      });
      // Reset edit dims to catalog
      if (catalogPlan) setEditDimensions([...catalogPlan.dimensions]);
      else setEditDimensions([]);
      setSuccessMsg(t("revertToCatalogButton") + " — reverted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Revert failed");
    } finally {
      setReverting(false);
    }
  }, [selectedConnectionId, catalogPlan, t]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-text-main flex items-center gap-2">
          <span className="material-symbols-outlined text-[24px] text-primary">fact_check</span>
          {t("title")}
        </h1>
        <p className="text-sm text-text-muted mt-0.5">{t("description")}</p>
      </div>

      {loading ? (
        <div className="text-text-muted text-sm py-10 text-center animate-pulse">Loading…</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
          {/* Left: connection selector */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
                {t("providerLabel")}
              </label>
              <select
                value={selectedConnectionId}
                onChange={(e) => setSelectedConnectionId(e.target.value)}
                className="w-full px-3 py-2 rounded border border-border bg-bg-base text-sm"
              >
                <option value="">— {t("providerLabel")} —</option>
                {connections.map((c) => (
                  <option key={c.id} value={c.id}>
                    {connLabel(c)}
                  </option>
                ))}
              </select>
            </div>

            {/* Catalog known plans */}
            <div className="rounded-lg border border-border/40 bg-bg-subtle/20 p-3">
              <div className="text-[10px] uppercase tracking-wide font-bold text-text-muted mb-2">
                {t("catalogTitle")}
              </div>
              <p className="text-[11px] text-text-muted mb-2">{t("catalogDescription")}</p>
              <div className="space-y-1.5">
                {knownProviders().map((prov) => {
                  const plan = getKnownPlan(prov);
                  if (!plan) return null;
                  return (
                    <div
                      key={prov}
                      className="flex items-start gap-2 text-[11px] rounded-md bg-bg-subtle/30 px-2 py-1.5"
                    >
                      <div className="w-4 h-4 mt-0.5 rounded-sm overflow-hidden shrink-0">
                        <ProviderIcon providerId={prov} size={16} type="color" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-text-main capitalize">{prov}</div>
                        {plan.dimensions.map((d, i) => (
                          <div key={i} className="text-text-muted">
                            {d.unit}/{d.window}: {d.limit}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: plan config */}
          {selectedConnectionId ? (
            <div className="flex flex-col gap-3">
              {/* Status badge */}
              <div className="flex items-center gap-2 text-xs">
                {selectedProvider && (
                  <div className="w-5 h-5 rounded-sm overflow-hidden">
                    <ProviderIcon providerId={selectedProvider} size={20} type="color" />
                  </div>
                )}
                <span className="font-semibold text-text-main">{connLabel(selectedConn!)}</span>
                {detectedSource === "auto" && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                    {t("detectedPlanLabel")} (auto)
                  </span>
                )}
                {detectedSource === "manual" && (
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold">
                    {t("manualPlanLabel")}
                  </span>
                )}
                {!detectedSource && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold">
                    {t("unconfiguredLabel")}
                  </span>
                )}
              </div>

              {/* Dimensions editor */}
              <div className="rounded-lg border border-border/40 bg-bg-subtle/10 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wide font-bold text-text-muted">
                    {t("dimensionLabel")}
                  </span>
                  <button
                    type="button"
                    onClick={addDimension}
                    className="text-[11px] text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    {t("addDimension")}
                  </button>
                </div>

                {editDimensions.length === 0 && (
                  <div className="text-[11px] text-text-muted italic py-3 text-center">
                    {t("unconfiguredLabel")} — {t("addDimension")}
                  </div>
                )}

                <div className="space-y-2">
                  {editDimensions.map((dim, i) => (
                    <div key={i} className="grid items-center gap-2" style={{ gridTemplateColumns: "1fr 1fr 90px 24px" }}>
                      <select
                        value={dim.unit}
                        onChange={(e) => updateDimension(i, { unit: e.target.value as QuotaUnit })}
                        className="px-2 py-1.5 rounded border border-border bg-bg-base text-xs"
                      >
                        {UNIT_OPTIONS.map((u) => (
                          <option key={u} value={u}>
                            {t(`unitOptions.${u}`)}
                          </option>
                        ))}
                      </select>
                      <select
                        value={dim.window}
                        onChange={(e) => updateDimension(i, { window: e.target.value as QuotaWindow })}
                        className="px-2 py-1.5 rounded border border-border bg-bg-base text-xs"
                      >
                        {WINDOW_OPTIONS.map((w) => (
                          <option key={w} value={w}>
                            {t(`windowOptions.${w}`)}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min={0}
                        value={dim.limit}
                        onChange={(e) => updateDimension(i, { limit: Number(e.target.value) })}
                        placeholder={t("limitLabel")}
                        className="px-2 py-1.5 rounded border border-border bg-bg-base text-xs tabular-nums text-right"
                      />
                      <button
                        type="button"
                        onClick={() => removeDimension(i)}
                        className="p-0.5 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error / success */}
              {error && (
                <p className="text-[11px] text-red-400 bg-red-500/10 px-3 py-2 rounded">{error}</p>
              )}
              {successMsg && (
                <p className="text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded">
                  {successMsg}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveOverride}
                  disabled={saving || editDimensions.length === 0}
                >
                  {saving ? "Saving…" : t("saveOverrideButton")}
                </Button>
                {existingOverride && existingOverride.source === "manual" && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleRevertToCatalog}
                    disabled={reverting}
                  >
                    {reverting ? "Reverting…" : t("revertToCatalogButton")}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-16 text-text-muted text-sm">
              {t("unknownProviderNotice")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
