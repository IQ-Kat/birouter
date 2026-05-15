import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir, platform } from "node:os";

export async function runResetEncryptedColumns(argv) {
  const dataDir = (() => {
    const configured = process.env.DATA_DIR?.trim();
    if (configured) return configured;
    if (platform() === "win32") {
      const appData = process.env.APPDATA || join(homedir(), "AppData", "Roaming");
      return join(appData, "omniroute");
    }
    const xdg = process.env.XDG_CONFIG_HOME?.trim();
    if (xdg) return join(xdg, "omniroute");
    return join(homedir(), ".omniroute");
  })();

  const dbPath = join(dataDir, "storage.sqlite");

  if (!existsSync(dbPath)) {
    console.log(`\x1b[33m⚠ No database found at ${dbPath}\x1b[0m`);
    return 0;
  }

  const force = argv.includes("--force");
  if (!force) {
    console.log(`
  \x1b[1m\x1b[33m⚠ WARNING: This will erase all encrypted credentials\x1b[0m

  This command will NULL out the following columns in provider_connections:
    • api_key
    • access_token
    • refresh_token
    • id_token

  Provider metadata (name, provider_id, settings) will be preserved.
  You will need to re-authenticate all providers after this operation.

  Database: ${dbPath}

  \x1b[1mTo confirm, run:\x1b[0m
    omniroute reset-encrypted-columns --force
    `);
    return 0;
  }

  try {
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);

    const countResult = db
      .prepare(
        `SELECT COUNT(*) as cnt FROM provider_connections
         WHERE api_key LIKE 'enc:v1:%'
            OR access_token LIKE 'enc:v1:%'
            OR refresh_token LIKE 'enc:v1:%'
            OR id_token LIKE 'enc:v1:%'`
      )
      .get();

    const affected = countResult?.cnt ?? 0;

    if (affected === 0) {
      console.log("\x1b[32m✔ No encrypted credentials found — nothing to reset.\x1b[0m");
      db.close();
      return 0;
    }

    const result = db
      .prepare(
        `UPDATE provider_connections
            SET api_key = NULL,
                access_token = NULL,
                refresh_token = NULL,
                id_token = NULL
          WHERE api_key LIKE 'enc:v1:%'
             OR access_token LIKE 'enc:v1:%'
             OR refresh_token LIKE 'enc:v1:%'
             OR id_token LIKE 'enc:v1:%'`
      )
      .run();

    db.close();

    console.log(
      `\x1b[32m✔ Reset ${result.changes} provider connection(s).\x1b[0m\n` +
        `  Re-authenticate your providers in the dashboard or re-add API keys.\n`
    );
    return 0;
  } catch (err) {
    console.error(`\x1b[31m✖ Failed to reset encrypted columns:\x1b[0m ${err.message || err}`);
    return 1;
  }
}
