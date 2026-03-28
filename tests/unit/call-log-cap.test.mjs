import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  callLogs.invalidateCallLogsMaxCache();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("call logs respect the configurable maxCallLogs setting", async () => {
  await localDb.updateSettings({ maxCallLogs: 3 });
  callLogs.invalidateCallLogsMaxCache();

  for (let i = 1; i <= 5; i++) {
    await callLogs.saveCallLog({
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: `model-${i}`,
      provider: "openai",
      duration: i,
      requestBody: { index: i },
      responseBody: { ok: true, index: i },
    });
  }

  const logs = await callLogs.getCallLogs({ limit: 10 });

  assert.equal(logs.length, 3);
  assert.deepEqual(
    logs.map((entry) => entry.model),
    ["model-5", "model-4", "model-3"]
  );
});
