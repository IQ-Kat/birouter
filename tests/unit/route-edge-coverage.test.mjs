import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-route-edges-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";
process.env.CLOUD_URL = "http://cloud.example";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const localDb = await import("../../src/lib/localDb.ts");
const listKeysRoute = await import("../../src/app/api/keys/route.ts");
const settingsProxyRoute = await import("../../src/app/api/settings/proxy/route.ts");
const managementProxiesRoute = await import("../../src/app/api/v1/management/proxies/route.ts");
const embeddingsRoute = await import("../../src/app/api/v1/embeddings/route.ts");

const MACHINE_ID = "1234567890abcdef";

async function resetStorage() {
  delete process.env.ALLOW_API_KEY_REVEAL;
  delete process.env.INITIAL_PASSWORD;
  delete process.env.REQUIRE_API_KEY;
  delete process.env.ENABLE_SOCKS5_PROXY;

  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

async function createManagementKey() {
  return apiKeysDb.createApiKey("management", MACHINE_ID);
}

function makeRequest(url, { method = "GET", token, body, headers } = {}) {
  const requestHeaders = new Headers(headers);
  if (token) {
    requestHeaders.set("authorization", `Bearer ${token}`);
  }
  if (body !== undefined && !requestHeaders.has("content-type")) {
    requestHeaders.set("content-type", "application/json");
  }

  return new Request(url, {
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function seedOpenAIConnection({
  email = "embeddings@example.com",
  provider = "openai",
  rateLimitedUntil = null,
} = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    email,
    name: email,
    apiKey: "sk-provider",
    testStatus: "active",
    lastError: null,
    lastErrorType: "token_refresh_failed",
    lastErrorSource: "oauth",
    errorCode: "refresh_failed",
    rateLimitedUntil,
    backoffLevel: 2,
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("api keys route covers auth, create, masking, pagination fallback and cloud sync", async () => {
  await enableManagementAuth();

  const unauthenticated = await listKeysRoute.GET(new Request("http://localhost/api/keys"));
  const invalidToken = await listKeysRoute.GET(
    new Request("http://localhost/api/keys", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );
  const managementKey = await createManagementKey();

  const originalFetch = globalThis.fetch;
  const fetchCalls = [];
  globalThis.fetch = async (url, options = {}) => {
    fetchCalls.push({ url: String(url), options });
    return Response.json({ changes: { apiKeys: 1 } });
  };

  try {
    await localDb.updateSettings({ cloudEnabled: true });

    const created = await listKeysRoute.POST(
      makeRequest("http://localhost/api/keys", {
        method: "POST",
        token: managementKey.key,
        body: { name: "Key / Prod #1", noLog: true },
      })
    );
    const createdBody = await created.json();
    const stored = await apiKeysDb.getApiKeyById(createdBody.id);

    await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
    await apiKeysDb.createApiKey("Beta", MACHINE_ID);

    const paged = await listKeysRoute.GET(
      makeRequest("http://localhost/api/keys?limit=0&offset=-25", {
        token: managementKey.key,
      })
    );

    const unauthenticatedBody = await unauthenticated.json();
    const invalidTokenBody = await invalidToken.json();
    const pagedBody = await paged.json();

    assert.equal(unauthenticated.status, 401);
    assert.equal(unauthenticatedBody.error.message, "Authentication required");
    assert.equal(invalidToken.status, 403);
    assert.equal(invalidTokenBody.error.message, "Invalid management token");

    assert.equal(created.status, 201);
    assert.equal(createdBody.name, "Key / Prod #1");
    assert.equal(createdBody.noLog, true);
    assert.match(createdBody.key, /^sk-/);
    assert.equal(stored?.noLog, true);
    assert.equal(compliance.isNoLog(createdBody.id), true);

    assert.equal(paged.status, 200);
    assert.equal(pagedBody.total, 4);
    assert.equal(pagedBody.keys.length, 4);
    assert.match(pagedBody.keys[0].key, /\*{4}/);
    assert.equal(fetchCalls.length, 1);
    assert.match(fetchCalls[0].url, /^http:\/\/cloud\.example\/sync\//);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("api keys route rejects invalid payloads and malformed JSON", async () => {
  await enableManagementAuth();
  const managementKey = await createManagementKey();

  const missingName = await listKeysRoute.POST(
    makeRequest("http://localhost/api/keys", {
      method: "POST",
      token: managementKey.key,
      body: {},
    })
  );

  const malformed = await listKeysRoute.POST(
    new Request("http://localhost/api/keys", {
      method: "POST",
      headers: {
        authorization: `Bearer ${managementKey.key}`,
        "content-type": "application/json",
      },
      body: "{",
    })
  );

  const malformedBody = await malformed.json();

  assert.equal(missingName.status, 400);
  assert.equal(malformed.status, 500);
  assert.equal(malformedBody.error, "Failed to create key");
});

test("settings proxy route covers full config, resolve, validation, delete and global fallback", async () => {
  const providerConnection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "provider-conn",
    apiKey: "sk-openai",
  });

  const invalidJson = await settingsProxyRoute.PUT(
    new Request("http://localhost/api/settings/proxy", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );

  const invalidBody = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: { level: "provider", proxy: "bad-shape" },
    })
  );

  const validPut = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "provider",
        id: "openai",
        proxy: { type: "http", host: "provider.local", port: "8080" },
        global: { type: "https", host: "global.local", port: "443" },
        combos: {
          primary: { type: "http", host: "combo.local", port: "9000" },
        },
        keys: {
          key1: { type: "https", host: "key.local", port: "9443" },
        },
      },
    })
  );
  const legacyPut = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        global: { type: "https", host: "global.local", port: "443" },
        combos: {
          primary: { type: "http", host: "combo.local", port: "9000" },
        },
        keys: {
          key1: { type: "https", host: "key.local", port: "9443" },
        },
      },
    })
  );

  const providerGet = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy?level=provider&id=openai")
  );
  const resolveGet = await settingsProxyRoute.GET(
    new Request(`http://localhost/api/settings/proxy?resolve=${providerConnection.id}`)
  );
  const fullConfig = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy")
  );
  const deleted = await settingsProxyRoute.DELETE(
    new Request("http://localhost/api/settings/proxy?level=provider&id=openai", {
      method: "DELETE",
    })
  );
  const resolveAfterDelete = await settingsProxyRoute.GET(
    new Request(`http://localhost/api/settings/proxy?resolve=${providerConnection.id}`)
  );
  const missingLevel = await settingsProxyRoute.DELETE(
    new Request("http://localhost/api/settings/proxy", { method: "DELETE" })
  );

  const invalidJsonBody = await invalidJson.json();
  const invalidBodyPayload = await invalidBody.json();
  const validPutBody = await validPut.json();
  const legacyPutBody = await legacyPut.json();
  const providerGetBody = await providerGet.json();
  const resolveBody = await resolveGet.json();
  const fullConfigBody = await fullConfig.json();
  const deletedBody = await deleted.json();
  const resolveAfterDeleteBody = await resolveAfterDelete.json();
  const missingLevelBody = await missingLevel.json();

  assert.equal(invalidJson.status, 400);
  assert.equal(invalidJsonBody.error.message, "Invalid JSON body");
  assert.equal(invalidBody.status, 400);
  assert.match(invalidBodyPayload.error.message, /invalid/i);

  assert.equal(validPut.status, 200);
  assert.equal(validPutBody.providers.openai.host, "provider.local");
  assert.equal(legacyPut.status, 200);
  assert.equal(legacyPutBody.global.host, "global.local");
  assert.equal(providerGet.status, 200);
  assert.equal(providerGetBody.proxy.host, "provider.local");
  assert.equal(resolveGet.status, 200);
  assert.equal(resolveBody.proxy.host, "provider.local");
  assert.equal(fullConfig.status, 200);
  assert.equal(fullConfigBody.global.host, "global.local");
  assert.equal(deleted.status, 200);
  assert.equal(Object.prototype.hasOwnProperty.call(deletedBody.providers, "openai"), false);
  assert.equal(resolveAfterDelete.status, 200);
  assert.equal(resolveAfterDeleteBody.level, "global");
  assert.equal(resolveAfterDeleteBody.proxy.host, "global.local");
  assert.equal(missingLevel.status, 400);
  assert.equal(missingLevelBody.error.message, "level is required");
});

