"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/cn";

export interface ApiKeyEntry {
  id: string;
  name: string;
  prefix?: string;
  createdAt?: string;
}

export interface ApiKeySelectProps {
  keys: ApiKeyEntry[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
}

const MANUAL_VALUE = "__manual__";

export default function ApiKeySelect({
  keys,
  value,
  onChange,
  label = "API Key",
  disabled = false,
}: ApiKeySelectProps) {
  const isManual = !keys.some((k) => k.id === value) && value !== "";
  const [showManual, setShowManual] = useState<boolean>(isManual);
  const [manualValue, setManualValue] = useState<string>(isManual ? value : "");

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    if (val === MANUAL_VALUE) {
      setShowManual(true);
      onChange(manualValue);
    } else {
      setShowManual(false);
      onChange(val);
    }
  }

  function handleManualInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setManualValue(val);
    onChange(val);
  }

  const selectValue = showManual ? MANUAL_VALUE : (value || "");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-main">{label}</label>
      )}
      <select
        value={selectValue}
        onChange={handleSelectChange}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 rounded-lg text-sm",
          "bg-white dark:bg-white/5 border border-black/10 dark:border-white/10",
          "text-text-main focus:outline-none focus:border-primary/50",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {keys.length === 0 && !showManual && (
          <option value="" disabled>
            Nenhuma API key cadastrada
          </option>
        )}
        {keys.map((k) => (
          <option key={k.id} value={k.id}>
            {k.name}
            {k.prefix ? ` (${k.prefix}…)` : ""}
          </option>
        ))}
        <option value={MANUAL_VALUE}>Inserir manualmente</option>
      </select>
      {showManual && (
        <input
          type="text"
          value={manualValue}
          onChange={handleManualInput}
          disabled={disabled}
          placeholder="sk-…"
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
