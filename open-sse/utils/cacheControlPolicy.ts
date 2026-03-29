/**
 * Cache Control Policy
 *
 * Determines when to preserve client-side prompt caching headers (cache_control)
 * vs. applying OmniRoute's own caching strategy.
 *
 * Client-side caching (e.g., Claude Code) should be preserved when:
 * 1. Client is Claude Code or similar caching-aware client
 * 2. Request will hit a deterministic target (single model or deterministic combo strategy)
 * 3. Provider supports prompt caching (Anthropic, Alibaba Qwen, etc.)
 */

import type { RoutingStrategyValue } from "../../src/shared/constants/routingStrategies";

/**
 * Routing strategies that are deterministic (same request → same provider)
 */
const DETERMINISTIC_STRATEGIES: Set<RoutingStrategyValue> = new Set([
  "priority",
  "cost-optimized",
]);

/**
 * Providers that support prompt caching
 */
const CACHING_PROVIDERS = new Set([
  "claude",
  "anthropic",
  "zai",
  "qwen", // Alibaba Qwen Coding Plan International
]);

/**
 * Detect if the client is Claude Code or another caching-aware client
 */
export function isClaudeCodeClient(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();

  // Claude Code user agents
  if (ua.includes("claude-code") || ua.includes("claude_code")) return true;
  if (ua.includes("anthropic") && ua.includes("cli")) return true;

  return false;
}

/**
 * Check if a provider supports prompt caching
 */
export function providerSupportsCaching(provider: string | null | undefined): boolean {
  if (!provider) return false;
  return CACHING_PROVIDERS.has(provider.toLowerCase());
}

/**
 * Check if a routing strategy is deterministic
 */
export function isDeterministicStrategy(strategy: RoutingStrategyValue | null | undefined): boolean {
  if (!strategy) return false;
  return DETERMINISTIC_STRATEGIES.has(strategy);
}

/**
 * Determine if client-side cache_control headers should be preserved
 *
 * @param userAgent - User-Agent header from the request
 * @param isCombo - Whether this is a combo model
 * @param comboStrategy - The combo's routing strategy (if applicable)
 * @param targetProvider - The target provider for the request
 * @returns true if cache_control should be preserved, false if OmniRoute should manage it
 */
export function shouldPreserveCacheControl({
  userAgent,
  isCombo,
  comboStrategy,
  targetProvider,
}: {
  userAgent: string | null | undefined;
  isCombo: boolean;
  comboStrategy?: RoutingStrategyValue | null;
  targetProvider: string | null | undefined;
}): boolean {
  // Must be a caching-aware client
  if (!isClaudeCodeClient(userAgent)) {
    return false;
  }

  // Target provider must support caching
  if (!providerSupportsCaching(targetProvider)) {
    return false;
  }

  // Single model: always preserve (deterministic)
  if (!isCombo) {
    return true;
  }

  // Combo: only preserve if strategy is deterministic
  return isDeterministicStrategy(comboStrategy);
}
