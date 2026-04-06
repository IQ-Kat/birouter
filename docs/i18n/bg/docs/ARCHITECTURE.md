# OmniRoute Architecture (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/ARCHITECTURE.md) · 🇪🇸 [es](../../es/docs/ARCHITECTURE.md) · 🇫🇷 [fr](../../fr/docs/ARCHITECTURE.md) · 🇩🇪 [de](../../de/docs/ARCHITECTURE.md) · 🇮🇹 [it](../../it/docs/ARCHITECTURE.md) · 🇷🇺 [ru](../../ru/docs/ARCHITECTURE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/ARCHITECTURE.md) · 🇯🇵 [ja](../../ja/docs/ARCHITECTURE.md) · 🇰🇷 [ko](../../ko/docs/ARCHITECTURE.md) · 🇸🇦 [ar](../../ar/docs/ARCHITECTURE.md) · 🇮🇳 [hi](../../hi/docs/ARCHITECTURE.md) · 🇮🇳 [in](../../in/docs/ARCHITECTURE.md) · 🇹🇭 [th](../../th/docs/ARCHITECTURE.md) · 🇻🇳 [vi](../../vi/docs/ARCHITECTURE.md) · 🇮🇩 [id](../../id/docs/ARCHITECTURE.md) · 🇲🇾 [ms](../../ms/docs/ARCHITECTURE.md) · 🇳🇱 [nl](../../nl/docs/ARCHITECTURE.md) · 🇵🇱 [pl](../../pl/docs/ARCHITECTURE.md) · 🇸🇪 [sv](../../sv/docs/ARCHITECTURE.md) · 🇳🇴 [no](../../no/docs/ARCHITECTURE.md) · 🇩🇰 [da](../../da/docs/ARCHITECTURE.md) · 🇫🇮 [fi](../../fi/docs/ARCHITECTURE.md) · 🇵🇹 [pt](../../pt/docs/ARCHITECTURE.md) · 🇷🇴 [ro](../../ro/docs/ARCHITECTURE.md) · 🇭🇺 [hu](../../hu/docs/ARCHITECTURE.md) · 🇧🇬 [bg](../../bg/docs/ARCHITECTURE.md) · 🇸🇰 [sk](../../sk/docs/ARCHITECTURE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/ARCHITECTURE.md) · 🇮🇱 [he](../../he/docs/ARCHITECTURE.md) · 🇵🇭 [phi](../../phi/docs/ARCHITECTURE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/ARCHITECTURE.md) · 🇨🇿 [cs](../../cs/docs/ARCHITECTURE.md) · 🇹🇷 [tr](../../tr/docs/ARCHITECTURE.md)

---

_Последна актуализация: 2026-03-28_## Executive Summary

OmniRoute е локален AI маршрутизиращ шлюз и табло за управление, изградено на Next.js.
Той осигурява единична OpenAI-съвместима крайна точка (`/v1/*`) и маршрутизира трафик през множество доставчици нагоре по веригата с превод, резервен вариант, опресняване на токени и проследяване на използването.

Основни възможности:

- OpenAI-съвместима API повърхност за CLI/инструменти (28 доставчици)
- Превод на заявка/отговор във форматите на доставчика
- Резервна комбинация от модели (последователност от няколко модела)
- Резервен вариант на ниво акаунт (мулти акаунт на доставчик)
- OAuth + API-ключ управление на връзката на доставчика
- Генериране на вграждане чрез `/v1/embeddings` (6 доставчика, 9 модела)
- Генериране на изображения чрез `/v1/images/generations` (4 доставчика, 9 модела)
- Синтактичен анализ на таг за мислене (`<think>...</think>`) за разсъждаващи модели
- Дезинфекция на отговора за стриктна съвместимост с OpenAI SDK
- Нормализиране на ролята (разработчик→система, система→потребител) за съвместимост между доставчици
- Структурирано преобразуване на изход (json_schema → Gemini responseSchema)
- Локална устойчивост за доставчици, ключове, псевдоними, комбинации, настройки, ценообразуване
- Проследяване на използване/разходи и регистриране на заявки
- Допълнителна облачна синхронизация за синхронизиране на множество устройства/състояние
- Списък с разрешени/блокирани IP адреси за контрол на достъпа до API
- Мислещо управление на бюджета (преминаване/автоматично/персонализирано/адаптивно)
- Бързо инжектиране на глобалната система
- Проследяване на сесии и пръстови отпечатъци
- Подобрено ограничаване на скоростта за всеки акаунт със специфични за доставчика профили
- Модел на прекъсвача за устойчивост на доставчика
- Анти-гръмотевична стадна защита с mutex заключване
- Кеш за дедупликация на заявки, базиран на подпис
- Слой на домейна: наличност на модела, правила за разходите, резервна политика, политика за блокиране
- Устойчивост на състоянието на домейна (кеш за запис на SQLite за резервни варианти, бюджети, блокировки, прекъсвачи на верига)
- Механизъм за правила за централизирана оценка на заявката (заключване → бюджет → резервен)
- Заявка за телеметрия с p50/p95/p99 агрегиране на латентност
- ID на корелация (X-Request-Id) за проследяване от край до край
- Регистриране на одит за съответствие с отказ за всеки API ключ
- Eval framework за осигуряване на качеството на LLM
- Resilience UI табло със статус на прекъсвача в реално време
- Модулни OAuth доставчици (12 отделни модула под `src/lib/oauth/providers/`)

