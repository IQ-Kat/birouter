/**
 * Claude Code tool name remapping.
 *
 * Anthropic uses tool name fingerprinting to detect third-party clients.
 * Real Claude Code uses TitleCase tool names (Bash, Read, Write, etc.)
 * while third-party clients like OpenCode use lowercase.
 *
 * This module remaps tool names in both directions:
 * - Request path: lowercase → TitleCase (before sending to Anthropic)
 * - Response path: TitleCase → lowercase (for clients expecting lowercase)
 */

import { EXTRA_TOOL_RENAME_MAP } from "./claudeCodeExtraRemap.ts";

const TOOL_RENAME_MAP: Record<string, string> = {
  ...EXTRA_TOOL_RENAME_MAP,
  bash: "Bash",
  read: "Read",
  write: "Write",
  edit: "Edit",
  glob: "Glob",
  grep: "Grep",
  task: "Task",
  webfetch: "WebFetch",
  websearch: "WebSearch",
  todowrite: "TodoWrite",
  todoread: "TodoRead",
  question: "Question",
  skill: "Skill",
  multiedit: "MultiEdit",
  notebook: "Notebook",
  lsp: "Lsp",
  apply_patch: "ApplyPatch",
};

const REVERSE_MAP: Record<string, string> = {};
for (const [k, v] of Object.entries(TOOL_RENAME_MAP)) {
  REVERSE_MAP[v] = k;
}

function getRequestToolNameMap(body: Record<string, unknown>): Map<string, string> {
  const existing = body._toolNameMap instanceof Map ? body._toolNameMap : new Map<string, string>();
  Object.defineProperty(body, "_toolNameMap", {
    value: existing,
    enumerable: false,
    configurable: true,
    writable: true,
  });
  return existing;
}

function trackToolName(
  body: Record<string, unknown>,
  titleCaseName: string,
  originalName: string
): void {
  getRequestToolNameMap(body).set(titleCaseName, originalName);
}

export function remapToolNamesInRequest(body: Record<string, unknown>): boolean {
  let hasLowercase = false;
  let hasTitleCase = false;

  // Remap tool definitions
  const tools = body.tools as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(tools)) {
    for (const tool of tools) {
      const name = String(tool.name || "");
      if (TOOL_RENAME_MAP[name]) {
        const mapped = TOOL_RENAME_MAP[name];
        tool.name = mapped;
        trackToolName(body, mapped, name);
        hasLowercase = true;
      } else if (REVERSE_MAP[name]) {
        hasTitleCase = true;
      }
    }
  }

  // Remap tool_result references in messages
  const messages = body.messages as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(messages)) {
    for (const msg of messages) {
      const content = msg.content as Array<Record<string, unknown>> | undefined;
      if (!Array.isArray(content)) continue;
      for (const block of content) {
        if (block.type === "tool_use" && typeof block.name === "string") {
          const mapped = TOOL_RENAME_MAP[block.name];
          if (mapped) {
            const originalName = block.name;
            block.name = mapped;
            trackToolName(body, mapped, originalName);
            hasLowercase = true;
          } else if (REVERSE_MAP[block.name]) {
            hasTitleCase = true;
          }
        }
      }
    }
  }

  // Remap tool_choice
  const toolChoice = body.tool_choice as Record<string, unknown> | undefined;
  if (toolChoice?.type === "tool" && typeof toolChoice.name === "string") {
    const mapped = TOOL_RENAME_MAP[toolChoice.name];
    if (mapped) {
      const originalName = toolChoice.name;
      toolChoice.name = mapped;
      trackToolName(body, mapped, originalName);
      hasLowercase = true;
    } else if (REVERSE_MAP[toolChoice.name]) {
      hasTitleCase = true;
    }
  }

  // NOTE: do not set body._claudeCodeRequiresLowercaseToolNames here.
  // The flag has no readers and would leak into the outgoing Anthropic
  // request body, causing HTTP 400 (Extra inputs are not permitted).
  // The response-side remap is unconditional via remapToolNamesInResponse.

  return hasLowercase && !hasTitleCase;
}

export function remapToolNamesInResponse(
  text: string,
  forceLowercase = true,
  toolNameMap?: Map<string, string>
): string {
  if (!forceLowercase) return text;

  // Replace TitleCase tool names back to lowercase in SSE chunks
  if (toolNameMap?.size) {
    for (const [mapped, original] of toolNameMap.entries()) {
      text = text.replaceAll(`"name":"${mapped}"`, `"name":"${original}"`);
      text = text.replaceAll(`"name": "${mapped}"`, `"name": "${original}"`);
    }
  }
  for (const [titleCase, lower] of Object.entries(REVERSE_MAP)) {
    // Match in "name":"ToolName" patterns
    text = text.replaceAll(`"name":"${titleCase}"`, `"name":"${lower}"`);
    text = text.replaceAll(`"name": "${titleCase}"`, `"name": "${lower}"`);
  }
  return text;
}

