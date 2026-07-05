/**
 * Smart Pacing — Traffic shaper per OAuth connection.
 *
 * Protects OAuth accounts from being banned by ensuring request patterns
 * look natural to upstream providers. Operates at the per-connection level
 * (per OAuth account), not per-user or per-API-key.
 *
 * Key principles:
 * 1. Zero delay for normal human usage (single user, no contention)
 * 2. Only enforce pacing when an account is under concurrent pressure
 * 3. Adaptive — heavier load = longer gaps
 * 4. Priority queue — interactive requests go before agent/background requests
 *
 * Settings (stored in app settings via localDb):
 *   - smartPacingEnabled (boolean, default: true)
 *   - smartPacingMode ("off" | "auto" | "human-sim", default: "auto")
 *   - smartPacingMaxConcurrent (number, default: 1)
 *   - smartPacingMinGapMs (number, default: 1500)
 *   - smartPacingBurstTolerance (number, default: 3)
 *   - smartPacingProviderProfiles (object) — per-provider overrides
 */

// ─── Provider-specific default profiles ───────────────────────────────────────
export interface SmartPacingProfile {
  maxConcurrent: number;
  minGapMs: number;
  burstTolerance: number;
  maxRpmPerAccount: number;
  sensitivity: "low" | "medium" | "high";
}

export const PROVIDER_PROFILES: Record<string, SmartPacingProfile> = {
  antigravity: {
    maxConcurrent: 1,
    minGapMs: 2000,
    burstTolerance: 2,
    maxRpmPerAccount: 15,
    sensitivity: "high",
  },
  "gemini-cli": {
    maxConcurrent: 1,
    minGapMs: 2000,
    burstTolerance: 2,
    maxRpmPerAccount: 15,
    sensitivity: "high",
  },
  claude: {
    maxConcurrent: 1,
    minGapMs: 1500,
    burstTolerance: 3,
    maxRpmPerAccount: 20,
    sensitivity: "medium",
  },
  codex: {
    maxConcurrent: 1,
    minGapMs: 1000,
    burstTolerance: 3,
    maxRpmPerAccount: 30,
    sensitivity: "medium",
  },
  openai: {
    maxConcurrent: 1,
    minGapMs: 1000,
    burstTolerance: 3,
    maxRpmPerAccount: 30,
    sensitivity: "medium",
  },
  github: {
    maxConcurrent: 2,
    minGapMs: 800,
    burstTolerance: 5,
    maxRpmPerAccount: 40,
    sensitivity: "low",
  },
  cursor: {
    maxConcurrent: 2,
    minGapMs: 1000,
    burstTolerance: 4,
    maxRpmPerAccount: 30,
    sensitivity: "medium",
  },
  kiro: {
    maxConcurrent: 1,
    minGapMs: 1500,
    burstTolerance: 3,
    maxRpmPerAccount: 20,
    sensitivity: "medium",
  },
  xai: {
    maxConcurrent: 1,
    minGapMs: 1200,
    burstTolerance: 3,
    maxRpmPerAccount: 25,
    sensitivity: "medium",
  },
  mimocode: {
    maxConcurrent: 1,
    minGapMs: 1500,
    burstTolerance: 3,
    maxRpmPerAccount: 20,
    sensitivity: "medium",
  },
  _default: {
    maxConcurrent: 1,
    minGapMs: 1500,
    burstTolerance: 3,
    maxRpmPerAccount: 20,
    sensitivity: "medium",
  },
};

export interface SmartPacingSettings {
  smartPacingEnabled?: boolean;
  smartPacingMode?: "off" | "auto" | "human-sim";
  smartPacingProviderProfiles?: Record<string, Partial<SmartPacingProfile>>;
}

export interface ClientType {
  type: "interactive" | "agent" | "unknown";
  priority: number;
}

interface PacingQueueItem {
  resolve: () => void;
  priority: number;
  enqueuedAt: number;
}

interface ConnectionPacingState {
  activeRequests: number;
  lastRequestEndAt: number;
  recentRequestTimes: number[];
  queue: PacingQueueItem[];
}

const connectionStates = new Map<string, ConnectionPacingState>();

