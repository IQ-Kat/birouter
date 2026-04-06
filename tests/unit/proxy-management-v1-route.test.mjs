import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-v1-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxyV1Route = await import("../../src/app/api/v1/management/proxies/route.ts");
const proxyAssignmentsV1Route =
  await import("../../src/app/api/v1/management/proxies/assignments/route.ts");
const proxyHealthV1Route = await import("../../src/app/api/v1/management/proxies/health/route.ts");
const proxyBulkAssignV1Route =
  await import("../../src/app/api/v1/management/proxies/bulk-assign/route.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

async function withEnv(name, value, fn) {
  const previous = process.env[name];
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }

  try {
    return await fn();
  } finally {
    if (previous === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = previous;
    }
  }
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("v1 management proxies supports create/list/pagination", async () => {
  await resetStorage();

  const createA = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Proxy A",
        type: "http",
        host: "proxy-a.local",
        port: 8080,
      }),
    })
  );
  assert.equal(createA.status, 201);

  const createB = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Proxy B",
        type: "https",
        host: "proxy-b.local",
        port: 443,
      }),
    })
  );
  assert.equal(createB.status, 201);

  const listRes = await proxyV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies?limit=1&offset=0")
  );
  assert.equal(listRes.status, 200);
  const listPayload = await listRes.json();
  assert.equal(Array.isArray(listPayload.items), true);
  assert.equal(listPayload.items.length, 1);
  assert.equal(listPayload.page.total >= 2, true);
});

test("v1 management assignments supports put and filtered get", async () => {
  await resetStorage();

  const providerConn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "v1-assignment",
    apiKey: "sk-test-v1",
  });

  const createdRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Proxy Assign",
        type: "http",
        host: "assign.local",
        port: 8000,
      }),
    })
  );
  const created = await createdRes.json();

  const assignRes = await proxyAssignmentsV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "account",
        scopeId: providerConn.id,
        proxyId: created.id,
      }),
    })
  );
  assert.equal(assignRes.status, 200);

  const filteredRes = await proxyAssignmentsV1Route.GET(
    new Request(
      `http://localhost/api/v1/management/proxies/assignments?scope=account&scope_id=${providerConn.id}`
    )
  );
  assert.equal(filteredRes.status, 200);
  const payload = await filteredRes.json();
  assert.equal(payload.items.length, 1);
  assert.equal(payload.items[0].proxyId, created.id);
});

test("v1 management health endpoint aggregates proxy log metrics", async () => {
  await resetStorage();

  const createdRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Proxy Health",
        type: "http",
        host: "health.local",
        port: 8080,
      }),
    })
  );
  const created = await createdRes.json();

  proxyLogger.logProxyEvent({
    status: "success",
    proxy: { type: "http", host: "health.local", port: 8080 },
    latencyMs: 120,
    level: "provider",
    levelId: "openai",
    provider: "openai",
  });
  proxyLogger.logProxyEvent({
    status: "error",
    proxy: { type: "http", host: "health.local", port: 8080 },
    latencyMs: 200,
    level: "provider",
    levelId: "openai",
    provider: "openai",
  });

  const healthRes = await proxyHealthV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies/health?hours=24")
  );
  assert.equal(healthRes.status, 200);
  const healthPayload = await healthRes.json();
  const row = healthPayload.items.find((item) => item.proxyId === created.id);
  assert.ok(row);
  assert.equal(row.totalRequests >= 2, true);
  assert.equal(row.errorCount >= 1, true);
});

test("v1 bulk assignment updates multiple scope IDs in one request", async () => {
  await resetStorage();

  const proxyRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bulk Proxy",
        type: "http",
        host: "bulk.local",
        port: 8080,
      }),
    })
  );
  const proxy = await proxyRes.json();

  const bulkRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "provider",
        scopeIds: ["openai", "anthropic"],
        proxyId: proxy.id,
      }),
    })
  );
  assert.equal(bulkRes.status, 200);
  const bulkPayload = await bulkRes.json();
  assert.equal(bulkPayload.updated, 2);

  const checkRes = await proxyAssignmentsV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies/assignments?scope=provider")
  );
  const checkPayload = await checkRes.json();
  assert.equal(checkPayload.items.length >= 2, true);
});

test("v1 proxy management companion routes require auth when login protection is enabled", async () => {
  await resetStorage();

  await withEnv("INITIAL_PASSWORD", "secret", async () => {
    const assignmentsGetRes = await proxyAssignmentsV1Route.GET(
      new Request("http://localhost/api/v1/management/proxies/assignments")
    );
    assert.equal(assignmentsGetRes.status, 401);

    const assignmentsPutRes = await proxyAssignmentsV1Route.PUT(
      new Request("http://localhost/api/v1/management/proxies/assignments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer invalid-management-token",
        },
        body: JSON.stringify({
          scope: "global",
          proxyId: null,
        }),
      })
    );
    assert.equal(assignmentsPutRes.status, 403);

    const healthRes = await proxyHealthV1Route.GET(
      new Request("http://localhost/api/v1/management/proxies/health", {
        headers: {
          Authorization: "Bearer invalid-management-token",
        },
      })
    );
    assert.equal(healthRes.status, 403);

    const bulkRes = await proxyBulkAssignV1Route.PUT(
      new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: "global",
          proxyId: null,
        }),
      })
    );
    assert.equal(bulkRes.status, 401);
  });
});

test("v1 assignments route resolves connection proxies and bulk assignment covers validation branches", async () => {
  await resetStorage();

  const providerConn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "v1-resolve",
    apiKey: "sk-test-v1-resolve",
  });

  const proxyRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Resolve Proxy",
        type: "http",
        host: "resolve.local",
        port: 9000,
      }),
    })
  );
  const proxy = await proxyRes.json();

  const assignRes = await proxyAssignmentsV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "account",
        scopeId: providerConn.id,
        proxyId: proxy.id,
      }),
    })
  );
  assert.equal(assignRes.status, 200);

  const resolveRes = await proxyAssignmentsV1Route.GET(
    new Request(
      `http://localhost/api/v1/management/proxies/assignments?resolve_connection_id=${providerConn.id}`
    )
  );
  assert.equal(resolveRes.status, 200);
  const resolvePayload = await resolveRes.json();
  assert.equal(resolvePayload.level, "account");
  assert.equal(resolvePayload.proxy.host, "resolve.local");

  const invalidJsonRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: "{",
    })
  );
  assert.equal(invalidJsonRes.status, 400);

  const invalidPayloadRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "provider",
        scopeIds: [],
      }),
    })
  );
  assert.equal(invalidPayloadRes.status, 400);

  const normalizedRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "key",
        scopeIds: [providerConn.id, providerConn.id],
        proxyId: proxy.id,
      }),
    })
  );
  assert.equal(normalizedRes.status, 200);
  const normalizedPayload = await normalizedRes.json();
  assert.equal(normalizedPayload.scope, "account");
  assert.equal(normalizedPayload.requested, 2);
  assert.equal(normalizedPayload.updated, 1);

  const globalRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "global",
        proxyId: proxy.id,
      }),
    })
  );
  assert.equal(globalRes.status, 200);
  const globalPayload = await globalRes.json();
  assert.equal(globalPayload.scope, "global");
  assert.equal(globalPayload.requested, 1);
  assert.equal(globalPayload.updated, 1);
});
