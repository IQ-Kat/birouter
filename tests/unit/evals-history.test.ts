import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-evals-history-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const evalsDb = await import("../../src/lib/db/evals.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("eval run history persists target metadata and newest-first ordering", () => {
  const older = evalsDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden Set",
    target: { type: "model", id: "gpt-4o", label: "Model: gpt-4o" },
    summary: { total: 2, passed: 2, failed: 0, passRate: 100 },
    avgLatencyMs: 120,
    results: [{ caseId: "c1", caseName: "Case 1", passed: true, durationMs: 120 }],
    outputs: { c1: "ok" },
    createdAt: "2026-04-23T10:00:00.000Z",
  });

  const newer = evalsDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden Set",
    target: { type: "combo", id: "cost-optimized", label: "Combo: cost-optimized" },
    summary: { total: 2, passed: 1, failed: 1, passRate: 50 },
    avgLatencyMs: 240,
    results: [{ caseId: "c1", caseName: "Case 1", passed: false, durationMs: 240 }],
    outputs: { c1: "[ERROR] upstream failed" },
    createdAt: "2026-04-23T11:00:00.000Z",
  });

  const runs = evalsDb.listEvalRuns({ limit: 10 });

  assert.equal(runs.length, 2);
  assert.equal(runs[0].id, newer.id);
  assert.equal(runs[1].id, older.id);
  assert.equal(runs[0].target.key, "combo:cost-optimized");
  assert.equal(runs[1].target.key, "model:gpt-4o");
  assert.equal(runs[0].summary.passRate, 50);
  assert.equal(runs[1].outputs.c1, "ok");
});

test("scorecard keeps only the latest run per suite and target scope", () => {
  evalsDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden Set",
    target: { type: "model", id: "gpt-4o", label: "Model: gpt-4o" },
    summary: { total: 2, passed: 1, failed: 1, passRate: 50 },
    avgLatencyMs: 150,
    results: [],
    createdAt: "2026-04-23T09:00:00.000Z",
  });

  evalsDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden Set",
    target: { type: "model", id: "gpt-4o", label: "Model: gpt-4o" },
    summary: { total: 2, passed: 2, failed: 0, passRate: 100 },
    avgLatencyMs: 100,
    results: [],
    createdAt: "2026-04-23T10:00:00.000Z",
  });

  evalsDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden Set",
    target: { type: "combo", id: "balanced", label: "Combo: balanced" },
    summary: { total: 2, passed: 1, failed: 1, passRate: 50 },
    avgLatencyMs: 220,
    results: [],
    createdAt: "2026-04-23T10:30:00.000Z",
  });

  const scorecard = evalsDb.getEvalScorecard({ limit: 10 });

  assert.ok(scorecard);
  assert.equal(scorecard.suites, 2);
  assert.equal(scorecard.totalCases, 4);
  assert.equal(scorecard.totalPassed, 3);
  assert.equal(scorecard.overallPassRate, 75);
});
