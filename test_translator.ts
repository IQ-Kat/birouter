import { translateRequest } from "./open-sse/translator/index.ts";
import { FORMATS } from "./open-sse/translator/formats.ts";
import { CodexExecutor } from "./open-sse/executors/codex.ts";

const claudeCodeRequest = {
  model: "codex/gpt-5.3-codex-xhigh",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "What time is it?",
        },
      ],
    },
  ],
  system: "Test system prompt",
  tools: [
    {
      name: "get_time",
      description: "Get the time",
      input_schema: {
        type: "object",
        properties: { timezone: { type: "string" } },
      },
    },
  ],
};

try {
  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.3-codex-xhigh",
    claudeCodeRequest,
    true, // stream
    null, // credentials
    "codex", // provider
    null, // reqLogger
    { normalizeToolCallId: false, preserveDeveloperRole: true }
  );

  const exec = new CodexExecutor();
  const finalBody = exec.transformRequest("gpt-5.3-codex-xhigh", result, true, {});

  console.log("FINAL BODY:", JSON.stringify(finalBody, null, 2));
} catch (err) {
  console.error("ERROR:");
  console.error(err);
}
