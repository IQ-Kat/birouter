import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-clear-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("clearAccountError clears stale provider error metadata after recovery", async () => {
  await resetStorage();
  core.getDbInstance().exec('ALTER TABLE provider_connections ADD COLUMN "group" TEXT');

  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "recover@example.com",
    accessToken: "access",
    refreshToken: "refresh",
    testStatus: "error",
    lastError: "Health check: token refresh failed",
    lastErrorType: "token_refresh_failed",
    lastErrorSource: "oauth",
    errorCode: "refresh_failed",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    backoffLevel: 2,
  });

  const credentials = await auth.getProviderCredentials("codex");
  await auth.clearAccountError(created.id, credentials);

  const updated = await providersDb.getProviderConnectionById(created.id);
  assert.equal(updated.testStatus, "active");
  assert.equal(updated.lastError, undefined);
  assert.equal(updated.lastErrorType, undefined);
  assert.equal(updated.lastErrorSource, undefined);
  assert.equal(updated.errorCode, undefined);
  assert.equal(updated.rateLimitedUntil, undefined);
  assert.equal(updated.backoffLevel, 0);
});
