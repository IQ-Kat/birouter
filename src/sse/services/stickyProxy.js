/**
 * Sticky Proxy Service
 *
 * Ensures each OAuth connection (account) always uses the same proxy IP.
 * When a connection first uses a proxy pool, it auto-binds to one proxy
 * from that pool and remembers it permanently.
 *
 * This prevents the pattern of "same token, different IPs" which is a
 * major ban trigger for providers like Google/Antigravity.
 *
 * How it works:
 * 1. Connection has a proxyPoolId assigned (via settings or provider strategy)
 * 2. First request: pick a proxy from the pool, save binding to DB
 * 3. Subsequent requests: always use the same bound proxy
 *
 * Settings:
 *   - stickyProxyEnabled (boolean, default: true)
 *
 * Storage:
 *   - Binding stored in connection's providerSpecificData.stickyProxyUrl
 */

import { updateProviderConnection, getProviderConnections } from "@/lib/localDb";
import { getProxyPoolById } from "@/models";
import * as log from "../utils/logger.js";

// In-memory cache of sticky bindings (connectionId → proxyUrl)
// Avoids DB reads on every request
const bindingCache = new Map();

/**
 * Resolve the sticky proxy URL for a connection.
 *
 * @param {object} options
 * @param {string} options.connectionId - The connection ID
 * @param {object} options.providerSpecificData - Connection's provider-specific data
 * @param {string} options.provider - Provider name (for logging)
 * @returns {Promise<{proxyUrl: string|null, bound: boolean}>}
 *   proxyUrl: the proxy URL to use (null if no proxy needed)
 *   bound: true if this was a new binding (first time)
 */
export async function resolveStickyProxy({ connectionId, providerSpecificData, provider }) {
  if (!connectionId || connectionId === "noauth") {
    return { proxyUrl: null, bound: false };
  }

  // Check if connection already has a sticky binding
  const existingSticky = providerSpecificData?.stickyProxyUrl;
  if (existingSticky) {
    return { proxyUrl: existingSticky, bound: false };
  }

  // Check in-memory cache
  if (bindingCache.has(connectionId)) {
    return { proxyUrl: bindingCache.get(connectionId), bound: false };
  }

  // No sticky binding yet — check if there's a proxy pool to bind from
  const proxyPoolId = providerSpecificData?.connectionProxyPoolId ||
                      providerSpecificData?.proxyPoolId;

  if (!proxyPoolId || proxyPoolId === "__none__") {
    return { proxyUrl: null, bound: false };
  }

  // Load the proxy pool
  const pool = await getProxyPoolById(proxyPoolId);
  if (!pool || !pool.isActive || !pool.proxyUrl) {
    return { proxyUrl: null, bound: false };
  }

  // For relay-type pools (vercel/cloudflare/deno), sticky doesn't apply
  // because the relay URL is the same for everyone
  if (pool.type === "vercel" || pool.type === "cloudflare" || pool.type === "deno") {
    return { proxyUrl: null, bound: false };
  }

  // Bind this connection to the pool's proxy URL
  const proxyUrl = pool.proxyUrl.trim();

  // Persist the binding
  try {
    await updateProviderConnection(connectionId, {
      providerSpecificData: {
        ...providerSpecificData,
        stickyProxyUrl: proxyUrl,
      }
    });
    bindingCache.set(connectionId, proxyUrl);
    log.info("STICKY_PROXY", `Bound ${connectionId.slice(0, 8)} (${provider}) → ${maskProxyUrl(proxyUrl)}`);
  } catch (err) {
    log.warn("STICKY_PROXY", `Failed to persist binding for ${connectionId.slice(0, 8)}: ${err.message}`);
    // Still use it for this request even if persist failed
    bindingCache.set(connectionId, proxyUrl);
  }

  return { proxyUrl, bound: true };
}

/**
 * Clear a sticky proxy binding (e.g., when user changes proxy pool).
 *
 * @param {string} connectionId
 */
export function clearStickyBinding(connectionId) {
  bindingCache.delete(connectionId);
}

/**
 * Get the current sticky proxy for a connection (from cache only, no DB).
 *
 * @param {string} connectionId
 * @returns {string|null}
 */
export function getCachedStickyProxy(connectionId) {
  return bindingCache.get(connectionId) || null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function maskProxyUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.password) parsed.password = "***";
    if (parsed.username) parsed.username = parsed.username.slice(0, 3) + "***";
    return parsed.toString();
  } catch {
    return url.slice(0, 20) + "...";
  }
}

// ─── Shared IP Warning ────────────────────────────────────────────────────────

// Providers where shared IP is high-risk for ban propagation
const HIGH_RISK_PROVIDERS = new Set(["antigravity", "gemini-cli", "claude", "codex"]);

// Track which IPs are used by which connections (provider → Map<proxyUrl, Set<connectionId>>)
const ipUsageMap = new Map();

// Debounce: only warn once per IP per 10 minutes
const warnedIPs = new Map(); // proxyUrl → timestamp
const WARN_COOLDOWN_MS = 10 * 60_000;

/**
 * Track IP usage per connection and emit warning if multiple accounts
 * from the same high-risk provider share the same IP.
 *
 * Call this after proxy resolution in the auth flow.
 *
 * @param {string} provider - Provider name
 * @param {string} connectionId - Connection ID
 * @param {string|null} proxyUrl - Resolved proxy URL (null = direct/no proxy)
 */
export function trackAndWarnSharedIP(provider, connectionId, proxyUrl) {
  if (!HIGH_RISK_PROVIDERS.has(provider)) return;

  const effectiveIP = proxyUrl || "__direct_ip__";

  if (!ipUsageMap.has(provider)) {
    ipUsageMap.set(provider, new Map());
  }

  const providerMap = ipUsageMap.get(provider);
  if (!providerMap.has(effectiveIP)) {
    providerMap.set(effectiveIP, new Set());
  }

  const connections = providerMap.get(effectiveIP);
  connections.add(connectionId);

  // Warn if more than 1 account shares the same IP for a high-risk provider
  if (connections.size > 1) {
    const warnKey = `${provider}:${effectiveIP}`;
    const lastWarned = warnedIPs.get(warnKey) || 0;
    if (Date.now() - lastWarned > WARN_COOLDOWN_MS) {
      warnedIPs.set(warnKey, Date.now());
      const ipLabel = proxyUrl ? maskProxyUrl(proxyUrl) : "direct (no proxy)";
      log.warn("SECURITY", `⚠️  ${provider} | ${connections.size} accounts sharing same IP: ${ipLabel}`);
      log.warn("SECURITY", `   Risk: If one account gets banned, others on the same IP may follow.`);
      log.warn("SECURITY", `   Fix: Assign a separate Proxy Pool to each ${provider} account.`);
    }
  }
}

/**
 * Get shared IP warnings for dashboard display.
 * @returns {Array<{provider: string, ip: string, accountCount: number}>}
 */
export function getSharedIPWarnings() {
  const warnings = [];
  for (const [provider, providerMap] of ipUsageMap) {
    for (const [ip, connections] of providerMap) {
      if (connections.size > 1) {
        warnings.push({
          provider,
          ip: ip === "__direct_ip__" ? "Direct (no proxy)" : maskProxyUrl(ip),
          accountCount: connections.size,
        });
      }
    }
  }
  return warnings;
}
