"use client";

import { cn } from "@/shared/utils/cn";
import type { SessionInfo } from "../../hooks/useSessionRecorder";

interface SessionRecorderBarProps {
  recording: boolean;
  session: SessionInfo | null;
  elapsed: number;
  onStart: (name?: string) => void;
  onStop: () => void;
}

function formatElapsed(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function SessionRecorderBar({
  recording,
  session,
  elapsed,
  onStart,
  onStop,
}: SessionRecorderBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm border",
        recording
          ? "border-red-500/40 bg-red-900/20 text-red-200"
          : "border-border bg-bg-subtle text-text-muted"
      )}
    >
      {recording ? (
        <>
          <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs">{formatElapsed(elapsed)}</span>
          {session?.name && (
            <span className="text-xs opacity-70 truncate max-w-[120px]">{session.name}</span>
          )}
          <button
            type="button"
            onClick={onStop}
            className="ml-auto rounded border border-red-500/50 px-2 py-0.5 text-xs hover:bg-red-800/30 focus-ring"
          >
            Stop
          </button>
        </>
      ) : (
        <>
          <span className="inline-block h-2 w-2 rounded-full bg-gray-500" />
          <span className="text-xs">Not recording</span>
          <button
            type="button"
            onClick={() => onStart()}
            className="ml-auto rounded border border-border px-2 py-0.5 text-xs hover:bg-surface focus-ring"
          >
            REC
          </button>
        </>
      )}
    </div>
  );
}
