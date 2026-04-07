# Contributing to OmniRoute (Български)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Благодарим ви за интереса да допринесете! Това ръководство обхваща всичко необходимо, за да работи.---## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (препоръчително: 22 LTS) -**npm**10+ -**Git**### Клониране и инсталиране```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install

````

### Environment Variables

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
````

Ключови променливи за развитие:

| Променлива             | Разработка по подразбиране | Описание                                   |
| ---------------------- | -------------------------- | ------------------------------------------ | ---------------------- |
| `ПОРТ`                 | „20128“                    | Порт на сървъра                            |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`   | Основен URL адрес за интерфейс             |
| `JWT_SECRET`           | (генериране по-горе)       | Тайна за подписване на JWT                 |
| `ПЪРВОНАЧАЛНА_ПАРОЛА`  | `CHANGEME`                 | Първа парола за влизане                    |
| `APP_LOG_LEVEL`        | `информация`               | Ниво на подробност на регистрационния файл | ### Dashboard Settings |

Таблото за управление предоставя UI превключватели за функции, които също могат да бъдат конфигурирани чрез променливи на средата:

| Задаване на местоположение | Превключване                    | Описание                                                                          |
| -------------------------- | ------------------------------- | --------------------------------------------------------------------------------- |
| Настройки → Разширени      | Режим на отстраняване на грешки | Активиране на регистрационните файлове на заявките за отстраняване на грешки (UI) |
| Настройки → Общи           | Видимост на страничната лента   | Показване/скриване на секциите на страничната лента                               |

Тези настройки се запазват в базата данни и се запазват при рестартиране, като заменят настройките по подразбиране env var, когато са претърпени.### Running Locally```bash

# Development mode (hot reload)

npm run dev

# Production build

npm run build
npm run start

# Common port configuration

PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev

````

URL адреси по подразбиране:

-**Табло за управление**: `http://localhost:20128/табло за управление`
-**API**: `http://localhost:20128/v1`---## Git Workflow

> ⚠️**НИКОГА не се включва директно с `main`.**Винаги използват разклонения на функции.```bash
git checkout -b feat/your-feature-name
# ... направи промени ...
git commit -m "feat: опишете вашата промяна"
git push -u origin feat/your-feature-name
# Отворете заявка за изтегляне в GitHub```

### Branch Naming

| Префикс | Цел |
| ----------- | ------------------------ |
| `подвиг/` | Нови функции |
| `поправи/` | Поправки на грешки |
| `рефактор/` | Преструктуриране на код |
| `документи/` | Промени в документацията |
| `тест/` | Тестови допълнения/поправки |
| `скучна работа/` | Инструментална екипировка, CI, зависимости |### Commit Messages

Следвайте [Конвенционални ангажименти](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Обхвати: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---## Running Tests

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

Бележки за покритието:

- `npm run test:coverage` измерва покритието на източника за тестови пакети на основната единица, изключвайки `tests/**` и включва `open-sse/**`
- Заявките за изтегляне трябва да поддържат общата врата за покритие на**60% или по-висока**за отчети, линии, функции и клонове
- Ако PR промени производствения код в `src/`, `open-sse/`, `electron/` или `bin/`, той трябва да добави или актуализира автоматизирани тестове в същия PR
- `npm run coverage:report` отпечатва подробния отчетен файл по файл от последното изпълнение на покритието
- `npm run test:coverage:legacy` запазва по-старата метрика за историческо сравнение
- Вижте `docs/COVERAGE_PLAN.md` за поетапна пътна карта за подобряване на покритието### Pull Request Requirements

Преди да отворите или обедините PR:

- Стартирайте `npm run test:unit`
- Стартирайте `npm run test:coverage`
- Уверете се, че вратата за покритие остава на**60%+**за всички показатели
- Включете променените или добавени тестови файлове в PR описанието при промяна на производствения код
- Проверете резултатите от SonarQube на PR, когато тайните на проекта са конфигурирани в CI

Текущо състояние на теста:**122 файла за единичен тест**, обхващащи:

- Преводачи на доставчици и конвертиране на формати
- Ограничаване на скоростта, прекъсвач и устойчивост
- Семантичен кеш, идемпотентност, проследяване на напредъка
- Операции с база данни и схема (21 DB модула)
- OAuth потоци и удостоверяване
- API валиден за крайни точки (Zod v4)
- MCP сървърни инструменти и прилагане на обхват
- Системи за памет и умения---## Code Style

-**ESLint**— Стартирайте `npm run lint` преди извършване -**Prettier**— Автоматично форматирано чрез `lint-staged` при ангажиране (2 интервала, точка и запетая, двойни кавички, ширина 100 знака, es5 запетая в края) -**TypeScript**— Всички `src/` кодове се използват `.ts`/`.tsx`; `open-sse/` използва `.ts`/`.js`; документ с TSDoc (`@param`, `@returns`, `@throws`) -**Без `eval()`**— ESLint налага `no-eval`, `no-implied-eval`, `no-new-func` -**Zod валидиране**— Използвайте Zod v4 схеми за всички входни валидации на API -**Именуване**: Файлове = camelCase/kebab-case, компоненти = PascalCase, константи = UPPER_SNAKE---## Project Structure

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

Добавете към `src/shared/constants/providers.ts` — Zod-валидирано при зареждане на модула.### Стъпка 2: Добавяне на изпълнител (ако е необходима персонализирана логика)

Създайте изпълнител в `open-sse/executors/your-provider.ts`, като разширите базовия изпълнител.### Стъпка 3: Добавете преводач (ако форматът не е OpenAI)

Създайте преводачи на заявка/отговор в `open-sse/translator/`.### Стъпка 4: Добавете OAuth Config (ако е базиран на OAuth)

Добавете идентификационни данни за OAuth в `src/lib/oauth/constants/oauth.ts` и услуга в `src/lib/oauth/services/`.### Стъпка 5: Регистрирайте модели

Добавете дефиниции на модели в `open-sse/config/providerRegistry.ts`.### Стъпка 6: Добавете тестове

Напишете модулни тестове в `tests/unit/`, покривайки минимум:

- Регистрация при доставчик
- Превод на заявка/отговор
- Обработка на грешки---## Pull Request Checklist

- [ ] Тестовете преминават („npm тест“)
- [ ] Linting преминава (`npm run lint`)
- [ ] Компилацията е успешна (`npm run build`)
- [] TypeScript типове, добавени за нови публични функции и интерфейси
- [ ] Няма твърдо кодирани тайни или резервни стойности
- [ ] Всички входове, валидирани със схеми на Zod
- [ ] CHANGELOG актуализиран (ако промяната е пред потребителя)
- [ ] Актуализирана документация (ако е приложимо)---## Releasing

Изданията се управляват чрез работен процес `/generate-release`. Когато се създаде ново издание на GitHub, пакетът се**автоматично публикува в npm**чрез GitHub Actions.---## Getting Help

-**Архитектура**: Вижте [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**API справка**: Вижте [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Проблеми**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: Вижте `docs/adr/` за записи на архитектурни решения
