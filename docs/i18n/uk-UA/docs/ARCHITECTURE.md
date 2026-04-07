# OmniRoute Architecture (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/ARCHITECTURE.md) · 🇪🇸 [es](../../es/docs/ARCHITECTURE.md) · 🇫🇷 [fr](../../fr/docs/ARCHITECTURE.md) · 🇩🇪 [de](../../de/docs/ARCHITECTURE.md) · 🇮🇹 [it](../../it/docs/ARCHITECTURE.md) · 🇷🇺 [ru](../../ru/docs/ARCHITECTURE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/ARCHITECTURE.md) · 🇯🇵 [ja](../../ja/docs/ARCHITECTURE.md) · 🇰🇷 [ko](../../ko/docs/ARCHITECTURE.md) · 🇸🇦 [ar](../../ar/docs/ARCHITECTURE.md) · 🇮🇳 [hi](../../hi/docs/ARCHITECTURE.md) · 🇮🇳 [in](../../in/docs/ARCHITECTURE.md) · 🇹🇭 [th](../../th/docs/ARCHITECTURE.md) · 🇻🇳 [vi](../../vi/docs/ARCHITECTURE.md) · 🇮🇩 [id](../../id/docs/ARCHITECTURE.md) · 🇲🇾 [ms](../../ms/docs/ARCHITECTURE.md) · 🇳🇱 [nl](../../nl/docs/ARCHITECTURE.md) · 🇵🇱 [pl](../../pl/docs/ARCHITECTURE.md) · 🇸🇪 [sv](../../sv/docs/ARCHITECTURE.md) · 🇳🇴 [no](../../no/docs/ARCHITECTURE.md) · 🇩🇰 [da](../../da/docs/ARCHITECTURE.md) · 🇫🇮 [fi](../../fi/docs/ARCHITECTURE.md) · 🇵🇹 [pt](../../pt/docs/ARCHITECTURE.md) · 🇷🇴 [ro](../../ro/docs/ARCHITECTURE.md) · 🇭🇺 [hu](../../hu/docs/ARCHITECTURE.md) · 🇧🇬 [bg](../../bg/docs/ARCHITECTURE.md) · 🇸🇰 [sk](../../sk/docs/ARCHITECTURE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/ARCHITECTURE.md) · 🇮🇱 [he](../../he/docs/ARCHITECTURE.md) · 🇵🇭 [phi](../../phi/docs/ARCHITECTURE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/ARCHITECTURE.md) · 🇨🇿 [cs](../../cs/docs/ARCHITECTURE.md) · 🇹🇷 [tr](../../tr/docs/ARCHITECTURE.md)

---

_Останнє оновлення: 2026-03-28_## Executive Summary

OmniRoute — це локальний шлюз штучного інтелекту та інформаційна панель, побудована на Next.js.
Він надає єдину кінцеву точку, сумісну з OpenAI (`/v1/*`), і направляє трафік між декількома вихідними постачальниками з перекладом, резервним варіантом, оновленням маркерів і відстеженням використання.

Основні можливості:

- OpenAI-сумісна поверхня API для CLI/інструментів (28 постачальників)
- Переклад запитів/відповідей між форматами постачальників
- Запасна комбінована модель (багатомодельна послідовність)
- Запасний варіант на рівні облікового запису (декілька облікових записів на постачальника)
- OAuth + API-ключ управління підключенням провайдера
- Генерація вбудовування через `/v1/embeddings` (6 постачальників, 9 моделей)
- Створення зображень через `/v1/images/generations` (4 постачальники, 9 моделей)
  — Розбір тегів мислення (`<think>...</think>`) для моделей міркування
  — Дезінфекція відповіді для суворої сумісності з OpenAI SDK
  — Нормалізація ролі (розробник→система, система→користувач) для сумісності між постачальниками
- Перетворення структурованого виводу (json_schema → Gemini responseSchema)
- Локальна постійність для провайдерів, ключів, псевдонімів, комбо, налаштувань, ціноутворення
- Відстеження використання/вартості та реєстрація запитів
- Додаткова хмарна синхронізація для синхронізації кількох пристроїв/станів
  — Список дозволених/чорних IP-адрес для контролю доступу до API
- Продумане управління бюджетом (прохідний/автоматичний/спеціальний/адаптивний)
- Оперативна ін'єкція глобальної системи
- Відстеження сесії та відбитки пальців
- Розширене обмеження швидкості для кожного облікового запису за допомогою профілів постачальника
- Схема автоматичного вимикача для стійкості провайдера
- Захист стада від грому з блокуванням м'ютексу
  — Кеш дедуплікації запитів на основі підпису
- Рівень домену: доступність моделі, правила вартості, резервна політика, політика блокування
- Постійність стану домену (скрізний кеш SQLite для резервних копій, бюджетів, блокувань, автоматичних вимикачів)
- Механізм політики для централізованої оцінки запитів (блокування → бюджет → резервний варіант)
- Запит телеметрії з агрегацією затримок p50/p95/p99
- Ідентифікатор кореляції (X-Request-Id) для наскрізного відстеження
- Журнал аудиту відповідності з відмовою для кожного ключа API
- Eval framework для забезпечення якості LLM
  — Панель інструментів інтерфейсу Resilience зі статусом автоматичного вимикача в режимі реального часу
- Модульні постачальники OAuth (12 окремих модулів у `src/lib/oauth/providers/`)

Основна модель середовища виконання:

- Маршрути додатків Next.js у `src/app/api/*` реалізують як API панелі керування, так і API сумісності
- Спільне ядро SSE/маршрутизації в `src/sse/*` + `open-sse/*` обробляє виконання провайдера, переклад, потокове передавання, відкат і використання## Scope and Boundaries

