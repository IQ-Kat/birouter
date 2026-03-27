import { getCorsOrigin } from "../utils/cors.ts";
import { detectFormat, getTargetFormat } from "../services/provider.ts";
import { translateRequest, needsTranslation } from "../translator/index.ts";
import { FORMATS } from "../translator/formats.ts";
import {
  createSSETransformStreamWithLogger,
  createPassthroughStreamWithLogger,
  COLORS,
} from "../utils/stream.ts";
import { createStreamController, pipeWithDisconnect } from "../utils/streamHandler.ts";
import { addBufferToUsage, filterUsageForFormat, estimateUsage } from "../utils/usageTracking.ts";
import { refreshWithRetry } from "../services/tokenRefresh.ts";
import { createRequestLogger } from "../utils/requestLogger.ts";
import { getModelTargetFormat, PROVIDER_ID_TO_ALIAS } from "../config/providerModels.ts";
import { resolveModelAlias } from "../services/modelDeprecation.ts";
import { getUnsupportedParams } from "../config/providerRegistry.ts";
import { createErrorResult, parseUpstreamError, formatProviderError } from "../utils/error.ts";
import { HTTP_STATUS } from "../config/constants.ts";
import { handleBypassRequest } from "../utils/bypassHandler.ts";
import {
  saveRequestUsage,
  trackPendingRequest,
  appendRequestLog,
  saveCallLog,
} from "@/lib/usageDb";
import { getLoggedInputTokens, getLoggedOutputTokens } from "@/lib/usage/tokenAccounting";
import { getModelNormalizeToolCallId, getModelPreserveOpenAIDeveloperRole } from "@/lib/localDb";
import { getExecutor } from "../executors/index.ts";
import { CLAUDE_OAUTH_TOOL_PREFIX } from "../translator/request/openai-to-claude.ts";
import { translateNonStreamingResponse } from "./responseTranslator.ts";
import { extractUsageFromResponse } from "./usageExtractor.ts";
import { parseSSEToOpenAIResponse, parseSSEToResponsesOutput } from "./sseParser.ts";
import { sanitizeOpenAIResponse } from "./responseSanitizer.ts";
import {
  withRateLimit,
  updateFromHeaders,
  initializeRateLimits,
} from "../services/rateLimitManager.ts";
import {
  generateSignature,
  getCachedResponse,
  setCachedResponse,
  isCacheable,
} from "@/lib/semanticCache";
import { getIdempotencyKey, checkIdempotency, saveIdempotency } from "@/lib/idempotencyLayer";
import { createProgressTransform, wantsProgress } from "../utils/progressTracker.ts";
import { isModelUnavailableError, getNextFamilyFallback } from "../services/modelFamilyFallback.ts";
import { computeRequestHash, deduplicate, shouldDeduplicate } from "../services/requestDedup.ts";
import {
  shouldUseFallback,
  isFallbackDecision,
  EMERGENCY_FALLBACK_CONFIG,
} from "../services/emergencyFallback.ts";

export function shouldUseNativeCodexPassthrough({
  provider,
  sourceFormat,
  endpointPath,
}: {
  provider?: string | null;
  sourceFormat?: string | null;
  endpointPath?: string | null;
}): boolean {
  if (provider !== "codex") return false;
  if (sourceFormat !== FORMATS.OPENAI_RESPONSES) return false;
  const normalizedEndpoint = String(endpointPath || "").replace(/\/+$/, "");
  return /(?:^|\/)responses(?:\/.*)?$/i.test(normalizedEndpoint);
}

function buildClaudePassthroughToolNameMap(body: Record<string, unknown> | null | undefined) {
  if (!body || !Array.isArray(body.tools)) return null;

  const toolNameMap = new Map<string, string>();
  for (const tool of body.tools) {
    const toolRecord = tool as Record<string, unknown>;
    const toolData =
      toolRecord?.type === "function" &&
      toolRecord.function &&
      typeof toolRecord.function === "object"
        ? (toolRecord.function as Record<string, unknown>)
        : toolRecord;
    const originalName = typeof toolData?.name === "string" ? toolData.name.trim() : "";
    if (!originalName) continue;
    toolNameMap.set(`${CLAUDE_OAUTH_TOOL_PREFIX}${originalName}`, originalName);
  }

  return toolNameMap.size > 0 ? toolNameMap : null;
}

function restoreClaudePassthroughToolNames(
  responseBody: Record<string, unknown>,
  toolNameMap: Map<string, string> | null
) {
  if (!toolNameMap || !Array.isArray(responseBody?.content)) return responseBody;

  let changed = false;
  const content = responseBody.content.map((block: Record<string, unknown>) => {
    if (block?.type !== "tool_use" || typeof block?.name !== "string") return block;
    const restoredName = toolNameMap.get(block.name) ?? block.name;
    if (restoredName === block.name) return block;
    changed = true;
    return {
      ...block,
      name: restoredName,
    };
  });

  if (!changed) return responseBody;
  return {
    ...responseBody,
    content,
  };
}

