import path from "node:path";
import os from "node:os";

const CONFIG_PATH = path.join(os.homedir(), ".cline", "data", "globalState.json");

export function generateClineConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): string {
  const base = options.baseUrl.replace(/\/+$/, "").replace(/\/v1$/, "");

  const config = {
    openAiBaseUrl: `${base}/v1`,
    openAiApiKey: options.apiKey,
  };

  return JSON.stringify(config, null, 2);
}