Основен модел на изпълнение:

- Маршрутите на приложението Next.js под `src/app/api/*` внедряват както API на таблото, така и API за съвместимост
- Споделено SSE/маршрутизиращо ядро в `src/sse/*` + `open-sse/*` обработва изпълнението на доставчика, превода, стрийминг, резервен вариант и използване## Scope and Boundaries

### In Scope

- Време за изпълнение на локален шлюз
- API за управление на таблото
- Удостоверяване на доставчика и опресняване на токена
- Заявка за превод и SSE стрийминг
- Локално състояние + постоянство на използване
- Допълнителна синхронизация в облака### Out of Scope

- Внедряване на облачна услуга зад `NEXT_PUBLIC_CLOUD_URL`
- SLA/контролна равнина на доставчика извън локалния процес
- Самите външни CLI двоични файлове (Claude CLI, Codex CLI и т.н.)## Dashboard Surface (Current)

Главни страници под `src/app/(dashboard)/dashboard/`:

- `/dashboard` — бърз старт + преглед на доставчика
- `/dashboard/endpoint` — крайна точка прокси + MCP + A2A + раздели за крайна точка на API
- `/dashboard/providers` — връзки и идентификационни данни на доставчика
- `/dashboard/combos` — комбинирани стратегии, шаблони, правила за маршрутизиране на модели
- `/dashboard/costs` — агрегиране на разходите и видимост на цените
- `/dashboard/analytics` — анализи и оценки на използването
- `/dashboard/limits` — контроли на квоти/ставки
- `/dashboard/cli-tools` — CLI включване, откриване по време на изпълнение, генериране на конфигурация
- `/dashboard/agents` — открити ACP агенти + потребителска регистрация на агент
- `/dashboard/media` — игрище за изображения/видео/музика
- `/dashboard/search-tools` — тестване и история на доставчика на търсене
- `/dashboard/health` — време на работа, прекъсвачи, ограничения на скоростта
- `/dashboard/logs` — регистрационни файлове на заявка/прокси/одит/конзола
- `/dashboard/settings` — раздели за системни настройки (общи, маршрутизиране, комбинирани настройки по подразбиране и т.н.)
- `/dashboard/api-manager` — жизнен цикъл на API ключ и разрешения за модел## High-Level System Context

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

Основни директории:

- `src/app/api/v1/*` и `src/app/api/v1beta/*` за API за съвместимост
- `src/app/api/*` за API за управление/конфигуриране
- Следващото пренаписване в `next.config.mjs` преобразува `/v1/*` в `/api/v1/*`

Важни пътища за съвместимост:

- `src/app/api/v1/chat/completions/route.ts`
- `src/app/api/v1/messages/route.ts`
- `src/app/api/v1/responses/route.ts`
- `src/app/api/v1/models/route.ts` — включва потребителски модели с `custom: true`
- `src/app/api/v1/embeddings/route.ts` — генериране на вграждане (6 доставчика)
- `src/app/api/v1/images/generations/route.ts` — генериране на изображения (4+ доставчици, включително Antigravity/Nebius)
- `src/app/api/v1/messages/count_tokens/route.ts`
- `src/app/api/v1/providers/[provider]/chat/completions/route.ts` — специален чат за всеки доставчик
- `src/app/api/v1/providers/[provider]/embeddings/route.ts` — специални вграждания за всеки доставчик
- `src/app/api/v1/providers/[provider]/images/generations/route.ts` — специални изображения за всеки доставчик
- `src/app/api/v1beta/models/route.ts`
- `src/app/api/v1beta/models/[...path]/route.ts`

Домейни за управление:

