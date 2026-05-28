"use client";

import { useTranslations } from "next-intl";
import type { MemoryEngineStatus } from "@/shared/schemas/memory";

interface Props {
  status: MemoryEngineStatus;
}

type ChipColor = "green" | "gray" | "red";

function StatusChip({ color }: { color: ChipColor }) {
  const colorMap: Record<ChipColor, string> = {
    green: "bg-emerald-500",
    gray: "bg-border",
    red: "bg-red-500",
  };
  return (
    <span
      className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${colorMap[color]}`}
      aria-hidden="true"
    />
  );
}

export default function MemoryEngineStatus({ status }: Props) {
  const t = useTranslations("memory");

  const rows: Array<{ label: string; chip: ChipColor; reason: string; cta?: React.ReactNode }> = [
    {
      label: t("engine.keywordLabel"),
      chip: "green",
      reason: t("engine.keywordReason"),
    },
    {
      label: t("engine.embeddingLabel"),
      chip: status.embedding.available ? "green" : "gray",
      reason: status.embedding.reason,
    },
    {
      label: t("engine.vectorStoreLabel"),
      chip:
        status.vectorStore.available
          ? "green"
          : status.vectorStore.backend === "none"
            ? "gray"
            : "red",
      reason: status.vectorStore.reason,
      cta:
        status.vectorStore.needsReindex > 0 ? (
          <span className="text-xs text-amber-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">warning</span>
            {t("engine.needsReindex", { count: status.vectorStore.needsReindex })}
          </span>
        ) : undefined,
    },
    {
      label: t("engine.qdrantLabel"),
      chip: !status.qdrant.enabled ? "gray" : status.qdrant.healthy ? "green" : "red",
      reason: !status.qdrant.enabled
        ? t("engine.qdrantDisabled")
        : status.qdrant.healthy
          ? t("engine.qdrantOk", { latencyMs: status.qdrant.latencyMs ?? 0 })
          : (status.qdrant.error ?? t("engine.qdrantError")),
    },
    {
      label: t("engine.rerankLabel"),
      chip: !status.rerank.enabled ? "gray" : status.rerank.available ? "green" : "red",
      reason: status.rerank.reason,
    },
  ];

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-lg border border-border/60 bg-surface/30"
        >
          <StatusChip color={row.chip} />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-text-main">{row.label}</span>
            <p className="text-xs text-text-muted mt-0.5">{row.reason}</p>
            {row.cta && <div className="mt-1">{row.cta}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
