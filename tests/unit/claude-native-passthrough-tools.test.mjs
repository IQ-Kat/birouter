import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("Claude native passthrough normalization keeps original tool names", () => {
  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "Write a todo item" }],
      },
    ],
    tools: [
      {
        name: "TodoWrite",
        description: "Create or update a todo list",
        input_schema: {
          type: "object",
          properties: {
            todos: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["todos"],
        },
      },
    ],
  };

  const openaiBody = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    body.model,
    structuredClone(body),
    false,
    null,