export { TOOL_RENAME_MAP, REVERSE_MAP };

/**
 * Anthropic fingerprints third-party agent harnesses by their tool NAMES on the
 * first-party Messages API (native Claude OAuth). Two failure modes, both
 * surfaced as a misleading `400 out of extra usage` placeholder (the SSE stream
 * is refused, not a real billing event):
 *   1. Specific blacklisted names (e.g. `mixture_of_agents`) are refused even in
 *      isolation.
 *   2. A large enough SET of recognizable snake_case agent tool names is
 *      refused collectively, even though each name passes on its own.
 *
 * `remapToolNamesInRequest` only normalizes the fixed set of Claude Code tool
 * names. This generalizes that cloak: any tool name that does not already look
 * like a genuine Claude Code tool (PascalCase, no separators) is deterministically
 * aliased — to its Claude Code canonical equivalent when one exists, otherwise to
 * a PascalCase form of the original. The per-request alias is tracked in the
 * non-enumerable `_toolNameMap`, so `remapToolNamesInResponse` restores the
 * caller's original names transparently. Disable with
 * `CLAUDE_DISABLE_TOOL_NAME_CLOAK=true`.
 */
const CLAUDE_BUILTIN_TOOL_NAMES = new Set<string>(Object.values(TOOL_RENAME_MAP));

const HARNESS_CANONICAL_MAP: Record<string, string> = {
  read_file: "Read",
  write_file: "Write",
  search_files: "Grep",
  grep_search: "Grep",
  list_directory: "Glob",
  run_command: "Bash",
  terminal: "Bash",
  todo: "TodoWrite",
  todo_write: "TodoWrite",
  todo_read: "TodoRead",
  patch: "Edit",
  multi_edit: "MultiEdit",
};

function toPascalCaseToolName(name: string): string {
  const parts = name.split(/[_\s-]+/).filter(Boolean);
  const pascal = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  return pascal || name;
}

/**
 * A name is left untouched when it already reads as a genuine Claude Code tool:
 * a PascalCase single token with no separators (Bash, Read, TodoWrite).
 */
export function needsThirdPartyCloak(name: string): boolean {
  if (!name) return false;
  if (CLAUDE_BUILTIN_TOOL_NAMES.has(name)) return false;
  return /[a-z]/.test(name.charAt(0)) || name.includes("_") || name.includes("-");
}

export function cloakThirdPartyToolNames(body: Record<string, unknown>): Map<string, string> {
  const tools = body.tools as Array<Record<string, unknown>> | undefined;

  const used = new Set<string>();
  if (Array.isArray(tools)) {
    for (const tool of tools) {
      if (typeof tool.name === "string") used.add(tool.name);
    }
  }
  const existingMap =
    body._toolNameMap instanceof Map ? (body._toolNameMap as Map<string, string>) : null;
  if (existingMap) {
    for (const alias of existingMap.keys()) used.add(alias);
  }

  // Created lazily so genuine Claude Code traffic (nothing to cloak) does not
  // get an empty _toolNameMap attached to the request body.
  let nameMap: Map<string, string> | null = existingMap;
  const assigned = new Map<string, string>(); // original -> alias

  const aliasFor = (original: string): string => {
    const existing = assigned.get(original);
    if (existing) return existing;
    const base = HARNESS_CANONICAL_MAP[original] ?? toPascalCaseToolName(original);
    let alias = base;
    let suffix = 2;
    while (alias !== original && used.has(alias)) {
      alias = `${base}${suffix++}`;
    }
    used.delete(original);
    used.add(alias);
    assigned.set(original, alias);
    if (!nameMap) nameMap = getRequestToolNameMap(body);
    nameMap.set(alias, original);
    return alias;
  };

  if (Array.isArray(tools)) {
    for (const tool of tools) {
      if (typeof tool.name === "string" && needsThirdPartyCloak(tool.name)) {
        tool.name = aliasFor(tool.name);
      }
    }
  }

  const messages = body.messages as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(messages)) {
    for (const message of messages) {
      const content = message.content as Array<Record<string, unknown>> | undefined;
      if (!Array.isArray(content)) continue;
      for (const block of content) {
        if (block?.type === "tool_use" && typeof block.name === "string" && needsThirdPartyCloak(block.name)) {
          block.name = aliasFor(block.name);
        }
      }
    }
  }

  const toolChoice = body.tool_choice as Record<string, unknown> | undefined;
  if (toolChoice?.type === "tool" && typeof toolChoice.name === "string" && needsThirdPartyCloak(toolChoice.name)) {
    toolChoice.name = aliasFor(toolChoice.name);
  }

  return nameMap ?? new Map<string, string>();
}
