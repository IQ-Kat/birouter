import { applyRulesToText } from "../services/compression/caveman.ts";
import { getRulesForContext } from "../services/compression/cavemanRules.ts";
import {
  extractPreservedBlocks,
  restorePreservedBlocks,
} from "../services/compression/preservation.ts";

export interface DescriptionCompressionResult {
  compressed: string;
  before: number;
  after: number;
  changed: boolean;
}

export interface DescriptionCompressionOptions {
  enabled?: boolean;
}

export interface McpDescriptionCompressionStats {
  descriptionsCompressed: number;
  charsBefore: number;
  charsAfter: number;
  charsSaved: number;
  estimatedTokensSaved: number;
}

const descriptionCompressionStats: McpDescriptionCompressionStats = {
  descriptionsCompressed: 0,
  charsBefore: 0,
  charsAfter: 0,
  charsSaved: 0,
  estimatedTokensSaved: 0,
};

function isDisabledEnvValue(value: string | undefined): boolean {
  return !!value && ["0", "false", "off", "no"].includes(value.trim().toLowerCase());
}

export function isMcpDescriptionCompressionEnabled(
  options: DescriptionCompressionOptions = {}
): boolean {
  if (isDisabledEnvValue(process.env.OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS)) return false;
  if (isDisabledEnvValue(process.env.OMNIROUTE_MCP_DESCRIPTION_COMPRESSION)) return false;
  return options.enabled !== false;
}

export function compressMcpDescription(description: string): DescriptionCompressionResult {
  if (!description) {
    return { compressed: description, before: 0, after: 0, changed: false };
  }

  const { text, blocks } = extractPreservedBlocks(description);
  const rules = getRulesForContext("all", "full");
  const applied = applyRulesToText(text, rules).text;
  const normalized = applied
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(^|[.!?]\s+)([a-z])/g, (_match, prefix: string, char: string) => {
      return `${prefix}${char.toUpperCase()}`;
    })
    .trim();
  const compressed = restorePreservedBlocks(normalized, blocks);

  return {
    compressed,
    before: description.length,
    after: compressed.length,
    changed: compressed !== description,
  };
}

export function maybeCompressMcpDescription(
  description: string,
  options: DescriptionCompressionOptions = {}
): string {
  if (!isMcpDescriptionCompressionEnabled(options)) return description;
  const result = compressMcpDescription(description);
  if (result.changed && result.after < result.before) {
    descriptionCompressionStats.descriptionsCompressed += 1;
    descriptionCompressionStats.charsBefore += result.before;
    descriptionCompressionStats.charsAfter += result.after;
    descriptionCompressionStats.charsSaved += result.before - result.after;
    descriptionCompressionStats.estimatedTokensSaved += Math.ceil(
      (result.before - result.after) / 4
    );
  }
  return result.compressed;
}

export function compressDescriptionsInPlace(
  value: unknown,
  fieldNames: string[] = ["description"],
  options: DescriptionCompressionOptions = {}
): void {
  if (!value || typeof value !== "object") return;
  const fields = new Set(fieldNames);
  if (Array.isArray(value)) {
    for (const item of value) compressDescriptionsInPlace(item, fieldNames, options);
    return;
  }

  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    if (fields.has(key) && typeof nested === "string") {
      (value as Record<string, unknown>)[key] = maybeCompressMcpDescription(nested, options);
    } else if (nested && typeof nested === "object") {
      compressDescriptionsInPlace(nested, fieldNames, options);
    }
  }
}

export function getMcpDescriptionCompressionStats(): McpDescriptionCompressionStats {
  return { ...descriptionCompressionStats };
}

export function resetMcpDescriptionCompressionStats(): void {
  descriptionCompressionStats.descriptionsCompressed = 0;
  descriptionCompressionStats.charsBefore = 0;
  descriptionCompressionStats.charsAfter = 0;
  descriptionCompressionStats.charsSaved = 0;
  descriptionCompressionStats.estimatedTokensSaved = 0;
}
