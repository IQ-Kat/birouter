import path from "node:path";
import os from "node:os";

const CONFIG_PATH = path.join(os.homedir(), ".config", "opencode", "opencode.json");

export function generateOpencodeConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): string {
  const base = options.baseUrl.replace(/\/+$/, "").replace(/\/v1$/, "");

  const config = {
    provider: "omniroute",
    baseURL: `${base}/v1`,
    apiKey: options.apiKey,
    model: options.model || "opencode",
  };

  return JSON.stringify(config, null, 2);
}
