/**
 * Video Generation Handler
 *
 * Handles POST /v1/videos/generations requests.
 * Proxies to upstream video generation providers.
 *
 * Supported provider formats:
 * - ComfyUI: submit AnimateDiff/SVD workflow → poll → fetch video
 * - SD WebUI: POST to AnimateDiff extension endpoint
 *
 * Response format (OpenAI-like):
 * {
 *   "created": 1234567890,
 *   "data": [{ "b64_json": "...", "format": "mp4" }]
 * }
 */

import { getVideoProvider, parseVideoModel } from "../config/videoRegistry.ts";
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../utils/comfyuiClient.ts";
import { saveCallLog } from "@/lib/usageDb";

/**
 * Handle video generation request
 */
export async function handleVideoGeneration({ body, credentials, log }) {
  const { provider, model } = parseVideoModel(body.model);

  if (!provider) {
    return {
      success: false,
      status: 400,
      error: `Invalid video model: ${body.model}. Use format: provider/model`,
    };
  }

  const providerConfig = getVideoProvider(provider);
  if (!providerConfig) {
    return {
      success: false,
      status: 400,
      error: `Unknown video provider: ${provider}`,
    };
  }

  if (providerConfig.format === "comfyui") {
    return handleComfyUIVideoGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "sdwebui-video") {
    return handleSDWebUIVideoGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "kie-video") {
    return handleKieVideoGeneration({ model, provider, providerConfig, body, credentials, log });
  }

  return {
    success: false,
    status: 400,
    error: `Unsupported video format: ${providerConfig.format}`,
  };
}

/**
 * Handle ComfyUI video generation
 * Submits an AnimateDiff or SVD workflow, polls for completion, fetches output video
 */
async function handleComfyUIVideoGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const [width, height] = (body.size || "512x512").split("x").map(Number);
  const frames = body.frames || 16;

  // AnimateDiff workflow template
  const workflow = {
    "1": {
      class_type: "CheckpointLoaderSimple",
      inputs: { ckpt_name: model },
    },
    "2": {
      class_type: "CLIPTextEncode",
      inputs: { text: body.prompt, clip: ["1", 1] },
    },
    "3": {
      class_type: "CLIPTextEncode",
      inputs: { text: body.negative_prompt || "", clip: ["1", 1] },
    },
    "4": {
      class_type: "EmptyLatentImage",
      inputs: { width: width || 512, height: height || 512, batch_size: frames },
    },
    "5": {
      class_type: "KSampler",
      inputs: {
        seed: Math.floor(Math.random() * 2 ** 32),
        steps: body.steps || 20,
        cfg: body.cfg_scale || 7,
        sampler_name: "euler",
        scheduler: "normal",
        denoise: 1,
        model: ["1", 0],
        positive: ["2", 0],
        negative: ["3", 0],
        latent_image: ["4", 0],
      },
    },
    "6": {
      class_type: "VAEDecode",
      inputs: { samples: ["5", 0], vae: ["1", 2] },
    },
    "7": {
      class_type: "SaveAnimatedWEBP",
      inputs: {
        filename_prefix: "omniroute_video",
        fps: body.fps || 8,
        lossless: false,
        quality: 80,
        method: "default",
        images: ["6", 0],
      },
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "VIDEO",
      `${provider}/${model} (comfyui) | prompt: "${promptPreview}..." | frames: ${frames}`
    );
  }

  try {
    const promptId = await submitComfyWorkflow(providerConfig.baseUrl, workflow);
    const historyEntry = await pollComfyResult(providerConfig.baseUrl, promptId, 300_000);
    const outputFiles = extractComfyOutputFiles(historyEntry);

    const videos = [];
    for (const file of outputFiles) {
      const buffer = await fetchComfyOutput(
        providerConfig.baseUrl,
        file.filename,
        file.subfolder,
        file.type
      );
      const base64 = Buffer.from(buffer).toString("base64");
      videos.push({ b64_json: base64, format: "webp" });
    }

    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { videos_count: videos.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: videos },
    };
  } catch (err) {
    if (log) log.error("VIDEO", `${provider} comfyui error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Video provider error: ${err.message}` };
  }
}

/**
 * Handle SD WebUI video generation via AnimateDiff extension
 * POST to the AnimateDiff API endpoint
 */
