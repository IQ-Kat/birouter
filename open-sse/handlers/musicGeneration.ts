/**
 * Music Generation Handler
 *
 * Handles POST /v1/music/generations requests.
 * Proxies to upstream music generation providers.
 *
 * Supported provider formats:
 * - ComfyUI: submit audio workflow → poll → fetch output
 *
 * Response format (OpenAI-like):
 * {
 *   "created": 1234567890,
 *   "data": [{ "b64_json": "...", "format": "wav" }]
 * }
 */

import { getMusicProvider, parseMusicModel } from "../config/musicRegistry.ts";
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../utils/comfyuiClient.ts";
import { saveCallLog } from "@/lib/usageDb";

/**
 * Handle music generation request
 */
export async function handleMusicGeneration({ body, credentials, log }) {
  const { provider, model } = parseMusicModel(body.model);

  if (!provider) {
    return {
      success: false,
      status: 400,
      error: `Invalid music model: ${body.model}. Use format: provider/model`,
    };
  }

  const providerConfig = getMusicProvider(provider);
  if (!providerConfig) {
    return {
      success: false,
      status: 400,
      error: `Unknown music provider: ${provider}`,
    };
  }

  if (providerConfig.format === "comfyui") {
    return handleComfyUIMusicGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "kie-music") {
    return handleKieMusicGeneration({ model, provider, providerConfig, body, credentials, log });
  }

  return {
    success: false,
    status: 400,
    error: `Unsupported music format: ${providerConfig.format}`,
  };
}

/**
 * Handle ComfyUI music generation
 * Submits an audio generation workflow (Stable Audio / MusicGen), polls, fetches output
 */
async function handleComfyUIMusicGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const duration = body.duration || 10; // seconds

  // Audio generation workflow template for ComfyUI
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
      class_type: "EmptyLatentAudio",
      inputs: { seconds: duration },
    },
    "5": {
      class_type: "KSampler",
      inputs: {
        seed: Math.floor(Math.random() * 2 ** 32),
        steps: body.steps || 100,
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
      class_type: "VAEDecodeAudio",
      inputs: { samples: ["5", 0], vae: ["1", 2] },
    },
    "7": {
      class_type: "SaveAudio",
      inputs: {
        filename_prefix: "omniroute_music",
        audio: ["6", 0],
      },
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "MUSIC",
      `${provider}/${model} (comfyui) | prompt: "${promptPreview}..." | duration: ${duration}s`
    );
  }

  try {
    const promptId = await submitComfyWorkflow(providerConfig.baseUrl, workflow);
    const historyEntry = await pollComfyResult(providerConfig.baseUrl, promptId, 300_000);
    const outputFiles = extractComfyOutputFiles(historyEntry);

    const audioFiles = [];
    for (const file of outputFiles) {
      const buffer = await fetchComfyOutput(
        providerConfig.baseUrl,
        file.filename,
        file.subfolder,
        file.type
      );
      const base64 = Buffer.from(buffer).toString("base64");
      audioFiles.push({ b64_json: base64, format: "wav" });
    }

    saveCallLog({
      method: "POST",
      path: "/v1/music/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { audio_count: audioFiles.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: audioFiles },
    };
  } catch (err) {
    if (log) log.error("MUSIC", `${provider} comfyui error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/music/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Music provider error: ${err.message}` };
  }
}

async function handleKieMusicGeneration({
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
    prompt: body.prompt,
    customMode: false,
    instrumental: true,
    model,
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("MUSIC", `${provider}/${model} (kie-music) | prompt: "${promptPreview}..."`);
  }

  try {
    const createRes = await fetch(`${baseUrl}/api/v1/generate`, {
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
      return { success: false, status: 502, error: "KIE music generation did not return taskId" };
    }

    const deadline = Date.now() + timeoutMs;
    const statusBaseUrl = `${baseUrl}/api/v1/generate/record-info`;

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
      const state = String(recordData?.data?.status || recordData?.msg || "PENDING").toUpperCase();

      if (state === "SUCCESS" || state === "1" || state === "FINISHED") {
        const tracks = Array.isArray(recordData?.data?.response?.sunoData)
          ? recordData.data.response.sunoData
          : [];
        const audioFiles = tracks
          .map((track: unknown) => {
            const t = track as Record<string, unknown>;
            return (typeof t?.audioUrl === "string" ? t.audioUrl : t?.url) as string;
          })
          .filter((url: string) => typeof url === "string" && url.length > 0)
          .map((url: string) => ({ url, format: "mp3" }));

        saveCallLog({
          method: "POST",
          path: "/v1/music/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          responseBody: { audio_count: audioFiles.length },
        }).catch(() => {});

        return {
          success: true,
          data: { created: Math.floor(Date.now() / 1000), data: audioFiles },
        };
      }

      if (
        state.includes("FAIL") ||
        state.includes("ERROR") ||
        state === "2" ||
        state === "3" ||
        state === "CREATE_TASK_FAILED" ||
        state === "GENERATE_AUDIO_FAILED"
      ) {
        const errorMessage =
          recordData?.data?.errorMessage ||
          recordData?.data?.failMsg ||
          recordData?.msg ||
          `KIE music task failed with status: ${state}`;
        return { success: false, status: 502, error: errorMessage };
      }

      await sleep(pollIntervalMs);
    }

    return {
      success: false,
      status: 504,
      error: `KIE music polling timed out after ${timeoutMs}ms`,
    };
  } catch (err) {
    return { success: false, status: 502, error: `Music provider error: ${err.message}` };
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
