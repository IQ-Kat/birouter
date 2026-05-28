"use client";

import useSWR from "swr";
import type { MemoryEngineStatus } from "@/shared/schemas/memory";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface UseEngineStatusResult {
  status: MemoryEngineStatus | null;
  isLoading: boolean;
  isError: boolean;
  mutate: () => void;
}

export function useEngineStatus(): UseEngineStatusResult {
  const { data, error, isLoading, mutate } = useSWR<MemoryEngineStatus>(
    "/api/memory/engine-status",
    fetcher,
    { refreshInterval: 5000 },
  );

  return {
    status: data ?? null,
    isLoading,
    isError: Boolean(error),
    mutate,
  };
}
