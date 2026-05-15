import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

export function registerModels(program) {
  program
    .command("models [provider]")
    .description(t("models.description"))
    .option("--search <query>", t("models.search"))
    .option("--json", "Output as JSON")
    .action(async (provider, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runModelsCommand(provider, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runModelsCommand(provider, opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("models.noServer"));
    return 1;
  }

  let models = [];

  try {
    const res = await apiFetch("/api/models", { retry: false, timeout: 5000, acceptNotOk: true });
    if (res.ok) {
      const data = await res.json();
      models = Array.isArray(data) ? data : data.models || [];
    }
  } catch {}

  if (models.length === 0) {
    try {
      const res = await apiFetch("/api/v1/models", {
        retry: false,
        timeout: 5000,
        acceptNotOk: true,
      });
      if (res.ok) {
        const data = await res.json();
        models = Array.isArray(data) ? data : data.data || [];
      }
    } catch {}
  }

  if (provider) {
    const filter = provider.toLowerCase();
    models = models.filter(
      (m) =>
        (m.provider && m.provider.toLowerCase().includes(filter)) ||
        (m.id && m.id.toLowerCase().startsWith(filter)) ||
        (m.name && m.name.toLowerCase().includes(filter))
    );
  }

  if (opts.search) {
    const search = opts.search.toLowerCase();
    models = models.filter(
      (m) =>
        (m.id && m.id.toLowerCase().includes(search)) ||
        (m.name && m.name.toLowerCase().includes(search)) ||
        (m.provider && m.provider.toLowerCase().includes(search)) ||
        (m.description && m.description.toLowerCase().includes(search))
    );
  }

  if (opts.json || opts.output === "json") {
    console.log(JSON.stringify(models, null, 2));
    return 0;
  }

  if (models.length === 0) {
    console.log(t("models.noModels"));
    return 0;
  }

  console.log();
  console.log("\x1b[36m" + "  Model".padEnd(45) + "Provider".padEnd(20) + "Context\x1b[0m");
  console.log(
    "\x1b[2m  " + "─".repeat(44) + " " + "─".repeat(19) + " " + "─".repeat(10) + "\x1b[0m"
  );

  const displayModels = models.slice(0, 50);
  for (const model of displayModels) {
    const name = (model.id || model.name || "unknown").slice(0, 43);
    const prov = (model.provider || "unknown").slice(0, 18);
    const context = model.context_length || model.max_tokens || model.contextWindow || "-";
    console.log(`  ${name.padEnd(45)}${prov.padEnd(20)}${String(context).padEnd(10)}`);
  }

  console.log();
  if (models.length > 50) {
    console.log(`\x1b[2m  ... and ${models.length - 50} more. Use --json for full list.\x1b[0m`);
  }
  console.log(`  \x1b[32mTotal: ${models.length} models\x1b[0m`);

  return 0;
}
