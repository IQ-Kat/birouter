import { test } from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

test("OpencodeExecutor: honors targetFormat in ExecuteInput for custom models", async () => {
  const originalFetch = globalThis.fetch;
  let calledUrl = "";
  
  globalThis.fetch = async (url) => {
    calledUrl = String(url);
    // Return a dummy stream/response to prevent the executor from throwing
    const dummyStream = new ReadableStream({
      start(controller) {
        controller.close();
      }
    });
    return new Response(dummyStream, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" }
    });
  };

  try {
    const executor = new OpencodeExecutor("opencode-zen");
    await executor.execute({
      model: "muse-spark-1.2-contributor-free",
      body: {
        model: "muse-spark-1.2-contributor-free",
        input: []
      },
      stream: true,
      credentials: {
        apiKey: "sk-dummy-key"
      },
      targetFormat: "openai-responses"
    });

    assert.equal(calledUrl, "https://opencode.ai/zen/v1/responses");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OpencodeExecutor: falls back to static getModelTargetFormat when input.targetFormat is absent", async () => {
  const originalFetch = globalThis.fetch;
  let calledUrl = "";
  
  globalThis.fetch = async (url) => {
    calledUrl = String(url);
    const dummyStream = new ReadableStream({
      start(controller) {
        controller.close();
      }
    });
    return new Response(dummyStream, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" }
    });
  };

  try {
    const executor = new OpencodeExecutor("opencode-go");
    // minimax-m3 is mapped to targetFormat: "claude" in providerModels.ts / static registry
    await executor.execute({
      model: "minimax-m3",
      body: {},
      stream: true,
      credentials: {
        apiKey: "sk-dummy-key"
      }
    });

    assert.equal(calledUrl, "https://opencode.ai/zen/go/v1/messages");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
