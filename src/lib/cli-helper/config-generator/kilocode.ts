import path from "node:path";
import os from "node:os";

const CONFIG_PATH = path.join(os.homedir(), ".config", "kilocode", "settings.json");

export function generateKilocodeConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): string {
  const base = options.baseUrl.replace(/\/+$/, "").replace(/\/v1$/, "");

  const config = {
    apiKey: options.apiKey,
    baseUrl: `${base}/v1`,
  };

  return JSON.stringify(config, null, 2);
}
