import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-login-bootstrap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/settings/require-login/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("public login bootstrap route exposes the metadata the login page consumes", async () => {
  await resetStorage();

  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
  });

  const response = await route.GET();
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    requireLogin: true,
    hasPassword: false,
    setupComplete: true,
  });
});
