"use client";

import { useState } from "react";

// TODO(F7-merge): replace MockExportCodeModal with playground/components/ExportCodeModal
// once the F7 branch (feat/playground-ui-advanced-F7) is merged.
interface MockExportCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  state?: Record<string, unknown>;
}

function MockExportCodeModal({ isOpen, onClose }: MockExportCodeModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      data-testid="export-code-modal"
    >
      <div className="bg-surface border border-border rounded-xl shadow-2xl w-[500px] max-w-[95vw] p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-text-main">Export Code</span>
          <button
            className="text-text-muted hover:text-text-main"
            onClick={onClose}
            aria-label="Close export modal"
          >
            ✕
          </button>
        </div>
        <div className="text-xs text-text-muted p-4 bg-bg-alt rounded-lg">
          Export code modal — disponível após merge com F7 (
          <code>feat/playground-ui-advanced-F7</code>).
        </div>
        <button
          className="mt-4 text-xs px-3 py-1.5 rounded-md bg-primary/15 text-primary hover:bg-primary/25 transition-colors"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export type ActiveTab = "search" | "scrape" | "compare";

interface SearchToolsTopBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  latencyMs?: number | null;
  costUsd?: number | null;
  exportState?: Record<string, unknown>;
}

const TABS: { id: ActiveTab; icon: string; label: string }[] = [
  { id: "search", icon: "🔍", label: "Search" },
  { id: "scrape", icon: "📄", label: "Scrape" },
  { id: "compare", icon: "⚖", label: "Compare" },
];

export default function SearchToolsTopBar({
  activeTab,
  onTabChange,
  latencyMs,
  costUsd,
  exportState,
}: SearchToolsTopBarProps) {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-alt"
        data-testid="search-tools-topbar"
      >
        {/* Tab switcher */}
        <div className="flex gap-1" role="tablist" aria-label="Search Tools tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary/15 text-primary"
                  : "text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5",
              ].join(" ")}
              onClick={() => onTabChange(tab.id)}
              data-testid={`tab-${tab.id}`}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Metrics + export */}
        <div className="flex items-center gap-3">
          {latencyMs != null && (
            <span className="text-[11px] text-text-muted" data-testid="metric-latency">
              {latencyMs}ms
            </span>
          )}
          {costUsd != null && (
            <span className="text-[11px] text-text-muted" data-testid="metric-cost">
              ${costUsd.toFixed(4)}
            </span>
          )}
          <button
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-surface border border-border text-text-muted hover:text-text-main hover:border-border-hover transition-colors"
            onClick={() => setExportOpen(true)}
            aria-label="Export code"
            data-testid="export-code-button"
          >
            <span className="font-mono text-[11px]">{"/>"}</span>
            <span>Export</span>
          </button>
        </div>
      </div>

      <MockExportCodeModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        state={exportState}
      />
    </>
  );
}
