import { getCorsOrigin } from "../utils/cors.ts";
/**
 * Audio Transcription Handler
 *
 * Handles POST /v1/audio/transcriptions (Whisper API format).
 * Proxies multipart/form-data to upstream providers.
 *
 * Supported provider formats:
 * - OpenAI/Groq/Qwen3: standard multipart form-data proxy
 * - Deepgram: raw binary audio POST with model via query param
 * - AssemblyAI: async workflow (upload → submit → poll)
 * - Nvidia NIM: multipart POST, transform response to { text }
 * - HuggingFace Inference: POST raw binary to /models/{model_id}
 */

import { getTranscriptionProvider, parseTranscriptionModel } from "../config/audioRegistry.ts";
import { buildAuthHeaders } from "../config/registryUtils.ts";
import { errorResponse } from "../utils/error.ts";

type TranscriptionCredentials = {
  apiKey?: string;
  accessToken?: string;
};

/**
 * Return a CORS error response from an upstream fetch failure
 */
function upstreamErrorResponse(res, errText) {
  // Always return JSON so the client can parse the error reliably
  let errorMessage: string;
  try {
    const parsed = JSON.parse(errText);
    errorMessage =
      parsed?.err_msg ||
      parsed?.error?.message ||
      parsed?.error ||
      parsed?.message ||
      parsed?.detail ||
      errText;
  } catch {
    errorMessage = errText || `Upstream error (${res.status})`;
  }

  return Response.json(
    { error: { message: errorMessage, code: res.status } },
    {
      status: res.status,
      headers: { "Access-Control-Allow-Origin": getCorsOrigin() },
    }
  );
}

/**
 * Validate a path segment to prevent path traversal / SSRF.
 */
function isValidPathSegment(segment: string): boolean {
  return !segment.includes("..") && !segment.includes("//");
}

function getUploadedFileName(file: Blob & { name?: unknown }): string {
  return typeof file.name === "string" && file.name.length > 0 ? file.name : "audio.wav";
}

/**
 * Handle Deepgram transcription (raw binary audio, model via query param)
 */
async function handleDeepgramTranscription(providerConfig, file, modelId, token) {
  const url = new URL(providerConfig.baseUrl);
  url.searchParams.set("model", modelId);
  url.searchParams.set("smart_format", "true");

  const arrayBuffer = await file.arrayBuffer();

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      ...buildAuthHeaders(providerConfig, token),
      "Content-Type": file.type || "audio/wav",
    },
    body: arrayBuffer,
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  const data = await res.json();
  // Transform Deepgram response to OpenAI Whisper format
  const text = data.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? null;

  // null means the audio had no recognizable speech (music, silence, etc.)
  // Return it explicitly so the client can distinguish from a credentials error
  return Response.json(
    { text: text ?? "", noSpeechDetected: text === null || text === "" },
    { headers: { "Access-Control-Allow-Origin": getCorsOrigin() } }
  );
}

/**
 * Handle AssemblyAI transcription (async: upload file → submit → poll)
 */
async function handleAssemblyAITranscription(providerConfig, file, modelId, token) {
  const authHeaders = buildAuthHeaders(providerConfig, token);

  // Step 1: Upload the audio file
  const arrayBuffer = await file.arrayBuffer();
  const uploadRes = await fetch("https://api.assemblyai.com/v2/upload", {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": "application/octet-stream",
    },
    body: arrayBuffer,
  });

  if (!uploadRes.ok) {
    return upstreamErrorResponse(uploadRes, await uploadRes.text());
  }

  const { upload_url } = await uploadRes.json();

  // Step 2: Submit transcription request
  const submitRes = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      audio_url: upload_url,
      speech_models: [modelId],
      language_detection: true,
    }),
  });

  if (!submitRes.ok) {
    return upstreamErrorResponse(submitRes, await submitRes.text());
  }

  const { id: transcriptId } = await submitRes.json();

  // Step 3: Poll for completion (max 120s)
  const pollUrl = `${providerConfig.baseUrl}/${transcriptId}`;
  const maxWait = 120_000;
  const start = Date.now();

  while (Date.now() - start < maxWait) {
    await new Promise((r) => setTimeout(r, 2000));

    const pollRes = await fetch(pollUrl, { headers: authHeaders });
    if (!pollRes.ok) continue;

    const result = await pollRes.json();

    if (result.status === "completed") {
      return Response.json(
        { text: result.text || "" },
        { headers: { "Access-Control-Allow-Origin": getCorsOrigin() } }
      );
    }

    if (result.status === "error") {
      return errorResponse(500, result.error || "AssemblyAI transcription failed");
    }
  }

  return errorResponse(504, "AssemblyAI transcription timed out after 120s");
}

