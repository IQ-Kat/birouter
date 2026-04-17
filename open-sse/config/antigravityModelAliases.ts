export const ANTIGRAVITY_PUBLIC_MODELS = Object.freeze([
  { id: "claude-opus-4-6-thinking", name: "Claude Opus 4.6 Thinking" },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
  { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview" },
  { id: "gemini-3-pro-preview", name: "Gemini 3 Pro Preview" },
  { id: "gemini-3-pro-image-preview", name: "Gemini 3 Pro Image Preview" },
  {
    id: "gemini-2.5-computer-use-preview-10-2025",
    name: "Gemini 2.5 Computer Use Preview (10/2025)",
  },
  { id: "gemini-3.1-flash-image", name: "Gemini 3.1 Flash Image" },
  { id: "gemini-3.1-pro-low", name: "Gemini 3.1 Pro (Low)" },
  { id: "gemini-claude-sonnet-4-5", name: "Claude Sonnet 4.5 (Gemini Route)" },
  {
    id: "gemini-claude-sonnet-4-5-thinking",
    name: "Claude Sonnet 4.5 Thinking (Gemini Route)",
  },
  {
    id: "gemini-claude-opus-4-5-thinking",
    name: "Claude Opus 4.5 Thinking (Gemini Route)",
  },
  { id: "gpt-oss-120b-medium", name: "GPT OSS 120B Medium" },
]);

export const ANTIGRAVITY_MODEL_ALIASES = Object.freeze({
  "gemini-3-pro-preview": "gemini-3.1-pro-high",
  "gemini-3-flash-preview": "gemini-3-flash",
  "gemini-3-pro-image-preview": "gemini-3-pro-image",
  "gemini-2.5-computer-use-preview-10-2025": "rev19-uic3-1p",
  "gemini-claude-sonnet-4-5": "claude-sonnet-4-5",
  "gemini-claude-sonnet-4-5-thinking": "claude-sonnet-4-5-thinking",
  "gemini-claude-opus-4-5-thinking": "claude-opus-4-5-thinking",
});

export const ANTIGRAVITY_REVERSE_MODEL_ALIASES = Object.freeze(
  Object.entries(ANTIGRAVITY_MODEL_ALIASES).reduce<Record<string, string>>(
    (acc, [alias, target]) => {
      if (!acc[target]) {
        acc[target] = alias;
      }
      return acc;
    },
    {}
  )
);

const CLIENT_VISIBLE_MODEL_NAMES = Object.freeze(
  ANTIGRAVITY_PUBLIC_MODELS.reduce<Record<string, string>>((acc, model) => {
    acc[model.id] = model.name;
    return acc;
  }, {})
);

export function resolveAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return ANTIGRAVITY_MODEL_ALIASES[modelId] || modelId;
}

export function toClientAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return ANTIGRAVITY_REVERSE_MODEL_ALIASES[modelId] || modelId;
}

export function getClientVisibleAntigravityModelName(
  modelId: string,
  fallbackName?: string
): string {
  return CLIENT_VISIBLE_MODEL_NAMES[modelId] || fallbackName || modelId;
}
