/**
 * Reasoning Replay Cache — In-memory + DB hybrid service.
 *
 * Captures reasoning_content from thinking-mode model responses (DeepSeek V4,
 * Kimi K2, Qwen-Thinking, GLM, etc.) and re-injects it on subsequent turns
 * when clients omit it. This prevents the DeepSeek 400 error:
 * "The reasoning_content in the thinking mode must be passed back to the API."
 *
 * Architecture:
 *   Write: memory + DB simultaneously (fire-and-forget DB write)
 *   Read:  memory first → DB fallback → miss
 *
 * @see Issue #1628
 */

// ──────────────── Provider/Model Detection ────────────────

const REASONING_REPLAY_PROVIDERS = new Set([
  "deepseek",
  "opencode-go",
  "siliconflow",
  "nebius",
  "deepinfra",
  "sambanova",
  "fireworks",
  "together",
]);

const REASONING_REPLAY_MODEL_PATTERNS = [
  /deepseek-r1/i,
  /deepseek-reasoner/i,
  /deepseek-chat/i,
  /kimi-k2/i,
  /qwq/i,
  /qwen.*think/i,
  /glm.*think/i,
];

/**
 * Check if a provider/model combination requires reasoning replay.
 */
export function requiresReasoningReplay(provider: string, model: string): boolean {
  if (REASONING_REPLAY_PROVIDERS.has(provider)) return true;
  return REASONING_REPLAY_MODEL_PATTERNS.some((p) => p.test(model));
}

// ──────────────── In-Memory Cache ────────────────

interface MemoryCacheEntry {
  reasoning: string;
  provider: string;
  model: string;
  expiresAt: number;
  createdAt: number;
}

const memoryCache = new Map<string, MemoryCacheEntry>();
const MAX_MEMORY_ENTRIES = 2000;
const TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

// ──────────────── Counters ────────────────

let hits = 0;
let misses = 0;
let replays = 0;

// ──────────────── Core Operations ────────────────

/**
 * Evict the oldest entry from the memory cache when full.
 */
function evictOldest(): void {
  let oldestKey: string | null = null;
  let oldestTime = Infinity;
  for (const [key, entry] of memoryCache) {
    if (entry.createdAt < oldestTime) {
      oldestTime = entry.createdAt;
      oldestKey = key;
    }
  }
  if (oldestKey) memoryCache.delete(oldestKey);
}

/**
 * Remove expired entries from memory cache.
 */
function purgeExpiredMemory(): void {
  const now = Date.now();
  for (const [key, entry] of memoryCache) {
    if (now >= entry.expiresAt) {
      memoryCache.delete(key);
    }
  }
}

/**
 * Cache a reasoning_content string for one or more tool_call IDs.
 * Writes to both memory and DB (DB write is fire-and-forget).
 */
export function cacheReasoning(
  toolCallId: string,
  provider: string,
  model: string,
  reasoning: string
): void {
  if (!toolCallId || !reasoning) return;

  const now = Date.now();

  // Memory write
  if (memoryCache.size >= MAX_MEMORY_ENTRIES) {
    evictOldest();
  }
  memoryCache.set(toolCallId, {
    reasoning,
    provider,
    model,
    expiresAt: now + TTL_MS,
    createdAt: now,
  });

  // DB write (fire-and-forget — don't block the hot path)
  try {
    const { setReasoningCache } = require("@/lib/db/reasoningCache");
    setReasoningCache(toolCallId, provider, model, reasoning, TTL_MS);
  } catch {
    // DB write failure is non-fatal; memory cache still serves
  }
}

/**
 * Cache reasoning for multiple tool_call IDs (same reasoning content).
 */
export function cacheReasoningBatch(
  toolCallIds: string[],
  provider: string,
  model: string,
  reasoning: string
): void {
  for (const id of toolCallIds) {
    if (id) cacheReasoning(id, provider, model, reasoning);
  }
}

/**
 * Look up cached reasoning_content by tool_call_id.
 * Memory first → DB fallback → null (miss).
 */
