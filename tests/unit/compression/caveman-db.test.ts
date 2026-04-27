import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getDbInstance } from "../../../src/lib/db/core.ts";
import {
  getCompressionSettings,
  updateCompressionSettings,
} from "../../../src/lib/db/compression.ts";
import type { CavemanConfig } from "../../../open-sse/services/compression/types.ts";

describe("compression DB module", () => {
  beforeEach(() => {
    const db = getDbInstance();
    db.prepare("DELETE FROM key_value WHERE namespace = ?").run("compression");
  });

  it("should return default config", () => {
    const config = getCompressionSettings();
    assert.equal(config.defaultMode, "off");
    assert.equal(config.enabled, false);
    assert.equal(config.autoTriggerTokens, 0);
    assert.equal(config.cacheMinutes, 5);
    assert.equal(config.preserveSystemPrompt, true);
    assert.ok(config.cavemanConfig);
    assert.equal(config.cavemanConfig.enabled, true);
    assert.deepEqual(config.cavemanConfig.compressRoles, ["user"]);
    assert.equal(config.cavemanConfig.minMessageLength, 50);
  });

  it("should update and retrieve settings", () => {
    updateCompressionSettings({ enabled: true, defaultMode: "standard" });
    const config = getCompressionSettings();
    assert.equal(config.enabled, true);
    assert.equal(config.defaultMode, "standard");

    updateCompressionSettings({ enabled: false, defaultMode: "off" });
    const reset = getCompressionSettings();
    assert.equal(reset.enabled, false);
    assert.equal(reset.defaultMode, "off");
  });

  it("should update cavemanConfig", () => {
    const customConfig: Partial<CavemanConfig> = {
      enabled: true,
      compressRoles: ["user", "system"],
      minMessageLength: 100,
    };
    updateCompressionSettings({ cavemanConfig: customConfig });
    const config = getCompressionSettings();
    assert.deepEqual(config.cavemanConfig.compressRoles, ["user", "system"]);
    assert.equal(config.cavemanConfig.minMessageLength, 100);
  });
});
