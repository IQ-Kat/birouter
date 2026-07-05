"use client";
import { useState } from "react";
import { Button, Input } from "@/shared/components";

interface Row {
  engine: string;
  meanSavingsPercent: number;
  meanRetention: number;
  totalCompressedTokens: number;
}

interface VerifyResult {
  id: string;
  verdict: string | null;
  usdCost: number;
  skippedCapped: boolean;
}

export interface CompareViewProps {
  text: string;
}

async function runFidelityCheck(
  rows: Row[],
  text: string,
  opts: { provider: string; judgeModel: string; capUsd: number }
): Promise<{ verdicts: Record<string, VerifyResult>; spent: number; capped: boolean } | null> {
  const items = await Promise.all(
    rows.map(async (r) => {
      const res = await fetch("/api/compression/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: text }], engineId: r.engine }),
      });
      const d = await res.json();
      return { id: r.engine, original: d.original ?? "", compressed: d.compressed ?? "" };
    })
  );
  const vres = await fetch("/api/compression/compare/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items,
      provider: opts.provider,
      judgeModel: opts.judgeModel,
      costCapUsd: opts.capUsd,
    }),
  });
  const vdata = await vres.json();
  if (vres.ok && Array.isArray(vdata.results)) {
    const map: Record<string, VerifyResult> = {};
    for (const v of vdata.results) map[v.id] = v;
    return {
      verdicts: map,
      spent: typeof vdata.totalUsd === "number" ? vdata.totalUsd : 0,
      capped: Boolean(vdata.capped),
    };
  }
  return null;
}

interface VerifyControlsProps {
  provider: string;
  onProvider: (v: string) => void;
  judgeModel: string;
  onJudgeModel: (v: string) => void;
  capUsd: number;
  onCapUsd: (v: number) => void;
  verifying: boolean;
  onVerify: () => void;
  spent: number | null;
  capped: boolean;
}

function VerifyControls({
  provider,
  onProvider,
  judgeModel,
  onJudgeModel,
  capUsd,
  onCapUsd,
  verifying,
  onVerify,
  spent,
  capped,
}: VerifyControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-surface/30 border border-border/40 p-3 rounded-lg flex-1">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
          Provider
        </label>
        <Input
          className="w-24 text-xs h-8"
          value={provider}
          onChange={(e) => onProvider(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
          Judge (Model)
        </label>
        <Input
          data-testid="verify-model"
          className="w-36 text-xs h-8"
          value={judgeModel}
          onChange={(e) => onJudgeModel(e.target.value)}
          placeholder="e.g. claude-3-haiku"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
          Cost Cap (USD)
        </label>
        <Input
          type="number"
          step="0.01"
          min="0"
          className="w-20 text-xs h-8"
          value={capUsd}
          onChange={(e) => onCapUsd(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-3 mt-auto h-8">
        <Button
          data-testid="verify-all"
          variant="secondary"
          size="sm"
          icon="balance"
          loading={verifying}
          disabled={verifying || !judgeModel}
          onClick={onVerify}
          title={!judgeModel ? "Specify a judge model first" : undefined}
          className="font-medium"
        >
          {verifying ? "Verifying..." : "Verify All"}
        </Button>
        {spent !== null && (
          <span className="text-[11px] text-text-muted font-medium bg-surface px-2.5 py-1 rounded border border-border/30">
            Spent: ${spent.toFixed(3)} / ${capUsd.toFixed(2)}
            {capped ? " (cap reached)" : ""}
          </span>
        )}
      </div>
    </div>
  );
}

export function CompareView({ text }: CompareViewProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [verdicts, setVerdicts] = useState<Record<string, VerifyResult>>({});
  const [verifying, setVerifying] = useState(false);
  const [provider, setProvider] = useState("anthropic");
  const [judgeModel, setJudgeModel] = useState("");
  const [capUsd, setCapUsd] = useState(0.1);
  const [spent, setSpent] = useState<number | null>(null);
  const [capped, setCapped] = useState(false);

  const load = async () => {
    setLoading(true);
    setVerdicts({});
    setSpent(null);
    try {
      const res = await fetch("/api/compression/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
      });
      const data = await res.json();
      if (res.ok) setRows(Array.isArray(data.rows) ? data.rows : []);
    } finally {
      setLoading(false);
    }
  };

  const verifyAll = async () => {
    if (rows.length === 0 || !judgeModel) return;
    setVerifying(true);
    try {
      const out = await runFidelityCheck(rows, text, { provider, judgeModel, capUsd });
      if (out) {
        setVerdicts(out.verdicts);
        setSpent(out.spent);
        setCapped(out.capped);
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          data-testid="compare-load"
          variant="primary"
          icon={loading ? undefined : "analytics"}
          loading={loading}
          disabled={loading || !text}
          onClick={load}
          title={!text ? "Enter a prompt first" : undefined}
          className="font-semibold shadow-sm"
        >
          {loading ? "Running..." : "Load A/B Test"}
        </Button>
        {rows.length > 0 && (
          <VerifyControls
            provider={provider}
            onProvider={setProvider}
            judgeModel={judgeModel}
            onJudgeModel={setJudgeModel}
            capUsd={capUsd}
            onCapUsd={setCapUsd}
            verifying={verifying}
            onVerify={verifyAll}
            spent={spent}
            capped={capped}
          />
        )}
      </div>

      {rows.length > 0 && (
        <div className="border border-border/40 bg-surface/20 rounded-xl overflow-hidden shadow-sm mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40 bg-surface/30 text-text-muted text-[10px] font-semibold uppercase tracking-wider">
                <th className="px-4 py-3">Engine</th>
                <th className="px-4 py-3">Savings</th>
                <th className="px-4 py-3">Retention</th>
                <th className="px-4 py-3">Out Tokens</th>
                <th className="px-4 py-3">Fidelity Verdict</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const v = verdicts[r.engine];
                return (
                  <tr
                    key={r.engine}
                    data-testid="compare-row"
                    className="border-b border-border/20 last:border-0 hover:bg-surface-hover/30 transition-colors text-xs text-text-main"
                  >
                    <td className="px-4 py-3.5 font-semibold font-mono">{r.engine}</td>
                    <td className="px-4 py-3.5 font-medium text-emerald-400">
                      −{r.meanSavingsPercent.toFixed(0)}%
                    </td>
                    <td className="px-4 py-3.5">{Math.round(r.meanRetention * 100)}%</td>
                    <td className="px-4 py-3.5 font-mono">{r.totalCompressedTokens}</td>
                    <td className="px-4 py-3.5" data-testid="verify-verdict">
                      {v ? (
                        v.skippedCapped ? (
                          <span className="text-text-muted italic">skipped (cap reached)</span>
                        ) : v.verdict === "PASSED" || v.verdict === "passed" ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/10 border border-green-500/25 text-green-400">
                            <span className="w-1 h-1 rounded-full bg-green-400" />
                            Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 border border-red-500/25 text-red-400">
                            <span className="w-1 h-1 rounded-full bg-red-400" />
                            {v.verdict ?? "Failed"}
                          </span>
                        )
                      ) : (
                        <span className="text-text-muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
