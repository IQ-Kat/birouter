"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import MemoryConceptCard from "./components/MemoryConceptCard";
import MemoriesTab from "./components/tabs/MemoriesTab";
import PlaygroundTab from "./components/tabs/PlaygroundTab";
import EngineTab from "./components/tabs/EngineTab";

type TabId = "memories" | "playground" | "engine";

const TABS: TabId[] = ["memories", "engine", "playground"];

function MemoryPageContent() {
  const t = useTranslations("memory");
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawTab = searchParams.get("tab") ?? "";
  const activeTab: TabId = TABS.includes(rawTab as TabId) ? (rawTab as TabId) : "memories";

  const setTab = (tab: TabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Concept card */}
      <MemoryConceptCard />

      {/* Tab navigation */}
      <div className="flex gap-1 p-1 rounded-lg bg-surface/50 border border-border/60 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            data-testid={`tab-${tab}`}
            onClick={() => setTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-bg text-text-main shadow-sm"
                : "text-text-muted hover:text-text-main"
            }`}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "memories" && <MemoriesTab />}
      {activeTab === "playground" && <PlaygroundTab />}
      {activeTab === "engine" && <EngineTab />}
    </div>
  );
}

export default function MemoryPage() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center" />}>
      <MemoryPageContent />
    </Suspense>
  );
}
