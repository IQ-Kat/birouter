# omniroute — Agent Guidelines

## Project

Unified AI proxy/router — route any LLM through one endpoint. Multi-provider support
(OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI, Mistral, Fireworks, Cohere, etc.)
with **MCP Server** (16 tools for agent control) and **A2A v0.3 Protocol** (Agent-to-Agent orchestration).

## Stack

- **Runtime**: Next.js 16 (App Router), Node.js, ES Modules
- **Language**: TypeScript 5.9 (`src/`) + JavaScript (`open-sse/`)
- **Database**: better-sqlite3 (SQLite) — `DATA_DIR` configurable, default `~/.omniroute/`
- **Streaming**: SSE via `open-sse` internal package
- **Styling**: Tailwind CSS v4
- **Docker**: Multi-stage Dockerfile, 3 profiles (base / cli / host)
- **i18n**: next-intl with 30 languages (`src/i18n/messages/`)

## Architecture

### Data Layer (`src/lib/db/`)

All persistence uses SQLite through domain-specific modules:

| Module         | Responsibility                             |
| -------------- | ------------------------------------------ |
| `core.ts`      | SQLite engine, migrations, WAL, encryption |
| `providers.ts` | Provider connections & nodes               |
| `models.ts`    | Model aliases, MITM aliases, custom models |
| `combos.ts`    | Combo configurations                       |
| `apiKeys.ts`   | API key management & validation            |
| `settings.ts`  | Settings, pricing, proxy config            |
| `backup.ts`    | Backup / restore operations                |

`src/lib/localDb.ts` is a **re-export layer only** — all 27+ consumers import from it,
but the real logic lives in `src/lib/db/`.

### Request Pipeline (`open-sse/`)

| Handler                 | Role                                        |
| ----------------------- | ------------------------------------------- |
| `chatCore.js`           | Main chat completions proxy (SSE / non-SSE) |
| `responsesHandler.js`   | OpenAI Responses API compat                 |
| `responseTranslator.js` | Format translation for Responses API        |
| `embeddings.js`         | Embedding proxy                             |
| `imageGeneration.js`    | Image generation proxy                      |
| `sseParser.js`          | SSE stream parser                           |
| `usageExtractor.js`     | Token usage extraction from responses       |

Translation between provider formats: `open-sse/translator/`

**Upstream model extra headers** (`compatByProtocol` / custom models): merged in executors after default auth; **same header name replaces** the executor value (e.g. custom `Authorization` overrides Bearer). In `open-sse/handlers/chatCore.ts`, the primary request merges headers for **both** the client model id and `resolveModelAlias(clientModel)` (resolved id wins on key conflicts). **T5 intra-family fallback** recomputes headers using only the fallback model id and `resolveModelAlias(fallback)` so sibling models do not inherit another model’s headers. Forbidden header names live in `src/shared/constants/upstreamHeaders.ts` — keep sanitize (`models.ts`), Zod (`schemas.ts`), and unit tests aligned when editing that list.

### MCP Server (`open-sse/mcp-server/`)

16 tools for AI agent control via **3 transport modes**:

- **stdio** — Local IDE integration (Claude Desktop, Cursor, VS Code)
- **SSE** — Remote Server-Sent Events at `/api/mcp/sse`
- **Streamable HTTP** — Modern bidirectional HTTP at `/api/mcp/stream`

HTTP transports run in-process via `httpTransport.ts` singleton using `WebStandardStreamableHTTPServerTransport`.

| Category  | Tools                                                                                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Essential | `get_health`, `list_combos`, `get_combo_metrics`, `switch_combo`, `check_quota`, `route_request`, `cost_report`, `list_models_catalog`                               |
| Advanced  | `simulate_route`, `set_budget_guard`, `set_resilience_profile`, `test_combo`, `get_provider_metrics`, `best_combo_for_task`, `explain_route`, `get_session_snapshot` |

- Scoped authorization (9 scopes), audit logging, Zod schemas
- IDE configs for Claude Desktop, Cursor, VS Code Copilot

