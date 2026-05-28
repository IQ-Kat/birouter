"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/cn";
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";

export interface ManualConfigModalCustomCode {
  language: string;
  code: string;
}

export interface ManualConfigModalProps {
  open: boolean;
  onClose: () => void;
  tool: CliCatalogEntry;
  baseUrl: string;
  apiKey: string;
  model: string;
  customCode?: ManualConfigModalCustomCode;
}

function interpolate(template: string, vars: Record<string, string>): string {
  return template
    .replace(/\{\{baseUrl\}\}/g, vars["baseUrl"] ?? "")
    .replace(/\{\{apiKey\}\}/g, vars["apiKey"] ?? "")
    .replace(/\{\{model\}\}/g, vars["model"] ?? "");
}

export default function ManualConfigModal({
  open,
  onClose,
  tool,
  baseUrl,
  apiKey,
  model,
  customCode,
}: ManualConfigModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const source = customCode ?? tool.codeBlock;
  const vars: Record<string, string> = { baseUrl, apiKey, model };
  const rendered = source ? interpolate(source.code, vars) : "";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(rendered);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing — clipboard unavailable in non-secure context
    }
  }

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Configuração manual — ${tool.name}`}
        className={cn(
          "relative w-full bg-surface",
          "border border-black/10 dark:border-white/10",
          "rounded-xl shadow-2xl",
          // Desktop: centered, max-w; Mobile: full-screen
          "max-w-xl sm:max-w-2xl",
          "max-h-screen sm:max-h-[90vh] overflow-y-auto"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-black/5 dark:border-white/5">
          <div>
            <h2 className="text-base font-semibold text-text-main">
              {tool.name} — Configuração Manual
            </h2>
            {source && (
              <p className="text-xs text-text-muted mt-0.5">
                Linguagem: <span className="font-mono">{source.language}</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 rounded-lg text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          {source ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-main">Código de configuração</span>
                <button
                  onClick={handleCopy}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                    copied
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-text-main hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                >
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    {copied ? "check" : "content_copy"}
                  </span>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="px-4 py-3 bg-black/5 dark:bg-white/5 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap break-all border border-black/5 dark:border-white/5 leading-relaxed">
                {rendered}
              </pre>
            </div>
          ) : (
            <p className="text-sm text-text-muted">
              Nenhum bloco de configuração disponível para {tool.name}.
            </p>
          )}

          {/* Variable summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-black/5 dark:border-white/5">
            {(
              [
                { key: "Base URL", val: baseUrl },
                { key: "API Key", val: apiKey ? `${apiKey.slice(0, 8)}…` : "(não definida)" },
                { key: "Model", val: model },
              ] as Array<{ key: string; val: string }>
            ).map(({ key, val }) => (
              <div key={key} className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-wider text-text-muted">{key}</span>
                <span className="text-xs font-mono text-text-main truncate">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
