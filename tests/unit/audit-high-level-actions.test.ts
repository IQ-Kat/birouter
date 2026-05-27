import { test } from "node:test";
import assert from "node:assert/strict";

import { HIGH_LEVEL_ACTIONS, isHighLevelAction } from "../../src/lib/audit/highLevelActions";

const ALL = HIGH_LEVEL_ACTIONS as readonly string[];

test("HIGH_LEVEL_ACTIONS has exactly 26 entries", () => {
  assert.equal(ALL.length, 26);
});

test("HIGH_LEVEL_ACTIONS has no duplicates", () => {
  assert.equal(new Set(ALL).size, ALL.length);
});

test("isHighLevelAction true for every entry in allowlist", () => {
  for (const a of ALL) {
    assert.ok(isHighLevelAction(a), `Expected true for '${a}'`);
  }
});

test("isHighLevelAction false for 'random.event'", () => {
  assert.equal(isHighLevelAction("random.event"), false);
});

test("isHighLevelAction false for empty string", () => {
  assert.equal(isHighLevelAction(""), false);
});

test("isHighLevelAction false for partial 'provider'", () => {
  assert.equal(isHighLevelAction("provider"), false);
});

test("includes all 5 quota.* actions from B26", () => {
  for (const a of [
    "quota.pool.created",
    "quota.pool.updated",
    "quota.pool.deleted",
    "quota.plan.updated",
    "quota.store.driver_changed",
  ]) {
    assert.ok(ALL.includes(a), `Missing ${a}`);
  }
});

test("includes provider lifecycle actions", () => {
  for (const a of ["provider.added", "provider.removed", "provider.tested"]) {
    assert.ok(ALL.includes(a));
  }
});

test("includes combo lifecycle actions", () => {
  for (const a of ["combo.created", "combo.updated", "combo.deleted"]) {
    assert.ok(ALL.includes(a));
  }
});

test("includes apikey lifecycle actions", () => {
  for (const a of ["apikey.created", "apikey.revoked", "apikey.rotated"]) {
    assert.ok(ALL.includes(a));
  }
});
