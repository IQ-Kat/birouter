import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-model-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider, overrides = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey,
    accessToken: overrides.accessToken,
    projectId: overrides.projectId,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

async function callRoute(connectionId, search = "") {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models${search}`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("provider models route returns 404 for unknown connections", async () => {
  const response = await callRoute("missing-connection");

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Connection not found" });
});

test("provider models route rejects OpenAI-compatible providers without a base URL", async () => {
  const connection = await seedConnection("openai-compatible-demo", {
    apiKey: "sk-openai-compatible",
  });

  const response = await callRoute(connection.id);

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "No base URL configured for OpenAI compatible provider",
  });
});

test("provider models route returns auth failures from OpenAI-compatible upstreams", async () => {
  const connection = await seedConnection("openai-compatible-auth", {
    apiKey: "sk-openai-compatible",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com/v1/chat/completions",
    },
  });
  const seenUrls = [];

  globalThis.fetch = async (url) => {
    seenUrls.push(String(url));
    return new Response("unauthorized", { status: 401 });
  };

  const response = await callRoute(connection.id);

  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: "Auth failed: 401" });
  assert.equal(seenUrls.length, 1);
});

test("provider models route falls back after OpenAI-compatible endpoint probes all fail", async () => {
  const connection = await seedConnection("openai-compatible-fallback", {
    apiKey: "sk-openai-compatible",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com/v1",
    },
  });
  const seenUrls = [];

  globalThis.fetch = async (url) => {
    seenUrls.push(String(url));
    return new Response("bad gateway", { status: 502 });
  };

  const response = await callRoute(connection.id);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.provider, "openai-compatible-fallback");
  assert.ok(Array.isArray(body.models));
  assert.ok(seenUrls.length >= 2);
});

test("provider models route returns static catalog entries for providers with hardcoded models", async () => {
  const connection = await seedConnection("bailian-coding-plan", {
    apiKey: "bailian-key",
  });

  const response = await callRoute(connection.id);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.provider, "bailian-coding-plan");
  assert.equal(body.models.length, 8);
});

test("provider models route validates Gemini CLI credentials before fetching quota buckets", async () => {
  const missingToken = await seedConnection("gemini-cli", {
    authType: "oauth",
    apiKey: null,
  });
  const missingProject = await seedConnection("gemini-cli", {
    authType: "oauth",
    name: "gemini-cli-projectless",
    accessToken: "gemini-cli-access",
    apiKey: null,
  });

  const missingTokenResponse = await callRoute(missingToken.id);
  const missingProjectResponse = await callRoute(missingProject.id);

  assert.equal(missingTokenResponse.status, 400);
  assert.match((await missingTokenResponse.json()).error, /No access token/i);
  assert.equal(missingProjectResponse.status, 400);
  assert.match((await missingProjectResponse.json()).error, /project ID not available/i);
});

test("provider models route maps Gemini CLI quota buckets into a model list", async () => {
  const connection = await seedConnection("gemini-cli", {
    authType: "oauth",
    accessToken: "gemini-cli-access",
    apiKey: null,
    projectId: "projects/demo-123",
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuota");
    assert.equal(init.headers.Authorization, "Bearer gemini-cli-access");
    assert.deepEqual(JSON.parse(String(init.body)), { project: "projects/demo-123" });
    return Response.json({
      buckets: [{ modelId: "gemini-3-pro-preview" }, { modelId: "gemini-3-flash" }],
    });
  };

  const response = await callRoute(connection.id);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body.models, [
    { id: "gemini-3-pro-preview", name: "gemini-3-pro-preview", owned_by: "google" },
    { id: "gemini-3-flash", name: "gemini-3-flash", owned_by: "google" },
  ]);
});

test("provider models route returns the local catalog for OAuth-backed Qwen connections", async () => {
  const connection = await seedConnection("qwen", {
    authType: "oauth",
    accessToken: "qwen-access",
    apiKey: null,
  });

  const response = await callRoute(connection.id);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.ok(Array.isArray(body.models));
});

test("provider models route paginates generic providers and filters hidden models when requested", async () => {
  const connection = await seedConnection("gemini", {
    apiKey: "gm-key",
  });
  modelsDb.mergeModelCompatOverride("gemini", "gemini-hidden", { isHidden: true });
  const seenUrls = [];

  globalThis.fetch = async (url) => {
    const currentUrl = String(url);
    seenUrls.push(currentUrl);
    if (!currentUrl.includes("pageToken=")) {
      assert.match(currentUrl, /key=gm-key/);
      return Response.json({
        models: [
          {
            name: "models/gemini-visible",
            displayName: "Gemini Visible",
            supportedGenerationMethods: ["generateContent"],
          },
          {
            name: "models/gemini-hidden",
            displayName: "Gemini Hidden",
            supportedGenerationMethods: ["generateContent"],
          },
        ],
        nextPageToken: "page-2",
      });
    }

    assert.match(currentUrl, /pageToken=page-2/);
    assert.match(currentUrl, /key=gm-key/);
    return Response.json({
      models: [
        {
          name: "models/text-embedding-004",
          displayName: "Text Embedding 004",
          supportedGenerationMethods: ["embedContent"],
        },
      ],
    });
  };

  const response = await callRoute(connection.id, "?excludeHidden=true");
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body.models.map((model) => model.id).sort(), [
    "gemini-visible",
    "text-embedding-004",
  ]);
  assert.equal(seenUrls.length, 2);
});

test("provider models route stops pagination when the upstream repeats the next page token", async () => {
  const connection = await seedConnection("gemini", {
    apiKey: "gm-key",
  });
  let calls = 0;

  globalThis.fetch = async () => {
    calls += 1;
    return Response.json({
      models: [
        {
          name: `models/gemini-page-${calls}`,
          displayName: `Gemini Page ${calls}`,
          supportedGenerationMethods: ["generateContent"],
        },
      ],
      nextPageToken: "duplicate-token",
    });
  };

  const response = await callRoute(connection.id);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(
    body.models.map((model) => model.id),
    ["gemini-page-1", "gemini-page-2"]
  );
  assert.equal(calls, 2);
});

test("provider models route forwards upstream status codes for generic provider model fetch failures", async () => {
  const connection = await seedConnection("openai", {
    apiKey: "sk-openai-models",
  });

  globalThis.fetch = async () => new Response("upstream unavailable", { status: 503 });

  const response = await callRoute(connection.id);

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    error: "Failed to fetch models: 503",
  });
});

test("provider models route returns 500 when fetching models throws unexpectedly", async () => {
  const connection = await seedConnection("openai", {
    apiKey: "sk-openai-models",
  });

  globalThis.fetch = async () => {
    throw new Error("socket closed");
  };

  const response = await callRoute(connection.id);

  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), {
    error: "Failed to fetch models",
  });
});

test("provider models route rejects generic providers without any configured token", async () => {
  const connection = await seedConnection("openai", {
    apiKey: null,
    accessToken: null,
  });

  const response = await callRoute(connection.id);

  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /No API key configured/i);
});

test("provider models route rejects unsupported providers without a models config", async () => {
  const connection = await seedConnection("unsupported-provider", {
    apiKey: "sk-unsupported",
  });

  const response = await callRoute(connection.id);

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "Provider unsupported-provider does not support models listing",
  });
});
