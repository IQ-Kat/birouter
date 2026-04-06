# API Reference (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Пълна справка за всички крайни точки на OmniRoute API.---

## Table of Contents

- [Завършвания на чат](#chat-completions)
- [Вграждания](#вграждания)
- [Генериране на изображение](#image-generation)
- [Списък с модели](#list-models)
- [Крайни точки за съвместимост](#compatibility-endpoints)
- [Семантичен кеш](#semantic-cache)
- [Табло за управление и управление](#табло за управление--управление)
- [Обработка на заявка](#request-processing)
- [Удостоверяване](#удостоверяване)---

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

| Заглавка                 | Посока  | Описание                                                 |
| ------------------------ | ------- | -------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Заявка  | Задайте `true`, за да заобиколите кеша                   |
| `X-OmniRoute-Progress`   | Заявка  | Задайте на `true` за прогрес събития                     |
| `X-Session-Id`           | Заявка  | Залепващ сесиен ключ за афинитет към външна сесия        |
| `x_session_id`           | Заявка  | Вариантът с долна черта също се приема (директен HTTP)   |
| `Idempotency-Key`        | Заявка  | Ключ за дедупиране (5s прозорец)                         |
| `X-Request-Id`           | Заявка  | Алтернативен дедуп ключ                                  |
| `X-OmniRoute-Cache`      | Отговор | `HIT` или `MISS` (без стрийминг)                         |
| `X-OmniRoute-Idempotent` | Отговор | `true` ако е дедупликиран                                |
| `X-OmniRoute-Progress`   | Отговор | `enabled`, ако проследяването на напредъка е на          |
| `X-OmniRoute-Session-Id` | Отговор | Идентификатор на ефективна сесия, използван от OmniRoute |

> Забележка на Nginx: ако разчитате на заглавки с долна черта (например `x_session_id`), активирайте `underscores_in_headers on;`.---

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

Налични доставчици: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Налични доставчици: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Метод      | Път                         | Формат                     |
| ---------- | --------------------------- | -------------------------- | ----------------------------- |
| ПУБЛИКАЦИЯ | `/v1/chat/completions`      | OpenAI                     |
| ПУБЛИКАЦИЯ | `/v1/съобщения`             | Антропен                   |
| ПУБЛИКАЦИЯ | `/v1/отговори`              | OpenAI отговори            |
| ПУБЛИКАЦИЯ | `/v1/вграждания`            | OpenAI                     |
| ПУБЛИКАЦИЯ | `/v1/images/generations`    | OpenAI                     |
| ВЗЕМЕТЕ    | `/v1/модели`                | OpenAI                     |
| ПУБЛИКАЦИЯ | `/v1/messages/count_tokens` | Антропен                   |
| ВЗЕМЕТЕ    | `/v1beta/models`            | Близнаци                   |
| ПУБЛИКАЦИЯ | `/v1beta/models/{...path}`  | Gemini генерира съдържание |
| ПУБЛИКАЦИЯ | `/v1/api/чат`               | Олама                      | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Префиксът на доставчика се добавя автоматично, ако липсва. Несъответстващите модели връщат „400“.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Пример за отговор:```json
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

| Крайна точка | Метод | Описание |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/login` | ПУБЛИКАЦИЯ | Вход |
| `/api/auth/logout` | ПУБЛИКАЦИЯ | Изход |
| `/api/settings/require-login` | ВЗЕМИ/ПОСТАВИ | Изисква се превключване на влизане |### Provider Management

| Крайна точка | Метод | Описание |
| ---------------------------- | --------------- | ------------------------ |
| `/api/провайдери` | ВЗЕМЕТЕ/ПУБЛИКУВАЙТЕ | Списък / създаване на доставчици |
| `/api/провайдери/[id]` | ПОЛУЧАВАНЕ/ПОСТАВЯНЕ/ИЗТРИВАНЕ | Управление на доставчик |
| `/api/providers/[id]/test` | ПУБЛИКАЦИЯ | Тествайте връзката с доставчик |
| `/api/providers/[id]/models` | ВЗЕМЕТЕ | Избройте модели на доставчици |
| `/api/providers/validate` | ПУБЛИКАЦИЯ | Проверка на конфигурацията на доставчика |
| `/api/провайдер-възли*` | Различни | Управление на възел на доставчик |
| `/api/provider-models` | ПОЛУЧАВАНЕ/ПУБЛИКУВАНЕ/ИЗТРИВАНЕ | Персонализирани модели |### OAuth Flows

| Крайна точка | Метод | Описание |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[доставчик]/[действие]` | Различни | Специфичен за доставчика OAuth |### Routing & Config

| Крайна точка | Метод | Описание |
| --------------------- | -------- | ----------------------------- |
| `/api/models/alias` | ВЗЕМЕТЕ/ПУБЛИКУВАЙТЕ | Псевдоними на модели |
| `/api/models/catalog` | ВЗЕМЕТЕ | Всички модели по доставчик + тип |
| `/api/combos*` | Различни | Комбо управление |
| `/api/ключове*` | Различни | Управление на API ключове |
| `/api/pricing` | ВЗЕМЕТЕ | Моделна цена |### Usage & Analytics

| Крайна точка | Метод | Описание |
| ---------------------------- | ------ | -------------------- |
| `/api/usage/history` | ВЗЕМЕТЕ | История на използването |
| `/api/usage/logs` | ВЗЕМЕТЕ | Дневници за използване |
| `/api/usage/request-logs` | ВЗЕМЕТЕ | Дневници на ниво заявка |
| `/api/usage/[connectionId]` | ВЗЕМЕТЕ | Използване на връзка |### Settings

| Крайна точка | Метод | Описание |
| ------------------------------ | ------------- | ---------------------- |
| `/api/настройки` | ПОЛУЧАВАНЕ/ПОСТАВЯНЕ/КРЕПКА | Общи настройки |
| `/api/настройки/прокси` | ВЗЕМИ/ПОСТАВИ | Конфигурация на мрежов прокси |
| `/api/settings/proxy/test` | ПУБЛИКАЦИЯ | Тествайте прокси връзката |
| `/api/настройки/ip-филтър` | ВЗЕМИ/ПОСТАВИ | Списък с разрешени/блокирани IP адреси |
| `/api/settings/thinking-budget` | ВЗЕМИ/ПОСТАВИ | Бюджет на жетон за разсъждение |
| `/api/settings/system-prompt` | ВЗЕМИ/ПОСТАВИ | Глобална системна подкана |### Monitoring

| Крайна точка | Метод | Описание |
| ------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------- |
| `/api/сесии` | ВЗЕМЕТЕ | Проследяване на активна сесия |
| `/api/rate-limits` | ВЗЕМЕТЕ | Лимити за лихви по сметка |
| `/api/мониторинг/здраве` | ВЗЕМЕТЕ | Проверка на състоянието + резюме на доставчика (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | ПОЛУЧАВАНЕ/ИЗТРИВАНЕ | Кеш статистики / изчистване |### Backup & Export/Import

| Крайна точка | Метод | Описание |
| ---------------------------- | ------ | ----------------------------------------------- |
| `/api/db-backups` | ВЗЕМЕТЕ | Избройте наличните резервни копия |
| `/api/db-backups` | ПОСТАВЕТЕ | Създайте ръчно архивиране |
| `/api/db-backups` | ПУБЛИКАЦИЯ | Възстановяване от конкретен архив |
| `/api/db-backups/export` | ВЗЕМЕТЕ | Изтегляне на база данни като .sqlite файл |
| `/api/db-backups/import` | ПУБЛИКАЦИЯ | Качете .sqlite файл, за да замените базата данни |
| `/api/db-backups/exportAll` | ВЗЕМЕТЕ | Изтеглете пълното архивиране като .tar.gz архив |### Cloud Sync

| Крайна точка | Метод | Описание |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud` | Различни | Операции за синхронизиране в облак |
| `/api/sync/initialize` | ПУБЛИКАЦИЯ | Инициализиране на синхронизиране |
| `/api/cloud/*` | Различни | Облачно управление |### Tunnels

| Крайна точка | Метод | Описание |
| -------------------------- | ------ | --------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | ВЗЕМЕТЕ | Прочетете състоянието на инсталиране/изпълнение на Cloudflare Quick Tunnel за таблото за управление |
| `/api/tunnels/cloudflared` | ПУБЛИКАЦИЯ | Активиране или деактивиране на Cloudflare Quick Tunnel (`action=enable/disable`) |### CLI Tools

| Крайна точка | Метод | Описание |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | ВЗЕМЕТЕ | Клод CLI състояние |
| `/api/cli-tools/codex-settings` | ВЗЕМЕТЕ | Codex CLI състояние |
| `/api/cli-tools/droid-settings` | ВЗЕМЕТЕ | Droid CLI състояние |
| `/api/cli-tools/openclaw-settings` | ВЗЕМЕТЕ | OpenClaw CLI състояние |
| `/api/cli-tools/runtime/[toolId]` | ВЗЕМЕТЕ | Generic CLI runtime |

CLI отговорите включват: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Крайна точка | Метод | Описание |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/acp/agents` | ВЗЕМЕТЕ | Избройте всички открити агенти (вградени + персонализирани) със статус |
| `/api/acp/agents` | ПУБЛИКАЦИЯ | Добавете персонализиран агент или опреснете кеша за откриване |
| `/api/acp/agents` | ИЗТРИВАНЕ | Премахнете персонализиран агент чрез параметър на заявка `id` |

GET отговорът включва „агенти []“ (идентификатор, име, двоичен файл, версия, инсталиран, протокол, е Персонализиран) и „обобщение“ (общо, инсталирано, неНамерено, вградено, персонализирано).### Resilience & Rate Limits

| Крайна точка | Метод | Описание |
| ----------------------- | --------- | ------------------------------ |
| `/api/устойчивост` | ВЗЕМЕТЕ/КРЕПКА | Вземете/актуализирайте профили за устойчивост |
| `/api/resilience/reset` | ПУБЛИКАЦИЯ | Нулиране на прекъсвачи |
| `/api/rate-limits` | ВЗЕМЕТЕ | Състояние на ограничение на лимита по сметка |
| `/api/лимит на скоростта` | ВЗЕМЕТЕ | Конфигурация на глобален лимит на скоростта |### Evals

| Крайна точка | Метод | Описание |
| ------------ | -------- | ---------------------------------- |
| `/api/evals` | ВЗЕМЕТЕ/ПУБЛИКУВАЙТЕ | Избройте eval пакети / изпълнете оценка |### Policies

| Крайна точка | Метод | Описание |
| --------------- | --------------- | ----------------------- |
| `/api/policies` | ПОЛУЧАВАНЕ/ПУБЛИКУВАНЕ/ИЗТРИВАНЕ | Управление на правилата за маршрутизиране |### Compliance

| Крайна точка | Метод | Описание |
| ---------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` | ВЗЕМЕТЕ | Дневник за проверка на съответствието (последно N) |### v1beta (Gemini-Compatible)

| Крайна точка | Метод | Описание |
| -------------------------- | ------ | ---------------------------------- |
| `/v1beta/models` | ВЗЕМЕТЕ | Избройте модели във формат Gemini |
| `/v1beta/models/{...path}` | ПУБЛИКАЦИЯ | Крайна точка на Gemini `generateContent` |

Тези крайни точки отразяват API формата на Gemini за клиенти, които очакват естествена съвместимост с Gemini SDK.### Internal / System APIs

| Крайна точка | Метод | Описание |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | ВЗЕМЕТЕ | Проверка за инициализация на приложението (използва се при първото стартиране) |
| `/api/tags` | ВЗЕМЕТЕ | Тагове за модели, съвместими с Ollama (за клиенти на Ollama) |
| `/api/рестартиране` | ПУБЛИКАЦИЯ | Задейства грациозно рестартиране на сървъра |
| `/api/изключване` | ПУБЛИКАЦИЯ | Задействайте грациозно изключване на сървъра |

>**Забележка:**Тези крайни точки се използват вътрешно от системата или за съвместимост с клиента Ollama. Те обикновено не се извикват от крайните потребители.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Транскрибирайте аудио файлове с помощта на Deepgram или AssemblyAI.

**Заявка:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Отговор:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Поддържани доставчици:**`deepgram/nova-3`, `assemblyai/best`.

**Поддържани формати:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

За клиенти, които използват API формат на Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Заявките се превеждат автоматично между Ollama и вътрешни формати.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Отговор:**```json
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

1. Клиентът изпраща заявка до `/v1/*`
2. Манипулаторът на маршрута извиква `handleChat`, `handleEmbedding`, `handleAudioTranscription` или `handleImageGeneration`
3. Моделът е разрешен (директен доставчик/модел или псевдоним/комбо)
4. Идентификационни данни, избрани от локална база данни с филтриране на наличността на акаунта
5. За чат: `handleChatCore` — откриване на формат, превод, проверка на кеша, проверка на идемпотентност
6. Изпълнителят на доставчика изпраща заявка нагоре по веригата
7. Отговор, преведен обратно във формат на клиента (чат) или върнат такъв, какъвто е (вграждания/изображения/аудио)
8. Записано използване/регистриране
9. Резервният вариант се прилага при грешки според комбо правилата

Пълна справка за архитектурата: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Маршрутите на таблото за управление (`/dashboard/*`) използват бисквитка `auth_token`
- Влизането използва хеш на запазена парола; връщане към `INITIAL_PASSWORD`
- `requireLogin` може да се превключва чрез `/api/settings/require-login`
- `/v1/*` маршрутите по избор изискват Bearer API ключ, когато `REQUIRE_API_KEY=true`
