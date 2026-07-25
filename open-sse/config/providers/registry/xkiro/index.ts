import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * xKiro — OpenAI-compatible AI gateway (https://xkiro.com/).
 *
 * Supports free and paid models via OpenAI-compatible endpoint.
 */
export const xkiroProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "xkiro",
  alias: "xkiro",
  passthroughModels: true,
  baseUrl: "https://api.xkiro.com/v1/chat/completions",
  models: [
    { id: "anthropic/claude-sonnet-4-5", name: "Claude Sonnet 4.5", contextLength: 200000 },
    { id: "openai/gpt-4o", name: "GPT-4o", contextLength: 128000 },
  ],
});