const STALE_CLEANUP_INTERVAL_MS = 10 * 60_000;
const STALE_THRESHOLD_MS = 30 * 60_000;

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function startCleanupTimer(): void {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, state] of connectionStates) {
      if (
        state.activeRequests === 0 &&
        state.queue.length === 0 &&
        now - state.lastRequestEndAt > STALE_THRESHOLD_MS
      ) {
        connectionStates.delete(key);
      }
    }
  }, STALE_CLEANUP_INTERVAL_MS);
  if (typeof cleanupTimer === "object" && cleanupTimer !== null && "unref" in cleanupTimer) {
    (cleanupTimer as NodeJS.Timeout).unref();
  }
}

function getState(connectionId: string): ConnectionPacingState {
  let state = connectionStates.get(connectionId);
  if (!state) {
    state = {
      activeRequests: 0,
      lastRequestEndAt: 0,
      recentRequestTimes: [],
      queue: [],
    };
    connectionStates.set(connectionId, state);
    startCleanupTimer();
  }
  return state;
}

function isNoAuth(connectionId: string | null | undefined): boolean {
  return !connectionId || connectionId === "noauth";
}

function getProfile(
  provider: string,
  userOverrides?: Record<string, Partial<SmartPacingProfile>>
): SmartPacingProfile {
  const base = PROVIDER_PROFILES[provider] || PROVIDER_PROFILES._default;
  if (!userOverrides?.[provider]) return base;
  return { ...base, ...userOverrides[provider] };
}

function calculateDelay(
  state: ConnectionPacingState,
  profile: SmartPacingProfile,
  mode: "off" | "auto" | "human-sim",
  priority: number
): number {
  if (mode === "off") return 0;

  const now = Date.now();
  const timeSinceLastRequest = now - state.lastRequestEndAt;

  if (state.lastRequestEndAt === 0 || timeSinceLastRequest > profile.minGapMs * 3) {
    return 0;
  }

  const oneMinuteAgo = now - 60_000;
  const recentCount = state.recentRequestTimes.filter((t) => t > oneMinuteAgo).length;

  if (recentCount < profile.burstTolerance && timeSinceLastRequest > 500) {
    return 0;
  }

  let requiredGap = profile.minGapMs;

  if (mode === "human-sim") {
    const baseThinkTime = 2000 + Math.random() * 6000;
    requiredGap = Math.max(requiredGap, baseThinkTime);
  }

  const rpmUsage = recentCount / profile.maxRpmPerAccount;
  if (rpmUsage > 0.7) {
    const scaleFactor = 1 + (rpmUsage - 0.7) * 10;
    requiredGap *= scaleFactor;
  }

  if (priority > 5) {
    requiredGap *= 1 + (priority - 5) * 0.1;
  }

  const delay = Math.max(0, requiredGap - timeSinceLastRequest);

  if (delay > 0) {
    const jitter = delay * 0.15 * (Math.random() * 2 - 1);
    return Math.max(0, Math.round(delay + jitter));
  }

  return 0;
}

function processQueue(
  connectionId: string,
  profile: SmartPacingProfile,
  mode: "off" | "auto" | "human-sim"
): void {
  const state = getState(connectionId);
  if (state.queue.length === 0) return;
  if (state.activeRequests >= profile.maxConcurrent) return;

  state.queue.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.enqueuedAt - b.enqueuedAt;
  });

  const next = state.queue[0];
  const delay = calculateDelay(state, profile, mode, next.priority);

  if (delay === 0) {
    state.queue.shift();
    state.activeRequests++;
    state.recentRequestTimes.push(Date.now());
    next.resolve();
  } else {
    const timer = setTimeout(() => {
      const currentState = getState(connectionId);
      const idx = currentState.queue.indexOf(next);
      if (idx === -1) return;
      currentState.queue.splice(idx, 1);
      currentState.activeRequests++;
      currentState.recentRequestTimes.push(Date.now());
      next.resolve();
      processQueue(connectionId, profile, mode);
    }, delay);
    if (typeof timer === "object" && timer !== null && "unref" in timer) {
      timer.unref();
    }
  }
}

function releaseSlot(
  connectionId: string,
  profile: SmartPacingProfile,
  mode: "off" | "auto" | "human-sim"
): void {
  const state = getState(connectionId);
  state.activeRequests = Math.max(0, state.activeRequests - 1);
  state.lastRequestEndAt = Date.now();

  if (state.queue.length > 0) {
    processQueue(connectionId, profile, mode);
  }
}

export interface AcquirePacingSlotOptions {
  connectionId: string | null | undefined;
  provider: string;
  settings?: SmartPacingSettings | null;
  headers?: Record<string, string | string[] | undefined> | Headers | null;
}

export interface PacingSlot {
  release: () => void;
  delayed: boolean;
  delayMs: number;
}

