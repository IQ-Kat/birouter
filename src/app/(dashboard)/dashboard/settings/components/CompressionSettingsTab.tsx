"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@/shared/components";
import { useTranslations } from "next-intl";

type CompressionMode = "off" | "lite" | "standard" | "aggressive" | "ultra";

interface CavemanConfig {
  enabled: boolean;
  compressRoles: ("user" | "assistant" | "system")[];
  skipRules: string[];
  minMessageLength: number;
  preservePatterns: string[];
}

interface CompressionConfig {
  enabled: boolean;
  defaultMode: CompressionMode;
  autoTriggerTokens: number;
  cacheMinutes: number;
  preserveSystemPrompt: boolean;
  comboOverrides: Record<string, CompressionMode>;
  cavemanConfig?: CavemanConfig;
}

const MODES: { value: CompressionMode; labelKey: string; descKey: string; icon: string }[] = [
  {
    value: "off",
    labelKey: "compressionModeOff",
    descKey: "compressionModeOffDesc",
    icon: "block",
  },
  {
    value: "lite",
    labelKey: "compressionModeLite",
    descKey: "compressionModeLiteDesc",
    icon: "compress",
  },
  {
    value: "standard",
    labelKey: "compressionModeStandard",
    descKey: "compressionModeStandardDesc",
    icon: "speed",
  },
];

const ROLE_OPTIONS: { value: "user" | "assistant" | "system"; labelKey: string }[] = [
  { value: "user", labelKey: "compressionRoleUser" },
  { value: "assistant", labelKey: "compressionRoleAssistant" },
  { value: "system", labelKey: "compressionRoleSystem" },
];

const ALL_CAVEMAN_RULES = [
  "polite_framing",
  "hedging",
  "verbose_instructions",
  "filler_adverbs",
  "filler_phrases",
  "redundant_openers",
  "verbose_requests",
  "self_reference",
  "excessive_gratitude",
  "qualifier_removal",
  "compound_collapse",
  "explanatory_prefix",
  "question_to_directive",
  "context_setup",
  "intent_clarification",
  "background_removal",
  "meta_commentary",
  "purpose_statement",
  "list_conjunction",
  "purpose_phrases",
  "redundant_quantifiers",
  "verbose_connectors",
  "transition_removal",
  "emphasis_removal",
  "passive_voice",
  "repeated_context",
  "repeated_question",
  "reestablished_context",
  "summary_replacement",
];

