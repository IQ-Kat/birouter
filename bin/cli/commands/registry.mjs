import { registerServe } from "./serve.mjs";
import { registerDoctor } from "./doctor.mjs";
import { registerSetup } from "./setup.mjs";
import { registerProviders } from "./providers.mjs";
import { registerProvider } from "./provider-cmd.mjs";
import { registerConfig } from "./config.mjs";
import { registerStatus } from "./status.mjs";
import { registerLogs } from "./logs.mjs";
import { registerUpdate } from "./update.mjs";

export function registerCommands(program) {
  registerServe(program);
  registerDoctor(program);
  registerSetup(program);
  registerProviders(program);
  registerProvider(program);
  registerConfig(program);
  registerStatus(program);
  registerLogs(program);
  registerUpdate(program);
}
