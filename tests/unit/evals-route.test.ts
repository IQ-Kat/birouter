import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-evals-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

interface EvalsRoutePayload {
  suites: unknown[];
  targets: Array<{ type: string }>;
  apiKeys: Array<{ id: string; name: string; key?: string }>;
  recentRuns: Array<{ target: { key: string } }>;
}

interface ScorecardRoutePayload {
  scorecard: { overallPassRate: number } | null;
  runs: unknown[];
}

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const evalsRoute = await import("../../src/app/api/evals/route.ts");
const evalsScorecardRoute = await import("../../src/app/api/evals/scorecard/route.ts");

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

test("evals GET returns suites, target options, api key metadata, and persisted history", async () => {
  const apiKey = await localDb.createApiKey("Dashboard Key", "machine-test");
  localDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden Set",
    target: { type: "combo", id: "cost-optimized", label: "Combo: cost-optimized" },
    apiKeyId: apiKey.id,
    summary: { total: 2, passed: 2, failed: 0, passRate: 100 },
    avgLatencyMs: 180,
    results: [],
    createdAt: "2026-04-23T12:00:00.000Z",
  });

  const response = await evalsRoute.GET(new Request("http://localhost/api/evals"));
  assert.equal(response.status, 200);

  const payload = (await response.json()) as EvalsRoutePayload;
  assert.ok(Array.isArray(payload.suites));
  assert.ok(Array.isArray(payload.targets));
  assert.ok(Array.isArray(payload.apiKeys));
  assert.ok(Array.isArray(payload.recentRuns));
  assert.equal(payload.apiKeys[0].id, apiKey.id);
  assert.equal(payload.apiKeys[0].name, "Dashboard Key");
  assert.equal(payload.apiKeys[0].key, undefined);
  assert.equal(payload.recentRuns[0].target.key, "combo:cost-optimized");
  assert.equal(
    payload.targets.some((entry) => entry.type === "suite-default"),
    true
  );
});

test("eval scorecard route exposes stored runs and aggregated pass rate", async () => {
  localDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden Set",
    target: { type: "model", id: "gpt-4o", label: "Model: gpt-4o" },
    summary: { total: 2, passed: 2, failed: 0, passRate: 100 },
    avgLatencyMs: 120,
    results: [],
    createdAt: "2026-04-23T12:00:00.000Z",
  });

  const response = await evalsScorecardRoute.GET(
    new Request("http://localhost/api/evals/scorecard?limit=10")
  );
  assert.equal(response.status, 200);

  const payload = (await response.json()) as ScorecardRoutePayload;
  assert.ok(payload.scorecard);
  assert.equal(payload.scorecard.overallPassRate, 100);
  assert.equal(Array.isArray(payload.runs), true);
  assert.equal(payload.runs.length, 1);
});
