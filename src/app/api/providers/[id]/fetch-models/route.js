import { NextResponse } from "next/server";
import { getProviderConnections, getProviderNodeById, saveFetchedModels, getFetchedModels } from "@/lib/db/index.js";

export const dynamic = "force-dynamic";

/**
 * Provider → models endpoint URL mapping.
 * Returns { url, headers } or null if provider not supported.
 */
function getModelsEndpoint(provider, apiKey, providerSpecificData) {
  const bearer = { Authorization: `Bearer ${apiKey}` };

  // OpenAI-compatible / Anthropic-compatible custom nodes
  if (provider.startsWith("oai-compatible-") || provider.startsWith("anthropic-compatible-")) {
    return null; // handled separately below via providerNode
  }

  const endpoints = {
    openai: { url: "https://api.openai.com/v1/models", headers: bearer },
    "vercel-ai-gateway": { url: "https://ai-gateway.vercel.sh/v1/models", headers: bearer },
    gemini: { url: `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`, headers: {} },
    openrouter: { url: "https://openrouter.ai/api/v1/models", headers: bearer },
    deepseek: { url: "https://api.deepseek.com/models", headers: bearer },
    groq: { url: "https://api.groq.com/openai/v1/models", headers: bearer },
    mistral: { url: "https://api.mistral.ai/v1/models", headers: bearer },
    xai: { url: "https://api.x.ai/v1/models", headers: bearer },
    nvidia: { url: "https://integrate.api.nvidia.com/v1/models", headers: bearer },
    perplexity: { url: "https://api.perplexity.ai/models", headers: bearer },
    together: { url: "https://api.together.xyz/v1/models", headers: bearer },
    fireworks: { url: "https://api.fireworks.ai/inference/v1/models", headers: bearer },
    cerebras: { url: "https://api.cerebras.ai/v1/models", headers: bearer },
    cohere: { url: "https://api.cohere.ai/v1/models", headers: bearer },
    nebius: { url: "https://api.studio.nebius.ai/v1/models", headers: bearer },
    siliconflow: { url: "https://api.siliconflow.cn/v1/models", headers: bearer },
    hyperbolic: { url: "https://api.hyperbolic.xyz/v1/models", headers: bearer },
    nanobanana: { url: "https://api.nanobananaapi.ai/v1/models", headers: bearer },
    "fal-ai": { url: "https://api.fal.ai/v1/models", headers: { Authorization: `Key ${apiKey}` } },
    chutes: { url: "https://llm.chutes.ai/v1/models", headers: bearer },
    ollama: { url: "https://api.ollama.com/v1/models", headers: bearer },
    // Chinese providers with custom base URLs
    kimi: { url: "https://api.moonshot.cn/v1/models", headers: bearer },
    minimax: { url: "https://api.minimax.io/v1/models", headers: bearer },
    "minimax-cn": { url: "https://api.minimaxi.com/v1/models", headers: bearer },
    glm: { url: "https://codeapi.bigmodel.cn/oapi/v1/models", headers: bearer },
    "glm-cn": { url: "https://open.bigmodel.cn/api/paas/v4/models", headers: bearer },
    alicode: { url: "https://dashscope.aliyuncs.com/compatible-mode/v1/models", headers: bearer },
    "alicode-intl": { url: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models", headers: bearer },
    "volcengine-ark": { url: "https://ark.cn-beijing.volces.com/api/v3/models", headers: bearer },
    byteplus: { url: "https://ark.ap-southeast.bytepluses.com/api/v3/models", headers: bearer },
    "xiaomi-mimo": { url: "https://api.xiaomimimo.com/v1/models", headers: bearer },
    "xiaomi-tokenplan": {
      url: (() => {
        const region = providerSpecificData?.region || "sgp";
        const regionUrls = { sgp: "https://token-plan-sgp.xiaomimimo.com/v1/models", cn: "https://token-plan-cn.xiaomimimo.com/v1/models", ams: "https://token-plan-ams.xiaomimimo.com/v1/models" };
        return regionUrls[region] || regionUrls.sgp;
      })(),
      headers: bearer,
    },
    "cloudflare-ai": {
      url: providerSpecificData?.accountId
        ? `https://api.cloudflare.com/client/v4/accounts/${providerSpecificData.accountId}/ai/models/search`
        : null,
      headers: bearer,
    },
  };

  return endpoints[provider] || null;
}

/**
 * Normalize model list from various provider response formats
 */
function normalizeModels(rawJson, provider) {
  // Gemini returns { models: [...] } with name field like "models/gemini-2.5-flash"
  if (provider === "gemini") {
    const models = rawJson.models || [];
    return models
      .filter((m) => m.name && m.supportedGenerationMethods?.includes("generateContent"))
      .map((m) => ({
        id: m.name.replace("models/", ""),
        name: m.displayName || m.name.replace("models/", ""),
      }));
  }

  // Cloudflare returns { result: [...] }
  if (provider === "cloudflare-ai") {
    const models = rawJson.result || [];
    return models.map((m) => ({
      id: m.name || m.id,
      name: m.description || m.name || m.id,
    }));
  }

  // Standard OpenAI format: { data: [...] } or { object: "list", data: [...] }
  const models = rawJson.data || rawJson.models || [];
  if (!Array.isArray(models)) return [];

  return models.map((m) => ({
    id: m.id || m.name,
    name: m.name || m.id,
  })).filter((m) => m.id);
}

/**
 * POST /api/providers/[id]/fetch-models
 * Fetches models from the provider's /v1/models endpoint using the first active connection's API key.
 * Saves results to database.
 */
export async function POST(request, { params }) {
  const { id: providerId } = await params;

  try {
    // Get connections for this provider to find an API key
    const connections = await getProviderConnections();
    const providerConns = connections.filter(
      (c) => c.provider === providerId && c.isActive !== false && c.apiKey
    );

    if (providerConns.length === 0) {
      return NextResponse.json(
        { error: "No active connections with API key found for this provider" },
        { status: 400 }
      );
    }

    // Use the first active connection's API key
    const connection = providerConns[0];
    const apiKey = connection.apiKey;
    const providerSpecificData = connection.providerSpecificData || {};

    // Check if this is a compatible provider node
    let endpoint = null;
    const node = await getProviderNodeById(providerId);
    if (node && node.baseUrl) {
      const baseUrl = node.baseUrl.replace(/\/$/, "");
      endpoint = {
        url: `${baseUrl}/models`,
        headers: { Authorization: `Bearer ${apiKey}` },
      };
      // Anthropic compatible uses different auth
      if (node.type === "anthropic-compatible") {
        endpoint.headers = {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          Authorization: `Bearer ${apiKey}`,
        };
      }
    } else {
      endpoint = getModelsEndpoint(providerId, apiKey, providerSpecificData);
    }

    if (!endpoint || !endpoint.url) {
      return NextResponse.json(
        { error: "This provider does not support model fetching" },
        { status: 400 }
      );
    }

    // Fetch models from provider
    const res = await fetch(endpoint.url, {
      headers: endpoint.headers,
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `Provider returned ${res.status}: ${text.slice(0, 200)}` },
        { status: 502 }
      );
    }

    const json = await res.json();
    const models = normalizeModels(json, providerId);

    // Save to database
    await saveFetchedModels(providerId, models);

    return NextResponse.json({
      models,
      count: models.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      return NextResponse.json({ error: "Request timed out" }, { status: 504 });
    }
    return NextResponse.json(
      { error: error.message || "Failed to fetch models" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/providers/[id]/fetch-models
 * Returns previously fetched models from database.
 */
export async function GET(request, { params }) {
  const { id: providerId } = await params;

  try {
    const data = await getFetchedModels(providerId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to get fetched models" },
      { status: 500 }
    );
  }
}
