# Contributing to OmniRoute (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Děkujeme za váš zájem přispívat! Tato příručka obsahuje vše, co potřebujete, abyste mohli začít.---

## Development Setup

### Prerequisites

–**Node.js**>= 18 < 24 (doporučeno: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Klíčové proměnné pro vývoj:

| Proměnná               | Vývoj Výchozí            | Popis                       |
| ---------------------- | ------------------------ | --------------------------- | ---------------------- |
| "PORT"                 | "20128"                  | Port serveru                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Základní URL pro frontend   |
| `JWT_SECRET`           | (vygenerovat výše)       | Tajemství podpisu JWT       |
| `VÝCHOZÍ_HESLO`        | "ZMĚNA"                  | První přihlašovací heslo    |
| `APP_LOG_LEVEL`        | "informace"              | Úroveň výřečnosti protokolu | ### Dashboard Settings |

Ovládací panel poskytuje přepínače uživatelského rozhraní pro funkce, které lze také konfigurovat pomocí proměnných prostředí:

| Nastavení umístění   | Přepnout                       | Popis                                      |
| -------------------- | ------------------------------ | ------------------------------------------ |
| Nastavení → Upřesnit | Režim ladění                   | Povolit protokoly požadavků na ladění (UI) |
| Nastavení → Obecné   | Viditelnost postranního panelu | Zobrazit/skrýt sekce postranního panelu    |

Tato nastavení jsou uložena v databázi a přetrvávají po restartování, přičemž při nastavení přepisují výchozí hodnoty env var.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Výchozí adresy URL:

-**Dashboard**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**NIKDY se nezavazujte přímo k `main`.**Vždy používejte větve funkcí.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Předpona | Účel |
| ----------- | -------------------------- |
| `feat/` | Nové funkce |
| `opravit/` | Opravy chyb |
| `reaktor/` | Restrukturalizace kódu |
| `docs/` | Změny dokumentace |
| `test/` | Testovací doplňky/opravy |
| `práce/` | Nástroje, CI, závislosti |### Commit Messages

Sledujte [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Rozsahy: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `paměť`, `dovednosti`.---

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

Poznámky k pokrytí:

- `npm run test:coverage` měří pokrytí zdroje pro hlavní testovací sadu jednotek, nezahrnuje `tests/**` a zahrnuje `open-sse/**`
- Žádosti o stažení musí udržovat celkovou bránu pokrytí na**60 % nebo vyšší**pro příkazy, řádky, funkce a větve
  – Pokud PR změní produkční kód v `src/`, `open-sse/`, `electron/` nebo `bin/`, musí přidat nebo aktualizovat automatické testy ve stejném PR
- `npm run coverage:report` vytiskne podrobnou zprávu soubor po souboru z posledního běhu pokrytí
- `npm run test:coverage:legacy` zachovává starší metriku pro historické srovnání
- Viz `docs/COVERAGE_PLAN.md` pro postupné zlepšování pokrytí### Pull Request Requirements

Před otevřením nebo sloučením PR:

- Spusťte `npm run test:unit`
- Spusťte `npm run test:coverage`
- Zajistěte, aby brána pokrytí zůstala na**60 %+**pro všechny metriky
- Zahrnout změněné nebo přidané testovací soubory do popisu PR při změně výrobního kódu
- Zkontrolujte výsledek SonarQube na PR, když jsou tajemství projektu nakonfigurována v CI

Aktuální stav testu:**122 testovacích souborů jednotek**pokrývající:

- Poskytovatel překladatelů a konverze formátu
- Omezení rychlosti, jistič a odolnost
- Sémantická mezipaměť, idempotence, sledování pokroku
- Databázové operace a schéma (21 DB modulů)
- Toky OAuth a ověřování
- Ověření koncového bodu API (Zod v4)
- Serverové nástroje MCP a vynucení rozsahu
- Systémy paměti a dovedností---

## Code Style

-**ESLint**— Před potvrzením spusťte příkaz `npm run lint` -**Hezčí**– Automatické formátování pomocí `lint-staged` při odevzdání (2 mezery, středníky, dvojité uvozovky, šířka 100 znaků, es5 koncové čárky) -**TypeScript**— Veškerý kód `src/` používá `.ts`/`.tsx`; `open-sse/` používá `.ts`/`.js`; dokument s TSDoc (`@param`, `@returns`, `@throws`) -**No `eval()`**— ESLint vynucuje `no-eval`, `no-implied-eval`, `no-new-func` -**Ověření Zod**– Používejte schémata Zod v4 pro ověřování všech vstupů API -**Pojmenování**: Soubory = camelCase/kebab-case, komponenty = PascalCase, konstanty = UPPER_SNAKE---

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

Přidat do `src/shared/constants/providers.ts` — Zod-ověřeno při načtení modulu.### Step 2: Add Executor (if custom logic needed)

Vytvořte exekutor v `open-sse/executors/your-provider.ts` rozšiřující základní exekutor.### Step 3: Add Translator (if non-OpenAI format)

Vytvořte překladače požadavků/odpovědí v `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Přidejte přihlašovací údaje OAuth do `src/lib/oauth/constants/oauth.ts` a službu v `src/lib/oauth/services/`.### Step 5: Register Models

Přidejte definice modelů do `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Napište testy jednotek v `tests/unit/` pokrývající minimálně:

- Registrace poskytovatele
- Překlad požadavku/odpovědi
- Ošetření chyb---

## Pull Request Checklist

- [ ] Testy úspěšné (`npm test`)
- [ ] Linting passy (`npm run lint`)
- [ ] Sestavení bylo úspěšné (`npm run build`)
- [ ] Typy TypeScript přidány pro nové veřejné funkce a rozhraní
- [ ] Žádná napevno zakódovaná tajemství nebo záložní hodnoty
- [ ] Všechny vstupy ověřeny pomocí schémat Zod
- [ ] CHANGELOG aktualizován (pokud se uživatel změní)
- [ ] Aktualizace dokumentace (pokud existuje)---

## Releasing

Vydání se spravují pomocí pracovního postupu `/generate-release`. Když je vytvořeno nové vydání GitHubu, balíček je**automaticky publikován na npm**prostřednictvím akcí GitHub.---

## Getting Help

-**Architektura**: Viz [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Reference API**: Viz [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Problémy**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR**: Viz `docs/adr/` pro záznamy architektonických rozhodnutí
