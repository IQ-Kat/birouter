import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-sync-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const originalFetch = globalThis.fetch;

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function enableAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

test("model sync route skips success log when fetched models do not change stored models", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "MAIN",
    displayName: "OpenRouter Main",
    apiKey: "test-key",
  });

  await modelsDb.replaceCustomModels("openrouter", [
    {
      id: "custom-model-1",
      name: "Custom Model 1",
      source: "auto-sync",
    },
  ]);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), `http://localhost/api/providers/${connection.id}/models`);
    return Response.json({
      models: [{ id: "custom-model-1", name: "Custom Model 1" }],
    });
  };

  try {
    const response = await modelSyncRoute.POST(
      new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
        method: "POST",
        headers: scheduler.buildModelSyncInternalHeaders(),
      }),
      { params: { id: connection.id } }
    );

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.logged, false);
    assert.deepEqual(body.modelChanges, { added: 0, removed: 0, updated: 0, total: 0 });

    const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });
    assert.equal(logs.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("model sync route stores the real provider while keeping the account label", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "MAIN",
    displayName: "OpenRouter Main",
    apiKey: "test-key",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), `http://localhost/api/providers/${connection.id}/models`);
    return Response.json({
      models: [{ id: "custom-model-2", name: "Custom Model 2" }],
    });
  };

  try {
    const response = await modelSyncRoute.POST(
      new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
        method: "POST",
        headers: scheduler.buildModelSyncInternalHeaders(),
      }),
      { params: { id: connection.id } }
    );

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.logged, true);
    assert.deepEqual(body.modelChanges, { added: 1, removed: 0, updated: 0, total: 1 });
    assert.equal(body.provider, "openrouter");

    const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });
    assert.equal(logs.length, 1);
    assert.equal(logs[0].provider, "openrouter");
    assert.equal(logs[0].account, "MAIN");
    assert.equal(logs[0].model, "model-sync");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("model sync route requires authentication for external requests when auth is enabled", async () => {
  await resetStorage();
  await enableAuth();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Protected Connection",
    apiKey: "test-key",
  });

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
    }),
    { params: { id: connection.id } }
  );
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.equal(body.error.message, "Authentication required");
  assert.equal(body.error.type, "invalid_api_key");
});

test("model sync route returns 404 for unknown connections after internal auth passes", async () => {
  await resetStorage();

  const response = await modelSyncRoute.POST(
    new Request("http://localhost/api/providers/missing/sync-models", {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: "missing" } }
  );

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Connection not found" });
});

test("model sync route propagates upstream failures and records an error log entry", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Error Branch",
    apiKey: "test-key",
  });

  globalThis.fetch = async (url) => {
    assert.equal(String(url), `http://localhost/api/providers/${connection.id}/models`);
    return Response.json({ error: "Provider upstream unavailable" }, { status: 502 });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = await response.json();
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 502);
  assert.equal(body.error, "Provider upstream unavailable");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 502);
  assert.equal(logs[0].provider, "openrouter");
  assert.equal(logs[0].path, `/api/providers/${connection.id}/models`);
});

test("model sync route writes synced available models for Gemini connections", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "Gemini Sync",
    apiKey: "gm-key",
  });

  globalThis.fetch = async (url) => {
    assert.equal(String(url), `http://localhost/api/providers/${connection.id}/models`);
    return Response.json({
      models: [
        {
          id: "gemini-custom-preview",
          name: "Gemini Custom Preview",
          supportedEndpoints: ["chat", "embeddings"],
          inputTokenLimit: 32768,
          outputTokenLimit: 8192,
          description: "Custom Gemini preview model",
          supportsThinking: true,
        },
      ],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = await response.json();
  const synced = await modelsDb.getSyncedAvailableModels("gemini");
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 200);
  assert.equal(body.provider, "gemini");
  assert.equal(body.syncedModels, 1);
  assert.equal(body.logged, true);
  assert.deepEqual(body.modelChanges, { added: 1, removed: 0, updated: 0, total: 1 });
  assert.deepEqual(body.models, [
    {
      id: "gemini-custom-preview",
      name: "Gemini Custom Preview",
      source: "auto-sync",
      apiFormat: "chat-completions",
      supportedEndpoints: ["chat", "embeddings"],
      inputTokenLimit: 32768,
      outputTokenLimit: 8192,
      description: "Custom Gemini preview model",
      supportsThinking: true,
    },
  ]);
  assert.deepEqual(synced, [
    {
      id: "gemini-custom-preview",
      name: "Gemini Custom Preview",
      source: "api-sync",
      supportedEndpoints: ["chat", "embeddings"],
      inputTokenLimit: 32768,
      outputTokenLimit: 8192,
      description: "Custom Gemini preview model",
      supportsThinking: true,
    },
  ]);
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 200);
});

test("model sync route returns 500 and records a failure when the internal models fetch throws", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Exploding Sync",
    apiKey: "test-key",
  });

  globalThis.fetch = async () => {
    throw new Error("network exploded");
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = await response.json();
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 500);
  assert.equal(body.error, "network exploded");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 500);
  assert.equal(logs[0].provider, "openrouter");
});
