import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  QUOTA_MODEL_PREFIX,
  quotaPoolSlug,
  quotaModelName,
  parseQuotaModelName,
  isQuotaModelName,
} from "../../src/lib/quota/quotaModelNaming.js";

describe("quotaPoolSlug", () => {
  it("strips non-alphanumeric characters and lowercases", () => {
    assert.equal(quotaPoolSlug("Time XPT-2"), "timexpt2");
  });

  it("handles simple lowercase names unchanged", () => {
    assert.equal(quotaPoolSlug("times"), "times");
  });

  it("strips dots and slashes", () => {
    assert.equal(quotaPoolSlug("my.pool/v2"), "mypoolv2");
  });

  it("falls back to 'pool' for empty result (all-symbol name)", () => {
    assert.equal(quotaPoolSlug("---"), "pool");
  });

  it("falls back to 'pool' for empty string", () => {
    assert.equal(quotaPoolSlug(""), "pool");
  });

  it("falls back to 'pool' for symbol-only name", () => {
    assert.equal(quotaPoolSlug("!@#$%"), "pool");
  });
});

describe("quotaModelName", () => {
  it("produces the canonical format", () => {
    assert.equal(quotaModelName("Times", "cx", "gpt-5.5"), "quotaShared-times-cx/gpt-5.5");
  });

  it("uses the prefix constant", () => {
    const name = quotaModelName("pool", "openai", "gpt-4");
    assert.ok(name.startsWith(QUOTA_MODEL_PREFIX));
  });

  it("keeps provider and model verbatim (not slugged)", () => {
    const name = quotaModelName("p", "openai", "org/model-x");
    assert.equal(name, "quotaShared-p-openai/org/model-x");
  });

  it("provider with dashes is kept verbatim", () => {
    const name = quotaModelName("pool", "some-prov", "m");
    assert.equal(name, "quotaShared-pool-some-prov/m");
  });
});

describe("parseQuotaModelName", () => {
  it("round-trips a simple model name", () => {
    const name = quotaModelName("Times", "cx", "gpt-5.5");
    const parsed = parseQuotaModelName(name);
    assert.deepEqual(parsed, { poolSlug: "times", provider: "cx", model: "gpt-5.5" });
  });

  it("round-trips a model name with a slash in model", () => {
    const name = quotaModelName("p", "openai", "org/model-x");
    const parsed = parseQuotaModelName(name);
    assert.deepEqual(parsed, { poolSlug: "p", provider: "openai", model: "org/model-x" });
  });

  it("handles provider with a dash", () => {
    const parsed = parseQuotaModelName("quotaShared-pool-some-prov/m");
    assert.deepEqual(parsed, { poolSlug: "pool", provider: "some-prov", model: "m" });
  });

  it("returns null for a non-quota model name", () => {
    assert.equal(parseQuotaModelName("gpt-4"), null);
  });

  it("returns null when there is no '-' after the prefix", () => {
    assert.equal(parseQuotaModelName("quotaShared-noslash"), null);
  });

  it("returns null when there is no '/' in the tail", () => {
    assert.equal(parseQuotaModelName("quotaShared-pool-noslash"), null);
  });

  it("returns null for empty provider", () => {
    assert.equal(parseQuotaModelName("quotaShared-pool-/model"), null);
  });

  it("returns null for empty model", () => {
    assert.equal(parseQuotaModelName("quotaShared-pool-cx/"), null);
  });

  it("handles model with multiple slashes", () => {
    const parsed = parseQuotaModelName("quotaShared-mypoolv2-openai/a/b/c");
    assert.deepEqual(parsed, { poolSlug: "mypoolv2", provider: "openai", model: "a/b/c" });
  });
});

describe("isQuotaModelName", () => {
  it("returns false for plain model names", () => {
    assert.equal(isQuotaModelName("gpt-4"), false);
  });

  it("returns true for valid quota model names", () => {
    assert.equal(isQuotaModelName("quotaShared-x-cx/m"), true);
  });

  it("returns true for any string starting with the prefix", () => {
    assert.equal(isQuotaModelName("quotaShared-"), true);
  });

  it("is consistent with the QUOTA_MODEL_PREFIX constant", () => {
    const name = quotaModelName("pool", "cx", "gpt-4");
    assert.equal(isQuotaModelName(name), true);
  });
});
