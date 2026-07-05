/**
 * T-08 options-schema tests.
 *
 * Covers `parseBirouterPluginOptions(opts)` — the strict Zod gate that
 * validates the second-arg `PluginOptions` bag from opencode.json before
 * any hook is wired. Anti-pattern checklist mirrored here:
 *
 *  - `null` / `undefined` must collapse to `{}` (defaults apply downstream).
 *  - Unknown keys must THROW (`.strict()` catches opencode.json typos).
 *  - Validation runs at parse time, not import time (module loads cleanly).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { parseBirouterPluginOptions } from "../src/index.js";

test("parseBirouterPluginOptions: undefined → {}", () => {
  assert.deepEqual(parseBirouterPluginOptions(undefined), {});
});

test("parseBirouterPluginOptions: null → {}", () => {
  assert.deepEqual(parseBirouterPluginOptions(null), {});
});

test("parseBirouterPluginOptions: empty object → {}", () => {
  assert.deepEqual(parseBirouterPluginOptions({}), {});
});

test("parseBirouterPluginOptions: valid providerId → returns it", () => {
  const r = parseBirouterPluginOptions({ providerId: "birouter-preprod" });
  assert.equal(r.providerId, "birouter-preprod");
});

test("parseBirouterPluginOptions: invalid providerId (special chars) → throws", () => {
  assert.throws(
    () => parseBirouterPluginOptions({ providerId: "birouter prod!" }),
    /providerId.*slug/i
  );
});

test("parseBirouterPluginOptions: empty providerId → throws", () => {
  assert.throws(() => parseBirouterPluginOptions({ providerId: "" }), /providerId/i);
});

test("parseBirouterPluginOptions: valid modelCacheTtl → returns it", () => {
  const r = parseBirouterPluginOptions({ modelCacheTtl: 60_000 });
  assert.equal(r.modelCacheTtl, 60_000);
});

test("parseBirouterPluginOptions: negative modelCacheTtl → throws", () => {
  assert.throws(() => parseBirouterPluginOptions({ modelCacheTtl: -1 }), /modelCacheTtl/i);
});

test("parseBirouterPluginOptions: zero modelCacheTtl → throws (positive required)", () => {
  assert.throws(() => parseBirouterPluginOptions({ modelCacheTtl: 0 }), /modelCacheTtl/i);
});

test("parseBirouterPluginOptions: invalid baseURL (not a URL) → throws", () => {
  assert.throws(() => parseBirouterPluginOptions({ baseURL: "not-a-url" }), /baseURL/i);
});

test("parseBirouterPluginOptions: unknown key → throws (strict mode catches typos)", () => {
  assert.throws(
    () =>
      parseBirouterPluginOptions({
        providerId: "birouter",
        provider_id: "typo-here",
      }),
    /provider_id|unrecognized/i
  );
});

test("parseBirouterPluginOptions: all four fields populated correctly → returns them", () => {
  const opts = {
    providerId: "birouter-prod",
    displayName: "Birouter Production",
    modelCacheTtl: 120_000,
    baseURL: "https://or.example.com/v1",
  };
  const r = parseBirouterPluginOptions(opts);
  assert.deepEqual(r, opts);
});

test("parseBirouterPluginOptions: error message lists every issue path", () => {
  // Two bad fields at once → error string should mention BOTH.
  try {
    parseBirouterPluginOptions({
      providerId: "",
      baseURL: "garbage",
    });
    assert.fail("expected throw");
  } catch (err) {
    const msg = (err as Error).message;
    assert.match(msg, /providerId/);
    assert.match(msg, /baseURL/);
  }
});

test("parseBirouterPluginOptions: module import alone does NOT throw", async () => {
  // Re-importing the entry must not trigger validation; validation only fires
  // on explicit parseBirouterPluginOptions / BirouterPlugin invocation.
  const mod = await import("../src/index.js");
  assert.equal(typeof mod.parseBirouterPluginOptions, "function");
});
