import { printHeading } from "../io.mjs";
import { getAvailableProviderCategories, loadAvailableProviders } from "../provider-catalog.mjs";
import { testProviderApiKey } from "../provider-test.mjs";
import {
  findProviderConnection,
  getProviderApiKey,
  listProviderConnections,
  updateProviderTestResult,
} from "../provider-store.mjs";
import { openOmniRouteDb } from "../sqlite.mjs";
import { t } from "../i18n.mjs";

function publicConnection(connection) {
  return {
    id: connection.id,
    provider: connection.provider,
    name: connection.name,
    authType: connection.authType,
    isActive: connection.isActive,
    testStatus: connection.testStatus,
    lastTested: connection.lastTested,
    lastError: connection.lastError,
    defaultModel: connection.defaultModel,
  };
}

function statusColor(status) {
  if (status === "active" || status === "success") return "\x1b[32m";
  if (status === "error" || status === "expired" || status === "unavailable") return "\x1b[31m";
  return "\x1b[33m";
}

function printProviderTable(connections) {
  if (connections.length === 0) {
    console.log("No providers configured.");
    return;
  }

  for (const connection of connections) {
    const shortId = connection.id.slice(0, 8);
    const status = connection.testStatus || "unknown";
    const color = statusColor(status);
    console.log(
      `${shortId.padEnd(10)} ${connection.provider.padEnd(14)} ${String(connection.name).padEnd(
        24
      )} ${color}${status}\x1b[0m`
    );
  }
}

function normalizeCategoryFilter(category) {
  const normalized = String(category || "")
    .trim()
    .toLowerCase()
    .replaceAll("_", "-");
  if (normalized === "apikey") return "api-key";
  return normalized;
}

function availableProviderNotes(provider) {
  const notes = [];
  if (provider.alias) notes.push(`alias:${provider.alias}`);
  if (provider.hasFree) notes.push("free");
  if (provider.passthroughModels) notes.push("passthrough");
  if (provider.deprecated) notes.push("deprecated");
  return notes.join(", ");
}

function publicAvailableProvider(provider) {
  return {
    id: provider.id,
    name: provider.name,
    category: provider.category,
    alias: provider.alias,
    website: provider.website,
    deprecated: provider.deprecated,
    hasFree: provider.hasFree,
    passthroughModels: provider.passthroughModels,
  };
}

function filterAvailableProviders(providers, opts) {
  const search = String(opts.search || opts.q || "")
    .trim()
    .toLowerCase();
  const category = normalizeCategoryFilter(opts.category);

  return providers.filter((provider) => {
    if (category && provider.category !== category) return false;
    if (!search) return true;

    return [provider.id, provider.name, provider.category, provider.alias]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(search));
  });
}

function printAvailableProviderTable(providers, categories) {
  if (providers.length === 0) {
    console.log("No available providers matched the filters.");
    return;
  }

  console.log(`${providers.length} providers available.`);
  console.log(`Categories: ${categories.join(", ")}`);
  console.log("Use --search <text> or --category <category> to filter.\n");
  console.log(`${"ID".padEnd(24)} ${"Category".padEnd(14)} ${"Name".padEnd(28)} Notes`);

  for (const provider of providers) {
    console.log(
      `${provider.id.padEnd(24)} ${provider.category.padEnd(14)} ${String(provider.name).padEnd(
        28
      )} ${availableProviderNotes(provider)}`
    );
  }
}

function buildTestInput(connection, apiKey) {
  return {
    provider: connection.provider,
    apiKey,
    defaultModel: connection.defaultModel,
    baseUrl: connection.providerSpecificData?.baseUrl || null,
  };
}

async function runProviderTest(db, connection) {
  try {
    const apiKey = getProviderApiKey(connection);
    const result = await testProviderApiKey(buildTestInput(connection, apiKey));
    updateProviderTestResult(db, connection.id, result);
    return {
      connection: publicConnection(connection),
      ...result,
    };
  } catch (error) {
    const result = {
      valid: false,
      error: error instanceof Error ? error.message : String(error),
      statusCode: null,
    };
    updateProviderTestResult(db, connection.id, result);
    return {
      connection: publicConnection(connection),
      ...result,
    };
  }
}

function validateConnection(connection) {
  const issues = [];
  const warnings = [];

  if (!connection.id) issues.push("Missing id");
  if (!connection.provider) issues.push("Missing provider");
  if (!connection.authType) warnings.push("Missing auth type");

  if (connection.authType === "apikey") {
    try {
      getProviderApiKey(connection);
    } catch (error) {
      issues.push(error instanceof Error ? error.message : String(error));
    }
  } else if (!connection.accessToken && !connection.refreshToken) {
    warnings.push("OAuth connection has no access or refresh token visible locally");
  }

  if (connection.providerSpecificData === null && connection.providerSpecificData !== undefined) {
    warnings.push("provider_specific_data is absent or not an object");
  }

  return {
    connection: publicConnection(connection),
    valid: issues.length === 0,
    issues,
    warnings,
  };
}

