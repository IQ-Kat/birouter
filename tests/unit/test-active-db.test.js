import { describe, it } from "vitest";
import { getProviderConnections } from "../../src/lib/localDb.js";

describe("Database verification test", () => {
  it("prints active provider IDs", async () => {
    try {
      const connections = await getProviderConnections();
      const summary = connections.map(c => ({
        provider: c.provider,
        isActive: c.isActive !== false,
      }));
      console.log("--- DB Connection Summary ---");
      console.log(summary);
    } catch (err) {
      console.error("Failed to read connections:", err);
    }
  });
});
