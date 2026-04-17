import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-providers-managed-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-managed-providers";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");

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

test("providers route accepts managed audio, web-cookie and search providers", async () => {
  const cases = [
    {
      provider: "assemblyai",
      body: {
        provider: "assemblyai",
        apiKey: "aa-key",
        name: "AssemblyAI Primary",
      },
    },
    {
      provider: "grok-web",
      body: {
        provider: "grok-web",
        apiKey: "sso=grok-cookie",
        name: "Grok Web Session",
      },
    },
    {
      provider: "perplexity-web",
      body: {
        provider: "perplexity-web",
        apiKey: "__Secure-next-auth.session-token=pplx-cookie",
        name: "Perplexity Web Session",
      },
    },
    {
      provider: "google-pse-search",
      body: {
        provider: "google-pse-search",
        apiKey: "google-key",
        name: "Google PSE",
        providerSpecificData: {
          cx: "engine-id-123",
        },
      },
    },
    {
      provider: "searxng-search",
      body: {
        provider: "searxng-search",
        name: "Local SearXNG",
        providerSpecificData: {
          baseUrl: "http://localhost:8888/search",
        },
      },
    },
  ];

  for (const entry of cases) {
    const response = await providersRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/providers", {
        method: "POST",
        body: entry.body,
      })
    );

    assert.equal(
      response.status,
      201,
      `${entry.provider} should be accepted by POST /api/providers`
    );
    const payload = await response.json();
    assert.equal(payload.connection.provider, entry.provider);
  }
});

test("providers route rejects upstream proxy tools as direct provider connections", async () => {
  const response = await providersRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      body: {
        provider: "cliproxyapi",
        apiKey: "cpa-key",
        name: "CLIProxyAPI",
      },
    })
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Invalid provider" });
});