- Удостоверяване/настройки: `src/app/api/auth/*`, `src/app/api/settings/*`
- Доставчици/връзки: `src/app/api/providers*`
- Възли на доставчик: `src/app/api/provider-nodes*`
- Персонализирани модели: `src/app/api/provider-models` (GET/POST/DELETE)
- Каталог с модели: `src/app/api/models/route.ts` (GET)
- Прокси конфигурация: `src/app/api/settings/proxy` (GET/PUT/DELETE) + `src/app/api/settings/proxy/test` (POST)
- OAuth: `src/app/api/oauth/*`
- Ключове/псевдоними/комбота/цени: `src/app/api/keys*`, `src/app/api/models/alias`, `src/app/api/combos*`, `src/app/api/pricing`
- Използване: `src/app/api/usage/*`
- Синхронизиране/облак: `src/app/api/sync/*`, `src/app/api/cloud/*`
- Помощни инструменти за CLI: `src/app/api/cli-tools/*`
- IP филтър: `src/app/api/settings/ip-filter` (GET/PUT)
- Мислен бюджет: `src/app/api/settings/thinking-budget` (GET/PUT)
- Системна подкана: `src/app/api/settings/system-prompt` (GET/PUT)
- Сесии: `src/app/api/sessions` (GET)
- Ограничения на скоростта: `src/app/api/rate-limits` (GET)
- Устойчивост: `src/app/api/resilience` (GET/PATCH) — профили на доставчика, прекъсвач, състояние на ограничение на скоростта
- Нулиране на устойчивостта: `src/app/api/resilience/reset` (POST) — прекъсвачи за нулиране + охлаждане
- Кеш статистики: `src/app/api/cache/stats` (GET/DELETE)
- Наличност на модела: `src/app/api/models/availability` (GET/POST)
- Телеметрия: `src/app/api/telemetry/summary` (GET)
- Бюджет: `src/app/api/usage/budget` (GET/POST)
- Резервни вериги: `src/app/api/fallback/chains` (GET/POST/DELETE)
- Одит на съответствието: `src/app/api/compliance/audit-log` (GET)
- Evals: `src/app/api/evals` (GET/POST), `src/app/api/evals/[suiteId]` (GET)
- Правила: `src/app/api/policies` (GET/POST)## 2) SSE + Translation Core

Основни модули на потока:

- Запис: `src/sse/handlers/chat.ts`
- Оркестрация на ядрото: `open-sse/handlers/chatCore.ts`
- Адаптери за изпълнение на доставчик: `open-sse/executors/*`
- Откриване на формат/конфигурация на доставчик: `open-sse/services/provider.ts`
- Разбор/разрешаване на модела: `src/sse/services/model.ts`, `open-sse/services/model.ts`
- Логика за резервен акаунт: `open-sse/services/accountFallback.ts`
- Регистър на преводите: `open-sse/translator/index.ts`
- Трансформации на потока: `open-sse/utils/stream.ts`, `open-sse/utils/streamHandler.ts`
- Извличане/нормализиране на използването: `open-sse/utils/usageTracking.ts`
- Анализатор на мислен етикет: `open-sse/utils/thinkTagParser.ts`
- Манипулатор за вграждане: `open-sse/handlers/embeddings.ts`
- Регистър на доставчика на вграждане: `open-sse/config/embeddingRegistry.ts`
- Манипулатор за генериране на изображения: `open-sse/handlers/imageGeneration.ts`
- Регистър на доставчика на изображения: `open-sse/config/imageRegistry.ts`
- Дезинфекция на отговора: `open-sse/handlers/responseSanitizer.ts`
- Нормализация на ролята: `open-sse/services/roleNormalizer.ts`

Услуги (бизнес логика):

- Избор/точкуване на акаунт: `open-sse/services/accountSelector.ts`
- Управление на жизнения цикъл на контекста: `open-sse/services/contextManager.ts`
- Налагане на IP филтър: `open-sse/services/ipFilter.ts`
- Проследяване на сесии: `open-sse/services/sessionManager.ts`
- Дедупликация на заявка: `open-sse/services/signatureCache.ts`
- Инжектиране на системна подкана: `open-sse/services/systemPrompt.ts`
- Мислещо управление на бюджета: `open-sse/services/thinkingBudget.ts`
- Маршрутизиране на модел с заместващи символи: `open-sse/services/wildcardRouter.ts`
- Управление на лимита на скоростта: `open-sse/services/rateLimitManager.ts`
- Прекъсвач: `open-sse/services/circuitBreaker.ts`

Модули на ниво домейн:

