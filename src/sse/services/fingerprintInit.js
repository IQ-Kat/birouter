/**
 * Fingerprint Initialization
 *
 * Registers the header sanitizer on all executors at startup.
 * Import this module once (side-effect import) to activate fingerprint protection.
 */

import { getExecutor } from "open-sse/executors/index.js";
import { sanitizeOutboundHeaders } from "./fingerprint.js";

// List of known providers to register sanitizer on
const KNOWN_PROVIDERS = [
  "antigravity", "gemini-cli", "github", "claude", "codex",
  "openai", "cursor", "kiro", "xai", "iflow", "qwen", "qoder",
  "azure", "vertex", "vertex-partner", "grok-web", "perplexity-web",
  "opencode", "opencode-go", "ollama-local", "commandcode",
];

let initialized = false;

export function initFingerprint() {
  if (initialized) return;
  initialized = true;

  for (const provider of KNOWN_PROVIDERS) {
    try {
      const executor = getExecutor(provider);
      if (executor && !executor._headerSanitizer) {
        executor._headerSanitizer = sanitizeOutboundHeaders;
      }
    } catch {
      // Provider might not exist, skip
    }
  }
}

// Auto-initialize on import
initFingerprint();