async function handleSDWebUIVideoGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const [width, height] = (body.size || "512x512").split("x").map(Number);
  const url = `${providerConfig.baseUrl}/animatediff/v1/generate`;

  const upstreamBody = {
    prompt: body.prompt,
    negative_prompt: body.negative_prompt || "",
    width: width || 512,
    height: height || 512,
    steps: body.steps || 20,
    cfg_scale: body.cfg_scale || 7,
    frames: body.frames || 16,
    fps: body.fps || 8,
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("VIDEO", `${provider}/${model} (sdwebui) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("VIDEO", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      saveCallLog({
        method: "POST",
        path: "/v1/videos/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});
      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    // SD WebUI AnimateDiff returns { video: "base64..." } or { images: [...] }
    const videos = [];
    if (data.video) {
      videos.push({ b64_json: data.video, format: "mp4" });
    } else if (data.images) {
      for (const img of data.images) {
        videos.push({ b64_json: typeof img === "string" ? img : img.image, format: "mp4" });
      }
    }

    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { videos_count: videos.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: videos },
    };
  } catch (err) {
    if (log) log.error("VIDEO", `${provider} sdwebui error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Video provider error: ${err.message}` };
  }
}

async function handleKieVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const timeoutMs = Number(body.timeout_ms) > 0 ? Number(body.timeout_ms) : 300000;
  const pollIntervalMs = Number(body.poll_interval_ms) > 0 ? Number(body.poll_interval_ms) : 2500;
  const token = credentials?.apiKey || credentials?.accessToken;
  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");

  const payload = {
    model,
    input: {
      prompt: body.prompt,
      duration: body.duration ? String(body.duration) : "5",
      aspect_ratio: body.aspect_ratio || "16:9",
      sound: body.sound === true,
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("VIDEO", `${provider}/${model} (kie-video) | prompt: "${promptPreview}..."`);
  }

  try {
    const createRes = await fetch(`${baseUrl}/api/v1/jobs/createTask`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!createRes.ok) {
      const errorText = await createRes.text();
      return { success: false, status: createRes.status, error: errorText };
    }

    const createData = await createRes.json();
    const taskId = createData?.data?.taskId || createData?.taskId;
    if (!taskId) {
      return { success: false, status: 502, error: "KIE video generation did not return taskId" };
    }

    const deadline = Date.now() + timeoutMs;
    const statusBaseUrl = `${baseUrl}/api/v1/jobs/recordInfo`;

    while (Date.now() < deadline) {
      const pollUrl = new URL(statusBaseUrl);
      pollUrl.searchParams.set("taskId", String(taskId));

      const recordRes = await fetch(pollUrl.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!recordRes.ok) {
        const errorText = await recordRes.text();
        return { success: false, status: recordRes.status, error: errorText };
      }

      const recordData = await recordRes.json();
      const state = String(
        recordData?.data?.state || recordData?.data?.status || "generating"
      ).toLowerCase();

      if (state === "success" || state === "1" || state === "finished") {
        let resultJson: Record<string, unknown> = {};
        try {
          resultJson =
            typeof recordData?.data?.resultJson === "string"
              ? JSON.parse(recordData.data.resultJson)
              : recordData?.data?.resultJson || {};
        } catch {
          resultJson = {};
        }
        const urls = Array.isArray(resultJson?.resultUrls)
          ? resultJson.resultUrls
          : Array.isArray(resultJson?.videoUrls)
            ? resultJson.videoUrls
            : Array.isArray(recordData?.data?.response?.resultUrls)
              ? recordData.data.response.resultUrls
              : [];
        const videos = urls
          .filter((url: unknown) => typeof url === "string" && url.length > 0)
          .map((url: unknown) => ({ url: url as string, format: "mp4" }));

        saveCallLog({
          method: "POST",
          path: "/v1/videos/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          responseBody: { videos_count: videos.length },
        }).catch(() => {});

        return {
          success: true,
          data: { created: Math.floor(Date.now() / 1000), data: videos },
        };
      }

      if (
        state === "fail" ||
        state === "failed" ||
        state === "error" ||
        state === "2" ||
        state === "3" ||
        state.includes("fail") ||
        state.includes("error") ||
        state.includes("failed")
      ) {
        const errorMessage =
          recordData?.data?.failMsg ||
          recordData?.data?.errorMessage ||
          recordData?.msg ||
          `KIE video task failed with state: ${state}`;
        return { success: false, status: 502, error: errorMessage };
      }

      await sleep(pollIntervalMs);
    }

    return {
      success: false,
      status: 504,
      error: `KIE video polling timed out after ${timeoutMs}ms`,
    };
  } catch (err) {
    return { success: false, status: 502, error: `Video provider error: ${err.message}` };
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
