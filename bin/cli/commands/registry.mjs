import { registerServe } from "./serve.mjs";
import { registerStop } from "./stop.mjs";
import { registerRestart } from "./restart.mjs";
import { registerDashboard } from "./dashboard.mjs";
import { registerDoctor } from "./doctor.mjs";
import { registerSetup } from "./setup.mjs";
import { registerProviders } from "./providers.mjs";
import { registerProvider } from "./provider-cmd.mjs";
import { registerConfig } from "./config.mjs";
import { registerKeys } from "./keys.mjs";
import { registerModels } from "./models.mjs";
import { registerCombo } from "./combo.mjs";
import { registerStatus } from "./status.mjs";
import { registerLogs } from "./logs.mjs";
import { registerUpdate } from "./update.mjs";

export function registerCommands(program) {
  registerServe(program);
  registerStop(program);
  registerRestart(program);
  registerDashboard(program);
  registerDoctor(program);
  registerSetup(program);
  registerProviders(program);
  registerProvider(program);
  registerConfig(program);
  registerKeys(program);
  registerModels(program);
  registerCombo(program);
  registerStatus(program);
  registerLogs(program);
  registerUpdate(program);
}
