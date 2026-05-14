import { runDoctorCommand } from "./commands/doctor.mjs";
import { runProvidersCommand } from "./commands/providers.mjs";
import { runSetupCommand } from "./commands/setup.mjs";
import { runConfigCommand } from "./commands/config.mjs";
import { runStatusCommand } from "./commands/status.mjs";
import { runLogsCommand } from "./commands/logs.mjs";
import { runUpdateCommand } from "./commands/update.mjs";
import { runProviderCommand } from "./commands/provider-cmd.mjs";

export async function runCliCommand(command, argv, context = {}) {
  if (command === "doctor") {
    return runDoctorCommand(argv, context);
  }

  if (command === "providers") {
    return runProvidersCommand(argv, context);
  }

  if (command === "setup") {
    return runSetupCommand(argv, context);
  }

  if (command === "config") {
    return runConfigCommand(argv);
  }

  if (command === "status") {
    return runStatusCommand(argv);
  }

  if (command === "logs") {
    return runLogsCommand(argv);
  }

  if (command === "update") {
    return runUpdateCommand(argv);
  }

  if (command === "provider") {
    return runProviderCommand(argv);
  }

  throw new Error(`Unknown CLI command: ${command}`);
}
