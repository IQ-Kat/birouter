import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-managed-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const managedModels = await import("../../src/lib/providerModels/managedAvailableModels.ts");
const aliasUtils = await import("../../src/shared/utils/providerModelAliases.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("resolveManagedModelAlias preserves existing aliases and falls back to provider-prefixed suffixes", () => {
  const first = aliasUtils.resolveManagedModelAlias({
    modelId: "anthropic/claude-3.7-sonnet",
    fullModel: "openrouter/anthropic/claude-3.7-sonnet",
    providerDisplayAlias: "openrouter",
    existingAliases: {
      "claude-3.7-sonnet": "other-provider/claude-3.7-sonnet",
      "openrouter-claude-3.7-sonnet": "other-provider/claude-3.7-sonnet",
    },
  });
  assert.equal(first, "openrouter-claude-3.7-sonnet-2");

  const preserved = aliasUtils.resolveManagedModelAlias({
    modelId: "openai/gpt-4.1",
    fullModel: "openrouter/openai/gpt-4.1",
    providerDisplayAlias: "openrouter",
    existingAliases: {
      kept: "openrouter/openai/gpt-4.1",
      "gpt-4.1": "other-provider/gpt-4.1",
    },
  });
  assert.equal(preserved, "kept");
});

test("syncManagedAvailableModelAliases backfills openrouter aliases and removes stale entries", async () => {
  await modelsDb.setModelAlias("kept", "openrouter/openai/gpt-4.1");
  await modelsDb.setModelAlias("claude-3.7-sonnet", "other-provider/claude-3.7-sonnet");
  await modelsDb.setModelAlias("stale-model", "openrouter/legacy/stale-model");

  const result = await managedModels.syncManagedAvailableModelAliases("openrouter", [
    "openai/gpt-4.1",
    "anthropic/claude-3.7-sonnet",
  ]);
  const aliases = await modelsDb.getModelAliases();

  assert.deepEqual(result.removedAliases, ["stale-model"]);
  assert.equal(aliases.kept, "openrouter/openai/gpt-4.1");
  assert.equal(aliases["openrouter-claude-3.7-sonnet"], "openrouter/anthropic/claude-3.7-sonnet");
  assert.equal(aliases["stale-model"], undefined);
});
