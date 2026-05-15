"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card } from "@/shared/components";
import { useTranslations } from "next-intl";
import FallbackChainsEditor from "./FallbackChainsEditor";
import {
  CLI_COMPAT_PROVIDER_DISPLAY,
  CLI_COMPAT_TOGGLE_IDS,
  normalizeCliCompatProviderId,
} from "@/shared/constants/cliCompatProviders";

// Provider keys (mirror of open-sse/services/systemTransforms.ts).
const PROVIDER_CLAUDE = "claude";
const PROVIDER_CC_BRIDGE = "anthropic-compatible-cc";

const OPENWEBUI_PARAGRAPH_ANCHORS = [
  "github.com/open-webui/open-webui",
  "openwebui.com",
  "docs.openwebui.com",
];

const DEFAULT_OBFUSCATE_WORDS = [
  "opencode",
  "open-code",
  "cline",
  "roo-cline",
  "roo_cline",
  "cursor",
  "windsurf",
  "aider",
  "continue.dev",
  "copilot",
  "avante",
  "codecompanion",
  "openwebui",
  "open-webui",
];

// Mirror of DEFAULT_SYSTEM_TRANSFORMS_CONFIG from open-sse/services/systemTransforms.ts.
// Kept client-side so the UI can render + reset to defaults without a server roundtrip.
// Server remains the source of truth — UI just lets the user inspect, edit, and reset.
const DEFAULT_SYSTEM_TRANSFORMS_CLIENT = {
  providers: {
    [PROVIDER_CLAUDE]: {
      enabled: true,
      pipeline: [
        {
          kind: "drop_paragraph_if_contains",
          needles: [...OPENWEBUI_PARAGRAPH_ANCHORS],
        },
        {
          kind: "drop_paragraph_if_starts_with",
          prefixes: ["You are Open WebUI"],
        },
        {
          kind: "obfuscate_words",
          words: [...DEFAULT_OBFUSCATE_WORDS],
          targets: ["system", "messages", "tools"],
        },
      ],
    },
    [PROVIDER_CC_BRIDGE]: {
      enabled: true,
      pipeline: [
        {
          kind: "drop_paragraph_if_contains",
          needles: [...OPENWEBUI_PARAGRAPH_ANCHORS],
        },
        {
          kind: "drop_paragraph_if_starts_with",
          prefixes: ["You are Open WebUI"],
        },
        {
          kind: "obfuscate_words",
          words: ["openwebui", "open-webui"],
          targets: ["system", "messages", "tools"],
        },
        {
          kind: "drop_paragraph_if_contains",
          needles: [
            "github.com/anomalyco/opencode",
            "opencode.ai/docs",
            "github.com/cline/cline",
            "github.com/getcursor/cursor",
            "continue.dev",
          ],
        },
        {
          kind: "drop_paragraph_if_starts_with",
          prefixes: ["You are OpenCode"],
        },
        {
          kind: "replace_text",
          match: "if OpenCode honestly",
          replacement: "if the assistant honestly",
          allOccurrences: true,
        },
        {
          kind: "replace_text",
          match: "Here is some useful information about the environment you are running in:",
          replacement: "Environment context you are running in:",
          allOccurrences: true,
        },
        {
          kind: "prepend_system_block",
          text: "You are a Claude agent, built on Anthropic's Claude Agent SDK.",
          idempotencyKey: "claude-agent-sdk-identity",
        },
        {
          kind: "inject_billing_header",
          entrypoint: "sdk-cli",
          versionFormat: "ex-machina",
          cchAlgo: "sha256-first-user",
        },
      ],
    },
  },
} as const;

// Provider display metadata for the per-provider tiles.
// Mirrors the names from CLI_COMPAT_PROVIDER_DISPLAY where applicable so the
// header-fingerprint toggle row stays consistent with the rest of the card.
const PROVIDER_TILE_DISPLAY: Record<
  string,
  { name: string; description: string; icon: string; tone: string }
> = {
  [PROVIDER_CLAUDE]: {
    name: "Claude (OAuth)",
    description:
      "Native Claude provider — handles OAuth-issued tokens. Header fingerprint is force-applied for account safety; transforms are cosmetic-only (no billing/identity prepend — native code already does that).",
    icon: "anthropic",
    tone: "indigo",
  },
  [PROVIDER_CC_BRIDGE]: {
    name: "Claude-Code Bridge (anthropic-compatible-cc-*)",
    description:
      "Relay endpoints that accept Anthropic-shaped requests on behalf of API-key callers. The full transform pipeline ships here (paragraph anchors + identity prefixes + text replacements + SDK identity + billing header) — that's the T4-200 layout proven on the live OmniRoute deployment.",
    icon: "hub",
    tone: "purple",
  },
};

