import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { t } from "../i18n.mjs";
import path from "node:path";
import fs from "node:fs";
import { registerContexts } from "./contexts.mjs";

function ensureBackup(configPath) {
  if (!fs.existsSync(configPath)) return;
  const backupDir = path.join(path.dirname(configPath), ".omniroute.bak");
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, path.basename(configPath) + ".bak");
  fs.copyFileSync(configPath, backupPath);
  return backupPath;
}

async function runConfigListCommand(opts = {}) {
  const { detectAllTools } = await import("../../../src/lib/cli-helper/tool-detector.js");
  const tools = await detectAllTools();

  if (opts.json) {
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

async function runConfigGetCommand(toolId, opts = {}) {
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
  if (opts.json) {
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

async function runConfigSetCommand(toolId, opts = {}) {
  if (!toolId) {
    printError("Tool ID required. Usage: omniroute config set <tool> [options]");
    return 1;
  }

  const baseUrl = opts.baseUrl || "http://localhost:20128/v1";
  const apiKey = opts.apiKey;
  const model = opts.model;

  if (!apiKey) {
    printError("API key required. Use --api-key or set OMNIROUTE_API_KEY.");
    return 1;
  }

  const { generateConfig } = await import("../../../src/lib/cli-helper/config-generator/index.js");
  const result = await generateConfig(toolId, { baseUrl, apiKey, model });

  if (!result.success) {
    printError(result.error || "Failed to generate config");
    return 1;
  }

  const nonInteractive = opts.nonInteractive || opts.yes;

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

async function runConfigValidateCommand(toolId, opts = {}) {
  if (!toolId) {
    printError("Tool ID required. Usage: omniroute config validate <tool>");
    return 1;
  }

  const baseUrl = opts.baseUrl || "http://localhost:20128/v1";
  const apiKey = opts.apiKey || "test-key";
  const model = opts.model;

  const { generateConfig } = await import("../../../src/lib/cli-helper/config-generator/index.js");
  const result = await generateConfig(toolId, { baseUrl, apiKey, model });

  if (!result.success) {
    printError(`Validation failed: ${result.error}`);
    return 1;
  }

  printSuccess(`Config for ${toolId} is valid`);
  if (opts.json) {
    console.log(JSON.stringify({ valid: true, content: result.content }, null, 2));
  }
  return 0;
}

export function registerConfig(program) {
  const config = program.command("config").description("Show or update CLI tool configuration");

  config
    .command("list")
    .description("List all CLI tools and config status")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runConfigListCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  config
    .command("get <tool>")
    .description("Show current config for a tool")
    .option("--json", "Output as JSON")
    .action(async (tool, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runConfigGetCommand(tool, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  config
    .command("set <tool>")
    .description("Write config for a tool")
    .option("--base-url <url>", "OmniRoute API base URL", "http://localhost:20128/v1")
    .option("--api-key <key>", "API key for the tool")
    .option("--model <model>", "Model identifier (where applicable)")
    .option("--non-interactive", "Do not prompt for confirmation")
    .option("--yes", "Skip confirmation prompt")
    .action(async (tool, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runConfigSetCommand(tool, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  config
    .command("validate <tool>")
    .description("Validate config format without writing")
    .option("--base-url <url>", "OmniRoute API base URL", "http://localhost:20128/v1")
    .option("--api-key <key>", "API key for the tool")
    .option("--model <model>", "Model identifier (where applicable)")
    .option("--json", "Output as JSON")
    .action(async (tool, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runConfigValidateCommand(tool, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  // Register contexts/profiles CRUD as a subgroup of config.
  registerContexts(config);
}