- Наличност на модела: `src/lib/domain/modelAvailability.ts`
- Правила/бюджети за разходи: `src/lib/domain/costRules.ts`
- Резервна политика: `src/lib/domain/fallbackPolicy.ts`
- Комбо резолвер: `src/lib/domain/comboResolver.ts`
- Политика за блокиране: `src/lib/domain/lockoutPolicy.ts`
- Механизъм за правила: `src/domain/policyEngine.ts` — централизирано блокиране → бюджет → резервна оценка
- Каталог с кодове за грешки: `src/lib/domain/errorCodes.ts`
- ID на заявката: `src/lib/domain/requestId.ts`
- Време за изчакване на извличане: `src/lib/domain/fetchTimeout.ts`
- Заявка за телеметрия: `src/lib/domain/requestTelemetry.ts`
- Съответствие/одит: `src/lib/domain/compliance/index.ts`
- Изпълнител на оценка: `src/lib/domain/evalRunner.ts`
- Устойчивост на състоянието на домейна: `src/lib/db/domainState.ts` — SQLite CRUD за резервни вериги, бюджети, история на разходите, състояние на блокиране, прекъсвачи

Модули за доставчик на OAuth (12 отделни файла под `src/lib/oauth/providers/`):

- Индекс на регистъра: `src/lib/oauth/providers/index.ts`
- Индивидуални доставчици: `claude.ts`, `codex.ts`, `gemini.ts`, `antigravity.ts`, `qoder.ts`, `qwen.ts`, `kimi-coding.ts`, `github.ts`, `kiro.ts`, `cursor.ts`, `kilocode.ts`, `cline.ts`
- Тънка обвивка: `src/lib/oauth/providers.ts` — повторно експортиране от отделни модули## 3) Persistence Layer

Основно състояние DB (SQLite):

- Основна информация: `src/lib/db/core.ts` (better-sqlite3, миграции, WAL)
- Повторно експортиране на фасада: `src/lib/localDb.ts` (тънък слой за съвместимост за повикващите)
- файл: `${DATA_DIR}/storage.sqlite` (или `$XDG_CONFIG_HOME/omniroute/storage.sqlite`, когато е зададено, иначе `~/.omniroute/storage.sqlite`)
- обекти (таблици + KV пространства от имена): providerConnections, providerNodes, modelAliases, комбинации, apiKeys, настройки, ценообразуване,**customModels**,**proxyConfig**,**ipFilter**,**thinkingBudget**,**systemPrompt**

Устойчивост на употреба:

- фасада: `src/lib/usageDb.ts` (декомпозирани модули в `src/lib/usage/*`)
- SQLite таблици в `storage.sqlite`: `usage_history`, `call_logs`, `proxy_logs`
- незадължителните файлови артефакти остават за съвместимост/отстраняване на грешки (`${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`, `<repo>/logs/...`)
- наследените JSON файлове се мигрират към SQLite чрез миграции при стартиране, когато има такива

DB на състоянието на домейна (SQLite):

- `src/lib/db/domainState.ts` — CRUD операции за състояние на домейн
- Таблици (създадени в `src/lib/db/core.ts`): `domain_fallback_chains`, `domain_budgets`, `domain_cost_history`, `domain_lockout_state`, `domain_circuit_breakers`
- Модел на кеша за запис: Картите в паметта са авторитетни по време на изпълнение; мутациите се записват синхронно в SQLite; състоянието се възстановява от DB при студен старт## 4) Auth + Security Surfaces

- Удостоверяване на бисквитките на таблото за управление: `src/proxy.ts`, `src/app/api/auth/login/route.ts`
- Генериране/проверка на API ключ: `src/shared/utils/apiKey.ts`
- Тайните на доставчика се запазват в записите `providerConnections`
- Поддръжка на изходящ прокси чрез `open-sse/utils/proxyFetch.ts` (env vars) и `open-sse/utils/networkProxy.ts` (конфигурируем за всеки доставчик или глобален)## 5) Cloud Sync

- Инициализация на Scheduler: `src/lib/initCloudSync.ts`, `src/shared/services/initializeCloudSync.ts`, `src/shared/services/modelSyncScheduler.ts`
- Периодична задача: `src/shared/services/cloudSyncScheduler.ts`
- Периодична задача: `src/shared/services/modelSyncScheduler.ts`
- Контролен маршрут: `src/app/api/sync/cloud/route.ts`## Request Lifecycle (`/v1/chat/completions`)

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

Резервните решения се управляват от `open-sse/services/accountFallback.ts`, като се използват кодове за състояние и евристика за съобщения за грешка. Комбинираното маршрутизиране добавя един допълнителен предпазител: 400-те с обхват на доставчика, като неизправности при блокиране на съдържание нагоре и проверка на роли, се третират като неизправности в локален модел, така че по-късните комбинирани цели все още могат да се изпълняват.## OAuth Onboarding and Token Refresh Lifecycle

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

