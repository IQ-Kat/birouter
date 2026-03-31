import { NextResponse } from "next/server";
import { z } from "zod";
import { getDbInstance } from "@/lib/db/core";
import { getComboById, getCombos } from "@/lib/db/combos";
import { getQuotaSnapshots } from "@/lib/db/quotaSnapshots";
import type {
  ComboHealthMetrics,
  ComboHealthResponse,
  QuotaSnapshotRow,
  UtilizationTimeRange,
} from "@/shared/types/utilization";

type ComboModelNode = string | { model?: string | null };

type ComboRecord = {
  id?: string;
  name?: string;
  strategy?: string;
  models?: ComboModelNode[];
};

type ModelUsageRow = {
  model: string | null;
  requests: number | null;
  totalTokens: number | null;
};

type PerformanceRow = {
  totalRequests: number | null;
  successCount: number | null;
  avgLatencyMs: number | null;
};

type QuotaSnapshotView = {
  connectionId?: string;
  remainingPercentage?: number | null;
  isExhausted?: number;
  createdAt?: string;
};

type ProviderHealth = {
  provider: string;
  remainingPct: number;
  isExhausted: boolean;
  trend: "improving" | "stable" | "declining";
};

const querySchema = z.object({
  range: z.enum(["1h", "24h", "7d", "30d"]),
  comboId: z
    .string()
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    .optional(),
});

function getRangeStartIso(range: UtilizationTimeRange): string {
  const end = new Date();
  const start = new Date(end);

  switch (range) {
    case "1h":
      start.setHours(start.getHours() - 1);
      break;
    case "24h":
      start.setDate(start.getDate() - 1);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
  }

  return start.toISOString();
}

function roundNumber(value: number, digits = 2): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(digits));
}

function toSafeNumber(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function normalizeComboModels(models: ComboModelNode[] | undefined): string[] {
  if (!Array.isArray(models)) return [];

  return models
    .map((entry) => {
      if (typeof entry === "string") return entry;
      if (entry && typeof entry === "object" && typeof entry.model === "string") {
        return entry.model;
      }
      return "";
    })
    .filter((entry): entry is string => entry.trim().length > 0);
}

function extractProvider(model: string): string {
  const [provider] = model.split("/");
  return provider?.trim() || "unknown";
}

function calculateGini(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((accumulator, value) => accumulator + value, 0);
  if (sum === 0) return 0;

  let weightedSum = 0;
  for (let index = 0; index < count; index += 1) {
    weightedSum += (index + 1) * sorted[index];
  }

  return (2 * weightedSum) / (count * sum) - (count + 1) / count;
}

function buildProviderHealth(provider: string, snapshots: QuotaSnapshotRow[]): ProviderHealth {
  if (snapshots.length === 0) {
    return {
      provider,
      remainingPct: 0,
      isExhausted: false,
      trend: "stable",
    };
  }

  const histories = new Map<string, QuotaSnapshotRow[]>();
  for (const snapshot of snapshots) {
    const snapshotView = snapshot as unknown as QuotaSnapshotView;
    const connectionId = snapshotView.connectionId || "unknown";
    const existing = histories.get(connectionId) ?? [];
    existing.push(snapshot);
    histories.set(connectionId, existing);
  }

  const firstValues: number[] = [];
  const lastValues: number[] = [];
  let isExhausted = false;

  for (const history of histories.values()) {
    const ordered = [...history].sort((left, right) => {
      const leftView = left as unknown as QuotaSnapshotView;
      const rightView = right as unknown as QuotaSnapshotView;
      return (leftView.createdAt || "").localeCompare(rightView.createdAt || "");
    });
    const firstSnapshot = ordered.find((entry) => {
      const entryView = entry as unknown as QuotaSnapshotView;
      return entryView.remainingPercentage !== null && entryView.remainingPercentage !== undefined;
    });
    const lastSnapshot = [...ordered].reverse().find((entry) => {
      const entryView = entry as unknown as QuotaSnapshotView;
      return entryView.remainingPercentage !== null && entryView.remainingPercentage !== undefined;
    });
    const firstSnapshotView = firstSnapshot as unknown as QuotaSnapshotView | undefined;
    const lastSnapshotView = lastSnapshot as unknown as QuotaSnapshotView | undefined;

    if (
      firstSnapshotView?.remainingPercentage !== null &&
      firstSnapshotView?.remainingPercentage !== undefined
    ) {
      firstValues.push(firstSnapshotView.remainingPercentage);
    }

    if (
      lastSnapshotView?.remainingPercentage !== null &&
      lastSnapshotView?.remainingPercentage !== undefined
    ) {
      lastValues.push(lastSnapshotView.remainingPercentage);
    }

    const latestEntry = ordered[ordered.length - 1] as unknown as QuotaSnapshotView | undefined;
    isExhausted = isExhausted || latestEntry?.isExhausted === 1;
  }

  const firstAverage =
    firstValues.length > 0
      ? firstValues.reduce((accumulator, value) => accumulator + value, 0) / firstValues.length
      : 0;
  const lastAverage =
    lastValues.length > 0
      ? lastValues.reduce((accumulator, value) => accumulator + value, 0) / lastValues.length
      : 0;
  const delta = lastAverage - firstAverage;

  let trend: ProviderHealth["trend"] = "stable";
  if (delta >= 5) trend = "improving";
  if (delta <= -5) trend = "declining";

  return {
    provider,
    remainingPct: roundNumber(lastAverage),
    isExhausted,
    trend,
  };
}

function buildUsageSkew(
  comboName: string,
  comboModels: string[],
  since: string
): ComboHealthMetrics["usageSkew"] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT
         model,
         COUNT(*) as requests,
         SUM(COALESCE(tokens_in, 0) + COALESCE(tokens_out, 0)) as totalTokens
       FROM call_logs
       WHERE combo_name = ?
         AND timestamp >= ?
       GROUP BY model`
    )
    .all(comboName, since) as ModelUsageRow[];

  const usageByModel = new Map<string, { requests: number; tokens: number }>();
  for (const model of comboModels) {
    usageByModel.set(model, { requests: 0, tokens: 0 });
  }

  for (const row of rows) {
    const model =
      typeof row.model === "string" && row.model.trim().length > 0 ? row.model : "unknown";
    usageByModel.set(model, {
      requests: toSafeNumber(row.requests),
      tokens: toSafeNumber(row.totalTokens),
    });
  }

  const modelDistributionEntries = Array.from(usageByModel.entries());
  const totalRequests = modelDistributionEntries.reduce(
    (accumulator, [, usage]) => accumulator + usage.requests,
    0
  );
  const totalTokens = modelDistributionEntries.reduce(
    (accumulator, [, usage]) => accumulator + usage.tokens,
    0
  );

  return {
    modelDistribution: modelDistributionEntries.map(([model, usage]) => ({
      model,
      requestShare: totalRequests > 0 ? roundNumber(usage.requests / totalRequests, 4) : 0,
      tokenShare: totalTokens > 0 ? roundNumber(usage.tokens / totalTokens, 4) : 0,
    })),
    giniCoefficient: roundNumber(
      calculateGini(modelDistributionEntries.map(([, usage]) => usage.requests)),
      4
    ),
  };
}

function buildPerformance(comboName: string, since: string): ComboHealthMetrics["performance"] {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT
         COUNT(*) as totalRequests,
         SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) as successCount,
         AVG(duration) as avgLatencyMs
       FROM call_logs
       WHERE combo_name = ?
         AND timestamp >= ?`
    )
    .get(comboName, since) as PerformanceRow | undefined;

  const totalRequests = toSafeNumber(row?.totalRequests);
  const successCount = toSafeNumber(row?.successCount);
  const avgLatencyMs = toSafeNumber(row?.avgLatencyMs);

  return {
    avgLatencyMs: roundNumber(avgLatencyMs),
    successRate: totalRequests > 0 ? roundNumber(successCount / totalRequests, 4) : 0,
    totalRequests,
  };
}

