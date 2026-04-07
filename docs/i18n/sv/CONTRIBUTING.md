# Contributing to OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Tack för ditt intresse att bidra! Den här guiden täcker allt du behöver för att komma igång.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (rekommenderas: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Nyckelvariabler för utveckling:

| Variabel               | Utveckling Standard      | Beskrivning                  |
| ---------------------- | ------------------------ | ---------------------------- | ---------------------- |
| `PORT`                 | `20128`                  | Serverport                   |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Bas-URL för frontend         |
| `JWT_SECRET`           | (generera ovan)          | JWT-signeringshemlighet      |
| `INITIAL_PASSWORD`     | `ÄNDRA`                  | Första inloggningslösenordet |
| `APP_LOG_LEVEL`        | `info`                   | Logga mångfaldsnivå          | ### Dashboard Settings |

Instrumentpanelen tillhandahåller UI-växlar för funktioner som också kan konfigureras via miljövariabler:

| Ställa in plats           | Växla                 | Beskrivning                                 |
| ------------------------- | --------------------- | ------------------------------------------- |
| Inställningar → Avancerat | Felsökningsläge       | Aktivera loggar för felsökningsbegäran (UI) |
| Inställningar → Allmänt   | Sidofältets synlighet | Visa/dölj sidofältssektioner                |

Dessa inställningar lagras i databasen och kvarstår vid omstarter, och åsidosätter standardinställningarna för env var när de ställs in.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Standardwebbadresser:

-**Dashboard**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**Förbind dig ALDRIG direkt till `main`.**Använd alltid funktionsgrenar.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Prefix | Syfte |
| ----------- | -------------------------- |
| `feat/` | Nya funktioner |
| `fix/` | Bugfixar |
| `refaktor/` | Kod omstrukturering |
| `docs/` | Dokumentationsändringar |
| `test/` | Testtillägg/fixar |
| `chore/` | Verktyg, CI, beroenden |### Commit Messages

Följ [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Omfattningar: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

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

Anmärkningar om täckning:

- `npm run test:coverage` mäter källtäckningen för huvudenhetens testsvit, exkluderar `tests/**` och inkluderar `open-sse/**`
- Pull-förfrågningar måste hålla den övergripande täckningsgrinden på**60 % eller högre**för uttalanden, linjer, funktioner och grenar
- Om en PR ändrar produktionskod i `src/`, `open-sse/`, `electron/` eller `bin/`, måste den lägga till eller uppdatera automatiserade tester i samma PR
- `npm run coverage:report` skriver ut den detaljerade fil-för-fil-rapporten från den senaste täckningskörningen
- `npm run test:coverage:legacy` bevarar det äldre måttet för historisk jämförelse
- Se `docs/COVERAGE_PLAN.md` för färdplanen för stegvis förbättring av täckningen### Pull Request Requirements

Innan du öppnar eller slår samman en PR:

- Kör `npm run test:unit`
- Kör `npm run test:coverage`
- Se till att täckningsgrinden stannar vid**60%+**för alla mätvärden
- Inkludera de ändrade eller tillagda testfilerna i PR-beskrivningen när produktionskoden ändras
- Kontrollera SonarQube-resultatet på PR när projekthemligheterna är konfigurerade i CI

Aktuell teststatus:**122 enhetstestfiler**som omfattar:

- Leverantör av översättare och formatkonvertering
- Hastighetsbegränsning, strömbrytare och motståndskraft
- Semantisk cache, idempotens, framstegsspårning
- Databasoperationer och schema (21 DB-moduler)
- OAuth-flöden och autentisering
- API-slutpunktsvalidering (Zod v4)
- MCP-serververktyg och tillämpning av omfattning
- Minne och färdighetssystem---

## Code Style

-**ESLint**— Kör `npm run lint` innan du begår -**Vackrare**— Autoformaterad via "lint-stadium" vid commit (2 blanksteg, semikolon, dubbla citattecken, 100 teckenbredd, es5 efterföljande kommatecken) -**TypeScript**— All `src/`-kod använder `.ts`/`.tsx`; `open-sse/` använder `.ts`/`.js`; dokument med TSDoc (`@param`, `@returns`, `@throws`) -**No `eval()`**— ESLint tillämpar `no-eval`, `no-implied-eval`, `no-new-func` -**Zod-validering**— Använd Zod v4-scheman för all API-indatavalidering -**Namngivning**: Filer = camelCase/kebab-case, komponenter = PascalCase, konstanter = UPPER_SNAKE---

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

Lägg till i `src/shared/constants/providers.ts` — Zod-validerad vid modulladdning.### Step 2: Add Executor (if custom logic needed)

Skapa executor i `open-sse/executors/your-provider.ts` för att utöka basexekutorn.### Step 3: Add Translator (if non-OpenAI format)

Skapa begäran/svarsöversättare i `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Lägg till OAuth-uppgifter i `src/lib/oauth/constants/oauth.ts` och tjänst i `src/lib/oauth/services/`.### Step 5: Register Models

Lägg till modelldefinitioner i `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Skriv enhetstester i `test/enhet/` som täcker minst:

- Leverantörsregistrering
- Översättning av begäran/svar
- Felhantering---

## Pull Request Checklist

- [ ] Tester godkända ('npm-test')
- [ ] Linting-pass (`npm run lint`)
- [ ] Bygget lyckas ('npm run build')
- [ ] TypeScript-typer har lagts till för nya offentliga funktioner och gränssnitt
- [ ] Inga hårdkodade hemligheter eller reservvärden
- [ ] Alla ingångar validerade med Zod-scheman
- [ ] ÄNDRINGSLOGG har uppdaterats (om användaren vänder sig mot förändringar)
- [ ] Dokumentationen uppdaterad (om tillämpligt)---

## Releasing

Releaser hanteras via arbetsflödet `/generate-release'. När en ny GitHub-version skapas**publiceras paketet automatiskt till npm**via GitHub Actions.---

## Getting Help

-**Arkitektur**: Se [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**API-referens**: Se [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Problem**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: Se `docs/adr/` för arkitektoniska beslutsdokument
