# API Reference (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Повний довідник для всіх кінцевих точок OmniRoute API.---

## Table of Contents

- [Завершення чату](#chat-completions)
- [Вбудовування](#вбудовування)
- [Створення зображення](#image-generation)
- [Список моделей](#list-models)
- [Кінцеві точки сумісності](#compatibility-endpoints)
- [Семантичний кеш](#semantic-cache)
- [Інформаційна панель і керування](#dashboard--management)
- [Обробка запиту](#request-processing)
- [Автентифікація](#authentication)---

## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Custom Headers

| Заголовок                | Напрям    | Опис                                                              |
| ------------------------ | --------- | ----------------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Запит     | Установіть значення `true`, щоб обійти кеш                        |
| `X-OmniRoute-Progress`   | Запит     | Встановіть значення `true` для подій прогресу                     |
| `X-Session-Id`           | Запит     | Закріплений ключ сеансу для зовнішньої спорідненості сеансу       |
| `x_session_id`           | Запит     | Також прийнятний варіант підкреслення (прямий HTTP)               |
| `Idempotency-Key`        | Запит     | Ключ дедуплювання (5-секундне вікно)                              |
| `X-Request-Id`           | Запит     | Альтернативний ключ дедуплювання                                  |
| `X-OmniRoute-Cache`      | Відповідь | `HIT` або `MISS` (не потокове)                                    |
| `X-OmniRoute-Idempotent` | Відповідь | `true` якщо дедупліковано                                         |
| `X-OmniRoute-Progress`   | Відповідь | `включено`, якщо відстеження прогресу на                          |
| `X-OmniRoute-Session-Id` | Відповідь | Ідентифікатор ефективного сеансу, який використовується OmniRoute |

> Примітка Nginx: якщо ви покладаєтеся на заголовки підкреслення (наприклад, `x_session_id`), увімкніть `underscores_in_headers on;`.---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Доступні постачальники: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

# List all embedding models

GET /v1/embeddings

````

---

## Image Generation

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
````

Доступні постачальники: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

# List all image models

GET /v1/images/generations

````

---

## List Models

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
````

---

## Compatibility Endpoints

| Метод        | Шлях                        | Формат                 |
| ------------ | --------------------------- | ---------------------- | ----------------------------- |
| Опублікувати | `/v1/chat/completions`      | OpenAI                 |
| Опублікувати | `/v1/messages`              | Антропний              |
| Опублікувати | `/v1/відповіді`             | Відповіді OpenAI       |
| Опублікувати | `/v1/вбудовування`          | OpenAI                 |
| Опублікувати | `/v1/images/generations`    | OpenAI                 |
| ОТРИМАТИ     | `/v1/models`                | OpenAI                 |
| Опублікувати | `/v1/messages/count_tokens` | Антропний              |
| ОТРИМАТИ     | `/v1beta/models`            | Близнюки               |
| Опублікувати | `/v1beta/models/{...шлях}`  | Gemini generateContent |
| Опублікувати | `/v1/api/chat`              | Оллама                 | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Якщо префікс провайдера відсутній, додається автоматично. Невідповідні моделі повертають "400".---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Приклад відповіді:```json
{
"semanticCache": {
"memorySize": 42,
"memoryMaxSize": 500,
"dbSize": 128,
"hitRate": 0.65
},
"idempotency": {
"activeKeys": 3,
"windowMs": 5000
}
}

````

---

## Dashboard & Management

### Authentication

| Кінцева точка | Метод | Опис |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/login` | Опублікувати | Вхід |
| `/api/auth/logout` | Опублікувати | Вийти |
| `/api/settings/require-login` | GET/PUT | Перемкнути необхідний вхід |### Provider Management

| Кінцева точка | Метод | Опис |
| ---------------------------- | --------------- | ------------------------ |
| `/api/providers` | GET/POST | Список / створення постачальників |
| `/api/providers/[id]` | GET/PUT/DELETE | Керувати постачальником |
| `/api/providers/[id]/test` | Опублікувати | Перевірте підключення провайдера |
| `/api/providers/[id]/models` | ОТРИМАТИ | Список моделей провайдерів |
| `/api/providers/validate` | Опублікувати | Перевірте конфігурацію постачальника |
| `/api/provider-nodes*` | Різні | Керування вузлом провайдера |
| `/api/provider-models` | GET/POST/DELETE | Індивідуальні моделі |### OAuth Flows

| Кінцева точка | Метод | Опис |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[постачальник]/[дія]` | Різні | OAuth для постачальника |### Routing & Config

| Кінцева точка | Метод | Опис |
| --------------------- | -------- | ----------------------------- |
| `/api/models/alias` | GET/POST | Псевдоніми моделей |
| `/api/models/catalog` | ОТРИМАТИ | Всі моделі за провайдером + тип |
| `/api/combos*` | Різні | Комбо управління |
| `/api/keys*` | Різні | Керування ключами API |
| `/api/pricing` | ОТРИМАТИ | Модель ціноутворення |### Usage & Analytics

| Кінцева точка | Метод | Опис |
| ---------------------------- | ------ | -------------------- |
| `/api/usage/history` | ОТРИМАТИ | Історія використання |
| `/api/usage/logs` | ОТРИМАТИ | Журнали використання |
| `/api/usage/request-logs` | ОТРИМАТИ | Журнали рівня запиту |
| `/api/usage/[connectionId]` | ОТРИМАТИ | Використання кожного підключення |### Settings

| Кінцева точка | Метод | Опис |
| ------------------------------ | ------------- | ---------------------- |
| `/api/налаштування` | GET/PUT/PATCH | Загальні налаштування |
| `/api/settings/proxy` | GET/PUT | Конфігурація мережевого проксі |
| `/api/settings/proxy/test` | Опублікувати | Тест проксі-з'єднання |
| `/api/settings/ip-filter` | GET/PUT | Список дозволених/чорних IP |
| `/api/settings/thinking-budget` | GET/PUT | Обґрунтування жетонного бюджету |
| `/api/settings/system-prompt` | GET/PUT | Глобальна системна підказка |### Monitoring

| Кінцева точка | Метод | Опис |
| ------------------------ | ---------- | -------------------------------------------------------------------------------------------------- |
| `/api/sessions` | ОТРИМАТИ | Відстеження активної сесії |
| `/api/rate-limits` | ОТРИМАТИ | Ліміти ставок за обліковий запис |
| `/api/monitoring/health` | ОТРИМАТИ | Перевірка працездатності + підсумок постачальника (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | ОТРИМАТИ/ВИДАЛИТИ | Статистика кешу / очищення |### Backup & Export/Import

| Кінцева точка | Метод | Опис |
| ---------------------------- | ------ | ----------------------------------------------- |
| `/api/db-backups` | ОТРИМАТИ | Список доступних резервних копій |
| `/api/db-backups` | ПОСТАВИТИ | Створіть резервну копію вручну |
| `/api/db-backups` | Опублікувати | Відновити з певної резервної копії |
| `/api/db-backups/export` | ОТРИМАТИ | Завантажити базу даних як файл .sqlite |
| `/api/db-backups/import` | Опублікувати | Завантажте файл .sqlite для заміни бази даних |
| `/api/db-backups/exportAll` | ОТРИМАТИ | Завантажте повну резервну копію як архів .tar.gz |### Cloud Sync

| Кінцева точка | Метод | Опис |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud` | Різні | Операції хмарної синхронізації |
| `/api/sync/initialize` | Опублікувати | Ініціалізація синхронізації |
| `/api/cloud/*` | Різні | Управління хмарою |### Tunnels

| Кінцева точка | Метод | Опис |
| -------------------------------- | ------ | --------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | ОТРИМАТИ | Читайте статус інсталяції та виконання Cloudflare Quick Tunnel для інформаційної панелі |
| `/api/tunnels/cloudflared` | Опублікувати | Увімкніть або вимкніть швидкий тунель Cloudflare (`action=enable/disable`) |### CLI Tools

| Кінцева точка | Метод | Опис |
| ---------------------------------- | ------ | ------------------ |
| `/api/cli-tools/claude-settings` | ОТРИМАТИ | Клод CLI статус |
| `/api/cli-tools/codex-settings` | ОТРИМАТИ | Codex CLI status |
| `/api/cli-tools/droid-settings` | ОТРИМАТИ | Droid CLI status |
| `/api/cli-tools/openclaw-settings` | ОТРИМАТИ | Статус OpenClaw CLI |
| `/api/cli-tools/runtime/[toolId]` | ОТРИМАТИ | Загальне середовище виконання CLI |

Відповіді CLI включають: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Кінцева точка | Метод | Опис |
| ------------------ | ------ | -------------------------------------------------------- |
| `/api/acp/agents` | ОТРИМАТИ | Перелічити всі виявлені агенти (вбудовані та спеціальні) зі статусом |
| `/api/acp/agents` | Опублікувати | Додайте спеціальний агент або оновіть кеш виявлення |
| `/api/acp/agents` | ВИДАЛИТИ | Видаліть спеціальний агент за параметром запиту `id` |

Відповідь GET включає `agents[]` (id, name, binary, version, installed, protocol, isCustom) і `summary` (total, installed, notFound, builtIn, custom).### Resilience & Rate Limits

| Кінцева точка | Метод | Опис |
| ----------------------- | --------- | ------------------------------ |
| `/api/resilience` | ОТРИМАТИ/ВИПРАВЛЕННЯ | Отримати/оновити профілі стійкості |
| `/api/resilience/reset` | Опублікувати | Скидання автоматичних вимикачів |
| `/api/rate-limits` | ОТРИМАТИ | Статус обмеження ставки на обліковий запис |
| `/api/rate-limit` | ОТРИМАТИ | Конфігурація глобального обмеження швидкості |### Evals

| Кінцева точка | Метод | Опис |
| ------------ | -------- | ---------------------------------- |
| `/api/evals` | GET/POST | Створити список eval suites / запустити оцінку |### Policies

| Кінцева точка | Метод | Опис |
| --------------- | --------------- | ----------------------- |
| `/api/policies` | GET/POST/DELETE | Керування політикою маршрутизації |### Compliance

| Кінцева точка | Метод | Опис |
| ---------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` | ОТРИМАТИ | Журнал аудиту відповідності (останній N) |### v1beta (Gemini-Compatible)

| Кінцева точка | Метод | Опис |
| -------------------------------- | ------ | ---------------------------------- |
| `/v1beta/models` | ОТРИМАТИ | Список моделей у форматі Gemini |
| `/v1beta/models/{...шлях}` | Опублікувати | Кінцева точка Gemini `generateContent` |

Ці кінцеві точки відображають формат API Gemini для клієнтів, які очікують нативної сумісності з Gemini SDK.### Internal / System APIs

| Кінцева точка | Метод | Опис |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | ОТРИМАТИ | Перевірка ініціалізації програми (використовується під час першого запуску) |
| `/api/теги` | ОТРИМАТИ | Сумісні з Ollama теги моделей (для клієнтів Ollama) |
| `/api/перезапуск` | Опублікувати | Ініціювати плавний перезапуск сервера |
| `/api/shutdown` | Опублікувати | Ініціювати плавне завершення роботи сервера |

>**Примітка.**Ці кінцеві точки використовуються внутрішньо системою або для сумісності клієнта Ollama. Зазвичай вони не викликаються кінцевими користувачами.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Транскрибуйте аудіофайли за допомогою Deepgram або AssemblyAI.

**Запит:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Відповідь:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Підтримувані провайдери:**`deepgram/nova-3`, `assemblyai/best`.

**Підтримувані формати:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Для клієнтів, які використовують формат API Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Запити автоматично перекладаються між Ollama та внутрішніми форматами.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Відповідь:**```json
{
"providers": {
"claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
"github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
}
}

````

---

## Budget

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
````

---

## Model Availability

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Request Processing

1. Клієнт надсилає запит до `/v1/*`
2. Обробник маршруту викликає `handleChat`, `handleEmbedding`, `handleAudioTranscription` або `handleImageGeneration`
3. Модель вирішено (прямий постачальник/модель або псевдонім/комбо)
4. Облікові дані, вибрані з локальної БД з фільтрацією доступності облікових записів
5. Для чату: `handleChatCore` — визначення формату, переклад, перевірка кешу, перевірка ідемпотентності
6. Виконавець провайдера надсилає висхідний запит
7. Відповідь перекладається назад у формат клієнта (чат) або повертається як є (вбудовування/зображення/аудіо)
8. Запис використання/реєстрації
9. Резервний варіант застосовується до помилок відповідно до правил комбінування

Повне посилання на архітектуру: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Маршрути інформаційної панелі (`/dashboard/*`) використовують файл cookie `auth_token`
- Вхід використовує збережений хеш пароля; повернутися до `INITIAL_PASSWORD`
- `requireLogin` перемикається через `/api/settings/require-login`
- Для маршрутів `/v1/*` необов'язково потрібен ключ API носія, коли `REQUIRE_API_KEY=true`