function buildQuotaHealth(providers: string[], since: string): ComboHealthMetrics["quotaHealth"] {
  const providerHealth = providers.map((provider) =>
    buildProviderHealth(provider, getQuotaSnapshots({ provider, since }))
  );

  const worstRemainingPct =
    providerHealth.length > 0
      ? providerHealth.reduce(
          (lowest, entry) => Math.min(lowest, entry.remainingPct),
          providerHealth[0].remainingPct
        )
      : 0;

  return {
    providers: providerHealth,
    worstRemainingPct: roundNumber(worstRemainingPct),
  };
}

function buildComboHealth(combo: ComboRecord, since: string): ComboHealthMetrics | null {
  const comboId = typeof combo.id === "string" ? combo.id : "";
  const comboName = typeof combo.name === "string" ? combo.name : "";
  if (!comboId || !comboName) return null;

  const models = normalizeComboModels(combo.models);
  const providers = Array.from(new Set(models.map(extractProvider)));

  return {
    comboId,
    comboName,
    strategy:
      typeof combo.strategy === "string" && combo.strategy.trim().length > 0
        ? combo.strategy
        : "priority",
    models,
    quotaHealth: buildQuotaHealth(providers, since),
    usageSkew: buildUsageSkew(comboName, models, since),
    performance: buildPerformance(comboName, since),
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedQuery = querySchema.safeParse({
      range: searchParams.get("range"),
      comboId: searchParams.get("comboId") || undefined,
    });

    if (!parsedQuery.success) {
      return NextResponse.json(
        {
          error: parsedQuery.error.issues[0]?.message ?? "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { range, comboId } = parsedQuery.data;
    const since = getRangeStartIso(range);

    let combos: ComboRecord[] = [];
    if (comboId) {
      const combo = (await getComboById(comboId)) as ComboRecord | null;
      if (!combo) {
        return NextResponse.json({ error: "Combo not found" }, { status: 404 });
      }
      combos = [combo];
    } else {
      combos = (await getCombos()) as ComboRecord[];
    }

    const response: ComboHealthResponse = {
      timeRange: range,
      combos: combos
        .map((combo) => buildComboHealth(combo, since))
        .filter((combo): combo is ComboHealthMetrics => combo !== null),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching combo health:", error);
    return NextResponse.json({ error: "Failed to fetch combo health" }, { status: 500 });
  }
}
