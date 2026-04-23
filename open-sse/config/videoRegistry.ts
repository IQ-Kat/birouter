/**
 * Video Generation Provider Registry
 *
 * Defines providers that support the /v1/videos/generations endpoint.
 * Currently supports local providers (ComfyUI, SD WebUI with AnimateDiff).
 */

import { parseModelFromRegistry, getAllModelsFromRegistry } from "./registryUtils.ts";

interface VideoModel {
  id: string;
  name: string;
}

interface VideoProvider {
  id: string;
  baseUrl: string;
  authType: string;
  authHeader: string;
  format: string;
  models: VideoModel[];
}

export const VIDEO_PROVIDERS: Record<string, VideoProvider> = {
  kie: {
    id: "kie",
    baseUrl: "https://api.kie.ai",
    authType: "apikey",
    authHeader: "bearer",
    format: "kie-video",
    models: [
      { id: "kling-2.6/text-to-video", name: "Kling 2.6 Text to Video" },
      { id: "kling/v2-1-master-image-to-video", name: "Kling v2.1 Master I2V" },
      { id: "kling/v2-1-master-text-to-video", name: "Kling v2.1 Master T2V" },
      { id: "kling/v25-turbo-image-to-video-pro", name: "Kling v2.5 Turbo I2V Pro" },
      { id: "kling/v25-turbo-text-to-video-pro", name: "Kling v2.5 Turbo T2V Pro" },
      { id: "wan/2-6-text-to-video", name: "Wan 2.6 Text to Video" },
      { id: "wan/2-6-image-to-video", name: "Wan 2.6 Image to Video" },
      { id: "wan/2-7-text-to-video", name: "Wan 2.7 Text to Video" },
      { id: "wan/2-7-image-to-video", name: "Wan 2.7 Image to Video" },
      { id: "sora2/sora-2-text-to-video", name: "Sora 2 Text to Video" },
      { id: "sora2/sora-2-image-to-video", name: "Sora 2 Image to Video" },
      { id: "hailuo/02-text-to-video-pro", name: "Hailuo 02 T2V Pro" },
      { id: "hailuo/02-image-to-video-pro", name: "Hailuo 02 I2V Pro" },
      { id: "grok-imagine/text-to-video", name: "Grok Imagine T2V" },
      { id: "grok-imagine/image-to-video", name: "Grok Imagine I2V" },
      { id: "bytedance/v1-pro-text-to-video", name: "Bytedance v1 Pro T2V" },
      { id: "bytedance/v1-pro-image-to-video", name: "Bytedance v1 Pro I2V" },
    ],
  },

  comfyui: {
    id: "comfyui",
    baseUrl: "http://localhost:8188",
    authType: "none",
    authHeader: "none",
    format: "comfyui",
    models: [
      { id: "animatediff", name: "AnimateDiff" },
      { id: "svd-xt", name: "Stable Video Diffusion XT" },
    ],
  },

  sdwebui: {
    id: "sdwebui",
    baseUrl: "http://localhost:7860",
    authType: "none",
    authHeader: "none",
    format: "sdwebui-video",
    models: [{ id: "animatediff-webui", name: "AnimateDiff (WebUI)" }],
  },
};

/**
 * Get video provider config by ID
 */
export function getVideoProvider(providerId: string): VideoProvider | null {
  return VIDEO_PROVIDERS[providerId] || null;
}

/**
 * Parse video model string (format: "provider/model" or just "model")
 */
export function parseVideoModel(modelStr: string | null) {
  return parseModelFromRegistry(modelStr, VIDEO_PROVIDERS);
}

/**
 * Get all video models as a flat list
 */
export function getAllVideoModels() {
  return getAllModelsFromRegistry(VIDEO_PROVIDERS);
}
