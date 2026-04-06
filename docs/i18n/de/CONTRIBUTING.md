# Contributing to OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Vielen Dank für Ihr Interesse an einer Mitarbeit! Dieser Leitfaden deckt alles ab, was Sie für den Einstieg benötigen.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (empfohlen: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Schlüsselvariablen für die Entwicklung:

| Variable               | Entwicklungsstandard     | Beschreibung                        |
| ---------------------- | ------------------------ | ----------------------------------- | ---------------------- |
| „HAFEN“                | `20128`                  | Server-Port                         |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Basis-URL für Frontend              |
| `JWT_SECRET`           | (oben generieren)        | JWT-Signaturgeheimnis               |
| `INITIAL_PASSWORD`     | „CHANGEME“               | Erstes Login-Passwort               |
| `APP_LOG_LEVEL`        | `Info`                   | Ausführlichkeitsgrad des Protokolls | ### Dashboard Settings |

Das Dashboard bietet UI-Schalter für Funktionen, die auch über Umgebungsvariablen konfiguriert werden können:

| Standort festlegen        | Umschalten                    | Beschreibung                                 |
| ------------------------- | ----------------------------- | -------------------------------------------- |
| Einstellungen → Erweitert | Debug-Modus                   | Debug-Anforderungsprotokolle (UI) aktivieren |
| Einstellungen → Allgemein | Sichtbarkeit der Seitenleiste | Seitenleistenabschnitte ein-/ausblenden      |

Diese Einstellungen werden in der Datenbank gespeichert und bleiben über Neustarts hinweg bestehen, wobei sie bei Festlegung die Standardeinstellungen der Umgebungsvariablen überschreiben.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Standard-URLs:

-**Dashboard**: `http://localhost:20128/dashboard` -**API**: „http://localhost:20128/v1“.---

## Git Workflow

> ⚠️**NIEMALS direkt auf „main“ festlegen.**Verwenden Sie immer Feature-Branches.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Präfix | Zweck |
| ----------- | ------------------------- |
| `feat/` | Neue Funktionen |
| `fix/` | Fehlerbehebungen |
| `refactor/` | Code-Umstrukturierung |
| `docs/` | Dokumentationsänderungen |
| `test/` | Ergänzungen/Korrekturen testen |
| `lästige Pflicht/` | Tooling, CI, Abhängigkeiten |### Commit Messages

Folgen Sie [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Bereiche: „db“, „sse“, „oauth“, „dashboard“, „api“, „cli“, „docker“, „ci“, „mcp“, „a2a“, „memory“, „skills“.---

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

Hinweise zur Deckung:

- „npm run test:coverage“ misst die Quellabdeckung für die Haupteinheitstestsuite, schließt „tests/**“ aus und schließt „open-sse/**“ ein
  – Pull-Anfragen müssen das Gesamtabdeckungs-Gate für Anweisungen, Zeilen, Funktionen und Zweige bei**60 % oder mehr**halten
- Wenn ein PR den Produktionscode in „src/“, „open-sse/“, „electron/“ oder „bin/“ ändert, muss er automatisierte Tests im selben PR hinzufügen oder aktualisieren
- „npm run cover:report“ druckt den detaillierten Datei-für-Datei-Bericht des letzten Coverage-Laufs
- „npm run test:coverage:legacy“ behält die ältere Metrik für den historischen Vergleich bei
- Die Roadmap zur schrittweisen Verbesserung der Abdeckung finden Sie unter „docs/COVERAGE_PLAN.md“.### Pull Request Requirements

Bevor Sie eine PR öffnen oder zusammenführen:

- Führen Sie „npm run test:unit“ aus
- Führen Sie „npm run test:coverage“ aus
- Stellen Sie sicher, dass das Abdeckungs-Gate für alle Kennzahlen bei**60 %+**bleibt
- Fügen Sie die geänderten oder hinzugefügten Testdateien in die PR-Beschreibung ein, wenn sich der Produktionscode ändert
  – Überprüfen Sie das SonarQube-Ergebnis auf dem PR, wenn die Projektgeheimnisse in CI konfiguriert sind

Aktueller Teststatus:**122 Unit-Testdateien**, die Folgendes abdecken:

- Anbieterübersetzer und Formatkonvertierung
- Ratenbegrenzung, Leistungsschalter und Belastbarkeit
- Semantischer Cache, Idempotenz, Fortschrittsverfolgung
- Datenbankoperationen und Schema (21 DB-Module)
- OAuth-Abläufe und Authentifizierung
- API-Endpunktvalidierung (Zod v4)
- MCP-Server-Tools und Bereichsdurchsetzung
- Gedächtnis- und Fähigkeitssysteme---

## Code Style

-**ESLint**– Führen Sie „npm run lint“ vor dem Commit aus -**Hübscher**– Automatisch formatiert über „lint-staged“ beim Commit (2 Leerzeichen, Semikolons, doppelte Anführungszeichen, 100 Zeichen Breite, es5 nachgestellte Kommas) -**TypeScript**– Der gesamte `src/`-Code verwendet `.ts`/`.tsx`; `open-sse/` verwendet `.ts`/`.js`; Dokument mit TSDoc („@param“, „@returns“, „@throws“) -**No `eval()`**– ESLint erzwingt „no-eval“, „no-implied-eval“, „no-new-func“. -**Zod-Validierung**– Verwenden Sie Zod v4-Schemas für die gesamte API-Eingabevalidierung -**Benennung**: Dateien = camelCase/kebab-case, Komponenten = PascalCase, Konstanten = UPPER_SNAKE---

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

Zu „src/shared/constants/providers.ts“ hinzufügen – Zod-validiert beim Laden des Moduls.### Step 2: Add Executor (if custom logic needed)

Erstellen Sie einen Executor in „open-sse/executors/your-provider.ts“ und erweitern Sie den Basis-Executor.### Step 3: Add Translator (if non-OpenAI format)

Erstellen Sie Anforderungs-/Antwortübersetzer in „open-sse/translator/“.### Step 4: Add OAuth Config (if OAuth-based)

Fügen Sie OAuth-Anmeldeinformationen in „src/lib/oauth/constants/oauth.ts“ und den Dienst in „src/lib/oauth/services/“ hinzu.### Step 5: Register Models

Fügen Sie Modelldefinitionen in „open-sse/config/providerRegistry.ts“ hinzu.### Step 6: Add Tests

Schreiben Sie Unit-Tests in „tests/unit/“, die mindestens Folgendes abdecken:

- Anbieterregistrierung
- Anfrage-/Antwortübersetzung
- Fehlerbehandlung---

## Pull Request Checklist

- [ ] Tests bestanden (`npm test`)
- [ ] Linting-Pässe (`npm run lint`)
- [ ] Build erfolgreich (`npm run build`)
- [ ] TypeScript-Typen für neue öffentliche Funktionen und Schnittstellen hinzugefügt
- [ ] Keine fest codierten Geheimnisse oder Fallback-Werte
- [ ] Alle Eingaben mit Zod-Schemata validiert
- [ ] CHANGELOG aktualisiert (bei benutzerbezogener Änderung)
- [ ] Dokumentation aktualisiert (falls zutreffend)---

## Releasing

Releases werden über den Workflow „/generate-release“ verwaltet. Wenn eine neue GitHub-Version erstellt wird, wird das Paket über GitHub Actions**automatisch auf npm veröffentlicht**.---

## Getting Help

-**Architektur**: Siehe [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**API-Referenz**: Siehe [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Probleme**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: Architekturentscheidungsdatensätze finden Sie unter „docs/adr/“.
