import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-providers-validate-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Load modules at top level
const core = await import("../../src/lib/db/core.ts");
const validateRoute = await import("../../src/app/api/providers/validate/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("providers validate route returns 400 for invalid JSON", async () => {
  await resetStorage();

  const request = new Request("http://localhost/api/providers/validate", {
    method: "POST",
    body: "invalid json",
  });

  const response = await validateRoute.POST(request);

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.error.message, "Invalid request");
});

test("providers validate route returns 400 for missing provider and apiKey", async () => {
  await resetStorage();

  // Empty body
  const request = new Request("http://localhost/api/providers/validate", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const response = await validateRoute.POST(request);

  assert.equal(response.status, 400);
});

test("providers validate route returns 400 for invalid provider type", async () => {
  await resetStorage();

  // Provider validation not supported returns 400
  const request = new Request("http://localhost/api/providers/validate", {
    method: "POST",
    body: JSON.stringify({ provider: "unknown-provider", apiKey: "test-key" }),
  });

  const response = await validateRoute.POST(request);

  // Should return 400 for unsupported
  assert.equal(response.status, 400);
});
