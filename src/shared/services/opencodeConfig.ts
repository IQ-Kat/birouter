type OpenCodeConfigInput = {
  baseUrl?: string;
  apiKey?: string;
  model?: string;
};

const OPENCODE_DEFAULT_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;

const normalizeValue = (value: unknown) =>
  String(value || "")
    .trim()
    .replace(/^\/+/, "");

export const buildOpenCodeProviderConfig = ({
  baseUrl,
  apiKey,
  model,
}: OpenCodeConfigInput): Record<string, any> => {
  const normalizedBaseUrl = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");
  const normalizedModel = normalizeValue(model);

  const uniqueModels = [...new Set([normalizedModel, ...OPENCODE_DEFAULT_MODELS].filter(Boolean))];

  const modelsRecord: Record<string, { name: string }> = {};
  for (const m of uniqueModels) {
    if (m) {
      modelsRecord[m] = { name: m };
    }
  }

  return {
    npm: "@ai-sdk/openai-compatible",
    name: "OmniRoute",
    options: {
      baseURL: normalizedBaseUrl,
      apiKey: apiKey || "sk_omniroute",
    },
    models: modelsRecord,
  };
};

export const mergeOpenCodeConfig = (
  existingConfig: Record<string, any> | null | undefined,
  input: OpenCodeConfigInput
) => {
  const safeConfig =
    existingConfig && typeof existingConfig === "object" && !Array.isArray(existingConfig)
      ? existingConfig
      : {};

  return {
    ...safeConfig,
    provider: {
      ...((safeConfig as any).provider || {}),
      omniroute: buildOpenCodeProviderConfig(input),
    },
  };
};
