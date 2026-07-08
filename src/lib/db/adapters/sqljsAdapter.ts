// src/lib/db/adapters/sqljsAdapter.ts
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SqliteAdapter, PreparedStatement, RunResult } from "./types";

const SAVE_DEBOUNCE_MS = 100;
const CHECKPOINT_INTERVAL_MS = 60_000;

let _sqlJsLib: Awaited<ReturnType<(typeof import("sql.js"))["default"]>> | null = null;

function resolveSqlJsWasmPath(): string {
  // Resolve the directory of this compiled adapter file so that we can locate
  // sql-wasm.wasm relative to the package itself. This works for both local dev
  // (src/) and globally-installed builds (e.g. npm install -g birouter on Termux/VPS)
  // where process.cwd() is the user's working directory, not the package root.
  let packageRelativePaths: string[] = [];
  try {
    const adapterDir = path.dirname(fileURLToPath(import.meta.url));
    // Walk up from the adapter file looking for node_modules/sql.js — covers
    // both src/lib/db/adapters/ (dev) and any dist/ layout (production).
    let dir = adapterDir;
    for (let i = 0; i < 10; i++) {
      const candidate = path.join(dir, "node_modules", "sql.js", "dist", "sql-wasm.wasm");
      packageRelativePaths.push(candidate);
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  } catch {
    // import.meta.url unavailable in some CJS contexts — skip gracefully
  }

  const candidatePaths = [
    path.join(process.cwd(), "node_modules", "sql.js", "dist", "sql-wasm.wasm"),
    path.join(
      process.cwd(),
      ".next",
      "standalone",
      "node_modules",
      "sql.js",
      "dist",
      "sql-wasm.wasm"
    ),
    ...packageRelativePaths,
  ];

  for (const candidatePath of candidatePaths) {
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  return candidatePaths[0];
}

async function loadSqlJs(): Promise<typeof _sqlJsLib> {
  if (_sqlJsLib) return _sqlJsLib;
  const initSqlJs = ((await import("sql.js")) as { default: (typeof import("sql.js"))["default"] })
    .default;
  const wasmPath = resolveSqlJsWasmPath();

  _sqlJsLib = await initSqlJs({
    locateFile(fileName) {
      if (fileName === "sql-wasm.wasm") {
        return wasmPath;
      }
      return fileName;
    },
  });
  return _sqlJsLib;
}

export async function createSqlJsAdapter(filePath: string): Promise<SqliteAdapter> {
  const SQLLib = await loadSqlJs();
  if (!SQLLib) throw new Error("[sqljsAdapter] Failed to load sql.js");

  const buf = filePath !== ":memory:" && fs.existsSync(filePath) ? fs.readFileSync(filePath) : null;
  const db = new SQLLib.Database(buf ? new Uint8Array(buf) : undefined);

  // sql.js operates entirely in WASM memory and exports the full database on every save.
  // If WAL mode is set (e.g. by birouter's startup PRAGMA), it gets embedded in the exported
  // file header. On the next startup, sql.js tries to open the file as WAL but has no WAL
  // file on disk → fails with "out of memory". Force DELETE (classic) journal mode here so
  // the exported file is always in a format sql.js can reliably read back.
  db.run("PRAGMA journal_mode = DELETE;");

  let dirty = false;
  let saveTimer: ReturnType<typeof setTimeout> | null = null;
  let _isOpen = true;

  function persist(): void {
    if (filePath === ":memory:") return;
    if (!_isOpen) return; // Guard: don't call db.export() after close
    const data = db.export();
    // Atomic write: write to a .tmp file first, then rename.
    // This ensures a Ctrl+C during the write never leaves a partial/corrupt file.
    const tmpPath = filePath + ".tmp";
    fs.writeFileSync(tmpPath, Buffer.from(data));
    fs.renameSync(tmpPath, filePath);
    dirty = false;
  }

  function scheduleSave(): void {
    dirty = true;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTimer = null;
      if (dirty) {
        try {
          persist();
        } catch (e) {
          console.error("[sqljsAdapter] save failed:", e);
        }
      }
    }, SAVE_DEBOUNCE_MS);
  }

  function runSavepoint<T>(fn: (...args: unknown[]) => T, ...args: unknown[]): T {
    const sp = `sp_${Math.random().toString(36).slice(2)}`;
    db.run(`SAVEPOINT "${sp}"`);
    try {
      const result = fn(...args);
      db.run(`RELEASE "${sp}"`);
      scheduleSave();
      return result;
    } catch (err) {
      try {
        db.run(`ROLLBACK TO "${sp}"`);
        db.run(`RELEASE "${sp}"`);
      } catch {}
      throw err;
    }
  }

  function makeStatement(sql: string): PreparedStatement {
    return {
      run(...params: unknown[]): RunResult {
        const stmt = db.prepare(sql);
        try {
          if (params.length) stmt.bind(params as unknown[]);
          stmt.step();
          const changes = db.getRowsModified();
          const lastRows = db.exec("SELECT last_insert_rowid() as id");
          const lastInsertRowid = (lastRows[0]?.values?.[0]?.[0] as number | null | undefined) ?? 0;
          scheduleSave();
          return { changes, lastInsertRowid };
        } finally {
          stmt.free();
        }
      },
      get(...params: unknown[]): unknown {
        const stmt = db.prepare(sql);
        try {
          if (params.length) stmt.bind(params as unknown[]);
          if (stmt.step()) return stmt.getAsObject();
          return undefined;
        } finally {
          stmt.free();
        }
      },
      all(...params: unknown[]): unknown[] {
        const stmt = db.prepare(sql);
        try {
          if (params.length) stmt.bind(params as unknown[]);
          const rows: unknown[] = [];
          while (stmt.step()) rows.push(stmt.getAsObject());
          return rows;
        } finally {
          stmt.free();
        }
      },
    };
  }

  const checkpointTimer = setInterval(() => {
    if (dirty)
      try {
        persist();
      } catch {}
  }, CHECKPOINT_INTERVAL_MS);
  (checkpointTimer as unknown as NodeJS.Timeout).unref?.();

  function gracefulClose(): void {
    clearInterval(checkpointTimer as unknown as NodeJS.Timeout);
    if (saveTimer) clearTimeout(saveTimer);
    if (dirty)
      try {
        persist();
      } catch {}
    try {
      db.close();
    } catch {}
    _isOpen = false;
  }

  const flush = (): void => {
    if (dirty && _isOpen)
      try {
        persist();
      } catch {}
  };
  process.on("beforeExit", flush);
  process.on("SIGINT", flush);
  process.on("SIGTERM", flush);

  return {
    driver: "sql.js",

    get open() {
      return _isOpen;
    },

    get name() {
      return filePath;
    },

    prepare(sql: string): PreparedStatement {
      return makeStatement(sql);
    },

    exec(sql: string): void {
      db.run(sql);
      scheduleSave();
    },

    pragma(pragmaStr: string, options?: { simple?: boolean }): unknown {
      const result = db.exec(`PRAGMA ${pragmaStr}`);
      if (!result.length) return null;
      const rows = result[0];
      if (options?.simple) {
        return rows.values?.[0]?.[0] ?? null;
      }
      return (rows.values ?? []).map((row: unknown[]) =>
        Object.fromEntries(rows.columns.map((col: string, i: number) => [col, row[i]]))
      );
    },

    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T {
      return (...args: unknown[]) => runSavepoint(fn, ...args);
    },

    immediate(fn: () => void): void {
      runSavepoint(() => fn());
    },

    async backup(destination: string): Promise<void> {
      if (dirty) persist();
      if (filePath !== ":memory:") fs.copyFileSync(filePath, destination);
    },

    checkpoint(_mode = "TRUNCATE"): void {
      if (dirty)
        try {
          persist();
        } catch {}
    },

    close(): void {
      gracefulClose();
    },

    get raw() {
      return db;
    },
  };
}
