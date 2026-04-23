/**
 * Music Generation Provider Registry
 *
 * Defines providers that support the /v1/music/generations endpoint.
 * Currently supports local providers (ComfyUI with audio models).
 */

import { parseModelFromRegistry, getAllModelsFromRegistry } from "./registryUtils.ts";

interface MusicModel {
  id: string;
  name: string;
}

interface MusicProvider {
  id: string;
  baseUrl: string;
  statusUrl?: string;
  authType: string;
  authHeader: string;
  format: string;
  models: MusicModel[];
}

export const MUSIC_PROVIDERS: Record<string, MusicProvider> = {
  kie: {
    id: "kie",
    baseUrl: "https://api.kie.ai",
    statusUrl: "https://api.kie.ai/api/v1/generate/record-info",
    authType: "apikey",
    authHeader: "bearer",
    format: "kie-music",
    models: [
      { id: "V4", name: "Suno V4" },
      { id: "V4_5", name: "Suno V4.5" },
      { id: "V5", name: "Suno V5" },
    ],
  },

  comfyui: {
    id: "comfyui",
    baseUrl: "http://localhost:8188",
    authType: "none",
    authHeader: "none",
    format: "comfyui",
    models: [
      { id: "stable-audio-open", name: "Stable Audio Open" },
      { id: "musicgen-medium", name: "MusicGen Medium" },
    ],
  },
};

/**
 * Get music provider config by ID
 */
export function getMusicProvider(providerId: string): MusicProvider | null {
  return MUSIC_PROVIDERS[providerId] || null;
}

/**
 * Parse music model string (format: "provider/model" or just "model")
 */
export function parseMusicModel(modelStr: string | null) {
  return parseModelFromRegistry(modelStr, MUSIC_PROVIDERS);
}

/**
 * Get all music models as a flat list
 */
export function getAllMusicModels() {
  return getAllModelsFromRegistry(MUSIC_PROVIDERS);
}
