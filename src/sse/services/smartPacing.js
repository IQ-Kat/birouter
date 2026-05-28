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
 *   - smartPacingMaxConcurrent (number, default: 1) — max parallel requests per account
 *   - smartPacingMinGapMs (number, default: 1500) — minimum gap between requests per account
 *   - smartPacingBurstTolerance (number, default: 3) — allow N rapid requests before enforcing gap
 *   - smartPacingProviderProfiles (object) — per-provider overrides
 */

import * as log from "../utils/logger.js";

// ─── Provider-specific default profiles ───────────────────────────────────────
// These define safe defaults per provider based on known detection sensitivity.
const PROVIDER_PROFILES = {
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
  // Default for unknown providers
  _default: {
    maxConcurrent: 1,
    minGapMs: 1500,
    burstTolerance: 3,
    maxRpmPerAccount: 20,
    sensitivity: "medium",
  },
};

// ─── In-memory state per connection ───────────────────────────────────────────

/**
 * @typedef {Object} ConnectionPacingState
 * @property {number} activeRequests - Currently in-flight requests
 * @property {number} lastRequestEndAt - Timestamp when last request completed
 * @property {number[]} recentRequestTimes - Timestamps of recent requests (sliding window)
 * @property {Array<{resolve: Function, priority: number, enqueuedAt: number}>} queue - Waiting requests
 */

/** @type {Map<string, ConnectionPacingState>} */
const connectionStates = new Map();

// Cleanup stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  const STALE_MS = 30 * 60_000; // 30 minutes of inactivity
  for (const [key, state] of connectionStates) {
    if (state.activeRequests === 0 && state.queue.length === 0 &&
        now - state.lastRequestEndAt > STALE_MS) {
      connectionStates.delete(key);
    }
  }
}, 10 * 60_000);

function getState(connectionId) {
  if (!connectionStates.has(connectionId)) {
    connectionStates.set(connectionId, {
      activeRequests: 0,
      lastRequestEndAt: 0,
      recentRequestTimes: [],
      queue: [],
    });
  }
  return connectionStates.get(connectionId);
}

// ─── Client type detection ────────────────────────────────────────────────────

/**
 * Detect client type from request headers.
 * Returns priority level: lower = higher priority (processed first).
 *
 * @param {object} headers - Request headers object or Headers instance
 * @returns {{ type: "interactive" | "agent" | "unknown", priority: number }}
 */
export function detectClientType(headers) {
  const ua = (typeof headers?.get === "function"
    ? headers.get("user-agent")
    : headers?.["user-agent"]) || "";
  const xClientType = (typeof headers?.get === "function"
    ? headers.get("x-client-type")
    : headers?.["x-client-type"]) || "";

  // Explicit header override (clients can self-identify)
  if (xClientType) {
    const lower = xClientType.toLowerCase();
    if (lower === "interactive" || lower === "human" || lower === "chat") {
      return { type: "interactive", priority: 1 };
    }
    if (lower === "agent" || lower === "autonomous" || lower === "background") {
      return { type: "agent", priority: 10 };
    }
  }

  // Heuristic: browser-based UAs are likely interactive
  const browserPatterns = /mozilla|chrome|safari|firefox|edge|opera/i;
  if (browserPatterns.test(ua)) {
    return { type: "interactive", priority: 1 };
  }

  // IDE/CLI patterns — could be human or agent, use medium priority
  const idePatterns = /cursor|vscode|kiro|windsurf|zed|neovim|vim|emacs/i;
  if (idePatterns.test(ua)) {
    return { type: "agent", priority: 5 };
  }

  // CLI/automation patterns — likely agent
  const cliPatterns = /curl|httpie|python|node|axios|got|fetch|aider|claude-code|codex/i;
  if (cliPatterns.test(ua)) {
    return { type: "agent", priority: 10 };
  }

  return { type: "unknown", priority: 5 };
}

// ─── Core pacing logic ────────────────────────────────────────────────────────

/**
 * Get the effective profile for a provider, merging user overrides.
 */
function getProfile(provider, settings) {
  const base = PROVIDER_PROFILES[provider] || PROVIDER_PROFILES._default;
  const userOverrides = settings?.smartPacingProviderProfiles?.[provider] || {};
  return { ...base, ...userOverrides };
}

/**
 * Calculate the required delay before a request can proceed.
 *
 * @param {ConnectionPacingState} state
 * @param {object} profile - Provider profile
 * @param {string} mode - "off" | "auto" | "human-sim"
 * @param {number} priority - Client priority (lower = higher priority)
 * @returns {number} delay in ms (0 = proceed immediately)
 */
