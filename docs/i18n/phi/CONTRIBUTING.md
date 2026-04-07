# Contributing to OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Salamat sa iyong interes sa pag-aambag! Sinasaklaw ng gabay na ito ang lahat ng kailangan mo para makapagsimula.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (inirerekomenda: 22 LTS) -**npm**10+ -**Git**### Clone & Install

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Mga pangunahing variable para sa pag-unlad:

| Variable               | Default ng Pag-unlad     | Paglalarawan              |
| ---------------------- | ------------------------ | ------------------------- | ---------------------- |
| `PORT`                 | `20128`                  | Port ng server            |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Base URL para sa frontend |
| `JWT_SECRET`           | (bumuo sa itaas)         | JWT signing secret        |
| `INITIAL_PASSWORD`     | `PALITAN`                | Unang login password      |
| `APP_LOG_LEVEL`        | `impormasyon`            | Log verbosity level       | ### Dashboard Settings |

Nagbibigay ang dashboard ng mga toggle ng UI para sa mga feature na maaari ding i-configure sa pamamagitan ng mga variable ng kapaligiran:

| Pagtatakda ng Lokasyon      | I-toggle           | Paglalarawan                                          |
| --------------------------- | ------------------ | ----------------------------------------------------- |
| Mga Setting → Advanced      | Debug Mode         | Paganahin ang mga log ng kahilingan sa pag-debug (UI) |
| Mga Setting → Pangkalahatan | Sidebar Visibility | Ipakita/itago ang mga seksyon ng sidebar              |

Ang mga setting na ito ay naka-store sa database at nagpapatuloy sa mga pag-restart, na na-override ang mga env var default kapag nakatakda.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Mga Default na URL:

-**Dashboard**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**NEVER commit directly to `main`.**Palaging gumamit ng mga feature branch.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Prefix | Layunin |
| ----------- | -------------------------- |
| `feat/` | Mga bagong feature |
| `ayusin/` | Mga pag-aayos ng bug |
| `refactor/` | Pag-aayos ng code |
| `docs/` | Mga pagbabago sa dokumentasyon |
| `pagsusulit/` | Mga pagdaragdag/pag-aayos ng pagsubok |
| `gawain/` | Tooling, CI, dependencies |### Commit Messages

Sundin ang [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Mga Saklaw: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

## Running Tests

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.mjs

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (60% min statements/lines/functions/branches)
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check
```

Mga tala sa saklaw:

- Sinusukat ng `npm run test:coverage` ang source coverage para sa pangunahing unit test suite, hindi kasama ang `tests/**`, at may kasamang `open-sse/**`
- Ang mga kahilingan sa paghila ay dapat panatilihin ang kabuuang gate ng saklaw sa**60% o mas mataas**para sa mga pahayag, linya, function, at sangay
- Kung binago ng isang PR ang production code sa `src/`, `open-sse/`, `electron/`, o `bin/`, dapat itong magdagdag o mag-update ng mga automated na pagsubok sa parehong PR
- Ang `npm run coverage:report` ay nagpi-print ng detalyadong file-by-file na ulat mula sa pinakabagong coverage run
- Pinapanatili ng `npm run test:coverage:legacy` ang mas lumang sukatan para sa makasaysayang paghahambing
- Tingnan ang `docs/COVERAGE_PLAN.md` para sa phased na roadmap ng pagpapabuti ng coverage### Pull Request Requirements

Bago buksan o pagsamahin ang isang PR:

- Patakbuhin ang `npm run test:unit`
- Patakbuhin ang `npm run test:coverage`
- Tiyaking mananatili ang gate ng coverage sa**60%+**para sa lahat ng sukatan
- Isama ang binago o idinagdag na mga test file sa paglalarawan ng PR kapag nagbago ang production code
- Suriin ang resulta ng SonarQube sa PR kapag ang mga lihim ng proyekto ay na-configure sa CI

Kasalukuyang status ng pagsubok:**122 unit test file**na sumasaklaw sa:

- Tagasalin ng provider at conversion ng format
- Paglilimita sa rate, circuit breaker, at katatagan
- Semantic cache, idempotency, pagsubaybay sa pag-unlad
- Mga pagpapatakbo ng database at schema (21 DB modules)
- Mga daloy ng OAuth at pagpapatunay
- Pagpapatunay ng endpoint ng API (Zod v4)
- Mga tool sa server ng MCP at pagpapatupad ng saklaw
- Mga sistema ng Memory at Kasanayan---

## Code Style

-**ESLint**— Patakbuhin ang `npm run lint` bago gumawa -**Prettier**— Awtomatikong na-format sa pamamagitan ng `lint-staged` sa commit (2 space, semicolon, double quotes, 100 char width, es5 trailing commas) -**TypeScript**— Lahat ng `src/` code ay gumagamit ng `.ts`/`.tsx`; Ang `open-sse/` ay gumagamit ng `.ts`/`.js`; dokumentong may TSDoc (`@param`, `@returns`, `@throws`) -**Walang `eval()`**— Ipinapatupad ng ESLint ang `no-eval`, `no-implied-eval`, `no-new-func` -**Pagpapatunay ng Zod**— Gumamit ng mga schema ng Zod v4 para sa lahat ng pagpapatunay ng input ng API -**Pagpapangalan**: Mga File = camelCase/kebab-case, mga bahagi = PascalCase, constants = UPPER_SNAKE---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (21 modules + 16 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (60+), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 14 provider-specific request executors
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (25 tools, 3 transports, 10 scopes)
├── services/               # 36+ services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (25 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Adding a New Provider

### Step 1: Register Provider Constants

Idagdag sa `src/shared/constants/providers.ts` — Zod-validated sa module load.### Step 2: Add Executor (if custom logic needed)

Gumawa ng executor sa `open-sse/executors/your-provider.ts` na nagpapalawak sa base executor.### Step 3: Add Translator (if non-OpenAI format)

Gumawa ng mga tagasalin ng kahilingan/tugon sa `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Magdagdag ng mga kredensyal ng OAuth sa `src/lib/oauth/constants/oauth.ts` at serbisyo sa `src/lib/oauth/services/`.### Step 5: Register Models

Magdagdag ng mga kahulugan ng modelo sa `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Sumulat ng mga unit test sa `tests/unit/` na sumasaklaw nang hindi bababa sa:

- Pagpaparehistro ng provider
- Kahilingan/tugon sa pagsasalin
- Error sa paghawak---

## Pull Request Checklist

- [ ] Mga test pass (`npm test`)
- [ ] Linting pass (`npm run lint`)
- [ ] Nagtagumpay ang Build (`npm run build`)
- [ ] Idinagdag ang mga uri ng TypeScript para sa mga bagong pampublikong function at interface
- [ ] Walang mga hardcoded na lihim o fallback na halaga
- [ ] Lahat ng mga input ay napatunayan gamit ang Zod schema
- [ ] CHANGELOG na-update (kung may pagbabago sa user)
- [ ] Na-update ang dokumentasyon (kung naaangkop)---

## Releasing

Ang mga release ay pinamamahalaan sa pamamagitan ng `/generate-release` workflow. Kapag gumawa ng bagong GitHub Release, ang package ay**awtomatikong na-publish sa npm**sa pamamagitan ng GitHub Actions.---

## Getting Help

-**Arkitektura**: Tingnan ang [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Reference ng API**: Tingnan ang [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Mga Isyu**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Mga ADR**: Tingnan ang `docs/adr/` para sa mga talaan ng desisyon sa arkitektura
