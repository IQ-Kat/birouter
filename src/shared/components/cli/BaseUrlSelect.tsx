"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/cn";

export interface BaseUrlSelectProps {
  value: string;
  onChange: (value: string) => void;
  cloudEnabled: boolean;
  cloudUrl?: string;
  label?: string;
  disabled?: boolean;
}

type OptionKey = "local" | "cloud" | "custom";

function getDefaultLocal(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:20128";
}

export default function BaseUrlSelect({
  value,
  onChange,
  cloudEnabled,
  cloudUrl,
  label = "Base URL",
  disabled = false,
}: BaseUrlSelectProps) {
  const localUrl = getDefaultLocal();

  function detectOption(val: string): OptionKey {
    if (val === localUrl) return "local";
    if (cloudEnabled && cloudUrl && val === cloudUrl) return "cloud";
    return "custom";
  }

  const [selectedOption, setSelectedOption] = useState<OptionKey>(() => detectOption(value));
  const [customValue, setCustomValue] = useState<string>(
    detectOption(value) === "custom" ? value : ""
  );

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const opt = e.target.value as OptionKey;
    setSelectedOption(opt);
    if (opt === "local") {
      onChange(localUrl);
    } else if (opt === "cloud" && cloudUrl) {
      onChange(cloudUrl);
    } else if (opt === "custom") {
      onChange(customValue);
    }
  }

  function handleCustomInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setCustomValue(val);
    onChange(val);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-main">{label}</label>
      )}
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 rounded-lg text-sm",
          "bg-white dark:bg-white/5 border border-black/10 dark:border-white/10",
          "text-text-main focus:outline-none focus:border-primary/50",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <option value="local">Local ({localUrl})</option>
        {cloudEnabled && cloudUrl && (
          <option value="cloud">Cloud ({cloudUrl})</option>
        )}
        <option value="custom">Custom…</option>
      </select>
      {selectedOption === "custom" && (
        <input
          type="text"
          value={customValue}
          onChange={handleCustomInput}
          disabled={disabled}
          placeholder="https://…"
          className={cn(
            "w-full px-3 py-2 rounded-lg text-sm font-mono",
            "bg-white dark:bg-white/5 border border-black/10 dark:border-white/10",
            "text-text-main focus:outline-none focus:border-primary/50",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
      )}
    </div>
  );
}
