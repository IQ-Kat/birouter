# Contributing to OmniRoute (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Благодарим вас за интерес к участию! В этом руководстве описано все, что вам нужно для начала работы.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (рекомендуется: 22 LTS) -**нпм**10+ -**Гит**### Clone & Install

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

Ключевые переменные для развития:

| Переменная             | Разработка по умолчанию  | Описание                         |
| ---------------------- | ------------------------ | -------------------------------- | ---------------------- |
| `ПОРТ`                 | `20128`                  | Порт сервера                     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Базовый URL-адрес для интерфейса |
| `JWT_SECRET`           | (сгенерировать выше)     | Секрет подписания JWT            |
| `INITIAL_PASSWORD`     | `ИЗМЕНИТЬ`               | Первый пароль для входа          |
| `APP_LOG_LEVEL`        | `информация`             | Уровень детализации журнала      | ### Dashboard Settings |

На панели мониторинга предусмотрены переключатели пользовательского интерфейса для функций, которые также можно настроить с помощью переменных среды:

| Местоположение настройки  | Переключить              | Описание                                                       |
| ------------------------- | ------------------------ | -------------------------------------------------------------- |
| Настройки → Дополнительно | Режим отладки            | Включить журналы запросов отладки (пользовательский интерфейс) |
| Настройки → Общие         | Видимость боковой панели | Показать/скрыть разделы боковой панели                         |

Эти настройки хранятся в базе данных и сохраняются при перезапусках, переопределяя значения по умолчанию для env var, если они установлены.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

URL-адреса по умолчанию:

-**Панель управления**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**НИКОГДА не фиксируйте непосредственно `main`.**Всегда используйте функциональные ветки.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Префикс | Цель |
| ----------- | ------------------------- |
| `подвиг/` | Новые возможности |
| `исправить/` | Исправления ошибок |
| `рефакторинг/` | Реструктуризация кода |
| `документы/` | Изменения в документации |
| `тест/` | Тестовые дополнения/исправления |
| `работа/` | Инструментарий, CI, зависимости |### Commit Messages

Следуйте [Обычным коммитам](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Области применения: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

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

Примечания к покрытию:

- `npm run test:coverage` измеряет покрытие источника для основного набора модульных тестов, исключает `tests/**` и включает `open-sse/**`
  – Запросы на включение должны поддерживать общий уровень покрытия на уровне**60 % или выше**для операторов, строк, функций и ветвей.
- Если PR меняет производственный код в `src/`, `open-sse/`, `electron/` или `bin/`, он должен добавить или обновить автоматические тесты в том же PR.
- `npm run Coverage:report` печатает подробный пофайловый отчет из последнего запуска покрытия.
- `npm run test:coverage:legacy` сохраняет старую метрику для исторического сравнения.
- См. «docs/COVERAGE_PLAN.md» для ознакомления с планом поэтапного улучшения покрытия.### Pull Request Requirements

Прежде чем открыть или объединить PR:

- Запустите `npm run test:unit`
- Запустите `npm run test:coverage`
  – Убедитесь, что порог покрытия остается на уровне**60 %+**для всех показателей.
- Включите измененные или добавленные тестовые файлы в описание PR при изменении производственного кода.
- Проверьте результат SonarQube на PR, когда секреты проекта настроены в CI.

Текущий статус тестирования:**122 файла модульных тестов**, охватывающие:

- Переводчики провайдеров и конвертация форматов
- Ограничение скорости, автоматический выключатель и устойчивость
- Семантический кеш, идемпотентность, отслеживание прогресса
- Операции и схема базы данных (21 модуль БД)
- Потоки OAuth и аутентификация
- Проверка конечной точки API (Zod v4)
- Инструменты сервера MCP и обеспечение соблюдения требований
- Системы памяти и навыков---

## Code Style

-**ESLint**— перед фиксацией запустите `npm run lint` -**Prettier**— автоматически форматируется с помощью `lint-staged` при фиксации (2 пробела, точки с запятой, двойные кавычки, ширина 100 символов, завершающие запятые es5) -**TypeScript**— весь код `src/` использует `.ts`/`.tsx`; `open-sse/` использует `.ts`/`.js`; документ с TSDoc(`@param`, `@returns`, `@throws`) -**No `eval()`**— ESLint применяет `no-eval`, `no-implied-eval`, `no-new-func` -**Проверка Zod** — используйте схемы Zod v4 для проверки всех входных данных API. -**Именование**: файлы = CamelCase/kebab-case, компоненты = PascalCase, константы = UPPER_SNAKE---

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

Добавить в `src/shared/constants/providers.ts` — проверено Zod при загрузке модуля.### Step 2: Add Executor (if custom logic needed)

Создайте исполнителя в `open-sse/executors/your-provider.ts`, расширяя базовый исполнитель.### Step 3: Add Translator (if non-OpenAI format)

Создайте переводчики запросов/ответов в `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Добавьте учетные данные OAuth в `src/lib/oauth/constants/oauth.ts` и сервис в `src/lib/oauth/services/`.### Step 5: Register Models

Добавьте определения модели в `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Напишите модульные тесты в `tests/unit/`, охватывающие как минимум:

- Регистрация провайдера
- Перевод запроса/ответа
- Обработка ошибок---

## Pull Request Checklist

- [ ] Тесты пройдены (`npm test`)
- [ ] Проходы проверки (`npm run lint`)
- [ ] Сборка прошла успешно (`npm run build`)
- [] Добавлены типы TypeScript для новых общедоступных функций и интерфейсов.
- [ ] Никаких жестко запрограммированных секретов или резервных значений.
- [ ] Все входные данные проверены с помощью схем Zod.
- [ ] Обновление CHANGELOG (при изменении, касающемся пользователя)
- [ ] Обновлена документация (если применимо)---

## Releasing

Выпуски управляются с помощью рабочего процесса `/generate-release`. При создании нового выпуска GitHub пакет**автоматически публикуется в npm**с помощью действий GitHub.---

## Getting Help

-**Архитектура**: см. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). -**Справочник по API**: см. [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md). -**Проблемы**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR**: записи архитектурных решений см. в `docs/adr/`.
