import { AI_PROVIDERS } from "@/shared/constants/providers";
import { getProviderConnections } from "@/lib/localDb";
import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { TTS_MODELS_CONFIG } from "open-sse/config/ttsModels.js";
import { GET as getElevenLabsVoices } from "../../../media-providers/tts/elevenlabs/voices/route.js";
import { GET as getDeepgramVoices } from "../../../media-providers/tts/deepgram/voices/route.js";
import { GET as getInworldVoices } from "../../../media-providers/tts/inworld/voices/route.js";
import { GET as getGenericVoices } from "../../../media-providers/tts/voices/route.js";
import { GET as getMinimaxVoices } from "../../../media-providers/tts/minimax/voices/route.js";

// Provider → internal voices API. Edge/local-device share the generic endpoint.
const PROVIDER_API = {
  elevenlabs: (origin) => `${origin}/api/media-providers/tts/elevenlabs/voices`,
  deepgram: (origin) => `${origin}/api/media-providers/tts/deepgram/voices`,
  inworld: (origin) => `${origin}/api/media-providers/tts/inworld/voices`,
  minimax: (origin) => `${origin}/api/media-providers/tts/minimax/voices?provider=minimax`,
  "minimax-cn": (origin) => `${origin}/api/media-providers/tts/minimax/voices?provider=minimax-cn`,
  "edge-tts": (origin) => `${origin}/api/media-providers/tts/voices?provider=edge-tts`,
  "local-device": (origin) => `${origin}/api/media-providers/tts/voices?provider=local-device`,
};

const PROVIDER_HANDLERS = {
  elevenlabs: getElevenLabsVoices,
  deepgram: getDeepgramVoices,
  inworld: getInworldVoices,
  minimax: getMinimaxVoices,
  "minimax-cn": getMinimaxVoices,
  "edge-tts": getGenericVoices,
  "local-device": getGenericVoices,
};

export async function OPTIONS() {
  return new Response(null, {
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS" },
  });
}

