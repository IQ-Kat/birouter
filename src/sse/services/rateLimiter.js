/**
 * In-memory sliding-window rate limiter for /v1/* API endpoints.
 * 
 * Controlled by settings:
 *   - rateLimitEnabled (boolean, default: false)
 *   - rateLimitRpm (number, default: 60) — requests per minute
 * 
 * Rate limits per API key (or per IP if no key provided).
 */

const WINDOW_MS = 60_000; // 1 minute sliding window

// Map<identifier, Array<timestamp>>
const windows = new Map();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of windows) {
    const valid = timestamps.filter((t) => now - t < WINDOW_MS);
    if (valid.length === 0) {
      windows.delete(key);
    } else {
      windows.set(key, valid);
    }
  }
}, 5 * 60_000);

/**
 * Check if a request should be rate limited.
 * 
 * @param {object} settings - App settings object
 * @param {string|null} apiKey - The API key used (null if no key)
 * @param {string|null} ip - Client IP address
 * @returns {{ limited: boolean, remaining: number, resetIn: number } | null}
 *   null = rate limiting disabled, skip check
 *   { limited: true } = request should be rejected
 *   { limited: false, remaining } = request allowed
 */
export function checkRateLimit(settings, apiKey, ip) {
  if (!settings || settings.rateLimitEnabled !== true) return null;

  const maxRpm = settings.rateLimitRpm || 60;
  const identifier = apiKey || ip || "anonymous";
  const now = Date.now();

  let timestamps = windows.get(identifier);
  if (!timestamps) {
    timestamps = [];
    windows.set(identifier, timestamps);
  }

  // Remove expired entries
  const validStart = now - WINDOW_MS;
  while (timestamps.length > 0 && timestamps[0] < validStart) {
    timestamps.shift();
  }

  if (timestamps.length >= maxRpm) {
    // Calculate when the oldest request in window expires
    const resetIn = Math.ceil((timestamps[0] + WINDOW_MS - now) / 1000);
    return { limited: true, remaining: 0, resetIn };
  }

  // Record this request
  timestamps.push(now);
  const remaining = maxRpm - timestamps.length;

  return { limited: false, remaining, resetIn: 0 };
}

/**
 * Build rate limit response headers (for both allowed and rejected requests)
 */
export function rateLimitHeaders(result, settings) {
  if (!result) return {};
  const maxRpm = settings?.rateLimitRpm || 60;
  return {
    "X-RateLimit-Limit": String(maxRpm),
    "X-RateLimit-Remaining": String(result.remaining),
    ...(result.limited ? { "Retry-After": String(result.resetIn) } : {}),
  };
}
