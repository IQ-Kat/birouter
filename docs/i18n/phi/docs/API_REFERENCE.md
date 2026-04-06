# API Reference (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Kumpletong sanggunian para sa lahat ng endpoint ng OmniRoute API.---

## Table of Contents

- [Mga Pagkumpleto sa Chat](#chat-completions)
- [Mga Embedding](#embeddings)
- [Pagbuo ng Larawan](#pagbuo ng larawan)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard at Pamamahala](#dashboard--pamamahala)
- [Pagproseso ng Kahilingan](#request-processing)
- [Authentication](#authentication)---

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

| Header                   | Direksyon  | Paglalarawan                                                 |
| ------------------------ | ---------- | ------------------------------------------------------------ |
| `X-OmniRoute-No-Cache`   | Kahilingan | Itakda sa `true` para i-bypass ang cache                     |
| `X-OmniRoute-Progress`   | Kahilingan | Itakda sa `true` para sa mga kaganapan sa pag-unlad          |
| `X-Session-Id`           | Kahilingan | Malagkit na session key para sa external na session affinity |
| `x_session_id`           | Kahilingan | Tinanggap din ang variant ng underscore (direktang HTTP)     |
| `Idempotency-Key`        | Kahilingan | Dedup key (5s window)                                        |
| `X-Request-Id`           | Kahilingan | Alternatibong susi sa pagtanggal                             |
| `X-OmniRoute-Cache`      | Tugon      | `HIT` o `MISS` (non-streaming)                               |
| `X-OmniRoute-Idempotent` | Tugon      | `true` kung i-deduplicate                                    |
| `X-OmniRoute-Progress`   | Tugon      | `enabled` kung ang pagsubaybay sa pag-usad sa                |
| `X-OmniRoute-Session-Id` | Tugon      | Epektibong session ID na ginagamit ng OmniRoute              |

> Nginx note: kung umaasa ka sa mga underscore na header (halimbawa `x_session_id`), paganahin ang `underscores_in_headers on;`.---

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

Mga available na provider: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Mga available na provider: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Paraan | Landas                      | Format                 |
| ------ | --------------------------- | ---------------------- | ----------------------------- |
| POST   | `/v1/chat/completions`      | OpenAI                 |
| POST   | `/v1/mensahe`               | Antropiko              |
| POST   | `/v1/mga tugon`             | Mga Tugon sa OpenAI    |
| POST   | `/v1/embeddings`            | OpenAI                 |
| POST   | `/v1/images/generations`    | OpenAI                 |
| KUMUHA | `/v1/mga modelo`            | OpenAI                 |
| POST   | `/v1/messages/count_tokens` | Antropiko              |
| KUMUHA | `/v1beta/mga modelo`        | Gemini                 |
| POST   | `/v1beta/models/{...path}`  | Gemini generateContent |
| POST   | `/v1/api/chat`              | Ollama                 | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Ang prefix ng provider ay awtomatikong idinaragdag kung nawawala. Ang mga hindi tugmang modelo ay nagbabalik ng `400`.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Halimbawa ng tugon:```json
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

| Endpoint | Paraan | Paglalarawan |
| ----------------------------- | ------- | ---------------------- |
| `/api/auth/login` | POST | Mag-login |
| `/api/auth/logout` | POST | Logout |
| `/api/settings/require-login` | GET/PUT | Kailangang i-toggle ang pag-login |### Provider Management

| Endpoint | Paraan | Paglalarawan |
| ---------------------------- | --------------- | ------------------------- |
| `/api/providers` | GET/POST | Maglista / gumawa ng mga provider |
| `/api/providers/[id]` | GET/PUT/DELETE | Pamahalaan ang isang provider |
| `/api/providers/[id]/test` | POST | Subukan ang koneksyon ng provider |
| `/api/providers/[id]/models` | KUMUHA | Maglista ng mga modelo ng provider |
| `/api/providers/validate` | POST | I-validate ang config ng provider |
| `/api/provider-nodes*` | Iba't ibang | Pamamahala ng node ng provider |
| `/api/provider-models` | GET/POST/DELETE | Mga custom na modelo |### OAuth Flows

| Endpoint | Paraan | Paglalarawan |
| -------------------------------- | ------- | ------------------------ |
| `/api/oauth/[provider]/[action]` | Iba't ibang | OAuth na partikular sa provider |### Routing & Config

| Endpoint | Paraan | Paglalarawan |
| ---------------------- | -------- | ----------------------------- |
| `/api/models/alias` | GET/POST | Mga alyas ng modelo |
| `/api/models/catalog` | KUMUHA | Lahat ng modelo ayon sa provider + uri |
| `/api/combos*` | Iba't ibang | Pamamahala ng combo |
| `/api/keys*` | Iba't ibang | Pamamahala ng key ng API |
| `/api/pricing` | KUMUHA | Pagpepresyo ng modelo |### Usage & Analytics

| Endpoint | Paraan | Paglalarawan |
| --------------------------- | ------ | -------------------- |
| `/api/usage/history` | KUMUHA | Kasaysayan ng paggamit |
| `/api/usage/logs` | KUMUHA | Mga log ng paggamit |
| `/api/usage/request-logs` | KUMUHA | Mga log sa antas ng kahilingan |
| `/api/usage/[connectionId]` | KUMUHA | Paggamit sa bawat koneksyon |### Settings

| Endpoint | Paraan | Paglalarawan |
| ------------------------------- | ------------- | ----------------------- |
| `/api/setting` | GET/PUT/PATCH | Mga pangkalahatang setting |
| `/api/setting/proxy` | GET/PUT | Network proxy config |
| `/api/settings/proxy/test` | POST | Subukan ang proxy na koneksyon |
| `/api/settings/ip-filter` | GET/PUT | IP allowlist/blocklist |
| `/api/settings/thinking-budget` | GET/PUT | Rasoning token budget |
| `/api/setting/system-prompt` | GET/PUT | Global system prompt |### Monitoring

| Endpoint | Paraan | Paglalarawan |
| ------------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `/api/sessions` | KUMUHA | Aktibong pagsubaybay sa session |
| `/api/rate-limits` | KUMUHA | Mga limitasyon sa rate ng bawat account |
| `/api/monitoring/health` | KUMUHA | Pagsusuri sa kalusugan + buod ng provider (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | GET/DELETE | Mga istatistika ng cache / i-clear |### Backup & Export/Import

| Endpoint | Paraan | Paglalarawan |
| --------------------------- | ------ | --------------------------------------- |
| `/api/db-backups` | KUMUHA | Maglista ng mga available na backup |
| `/api/db-backups` | ILAGAY | Gumawa ng manu-manong backup |
| `/api/db-backups` | POST | Ibalik mula sa isang partikular na backup |
| `/api/db-backups/export` | KUMUHA | I-download ang database bilang .sqlite file |
| `/api/db-backups/import` | POST | Mag-upload ng .sqlite file upang palitan ang database |
| `/api/db-backups/exportAll` | KUMUHA | I-download ang buong backup bilang .tar.gz archive |### Cloud Sync

| Endpoint | Paraan | Paglalarawan |
| ----------------------- | ------- | ---------------------- |
| `/api/sync/cloud` | Iba't ibang | Mga pagpapatakbo ng cloud sync |
| `/api/sync/initialize` | POST | Simulan ang pag-sync |
| `/api/cloud/*` | Iba't ibang | Pamamahala ng ulap |### Tunnels

| Endpoint | Paraan | Paglalarawan |
| -------------------------- | ------ | ---------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | KUMUHA | Basahin ang Cloudflare Quick Tunnel install/runtime status para sa dashboard |
| `/api/tunnels/cloudflared` | POST | Paganahin o huwag paganahin ang Cloudflare Quick Tunnel (`action=enable/disable`) |### CLI Tools

| Endpoint | Paraan | Paglalarawan |
| ------------------------------------ | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | KUMUHA | Claude CLI status |
| `/api/cli-tools/codex-settings` | KUMUHA | Katayuan ng Codex CLI |
| `/api/cli-tools/droid-settings` | KUMUHA | Katayuan ng Droid CLI |
| `/api/cli-tools/openclaw-settings` | KUMUHA | Katayuan ng OpenClaw CLI |
| `/api/cli-tools/runtime/[toolId]` | KUMUHA | Generic na CLI runtime |

Kasama sa mga tugon ng CLI ang: `naka-install`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Endpoint | Paraan | Paglalarawan |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/acp/agents` | KUMUHA | Ilista ang lahat ng nakitang ahente (built-in + custom) na may status |
| `/api/acp/agents` | POST | Magdagdag ng custom na ahente o i-refresh ang detection cache |
| `/api/acp/agents` | TANGGALIN | Mag-alis ng custom na ahente sa pamamagitan ng `id` query param |

Kasama sa tugon ng GET ang `mga ahente[]` (id, pangalan, binary, bersyon, naka-install, protocol, isCustom) at `buod` (kabuuan, naka-install, hindi nahanap, builtIn, custom).### Resilience & Rate Limits

| Endpoint | Paraan | Paglalarawan |
| ------------------------ | --------- | ------------------------------- |
| `/api/resilience` | GET/PATCH | Kumuha/mag-update ng mga profile ng resilience |
| `/api/resilience/reset` | POST | I-reset ang mga circuit breaker |
| `/api/rate-limits` | KUMUHA | Katayuan ng limitasyon sa rate ng bawat account |
| `/api/rate-limit` | KUMUHA | Pagsasaayos ng limitasyon sa pandaigdigang rate |### Evals

| Endpoint | Paraan | Paglalarawan |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | GET/POST | Maglista ng mga eval suite / run evaluation |### Policies

| Endpoint | Paraan | Paglalarawan |
| --------------- | --------------- | ------------------------ |
| `/api/policies` | GET/POST/DELETE | Pamahalaan ang mga patakaran sa pagruruta |### Compliance

| Endpoint | Paraan | Paglalarawan |
| --------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` | KUMUHA | Log ng audit ng pagsunod (huling N) |### v1beta (Gemini-Compatible)

| Endpoint | Paraan | Paglalarawan |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/mga modelo` | KUMUHA | Listahan ng mga modelo sa Gemini format |
| `/v1beta/models/{...path}` | POST | Gemini `generateContent` endpoint |

Ang mga endpoint na ito ay sumasalamin sa format ng API ng Gemini para sa mga kliyenteng umaasa sa native na Gemini SDK compatibility.### Internal / System APIs

| Endpoint | Paraan | Paglalarawan |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | KUMUHA | Pagsusuri sa pagsisimula ng application (ginamit sa unang pagtakbo) |
| `/api/tags` | KUMUHA | Mga tag ng modelong katugma sa Ollama (para sa mga kliyente ng Ollama) |
| `/api/restart` | POST | I-trigger ang magandang pag-restart ng server |
| `/api/shutdown` | POST | Mag-trigger ng magandang pag-shutdown ng server |

>**Tandaan:**Ang mga endpoint na ito ay panloob na ginagamit ng system o para sa Ollama client compatibility. Hindi sila karaniwang tinatawag ng mga end user.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

I-transcribe ang mga audio file gamit ang Deepgram o AssemblyAI.

**Kahilingan:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Tugon:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Mga sinusuportahang provider:**`deepgram/nova-3`, `assemblyai/best`.

**Mga sinusuportahang format:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Para sa mga kliyenteng gumagamit ng format ng API ng Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Awtomatikong isinasalin ang mga kahilingan sa pagitan ng Ollama at mga panloob na format.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Tugon:**```json
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

1. Nagpapadala ang kliyente ng kahilingan sa `/v1/*`
2. Tumatawag ang tagapangasiwa ng ruta ng `handleChat`, `handleEmbedding`, `handleAudioTranscription`, o `handleImageGeneration`
3. Nalutas ang modelo (direktang provider/modelo o alias/combo)
4. Pinili ang mga kredensyal mula sa lokal na DB na may pagsasala ng availability ng account
5. Para sa chat: `handleChatCore` — format detection, translation, cache check, idempotency check
6. Nagpapadala ang tagapagpatupad ng provider ng upstream na kahilingan
7. Ang tugon ay isinalin pabalik sa format ng kliyente (chat) o ibinalik sa dati (mga pag-embed/mga larawan/audio)
8. Naitala ang paggamit/pag-log
9. Nalalapat ang Fallback sa mga error ayon sa combo rules

Buong sanggunian sa arkitektura: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Gumagamit ang mga ruta ng dashboard (`/dashboard/*`) ng cookie ng `auth_token`
- Gumagamit ang pag-login ng naka-save na hash ng password; fallback sa `INITIAL_PASSWORD`
- `requireLogin` toggleable sa pamamagitan ng `/api/settings/require-login`
- Opsyonal na nangangailangan ang mga ruta ng `/v1/*` ng Bearer API key kapag `REQUIRE_API_KEY=true`