export default function CompressionSettingsTab() {
  const t = useTranslations("settings");
  const [config, setConfig] = useState<CompressionConfig>({
    enabled: false,
    defaultMode: "off",
    autoTriggerTokens: 0,
    cacheMinutes: 5,
    preserveSystemPrompt: true,
    comboOverrides: {},
    cavemanConfig: {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    },
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"" | "saved" | "error">("");

  useEffect(() => {
    fetch("/api/settings/compression")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async (updates: Partial<CompressionConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings/compression", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const toggleCavemanRole = (role: "user" | "assistant" | "system") => {
    const currentRoles = config.cavemanConfig?.compressRoles ?? ["user"];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r) => r !== role)
      : [...currentRoles, role];
    save({
      cavemanConfig: { ...config.cavemanConfig!, compressRoles: newRoles },
    });
  };

  const toggleCavemanRule = (rule: string) => {
    const currentSkip = config.cavemanConfig?.skipRules ?? [];
    const newSkip = currentSkip.includes(rule)
      ? currentSkip.filter((r) => r !== rule)
      : [...currentSkip, rule];
    save({
      cavemanConfig: { ...config.cavemanConfig!, skipRules: newSkip },
    });
  };

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-sm text-text-muted">{t("loading")}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            compress
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("compressionTitle")}</h3>
          <p className="text-sm text-text-muted">{t("compressionDesc")}</p>
        </div>
        {status === "saved" && (
          <span className="ml-auto text-xs font-medium text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> {t("saved")}
          </span>
        )}
        {status === "error" && (
          <span className="ml-auto text-xs font-medium text-red-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span> {t("saveFailed")}
          </span>
        )}
      </div>

      <div className="space-y-6">
        <label className="flex items-center justify-between">
          <span className="text-sm text-text-muted">{t("enabled")}</span>
          <button
            onClick={() => save({ enabled: !config.enabled })}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              config.enabled ? "bg-green-500" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                config.enabled ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </label>

        {config.enabled && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-main">{t("compressionMode")}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  onClick={() => save({ defaultMode: m.value })}
                  disabled={saving}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                    config.defaultMode === m.value
                      ? "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20"
                      : "border-border/50 hover:border-border hover:bg-surface/30"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] mt-0.5 ${
                      config.defaultMode === m.value ? "text-blue-500" : "text-text-muted"
                    }`}
                  >
                    {m.icon}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        config.defaultMode === m.value ? "text-blue-400" : ""
                      }`}
                    >
                      {t(m.labelKey)}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{t(m.descKey)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {config.enabled && (
          <div className="space-y-3 pt-4 border-t border-border/30">
            <h4 className="text-sm font-medium text-text-main">{t("compressionGeneral")}</h4>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionAutoTrigger")}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100000}
                  value={config.autoTriggerTokens}
                  onChange={(e) => save({ autoTriggerTokens: parseInt(e.target.value) || 0 })}
                  className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                />
                <span className="text-xs text-text-muted">{t("tokens")}</span>
              </div>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionCacheTTL")}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={1440}
                  value={config.cacheMinutes}
                  onChange={(e) => save({ cacheMinutes: parseInt(e.target.value) || 5 })}
                  className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                />
                <span className="text-xs text-text-muted">{t("minutes")}</span>
              </div>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionPreserveSystem")}</span>
              <button
                onClick={() => save({ preserveSystemPrompt: !config.preserveSystemPrompt })}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.preserveSystemPrompt ? "bg-green-500" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.preserveSystemPrompt ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </label>
          </div>
        )}

        {config.enabled &&
          config.defaultMode !== "off" &&
          config.defaultMode !== "lite" &&
          config.cavemanConfig && (
            <div className="space-y-3 pt-4 border-t border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-text-main">
                    {t("compressionCavemanConfig")}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    {t("compressionCavemanConfigDesc")}
                  </p>
                </div>
                <button
                  onClick={() =>
                    save({
                      cavemanConfig: {
                        ...config.cavemanConfig!,
                        enabled: !config.cavemanConfig!.enabled,
                      },
                    })
                  }
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    config.cavemanConfig.enabled ? "bg-green-500" : "bg-border"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      config.cavemanConfig.enabled ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              {config.cavemanConfig.enabled && (
                <>
                  <div className="space-y-2">
                    <p className="text-sm text-text-muted">{t("compressionRoles")}</p>
                    <div className="flex flex-wrap gap-2">
                      {ROLE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => toggleCavemanRole(opt.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            config.cavemanConfig!.compressRoles.includes(opt.value)
                              ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                              : "border-border/50 text-text-muted hover:border-border"
                          }`}
                        >
                          {t(opt.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">{t("compressionMinLength")}</span>
                    <input
                      type="number"
                      min={0}
                      max={100000}
                      value={config.cavemanConfig.minMessageLength}
                      onChange={(e) =>
                        save({
                          cavemanConfig: {
                            ...config.cavemanConfig!,
                            minMessageLength: parseInt(e.target.value) || 50,
                          },
                        })
                      }
                      className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                    />
                  </label>

                  <div className="space-y-2">
                    <p className="text-sm text-text-muted">{t("compressionSkipRules")}</p>
                    <p className="text-xs text-text-muted">{t("compressionSkipRulesDesc")}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {ALL_CAVEMAN_RULES.map((rule) => (
                        <button
                          key={rule}
                          onClick={() => toggleCavemanRule(rule)}
                          className={`px-2 py-1 rounded text-xs border transition-all ${
                            config.cavemanConfig!.skipRules.includes(rule)
                              ? "border-red-500/50 bg-red-500/10 text-red-400 line-through"
                              : "border-border/50 text-text-muted hover:border-border"
                          }`}
                        >
                          {rule.replace(/_/g, " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-text-muted">{t("compressionPreservePatterns")}</p>
                    <p className="text-xs text-text-muted">
                      {t("compressionPreservePatternsDesc")}
                    </p>
                    <textarea
                      value={(config.cavemanConfig.preservePatterns ?? []).join("\n")}
                      onChange={(e) => {
                        const patterns = e.target.value
                          .split("\n")
                          .map((p) => p.trim())
                          .filter(Boolean);
                        save({
                          cavemanConfig: {
                            ...config.cavemanConfig!,
                            preservePatterns: patterns,
                          },
                        });
                      }}
                      placeholder="https?://\S+\n```[\s\S]*?```"
                      className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-border bg-surface text-text-main font-mono resize-y"
                    />
                  </div>
                </>
              )}
            </div>
          )}
      </div>
    </Card>
  );
}
