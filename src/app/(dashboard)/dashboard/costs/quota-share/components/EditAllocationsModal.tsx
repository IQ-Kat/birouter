"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/components";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { maskEmailLikeValue } from "@/shared/utils/maskEmail";
import type { QuotaPool, PoolAllocation, Policy } from "@/lib/quota/dimensions";

interface ApiKey {
  id: string;
  name?: string;
}

interface EditAllocationsModalProps {
  pool: QuotaPool;
  apiKeys: ApiKey[];
  onClose: () => void;
  onSave: (allocations: PoolAllocation[]) => Promise<void>;
}

function shortId(id: string, max = 12) {
  return id.length > max ? `${id.slice(0, max)}…` : id;
}

const SLICE_PALETTE = [
  "#a78bfa",
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#22d3ee",
  "#f472b6",
  "#94a3b8",
];

export default function EditAllocationsModal({
  pool,
  apiKeys,
  onClose,
  onSave,
}: EditAllocationsModalProps) {
  const t = useTranslations("quotaShare");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const [drafts, setDrafts] = useState<PoolAllocation[]>(pool.allocations);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalWeight = drafts.reduce(
    (s, a) => s + (Number.isFinite(a.weight) ? a.weight : 0),
    0
  );

  const availableKeys = apiKeys.filter((k) => !drafts.some((a) => a.apiKeyId === k.id));

  const keyLabel = (id: string) => apiKeys.find((k) => k.id === id)?.name || shortId(id);

  const addKey = (id: string) => {
    setDrafts((prev) => {
      const next = [...prev, { apiKeyId: id, weight: 0, policy: "hard" as Policy }];
      // Equal-split: after adding, recompute weights so no key starts at 0.
      const n = next.length;
      const each = Math.floor(100 / n);
      const remainder = 100 - each * n;
      return next.map((a, i) => ({ ...a, weight: each + (i < remainder ? 1 : 0) }));
    });
  };

  const updateWeight = (id: string, value: number) => {
    setDrafts((prev) =>
      prev.map((a) =>
        a.apiKeyId === id ? { ...a, weight: Math.max(0, Math.min(100, value)) } : a
      )
    );
  };

  const updatePolicy = (id: string, policy: Policy) => {
    setDrafts((prev) => prev.map((a) => (a.apiKeyId === id ? { ...a, policy } : a)));
  };

  const updateCapValue = (id: string, capValue: number | undefined) => {
    setDrafts((prev) => prev.map((a) => (a.apiKeyId === id ? { ...a, capValue } : a)));
  };

  const removeKey = (id: string) => {
    setDrafts((prev) => prev.filter((a) => a.apiKeyId !== id));
  };

  const equalSplit = () => {
    if (drafts.length === 0) return;
    const each = Math.floor(100 / drafts.length);
    const remainder = 100 - each * drafts.length;
    setDrafts((prev) => prev.map((a, i) => ({ ...a, weight: each + (i < remainder ? 1 : 0) })));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave(drafts);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title={t("editTitle")} size="lg">
      <div className="space-y-3">
        <div className="text-xs text-text-muted">
          {t("pool")}: <strong className="text-text-main">{emailsVisible ? pool.name : maskEmailLikeValue(pool.name)}</strong>
        </div>

        {/* Group allocation note */}
        <p className="text-[11px] text-text-muted bg-bg-subtle/40 px-3 py-2 rounded border border-border/40">
          <span className="material-symbols-outlined text-[13px] align-middle mr-1 text-primary/70">info</span>
          {t("groupAllocationNote")}
        </p>

        {drafts.length === 0 ? (
          <div className="text-[12px] text-text-muted italic py-4 text-center bg-bg-subtle/40 rounded-md">
            {t("noKeysAdded")}
          </div>
        ) : (
          <div className="space-y-2">
            {drafts.map((a, i) => {
              const color = SLICE_PALETTE[i % SLICE_PALETTE.length];
              return (
                <div
                  key={a.apiKeyId}
                  className="grid items-center gap-2"
                  style={{ gridTemplateColumns: "12px minmax(0,1fr) 70px 80px 90px 24px" }}
                >
                  <span
                    className="inline-block w-3 h-3 rounded-sm"
                    style={{ background: color }}
                  />
                  <span className="text-[12px] font-mono truncate">{keyLabel(a.apiKeyId)}</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={a.weight}
                    onChange={(e) => updateWeight(a.apiKeyId, Number(e.target.value))}
                    className="px-2 py-1 rounded border border-border bg-bg-base text-sm text-right tabular-nums"
                    title="Weight %"
                  />
                  {/* Cap absolute */}
                  <input
                    type="number"
                    min={0}
                    value={a.capValue ?? ""}
                    onChange={(e) =>
                      updateCapValue(a.apiKeyId, e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder={t("policyCapAbsolutePlaceholder")}
                    className="px-2 py-1 rounded border border-border bg-bg-base text-xs tabular-nums"
                    title={t("policyCapAbsoluteLabel")}
                  />
                  {/* Policy per key */}
                  <select
                    value={a.policy}
                    onChange={(e) => updatePolicy(a.apiKeyId, e.target.value as Policy)}
                    className="px-1 py-1 rounded border border-border bg-bg-base text-xs"
                  >
                    <option value="hard">{t("policyHard")}</option>
                    <option value="soft">{t("policySoft")}</option>
                    <option value="burst">{t("policyBurst")}</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeKey(a.apiKeyId)}
                    className="p-0.5 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-border/40">
          <span
            className={`font-bold tabular-nums ${
              totalWeight === 100
                ? "text-emerald-400"
                : totalWeight > 100
                  ? "text-red-400"
                  : "text-amber-400"
            }`}
          >
            {t("totalLabel", { percent: totalWeight })}{" "}
            {totalWeight > 100 && t("totalExceeded")}
          </span>
          <div className="flex items-center gap-2">
            {availableKeys.length > 0 && (
              <select
                value=""
                onChange={(e) => e.target.value && addKey(e.target.value)}
                className="px-2 py-1 rounded border border-border bg-bg-base text-xs"
              >
                <option value="">{t("addKey")}</option>
                {availableKeys.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name || shortId(k.id)}
                  </option>
                ))}
              </select>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={equalSplit}
              disabled={drafts.length === 0}
            >
              {t("equalSplit")}
            </Button>
          </div>
        </div>

        {error && (
          <p className="text-[11px] text-red-400 bg-red-500/10 px-3 py-2 rounded">{error}</p>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={saving}>
            {t("cancel")}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={totalWeight > 100 || saving}
          >
            {saving ? t("loading") : t("save")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