export function lookupReasoning(toolCallId: string): string | null {
  if (!toolCallId) {
    misses++;
    return null;
  }

  // 1. Check memory
  const mem = memoryCache.get(toolCallId);
  if (mem) {
    if (Date.now() < mem.expiresAt) {
      hits++;
      return mem.reasoning;
    }
    // Expired in memory — remove
    memoryCache.delete(toolCallId);
  }

  // 2. Fallback to DB
  try {
    const { getReasoningCache } = require("@/lib/db/reasoningCache");
    const dbResult = getReasoningCache(toolCallId);
    if (dbResult) {
      hits++;
      // Promote back to memory for fast subsequent lookups
      memoryCache.set(toolCallId, {
        reasoning: dbResult.reasoning,
        provider: dbResult.provider,
        model: dbResult.model,
        expiresAt: Date.now() + TTL_MS,
        createdAt: Date.now(),
      });
      return dbResult.reasoning;
    }
  } catch {
    // DB read failure is non-fatal
  }

  // 3. Miss
  misses++;
  return null;
}

/**
 * Record that a replay was performed (for dashboard metrics).
 */
export function recordReplay(): void {
  replays++;
}

// ──────────────── Stats & Dashboard ────────────────

/**
 * Get combined stats from memory + DB + counters.
 */
export function getReasoningCacheServiceStats(): {
  memoryEntries: number;
  dbEntries: number;
  totalEntries: number;
  totalChars: number;
  hits: number;
  misses: number;
  replays: number;
  replayRate: string;
  byProvider: Record<string, { entries: number; chars: number }>;
  byModel: Record<string, { entries: number; chars: number }>;
  oldestEntry: string | null;
  newestEntry: string | null;
} {
  // Purge expired memory entries before reporting
  purgeExpiredMemory();

  let dbStats = {
    totalEntries: 0,
    totalChars: 0,
    byProvider: {} as Record<string, { entries: number; chars: number }>,
    byModel: {} as Record<string, { entries: number; chars: number }>,
    oldestEntry: null as string | null,
    newestEntry: null as string | null,
  };

  try {
    const { getReasoningCacheStats } = require("@/lib/db/reasoningCache");
    dbStats = getReasoningCacheStats();
  } catch {
    // DB unavailable — return memory-only stats
  }

  const totalLookups = hits + misses;
  const replayRate = totalLookups > 0 ? ((replays / totalLookups) * 100).toFixed(1) : "0.0";

  return {
    memoryEntries: memoryCache.size,
    dbEntries: dbStats.totalEntries,
    totalEntries: dbStats.totalEntries,
    totalChars: dbStats.totalChars,
    hits,
    misses,
    replays,
    replayRate: `${replayRate}%`,
    byProvider: dbStats.byProvider,
    byModel: dbStats.byModel,
    oldestEntry: dbStats.oldestEntry,
    newestEntry: dbStats.newestEntry,
  };
}

/**
 * Get paginated entries (delegates to DB).
 */
export function getReasoningCacheServiceEntries(
  opts: {
    limit?: number;
    offset?: number;
    provider?: string;
    model?: string;
  } = {}
): unknown[] {
  try {
    const { getReasoningCacheEntries } = require("@/lib/db/reasoningCache");
    return getReasoningCacheEntries(opts);
  } catch {
    return [];
  }
}

/**
 * Clear all reasoning cache entries (memory + DB).
 * Returns count of DB entries removed.
 */
export function clearReasoningCacheAll(provider?: string): number {
  // Clear memory
  if (provider) {
    for (const [key, entry] of memoryCache) {
      if (entry.provider === provider) memoryCache.delete(key);
    }
  } else {
    memoryCache.clear();
  }

  // Reset counters
  hits = 0;
  misses = 0;
  replays = 0;

  // Clear DB
  try {
    const { clearAllReasoningCache } = require("@/lib/db/reasoningCache");
    return clearAllReasoningCache(provider);
  } catch {
    return 0;
  }
}

/**
 * Cleanup expired entries from both memory and DB.
 * Called periodically (e.g., every 30 min from health-check).
 */
export function cleanupReasoningCache(): number {
  purgeExpiredMemory();
  try {
    const { cleanupExpiredReasoning } = require("@/lib/db/reasoningCache");
    return cleanupExpiredReasoning();
  } catch {
    return 0;
  }
}
