/**
 * OpenCode provider plugin for OmniRoute AI Gateway
 *
 * Usage:
 *   import { createOmniRouteProvider } from "@omniroute/opencode-provider";
 *   const provider = createOmniRouteProvider({
 *     baseURL: "http://localhost:20128/v1",
 *     apiKey: "your-api-key",
 *   });
 *
 * Then add to OpenCode settings:
 *   { "provider": provider }
 */

export interface OmniRouteProviderOptions {
  baseURL: string;
  apiKey: string;
  model?: string;
}

export interface OmniRouteProvider {
  id: string;
  name: string;
  npm: string;
  options: Record<string, unknown>;
  auth: { type: string; apiKey: string };
}

export function createOmniRouteProvider(options: OmniRouteProviderOptions): OmniRouteProvider {
  if (!options.baseURL) {
    throw new Error("baseURL is required");
  }
  if (!options.apiKey) {
    throw new Error("apiKey is required");
  }

  const baseURL = options.baseURL.replace(/\/+$/, "");

  return {
    id: "omniroute",
    name: "OmniRoute AI Gateway",
    npm: "@omniroute/opencode-provider",
    options: {
      baseURL: `${baseURL}/v1`,
      model: options.model || "opencode",
    },
    auth: {
      type: "apiKey",
      apiKey: options.apiKey,
    },
  };
}

export default createOmniRouteProvider;
