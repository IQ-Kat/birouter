"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { SearchProviderCatalogItem } from "@/shared/schemas/searchTools";

/** D22 — max 4 providers in parallel */
const MAX_PROVIDERS = 4;

export interface CompareResult {
  provider: string;
  latency: number;
  cost: number;
  resultCount: number;
  responseSize: number;
  urls: string[];
  error?: string;
}

interface CompareTabProps {
  providers: SearchProviderCatalogItem[];
  /** Callback to report metrics to parent Studio after comparison runs */
  onMetrics?: (latencyMs: number | null, costUsd: number | null) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function computeOverlap(urlsA: string[], urlsB: string[]): string {
  const setA = new Set(urlsA);
  const overlap = urlsB.filter((u) => setA.has(u)).length;
  return `${overlap}/${urlsB.length}`;
}

function getBestIndex(values: number[], higherIsBetter = false): number {
  if (values.length === 0) return -1;
  return higherIsBetter
    ? values.indexOf(Math.max(...values))
    : values.indexOf(Math.min(...values));
}

function getWorstIndex(values: number[], higherIsBetter = false): number {
  if (values.length === 0) return -1;
  return higherIsBetter
    ? values.indexOf(Math.min(...values))
    : values.indexOf(Math.max(...values));
}

export default function CompareTab({ providers, onMetrics }: CompareTabProps) {
  const activeSearchProviders = providers.filter(
    (p) => p.kind === "search" && p.status === "configured",
  );

  const [query, setQuery] = useState("");
  const [selectedProviderIds, setSelectedProviderIds] = useState<string[]>([]);
  const [results, setResults] = useState<CompareResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const toggleProvider = useCallback((id: string) => {
    setSelectedProviderIds((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= MAX_PROVIDERS) return prev; // cap 4 (D22)
      return [...prev, id];
    });
  }, []);

