import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");

function buildFile(contents, name, type) {
  return new File([Buffer.from(contents)], name, { type });
}

test("handleAudioTranscription requires model", async () => {
  const formData = new FormData();
  formData.append("file", buildFile("abc", "audio.wav", "audio/wav"));

  const response = await handleAudioTranscription({ formData, credentials: { apiKey: "x" } });
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "model is required");
});

test("handleAudioTranscription requires a file upload", async () => {
  const formData = new FormData();
  formData.append("model", "openai/whisper-1");

  const response = await handleAudioTranscription({ formData, credentials: { apiKey: "x" } });
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "file is required");
});

test("handleAudioTranscription proxies OpenAI-compatible multipart requests and forwards optional params", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    const upstreamEntries = Array.from(options.body.entries());
    captured = {
      url: String(url),
      headers: options.headers,
      entries: upstreamEntries.map(([key, value]) => [
        key,
        value instanceof File ? { name: value.name, type: value.type } : value,
      ]),
    };

    return new Response(JSON.stringify({ text: "hello" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const formData = new FormData();
    formData.append("model", "openai/whisper-1");
    formData.append("file", buildFile("abc", "clip.webm", "audio/webm"));
    formData.append("language", "pt");
    formData.append("prompt", "meeting");
    formData.append("response_format", "verbose_json");
    formData.append("temperature", "0.1");
    formData.append("timestamp_granularities[]", "word");

    const response = await handleAudioTranscription({
      formData,
      credentials: { apiKey: "openai-key" },
    });

    assert.equal(response.status, 200);
    assert.equal(captured.url, "https://api.openai.com/v1/audio/transcriptions");
    assert.equal(captured.headers.Authorization, "Bearer openai-key");
    assert.deepEqual(captured.entries, [
      ["file", { name: "clip.webm", type: "audio/webm" }],
      ["model", "whisper-1"],
      ["language", "pt"],
      ["prompt", "meeting"],
      ["response_format", "verbose_json"],
      ["temperature", "0.1"],
      ["timestamp_granularities[]", "word"],
    ]);
    assert.deepEqual(await response.json(), { text: "hello" });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioTranscription routes Deepgram with binary upload and language passthrough", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;
  let capturedHeaders;
  let capturedBody;

  globalThis.fetch = async (url, options = {}) => {
    capturedUrl = String(url);
    capturedHeaders = options.headers;
    capturedBody = options.body;

    return new Response(
      JSON.stringify({
        results: {
          channels: [{ alternatives: [{ transcript: "ola mundo" }] }],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const formData = new FormData();
    formData.append("model", "deepgram/nova-3");
    formData.append("file", buildFile("abc", "clip.mp4", "video/mp4"));
    formData.append("language", "pt-BR");

    const response = await handleAudioTranscription({
      formData,
      credentials: { apiKey: "dg-key" },
    });
    const payload = await response.json();

    const url = new URL(capturedUrl);
    assert.equal(url.origin + url.pathname, "https://api.deepgram.com/v1/listen");
    assert.equal(url.searchParams.get("model"), "nova-3");
    assert.equal(url.searchParams.get("language"), "pt-BR");
    assert.equal(url.searchParams.get("detect_language"), null);
    assert.equal(capturedHeaders.Authorization, "Token dg-key");
    assert.equal(capturedHeaders["Content-Type"], "audio/mp4");
    assert.ok(capturedBody instanceof ArrayBuffer);
    assert.deepEqual(payload, { text: "ola mundo", noSpeechDetected: false });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioTranscription marks noSpeechDetected when Deepgram returns no transcript", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        results: {
          channels: [{ alternatives: [{ transcript: "" }] }],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const formData = new FormData();
    formData.append("model", "deepgram/nova-3");
    formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

    const response = await handleAudioTranscription({
      formData,
      credentials: { apiKey: "dg-key" },
    });

    assert.deepEqual(await response.json(), { text: "", noSpeechDetected: true });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioTranscription normalizes Nvidia responses to text", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = {
      headers: options.headers,
      entries: Array.from(options.body.entries()).map(([key, value]) => [
        key,
        value instanceof File ? { name: value.name, type: value.type } : value,
      ]),
    };

    return new Response(JSON.stringify({ transcript: "nvidia text" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const formData = new FormData();
    formData.append("model", "nvidia/nvidia/parakeet-ctc-1.1b-asr");
    formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

    const response = await handleAudioTranscription({
      formData,
      credentials: { apiKey: "nvidia-key" },
    });

    assert.equal(captured.headers.Authorization, "Bearer nvidia-key");
    assert.deepEqual(captured.entries, [
      ["file", { name: "clip.wav", type: "audio/wav" }],
      ["model", "nvidia/parakeet-ctc-1.1b-asr"],
    ]);
    assert.deepEqual(await response.json(), { text: "nvidia text" });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioTranscription rejects invalid HuggingFace model paths", async () => {
  const formData = new FormData();
  formData.append("model", "huggingface/../escape");
  formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

  const response = await handleAudioTranscription({
    formData,
    credentials: { apiKey: "hf-key" },
  });
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "Invalid model ID");
});

test("handleAudioTranscription requires credentials for authenticated providers", async () => {
  const formData = new FormData();
  formData.append("model", "openai/whisper-1");
  formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

  const response = await handleAudioTranscription({ formData, credentials: null });
  const payload = await response.json();

  assert.equal(response.status, 401);
  assert.equal(payload.error.message, "No credentials for transcription provider: openai");
});
