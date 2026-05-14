import { parseArgs, getStringFlag, hasFlag } from "../args.mjs";
import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { resolveDataDir } from "../data-dir.mjs";
import path from "node:path";
import fs from "node:fs";

function printConfigHelp() {
  console.log(`
Usage:
  omniroute config list                    List all CLI tools and config status
  omniroute config get <tool>              Show current config for a tool
  omniroute config set <tool> [options]    Write config for a tool
  omniroute config validate <tool>         Validate config format without writing

Options:
  --base-url <url>     OmniRoute API base URL (default: http://localhost:20128/v1)
  --api-key <key>      API key for the tool
  --model <model>      Model identifier (where applicable)
  --json               Output as JSON
  --non-interactive    Do not prompt for confirmation
  --yes                Skip confirmation prompt
  --help               Show this help

Tools: claude, codex, opencode, cline, kilocode, continue
`);
}

function ensureBackup(configPath) {
  if (!fs.existsSync(configPath)) return;
  const backupDir = path.join(path.dirname(configPath), ".omniroute.bak");
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, path.basename(configPath) + ".bak");
  fs.copyFileSync(configPath, backupPath);
  return backupPath;
}

export async function runConfigCommand(argv) {
  const { flags, positionals } = parseArgs(argv);

  if (hasFlag(flags, "help") || hasFlag(flags, "h") || positionals.length === 0) {
    printConfigHelp();
    return 0;
  }

  const subcommand = positionals[0];
  const toolId = positionals[1];

  if (subcommand === "list") {
    const { detectAllTools } = await import("../../../src/lib/cli-helper/tool-detector.js");
    const tools = await detectAllTools();

    if (hasFlag(flags, "json")) {
      console.log(JSON.stringify(tools, null, 2));
    } else {
      printHeading("CLI Tool Configuration Status");
      for (const t of tools) {
        const status = t.configured
          ? "✓ Configured"
          : t.installed
            ? "✗ Not configured"
            : "✗ Not installed";
        console.log(`  ${t.name.padEnd(14)} ${status}`);
        if (t.version) console.log(`    version: ${t.version}`);
        console.log(`    config:  ${t.configPath}`);
      }
    }
    return 0;
  }

  if (subcommand === "get") {
    if (!toolId) {
      printError("Tool ID required. Usage: omniroute config get <tool>");
      return 1;
    }
    const { detectTool } = await import("../../../src/lib/cli-helper/tool-detector.js");
    const tool = await detectTool(toolId);
    if (!tool) {
      printError(`Unknown tool: ${toolId}`);
      return 1;
    }
    if (hasFlag(flags, "json")) {
      console.log(JSON.stringify(tool, null, 2));
    } else {
      printHeading(`${tool.name} Configuration`);
      console.log(`  Installed:  ${tool.installed ? "Yes" : "No"}`);
      console.log(`  Configured: ${tool.configured ? "Yes" : "No"}`);
      console.log(`  Config:     ${tool.configPath}`);
      if (tool.version) console.log(`  Version:    ${tool.version}`);
      if (tool.configContents) {
        console.log(`\n  Contents:`);
        console.log(tool.configContents);
      }
    }
    return 0;
  }

  if (subcommand === "set") {
    if (!toolId) {
      printError("Tool ID required. Usage: omniroute config set <tool> [options]");
      return 1;
    }

    const baseUrl =
      getStringFlag(flags, "base-url", "OMNIROUTE_BASE_URL") || "http://localhost:20128/v1";
    const apiKey = getStringFlag(flags, "api-key", "OMNIROUTE_API_KEY");
    const model = getStringFlag(flags, "model");

    if (!apiKey) {
      printError("API key required. Use --api-key or set OMNIROUTE_API_KEY.");
      return 1;
    }

    const { generateConfig } =
      await import("../../../src/lib/cli-helper/config-generator/index.js");
    const result = await generateConfig(toolId, { baseUrl, apiKey, model });

    if (!result.success) {
      printError(result.error || "Failed to generate config");
      return 1;
    }

    const nonInteractive = hasFlag(flags, "non-interactive") || hasFlag(flags, "yes");

    if (!nonInteractive) {
      console.log(`\n  About to write config to: ${result.configPath}`);
      console.log(`  Content preview:\n`);
      console.log(result.content);
      console.log("");

      const readline = await import("node:readline");
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const answer = await new Promise((resolve) => rl.question("Proceed? [y/N] ", resolve));
      rl.close();

      if (!/^y(es)?$/i.test(answer)) {
        console.log("Aborted.");
        return 0;
      }
    }

    const dir = path.dirname(result.configPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const backupPath = ensureBackup(result.configPath);
    if (backupPath) printInfo(`Backup saved to: ${backupPath}`);

    fs.writeFileSync(result.configPath, result.content, "utf-8");
    printSuccess(`Config written to ${result.configPath}`);
    return 0;
  }

  if (subcommand === "validate") {
    if (!toolId) {
      printError("Tool ID required. Usage: omniroute config validate <tool>");
      return 1;
    }

    const baseUrl =
      getStringFlag(flags, "base-url", "OMNIROUTE_BASE_URL") || "http://localhost:20128/v1";
    const apiKey = getStringFlag(flags, "api-key", "OMNIROUTE_API_KEY") || "test-key";
    const model = getStringFlag(flags, "model");

    const { generateConfig } =
      await import("../../../src/lib/cli-helper/config-generator/index.js");
    const result = await generateConfig(toolId, { baseUrl, apiKey, model });

    if (!result.success) {
      printError(`Validation failed: ${result.error}`);
      return 1;
    }

    printSuccess(`Config for ${toolId} is valid`);
    if (hasFlag(flags, "json")) {
      console.log(JSON.stringify({ valid: true, content: result.content }, null, 2));
    }
    return 0;
  }

  printError(`Unknown subcommand: ${subcommand}`);
  printConfigHelp();
  return 1;
}
