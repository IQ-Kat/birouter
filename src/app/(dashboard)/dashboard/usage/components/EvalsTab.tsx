"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, EmptyState, DataTable, FilterBar, Select } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

type EvalTargetType = "suite-default" | "model" | "combo";

interface EvalTargetOption {
  key: string;
  type: EvalTargetType;
  id: string | null;
  label: string;
  description: string;
}

interface EvalApiKeyOption {
  id: string;
  name: string;
  isActive: boolean;
}

interface EvalCasePreview {
  id: string;
  name: string;
  model?: string;
  input?: {
    messages?: Array<{ role: string; content: string }>;
  };
  expected?: {
    strategy?: string;
    value?: string;
  };
  tags?: string[];
}

interface EvalSuite {
  id: string;
  name: string;
  description?: string;
  caseCount?: number;
  cases?: EvalCasePreview[];
}

interface EvalResult {
  caseId: string;
  caseName: string;
  passed: boolean;
  durationMs: number;
  error?: string;
  details?: {
    expected?: string;
    actual?: string;
    actualSnippet?: string;
    searchTerm?: string;
    pattern?: string;
  };
}

interface EvalRunSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
}

interface EvalRun {
  id: string;
  runGroupId: string | null;
  suiteId: string;
  suiteName: string;
  target: {
    type: EvalTargetType;
    id: string | null;
    key: string;
    label: string;
  };
  avgLatencyMs: number;
  summary: EvalRunSummary;
  results: EvalResult[];
  outputs: Record<string, string>;
  createdAt: string;
}

interface EvalScorecard {
  suites: number;
  totalCases: number;
  totalPassed: number;
  overallPassRate: number;
  perSuite: Array<{ id: string; name: string; passRate: number }>;
}

interface EvalSuiteRunState {
  runs: EvalRun[];
  scorecard: EvalScorecard | null;
}

interface EvalsDashboardPayload {
  suites: EvalSuite[];
  recentRuns: EvalRun[];
  scorecard: EvalScorecard | null;
  targets: EvalTargetOption[];
  apiKeys: EvalApiKeyOption[];
}

const STRATEGIES = [
  {
    name: "contains",
    labelKey: "evalsStrategyContainsLabel",
    icon: "search",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    descriptionKey: "evalsStrategyContainsDescription",
  },
  {
    name: "exact",
    labelKey: "evalsStrategyExactLabel",
    icon: "check_circle",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    descriptionKey: "evalsStrategyExactDescription",
  },
  {
    name: "regex",
    labelKey: "evalsStrategyRegexLabel",
    icon: "code",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    descriptionKey: "evalsStrategyRegexDescription",
  },
  {
    name: "custom",
    labelKey: "evalsStrategyCustomLabel",
    icon: "tune",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    descriptionKey: "evalsStrategyCustomDescription",
  },
];

const RESULT_COLUMNS = [
  { key: "caseName", labelKey: "columnCase" },
  { key: "status", labelKey: "columnStatus" },
  { key: "durationMs", labelKey: "columnLatency" },
  { key: "details", labelKey: "columnDetails" },
];

const HISTORY_COLUMNS = [
  { key: "suiteName", labelKey: "historyColumnSuiteName" },
  { key: "target", labelKey: "historyColumnTarget" },
  { key: "passRate", labelKey: "historyColumnPassRate" },
  { key: "avgLatencyMs", labelKey: "historyColumnAvgLatencyMs" },
  { key: "createdAt", labelKey: "historyColumnCreatedAt" },
];

const NO_COMPARE_TARGET = "__none__";
const AUTO_API_KEY = "__auto__";

function getTargetLabel(
  target: { type: EvalTargetType; id: string | null },
  t: (key: string, values?: Record<string, unknown>) => string
): string {
  if (target.type === "combo") {
    return `${t("targetTypeCombo")}: ${target.id || "—"}`;
  }

  if (target.type === "model") {
    return `${t("targetTypeModel")}: ${target.id || "—"}`;
  }

  return t("targetSuiteDefaults");
}

function parseTargetKey(value: string): { type: EvalTargetType; id: string | null } {
  const [rawType, ...rawId] = value.split(":");
  const idValue = rawId.join(":");

  if (rawType === "combo") {
    return { type: "combo", id: idValue || null };
  }

  if (rawType === "model") {
    return { type: "model", id: idValue || null };
  }

  return { type: "suite-default", id: null };
}