function calculateDelay(state, profile, mode, priority) {
  if (mode === "off") return 0;

  const now = Date.now();
  const timeSinceLastRequest = now - state.lastRequestEndAt;

  // If no recent activity, no delay needed
  if (state.lastRequestEndAt === 0 || timeSinceLastRequest > profile.minGapMs * 3) {
    return 0;
  }

  // Count requests in the last minute (RPM check)
  const oneMinuteAgo = now - 60_000;
  const recentCount = state.recentRequestTimes.filter(t => t > oneMinuteAgo).length;

  // If under burst tolerance and gap is reasonable, no delay
  if (recentCount < profile.burstTolerance && timeSinceLastRequest > 500) {
    return 0;
  }

  // Calculate minimum gap enforcement
  let requiredGap = profile.minGapMs;

  // Human simulator mode: add jitter and longer gaps
  if (mode === "human-sim") {
    // Simulate human "thinking time" — 2-8 seconds with randomness
    const baseThinkTime = 2000 + Math.random() * 6000;
    requiredGap = Math.max(requiredGap, baseThinkTime);
  }

  // Adaptive: if approaching RPM limit, increase gap progressively
  const rpmUsage = recentCount / profile.maxRpmPerAccount;
  if (rpmUsage > 0.7) {
    // Scale gap up as we approach the limit
    const scaleFactor = 1 + (rpmUsage - 0.7) * 10; // 1x at 70%, 4x at 100%
    requiredGap *= scaleFactor;
  }

  // Lower priority (higher number) = slightly longer wait
  if (priority > 5) {
    requiredGap *= 1 + (priority - 5) * 0.1;
  }

  // Calculate actual delay needed
  const delay = Math.max(0, requiredGap - timeSinceLastRequest);

  // Add small random jitter (±15%) to avoid perfectly regular patterns
  if (delay > 0) {
    const jitter = delay * 0.15 * (Math.random() * 2 - 1);
    return Math.max(0, Math.round(delay + jitter));
  }

  return 0;
}

/**
 * Process the next item in the queue for a connection.
 */