/**
 * Handle Nvidia NIM transcription
 * Multipart POST, transform response to { text }
 */
async function handleNvidiaTranscription(providerConfig, file, modelId, token) {
  const upstreamForm = new FormData();
  upstreamForm.append("file", file, getUploadedFileName(file));
  upstreamForm.append("model", modelId);

  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: buildAuthHeaders(providerConfig, token),
    body: upstreamForm,
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  const data = await res.json();
  // Normalize to { text } — Nvidia may return { text } directly or nested
  const text = data.text || data.transcript || "";

  return Response.json({ text }, { headers: { "Access-Control-Allow-Origin": getCorsOrigin() } });
}

/**
 * Handle HuggingFace Inference transcription
 * POST raw binary audio to {baseUrl}/{model_id}, returns { text }
 */
async function handleHuggingFaceTranscription(providerConfig, file, modelId, token) {
  if (!isValidPathSegment(modelId)) {
    return errorResponse(400, "Invalid model ID");
  }
  const url = `${providerConfig.baseUrl}/${modelId}`;
  const arrayBuffer = await file.arrayBuffer();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...buildAuthHeaders(providerConfig, token),
      "Content-Type": file.type || "audio/wav",
    },
    body: arrayBuffer,
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  const data = await res.json();
  // HuggingFace returns { text } directly
  const text = data.text || "";

  return Response.json({ text }, { headers: { "Access-Control-Allow-Origin": getCorsOrigin() } });
}

/**
 * Handle audio transcription request
 *
 * @param {Object} options
 * @param {FormData} options.formData - Multipart form data with file + model
 * @param {Object} options.credentials - Provider credentials { apiKey }
 * @returns {Response}
 */
export async function handleAudioTranscription({
  formData,
  credentials,
}: {
  formData: FormData;
  credentials?: TranscriptionCredentials | null;
}): Promise<Response> {
  const model = formData.get("model");
  if (typeof model !== "string" || !model) {
    return errorResponse(400, "model is required");
  }

  const fileEntry = formData.get("file");
  if (!(fileEntry instanceof Blob)) {
    return errorResponse(400, "file is required");
  }
  const file = fileEntry as Blob & { name?: unknown };

  const { provider: providerId, model: modelId } = parseTranscriptionModel(model);
  const providerConfig = providerId ? getTranscriptionProvider(providerId) : null;

  if (!providerConfig) {
    return errorResponse(
      400,
      `No transcription provider found for model "${model}". Available: openai, groq, deepgram, assemblyai, nvidia, huggingface, qwen`
    );
  }

  // Skip credential check for local providers (authType: "none")
  const token =
    providerConfig.authType === "none" ? null : credentials?.apiKey || credentials?.accessToken;
  if (providerConfig.authType !== "none" && !token) {
    return errorResponse(401, `No credentials for transcription provider: ${providerId}`);
  }

  // Route to provider-specific handler
  if (providerConfig.format === "deepgram") {
    return handleDeepgramTranscription(providerConfig, file, modelId, token);
  }

  if (providerConfig.format === "assemblyai") {
    return handleAssemblyAITranscription(providerConfig, file, modelId, token);
  }

  if (providerConfig.format === "nvidia-asr") {
    return handleNvidiaTranscription(providerConfig, file, modelId, token);
  }

  if (providerConfig.format === "huggingface-asr") {
    return handleHuggingFaceTranscription(providerConfig, file, modelId, token);
  }

  // Default: OpenAI/Groq/Qwen3-compatible multipart proxy
  const upstreamForm = new FormData();
  upstreamForm.append("file", file, getUploadedFileName(file));
  upstreamForm.append("model", modelId);

  // Forward optional parameters
  for (const key of [
    "language",
    "prompt",
    "response_format",
    "temperature",
    "timestamp_granularities[]",
  ]) {
    const val = formData.get(key);
    if (val !== null && val !== undefined) {
      upstreamForm.append(key, /** @type {string} */ val);
    }
  }

  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: buildAuthHeaders(providerConfig, token),
      body: upstreamForm,
    });

    if (!res.ok) {
      return upstreamErrorResponse(res, await res.text());
    }

    const data = await res.text();
    const contentType = res.headers.get("content-type") || "application/json";

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": contentType, "Access-Control-Allow-Origin": getCorsOrigin() },
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return errorResponse(500, `Transcription request failed: ${error.message}`);
  }
}
