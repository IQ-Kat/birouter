import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

test("getSettings exposes defaults and updateSettings persists typed values", async () => {
  const defaults = await settingsDb.getSettings();
  const updated = await settingsDb.updateSettings({
    requireLogin: false,
    cloudEnabled: true,
    stickyRoundRobinLimit: 7,
    label: "task-303",
  });

  assert.equal(defaults.cloudEnabled, false);
  assert.equal(defaults.requireLogin, true);
  assert.deepEqual(defaults.hiddenSidebarItems, []);
  assert.equal(defaults.idempotencyWindowMs, 5000);
  assert.equal(updated.requireLogin, false);
  assert.equal(updated.cloudEnabled, true);
  assert.equal(updated.stickyRoundRobinLimit, 7);
  assert.equal(updated.label, "task-303");
  assert.equal(await settingsDb.isCloudEnabled(), true);
});

test("INITIAL_PASSWORD marks onboarding as complete on first read", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-secret";

  const settings = await settingsDb.getSettings();
  const stored = await settingsDb.getSettings();

  assert.equal(settings.setupComplete, true);
  assert.equal(settings.requireLogin, true);
  assert.equal(stored.setupComplete, true);
});

test("pricing layers merge synced, models.dev and user overrides", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing_synced",
    "layered-provider",
    JSON.stringify({
      "model-a": { prompt: 1, completion: 2 },
    })
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "models_dev_pricing",
    "layered-provider",
    JSON.stringify({
      "model-a": { completion: 5, cached: 3 },
    })
  );

  await settingsDb.updatePricing({
    "layered-provider": {
      "model-a": { prompt: 9, custom: 42 },
      "model-b": { prompt: 7 },
    },
  });

  const pricing = await settingsDb.getPricing();
  const direct = await settingsDb.getPricingForModel("layered-provider", "model-a");
  const cnFallback = await settingsDb.getPricingForModel("openai-cn", "gpt-4o");

  assert.deepEqual(pricing["layered-provider"]["model-a"], {
    prompt: 9,
    completion: 5,
    cached: 3,
    custom: 42,
  });
  assert.deepEqual(direct, {
    prompt: 9,
    completion: 5,
    cached: 3,
    custom: 42,
  });
  assert.ok(cnFallback);

  const afterModelReset = await settingsDb.resetPricing("layered-provider", "model-a");
  assert.equal(afterModelReset["layered-provider"]["model-a"], undefined);

  const afterProviderReset = await settingsDb.resetPricing("layered-provider");
  assert.equal(afterProviderReset["layered-provider"], undefined);

  await settingsDb.updatePricing({
    temp: { model: { prompt: 1 } },
  });
  assert.deepEqual(await settingsDb.resetAllPricing(), {});
});

test("LKGP values can be set, read and cleared", async () => {
  assert.equal(await settingsDb.getLKGP("combo-a", "model-a"), null);

  await settingsDb.setLKGP("combo-a", "model-a", "openai");
  await settingsDb.setLKGP("combo-a", "model-b", "anthropic");

  assert.equal(await settingsDb.getLKGP("combo-a", "model-a"), "openai");
  assert.equal(await settingsDb.getLKGP("combo-a", "model-b"), "anthropic");

  settingsDb.clearAllLKGP();

  assert.equal(await settingsDb.getLKGP("combo-a", "model-a"), null);
});

test("proxy config migrates legacy strings and supports bulk merge updates", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "global",
    JSON.stringify("http://user:pass@global.local:8080")
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "providers",
    JSON.stringify({
      openai: "https://provider.local:8443",
    })
  );

  const migrated = await settingsDb.getProxyConfig();
  assert.deepEqual(migrated.global, {
    type: "http",
    host: "global.local",
    port: "8080",
    username: "user",
    password: "pass",
  });
  assert.deepEqual(migrated.providers.openai, {
    type: "https",
    host: "provider.local",
    port: "8443",
    username: "",
    password: "",
  });

  const merged = await settingsDb.setProxyConfig({
    providers: {
      openai: null,
      anthropic: {
        type: "http",
        host: "anthropic.local",
        port: 9000,
      },
    },
    keys: {
      key123: {
        type: "socks5",
        host: "key.local",
        port: 1080,
      },
    },
  });

  assert.equal(merged.providers.openai, undefined);
  assert.equal(merged.providers.anthropic.host, "anthropic.local");
  assert.equal((await settingsDb.getProxyForLevel("key", "key123")).host, "key.local");

  await settingsDb.deleteProxyForLevel("key", "key123");

  assert.equal(await settingsDb.getProxyForLevel("key", "key123"), null);
});

test("cache metrics, trend and no-op update/reset methods read from usage_history", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const insertUsage = db.prepare(`
    INSERT INTO usage_history (
      provider, model, connection_id, api_key_id, api_key_name,
      tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation,
      tokens_reasoning, status, success, latency_ms, ttft_ms, error_code, timestamp
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUsage.run(
    "openai",
    "gpt-4.1",
    "conn-1",
    "key-1",
    "Primary",
    1000,
    400,
    300,
    120,
    0,
    "200",
    1,
    100,
    40,
    null,
    oneHourAgo
  );
  insertUsage.run(
    "anthropic",
    "claude-3-7-sonnet",
    "conn-2",
    "key-2",
    "Secondary",
    700,
    280,
    200,
    80,
    0,
    "200",
    1,
    90,
    30,
    null,
    now
  );

  const metrics = await settingsDb.getCacheMetrics();
  const trend = await settingsDb.getCacheTrend(4);
  const updateNoOp = await settingsDb.updateCacheMetrics({ anything: true });
  const resetNoOp = await settingsDb.resetCacheMetrics();

  assert.ok(metrics.totalRequests >= 2);
  assert.ok(metrics.requestsWithCacheControl >= 2);
  assert.ok(metrics.byProvider.openai);
  assert.ok(metrics.byProvider.anthropic);
  assert.ok(trend.length >= 1);
  assert.equal(updateNoOp.totalCachedTokens, metrics.totalCachedTokens);
  assert.equal(resetNoOp.totalCachedTokens, metrics.totalCachedTokens);
});
