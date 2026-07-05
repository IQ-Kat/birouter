"use client";
import { Button, Checkbox, Textarea } from "@/shared/components";

export const LANE_ENGINES = [
  "session-dedup",
  "ccr",
  "lite",
  "rtk",
  "ionizer",
  "headroom",
  "caveman",
  "aggressive",
  "ultra",
] as const;

export interface PlaygroundInputProps {
  text: string;
  onText: (t: string) => void;
  active: string[];
  onToggleActive: (engine: string) => void;
  onRun: () => void;
  loading: boolean;
  fidelityGate: boolean;
  onToggleFidelity: () => void;
  fuzzyDedup: boolean;
  onToggleFuzzy: () => void;
  riskGate: boolean;
  onToggleRisk: () => void;
  quantumLock: boolean;
  onToggleQuantum: () => void;
  heatmap: "ultra" | "universal" | false;
  onToggleHeatmap: () => void;
}

export function PlaygroundInput({
  text,
  onText,
  active,
  onToggleActive,
  onRun,
  loading,
  fidelityGate,
  onToggleFidelity,
  fuzzyDedup,
  onToggleFuzzy,
  riskGate,
  onToggleRisk,
  quantumLock,
  onToggleQuantum,
  heatmap,
  onToggleHeatmap,
}: PlaygroundInputProps) {
  return (
    <div className="flex flex-col gap-4 border border-border/40 bg-surface-main/30 p-4 rounded-xl">
      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Input Prompt / Context
        </label>
        <Textarea
          data-testid="play-input"
          className="min-h-[160px] w-full font-mono text-xs border border-border/60 bg-surface focus:border-primary/50 rounded-lg p-3 transition-colors"
          value={text}
          onChange={(e) => onText(e.target.value)}
          placeholder="Paste prompt, tool outputs, or code context here..."
        />
      </div>

      <div className="border-t border-border/40 pt-3">
        <span className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">
          Active in Combined Flow
        </span>
        <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
          {LANE_ENGINES.map((e) => (
            <Checkbox
              key={e}
              id={`engine-${e}`}
              label={e}
              checked={active.includes(e)}
              onChange={() => onToggleActive(e)}
              className="text-xs font-medium text-text-main"
            />
          ))}
          <Checkbox
            id="engine-llmlingua"
            label={
              <span className="opacity-50">
                llmlingua <span className="text-[10px] font-normal">(requires ONNX model)</span>
              </span>
            }
            checked={false}
            disabled
            onChange={() => {}}
            className="text-xs font-medium"
          />
        </div>
      </div>

      <div className="border-t border-border/40 pt-3 flex flex-col gap-2">
        <span className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">
          Pipeline Options
        </span>
        <Checkbox
          id="opt-fidelity"
          data-testid="fidelity-toggle"
          label="Fidelity Gate (reject degraded layers)"
          checked={fidelityGate}
          onChange={onToggleFidelity}
          className="text-xs"
        />
        <Checkbox
          id="opt-fuzzy"
          data-testid="fuzzy-toggle"
          label="Fuzzy Dedup (near-duplicate → CCR)"
          checked={fuzzyDedup}
          onChange={onToggleFuzzy}
          className="text-xs"
        />
        <Checkbox
          id="opt-risk"
          data-testid="risk-toggle"
          label="Risk Gate (protect sensitive content)"
          checked={riskGate}
          onChange={onToggleRisk}
          className="text-xs"
        />
        <Checkbox
          id="opt-quantum"
          data-testid="quantum-toggle"
          label="QuantumLock (stabilize cache prefix)"
          checked={quantumLock}
          onChange={onToggleQuantum}
          className="text-xs"
        />
        <Checkbox
          id="opt-heatmap"
          data-testid="heatmap-toggle"
          label={`Saliency heatmap ${heatmap ? `(${heatmap})` : ""}`}
          checked={Boolean(heatmap)}
          onChange={onToggleHeatmap}
          className="text-xs"
        />
      </div>

      <Button
        data-testid="play-run"
        variant="primary"
        icon={loading ? undefined : "play_arrow"}
        loading={loading}
        onClick={onRun}
        className="w-full font-semibold shadow-md"
      >
        {loading ? "Running..." : "Run Pipeline"}
      </Button>
    </div>
  );
}
