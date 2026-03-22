import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");

function setRequestFormat(executor, provider, model, overrideFormat) {
  executor._requestFormat = overrideFormat ?? getModelTargetFormat(provider, model);
}

describe("OpencodeExecutor", () => {
  let zenExecutor;
  let goExecutor;

  beforeEach(() => {
    zenExecutor = new OpencodeExecutor("opencode-zen");
    goExecutor = new OpencodeExecutor("opencode-go");
  });

  describe("buildUrl", () => {
    it("returns chat completions for opencode zen default models", () => {
      setRequestFormat(zenExecutor, "opencode-zen", "minimax-m2.5-free");
      assert.equal(
        zenExecutor.buildUrl("minimax-m2.5-free", true),
        "https://opencode.ai/zen/v1/chat/completions"
      );

      setRequestFormat(zenExecutor, "opencode-zen", "big-pickle");
      assert.equal(
        zenExecutor.buildUrl("big-pickle", true),
        "https://opencode.ai/zen/v1/chat/completions"
      );

      setRequestFormat(zenExecutor, "opencode-zen", "gpt-5-nano");
      assert.equal(
        zenExecutor.buildUrl("gpt-5-nano", true),
        "https://opencode.ai/zen/v1/chat/completions"
      );
    });

    it("returns messages endpoint for claude target format models", () => {
      setRequestFormat(goExecutor, "opencode-go", "minimax-m2.7");
      assert.equal(
        goExecutor.buildUrl("minimax-m2.7", true),
        "https://opencode.ai/zen/go/v1/messages"
      );

      setRequestFormat(goExecutor, "opencode-go", "minimax-m2.5");
      assert.equal(
        goExecutor.buildUrl("minimax-m2.5", true),
        "https://opencode.ai/zen/go/v1/messages"
      );
    });

    it("returns responses endpoint for openai responses target format", () => {
      setRequestFormat(zenExecutor, "opencode-zen", "gpt-5-nano", "openai-responses");
      assert.equal(
        zenExecutor.buildUrl("gpt-5-nano", true),
        "https://opencode.ai/zen/v1/responses"
      );
    });

    it("returns gemini streaming endpoint when stream is true", () => {
      setRequestFormat(zenExecutor, "opencode-zen", "gemini-2.5-pro", "gemini");
      assert.equal(
        zenExecutor.buildUrl("gemini-2.5-pro", true),
        "https://opencode.ai/zen/v1/models/gemini-2.5-pro:streamGenerateContent?alt=sse"
      );
    });

    it("returns gemini non streaming endpoint when stream is false", () => {
      setRequestFormat(zenExecutor, "opencode-zen", "gemini-2.5-pro", "gemini");
      assert.equal(
        zenExecutor.buildUrl("gemini-2.5-pro", false),
        "https://opencode.ai/zen/v1/models/gemini-2.5-pro:generateContent"
      );
    });

    it("falls back to chat completions for unknown models", () => {
      setRequestFormat(zenExecutor, "opencode-zen", "unknown-model");
      assert.equal(
        zenExecutor.buildUrl("unknown-model", true),
        "https://opencode.ai/zen/v1/chat/completions"
      );
    });
  });

  describe("buildHeaders", () => {
    it("builds default headers for standard models", () => {
      setRequestFormat(zenExecutor, "opencode-zen", "gpt-5-nano");
      assert.deepEqual(zenExecutor.buildHeaders({ apiKey: "test-key" }), {
        Authorization: "Bearer test-key",
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      });
    });

    it("adds anthropic version for claude target format", () => {
      setRequestFormat(goExecutor, "opencode-go", "minimax-m2.7");
      assert.deepEqual(goExecutor.buildHeaders({ apiKey: "claude-key" }), {
        Authorization: "Bearer claude-key",
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        Accept: "text/event-stream",
      });
    });

    it("omits accept header when stream is false", () => {
      setRequestFormat(zenExecutor, "opencode-zen", "big-pickle");
      assert.deepEqual(zenExecutor.buildHeaders({ apiKey: "test-key" }, false), {
        Authorization: "Bearer test-key",
        "Content-Type": "application/json",
      });
    });

    it("omits authorization when credentials are missing", () => {
      setRequestFormat(zenExecutor, "opencode-zen", "minimax-m2.5-free");
      assert.deepEqual(zenExecutor.buildHeaders(null), {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      });
    });
  });
});
