# omniroute — Agent Guidelines

## Project

Unified AI proxy/router — route any LLM through one endpoint. Multi-provider support
(OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI, Mistral, Fireworks, Cohere, etc.)
with **MCP Server** (16 tools) and **A2A v0.3 Protocol**.

## Stack

- **Runtime**: Next.js 16 (App Router), Node.js, ES Modules (`"type": "module"`)
- **Language**: TypeScript 5.9 (`src/`) + JavaScript (`open-sse/`)
- **Database**: better-sqlite3 (SQLite) — `DATA_DIR` configurable, default `~/.omniroute/`
- **Streaming**: SSE via `open-sse` internal package
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl with 30 languages

---

## Build, Lint, and Test Commands

| Command                             | Description                       |
| ----------------------------------- | --------------------------------- |
| `npm run dev`                       | Start Next.js dev server          |
| `npm run build`                     | Production build (isolated)       |
| `npm run start`                     | Run production build              |
| `npm run build:cli`                 | Build CLI package                 |
| `npm run lint`                      | ESLint on all source files        |
| `npm run typecheck:core`            | TypeScript core type checking     |
| `npm run typecheck:noimplicit:core` | Strict checking (no implicit any) |
| `npm run check`                     | Run lint + test                   |
| `npm run check:cycles`              | Check for circular dependencies   |

### Running Tests

```bash
# All tests
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.mjs
node --import tsx/esm --test tests/unit/plan3-p0.test.mjs
node --import tsx/esm --test tests/unit/fixes-p1.test.mjs
node --import tsx/esm --test tests/unit/security-fase01.test.mjs

# Integration tests
node --import tsx/esm --test tests/integration/*.test.mjs

# Vitest (MCP server, autoCombo)
npm run test:vitest

# E2E with Playwright
npm run test:e2e

# Coverage (55% min thresholds)
npm run test:coverage
```

---

## Code Style Guidelines

### Formatting (Prettier — enforced via lint-staged)

2 spaces · semicolons required · double quotes (`"`) · 100 char width · es5 trailing commas.
Always run `prettier --write` on changed files.

### TypeScript

- **Target**: ES2022 · **Module**: `esnext` · **Resolution**: `bundler`
- `strict: false` — prefer explicit types, don't rely on inference
- Path aliases: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`

### ESLint Rules

- **Security (error, everywhere)**: `no-eval`, `no-implied-eval`, `no-new-func`
- **Relaxed in `open-sse/` and `tests/`**: `@typescript-eslint/no-explicit-any` = warn
- React hooks rules disabled in `open-sse/`

### Naming

| Element             | Convention                       | Example                              |
| ------------------- | -------------------------------- | ------------------------------------ |
| Files               | kebab-case                       | `chatCore.ts`, `tokenHealthCheck.ts` |
| React components    | PascalCase                       | `Dashboard.tsx`, `ProviderCard.tsx`  |
| Functions/variables | camelCase                        | `getHealth()`, `switchCombo()`       |
| Constants           | UPPER_SNAKE                      | `MAX_RETRIES`, `DEFAULT_TIMEOUT`     |
| Interfaces          | PascalCase (`I` prefix optional) | `ProviderConfig`                     |
| Enums               | PascalCase (members too)         | `LogLevel.Error`                     |

### Imports

- **Order**: external → internal (`@/`, `@omniroute/open-sse`) → relative (`./`, `../`)
- **No barrel imports** from `localDb.ts` — import from the specific `db/` module instead

### Error Handling

- try/catch with specific error types; always log with context (pino logger)
- Never silently swallow errors in SSE streams — use abort signals for cleanup
- Return proper HTTP status codes (4xx client, 5xx server)

### Security

- **NEVER** commit API keys, secrets, or credentials
- Validate all user inputs with Zod schemas
- Auth middleware required on all API routes
- Never log SQLite encryption keys
- Sanitize user content (dompurify for HTML)

---

## Architecture

### Data Layer (`src/lib/db/`)

All persistence uses SQLite through domain-specific modules (`core.ts`, `providers.ts`,
`models.ts`, `combos.ts`, `apiKeys.ts`, `settings.ts`, `backup.ts`).
`src/lib/localDb.ts` is a **re-export layer only** — never add logic there.

### Request Pipeline (`open-sse/`)

`chatCore.ts` → executor → upstream provider. Translations in `open-sse/translator/`.

**Upstream headers**: merged after default auth; same header name replaces executor value.
**T5 intra-family fallback** recomputes headers using only the fallback model id.
Forbidden header names: `src/shared/constants/upstreamHeaders.ts` — keep sanitize,
Zod schemas, and unit tests aligned when editing.

### MCP Server (`open-sse/mcp-server/`)

16 tools, 3 transports (stdio / SSE / Streamable HTTP). Scoped auth (9 scopes), Zod schemas.

### A2A Server (`src/lib/a2a/`)

JSON-RPC 2.0, SSE streaming, Task Manager with TTL cleanup. Agent Card at `/.well-known/agent.json`.

### Adding a New Provider

1. Register in `src/shared/constants/providers.ts`
2. Add executor in `open-sse/executors/`
3. Add translator in `open-sse/translator/` (if non-OpenAI format)
4. Add OAuth config in `src/lib/oauth/constants/oauth.ts` (if OAuth-based)

---

## Review Focus

- **DB ops** go through `src/lib/db/` modules, never raw SQL in routes
- **Provider requests** flow through `open-sse/handlers/`
- **MCP/A2A pages** are tabs inside `/dashboard/endpoint`, not standalone routes
- **No memory leaks** in SSE streams (abort signals, cleanup)
- **Rate limit headers** must be parsed correctly
- All API inputs validated with **Zod schemas**
