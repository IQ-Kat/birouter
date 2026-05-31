"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import type { QuotaPool, PoolAllocation } from "@/lib/quota/dimensions";

import { usePools } from "./hooks/usePools";
import { usePoolUsage } from "./hooks/usePoolUsage";
import { useLocalStoragePoolMigration } from "./hooks/useLocalStoragePoolMigration";
import { usePoolsUsageAggregate } from "./hooks/usePoolsUsageAggregate";
import QuotaConceptCard from "./components/QuotaConceptCard";
import PoolCard from "./components/PoolCard";
import PoolWizard from "./components/PoolWizard";
import EditAllocationsModal from "./components/EditAllocationsModal";

// ────────────────────────────────────────────────────────────────────────────
// Local types (display layer only)
// ────────────────────────────────────────────────────────────────────────────

interface Connection {
  id: string;
  provider: string;
  name?: string;
  displayName?: string;
  email?: string;
}

interface ApiKey {
  id: string;
  name?: string;
}

interface PlanDimension {
  unit: string;
  window: string;
  limit: number;
}

interface PlanInfo {
  dimensions: PlanDimension[];
  source: "auto" | "manual";
}

// ────────────────────────────────────────────────────────────────────────────
// Stat card helper
// ────────────────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "green" | "amber" | "red";
}) {
  const color =
    tone === "amber"
      ? "text-amber-400"
      : tone === "red"
        ? "text-red-400"
        : tone === "green"
          ? "text-emerald-400"
          : "text-text-main";
  return (
    <div className="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <div className="text-[10px] uppercase tracking-wide text-text-muted font-semibold">
        {label}
      </div>
      <div className={`text-2xl font-bold tabular-nums leading-tight ${color}`}>{value}</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Per-pool wrapper that fetches usage
// ────────────────────────────────────────────────────────────────────────────

function PoolCardWithUsage({
  pool,
  keyLabels,
  connectionLabel,
  provider,
  providers,
  onEdit,
  onRemove,
}: {
  pool: QuotaPool;
  keyLabels: Record<string, string>;
  connectionLabel: string;
  provider: string;
  providers?: string[];
  onEdit: () => void;
  onRemove: () => void;
}) {
  const { usage } = usePoolUsage(pool.id);
  return (
    <PoolCard
      pool={pool}
      usage={usage}
      keyLabels={keyLabels}
      connectionLabel={connectionLabel}
      provider={provider}
      providers={providers}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────────────

export default function QuotaSharePageClient() {
  const t = useTranslations("quotaShare");
  const { pools, loading, mutate } = usePools();

  // LS → DB migration hook (B22) — runs once, idempotent
  useLocalStoragePoolMigration({ pools, mutate });

  const [connections, setConnections] = useState<Connection[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [plans, setPlans] = useState<Record<string, PlanInfo>>({});
  const [, setSideLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<QuotaPool | null>(null);

  // ── Fetch side data once on mount ─────────────────────────────────────────

  useMemo(() => {
    setSideLoading(true);
    Promise.all([
      fetch("/api/providers/client")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch("/api/keys")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch("/api/quota/plans")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([connsData, keysData, plansData]) => {
        const conns: Connection[] = Array.isArray(connsData?.connections)
          ? connsData.connections
          : [];
        const keys: ApiKey[] = Array.isArray(keysData) ? keysData : keysData?.keys || [];
        setConnections(conns);
        setApiKeys(keys);

        if (Array.isArray(plansData)) {
          const planMap: Record<string, PlanInfo> = {};
          for (const p of plansData as Array<{
            connectionId: string;
            dimensions: PlanDimension[];
            source: "auto" | "manual";
          }>) {
            if (p.connectionId) planMap[p.connectionId] = { dimensions: p.dimensions, source: p.source };
          }
          setPlans(planMap);
        }
      })
      .catch(() => {
        // fail open — side data not critical
      })
      .finally(() => {
        setSideLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Derived ──────────────────────────────────────────────────────────────

  const keyLabels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const k of apiKeys) map[k.id] = k.name || k.id.slice(0, 12) + "…";
    return map;
  }, [apiKeys]);

  const connLabel = useCallback(
    (connectionId: string) => {
      const conn = connections.find((c) => c.id === connectionId);
      if (!conn) return connectionId.slice(0, 12);
      return conn.name || conn.email || conn.displayName || conn.id.slice(0, 12);
    },
    [connections]
  );

  const connProvider = useCallback(
    (connectionId: string) => connections.find((c) => c.id === connectionId)?.provider || "unknown",
    [connections]
  );

  const aggregate = usePoolsUsageAggregate(pools);

  const stats = useMemo(
    () => ({
      activePools: pools.length,
      keysAllocated: pools.reduce((s, p) => s + p.allocations.length, 0),
      avgUtilization: aggregate.avgUtilizationPercent,
      borrowingNow: aggregate.borrowingKeyCount,
    }),
    [pools, aggregate]
  );

  // ── Mutations ─────────────────────────────────────────────────────────────

  const handleSaveAllocations = useCallback(
    async (pool: QuotaPool, allocations: PoolAllocation[]) => {
      await fetch(`/api/quota/pools/${pool.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allocations }),
      });
      await mutate();
    },
    [mutate]
  );

  const handleRemovePool = useCallback(
    async (id: string) => {
      if (!confirm(t("removeConfirm"))) return;
      await fetch(`/api/quota/pools/${id}`, { method: "DELETE" });
      await mutate();
    },
    [mutate, t]
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary">pie_chart</span>
            {t("title")}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">{t("description")}</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setCreateOpen(true)}>
          <span className="material-symbols-outlined text-[14px] mr-1">add</span>
          {t("newPool")}
        </Button>
      </div>

      {/* Concept card */}
      <QuotaConceptCard />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={t("kpiActivePools")} value={String(stats.activePools)} />
        <StatCard label={t("kpiKeysAllocated")} value={String(stats.keysAllocated)} />
        <StatCard
          label={t("kpiAvgUtilization")}
          value={`${Math.round(stats.avgUtilization)}%`}
          tone={stats.avgUtilization > 80 ? "red" : stats.avgUtilization > 50 ? "amber" : "green"}
        />
        <StatCard
          label={t("kpiBorrowingNow")}
          value={String(stats.borrowingNow)}
          tone={stats.borrowingNow > 0 ? "amber" : undefined}
        />
      </div>

      {/* Pool list */}
      {loading ? (
        <div className="text-text-muted text-sm py-10 text-center animate-pulse">
          {t("loading")}
        </div>
      ) : pools.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface py-16 text-center">
          <span className="material-symbols-outlined text-[64px] opacity-15">pie_chart</span>
          <h3 className="mt-3 text-base font-semibold text-text-main">{t("emptyTitle")}</h3>
          <p className="mt-1 text-sm text-text-muted max-w-md mx-auto">{t("emptyDescription")}</p>
          <Button variant="primary" size="sm" className="mt-4" onClick={() => setCreateOpen(true)}>
            <span className="material-symbols-outlined text-[14px] mr-1">add</span>
            {t("newPool")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {pools.map((pool) => (
            <PoolCardWithUsage
              key={pool.id}
              pool={pool}
              keyLabels={keyLabels}
              connectionLabel={connLabel(pool.connectionId)}
              provider={connProvider(pool.connectionId)}
              providers={[...new Set((pool.connectionIds ?? [pool.connectionId]).map(connProvider))]}
              onEdit={() => setEditing(pool)}
              onRemove={() => void handleRemovePool(pool.id)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <PoolWizard
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={() => void mutate()}
        connections={connections}
        apiKeys={apiKeys}
        plans={plans}
        existingPoolConnectionIds={new Set(pools.map((p) => p.connectionId))}
      />

      {editing && (
        <EditAllocationsModal
          pool={editing}
          apiKeys={apiKeys}
          onClose={() => setEditing(null)}
          onSave={(allocations) => handleSaveAllocations(editing, allocations)}
        />
      )}
    </div>
  );
}
