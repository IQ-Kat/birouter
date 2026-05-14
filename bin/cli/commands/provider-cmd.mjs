import { parseArgs, getStringFlag, hasFlag } from "../args.mjs";
import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { resolveDataDir, resolveStoragePath } from "../data-dir.mjs";
import path from "node:path";
import fs from "node:fs";

function printProviderHelp() {
  console.log(`
Usage:
  omniroute provider add <name> [options]    Add a provider connection
  omniroute provider list                     List configured providers
  omniroute provider remove <name|id>        Remove a provider connection
  omniroute provider test <name|id>          Test a provider connection
  omniroute provider default <name|id>       Set default provider

Options:
  --provider <id>           Provider id (e.g., openai, anthropic, omniroute)
  --api-key <key>           API key for the provider
  --provider-name <name>    Display name for the connection
  --default-model <model>   Default model to use
  --base-url <url>          Custom base URL override
  --json                    Output as JSON
  --yes                     Skip confirmation
  --help                    Show this help
`);
}

export async function runProviderCommand(argv) {
  const { flags, positionals } = parseArgs(argv);

  if (hasFlag(flags, "help") || hasFlag(flags, "h") || positionals.length === 0) {
    printProviderHelp();
    return 0;
  }

  const subcommand = positionals[0];

  if (subcommand === "add") {
    const providerName = positionals[1] || getStringFlag(flags, "provider");
    const apiKey = getStringFlag(flags, "api-key");
    const displayName = getStringFlag(flags, "provider-name");
    const defaultModel = getStringFlag(flags, "default-model");
    const baseUrl = getStringFlag(flags, "base-url");

    if (!providerName) {
      printError("Provider name required. Usage: omniroute provider add <name>");
      return 1;
    }

    if (providerName === "omniroute") {
      // Special case: add OmniRoute as a provider in OpenCode config
      const opencodePath = path.join(
        process.env.HOME || os.homedir(),
        ".config",
        "opencode",
        "opencode.json"
      );
      const { generateConfig } =
        await import("../../../src/lib/cli-helper/config-generator/index.js");
      const result = await generateConfig("opencode", {
        baseUrl: baseUrl || "http://localhost:20128/v1",
        apiKey: apiKey || "",
      });

      if (!result.success) {
        printError(result.error || "Failed to generate config");
        return 1;
      }

      if (!hasFlag(flags, "yes")) {
        console.log(`\n  About to write OpenCode config to: ${opencodePath}`);
        console.log(`  Content:\n`);
        console.log(result.content);
        console.log("");
        const readline = await import("node:readline");
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        const answer = await new Promise((resolve) => rl.question("Proceed? [y/N] ", resolve));
        rl.close();
        if (!/^y(es)?$/i.test(answer)) {
          printInfo("Aborted.");
          return 0;
        }
      }

      const dir = path.dirname(opencodePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(opencodePath, result.content, "utf-8");
      printSuccess(`OpenCode config written to ${opencodePath}`);
      return 0;
    }

    // Generic provider addition via SQLite
    const dbPath = resolveStoragePath(resolveDataDir());
    if (!fs.existsSync(dbPath)) {
      printError("Database not found. Run `omniroute setup` first.");
      return 1;
    }

    const { default: Database } = await import("better-sqlite3");
    const db = new Database(dbPath);

    try {
      const stmt = db.prepare(`
        INSERT INTO provider_connections (provider, name, api_key, default_model, provider_specific_data)
        VALUES (?, ?, ?, ?, ?)
      `);
      const specificData = baseUrl ? JSON.stringify({ baseUrl }) : null;
      stmt.run(
        providerName,
        displayName || providerName,
        apiKey || "",
        defaultModel || null,
        specificData
      );
      printSuccess(`Provider "${displayName || providerName}" added`);
    } finally {
      db.close();
    }

    return 0;
  }

  if (subcommand === "list") {
    const dbPath = resolveStoragePath(resolveDataDir());
    if (!fs.existsSync(dbPath)) {
      if (isJson()) console.log(JSON.stringify([]));
      else printInfo("No database found. Run `omniroute setup` first.");
      return 0;
    }

    const { default: Database } = await import("better-sqlite3");
    const db = new Database(dbPath);
    try {
      const rows = db
        .prepare("SELECT id, provider, name, default_model FROM provider_connections")
        .all();
      if (isJson()) {
        console.log(JSON.stringify(rows, null, 2));
      } else {
        printHeading("Configured Providers");
        for (const r of rows) {
          console.log(
            `  [${r.id}] ${r.name} (${r.provider})${r.default_model ? ` — model: ${r.default_model}` : ""}`
          );
        }
      }
    } finally {
      db.close();
    }
    return 0;
  }

  if (subcommand === "remove") {
    const target = positionals[1];
    if (!target) {
      printError("Provider name or ID required. Usage: omniroute provider remove <name|id>");
      return 1;
    }

    const dbPath = resolveStoragePath(resolveDataDir());
    if (!fs.existsSync(dbPath)) {
      printError("Database not found.");
      return 1;
    }

    const { default: Database } = await import("better-sqlite3");
    const db = new Database(dbPath);
    try {
      const isId = /^\d+$/.test(target);
      const stmt = isId
        ? db.prepare("DELETE FROM provider_connections WHERE id = ?")
        : db.prepare("DELETE FROM provider_connections WHERE name = ? OR provider = ?");
      const result = stmt.run(isId ? parseInt(target, 10) : target);
      if (result.changes > 0) {
        printSuccess(`Removed ${result.changes} provider(s)`);
      } else {
        printError("Provider not found");
      }
    } finally {
      db.close();
    }
    return 0;
  }

  if (subcommand === "test") {
    const target = positionals[1];
    if (!target) {
      printError("Provider name or ID required. Usage: omniroute provider test <name|id>");
      return 1;
    }

    const dbPath = resolveStoragePath(resolveDataDir());
    if (!fs.existsSync(dbPath)) {
      printError("Database not found.");
      return 1;
    }

    const { default: Database } = await import("better-sqlite3");
    const db = new Database(dbPath);
    try {
      const isId = /^\d+$/.test(target);
      const row = isId
        ? db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(parseInt(target, 10))
        : db
            .prepare("SELECT * FROM provider_connections WHERE name = ? OR provider = ?")
            .get(target);

      if (!row) {
        printError("Provider not found");
        return 1;
      }

      const { testProviderApiKey } = await import("../provider-test.mjs");
      const result = await testProviderApiKey({
        provider: row.provider,
        apiKey: row.api_key,
        defaultModel: row.default_model,
        baseUrl: row.provider_specific_data ? JSON.parse(row.provider_specific_data).baseUrl : null,
      });

      if (isJson()) {
        console.log(JSON.stringify(result, null, 2));
      } else if (result.valid) {
        printSuccess(`Provider "${row.name}" is reachable`);
      } else {
        printError(`Provider test failed: ${result.error || "unknown error"}`);
      }
    } finally {
      db.close();
    }
    return 0;
  }

  if (subcommand === "default") {
    const target = positionals[1];
    if (!target) {
      printError("Provider name or ID required. Usage: omniroute provider default <name|id>");
      return 1;
    }

    const dbPath = resolveStoragePath(resolveDataDir());
    if (!fs.existsSync(dbPath)) {
      printError("Database not found.");
      return 1;
    }

    const { default: Database } = await import("better-sqlite3");
    const db = new Database(dbPath);
    try {
      const isId = /^\d+$/.test(target);
      const row = isId
        ? db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(parseInt(target, 10))
        : db
            .prepare("SELECT * FROM provider_connections WHERE name = ? OR provider = ?")
            .get(target);

      if (!row) {
        printError("Provider not found");
        return 1;
      }

      db.prepare("UPDATE provider_connections SET is_default = 0").run();
      db.prepare("UPDATE provider_connections SET is_default = 1 WHERE id = ?").run(row.id);
      printSuccess(`Default provider set to "${row.name}"`);
    } finally {
      db.close();
    }
    return 0;
  }

  printError(`Unknown subcommand: ${subcommand}`);
  printProviderHelp();
  return 1;
}

function isJson() {
  return process.argv.includes("--json");
}