export async function runAvailableCommand(opts = {}) {
  const allProviders = loadAvailableProviders();
  const providers = filterAvailableProviders(allProviders, opts).map(publicAvailableProvider);
  const categories = getAvailableProviderCategories(allProviders);

  if (opts.json) {
    console.log(JSON.stringify({ count: providers.length, categories, providers }, null, 2));
  } else {
    printHeading("OmniRoute Available Providers");
    printAvailableProviderTable(providers, categories);
  }

  return 0;
}

export async function runListCommand(opts = {}) {
  const { db } = await openOmniRouteDb();
  try {
    const connections = listProviderConnections(db).map(publicConnection);
    if (opts.json) {
      console.log(JSON.stringify({ providers: connections }, null, 2));
    } else {
      printHeading("OmniRoute Providers");
      printProviderTable(connections);
    }
    return 0;
  } finally {
    db.close();
  }
}

export async function runTestCommand(selector, opts = {}) {
  if (!selector) {
    console.error("Provider id or name is required.");
    return 1;
  }

  const { db } = await openOmniRouteDb();
  try {
    const connection = findProviderConnection(db, selector);
    if (!connection) {
      console.error(`Provider connection not found: ${selector}`);
      return 1;
    }

    const result = await runProviderTest(db, connection);
    if (opts.json) {
      console.log(JSON.stringify(result, null, 2));
    } else if (result.valid) {
      console.log(`\x1b[32mOK\x1b[0m ${connection.name}: provider test passed`);
    } else {
      console.log(`\x1b[31mFAIL\x1b[0m ${connection.name}: ${result.error}`);
    }
    return result.valid ? 0 : 1;
  } finally {
    db.close();
  }
}

export async function runTestAllCommand(opts = {}) {
  const { db } = await openOmniRouteDb();
  try {
    const connections = listProviderConnections(db);
    const results = [];
    for (const connection of connections) {
      if (!connection.isActive) {
        results.push({
          connection: publicConnection(connection),
          valid: false,
          skipped: true,
          error: "Connection is inactive",
        });
        continue;
      }
      results.push(await runProviderTest(db, connection));
    }

    if (opts.json) {
      console.log(JSON.stringify({ results }, null, 2));
    } else {
      printHeading("OmniRoute Provider Tests");
      for (const result of results) {
        const label = result.valid
          ? "\x1b[32mOK\x1b[0m"
          : result.skipped
            ? "\x1b[33mSKIP\x1b[0m"
            : "\x1b[31mFAIL\x1b[0m";
        console.log(
          `${label} ${result.connection.name}: ${result.valid ? "provider test passed" : result.error}`
        );
      }
    }

    return results.some((result) => !result.valid && !result.skipped) ? 1 : 0;
  } finally {
    db.close();
  }
}

export async function runValidateCommand(opts = {}) {
  const { db } = await openOmniRouteDb();
  try {
    const results = listProviderConnections(db).map(validateConnection);
    if (opts.json) {
      console.log(JSON.stringify({ results }, null, 2));
    } else {
      printHeading("OmniRoute Provider Validation");
      if (results.length === 0) {
        console.log("No providers configured.");
      }
      for (const result of results) {
        const label = result.valid ? "\x1b[32mOK\x1b[0m" : "\x1b[31mFAIL\x1b[0m";
        const messages = [...result.issues, ...result.warnings].join("; ");
        console.log(`${label} ${result.connection.name}${messages ? `: ${messages}` : ""}`);
      }
    }
    return results.some((result) => !result.valid) ? 1 : 0;
  } finally {
    db.close();
  }
}

export function registerProviders(program) {
  const providers = program.command("providers").description(t("providers.title"));

  providers
    .command("available")
    .description("Show available providers in the OmniRoute catalog")
    .option("--json", "Print machine-readable JSON")
    .option("--search <query>", "Filter by id, name, alias, or category")
    .option("-q, --q <query>", "Alias for --search")
    .option("--category <category>", "Filter by category (api-key, oauth, free)")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runAvailableCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("list")
    .description("List configured provider connections")
    .option("--json", "Print machine-readable JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runListCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("test <idOrName>")
    .description("Test a configured provider connection")
    .option("--json", "Print machine-readable JSON")
    .action(async (idOrName, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTestCommand(idOrName, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("test-all")
    .description("Test all active provider connections")
    .option("--json", "Print machine-readable JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTestAllCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("validate")
    .description("Validate local provider configuration without calling upstream")
    .option("--json", "Print machine-readable JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runValidateCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}
