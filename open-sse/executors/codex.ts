import { BaseExecutor } from "./base.ts";
import { CODEX_DEFAULT_INSTRUCTIONS } from "../config/codexInstructions.ts";
import { PROVIDERS } from "../config/constants.ts";

// Ordered list of effort levels from lowest to highest
const EFFORT_ORDER = ["none", "low", "medium", "high", "xhigh"] as const;
type EffortLevel = (typeof EFFORT_ORDER)[number];

/**
 * Maximum reasoning effort allowed per Codex model.
 * Models not listed here default to "xhigh" (unrestricted).
 * Update this table when Codex releases new models with different caps.
 */
const MAX_EFFORT_BY_MODEL: Record<string, EffortLevel> = {
  "gpt-5.3-codex": "xhigh",
  "gpt-5.2-codex": "xhigh",
  "gpt-5.1-codex-max": "xhigh",
  "gpt-5-mini": "high",
  "gpt-5.1-mini": "high",
  "gpt-4.1-mini": "high",
};

/**
 * Clamp reasoning effort to the model's maximum allowed level.
 * Returns the original value if within limits, or the cap if it exceeds it.
 */
function clampEffort(model: string, requested: string): string {
  const max: EffortLevel = MAX_EFFORT_BY_MODEL[model] ?? "xhigh";
  const reqIdx = EFFORT_ORDER.indexOf(requested as EffortLevel);
  const maxIdx = EFFORT_ORDER.indexOf(max);
  if (reqIdx > maxIdx) {
    console.debug(`[Codex] clampEffort: "${requested}" → "${max}" (model: ${model})`);
    return max;
  }
  return requested;
}

/**
 * Codex Executor - handles OpenAI Codex API (Responses API format)
 * Automatically injects default instructions if missing.
 * IMPORTANT: Includes chatgpt-account-id header for workspace binding.
 */
export class CodexExecutor extends BaseExecutor {
  constructor() {
    super("codex", PROVIDERS.codex);
  }

  /**
   * Codex Responses endpoint is SSE-first.
   * Always request event-stream from upstream, even when client requested stream=false.
   * Includes chatgpt-account-id header for strict workspace binding.
   */
  buildHeaders(credentials, stream = true) {
    const headers = super.buildHeaders(credentials, true);

    // Add workspace binding header if workspaceId is persisted
    const workspaceId = credentials?.providerSpecificData?.workspaceId;
    if (workspaceId) {
      headers["chatgpt-account-id"] = workspaceId;
    }

    return headers;
  }

  /**
   * Transform request before sending - inject default instructions if missing
   */
  transformRequest(model, body, stream, credentials) {
    // Codex /responses rejects stream=false; we aggregate SSE back to JSON when needed.
    body.stream = true;

    // If no instructions provided, inject default Codex instructions
    if (!body.instructions || body.instructions.trim() === "") {
      body.instructions = CODEX_DEFAULT_INSTRUCTIONS;
    }

    // Ensure store is false (Codex requirement)
    body.store = false;

    // Extract thinking level from model name suffix
    // e.g., gpt-5.3-codex-high → high, gpt-5.3-codex → medium (default)
    const effortLevels = ["none", "low", "medium", "high", "xhigh"];
    let modelEffort: string | null = null;
    // Track the clean model name (suffix stripped) for clamp lookup
    let cleanModel = model;
    for (const level of effortLevels) {
      if (model.endsWith(`-${level}`)) {
        modelEffort = level;
        // Strip suffix from model name for actual API call
        body.model = body.model.replace(`-${level}`, "");
        cleanModel = body.model;
        break;
      }
    }

    // Priority: explicit reasoning.effort > reasoning_effort param > model suffix > default (medium)
    if (!body.reasoning) {
      const rawEffort = body.reasoning_effort || modelEffort || "medium";
      // Clamp effort to the model's maximum allowed level (feature-07)
      const effort = clampEffort(cleanModel, rawEffort);
      body.reasoning = { effort };
    } else if (body.reasoning.effort) {
      // Also clamp if reasoning object was provided directly
      body.reasoning.effort = clampEffort(cleanModel, body.reasoning.effort);
    }
    delete body.reasoning_effort;

    // Remove unsupported parameters for Codex API
    delete body.temperature;
    delete body.top_p;
    delete body.frequency_penalty;
    delete body.presence_penalty;
    delete body.logprobs;
    delete body.top_logprobs;
    delete body.n;
    delete body.seed;
    delete body.max_tokens;
    delete body.user; // Cursor sends this but Codex doesn't support it
    delete body.prompt_cache_retention; // Cursor sends this but Codex doesn't support it
    delete body.metadata; // Cursor sends this but Codex doesn't support it
    delete body.stream_options; // Cursor sends this but Codex doesn't support it
    delete body.safety_identifier; // Droid CLI sends this but Codex doesn't support it

    return body;
  }
}