### In Scope

- Час виконання локального шлюзу
- API керування інформаційною панеллю
- Автентифікація постачальника та оновлення маркера
- Запит на переклад і потокове передавання SSE
  — Локальний стан + постійність використання
  — Додаткова синхронізація з хмарою### Out of Scope

- Реалізація хмарної служби за `NEXT_PUBLIC_CLOUD_URL`
- Площина SLA/контроль постачальника поза локальним процесом
- Самі зовнішні двійкові файли CLI (Claude CLI, Codex CLI тощо)## Dashboard Surface (Current)

Головні сторінки в `src/app/(dashboard)/dashboard/`:

- `/dashboard` — швидкий старт + огляд провайдера
- `/dashboard/endpoint` — проксі кінцевої точки + MCP + A2A + вкладки кінцевої точки API
- `/dashboard/providers` — підключення та облікові дані провайдера
- `/dashboard/combos` — комбіновані стратегії, шаблони, правила маршрутизації моделей
- `/dashboard/costs` — агрегація витрат і видимість цін
- `/dashboard/analytics` — аналітика та оцінка використання
- `/dashboard/limits` — елементи керування квотою/швидкістю
- `/dashboard/cli-tools` — адаптація CLI, визначення часу виконання, створення конфігурації
- `/dashboard/agents` — виявлені агенти ACP + реєстрація спеціального агента
- `/dashboard/media` — майданчик для зображень/відео/музики
- `/dashboard/search-tools` — тестування пошукового провайдера та історія
- `/dashboard/health` — час роботи, автоматичні вимикачі, обмеження швидкості
- `/dashboard/logs` — журнали запитів/проксі/аудиту/консолі
- `/dashboard/settings` — вкладки системних налаштувань (загальні, маршрутизація, комбіновані параметри за замовчуванням тощо)
- `/dashboard/api-manager` — життєвий цикл ключа API та дозволи моделі## High-Level System Context

```mermaid
flowchart LR
    subgraph Clients[Developer Clients]
        C1[Claude Code]
        C2[Codex CLI]
        C3[OpenClaw / Droid / Cline / Continue / Roo]
        C4[Custom OpenAI-compatible clients]
        BROWSER[Browser Dashboard]
    end

    subgraph Router[OmniRoute Local Process]
        API[V1 Compatibility API\n/v1/*]
        DASH[Dashboard + Management API\n/api/*]
        CORE[SSE + Translation Core\nopen-sse + src/sse]
        DB[(storage.sqlite)]
        UDB[(usage tables + log artifacts)]
    end

    subgraph Upstreams[Upstream Providers]
        P1[OAuth Providers\nClaude/Codex/Gemini/Qwen/Qoder/GitHub/Kiro/Cursor/Antigravity]
        P2[API Key Providers\nOpenAI/Anthropic/OpenRouter/GLM/Kimi/MiniMax\nDeepSeek/Groq/xAI/Mistral/Perplexity\nTogether/Fireworks/Cerebras/Cohere/NVIDIA]
        P3[Compatible Nodes\nOpenAI-compatible / Anthropic-compatible]
    end

    subgraph Cloud[Optional Cloud Sync]
        CLOUD[Cloud Sync Endpoint\nNEXT_PUBLIC_CLOUD_URL]
    end

    C1 --> API
    C2 --> API
    C3 --> API
    C4 --> API
    BROWSER --> DASH

    API --> CORE
    DASH --> DB
    CORE --> DB
    CORE --> UDB

    CORE --> P1
    CORE --> P2
    CORE --> P3

    DASH --> CLOUD
```

## Core Runtime Components

## 1) API and Routing Layer (Next.js App Routes)

Основні каталоги:

- `src/app/api/v1/*` і `src/app/api/v1beta/*` для API сумісності
- `src/app/api/*` для API керування/конфігурації
- Далі перезаписує в `next.config.mjs` карту `/v1/*` на `/api/v1/*`

Важливі маршрути сумісності:

- `src/app/api/v1/chat/completions/route.ts`
- `src/app/api/v1/messages/route.ts`
- `src/app/api/v1/responses/route.ts`
- `src/app/api/v1/models/route.ts` — включає власні моделі з `custom: true`
- `src/app/api/v1/embeddings/route.ts` — генерація вбудовування (6 провайдерів)
- `src/app/api/v1/images/generations/route.ts` — генерація зображень (4+ постачальники, включно з Antigravity/Nebius)
- `src/app/api/v1/messages/count_tokens/route.ts`
- `src/app/api/v1/providers/[provider]/chat/completions/route.ts` — спеціальний чат для кожного постачальника
- `src/app/api/v1/providers/[provider]/embeddings/route.ts` — виділені вбудовування для кожного постачальника
- `src/app/api/v1/providers/[provider]/images/generations/route.ts` — виділені зображення для кожного постачальника
- `src/app/api/v1beta/models/route.ts`
- `src/app/api/v1beta/models/[...шлях]/route.ts`

Домени керування:

