import test from "node:test";
import assert from "node:assert/strict";

const { stripEmptyTextBlocks, openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

test("stripEmptyTextBlocks removes empty text recursively inside tool_result content", () => {
  const input = [
    { type: "text", text: "" },
    { type: "text", text: "keep-top-level" },
    {
      type: "tool_result",
      content: [
        { type: "text", text: "" },
        { type: "text", text: "keep-nested" },
        {
          type: "tool_result",
          content: [
            { type: "text", text: "" },
            { type: "text", text: "keep-deep" },
          ],
        },
      ],
    },
  ];

  const out = stripEmptyTextBlocks(input);
  assert.deepEqual(out, [
    { type: "text", text: "keep-top-level" },
    {
      type: "tool_result",
      content: [
        { type: "text", text: "keep-nested" },
        {
          type: "tool_result",
          content: [{ type: "text", text: "keep-deep" }],
        },
      ],
    },
  ]);
});

test("openaiToClaudeRequest applies strip to tool message array content", () => {
  const request = {
    messages: [
      { role: "user", content: "run tool" },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: { name: "demo_tool", arguments: "{}" },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_1",
        content: [
          { type: "text", text: "" },
          { type: "text", text: "tool ok" },
        ],
      },
    ],
  };

  const translated = openaiToClaudeRequest("claude-sonnet-4", request, false);
  const toolMessage = translated.messages.find(
    (m) => Array.isArray(m.content) && m.content.some((b) => b.type === "tool_result")
  );
  assert.ok(toolMessage, "expected a translated tool_result user message");
  const toolResult = toolMessage.content.find((b) => b.type === "tool_result");
  assert.deepEqual(toolResult.content, [{ type: "text", text: "tool ok" }]);
});
