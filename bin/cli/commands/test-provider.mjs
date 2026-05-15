import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

export function registerTestProvider(program) {
  program
    .command("test [provider] [model]")
    .description(t("test.description"))
    .option("--all-providers", "Test all configured providers")
    .option("--json", "Output as JSON")
    .action(async (provider, model, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runTestProviderCommand(provider, model, {
        ...opts,
        output: globalOpts.output,
      });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runTestProviderCommand(provider, model, opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("test.noServer"));
    return 1;
  }

  const targetProvider = provider || "anthropic";
  const targetModel = model || "claude-haiku-4-5-20251001";

  console.log(t("test.testing", { provider: targetProvider, model: targetModel }));

  try {
    const res = await apiFetch("/api/v1/providers/test", {
      method: "POST",
      body: { provider: targetProvider, model: targetModel },
      retry: false,
      timeout: 30000,
      acceptNotOk: true,
    });

    const result = res.ok ? await res.json() : { success: false, error: `HTTP ${res.status}` };

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(result, null, 2));
      return result.success ? 0 : 1;
    }

    if (result.success) {
      console.log(`\x1b[32m✔ ${t("test.passed")}\x1b[0m`);
      if (result.response) console.log(`\x1b[2m  Response: ${result.response}\x1b[0m`);
      return 0;
    }

    console.error(
      `\x1b[31m✖ ${t("test.failed", { error: result.error || "Unknown error" })}\x1b[0m`
    );
    return 1;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
