"use client";
import { useState } from "react";
import { PlayView } from "./PlayView";
import { CompareView } from "./CompareView";
import { SegmentedControl, Card } from "@/shared/components";

const STUDIO_TABS = [
  { value: "play", label: "Playground", icon: "play_arrow" },
  { value: "compare", label: "A/B Comparison", icon: "compare_arrows" },
] as const;

type StudioTab = (typeof STUDIO_TABS)[number]["value"];

export default function CompressionStudioPage() {
  const [tab, setTab] = useState<StudioTab>("play");
  const [text, setText] = useState("");

  return (
    <div className="flex h-[calc(100dvh-7rem)] min-h-[500px] flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Compression Studio</h1>
          <p className="text-sm text-text-muted">
            Test and compare prompt compression engines in real-time.
          </p>
        </div>
        <SegmentedControl
          options={STUDIO_TABS}
          value={tab}
          onChange={(value) => setTab(value as StudioTab)}
          aria-label="Studio mode selection"
          className="w-fit"
        />
      </div>
      <Card className="flex-1 min-h-0 overflow-hidden border border-border/40 bg-surface-card p-6 rounded-xl shadow-lg backdrop-blur-md">
        <div className="h-full overflow-auto pr-1">
          {tab === "play" ? <PlayView text={text} onText={setText} /> : <CompareView text={text} />}
        </div>
      </Card>
    </div>
  );
}
