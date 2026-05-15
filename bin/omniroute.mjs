#!/usr/bin/env node

/**
 * OmniRoute CLI entry point.
 *
 * Special bypasses (handled before Commander):
 *   --mcp                     Start MCP server over stdio
 *   reset-encrypted-columns   Recovery tool for broken encrypted credentials
 *
 * All other commands are routed through Commander (bin/cli/program.mjs).
 */

import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { homedir, platform } from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

function loadEnvFile() {
  const envPaths = [];

  if (process.env.DATA_DIR) {
    envPaths.push(join(process.env.DATA_DIR, ".env"));
  }

  const home = homedir();
  if (home) {
    if (platform() === "win32") {
      const appData = process.env.APPDATA || join(home, "AppData", "Roaming");
      envPaths.push(join(appData, "omniroute", ".env"));
    } else {
      envPaths.push(join(home, ".omniroute", ".env"));
    }
  }

  envPaths.push(join(process.cwd(), ".env"));
  envPaths.push(join(ROOT, ".env"));

  for (const envPath of envPaths) {
    try {
      if (existsSync(envPath)) {
        const content = readFileSync(envPath, "utf-8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            const value = trimmed.slice(eqIdx + 1).trim();
            if (process.env[key] === undefined) {
              process.env[key] = value.replace(/^["']|["']$/g, "");
            }
          }
        }
        console.log(`  \x1b[2m📋 Loaded env from ${envPath}\x1b[0m`);
        return;
      }
    } catch {
      // Ignore errors reading env files.
    }
  }
}

loadEnvFile();

if (process.argv.includes("--mcp")) {
  try {
    const { startMcpCli } = await import(pathToFileURL(join(ROOT, "bin", "mcp-server.mjs")).href);
    await startMcpCli(ROOT);
  } catch (err) {
    console.error("\x1b[31m✖ Failed to start MCP server:\x1b[0m", err.message || err);
    process.exit(1);
  }
  process.exit(0);
}

if (process.argv.includes("reset-encrypted-columns")) {
  const { runResetEncryptedColumns } = await import(
    pathToFileURL(join(ROOT, "bin", "cli", "commands", "reset-encrypted-columns.mjs")).href
  );
  const exitCode = await runResetEncryptedColumns(process.argv.slice(2));
  process.exit(exitCode ?? 0);
}

try {
  const { createProgram } = await import(
    pathToFileURL(join(ROOT, "bin", "cli", "program.mjs")).href
  );
  const program = createProgram();
  await program.parseAsync(process.argv);
} catch (err) {
  if (err.exitCode !== undefined) process.exit(err.exitCode);
  console.error("\x1b[31m✖", err.message, "\x1b[0m");
  process.exit(1);
}
