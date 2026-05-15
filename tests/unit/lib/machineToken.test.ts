import { test } from "node:test";
import assert from "node:assert/strict";
import { getMachineTokenSync } from "../../../src/lib/machineToken.ts";

test("getMachineTokenSync returns a 32-character hex string", () => {
  const token = getMachineTokenSync();
  assert.match(token, /^[0-9a-f]{32}$/, "token must be 32 lowercase hex chars");
});

test("getMachineTokenSync is deterministic", () => {
  assert.equal(getMachineTokenSync(), getMachineTokenSync());
});

test("getMachineTokenSync produces different values for different salts", () => {
  const t1 = getMachineTokenSync("salt-a");
  const t2 = getMachineTokenSync("salt-b");
  assert.notEqual(t1, t2);
});

test("getMachineTokenSync with empty string salt does not throw", () => {
  assert.doesNotThrow(() => getMachineTokenSync(""));
});
