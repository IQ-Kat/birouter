# Contributing to OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Vă mulțumim pentru interesul de a contribui! Acest ghid acoperă tot ce aveți nevoie pentru a începe.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (recomandat: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Variabile cheie pentru dezvoltare:

| Variabila              | Implicit de dezvoltare   | Descriere                           |
| ---------------------- | ------------------------ | ----------------------------------- | ---------------------- |
| `PORT`                 | `20128`                  | Port server                         |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | URL de bază pentru frontend         |
| `JWT_SECRET`           | (generați mai sus)       | Secret de semnare JWT               |
| `PAROLA_INIȚIALĂ`      | `SCHIMBARE`              | Prima parolă de conectare           |
| `APP_LOG_LEVEL`        | `info`                   | Nivelul de verbozitate a jurnalului | ### Dashboard Settings |

Tabloul de bord oferă comutări de interfață pentru funcții care pot fi configurate și prin variabile de mediu:

| Setarea locației | Comutare                     | Descriere                                         |
| ---------------- | ---------------------------- | ------------------------------------------------- |
| Setări → Avansat | Modul de depanare            | Activați jurnalele de solicitări de depanare (UI) |
| Setări → General | Vizibilitatea barei laterale | Afișați/ascundeți secțiunile barei laterale       |

Aceste setări sunt stocate în baza de date și persistă la reporniri, suprascriind valorile implicite env var atunci când sunt setate.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Adrese URL implicite:

-**Tabloul de bord**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**NU vă angajați NICIODATĂ direct la `principal`.**Folosiți întotdeauna ramuri de caracteristici.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Prefix | Scop |
| ----------- | ------------------------- |
| `feat/` | Caracteristici noi |
| `fix/` | Remedieri de erori |
| `refactor/` | Restructurarea codului |
| `docs/` | Modificări ale documentației |
| `test/` | Testare completări/remedieri |
| `chore/` | Instrumente, CI, dependențe |### Commit Messages

Urmăriți [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Domenii: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

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

Note de acoperire:

- `npm run test:coverage` măsoară acoperirea sursei pentru suita principală de teste unitare, exclude `tests/**` și include `open-sse/**`
- Solicitările pull trebuie să mențină poarta de acoperire generală la**60% sau mai mare**pentru extrase, linii, funcții și ramuri
- Dacă un PR modifică codul de producție în `src/`, `open-sse/`, `electron/` sau `bin/`, trebuie să adauge sau să actualizeze teste automate în același PR
- `npm run coverage:report` tipărește raportul detaliat fișier cu fișier de la cea mai recentă rulare de acoperire
- `npm run test:coverage:legacy` păstrează valoarea mai veche pentru comparație istorică
- Consultați `docs/COVERAGE_PLAN.md` pentru foaia de parcurs de îmbunătățire a acoperirii în faze### Pull Request Requirements

Înainte de a deschide sau de a fuziona un PR:

- Rulați `npm run test:unit`
- Rulați `npm run test:coverage`
- Asigurați-vă că poarta de acoperire rămâne la**60%+**pentru toate valorile
- Includeți fișierele de testare modificate sau adăugate în descrierea PR atunci când codul de producție a fost modificat
- Verificați rezultatul SonarQube pe PR atunci când secretele proiectului sunt configurate în CI

Starea actuală a testului:**122 fișiere de test unitar**care acoperă:

- Furnizor de traducători și conversie de format
- Limitarea ratei, întrerupătorul de circuit și rezistența
- Cache semantic, idempotenta, urmarirea progresului
- Operațiuni și schemă cu baze de date (21 module DB)
- Fluxuri OAuth și autentificare
- Validare API endpoint (Zod v4)
- Instrumente de server MCP și aplicarea domeniului de aplicare
- Sisteme de memorie și abilități---

## Code Style

-**ESLint**— Rulați `npm run lint` înainte de a efectua comiterea -**Prettier**— Formatat automat prin `lint-staged` la comitere (2 spații, punct și virgulă, ghilimele duble, lățime de 100 de caractere, virgule de final es5) -**TypeScript**— Tot codul `src/` folosește `.ts`/`.tsx`; `open-sse/` folosește `.ts`/`.js`; document cu TSDoc (`@param`, `@returns`, `@throws`) -**Fără `eval()`**— ESLint impune `no-eval`, `no-implied-eval`, `no-new-func` -**Validare Zod**— Utilizați schemele Zod v4 pentru validarea tuturor intrărilor API -**Denumire**: Fișiere = camelCase/kebab-case, componente = PascalCase, constante = UPPER_SNAKE---

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

Adăugați la `src/shared/constants/providers.ts` — validat Zod la încărcarea modulului.### Step 2: Add Executor (if custom logic needed)

Creați executor în `open-sse/executors/your-provider.ts` extinzând executorul de bază.### Step 3: Add Translator (if non-OpenAI format)

Creați traducători de cerere/răspuns în `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Adăugați acreditările OAuth în `src/lib/oauth/constants/oauth.ts` și serviciul în `src/lib/oauth/services/`.### Step 5: Register Models

Adăugați definiții de model în `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Scrieți testele unitare în `tests/unit/` care acoperă cel puțin:

- Înregistrarea furnizorului
- traducere cerere/răspuns
- Gestionarea erorilor---

## Pull Request Checklist

- [ ] Testele trec (`npm test`)
- [ ] Treci de scame (`npm run lint`)
- [ ] Construirea reușește (`npm run build`)
- [ ] Tipuri TypeScript adăugate pentru noi funcții publice și interfețe
- [ ] Fără secrete hardcoded sau valori alternative
- [ ] Toate intrările validate cu scheme Zod
- [ ] CHANGELOG actualizat (dacă se modifică utilizatorul)
- [ ] Documentație actualizată (dacă este cazul)---

## Releasing

Lansările sunt gestionate prin fluxul de lucru `/generate-release`. Când este creată o nouă versiune GitHub, pachetul este**publicat automat în npm**prin GitHub Actions.---

## Getting Help

-**Arhitectură**: Vezi [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Referință API**: Vezi [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Probleme**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: Consultați `docs/adr/` pentru înregistrările deciziilor arhitecturale
