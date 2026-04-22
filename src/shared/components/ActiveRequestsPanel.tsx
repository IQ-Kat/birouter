"use client";

import { useEffect, useState } from "react";

type ActiveRequestRow = {
  model: string;
  provider: string;
  account: string;
  startedAt: number;
  runningTimeMs: number;
  count: number;
};

function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes <= 0) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m ${seconds}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export default function ActiveRequestsPanel() {
  const [rows, setRows] = useState<ActiveRequestRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/logs/active", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setRows(Array.isArray(data.activeRequests) ? data.activeRequests : []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load active requests:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    const interval = setInterval(load, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!loading && rows.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border bg-card/70">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-main">
            Running Requests
          </h3>
          <p className="text-xs text-text-muted">
            Requests that are still in flight across providers and accounts.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {loading ? "Loading..." : `${rows.length} active`}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-sidebar/40 text-left text-xs uppercase tracking-wide text-text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Model</th>
              <th className="px-4 py-3 font-medium">Provider</th>
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 font-medium">Elapsed</th>
              <th className="px-4 py-3 font-medium">Count</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.account}:${row.provider}:${row.model}:${row.startedAt}`}
                className="border-t border-border/60"
              >
                <td className="px-4 py-3 font-medium text-text-main">{row.model}</td>
                <td className="px-4 py-3 text-text-muted">{row.provider}</td>
                <td className="px-4 py-3 text-text-muted">{row.account}</td>
                <td className="px-4 py-3 text-text-main">{formatDuration(row.runningTimeMs)}</td>
                <td className="px-4 py-3 text-text-main">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
