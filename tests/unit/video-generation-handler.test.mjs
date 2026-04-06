import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-"));

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

test("handleVideoGeneration rejects invalid model strings", async () => {
  const result = await handleVideoGeneration({
    body: { model: "invalid-video-model", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid video model/);
});

test("handleVideoGeneration treats unknown provider prefixes as invalid video models", async () => {
  const result = await handleVideoGeneration({
    body: { model: "mystery/model-1", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid video model: mystery\/model-1/);
});

test("handleVideoGeneration routes SD WebUI payloads and normalizes mp4 output", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        video: "bXA0LWJhc2U2NA==",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "sdwebui/animatediff-webui",
        prompt: "ocean wave",
        negative_prompt: "low quality",
        size: "640x360",
        steps: 30,
        cfg_scale: 8,
        frames: 24,
        fps: 12,
      },
      credentials: null,
      log: null,
    });

    assert.equal(captured.url, "http://localhost:7860/animatediff/v1/generate");
    assert.deepEqual(captured.body, {
      prompt: "ocean wave",
      negative_prompt: "low quality",
      width: 640,
      height: 360,
      steps: 30,
      cfg_scale: 8,
      frames: 24,
      fps: 12,
    });
    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [{ b64_json: "bXA0LWJhc2U2NA==", format: "mp4" }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration executes ComfyUI workflow and returns fetched output files", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let promptBody;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "http://localhost:8188/prompt") {
      promptBody = JSON.parse(String(options.body || "{}"));
      return new Response(JSON.stringify({ prompt_id: "video-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "http://localhost:8188/history/video-1") {
      return new Response(
        JSON.stringify({
          "video-1": {
            outputs: {
              7: {
                gifs: [{ filename: "clip.webp", subfolder: "out", type: "output" }],
              },
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (stringUrl.includes("/view?")) {
      return new Response(new Uint8Array([1, 2, 3, 4]), { status: 200 });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "comfyui/animatediff",
        prompt: "neon car",
        size: "720x480",
        frames: 20,
        fps: 10,
        steps: 12,
        cfg_scale: 6,
      },
      credentials: null,
      log: null,
    });

    assert.equal(
      promptBody.prompt["4"].inputs.width,
      720,
      "workflow should use parsed width for latent image"
    );
    assert.equal(promptBody.prompt["4"].inputs.height, 480);
    assert.equal(promptBody.prompt["4"].inputs.batch_size, 20);
    assert.equal(promptBody.prompt["7"].inputs.fps, 10);
    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [{ b64_json: "AQIDBA==", format: "webp" }]);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});
