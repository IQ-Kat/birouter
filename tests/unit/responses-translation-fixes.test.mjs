import test from "node:test";
import assert from "node:assert/strict";

const { convertResponsesApiFormat } = await import(
  "../../open-sse/translator/helpers/responsesApiHelper.ts"
);

test("convertResponsesApiFormat filters orphaned function_call_output items", () => {
  const body = {
    model: "gpt-4",
    input: [
      {
        type: "function_call_output",
        call_id: "orphaned_call",
        output: "result",
      },
    ],
  };
  const result = convertResponsesApiFormat(body);
  const toolMsgs = result.messages.filter((m) => m.role === "tool");
  assert.equal(toolMsgs.length, 0);
});

test("convertResponsesApiFormat skips function_call items with empty names", () => {
  const body = {
    model: "gpt-4",
    input: [
      { type: "function_call", call_id: "c1", name: "", arguments: "{}" },
      { type: "function_call", call_id: "c2", name: "  ", arguments: "{}" },
    ],
  };
  const result = convertResponsesApiFormat(body);
  const assistantMsgs = result.messages.filter((m) => m.role === "assistant");
  assert.equal(assistantMsgs.length, 0);
});