- Auth/settings: `src/app/api/auth/*`, `src/app/api/settings/*`
- Постачальники/підключення: `src/app/api/providers*`
- Вузли постачальника: `src/app/api/provider-nodes*`
- Спеціальні моделі: `src/app/api/provider-models` (GET/POST/DELETE)
- Каталог моделей: `src/app/api/models/route.ts` (GET)
- Конфігурація проксі: `src/app/api/settings/proxy` (GET/PUT/DELETE) + `src/app/api/settings/proxy/test` (POST)
- OAuth: `src/app/api/oauth/*`
- Ключі/псевдоніми/комбінації/ціни: `src/app/api/keys*`, `src/app/api/models/alias`, `src/app/api/combos*`, `src/app/api/pricing`
- Використання: `src/app/api/usage/*`
- Синхронізація/хмара: `src/app/api/sync/*`, `src/app/api/cloud/*`
- Допоміжні інструменти CLI: `src/app/api/cli-tools/*`
- IP-фільтр: `src/app/api/settings/ip-filter` (GET/PUT)
- Бюджет мислення: `src/app/api/settings/thinking-budget` (GET/PUT)
- Системний запит: `src/app/api/settings/system-prompt` (GET/PUT)
- Сеанси: `src/app/api/sessions` (GET)
- Обмеження швидкості: `src/app/api/rate-limits` (GET)
- Стійкість: `src/app/api/resilience` (GET/PATCH) — профілі постачальників, автоматичний вимикач, граничний стан швидкості
- Скидання стійкості: `src/app/api/resilience/reset` (POST) — скидання вимикачів + час відновлення
- Статистика кешу: `src/app/api/cache/stats` (GET/DELETE)
- Доступність моделі: `src/app/api/models/availability` (GET/POST)
- Телеметрія: `src/app/api/telemetry/summary` (GET)
- Бюджет: `src/app/api/usage/budget` (GET/POST)
- Резервні ланцюжки: `src/app/api/fallback/chains` (GET/POST/DELETE)
- Аудит відповідності: `src/app/api/compliance/audit-log` (GET)
- Оцінки: `src/app/api/evals` (GET/POST), `src/app/api/evals/[suiteId]` (GET)
- Політики: `src/app/api/policies` (GET/POST)## 2) SSE + Translation Core

Основні модулі потоку:

- Запис: `src/sse/handlers/chat.ts`
- Оркестровка ядра: `open-sse/handlers/chatCore.ts`
  — Адаптери виконання постачальника: `open-sse/executors/*`
- Виявлення формату/конфігурація постачальника: `open-sse/services/provider.ts`
- Розбір/вирішення моделі: `src/sse/services/model.ts`, `open-sse/services/model.ts`
- Логіка резервного облікового запису: `open-sse/services/accountFallback.ts`
  — Реєстр перекладів: `open-sse/translator/index.ts`
- Перетворення потоку: `open-sse/utils/stream.ts`, `open-sse/utils/streamHandler.ts`
- Вилучення/нормалізація використання: `open-sse/utils/usageTracking.ts`
  — Парсер тегів Think: `open-sse/utils/thinkTagParser.ts`
- Обробник вбудовування: `open-sse/handlers/embeddings.ts`
- Реєстр постачальника вбудовування: `open-sse/config/embeddingRegistry.ts`
  — Обробник створення зображення: `open-sse/handlers/imageGeneration.ts`
- Реєстр постачальників зображень: `open-sse/config/imageRegistry.ts`
- Очищення відповіді: `open-sse/handlers/responseSanitizer.ts`
  — Нормалізація ролі: `open-sse/services/roleNormalizer.ts`

Послуги (бізнес-логіка):

- Вибір/оцінка облікового запису: `open-sse/services/accountSelector.ts`
- Управління життєвим циклом контексту: `open-sse/services/contextManager.ts`
  — Примусовий IP-фільтр: `open-sse/services/ipFilter.ts`
- Відстеження сесії: `open-sse/services/sessionManager.ts`
- Дедуплікація запиту: `open-sse/services/signatureCache.ts`
- Ін'єкція системної підказки: `open-sse/services/systemPrompt.ts`
- Розумне управління бюджетом: `open-sse/services/thinkingBudget.ts`
- Маршрутизація моделі підстановок: `open-sse/services/wildcardRouter.ts`
  — Керування обмеженнями тарифів: `open-sse/services/rateLimitManager.ts`
- Автоматичний вимикач: `open-sse/services/circuitBreaker.ts`

Модулі доменного рівня:

- Доступність моделі: `src/lib/domain/modelAvailability.ts`
- Правила/бюджети витрат: `src/lib/domain/costRules.ts`
- Резервна політика: `src/lib/domain/fallbackPolicy.ts`
- Комбінований розпізнавач: `src/lib/domain/comboResolver.ts`
- Політика блокування: `src/lib/domain/lockoutPolicy.ts`
- Механізм політики: `src/domain/policyEngine.ts` — централізоване блокування → бюджет → резервна оцінка
- Каталог кодів помилок: `src/lib/domain/errorCodes.ts`
- Ідентифікатор запиту: `src/lib/domain/requestId.ts`
- Час очікування отримання: `src/lib/domain/fetchTimeout.ts`
- Запит телеметрії: `src/lib/domain/requestTelemetry.ts`
- Відповідність/аудит: `src/lib/domain/compliance/index.ts`
- Бігун Eval: `src/lib/domain/evalRunner.ts`
- Постійність стану домену: `src/lib/db/domainState.ts` — SQLite CRUD для резервних ланцюжків, бюджетів, історії витрат, стану блокування, автоматичних вимикачів

Модулі постачальника OAuth (12 окремих файлів у `src/lib/oauth/providers/`):

- Індекс реєстру: `src/lib/oauth/providers/index.ts`
- Окремі постачальники: `claude.ts`, `codex.ts`, `gemini.ts`, `antigravity.ts`, `qoder.ts`, `qwen.ts`, `kimi-coding.ts`, `github.ts`, `kiro.ts`, `cursor.ts`, `kilocode.ts`, `cline.ts`
- Тонка оболонка: `src/lib/oauth/providers.ts` — реекспорт з окремих модулів## 3) Persistence Layer

