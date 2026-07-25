import { getRegistryEntry } from "@birouter/open-sse/config/providerRegistry.ts";

/**
 * Derive a models-discovery config from the provider's registry `modelsUrl`
 * when the provider is absent from the hardcoded PROVIDER_MODELS_CONFIG.
 *
 * Returns a config object with Bearer auth suitable for fetching an
 * OpenAI-compatible `/v1/models` endpoint, or `undefined` when the
 * registry entry has no `modelsUrl`.
 */
export function deriveConfigFromRegistryModelsUrl(provider: string):
  | {
      url: string;
      method: "GET";
      headers: Record<string, string>;
      authHeader?: string;
      authPrefix?: string;
      authQuery?: string;
      body?: unknown;
      parseResponse: (data: any) => any;
    }
  | undefined {
  const entry = getRegistryEntry(provider);
  if (typeof entry?.modelsUrl === "string" && entry.modelsUrl.length > 0) {
    return {
      url: entry.modelsUrl,
      method: "GET",
      authHeader: "Authorization",
      authPrefix: "Bearer ",
      headers: { "Content-Type": "application/json" },
      parseResponse: (data) => data.data || data.models || [],
    };
  }
  if (typeof entry?.baseUrl === "string" && entry.baseUrl.length > 0) {
    let base = entry.baseUrl.replace(/\/$/, "");
    if (base.endsWith("/chat/completions")) {
      base = base.slice(0, -"/chat/completions".length);
    } else if (base.endsWith("/completions")) {
      base = base.slice(0, -"/completions".length);
    }
    return {
      url: `${base}/models`,
      method: "GET",
      authHeader: "Authorization",
      authPrefix: "Bearer ",
      headers: { "Content-Type": "application/json" },
      parseResponse: (data) => data.data || data.models || [],
    };
  }
  return undefined;
}
