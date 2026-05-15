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
      enabled: false,
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

const PROVIDER_TILE_DISPLAY: Record<
  string,
  { name: string; description: string; icon: string; tone: string }
> = {
  [PROVIDER_CLAUDE]: {
    name: "Claude (OAuth)",
    description:
      "Native Claude provider — OAuth-issued tokens. Cosmetic transforms only; billing/identity prepend handled by native executor.",
    icon: "anthropic",
    tone: "indigo",
  },
  [PROVIDER_CC_BRIDGE]: {
    name: "Claude-Code Bridge (anthropic-compatible-cc-*)",
    description:
      "Relay endpoints using API keys. Full transform pipeline (paragraph anchors + identity prefixes + replacements + SDK identity + billing header).",
    icon: "hub",
    tone: "purple",
  },
};

type TransformOpKind =
  | "drop_paragraph_if_contains"
  | "drop_paragraph_if_starts_with"
  | "replace_text"
  | "replace_regex"
  | "drop_block_if_contains"
  | "prepend_system_block"
  | "append_system_block"
  | "inject_billing_header"
  | "obfuscate_words";

const OP_KIND_LABELS: Record<TransformOpKind, string> = {
  drop_paragraph_if_contains: "Drop paragraph (contains)",
  drop_paragraph_if_starts_with: "Drop paragraph (starts with)",
  replace_text: "Replace text",
  replace_regex: "Replace regex",
  drop_block_if_contains: "Drop block (contains)",
  prepend_system_block: "Prepend system block",
  append_system_block: "Append system block",
  inject_billing_header: "Inject billing header",
  obfuscate_words: "Obfuscate words (ZWJ)",
};

function makeDefaultOp(kind: TransformOpKind): any {
  switch (kind) {
    case "drop_paragraph_if_contains":
      return { kind, needles: [""] };
    case "drop_paragraph_if_starts_with":
      return { kind, prefixes: [""] };
    case "replace_text":
      return { kind, match: "", replacement: "", allOccurrences: true };
    case "replace_regex":
      return { kind, pattern: "", flags: "g", replacement: "" };
    case "drop_block_if_contains":
      return { kind, needles: [""] };
    case "prepend_system_block":
      return { kind, text: "", idempotencyKey: "" };
    case "append_system_block":
      return { kind, text: "", idempotencyKey: "" };
    case "inject_billing_header":
      return {
        kind,
        entrypoint: "sdk-cli",
        versionFormat: "ex-machina",
        cchAlgo: "sha256-first-user",
      };
    case "obfuscate_words":
      return { kind, words: [""], targets: ["system", "messages", "tools"] };
  }
}

