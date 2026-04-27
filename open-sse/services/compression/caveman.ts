import type { CavemanConfig, CavemanRule, CompressionResult, CompressionStats } from "./types.ts";
import { DEFAULT_CAVEMAN_CONFIG } from "./types.ts";
import { CAVEMAN_RULES, getRulesForContext } from "./cavemanRules.ts";
import { extractPreservedBlocks, restorePreservedBlocks } from "./preservation.ts";
import { createCompressionStats, estimateTokensForStats, trackCompressionStats } from "./stats.ts";

const CHARS_PER_TOKEN = 4;

interface ChatMessage {
  role: string;
  content?: string | Array<{ type: string; text?: string }>;
}

interface ChatRequestBody {
  messages?: ChatMessage[];
  [key: string]: unknown;
}

export function applyRulesToText(
  text: string,
  rules: CavemanRule[]
): { text: string; appliedRules: string[] } {
  let result = text;
  const appliedRules: string[] = [];

  for (const rule of rules) {
    const before = result;
    if (typeof rule.replacement === "function") {
      result = result.replace(rule.pattern, (...args) => {
        const match = args[0];
        return rule.replacement(match, ...args.slice(1, -2));
      });
    } else {
      result = result.replace(rule.pattern, rule.replacement);
    }
    if (result !== before) {
      appliedRules.push(rule.name);
    }
  }

  return { text: result, appliedRules };
}

function cleanupArtifacts(text: string): string {
  let result = text;
  result = result.replace(/  +/g, " ");
  result = result.replace(/ +$/gm, "");
  result = result.replace(/\n{3,}/g, "\n\n");
  result = result.replace(/^\n+/, "");
  result = result.replace(/\n+$/, "");
  return result;
}

export function cavemanCompress(
  body: ChatRequestBody,
  options?: Partial<CavemanConfig>
): CompressionResult {
  const startMs = performance.now();
  const config: CavemanConfig = { ...DEFAULT_CAVEMAN_CONFIG, ...options };

  if (!config.enabled) {
    return {
      body,
      compressed: false,
      stats: createCompressionStats(0, 0, "caveman"),
    };
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return {
      body,
      compressed: false,
      stats: createCompressionStats(0, 0, "caveman"),
    };
  }

  let totalOriginalTokens = 0;
  let totalCompressedTokens = 0;
  const allAppliedRules: string[] = [];

  const compressedMessages = body.messages.map((msg): ChatMessage => {
    const contentStr =
      typeof msg.content === "string"
        ? msg.content
        : Array.isArray(msg.content)
          ? msg.content
              .map((part) => (part.type === "text" && part.text ? part.text : ""))
              .filter(Boolean)
              .join("\n")
          : "";

    totalOriginalTokens += estimateTokensForStats(contentStr);

    if (!contentStr || contentStr.length < config.minMessageLength) {
      totalCompressedTokens += estimateTokensForStats(contentStr);
      return msg;
    }

    if (!config.compressRoles.includes(msg.role as "user" | "assistant" | "system")) {
      totalCompressedTokens += estimateTokensForStats(contentStr);
      return msg;
    }

    // Step 1: Extract preserved blocks
    const { text: extractedText, blocks } = extractPreservedBlocks(contentStr);

    // Step 2: Apply rules by context
    const rules = getRulesForContext(msg.role).filter(
      (rule) => !config.skipRules.includes(rule.name)
    );
    const { text: rulesApplied, appliedRules } = applyRulesToText(extractedText, rules);
    allAppliedRules.push(...appliedRules);

    // Step 3: Restore preserved blocks
    const restored = restorePreservedBlocks(rulesApplied, blocks);

    // Step 4: Cleanup artifacts
    const cleaned = cleanupArtifacts(restored);

    totalCompressedTokens += estimateTokensForStats(cleaned);

    const newContent =
      typeof msg.content === "string"
        ? cleaned
        : Array.isArray(msg.content)
          ? msg.content.map((part) =>
              part.type === "text" && part.text ? { ...part, text: cleaned } : part
            )
          : msg.content;

    return { ...msg, content: newContent };
  });

  const durationMs = performance.now() - startMs;
  const savingsPercent =
    totalOriginalTokens > 0
      ? Math.round(((totalOriginalTokens - totalCompressedTokens) / totalOriginalTokens) * 100)
      : 0;

  const stats: CompressionStats = {
    mode: "caveman",
    originalTokens: totalOriginalTokens,
    compressedTokens: totalCompressedTokens,
    savingsPercent,
    durationMs: Math.round(durationMs * 100) / 100,
    rulesApplied: [...new Set(allAppliedRules)],
  };

  const compressed = totalCompressedTokens < totalOriginalTokens;

  const result: CompressionResult = {
    body: { ...body, messages: compressedMessages },
    compressed,
    stats,
  };

  trackCompressionStats(stats);

  return result;
}