Опресняването по време на трафик на живо се изпълнява вътре в `open-sse/handlers/chatCore.ts` чрез изпълнител `refreshCredentials()`.## Cloud Sync Lifecycle (Enable / Sync / Disable)

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

Периодичното синхронизиране се задейства от „CloudSyncScheduler“, когато облакът е активиран.## Data Model and Storage Map

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

Файлове за физическо съхранение:

- основна база данни за изпълнение: `${DATA_DIR}/storage.sqlite`
- Редове за заявка: `${DATA_DIR}/log.txt` (компат/дебъг артефакт)
- структурирани архиви на полезния товар на повикванията: `${DATA_DIR}/call_logs/`
- незадължителни сесии за преводач/заявка за отстраняване на грешки: `<repo>/logs/...`## Deployment Topology

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

- `src/app/api/v1/*`, `src/app/api/v1beta/*`: API за съвместимост
- `src/app/api/v1/providers/[provider]/*`: специални маршрути за всеки доставчик (чат, вграждания, изображения)
- `src/app/api/providers*`: доставчик CRUD, валидиране, тестване
- `src/app/api/provider-nodes*`: персонализирано съвместимо управление на възли
- `src/app/api/provider-models`: персонализирано управление на модела (CRUD)
- `src/app/api/models/route.ts`: API за каталог на модели (псевдоними + потребителски модели)
- `src/app/api/oauth/*`: потоци OAuth/код на устройство
- `src/app/api/keys*`: жизнен цикъл на местен API ключ
- `src/app/api/models/alias`: управление на псевдоними
- `src/app/api/combos*`: резервно управление на комбо
- `src/app/api/pricing`: отменя ценообразуването за изчисляване на разходите
- `src/app/api/settings/proxy`: конфигурация на прокси (GET/PUT/DELETE)
- `src/app/api/settings/proxy/test`: тест за свързване на изходящ прокси (POST)
- `src/app/api/usage/*`: API за използване и регистрационни файлове
- `src/app/api/sync/*` + `src/app/api/cloud/*`: облачно синхронизиране и помощници в облака
- `src/app/api/cli-tools/*`: локални CLI конфигурационни писатели/проверки
- `src/app/api/settings/ip-filter`: списък с разрешени/блокирани IP адреси (GET/PUT)
- `src/app/api/settings/thinking-budget`: конфигурация на бюджета на мислещия токен (GET/PUT)
- `src/app/api/settings/system-prompt`: глобална системна подкана (GET/PUT)
- `src/app/api/sessions`: списък на активни сесии (GET)
- `src/app/api/rate-limits`: състояние на ограничение на скоростта за всеки акаунт (GET)### Routing and Execution Core

- `src/sse/handlers/chat.ts`: анализ на заявка, комбо обработка, цикъл за избор на акаунт
- `open-sse/handlers/chatCore.ts`: превод, изпращане на изпълнителя, повторен опит/опресняване, настройка на потока
- `open-sse/executors/*`: специфично за доставчика поведение на мрежа и формат### Translation Registry and Format Converters

- `open-sse/translator/index.ts`: регистър на преводачите и оркестрация
- Заявка за преводачи: `open-sse/translator/request/*`
- Преводачи на отговор: `open-sse/translator/response/*`
- Форматни константи: `open-sse/translator/formats.ts`### Persistence

- `src/lib/db/*`: постоянна конфигурация/състояние и устойчивост на домейн на SQLite
- `src/lib/localDb.ts`: повторно експортиране на съвместимост за DB модули
- `src/lib/usageDb.ts`: хронология на използването/фасада на регистрационните файлове на повикванията върху SQLite таблици## Provider Executor Coverage (Strategy Pattern)

Всеки доставчик има специализиран изпълнител, разширяващ `BaseExecutor` (в `open-sse/executors/base.ts`), който осигурява изграждане на URL адрес, изграждане на заглавка, повторен опит с експоненциално забавяне, кукички за опресняване на идентификационни данни и метода за оркестрация `execute()`.

