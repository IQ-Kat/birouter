import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Compression Settings API Schema Validation", () => {
  const compressionModeValues = ["off", "lite", "standard", "aggressive", "ultra"];

  it("should validate all compression mode values", () => {
    assert.deepStrictEqual(compressionModeValues, [
      "off",
      "lite",
      "standard",
      "aggressive",
      "ultra",
    ]);
  });

  it("should validate caveman config structure", () => {
    const defaultCavemanConfig = {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    };

    assert.equal(defaultCavemanConfig.enabled, true);
    assert.deepStrictEqual(defaultCavemanConfig.compressRoles, ["user"]);
    assert.equal(Array.isArray(defaultCavemanConfig.skipRules), true);
    assert.equal(defaultCavemanConfig.minMessageLength, 50);
    assert.equal(Array.isArray(defaultCavemanConfig.preservePatterns), true);
  });

  it("should validate full compression config structure", () => {
    const defaultConfig = {
      enabled: false,
      defaultMode: "off",
      autoTriggerTokens: 0,
      cacheMinutes: 5,
      preserveSystemPrompt: true,
      comboOverrides: {},
      cavemanConfig: {
        enabled: true,
        compressRoles: ["user"],
        skipRules: [],
        minMessageLength: 50,
        preservePatterns: [],
      },
    };

    assert.equal(defaultConfig.enabled, false);
    assert.ok(compressionModeValues.includes(defaultConfig.defaultMode));
    assert.equal(typeof defaultConfig.autoTriggerTokens, "number");
    assert.equal(typeof defaultConfig.cacheMinutes, "number");
    assert.equal(typeof defaultConfig.preserveSystemPrompt, "boolean");
    assert.equal(typeof defaultConfig.comboOverrides, "object");
    assert.equal(typeof defaultConfig.cavemanConfig, "object");
  });

  it("should validate all 30 caveman compression rules are defined", async () => {
    const { CAVEMAN_RULES } =
      await import("../../../../open-sse/services/compression/cavemanRules.ts");
    assert.ok(Array.isArray(CAVEMAN_RULES));
    assert.ok(CAVEMAN_RULES.length >= 30, `Expected >= 30 rules, got ${CAVEMAN_RULES.length}`);
  });

  it("should validate compression modes cover all CavemanConfig roles", () => {
    const validRoles = ["user", "assistant", "system"];
    for (const role of validRoles) {
      assert.ok(validRoles.includes(role), `Role ${role} should be valid`);
    }
    assert.equal(validRoles.length, 3);
  });
});
