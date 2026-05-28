"use client";

import useSWR from "swr";
import type { MemorySettingsExtended } from "@/shared/schemas/memory";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface UseMemorySettingsResult {
  settings: MemorySettingsExtended | null;
  isLoading: boolean;
  isError: boolean;
  mutate: () => void;
  save: (updates: Partial<MemorySettingsExtended>) => Promise<boolean>;
}

export function useMemorySettings(): UseMemorySettingsResult {
  const { data, error, isLoading, mutate } = useSWR<MemorySettingsExtended>(
    "/api/settings/memory",
    fetcher,
  );

  const save = async (updates: Partial<MemorySettingsExtended>): Promise<boolean> => {
    try {
      const current = data ?? {};
      const next = { ...current, ...updates };
      const res = await fetch("/api/settings/memory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (res.ok) {
        await mutate();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return {
    settings: data ?? null,
    isLoading,
    isError: Boolean(error),
    mutate,
    save,
  };
}
