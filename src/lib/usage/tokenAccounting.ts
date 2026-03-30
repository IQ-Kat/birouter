type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toFiniteNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function getPromptTokenDetails(tokens: unknown): JsonRecord {
  const tokenRecord = asRecord(tokens);
  const promptDetails = asRecord(tokenRecord.prompt_tokens_details);
  if (Object.keys(promptDetails).length > 0) return promptDetails;
  return asRecord(tokenRecord.input_tokens_details);
}

export function getPromptCacheReadTokens(tokens: unknown): number {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  return toFiniteNumber(
    tokenRecord.cacheRead ??
      tokenRecord.cache_read_input_tokens ??
      tokenRecord.cached_tokens ??
      promptDetails.cached_tokens
  );
}

export function getPromptCacheCreationTokens(tokens: unknown): number {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  return toFiniteNumber(
    tokenRecord.cacheCreation ??
      tokenRecord.cache_creation_input_tokens ??
      promptDetails.cache_creation_tokens
  );
}

export function getLoggedInputTokens(tokens: unknown): number {
  const tokenRecord = asRecord(tokens);

  if (tokenRecord.input !== undefined && tokenRecord.input !== null) {
    return toFiniteNumber(tokenRecord.input);
  }

  if (tokenRecord.input_tokens !== undefined && tokenRecord.input_tokens !== null) {
    return toFiniteNumber(tokenRecord.input_tokens);
  }

  // prompt_tokens from translator already includes input + cache_read + cache_creation
  // Do NOT subtract cached tokens - we want the total billable prompt tokens
  const promptTokens = toFiniteNumber(tokenRecord.prompt_tokens);
  return promptTokens;
}

export function getLoggedOutputTokens(tokens: unknown): number {
  const tokenRecord = asRecord(tokens);
  if (tokenRecord.output !== undefined && tokenRecord.output !== null) {
    return toFiniteNumber(tokenRecord.output);
  }
  return toFiniteNumber(tokenRecord.completion_tokens ?? tokenRecord.output_tokens);
}

export function formatUsageLog(tokens: unknown): string {
  const input = getLoggedInputTokens(tokens);
  const output = getLoggedOutputTokens(tokens);
  const cacheRead = getPromptCacheReadTokens(tokens);

  let msg = `in=${input} | out=${output}`;
  if (cacheRead > 0) {
    msg += ` | CR=${cacheRead}`;
  }
  return msg;
}
