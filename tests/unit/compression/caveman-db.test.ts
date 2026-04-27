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
    // Clean up compression namespace before each test
    const db = getDbInstance();
    db.prepare("DELETE FROM key_value WHERE namespace = ?").run("compression");
  });

  it("should return default settings", () => {
    const settings = getCompressionSettings();
    assert.equal(settings.mode, "off");
    assert.equal(settings.enabled, false);
    assert.ok(settings.cavemanConfig);
    assert.equal(settings.cavemanConfig.enabled, true);
    assert.deepEqual(settings.cavemanConfig.compressRoles, ["user"]);
    assert.equal(settings.cavemanConfig.minMessageLength, 50);
  });

  it("should update and retrieve settings", () => {
    updateCompressionSettings({ enabled: true, mode: "caveman" });
    const settings = getCompressionSettings();
    assert.equal(settings.enabled, true);
    assert.equal(settings.mode, "caveman");

    updateCompressionSettings({ enabled: false, mode: "off" });
    const reset = getCompressionSettings();
    assert.equal(reset.enabled, false);
    assert.equal(reset.mode, "off");
  });

  it("should update cavemanConfig", () => {
    const customConfig: Partial<CavemanConfig> = {
      enabled: true,
      compressRoles: ["user", "system"],
      minMessageLength: 100,
    };
    updateCompressionSettings({ cavemanConfig: customConfig });
    const settings = getCompressionSettings();
    assert.deepEqual(settings.cavemanConfig.compressRoles, ["user", "system"]);
    assert.equal(settings.cavemanConfig.minMessageLength, 100);
  });
});