function noopRelease(): () => void {
  let released = false;
  return () => {
    released = true;
  };
}

export function acquirePacingSlot(options: AcquirePacingSlotOptions): PacingSlot {
  if (isNoAuth(options.connectionId)) {
    return { release: noopRelease(), delayed: false, delayMs: 0 };
  }

  const settings = options.settings;
  const mode = settings?.smartPacingMode || "auto";
  if (mode === "off" || settings?.smartPacingEnabled === false) {
    return { release: noopRelease(), delayed: false, delayMs: 0 };
  }

  const connectionId = options.connectionId!;
  const provider = options.provider;
  const userOverrides = settings?.smartPacingProviderProfiles;
  const profile = getProfile(provider, userOverrides);
  const state = getState(connectionId);
  const { priority } = detectClientType(options.headers);

  const twoMinutesAgo = Date.now() - 120_000;
  state.recentRequestTimes = state.recentRequestTimes.filter((t) => t > twoMinutesAgo);

  if (state.activeRequests < profile.maxConcurrent && state.queue.length === 0) {
    const delay = calculateDelay(state, profile, mode, priority);
    if (delay === 0) {
      state.activeRequests++;
      state.recentRequestTimes.push(Date.now());
      return {
        release: () => releaseSlot(connectionId, profile, mode),
        delayed: false,
        delayMs: 0,
      };
    }
  }

  const enqueuedAt = Date.now();
  let resolved = false;
  let releaseFn: (() => void) | null = null;

  state.queue.push({
    resolve: () => {
      if (resolved) return;
      resolved = true;
    },
    priority,
    enqueuedAt,
  });

  if (state.activeRequests < profile.maxConcurrent) {
    processQueue(connectionId, profile, mode);
  }

  const delayMs = Date.now() - enqueuedAt;

  return {
    release: () => {
      if (resolved) return;
      resolved = true;
      releaseSlot(connectionId, profile, mode);
    },
    delayed: delayMs > 100,
    delayMs,
  };
}

export async function acquirePacingSlotAsync(
  options: AcquirePacingSlotOptions
): Promise<PacingSlot> {
  if (isNoAuth(options.connectionId)) {
    return { release: noopRelease(), delayed: false, delayMs: 0 };
  }

  const settings = options.settings;
  const mode = settings?.smartPacingMode || "auto";
  if (mode === "off" || settings?.smartPacingEnabled === false) {
    return { release: noopRelease(), delayed: false, delayMs: 0 };
  }

  const connectionId = options.connectionId!;
  const provider = options.provider;
  const userOverrides = settings?.smartPacingProviderProfiles;
  const profile = getProfile(provider, userOverrides);
  const state = getState(connectionId);
  const { priority } = detectClientType(options.headers);

  const twoMinutesAgo = Date.now() - 120_000;
  state.recentRequestTimes = state.recentRequestTimes.filter((t) => t > twoMinutesAgo);

  if (state.activeRequests < profile.maxConcurrent && state.queue.length === 0) {
    const delay = calculateDelay(state, profile, mode, priority);
    if (delay === 0) {
      state.activeRequests++;
      state.recentRequestTimes.push(Date.now());
      return {
        release: () => releaseSlot(connectionId, profile, mode),
        delayed: false,
        delayMs: 0,
      };
    }
  }

  const enqueuedAt = Date.now();

  await new Promise<void>((resolve) => {
    state.queue.push({ resolve, priority, enqueuedAt });
    if (state.activeRequests < profile.maxConcurrent) {
      processQueue(connectionId, profile, mode);
    }
  });

  const waitedMs = Date.now() - enqueuedAt;
  if (waitedMs > 100) {
    console.log(
      `[PACING] ${String(connectionId).slice(0, 8)} | waited ${waitedMs}ms (priority=${priority}, queue=${state.queue.length}, active=${state.activeRequests})`
    );
  }

  return {
    release: () => releaseSlot(connectionId, profile, mode),
    delayed: waitedMs > 100,
    delayMs: waitedMs,
  };
}