function summarizeTransformOp(op: any): string {
  switch (op?.kind) {
    case "drop_paragraph_if_contains":
      return `drop paragraphs containing: ${(op.needles || []).slice(0, 3).join(", ")}${(op.needles || []).length > 3 ? "…" : ""}`;
    case "drop_paragraph_if_starts_with":
      return `drop paragraphs starting with: ${(op.prefixes || []).slice(0, 3).join(", ")}${(op.prefixes || []).length > 3 ? "…" : ""}`;
    case "replace_text":
      return `replace "${(op.match || "").slice(0, 40)}${(op.match || "").length > 40 ? "…" : ""}" → "${(op.replacement || "").slice(0, 40)}${(op.replacement || "").length > 40 ? "…" : ""}"`;
    case "replace_regex":
      return `regex /${op.pattern}/${op.flags || ""} → "${(op.replacement || "").slice(0, 40)}"`;
    case "drop_block_if_contains":
      return `drop blocks containing: ${(op.needles || []).slice(0, 3).join(", ")}`;
    case "prepend_system_block":
      return `prepend block: "${(op.text || "").slice(0, 60)}${(op.text || "").length > 60 ? "…" : ""}"`;
    case "append_system_block":
      return `append block: "${(op.text || "").slice(0, 60)}${(op.text || "").length > 60 ? "…" : ""}"`;
    case "inject_billing_header":
      return `inject billing header (entrypoint=${op.entrypoint}, version=${op.versionFormat}, cch=${op.cchAlgo})`;
    case "obfuscate_words":
      return `obfuscate ${(op.words || []).length} word(s) via ZWJ in ${(op.targets || ["system", "messages", "tools"]).join("+")}`;
    default:
      return JSON.stringify(op);
  }
}

// Client-side validator — light shape check before we PATCH; the server
// re-validates with the full zod schema in settingsSchemas.ts.
function validateProviderTransformsConfig(value: unknown): string | null {
  if (!value || typeof value !== "object") return "Config must be a JSON object";
  const cfg = value as { enabled?: unknown; pipeline?: unknown };
  if (typeof cfg.enabled !== "boolean") return "`enabled` must be true or false";
  if (!Array.isArray(cfg.pipeline)) return "`pipeline` must be an array of ops";
  if (cfg.pipeline.length > 50) return "Pipeline cannot exceed 50 ops";
  for (let i = 0; i < cfg.pipeline.length; i++) {
    const op = cfg.pipeline[i] as { kind?: unknown };
    if (!op || typeof op !== "object" || typeof op.kind !== "string") {
      return `Op #${i + 1}: missing or invalid \`kind\``;
    }
    const validKinds = [
      "drop_paragraph_if_contains",
      "drop_paragraph_if_starts_with",
      "replace_text",
      "replace_regex",
      "drop_block_if_contains",
      "prepend_system_block",
      "append_system_block",
      "inject_billing_header",
      "obfuscate_words",
    ];
    if (!validKinds.includes(op.kind)) {
      return `Op #${i + 1}: unknown kind "${op.kind}"`;
    }
  }
  return null;
}

