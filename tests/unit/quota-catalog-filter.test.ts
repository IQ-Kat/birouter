import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { filterModelsToQuotaPools } from "../../src/lib/quota/quotaCombos.js";

describe("filterModelsToQuotaPools", () => {
  const models = [
    { id: "quotaShared-times-codex/gpt-5.5" },
    { id: "quotaShared-times-codex/gpt-5.4" },
    { id: "cx/gpt-5.5" },
    { id: "quotaShared-other-codex/m" },
  ];

  it("returns only quotaShared-* entries whose poolSlug is in the given pool slugs", () => {
    const result = filterModelsToQuotaPools(models, ["times"]);
    assert.deepEqual(result, [
      { id: "quotaShared-times-codex/gpt-5.5" },
      { id: "quotaShared-times-codex/gpt-5.4" },
    ]);
  });

  it("returns empty array when poolSlugs is empty (fail-closed)", () => {
    const result = filterModelsToQuotaPools(models, []);
    assert.deepEqual(result, []);
  });

  it("returns empty array when no quota models are present in the list", () => {
    const plainModels = [{ id: "cx/gpt-5.5" }, { id: "openai/gpt-4o" }];
    const result = filterModelsToQuotaPools(plainModels, ["times"]);
    assert.deepEqual(result, []);
  });

  it("matches multiple pool slugs simultaneously", () => {
    const result = filterModelsToQuotaPools(models, ["times", "other"]);
    assert.deepEqual(result, [
      { id: "quotaShared-times-codex/gpt-5.5" },
      { id: "quotaShared-times-codex/gpt-5.4" },
      { id: "quotaShared-other-codex/m" },
    ]);
  });

  it("preserves extra fields on model entries (generic T extends { id })", () => {
    const richModels = [
      { id: "quotaShared-times-cx/gpt-5.5", object: "model", owned_by: "combo" },
      { id: "cx/gpt-5.5", object: "model", owned_by: "cx" },
    ];
    const result = filterModelsToQuotaPools(richModels, ["times"]);
    assert.deepEqual(result, [
      { id: "quotaShared-times-cx/gpt-5.5", object: "model", owned_by: "combo" },
    ]);
  });

  it("does not match a model from a different pool when only one slug is provided", () => {
    const result = filterModelsToQuotaPools(models, ["other"]);
    assert.deepEqual(result, [{ id: "quotaShared-other-codex/m" }]);
  });
});
