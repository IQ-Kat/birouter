import test from "node:test";
import assert from "node:assert/strict";

test("next config allows loopback dev origins alongside LAN access", async () => {
  const { default: nextConfig } = await import("../../next.config.mjs");

  assert.equal(Array.isArray(nextConfig.allowedDevOrigins), true);
  assert.equal(nextConfig.allowedDevOrigins.includes("localhost"), true);
  assert.equal(nextConfig.allowedDevOrigins.includes("127.0.0.1"), true);
  assert.equal(nextConfig.allowedDevOrigins.includes("192.168.*"), true);
});
