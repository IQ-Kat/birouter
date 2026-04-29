/**
 * Cache-aware strategy selection for AI model compression.
 * Implements logic to detect caching context from request body and adjust strategies accordingly.
 *
 * @file cachingAware.ts
 * @exports CachingContext, CacheAwareStrategy, detectCachingContext, getCacheAwareStrategy
 */

// Define the CachingContext interface
export interface CachingContext {
  hasCacheControl: boolean; // Whether cache_control is present in the request body
  provider: string | null; // Extracted provider (e.g., "anthropic", "openai", etc.)
  isCachingProvider: boolean; // True if the provider supports caching optimizations
}

// Define the CacheAwareStrategy interface
export interface CacheAwareStrategy {
  strategy: string; // Selected strategy (e.g., "standard", "aggressive", etc.)
  skipSystemPrompt: boolean; // Whether to skip the system prompt for caching
  deterministicOnly: boolean; // Whether deterministic responses are required
}

/**
 * Detect the caching context from the request body.
 *
 * @param body - The request body to analyze
 * @returns A CachingContext object
 */
export function detectCachingContext(body: unknown): CachingContext {
  const hasCacheControl = Boolean((body as any)?.cache_control);

  // Extract the provider from the model string
  const model = (body as any)?.model;
  const providerMatch = model?.match(/^(anthropic|openai|gemini|google)\//);
  const provider = providerMatch ? providerMatch[1] : null;

  // Check if the provider is among caching-aware providers
  const isCachingProvider = ["anthropic", "openai", "gemini", "google"].includes(provider ?? "");

  return {
    hasCacheControl,
    provider,
    isCachingProvider,
  };
}

/**
 * Get a cache-aware strategy based on the given strategy and caching context.
 *
 * @param strategy - The initial strategy (e.g., "aggressive", "ultra", etc.)
 * @param ctx - The caching context
 * @returns A CacheAwareStrategy object
 */
export function getCacheAwareStrategy(strategy: string, ctx: CachingContext): CacheAwareStrategy {
  if (ctx.isCachingProvider && ctx.hasCacheControl) {
    // Adjust strategy for caching providers with cache control
    return {
      strategy: ["aggressive", "ultra"].includes(strategy) ? "standard" : strategy,
      skipSystemPrompt: true,
      deterministicOnly: true,
    };
  }

  // Return the original strategy with no modifications
  return {
    strategy,
    skipSystemPrompt: false,
    deterministicOnly: false,
  };
}
