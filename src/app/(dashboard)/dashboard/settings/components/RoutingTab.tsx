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

// Mirror of DEFAULT_CC_BRIDGE_PIPELINE from open-sse/services/ccBridgeTransforms.ts.
// Kept client-side so the UI can render + reset to defaults without a server roundtrip.
// Server is the source of truth — if pipeline is empty/missing on PATCH, server falls back to its own defaults.
const DEFAULT_CC_BRIDGE_PIPELINE_CLIENT = [
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
  },
  {
    kind: "replace_text",
    match: "Here is some useful information about the environment you are running in:",
    replacement: "Environment context you are running in:",
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
];

const TRANSFORM_OP_KINDS = [
  "drop_paragraph_if_contains",
  "drop_paragraph_if_starts_with",
  "replace_text",
  "replace_regex",
  "drop_block_if_contains",
  "prepend_system_block",
  "append_system_block",
  "inject_billing_header",
] as const;

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
    default:
      return JSON.stringify(op);
  }
}

function makeBlankOp(kind: string): any {
  switch (kind) {
    case "drop_paragraph_if_contains":
      return { kind, needles: [""] };
    case "drop_paragraph_if_starts_with":
      return { kind, prefixes: [""] };
    case "replace_text":
      return { kind, match: "", replacement: "" };
    case "replace_regex":
      return { kind, pattern: "", flags: "g", replacement: "" };
    case "drop_block_if_contains":
      return { kind, needles: [""] };
    case "prepend_system_block":
      return { kind, text: "" };
    case "append_system_block":
      return { kind, text: "" };
    case "inject_billing_header":
      return {
        kind,
        entrypoint: "sdk-cli",
        versionFormat: "ex-machina",
        cchAlgo: "sha256-first-user",
      };
    default:
      return { kind };
  }
}

