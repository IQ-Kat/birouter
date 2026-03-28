import test from "node:test";
import assert from "node:assert/strict";

const { convertResponsesApiFormat } = await import(
  "../../open-sse/translator/helpers/responsesApiHelper.ts"
);
const { openaiResponsesToOpenAIRequest, openaiToOpenAIResponsesRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
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

test("Responses→Chat: input_image converted to image_url with detail", () => {
  const body = {
    model: "gpt-4",
    input: [
      {
        type: "message",
        role: "user",
        content: [
          { type: "input_text", text: "What is this?" },
          { type: "input_image", image_url: "https://example.com/img.png", detail: "high" },
        ],
      },
    ],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  const userMsg = result.messages.find((m) => m.role === "user");
  const imgPart = userMsg.content.find((c) => c.type === "image_url");
  assert.ok(imgPart, "should have image_url content part");
  assert.equal(imgPart.image_url.url, "https://example.com/img.png");
  assert.equal(imgPart.image_url.detail, "high");
});

test("Responses→Chat: input_image without detail omits detail field", () => {
  const body = {
    model: "gpt-4",
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_image", image_url: "https://example.com/img.png" }],
      },
    ],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  const userMsg = result.messages.find((m) => m.role === "user");
  const imgPart = userMsg.content.find((c) => c.type === "image_url");
  assert.ok(imgPart);
  assert.equal(imgPart.image_url.url, "https://example.com/img.png");
  assert.equal(imgPart.image_url.detail, undefined);
});

test("Chat→Responses: image_url detail preserved as input_image", () => {
  const body = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe" },
          { type: "image_url", image_url: { url: "https://example.com/img.png", detail: "low" } },
        ],
      },
    ],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  const userItem = result.input.find((i) => i.type === "message" && i.role === "user");
  const imgPart = userItem.content.find((c) => c.type === "input_image");
  assert.ok(imgPart, "should have input_image content part");
  assert.equal(imgPart.image_url, "https://example.com/img.png");
  assert.equal(imgPart.detail, "low");
});

test("Chat→Responses: image_url without detail omits detail", () => {
  const body = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: "https://example.com/img.png" } },
        ],
      },
    ],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  const userItem = result.input.find((i) => i.type === "message" && i.role === "user");
  const imgPart = userItem.content.find((c) => c.type === "input_image");
  assert.ok(imgPart);
  assert.equal(imgPart.detail, undefined);
});

test("Responses→Chat: input_file converted to file content part", () => {
  const body = {
    model: "gpt-4",
    input: [
      {
        type: "message",
        role: "user",
        content: [
          { type: "input_file", file_id: "file-abc", filename: "data.csv" },
        ],
      },
    ],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  const userMsg = result.messages.find((m) => m.role === "user");
  const filePart = userMsg.content.find((c) => c.type === "file");
  assert.ok(filePart, "should have file content part");
  assert.equal(filePart.file.file_id, "file-abc");
  assert.equal(filePart.file.filename, "data.csv");
});

test("Chat→Responses: file content part converted to input_file", () => {
  const body = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: [
          { type: "file", file: { file_id: "file-abc", filename: "data.csv" } },
        ],
      },
    ],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  const userItem = result.input.find((i) => i.type === "message" && i.role === "user");
  const filePart = userItem.content.find((c) => c.type === "input_file");
  assert.ok(filePart, "should have input_file content part");
  assert.equal(filePart.file_id, "file-abc");
  assert.equal(filePart.filename, "data.csv");
});

test("Responses→Chat: tool_choice {type:'function', name} wrapped to {type:'function', function:{name}}", () => {
  const body = {
    model: "gpt-4",
    input: "hello",
    tool_choice: { type: "function", name: "get_weather" },
    tools: [{ type: "function", name: "get_weather", parameters: {} }],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  assert.deepEqual(result.tool_choice, {
    type: "function",
    function: { name: "get_weather" },
  });
});

test("Chat→Responses: tool_choice {type:'function', function:{name}} unwrapped to {type:'function', name}", () => {
  const body = {
    model: "gpt-4",
    messages: [{ role: "user", content: "hello" }],
    tool_choice: { type: "function", function: { name: "get_weather" } },
    tools: [{ type: "function", function: { name: "get_weather", parameters: {} } }],
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  assert.deepEqual(result.tool_choice, {
    type: "function",
    name: "get_weather",
  });
});

test("Responses→Chat: string tool_choice passes through unchanged", () => {
  const body = { model: "gpt-4", input: "hello", tool_choice: "auto" };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  assert.equal(result.tool_choice, "auto");
});

test("Chat→Responses: string tool_choice passes through unchanged", () => {
  const body = {
    model: "gpt-4",
    messages: [{ role: "user", content: "hello" }],
    tool_choice: "required",
  };
  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, null);
  assert.equal(result.tool_choice, "required");
});

test("Responses→Chat: built-in tool_choice type throws unsupported error", () => {
  const body = {
    model: "gpt-4",
    input: "hello",
    tool_choice: { type: "web_search_preview" },
  };
  assert.throws(
    () => openaiResponsesToOpenAIRequest(null, body, null, null),
    (err) => err.message.includes("web_search_preview")
  );
});

test("Responses→Chat: web_search tool type throws unsupported error", () => {
  const body = {
    model: "gpt-4",
    input: "search for cats",
    tools: [{ type: "web_search", search_context_size: "medium" }],
  };
  assert.throws(
    () => openaiResponsesToOpenAIRequest(null, body, null, null),
    (err) => err.message.includes("web_search")
  );
});

test("Responses→Chat: computer tool type throws unsupported error", () => {
  const body = {
    model: "gpt-4",
    input: "click button",
    tools: [{ type: "computer" }],
  };
  assert.throws(
    () => openaiResponsesToOpenAIRequest(null, body, null, null),
    (err) => err.message.includes("computer")
  );
});

test("Responses→Chat: mcp tool type throws unsupported error", () => {
  const body = {
    model: "gpt-4",
    input: "hello",
    tools: [{ type: "mcp", server_label: "test", server_url: "https://example.com" }],
  };
  assert.throws(
    () => openaiResponsesToOpenAIRequest(null, body, null, null),
    (err) => err.message.includes("mcp")
  );
});

test("Responses→Chat: function tool type passes through", () => {
  const body = {
    model: "gpt-4",
    input: "hello",
    tools: [{ type: "function", name: "greet", parameters: {} }],
  };
  const result = openaiResponsesToOpenAIRequest(null, body, null, null);
  assert.equal(result.tools.length, 1);
  assert.equal(result.tools[0].type, "function");
});
