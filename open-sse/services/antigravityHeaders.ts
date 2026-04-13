/**
 * Antigravity and Gemini CLI header utilities.
 *
 * Generates User-Agent strings and API client headers that match
 * the real Antigravity and Gemini CLI binaries.
 *
 * Based on CLIProxyAPI's misc/header_utils.go.
 */

import os from "node:os";

const ANTIGRAVITY_VERSION = "1.21.9";
const GEMINI_CLI_VERSION = "0.31.0";
const GEMINI_SDK_VERSION = "1.41.0";
const NODE_VERSION = "v22.19.0";

function getPlatform(): string {
  const p = os.platform();
  switch (p) {
    case "win32": return "win32";
    case "darwin": return "darwin";
    default: return p; // "linux", etc.
  }
}

function getArch(): string {
  const a = os.arch();
  switch (a) {
    case "x64": return "x64";
    case "ia32": return "x86";
    case "arm64": return "arm64";
    default: return a;
  }
}

function getAntigravityOS(): string {
  const p = os.platform();
  switch (p) {
    case "darwin": return "darwin";
    case "win32": return "windows";
    default: return p;
  }
}

function getAntigravityArch(): string {
  const a = os.arch();
  switch (a) {
    case "x64": return "amd64";
    case "ia32": return "386";
    case "arm64": return "arm64";
    default: return a;
  }
}

/**
 * Antigravity User-Agent: "antigravity/VERSION OS/ARCH"
 * Example: "antigravity/1.21.9 darwin/arm64"
 */
export function antigravityUserAgent(): string {
  return `antigravity/${ANTIGRAVITY_VERSION} ${getAntigravityOS()}/${getAntigravityArch()}`;
}

/**
 * Gemini CLI User-Agent: "GeminiCLI/VERSION/MODEL (OS; ARCH)"
 * Example: "GeminiCLI/0.31.0/gemini-3-flash (darwin; arm64)"
 */
export function geminiCLIUserAgent(model: string): string {
  return `GeminiCLI/${GEMINI_CLI_VERSION}/${model || "unknown"} (${getPlatform()}; ${getArch()})`;
}

/**
 * X-Goog-Api-Client header value matching the real Gemini SDK.
 * Example: "google-genai-sdk/1.41.0 gl-node/v22.19.0"
 */
export function googApiClientHeader(): string {
  return `google-genai-sdk/${GEMINI_SDK_VERSION} gl-node/${NODE_VERSION}`;
}

export {
  ANTIGRAVITY_VERSION,
  GEMINI_CLI_VERSION,
  GEMINI_SDK_VERSION,
};