function formatTimestamp(value: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getResultDetails(
  result: EvalResult,
  t: (key: string, values?: Record<string, unknown>) => string
): string {
  if (result.error) {
    return `${t("resultErrorLabel")}: ${result.error}`;
  }

  if (result.details?.searchTerm) {
    return t("detailsContains", { term: result.details.searchTerm });
  }

  if (result.details?.pattern) {
    return t("detailsRegex", { pattern: result.details.pattern });
  }

  if (result.details?.expected) {
    return t("detailsExpected", {
      expected: String(result.details.expected).slice(0, 60),
    });
  }

  if (result.details?.actualSnippet) {
    return t("actualOutputLabel", {
      value: String(result.details.actualSnippet).slice(0, 60),
    });
  }

  return "—";
}

export default function EvalsTab() {
  const t = useTranslations("usage");
  const notify = useNotificationStore();
  const [suites, setSuites] = useState<EvalSuite[]>([]);
  const [recentRuns, setRecentRuns] = useState<EvalRun[]>([]);
  const [scorecard, setScorecard] = useState<EvalScorecard | null>(null);
  const [targetOptions, setTargetOptions] = useState<EvalTargetOption[]>([]);
  const [apiKeys, setApiKeys] = useState<EvalApiKeyOption[]>([]);
  const [selectedTargetKey, setSelectedTargetKey] = useState("suite-default:__default__");
  const [compareTargetKey, setCompareTargetKey] = useState("");
  const [selectedApiKeyId, setSelectedApiKeyId] = useState("");
  const [suiteRuns, setSuiteRuns] = useState<Record<string, EvalSuiteRunState>>({});
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const response = await fetch("/api/evals");
        if (!response.ok) {
          throw new Error(t("notifyEvalRunFailed"));
        }

        const payload = (await response.json()) as EvalsDashboardPayload;
        if (!isMounted) return;

        setSuites(Array.isArray(payload.suites) ? payload.suites : []);
        setRecentRuns(Array.isArray(payload.recentRuns) ? payload.recentRuns : []);
        setScorecard(payload.scorecard || null);
        setTargetOptions(Array.isArray(payload.targets) ? payload.targets : []);
        setApiKeys(Array.isArray(payload.apiKeys) ? payload.apiKeys : []);
      } catch {
        if (isMounted) {
          notify.error(t("notifyEvalLoadFailed"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [notify, t]);

  useEffect(() => {
    if (targetOptions.length === 0) return;
    if (targetOptions.some((option) => option.key === selectedTargetKey)) return;
    setSelectedTargetKey(targetOptions[0]?.key || "suite-default:__default__");
  }, [selectedTargetKey, targetOptions]);

  useEffect(() => {
    if (!compareTargetKey) return;
    if (compareTargetKey === selectedTargetKey) {
      setCompareTargetKey("");
    }
  }, [compareTargetKey, selectedTargetKey]);

  const filteredSuites = !search.trim()
    ? suites
    : suites.filter((suite) => {
        const term = search.toLowerCase();
        return (
          suite.name?.toLowerCase().includes(term) ||
          suite.id?.toLowerCase().includes(term) ||
          suite.description?.toLowerCase().includes(term)
        );
      });

  const totalCases = suites.reduce(
    (sum, suite) => sum + (suite.cases?.length || suite.caseCount || 0),
    0
  );

  const uniqueModels = [
    ...new Set(
      suites
        .flatMap((suite) => suite.cases || [])
        .map((evalCase) => evalCase.model)
        .filter((model): model is string => typeof model === "string" && model.trim().length > 0)
    ),
  ];

  const compareOptions = targetOptions.filter((option) => option.key !== selectedTargetKey);

  async function refreshDashboard() {
    const response = await fetch("/api/evals");
    if (!response.ok) {
      throw new Error(t("notifyEvalLoadFailed"));
    }
    const payload = (await response.json()) as EvalsDashboardPayload;
    setRecentRuns(Array.isArray(payload.recentRuns) ? payload.recentRuns : []);
    setScorecard(payload.scorecard || null);
    setTargetOptions(Array.isArray(payload.targets) ? payload.targets : []);
    setApiKeys(Array.isArray(payload.apiKeys) ? payload.apiKeys : []);
    setSuites(Array.isArray(payload.suites) ? payload.suites : []);
  }

  async function handleRunEval(suite: EvalSuite) {
    const cases = suite.cases || [];
    if (cases.length === 0) {
      notify.warning(t("notifyNoTestCases"));
      return;
    }

    if (compareTargetKey && compareTargetKey === selectedTargetKey) {
      notify.warning(t("notifySelectDifferentCompareTarget"));
      return;
    }

    setRunning(suite.id);

    try {
      const response = await fetch("/api/evals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suiteId: suite.id,
          target: parseTargetKey(selectedTargetKey),
          ...(compareTargetKey ? { compareTarget: parseTargetKey(compareTargetKey) } : {}),
          ...(selectedApiKeyId ? { apiKeyId: selectedApiKeyId } : {}),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(
          payload?.error?.message || payload?.error || payload?.message || t("notifyEvalRunFailed")
        );
      }

      const runs = Array.isArray(payload.runs) ? (payload.runs as EvalRun[]) : [];
      const comparisonScorecard = (payload.scorecard || null) as EvalScorecard | null;
      setSuiteRuns((prev) => ({
        ...prev,
        [suite.id]: {
          runs,
          scorecard: comparisonScorecard,
        },
      }));
      setExpanded(suite.id);

      if (Array.isArray(payload.recentRuns)) {
        setRecentRuns(payload.recentRuns as EvalRun[]);
      } else {
        await refreshDashboard();
      }

      if (payload.historyScorecard) {
        setScorecard(payload.historyScorecard as EvalScorecard);
      }

      const primaryRun = runs[0];
      if (primaryRun) {
        const score = primaryRun.summary.passRate;
        notify.success(
          compareTargetKey
            ? t("compareCompletedWithScore", { score })
            : t("runCompletedWithScore", { score }),
          t("notifyEvalTitle", { name: suite.name || suite.id })
        );
      }
    } catch (error: any) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: error?.message || t("notAvailableSymbol"),
        }),
        t("notifyEvalTitle", { name: suite.name || suite.id })
      );
    } finally {
      setRunning(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-muted p-8 animate-pulse">
        <span className="material-symbols-outlined text-[20px]">science</span>
        {t("evalsLoading")}
      </div>
    );
  }

  if (suites.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <HeroSection t={t} />
        <EmptyState
          icon="science"
          title={t("noEvalSuitesFound")}
          description={t("noEvalSuitesDescription")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <HeroSection t={t} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            {t("statsSuites")}
          </span>
          <div className="text-2xl font-bold mt-1 text-violet-400">{suites.length}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            {t("statsTestCases")}
          </span>
          <div className="text-2xl font-bold mt-1 text-sky-400">{totalCases}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            {t("statsModels")}
          </span>
          <div className="text-2xl font-bold mt-1 text-emerald-400">{uniqueModels.length}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            {t("statsCoverage")}
          </span>
          <div className="text-2xl font-bold mt-1 text-amber-400">
            {t("statsStrategiesCount", { count: STRATEGIES.length })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[20px]">route</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("evalControlsTitle")}</h3>
            <p className="text-xs text-text-muted">{t("evalControlsHint")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Select
            label={t("evalTarget")}
            value={selectedTargetKey}
            onChange={(event) => setSelectedTargetKey(event.target.value)}
            options={targetOptions.map((option) => ({
              value: option.key,
              label: getTargetLabel(option, t),
            }))}
            hint={t("evalTargetHint")}
          />
          <Select
            label={t("evalCompareTarget")}
            value={compareTargetKey || NO_COMPARE_TARGET}
            onChange={(event) =>
              setCompareTargetKey(
                event.target.value === NO_COMPARE_TARGET ? "" : event.target.value
              )
            }
            options={[
              {
                value: NO_COMPARE_TARGET,
                label: t("evalCompareOptional"),
              },
              ...compareOptions.map((option) => ({
                value: option.key,
                label: getTargetLabel(option, t),
              })),
            ]}
            hint={t("evalCompareHint")}
          />
          <Select
            label={t("evalApiKey")}
            value={selectedApiKeyId || AUTO_API_KEY}
            onChange={(event) =>
              setSelectedApiKeyId(event.target.value === AUTO_API_KEY ? "" : event.target.value)
            }
            options={[
              {
                value: AUTO_API_KEY,
                label: t("evalApiKeyAuto"),
              },
              ...apiKeys
                .filter((key) => key.isActive !== false)
                .map((key) => ({
                  value: key.id,
                  label: key.name,
                })),
            ]}
            hint={t("evalApiKeyHint")}
          />
        </div>
      </Card>

      {scorecard && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("scorecardTitle")}</h3>
              <p className="text-xs text-text-muted">{t("scorecardHint")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {t("scorecardSuites")}
              </p>
              <p className="text-2xl font-bold text-violet-400 mt-1">{scorecard.suites}</p>
            </Card>
            <Card className="px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {t("scorecardCases")}
              </p>
              <p className="text-2xl font-bold text-sky-400 mt-1">{scorecard.totalCases}</p>
            </Card>
            <Card className="px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {t("scorecardPassed")}
              </p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{scorecard.totalPassed}</p>
            </Card>
            <Card className="px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {t("scorecardPassRate")}
              </p>
              <p className="text-2xl font-bold text-amber-400 mt-1">{scorecard.overallPassRate}%</p>
            </Card>
          </div>

          {scorecard.perSuite.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
              {scorecard.perSuite.slice(0, 6).map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-text-main truncate">
                      {entry.name}
                    </span>
                    <span className="text-xs font-semibold text-primary">{entry.passRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        <button
          onClick={() => setShowHowItWorks((prev) => !prev)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/30 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[20px]">help</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-main">{t("howItWorks")}</h3>
              <p className="text-xs text-text-muted">{t("howItWorksSubtitle")}</p>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-text-muted transition-transform duration-200 ${
              showHowItWorks ? "rotate-180" : ""
            }`}
          >
            expand_more
          </span>
        </button>

        {showHowItWorks && (
          <div className="px-6 pb-6 border-t border-border/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-violet-500/5 border border-violet-500/10">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-violet-400">1</span>
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-1">{t("define")}</h4>
                <p className="text-xs text-text-muted">{t("defineStepDescription")}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-sky-500/5 border border-sky-500/10">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-sky-400">2</span>
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-1">{t("run")}</h4>
                <p className="text-xs text-text-muted">{t("runStepDescription")}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-emerald-400">3</span>
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-1">{t("evaluate")}</h4>
                <p className="text-xs text-text-muted">{t("evaluateStepDescription")}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                {t("evaluationStrategies")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {STRATEGIES.map((strategy) => (
                  <div
                    key={strategy.name}
                    className={`flex items-center gap-3 p-3 rounded-lg ${strategy.bg}`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${strategy.color}`}>
                      {strategy.icon}
                    </span>
                    <div>
                      <span className={`text-xs font-mono font-semibold ${strategy.color}`}>
                        {t(strategy.labelKey)}
                      </span>
                      <p className="text-xs text-text-muted mt-0.5">{t(strategy.descriptionKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
            <span className="material-symbols-outlined text-[20px]">history</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("recentRunsTitle")}</h3>
            <p className="text-xs text-text-muted">{t("recentRunsHint")}</p>
          </div>
        </div>

        <DataTable
          columns={HISTORY_COLUMNS.map((column) => ({
            key: column.key,
            label: t(column.labelKey),
          }))}
          data={recentRuns.map((run) => ({
            ...run,
            id: run.id,
          }))}
          renderCell={(row, column) => {
            if (column.key === "target") {
              return (
                <span className="text-xs font-medium text-primary">
                  {getTargetLabel(row.target as EvalRun["target"], t)}
                </span>
              );
            }

            if (column.key === "passRate") {
              return (
                <span className="text-xs font-semibold text-emerald-400">
                  {Number((row.summary as EvalRunSummary)?.passRate || 0)}%
                </span>
              );
            }

            if (column.key === "avgLatencyMs") {
              return (
                <span className="text-xs font-mono text-text-muted">
                  {Number(row.avgLatencyMs || 0)}ms
                </span>
              );
            }

            if (column.key === "createdAt") {
              return (
                <span className="text-xs text-text-muted">
                  {formatTimestamp(String(row.createdAt || ""))}
                </span>
              );
            }

            return <span className="text-sm text-text-main">{String(row[column.key] || "—")}</span>;
          }}
          maxHeight="320px"
          emptyMessage={t("historyEmpty")}
        />
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
            <span className="material-symbols-outlined text-[20px]">science</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("evalSuites")}</h3>
            <p className="text-xs text-text-muted">{t("evalSuitesHint")}</p>
          </div>
        </div>

        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          placeholder={t("searchSuitesPlaceholder")}
          filters={[]}
          activeFilters={{}}
          onFilterChange={() => {}}
        >
          {null}
        </FilterBar>

        <div className="flex flex-col gap-3 mt-4">
          {filteredSuites.map((suite) => {
            const isExpanded = expanded === suite.id;
            const isRunning = running === suite.id;
            const suiteModels = [
              ...new Set(
                (suite.cases || [])
                  .map((evalCase) => evalCase.model)
                  .filter(
                    (model): model is string => typeof model === "string" && model.trim().length > 0
                  )
              ),
            ];
            const liveResult = suiteRuns[suite.id] || null;
            const suiteHistory = recentRuns.filter((run) => run.suiteId === suite.id);
            const latestScore =
              liveResult?.runs?.[0]?.summary.passRate ?? suiteHistory[0]?.summary.passRate;

            return (
              <div key={suite.id} className="border border-border/30 rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-surface/30 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : suite.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[16px] text-text-muted">
                      {isExpanded ? "expand_more" : "chevron_right"}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-text-main">
                          {suite.name || suite.id}
                        </p>
                        {typeof latestScore === "number" && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              latestScore === 100
                                ? "bg-emerald-500/10 text-emerald-400"
                                : latestScore >= 80
                                  ? "bg-amber-500/10 text-amber-400"
                                  : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {latestScore}% {t("passSuffix")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted">
                        {t("casesCount", { count: suite.cases?.length || suite.caseCount || 0 })}
                        {suite.description ? (
                          <span className="ml-1">- {suite.description}</span>
                        ) : null}
                      </p>
                      {suiteModels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {suiteModels.map((model) => (
                            <span
                              key={model}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono text-text-muted bg-black/5 dark:bg-white/5"
                            >
                              {model}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    loading={isRunning}
                    disabled={running !== null}
                    onClick={(event) => {
                      event.stopPropagation();
                      void handleRunEval(suite);
                    }}
                  >
                    {isRunning ? t("runEvalRunning") : t("runEval")}
                  </Button>
                </div>

                {isExpanded && (
                  <div className="border-t border-border/20 p-4 flex flex-col gap-4">
                    {liveResult?.scorecard && liveResult.runs.length > 1 && (
                      <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-semibold text-text-main">
                              {t("targetComparisonTitle")}
                            </h4>
                            <p className="text-xs text-text-muted">{t("targetComparisonHint")}</p>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            {liveResult.scorecard.overallPassRate}%
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          {liveResult.runs.map((run) => (
                            <div
                              key={run.id}
                              className="rounded-lg border border-border/20 px-3 py-3"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-text-main">
                                  {getTargetLabel(run.target, t)}
                                </span>
                                <span className="text-xs text-text-muted">
                                  {run.summary.passRate}% {t("passSuffix")}
                                </span>
                              </div>
                              <p className="text-xs text-text-muted mt-1">
                                {t("historyLatency", { value: run.avgLatencyMs })}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {liveResult?.runs?.length ? (
                      <div
                        className={`grid gap-4 ${
                          liveResult.runs.length > 1 ? "xl:grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {liveResult.runs.map((run) => (
                          <Card key={run.id} className="p-4">
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <div>
                                <h4 className="text-sm font-semibold text-text-main">
                                  {getTargetLabel(run.target, t)}
                                </h4>
                                <p className="text-xs text-text-muted">
                                  {formatTimestamp(run.createdAt)} ·{" "}
                                  {t("historyLatency", { value: run.avgLatencyMs })}
                                </p>
                              </div>
                              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                {run.summary.passRate}% {t("passSuffix")}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-surface/30 border border-border/20">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-emerald-400">
                                  {run.summary.passRate}%
                                </span>
                                <span className="text-xs text-text-muted">{t("passRate")}</span>
                              </div>
                              <div className="text-xs text-text-muted">
                                {t("summaryBreakdown", {
                                  passed: run.summary.passed,
                                  failed: run.summary.failed,
                                  total: run.summary.total,
                                })}
                              </div>
                            </div>

                            <DataTable
                              columns={RESULT_COLUMNS.map((column) => ({
                                key: column.key,
                                label: t(column.labelKey),
                              }))}
                              data={run.results.map((result, index) => ({
                                ...result,
                                id: result.caseId || index,
                              }))}
                              renderCell={(row, column) => {
                                if (column.key === "status") {
                                  return row.passed ? (
                                    <span className="text-emerald-400">{t("passedIconLabel")}</span>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <span className="text-red-400">{t("failedIconLabel")}</span>
                                      {row.error ? (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400">
                                          {t("errorBadge")}
                                        </span>
                                      ) : null}
                                    </div>
                                  );
                                }

                                if (column.key === "durationMs") {
                                  return (
                                    <span className="text-text-muted text-xs font-mono">
                                      {row.durationMs != null ? `${row.durationMs}ms` : "—"}
                                    </span>
                                  );
                                }

                                if (column.key === "details") {
                                  return (
                                    <span className="text-text-muted text-xs truncate max-w-[320px] block">
                                      {getResultDetails(row as EvalResult, t)}
                                    </span>
                                  );
                                }

                                return (
                                  <span className="text-sm text-text-main">
                                    {String(row[column.key] || "—")}
                                  </span>
                                );
                              }}
                              maxHeight="360px"
                              emptyMessage={t("noResultsYet")}
                            />
                          </Card>
                        ))}
                      </div>
                    ) : suiteHistory.length > 0 ? (
                      <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-4">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div>
                            <h4 className="text-sm font-semibold text-text-main">
                              {t("suiteLatestRuns")}
                            </h4>
                            <p className="text-xs text-text-muted">{t("suiteLatestRunsHint")}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {suiteHistory.slice(0, 4).map((run) => (
                            <div
                              key={run.id}
                              className="rounded-lg border border-border/20 px-4 py-3"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-text-main">
                                  {getTargetLabel(run.target, t)}
                                </span>
                                <span className="text-xs font-semibold text-primary">
                                  {run.summary.passRate}%
                                </span>
                              </div>
                              <p className="text-xs text-text-muted mt-1">
                                {formatTimestamp(run.createdAt)}
                              </p>
                              <p className="text-xs text-text-muted mt-1">
                                {t("historyLatency", { value: run.avgLatencyMs })}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-[16px] text-text-muted">
                        checklist
                      </span>
                      <span className="text-xs text-text-muted font-medium">
                        {t("testCasesCount", { count: (suite.cases || []).length })}
                      </span>
                    </div>
                    <DataTable
                      columns={[
                        { key: "name", label: t("columnCase") },
                        { key: "model", label: t("columnModel") },
                        { key: "strategy", label: t("columnStrategy") },
                        { key: "expected", label: t("columnExpected") },
                      ]}
                      data={(suite.cases || []).map((evalCase, index) => ({
                        id: evalCase.id || index,
                        name: evalCase.name,
                        model: evalCase.model || "—",
                        strategy: evalCase.expected?.strategy || "—",
                        expected: evalCase.expected?.value
                          ? String(evalCase.expected.value).slice(0, 80)
                          : "—",
                      }))}
                      renderCell={(row, column) => {
                        if (column.key === "strategy") {
                          const strategy = STRATEGIES.find((item) => item.name === row.strategy);
                          return (
                            <span
                              className={`text-xs font-mono font-semibold ${
                                strategy?.color || "text-text-muted"
                              }`}
                            >
                              {String(row.strategy || "—")}
                            </span>
                          );
                        }

                        if (column.key === "model") {
                          return (
                            <span className="text-xs font-mono text-primary/80">
                              {String(row.model || "—")}
                            </span>
                          );
                        }

                        if (column.key === "expected") {
                          return (
                            <span className="text-text-muted text-xs font-mono truncate max-w-[320px] block">
                              {String(row.expected || "—")}
                            </span>
                          );
                        }

                        return (
                          <span className="text-sm text-text-main">
                            {String(row[column.key] || "—")}
                          </span>
                        );
                      }}
                      maxHeight="320px"
                      emptyMessage={t("noTestCasesDefined")}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function HeroSection({ t }: { t: (key: string, values?: Record<string, unknown>) => string }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div
        className="p-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(16, 185, 129, 0.05) 100%)",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500">
            <span className="material-symbols-outlined text-[28px]">science</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-text-main mb-1">{t("modelEvals")}</h2>
            <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
              {t("evalsHeroDescription")}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">
                  verified
                </span>
                {t("qualityValidation")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-sky-400">compare</span>
                {t("modelComparison")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-amber-400">
                  bug_report
                </span>
                {t("regressionDetection")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-violet-400">speed</span>
                {t("latencyBenchmarks")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
