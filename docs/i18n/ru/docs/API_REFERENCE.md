# API Reference (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Полный справочник по всем конечным точкам API OmniRoute.---

## Table of Contents

- [Завершения чата](#chat-complements)
- [Встраивания](#встраивания)
- [Генерация изображения](#image-generation)
- [Список моделей](#list-models)
- [Конечные точки совместимости](#compatibility-endpoints)
- [Семантический кэш](#semantic-cache)
- [Панель управления и управление](#dashboard--management)
- [Обработка запроса](#request-processing)
- [Аутентификация](#аутентификация)---

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

| Заголовок                | Направление | Описание                                                 |
| ------------------------ | ----------- | -------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Запрос      | Установите значение true для обхода кэша                 |
| `X-OmniRoute-Прогресс`   | Запрос      | Установите значение true для событий хода выполнения     |
| `X-Session-Id`           | Запрос      | Закрепленный сеансовый ключ для привязки внешнего сеанса |
| `x_session_id`           | Запрос      | Также принимается вариант с подчеркиванием (прямой HTTP) |
| `Идемпотентный ключ`     | Запрос      | Ключ дедупликации (окно 5s)                              |
| `X-Request-Id`           | Запрос      | Альтернативный ключ дедупликации                         |
| `X-OmniRoute-Cache`      | Ответ       | `HIT` или `MISS` (без потоковой передачи)                |
| `X-OmniRoute-Идемпотент` | Ответ       | `true`, если дедуплицировано                             |
| `X-OmniRoute-Прогресс`   | Ответ       | `включено`, если отслеживание прогресса включено         |
| `X-OmniRoute-Session-Id` | Ответ       | Эффективный идентификатор сеанса, используемый OmniRoute |

> Примечание Nginx: если вы используете заголовки подчеркивания (например, `x_session_id`), включите `underscores_in_headers on;`.---

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

Доступные провайдеры: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Доступные провайдеры: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Метод    | Путь                        | Формат                   |
| -------- | --------------------------- | ------------------------ | ----------------------------- |
| ПОСТ     | `/v1/чат/завершения`        | ОпенАИ                   |
| ПОСТ     | `/v1/сообщения`             | Антропный                |
| ПОСТ     | `/v1/ответы`                | Ответы OpenAI            |
| ПОСТ     | `/v1/вложения`              | ОпенАИ                   |
| ПОСТ     | `/v1/images/generations`    | ОпенАИ                   |
| ПОЛУЧИТЬ | `/v1/модели`                | ОпенАИ                   |
| ПОСТ     | `/v1/messages/count_tokens` | Антропный                |
| ПОЛУЧИТЬ | `/v1beta/модели`            | Близнецы                 |
| ПОСТ     | `/v1beta/models/{...path}`  | Близнецы создают контент |
| ПОСТ     | `/v1/api/chat`              | Оллама                   | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Префикс провайдера добавляется автоматически, если он отсутствует. Несовпадающие модели возвращают «400».---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Пример ответа:```json
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

| Конечная точка | Метод | Описание |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/login` | ПОСТ | Войти |
| `/api/auth/выход` | ПОСТ | Выйти |
| `/api/settings/require-login` | ПОЛУЧИТЬ/ПОСТАВИТЬ | Переключить требуется вход |### Provider Management

| Конечная точка | Метод | Описание |
| ---------------------------- | --------------- | ------------------------ |
| `/api/providers` | ПОЛУЧИТЬ/ОТПРАВИТЬ | Список/создание поставщиков |
| `/api/providers/[id]` | ПОЛУЧИТЬ/ПОСТАВИТЬ/УДАЛИТЬ | Управление провайдером |
| `/api/providers/[id]/test` | ПОСТ | Проверка подключения к провайдеру |
| `/api/providers/[id]/models` | ПОЛУЧИТЬ | Список моделей поставщиков |
| `/api/providers/validate` | ПОСТ | Проверка конфигурации провайдера |
| `/api/provider-nodes*` | Разное | Управление узлами провайдера |
| `/api/provider-models` | ПОЛУЧИТЬ/ОТПРАВИТЬ/УДАЛИТЬ | Нестандартные модели |### OAuth Flows

| Конечная точка | Метод | Описание |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[поставщик]/[действие]` | Разное | OAuth для конкретного поставщика |### Routing & Config

| Конечная точка | Метод | Описание |
| --------------------- | -------- | ----------------------------- |
| `/api/models/alias` | ПОЛУЧИТЬ/ОТПРАВИТЬ | Псевдонимы моделей |
| `/api/models/catalog` | ПОЛУЧИТЬ | Все модели по поставщику + типу |
| `/api/combos*` | Разное | Комбинированное управление |
| `/api/keys*` | Разное | Управление ключами API |
| `/api/pricing` | ПОЛУЧИТЬ | Цены на модели |### Usage & Analytics

| Конечная точка | Метод | Описание |
| --------------------------- | ------ | -------------------- |
| `/api/usage/история` | ПОЛУЧИТЬ | История использования |
| `/api/usage/logs` | ПОЛУЧИТЬ | Журналы использования |
| `/api/usage/request-logs` | ПОЛУЧИТЬ | Журналы уровня запроса |
| `/api/usage/[connectionId]` | ПОЛУЧИТЬ | Использование для каждого соединения |### Settings

| Конечная точка | Метод | Описание |
| ------------------------------- | ------------- | ---------------------- |
| `/api/settings` | ПОЛУЧИТЬ/ПОСТАВИТЬ/ИСПРАВИТЬ | Общие настройки |
| `/api/settings/proxy` | ПОЛУЧИТЬ/ПОСТАВИТЬ | Конфигурация сетевого прокси |
| `/api/settings/proxy/test` | ПОСТ | Проверить прокси-соединение |
| `/api/settings/ip-filter` | ПОЛУЧИТЬ/ПОСТАВИТЬ | Список разрешенных/блокированных IP-адресов |
| `/api/settings/thinking-budget` | ПОЛУЧИТЬ/ПОСТАВИТЬ | Обоснование бюджета жетона |
| `/api/settings/system-prompt` | ПОЛУЧИТЬ/ПОСТАВИТЬ | Глобальная системная подсказка |### Monitoring

| Конечная точка | Метод | Описание |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------- |
| `/api/сессии` | ПОЛУЧИТЬ | Отслеживание активных сессий |
| `/api/rate-limits` | ПОЛУЧИТЬ | Ограничения ставок для каждого аккаунта |
| `/api/monitoring/health` | ПОЛУЧИТЬ | Проверка работоспособности + сводка поставщика (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | ПОЛУЧИТЬ/УДАЛИТЬ | Статистика кэша / очистить |### Backup & Export/Import

| Конечная точка | Метод | Описание |
| --------------------------- | ------ | --------------------------------------- |
| `/api/db-backups` | ПОЛУЧИТЬ | Список доступных резервных копий |
| `/api/db-backups` | ПУТЬ | Создайте резервную копию вручную |
| `/api/db-backups` | ПОСТ | Восстановление из определенной резервной копии |
| `/api/db-backups/export` | ПОЛУЧИТЬ | Загрузить базу данных в виде файла .sqlite |
| `/api/db-backups/import` | ПОСТ | Загрузите файл .sqlite для замены базы данных |
| `/api/db-backups/exportAll` | ПОЛУЧИТЬ | Загрузите полную резервную копию в виде архива .tar.gz |### Cloud Sync

| Конечная точка | Метод | Описание |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud` | Разное | Операции облачной синхронизации |
| `/api/sync/initialize` | ПОСТ | Инициализировать синхронизацию |
| `/api/cloud/*` | Разное | Облачное управление |### Tunnels

| Конечная точка | Метод | Описание |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | ПОЛУЧИТЬ | Прочитайте статус установки/работы Cloudflare Quick Tunnel для панели мониторинга |
| `/api/tunnels/cloudflared` | ПОСТ | Включить или отключить быстрый туннель Cloudflare (`action=enable/disable`) |### CLI Tools

| Конечная точка | Метод | Описание |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | ПОЛУЧИТЬ | Статус Клода CLI |
| `/api/cli-tools/codex-settings` | ПОЛУЧИТЬ | Статус CLI Кодекса |
| `/api/cli-tools/droid-settings` | ПОЛУЧИТЬ | Статус Droid CLI |
| `/api/cli-tools/openclaw-settings` | ПОЛУЧИТЬ | Статус OpenClaw CLI |
| `/api/cli-tools/runtime/[toolId]` | ПОЛУЧИТЬ | Общая среда выполнения CLI |

Ответы CLI включают: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Конечная точка | Метод | Описание |
| ----------------- | ------ | ---------------------------------------- |
| `/api/acp/агенты` | ПОЛУЧИТЬ | Список всех обнаруженных агентов (встроенных и пользовательских) со статусом |
| `/api/acp/агенты` | ПОСТ | Добавьте собственный агент или обновите кэш обнаружения |
| `/api/acp/агенты` | УДАЛИТЬ | Удаление пользовательского агента по параметру запроса `id` |

Ответ GET включает агенты[](идентификатор, имя, двоичный файл, версию, установленный, протокол, isCustom) и сводку (всего, установленных, не найденных, встроенных, пользовательских).### Resilience & Rate Limits

| Конечная точка | Метод | Описание |
| ----------------------- | --------- | ------------------------------- |
| `/api/устойчивость` | ПОЛУЧИТЬ/ИСПРАВИТЬ | Получить/обновить профили устойчивости |
| `/api/resilience/reset` | ПОСТ | Сброс автоматических выключателей |
| `/api/rate-limits` | ПОЛУЧИТЬ | Статус ограничения ставки для каждого аккаунта |
| `/api/rate-limit` | ПОЛУЧИТЬ | Конфигурация глобального ограничения скорости |### Evals

| Конечная точка | Метод | Описание |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | ПОЛУЧИТЬ/ОТПРАВИТЬ | Получение списка пакетов оценки / запуск оценки |### Policies

| Конечная точка | Метод | Описание |
| --------------- | --------------- | ----------------------- |
| `/api/policies` | ПОЛУЧИТЬ/ОТПРАВИТЬ/УДАЛИТЬ | Управление политиками маршрутизации |### Compliance

| Конечная точка | Метод | Описание |
| --------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` | ПОЛУЧИТЬ | Журнал аудита соответствия (последний N) |### v1beta (Gemini-Compatible)

| Конечная точка | Метод | Описание |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/модели` | ПОЛУЧИТЬ | Список моделей в формате Gemini |
| `/v1beta/models/{...path}` | ПОСТ | Конечная точка Gemini `generateContent` |

Эти конечные точки отражают формат API Gemini для клиентов, которым требуется встроенная совместимость с Gemini SDK.### Internal / System APIs

| Конечная точка | Метод | Описание |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | ПОЛУЧИТЬ | Проверка инициализации приложения (используется при первом запуске) |
| `/api/tags` | ПОЛУЧИТЬ | Теги моделей, совместимые с Ollama (для клиентов Ollama) |
| `/api/restart` | ПОСТ | Запустить плавный перезапуск сервера |
| `/api/shutdown` | ПОСТ | Запустить корректное завершение работы сервера |

>**Примечание.**Эти конечные точки используются внутри системы или для совместимости с клиентом Ollama. Обычно они не вызываются конечными пользователями.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Транскрибируйте аудиофайлы с помощью Deepgram или AssemblyAI.

**Запрос:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Ответ:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Поддерживаемые поставщики:**`deepgram/nova-3`, `assemblyai/best`.

**Поддерживаемые форматы:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Для клиентов, использующих формат API Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Запросы автоматически переводятся между Олламой и внутренними форматами.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Ответ:**```json
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

1. Клиент отправляет запрос `/v1/*`
2. Обработчик маршрута вызывает handleChat, handleEmbedding, handleAudioTranscription или handleImageGeneration.
3. Модель разрешена (прямой поставщик/модель или псевдоним/комбо)
4. Учетные данные, выбранные из локальной базы данных с фильтрацией доступности учетной записи.
5. Для чата: `handleChatCore` — определение формата, трансляция, проверка кэша, проверка идемпотентности.
6. Исполнитель провайдера отправляет восходящий запрос.
7. Ответ переводится обратно в формат клиента (чат) или возвращается в исходном виде (встраивания/изображения/аудио).
8. Запись использования/регистрации
9. Резервный вариант применяется при ошибках в соответствии с правилами комбо.

Полная ссылка на архитектуру: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Маршруты информационной панели (`/dashboard/*`) используют файл cookie `auth_token`.
- Для входа используется сохраненный хеш пароля; возврат к `INITIAL_PASSWORD`
- `requireLogin` переключается через `/api/settings/require-login`
- Для маршрутов `/v1/*` опционально требуется ключ Bearer API, если `REQUIRE_API_KEY=true`
