# Contributing to OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Kiitos mielenkiinnostasi osallistua! Tämä opas kattaa kaiken, mitä tarvitset aloittaaksesi.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (suositus: 22 LTS) -**npm**10+ -**Juttu**### Clone & Install

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

Keskeiset muuttujat kehitystä varten:

| Muuttuja               | Kehityksen oletusarvo    | Kuvaus                             |
| ---------------------- | ------------------------ | ---------------------------------- | ---------------------- |
| "PORTTI"               | "20128"                  | Palvelinportti                     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Käyttöliittymän perus-URL-osoite   |
| "JWT_SECRET"           | (luo edellä)             | JWT:n allekirjoitussalaisuus       |
| `ALKU_SALASANA`        | "MUUTOS"                 | Ensimmäisen kirjautumisen salasana |
| `APP_LOG_LEVEL`        | "info"                   | Lokin monisanaisuustaso            | ### Dashboard Settings |

Kojelauta tarjoaa käyttöliittymän vaihdot ominaisuuksille, jotka voidaan myös määrittää ympäristömuuttujien avulla:

| Asetuspaikka              | Vaihda              | Kuvaus                                                  |
| ------------------------- | ------------------- | ------------------------------------------------------- |
| Asetukset → Lisäasetukset | Virheenkorjaustila  | Ota virheenkorjauspyyntölokit käyttöön (käyttöliittymä) |
| Asetukset → Yleiset       | Sivupalkin näkyvyys | Näytä/piilota sivupalkin osiot                          |

Nämä asetukset tallennetaan tietokantaan ja pysyvät uudelleenkäynnistyksen jälkeen ohittaen env var -oletukset, kun ne on asetettu.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Oletus-URL-osoitteet:

-**Käyttöpaneeli**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**ÄLÄ KOSKAAN sitoudu suoraan pääsivuun.**Käytä aina ominaisuushaaroja.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Etuliite | Tarkoitus |
| ----------- | -------------------------- |
| `feat/` | Uusia ominaisuuksia |
| `korjaa/` | Virheenkorjauksia |
| `refaktori/` | Koodin uudelleenjärjestely |
| `docs/` | Asiakirjojen muutokset |
| `testi/` | Testaa lisäyksiä/korjauksia |
| `työ/` | Työkalut, CI, riippuvuudet |### Commit Messages

Seuraa [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Laajuus: "db", "sse", "oauth", "dashboard", "api", "cli", "docker", "ci", "mcp", "a2a", "muisti", "taidot".---

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

Kattavuushuomautukset:

- "npm run test:coverage" mittaa pääyksikön testipaketin lähteen kattavuuden, ei sisällä "tests/**" ja sisältää "open-sse/**"
- Vetopyyntöjen on pidettävä lausekkeiden, rivien, funktioiden ja haarojen kokonaispeitto**60 %:ssa tai korkeammassa**.
- Jos PR muuttaa tuotantokoodia tiedostoissa "src/", "open-sse/", "electron/" tai "bin/", sen on lisättävä tai päivitettävä automaattisia testejä samassa PR:ssa
- `npm run coverage:report` tulostaa yksityiskohtaisen tiedostokohtaisen raportin viimeisimmästä kattavuusajosta
- "npm run test:coverage:legacy" säilyttää vanhemman tiedon historiallista vertailua varten
- Katso `docs/COVERAGE_PLAN.md` vaiheittaisen kattavuuden parantamissuunnitelman### Pull Request Requirements

Ennen PR:n avaamista tai yhdistämistä:

- Suorita `npm run test:unit`
- Suorita `npm run test:coverage'
- Varmista, että kattavuusportti pysyy**60 %+**:ssa kaikissa mittareissa
- Sisällytä muutetut tai lisätyt testitiedostot PR-kuvaukseen, kun tuotantokoodia muutetaan
- Tarkista SonarQube-tulos PR:stä, kun projektin salaisuudet on määritetty CI:ssä

Nykyinen testitila:**122 yksikkötestitiedostoa**, joka kattaa:

- Palveluntarjoajan kääntäjät ja muotomuunnos
- Nopeuden rajoitus, katkaisija ja joustavuus
- Semanttinen välimuisti, idempotenssi, edistymisen seuranta
- Tietokantatoiminnot ja -skeema (21 DB-moduulia)
- OAuth-virrat ja todennus
- API-päätepisteen vahvistus (Zod v4)
- MCP-palvelintyökalut ja laajuuden valvonta
- Muisti- ja taitojärjestelmät---

## Code Style

-**ESLint**— Suorita `npm run lint` ennen sitoutumista -**Kauneempi**— Muotoiltu automaattisesti "lint-staged"-toiminnolla vahvistuksen yhteydessä (2 välilyöntiä, puolipisteet, lainausmerkit, 100 merkin leveys, es5-pilkut) -**TypeScript**— Kaikki src/-koodit käyttävät .ts/'.tsx-koodia; `open-sse/` käyttää `.ts`/`.js`; asiakirja, jossa on TSDoc (`@param`, "@returns", "@heitot") -**No `eval()`**— ESLint pakottaa "no-eval", "no-implied-eval", "no-new-func" -**Zod-validointi**— Käytä Zod v4 -skeemoja kaikkeen API-syötteen validointiin -**Nimitys**: Tiedostot = camelCase/kebab-kotelo, komponentit = PascalCase, vakiot = UPPER_SNAKE---

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

Lisää tiedostoon "src/shared/constants/providers.ts" — Zod-validoitu moduulin latauksen yhteydessä.### Step 2: Add Executor (if custom logic needed)

Luo suoritin tiedostoon "open-sse/executors/your-provider.ts" laajentaen perussuoritusohjelmaa.### Step 3: Add Translator (if non-OpenAI format)

Luo pyyntö-/vastauskääntäjät tiedostossa "open-sse/translator/".### Step 4: Add OAuth Config (if OAuth-based)

Lisää OAuth-tunnistetiedot kansioon `src/lib/oauth/constants/oauth.ts' ja palvelu kansioon `src/lib/oauth/services/`.### Step 5: Register Models

Lisää mallin määritelmät tiedostoon "open-sse/config/providerRegistry.ts".### Step 6: Add Tests

Kirjoita yksikkötestit kohtaan `tests/unit/`, joka kattaa vähintään:

- Palveluntarjoajan rekisteröinti
- Pyydä/vastaa käännös
- Virheiden käsittely---

## Pull Request Checklist

- [ ] Testit läpäisivät (`npm-testi`)
- [ ] Linting passit (`npm run lint`)
- [ ] Rakennus onnistuu (`npm run build`)
- [ ] TypeScript-tyypit lisätty uusia julkisia toimintoja ja liitäntöjä varten
- [ ] Ei kovakoodattuja salaisuuksia tai vara-arvoja
- [ ] Kaikki syötteet on vahvistettu Zod-skeemoilla
- [ ] CHANGELOG päivitetty (jos käyttäjälle suunnattu muutos)
- [ ] Dokumentaatio päivitetty (tarvittaessa)---

## Releasing

Julkaisuja hallitaan /generate-release-työnkulun kautta. Kun uusi GitHub-julkaisu luodaan, paketti**julkaistaan ​​automaattisesti npm:lle**GitHub Actionsin kautta.---

## Getting Help

-**Arkkitehtuuri**: Katso [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**API-viite**: Katso [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Ongelmat**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR:t**: Katso arkkitehtoniset päätöstiedot kohdasta `docs/adr/`
