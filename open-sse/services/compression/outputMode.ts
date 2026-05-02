import { DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG, type CavemanOutputModeConfig } from "./types.ts";
import { extractTextContent } from "./messageContent.ts";

interface ChatMessage {
  role: string;
  content?: string | unknown[];
  [key: string]: unknown;
}

interface ChatRequestBody {
  messages?: ChatMessage[];
  instructions?: string;
  [key: string]: unknown;
}

export interface CavemanOutputModeResult {
  body: ChatRequestBody;
  applied: boolean;
  skippedReason?: string;
}

const CAVEMAN_INSTRUCTION_BY_INTENSITY = {
  lite: "Respond concise. Drop filler, pleasantries, hedging. Keep full sentences, technical terms, code, errors, URLs, and identifiers exact.",
  full: "Respond terse like smart caveman. Drop articles, filler, pleasantries, hedging. Fragments OK. Keep all technical substance, code, errors, URLs, identifiers exact.",
  ultra:
    "Respond ultra terse. Use short technical prose, arrows for causality, common abbreviations like DB/auth/config/req/res/fn. Never abbreviate code symbols, API names, error strings, URLs, or identifiers.",
} as const;

const CAVEMAN_OUTPUT_MARKER = "[OmniRoute Caveman Output Mode]";

export function shouldBypassCavemanOutputMode(messages: ChatMessage[]): string | null {
  const text = messages
    .slice(-3)
    .map((message) => extractTextContent(message.content).toLowerCase())
    .join("\n");

  if (!text.trim()) return null;
  if (
    /\b(security|vulnerability|exploit|credential leak|secret leak|malware|phishing)\b/.test(text)
  ) {
    return "security_warning";
  }
  if (/\b(delete|drop table|truncate|destroy|wipe|irreversible|permanently remove)\b/.test(text)) {
    return "irreversible_action";
  }
  if (
    /\b(clarify|explain in detail|more detail|step by step|why exactly|what do you mean)\b/.test(
      text
    )
  ) {
    return "clarification_requested";
  }
  if (
    /\b(first|then|after that|before|rollback|backup)\b[\s\S]{0,240}\b(delete|drop|migrate|deploy|release)\b/.test(
      text
    )
  ) {
    return "order_sensitive_sequence";
  }
  return null;
}

export function buildCavemanOutputInstruction(config: CavemanOutputModeConfig): string {
  const intensity = config.intensity ?? "full";
  return `${CAVEMAN_OUTPUT_MARKER}\n${CAVEMAN_INSTRUCTION_BY_INTENSITY[intensity]}`;
}

export function applyCavemanOutputMode(
  body: ChatRequestBody,
  options?: Partial<CavemanOutputModeConfig>
): CavemanOutputModeResult {
  const config: CavemanOutputModeConfig = {
    ...DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG,
    ...options,
  };
  if (!config.enabled) return { body, applied: false, skippedReason: "disabled" };

  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (!messages || messages.length === 0) {
    if (typeof body.instructions === "string") {
      if (body.instructions.includes(CAVEMAN_OUTPUT_MARKER)) {
        return { body, applied: false, skippedReason: "already_applied" };
      }
      return {
        body: {
          ...body,
          instructions: `${body.instructions.trim()}\n\n${buildCavemanOutputInstruction(config)}`,
        },
        applied: true,
      };
    }
    return { body, applied: false, skippedReason: "no_messages" };
  }

  if (config.autoClarity !== false) {
    const bypass = shouldBypassCavemanOutputMode(messages);
    if (bypass) return { body, applied: false, skippedReason: bypass };
  }

  const alreadyApplied = messages.some(
    (message) =>
      message.role === "system" &&
      typeof message.content === "string" &&
      message.content.includes(CAVEMAN_OUTPUT_MARKER)
  );
  if (alreadyApplied) return { body, applied: false, skippedReason: "already_applied" };

  const instruction = buildCavemanOutputInstruction(config);
  const nextMessages = [...messages];
  const first = nextMessages[0];

  if (first?.role === "system" && typeof first.content === "string") {
    nextMessages[0] = {
      ...first,
      content: `${first.content.trim()}\n\n${instruction}`,
    };
  } else {
    nextMessages.unshift({ role: "system", content: instruction });
  }

  return { body: { ...body, messages: nextMessages }, applied: true };
}