### A2A Server (`src/lib/a2a/`)

Agent-to-Agent v0.3 protocol:

- JSON-RPC 2.0: `message/send`, `message/stream`, `tasks/get`, `tasks/cancel`
- Agent Card at `/.well-known/agent.json`
- Skills: `smart-routing`, `quota-management`
- SSE streaming with 15s heartbeat
- Task Manager with state machine and TTL-based cleanup

### Auto-Combo Engine (`open-sse/services/autoCombo/`)

Self-healing routing optimization:

- 6-factor scoring, 4 mode packs, bandit exploration
- Progressive cooldown, probe-based re-admission

### Dashboard (`src/app/(dashboard)/`)

| Page                     | Description                                                     |
| ------------------------ | --------------------------------------------------------------- |
| `/dashboard`             | Home with quick start, provider overview                        |
| `/dashboard/endpoint`    | **Endpoints** (tabbed): Endpoint Proxy, MCP, A2A, API Endpoints |
| `/dashboard/providers`   | Provider management and connections                             |
| `/dashboard/combos`      | Combo configurations with routing strategies                    |
| `/dashboard/logs`        | Request, Proxy, Audit, Console logs (tabbed)                    |
| `/dashboard/analytics`   | Usage analytics and evaluations                                 |
| `/dashboard/costs`       | Cost tracking and breakdown                                     |
| `/dashboard/health`      | Uptime, circuit breakers, latency                               |
| `/dashboard/cli-tools`   | CLI tool integrations (Claude, Codex, Antigravity, etc.)        |
| `/dashboard/media`       | Image, Video, Music generation playground                       |
| `/dashboard/settings`    | System settings with multiple tabs                              |
| `/dashboard/api-manager` | API key management with model permissions                       |

### OAuth & Tokens (`src/lib/oauth/`)

18 modules handling OAuth flows, token refresh, and provider credentials.
Default credentials are hardcoded in `src/lib/oauth/constants/oauth.ts`,
overridable via env vars or `data/provider-credentials.json`.

### Supporting Systems

| System                     | Location                                          |
| -------------------------- | ------------------------------------------------- |
| Usage tracking & analytics | `src/lib/usageDb.ts`, `src/lib/usageAnalytics.ts` |
| Token health checks        | `src/lib/tokenHealthCheck.ts`                     |
| Cloud sync                 | `src/lib/cloudSync.ts`                            |
| Proxy logging              | `src/lib/proxyLogger.ts`                          |
| Data paths resolution      | `src/lib/dataPaths.ts`                            |

### Adding a New Provider

1. Register in `src/shared/constants/providers.ts`
2. Add executor in `open-sse/executors/`
3. Add translator rules in `open-sse/translator/` (if non-OpenAI format)
4. Add OAuth config in `src/lib/oauth/constants/oauth.ts` (if OAuth-based)

## Review Focus

### Security

- No hardcoded API keys or secrets in commits
- Auth middleware on all API routes
- Input validation on user-facing endpoints (Zod schemas)
- SQLite encryption key must not be logged

### Architecture

- DB operations go through `src/lib/db/` modules, never raw SQL in routes
- Provider requests flow through `open-sse/handlers/`
- Translations use `open-sse/translator/` modules
- `localDb.ts` is re-exports only — add new functions to the proper `db/*.ts` module
- MCP and A2A pages are embedded as tabs inside `/dashboard/endpoint`, not standalone routes

### Code Quality

- Consistent error handling with try/catch
- Proper HTTP status codes
- No memory leaks in SSE streams (abort signals, cleanup)
- Rate limit headers must be parsed correctly
- All API inputs validated with Zod schemas

### Docker

- Dockerfile has two targets: `runner-base` and `runner-cli`
- `docker-compose.yml` — development (3 profiles)
- `docker-compose.prod.yml` — isolated production instance (port 20130)
- Data persists in named volumes (`omniroute-data` / `omniroute-prod-data`)

### Review Mode

- Provide analysis and suggestions only
- Focus on bugs, security, performance, and best practices