export default function RoutingTab() {
  const [settings, setSettings] = useState<any>({
    alwaysPreserveClientCache: "auto",
    antigravitySignatureCacheMode: "enabled",
    cliCompatProviders: [],
    autoRoutingEnabled: true,
    autoRoutingDefaultVariant: "lkgp",
    ccBridgeTransforms: { enabled: true, pipeline: DEFAULT_CC_BRIDGE_PIPELINE_CLIENT },
  });
  const [addOpKind, setAddOpKind] = useState<string>("drop_paragraph_if_contains");
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

  const ccBridgeTransforms = useMemo(() => {
    const raw = settings.ccBridgeTransforms;
    if (raw && typeof raw === "object" && Array.isArray(raw.pipeline)) {
      return { enabled: raw.enabled !== false, pipeline: raw.pipeline };
    }
    return { enabled: true, pipeline: DEFAULT_CC_BRIDGE_PIPELINE_CLIENT };
  }, [settings.ccBridgeTransforms]);

  const updateCcBridgeTransforms = (next: { enabled: boolean; pipeline: any[] }) => {
    updateSetting({ ccBridgeTransforms: next });
  };

  const moveCcBridgeOp = (index: number, direction: -1 | 1) => {
    const pipeline = [...ccBridgeTransforms.pipeline];
    const target = index + direction;
    if (target < 0 || target >= pipeline.length) return;
    [pipeline[index], pipeline[target]] = [pipeline[target], pipeline[index]];
    updateCcBridgeTransforms({ enabled: ccBridgeTransforms.enabled, pipeline });
  };

  const deleteCcBridgeOp = (index: number) => {
    const pipeline = ccBridgeTransforms.pipeline.filter((_, i) => i !== index);
    updateCcBridgeTransforms({ enabled: ccBridgeTransforms.enabled, pipeline });
  };

  const addCcBridgeOp = () => {
    const pipeline = [...ccBridgeTransforms.pipeline, makeBlankOp(addOpKind)];
    updateCcBridgeTransforms({ enabled: ccBridgeTransforms.enabled, pipeline });
  };

  const resetCcBridgePipeline = () => {
    updateCcBridgeTransforms({
      enabled: true,
      pipeline: DEFAULT_CC_BRIDGE_PIPELINE_CLIENT.map((op) => ({ ...op })),
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
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              fingerprint
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("cliFingerprint")}</h3>
            <p className="text-sm text-text-muted">{t("cliFingerprintDesc")}</p>
            <p className="mt-1 text-xs text-text-muted">
              {t("cliFingerprintEnabled", { count: cliCompatProviderSet.size })}
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {CLI_COMPAT_TOGGLE_IDS.map((providerId) => {
            const normalizedProviderId = normalizeCliCompatProviderId(providerId);
            const providerDisplay = CLI_COMPAT_PROVIDER_DISPLAY[providerId];
            // Claude OAuth force-applies the fingerprint regardless of this toggle
            // (base.ts: shouldFingerprint), so render the tile as locked-on.
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
                  <span className="flex items-center gap-2">
                    <span
                      className={`block text-sm font-medium ${checked ? "text-indigo-400" : ""}`}
                    >
                      {label}
                    </span>
                    {forced ? (
                      <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-400">
                        {t("forcedFingerprintBadge")}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs text-text-muted">{description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                tune
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("ccBridgeTransforms")}</h3>
              <p className="text-sm text-text-muted mt-1">{t("ccBridgeTransformsDesc")}</p>
              <p className="mt-1 text-xs text-text-muted">
                {t("ccBridgeTransformsEnabled", { count: ccBridgeTransforms.pipeline.length })}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={ccBridgeTransforms.enabled}
                onChange={(e) =>
                  updateCcBridgeTransforms({
                    enabled: e.target.checked,
                    pipeline: ccBridgeTransforms.pipeline,
                  })
                }
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        {ccBridgeTransforms.pipeline.length === 0 ? (
          <p className="text-xs text-text-muted italic mb-3">{t("ccBridgeTransformsEmpty")}</p>
        ) : (
          <ol className="flex flex-col gap-2 mb-3">
            {ccBridgeTransforms.pipeline.map((op: any, index: number) => (
              <li
                key={index}
                className="flex items-start gap-2 rounded-lg border border-border/50 bg-surface/30 p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-xs font-semibold text-purple-400">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-mono text-purple-300">{op?.kind}</div>
                  <div className="mt-1 text-xs text-text-muted break-words">
                    {summarizeTransformOp(op)}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveCcBridgeOp(index, -1)}
                    disabled={loading || index === 0}
                    title={t("ccBridgeTransformsMoveUp")}
                    aria-label={t("ccBridgeTransformsMoveUp")}
                    className="rounded p-1 text-text-muted hover:bg-surface hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      arrow_upward
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveCcBridgeOp(index, 1)}
                    disabled={loading || index === ccBridgeTransforms.pipeline.length - 1}
                    title={t("ccBridgeTransformsMoveDown")}
                    aria-label={t("ccBridgeTransformsMoveDown")}
                    className="rounded p-1 text-text-muted hover:bg-surface hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      arrow_downward
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCcBridgeOp(index)}
                    disabled={loading}
                    title={t("ccBridgeTransformsDelete")}
                    aria-label={t("ccBridgeTransformsDelete")}
                    className="rounded p-1 text-text-muted hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      delete
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={addOpKind}
            onChange={(e) => setAddOpKind(e.target.value)}
            disabled={loading}
            className="rounded-lg border border-border/50 bg-surface px-3 py-1.5 text-xs text-text"
          >
            {TRANSFORM_OP_KINDS.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
          <Button
            onClick={addCcBridgeOp}
            disabled={loading}
            variant="secondary"
            size="sm"
            icon="add"
          >
            {t("ccBridgeTransformsAddOp")}
          </Button>
          <Button
            onClick={resetCcBridgePipeline}
            disabled={loading}
            variant="ghost"
            size="sm"
            icon="restart_alt"
          >
            {t("ccBridgeTransformsReset")}
          </Button>
        </div>

        <p className="mt-3 text-[11px] text-text-muted">
          Pipeline applies in order at step 5b of the CC bridge request build (after cache-control,
          before ZWJ obfuscation). All ops are idempotent on re-run. Op editing beyond
          reorder/delete requires PATCH via /api/settings — full per-op form is coming in a
          follow-up; for now, edit the JSON directly via the API to fine-tune individual ops.
        </p>
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
