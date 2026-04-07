# Contributing to OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Dziękujemy za zainteresowanie współpracą! W tym przewodniku znajdziesz wszystko, czego potrzebujesz, aby zacząć.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (zalecane: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Kluczowe zmienne dla rozwoju:

| Zmienna                 | Domyślne oprogramowanie  | Opis                            |
| ----------------------- | ------------------------ | ------------------------------- | ---------------------- |
| `PORT`                  | `20128`                  | Port serwera                    |
| `NEXT_PUBLIC_BASE_URL`  | `http://localhost:20128` | Bazowy adres URL frontendu      |
| `JWT_SECRET`            | (wygeneruj powyżej)      | Sekret podpisania JWT           |
| `INITIAL_HASŁO`         | `ZMIANA`                 | Hasło pierwszego logowania      |
| `POZIOM_LOGU_APLIKACJI` | `informacje`             | Poziom szczegółowości dziennika | ### Dashboard Settings |

Pulpit nawigacyjny udostępnia przełączniki interfejsu użytkownika dla funkcji, które można również skonfigurować za pomocą zmiennych środowiskowych:

| Ustawianie lokalizacji    | Przełącz                  | Opis                                   |
| ------------------------- | ------------------------- | -------------------------------------- |
| Ustawienia → Zaawansowane | Tryb debugowania          | Włącz dzienniki żądań debugowania (UI) |
| Ustawienia → Ogólne       | Widoczność paska bocznego | Pokaż/ukryj sekcje paska bocznego      |

Te ustawienia są przechowywane w bazie danych i zachowują się po ponownym uruchomieniu, zastępując wartości domyślne env var, gdy są ustawione.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Domyślne adresy URL:

-**Panel kontrolny**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**Nigdy nie angażuj się bezpośrednio w `main`.**Zawsze używaj gałęzi funkcji.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Przedrostek | Cel |
| ----------- | ----------------------------------- |
| `wyczyn/` | Nowe funkcje |
| `popraw/` | Poprawki błędów |
| `refaktor/` | Restrukturyzacja kodu |
| `dokumenty/` | Zmiany w dokumentacji |
| `test/` | Testuj dodatki/poprawki |
| `obowiązek/` | Narzędzia, CI, zależności |### Commit Messages

Postępuj zgodnie z [konwencjonalnymi zobowiązaniami](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Zakresy: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

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

Uwagi dotyczące zasięgu:

- `npm run test:coverage` mierzy pokrycie źródeł dla głównego zestawu testów jednostkowych, wyklucza `tests/**` i zawiera `open-sse/**`
- Żądania ściągnięcia muszą utrzymywać ogólną bramkę zasięgu na poziomie**60% lub wyższym**dla instrukcji, linii, funkcji i gałęzi
- Jeśli PR zmieni kod produkcyjny w `src/`, `open-sse/`, `electron/` lub `bin/`, musi dodać lub zaktualizować automatyczne testy w tym samym PR
- `npm run cover:report` drukuje szczegółowy raport plik po pliku z ostatniego przebiegu pokrycia
- `npm run test:coverage:legacy` zachowuje starszą metrykę do porównań historycznych
- Zobacz `docs/COVERAGE_PLAN.md`, aby zapoznać się z planem stopniowej poprawy zasięgu### Pull Request Requirements

Przed otwarciem lub połączeniem PR:

- Uruchom `npm run test:unit`
- Uruchom `npm run test:coverage`
- Upewnij się, że bramka pokrycia pozostaje na poziomie**60%+**dla wszystkich wskaźników
- Dołącz zmienione lub dodane pliki testowe do opisu PR w przypadku zmiany kodu produkcyjnego
- Sprawdź wynik SonarQube na PR, gdy klucze tajne projektu są skonfigurowane w CI

Aktualny status testu:**122 pliki testów jednostkowych**obejmujące:

- Tłumacze dostawcy i konwersja formatu
- Ograniczenie szybkości, wyłącznik automatyczny i odporność
- Semantyczna pamięć podręczna, idempotencja, śledzenie postępu
- Operacje i schemat bazy danych (21 modułów DB)
- Przepływy i uwierzytelnianie OAuth
- Walidacja punktu końcowego API (Zod v4)
- Narzędzia serwerowe MCP i egzekwowanie zakresu
- Systemy pamięci i umiejętności---

## Code Style

-**ESLint**— Uruchom `npm run lint` przed zatwierdzeniem -**Ładniej**— Automatyczne formatowanie poprzez „lint-staged” przy zatwierdzeniu (2 spacje, średniki, podwójne cudzysłowy, szerokość 100 znaków, przecinki końcowe es5) -**TypeScript**— Cały kod `src/` używa `.ts`/`.tsx`; `open-sse/` używa `.ts`/`.js`; dokument z TSDoc (`@param`, `@returns`, `@throws`) -**Brak `eval()`**— ESLint wymusza `no-eval`, `no-implikowana-eval`, `no-nowa-funkcja` -**Weryfikacja Zoda**— Używaj schematów Zod v4 do sprawdzania wszystkich danych wejściowych API -**Nazewnictwo**: Pliki = camelCase/kebab-case, komponenty = PascalCase, stałe = UPPER_SNAKE---

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

Dodaj do `src/shared/constants/providers.ts` — Zod sprawdzany przy ładowaniu modułu.### Step 2: Add Executor (if custom logic needed)

Utwórz executor w `open-sse/executors/your-provider.ts`, rozszerzając podstawowy executor.### Step 3: Add Translator (if non-OpenAI format)

Utwórz tłumaczy żądań/odpowiedzi w `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Dodaj poświadczenia OAuth w `src/lib/oauth/constants/oauth.ts` i usługę w `src/lib/oauth/services/`.### Step 5: Register Models

Dodaj definicje modeli w `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Napisz testy jednostkowe w `tests/unit/` obejmujące co najmniej:

- Rejestracja dostawcy
- Tłumaczenie prośby/odpowiedzi
- Obsługa błędów---

## Pull Request Checklist

- [ ] Testy zaliczone (`npm test`)
- [ ] Linting przechodzi (`npm run lint`)
- [ ] Kompilacja powiodła się (`npm run build`)
- [ ] Dodano typy TypeScript dla nowych publicznych funkcji i interfejsów
- [ ] Brak zakodowanych na stałe sekretów i wartości zastępczych
- [ ] Wszystkie dane wejściowe zostały zweryfikowane za pomocą schematów Zoda
- [ ] Zaktualizowano LOG ZMIAN (jeśli zmiany dotyczą użytkownika)
- [ ] Zaktualizowano dokumentację (jeśli dotyczy)---

## Releasing

Wersjami zarządza się poprzez przepływ pracy `/generate-release`. Po utworzeniu nowego wydania GitHub pakiet jest**automatycznie publikowany w npm**za pośrednictwem GitHub Actions.---

## Getting Help

-**Architektura**: Zobacz [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Dokumentacja API**: Zobacz [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Problemy**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR**: Zobacz `docs/adr/`, aby zapoznać się z dokumentacją decyzji architektonicznych