test("settings proxy route prefers proxy registry assignments and enforces socks5 feature gating", async () => {
  const created = await localDb.createProxy({
    name: "Global Proxy",
    type: "http",
    host: "registry.local",
    port: 8080,
    username: "alice",
    password: "secret",
  });
  await localDb.assignProxyToScope("global", null, created.id);

  const registryBacked = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy?level=global")
  );
  const registryBackedBody = await registryBacked.json();

  process.env.ENABLE_SOCKS5_PROXY = "false";
  const disabledSocks = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "global",
        proxy: { type: "socks5", host: "127.0.0.1", port: "1080" },
      },
    })
  );

  process.env.ENABLE_SOCKS5_PROXY = "true";
  const enabledSocks = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "global",
        proxy: { type: "SOCKS5", host: "127.0.0.1", port: "1080" },
      },
    })
  );

  const disabledSocksBody = await disabledSocks.json();
  const enabledSocksBody = await enabledSocks.json();

  assert.equal(registryBacked.status, 200);
  assert.equal(registryBackedBody.proxy.host, "registry.local");
  assert.equal(registryBackedBody.proxy.password, "secret");
  assert.equal(disabledSocks.status, 400);
  assert.match(disabledSocksBody.error.message, /SOCKS5 proxy is disabled/i);
  assert.equal(enabledSocks.status, 200);
  assert.equal(enabledSocksBody.global.type, "socks5");
});

