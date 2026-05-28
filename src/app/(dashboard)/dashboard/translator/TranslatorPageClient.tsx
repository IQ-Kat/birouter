"use client";

import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge, Card, SegmentedControl } from "@/shared/components";
import TranslatorConceptCard from "./components/TranslatorConceptCard";
import TranslateTab from "./components/TranslateTab";
import MonitorTab from "./components/MonitorTab";
import AdvancedSection from "./components/advanced/AdvancedSection";
import RawJsonPanel from "./components/advanced/RawJsonPanel";
import PipelineView from "./components/advanced/PipelineView";
import StreamTransformerAccordion from "./components/advanced/StreamTransformerAccordion";
import TestBenchAccordion from "./components/advanced/TestBenchAccordion";
import CompressionPreviewAccordion from "./components/advanced/CompressionPreviewAccordion";
import { useTranslateDeepLink } from "./hooks/useTranslateDeepLink";
import type { AdvancedSlug, TranslatorTab } from "./types";

export default function TranslatorPageClient() {
  return (
    <Suspense fallback={<div className="p-8 text-text-muted">Loading…</div>}>
      <TranslatorPageClientInner />
    </Suspense>
  );
}

function TranslatorPageClientInner() {
  const t = useTranslations("translator");
  const [sharedInputContent, setSharedInputContent] = useState("");
  const { state, setTab, setAdvanced } = useTranslateDeepLink();

  const makeOpenHandler = (slug: AdvancedSlug) => (open: boolean) => {
    if (open) {
      setAdvanced(slug);
    } else if (state.advanced === slug) {
      setAdvanced(null);
    }
  };

  const advancedSlot = (
    <AdvancedSection forceOpenSlug={state.advanced}>
      <RawJsonPanel
        slug="rawjson"
        forceOpen={state.advanced === "rawjson"}
        onOpenChange={makeOpenHandler("rawjson")}
      />
      <PipelineView
        slug="pipeline"
        forceOpen={state.advanced === "pipeline"}
        onOpenChange={makeOpenHandler("pipeline")}
        steps={[]}
      />
      <StreamTransformerAccordion
        forceOpen={state.advanced === "streamtransform"}
        onOpenChange={makeOpenHandler("streamtransform")}
      />
      <TestBenchAccordion
        slug="testbench"
        forceOpen={state.advanced === "testbench"}
        onOpenChange={makeOpenHandler("testbench")}
      />
      <CompressionPreviewAccordion
        forceOpen={state.advanced === "compression"}
        onOpenChange={makeOpenHandler("compression")}
        inputContent={sharedInputContent}
      />
    </AdvancedSection>
  );

  const tabOptions = [
    { value: "translate", label: t("tabTranslate"), icon: "translate" },
    { value: "monitor", label: t("tabMonitor"), icon: "monitoring" },
  ];

  return (
    <div className="space-y-6 min-w-0">
      <TranslatorConceptCard />

      <AutoFeaturesCard />

      <div className="flex justify-end min-w-0 overflow-x-auto">
        <SegmentedControl
          options={tabOptions}
          value={state.tab}
          onChange={(v) => setTab(v as TranslatorTab)}
          size="md"
          aria-label={t("tabTranslateAriaLabel")}
          className="min-w-max"
        />
      </div>

      {state.tab === "translate" && (
        <TranslateTab
          forceOpenAdvancedSlug={state.advanced}
          onAdvancedSlugChange={(slug) => setAdvanced(slug)}
        />
      )}

      {state.tab === "translate" && advancedSlot}

      {state.tab === "monitor" && (
        <MonitorTab onGoToTranslate={() => setTab("translate")} />
      )}
    </div>
  );
}

function AutoFeaturesCard() {
  const t = useTranslations("translator");
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <Card className="border-primary/10 bg-primary/5">
      <button
        onClick={() => setShowFeatures((prev) => !prev)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">
            auto_fix_high
          </span>
          <h3 className="text-sm font-semibold text-text-main">{t("autoFeaturesTitle")}</h3>
          <Badge variant="primary" size="sm">
            {t("autoFeaturesCount")}
          </Badge>
        </div>
        <span className="material-symbols-outlined text-[18px] text-text-muted">
          {showFeatures ? "expand_less" : "expand_more"}
        </span>
      </button>

      {showFeatures && (
        <div
          className="grid grid-cols-1 gap-3 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-4"
          data-testid="auto-features-grid"
        >
          <FeatureChip
            icon="psychology"
            title={t("featureReasoningCache")}
            description={t("featureReasoningCacheDesc")}
            color="purple"
          />
          <FeatureChip
            icon="schema"
            title={t("featureSchemaCoercion")}
            description={t("featureSchemaCoercionDesc")}
            color="blue"
          />
          <FeatureChip
            icon="swap_vert"
            title={t("featureRoleNormalization")}
            description={t("featureRoleNormalizationDesc")}
            color="amber"
          />
          <FeatureChip
            icon="fingerprint"
            title={t("featureToolCallIds")}
            description={t("featureToolCallIdsDesc")}
            color="emerald"
          />
          <FeatureChip
            icon="add_circle"
            title={t("featureMissingToolResponse")}
            description={t("featureMissingToolResponseDesc")}
            color="cyan"
          />
          <FeatureChip
            icon="tune"
            title={t("featureThinkingBudget")}
            description={t("featureThinkingBudgetDesc")}
            color="orange"
          />
          <FeatureChip
            icon="alt_route"
            title={t("featureDirectPaths")}
            description={t("featureDirectPathsDesc")}
            color="pink"
          />
          <FeatureChip
            icon="photo_size_select_large"
            title={t("featureImageMapping")}
            description={t("featureImageMappingDesc")}
            color="indigo"
          />
        </div>
      )}
    </Card>
  );
}

function FeatureChip({
  icon,
  title,
  description,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  color: "purple" | "blue" | "amber" | "emerald" | "cyan" | "orange" | "pink" | "indigo";
}) {
  const colorMap = {
    purple: {
      shell: "border-purple-500/20 bg-purple-500/5",
      icon: "text-purple-500",
    },
    blue: {
      shell: "border-blue-500/20 bg-blue-500/5",
      icon: "text-blue-500",
    },
    amber: {
      shell: "border-amber-500/20 bg-amber-500/5",
      icon: "text-amber-500",
    },
    emerald: {
      shell: "border-emerald-500/20 bg-emerald-500/5",
      icon: "text-emerald-500",
    },
    cyan: {
      shell: "border-cyan-500/20 bg-cyan-500/5",
      icon: "text-cyan-500",
    },
    orange: {
      shell: "border-orange-500/20 bg-orange-500/5",
      icon: "text-orange-500",
    },
    pink: {
      shell: "border-pink-500/20 bg-pink-500/5",
      icon: "text-pink-500",
    },
    indigo: {
      shell: "border-indigo-500/20 bg-indigo-500/5",
      icon: "text-indigo-500",
    },
  }[color];

  return (
    <div className={`rounded-lg border p-3 ${colorMap.shell}`} data-testid="feature-chip">
      <div className="mb-1 flex items-center gap-2">
        <span className={`material-symbols-outlined text-[16px] ${colorMap.icon}`}>{icon}</span>
        <p className="text-xs font-semibold text-text-main">{title}</p>
      </div>
      <p className="text-[10px] leading-relaxed text-text-muted">{description}</p>
    </div>
  );
}
