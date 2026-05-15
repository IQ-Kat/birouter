import { registerServe } from "./serve.mjs";
import { runDoctorCommand } from "./doctor.mjs";
import { runSetupCommand } from "./setup.mjs";
import { runProvidersCommand } from "./providers.mjs";
import { runProviderCommand } from "./provider-cmd.mjs";
import { runConfigCommand } from "./config.mjs";
import { runStatusCommand } from "./status.mjs";
import { runLogsCommand } from "./logs.mjs";
import { runUpdateCommand } from "./update.mjs";
import { t } from "../i18n.mjs";

function argvAfter(cmdName) {
  const idx = process.argv.findIndex((a, i) => i >= 2 && a === cmdName);
  return idx >= 0 ? process.argv.slice(idx + 1) : [];
}

function legacyAction(name, handler) {
  return async () => {
    const exitCode = await handler(argvAfter(name));
    process.exit(exitCode ?? 0);
  };
}

export function registerCommands(program) {
  registerServe(program);

  program
    .command("doctor")
    .description(t("doctor.title"))
    .allowUnknownOption()
    .allowExcessArguments()
    .action(legacyAction("doctor", runDoctorCommand));

  program
    .command("setup")
    .description(t("setup.title"))
    .allowUnknownOption()
    .allowExcessArguments()
    .action(legacyAction("setup", runSetupCommand));

  program
    .command("providers")
    .description(t("providers.title"))
    .allowUnknownOption()
    .allowExcessArguments()
    .action(legacyAction("providers", runProvidersCommand));

  program
    .command("provider")
    .description(t("providers.title"))
    .allowUnknownOption()
    .allowExcessArguments()
    .action(legacyAction("provider", runProviderCommand));

  program
    .command("config")
    .description("Show or update CLI tool configuration")
    .allowUnknownOption()
    .allowExcessArguments()
    .action(legacyAction("config", runConfigCommand));

  program
    .command("status")
    .description("Show OmniRoute status dashboard")
    .allowUnknownOption()
    .allowExcessArguments()
    .action(legacyAction("status", runStatusCommand));

  program
    .command("logs")
    .description("Stream request logs")
    .allowUnknownOption()
    .allowExcessArguments()
    .action(legacyAction("logs", runLogsCommand));

  program
    .command("update")
    .description(t("update.checking"))
    .allowUnknownOption()
    .allowExcessArguments()
    .action(legacyAction("update", runUpdateCommand));
}
