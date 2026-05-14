import path from "node:path";
import os from "node:os";

export interface GenerateOptions {
  baseUrl: string;
  apiKey: string;
  model?: string;
}

export interface GenerateResult {
  success: boolean;
  configPath: string;
  content?: string;
  error?: string;
}

function validateBaseUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function expandHome(p: string): string {
  const home = os.homedir();
  return p.replace(/^~\//, home + "/");
}

const TOOL_CONFIG_PATHS: Record<string, string> = {
  claude: path.join(os.homedir(), ".claude", "settings.json"),
  codex: path.join(os.homedir(), ".codex", "config.yaml"),
  opencode: path.join(os.homedir(), ".config", "opencode", "opencode.json"),
  cline: path.join(os.homedir(), ".cline", "data", "globalState.json"),
  kilocode: path.join(os.homedir(), ".config", "kilocode", "settings.json"),
  continue: path.join(os.homedir(), ".continue", "config.yaml"),
};

async function importGenerator(toolId: string) {
  const generators: Record<string, { module: string; export: string }> = {
    claude: { module: "./claude.js", export: "generateClaudeConfig" },
    codex: { module: "./codex.js", export: "generateCodexConfig" },
    opencode: { module: "./opencode.js", export: "generateOpencodeConfig" },
    cline: { module: "./cline.js", export: "generateClineConfig" },
    kilocode: { module: "./kilocode.js", export: "generateKilocodeConfig" },
    continue: { module: "./continue.js", export: "generateContinueConfig" },
  };

  const gen = generators[toolId];
  if (!gen) return null;
  const mod = await import(gen.module);
  return { generate: mod[gen.export] };
}

export async function generateConfig(
  toolId: string,
  options: GenerateOptions
): Promise<GenerateResult> {
  if (!validateBaseUrl(options.baseUrl)) {
    return {
      success: false,
      configPath: "",
      error: "Invalid baseUrl: must be an absolute HTTP(S) URL",
    };
  }

  if (!options.apiKey || options.apiKey.trim().length === 0) {
    return { success: false, configPath: "", error: "API key is required" };
  }

  try {
    const mod = await importGenerator(toolId);
    if (!mod) {
      return { success: false, configPath: "", error: `Unknown tool: ${toolId}` };
    }
    const content = await mod.generate(options);
    const configPath = TOOL_CONFIG_PATHS[toolId] || "";
    return { success: true, configPath, content };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, configPath: "", error: `Generation failed: ${msg}` };
  }
}

export async function generateAllConfigs(options: GenerateOptions): Promise<GenerateResult[]> {
  const toolIds = ["claude", "codex", "opencode", "cline", "kilocode", "continue"] as const;
  const results = await Promise.allSettled(toolIds.map((id) => generateConfig(id, options)));

  return results.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : { success: false, configPath: "", error: r.reason?.message || "Unknown error" }
  );
}
