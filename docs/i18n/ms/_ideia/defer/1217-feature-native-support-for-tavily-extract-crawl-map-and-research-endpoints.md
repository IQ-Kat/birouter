# Feature: [Feature] Native support for Tavily Extract, Crawl, Map, and Research endpoints (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇪🇸 [es](../../../es/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇩🇪 [de](../../../de/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇮🇹 [it](../../../it/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇮🇳 [in](../../../in/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇹🇭 [th](../../../th/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇮🇩 [id](../../../id/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇳🇴 [no](../../../no/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇩🇰 [da](../../../da/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇮🇱 [he](../../../he/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/1217-feature-native-support-for-tavily-extract-crawl-map-and-research-endpoints.md)

---

> GitHub Issue: #1217 — opened by @edwardsconnects90 on 2026-04-13T15:57:08Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

OmniRoute registers Tavily as a search provider (`tavily-search` in `searchRegistry.ts`) and successfully proxies `/v1/search` requests. However, the Tavily API exposes four additional endpoints that are widely used by MCP integrations and AI agents:

- `POST /extract` — extract structured content from URLs
- `POST /crawl` — crawl websites with configurable depth/breadth
- `POST /map` — map website structure (URL discovery)
- `POST /research` — deep multi-source research with async polling (`GET /research/:id`)

When a client (e.g., Tavily MCP server) is configured with `TAVILY_BASE_URL` pointing to OmniRoute, only `/v1/search` works. The other four endpoints return **HTTP 404**, forcing users to either bypass OmniRoute entirely or maintain a separate proxy layer.

This breaks the value proposition of OmniRoute as a unified gateway — Tavily credentials must be managed in two places, and usage of extract/crawl/map/research cannot be tracked or logged through OmniRoute's analytics.

### Proposed Solution

Add four new API routes that proxy requests to the corresponding Tavily API endpoints, reusing the existing `tavily-search` provider credentials from `provider_connections`:

1. `POST /v1/extract` → `https://api.tavily.com/extract`
2. `POST /v1/crawl` → `https://api.tavily.com/crawl`
3. `POST /v1/map` → `https://api.tavily.com/map`
4. `POST /v1/research` → `https://api.tavily.com/research`
5. `GET /v1/research/:id` → `https://api.tavily.com/research/:id` (polling for async results)

The routes should:

- Resolve the Tavily API key from the existing `tavily-search` provider connection (same decryption path as `/v1/search`)
- Inject `api_key` into the request body and `Authorization: Bearer` header before forwarding
- Forward the request body as-is (passthrough) — no transformation needed
- Stream the response back to the client
- Record usage in call logs for analytics/cost tracking
- Respect the existing API key policy (`enforceApiKeyPolicy`) if enabled

### Alternatives Considered

1. **Client-side direct connection** — configure the MCP server to hit `api.tavily.com` directly. This works but defeats the purpose of OmniRoute as a centralized gateway, duplicates credential management, and loses visibility into usage analytics.

2. **Separate reverse proxy** — run a lightweight proxy (nginx or Node.js) alongside OmniRoute that routes Tavily-specific endpoints directly while sending `/v1/search` through OmniRoute. Adds operational complexity and splits configuration.

3. **Runtime hotfix** — monkey-patch `http.createServer` via `NODE_OPTIONS --require` to intercept the four routes before Next.js handles them. This is the current workaround and functions correctly, but it is fragile (bypasses OmniRoute's auth, logging, and cost tracking) and adds maintenance burden with each OmniRoute upgrade.

### Acceptance Criteria

- `POST /v1/extract` returns 200 with Tavily's response when given valid `urls` in the body
- `POST /v1/crawl` returns 200 with crawled page content
- `POST /v1/map` returns 200 with discovered URL list
- `POST /v1/research` returns 200 with `request_id` and `status: pending`
- `GET /v1/research/:id` returns the research result or current polling status
- All five endpoints resolve credentials from the existing `tavily-search` provider connection — no additional configuration required
- Requests are logged in OmniRoute's call log and visible in the dashboard analytics
- API key policy enforcement works consistently across all Tavily endpoints
- Existing `/v1/search` behavior (multi-provider selection, caching, cost tracking) is not affected

### Area

Proxy / Routing

### Related Provider(s)

Tavily (`tavily-search`)

### Additional Context

The Tavily MCP server (v0.2.18, official package `tavily-mcp` from `github.com/tavily-ai/tavily-mcp`) is commonly used with Claude Code, Cursor, and other AI coding tools. It supports the `TAVILY_BASE_URL` environment variable, making it straightforward to route through OmniRoute. The server registers all five tools (`tavily_search`, `tavily_extract`, `tavily_crawl`, `tavily_map`, `tavily_research`) and expects all endpoints to be available at the configured base URL.

The `research` endpoint is asynchronous — it returns a `request_id` on POST, and the client polls `GET /research/:id` until `status` changes to `completed` or `failed`. The MCP server implements exponential backoff polling (2s initial, 1.5x factor, 10s max interval) with a timeout of 5 minutes (mini) or 15 minutes (pro/auto).

Architecturally, these routes are simpler than `/v1/search` — they do not require multi-provider selection, response normalization, or request coalescing. A straightforward passthrough with credential injection and call logging would be sufficient.

### Expected Test Plan

- Add unit tests for each new route handler (extract, crawl, map, research, research polling)
- Add integration test verifying credential resolution from `provider_connections`
- Verify that call logs are recorded for each endpoint
- Verify that API key policy enforcement applies
- Keep `npm run test:coverage` at 60%+

## 💬 Community Discussion

No community comments yet.

## 🎯 Refined Feature Description

(Requires manual/AI refinement)

### What it solves

- TBD

### How it should work (high level)

1. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- TBD

## 🔗 Related Ideas

- TBD