export default function RoutingTab() {
  const [settings, setSettings] = useState<any>({
    alwaysPreserveClientCache: "auto",
    antigravitySignatureCacheMode: "enabled",
    cliCompatProviders: [],
    autoRoutingEnabled: true,
    autoRoutingDefaultVariant: "lkgp",
    systemTransforms: DEFAULT_SYSTEM_TRANSFORMS_CLIENT,
  });
  // Per-provider JSON draft + error state for the system-transforms editor.
  // Map keyed by provider id; values track the textarea content + last
  // validation error string (null when valid). Synced from settings via
  // effect so server-side values flow into the editor.
  const [jsonDrafts, setJsonDrafts] = useState<Record<string, string>>({});
  const [jsonErrors, setJsonErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(true);
  const [lkgpCacheLoading, setLkgpCacheLoading] = useState(false);
  const [lkgpCacheStatus, setLkgpCacheStatus] = useState({ type: "", message: "" });
  const t = useTranslations("settings");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateSetting = async (patch) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, ...patch }));
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
    }
  };

  const cliCompatProviders = useMemo(
    () =>
      Array.isArray(settings.cliCompatProviders)
        ? settings.cliCompatProviders.map((providerId: string) =>
            normalizeCliCompatProviderId(providerId)
          )
        : [],
    [settings.cliCompatProviders]
  );
  const cliCompatProviderSet = useMemo(() => new Set(cliCompatProviders), [cliCompatProviders]);

  // Normalize the server snapshot into a per-provider map. Legacy v1
  // `ccBridgeTransforms` payloads from Phase 2 are migrated client-side
  // into providers[PROVIDER_CC_BRIDGE] so the editor never breaks.
  const systemTransforms = useMemo(() => {
    const raw = settings.systemTransforms;
    if (raw && typeof raw === "object" && raw.providers && typeof raw.providers === "object") {
      return raw as { providers: Record<string, { enabled: boolean; pipeline: any[] }> };
    }
    // Legacy migration shim: { enabled, pipeline } → providers[CC_BRIDGE].
    const legacy = settings.ccBridgeTransforms;
    if (legacy && typeof legacy === "object" && Array.isArray(legacy.pipeline)) {
      return {
        providers: {
          ...DEFAULT_SYSTEM_TRANSFORMS_CLIENT.providers,
          [PROVIDER_CC_BRIDGE]: {
            enabled: legacy.enabled !== false,
            pipeline: legacy.pipeline,
          },
        },
      };
    }
    return DEFAULT_SYSTEM_TRANSFORMS_CLIENT;
  }, [settings.systemTransforms, settings.ccBridgeTransforms]);

  // Sync JSON drafts from settings whenever the server snapshot changes.
  useEffect(() => {
    const nextDrafts: Record<string, string> = {};
    for (const [providerId, providerCfg] of Object.entries(systemTransforms.providers)) {
      nextDrafts[providerId] = JSON.stringify(providerCfg, null, 2);
    }
    setJsonDrafts(nextDrafts);
    setJsonErrors({});
  }, [systemTransforms]);

  const updateProviderTransforms = (
    providerId: string,
    next: { enabled: boolean; pipeline: any[] }
  ) => {
    const merged = {
      providers: {
        ...systemTransforms.providers,
        [providerId]: next,
      },
    };
    updateSetting({ systemTransforms: merged });
  };

  const toggleProviderEnabled = (providerId: string, enabled: boolean) => {
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    updateProviderTransforms(providerId, { enabled, pipeline: current.pipeline });
  };

  const applyProviderJson = (providerId: string) => {
    const raw = jsonDrafts[providerId] ?? "";
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      setJsonErrors((prev) => ({
        ...prev,
        [providerId]: `Invalid JSON: ${(err as Error).message}`,
      }));
      return;
    }
    const validationError = validateProviderTransformsConfig(parsed);
    if (validationError) {
      setJsonErrors((prev) => ({ ...prev, [providerId]: validationError }));
      return;
    }
    setJsonErrors((prev) => ({ ...prev, [providerId]: null }));
    updateProviderTransforms(providerId, parsed as { enabled: boolean; pipeline: any[] });
  };

  const resetProviderTransforms = (providerId: string) => {
    const def = (DEFAULT_SYSTEM_TRANSFORMS_CLIENT.providers as Record<string, any>)[providerId];
    if (!def) return;
    setJsonErrors((prev) => ({ ...prev, [providerId]: null }));
    updateProviderTransforms(providerId, {
      enabled: def.enabled,
      pipeline: def.pipeline.map((op: any) => ({ ...op })),
    });
  };

  const toggleCliCompatProvider = (providerId: string, enabled: boolean) => {
    const normalizedProviderId = normalizeCliCompatProviderId(providerId);
    const nextProviders = new Set(cliCompatProviders);
    if (enabled) {
      nextProviders.add(normalizedProviderId);
    } else {
      nextProviders.delete(normalizedProviderId);
    }
    updateSetting({ cliCompatProviders: Array.from(nextProviders) });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                network_ping
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("adaptiveVolumeRouting") || "Adaptive Volume Routing"}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {t("adaptiveVolumeRoutingDesc") ||
                  "Automatically adjusts traffic volume between providers based on real-time latency and error rates."}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!!settings.adaptiveVolumeRouting}
                onChange={(e) => updateSetting({ adaptiveVolumeRouting: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                verified
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("lkgpToggleTitle") || "Last Known Good Provider (LKGP)"}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {t("lkgpToggleDesc") ||
                  "When enabled, the router remembers which provider last served a successful response and tries it first on subsequent requests."}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.lkgpEnabled !== false}
                onChange={(e) => updateSetting({ lkgpEnabled: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            loading={lkgpCacheLoading}
            onClick={async () => {
              setLkgpCacheLoading(true);
              setLkgpCacheStatus({ type: "", message: "" });
              try {
                const res = await fetch("/api/settings/lkgp-cache", { method: "DELETE" });
                const data = await res.json();
                if (res.ok) {
                  setLkgpCacheStatus({
                    type: "success",
                    message: t("lkgpCacheCleared") || "LKGP cache cleared successfully",
                  });
                } else {
                  setLkgpCacheStatus({
                    type: "error",
                    message:
                      data.error || t("lkgpCacheClearFailed") || "Failed to clear LKGP cache",
                  });
                }
              } catch {
                setLkgpCacheStatus({
                  type: "error",
                  message: t("errorOccurred") || "An error occurred",
                });
              } finally {
                setLkgpCacheLoading(false);
              }
            }}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              delete_sweep
            </span>
            {t("clearLkgpCache") || "Clear LKGP Cache"}
          </Button>
          {lkgpCacheStatus.message && (
            <span
              className={`text-xs ${lkgpCacheStatus.type === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {lkgpCacheStatus.message}
            </span>
          )}
        </div>
      </Card>

      <FallbackChainsEditor />

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              fingerprint
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Antigravity Signature Cache Mode</h3>
            <p className="text-sm text-text-muted">
              Control whether OmniRoute reuses only stored Gemini thought signatures or accepts
              validated client-provided signatures in Antigravity-compatible tool-call flows.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              value: "enabled",
              label: "Enabled",
              desc: "Current behavior. Ignore client-provided signatures and keep using the stored OmniRoute flow.",
            },
            {
              value: "bypass",
              label: "Bypass",
              desc: "Accept client-provided signatures after lightweight validation and fall back to the stored signature when invalid.",
            },
            {
              value: "bypass-strict",
              label: "Bypass Strict",
              desc: "Require full protobuf validation before accepting a client-provided signature.",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting({ antigravitySignatureCacheMode: option.value })}
              disabled={loading}
              className={`w-full flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all ${
                settings.antigravitySignatureCacheMode === option.value
                  ? "border-sky-500/50 bg-sky-500/5 ring-1 ring-sky-500/20"
                  : "border-border/50 hover:border-border hover:bg-surface/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    settings.antigravitySignatureCacheMode === option.value
                      ? "text-sky-400"
                      : "text-text-muted"
                  }`}
                >
                  {settings.antigravitySignatureCacheMode === option.value
                    ? "check_circle"
                    : "radio_button_unchecked"}
                </span>
                <span
                  className={`text-sm font-medium ${settings.antigravitySignatureCacheMode === option.value ? "text-sky-400" : ""}`}
                >
                  {option.label}
                </span>
              </div>
              <p className="text-xs text-text-muted ml-7">{option.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 h-fit">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              integration_instructions
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Provider Upstream Compatibility</h3>
            <p className="text-sm text-text-muted mt-1">
              Configure per-provider request normalization. The header-fingerprint row matches
              upstream CLI binary signatures (reordering headers/body shapes) and the
              system-transform pipeline rewrites system blocks so Anthropic-side classifiers (or
              equivalent guards on other providers) see a classifier-correct request regardless of
              which client sent it. Issue #2260 + comment 4459544580.
            </p>
            <p className="mt-1 text-xs text-text-muted">
              <span className="font-medium">No local CLI binary is required</span> — OmniRoute
              builds the upstream-compatible request server-side. The &quot;Managed&quot; badge on
              the Claude tile means the fingerprint is force-applied for OAuth account safety, not
              that the user must install the Claude Code CLI.
            </p>
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-sm font-semibold mb-2">Header fingerprint (per provider)</h4>
          <p className="text-xs text-text-muted mb-2">
            {t("cliFingerprintEnabled", { count: cliCompatProviderSet.size })}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {CLI_COMPAT_TOGGLE_IDS.map((providerId) => {
              const normalizedProviderId = normalizeCliCompatProviderId(providerId);
              const providerDisplay = CLI_COMPAT_PROVIDER_DISPLAY[providerId];
              // Claude OAuth force-applies the fingerprint regardless of this toggle
              // (base.ts: shouldFingerprint) — that's an account-safety constraint,
              // not a local-binary requirement.
              const forced = providerId === "claude";
              const checked = forced || cliCompatProviderSet.has(normalizedProviderId);
              const label = providerDisplay?.name || providerId;
              const description = providerDisplay?.description || providerId;
              const titleText = forced
                ? t("forcedFingerprintTitle", { provider: label })
                : checked
                  ? t("disableFingerprintTitle", { provider: label })
                  : t("enableFingerprintTitle", { provider: label });

              return (
                <button
                  key={providerId}
                  type="button"
                  onClick={() => {
                    if (forced) return;
                    toggleCliCompatProvider(providerId, !checked);
                  }}
                  disabled={loading || forced}
                  aria-pressed={checked}
                  aria-disabled={forced || undefined}
                  title={titleText}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                    checked
                      ? "border-indigo-500/50 bg-indigo-500/5 ring-1 ring-indigo-500/20"
                      : "border-border/50 hover:border-border hover:bg-surface/30"
                  } ${loading || forced ? "cursor-not-allowed" : ""} ${loading ? "opacity-60" : ""}`}
                >
                  <span
                    className={`material-symbols-outlined mt-0.5 text-[18px] ${checked ? "text-indigo-400" : "text-text-muted"}`}
                    aria-hidden="true"
                  >
                    {forced ? "lock" : checked ? "check_circle" : "radio_button_unchecked"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`block text-sm font-medium ${checked ? "text-indigo-400" : ""}`}
                      >
                        {label}
                      </span>
                      {forced ? (
                        <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-400">
                          Managed
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-xs text-text-muted">{description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">System-block transform pipeline</h4>
          <p className="text-xs text-text-muted mb-3">
            Per-provider DSL. Each provider has its own ordered pipeline of ops
            (drop_paragraph_if_contains, replace_text, obfuscate_words, inject_billing_header, …).
            Edit the JSON below and click <em>Apply JSON</em> — the server validates against the
            full zod schema before persisting. Click <em>Reset</em> to restore the shipped defaults
            for that provider.
          </p>

          <div className="flex flex-col gap-5">
            {Object.entries(systemTransforms.providers).map(([providerId, providerCfg]) => {
              const display = PROVIDER_TILE_DISPLAY[providerId] ?? {
                name: providerId,
                description:
                  "Custom provider — pipeline only runs when an OmniRoute request targets this provider key.",
                icon: "extension",
                tone: "purple",
              };
              const draft = jsonDrafts[providerId] ?? JSON.stringify(providerCfg, null, 2);
              const errorMsg = jsonErrors[providerId] ?? null;
              const opCount = Array.isArray(providerCfg.pipeline) ? providerCfg.pipeline.length : 0;
              const hasDefault = Boolean(
                (DEFAULT_SYSTEM_TRANSFORMS_CLIENT.providers as Record<string, unknown>)[providerId]
              );

              return (
                <div
                  key={providerId}
                  className="rounded-lg border border-border/50 bg-surface/20 p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="text-xs font-mono rounded bg-surface px-1.5 py-0.5">
                          {providerId}
                        </code>
                        <span className="text-sm font-medium">{display.name}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1">{display.description}</p>
                      <p className="text-[11px] text-text-muted mt-1">
                        {opCount} op{opCount === 1 ? "" : "s"}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={providerCfg.enabled !== false}
                        onChange={(e) => toggleProviderEnabled(providerId, e.target.checked)}
                        disabled={loading}
                      />
                      <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {opCount > 0 && (
                    <ol className="flex flex-col gap-1 mb-3">
                      {(providerCfg.pipeline as any[]).map((op, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 rounded border border-border/30 bg-background/30 p-2 text-xs"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-[10px] font-semibold text-purple-400">
                            {index + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="font-mono text-purple-300">{op?.kind}</div>
                            <div className="text-text-muted break-words">
                              {summarizeTransformOp(op)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  <label className="text-[11px] font-medium text-text-muted block mb-1">
                    JSON configuration
                  </label>
                  <textarea
                    value={draft}
                    onChange={(e) =>
                      setJsonDrafts((prev) => ({ ...prev, [providerId]: e.target.value }))
                    }
                    rows={Math.min(40, Math.max(8, draft.split("\n").length))}
                    disabled={loading}
                    spellCheck={false}
                    className="w-full rounded border border-border/50 bg-background/40 p-2 font-mono text-[11px] text-text resize-y"
                  />
                  {errorMsg && (
                    <p className="mt-2 text-xs text-red-400 break-words">⚠ {errorMsg}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Button
                      onClick={() => applyProviderJson(providerId)}
                      disabled={loading}
                      variant="secondary"
                      size="sm"
                      icon="check"
                    >
                      Apply JSON
                    </Button>
                    {hasDefault && (
                      <Button
                        onClick={() => resetProviderTransforms(providerId)}
                        disabled={loading}
                        variant="ghost"
                        size="sm"
                        icon="restart_alt"
                      >
                        Reset to defaults
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-[11px] text-text-muted">
            Native <code>claude</code> path: the DSL runs after the existing billing+sentinel
            prepend (executors/base.ts) — its default pipeline therefore omits{" "}
            <code>inject_billing_header</code>. CC bridge (<code>anthropic-compatible-cc-*</code>):
            the DSL runs as step 5b of the bridge request build (claudeCodeCompatible.ts), after
            cache-control and before ZWJ obfuscation. All ops are idempotent on re-run.
          </p>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              cached
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Client Cache Control</h3>
            <p className="text-sm text-text-muted">
              Configure whether OmniRoute preserves client-provided cache_control markers
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              value: "auto",
              label: "Auto (Recommended)",
              desc: "For deterministic Claude-compatible flows, preserve client-provided cache_control as-is. If the request has no cache_control, OmniRoute does not inject any bridge-owned markers for CC-compatible third-party proxy compatibility.",
            },
            {
              value: "always",
              label: "Always Preserve",
              desc: "Always forward client-provided cache_control headers to upstream providers as-is.",
            },
            {
              value: "never",
              label: "Never Preserve",
              desc: "Always remove client cache_control headers and let OmniRoute manage caching where native provider flows support it.",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting({ alwaysPreserveClientCache: option.value })}
              disabled={loading}
              className={`w-full flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all ${
                settings.alwaysPreserveClientCache === option.value
                  ? "border-green-500/50 bg-green-500/5 ring-1 ring-green-500/20"
                  : "border-border/50 hover:border-border hover:bg-surface/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    settings.alwaysPreserveClientCache === option.value
                      ? "text-green-400"
                      : "text-text-muted"
                  }`}
                >
                  {settings.alwaysPreserveClientCache === option.value
                    ? "check_circle"
                    : "radio_button_unchecked"}
                </span>
                <span
                  className={`text-sm font-medium ${settings.alwaysPreserveClientCache === option.value ? "text-green-400" : ""}`}
                >
                  {option.label}
                </span>
              </div>
              <p className="text-xs text-text-muted ml-7">{option.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                auto_awesome
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Zero-Config Auto-Routing</h3>
              <p className="text-sm text-text-muted mt-1">
                Enable automatic provider selection using the auto/ prefix. When enabled, requests
                to auto, auto/coding, auto/fast, etc. will dynamically route across all connected
                providers.
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.autoRoutingEnabled !== false}
                onChange={(e) => updateSetting({ autoRoutingEnabled: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border/30">
          <label className="block text-sm font-medium mb-2">Default Auto Variant</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { value: "lkgp", label: "LKGP", desc: "Last Known Good Provider" },
              { value: "coding", label: "Coding", desc: "Quality-first for code" },
              { value: "fast", label: "Fast", desc: "Low-latency routing" },
              { value: "cheap", label: "Cheap", desc: "Cost-optimized" },
              { value: "offline", label: "Offline", desc: "High availability" },
              { value: "smart", label: "Smart", desc: "Best discovery (10% explore)" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateSetting({ autoRoutingDefaultVariant: option.value })}
                disabled={loading}
                className={`p-2 rounded-lg border text-left transition-all ${
                  settings.autoRoutingDefaultVariant === option.value
                    ? "border-indigo-500/50 bg-indigo-500/5 ring-1 ring-indigo-500/20"
                    : "border-border/50 hover:border-border hover:bg-surface/30"
                }`}
              >
                <div className="flex items-center gap-1">
                  <span
                    className={`material-symbols-outlined text-[14px] ${
                      settings.autoRoutingDefaultVariant === option.value
                        ? "text-indigo-400"
                        : "text-text-muted"
                    }`}
                  >
                    {settings.autoRoutingDefaultVariant === option.value
                      ? "check_circle"
                      : "radio_button_unchecked"}
                  </span>
                  <span
                    className={`text-xs font-medium ${settings.autoRoutingDefaultVariant === option.value ? "text-indigo-400" : ""}`}
                  >
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
