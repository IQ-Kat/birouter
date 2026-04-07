# Contributing to OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Bedankt voor uw interesse om bij te dragen! In deze handleiding vindt u alles wat u nodig heeft om aan de slag te gaan.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (aanbevolen: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Belangrijkste variabelen voor ontwikkeling:

| Variabel               | Ontwikkelingsstandaard   | Beschrijving                       |
| ---------------------- | ------------------------ | ---------------------------------- | ---------------------- |
| `POORT`                | `20128`                  | Serverpoort                        |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Basis-URL voor frontend            |
| `JWT_SECRET`           | (hierboven genereren)    | JWT-ondertekeningsgeheim           |
| `INITIAL_PASSWORD`     | `WIJZIG`                 | Wachtwoord voor eerste aanmelding  |
| `APP_LOG_LEVEL`        | `info`                   | Niveau van breedsprakigheid loggen | ### Dashboard Settings |

Het dashboard biedt UI-schakelaars voor functies die ook kunnen worden geconfigureerd via omgevingsvariabelen:

| Locatie instellen          | Schakel               | Beschrijving                                            |
| -------------------------- | --------------------- | ------------------------------------------------------- |
| Instellingen → Geavanceerd | Foutopsporingsmodus   | Logboeken voor foutopsporingsaanvragen inschakelen (UI) |
| Instellingen → Algemeen    | Zichtbaarheid zijbalk | Zijbalksecties tonen/verbergen                          |

Deze instellingen worden opgeslagen in de database en blijven behouden bij opnieuw opstarten, waarbij de standaardwaarden van env var worden overschreven wanneer deze zijn ingesteld.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Standaard URL's:

-**Dashboard**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**Zorg NOOIT rechtstreeks voor `main`.**Gebruik altijd feature branches.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Voorvoegsel | Doel |
| ----------- | ------------------------ |
| `prestatie/` | Nieuwe functies |
| `repareren/` | Bugfixes |
| `refactor/` | Code herstructurering |
| `docs/` | Documentatiewijzigingen |
| `test/` | Testtoevoegingen/oplossingen |
| `karwei/` | Tooling, CI, afhankelijkheden |### Commit Messages

Volg [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Bereiken: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `geheugen`, `skills`.---

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

Dekkingsopmerkingen:

- `npm run test:coverage` meet de brondekking voor de testsuite van de hoofdeenheid, sluit `tests/**` uit en omvat `open-sse/**`
- Pull-aanvragen moeten de algehele dekkingspoort op**60% of hoger**houden voor instructies, lijnen, functies en vertakkingen
- Als een PR de productiecode in `src/`, `open-sse/`, `electron/` of `bin/` wijzigt, moet deze geautomatiseerde tests in dezelfde PR toevoegen of bijwerken
- `npm run dekking:rapport` drukt het gedetailleerde rapport per bestand af van de laatste dekkingsrun
- `npm run test:coverage:legacy` behoudt de oudere metriek voor historische vergelijking
- Zie `docs/COVERAGE_PLAN.md` voor de gefaseerde routekaart voor verbetering van de dekking### Pull Request Requirements

Voordat u een PR opent of samenvoegt:

- Voer 'npm run test:unit' uit
- Voer 'npm run test:coverage' uit
- Zorg ervoor dat de dekkingspoort voor alle statistieken op**60%+**blijft
- Neem bij wijziging van de productiecode de gewijzigde of toegevoegde testbestanden op in de PR-beschrijving
- Controleer het SonarQube-resultaat op de PR wanneer de projectgeheimen zijn geconfigureerd in CI

Huidige teststatus:**122 testbestanden**voor:

- Aanbiedervertalers en formaatconversie
- Snelheidsbeperking, stroomonderbreker en veerkracht
- Semantische cache, idempotentie, voortgangsregistratie
- Databasebewerkingen en schema (21 DB-modules)
- OAuth-stromen en authenticatie
- API-eindpuntvalidatie (Zod v4)
- MCP-servertools en scopehandhaving
- Geheugen- en vaardighedensystemen---

## Code Style

-**ESLint**— Voer `npm run lint` uit voordat u commit -**Mooier**— Automatisch geformatteerd via `lint-staged` bij commit (2 spaties, puntkomma's, dubbele aanhalingstekens, 100 tekens breed, es5 achterliggende komma's) -**TypeScript**— Alle `src/`-code gebruikt `.ts`/`.tsx`; `open-sse/` gebruikt `.ts`/`.js`; documenteren met TSDoc ("@param`, `@returns`, `@throws`)
-**Geen `eval()`**— ESLint dwingt `no-eval`, `no-implied-eval`, `no-new-func` af -**Zod-validatie**— Gebruik Zod v4-schema's voor alle API-invoervalidatie -**Naamgeving**: Bestanden = camelCase/kebab-case, componenten = PascalCase, constanten = UPPER_SNAKE---

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

Toevoegen aan `src/shared/constants/providers.ts` — Zod-gevalideerd bij het laden van de module.### Step 2: Add Executor (if custom logic needed)

Maak een uitvoerder aan in `open-sse/executors/uw-provider.ts`, waarmee de basisuitvoerder wordt uitgebreid.### Step 3: Add Translator (if non-OpenAI format)

Creëer verzoek/antwoord-vertalers in `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Voeg OAuth-referenties toe in `src/lib/oauth/constants/oauth.ts` en service in `src/lib/oauth/services/`.### Step 5: Register Models

Voeg modeldefinities toe in `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Schrijf unit-tests in `tests/unit/` die minimaal het volgende omvatten:

- Aanbiederregistratie
- Verzoek/antwoord vertaling
- Foutafhandeling---

## Pull Request Checklist

- [ ] Tests zijn geslaagd (`npm test`)
- [ ] Linting-passages (`npm run lint`)
- [ ] Build slaagt (`npm run build`)
- [ ] TypeScript-typen toegevoegd voor nieuwe openbare functies en interfaces
- [ ] Geen hardgecodeerde geheimen of fallback-waarden
- [ ] Alle invoer gevalideerd met Zod-schema's
- [ ] CHANGELOG bijgewerkt (bij gebruikersgerichte wijzigingen)
- [ ] Documentatie bijgewerkt (indien van toepassing)---

## Releasing

Releases worden beheerd via de `/generate-release` workflow. Wanneer een nieuwe GitHub Release wordt gemaakt, wordt het pakket**automatisch gepubliceerd naar npm**via GitHub Actions.---

## Getting Help

-**Architectuur**: zie [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**API-referentie**: zie [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Problemen**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: Zie `docs/adr/` voor architectuurbeslissingsrecords
