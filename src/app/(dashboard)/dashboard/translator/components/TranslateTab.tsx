"use client";

import { useState } from "react";
import { Card } from "@/shared/components";
import { useTranslateSession } from "../hooks/useTranslateSession";
import { useProviderOptions } from "../hooks/useProviderOptions";
import SimpleControls from "./SimpleControls";
import ResultNarrated from "./ResultNarrated";
import type { AdvancedSlug, FormatId, TranslateMode } from "../types";

interface TranslateTabProps {
  /**
   * F9 integration: tells TranslateTab to open a specific advanced accordion.
   * When null, no accordion is forced open.
   */
  forceOpenAdvancedSlug?: AdvancedSlug | null;
  /**
   * F9 integration: called when an advanced accordion slug should change
   * (open or close). F9 syncs this with the URL query string.
   */
  onAdvancedSlugChange?: (slug: AdvancedSlug | null) => void;
}

export default function TranslateTab({
  forceOpenAdvancedSlug = null,
  onAdvancedSlugChange,
}: TranslateTabProps) {
  // Internal simple-mode state
  const [source, setSource] = useState<FormatId>("claude");
  const [inputText, setInputText] = useState<string>("");
  const [mode, setMode] = useState<TranslateMode>("send");

  // Provider/target state: derive from useProviderOptions
  const { provider, setProvider, providerOptions } = useProviderOptions("openai");
  // target FormatId mirrors provider selection; managed via SimpleControls callback
  const [target, setTarget] = useState<FormatId>("openai");

  const { result, run } = useTranslateSession();

  const handleSubmit = () => {
    run({ source, target, provider, inputText, mode });
  };

  const handleOpenAdvanced = (slug: AdvancedSlug = "rawjson") => {
    if (onAdvancedSlugChange) {
      onAdvancedSlugChange(slug);
    }
    // Scroll to advanced section if it exists (guard for environments without scrollIntoView)
    const advancedEl = document.querySelector("[data-advanced-section]");
    if (advancedEl && typeof advancedEl.scrollIntoView === "function") {
      advancedEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSeeTranslatedJson = () => {
    handleOpenAdvanced("rawjson");
  };

  const handleSeePipeline = () => {
    handleOpenAdvanced("pipeline");
  };

  // Expose forceOpenAdvancedSlug to the advanced section slot via data attribute
  // F4 will read this; for now we write it to a data attribute that F9 will wire
  const advancedSlug = forceOpenAdvancedSlug;

  // Sync provider options: when providerOptions loads, keep provider in sync
  // (useProviderOptions handles this internally; we just need to expose setProvider)
  const handleProviderChange = (prov: string) => {
    setProvider(prov);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 2-column grid: SimpleControls (left) + ResultNarrated (right) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: controls */}
        <Card className="p-4">
          <SimpleControls
            source={source}
            target={target}
            provider={provider}
            inputText={inputText}
            mode={mode}
            onSourceChange={setSource}
            onTargetChange={setTarget}
            onProviderChange={handleProviderChange}
            onInputChange={setInputText}
            onModeChange={setMode}
            onSubmit={handleSubmit}
            onOpenAdvanced={() => handleOpenAdvanced("rawjson")}
            isLoading={result.status === "translating" || result.status === "sending"}
          />
        </Card>

        {/* Right: narrated result */}
        <ResultNarrated
          result={result}
          onSeeTranslatedJson={handleSeeTranslatedJson}
          onSeePipeline={handleSeePipeline}
        />
      </div>

      {/* Advanced section slot — F4 will mount AdvancedSection here.
          F9 composes: <TranslateTab onAdvancedSlugChange={...} /> + <AdvancedSection forceOpenSlug={...} />.
          For now we render the placeholder that F4/F9 will replace. */}
      <div
        data-advanced-section
        data-force-open-slug={advancedSlug ?? ""}
        data-provider-options={JSON.stringify(providerOptions.map((o) => o.value))}
        data-source={source}
        data-input-text={inputText.slice(0, 100)}
      />
    </div>
  );
}
