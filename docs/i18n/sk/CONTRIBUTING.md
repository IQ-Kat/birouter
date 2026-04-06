# Contributing to OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Ďakujeme za váš záujem prispievať! Táto príručka obsahuje všetko, čo potrebujete, aby ste mohli začať.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (odporúčané: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Kľúčové premenné pre vývoj:

| Premenná               | Vývoj Predvolené         | Popis                            |
| ---------------------- | ------------------------ | -------------------------------- | ---------------------- |
| "PORT"                 | "20128"                  | Port servera                     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Základná adresa URL pre frontend |
| `JWT_SECRET`           | (vygenerovať vyššie)     | Tajomstvo podpisu JWT            |
| `ÚVODNÉ_HESLO`         | "ZMENA"                  | Prvé prihlasovacie heslo         |
| `APP_LOG_LEVEL`        | "informácie"             | Úroveň výrečnosti protokolu      | ### Dashboard Settings |

Dashboard poskytuje prepínače používateľského rozhrania pre funkcie, ktoré možno konfigurovať aj prostredníctvom premenných prostredia:

| Nastavenie polohy      | Prepnúť                    | Popis                                     |
| ---------------------- | -------------------------- | ----------------------------------------- |
| Nastavenia → Rozšírené | Režim ladenia              | Povoliť protokoly žiadostí o ladenie (UI) |
| Nastavenia → Všeobecné | Viditeľnosť bočného panela | Zobraziť/skryť sekcie bočného panela      |

Tieto nastavenia sú uložené v databáze a pretrvávajú počas reštartov, pričom pri nastavení prepíšu predvolené hodnoty env var.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Predvolené adresy URL:

-**Dashboard**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**NIKDY sa nezaväzujte priamo k `main`.**Vždy používajte vetvy funkcií.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Predpona | Účel |
| ----------- | -------------------------- |
| `feat/` | Nové funkcie |
| `opraviť/` | Opravy chýb |
| `reaktor/` | Reštrukturalizácia kódexu |
| `docs/` | Zmeny dokumentácie |
| `test/` | Skúšobné doplnky/opravy |
| `fuška/` | Nástroje, CI, závislosti |### Commit Messages

Postupujte podľa [konvenčných záväzkov](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Rozsahy: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `pamäť`, `zručnosti`.---

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

Poznámky k pokrytiu:

- `npm run test:coverage` meria pokrytie zdroja pre testovaciu sadu hlavnej jednotky, vylučuje `tests/**` a zahŕňa `open-sse/**`
- Žiadosti o stiahnutie musia udržiavať celkovú bránu pokrytia na**60 % alebo vyššej**pre výpisy, linky, funkcie a pobočky
- Ak PR zmení produkčný kód v `src/`, `open-sse/`, `electron/` alebo `bin/`, musí pridať alebo aktualizovať automatizované testy v rovnakom PR
- `npm run coverage:report` vytlačí podrobnú správu po jednotlivých súboroch z posledného spustenia pokrytia
- `npm run test:coverage:legacy` zachováva staršiu metriku pre historické porovnanie
- Pozrite si `docs/COVERAGE_PLAN.md` pre postupné zlepšovanie pokrytia### Pull Request Requirements

Pred otvorením alebo zlúčením PR:

- Spustite `npm run test:unit`
- Spustite `npm run test:coverage`
  – Zabezpečte, aby brána pokrytia zostala na**60 %+**pre všetky metriky
- Zahrňte zmenené alebo pridané testovacie súbory do popisu PR pri zmene výrobného kódu
- Skontrolujte výsledok SonarQube na PR, keď sú tajné informácie projektu nakonfigurované v CI

Aktuálny stav testu:**122 testovacích súborov jednotiek**pokrývajúcich:

- Poskytovateľ prekladateľov a konverzie formátu
- Obmedzenie rýchlosti, istič a odolnosť
- Sémantická vyrovnávacia pamäť, idempotencia, sledovanie pokroku
- Databázové operácie a schéma (21 DB modulov)
- Toky OAuth a overenie
- Overenie koncového bodu API (Zod v4)
- Serverové nástroje MCP a presadzovanie rozsahu
- Systémy pamäte a zručností---

## Code Style

-**ESLint**— Pred potvrdením spustite príkaz `npm run lint` -**Prettier**– Automatické formátovanie pomocou príkazu `lint-staged` pri odovzdaní (2 medzery, bodkočiarky, dvojité úvodzovky, šírka 100 znakov, koncové čiarky es5) -**TypeScript**– Všetok kód `src/` používa `.ts`/`.tsx`; `open-sse/` používa `.ts`/`.js`; dokument s TSDoc (`@param`, `@returns`, `@throws`) -**No `eval()`**– ESLint presadzuje `no-eval`, `no-implied-eval`, `no-new-func` -**Overenie Zod**– Použite schémy Zod v4 na overenie všetkých vstupov API -**Pomenovanie**: Súbory = puzdro na ťavu/kufor na kebab, komponenty = puzdro Pascal, konštanty = UPPER_SNAKE---

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

Pridať do `src/shared/constants/providers.ts` — Zod-overené pri načítaní modulu.### Step 2: Add Executor (if custom logic needed)

Vytvorte exekútor v `open-sse/executors/your-provider.ts` rozširujúci základný exekútor.### Step 3: Add Translator (if non-OpenAI format)

Vytvorte prekladače požiadaviek/odpovedí v `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Pridajte poverenia OAuth do súboru `src/lib/oauth/constants/oauth.ts` a službu v súbore `src/lib/oauth/services/`.### Step 5: Register Models

Pridajte definície modelov do súboru `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Napíšte testy jednotiek v `tests/unit/`, ktoré pokrývajú minimálne:

- Registrácia poskytovateľa
- Žiadosť/odpoveď na preklad
- Spracovanie chýb---

## Pull Request Checklist

- [ ] Úspešné testy (`npm test`)
- [ ] Linting passy (`npm run lint`)
- [ ] Zostavenie bolo úspešné (`npm run build`)
- [ ] Typy TypeScript pridané pre nové verejné funkcie a rozhrania
- [ ] Žiadne pevne zakódované tajomstvá ani záložné hodnoty
- [ ] Všetky vstupy overené pomocou schém Zod
- [ ] CHANGELOG aktualizovaný (ak sa zmení používateľ)
- [ ] Aktualizovaná dokumentácia (ak je to potrebné)---

## Releasing

Vydania sa spravujú prostredníctvom pracovného postupu `/generate-release`. Keď sa vytvorí nové vydanie GitHub, balík sa**automaticky zverejní na npm**prostredníctvom akcií GitHub.---

## Getting Help

-**Architektúra**: Pozrite si [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Referencia API**: Pozrite si [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md)
–**Problémy**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR**: Záznamy architektonických rozhodnutí nájdete v `docs/adr/`