| Изпълнител                   | Доставчик(и)                                                                                                                                                 | Специална обработка                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `Изпълнител по подразбиране` | OpenAI, Claude, Gemini, Qwen, Qoder, OpenRouter, GLM, Kimi, MiniMax, DeepSeek, Groq, xAI, Mistral, Perplexity, Together, Fireworks, Cerebras, Cohere, NVIDIA | Конфигурация на динамичен URL/заглавие за доставчик                                 |
| `AntigravityExecutor`        | Google Антигравитация                                                                                                                                        | Идентификационни номера на персонализирани проекти/сесии, повторен опит след анализ |
| `CodexExecutor`              | OpenAI Codex                                                                                                                                                 | Вкарва системни инструкции, принуждава усилие за разсъждение                        |
| `CursorExecutor`             | Курсор IDE                                                                                                                                                   | ConnectRPC протокол, Protobuf кодиране, подписване на заявка чрез контролна сума    |
| `GithubExecutor`             | Копилот на GitHub                                                                                                                                            | Опресняване на Copilot token, заглавки, имитиращи VSCode                            |
| `KiroExecutor`               | AWS CodeWhisperer/Киро                                                                                                                                       | AWS EventStream двоичен формат → SSE конвертиране                                   |
| `GeminiCLIExecutor`          | Gemini CLI                                                                                                                                                   | Цикъл на опресняване на Google OAuth токен                                          |

Всички други доставчици (включително персонализирани съвместими възли) използват `DefaultExecutor`.## Provider Compatibility Matrix

| Доставчик         | Формат          | Удостоверяване                 | Поток            | Непоточно | Опресняване на токена | API за използване            |
| ----------------- | --------------- | ------------------------------ | ---------------- | --------- | --------------------- | ---------------------------- | ------------------------------ |
| Клод              | Клод            | API ключ / OAuth               | ✅               | ✅        | ✅                    | ⚠️ Само администратор        |
| Близнаци          | близнаци        | API ключ / OAuth               | ✅               | ✅        | ✅                    | ⚠️ Облачна конзола           |
| Gemini CLI        | gemini-cli      | OAuth                          | ✅               | ✅        | ✅                    | ⚠️ Облачна конзола           |
| Антигравитация    | антигравитация  | OAuth                          | ✅               | ✅        | ✅                    | ✅ API с пълна квота         |
| OpenAI            | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| Кодекс            | openai-отговори | OAuth                          | ✅ принуден      | ❌        | ✅                    | ✅ Ограничения на скоростта  |
| Копилот на GitHub | openai          | OAuth + Copilot Token          | ✅               | ✅        | ✅                    | ✅ Моментни снимки на квоти  |
| Курсор            | курсор          | Персонализирана контролна сума | ✅               | ✅        | ❌                    | ❌                           |
| Киро              | киро            | AWS SSO OIDC                   | ✅ (EventStream) | ❌        | ✅                    | ✅ Ограничения за използване |
| Куен              | openai          | OAuth                          | ✅               | ✅        | ✅                    | ⚠️ По заявка                 |
| Qoder             | openai          | OAuth (основен)                | ✅               | ✅        | ✅                    | ⚠️ По заявка                 |
| OpenRouter        | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| GLM/Кими/МиниМакс | Клод            | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| DeepSeek          | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| Groq              | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| xAI (Grok)        | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| Мистрал           | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| Недоумение        | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| Заедно AI         | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| Фойерверки AI     | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| Мозъци            | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| Cohere            | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           |
| NVIDIA NIM        | openai          | API ключ                       | ✅               | ✅        | ❌                    | ❌                           | ## Format Translation Coverage |

Откритите изходни формати включват:

- `опенай`
- `openaj-отговори`
- „Клод“.
- "близнаци".

Целевите формати включват:

- OpenAI чат/Отговори
- Клод
- Gemini/Gemini-CLI/Антигравитационен плик
- Киро
- Курсор

