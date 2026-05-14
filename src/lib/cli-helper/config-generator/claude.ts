import path from "node:path";
import os from "node:os";

const CONFIG_PATH = path.join(os.homedir(), ".claude", "settings.json");

export function generateClaudeConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): string {
  const base = options.baseUrl.replace(/\/+$/, "").replace(/\/v1$/, "");
  const model = options.model || "claude-3-5-sonnet-20241022";

  const config = {
    baseUrl: `${base}/v1`,
    authToken: options.apiKey,
    models: [{ id: model }],
  };

  return JSON.stringify(config, null, 2);
}
