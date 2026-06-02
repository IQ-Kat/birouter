import type { QuotaDimension } from "./dimensions";

interface KnownPlanShape {
  provider: string;
  dimensions: QuotaDimension[];
}

const KNOWN_PLANS: Record<string, KnownPlanShape> = {
  codex: {
    provider: "codex",
    dimensions: [
      { unit: "percent", window: "5h", limit: 100 },
      { unit: "percent", window: "weekly", limit: 100 },
    ],
  },
  glm: {
    provider: "glm",
    dimensions: [
      // limit=0 = desconhecido; documentado. Mantido para correta detecção pelo planResolver.
      // Sliding window / fair-share devem tratar limit=0 como "manual obrigatório".
      { unit: "tokens", window: "5h", limit: Number.EPSILON },
      { unit: "tokens", window: "weekly", limit: Number.EPSILON },
    ],
  },
  minimax: {
    provider: "minimax",
    dimensions: [
      { unit: "tokens", window: "5h", limit: Number.EPSILON },
      { unit: "tokens", window: "weekly", limit: Number.EPSILON },
    ],
  },
  bailian: {
    provider: "bailian",
    dimensions: [
      { unit: "percent", window: "5h", limit: 100 },
      { unit: "percent", window: "weekly", limit: 100 },
      { unit: "percent", window: "monthly", limit: 100 },
    ],
  },
  kimi: {
    provider: "kimi",
    dimensions: [{ unit: "requests", window: "hourly", limit: 1500 }],
  },
  // Kimi "coding" plan connections register under the `kimi-coding` slug, which
  // exposes no upstream balance API. EPSILON = "unknown, set the real plan limit
  // manually in the Wizard 'Limite' step" (same convention as glm/minimax).
  "kimi-coding": {
    provider: "kimi-coding",
    dimensions: [
      { unit: "tokens", window: "5h", limit: Number.EPSILON },
      { unit: "tokens", window: "weekly", limit: Number.EPSILON },
    ],
  },
  // Xiaomi MiMo exposes no upstream balance API. Default seeds the "lite" plan's
  // 4.1B-token weekly cap so the Wizard pre-fills a usable fair-share limit;
  // adjust in the "Limite" step to match the connection's actual plan.
  "xiaomi-mimo": {
    provider: "xiaomi-mimo",
    dimensions: [
      { unit: "tokens", window: "5h", limit: Number.EPSILON },
      { unit: "tokens", window: "weekly", limit: 4_100_000_000 },
    ],
  },
  alibaba: {
    provider: "alibaba",
    dimensions: [{ unit: "requests", window: "monthly", limit: 90_000 }],
  },
};

export function getKnownPlan(provider: string): KnownPlanShape | null {
  return KNOWN_PLANS[provider] ?? null;
}

export function knownProviders(): readonly string[] {
  return Object.keys(KNOWN_PLANS);
}
