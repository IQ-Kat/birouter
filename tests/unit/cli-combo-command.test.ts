import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FETCH = globalThis.fetch;

interface ComboRow {
  id: number;
  name: string;
  strategy: string;
  enabled: number;
}

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-combo-"));
}

function initComboTable(dbPath: string) {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.prepare(
    "CREATE TABLE IF NOT EXISTS key_value (namespace TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, PRIMARY KEY (namespace, key))"
  ).run();
  db.prepare(
    "CREATE TABLE IF NOT EXISTS combos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, strategy TEXT, enabled INTEGER DEFAULT 1, target_count INTEGER DEFAULT 0)"
  ).run();
  db.close();
}

async function withComboEnv(fn: (dataDir: string, dbPath: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  const dbPath = path.join(dataDir, "storage.sqlite");
  process.env.DATA_DIR = dataDir;
  globalThis.fetch = (async () => {
    throw new Error("server offline");
  }) as typeof fetch;

  initComboTable(dbPath);

  const originalLog = console.log;
  console.log = () => {};

  try {
    await fn(dataDir, dbPath);
  } finally {
    console.log = originalLog;
    globalThis.fetch = ORIGINAL_FETCH;
    fs.rmSync(dataDir, { recursive: true, force: true });

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
}

test("combo create inserts a new combo row", async () => {
  await withComboEnv(async (_dataDir, dbPath) => {
    const { runComboCreateCommand } = await import("../../bin/cli/commands/combo.mjs");

    const result = await runComboCreateCommand("my-combo", "priority", {});
    assert.equal(result, 0);

    const db = new Database(dbPath);
    const row = db
      .prepare("SELECT name, strategy, enabled FROM combos WHERE name = ?")
      .get("my-combo") as ComboRow | undefined;
    db.close();

    assert.ok(row);
    assert.equal(row.name, "my-combo");
    assert.equal(row.strategy, "priority");
    assert.equal(row.enabled, 1);
  });
});

test("combo create fails if combo already exists", async () => {
  await withComboEnv(async () => {
    const { runComboCreateCommand } = await import("../../bin/cli/commands/combo.mjs");

    await runComboCreateCommand("dup-combo", "auto", {});
    const originalError = console.error;
    console.error = () => {};
    const result = await runComboCreateCommand("dup-combo", "auto", {});
    console.error = originalError;

    assert.equal(result, 1);
  });
});

test("combo delete removes the row", async () => {
  await withComboEnv(async (_dataDir, dbPath) => {
    const { runComboCreateCommand, runComboDeleteCommand } =
      await import("../../bin/cli/commands/combo.mjs");

    await runComboCreateCommand("to-delete", "weighted", {});
    const result = await runComboDeleteCommand("to-delete", { yes: true });
    assert.equal(result, 0);

    const db = new Database(dbPath);
    const row = db.prepare("SELECT id FROM combos WHERE name = ?").get("to-delete");
    db.close();
    assert.equal(row, undefined);
  });
});

test("combo list returns 0 with empty combos table", async () => {
  await withComboEnv(async () => {
    const { runComboListCommand } = await import("../../bin/cli/commands/combo.mjs");
    const result = await runComboListCommand({});
    assert.equal(result, 0);
  });
});

test("combo switch updates key_value settings when server is offline", async () => {
  await withComboEnv(async (_dataDir, dbPath) => {
    const { runComboCreateCommand, runComboSwitchCommand } =
      await import("../../bin/cli/commands/combo.mjs");

    await runComboCreateCommand("my-switch", "round-robin", {});
    const result = await runComboSwitchCommand("my-switch", {});
    assert.equal(result, 0);

    const db = new Database(dbPath);
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'activeCombo'")
      .get() as { value: string } | undefined;
    db.close();

    assert.ok(row);
    assert.equal(JSON.parse(row.value), "my-switch");
  });
});