function processQueue(connectionId, profile, mode) {
  const state = getState(connectionId);

  if (state.queue.length === 0) return;
  if (state.activeRequests >= profile.maxConcurrent) return;

  // Sort queue by priority (lower = higher priority), then by enqueue time
  state.queue.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.enqueuedAt - b.enqueuedAt;
  });

  const next = state.queue[0];
  const delay = calculateDelay(state, profile, mode, next.priority);

  if (delay === 0) {
    // Proceed immediately
    state.queue.shift();
    state.activeRequests++;
    state.recentRequestTimes.push(Date.now());
    next.resolve();
  } else {
    // Schedule after delay
    setTimeout(() => {
      // Re-check state (might have changed)
      const currentState = getState(connectionId);
      const idx = currentState.queue.indexOf(next);
      if (idx === -1) return; // Already removed (e.g., timeout)

      currentState.queue.splice(idx, 1);
      currentState.activeRequests++;
      currentState.recentRequestTimes.push(Date.now());
      next.resolve();

      // Try to process more from queue
      processQueue(connectionId, profile, mode);
    }, delay);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Acquire a pacing slot for a connection. Returns a promise that resolves
 * when the request is allowed to proceed, and a release function to call
 * when the request completes.
 *
 * @param {object} options
 * @param {string} options.connectionId - The OAuth connection ID
 * @param {string} options.provider - Provider name (for profile lookup)
 * @param {object} options.settings - App settings object
 * @param {object} [options.headers] - Request headers (for client type detection)
 * @returns {Promise<{ release: () => void, delayed: boolean, delayMs: number }>}
 */
export async function acquirePacingSlot({ connectionId, provider, settings, headers }) {
  // Skip pacing for "noauth" connections (free providers)
  if (!connectionId || connectionId === "noauth") {
    return { release: () => {}, delayed: false, delayMs: 0 };
  }

  const mode = settings?.smartPacingMode || "auto";
  if (mode === "off" || settings?.smartPacingEnabled === false) {
    return { release: () => {}, delayed: false, delayMs: 0 };
  }

  const profile = getProfile(provider, settings);
  const state = getState(connectionId);
  const { priority } = detectClientType(headers);

  // Trim old entries from recentRequestTimes (keep last 2 minutes)
  const twoMinutesAgo = Date.now() - 120_000;
  state.recentRequestTimes = state.recentRequestTimes.filter(t => t > twoMinutesAgo);

  // Fast path: if no contention and gap is sufficient, proceed immediately
  if (state.activeRequests < profile.maxConcurrent && state.queue.length === 0) {
    const delay = calculateDelay(state, profile, mode, priority);
    if (delay === 0) {
      state.activeRequests++;
      state.recentRequestTimes.push(Date.now());
      const startTime = Date.now();
      return {
        release: () => releaseSlot(connectionId, profile, mode, startTime),
        delayed: false,
        delayMs: 0,
      };
    }
  }

  // Enqueue and wait
  const enqueuedAt = Date.now();
  let delayMs = 0;

  await new Promise((resolve) => {
    state.queue.push({ resolve, priority, enqueuedAt });

    // If we can process immediately (just need delay), kick off processing
    if (state.activeRequests < profile.maxConcurrent) {
      processQueue(connectionId, profile, mode);
    }
  });

  delayMs = Date.now() - enqueuedAt;
  const startTime = Date.now();

  if (delayMs > 100) {
    log.debug("PACING", `${connectionId.slice(0, 8)} | waited ${delayMs}ms (priority=${priority}, queue=${state.queue.length}, active=${state.activeRequests})`);
  }

  return {
    release: () => releaseSlot(connectionId, profile, mode, startTime),
    delayed: delayMs > 100,
    delayMs,
  };
}

/**
 * Release a pacing slot after request completes.
 */
function releaseSlot(connectionId, profile, mode, startTime) {
  const state = getState(connectionId);
  state.activeRequests = Math.max(0, state.activeRequests - 1);
  state.lastRequestEndAt = Date.now();

  // Process next in queue
  if (state.queue.length > 0) {
    processQueue(connectionId, profile, mode);
  }
}

/**
 * Get current pacing stats for a connection (for dashboard/debugging).
 */
export function getPacingStats(connectionId) {
  const state = connectionStates.get(connectionId);
  if (!state) return null;

  const now = Date.now();
  const oneMinuteAgo = now - 60_000;
  const rpm = state.recentRequestTimes.filter(t => t > oneMinuteAgo).length;

  return {
    activeRequests: state.activeRequests,
    queueLength: state.queue.length,
    rpm,
    lastRequestEndAt: state.lastRequestEndAt,
    timeSinceLastMs: state.lastRequestEndAt ? now - state.lastRequestEndAt : null,
  };
}

/**
 * Get all pacing stats (for dashboard overview).
 */
export function getAllPacingStats() {
  const stats = {};
  for (const [id, state] of connectionStates) {
    const now = Date.now();
    const oneMinuteAgo = now - 60_000;
    stats[id] = {
      activeRequests: state.activeRequests,
      queueLength: state.queue.length,
      rpm: state.recentRequestTimes.filter(t => t > oneMinuteAgo).length,
    };
  }
  return stats;
}

/**
 * Adapt pacing based on upstream response headers.
 * Call this after receiving a response from the provider.
 *
 * @param {string} connectionId
 * @param {object} responseHeaders - Response headers from upstream
 */
export function adaptFromResponseHeaders(connectionId, responseHeaders) {
  if (!connectionId || connectionId === "noauth") return;

  const remaining = responseHeaders?.["x-ratelimit-remaining"];
  const retryAfter = responseHeaders?.["retry-after"];

  if (remaining !== undefined) {
    const state = getState(connectionId);
    const remainingNum = parseInt(remaining, 10);

    // If remaining is very low, artificially inflate recent request count
    // to trigger adaptive pacing
    if (remainingNum <= 5 && remainingNum >= 0) {
      const now = Date.now();
      // Add phantom entries to make the system think we're near the limit
      const phantomCount = Math.max(0, 15 - remainingNum);
      for (let i = 0; i < phantomCount; i++) {
        state.recentRequestTimes.push(now - Math.random() * 30_000);
      }
      log.info("PACING", `${connectionId.slice(0, 8)} | upstream remaining=${remainingNum}, injected ${phantomCount} phantom entries`);
    }
  }

  if (retryAfter) {
    // If we got a Retry-After, the account is already in trouble.
    // The existing markAccountUnavailable handles this, but we can
    // also increase pacing pressure.
    const state = getState(connectionId);
    const now = Date.now();
    // Fill up recent requests to max out adaptive pacing
    for (let i = 0; i < 30; i++) {
      state.recentRequestTimes.push(now - Math.random() * 60_000);
    }
  }
}

// Export profiles for settings UI
export { PROVIDER_PROFILES };