  const handleRun = useCallback(async () => {
    if (!query.trim() || selectedProviderIds.length === 0) return;
    setLoading(true);
    setHasRun(true);
    setResults([]);

    const settled = await Promise.allSettled(
      selectedProviderIds.map(async (providerId) => {
        const start = Date.now();
        try {
          const res = await fetch("/api/v1/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, provider: providerId, max_results: 5 }),
          });
          const data = await res.json();
          const latency = Date.now() - start;

          if (!res.ok) {
            return {
              provider: providerId,
              latency,
              cost: 0,
              resultCount: 0,
              responseSize: 0,
              urls: [],
              error: data?.error?.message ?? `Error ${res.status}`,
            } as CompareResult;
          }

          const respJson = JSON.stringify(data);
          return {
            provider: providerId,
            latency: data.metrics?.response_time_ms ?? latency,
            cost: data.usage?.search_cost_usd ?? 0,
            resultCount: Array.isArray(data.results) ? data.results.length : 0,
            responseSize: respJson.length,
            urls: (data.results ?? []).map((r: { url: string }) => r.url),
          } as CompareResult;
        } catch (err: unknown) {
          return {
            provider: providerId,
            latency: Date.now() - start,
            cost: 0,
            resultCount: 0,
            responseSize: 0,
            urls: [],
            error: err instanceof Error ? err.message : "Failed",
          } as CompareResult;
        }
      }),
    );

    const resolved = settled.map((s) =>
      s.status === "fulfilled"
        ? s.value
        : ({
            provider: "unknown",
            latency: 0,
            cost: 0,
            resultCount: 0,
            responseSize: 0,
            urls: [],
            error: "Request failed",
          } as CompareResult),
    );
    setResults(resolved);
    setLoading(false);
    // Report best (min) latency and total cost to parent Studio
    const valid = resolved.filter((r) => !r.error);
    if (valid.length > 0) {
      const minLatency = Math.min(...valid.map((r) => r.latency));
      const totalCost = valid.reduce((sum, r) => sum + r.cost, 0);
      onMetrics?.(minLatency, totalCost);
    }
  }, [query, selectedProviderIds, onMetrics]);

  // Compute best/worst indices for coloring
  const validResults = results.filter((r) => !r.error);
  const latencyValues = validResults.map((r) => r.latency);
  const costValues = validResults.map((r) => r.cost);
  const sizeValues = validResults.map((r) => r.responseSize);
  const countValues = validResults.map((r) => r.resultCount);

  function getCellClass(resultIndex: number, values: number[], higherIsBetter = false): string {
    const validIndex = validResults.findIndex((r) => r === results[resultIndex]);
    if (validIndex < 0) return "text-error";
    if (validIndex === getBestIndex(values, higherIsBetter)) return "text-success font-medium";
    if (validIndex === getWorstIndex(values, higherIsBetter)) return "text-warning";
    return "text-text-main";
  }

  if (activeSearchProviders.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center flex-1 py-16 text-center"
        data-testid="compare-no-providers"
      >
        <span className="text-3xl mb-3" aria-hidden="true">⚖</span>
        <p className="text-sm text-text-muted mb-2">
          Nenhum provider de search ativo — configure em Providers →
        </p>
        <Link
          href="/dashboard/providers"
          className="text-accent text-sm hover:underline"
        >
          Configurar providers
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-4" data-testid="compare-tab">
      {/* Query input */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
        <label
          htmlFor="compare-query"
          className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider"
        >
          Query para comparar
        </label>
        <div className="flex gap-2">
          <input
            id="compare-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="artificial intelligence trends 2026"
            className="flex-1 bg-bg-alt border border-border rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleRun();
            }}
            data-testid="compare-query-input"
          />
          <button
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => void handleRun()}
            disabled={loading || selectedProviderIds.length === 0 || !query.trim()}
            data-testid="run-compare-button"
          >
            {loading ? "Comparando..." : "Comparar"}
          </button>
        </div>

        {/* Provider picker — max 4 (D22) */}
        <div>
          <p className="text-[10px] text-text-muted mb-2">
            Providers ({selectedProviderIds.length}/{MAX_PROVIDERS}):
          </p>
          <div className="flex flex-wrap gap-2">
            {activeSearchProviders.map((p) => {
              const selected = selectedProviderIds.includes(p.id);
              const atCap = selectedProviderIds.length >= MAX_PROVIDERS && !selected;
              return (
                <button
                  key={p.id}
                  className={[
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
                    selected
                      ? "bg-primary/15 text-primary border-primary/30"
                      : atCap
                        ? "text-text-muted border-border opacity-50 cursor-not-allowed"
                        : "text-text-muted border-border hover:text-text-main hover:border-primary/30",
                  ].join(" ")}
                  onClick={() => !atCap && toggleProvider(p.id)}
                  disabled={atCap}
                  data-testid={`provider-toggle-${p.id}`}
                  aria-pressed={selected}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
          {selectedProviderIds.length >= MAX_PROVIDERS && (
            <p className="text-[10px] text-warning mt-1">
              Máximo de {MAX_PROVIDERS} providers atingido (D22)
            </p>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-10" data-testid="compare-loading">
          <span
            className="material-symbols-outlined text-[28px] text-primary animate-spin"
            aria-hidden="true"
          >
            progress_activity
          </span>
        </div>
      )}

      {/* Results table */}
      {hasRun && !loading && results.length > 0 && (
        <div
          className="bg-surface border border-border rounded-lg overflow-hidden"
          data-testid="compare-results"
        >
          <div className="px-4 py-2.5 bg-bg-alt border-b border-border">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Resultados — &ldquo;{query}&rdquo;
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-text-muted font-semibold w-24" />
                  {results.map((r) => (
                    <th
                      key={r.provider}
                      className="text-center p-2 font-semibold text-text-muted"
                    >
                      {r.provider.replace("-search", "")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-text-muted">Latência</td>
                  {results.map((r, i) => (
                    <td
                      key={r.provider}
                      className={`text-center p-2 ${r.error ? "text-error" : getCellClass(i, latencyValues, false)}`}
                    >
                      {r.error ? "Erro" : `${r.latency}ms`}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-text-muted">Custo</td>
                  {results.map((r, i) => (
                    <td
                      key={r.provider}
                      className={`text-center p-2 ${r.error ? "text-error" : getCellClass(i, costValues, false)}`}
                    >
                      {r.error ? "Erro" : `$${r.cost.toFixed(4)}`}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-text-muted">Resultados</td>
                  {results.map((r, i) => (
                    <td
                      key={r.provider}
                      className={`text-center p-2 ${r.error ? "text-error" : getCellClass(i, countValues, true)}`}
                    >
                      {r.error ? "Erro" : r.resultCount}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  {/* D22 / §3.9 — "Size" was hardcoded; use data-i18n attr for F9 replacement */}
                  <td className="p-2 text-text-muted">
                    <span data-i18n="search.size">Size</span>
                  </td>
                  {results.map((r, i) => (
                    <td
                      key={r.provider}
                      className={`text-center p-2 ${r.error ? "text-error" : getCellClass(i, sizeValues, false)}`}
                    >
                      {r.error ? "Erro" : formatBytes(r.responseSize)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 text-text-muted">URL overlap</td>
                  {results.map((r, idx) => {
                    const baseUrls = results[0]?.urls ?? [];
                    return (
                      <td key={r.provider} className="text-center p-2 text-text-main">
                        {r.error
                          ? "Erro"
                          : idx === 0
                            ? "—"
                            : computeOverlap(baseUrls, r.urls)}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state — nothing run yet */}
      {!hasRun && !loading && (
        <div
          className="flex flex-col items-center justify-center flex-1 py-12 text-center"
          data-testid="compare-empty-state"
        >
          <span className="text-3xl mb-3" aria-hidden="true">⚖</span>
          <p className="text-sm text-text-muted mb-1">
            Selecione até {MAX_PROVIDERS} providers e insira uma query
          </p>
          <p className="text-xs text-text-muted">
            Os resultados serão comparados lado a lado com latência, custo e overlap de URLs
          </p>
        </div>
      )}
    </div>
  );
}
