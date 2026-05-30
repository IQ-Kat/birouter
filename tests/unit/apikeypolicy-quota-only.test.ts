/**
 * tests/unit/apikeypolicy-quota-only.test.ts
 *
 * TDD coverage for Phase A3: quota-exclusive enforcement in enforceApiKeyPolicy.
 *
 * Cases:
 * 1. Key with allowedQuotas pointing to a "codex" connection → requesting a
 *    "cx/…" (codex) model → ALLOWED (no rejection).
 * 2. Same key → requesting "openai/gpt-4.1" → REJECTED 403 QUOTA_ONLY.
 * 3. Key with empty allowedQuotas → existing behavior unchanged (allowed model passes).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-apikeypolicy-quota-only-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-only-test-secret";

// Import DB modules using top-level await (Node test runner supports ESM TLA)
const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");

rateLimiter.setRateLimiterTestMode(true);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();

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

async function loadPolicy(label: string) {
  const modulePath = path.join(process.cwd(), "src/shared/utils/apiKeyPolicy.ts");
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

function makeRequest(apiKey: string | null) {
  return new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
  });
}

async function readBody(response: Response) {
  return response.json() as Promise<{ error: { message: string; code: string } }>;
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("quota-only key requesting a model in the allowed provider is passed through", async () => {
  // Seed a provider connection with provider "codex" (matches "cx/gpt-5.5")
  const conn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "quota-only-codex-conn",
    apiKey: "sk-codex-quota-only",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  assert.ok(connId);

  // Seed a pool referencing that connection
  const pool = poolsDb.createPool({ connectionId: connId, name: "Codex Pool A3" });

  // Create an API key bound to that pool
  const created = await apiKeysDb.createApiKey("Quota-Only Key", "machine-a3");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: [pool.id],
  });

  const policy = await loadPolicy("quota-only-allowed");

  // "cx/gpt-5.5" → provider resolves to "codex" (cx alias) — should be allowed
  const result = await policy.enforceApiKeyPolicy(makeRequest(created.key), "cx/gpt-5.5");
  assert.equal(
    result.rejection,
    null,
    "quota-exclusive key should pass through for a model in its pools' providers"
  );
});

test("quota-only key requesting a model outside allowed providers is rejected 403 QUOTA_ONLY", async () => {
  // Seed a provider connection with provider "codex"
  const conn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "quota-only-codex-conn-reject",
    apiKey: "sk-codex-quota-only-reject",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "Codex Pool A3 Reject" });

  const created = await apiKeysDb.createApiKey("Quota-Only Key Reject", "machine-a3-reject");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: [pool.id],
  });

  const policy = await loadPolicy("quota-only-rejected");

  // "openai/gpt-4.1" → provider "openai" is NOT in the codex pool scope → reject
  const result = await policy.enforceApiKeyPolicy(makeRequest(created.key), "openai/gpt-4.1");

  assert.ok(result.rejection, "should produce a rejection Response");
  assert.equal(result.rejection.status, 403, "rejection should be 403 Forbidden");

  const body = await readBody(result.rejection);
  assert.equal(body.error.code, "QUOTA_ONLY", "error code should be QUOTA_ONLY");
  assert.match(
    body.error.message,
    /not allowed for this quota-exclusive API key/,
    "error message should mention quota-exclusive"
  );
  // Must not leak stack traces
  assert.ok(!body.error.message.includes(" at "), "message must not contain stack trace");
});

test("quota-only key whose allowedQuotas references a non-existent pool is rejected 403 QUOTA_ONLY (fail-closed)", async () => {
  // Create an API key bound to a pool ID that does not exist in the DB (dangling reference)
  const created = await apiKeysDb.createApiKey("Dangling Quota Key", "machine-a3-dangling");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: ["non-existent-pool-id-00000000"],
  });

  const policy = await loadPolicy("quota-dangling-pool");

  // resolveQuotaKeyScope will return empty providers for the dangling pool id → fail-closed
  const result = await policy.enforceApiKeyPolicy(makeRequest(created.key), "openai/gpt-4.1");

  assert.ok(result.rejection, "should produce a rejection Response for a dangling pool");
  assert.equal(result.rejection.status, 403, "rejection should be 403 Forbidden");

  const body = await readBody(result.rejection);
  assert.equal(body.error.code, "QUOTA_ONLY", "error code should be QUOTA_ONLY");
  assert.match(
    body.error.message,
    /not allowed for this quota-exclusive API key/,
    "error message should mention quota-exclusive"
  );
  assert.ok(!body.error.message.includes(" at "), "message must not contain stack trace");
});

test("key with empty allowedQuotas is subject to normal model restriction checks", async () => {
  // A key with no allowedQuotas but with allowedModels = ["openai/*"]
  const created = await apiKeysDb.createApiKey("Normal Key", "machine-a3-normal");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedModels: ["openai/gpt-4.1"],
  });

  const policy = await loadPolicy("quota-empty-normal");

  // Allowed model should pass
  const allowed = await policy.enforceApiKeyPolicy(makeRequest(created.key), "openai/gpt-4.1");
  assert.equal(
    allowed.rejection,
    null,
    "model in allowedModels should pass for a non-quota key"
  );

  // Disallowed model should be rejected via the normal allowedModels path
  const blocked = await policy.enforceApiKeyPolicy(makeRequest(created.key), "anthropic/claude-3-7-sonnet");
  assert.ok(blocked.rejection, "disallowed model should be rejected");
  assert.equal(blocked.rejection.status, 403);

  const body = await readBody(blocked.rejection);
  assert.match(body.error.message, /not allowed for this API key/);
  // The code for this case comes from errorConfig (403 → "insufficient_quota")
  // rather than QUOTA_ONLY — confirming paths are separate
  assert.notEqual(body.error.code, "QUOTA_ONLY", "normal key rejection must NOT use QUOTA_ONLY code");
});
