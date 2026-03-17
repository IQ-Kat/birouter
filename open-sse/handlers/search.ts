/**
 * Search Handler
 *
 * Handles POST /v1/search requests.
 * Routes to 5 search providers with automatic failover:
 *   serper-search, brave-search, perplexity-search, exa-search, tavily-search
 *
 * Request format:
 * {
 *   "query": "search query",
 *   "provider": "serper-search" | "brave-search" | ... // optional, auto-selects cheapest
 *   "max_results": 5,
 *   "search_type": "web" | "news"
 * }
 */

import { getSearchProvider, type SearchProviderConfig } from "../config/searchRegistry.ts";
import { saveCallLog } from "@/lib/usageDb";

// ── Types ────────────────────────────────────────────────────────────────

export interface SearchResult {
  title: string;
  url: string;
  display_url?: string;
  snippet: string;
  position: number;
  score: number | null;
  published_at: string | null;
  favicon_url: string | null;
  content: { format: string; text: string; length: number } | null;
  metadata: {
    author: string | null;
    language: string | null;
    source_type: string | null;
    image_url: string | null;
  } | null;
  citation: {
    provider: string;
    retrieved_at: string;
    rank: number;
  };
  provider_raw: Record<string, unknown> | null;
}

export interface SearchResponse {
  provider: string;
  query: string;
  results: SearchResult[];
  answer: { source: string; text: string | null; model: string | null } | null;
  usage: { queries_used: number; search_cost_usd: number; llm_tokens?: number };
  metrics: {
    response_time_ms: number;
    upstream_latency_ms: number;
    gateway_latency_ms?: number;
    total_results_available: number | null;
  };
  errors: Array<{ provider: string; code: string; message: string }>;
}

interface SearchHandlerResult {
  success: boolean;
  status?: number;
  error?: string;
  data?: SearchResponse;
}

interface SearchHandlerOptions {
  query: string;
  provider: string;
  maxResults: number;
  searchType: string;
  country?: string;
  language?: string;
  timeRange?: string;
  offset?: number;
  domainFilter?: string[];
  contentOptions?: { snippet?: boolean; full_page?: boolean; format?: string; max_characters?: number };
  strictFilters?: boolean;
  providerOptions?: Record<string, unknown>;
  credentials: Record<string, any>;
  alternateProvider?: string;
  alternateCredentials?: Record<string, any> | null;
  log?: any;
}

// ── Constants ────────────────────────────────────────────────────────────

const GLOBAL_TIMEOUT_MS = 15_000;

// Non-retriable HTTP status codes — fail immediately, don't try alternate
const NON_RETRIABLE = new Set([400, 401, 403, 404]);

// ── Input Sanitization ──────────────────────────────────────────────────

// Control characters that should never appear in search queries
const CONTROL_CHAR_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;

function sanitizeQuery(query: string): { clean: string; error?: string } {
  if (CONTROL_CHAR_RE.test(query)) {
    return { clean: "", error: "Query contains invalid control characters" };
  }
  const clean = query.normalize("NFKC").trim().replace(/\s+/g, " ");
  if (clean.length === 0) {
    return { clean: "", error: "Query is empty after normalization" };
  }
  return { clean };
}

// ── Response Normalizers ────────────────────────────────────────────────

function makeResult(
  providerId: string,
  item: {
    title?: string;
    url?: string;
    snippet?: string;
    score?: number;
    published_at?: string;
    favicon_url?: string;
    author?: string;
    source_type?: string;
    image_url?: string;
    full_text?: string;
    text_format?: string;
  },
  idx: number,
  now: string
): SearchResult {
  const url = item.url || "";
  return {
    title: item.title || "",
    url,
    display_url: url ? url.replace(/^https?:\/\/(www\.)?/, "").split("?")[0] : undefined,
    snippet: item.snippet || "",
    position: idx + 1,
    score: typeof item.score === "number" ? Math.min(1, Math.max(0, item.score)) : null,
    published_at: item.published_at || null,
    favicon_url: item.favicon_url || null,
    content: item.full_text
      ? { format: item.text_format || "text", text: item.full_text, length: item.full_text.length }
      : null,
    metadata: {
      author: item.author || null,
      language: null,
      source_type: item.source_type || null,
      image_url: item.image_url || null,
    },
    citation: { provider: providerId, retrieved_at: now, rank: idx + 1 },
    provider_raw: null,
  };
}