function OpEditor({ op, onChange }: { op: any; onChange: (next: any) => void }) {
  const inputCls =
    "w-full rounded border border-border/50 bg-background/40 px-2 py-1 text-xs font-mono text-text";
  const labelCls = "block text-[11px] text-text-muted mb-0.5";

  const updateField = (field: string, value: any) => onChange({ ...op, [field]: value });

  const updateListItem = (field: string, idx: number, value: string) => {
    const arr = [...(op[field] || [])];
    arr[idx] = value;
    onChange({ ...op, [field]: arr });
  };

  const addListItem = (field: string) => onChange({ ...op, [field]: [...(op[field] || []), ""] });

  const removeListItem = (field: string, idx: number) => {
    const arr = [...(op[field] || [])];
    arr.splice(idx, 1);
    onChange({ ...op, [field]: arr });
  };

  const renderList = (field: string) => (
    <div className="flex flex-col gap-1">
      {(op[field] || []).map((item: string, idx: number) => (
        <div key={idx} className="flex gap-1">
          <input
            className={inputCls + " flex-1"}
            value={item}
            onChange={(e) => updateListItem(field, idx, e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeListItem(field, idx)}
            className="text-red-400 hover:text-red-300 text-xs px-1"
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addListItem(field)}
        className="text-left text-[11px] text-primary hover:underline mt-0.5"
      >
        + Add entry
      </button>
    </div>
  );

  switch (op?.kind) {
    case "drop_paragraph_if_contains":
      return (
        <div>
          <label className={labelCls}>Needles (substrings to match)</label>
          {renderList("needles")}
          <label className="flex items-center gap-1.5 mt-1 text-[11px] text-text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={op.caseSensitive !== false}
              onChange={(e) => updateField("caseSensitive", e.target.checked)}
            />
            Case sensitive
          </label>
        </div>
      );
    case "drop_paragraph_if_starts_with":
      return (
        <div>
          <label className={labelCls}>Prefixes</label>
          {renderList("prefixes")}
          <label className="flex items-center gap-1.5 mt-1 text-[11px] text-text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={op.caseSensitive !== false}
              onChange={(e) => updateField("caseSensitive", e.target.checked)}
            />
            Case sensitive
          </label>
        </div>
      );
    case "replace_text":
      return (
        <div className="flex flex-col gap-1.5">
          <div>
            <label className={labelCls}>Match</label>
            <input
              className={inputCls}
              value={op.match || ""}
              onChange={(e) => updateField("match", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Replacement</label>
            <input
              className={inputCls}
              value={op.replacement || ""}
              onChange={(e) => updateField("replacement", e.target.value)}
            />
          </div>
          <label className="flex items-center gap-1.5 text-[11px] text-text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={op.allOccurrences !== false}
              onChange={(e) => updateField("allOccurrences", e.target.checked)}
            />
            Replace all occurrences
          </label>
        </div>
      );
    case "replace_regex":
      return (
        <div className="flex flex-col gap-1.5">
          <div>
            <label className={labelCls}>Pattern (regex)</label>
            <input
              className={inputCls}
              value={op.pattern || ""}
              onChange={(e) => updateField("pattern", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Flags</label>
            <input
              className={inputCls}
              value={op.flags || "g"}
              onChange={(e) => updateField("flags", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Replacement</label>
            <input
              className={inputCls}
              value={op.replacement || ""}
              onChange={(e) => updateField("replacement", e.target.value)}
            />
          </div>
        </div>
      );
    case "drop_block_if_contains":
      return (
        <div>
          <label className={labelCls}>Needles</label>
          {renderList("needles")}
        </div>
      );
    case "prepend_system_block":
    case "append_system_block":
      return (
        <div className="flex flex-col gap-1.5">
          <div>
            <label className={labelCls}>Block text</label>
            <textarea
              className={inputCls}
              rows={3}
              value={op.text || ""}
              onChange={(e) => updateField("text", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>
              Idempotency key (optional — skips if block starting with this key already present)
            </label>
            <input
              className={inputCls}
              value={op.idempotencyKey || ""}
              onChange={(e) => updateField("idempotencyKey", e.target.value)}
            />
          </div>
        </div>
      );
    case "inject_billing_header":
      return (
        <div className="flex flex-col gap-1.5">
          <div>
            <label className={labelCls}>Entrypoint</label>
            <input
              className={inputCls}
              value={op.entrypoint || "sdk-cli"}
              onChange={(e) => updateField("entrypoint", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Version format</label>
            <select
              className={inputCls}
              value={op.versionFormat || "ex-machina"}
              onChange={(e) => updateField("versionFormat", e.target.value)}
            >
              <option value="ex-machina">ex-machina (sha256 per-msg suffix)</option>
              <option value="omniroute-daystamp">omniroute-daystamp (sha256 day+version)</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>CCH algorithm</label>
            <select
              className={inputCls}
              value={op.cchAlgo || "sha256-first-user"}
              onChange={(e) => updateField("cchAlgo", e.target.value)}
            >
              <option value="sha256-first-user">sha256-first-user (ex-machina style)</option>
              <option value="xxhash64-body">xxhash64-body (body-level signing)</option>
              <option value="static-zero">static-zero (00000 placeholder)</option>
            </select>
          </div>
        </div>
      );
    case "obfuscate_words":
      return (
        <div className="flex flex-col gap-1.5">
          <div>
            <label className={labelCls}>Words to obfuscate (ZWJ inserted after first char)</label>
            {renderList("words")}
          </div>
          <div>
            <label className={labelCls}>Targets</label>
            <div className="flex gap-3">
              {["system", "messages", "tools"].map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-1 text-[11px] text-text-muted cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={(op.targets || ["system", "messages", "tools"]).includes(t)}
                    onChange={(e) => {
                      const cur: string[] = op.targets || ["system", "messages", "tools"];
                      const next = e.target.checked ? [...cur, t] : cur.filter((x) => x !== t);
                      updateField("targets", next);
                    }}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return <p className="text-[11px] text-text-muted">Unknown op kind: {op?.kind}</p>;
  }
}

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
  const [showJsonEditor, setShowJsonEditor] = useState<Record<string, boolean>>({});
  const [addOpKind, setAddOpKind] = useState<Record<string, TransformOpKind>>({});
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

  const updateOp = (providerId: string, opIndex: number, next: any) => {
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    const pipeline = [...(current.pipeline as any[])];
    pipeline[opIndex] = next;
    updateProviderTransforms(providerId, { enabled: current.enabled, pipeline });
  };

  const deleteOp = (providerId: string, opIndex: number) => {
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    const pipeline = (current.pipeline as any[]).filter((_, i) => i !== opIndex);
    updateProviderTransforms(providerId, { enabled: current.enabled, pipeline });
  };

  const moveOp = (providerId: string, opIndex: number, direction: -1 | 1) => {
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    const pipeline = [...(current.pipeline as any[])];
    const target = opIndex + direction;
    if (target < 0 || target >= pipeline.length) return;
    [pipeline[opIndex], pipeline[target]] = [pipeline[target], pipeline[opIndex]];
    updateProviderTransforms(providerId, { enabled: current.enabled, pipeline });
  };

  const addOp = (providerId: string) => {
    const kind = addOpKind[providerId] ?? "drop_paragraph_if_contains";
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    const pipeline = [...(current.pipeline as any[]), makeDefaultOp(kind)];
    updateProviderTransforms(providerId, { enabled: current.enabled, pipeline });
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
              security
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">CLI Fingerprint Matching</h3>
            <p className="text-sm text-text-muted mt-1">
              Match upstream CLI binary signatures and normalize system-block content so
              provider-side classifiers see a correct request regardless of which client sent it.
              Per-provider: header fingerprint (body/header shape reordering) + system-block
              transform pipeline (paragraph anchors, text replacements, ZWJ obfuscation, billing
              header injection). Issue{" "}
              <a
                href="https://github.com/diegosouzapw/OmniRoute/issues/2260"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                #2260
              </a>
              .
            </p>
            <p className="mt-1 text-xs text-text-muted">
              <span className="font-medium">No local CLI binary required</span> — OmniRoute builds
              the upstream-compatible request server-side.
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
                      {forced && (
                        <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-400">
                          Managed
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-xs text-text-muted">{description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-1">System-block transform pipeline</h4>
          <p className="text-xs text-text-muted mb-3">
            Per-provider ordered pipeline. Add/edit ops via the form below, or import JSON for bulk
            changes. All ops are idempotent on re-run.
          </p>

          <div className="flex flex-col gap-5">
            {Object.entries(systemTransforms.providers).map(([providerId, providerCfg]) => {
              const display = PROVIDER_TILE_DISPLAY[providerId] ?? {
                name: providerId,
                description: "Custom provider.",
                icon: "extension",
                tone: "purple",
              };
              const draft = jsonDrafts[providerId] ?? JSON.stringify(providerCfg, null, 2);
              const errorMsg = jsonErrors[providerId] ?? null;
              const opCount = Array.isArray(providerCfg.pipeline) ? providerCfg.pipeline.length : 0;
              const hasDefault = Boolean(
                (DEFAULT_SYSTEM_TRANSFORMS_CLIENT.providers as Record<string, unknown>)[providerId]
              );
              const isJsonOpen = showJsonEditor[providerId] ?? false;
              const selectedKind =
                (addOpKind[providerId] as TransformOpKind | undefined) ??
                "drop_paragraph_if_contains";

              return (
                <div
                  key={providerId}
                  className="rounded-lg border border-border/50 bg-surface/20 p-4"
                >
                  {/* Provider header row */}
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

                  {/* Pipeline op list with per-op editor */}
                  {opCount > 0 && (
                    <ol className="flex flex-col gap-2 mb-3">
                      {(providerCfg.pipeline as any[]).map((op, index) => (
                        <li
                          key={index}
                          className="rounded border border-border/30 bg-background/30 p-2 text-xs"
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-[10px] font-semibold text-purple-400">
                              {index + 1}
                            </span>
                            <span className="font-mono text-purple-300 flex-1">{op?.kind}</span>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                title="Move up"
                                disabled={loading || index === 0}
                                onClick={() => moveOp(providerId, index, -1)}
                                className="text-text-muted hover:text-text disabled:opacity-30 px-1"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                title="Move down"
                                disabled={loading || index === opCount - 1}
                                onClick={() => moveOp(providerId, index, 1)}
                                className="text-text-muted hover:text-text disabled:opacity-30 px-1"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                title="Delete op"
                                disabled={loading}
                                onClick={() => deleteOp(providerId, index)}
                                className="text-red-400 hover:text-red-300 disabled:opacity-30 px-1"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          <div className="ml-7">
                            <OpEditor
                              op={op}
                              onChange={(next) => updateOp(providerId, index, next)}
                            />
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {/* Add op row */}
                  <div className="flex items-center gap-2 mb-3">
                    <select
                      value={selectedKind}
                      onChange={(e) =>
                        setAddOpKind((prev) => ({
                          ...prev,
                          [providerId]: e.target.value as TransformOpKind,
                        }))
                      }
                      disabled={loading}
                      className="flex-1 rounded border border-border/50 bg-background/40 px-2 py-1 text-xs font-mono text-text"
                    >
                      {(Object.keys(OP_KIND_LABELS) as TransformOpKind[]).map((kind) => (
                        <option key={kind} value={kind}>
                          {OP_KIND_LABELS[kind]}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={() => addOp(providerId)}
                      disabled={loading}
                      variant="secondary"
                      size="sm"
                      icon="add"
                    >
                      Add op
                    </Button>
                  </div>

                  {/* JSON import section (collapsible) */}
                  <div className="border-t border-border/20 pt-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setShowJsonEditor((prev) => ({ ...prev, [providerId]: !isJsonOpen }))
                      }
                      className="text-[11px] text-primary hover:underline"
                    >
                      {isJsonOpen ? "▾ Hide JSON editor" : "▸ Import / export JSON"}
                    </button>
                    {isJsonOpen && (
                      <div className="mt-2">
                        <label className="text-[11px] font-medium text-text-muted block mb-1">
                          JSON (edit &amp; Apply, or paste to import)
                        </label>
                        <textarea
                          value={draft}
                          onChange={(e) =>
                            setJsonDrafts((prev) => ({ ...prev, [providerId]: e.target.value }))
                          }
                          rows={Math.min(40, Math.max(6, draft.split("\n").length))}
                          disabled={loading}
                          spellCheck={false}
                          className="w-full rounded border border-border/50 bg-background/40 p-2 font-mono text-[11px] text-text resize-y"
                        />
                        {errorMsg && (
                          <p className="mt-1 text-xs text-red-400 break-words">⚠ {errorMsg}</p>
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
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-[11px] text-text-muted">
            <code>claude</code> path: DSL runs after native billing+sentinel prepend — omit{" "}
            <code>inject_billing_header</code> in that pipeline.{" "}
            <code>anthropic-compatible-cc-*</code>: DSL runs at step 5b (after cache-control, before
            ZWJ obfuscation).
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