Преводите използват**OpenAI като хъб формат**— всички реализации преминават през OpenAI като междинен:```
Source Format → OpenAI (hub) → Target Format

````

Преводите се избират динамично въз основа на формата на изходния полезен товар и целевия формат на доставчика.

Допълнителни слоеве за обработка в тръбопровода за превод:

-**Дефектиране на отговора**— Премахва нестандартните полета от отговорите във формат OpenAI (както стрийминг, така и без стрийминг), за да се гарантира стриктно съответствие с SDK
-**Нормализиране на ролята**— Преобразува `developer` → `system` за цели, които не са OpenAI; обединява `system` → `user` за модели, които отхвърлят системната роля (GLM, ERNIE)
-**Извличане на мислен етикет**— Анализира `<think>...</think>` блокове от съдържание в полето `reasoning_content`
-**Структуриран изход**— Преобразува OpenAI `response_format.json_schema` в `responseMimeType` + `responseSchema` на Gemini## Supported API Endpoints

| Крайна точка | Формат | Манипулатор |
| -------------------------------------------------- | ------------------ | ------------------------------------------------------------------ |
| `POST /v1/chat/completions` | OpenAI чат | `src/sse/handlers/chat.ts` |
| `POST /v1/messages` | Съобщения на Клод | Същият манипулатор (автоматично разпознат) |
| `POST /v1/responses` | OpenAI отговори | `open-sse/handlers/responsesHandler.ts` |
| `POST /v1/вграждания` | OpenAI вграждания | `open-sse/handlers/embeddings.ts` |
| `GET /v1/вграждания` | Списък на модели | API маршрут |
| `POST /v1/images/generations` | OpenAI изображения | `open-sse/handlers/imageGeneration.ts` |
| `GET /v1/images/generations` | Списък на модели | API маршрут |
| `POST /v1/providers/{provider}/chat/completions` | OpenAI чат | Специализиран за всеки доставчик с валидиране на модел |
| `POST /v1/providers/{provider}/embeddings` | OpenAI вграждания | Специализиран за всеки доставчик с валидиране на модел |
| `POST /v1/providers/{provider}/images/generations` | OpenAI изображения | Специализиран за всеки доставчик с валидиране на модел |
| `POST /v1/messages/count_tokens` | Клод Токен Брой | API маршрут |
| `GET /v1/models` | Списък с модели на OpenAI | API маршрут (чат + вграждане + изображение + потребителски модели) |
| `GET /api/models/catalog` | Каталог | Всички модели, групирани по доставчик + тип |
| `POST /v1beta/models/*:streamGenerateContent` | Роден Близнаци | API маршрут |
| `GET/PUT/DELETE /api/settings/proxy` | Прокси конфигурация | Конфигурация на мрежов прокси |
| `POST /api/settings/proxy/test` | Прокси свързаност | Крайна точка на теста за изправност/свързване на прокси |
| `GET/POST/DELETE /api/provider-models` | Модели на доставчици | Метаданни за модела на доставчика, поддържащи персонализирани и управлявани налични модели |## Bypass Handler

Обходният манипулатор (`open-sse/utils/bypassHandler.ts`) прихваща известни заявки за "изхвърляне" от Claude CLI - пингове за загряване, извличане на заглавия и броене на токени - и връща**фалшив отговор**, без да консумира токени на доставчика нагоре по веригата. Това се задейства само когато `User-Agent` съдържа `claude-cli`.## Request Logger Pipeline

Регистраторът на заявки (`open-sse/utils/requestLogger.ts`) осигурява 7-етапен тръбопровод за регистриране на грешки, деактивиран по подразбиране, активиран чрез `ENABLE_REQUEST_LOGS=true`:```
1_req_client.json → 2_req_source.json → 3_req_openai.json → 4_req_target.json
→ 5_res_provider.txt → 6_res_openai.txt → 7_res_client.txt
````

Файловете се записват в `<repo>/logs/<session>/` за всяка сесия на заявка.## Failure Modes and Resilience

## 1) Account/Provider Availability

- изчакване на акаунта на доставчика при преходни/скоростни/удостоверителни грешки
- резервен акаунт преди неуспешна заявка
- резервен комбиниран модел, когато пътят на текущия модел/доставчик е изчерпан## 2) Token Expiry

- предварителна проверка и опресняване с повторен опит за опресняващи доставчици
- 401/403 повторен опит след опит за опресняване в основния път## 3) Stream Safety

- контролер на потоци с прекъсване на връзката
- поток за превод с промиване в края на потока и обработка на `[DONE]`
- резервна оценка на използването, когато липсват метаданни за използване на доставчика## 4) Cloud Sync Degradation

- появяват се грешки при синхронизиране, но локалното изпълнение продължава
- планировчикът има логика с възможност за повторен опит, но периодичното изпълнение в момента извиква синхронизиране с един опит по подразбиране## 5) Data Integrity

- Миграции на SQLite схема и кукички за автоматично надграждане при стартиране
- наследен JSON → път за съвместимост на миграцията на SQLite## Observability and Operational Signals

Източници на видимост по време на изпълнение:

- регистрационни файлове на конзолата от `src/sse/utils/logger.ts`
- агрегати за използване на заявка в SQLite (`usage_history`, `call_logs`, `proxy_logs`)
- четиристепенно улавяне на подробен полезен товар в SQLite (`request_detail_logs`), когато `settings.detailed_logs_enabled=true`
- текстов регистър на състоянието на заявката в `log.txt` (по избор/compat)
- незадължителни дълбоки регистрационни файлове за заявка/превод под `logs/`, когато `ENABLE_REQUEST_LOGS=true`
- крайни точки за използване на таблото за управление (`/api/usage/*`) за използване на UI

Подробно улавяне на полезен товар на заявка съхранява до четири етапа на полезен товар в JSON на маршрутизирано повикване:

- необработена заявка, получена от клиента
- преведена заявка, действително изпратена нагоре
- отговор на доставчика, реконструиран като JSON; поточно предаваните отговори се уплътняват до крайното резюме плюс метаданни на потока
- окончателен клиентски отговор, върнат от OmniRoute; поточно предаваните отговори се съхраняват в същата компактна обобщена форма## Security-Sensitive Boundaries

- JWT тайна (`JWT_SECRET`) защитава проверката/подписването на бисквитките на сесията на таблото за управление
- Първоначалната парола за зареждане (`INITIAL_PASSWORD`) трябва да бъде изрично конфигурирана за осигуряване при първо стартиране
- API ключ HMAC тайна (`API_KEY_SECRET`) защитава генерирания локален формат на API ключ
- Тайните на доставчика (API ключове/токени) се съхраняват в локалната база данни и трябва да бъдат защитени на ниво файлова система
- Крайните точки за синхронизиране в облак разчитат на удостоверяване на API ключ + семантика на идентификатор на машина## Environment and Runtime Matrix

Променливите на средата, използвани активно от кода:

- Приложение/удостоверяване: `JWT_SECRET`, `INITIAL_PASSWORD`
- Съхранение: `DATA_DIR`
- Съвместимо поведение на възел: `ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE`
- Допълнителна отмяна на базата за съхранение (Linux/macOS, когато `DATA_DIR` не е зададено): `XDG_CONFIG_HOME`
- Хеширане на сигурността: `API_KEY_SECRET`, `MACHINE_ID_SALT`
- Регистриране: `ENABLE_REQUEST_LOGS`
- Синхронизиране/облачно URL адресиране: `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_CLOUD_URL`
- Изходящ прокси: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` и варианти с малки букви
- Флагове на функцията SOCKS5: `ENABLE_SOCKS5_PROXY`, `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY`
- Помощници за платформа/време на изпълнение (не специфична за приложението конфигурация): `APPDATA`, `NODE_ENV`, `PORT`, `HOSTNAME`## Known Architectural Notes

1. `usageDb` и `localDb` споделят една и съща основна политика за директория (`DATA_DIR` -> `XDG_CONFIG_HOME/omniroute` -> `~/.omniroute`) с мигриране на наследени файлове.
2. `/api/v1/route.ts` делегира на същия унифициран конструктор на каталог, използван от `/api/v1/models` (`src/app/api/v1/models/catalog.ts`), за да се избегне семантично отклонение.
3. Request logger записва пълни заглавки/тяло, когато е разрешено; третира регистрационната директория като чувствителна.
4. Поведението в облака зависи от правилния `NEXT_PUBLIC_BASE_URL` и достъпността на крайната точка на облака.
5. Директорията `open-sse/` се публикува като `@omniroute/open-sse`**npm workspace package**. Изходният код го импортира чрез `@omniroute/open-sse/...` (разрешено от Next.js `transpilePackages`). Пътищата на файловете в този документ все още използват името на директорията `open-sse/` за последователност.
6. Диаграмите в таблото за управление използват**Recharts**(базирани на SVG) за достъпни, интерактивни аналитични визуализации (стълбовидни диаграми на използването на модела, таблици с разбивка на доставчиците с проценти на успех).
7. E2E тестовете използват**Playwright**(`tests/e2e/`), изпълняват се чрез `npm run test:e2e`. Единичните тестове използват**Node.js test runner**(`tests/unit/`), изпълняват се чрез `npm run test:unit`. Изходният код под `src/` е**TypeScript**(`.ts`/`.tsx`); работното пространство `open-sse/` остава JavaScript (`.js`).
8. Страницата с настройки е организирана в 5 раздела: Сигурност, Маршрутизация (6 глобални стратегии: първо запълване, кръгова система, p2c, произволна, най-малко използвана, оптимизирана по отношение на разходите), Устойчивост (ограничения на скоростта за редактиране, прекъсвач, политики), AI (мислещ бюджет, системна подкана, кеш за подкана), Разширени (прокси).## Operational Verification Checklist

- Изграждане от източник: `npm run build`
- Изграждане на Docker изображение: `docker build -t omniroute .`
- Стартирайте услугата и проверете:
- `GET /api/settings`
- `GET /api/v1/models`
- CLI целевият базов URL трябва да бъде `http://<host>:20128/v1`, когато `PORT=20128`
