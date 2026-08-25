// Prevent the live WS server from auto-starting during unit test execution
process.env.BIROUTER_ENABLE_LIVE_WS = "0";

import test from "node:test";
import assert from "node:assert/strict";
import { getDbInstance } from "../../src/lib/db/core.ts";
import { authorizeConnection } from "../../src/server/ws/liveServer.ts";
import type { IncomingMessage } from "node:http";

// Clear settings table helper
function clearSettings(db: ReturnType<typeof getDbInstance>) {
  db.prepare("DELETE FROM key_value WHERE namespace = 'settings'").run();
}

// Insert setting helper
function setSetting(db: ReturnType<typeof getDbInstance>, key: string, value: unknown) {
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', ?, ?)"
  ).run(key, JSON.stringify(value));
}

test("LiveWS Auth Settings: bypasses auth when wsAuth is false", async () => {
  const db = getDbInstance();
  clearSettings(db);
  setSetting(db, "wsAuth", false);
  setSetting(db, "setupComplete", true);
  setSetting(db, "requireLogin", true);

  const mockRequest = {
    headers: {},
    socket: {},
  } as unknown as IncomingMessage;

  const result = await authorizeConnection(mockRequest);
  assert.equal(result.authorized, true);
});

test("LiveWS Auth Settings: bypasses auth when setupComplete is false", async () => {
  const db = getDbInstance();
  clearSettings(db);
  setSetting(db, "wsAuth", true);
  setSetting(db, "setupComplete", false);
  setSetting(db, "requireLogin", true);

  const mockRequest = {
    headers: {},
    socket: {},
  } as unknown as IncomingMessage;

  const result = await authorizeConnection(mockRequest);
  assert.equal(result.authorized, true);
});

test("LiveWS Auth Settings: bypasses auth when requireLogin is false", async () => {
  const db = getDbInstance();
  clearSettings(db);
  setSetting(db, "wsAuth", true);
  setSetting(db, "setupComplete", true);
  setSetting(db, "requireLogin", false);

  const mockRequest = {
    headers: {},
    socket: {},
  } as unknown as IncomingMessage;

  const result = await authorizeConnection(mockRequest);
  assert.equal(result.authorized, true);
});

test("LiveWS Auth Settings: requires auth when wsAuth, setupComplete, and requireLogin are true", async () => {
  const db = getDbInstance();
  clearSettings(db);
  setSetting(db, "wsAuth", true);
  setSetting(db, "setupComplete", true);
  setSetting(db, "requireLogin", true);

  const mockRequest = {
    headers: {},
    socket: {},
  } as unknown as IncomingMessage;

  const result = await authorizeConnection(mockRequest);
  assert.equal(result.authorized, false);
  assert.equal(result.error, "Missing token");
});