База даних первинного стану (SQLite):

- Базовий інфра: `src/lib/db/core.ts` (better-sqlite3, міграції, WAL)
  — Реекспорт фасаду: `src/lib/localDb.ts` (тонкий рівень сумісності для абонентів)
- файл: `${DATA_DIR}/storage.sqlite` (або `$XDG_CONFIG_HOME/omniroute/storage.sqlite`, якщо встановлено, інакше `~/.omniroute/storage.sqlite`)
- сутності (таблиці + простори імен KV): providerConnections, providerNodes, modelAliases, combos, apiKeys, settings, pricing,**customModels**,**proxyConfig**,**ipFilter**,**thinkingBudget**,**systemPrompt**

Стійкість використання:

- фасад: `src/lib/usageDb.ts` (розкладені модулі в `src/lib/usage/*`)
- Таблиці SQLite в `storage.sqlite`: `usage_history`, `call_logs`, `proxy_logs`
- необов'язкові артефакти файлів залишаються для сумісності/налагодження (`${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`, `<repo>/logs/...`)
- застарілі файли JSON переносяться до SQLite за допомогою міграції під час запуску, якщо вони присутні

БД стану домену (SQLite):

- `src/lib/db/domainState.ts` — операції CRUD для стану домену
- Таблиці (створені в `src/lib/db/core.ts`): `domain_fallback_chains`, `domain_budgets`, `domain_cost_history`, `domain_lockout_state`, `domain_circuit_breakers`
- Шаблон кешу наскрізного запису: Карти в пам'яті є авторитетними під час виконання; мутації записуються синхронно в SQLite; стан відновлюється з БД при холодному запуску## 4) Auth + Security Surfaces

- Автентифікація файлів cookie інформаційної панелі: `src/proxy.ts`, `src/app/api/auth/login/route.ts`
- Генерація/перевірка ключа API: `src/shared/utils/apiKey.ts`
- Секрети постачальника зберігалися в записах `providerConnections`
- Підтримка вихідного проксі-сервера через `open-sse/utils/proxyFetch.ts` (env vars) і `open-sse/utils/networkProxy.ts` (налаштовується для кожного постачальника або глобально)## 5) Cloud Sync

- Ініціалізація планувальника: `src/lib/initCloudSync.ts`, `src/shared/services/initializeCloudSync.ts`, `src/shared/services/modelSyncScheduler.ts`
- Періодичне завдання: `src/shared/services/cloudSyncScheduler.ts`
- Періодичне завдання: `src/shared/services/modelSyncScheduler.ts`
- Контрольний маршрут: `src/app/api/sync/cloud/route.ts`## Request Lifecycle (`/v1/chat/completions`)

```mermaid
sequenceDiagram
    autonumber
    participant Client as CLI/SDK Client
    participant Route as /api/v1/chat/completions
    participant Chat as src/sse/handlers/chat
    participant Core as open-sse/handlers/chatCore
    participant Model as Model Resolver
    participant Auth as Credential Selector
    participant Exec as Provider Executor
    participant Prov as Upstream Provider
    participant Stream as Stream Translator
    participant Usage as usageDb

    Client->>Route: POST /v1/chat/completions
    Route->>Chat: handleChat(request)
    Chat->>Model: parse/resolve model or combo

    alt Combo model
        Chat->>Chat: iterate combo models (handleComboChat)
    end

    Chat->>Auth: getProviderCredentials(provider)
    Auth-->>Chat: active account + tokens/api key

    Chat->>Core: handleChatCore(body, modelInfo, credentials)
    Core->>Core: detect source format
    Core->>Core: translate request to target format
    Core->>Exec: execute(provider, transformedBody)
    Exec->>Prov: upstream API call
    Prov-->>Exec: SSE/JSON response
    Exec-->>Core: response + metadata

    alt 401/403
        Core->>Exec: refreshCredentials()
        Exec-->>Core: updated tokens
        Core->>Exec: retry request
    end

    Core->>Stream: translate/normalize stream to client format
    Stream-->>Client: SSE chunks / JSON response

    Stream->>Usage: extract usage + persist history/log
```

## Combo + Account Fallback Flow

```mermaid
flowchart TD
    A[Incoming model string] --> B{Is combo name?}
    B -- Yes --> C[Load combo models sequence]
    B -- No --> D[Single model path]

    C --> E[Try model N]
    E --> F[Resolve provider/model]
    D --> F

    F --> G[Select account credentials]
    G --> H{Credentials available?}
    H -- No --> I[Return provider unavailable]
    H -- Yes --> J[Execute request]

    J --> K{Success?}
    K -- Yes --> L[Return response]
    K -- No --> M{Fallback-eligible error?}

    M -- No --> N[Return error]
    M -- Yes --> O[Mark account unavailable cooldown]
    O --> P{Another account for provider?}
    P -- Yes --> G
    P -- No --> Q{In combo with next model?}
    Q -- Yes --> E
    Q -- No --> R[Return all unavailable]
```

