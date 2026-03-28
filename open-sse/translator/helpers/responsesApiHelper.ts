/**
 * Convert OpenAI Responses API format to standard chat completions format.
 * Delegates to the canonical translator to avoid logic duplication.
 */
import { openaiResponsesToOpenAIRequest } from "../request/openai-responses.ts";

export function convertResponsesApiFormat(body) {
  return openaiResponsesToOpenAIRequest(null, body, null, null);
}
