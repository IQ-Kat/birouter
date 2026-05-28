"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface SessionInfo {
  id: string;
  name?: string;
  startedAt: string;
  requestCount: number;
}

async function fetchSessionsRemote(): Promise<SessionInfo[]> {
  const res = await fetch("/api/tools/traffic-inspector/sessions");
  if (!res.ok) return [];
  const data = (await res.json()) as { sessions: SessionInfo[] };
  return data.sessions ?? [];
}

export function useSessionRecorder() {
  const [recording, setRecording] = useState(false);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchSessions = useCallback(async () => {
    try {
      const list = await fetchSessionsRemote();
      if (mountedRef.current) setSessions(list);
    } catch {
      // silently ignore
    }
  }, []);

  // Fetch sessions on mount — use an async wrapper to avoid direct setState in effect
  useEffect(() => {
    let cancelled = false;
    fetchSessionsRemote()
      .then((list) => {
        if (!cancelled) setSessions(list);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const start = useCallback(async (name?: string) => {
    try {
      const res = await fetch("/api/tools/traffic-inspector/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { session: SessionInfo };
      setSession(data.session);
      setRecording(true);
      startTimeRef.current = Date.now();
      setElapsed(0);
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    } catch {
      // ignore
    }
  }, []);

  const stop = useCallback(async () => {
    if (!session) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRecording(false);
    try {
      await fetch(`/api/tools/traffic-inspector/sessions/${encodeURIComponent(session.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stop" }),
      });
    } catch {
      // ignore
    }
    await fetchSessions();
    setSession(null);
  }, [session, fetchSessions]);

  const deleteSession = useCallback(async (id: string) => {
    try {
      await fetch(`/api/tools/traffic-inspector/sessions/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      await fetchSessions();
    } catch {
      // ignore
    }
  }, [fetchSessions]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    recording,
    session,
    elapsed,
    sessions,
    start,
    stop,
    deleteSession,
    fetchSessions,
  };
}