test("management proxies route covers auth, pagination, lookup, where-used, patch and delete flows", async () => {
  await enableManagementAuth();
  const managementKey = await createManagementKey();

  const unauthenticated = await managementProxiesRoute.GET(
    new Request("http://localhost/api/v1/management/proxies")
  );
  const invalidToken = await managementProxiesRoute.GET(
    new Request("http://localhost/api/v1/management/proxies", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );

  const createdResponse = await managementProxiesRoute.POST(
    makeRequest("http://localhost/api/v1/management/proxies", {
      method: "POST",
      token: managementKey.key,
      body: {
        name: "Branch Proxy",
        type: "http",
        host: "branch.local",
        port: 8080,
      },
    })
  );
  const created = await createdResponse.json();
  await localDb.assignProxyToScope("provider", "openai", created.id);

  const pagedList = await managementProxiesRoute.GET(
    makeRequest("http://localhost/api/v1/management/proxies?limit=999&offset=-5", {
      token: managementKey.key,
    })
  );
  const byId = await managementProxiesRoute.GET(
    makeRequest(`http://localhost/api/v1/management/proxies?id=${created.id}`, {
      token: managementKey.key,
    })
  );
  const whereUsed = await managementProxiesRoute.GET(
    makeRequest(`http://localhost/api/v1/management/proxies?id=${created.id}&where_used=1`, {
      token: managementKey.key,
    })
  );
  const missingGet = await managementProxiesRoute.GET(
    makeRequest("http://localhost/api/v1/management/proxies?id=missing", {
      token: managementKey.key,
    })
  );
  const invalidJsonPatch = await managementProxiesRoute.PATCH(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${managementKey.key}`,
        "content-type": "application/json",
      },
      body: "{",
    })
  );
  const invalidPatch = await managementProxiesRoute.PATCH(
    makeRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      token: managementKey.key,
      body: {},
    })
  );
  const patched = await managementProxiesRoute.PATCH(
    makeRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      token: managementKey.key,
      body: { id: created.id, host: "patched.local", notes: "updated" },
    })
  );
  const missingDelete = await managementProxiesRoute.DELETE(
    makeRequest("http://localhost/api/v1/management/proxies", {
      method: "DELETE",
      token: managementKey.key,
    })
  );
  const conflictDelete = await managementProxiesRoute.DELETE(
    makeRequest(`http://localhost/api/v1/management/proxies?id=${created.id}`, {
      method: "DELETE",
      token: managementKey.key,
    })
  );
  const forcedDelete = await managementProxiesRoute.DELETE(
    makeRequest(`http://localhost/api/v1/management/proxies?id=${created.id}&force=1`, {
      method: "DELETE",
      token: managementKey.key,
    })
  );

  const unauthenticatedBody = await unauthenticated.json();
  const invalidTokenBody = await invalidToken.json();
  const pagedListBody = await pagedList.json();
  const byIdBody = await byId.json();
  const whereUsedBody = await whereUsed.json();
  const missingGetBody = await missingGet.json();
  const invalidJsonPatchBody = await invalidJsonPatch.json();
  const invalidPatchBody = await invalidPatch.json();
  const patchedBody = await patched.json();
  const missingDeleteBody = await missingDelete.json();
  const conflictDeleteBody = await conflictDelete.json();
  const forcedDeleteBody = await forcedDelete.json();

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
  assert.equal(createdResponse.status, 201);
  assert.equal(pagedList.status, 200);
  assert.equal(pagedListBody.page.limit, 200);
  assert.equal(pagedListBody.page.offset, 0);
  assert.equal(byId.status, 200);
  assert.equal(byIdBody.id, created.id);
  assert.equal(whereUsed.status, 200);
  assert.equal(whereUsedBody.count, 1);
  assert.equal(missingGet.status, 404);
  assert.equal(missingGetBody.error.message, "Proxy not found");
  assert.equal(invalidJsonPatch.status, 400);
  assert.equal(invalidJsonPatchBody.error.message, "Invalid JSON body");
  assert.equal(invalidPatch.status, 400);
  assert.equal(invalidPatchBody.error.message, "Invalid request");
  assert.equal(patched.status, 200);
  assert.equal(patchedBody.host, "patched.local");
  assert.equal(missingDelete.status, 400);
  assert.equal(missingDeleteBody.error.message, "id is required");
  assert.equal(conflictDelete.status, 409);
  assert.match(conflictDeleteBody.error.message, /force=true/i);
  assert.equal(forcedDelete.status, 200);
  assert.equal(forcedDeleteBody.success, true);
});

