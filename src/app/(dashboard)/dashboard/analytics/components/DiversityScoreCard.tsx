"use client";

import { useEffect, useState } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";

export default function DiversityScoreCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("analytics");

  useEffect(() => {
    fetch("/api/analytics/diversity")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <Card className="p-5 flex flex-col justify-center items-center h-full min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </Card>
    );
  }

  const scorePercentage = Math.round((data.score || 0) * 100);

  let riskColor = "text-green-500";
  let gaugeColor = "bg-green-500";
  let riskLabel = "Healthy Distribution";

  if (scorePercentage < 40) {
    riskColor = "text-red-500";
    gaugeColor = "bg-red-500";
    riskLabel = "High Vendor Lock-in Risk";
  } else if (scorePercentage < 70) {
    riskColor = "text-amber-500";
    gaugeColor = "bg-amber-500";
    riskLabel = "Moderate Distribution";
  }

  return (
    <Card className="p-5 flex flex-col h-full bg-[var(--card-bg,#1e1e2e)] relative overflow-hidden group">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-[20px] text-cyan-400">pie_chart</span>
        <h3 className="font-semibold text-[var(--text-primary,#fff)] flex-1">
          Provider Diversity Score
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-md border ${gaugeColor.replace("bg-", "border-").replace("500", "500/20")} ${gaugeColor.replace("500", "500/10")} ${riskColor}`}
        >
          Shannon Entropy
        </span>
      </div>

      <div className="flex items-center justify-between mt-2 mb-6">
        <div className="flex flex-col">
          <span className={`text-4xl font-bold tabular-nums tracking-tight ${riskColor}`}>
            {scorePercentage}%
          </span>
          <span className="text-sm text-[var(--text-muted,#aaaaaa)] mt-1">{riskLabel}</span>
        </div>

        {/* Simple CSS Donut */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[var(--border,#333)]"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={riskColor}
              strokeWidth="4"
              strokeDasharray={`${scorePercentage}, 100`}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <p className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted,#888)]">
          Provider Share
        </p>

        {Object.keys(data.providers || {}).length === 0 ? (
          <div className="text-sm text-[var(--text-secondary,#666)] py-2">
            No recent usage data available.
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(data.providers)
              .sort(([, a]: any, [, b]: any) => b.share - a.share)
              .slice(0, 4) // Top 4 providers
              .map(([provider, stat]: [string, any]) => (
                <div key={provider} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[var(--text-primary,#ddd)] capitalize">
                      {provider}
                    </span>
                    <span className="font-mono text-[var(--text-muted,#aaa)]">
                      {Math.round(stat.share * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--surface,#333)] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${gaugeColor} rounded-full`}
                      style={{ width: `${Math.round(stat.share * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--border,#333)] flex justify-between text-[11px] text-[var(--text-muted,#777)]">
        <span>Window: {data.windowSize} reqs</span>
        <span>Based on Last {Math.round(data.ttlMs / 60000)} mins</span>
      </div>
    </Card>
  );
}
