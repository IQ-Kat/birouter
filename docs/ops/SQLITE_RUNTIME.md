---
title: "SQLite Runtime Resolution"
---

# SQLite Runtime Resolution

Birouter resolves its SQLite driver at startup through a 5-step fallback chain:

1. **Bundled `better-sqlite3`** (via `dependencies` in `package.json`)
   — fastest, native binary, installed by `npm install` when build tools are present.

2. **Runtime-installed `better-sqlite3`** (in `~/.birouter/runtime/`)
   — installed lazily on first run **OR** by `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Validates native `.node` magic bytes (ELF / Mach-O / PE) before loading
   to guard against corrupt or wrong-platform binaries.

3. **`node:sqlite`** (Node ≥22.5 stdlib) — no native build needed; used when
   both better-sqlite3 paths fail. Limited feature set.

4. **`sql.js`** (WASM) — final fallback. Works everywhere but is slower
   and writes data on an interval rather than synchronously.

## Why this complexity?

- **Windows EBUSY**: `npm install -g birouter@latest` can fail if the previous
  version's `better_sqlite3.node` is locked by a running process. The runtime
  install in `~/.birouter/runtime/` sidesteps the global npm cache.
- **No build tools**: Some environments (corporate Windows without VS Build
  Tools, minimal Docker images) cannot compile `better-sqlite3`. The runtime
  installer resolves a pre-built binary from the npm registry; the fallback
  drivers ensure Birouter still boots even if that fails.
- **Air-gapped systems**: If the npm registry is unreachable, `node:sqlite`
  or `sql.js` guarantee baseline functionality.

## Magic-byte validation

Before loading a runtime-installed `.node` file, Birouter reads the first 8
bytes and matches against known platform magics:

| Platform              | Bytes (hex)   | Label       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

A mismatched magic → file is ignored, fallback continues to the next step.

## Checking the active driver

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manual control

```bash
# Skip postinstall warm-up (for fast CI installs)
BIROUTER_SKIP_POSTINSTALL=1 npm install -g birouter

# Force-reinstall runtime better-sqlite3
rm -rf ~/.birouter/runtime
birouter  # will reinstall on next start

# Check what driver is active
birouter config db-info  # (if CLI command exists)
```

## Reference

Implementation:

- `bin/cli/runtime/magicBytes.mjs` — binary magic-byte validation helpers
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-step runtime resolver + lazy installer
- `bin/cli/runtime/index.mjs` — startup orchestrator (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm post-install hook (non-fatal warm-up)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` exports