function getHeaderValueCaseInsensitive(
  headers: Record<string, unknown> | null | undefined,
  targetName: string
) {
  if (!headers || typeof headers !== "object") return null;
  const lowered = targetName.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lowered && typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

function buildClaudePromptCacheLogMeta(
  targetFormat: string,
  finalBody: Record<string, unknown> | null | undefined,
  providerHeaders: Record<string, unknown> | null | undefined
) {
  if (targetFormat !== FORMATS.CLAUDE || !finalBody || typeof finalBody !== "object") return null;

  const describeCacheControl = (cacheControl: Record<string, unknown> | undefined, extra = {}) => ({
    type:
      cacheControl && typeof cacheControl.type === "string" && cacheControl.type.trim()
        ? cacheControl.type.trim()
        : "ephemeral",
    ttl:
      cacheControl && typeof cacheControl.ttl === "string" && cacheControl.ttl.trim()
        ? cacheControl.ttl.trim()
        : null,
    ...extra,
  });

  const systemBreakpoints = Array.isArray(finalBody.system)
    ? finalBody.system.flatMap((block, index) => {
        if (!block || typeof block !== "object") return [];
        const cacheControl =
          block.cache_control && typeof block.cache_control === "object" ? block.cache_control : null;
        return cacheControl ? [describeCacheControl(cacheControl, { index })] : [];
      })
    : [];

  const toolBreakpoints = Array.isArray(finalBody.tools)
    ? finalBody.tools.flatMap((tool, index) => {
        if (!tool || typeof tool !== "object") return [];
        const cacheControl =
          tool.cache_control && typeof tool.cache_control === "object" ? tool.cache_control : null;
        const name = typeof tool.name === "string" && tool.name.trim() ? tool.name.trim() : null;
        return cacheControl ? [describeCacheControl(cacheControl, { index, name })] : [];
      })
    : [];

  const messageBreakpoints = Array.isArray(finalBody.messages)
    ? finalBody.messages.flatMap((message, messageIndex) => {
        if (!message || typeof message !== "object" || !Array.isArray(message.content)) return [];
        const role =
          typeof message.role === "string" && message.role.trim() ? message.role.trim() : "unknown";
        return message.content.flatMap((block, contentIndex) => {
          if (!block || typeof block !== "object") return [];
          const cacheControl =
            block.cache_control && typeof block.cache_control === "object" ? block.cache_control : null;
          if (!cacheControl) return [];
          return [
            describeCacheControl(cacheControl, {
              messageIndex,
              contentIndex,
              role,
              blockType:
                typeof block.type === "string" && block.type.trim() ? block.type.trim() : "unknown",
            }),
          ];
        });
      })
    : [];

  const totalBreakpoints =
    systemBreakpoints.length + toolBreakpoints.length + messageBreakpoints.length;
  const anthropicBeta = getHeaderValueCaseInsensitive(providerHeaders, "Anthropic-Beta");

  if (totalBreakpoints === 0 && !anthropicBeta) return null;

  return {
    applied: totalBreakpoints > 0,
    totalBreakpoints,
    anthropicBeta,
    systemBreakpoints,
    toolBreakpoints,
    messageBreakpoints,
  };
}

function toPositiveNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

function buildCacheUsageLogMeta(usage: Record<string, unknown> | null | undefined) {
  if (!usage || typeof usage !== "object") return null;
  const promptTokenDetails =
    usage.prompt_tokens_details && typeof usage.prompt_tokens_details === "object"
      ? (usage.prompt_tokens_details as Record<string, unknown>)
      : undefined;
  const hasCacheFields =
    "cache_read_input_tokens" in usage ||
    "cached_tokens" in usage ||
    "cache_creation_input_tokens" in usage ||
    !!promptTokenDetails &&
      ("cached_tokens" in promptTokenDetails || "cache_creation_tokens" in promptTokenDetails);
  const cacheReadTokens = toPositiveNumber(
    usage.cache_read_input_tokens ??
      usage.cached_tokens ??
      promptTokenDetails?.cached_tokens
  );
  const cacheCreationTokens = toPositiveNumber(
    usage.cache_creation_input_tokens ??
      promptTokenDetails?.cache_creation_tokens
  );
  if (!hasCacheFields) return null;
  return {
    cacheReadTokens,
    cacheCreationTokens,
  };
}

function attachLogMeta(
  payload: Record<string, unknown> | null | undefined,
  meta: Record<string, unknown> | null | undefined
) {
  if (!meta || typeof meta !== "object") return payload;
  const compactMeta = Object.fromEntries(
    Object.entries(meta).filter(([, value]) => value !== null && value !== undefined)
  );
  if (Object.keys(compactMeta).length === 0) return payload;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { _omniroute: compactMeta, _payload: payload ?? null };
  }
  const existing =
    payload._omniroute && typeof payload._omniroute === "object" && !Array.isArray(payload._omniroute)
      ? payload._omniroute
      : {};
  return {
    ...payload,
    _omniroute: {
      ...existing,
      ...compactMeta,
    },
  };
}

/**
 * Core chat handler - shared between SSE and Worker
 * Returns { success, response, status, error } for caller to handle fallback
 * @param {object} options
 * @param {object} options.body - Request body
 * @param {object} options.modelInfo - { provider, model }
 * @param {object} options.credentials - Provider credentials
 * @param {object} options.log - Logger instance (optional)
 * @param {function} options.onCredentialsRefreshed - Callback when credentials are refreshed
 * @param {function} options.onRequestSuccess - Callback when request succeeds (to clear error status)
 * @param {function} options.onDisconnect - Callback when client disconnects
 * @param {string} options.connectionId - Connection ID for usage tracking
 * @param {object} options.apiKeyInfo - API key metadata for usage attribution
 */
