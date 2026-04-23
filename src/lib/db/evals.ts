import { randomUUID } from "node:crypto";
import { createScorecard } from "@/lib/evals/evalRunner";
import { getDbInstance, rowToCamel } from "./core";

export type EvalTargetType = "suite-default" | "model" | "combo";

export interface EvalTargetDescriptor {
  type: EvalTargetType;
  id: string | null;
  key: string;
  label: string;
}

export interface EvalRunSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
}

export interface PersistedEvalRun {
  id: string;
  runGroupId: string | null;
  suiteId: string;
  suiteName: string;
  target: EvalTargetDescriptor;
  apiKeyId: string | null;
  avgLatencyMs: number;
  summary: EvalRunSummary;
  results: Array<Record<string, unknown>>;
  outputs: Record<string, string>;
  createdAt: string;
}

type JsonRecord = Record<string, unknown>;

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function parseJsonRecord(value: unknown): JsonRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as JsonRecord;
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    return {};
  }

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as JsonRecord)
      : {};
  } catch {
    return {};
  }
}

function parseJsonArray(value: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(value)) {
    return value.filter(
      (entry): entry is Record<string, unknown> =>
        !!entry && typeof entry === "object" && !Array.isArray(entry)
    );
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter(
          (entry): entry is Record<string, unknown> =>
            !!entry && typeof entry === "object" && !Array.isArray(entry)
        )
      : [];
  } catch {
    return [];
  }
}

function parseNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function serializeEvalTargetKey(type: EvalTargetType, id?: string | null): string {
  return `${type}:${typeof id === "string" && id.trim().length > 0 ? id.trim() : "__default__"}`;
}

function toTargetDescriptor(row: JsonRecord): EvalTargetDescriptor {
  const type = row.targetType;
  const rawId = row.targetId;
  const id = typeof rawId === "string" && rawId.trim().length > 0 ? rawId.trim() : null;
  const normalizedType: EvalTargetType =
    type === "combo" || type === "model" || type === "suite-default" ? type : "suite-default";

  return {
    type: normalizedType,
    id,
    key: serializeEvalTargetKey(normalizedType, id),
    label:
      typeof row.targetLabel === "string" && row.targetLabel.trim().length > 0
        ? row.targetLabel.trim()
        : normalizedType === "combo"
          ? `Combo: ${id || "Unknown"}`
          : normalizedType === "model"
            ? `Model: ${id || "Unknown"}`
            : "Suite defaults",
  };
}

function toPersistedEvalRun(row: unknown): PersistedEvalRun | null {
  const camel = rowToCamel(row) as JsonRecord | null;
  if (!camel) return null;

  const summaryRecord = parseJsonRecord(camel.summaryJson);
  const outputsRecord = parseJsonRecord(camel.outputsJson);
  const outputs = Object.fromEntries(
    Object.entries(outputsRecord)
      .filter((entry): entry is [string, string] => typeof entry[0] === "string")
      .map(([key, value]) => [key, typeof value === "string" ? value : String(value ?? "")])
  );

  return {
    id: typeof camel.id === "string" ? camel.id : "",
    runGroupId:
      typeof camel.runGroupId === "string" && camel.runGroupId.trim().length > 0
        ? camel.runGroupId
        : null,
    suiteId: typeof camel.suiteId === "string" ? camel.suiteId : "",
    suiteName: typeof camel.suiteName === "string" ? camel.suiteName : "",
    target: toTargetDescriptor(camel),
    apiKeyId:
      typeof camel.apiKeyId === "string" && camel.apiKeyId.trim().length > 0
        ? camel.apiKeyId
        : null,
    avgLatencyMs: parseNumber(camel.avgLatencyMs),
    summary: {
      total: parseNumber(summaryRecord.total ?? camel.total),
      passed: parseNumber(summaryRecord.passed ?? camel.passed),
      failed: parseNumber(summaryRecord.failed ?? camel.failed),
      passRate: parseNumber(summaryRecord.passRate ?? camel.passRate),
    },
    results: parseJsonArray(camel.resultsJson),
    outputs,
    createdAt: typeof camel.createdAt === "string" ? camel.createdAt : "",
  };
}

