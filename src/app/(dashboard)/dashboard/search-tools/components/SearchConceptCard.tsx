"use client";

import { useState } from "react";

interface ConceptItem {
  icon: string;
  title: string;
  description: string;
}

const CONCEPTS: ConceptItem[] = [
  {
    icon: "🔍",
    title: "Search",
    description: "Search = busca na web (lista de links com título, URL, snippet e score de relevância)",
  },
  {
    icon: "📄",
    title: "Scrape",
    description: "Scrape = extrai o conteúdo completo de uma URL (markdown, texto ou HTML)",
  },
  {
    icon: "⚖",
    title: "Compare",
    description: "Compare = executa a mesma query em N providers side-by-side para comparar latência, custo e overlap de resultados",
  },
  {
    icon: "↕",
    title: "Rerank",
    description: "Rerank = reordena resultados via LLM para melhorar relevância baseada na query",
  },
  {
    icon: "⚡",
    title: "Auto (cheapest)",
    description: "Auto (cheapest) = escolhe automaticamente o provider mais barato disponível e com credenciais configuradas",
  },
];

interface SearchConceptCardProps {
  /** If true, the card starts collapsed. Default: false (expanded). */
  defaultCollapsed?: boolean;
}

export default function SearchConceptCard({ defaultCollapsed = false }: SearchConceptCardProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div
      className="bg-surface border border-border rounded-lg overflow-hidden"
      data-testid="search-concept-card"
    >
      {/* Header */}
      <button
        className="flex justify-between items-center w-full px-4 py-2.5 bg-bg-alt border-b border-border hover:bg-bg-alt/80 transition-colors"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
        aria-controls="concept-card-content"
      >
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
          <span>ⓘ</span>
          <span>Guia de modalidades</span>
        </span>
        <span className="text-text-muted text-xs" aria-hidden="true">
          {collapsed ? "▶" : "▼"}
        </span>
      </button>

      {/* Body */}
      {!collapsed && (
        <div
          id="concept-card-content"
          className="p-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          data-testid="concept-card-content"
        >
          {CONCEPTS.map((c) => (
            <div
              key={c.title}
              className="flex gap-3 p-3 bg-bg-alt rounded-lg border border-border"
              data-testid={`concept-item-${c.title.toLowerCase()}`}
            >
              <span className="text-lg shrink-0" aria-hidden="true">
                {c.icon}
              </span>
              <div>
                <div className="text-xs font-semibold text-text-main mb-0.5">{c.title}</div>
                <div className="text-[11px] text-text-muted leading-relaxed">{c.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
