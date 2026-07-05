"use client";
import { useState } from "react";
import { usePreviewCompression, type Lane, type PreviewBatch } from "@/hooks/usePreviewCompression";
import { WaterfallInspector } from "./WaterfallInspector";
import { DiffPane } from "./DiffPane";
import { EncoderComparisonTable } from "./EncoderComparisonTable";
import { PlaygroundInput, LANE_ENGINES } from "./PlaygroundInput";
import { RiskGateBadge } from "./RiskGateBadge";
import { QuantumLockBadge } from "./QuantumLockBadge";
import { SaliencyHeatmap } from "./SaliencyHeatmap";
export interface PlayViewProps {
  text: string;
  onText: (t: string) => void;
  laneEngines?: readonly string[];
}

function laneStatus(l: Lane): string {
  const rejected = l.run?.steps?.find((s) => s.rejected);
  if (rejected) return `⚠ rejeitado: ${rejected.rejectReason ?? ""}`;
  return l.error ? "⚠ erro" : l.run ? `−${l.run.savingsPercent}%` : "—";
}

function resolveActiveDiff(batch: PreviewBatch | null, selectedLane: string | null) {
  const run = batch?.lanes.find((l) => l.engine === selectedLane)?.run ?? null;
  return run?.diff ?? batch?.combined?.diff ?? null;
}

function LaneList({
  lanes,
  onSelect,
  selectedLane,
}: {
  lanes: Lane[];
  onSelect: (e: string) => void;
  selectedLane: string | null;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {lanes.map((l) => {
        const isSelected = l.engine === selectedLane;
        return (
          <button
            key={l.engine}
            data-testid="play-lane"
            onClick={() => onSelect(l.engine)}
            className={`flex items-center justify-between border p-2.5 rounded-lg text-left font-mono text-xs transition-all ${
              isSelected
                ? "bg-primary/10 border-primary/50 text-primary-light shadow-sm"
                : "bg-surface border-border/40 hover:border-primary/20 hover:bg-surface-hover text-text-main"
            }`}
          >
            <span className="font-semibold">{l.engine}</span>
            <span className="text-text-muted text-[10px] font-sans font-medium">
              {laneStatus(l)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function PlayView({ text, onText, laneEngines = LANE_ENGINES }: PlayViewProps) {
  const [active, setActive] = useState<string[]>(["rtk", "caveman"]);
  const [fuzzyDedup, setFuzzyDedup] = useState(false);
  const [selectedLane, setSelectedLane] = useState<string | null>(null);
  const [fidelityGate, setFidelityGate] = useState(false);
  const [riskGate, setRiskGate] = useState(false);
  const [quantumLock, setQuantumLock] = useState(false);
  const [heatmapMode, setHeatmapMode] = useState<"ultra" | "universal" | false>(false);
  const { batch, loading, run } = usePreviewCompression();
  const messages = [{ role: "user", content: text }];
  const toggle = (e: string) =>
    setActive((a) => (a.includes(e) ? a.filter((x) => x !== e) : [...a, e]));
  const toggleHeatmap = () =>
    setHeatmapMode((m) => {
      if (!m) return "ultra";
      if (m === "ultra") return "universal";
      return false;
    });
  const onRun = () =>
    run({
      messages,
      laneEngines: [...laneEngines],
      activeEngines: orderByStack(active, laneEngines),
      fidelityGate,
      fuzzyDedup,
      riskGate,
      quantumLock,
      ...(heatmapMode ? { heatmap: heatmapMode } : {}),
    });
  const activeDiff = resolveActiveDiff(batch, selectedLane);
  return (
    <div className="flex h-full gap-3">
      <div className="w-[260px] shrink-0">
        <PlaygroundInput
          text={text}
          onText={onText}
          active={active}
          onToggleActive={toggle}
          onRun={onRun}
          loading={loading}
          fidelityGate={fidelityGate}
          onToggleFidelity={() => setFidelityGate((v) => !v)}
          fuzzyDedup={fuzzyDedup}
          onToggleFuzzy={() => setFuzzyDedup((v) => !v)}
          riskGate={riskGate}
          onToggleRisk={() => setRiskGate((v) => !v)}
          quantumLock={quantumLock}
          onToggleQuantum={() => setQuantumLock((v) => !v)}
          heatmap={heatmapMode}
          onToggleHeatmap={toggleHeatmap}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-auto pl-1">
        {batch?.combined && (
          <section
            data-testid="play-combined"
            className="border border-border/40 bg-surface/20 p-4 rounded-xl flex flex-col gap-3"
          >
            <header className="text-sm font-semibold text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">
                dynamic_feed
              </span>
              Combined Pipeline Flow —{" "}
              <span className="font-mono text-xs font-normal text-text-muted">
                {active.join(" → ")}
              </span>
              <QuantumLockBadge stats={batch.combined.quantumLock} />
            </header>
            <WaterfallInspector run={batch.combined} />
            <RiskGateBadge stats={batch?.riskGate ?? null} />
          </section>
        )}

        <section className="border border-border/40 bg-surface/20 p-4 rounded-xl flex flex-col gap-3">
          <header className="text-sm font-semibold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">layers</span>
            Individual Layers (A/B Isolation)
          </header>
          <LaneList
            lanes={batch?.lanes ?? []}
            onSelect={setSelectedLane}
            selectedLane={selectedLane}
          />
        </section>

        {(() => {
          const cmp =
            batch?.lanes.find((l) => l.engine === "headroom")?.run?.encoderComparison ??
            batch?.combined?.encoderComparison ??
            null;
          return cmp ? (
            <section className="border border-border/40 bg-surface/20 p-4 rounded-xl flex flex-col gap-3">
              <header className="text-sm font-semibold text-text-main flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  compare_arrows
                </span>
                Encoder Comparison
              </header>
              <EncoderComparisonTable comparison={cmp} />
            </section>
          ) : null;
        })()}

        {activeDiff && (
          <section className="border border-border/40 bg-surface/20 p-4 rounded-xl flex flex-col gap-3">
            <header className="text-sm font-semibold text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">difference</span>
              Diff View —{" "}
              <span className="font-mono text-xs font-normal text-text-muted">
                {selectedLane ?? "Combined Pipeline"}
              </span>
            </header>
            <DiffPane segments={activeDiff} preservedBlocks={[]} />
          </section>
        )}

        {batch?.heatmap && (
          <section
            data-testid="play-heatmap"
            className="border border-border/40 bg-surface/20 p-4 rounded-xl flex flex-col gap-3"
          >
            <header className="text-sm font-semibold text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">insights</span>
              Saliency Heatmap —{" "}
              <span className="font-mono text-xs font-normal text-text-muted">
                {batch.heatmap.mode}
              </span>
            </header>
            <SaliencyHeatmap heatmap={batch.heatmap} />
          </section>
        )}
      </div>
    </div>
  );
}

function orderByStack(active: string[], order: readonly string[]): string[] {
  return order.filter((e) => active.includes(e));
}
