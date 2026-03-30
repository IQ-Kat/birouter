import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { getSettings, updateSettings } from "../../src/lib/localDb.ts";

describe("Settings API - debugMode and hiddenSidebarItems", () => {
  describe("debugMode", () => {
    test("PATCH with debugMode=true succeeds", async () => {
      const result = await updateSettings({ debugMode: true });
      assert.strictEqual(result.ok, true, "updateSettings should return ok: true");

      const settings = getSettings();
      assert.strictEqual(settings.debugMode, true, "debugMode should be true");
    });

    test("PATCH with debugMode=false succeeds", async () => {
      const result = await updateSettings({ debugMode: false });
      assert.strictEqual(result.ok, true, "updateSettings should return ok: true");

      const settings = getSettings();
      assert.strictEqual(settings.debugMode, false, "debugMode should be false");
    });
  });

  describe("hiddenSidebarItems", () => {
    test("PATCH with hiddenSidebarItems=['translator'] succeeds", async () => {
      const result = await updateSettings({ hiddenSidebarItems: ["translator"] });
      assert.strictEqual(result.ok, true, "updateSettings should return ok: true");

      const settings = getSettings();
      assert.deepStrictEqual(
        settings.hiddenSidebarItems,
        ["translator"],
        "hiddenSidebarItems should contain translator"
      );
    });

    test("PATCH with empty hiddenSidebarItems succeeds", async () => {
      const result = await updateSettings({ hiddenSidebarItems: [] });
      assert.strictEqual(result.ok, true, "updateSettings should return ok: true");

      const settings = getSettings();
      assert.deepStrictEqual(
        settings.hiddenSidebarItems,
        [],
        "hiddenSidebarItems should be empty array"
      );
    });
  });

  describe("combined updates", () => {
    test("PATCH with both debugMode and hiddenSidebarItems succeeds", async () => {
      const result = await updateSettings({
        debugMode: true,
        hiddenSidebarItems: ["translator"],
      });
      assert.strictEqual(result.ok, true, "updateSettings should return ok: true");

      const settings = getSettings();
      assert.strictEqual(settings.debugMode, true, "debugMode should be true");
      assert.deepStrictEqual(
        settings.hiddenSidebarItems,
        ["translator"],
        "hiddenSidebarItems should be updated"
      );
    });
  });
});
