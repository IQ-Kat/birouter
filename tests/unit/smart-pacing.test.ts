import { describe, it } from "node:test";
import assert from "node:assert";

const importMod = () =>
  import("../../open-sse/services/smartPacing.ts") as Promise<
    typeof import("../../open-sse/services/smartPacing.ts")
  >;

describe("smartPacing", async () => {
  const mod = await importMod();

  it("loads module with all expected exports", () => {
    assert.ok(mod.acquirePacingSlot);
    assert.ok(mod.acquirePacingSlotAsync);
    assert.ok(mod.detectClientType);
    assert.ok(mod.getPacingStats);
    assert.ok(mod.getAllPacingStats);
    assert.ok(mod.adaptFromResponseHeaders);
    assert.ok(mod.getProviderProfiles);
    assert.ok(mod.resetPacingState);
    assert.ok(mod.PACING_DEFAULTS);
    assert.ok(mod.PROVIDER_PROFILES);
  });

  it("detectClientType detects browser UAs as interactive", () => {
    const result = mod.detectClientType({ "user-agent": "Mozilla/5.0 Chrome/120" });
    assert.strictEqual(result.type, "interactive");
    assert.strictEqual(result.priority, 1);
  });

  it("detectClientType detects CLI UAs as agent", () => {
    const result = mod.detectClientType({ "user-agent": "curl/8.0" });
    assert.strictEqual(result.type, "agent");
    assert.strictEqual(result.priority, 10);
  });

  it("detectClientType respects x-client-type header override", () => {
    const result = mod.detectClientType({
      "user-agent": "python-requests/2.0",
      "x-client-type": "interactive",
    });
    assert.strictEqual(result.type, "interactive");
    assert.strictEqual(result.priority, 1);
  });

  it("detectClientType detects IDE UAs as agent medium priority", () => {
    assert.strictEqual(mod.detectClientType({ "user-agent": "cursor/v1.0" }).priority, 5);
    assert.strictEqual(mod.detectClientType({ "user-agent": "vscode/1.80" }).priority, 5);
  });

  it("detectClientType returns unknown for empty/absent headers", () => {
    assert.strictEqual(mod.detectClientType(null).type, "unknown");
    assert.strictEqual(mod.detectClientType({}).type, "unknown");
  });

  it("acquirePacingSlot skips pacing for noauth connections", () => {
    const slot = mod.acquirePacingSlot({
      connectionId: "noauth",
      provider: "opencode",
      settings: { smartPacingEnabled: true, smartPacingMode: "auto" },
    });
    assert.strictEqual(slot.delayed, false);
    assert.strictEqual(slot.delayMs, 0);
    slot.release();
  });

  it("acquirePacingSlot skips pacing when mode is off", () => {
    const slot = mod.acquirePacingSlot({
      connectionId: "test-conn-1",
      provider: "antigravity",
      settings: { smartPacingEnabled: true, smartPacingMode: "off" },
    });
    assert.strictEqual(slot.delayed, false);
    assert.strictEqual(slot.delayMs, 0);
    slot.release();
  });

  it("acquirePacingSlot returns immediately for first request (no history)", () => {
    mod.resetPacingState("test-conn-first");
    const slot = mod.acquirePacingSlot({
      connectionId: "test-conn-first",
      provider: "claude",
      settings: { smartPacingEnabled: true, smartPacingMode: "auto" },
    });
    assert.strictEqual(slot.delayed, false);
    assert.strictEqual(slot.delayMs, 0);
    slot.release();
  });

  it("acquirePacingSlotAsync properly awaits and returns slot", async () => {
    mod.resetPacingState("test-conn-async");
    const slot = await mod.acquirePacingSlotAsync({
      connectionId: "test-conn-async",
      provider: "claude",
      settings: { smartPacingEnabled: true, smartPacingMode: "auto" },
    });
    assert.ok(typeof slot.release === "function");
    assert.strictEqual(slot.delayed, false);
    slot.release();
  });

  it("getProviderProfiles returns expected provider entries", () => {
    const profiles = mod.getProviderProfiles();
    assert.ok(profiles.antigravity);
    assert.ok(profiles.claude);
    assert.ok(profiles.codex);
    assert.ok(profiles.github);
    assert.ok(profiles.cursor);
    assert.ok(profiles._default);
    assert.strictEqual(profiles.antigravity.sensitivity, "high");
    assert.strictEqual(profiles.github.sensitivity, "low");
  });

  it("PACING_DEFAULTS has expected defaults", () => {
    assert.strictEqual(mod.PACING_DEFAULTS.smartPacingEnabled, true);
    assert.strictEqual(mod.PACING_DEFAULTS.smartPacingMode, "auto");
  });

  it("getPacingStats returns null for unknown connection", () => {
    assert.strictEqual(mod.getPacingStats("nonexistent-conn"), null);
  });

  it("getPacingStats returns stats for active connection", () => {
    mod.resetPacingState("test-conn-stats");
    mod.acquirePacingSlot({
      connectionId: "test-conn-stats",
      provider: "claude",
      settings: { smartPacingEnabled: true, smartPacingMode: "auto" },
    });
    const stats = mod.getPacingStats("test-conn-stats");
    assert.ok(stats);
    assert.strictEqual(stats.activeRequests, 1);
    assert.strictEqual(stats.queueLength, 0);
  });

  it("resetPacingState clears all state", () => {
    mod.resetPacingState();
    assert.strictEqual(Object.keys(mod.getAllPacingStats()).length, 0);
  });

  it("acquirePacingSlot enforces maxConcurrent via queue", async () => {
    mod.resetPacingState("test-conn-concurrent");

    const slot1 = mod.acquirePacingSlot({
      connectionId: "test-conn-concurrent",
      provider: "antigravity",
      settings: { smartPacingEnabled: true, smartPacingMode: "auto" },
    });
    assert.strictEqual(slot1.delayed, false, "slot1 should proceed immediately");

    const slot2 = mod.acquirePacingSlot({
      connectionId: "test-conn-concurrent",
      provider: "antigravity",
      settings: { smartPacingEnabled: true, smartPacingMode: "auto" },
    });

    const stats = mod.getPacingStats("test-conn-concurrent");
    assert.ok(stats);
    assert.strictEqual(stats.queueLength, 1, "slot2 should be queued");

    slot1.release();

    slot2.release();
  });

  it("adaptFromResponseHeaders injects phantom entries when remaining is low", () => {
    mod.resetPacingState("test-conn-adapt");

    mod.acquirePacingSlot({
      connectionId: "test-conn-adapt",
      provider: "claude",
      settings: { smartPacingEnabled: true, smartPacingMode: "auto" },
    });

    const before = mod.getPacingStats("test-conn-adapt");
    const beforeRpm = before ? before.rpm : 0;

    mod.adaptFromResponseHeaders("test-conn-adapt", {
      "x-ratelimit-remaining": "2",
    });

    const after = mod.getPacingStats("test-conn-adapt");
    assert.ok(after);
    assert.ok(after.rpm >= beforeRpm, "RPM should increase after phantom injection");
  });
});