// GET /v1/audio/voices?provider={p}[&lang=xx]
// If provider is omitted or "all", aggregates voices from all active/default providers.
// Returns OpenAI-style list with each voice's full model id ready for /v1/audio/speech
export async function GET(request) {
  try {
    const urlObj = new URL(request.url);
    const searchParams = urlObj.searchParams;
    const port = urlObj.port || "2004";
    const providerParam = searchParams.get("provider");
    const lang = searchParams.get("lang");

    let targetProviders = [];

    if (providerParam && providerParam !== "all") {
      const allKnownProviders = new Set([
        ...Object.keys(PROVIDER_API),
        ...Object.keys(TTS_MODELS_CONFIG),
        ...Object.keys(PROVIDER_MODELS)
      ]);
      if (!allKnownProviders.has(providerParam)) {
        return Response.json(
          { error: { message: `provider must be one of: all, ${Array.from(allKnownProviders).join(", ")}`, type: "invalid_request_error" } },
          { status: 400, headers: { "Access-Control-Allow-Origin": "*" } },
        );
      }
      targetProviders = [providerParam];
    } else {
      // Get all active credentialed providers from database
      let activeConnections = [];
      try {
        activeConnections = await getProviderConnections();
        activeConnections = activeConnections.filter(c => c.isActive !== false);
      } catch {}

      const activeSet = new Set(activeConnections.map(c => c.provider));

      // edge-tts, local-device, and google-tts are always available
      targetProviders = ["edge-tts", "local-device", "google-tts"];
      
      const allKnownProviders = new Set([
        ...Object.keys(PROVIDER_API),
        ...Object.keys(TTS_MODELS_CONFIG),
        ...Object.keys(PROVIDER_MODELS)
      ]);

      for (const p of allKnownProviders) {
        if (activeSet.has(p) && !targetProviders.includes(p)) {
          targetProviders.push(p);
        }
      }
    }

    const fetchPromises = targetProviders.map(async (provider) => {
      try {
        const handler = PROVIDER_HANDLERS[provider];
        const alias = AI_PROVIDERS[provider]?.alias || provider;

        // 1. Dynamic API-based providers (local handlers)
        if (handler) {
          let urlStr = `http://127.0.0.1:${port}/api/media-providers/tts/${
            provider === "edge-tts" || provider === "local-device" ? "voices" :
            (provider === "minimax" || provider === "minimax-cn") ? "minimax/voices" :
            `${provider}/voices`
          }`;

          const params = new URLSearchParams();
          if (provider === "edge-tts" || provider === "local-device") {
            params.set("provider", provider);
          }
          if (provider === "minimax" || provider === "minimax-cn") {
            params.set("provider", provider);
          }
          if (lang) {
            params.set("lang", lang);
          }
          const qs = params.toString();
          if (qs) {
            urlStr += `?${qs}`;
          }

          const dummyReq = new Request(urlStr);
          const res = await handler(dummyReq);
          if (!res.ok) {
            try {
              const errBody = await res.json();
              console.error(`[Voices API] Direct call to ${provider} returned ${res.status}:`, errBody);
            } catch {
              console.error(`[Voices API] Direct call to ${provider} returned ${res.status}`);
            }
            return [];
          }
          const data = await res.json();
          if (data.error) {
            console.error(`[Voices API] Direct call to ${provider} returned data error:`, data.error);
            return [];
          }

          // Internal API shape: { voices } when lang filter, else { byLang, languages }
          const rawVoices = lang
            ? (data.voices || [])
            : Object.values(data.byLang || {}).flatMap((l) => l.voices || []);

          if (provider === "elevenlabs") {
            const elModels = TTS_MODELS_CONFIG.elevenlabs?.models || [];
            return rawVoices.flatMap((v) => {
              const items = [
                // Base option (uses default Flash v2.5)
                {
                  id: `${alias}/${v.id}`,
                  name: v.name,
                  lang: v.lang || "",
                  gender: v.gender || "",
                  model: `${alias}/${v.id}`,
                  provider: provider,
                  preview_url: v.preview_url || "",
                  accent: v.accent || "",
                  category: v.category || "",
                  description: v.description || "",
                  is_cloned: !!v.is_cloned,
                  free_tier: v.free_users_allowed !== false,
                }
              ];
              // Model-specific options
              for (const m of elModels) {
                items.push({
                  id: `${alias}/${m.id}/${v.id}`,
                  name: `${v.name} (${m.name})`,
                  lang: v.lang || "",
                  gender: v.gender || "",
                  model: `${alias}/${m.id}/${v.id}`,
                  provider: provider,
                  preview_url: v.preview_url || "",
                  accent: v.accent || "",
                  category: v.category || "",
                  description: v.description || "",
                  is_cloned: !!v.is_cloned,
                  free_tier: v.free_users_allowed !== false,
                });
              }
              return items;
            });
          }

          return rawVoices.map((v) => ({
            id: `${alias}/${v.id}`,
            name: v.name,
            lang: v.lang || "",
            gender: v.gender || "",
            model: `${alias}/${v.id}`,
            provider: provider,
            preview_url: v.preview_url || "",
            accent: v.accent || "",
            category: v.category || "",
            description: v.description || "",
            is_cloned: !!v.is_cloned,
            free_tier: v.free_users_allowed !== false,
          }));
        }

        // 2. Static providers with hardcoded voices in open-sse/config/ttsModels.js
        const staticCfg = TTS_MODELS_CONFIG[provider];
        if (staticCfg) {
          let rawVoices = [];
          if (provider === "google-tts" && staticCfg.defaults) {
            rawVoices = staticCfg.defaults.map((v) => ({
              id: v.id,
              name: v.name,
              lang: v.id.split("-")[0],
              gender: "",
            }));
          } else if (staticCfg.allVoices) {
            rawVoices = staticCfg.allVoices.map((v) => ({
              id: v.id,
              name: v.name,
              lang: "en",
              gender: "",
            }));
          }

          if (lang) {
            rawVoices = rawVoices.filter((v) => v.lang === lang);
          }

          return rawVoices.map((v) => ({
            id: `${alias}/${v.id}`,
            name: v.name,
            lang: v.lang,
            gender: v.gender,
            model: `${alias}/${v.id}`,
            provider: provider,
            preview_url: "",
            accent: "",
            category: "premade",
            description: "",
            is_cloned: false,
            free_tier: true,
          }));
        }

        // 3. Config-driven registry providers (like nvidia) — extract models with kind === "tts"
        const staticAlias = PROVIDER_ID_TO_ALIAS[provider] || provider;
        const providerModels = PROVIDER_MODELS[staticAlias] || [];
        const ttsModels = providerModels.filter((m) => m.kind === "tts" || m.type === "tts");

        if (ttsModels.length > 0) {
          let rawVoices = ttsModels.map((m) => ({
            id: m.id,
            name: m.name || m.id,
            lang: "en",
            gender: "",
          }));

          if (lang) {
            rawVoices = rawVoices.filter((v) => v.lang === lang);
          }

          return rawVoices.map((v) => ({
            id: `${alias}/${v.id}`,
            name: v.name,
            lang: v.lang,
            gender: v.gender,
            model: `${alias}/${v.id}`,
            provider: provider,
            preview_url: "",
            accent: "",
            category: "premade",
            description: "",
            is_cloned: false,
            free_tier: true,
          }));
        }

        return [];
      } catch (err) {
        console.error(`[Voices API] Error calling handler for ${provider} directly:`, err);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const data_out = results.flat();

    return Response.json({ object: "list", data: data_out }, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    console.error("[Voices API] Error in GET handler:", err);
    return Response.json(
      { error: { message: err.message || "Failed", type: "server_error" } },
      { status: 502, headers: { "Access-Control-Allow-Origin": "*" } },
    );
  }
}
