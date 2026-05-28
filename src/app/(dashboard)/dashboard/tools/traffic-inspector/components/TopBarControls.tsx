"use client";

import type { ListFilters } from "@/mitm/inspector/types";
import type { AgentId } from "@/mitm/types";
import { cn } from "@/shared/utils/cn";
import { SessionRecorderBar } from "./session/SessionRecorderBar";
import { SessionPicker } from "./session/SessionPicker";
import type { SessionInfo } from "../hooks/useSessionRecorder";

type Profile = "llm" | "custom" | "all";

interface TopBarControlsProps {
  filters: ListFilters;
  onProfileChange: (p: Profile) => void;
  onHostChange: (h: string | undefined) => void;
  onAgentChange: (a: AgentId | undefined) => void;
  onStatusChange: (s: ListFilters["status"]) => void;
  paused: boolean;
  onPause: () => void;
  onResume: () => void;
  onClear: () => void;
  onExport: () => void;
  connected: boolean;
  total: number;
  maxSize?: number;
  // session recorder
  recording: boolean;
  session: SessionInfo | null;
  elapsed: number;
  sessions: SessionInfo[];
  onRecordStart: () => void;
  onRecordStop: () => void;
  onSessionSelect: (id: string | undefined) => void;
  onSessionDelete: (id: string) => void;
}

const PROFILES: Array<{ id: Profile; label: string }> = [
  { id: "llm", label: "LLM only" },
  { id: "custom", label: "Custom" },
  { id: "all", label: "All" },
];

export function TopBarControls({
  filters,
  onProfileChange,
  onHostChange,
  onAgentChange,
  onStatusChange,
  paused,
  onPause,
  onResume,
  onClear,
  onExport,
  connected,
  total,
  maxSize = 1000,
  recording,
  session,
  elapsed,
  sessions,
  onRecordStart,
  onRecordStop,
  onSessionSelect,
  onSessionDelete,
}: TopBarControlsProps) {
  const profile: Profile = (filters.profile as Profile) ?? "llm";

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-bg-subtle px-3 py-2">
      {/* Profile selector */}
      <div
        role="radiogroup"
        aria-label="Traffic profile"
        className="flex items-center gap-1 rounded border border-border bg-surface p-0.5"
      >
        {PROFILES.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={profile === p.id}
            onClick={() => onProfileChange(p.id)}
            className={cn(
              "px-2 py-0.5 text-xs rounded focus-ring",
              profile === p.id
                ? "bg-blue-600 text-white"
                : "text-text-muted hover:text-text-main"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Host filter */}
      <input
        type="text"
        placeholder="Filter host…"
        defaultValue={filters.host ?? ""}
        onChange={(e) => onHostChange(e.target.value || undefined)}
        className="rounded border border-border bg-bg-subtle px-2 py-1 text-xs text-text-main w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* Status filter */}
      <select
        value={filters.status ?? ""}
        onChange={(e) =>
          onStatusChange((e.target.value as ListFilters["status"]) || undefined)
        }
        className="rounded border border-border bg-bg-subtle px-2 py-1 text-xs text-text-main focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Any status</option>
        <option value="2xx">2xx</option>
        <option value="3xx">3xx</option>
        <option value="4xx">4xx</option>
        <option value="5xx">5xx</option>
        <option value="error">error</option>
      </select>

      {/* Action buttons */}
      <button
        type="button"
        onClick={paused ? onResume : onPause}
        className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-text-muted hover:text-text-main focus-ring"
        title={paused ? "Resume streaming" : "Pause streaming"}
      >
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
          {paused ? "play_arrow" : "pause"}
        </span>
        {paused ? "Resume" : "Pause"}
      </button>

      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-text-muted hover:text-red-400 focus-ring"
        title="Clear all requests"
      >
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
          delete_sweep
        </span>
        Clear
      </button>

      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-text-muted hover:text-text-main focus-ring"
        title="Export as .har"
      >
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
          download
        </span>
        .har
      </button>

      {/* Session controls */}
      <div className="flex items-center gap-2 ml-auto">
        <SessionPicker
          sessions={sessions}
          selectedId={filters.sessionId}
          onSelect={onSessionSelect}
          onDelete={onSessionDelete}
        />
        <SessionRecorderBar
          recording={recording}
          session={session}
          elapsed={elapsed}
          onStart={onRecordStart}
          onStop={onRecordStop}
        />

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <span
            className={cn(
              "inline-block h-2 w-2 rounded-full",
              connected ? "bg-green-400 animate-pulse" : "bg-gray-500"
            )}
          />
          {connected ? "live" : "offline"}
          <span className="text-text-muted font-mono">
            {total}/{maxSize}
          </span>
        </div>
      </div>
    </div>
  );
}
