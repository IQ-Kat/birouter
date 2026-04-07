# Contributing to OmniRoute (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Дякуємо за ваш інтерес до участі! Цей посібник охоплює все, що вам потрібно для початку.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (рекомендовано: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Ключові змінні для розвитку:

| Змінна                     | Розробка за замовчуванням | Опис                             |
| -------------------------- | ------------------------- | -------------------------------- | ---------------------- |
| `ПОРТ`                     | `20128`                   | Порт сервера                     |
| `НАСТУПНА_PUBLIC_BASE_URL` | `http://localhost:20128`  | Базова URL-адреса для інтерфейсу |
| `JWT_SECRET`               | (згенерувати вище)        | Секрет підпису JWT               |
| `ПОЧАТКОВИЙ_ПАРОЛЬ`        | `CHANGEME`                | Перший пароль для входу          |
| `APP_LOG_LEVEL`            | `інформація`              | Рівень докладності журналу       | ### Dashboard Settings |

Інформаційна панель містить перемикачі інтерфейсу користувача для функцій, які також можна налаштувати за допомогою змінних середовища:

| Налаштування місцезнаходження | Перемкнути              | Опис                                           |
| ----------------------------- | ----------------------- | ---------------------------------------------- |
| Параметри → Додатково         | Режим налагодження      | Увімкнути журнали запитів на налагодження (UI) |
| Параметри → Загальні          | Видимість бічної панелі | Показати/сховати розділи бічної панелі         |

Ці параметри зберігаються в базі даних і зберігаються під час перезапусків, замінюючи значення за замовчуванням env var, якщо встановлено.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

URL-адреси за умовчанням:

-**Інформаційна панель**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**НІКОЛИ не приєднуйтеся безпосередньо до `main`.**Завжди використовуйте гілки функцій.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Префікс | Призначення |
| ----------- | ------------------------ |
| `подвиг/` | Нові функції |
| `виправити/` | Виправлення помилок |
| `refactor/` | Код реструктуризації |
| `docs/` | Зміни документації |
| `test/` | Тестові доповнення/виправлення |
| `домашня робота/` | Оснащення, КІ, залежності |### Commit Messages

Дотримуйтесь [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Області: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

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

Примітки щодо покриття:

- `npm run test:coverage` вимірює покриття вихідного коду для основного блоку тестів, виключаючи `tests/**` і включає `open-sse/**`
- Запити на витягування мають підтримувати загальний рівень покриття на рівні**60% або вище**для операторів, рядків, функцій і гілок
- Якщо PR змінює робочий код у `src/`, `open-sse/`, `electron/` або `bin/`, він повинен додати або оновити автоматичні тести в тій самій PR
- `npm run coverage:report` друкує докладний звіт файл за файлом з останнього циклу покриття
- `npm run test:coverage:legacy` зберігає стару метрику для історичного порівняння
- Див. `docs/COVERAGE_PLAN.md` для поетапного плану покращення покриття### Pull Request Requirements

Перед відкриттям або об'єднанням PR:

- Запустіть `npm run test:unit`
- Запустіть `npm run test:coverage`
- Переконайтеся, що межа покриття залишається на рівні**60%+**для всіх показників
- Включіть змінені або додані тестові файли в опис PR під час зміни коду виробництва
- Перевірте результат SonarQube на PR, коли секрети проекту налаштовано в CI

Поточний статус тестування:**122 файли модульних тестів**, що охоплюють:

- Перекладачі постачальників і перетворення форматів
- Обмеження швидкості, автоматичний вимикач і стійкість
- Семантичний кеш, ідемпотентність, відстеження прогресу
- Операції з базою даних і схема (21 модуль БД)
- Потоки OAuth і автентифікація
- Перевірка кінцевої точки API (Zod v4)
- Серверні інструменти MCP та забезпечення виконання
- Системи пам'яті та навичок---

## Code Style

-**ESLint**— запустіть `npm run lint` перед фіксацією -**Prettier**— автоматично відформатовано за допомогою `lint-staged` під час фіксації (2 пробіли, крапка з комою, подвійні лапки, ширина 100 символів, кінцеві коми es5) -**TypeScript**— увесь код `src/` використовує `.ts`/`.tsx`; `open-sse/` використовує `.ts`/`.js`; документ із TSDoc (`@param`, `@returns`, `@throws`) -**No `eval()`**— ESLint примусово виконує `no-eval`, `no-implied-eval`, `no-new-func` -**Перевірка Zod**— використовуйте схеми Zod v4 для перевірки всіх вхідних даних API -**Назування**: файли = camelCase/kebab-case, компоненти = PascalCase, константи = UPPER_SNAKE---

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

Додайте до `src/shared/constants/providers.ts` — перевірено Zod під час завантаження модуля.### Step 2: Add Executor (if custom logic needed)

Створіть виконавець у `open-sse/executors/your-provider.ts`, розширюючи базовий виконавець.### Step 3: Add Translator (if non-OpenAI format)

Створіть перекладачі запитів/відповідей у ​​`open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Додайте облікові дані OAuth у `src/lib/oauth/constants/oauth.ts`, а службу — у `src/lib/oauth/services/`.### Step 5: Register Models

Додайте визначення моделі в `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Пишіть модульні тести в `tests/unit/`, охоплюючи принаймні:

- Реєстрація провайдера
- Переклад запиту/відповіді
- Обробка помилок---

## Pull Request Checklist

- [ ] Тести пройдені (`npm test`)
- [ ] Linting проходить (`npm run lint`)
- [ ] Збірка успішна (`npm run build`)
- [ ] Типи TypeScript додано для нових публічних функцій та інтерфейсів
- [ ] Жодних жорстко закодованих секретів або резервних значень
- [ ] Усі вхідні дані підтверджені схемами Zod
- [ ] ЖУРНАЛ ЗМІН оновлено (якщо зміни стосуються користувача)
- [ ] Оновлена документація (якщо застосовно)---

## Releasing

Випуски керуються через робочий процес `/generate-release`. Коли створюється новий випуск GitHub, пакет**автоматично публікується в npm**за допомогою дій GitHub.---

## Getting Help

-**Архітектура**: див. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Довідка по API**: див. [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Проблеми**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: див. `docs/adr/` для записів архітектурних рішень
