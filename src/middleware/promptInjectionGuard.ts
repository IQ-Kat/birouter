/**
 * Prompt Injection Guard — Express/Next.js middleware
 *
 * Wraps the inputSanitizer module as middleware for API routes.
 * Blocks or warns on detected prompt injection attempts.
 *
 * @module middleware/promptInjectionGuard
 */

import { extractMessageContents, sanitizeRequest } from "../shared/utils/inputSanitizer";

/**
 * @typedef {Object} GuardOptions
 * @property {"block"|"warn"|"log"} [mode="warn"] - Action on detection
 * @property {boolean} [enabled=true] - Whether the guard is active
 * @property {"low"|"medium"|"high"} [blockThreshold="high"] - Minimum severity to block
 * @property {Array<string|RegExp|{name?: string, pattern: string|RegExp, severity?: "low"|"medium"|"high"}>} [customPatterns]
 * @property {Object} [logger] - Logger instance (defaults to console)
 */

const DEFAULT_GUARD_PATTERNS = [
  {
    name: "system_override_inline",
    pattern: /\bsystem\s*:\s*override\b/i,
    severity: "high",
  },
  {
    name: "markdown_system_block",
    pattern: /```+\s*system\b/i,
    severity: "high",
  },
];

const SEVERITY_SCORES = {
  low: 1,
  medium: 2,
  high: 3,
};

function normalizePatternEntry(entry: any, index: number) {
  if (entry instanceof RegExp) {
    return {
      name: `custom_${index}`,
      pattern: entry,
      severity: "high",
    };
  }

  if (typeof entry === "string") {
    return {
      name: `custom_${index}`,
      pattern: new RegExp(entry, "i"),
      severity: "high",
    };
  }

  if (!entry || (!(entry.pattern instanceof RegExp) && typeof entry.pattern !== "string")) {
    return null;
  }

  return {
    name: entry.name || `custom_${index}`,
    pattern: entry.pattern instanceof RegExp ? entry.pattern : new RegExp(entry.pattern, "i"),
    severity: entry.severity || "high",
  };
}

function detectWithPatterns(text: string, patterns: any[]) {
  const detections = [];

  for (const rule of patterns) {
    const match = text.match(rule.pattern);
    if (match) {
      detections.push({
        pattern: rule.name,
        severity: rule.severity,
        match: match[0].slice(0, 50),
      });
    }
  }

  return detections;
}

function shouldBlock(detections: any[], threshold: string) {
  const minimumSeverity = SEVERITY_SCORES[threshold as keyof typeof SEVERITY_SCORES] || 3;
  return detections.some(
    (d) => (SEVERITY_SCORES[d.severity as keyof typeof SEVERITY_SCORES] || 0) >= minimumSeverity
  );
}

/**
 * Create a prompt injection guard middleware.
 *
 * @param {GuardOptions} [options={}]
 * @returns {(req: Request) => { blocked: boolean, result: Object }|null}
 */
export function createInjectionGuard(options: any = {}) {
  const mode =
    options.mode || process.env.INJECTION_GUARD_MODE || process.env.INPUT_SANITIZER_MODE || "warn";
  const enabled = options.enabled ?? process.env.INPUT_SANITIZER_ENABLED !== "false";
  const blockThreshold = options.blockThreshold || options.threshold || "high";
  const logger = options.logger || console;
  const customPatterns = [...DEFAULT_GUARD_PATTERNS, ...(options.customPatterns || [])]
    .map(normalizePatternEntry)
    .filter(Boolean);

  /**
   * Check a request body for prompt injection.
   *
   * @param {Object} body - The parsed request body
   * @returns {{ blocked: boolean, result: Object }}
   */
  return function guardRequest(body: any) {
    if (!enabled || !body || typeof body !== "object") {
      return { blocked: false, result: { flagged: false, detections: [], piiDetections: [] } };
    }

    const result: any = sanitizeRequest(body, logger);
    const contents = extractMessageContents(body);
    const customDetections = detectWithPatterns(contents.join("\n"), customPatterns);

    if (customDetections.length > 0) {
      const existingDetections = new Set(
        result.detections.map((d) => `${d.pattern}:${d.match}:${d.severity}`)
      );

      for (const detection of customDetections) {
        const key = `${detection.pattern}:${detection.match}:${detection.severity}`;
        if (!existingDetections.has(key)) {
          result.detections.push(detection);
        }
      }
    }

    result.flagged = result.detections.length > 0 || result.piiDetections.length > 0;

    // Check if any detections were found (sanitizeRequest returns .detections, NOT .flagged)
    if (!result.flagged) {
      return { blocked: false, result };
    }

    if (mode === "block" && shouldBlock(result.detections, blockThreshold)) {
      logger.warn?.("[InjectionGuard] Blocked request with prompt injection:", {
        detections: result.detections.map((d) => ({ pattern: d.pattern, severity: d.severity })),
      });
      return { blocked: true, result };
    }

    if (mode === "warn" || mode === "log") {
      logger[mode === "warn" ? "warn" : "info"]?.(
        "[InjectionGuard] Detected potential injection patterns:",
        {
          detections: result.detections.map((d) => ({ pattern: d.pattern, severity: d.severity })),
          pii: result.piiDetections.length,
        }
      );
    }

    return { blocked: false, result };
  };
}

/**
 * Next.js API route handler wrapper for injection guarding.
 *
 * @param {Function} handler - Original route handler
 * @param {GuardOptions} [options={}]
 * @returns {Function} Wrapped handler
 */
export function withInjectionGuard(handler: any, options: any = {}) {
  const guard = createInjectionGuard(options);

  return async function guardedHandler(request: any, context: any) {
    // Only apply to POST/PUT/PATCH
    if (!["POST", "PUT", "PATCH"].includes(request.method)) {
      return handler(request, context);
    }

    try {
      // Clone request so body can still be read by handler
      const cloned = request.clone();
      const body = await cloned.json().catch(() => null);

      if (body) {
        const { blocked, result }: any = guard(body);

        if (blocked) {
          return new Response(
            JSON.stringify({
              error: {
                message: "Request blocked: potential prompt injection detected",
                type: "injection_detected",
                detections: result.detections.length,
              },
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        // Attach sanitization result as header for downstream handlers
        if (result.flagged) {
          request.headers.set("X-Injection-Flagged", "true");
          request.headers.set("X-Injection-Detections", String(result.detections.length));
        }
      }
    } catch {
      // Don't block on guard errors — fail open
    }

    return handler(request, context);
  };
}