function normalizeSerperResponse(
  data: any,
  _query: string,
  searchType: string
): { results: SearchResult[]; totalResults: number | null } {
  const now = new Date().toISOString();
  const items = searchType === "news" ? data.news : data.organic;
  if (!Array.isArray(items)) return { results: [], totalResults: null };

  const results = items.map((item: any, idx: number) =>
    makeResult(
      "serper-search",
      {
        title: item.title,
        url: item.link,
        snippet: item.snippet || item.description,
        published_at: item.date,
      },
      idx,
      now
    )
  );

  return {
    results,
    totalResults:
      typeof data.searchParameters?.totalResults === "number"
        ? data.searchParameters.totalResults
        : null,
  };
}

function normalizeBraveResponse(
  data: any,
  _query: string,
  searchType: string
): { results: SearchResult[]; totalResults: number | null } {
  const now = new Date().toISOString();
  const container = searchType === "news" ? data.news : data.web;
  const items = container?.results;
  if (!Array.isArray(items)) return { results: [], totalResults: null };

  const results = items.map((item: any, idx: number) =>
    makeResult(
      "brave-search",
      {
        title: item.title,
        url: item.url,
        snippet: item.description,
        published_at: item.page_age || item.age,
        favicon_url: item.meta_url?.favicon || item.favicon,
      },
      idx,
      now
    )
  );

  return { results, totalResults: container?.totalCount ?? null };
}

// ── Helpers ─────────────────────────────────────────────────────────────

function parseDomainFilter(domainFilter?: string[]): {
  includes: string[];
  excludes: string[];
} {
  if (!domainFilter?.length) return { includes: [], excludes: [] };
  const includes = domainFilter.filter((d) => !d.startsWith("-"));
  const excludes = domainFilter.filter((d) => d.startsWith("-")).map((d) => d.slice(1));
  return { includes, excludes };
}

// ── Provider Request Builders ───────────────────────────────────────────

interface SearchRequestParams {
  query: string;
  searchType: string;
  maxResults: number;
  token: string;
  country?: string;
  language?: string;
  domainFilter?: string[];
}

function buildSerperRequest(
  config: SearchProviderConfig,
  params: SearchRequestParams
): { url: string; init: RequestInit } {
  const endpoint = params.searchType === "news" ? "/news" : "/search";
  const body: Record<string, unknown> = { q: params.query, num: params.maxResults };
  if (params.country) body.gl = params.country.toLowerCase();
  if (params.language) body.hl = params.language;
  return {
    url: `${config.baseUrl}${endpoint}`,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": params.token },
      body: JSON.stringify(body),
    },
  };
}

function buildBraveRequest(
  config: SearchProviderConfig,
  params: SearchRequestParams
): { url: string; init: RequestInit } {
  const endpoint = params.searchType === "news" ? "/news/search" : "/web/search";
  const qp = new URLSearchParams({ q: params.query, count: String(params.maxResults) });
  if (params.country) qp.set("country", params.country);
  if (params.language) qp.set("search_lang", params.language);
  return {
    url: `${config.baseUrl}${endpoint}?${qp}`,
    init: {
      method: "GET",
      headers: { Accept: "application/json", "X-Subscription-Token": params.token },
    },
  };
}

function buildPerplexityRequest(
  config: SearchProviderConfig,
  params: SearchRequestParams
): { url: string; init: RequestInit } {
  const body: Record<string, unknown> = { query: params.query, max_results: params.maxResults };
  if (params.country) body.country = params.country;
  if (params.language) body.search_language_filter = [params.language];
  if (params.domainFilter?.length) body.search_domain_filter = params.domainFilter;
  return {
    url: config.baseUrl,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      body: JSON.stringify(body),
    },
  };
}

function buildExaRequest(
  config: SearchProviderConfig,
  params: SearchRequestParams
): { url: string; init: RequestInit } {
  const { includes, excludes } = parseDomainFilter(params.domainFilter);
  const body: Record<string, unknown> = {
    query: params.query,
    numResults: params.maxResults,
    type: "auto",
    text: true,
    highlights: true,
  };
  if (includes.length) body.includeDomains = includes;
  if (excludes.length) body.excludeDomains = excludes;
  if (params.searchType === "news") body.category = "news";
  return {
    url: config.baseUrl,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": params.token },
      body: JSON.stringify(body),
    },
  };
}

