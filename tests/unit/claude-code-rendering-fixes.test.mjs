import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIResponse } = await import(
  "../../open-sse/translator/response/openai-responses.ts"
);
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");

test("Responses->Chat: output_item.done emits arguments when no delta chunks were sent", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallId: "call_abc",
    currentToolCallArgsBuffer: "",
  };

  const chunk = {
    type: "response.output_item.done",
    item: {
      type: "function_call",
      call_id: "call_abc",
      name: "search_tasks",
      status: "completed",
      arguments: '{"query":"select:TaskCreate,TaskUpdate","max_results":10}',
    },
  };

  const result = openaiResponsesToOpenAIResponse(chunk, state);

  assert.ok(result);
  assert.equal(
    result.choices[0].delta.tool_calls[0].function.arguments,
    '{"query":"select:TaskCreate,TaskUpdate","max_results":10}'
  );
  assert.equal(state.toolCallIndex, 1);
});

test("Responses->Chat: output_item.done does not re-emit arguments already streamed via deltas", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallId: "call_abc",
    currentToolCallArgsBuffer: '{"query":"search"}',
  };

  const chunk = {
    type: "response.output_item.done",
    item: {
      type: "function_call",
      call_id: "call_abc",
      name: "search",
      status: "completed",
      arguments: '{"query":"search"}',
    },
  };

  const result = openaiResponsesToOpenAIResponse(chunk, state);

  assert.equal(result, null);
  assert.equal(state.toolCallIndex, 1);
});

test("Responses->Chat: empty-name tool call is deferred until done provides a valid name", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallArgsBuffer: "",
    currentToolCallDeferred: false,
  };

  const added = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_deferred", name: "   " },
    },
    state
  );
  assert.equal(added, null);

  const delta = openaiResponsesToOpenAIResponse(
    {
      type: "response.function_call_arguments.delta",
      delta: '{"query":"deferred"}',
    },
    state
  );
  assert.equal(delta, null);

  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_deferred",
        name: "search_tasks",
        arguments: '{"query":"deferred"}',
      },
    },
    state
  );

  assert.ok(done);
  assert.equal(done.choices[0].delta.tool_calls[0].function.name, "search_tasks");
  assert.equal(done.choices[0].delta.tool_calls[0].function.arguments, '{"query":"deferred"}');
});

test("Responses->Chat: empty-name tool call is dropped when done still has no valid name", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallArgsBuffer: "",
    currentToolCallDeferred: false,
  };

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_empty", name: "" },
    },
    state
  );

  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_empty",
        name: " ",
        arguments: '{"ignored":true}',
      },
    },
    state
  );

  assert.equal(done, null);
  assert.equal(state.toolCallIndex, 0);
});

test("Responses->Claude: translated Claude SSE is not sanitized into empty OpenAI chunks", async () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const stream = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "codex",
    null,
    null,
    "gpt-5.4",
    "conn-test",
    { messages: [{ role: "user", content: "hi" }] },
    null,
    null
  );

  const writer = stream.writable.getWriter();
  await writer.write(
    encoder.encode('data: {"type":"response.output_text.delta","delta":"hello"}\n\n')
  );
  await writer.write(
    encoder.encode(
      'data: {"type":"response.completed","response":{"usage":{"input_tokens":12,"output_tokens":3}}}\n\n'
    )
  );
  await writer.close();

  const reader = stream.readable.getReader();
  let output = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    output += decoder.decode(value, { stream: true });
  }
  output += decoder.decode();

  assert.match(output, /event: message_start/);
  assert.match(output, /event: content_block_start/);
  assert.match(output, /event: content_block_delta/);
  assert.match(output, /event: message_delta/);
  assert.match(output, /event: message_stop/);
  assert.doesNotMatch(output, /data: \{"object":"chat\.completion\.chunk"\}\n\n/);
});