Запасні рішення приймаються open-sse/services/accountFallback.ts за допомогою кодів стану та евристики повідомлень про помилки. Комбінована маршрутизація додає один додатковий захист: 400-і з областю постачальника, такі як помилки блокування вмісту вгорі та перевірки ролі, розглядаються як локальні помилки моделі, тому пізніші комбіновані цілі все ще можуть працювати.## OAuth Onboarding and Token Refresh Lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant UI as Dashboard UI
    participant OAuth as /api/oauth/[provider]/[action]
    participant ProvAuth as Provider Auth Server
    participant DB as localDb
    participant Test as /api/providers/[id]/test
    participant Exec as Provider Executor

    UI->>OAuth: GET authorize or device-code
    OAuth->>ProvAuth: create auth/device flow
    ProvAuth-->>OAuth: auth URL or device code payload
    OAuth-->>UI: flow data

    UI->>OAuth: POST exchange or poll
    OAuth->>ProvAuth: token exchange/poll
    ProvAuth-->>OAuth: access/refresh tokens
    OAuth->>DB: createProviderConnection(oauth data)
    OAuth-->>UI: success + connection id

    UI->>Test: POST /api/providers/[id]/test
    Test->>Exec: validate credentials / optional refresh
    Exec-->>Test: valid or refreshed token info
    Test->>DB: update status/tokens/errors
    Test-->>UI: validation result
```

Оновлення під час живого трафіку виконується всередині `open-sse/handlers/chatCore.ts` за допомогою виконавця `refreshCredentials()`.## Cloud Sync Lifecycle (Enable / Sync / Disable)

```mermaid
sequenceDiagram
    autonumber
    participant UI as Endpoint Page UI
    participant Sync as /api/sync/cloud
    participant DB as localDb
    participant Cloud as External Cloud Sync
    participant Claude as ~/.claude/settings.json

    UI->>Sync: POST action=enable
    Sync->>DB: set cloudEnabled=true
    Sync->>DB: ensure API key exists
    Sync->>Cloud: POST /sync/{machineId} (providers/aliases/combos/keys)
    Cloud-->>Sync: sync result
    Sync->>Cloud: GET /{machineId}/v1/verify
    Sync-->>UI: enabled + verification status

    UI->>Sync: POST action=sync
    Sync->>Cloud: POST /sync/{machineId}
    Cloud-->>Sync: remote data
    Sync->>DB: update newer local tokens/status
    Sync-->>UI: synced

    UI->>Sync: POST action=disable
    Sync->>DB: set cloudEnabled=false
    Sync->>Cloud: DELETE /sync/{machineId}
    Sync->>Claude: switch ANTHROPIC_BASE_URL back to local (if needed)
    Sync-->>UI: disabled