function buildTavilyRequest(
  config: SearchProviderConfig,
  params: SearchRequestParams
): { url: string; init: RequestInit } {
  const { includes, excludes } = parseDomainFilter(params.domainFilter);
  const body: Record<string, unknown> = {
    query: params.query,
    max_results: params.maxResults,
    topic: params.searchType === "news" ? "news" : "general",
  };
  if (includes.length) body.include_domains = includes;
  if (excludes.length) body.exclude_domains = excludes;
  if (params.country) body.country = params.country;
  return {
    url: config.baseUrl,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      body: JSON.stringify(body),
    },
  };
}

function buildRequest(
  config: SearchProviderConfig,
  params: SearchRequestParams
): { url: string; init: RequestInit } {
  if (config.id === "serper-search") return buildSerperRequest(config, params);
  if (config.id === "brave-search") return buildBraveRequest(config, params);
  if (config.id === "perplexity-search") return buildPerplexityRequest(config, params);
  if (config.id === "exa-search") return buildExaRequest(config, params);
  if (config.id === "tavily-search") return buildTavilyRequest(config, params);
  // Fallback for future providers: POST with bearer auth
  return {
    url: config.baseUrl,
    init: {
      method: config.method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      body: JSON.stringify({
        query: params.query,
        max_results: params.maxResults,
        search_type: params.searchType,
      }),
    },
  };
}

function normalizePerplexityResponse(
  data: any,
  _query: string,
  _searchType: string
): { results: SearchResult[]; totalResults: number | null } {
  const now = new Date().toISOString();
  const items = data.results;
  if (!Array.isArray(items)) return { results: [], totalResults: null };

  const results = items.map((item: any, idx: number) =>
    makeResult(
      "perplexity-search",
      {
        title: item.title,
        url: item.url,
        snippet: item.snippet,
        published_at: item.date || item.last_updated,
      },
      idx,
      now
    )
  );
  return { results, totalResults: results.length };
}

function normalizeExaResponse(
  data: any,
  _query: string,
  _searchType: string
): { results: SearchResult[]; totalResults: number | null } {
  const now = new Date().toISOString();
  const items = data.results;
  if (!Array.isArray(items)) return { results: [], totalResults: null };

  const results = items.map((item: any, idx: number) =>
    makeResult(
      "exa-search",
      {
        title: item.title,
        url: item.url,
        snippet: item.highlights?.[0] || item.text?.slice(0, 300) || "",
        score: item.score,
        published_at: item.publishedDate,
        favicon_url: item.favicon,
        author: item.author,
        image_url: item.image,
        full_text: item.text,
        text_format: "text",
      },
      idx,
      now
    )
  );
  return { results, totalResults: results.length };
}

function normalizeTavilyResponse(
  data: any,
  _query: string,
  _searchType: string
): { results: SearchResult[]; totalResults: number | null } {
  const now = new Date().toISOString();
  const items = data.results;
  if (!Array.isArray(items)) return { results: [], totalResults: null };

  const results = items.map((item: any, idx: number) =>
    makeResult(
      "tavily-search",
      {
        title: item.title,
        url: item.url,
        snippet: item.content || "",
        score: item.score,
        published_at: item.published_date,
        full_text: item.raw_content,
        text_format: "text",
      },
      idx,
      now
    )
  );
  return { results, totalResults: results.length };
}

function normalizeResponse(
  providerId: string,
  data: any,
  query: string,
  searchType: string
): { results: SearchResult[]; totalResults: number | null } {
  if (providerId === "serper-search") return normalizeSerperResponse(data, query, searchType);
  if (providerId === "brave-search") return normalizeBraveResponse(data, query, searchType);
  if (providerId === "perplexity-search")
    return normalizePerplexityResponse(data, query, searchType);
  if (providerId === "exa-search") return normalizeExaResponse(data, query, searchType);
  if (providerId === "tavily-search") return normalizeTavilyResponse(data, query, searchType);
  return { results: [], totalResults: null };
}

// ── Main Handler ────────────────────────────────────────────────────────

