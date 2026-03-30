import { openaiToOpenAIResponsesRequest } from "./open-sse/translator/request/openai-responses.ts";

const root = {
  model: "gpt-5.3-codex-xhigh",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "<system-reminder>\nThe following skills are available...",
        },
      ],
    },
  ],
};

try {
  // Let's modify the file to actually export the function throwing or we can just copy the original logic.
  // Actually, wait, let's just create a modified version of it here inline to see where it breaks.
  const result = openaiToOpenAIResponsesRequest("gpt-5.3-codex-xhigh", root, true, null);
  console.log("Result:", JSON.stringify(result, null, 2));
} catch (e) {
  console.error("Test Error:", e);
}
