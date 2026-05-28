/**
 * Fingerprint Consistency Service
 *
 * Ensures outbound requests have headers that match the real client
 * being impersonated per provider. Prevents detection via:
 * 1. Leaked internal headers (x-forwarded-for, via, etc.)
 * 2. Missing required headers that real clients always send
 * 3. Inconsistent User-Agent across requests for the same provider
 *
 * This service operates as a "header sanitizer" — it strips dangerous
 * headers and injects required ones before requests leave Birouter.
 *
 * Settings:
 *   - fingerprintEnabled (boolean, default: true)
 */

import * as log from "../utils/logger.js";

// ─── Headers that MUST be stripped from outbound requests ─────────────────────
// These leak information about the proxy/internal infrastructure.
const GLOBAL_STRIP_HEADERS = new Set([
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-real-ip",
  "via",
  "forwarded",
  "x-request-id",       // Internal Birouter request ID, not the provider's
  "x-9r-cli-token",     // Birouter CLI auth token
  "x-client-type",      // Smart pacing hint — internal only
  "cf-connecting-ip",   // Cloudflare
  "cf-ray",
  "true-client-ip",
]);

// ─── Per-provider header rules ────────────────────────────────────────────────
// Each provider defines:
//   strip: additional headers to remove for this provider
//   inject: headers to always add (overrides existing)
//   preserve: headers from the original request to keep as-is

const PROVIDER_RULES = {
  antigravity: {
    strip: [
      "x-goog-user-project",  // Triggers "project not used" ban
      "x-goog-request-reason",
    ],
    inject: {
      // UA is handled by the executor itself (AntigravityExecutor.buildHeaders)
      // We just ensure no conflicting headers leak through
    },
  },

  "gemini-cli": {
    strip: [
      "x-goog-user-project",
    ],
    inject: {},
  },

  github: {
    strip: [],
    inject: {
      // Copilot-specific headers are set by GithubExecutor.buildHeaders
      // Just ensure nothing leaks
    },
  },

  claude: {
    strip: [],
    inject: {},
  },

  codex: {
    strip: [],
    inject: {},
  },

  openai: {
    strip: [],
    inject: {},
  },

  cursor: {
    strip: [],
    inject: {},
  },

  kiro: {
    strip: [],
    inject: {},
  },

  xai: {
    strip: [],
    inject: {},
  },
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Sanitize headers for an outbound request to a provider.
 * Call this AFTER the executor builds its headers but BEFORE the request is sent.
 *
 * @param {object} headers - Headers object (will be mutated)
 * @param {string} provider - Provider name
 * @param {object} [settings] - App settings (for fingerprintEnabled check)
 * @returns {object} The sanitized headers object
 */
export function sanitizeOutboundHeaders(headers, provider, settings) {
  if (settings?.fingerprintEnabled === false) return headers;

  // Strip global dangerous headers
  for (const h of GLOBAL_STRIP_HEADERS) {
    delete headers[h];
    // Also check capitalized variants
    delete headers[h.split("-").map(w => w[0]?.toUpperCase() + w.slice(1)).join("-")];
  }

  // Apply provider-specific rules
  const rules = PROVIDER_RULES[provider];
  if (rules) {
    // Strip provider-specific headers
    if (rules.strip) {
      for (const h of rules.strip) {
        delete headers[h];
        delete headers[h.toLowerCase()];
      }
    }

    // Inject required headers (only if not already set by executor)
    if (rules.inject) {
      for (const [key, value] of Object.entries(rules.inject)) {
        if (!headers[key] && !headers[key.toLowerCase()]) {
          headers[key] = value;
        }
      }
    }
  }

  return headers;
}

/**
 * Check if a header name is safe to forward from client to upstream.
 * Used by MITM handlers and proxy layers.
 *
 * @param {string} headerName - Header name (lowercase)
 * @param {string} [provider] - Optional provider for provider-specific rules
 * @returns {boolean}
 */
export function isHeaderSafeToForward(headerName, provider) {
  const lower = headerName.toLowerCase();

  if (GLOBAL_STRIP_HEADERS.has(lower)) return false;

  if (provider) {
    const rules = PROVIDER_RULES[provider];
    if (rules?.strip?.some(h => h.toLowerCase() === lower)) return false;
  }

  return true;
}

/**
 * Get the canonical User-Agent for a provider.
 * Useful for consistency checks and logging.
 *
 * @param {string} provider
 * @returns {string|null}
 */
export function getCanonicalUserAgent(provider) {
  switch (provider) {
    case "antigravity":
      return "antigravity/1.107.0 win32/x64";
    case "gemini-cli":
      return null; // Dynamic per-model, handled by executor
    case "github":
      return "GitHubCopilotChat/0.38.0";
    case "cursor":
      return null; // Binary proto, handled by executor
    case "kiro":
      return null; // Handled by executor
    default:
      return null;
  }
}
