/**
 * tests/unit/quota-combos-sync.test.ts
 *
 * TDD coverage for src/lib/quota/quotaCombos.ts::syncQuotaCombos and
 * src/lib/quota/quotaCombos.ts::removeQuotaCombosForPool (Phase B2).
 *
 * Uses "glm" as the test provider because it has a small, stable model list
 * in the static registry (10 models). Mirrors the seeding pattern from
 * quota-key-resolve.test.ts.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-combos-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { syncQuotaCombos, removeQuotaCombosForPool } = await import(
  "../../src/lib/quota/quotaCombos.ts"
);
const { quotaModelName, isQuotaModelName, parseQuotaModelName, quotaPoolSlug } = await import(
  "../../src/lib/quota/quotaModelNaming.ts"
);
const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");

// ---------------------------------------------------------------------------
// Test lifecycle helpers
// ---------------------------------------------------------------------------

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Helper to list all quota combos from the DB
// ---------------------------------------------------------------------------

async function listQuotaCombos(): Promise<Array<{ name: string; models: unknown[] }>> {
  const all = await combosDb.getCombos();
  return all
    .filter((c) => typeof c.name === "string" && isQuotaModelName(c.name))
    .map((c) => ({
      name: c.name as string,
      models: Array.isArray(c.models) ? (c.models as unknown[]) : [],
    }));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("syncQuotaCombos: creates one combo per glm model with correct name and target", async () => {
  // Seed a glm connection
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-sync-glm",
    apiKey: "sk-test-glm-quota-b2",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  assert.ok(connId, "connection should have an id");

  const pool = poolsDb.createPool({ connectionId: connId, name: "TestGlmPool" });

  await syncQuotaCombos(pool.id);

  const glmModels = PROVIDER_MODELS["glm"] ?? [];
  assert.ok(glmModels.length > 0, "glm should have models in registry");

  const quotaCombos = await listQuotaCombos();
  const quotaComboNames = new Set(quotaCombos.map((c) => c.name));

  // Every glm model should have a combo
  for (const model of glmModels) {
    const expectedName = quotaModelName("TestGlmPool", "glm", model.id);
    assert.ok(
      quotaComboNames.has(expectedName),
      `Missing combo for model ${model.id}: ${expectedName}`
    );
  }

  // No extra quota combos for other pools
  for (const c of quotaCombos) {
    const parsed = parseQuotaModelName(c.name);
    assert.ok(parsed, `Could not parse quota model name: ${c.name}`);
    assert.equal(parsed?.groupSlug, quotaPoolSlug("TestGlmPool"));
  }
});

test("syncQuotaCombos: each combo has a single step with provider=glm and connectionId pinned", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-step-check",
    apiKey: "sk-test-glm-step",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "StepCheckPool" });

  await syncQuotaCombos(pool.id);

  const quotaCombos = await listQuotaCombos();
  assert.ok(quotaCombos.length > 0, "expected at least one quota combo");

  for (const c of quotaCombos) {
    const parsed = parseQuotaModelName(c.name);
    assert.ok(parsed, `unparseable combo name: ${c.name}`);
    assert.equal(parsed?.provider, "glm");

    assert.equal(c.models.length, 1, `combo ${c.name} should have exactly 1 step`);
    const step = c.models[0] as Record<string, unknown>;
    assert.equal(step.kind, "model");

    // Model string includes the provider prefix
    const modelStr = typeof step.model === "string" ? step.model : "";
    assert.ok(
      modelStr.startsWith("glm/") || modelStr === parsed.model,
      `step.model "${modelStr}" should contain the model id "${parsed.model}"`
    );

    // connectionId is pinned to the pool's connection
    assert.equal(
      step.connectionId,
      connId,
      `step.connectionId should be pinned to pool connection ${connId}`
    );
  }
});

test("syncQuotaCombos: idempotent — calling twice produces no duplicates", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-idempotent",
    apiKey: "sk-test-glm-idem",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "IdempotentPool" });

  await syncQuotaCombos(pool.id);
  const afterFirst = await listQuotaCombos();
  const firstCount = afterFirst.length;

  await syncQuotaCombos(pool.id);
  const afterSecond = await listQuotaCombos();

  assert.equal(afterSecond.length, firstCount, "second sync must not create duplicate combos");

  // All names should be identical sets
  const firstNames = new Set(afterFirst.map((c) => c.name));
  const secondNames = new Set(afterSecond.map((c) => c.name));
  for (const name of firstNames) {
    assert.ok(secondNames.has(name), `Name disappeared after second sync: ${name}`);
  }
});

test("syncQuotaCombos: prunes stale combos for same pool slug", async () => {
  // Seed two separate connections and pools, both named to produce different slugs
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-prune-conn",
    apiKey: "sk-test-glm-prune",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "PrunePool" });

  await syncQuotaCombos(pool.id);

  const afterInitial = await listQuotaCombos();
  const initialCount = afterInitial.length;
  assert.ok(initialCount > 0, "should have combos after initial sync");

  // Manually insert a stale combo with the same pool slug but a nonexistent model
  // Use the new qtSd/ prefix so isQuotaModelName() recognises it as a quota combo to prune.
  const staleComboName = `qtSd/${quotaPoolSlug("PrunePool")}/glm/fake-model-stale`;
  await combosDb.createCombo({
    name: staleComboName,
    models: [{ kind: "model", model: "glm/fake-model-stale", providerId: "glm", weight: 100 }],
    strategy: "priority",
    isHidden: true,
  });

  // Verify the stale combo exists
  const stale = await combosDb.getComboByName(staleComboName);
  assert.ok(stale, "stale combo should exist before prune");

  // Re-sync — should prune the stale combo
  await syncQuotaCombos(pool.id);

  const pruned = await combosDb.getComboByName(staleComboName);
  assert.equal(pruned, null, "stale combo should be pruned after re-sync");

  // Desired combos should still be present
  const afterPrune = await listQuotaCombos();
  assert.equal(
    afterPrune.length,
    initialCount,
    "combo count should return to initial after pruning stale"
  );
});

test("removeQuotaCombosForPool: removes all quota combos for the pool", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-remove",
    apiKey: "sk-test-glm-remove",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "RemovePool" });

  await syncQuotaCombos(pool.id);

  const before = await listQuotaCombos();
  assert.ok(before.length > 0, "expected combos to remove");

  await removeQuotaCombosForPool(pool.id);

  const after = await listQuotaCombos();
  assert.equal(after.length, 0, "all quota combos should be removed");
});

test("syncQuotaCombos: does not affect quota combos for a different pool slug", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-isolation",
    apiKey: "sk-test-glm-isolation",
  });
  const connId = (conn as Record<string, unknown>).id as string;

  const poolA = poolsDb.createPool({ connectionId: connId, name: "PoolAlpha" });
  const poolB = poolsDb.createPool({ connectionId: connId, name: "PoolBeta" });

  await syncQuotaCombos(poolA.id);
  await syncQuotaCombos(poolB.id);

  const all = await listQuotaCombos();
  const slugA = quotaPoolSlug("PoolAlpha");
  const slugB = quotaPoolSlug("PoolBeta");

  const forA = all.filter((c) => parseQuotaModelName(c.name)?.groupSlug === slugA);
  const forB = all.filter((c) => parseQuotaModelName(c.name)?.groupSlug === slugB);

  assert.ok(forA.length > 0, "PoolAlpha should have combos");
  assert.ok(forB.length > 0, "PoolBeta should have combos");

  // Removing PoolA's combos should not touch PoolB's
  await removeQuotaCombosForPool(poolA.id);

  const remaining = await listQuotaCombos();
  const remainingForA = remaining.filter((c) => parseQuotaModelName(c.name)?.groupSlug === slugA);
  const remainingForB = remaining.filter((c) => parseQuotaModelName(c.name)?.groupSlug === slugB);

  assert.equal(remainingForA.length, 0, "PoolAlpha combos should all be removed");
  assert.equal(remainingForB.length, forB.length, "PoolBeta combos should be untouched");
});

test("syncQuotaCombos: unknown pool id — no throw, prunes nothing (no combos exist)", async () => {
  // Should not throw
  await assert.doesNotReject(
    () => syncQuotaCombos("nonexistent-pool-id"),
    "syncQuotaCombos with unknown poolId should not throw"
  );

  const quotaCombos = await listQuotaCombos();
  assert.equal(quotaCombos.length, 0, "no combos should exist");
});

test("removeQuotaCombosForPool: unknown pool id — no throw", async () => {
  await assert.doesNotReject(
    () => removeQuotaCombosForPool("nonexistent-pool-id"),
    "removeQuotaCombosForPool with unknown poolId should not throw"
  );
});