export function detectClientType(
  headers?: Record<string, string | string[] | undefined> | Headers | null
): ClientType {
  if (!headers) return { type: "unknown", priority: 5 };

  const getHeader = (name: string): string => {
    if (typeof (headers as Headers).get === "function") {
      return (headers as Headers).get(name) || "";
    }
    const val = (headers as Record<string, string | string[] | undefined>)[name];
    if (Array.isArray(val)) return val[0] || "";
    return val || "";
  };

  const ua = getHeader("user-agent");
  const xClientType = getHeader("x-client-type");

  if (xClientType) {
    const lower = xClientType.toLowerCase();
    if (lower === "interactive" || lower === "human" || lower === "chat") {
      return { type: "interactive", priority: 1 };
    }
    if (lower === "agent" || lower === "autonomous" || lower === "background") {
      return { type: "agent", priority: 10 };
    }
  }

  const browserPatterns = /mozilla|chrome|safari|firefox|edge|opera/i;
  if (browserPatterns.test(ua)) {
    return { type: "interactive", priority: 1 };
  }

  const idePatterns = /cursor|vscode|kiro|windsurf|zed|neovim|vim|emacs/i;
  if (idePatterns.test(ua)) {
    return { type: "agent", priority: 5 };
  }

  const cliPatterns = /curl|httpie|python|node|axios|got|fetch|aider|claude-code|codex/i;
  if (cliPatterns.test(ua)) {
    return { type: "agent", priority: 10 };
  }

  return { type: "unknown", priority: 5 };
}

export interface PacingStatsEntry {
  activeRequests: number;
  queueLength: number;
  rpm: number;
  lastRequestEndAt: number | null;
  timeSinceLastMs: number | null;
}

export function getPacingStats(connectionId: string): PacingStatsEntry | null {
  const state = connectionStates.get(connectionId);
  if (!state) return null;

  const now = Date.now();
  const oneMinuteAgo = now - 60_000;
  const rpm = state.recentRequestTimes.filter((t) => t > oneMinuteAgo).length;

  return {
    activeRequests: state.activeRequests,
    queueLength: state.queue.length,
    rpm,
    lastRequestEndAt: state.lastRequestEndAt || null,
    timeSinceLastMs: state.lastRequestEndAt ? now - state.lastRequestEndAt : null,
  };
}

export function getAllPacingStats(): Record<string, PacingStatsEntry> {
  const stats: Record<string, PacingStatsEntry> = {};
  for (const [id, state] of connectionStates) {
    const now = Date.now();
    const oneMinuteAgo = now - 60_000;
    stats[id] = {
      activeRequests: state.activeRequests,
      queueLength: state.queue.length,
      rpm: state.recentRequestTimes.filter((t) => t > oneMinuteAgo).length,
      lastRequestEndAt: state.lastRequestEndAt || null,
      timeSinceLastMs: state.lastRequestEndAt ? now - state.lastRequestEndAt : null,
    };
  }
  return stats;
}

export interface UpstreamResponseHeaders {
  "x-ratelimit-remaining"?: string | number;
  "retry-after"?: string | number;
}

export function adaptFromResponseHeaders(
  connectionId: string | null | undefined,
  responseHeaders:
    UpstreamResponseHeaders | Record<string, string | string[] | undefined> | null | undefined
): void {
  if (isNoAuth(connectionId) || !responseHeaders) return;

  const getHeader = (name: string): string | undefined => {
    const val = (responseHeaders as Record<string, string | string[] | undefined>)[name];
    if (Array.isArray(val)) return val[0];
    if (val !== undefined) return String(val);
    return undefined;
  };

  const remainingRaw = getHeader("x-ratelimit-remaining");
  const retryAfterRaw = getHeader("retry-after");

  const state = getState(connectionId!);

  if (remainingRaw !== undefined) {
    const remainingNum = parseInt(remainingRaw, 10);
    if (!isNaN(remainingNum) && remainingNum <= 5 && remainingNum >= 0) {
      const now = Date.now();
      const phantomCount = Math.max(0, 15 - remainingNum);
      for (let i = 0; i < phantomCount; i++) {
        state.recentRequestTimes.push(now - Math.random() * 30_000);
      }
    }
  }

  if (retryAfterRaw !== undefined) {
    const now = Date.now();
    for (let i = 0; i < 30; i++) {
      state.recentRequestTimes.push(now - Math.random() * 60_000);
    }
  }
}

export function resetPacingState(connectionId?: string): void {
  if (connectionId) {
    connectionStates.delete(connectionId);
  } else {
    connectionStates.clear();
  }
}

export function getProviderProfiles(): Record<string, SmartPacingProfile> {
  return PROVIDER_PROFILES;
}

export const PACING_DEFAULTS: SmartPacingSettings = {
  smartPacingEnabled: true,
  smartPacingMode: "auto",
  smartPacingProviderProfiles: {},
};
