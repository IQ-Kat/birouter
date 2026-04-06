import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-images-"));

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

test("handleImageGeneration routes OpenAI-compatible providers and forwards image options", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        created: 123,
        data: [{ url: "https://cdn.example.com/image.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "openai/dall-e-3",
        prompt: "city skyline",
        n: 2,
        size: "1024x1792",
        quality: "hd",
        response_format: "url",
        style: "vivid",
      },
      credentials: { apiKey: "image-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.openai.com/v1/images/generations");
    assert.equal(captured.headers.Authorization, "Bearer image-key");
    assert.deepEqual(captured.body, {
      model: "dall-e-3",
      prompt: "city skyline",
      n: 2,
      size: "1024x1792",
      quality: "hd",
      response_format: "url",
      style: "vivid",
    });
    assert.equal(result.data.data[0].url, "https://cdn.example.com/image.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration uses synthetic OpenAI-compatible routing for resolved custom providers", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(options.body || "{}")),
      headers: options.headers,
    };

    return new Response(JSON.stringify({ data: [{ b64_json: "ZmFrZQ==" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "custom-provider/super-image",
        prompt: "retro poster",
      },
      credentials: {
        apiKey: "custom-key",
        baseUrl: "https://custom.example.com/v1/images/generations",
      },
      resolvedProvider: "custom-provider",
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://custom.example.com/v1/images/generations");
    assert.equal(captured.headers.Authorization, "Bearer custom-key");
    assert.deepEqual(captured.body, {
      model: "super-image",
      prompt: "retro poster",
    });
    assert.equal(result.data.data[0].b64_json, "ZmFrZQ==");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration maps Hyperbolic size parameters and normalizes base64 images", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    return new Response(
      JSON.stringify({
        images: [{ image: "aW1hZ2UtMQ==" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "hyperbolic/FLUX.1-dev",
        prompt: "futuristic tower",
        size: "512x1024",
      },
      credentials: { apiKey: "hyper-key" },
      log: null,
    });

    assert.deepEqual(captured, {
      model_name: "FLUX.1-dev",
      prompt: "futuristic tower",
      height: 1024,
      width: 512,
      backend: "auto",
    });
    assert.equal(result.success, true);
    assert.equal(result.data.data[0].b64_json, "aW1hZ2UtMQ==");
    assert.equal(result.data.data[0].revised_prompt, "futuristic tower");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration maps SD WebUI payload shape and batch size", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    return new Response(
      JSON.stringify({
        images: ["YmFzZTY0LWltYWdl"],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "sdwebui/sdxl-base-1.0",
        prompt: "forest cabin",
        negative_prompt: "low quality",
        size: "768x768",
        steps: 30,
        cfg_scale: 9,
        sampler: "DPM++",
        n: 3,
      },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, true);
    assert.deepEqual(captured, {
      prompt: "forest cabin",
      negative_prompt: "low quality",
      width: 768,
      height: 768,
      steps: 30,
      cfg_scale: 9,
      sampler_name: "DPM++",
      batch_size: 3,
      override_settings: {
        sd_model_checkpoint: "sdxl-base-1.0",
      },
    });
    assert.equal(result.data.data[0].b64_json, "YmFzZTY0LWltYWdl");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration rejects invalid model strings", async () => {
  const result = await handleImageGeneration({
    body: {
      model: "not-a-provider-qualified-image-model",
      prompt: "oops",
    },
    credentials: { apiKey: "x" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid image model/);
});

test("handleImageGeneration treats unknown provider prefixes as invalid image models", async () => {
  const result = await handleImageGeneration({
    body: {
      model: "mystery/model-1",
      prompt: "oops",
    },
    credentials: { apiKey: "x" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid image model: mystery\/model-1/);
});
