# Contributing to OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Thank you for your interest in contributing! Ez az útmutató mindent tartalmaz, amire szüksége van az induláshoz.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (ajánlott: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

A fejlesztés legfontosabb változói:

| Változó                | Fejlesztési alapértelmezett | Leírás                     |
| ---------------------- | --------------------------- | -------------------------- | ---------------------- |
| "KIKÖTŐ"               | "20128"                     | Szerver port               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`    | Az előtér alap URL-je      |
| "JWT_SECRET"           | (generálás fent)            | JWT aláírási titok         |
| `INITIAL_PASSWORD`     | "VÁLTOZÁS"                  | Első bejelentkezési jelszó |
| `APP_LOG_LEVEL`        | "információ"                | Napló bőbeszédűségi szint  | ### Dashboard Settings |

Az irányítópult kezelőfelület-kapcsolókat biztosít a környezeti változókkal is konfigurálható funkciókhoz:

| Hely beállítása         | Váltás               | Leírás                                        |
| ----------------------- | -------------------- | --------------------------------------------- |
| Beállítások → Speciális | Hibakeresési mód     | Hibakeresési kérésnaplók (UI) engedélyezése   |
| Beállítások → Általános | Oldalsáv láthatósága | Oldalsáv szakaszainak megjelenítése/elrejtése |

Ezeket a beállításokat a rendszer az adatbázisban tárolja, és az újraindítások során is megmarad, felülírva az env var alapértelmezett beállításait.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Alapértelmezett URL-ek:

-**Irányítópult**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**SOHA ne kötelezze el magát közvetlenül a `main'-ra.**Mindig használjon jellemző ágakat.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Előtag | Cél |
| ----------- | -------------------------- |
| `feat/` | Új funkciók |
| `fix/` | Hibajavítások |
| `refaktor/` | A kód átstrukturálása |
| `dokumentumok/` | Változások a dokumentációban |
| `teszt/` | Teszt kiegészítések/javítások |
| `munka/` | Szerszámozás, CI, függőségek |### Commit Messages

Kövesse [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Alkalmazási körök: "db", "sse", "oauth", "dashboard", "api", "cli", "docker", "ci", "mcp", "a2a", "memória", "készségek".---

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

Fedezeti megjegyzések:

- Az "npm run test:coverage" méri a fő egység tesztkészletének forráslefedettségét, nem tartalmazza a "tests/**" és tartalmazza az "open-sse/**"
- A lehívási kérelmeknek a teljes lefedettségi kaput**60%-on vagy magasabbon**kell tartaniuk az utasítások, sorok, függvények és ágak esetében.
- Ha egy PR módosítja a termelési kódot az `src/`, `open-sse/`, `electron/` vagy `bin/` karakterláncokban, akkor ugyanabban a PR-ben automatikus teszteket kell hozzáadnia vagy frissítenie.
- `npm run coverage:report` kinyomtatja a részletes, fájlonkénti jelentést a legutóbbi lefedettségi futtatásból
- Az `npm run test:coverage:legacy` megőrzi a régebbi mérőszámot a korábbi összehasonlításhoz
- Lásd a `docs/COVERAGE_PLAN.md` a lefedettség fokozatos javításának ütemtervét### Pull Request Requirements

PR megnyitása vagy összevonása előtt:

- Futtassa az `npm run test:unit` parancsot
- Futtassa az `npm run test:coverage' parancsot
- Győződjön meg arról, hogy a lefedettségi kapu**60%+**marad minden mérőszámnál
- A módosított vagy hozzáadott tesztfájlokat a PR-leírásban kell szerepeltetni a gyártási kód megváltoztatásakor
- Ellenőrizze a SonarQube eredményét a PR-on, ha a projekttitkok konfigurálva vannak a CI-ben

Jelenlegi tesztállapot:**122 egység tesztfájl**, amely:

- Szolgáltató fordítók és formátumkonverzió
- Sebességkorlátozás, megszakító és rugalmasság
- Szemantikus gyorsítótár, idempotencia, folyamatkövetés
- Adatbázis műveletek és séma (21 DB modul)
- OAuth-folyamatok és hitelesítés
- API-végpont ellenőrzése (Zod v4)
- MCP szerver eszközök és hatókör érvényesítése
- Memória és készségek rendszerek---

## Code Style

-**ESLint**— Futtassa az `npm run lint` parancsot a véglegesítés előtt -**Szebb**— Automatikus formázás a "lint-staged" segítségével véglegesítéskor (2 szóköz, pontosvessző, idézőjel, 100 karakter szélesség, es5 vessző) -**TypeScript**– Minden `src/` kód a `.ts`/`.tsx-et használja; az `open-sse/`a`.ts`/`.js-t használja; dokumentum TSDoc-kal ("@param", "@returns", "@dobások") -**Nincs `eval()`**— Az ESLint kényszeríti a `no-eval', `no-implied-eval', "no-new-func" -**Zod-ellenőrzés**— Használja a Zod v4 sémákat az összes API-bemenet ellenőrzéséhez -**Elnevezés**: Fájlok = camelCase/kebab-tok, összetevők = PascalCase, konstansok = UPPER_SNAKE---

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

Hozzáadás az `src/shared/constants/providers.ts-hez — Zod-ellenőrzés a modul betöltésekor.### Step 2: Add Executor (if custom logic needed)

Hozzon létre végrehajtót az `open-sse/executors/your-provider.ts` fájlban az alap végrehajtó kiterjesztésével.### Step 3: Add Translator (if non-OpenAI format)

Hozzon létre kérés/válasz fordítókat az `open-sse/translator/` fájlban.### Step 4: Add OAuth Config (if OAuth-based)

Adja hozzá az OAuth-hitelesítési adatokat az `src/lib/oauth/constants/oauth.ts' fájlhoz és a szolgáltatást az 'src/lib/oauth/services/' mappához.### Step 5: Register Models

Adja hozzá a modelldefiníciókat az "open-sse/config/providerRegistry.ts" fájlhoz.### Step 6: Add Tests

Írjon egységteszteket a "tesztek/egység/" mezőbe, amely legalább a következőket tartalmazza:

- Szolgáltató regisztrációja
- Fordítás kérése/válaszolása
- Hibakezelés---

## Pull Request Checklist

- [ ] A tesztek sikeresek ("npm teszt")
- [ ] Linting pass (`npm run lint`)
- [ ] A felépítés sikeres (`npm run build`)
- [ ] TypeScript típusok hozzáadva az új nyilvános funkciókhoz és interfészekhez
- [ ] Nincsenek kódolt titkok vagy tartalék értékek
- [ ] Minden bemenet Zod-sémákkal érvényesítve
- [ ] CHANGELOG frissítve (ha a változás a felhasználó felé fordul)
- [ ] Dokumentáció frissítve (ha van)---

## Releasing

A kiadások kezelése a „/generate-release” munkafolyamattal történik. Új GitHub-kiadás létrehozásakor a csomag**automatikusan közzéteszi az npm-et**a GitHub Actions szolgáltatáson keresztül.---

## Getting Help

-**Architektúra**: Lásd: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**API-referencia**: Lásd: [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Problémák**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR-ek**: Lásd a `docs/adr/` az építészeti döntési rekordokat