export function saveEvalRun(input: {
  runGroupId?: string | null;
  suiteId: string;
  suiteName: string;
  target: { type: EvalTargetType; id?: string | null; label: string };
  apiKeyId?: string | null;
  avgLatencyMs?: number;
  summary: EvalRunSummary;
  results: Array<Record<string, unknown>>;
  outputs?: Record<string, string>;
  createdAt?: string;
}): PersistedEvalRun {
  const db = getDbInstance() as unknown as DbLike;
  const createdAt = input.createdAt || new Date().toISOString();
  const id = randomUUID();
  const targetId =
    typeof input.target.id === "string" && input.target.id.trim().length > 0
      ? input.target.id.trim()
      : null;
  const avgLatencyMs = Number.isFinite(Number(input.avgLatencyMs))
    ? Math.max(0, Math.round(Number(input.avgLatencyMs)))
    : 0;

  db.prepare(
    `INSERT INTO eval_runs
      (id, run_group_id, suite_id, suite_name, target_type, target_id, target_label, api_key_id,
       pass_rate, total, passed, failed, avg_latency_ms, summary_json, results_json, outputs_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.runGroupId || null,
    input.suiteId,
    input.suiteName,
    input.target.type,
    targetId,
    input.target.label,
    input.apiKeyId || null,
    input.summary.passRate,
    input.summary.total,
    input.summary.passed,
    input.summary.failed,
    avgLatencyMs,
    JSON.stringify(input.summary),
    JSON.stringify(input.results || []),
    JSON.stringify(input.outputs || {}),
    createdAt
  );

  return {
    id,
    runGroupId: input.runGroupId || null,
    suiteId: input.suiteId,
    suiteName: input.suiteName,
    target: {
      type: input.target.type,
      id: targetId,
      key: serializeEvalTargetKey(input.target.type, targetId),
      label: input.target.label,
    },
    apiKeyId: input.apiKeyId || null,
    avgLatencyMs,
    summary: input.summary,
    results: input.results || [],
    outputs: input.outputs || {},
    createdAt,
  };
}

export function listEvalRuns(
  options: {
    suiteId?: string;
    runGroupId?: string;
    limit?: number;
  } = {}
): PersistedEvalRun[] {
  const db = getDbInstance() as unknown as DbLike;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (options.suiteId) {
    conditions.push("suite_id = ?");
    params.push(options.suiteId);
  }

  if (options.runGroupId) {
    conditions.push("run_group_id = ?");
    params.push(options.runGroupId);
  }

  const limit = Number.isFinite(Number(options.limit))
    ? Math.min(200, Math.max(1, Math.floor(Number(options.limit))))
    : 20;
  params.push(limit);

  const sql = `SELECT *
    FROM eval_runs
    ${conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""}
    ORDER BY created_at DESC
    LIMIT ?`;
  const rows = db.prepare(sql).all(...params);
  return rows
    .map((row) => toPersistedEvalRun(row))
    .filter((row): row is PersistedEvalRun => row !== null);
}

export function getEvalScorecard(
  options: {
    suiteId?: string;
    limit?: number;
  } = {}
): ReturnType<typeof createScorecard> | null {
  const runs = listEvalRuns({ suiteId: options.suiteId, limit: options.limit || 50 });
  if (runs.length === 0) return null;

  const latestByScope = new Map<string, PersistedEvalRun>();
  for (const run of runs) {
    const scopeKey = `${run.suiteId}:${run.target.key}`;
    if (!latestByScope.has(scopeKey)) {
      latestByScope.set(scopeKey, run);
    }
  }

  return createScorecard(
    Array.from(latestByScope.values()).map((run) => ({
      suiteId: `${run.suiteId}:${run.target.key}`,
      suiteName: `${run.suiteName} · ${run.target.label}`,
      results: run.results,
      summary: run.summary,
    }))
  );
}