export async function handleChatCore({
  body,
  modelInfo,
  credentials,
  log,
  onCredentialsRefreshed,
  onRequestSuccess,
  onDisconnect,
  clientRawRequest,
  connectionId,
  apiKeyInfo = null,
  userAgent,
  comboName,
}) {
  const { provider, model, extendedContext } = modelInfo;
  const startTime = Date.now();
  const persistFailureUsage = (statusCode: number, errorCode?: string | null) => {
    saveRequestUsage({
      provider: provider || "unknown",
      model: model || "unknown",
      tokens: { input: 0, output: 0, cacheRead: 0, cacheCreation: 0, reasoning: 0 },
      status: String(statusCode),
      success: false,
      latencyMs: Date.now() - startTime,
      timeToFirstTokenMs: 0,
      errorCode: errorCode || String(statusCode),
      timestamp: new Date().toISOString(),
      connectionId: connectionId || undefined,
      apiKeyId: apiKeyInfo?.id || undefined,
      apiKeyName: apiKeyInfo?.name || undefined,
    }).catch(() => {});
  };

  // ── Phase 9.2: Idempotency check ──
  const idempotencyKey = getIdempotencyKey(clientRawRequest?.headers);
  const cachedIdemp = checkIdempotency(idempotencyKey);
  if (cachedIdemp) {
    log?.debug?.("IDEMPOTENCY", `Hit for key=${idempotencyKey?.slice(0, 12)}...`);
    return {
      success: true,
      response: new Response(JSON.stringify(cachedIdemp.response), {
        status: cachedIdemp.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getCorsOrigin(),
          "X-OmniRoute-Idempotent": "true",
        },
      }),
    };
  }

  // Initialize rate limit settings from persisted DB (once, lazy)
  await initializeRateLimits();

  // T07: Inject connectionId into credentials so executors can rotate API keys
  // using providerSpecificData.extraApiKeys (API Key Round-Robin feature)
  if (connectionId && credentials && !credentials.connectionId) {
    credentials.connectionId = connectionId;
  }

  const sourceFormat = detectFormat(body);
  const endpointPath = String(clientRawRequest?.endpoint || "");
  const isResponsesEndpoint = /(?:^|\/)responses(?:\/.*)?$/i.test(endpointPath);
  const nativeCodexPassthrough = shouldUseNativeCodexPassthrough({
    provider,
    sourceFormat,
    endpointPath,
  });

  // Check for bypass patterns (warmup, skip) - return fake response
  const bypassResponse = handleBypassRequest(body, model, userAgent);
  if (bypassResponse) {
    return bypassResponse;
  }

  // Detect source format and get target format
  // Model-specific targetFormat takes priority over provider default

  // Apply custom model aliases (Settings → Model Aliases → Pattern→Target) before routing (#315, #472)
  // Custom aliases take priority over built-in and must be resolved here so the
  // downstream getModelTargetFormat() lookup AND the actual provider request use
  // the correct, aliased model ID. Without this, aliases only affect format detection.
  const resolvedModel = resolveModelAlias(model);
  // Use resolvedModel for all downstream operations (routing, provider requests, logging)
  const effectiveModel = resolvedModel !== model ? resolvedModel : model;
  if (resolvedModel !== model) {
    log?.info?.("ALIAS", `Model alias applied: ${model} → ${resolvedModel}`);
  }

  const alias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const modelTargetFormat = getModelTargetFormat(alias, resolvedModel);
  const targetFormat = modelTargetFormat || getTargetFormat(provider);

  // Default to false unless client explicitly sets stream: true (OpenAI spec compliant)
  const stream = body.stream === true;

  // ── Phase 9.1: Semantic cache check (non-streaming, temp=0 only) ──
  if (isCacheable(body, clientRawRequest?.headers)) {
    const signature = generateSignature(model, body.messages, body.temperature, body.top_p);
    const cached = getCachedResponse(signature);
    if (cached) {
      log?.debug?.("CACHE", `Semantic cache HIT for ${model}`);
      return {
        success: true,
        response: new Response(JSON.stringify(cached), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": getCorsOrigin(),
            "X-OmniRoute-Cache": "HIT",
          },
        }),
      };
    }
  }

  // Create request logger for this session: sourceFormat_targetFormat_model
  const reqLogger = await createRequestLogger(sourceFormat, targetFormat, model);

  // 0. Log client raw request (before format conversion)
  if (clientRawRequest) {
    reqLogger.logClientRawRequest(
      clientRawRequest.endpoint,
      clientRawRequest.body,
      clientRawRequest.headers
    );
  }

  // 1. Log raw request from client
  reqLogger.logRawRequest(body);

  log?.debug?.("FORMAT", `${sourceFormat} → ${targetFormat} | stream=${stream}`);

  // Translate request (pass reqLogger for intermediate logging)
  let translatedBody = body;
  const isClaudePassthrough = sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE;
  try {
    if (nativeCodexPassthrough) {
      translatedBody = { ...body, _nativeCodexPassthrough: true };
      log?.debug?.("FORMAT", "native codex passthrough enabled");
    } else if (isClaudePassthrough) {
      // Claude OAuth expects the same Claude Code prompt + structural normalization
      // as the OpenAI-compatible chat path. Round-trip through OpenAI to reuse the
      // working Claude translator instead of forwarding raw Messages payloads.
      const normalizeToolCallId = getModelNormalizeToolCallId(
        provider || "",
        model || "",
        sourceFormat
      );
      const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
        provider || "",
        model || "",
        sourceFormat
      );
      translatedBody = translateRequest(
        FORMATS.CLAUDE,
        FORMATS.OPENAI,
        model,
        { ...body },
        stream,
        credentials,
        provider,
        reqLogger,
        { normalizeToolCallId, preserveDeveloperRole }
      );
      translatedBody = translateRequest(
        FORMATS.OPENAI,
        FORMATS.CLAUDE,
        model,
        { ...translatedBody, _disableToolPrefix: true },
        stream,
        credentials,
        provider,
        reqLogger,
        { normalizeToolCallId, preserveDeveloperRole }
      );
      log?.debug?.("FORMAT", "claude->openai->claude normalized passthrough");
    } else {
      translatedBody = { ...body };

      // Issue #199: Disable tool name prefix when routing Claude-format requests
      // to non-Claude backends (prefix causes tool name mismatches)
      const claudeProviders = ["claude", "anthropic"];
      if (targetFormat === FORMATS.CLAUDE && !claudeProviders.includes(provider?.toLowerCase?.())) {
        translatedBody._disableToolPrefix = true;
      }

      // ── #291: Strip empty name fields from messages/input items ──
      // Upstream providers (OpenAI, Codex) reject name:"" with 400 errors.
      // Clients like PocketPaw may forward empty name fields from assistant turns.
      if (Array.isArray(translatedBody.messages)) {
        translatedBody.messages = translatedBody.messages.map((msg: Record<string, unknown>) => {
          if (msg.name === "") {
            const { name: _n, ...rest } = msg;
            return rest;
          }
          return msg;
        });
      }
      if (Array.isArray(translatedBody.input)) {
        translatedBody.input = translatedBody.input.map((item: Record<string, unknown>) => {
          if (item.name === "") {
            const { name: _n, ...rest } = item;
            return rest;
          }
          return item;
        });
      }
      // ── #346: Strip tools with empty name ──
      // Claude Code sometimes forwards tool definitions with empty names, causing
      // OpenAI-compatible upstream providers to reject with:
      // "Invalid 'input[N].name': empty string. Expected minimum length 1."
      // Handles both OpenAI format ({ function: { name } }) and Anthropic format ({ name }).
      if (Array.isArray(translatedBody.tools)) {
        translatedBody.tools = translatedBody.tools.filter((tool: Record<string, unknown>) => {
          const fn = tool.function as Record<string, unknown> | undefined;
          const name = fn?.name ?? tool.name;
          return name && String(name).trim().length > 0;
        });
      }

      // Strip empty text content blocks from messages.
      // Anthropic API rejects {"type":"text","text":""} with 400 "text content blocks must be non-empty".
      // Some clients (LiteLLM passthrough, @ai-sdk/anthropic) may forward these empty blocks as-is.
      if (Array.isArray(translatedBody.messages)) {
        for (const msg of translatedBody.messages) {
          if (Array.isArray(msg.content)) {
            msg.content = msg.content.filter(
              (block: Record<string, unknown>) =>
                block.type !== "text" || (typeof block.text === "string" && block.text.length > 0)
            );
          }
        }
      }

      // ── #409: Normalize unsupported content part types ──
      // Cursor and other clients send {type:"file"} when attaching .md or other files.
      // Providers (Copilot, OpenAI) only accept "text" and "image_url" in content arrays.
      // Convert: file → text (extract content), drop unrecognized types with a warning.
      if (Array.isArray(translatedBody.messages)) {
        for (const msg of translatedBody.messages) {
          if (msg.role === "user" && Array.isArray(msg.content)) {
            msg.content = (msg.content as Record<string, unknown>[]).flatMap(
              (block: Record<string, unknown>) => {
                if (block.type === "text" || block.type === "image_url" || block.type === "image") {
                  return [block];
                }
                // file / document → extract text content
                if (block.type === "file" || block.type === "document") {
                  const fileContent =
                    (block.file as Record<string, unknown>)?.content ??
                    (block.file as Record<string, unknown>)?.text ??
                    block.content ??
                    block.text;
                  const fileName =
                    (block.file as Record<string, unknown>)?.name ?? block.name ?? "attachment";
                  if (typeof fileContent === "string" && fileContent.length > 0) {
                    return [{ type: "text", text: `[${fileName}]\n${fileContent}` }];
                  }
                  return [];
                }
                // Unknown types: drop silently
                log?.debug?.("CONTENT", `Dropped unsupported content part type="${block.type}"`);
                return [];
              }
            );
          }
        }
      }

      const normalizeToolCallId = getModelNormalizeToolCallId(
        provider || "",
        model || "",
        sourceFormat
      );
      const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
        provider || "",
        model || "",
        sourceFormat
      );
      translatedBody = translateRequest(
        sourceFormat,
        targetFormat,
        model,
        translatedBody,
        stream,
        credentials,
        provider,
        reqLogger,
        { normalizeToolCallId, preserveDeveloperRole }
      );
    }
  } catch (error) {
    const parsedStatus = Number(error?.statusCode);
    const statusCode =
      Number.isInteger(parsedStatus) && parsedStatus >= 400 && parsedStatus <= 599
        ? parsedStatus
        : HTTP_STATUS.SERVER_ERROR;
    const message = error?.message || "Invalid request";
    const errorType = typeof error?.errorType === "string" ? error.errorType : null;

    log?.warn?.("TRANSLATE", `Request translation failed: ${message}`);

    if (errorType) {
      return {
        success: false,
        status: statusCode,
        error: message,
        response: new Response(
          JSON.stringify({
            error: {
              message,
              type: errorType,
              code: errorType,
            },
          }),
          {
            status: statusCode,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": getCorsOrigin(),
            },
          }
        ),
      };
    }

    return createErrorResult(statusCode, message);
  }

  // Extract toolNameMap for response translation (Claude OAuth)
  const translatedToolNameMap = translatedBody._toolNameMap;
  const nativeClaudeToolNameMap = isClaudePassthrough
    ? buildClaudePassthroughToolNameMap(body)
    : null;
  const toolNameMap =
    translatedToolNameMap instanceof Map && translatedToolNameMap.size > 0
      ? translatedToolNameMap
      : nativeClaudeToolNameMap;
  delete translatedBody._toolNameMap;
  delete translatedBody._disableToolPrefix;

  // Update model in body — use resolved alias so the provider gets the correct model ID (#472)
  translatedBody.model = effectiveModel;

  // Strip unsupported parameters for reasoning models (o1, o3, etc.)
  const unsupported = getUnsupportedParams(provider, model);
  if (unsupported.length > 0) {
    const stripped: string[] = [];
    for (const param of unsupported) {
      if (Object.hasOwn(translatedBody, param)) {
        stripped.push(param);
        delete translatedBody[param];
      }
    }
    if (stripped.length > 0) {
      log?.warn?.("PARAMS", `Stripped unsupported params for ${model}: ${stripped.join(", ")}`);
    }
  }

  // Get executor for this provider
  const executor = getExecutor(provider);
  const getExecutionCredentials = () =>
    nativeCodexPassthrough ? { ...credentials, requestEndpointPath: endpointPath } : credentials;

  // Create stream controller for disconnect detection
  const streamController = createStreamController({ onDisconnect, log, provider, model });

  const dedupRequestBody = { ...translatedBody, model: `${provider}/${model}` };
  const dedupEnabled = shouldDeduplicate(dedupRequestBody);
  const dedupHash = dedupEnabled ? computeRequestHash(dedupRequestBody) : null;

  const executeProviderRequest = async (modelToCall = effectiveModel, allowDedup = false) => {
    const execute = async () => {
      const bodyToSend =
        translatedBody.model === modelToCall
          ? translatedBody
          : { ...translatedBody, model: modelToCall };

      const rawResult = await withRateLimit(provider, connectionId, modelToCall, () =>
        executor.execute({
          model: modelToCall,
          body: bodyToSend,
          stream,
          credentials: getExecutionCredentials(),
          signal: streamController.signal,
          log,
          extendedContext,
        })
      );

      if (stream) return rawResult;

      // Non-stream responses need cloning for shared dedup consumers.
      const status = rawResult.response.status;
      const statusText = rawResult.response.statusText;
      const headers = Array.from(rawResult.response.headers.entries());
      const payload = await rawResult.response.text();

      return {
        ...rawResult,
        response: new Response(payload, { status, statusText, headers }),
      };
    };

    if (allowDedup && dedupEnabled && dedupHash) {
      const dedupResult = await deduplicate(dedupHash, execute);
      if (dedupResult.wasDeduplicated) {
        log?.debug?.("DEDUP", `Joined in-flight request hash=${dedupHash}`);
      }
      return dedupResult.result;
    }

    return execute();
  };

  // Track pending request
  trackPendingRequest(model, provider, connectionId, true);

  // T5: track which models we've tried for intra-family fallback
  const triedModels = new Set<string>([effectiveModel]);
  let currentModel = effectiveModel;

  // Log start
  appendRequestLog({ model, provider, connectionId, status: "PENDING" }).catch(() => {});

  const msgCount =
    translatedBody.messages?.length ||
    translatedBody.contents?.length ||
    translatedBody.request?.contents?.length ||
    0;
  log?.debug?.("REQUEST", `${provider.toUpperCase()} | ${model} | ${msgCount} msgs`);

  // Execute request using executor (handles URL building, headers, fallback, transform)
  let providerResponse;
  let providerUrl;
  let providerHeaders;
  let finalBody;
  let claudePromptCacheLogMeta = null;

  try {
    const result = await executeProviderRequest(effectiveModel, true);

    providerResponse = result.response;
    providerUrl = result.url;
    providerHeaders = result.headers;
    finalBody = result.transformedBody;
    claudePromptCacheLogMeta = buildClaudePromptCacheLogMeta(
      targetFormat,
      finalBody,
      providerHeaders
    );

    // Log target request (final request to provider)
    reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);

    // Update rate limiter from response headers (learn limits dynamically)
    updateFromHeaders(
      provider,
      connectionId,
      providerResponse.headers,
      providerResponse.status,
      model
    );
  } catch (error) {
    trackPendingRequest(model, provider, connectionId, false);
    appendRequestLog({
      model,
      provider,
      connectionId,
      status: `FAILED ${error.name === "AbortError" ? 499 : HTTP_STATUS.BAD_GATEWAY}`,
    }).catch(() => {});
    saveCallLog({
      method: "POST",
      path: clientRawRequest?.endpoint || "/v1/chat/completions",
      status: error.name === "AbortError" ? 499 : HTTP_STATUS.BAD_GATEWAY,
      model,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      requestBody: attachLogMeta(body, {
        claudePromptCache: claudePromptCacheLogMeta,
      }),
      error: error.message,
      sourceFormat,
      targetFormat,
      comboName,
      apiKeyId: apiKeyInfo?.id || null,
      apiKeyName: apiKeyInfo?.name || null,
      noLog: apiKeyInfo?.noLog === true,
    }).catch(() => {});
    if (error.name === "AbortError") {
      streamController.handleError(error);
      return createErrorResult(499, "Request aborted");
    }
    persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, error?.name || "upstream_error");
    const errMsg = formatProviderError(error, provider, model, HTTP_STATUS.BAD_GATEWAY);
    console.log(`${COLORS.red}[ERROR] ${errMsg}${COLORS.reset}`);
    return createErrorResult(HTTP_STATUS.BAD_GATEWAY, errMsg);
  }

  // Handle 401/403 - try token refresh using executor
  if (
    providerResponse.status === HTTP_STATUS.UNAUTHORIZED ||
    providerResponse.status === HTTP_STATUS.FORBIDDEN
  ) {
    const newCredentials = (await refreshWithRetry(
      () => executor.refreshCredentials(credentials, log),
      3,
      log
    )) as null | {
      accessToken?: string;
      copilotToken?: string;
    };

    if (newCredentials?.accessToken || newCredentials?.copilotToken) {
      log?.info?.("TOKEN", `${provider.toUpperCase()} | refreshed`);

      // Update credentials
      Object.assign(credentials, newCredentials);

      // Notify caller about refreshed credentials
      if (onCredentialsRefreshed && newCredentials) {
        await onCredentialsRefreshed(newCredentials);
      }

      // Retry with new credentials
      try {
        const retryResult = await executor.execute({
          model,
          body: translatedBody,
          stream,
          credentials: getExecutionCredentials(),
          signal: streamController.signal,
          log,
          extendedContext,
        });

        if (retryResult.response.ok) {
          providerResponse = retryResult.response;
          providerUrl = retryResult.url;
        }
      } catch (retryError) {
        log?.warn?.("TOKEN", `${provider.toUpperCase()} | retry after refresh failed`);
      }
    } else {
      log?.warn?.("TOKEN", `${provider.toUpperCase()} | refresh failed`);
    }
  }

  // Check provider response - return error info for fallback handling
  if (!providerResponse.ok) {
    trackPendingRequest(model, provider, connectionId, false);
    const { statusCode, message, retryAfterMs } = await parseUpstreamError(
      providerResponse,
      provider
    );
    appendRequestLog({ model, provider, connectionId, status: `FAILED ${statusCode}` }).catch(
      () => {}
    );
    saveCallLog({
      method: "POST",
      path: clientRawRequest?.endpoint || "/v1/chat/completions",
      status: statusCode,
      model,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      requestBody: attachLogMeta(body, {
        claudePromptCache: claudePromptCacheLogMeta,
      }),
      error: message,
      sourceFormat,
      targetFormat,
      comboName,
      apiKeyId: apiKeyInfo?.id || null,
      apiKeyName: apiKeyInfo?.name || null,
      noLog: apiKeyInfo?.noLog === true,
    }).catch(() => {});
    const errMsg = formatProviderError(new Error(message), provider, model, statusCode);
    console.log(`${COLORS.red}[ERROR] ${errMsg}${COLORS.reset}`);

    // Log Antigravity retry time if available
    if (retryAfterMs && provider === "antigravity") {
      const retrySeconds = Math.ceil(retryAfterMs / 1000);
      log?.debug?.("RETRY", `Antigravity quota reset in ${retrySeconds}s (${retryAfterMs}ms)`);
    }

    // Log error with full request body for debugging
    reqLogger.logError(new Error(message), finalBody || translatedBody);

    // Update rate limiter from error response headers
    updateFromHeaders(provider, connectionId, providerResponse.headers, statusCode, model);

    // ── T5: Intra-family model fallback ──────────────────────────────────────
    // Before returning a model-unavailable error upstream, try sibling models
    // from the same family. This keeps the request alive on the same account
    // instead of failing the entire combo.
    if (isModelUnavailableError(statusCode, message)) {
      const nextModel = getNextFamilyFallback(currentModel, triedModels);
      if (nextModel) {
        triedModels.add(nextModel);
        currentModel = nextModel;
        translatedBody.model = nextModel;
        log?.info?.("MODEL_FALLBACK", `${model} unavailable (${statusCode}) → trying ${nextModel}`);
        // Re-execute with the fallback model
        try {
          const fallbackResult = await executeProviderRequest(nextModel, false);
          if (fallbackResult.response.ok) {
            providerResponse = fallbackResult.response;
            providerUrl = fallbackResult.url;
            providerHeaders = fallbackResult.headers;
            finalBody = fallbackResult.transformedBody;
            // Continue processing with the fallback response — skip error return
            log?.info?.("MODEL_FALLBACK", `Serving ${nextModel} as fallback for ${model}`);
            // Jump to streaming/non-streaming handling below
            // We fall through by NOT returning here
          } else {
            // Fallback also failed — return original error
            persistFailureUsage(statusCode, "model_unavailable");
            return createErrorResult(statusCode, errMsg, retryAfterMs);
          }
        } catch {
          persistFailureUsage(statusCode, "model_unavailable");
          return createErrorResult(statusCode, errMsg, retryAfterMs);
        }
      } else {
        persistFailureUsage(statusCode, "model_unavailable");
        return createErrorResult(statusCode, errMsg, retryAfterMs);
      }
    } else {
      persistFailureUsage(statusCode, `upstream_${statusCode}`);
      return createErrorResult(statusCode, errMsg, retryAfterMs);
    }
    // ── End T5 ───────────────────────────────────────────────────────────────

    // ── Emergency Fallback (ClawRouter Feature #09/017) ────────────────────
    // When a non-streaming request fails with a budget-related error (402 or
    // budget keywords), redirect to nvidia/gpt-oss-120b ($0.00/M) before
    // returning the error to the combo router. This gives one last free-tier
    // attempt so the user's session stays alive.
    const requestHasTools = Array.isArray(translatedBody.tools) && translatedBody.tools.length > 0;
    if (!stream) {
      const fbDecision = shouldUseFallback(
        statusCode,
        message,
        requestHasTools,
        EMERGENCY_FALLBACK_CONFIG
      );
      if (isFallbackDecision(fbDecision)) {
        log?.info?.("EMERGENCY_FALLBACK", fbDecision.reason);
        try {
          // Build a minimal fallback request using the original body but with
          // the NVIDIA free-tier model and max_tokens capped to avoid overuse.
          const fbExecutor = getExecutor(fbDecision.provider);
          const fbResult = await fbExecutor.execute({
            model: fbDecision.model,
            body: {
              ...translatedBody,
              model: fbDecision.model,
              max_tokens: Math.min(
                typeof translatedBody.max_tokens === "number"
                  ? translatedBody.max_tokens
                  : fbDecision.maxOutputTokens,
                fbDecision.maxOutputTokens
              ),
            },
            stream: false,
            credentials: credentials,
            signal: streamController.signal,
            log,
            extendedContext,
          });
          if (fbResult.response.ok) {
            providerResponse = fbResult.response;
            log?.info?.(
              "EMERGENCY_FALLBACK",
              `Serving ${fbDecision.provider}/${fbDecision.model} as budget fallback for ${provider}/${model}`
            );
            // Fall through to non-streaming handler — providerResponse is now OK
          } else {
            log?.warn?.(
              "EMERGENCY_FALLBACK",
              `Emergency fallback also failed (${fbResult.response.status})`
            );
          }
        } catch (fbErr) {
          log?.warn?.("EMERGENCY_FALLBACK", `Emergency fallback error: ${fbErr?.message}`);
        }
      }
    }
    // ── End Emergency Fallback ────────────────────────────────────────────
  }

  // Non-streaming response
  if (!stream) {
    trackPendingRequest(model, provider, connectionId, false);
    const contentType = (providerResponse.headers.get("content-type") || "").toLowerCase();
    let responseBody;
    const rawBody = await providerResponse.text();
    const looksLikeSSE =
      contentType.includes("text/event-stream") || /(^|\n)\s*(event|data):/m.test(rawBody);

    if (looksLikeSSE) {
      // Upstream returned SSE even though stream=false; convert best-effort to JSON.
      const parsedFromSSE =
        targetFormat === FORMATS.OPENAI_RESPONSES
          ? parseSSEToResponsesOutput(rawBody, model)
          : parseSSEToOpenAIResponse(rawBody, model);

      if (!parsedFromSSE) {
        appendRequestLog({
          model,
          provider,
          connectionId,
          status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
        }).catch(() => {});
        persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "invalid_sse_payload");
        return createErrorResult(
          HTTP_STATUS.BAD_GATEWAY,
          "Invalid SSE response for non-streaming request"
        );
      }

      responseBody = parsedFromSSE;
    } else {
      try {
        responseBody = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        appendRequestLog({
          model,
          provider,
          connectionId,
          status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
        }).catch(() => {});
        persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "invalid_json_payload");
        return createErrorResult(HTTP_STATUS.BAD_GATEWAY, "Invalid JSON response from provider");
      }
    }

    if (sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE) {
      responseBody = restoreClaudePassthroughToolNames(responseBody, toolNameMap);
    }

    // Notify success - caller can clear error status if needed
    if (onRequestSuccess) {
      await onRequestSuccess();
    }

    // Log usage for non-streaming responses
    const usage = extractUsageFromResponse(responseBody, provider);
    appendRequestLog({ model, provider, connectionId, tokens: usage, status: "200 OK" }).catch(
      () => {}
    );

    // Save structured call log with full payloads
    const cacheUsageLogMeta = buildCacheUsageLogMeta(usage);
    saveCallLog({
      method: "POST",
      path: clientRawRequest?.endpoint || "/v1/chat/completions",
      status: 200,
      model,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      tokens: usage,
      requestBody: attachLogMeta(body, {
        claudePromptCache: claudePromptCacheLogMeta,
      }),
      responseBody: attachLogMeta(responseBody, {
        claudePromptCache: claudePromptCacheLogMeta
          ? {
              applied: claudePromptCacheLogMeta.applied,
              totalBreakpoints: claudePromptCacheLogMeta.totalBreakpoints,
              anthropicBeta: claudePromptCacheLogMeta.anthropicBeta,
            }
          : null,
        claudePromptCacheUsage: cacheUsageLogMeta,
      }),
      sourceFormat,
      targetFormat,
      comboName,
      apiKeyId: apiKeyInfo?.id || null,
      apiKeyName: apiKeyInfo?.name || null,
      noLog: apiKeyInfo?.noLog === true,
    }).catch(() => {});
    if (usage && typeof usage === "object") {
      const msg = `[${new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}] 📊 [USAGE] ${provider.toUpperCase()} | in=${getLoggedInputTokens(usage)} | out=${getLoggedOutputTokens(usage)}${connectionId ? ` | account=${connectionId.slice(0, 8)}...` : ""}`;
      console.log(`${COLORS.green}${msg}${COLORS.reset}`);

      saveRequestUsage({
        provider: provider || "unknown",
        model: model || "unknown",
        tokens: usage,
        status: "200",
        success: true,
        latencyMs: Date.now() - startTime,
        timeToFirstTokenMs: Date.now() - startTime,
        errorCode: null,
        timestamp: new Date().toISOString(),
        connectionId: connectionId || undefined,
        apiKeyId: apiKeyInfo?.id || undefined,
        apiKeyName: apiKeyInfo?.name || undefined,
      }).catch((err) => {
        console.error("Failed to save usage stats:", err.message);
      });
    }

    // Translate response to client's expected format (usually OpenAI)
    let translatedResponse = needsTranslation(targetFormat, sourceFormat)
      ? translateNonStreamingResponse(responseBody, targetFormat, sourceFormat)
      : responseBody;

    // Sanitize response for OpenAI SDK compatibility
    // Strips non-standard fields (x_groq, usage_breakdown, service_tier, etc.)
    // Extracts <think> tags into reasoning_content
    if (sourceFormat === FORMATS.OPENAI) {
      translatedResponse = sanitizeOpenAIResponse(translatedResponse);
    }

    // Add buffer and filter usage for client (to prevent CLI context errors)
    if (translatedResponse?.usage) {
      const buffered = addBufferToUsage(translatedResponse.usage);
      translatedResponse.usage = filterUsageForFormat(buffered, sourceFormat);
    } else {
      // Fallback: estimate usage when provider returned no usage block
      const contentLength = JSON.stringify(
        translatedResponse?.choices?.[0]?.message?.content || ""
      ).length;
      if (contentLength > 0) {
        const estimated = estimateUsage(body, contentLength, sourceFormat);
        translatedResponse.usage = filterUsageForFormat(estimated, sourceFormat);
      }
    }

    // ── Phase 9.1: Cache store (non-streaming, temp=0) ──
    if (isCacheable(body, clientRawRequest?.headers)) {
      const signature = generateSignature(model, body.messages, body.temperature, body.top_p);
      const tokensSaved = usage?.prompt_tokens + usage?.completion_tokens || 0;
      setCachedResponse(signature, model, translatedResponse, tokensSaved);
      log?.debug?.("CACHE", `Stored response for ${model} (${tokensSaved} tokens)`);
    }

    // ── Phase 9.2: Save for idempotency ──
    saveIdempotency(idempotencyKey, translatedResponse, 200);

    return {
      success: true,
      response: new Response(JSON.stringify(translatedResponse), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getCorsOrigin(),
          "X-OmniRoute-Cache": "MISS",
        },
      }),
    };
  }

  // Streaming response

  // Notify success - caller can clear error status if needed
  if (onRequestSuccess) {
    await onRequestSuccess();
  }

  const responseHeaders = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": getCorsOrigin(),
  };

  // Create transform stream with logger for streaming response
  let transformStream;

  // Callback to save call log when stream completes (include responseBody when provided by stream)
  const onStreamComplete = ({
    status: streamStatus,
    usage: streamUsage,
    responseBody: streamResponseBody,
  }) => {
    const cacheUsageLogMeta = buildCacheUsageLogMeta(streamUsage);
    saveCallLog({
      method: "POST",
      path: clientRawRequest?.endpoint || "/v1/chat/completions",
      status: streamStatus || 200,
      model,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      tokens: streamUsage || {},
      requestBody: attachLogMeta(body, {
        claudePromptCache: claudePromptCacheLogMeta,
      }),
      responseBody: attachLogMeta(streamResponseBody ?? undefined, {
        claudePromptCache: claudePromptCacheLogMeta
          ? {
              applied: claudePromptCacheLogMeta.applied,
              totalBreakpoints: claudePromptCacheLogMeta.totalBreakpoints,
              anthropicBeta: claudePromptCacheLogMeta.anthropicBeta,
            }
          : null,
        claudePromptCacheUsage: cacheUsageLogMeta,
      }),
      sourceFormat,
      targetFormat,
      comboName,
      apiKeyId: apiKeyInfo?.id || null,
      apiKeyName: apiKeyInfo?.name || null,
      noLog: apiKeyInfo?.noLog === true,
    }).catch(() => {});
  };

  // For Codex provider, translate response from openai-responses to openai (Chat Completions) format
  // UNLESS client is Droid CLI which expects openai-responses format back
  const isDroidCLI =
    userAgent?.toLowerCase().includes("droid") || userAgent?.toLowerCase().includes("codex-cli");
  const needsCodexTranslation =
    provider === "codex" &&
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    sourceFormat === FORMATS.OPENAI &&
    !isResponsesEndpoint &&
    !isDroidCLI;

  if (needsCodexTranslation) {
    // Codex returns openai-responses, translate to openai (Chat Completions) that clients expect
    log?.debug?.("STREAM", `Codex translation mode: openai-responses → openai`);
    transformStream = createSSETransformStreamWithLogger(
      "openai-responses",
      "openai",
      provider,
      reqLogger,
      toolNameMap,
      model,
      connectionId,
      body,
      onStreamComplete,
      apiKeyInfo
    );
  } else if (needsTranslation(targetFormat, sourceFormat)) {
    // Standard translation for other providers
    log?.debug?.("STREAM", `Translation mode: ${targetFormat} → ${sourceFormat}`);
    transformStream = createSSETransformStreamWithLogger(
      targetFormat,
      sourceFormat,
      provider,
      reqLogger,
      toolNameMap,
      model,
      connectionId,
      body,
      onStreamComplete,
      apiKeyInfo
    );
  } else {
    log?.debug?.("STREAM", `Standard passthrough mode`);
    transformStream = createPassthroughStreamWithLogger(
      provider,
      reqLogger,
      toolNameMap,
      model,
      connectionId,
      body,
      onStreamComplete,
      apiKeyInfo
    );
  }

  // ── Phase 9.3: Progress tracking (opt-in) ──
  const progressEnabled = wantsProgress(clientRawRequest?.headers);
  let finalStream;
  if (progressEnabled) {
    const progressTransform = createProgressTransform({ signal: streamController.signal });
    // Chain: provider → transform → progress → client
    const transformedBody = pipeWithDisconnect(providerResponse, transformStream, streamController);
    finalStream = transformedBody.pipeThrough(progressTransform);
    responseHeaders["X-OmniRoute-Progress"] = "enabled";
  } else {
    finalStream = pipeWithDisconnect(providerResponse, transformStream, streamController);
  }

  return {
    success: true,
    response: new Response(finalStream, {
      headers: responseHeaders,
    }),
  };
}

/**
 * Check if token is expired or about to expire
 */
export function isTokenExpiringSoon(expiresAt, bufferMs = 5 * 60 * 1000) {
  if (!expiresAt) return false;
  const expiresAtMs = new Date(expiresAt).getTime();
  return expiresAtMs - Date.now() < bufferMs;
}