export async function handleSearch(options: SearchHandlerOptions): Promise<SearchHandlerResult> {
  const {
    query,
    provider: providerId,
    maxResults,
    searchType,
    country,
    language,
    domainFilter,
    credentials,
    alternateProvider,
    alternateCredentials,
    log,
  } = options;
  const startTime = Date.now();

  // 1. Sanitize input
  const { clean: cleanQuery, error: sanitizeError } = sanitizeQuery(query);
  if (sanitizeError) {
    return { success: false, status: 400, error: sanitizeError };
  }

  // 2. Use resolved provider from route (no re-resolution)
  const primaryConfig = getSearchProvider(providerId);
  if (!primaryConfig) {
    return {
      success: false,
      status: 400,
      error: `Unknown search provider: ${providerId}`,
    };
  }

  // 3. Get alternate config for failover (pre-resolved by route)
  const alternateConfig = alternateProvider ? getSearchProvider(alternateProvider) : null;

  const requestParams = {
    query: cleanQuery,
    searchType,
    maxResults,
    country,
    language,
    domainFilter,
  };

  // 4. Try primary provider
  const result = await tryProvider(primaryConfig, requestParams, credentials, startTime, log);

  if (result.success) return result;

  // 5. Failover to alternate (only for retriable errors and auto-select mode)
  if (
    alternateConfig &&
    alternateCredentials &&
    !NON_RETRIABLE.has(result.status || 0) &&
    Date.now() - startTime < GLOBAL_TIMEOUT_MS
  ) {
    if (log) {
      log.warn(
        "SEARCH",
        `${primaryConfig.id} failed (${result.status}), trying ${alternateConfig.id}`
      );
    }

    const fallbackResult = await tryProvider(
      alternateConfig,
      requestParams,
      alternateCredentials,
      startTime,
      log
    );

    if (fallbackResult.success) return fallbackResult;
  }

  return result;
}

async function tryProvider(
  config: SearchProviderConfig,
  params: Omit<SearchRequestParams, "token">,
  credentials: Record<string, any>,
  globalStartTime: number,
  log?: any
): Promise<SearchHandlerResult> {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;

  if (!token) {
    return {
      success: false,
      status: 401,
      error: `No credentials for search provider: ${config.id}`,
    };
  }

  const { query, searchType, maxResults } = params;
  const { url, init } = buildRequest(config, { ...params, token });

  // Timeout: min of provider timeout and remaining global timeout
  const remainingGlobal = GLOBAL_TIMEOUT_MS - (Date.now() - globalStartTime);
  const timeout = Math.min(config.timeoutMs, Math.max(remainingGlobal, 1000));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  if (log) {
    log.info("SEARCH", `${config.id} | query: "${query.slice(0, 80)}" | type: ${searchType}`);
  }

  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(timer);

    if (!response.ok) {
      const errorText = await response.text();
      if (log) {
        log.error("SEARCH", `${config.id} error ${response.status}: ${errorText.slice(0, 200)}`);
      }

      saveCallLog({
        method: config.method,
        path: "/v1/search",
        status: response.status,
        model: config.id,
        provider: config.id,
        duration: Date.now() - startTime,
        requestType: "search",
        error: errorText.slice(0, 500),
        requestBody: {
          query: query.slice(0, 200),
          search_type: searchType,
          max_results: maxResults,
        },
      }).catch(() => { /* non-critical — logging must not block search response */ });

      return {
        success: false,
        status: response.status,
        error: `Search provider ${config.id} returned ${response.status}`,
      };
    }

    const data = await response.json();
    const { results, totalResults } = normalizeResponse(config.id, data, query, searchType);
    const duration = Date.now() - startTime;

    saveCallLog({
      method: config.method,
      path: "/v1/search",
      status: 200,
      model: config.id,
      provider: config.id,
      duration,
      requestType: "search",
      tokens: { prompt_tokens: 0, completion_tokens: 0 },
      requestBody: { query: query.slice(0, 200), search_type: searchType, max_results: maxResults },
      responseBody: { results_count: results.length, cached: false },
    }).catch(() => { /* non-critical — logging must not block search response */ });

    return {
      success: true,
      data: {
        provider: config.id,
        query,
        results,
        answer: null,
        usage: { queries_used: 1, search_cost_usd: config.costPerQuery },
        metrics: {
          response_time_ms: duration,
          upstream_latency_ms: duration,
          total_results_available: totalResults,
        },
        errors: [],
      },
    };
  } catch (err: any) {
    clearTimeout(timer);

    const isTimeout = err.name === "AbortError";
    if (log) {
      log.error("SEARCH", `${config.id} ${isTimeout ? "timeout" : "fetch error"}: ${err.message}`);
    }

    saveCallLog({
      method: config.method,
      path: "/v1/search",
      status: isTimeout ? 504 : 502,
      model: config.id,
      provider: config.id,
      duration: Date.now() - startTime,
      requestType: "search",
      error: err.message,
      requestBody: { query: query.slice(0, 200), search_type: searchType, max_results: maxResults },
    }).catch(() => { /* non-critical — logging must not block search response */ });

    return {
      success: false,
      status: isTimeout ? 504 : 502,
      error: `Search provider ${isTimeout ? "timeout" : "error"}: ${err.message}`,
    };
  }
}
