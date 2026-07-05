import { describe, it } from "node:test";
import assert from "node:assert";

const importMod = () =>
  import("../../open-sse/services/smartPacingIntegration.ts") as Promise<
    typeof import("../../open-sse/services/smartPacingIntegration.ts")
  >;

describe("smartPacingIntegration", async () => {
  const mod = await importMod();

  it("loads module with expected exports", () => {
    assert.ok(mod.acquireSmartPacedSemaphore);
    assert.ok(mod.adaptPacingFromResponse);
  });

  it("acquireSmartPacedSemaphore returns release function for noauth", async () => {
    const result = await mod.acquireSmartPacedSemaphore({
      provider: "opencode",
      model: "gpt-4",
      connectionId: "noauth",
      maxConcurrency: null,
      semaphoreKey: null,
      settings: {},
    });
    assert.ok(typeof result.release === "function");
    assert.strictEqual(result.pacingSlot.delayed, false);
    result.release();
  });

  it("acquireSmartPacedSemaphore works without settings", async () => {
    const result = await mod.acquireSmartPacedSemaphore({
      provider: "claude",
      model: "claude-sonnet-4",
      connectionId: "test-conn-int-1",
      maxConcurrency: null,
      semaphoreKey: null,
      settings: null,
    });
    assert.ok(typeof result.release === "function");
    result.release();
  });

  it("acquireSmartPacedSemaphore returns release function with pacing disabled", async () => {
    const result = await mod.acquireSmartPacedSemaphore({
      provider: "antigravity",
      model: "gemini-3.1-pro",
      connectionId: "test-conn-int-2",
      maxConcurrency: null,
      semaphoreKey: null,
      settings: { smartPacingEnabled: false, smartPacingMode: "off" },
    });
    assert.ok(typeof result.release === "function");
    assert.strictEqual(result.pacingSlot.delayed, false);
    result.release();
  });

  it("adaptPacingFromResponse does not throw", () => {
    mod.adaptPacingFromResponse("test-conn-int-3", { "x-ratelimit-remaining": "3" });
    mod.adaptPacingFromResponse(null, null);
    mod.adaptPacingFromResponse("noauth", {});
  });
});