```

Періодичну синхронізацію запускає `CloudSyncScheduler`, коли хмару ввімкнено.## Data Model and Storage Map

```mermaid
erDiagram
    SETTINGS ||--o{ PROVIDER_CONNECTION : controls
    PROVIDER_NODE ||--o{ PROVIDER_CONNECTION : backs_compatible_provider
    PROVIDER_CONNECTION ||--o{ USAGE_ENTRY : emits_usage

    SETTINGS {
      boolean cloudEnabled
      number stickyRoundRobinLimit
      boolean requireLogin
      string password_hash
      string fallbackStrategy
      json rateLimitDefaults
      json providerProfiles
    }

    PROVIDER_CONNECTION {
      string id
      string provider
      string authType
      string name
      number priority
      boolean isActive
      string apiKey
      string accessToken
      string refreshToken
      string expiresAt
      string testStatus
      string lastError
      string rateLimitedUntil
      json providerSpecificData
    }

    PROVIDER_NODE {
      string id
      string type
      string name
      string prefix
      string apiType
      string baseUrl
    }

    MODEL_ALIAS {
      string alias
      string targetModel
    }

    COMBO {
      string id
      string name
      string[] models
    }

    API_KEY {
      string id
      string name
      string key
      string machineId
    }

    USAGE_ENTRY {
      string provider
      string model
      number prompt_tokens
      number completion_tokens
      string connectionId
      string timestamp
    }

    CUSTOM_MODEL {
      string id
      string name
      string providerId
    }

    PROXY_CONFIG {
      string global
      json providers
    }

    IP_FILTER {
      string mode
      string[] allowlist
      string[] blocklist
    }

    THINKING_BUDGET {
      string mode
      number customBudget
      string effortLevel
    }

    SYSTEM_PROMPT {
      boolean enabled
      string prompt
      string position
    }
```

Файли фізичного зберігання:

- основна база даних середовища виконання: `${DATA_DIR}/storage.sqlite`
- рядки журналу запитів: `${DATA_DIR}/log.txt` (компатія/налагодження артефакту)
- структуровані архіви корисного навантаження викликів: `${DATA_DIR}/call_logs/`
- додатковий перекладач/сеанси налагодження запитів: `<repo>/logs/...`## Deployment Topology

```mermaid
flowchart LR
    subgraph LocalHost[Developer Host]
        CLI[CLI Tools]
        Browser[Dashboard Browser]
    end

    subgraph ContainerOrProcess[OmniRoute Runtime]
        Next[Next.js Server\nPORT=20128]
        Core[SSE Core + Executors]
        MainDB[(storage.sqlite)]
        UsageDB[(usage tables + log artifacts)]
    end

    subgraph External[External Services]
        Providers[AI Providers]
        SyncCloud[Cloud Sync Service]
    end

    CLI --> Next
    Browser --> Next
    Next --> Core
    Next --> MainDB
    Core --> MainDB
    Core --> UsageDB
    Core --> Providers
    Next --> SyncCloud
```

## Module Mapping (Decision-Critical)

### Route and API Modules

- `src/app/api/v1/*`, `src/app/api/v1beta/*`: API сумісності
- `src/app/api/v1/providers/[provider]/*`: виділені маршрути для кожного постачальника (чат, вбудовування, зображення)
- `src/app/api/providers*`: CRUD провайдера, перевірка, тестування
- `src/app/api/provider-nodes*`: настроюване керування сумісним вузлом
- `src/app/api/provider-models`: керування власною моделлю (CRUD)
- `src/app/api/models/route.ts`: API каталогу моделей (псевдоніми + спеціальні моделі)
- `src/app/api/oauth/*`: потоки OAuth/код пристрою
- `src/app/api/keys*`: життєвий цикл локального ключа API
- `src/app/api/models/alias`: керування псевдонімами
- `src/app/api/combos*`: резервне керування комбо
- `src/app/api/pricing`: заміна ціноутворення для розрахунку вартості
- `src/app/api/settings/proxy`: налаштування проксі (GET/PUT/DELETE)
- `src/app/api/settings/proxy/test`: перевірка підключення вихідного проксі (POST)
- `src/app/api/usage/*`: API використання та журналів
- `src/app/api/sync/*` + `src/app/api/cloud/*`: хмарна синхронізація та помічники, спрямовані на хмару
- `src/app/api/cli-tools/*`: локальні автори/перевірки налаштувань CLI
- `src/app/api/settings/ip-filter`: список дозволених/чорних IP-адрес (GET/PUT)
- `src/app/api/settings/thinking-budget`: конфігурація бюджету маркера мислення (GET/PUT)
- `src/app/api/settings/system-prompt`: глобальне системне підказка (GET/PUT)
- `src/app/api/sessions`: список активних сеансів (GET)
- `src/app/api/rate-limits`: стан обмеження ставки для кожного облікового запису (GET)### Routing and Execution Core

- `src/sse/handlers/chat.ts`: розбір запитів, комбо-обробка, цикл вибору облікового запису
- `open-sse/handlers/chatCore.ts`: переклад, розсилка виконавця, обробка повторів/оновлень, налаштування потоку
- `open-sse/executors/*`: залежна від провайдера мережа та поведінка формату### Translation Registry and Format Converters

- `open-sse/translator/index.ts`: реєстр перекладачів та оркестровка
- Перекладач запитів: `open-sse/translator/request/*`
- Транслятори відповідей: `open-sse/translator/response/*`
- Константи формату: `open-sse/translator/formats.ts`### Persistence

- `src/lib/db/*`: постійна конфігурація/стан і збереження домену на SQLite
- `src/lib/localDb.ts`: реекспорт сумісності для модулів БД
- `src/lib/usageDb.ts`: фасад історії використання/журналів викликів поверх таблиць SQLite## Provider Executor Coverage (Strategy Pattern)

Кожен провайдер має спеціалізований виконавець, що розширює `BaseExecutor` (у `open-sse/executors/base.ts`), який забезпечує побудову URL-адреси, побудову заголовка, повторну спробу з експоненційною відстрочкою, перехоплювачі оновлення облікових даних і метод оркестровки `execute()`.

| Виконавець                    | Постачальник(и)                                                                                                                                              | Спеціальна обробка                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `Виконавець за замовчуванням` | OpenAI, Claude, Gemini, Qwen, Qoder, OpenRouter, GLM, Kimi, MiniMax, DeepSeek, Groq, xAI, Mistral, Perplexity, Together, Fireworks, Cerebras, Cohere, NVIDIA | Конфігурація динамічної URL-адреси/заголовка для кожного постачальника        |
| `AntgravityExecutor`          | Антигравітація Google                                                                                                                                        | Ідентифікатори користувацьких проектів/сеансів, повторна спроба після аналізу |
| `CodexExecutor`               | OpenAI Codex                                                                                                                                                 | Впроваджує системні інструкції, змушує міркувати                              |
| `CursorExecutor`              | Курсор IDE                                                                                                                                                   | Протокол ConnectRPC, кодування Protobuf, підпис запиту через контрольну суму  |
| `GithubExecutor`              | Копілот GitHub                                                                                                                                               | Оновлення маркера Copilot, заголовки, що імітують VSCode                      |
| `KiroExecutor`                | AWS CodeWhisperer/Kiro                                                                                                                                       | Двійковий формат AWS EventStream → Перетворення SSE                           |
| `GeminiCLIExecutor`           | Gemini CLI                                                                                                                                                   | Цикл оновлення маркера Google OAuth                                           |

Усі інші постачальники (включно з настроюваними сумісними вузлами) використовують `DefaultExecutor`.## Provider Compatibility Matrix

| Постачальник     | Формат           | Авторизація            | Потік            | Непотоковий | Токен Оновити | Використання API          |
| ---------------- | ---------------- | ---------------------- | ---------------- | ----------- | ------------- | ------------------------- | ------------------------------ |
| Клод             | Клод             | Ключ API / OAuth       | ✅               | ✅          | ✅            | ⚠️ Лише адміністратор     |
| Близнюки         | близнюки         | Ключ API / OAuth       | ✅               | ✅          | ✅            | ⚠️ Хмарна консоль         |
| Gemini CLI       | gemini-cli       | OAuth                  | ✅               | ✅          | ✅            | ⚠️ Хмарна консоль         |
| Антигравітація   | антигравітація   | OAuth                  | ✅               | ✅          | ✅            | ✅ Повна квота API        |
| OpenAI           | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| Кодекс           | openai-відповіді | OAuth                  | ✅ примусовий    | ❌          | ✅            | ✅ Обмеження тарифів      |
| Копілот GitHub   | openai           | OAuth + Copilot Token  | ✅               | ✅          | ✅            | ✅ Знімки квот            |
| Курсор           | курсор           | Власна контрольна сума | ✅               | ✅          | ❌            | ❌                        |
| Кіро             | kiro             | AWS SSO OIDC           | ✅ (EventStream) | ❌          | ✅            | ✅ Обмеження використання |
| Квен             | openai           | OAuth                  | ✅               | ✅          | ✅            | ⚠️ За запитом             |
| Qoder            | openai           | OAuth (базовий)        | ✅               | ✅          | ✅            | ⚠️ За запитом             |
| OpenRouter       | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| GLM/Kimi/MiniMax | Клод             | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| DeepSeek         | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| Groq             | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| xAI (Грок)       | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| Містраль         | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| Розгубленість    | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| Разом AI         | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| Феєрверк AI      | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| Головний мозок   | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| Cohere           | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        |
| NVIDIA NIM       | openai           | Ключ API               | ✅               | ✅          | ❌            | ❌                        | ## Format Translation Coverage |

Виявлені вихідні формати включають:

- `опенай`
- `openai-відповіді`
- "клод".
- "близнюки".

Цільові формати включають:

- Чат/Відповіді OpenAI
- Клод
- Gemini/Gemini-CLI/Антигравітаційна оболонка
- Кіро
- Курсор

Для перекладу використовується**OpenAI як центральний формат**— усі перетворення проходять через OpenAI як проміжний:```
Source Format → OpenAI (hub) → Target Format

````

Переклади вибираються динамічно на основі форми вихідного корисного навантаження та цільового формату постачальника.

Додаткові рівні обробки в конвеєрі перекладу:

-**Дезінфікація відповідей**— видаляє нестандартні поля з відповідей у форматі OpenAI (як потокових, так і не потокових), щоб забезпечити сувору відповідність SDK
-**Нормалізація ролі**— перетворює `розробник` в `систему` для цілей, що не належать до OpenAI; об’єднує `system` → `user` для моделей, які відхиляють системну роль (GLM, ERNIE)
-**Вилучення тегів мислення**— аналізує блоки `<think>...</think>` із вмісту в поле `reasoning_content`
-**Структурований вихід**— перетворює OpenAI `response_format.json_schema` на `responseMimeType` + `responseSchema` Gemini## Supported API Endpoints

| Кінцева точка | Формат | Обробник |
| -------------------------------------------------- | ------------------ | ------------------------------------------------------------------ |
| `POST /v1/chat/completions` | Чат OpenAI | `src/sse/handlers/chat.ts` |
| `POST /v1/messages` | Повідомлення Клода | Той самий обробник (визначено автоматично) |
| `POST /v1/responses` | Відповіді OpenAI | `open-sse/handlers/responsesHandler.ts` |
| `POST /v1/embeddings` | Вбудовування OpenAI | `open-sse/handlers/embeddings.ts` |
| `GET /v1/embeddings` | Список моделей | Маршрут API |
| `POST /v1/images/generations` | Зображення OpenAI | `open-sse/handlers/imageGeneration.ts` |
| `GET /v1/images/generations` | Список моделей | Маршрут API |
| `POST /v1/providers/{provider}/chat/completions` | Чат OpenAI | Виділено для кожного постачальника з перевіркою моделі |
| `POST /v1/providers/{provider}/embeddings` | Вбудовування OpenAI | Виділено для кожного постачальника з перевіркою моделі |
| `POST /v1/providers/{provider}/images/generations` | Зображення OpenAI | Виділено для кожного постачальника з перевіркою моделі |
| `POST /v1/messages/count_tokens` | Клод Токен Підрахунок | Маршрут API |
| `GET /v1/models` | Список моделей OpenAI | Маршрут API (чат + вбудовування + зображення + спеціальні моделі) |
| `GET /api/models/catalog` | Каталог | Усі моделі згруповані за постачальником + тип |
| `POST /v1beta/models/*:streamGenerateContent` | Близнюки рідні | Маршрут API |
| `GET/PUT/DELETE /api/settings/proxy` | Конфігурація проксі | Налаштування мережевого проксі |
| `POST /api/settings/proxy/test` | З'єднання проксі | Кінцева точка перевірки справності/з’єднання проксі |
| `GET/POST/DELETE /api/provider-models` | Моделі постачальників | Метадані моделі постачальника, що підтримують спеціальні та керовані доступні моделі |## Bypass Handler

Обхідний обробник (`open-sse/utils/bypassHandler.ts`) перехоплює відомі "викидні" запити від Claude CLI — пінг розігріву, вилучення заголовків і підрахунок токенів — і повертає**фальшиву відповідь**, не споживаючи токени постачальника вгору. Це спрацьовує лише тоді, коли `User-Agent` містить `claude-cli`.## Request Logger Pipeline

Реєстратор запитів (`open-sse/utils/requestLogger.ts`) забезпечує 7-етапний конвеєр журналювання налагодження, вимкнений за замовчуванням, увімкнений за допомогою `ENABLE_REQUEST_LOGS=true`:```
1_req_client.json → 2_req_source.json → 3_req_openai.json → 4_req_target.json
→ 5_res_provider.txt → 6_res_openai.txt → 7_res_client.txt
````

Файли записуються в <repo>/logs/<session>/` для кожного сеансу запиту.## Failure Modes and Resilience

## 1) Account/Provider Availability

- час відновлення облікового запису постачальника через тимчасові помилки/помилки швидкості/автентифікації
- резервний обліковий запис перед невдалим запитом
- резервна комбінована модель, коли поточний шлях моделі/постачальника вичерпано## 2) Token Expiry

- попередня перевірка та оновлення з повторною спробою для оновлюваних постачальників
- Повторна спроба 401/403 після спроби оновлення в основному шляху## 3) Stream Safety

- контролер потоку з відключенням
- потік перекладу зі змивом наприкінці потоку та обробкою `[DONE]`
- резервна оцінка використання, якщо метадані використання постачальника відсутні## 4) Cloud Sync Degradation

- виникають помилки синхронізації, але локальне виконання продовжується
- планувальник має логіку повторної спроби, але періодичне виконання наразі викликає синхронізацію з одноразовою спробою за замовчуванням## 5) Data Integrity

— Міграції схем SQLite та автооновлення під час запуску

- застарілий JSON → шлях сумісності міграції SQLite## Observability and Operational Signals

Джерела видимості під час виконання:

- журнали консолі з `src/sse/utils/logger.ts`
- агрегати використання за запитом у SQLite (`usage_history`, `call_logs`, `proxy_logs`)
- чотириетапний детальний запис корисного навантаження в SQLite (`request_detail_logs`), коли `settings.detailed_logs_enabled=true`
- текстовий журнал статусу запиту в `log.txt` (опціонально/compat)
- необов'язкові глибокі журнали запитів/перекладів у `logs/`, коли `ENABLE_REQUEST_LOGS=true`
- кінцеві точки використання інформаційної панелі (`/api/usage/*`) для використання інтерфейсу користувача

Детальне захоплення корисного навантаження запиту зберігає до чотирьох етапів корисного навантаження JSON на маршрутизований виклик:

- необроблений запит, отриманий від клієнта
- перекладений запит, фактично надісланий вгору
- відповідь провайдера, реконструйована як JSON; потокові відповіді стискаються до остаточного підсумку та метаданих потоку
- остаточна відповідь клієнта, яку повертає OmniRoute; потокові відповіді зберігаються в тій самій компактній формі підсумку## Security-Sensitive Boundaries

- Секрет JWT (`JWT_SECRET`) захищає перевірку/підпис файлів cookie сеансу інструментальної панелі
- Початковий пароль початкового завантаження (`INITIAL_PASSWORD`) має бути явно налаштований для першого запуску.
- Ключ API HMAC Secret (`API_KEY_SECRET`) захищає згенерований локальний формат ключа API
- Секрети постачальника (ключі/токени API) зберігаються в локальній БД і повинні бути захищені на рівні файлової системи
- Кінцеві точки хмарної синхронізації покладаються на автентику ключа API + семантику ідентифікатора машини## Environment and Runtime Matrix

Змінні середовища, які активно використовуються кодом:

- Додаток/автентифікація: `JWT_SECRET`, `INITIAL_PASSWORD`
- Зберігання: `DATA_DIR`
- Сумісна поведінка вузла: `ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE`
- Перевизначення додаткової бази зберігання (Linux/macOS, коли `DATA_DIR` не встановлено): `XDG_CONFIG_HOME`
- Хешування безпеки: `API_KEY_SECRET`, `MACHINE_ID_SALT`
- Ведення журналу: `ENABLE_REQUEST_LOGS`
- URL-адреси синхронізації/хмари: `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_CLOUD_URL`
- Вихідний проксі: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` і варіанти в нижньому регістрі
- Позначки функції SOCKS5: `ENABLE_SOCKS5_PROXY`, `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY`
- Допоміжні засоби платформи/виконання (не для конкретної програми): `APPDATA`, `NODE_ENV`, `PORT`, `HOSTNAME`## Known Architectural Notes

1. `usageDb` і `localDb` спільно використовують ту саму базову політику каталогу (`DATA_DIR` -> `XDG_CONFIG_HOME/omniroute` -> `~/.omniroute`) із міграцією старих файлів.
2. `/api/v1/route.ts` делегує той самий уніфікований конструктор каталогу, що використовується `/api/v1/models` (`src/app/api/v1/models/catalog.ts`), щоб уникнути семантичного дрейфу.
3. Реєстратор запитів записує повні заголовки/тіло, якщо ввімкнено; вважати каталог журналу конфіденційним.
4. Поведінка хмари залежить від правильності `NEXT_PUBLIC_BASE_URL` і доступності кінцевої точки хмари.
5. Каталог `open-sse/` публікується як `@omniroute/open-sse`**пакет робочої області npm**. Вихідний код імпортує його через `@omniroute/open-sse/...` (вирішено Next.js `transpilePackages`). Шляхи до файлів у цьому документі все ще використовують назву каталогу `open-sse/` для узгодженості.
6. Діаграми на інформаційній панелі використовують**Recharts**(на основі SVG) для доступної інтерактивної візуалізації аналітики (гістограми використання моделі, таблиці розбивки постачальників із показниками успіху).
7. Тести E2E використовують**Playwright**(`tests/e2e/`), запускають через `npm run test:e2e`. У модульних тестах використовується**Node.js тест-виконавець**(`tests/unit/`), запущений через `npm run test:unit`. Вихідним кодом у `src/` є**TypeScript**(`.ts`/`.tsx`); робоча область `open-sse/` залишається JavaScript (`.js`).
8. Сторінка налаштувань організована на 5 вкладках: Безпека, Маршрутизація (6 глобальних стратегій: спочатку заповнює, циклічна, p2c, випадкова, найменш використовувана, оптимізована за витратами), Стійкість (редаговані обмеження швидкості, автоматичний вимикач, політики), ШІ (бюджет мислення, системна підказка, кеш підказок), Додатково (проксі).## Operational Verification Checklist

- Збірка з джерела: `npm run build`
  — Зображення Docker: `docker build -t omniroute .`
- Запустіть службу та перевірте:
- `GET /api/settings`
- `GET /api/v1/models`
- Цільова базова URL-адреса CLI має бути `http://<host>:20128/v1`, коли `PORT=20128`
