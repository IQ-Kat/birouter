type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function joinNonEmpty(parts: string[]) {
  return parts.filter(Boolean).join("\n").trim();
}

function extractTextFromContent(content: unknown): string {
  if (typeof content === "string") return content.trim();

  if (!Array.isArray(content)) return "";

  return content
    .map((part) => {
      if (typeof part === "string") return part.trim();

      const block = asRecord(part);
      const blockType = typeof block.type === "string" ? block.type : "";
      const blockText = typeof block.text === "string" ? block.text.trim() : "";

      if (blockText && (blockType === "" || blockType === "text" || blockType === "output_text")) {
        return blockText;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n")
    .trim();
}

function extractReasoningText(record: JsonRecord): string {
  const reasoningDetails = Array.isArray(record.reasoning_details) ? record.reasoning_details : [];
  const detailText = reasoningDetails
    .map((detail) => {
      const detailRecord = asRecord(detail);
      const detailType = typeof detailRecord.type === "string" ? detailRecord.type : "";
      const text =
        typeof detailRecord.text === "string"
          ? detailRecord.text.trim()
          : typeof detailRecord.content === "string"
            ? detailRecord.content.trim()
            : "";

      if (
        text &&
        (detailType === "" ||
          detailType === "reasoning" ||
          detailType === "reasoning.text" ||
          detailType === "thinking")
      ) {
        return text;
      }

      return "";
    })
    .filter(Boolean);

  return joinNonEmpty([
    typeof record.reasoning_content === "string" ? record.reasoning_content.trim() : "",
    typeof record.reasoning === "string" ? record.reasoning.trim() : "",
    typeof record.reasoning_text === "string" ? record.reasoning_text.trim() : "",
    joinNonEmpty(detailText),
  ]);
}

function getUsageReasoningTokens(body: JsonRecord): number {
  const usage = asRecord(body.usage);
  if (!usage) return 0;

  const completionDetails = asRecord(usage.completion_tokens_details);
  const topLevelReasoning =
    typeof usage.reasoning_tokens === "number" && Number.isFinite(usage.reasoning_tokens)
      ? usage.reasoning_tokens
      : 0;
  const detailedReasoning =
    typeof completionDetails.reasoning_tokens === "number" &&
    Number.isFinite(completionDetails.reasoning_tokens)
      ? completionDetails.reasoning_tokens
      : 0;

  return Math.max(topLevelReasoning, detailedReasoning);
}

function hasReasoningOnlyCompletion(body: JsonRecord): boolean {
  if (!Array.isArray(body.choices) || body.choices.length === 0) return false;
  if (getUsageReasoningTokens(body) <= 0) return false;

  return body.choices.some((choice) => {
    const choiceRecord = asRecord(choice);
    const message = asRecord(choiceRecord.message);
    const finishReason =
      typeof choiceRecord.finish_reason === "string" ? choiceRecord.finish_reason : "";

    if (!message || message.role !== "assistant") return false;
    if (!finishReason) return false;
    if (extractTextFromContent(message.content)) return false;
    if (extractReasoningText(message)) return false;
    return true;
  });
}

export function buildComboTestRequestBody(modelStr: string) {
  return {
    model: modelStr,
    messages: [{ role: "user", content: "Reply with OK only." }],
    // Give reasoning-heavy models enough headroom to emit a tiny visible answer
    // without turning the smoke test into a full-cost real request.
    max_tokens: 64,
    temperature: 0,
    stream: false,
  };
}

export function extractComboTestResponseText(responseBody: unknown): string {
  const body = asRecord(responseBody);

  if (typeof body.output_text === "string" && body.output_text.trim()) {
    return body.output_text.trim();
  }

  if (Array.isArray(body.choices)) {
    for (const choice of body.choices) {
      const choiceRecord = asRecord(choice);
      const message = asRecord(choiceRecord.message);
      const messageText = extractTextFromContent(message.content);
      if (messageText) return messageText;

      const reasoningText = extractReasoningText(message);
      if (reasoningText) return reasoningText;

      if (typeof choiceRecord.text === "string" && choiceRecord.text.trim()) {
        return choiceRecord.text.trim();
      }
    }
  }

  if (Array.isArray(body.output)) {
    for (const item of body.output) {
      const itemRecord = asRecord(item);
      const contentText = extractTextFromContent(itemRecord.content);
      if (contentText) return contentText;

      const reasoningText = extractReasoningText(itemRecord);
      if (reasoningText) return reasoningText;
    }
  }

  const topLevelText = extractTextFromContent(body.content);
  if (topLevelText) return topLevelText;

  const topLevelReasoning = extractReasoningText(body);
  if (topLevelReasoning) return topLevelReasoning;

  if (hasReasoningOnlyCompletion(body)) {
    return "[reasoning-only completion]";
  }

  return "";
}
