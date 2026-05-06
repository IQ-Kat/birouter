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
import { kieExecutor } from "../executors/kie.ts";
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../utils/comfyuiClient.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sleep } from "../utils/sleep.ts";

function getKieCallbackUrl(body: any): string {
  return (
    body.callBackUrl ||
    body.callback_url ||
    body.callbackUrl ||
    "https://omniroute.local/api/kie/callback"
  );
}

function normalizeKieSunoModel(model: string): string {
  const map: Record<string, string> = {
    "suno-v3.5": "V3_5",
    "suno-v4.0": "V4",
  };
  return map[model] || model;
}

function parseKieResultJson(recordData: any): any {
  try {
    return typeof recordData?.data?.resultJson === "string"
      ? JSON.parse(recordData.data.resultJson)
      : recordData?.data?.resultJson || {};
  } catch {
    return {};
  }
}

function normalizeKieMusicTracks(recordData: any): any[] {
  const resultJson = parseKieResultJson(recordData);
  const candidates = [
    recordData?.data?.response?.sunoData,
    recordData?.data?.response?.data,
    recordData?.data?.data,
    recordData?.data?.sunoData,
    resultJson?.sunoData,
    resultJson?.data,
    resultJson?.result,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate;
    }
  }

  const singleUrl =
    recordData?.data?.response?.audioUrl ||
    recordData?.data?.response?.audio_url ||
    recordData?.data?.resultUrl ||
    recordData?.data?.audio_url ||
    resultJson?.audioUrl ||
    resultJson?.audio_url ||
    resultJson?.url;

  return typeof singleUrl === "string" && singleUrl.length > 0 ? [{ audioUrl: singleUrl }] : [];
}

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
}: {
  model: string;
  provider: string;
  providerConfig: any;
  body: any;
  credentials: any;
  log: any;
}) {
  const startTime = Date.now();
  const timeoutMs = Number(body.timeout_ms) > 0 ? Number(body.timeout_ms) : 300000;
  const pollIntervalMs = Number(body.poll_interval_ms) > 0 ? Number(body.poll_interval_ms) : 2500;
  const token = credentials?.apiKey || credentials?.accessToken;
  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");

  // Check if model is a Market model
  const fullRegistry = getMusicProvider(provider);
  const modelEntry = fullRegistry?.models?.find((m: any) => m.id === model);
  const isMarket = modelEntry?.isMarket || model.includes("/");

  let url = "";
  let payload: any = {};

  if (isMarket) {
    url = `${baseUrl}/api/v1/jobs/createTask`;
    payload = {
      model: model.includes("/") ? model.split("/").pop() : model,
      callBackUrl: getKieCallbackUrl(body),
      input: {
        prompt: body.prompt,
        instrumental: true,
      },
    };
  } else {
    url = `${baseUrl}/api/v1/generate`;
    payload = {
      prompt: body.prompt,
      customMode: false,
      instrumental: true,
      model: normalizeKieSunoModel(model),
      callBackUrl: getKieCallbackUrl(body),
    };
  }

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "MUSIC",
      `${provider}/${model} (${isMarket ? "market" : "direct"}) | prompt: "${promptPreview}..."`
    );
  }

  try {
    const endpoint = new URL(url).pathname;
    const createData = await kieExecutor.createTask({ baseUrl, token, payload, endpoint });
    const taskId = createData?.data?.taskId || createData?.taskId;
    if (!taskId) {
      const errorMessage =
        createData?.msg ||
        createData?.message ||
        createData?.error ||
        "KIE music generation did not return taskId";
      if (log) {
        log.error("MUSIC", `KIE createTask failed: ${JSON.stringify(createData)}`);
      }
      return { success: false, status: 502, error: errorMessage };
    }

    const deadline = Date.now() + timeoutMs;
    const statusUrl = isMarket
      ? `${baseUrl}/api/v1/jobs/recordInfo`
      : providerConfig.statusUrl || `${baseUrl}/api/v1/generate/record-info`;

    while (Date.now() < deadline) {
      const pollUrl = new URL(statusUrl);
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
        recordData?.data?.status ??
          recordData?.data?.state ??
          recordData?.data?.successFlag ??
          recordData?.msg ??
          "PENDING"
      ).toUpperCase();

      if (state === "SUCCESS" || state === "1" || state === "FINISHED") {
        const tracks = normalizeKieMusicTracks(recordData);

        const audioFiles = tracks
          .map((track: any) => {
            return (
              typeof track?.audioUrl === "string" ? track.audioUrl : track?.audio_url || track?.url
            ) as string;
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
    return {
      success: false,
      status: 502,
      error: `Music provider error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
