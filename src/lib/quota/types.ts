import type { DimensionKey, Policy, QuotaDimension } from "./dimensions";

export interface PoolUsageSnapshot {
  poolId: string;
  generatedAt: string;
  dimensions: Array<{
    unit: QuotaDimension["unit"];
    window: QuotaDimension["window"];
    limit: number;
    consumedTotal: number;
    perKey: Array<{
      apiKeyId: string;
      consumed: number;
      fairShare: number;
      deficit: number;
      borrowing: boolean;
    }>;
  }>;
  burnRate?: {
    tokensPerSecond: number;
    timeToExhaustionMs: number | null;
  };
}

export interface ConsumeResult {
  effective: number;
  limit: number;
  fairShare: number;
  allowed: boolean;
  policyApplied: Policy;
  reason: "ok" | "fair-share" | "cap-absolute" | "global-saturated";
}

export interface QuotaStore {
  consume(apiKeyId: string, dim: DimensionKey, cost: number): Promise<number>;
  peek(apiKeyId: string, dim: DimensionKey): Promise<number>;
  poolUsage(poolId: string): Promise<PoolUsageSnapshot>;
  clear(apiKeyId: string, dim: DimensionKey): Promise<void>;
}

export interface EnforceInput {
  apiKeyId: string;
  connectionId: string;
  provider: string;
  estimatedCost?: { tokens?: number; usd?: number; requests?: number };
}

export type EnforceDecision =
  | { kind: "allow"; deprioritize?: boolean }
  | { kind: "block"; reason: string; httpStatus: 429; retryAfterSeconds?: number };

export interface RecordConsumptionInput {
  apiKeyId: string;
  connectionId: string;
  provider: string;
  cost: { tokens?: number; usd?: number; requests?: number };
}
