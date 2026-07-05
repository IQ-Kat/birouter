import test from "node:test";
import assert from "node:assert/strict";
import {
  BirouterPlugin,
  BIROUTER_PROVIDER_KEY,
  DEFAULT_MODEL_CACHE_TTL_MS,
  resolveBirouterPluginOptions,
} from "../src/index.js";

test("scaffold: exports public surface", () => {
  assert.equal(
    typeof BirouterPlugin,
    "function",
    "BirouterPlugin must be a function (Plugin factory)"
  );
  assert.equal(BIROUTER_PROVIDER_KEY, "birouter");
  assert.equal(DEFAULT_MODEL_CACHE_TTL_MS, 300_000);
});

test("scaffold: default export is v1 plugin shape { id, server: BirouterPlugin }", async () => {
  const mod = await import("../src/index.js");
  assert.equal(typeof mod.default, "object");
  assert.equal(mod.default.id, "@birouter/opencode-plugin");
  assert.equal(mod.default.server, mod.BirouterPlugin);
});

test("resolveBirouterPluginOptions: defaults", () => {
  const r = resolveBirouterPluginOptions();
  assert.equal(r.providerId, "opencode-birouter");
  assert.equal(r.displayName, "Birouter");
  assert.equal(r.modelCacheTtl, 300_000);
  assert.equal(r.baseURL, undefined);
});

test("resolveBirouterPluginOptions: custom providerId derives displayName", () => {
  const r = resolveBirouterPluginOptions({ providerId: "birouter-preprod" });
  assert.equal(r.providerId, "opencode-birouter-preprod");
  assert.equal(r.displayName, "Birouter (opencode-birouter-preprod)");
});

test("resolveBirouterPluginOptions: explicit displayName wins", () => {
  const r = resolveBirouterPluginOptions({
    providerId: "birouter-x",
    displayName: "Custom Label",
  });
  assert.equal(r.displayName, "Custom Label");
});

test("resolveBirouterPluginOptions: invalid TTL falls back to default", () => {
  assert.equal(resolveBirouterPluginOptions({ modelCacheTtl: 0 }).modelCacheTtl, 300_000);
  assert.equal(resolveBirouterPluginOptions({ modelCacheTtl: -1 }).modelCacheTtl, 300_000);
});

test("resolveBirouterPluginOptions: positive TTL respected", () => {
  assert.equal(resolveBirouterPluginOptions({ modelCacheTtl: 60_000 }).modelCacheTtl, 60_000);
});

test("BirouterPlugin: returns an empty hooks object (scaffold)", async () => {
  const fakeCtx = {} as Parameters<typeof BirouterPlugin>[0];
  const hooks = await BirouterPlugin(fakeCtx);
  assert.equal(typeof hooks, "object");
  assert.notEqual(hooks, null);
});

test("scaffold: built ESM default export resolves with the v1 plugin shape", async () => {
  // The plugin is ESM-only now — the CJS bundle was dropped to fix the OpenCode
  // loader (#3883), so there is no more ../dist/index.cjs. Validate that the built
  // distributable's default export still carries the OpenCode v1 { id, server } shape.
  const mod = await import("../dist/index.js");
  assert.strictEqual(typeof mod.default, "object");
  assert.strictEqual(mod.default.id, "@birouter/opencode-plugin");
  assert.strictEqual(typeof mod.default.server, "function");
});
