# Contributing to OmniRoute (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Tak for din interesse i at bidrage! Denne guide dækker alt, hvad du behøver for at komme i gang.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (anbefalet: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Nøglevariabler for udvikling:

| Variabel               | Udviklingsstandard       | Beskrivelse                  |
| ---------------------- | ------------------------ | ---------------------------- | ---------------------- |
| `PORT`                 | `20128`                  | Serverport                   |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Basis-URL for frontend       |
| `JWT_SECRET`           | (generer ovenfor)        | JWT underskriver hemmelighed |
| `INITIAL_PASSWORD`     | `ÆNDRING`                | Første login-adgangskode     |
| `APP_LOG_LEVEL`        | `info`                   | Log verbosity niveau         | ### Dashboard Settings |

Dashboardet giver UI-skift til funktioner, der også kan konfigureres via miljøvariabler:

| Indstilling af placering  | Skift                | Beskrivelse                                       |
| ------------------------- | -------------------- | ------------------------------------------------- |
| Indstillinger → Avanceret | Fejlretningstilstand | Aktiver logfiler for fejlretningsanmodninger (UI) |
| Indstillinger → Generelt  | Sidebjælke synlighed | Vis/skjul sidebjælkeafsnit                        |

Disse indstillinger gemmes i databasen og fortsætter på tværs af genstarter, og tilsidesætter env var-standarder, når de er indstillet.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Standardwebadresser:

-**Dashboard**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**Forpligt dig ALDRIG direkte til `main`.**Brug altid funktionsgrene.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Præfiks | Formål |
| ----------- | -------------------------- |
| `feat/` | Nye funktioner |
| `fix/` | Fejlrettelser |
| `refaktor/` | Kode omstrukturering |
| `docs/` | Dokumentationsændringer |
| `test/` | Testtilføjelser/rettelser |
| `arbejde/` | Værktøj, CI, afhængigheder |### Commit Messages

Følg [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Omfang: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

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

Dækningsnoter:

- `npm run test:coverage` måler kildedækningen for hovedenhedens testsuite, ekskluderer `tests/**` og inkluderer `open-sse/**`
- Pull-anmodninger skal holde den overordnede dækningsgate på**60 % eller højere**for udsagn, linjer, funktioner og filialer
- Hvis en PR ændrer produktionskode i `src/`, `open-sse/`, `electron/` eller `bin/`, skal den tilføje eller opdatere automatiserede test i samme PR
- `npm run coverage:report` udskriver den detaljerede fil-for-fil-rapport fra den seneste dækningskørsel
- `npm run test:coverage:legacy` bevarer den ældre metric til historisk sammenligning
- Se `docs/COVERAGE_PLAN.md` for den trinvise dækningsforbedring køreplan### Pull Request Requirements

Før åbning eller sammenlægning af en PR:

- Kør `npm run test:unit`
- Kør `npm run test:coverage`
- Sørg for, at dækningsporten forbliver på**60%+**for alle målinger
- Inkluder de ændrede eller tilføjede testfiler i PR-beskrivelsen, når produktionskoden ændres
- Tjek SonarQube-resultatet på PR'en, når projekthemmelighederne er konfigureret i CI

Aktuel teststatus:**122 enhedstestfiler**, der dækker:

- Udbyder oversættere og formatkonvertering
- Hastighedsbegrænsning, kredsløbsafbryder og modstandsdygtighed
- Semantisk cache, idempotens, fremskridtssporing
- Databaseoperationer og skema (21 DB-moduler)
- OAuth-flows og godkendelse
- API-endepunktsvalidering (Zod v4)
- MCP-serverværktøjer og håndhævelse af omfang
- Hukommelses- og færdighedssystemer---

## Code Style

-**ESLint**— Kør `npm run lint` før du forpligter dig -**Smukkere**— Automatisk formateret via "lint-stageed" på commit (2 mellemrum, semikolon, dobbelte anførselstegn, 100 tegnbredde, es5 efterstillede kommaer) -**TypeScript**— Al `src/`-kode bruger `.ts`/`.tsx`; `open-sse/` bruger `.ts`/`.js`; dokument med TSDoc (`@param`, `@returns`, `@throws`) -**No `eval()`**— ESLint håndhæver `no-eval`, `no-implied-eval`, `no-new-func` -**Zod-validering**— Brug Zod v4-skemaer til al API-inputvalidering -**Navngivning**: Filer = camelCase/kebab-case, komponenter = PascalCase, konstanter = UPPER_SNAKE---

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

Tilføj til `src/shared/constants/providers.ts` — Zod-valideret ved modulindlæsning.### Step 2: Add Executor (if custom logic needed)

Opret executor i `open-sse/executors/your-provider.ts`, der udvider basis executor.### Step 3: Add Translator (if non-OpenAI format)

Opret anmodnings-/svar-oversættere i `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Tilføj OAuth-legitimationsoplysninger i `src/lib/oauth/constants/oauth.ts` og service i `src/lib/oauth/services/`.### Step 5: Register Models

Tilføj modeldefinitioner i `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Skriv enhedstests i `tests/unit/`, der som minimum dækker:

- Udbyder registrering
- Anmodning/svar oversættelse
- Fejlhåndtering---

## Pull Request Checklist

- [ ] Tester bestået ("npm test")
- [ ] Linting-pas ("npm run lint")
- [ ] Build lykkes ('npm run build')
- [ ] TypeScript-typer tilføjet til nye offentlige funktioner og grænseflader
- [ ] Ingen hårdkodede hemmeligheder eller reserveværdier
- [ ] Alle input valideret med Zod-skemaer
- [ ] CHANGELOG opdateret (hvis brugervendt ændring)
- [ ] Dokumentation opdateret (hvis relevant)---

## Releasing

Udgivelser administreres via `/generate-release` arbejdsgangen. Når en ny GitHub-udgivelse er oprettet,**udgives pakken automatisk til npm**via GitHub Actions.---

## Getting Help

-**Architecture**: Se [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**API-reference**: Se [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR'er**: Se `docs/adr/` for arkitektoniske beslutningsposter
