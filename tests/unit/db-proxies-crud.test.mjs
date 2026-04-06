import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-proxies-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("proxy CRUD redacts secrets by default and preserves stored credentials on blank update", async () => {
  const created = await proxiesDb.createProxy({
    name: "Primary Proxy",
    type: "http",
    host: "proxy.local",
    port: 8080,
    username: "user-a",
    password: "pass-a",
    region: "sa-east-1",
  });

  assert.equal(created.username, "***");
  assert.equal(created.password, "***");

  const withSecrets = await proxiesDb.getProxyById(created.id, { includeSecrets: true });
  const updated = await proxiesDb.updateProxy(created.id, {
    host: "proxy-updated.local",
    username: "",
    password: "",
    notes: "updated",
  });
  const updatedWithSecrets = await proxiesDb.getProxyById(created.id, { includeSecrets: true });
  const listed = await proxiesDb.listProxies();

  assert.equal(withSecrets.username, "user-a");
  assert.equal(withSecrets.password, "pass-a");
  assert.equal(updated.host, "proxy-updated.local");
  assert.equal(updated.notes, "updated");
  assert.equal(updatedWithSecrets.username, "user-a");
  assert.equal(updatedWithSecrets.password, "pass-a");
  assert.equal(listed.length, 1);
  assert.equal(listed[0].username, "***");
  assert.equal(listed[0].password, "***");
});

test("proxy assignments resolve by account, provider and global scope", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Proxy Target",
    apiKey: "sk-proxy",
  });
  const globalProxy = await proxiesDb.createProxy({
    name: "Global",
    type: "http",
    host: "global.local",
    port: 8080,
  });
  const providerProxy = await proxiesDb.createProxy({
    name: "Provider",
    type: "https",
    host: "provider.local",
    port: 443,
  });
  const accountProxy = await proxiesDb.createProxy({
    name: "Account",
    type: "socks5",
    host: "account.local",
    port: 1080,
  });

  await proxiesDb.assignProxyToScope("global", null, globalProxy.id);
  await proxiesDb.assignProxyToScope("provider", "openai", providerProxy.id);

  const providerResolved = await proxiesDb.resolveProxyForProvider("openai");
  const beforeAccount = await proxiesDb.resolveProxyForConnectionFromRegistry(connection.id);

  await proxiesDb.assignProxyToScope("key", connection.id, accountProxy.id);

  const assignmentsForAccountProxy = await proxiesDb.getProxyAssignments({
    proxyId: accountProxy.id,
  });
  const accountResolved = await proxiesDb.resolveProxyForConnectionFromRegistry(connection.id);
  const usage = await proxiesDb.getProxyWhereUsed(accountProxy.id);

  assert.equal(providerResolved.host, "provider.local");
  assert.equal(beforeAccount.level, "provider");
  assert.equal(assignmentsForAccountProxy.length, 1);
  assert.equal(assignmentsForAccountProxy[0].scope, "account");
  assert.equal(accountResolved.level, "account");
  assert.equal(accountResolved.proxy.host, "account.local");
  assert.equal(usage.count, 1);
});

test("bulk assignment deduplicates scope ids and reports failures for missing proxies", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Bulk One",
    apiKey: "sk-bulk-1",
  });
  const second = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Bulk Two",
    apiKey: "sk-bulk-2",
  });
  const proxy = await proxiesDb.createProxy({
    name: "Bulk Proxy",
    type: "http",
    host: "bulk.local",
    port: 8080,
  });

  const success = await proxiesDb.bulkAssignProxyToScope(
    "account",
    [first.id, second.id, first.id, " "],
    proxy.id
  );
  const failure = await proxiesDb.bulkAssignProxyToScope(
    "account",
    [first.id, second.id],
    "missing-proxy"
  );

  assert.equal(success.updated, 2);
  assert.deepEqual(success.failed, []);
  assert.equal(failure.updated, 0);
  assert.equal(failure.failed.length, 2);
  assert.match(failure.failed[0].reason, /Proxy not found/);
});

test("proxy health stats aggregate proxy_logs and force delete removes assignments", async () => {
  const proxy = await proxiesDb.createProxy({
    name: "Stats Proxy",
    type: "http",
    host: "stats.local",
    port: 8080,
  });

  await proxiesDb.assignProxyToScope("global", null, proxy.id);

  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const insertLog = db.prepare(`
    INSERT INTO proxy_logs (
      id, timestamp, status, proxy_type, proxy_host, proxy_port, latency_ms
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertLog.run("proxy-log-1", now, "success", "http", "stats.local", 8080, 100);
  insertLog.run("proxy-log-2", now, "error", "http", "stats.local", 8080, 250);
  insertLog.run("proxy-log-3", now, "timeout", "http", "stats.local", 8080, 400);

  const stats = await proxiesDb.getProxyHealthStats({ hours: 2 });

  assert.deepEqual(stats[0], {
    proxyId: proxy.id,
    name: "Stats Proxy",
    type: "http",
    host: "stats.local",
    port: 8080,
    totalRequests: 3,
    successCount: 1,
    errorCount: 1,
    timeoutCount: 1,
    successRate: 33.33,
    avgLatencyMs: 250,
    lastSeenAt: now,
  });

  assert.equal(await proxiesDb.deleteProxyById(proxy.id, { force: true }), true);
  assert.equal((await proxiesDb.getProxyAssignments()).length, 0);
  assert.equal(await proxiesDb.getProxyById(proxy.id), null);
});
