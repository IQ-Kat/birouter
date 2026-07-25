import test from "node:test";
import assert from "node:assert/strict";

const { POST } = await import("../../../../src/app/api/services/cliproxy/provider-expose/route.ts");
const { getServiceRow, upsertVersionManagerTool } =
  await import("../../../../src/lib/db/versionManager.ts");

test("POST /api/services/cliproxy/provider-expose: toggles providerExpose boolean in version_manager", async () => {
  await upsertVersionManagerTool({
    tool: "cliproxy",
    name: "CLI Proxy API",
    currentVersion: "1.0.0",
    installedVersion: "1.0.0",
    status: "stopped",
  });
  const disableRes = await POST(
    new Request("http://localhost/api/services/cliproxy/provider-expose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: false }),
    })
  );
  assert.equal(disableRes.status, 204);

  let row = await getServiceRow("cliproxy");
  assert.equal(row?.providerExpose, false);

  const enableRes = await POST(
    new Request("http://localhost/api/services/cliproxy/provider-expose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: true }),
    })
  );
  assert.equal(enableRes.status, 204);

  row = await getServiceRow("cliproxy");
  assert.equal(row?.providerExpose, true);
});

test("POST /api/services/cliproxy/provider-expose: returns 400 for invalid body schema", async () => {
  const res = await POST(
    new Request("http://localhost/api/services/cliproxy/provider-expose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: "invalid" }),
    })
  );
  assert.equal(res.status, 400);
});