test("embeddings route covers options, custom-model listing and defensive POST branches", async () => {
  await modelsDb.addCustomModel(
    "custom-embedder",
    "text-embed-1",
    "Custom Embedder",
    "manual",
    "responses",
    ["embeddings"]
  );

  const optionsResponse = await embeddingsRoute.OPTIONS();
  const getResponse = await embeddingsRoute.GET();
  const getBody = await getResponse.json();

  const invalidJson = await embeddingsRoute.POST(
    new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const validationFailure = await embeddingsRoute.POST(
    makeRequest("http://localhost/v1/embeddings", {
      method: "POST",
      body: {},
    })
  );
  const invalidModel = await embeddingsRoute.POST(
    makeRequest("http://localhost/v1/embeddings", {
      method: "POST",
      body: { model: "unknown/model", input: "hello" },
    })
  );

  const optionsHeaders = Object.fromEntries(optionsResponse.headers.entries());
  const invalidJsonBody = await invalidJson.json();
  const validationFailureBody = await validationFailure.json();
  const invalidModelBody = await invalidModel.json();

  assert.equal(optionsHeaders["access-control-allow-origin"], "*");
  assert.equal(getResponse.status, 200);
  assert.equal(
    getBody.data.some((model) => model.id === "custom-embedder/text-embed-1"),
    true
  );
  assert.equal(invalidJson.status, 400);
  assert.equal(invalidJsonBody.error.message, "Invalid JSON body");
  assert.equal(validationFailure.status, 400);
  assert.match(validationFailureBody.error.message, /invalid|required/i);
  assert.equal(invalidModel.status, 400);
  assert.match(
    invalidModelBody.error.message,
    /Invalid embedding model|Unknown embedding provider/
  );
});

test("embeddings route enforces caller auth, missing credentials and provider rate limits", async () => {
  process.env.REQUIRE_API_KEY = "true";

  const missingKey = await embeddingsRoute.POST(
    makeRequest("http://localhost/v1/embeddings", {
      method: "POST",
      body: { model: "openai/text-embedding-3-small", input: "hello" },
    })
  );

  const invalidKey = await embeddingsRoute.POST(
    new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer sk-invalid",
      },
      body: JSON.stringify({ model: "openai/text-embedding-3-small", input: "hello" }),
    })
  );

  const validApiKey = await apiKeysDb.createApiKey("caller", MACHINE_ID);
  const missingCredentials = await embeddingsRoute.POST(
    new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${validApiKey.key}`,
      },
      body: JSON.stringify({ model: "openai/text-embedding-3-small", input: "hello" }),
    })
  );

  await seedOpenAIConnection({
    email: "rate-limited@example.com",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });

  const allRateLimited = await embeddingsRoute.POST(
    new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${validApiKey.key}`,
      },
      body: JSON.stringify({ model: "openai/text-embedding-3-small", input: "hello" }),
    })
  );

  const missingKeyBody = await missingKey.json();
  const invalidKeyBody = await invalidKey.json();
  const missingCredentialsBody = await missingCredentials.json();
  const allRateLimitedBody = await allRateLimited.json();

  assert.equal(missingKey.status, 401);
  assert.equal(missingKeyBody.error.message, "Missing API key");
  assert.equal(invalidKey.status, 401);
  assert.equal(invalidKeyBody.error.message, "Invalid API key");
  assert.equal(missingCredentials.status, 400);
  assert.match(missingCredentialsBody.error.message, /No credentials for embedding provider/);
  assert.equal(allRateLimited.status, 429);
  assert.match(allRateLimitedBody.error.message, /All accounts rate limited/);
});
