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
  isMarket?: boolean;
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

let _MUSIC_PROVIDERS: Record<string, MusicProvider> | null = null;

function getOrCreateMusicProviders(): Record<string, MusicProvider> {
  if (!_MUSIC_PROVIDERS) {
    _MUSIC_PROVIDERS = {
  kie: {
    id: "kie",
    baseUrl: "https://api.kie.ai",
    statusUrl: "https://api.kie.ai/api/v1/jobs/recordInfo",
    authType: "apikey",
    authHeader: "bearer",
    format: "kie-music",
    models: [
      { id: "suno-v4.0", name: "Suno V4.0" },
      { id: "suno-v3.5", name: "Suno V3.5" },
    ],
  },

  suno: {
    id: "suno",
    baseUrl: "https://studio-api.suno.ai/api/generate/v2/",
    statusUrl: "https://studio-api.suno.ai/api/feed/",
    authType: "cookie",
    authHeader: "cookie",
    format: "suno-music",
    models: [
      { id: "chirp-v3-5", name: "Chirp V3.5" },
      { id: "chirp-v4", name: "Chirp V4" },
    ],
  },
  udio: {
    id: "udio",
    baseUrl: "https://www.udio.com/api/generate-proxy",
    statusUrl: "https://www.udio.com/api/songs",
    authType: "cookie",
    authHeader: "cookie",
    format: "udio-music",
    models: [{ id: "udio-default", name: "Udio Default" }],
  },
  minimax: {
    id: "minimax",
    baseUrl: "https://api.minimax.io/v1/music_generation",
    statusUrl: "https://api.minimax.io/v1/query/music_generation",
    authType: "apikey",
    authHeader: "bearer",
    format: "minimax-music",
    models: [
      { id: "music-2.6", name: "Music 2.6" },
      { id: "music-2.6-free", name: "Music 2.6 Free" },
      { id: "music-cover", name: "Music Cover" },
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
}
  return _MUSIC_PROVIDERS;
}

export const MUSIC_PROVIDERS: Record<string, MusicProvider> = new Proxy({} as Record<string, MusicProvider>, {
  get(_, key: string) {
    return getOrCreateMusicProviders()[key];
  },
  ownKeys() {
    return Reflect.ownKeys(getOrCreateMusicProviders());
  },
  has(_, key) {
    return key in getOrCreateMusicProviders();
  },
  getOwnPropertyDescriptor(_, key) {
    if (key in getOrCreateMusicProviders()) {
      return { configurable: true, enumerable: true, value: getOrCreateMusicProviders()[key as string] };
    }
    return undefined;
  },
});

export function getMusicProviders(): Record<string, MusicProvider> {
  return getOrCreateMusicProviders();
}

export function getMusicProvider(providerId: string): MusicProvider | null {
  return getOrCreateMusicProviders()[providerId] || null;
}

export function parseMusicModel(modelStr: string | null) {
  return parseModelFromRegistry(modelStr, getOrCreateMusicProviders());
}

export function getAllMusicModels() {
  return getAllModelsFromRegistry(getOrCreateMusicProviders());
}