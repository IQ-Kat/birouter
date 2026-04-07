# API Reference (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Complete reference for all OmniRoute API endpoints.

---

## Table of Contents

- [Chatkompletteringar](#chat-kompletteringar)
- [Inbäddningar](#inbäddningar)
- [Bildgenerering](#bildgenerering)
- [List Models](#list-models)
- [Kompatibilitetsändpunkter](#kompatibilitetsslutpunkter)
- [Semantisk cache](#semantisk-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Autentisering](#autentisering)---

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

| Rubrik                   | Riktning | Beskrivning                                        |
| ------------------------ | -------- | -------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Begäran  | Ställ in på "true" för att kringgå cache           |
| `X-OmniRoute-Progress`   | Begäran  | Ställ in på "true" för framstegshändelser          |
| `X-Session-Id`           | Begäran  | Sticky sessionsnyckel för extern sessionsaffinitet |
| `x_session_id`           | Begäran  | Understrecksvariant accepteras också (direkt HTTP) |
| `Idempotens-nyckel`      | Begäran  | Dedup-nyckel (5s fönster)                          |
| `X-Request-Id`           | Begäran  | Alternativ dedup-nyckel                            |
| `X-OmniRoute-Cache`      | Svar     | `HIT` eller `MISS` (icke-streaming)                |
| `X-OmniRoute-Idempotent` | Svar     | "true" om deduplicerad                             |
| `X-OmniRoute-Progress`   | Svar     | "aktiverad" om förloppsspårning på                 |
| `X-OmniRoute-Session-Id` | Svar     | Effektivt sessions-ID som används av OmniRoute     |

> Nginx-notering: om du förlitar dig på understrecksrubriker (till exempel `x_session_id`), aktivera `underscores_in_headers on;`.---

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

Tillgängliga leverantörer: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Tillgängliga leverantörer: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Metod | Väg                          | Format                   |
| ----- | ---------------------------- | ------------------------ | ----------------------------- |
| POST  | `/v1/chatt/kompletteringar`  | OpenAI                   |
| POST  | `/v1/meddelanden`            | Antropisk                |
| POST  | `/v1/svar`                   | OpenAI-svar              |
| POST  | `/v1/inbäddningar`           | OpenAI                   |
| POST  | `/v1/images/generations`     | OpenAI                   |
| FÅ    | `/v1/modeller`               | OpenAI                   |
| POST  | `/v1/messages/count_tokens`  | Antropisk                |
| FÅ    | `/v1beta/modeller`           | Tvillingarna             |
| POST  | `/v1beta/models/{...sökväg}` | Gemini generera innehåll |
| POST  | `/v1/api/chat`               | Ollama                   | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Providerprefixet läggs till automatiskt om det saknas. Omatchade modeller returnerar "400".---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Exempel på svar:```json
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

| Slutpunkt | Metod | Beskrivning |
| ------------------------------ | ------- | ---------------------- |
| `/api/auth/login` | POST | Logga in |
| `/api/auth/logout` | POST | Logga ut |
| `/api/settings/require-login` | GET/PUT | Växla inloggning krävs |### Provider Management

| Slutpunkt | Metod | Beskrivning |
| ---------------------------- | --------------- | ------------------------ |
| `/api/leverantörer` | GET/POSTA | Lista / skapa leverantörer |
| `/api/providers/[id]` | GET/PUT/DELETE | Hantera en leverantör |
| `/api/providers/[id]/test` | POST | Testa leverantörsanslutning |
| `/api/providers/[id]/modeller` | FÅ | Lista leverantörsmodeller |
| `/api/providers/validate` | POST | Validera leverantörskonfiguration |
| `/api/provider-nodes*` | Olika | Leverantörsnodhantering |
| `/api/provider-models` | GET/POSTA/RADERA | Anpassade modeller |### OAuth Flows

| Slutpunkt | Metod | Beskrivning |
| ---------------------------------- | ------- | ---------------------------- |
| `/api/oauth/[leverantör]/[åtgärd]` | Olika | Leverantörsspecifik OAuth |### Routing & Config

| Slutpunkt | Metod | Beskrivning |
| ---------------------- | -------- | ------------------------------ |
| `/api/models/alias` | GET/POSTA | Modellalias |
| `/api/models/catalog` | FÅ | Alla modeller efter leverantör + typ |
| `/api/combos*` | Olika | Kombinationshantering |
| `/api/keys*` | Olika | API-nyckelhantering |
| `/api/prissättning` | FÅ | Modellprissättning |### Usage & Analytics

| Slutpunkt | Metod | Beskrivning |
| -------------------------- | ------ | -------------------- |
| `/api/användning/historik` | FÅ | Användningshistorik |
| `/api/användning/loggar` | FÅ | Användningsloggar |
| `/api/usage/request-logs` | FÅ | Loggar på begäran-nivå |
| `/api/usage/[connectionId]` | FÅ | Användning per anslutning |### Settings

| Slutpunkt | Metod | Beskrivning |
| ------------------------------------ | ------------- | ---------------------------- |
| `/api/inställningar` | GET/PUT/PATCH | Allmänna inställningar |
| `/api/inställningar/proxy` | GET/PUT | Nätverksproxykonfiguration |
| `/api/settings/proxy/test` | POST | Testa proxyanslutning |
| `/api/settings/ip-filter` | GET/PUT | IP-tillståndslista/blockeringslista |
| `/api/settings/tänkebudget` | GET/PUT | Resonera token budget |
| `/api/settings/system-prompt` | GET/PUT | Global systemprompt |### Monitoring

| Slutpunkt | Metod | Beskrivning |
| ------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `/api/sessioner` | FÅ | Aktiv sessionsspårning |
| `/api/rate-limits` | FÅ | Räntegränser per konto |
| `/api/övervakning/hälsa` | FÅ | Hälsokontroll + leverantörssammanfattning (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | HÄMTA/RADERA | Cachestatistik / rensa |### Backup & Export/Import

| Slutpunkt | Metod | Beskrivning |
| -------------------------- | ------ | ----------------------------------------------- |
| `/api/db-backups` | FÅ | Lista tillgängliga säkerhetskopior |
| `/api/db-backups` | SÄTT | Skapa en manuell säkerhetskopia |
| `/api/db-backups` | POST | Återställ från en specifik säkerhetskopia |
| `/api/db-backups/export` | FÅ | Ladda ner databas som .sqlite-fil |
| `/api/db-backups/import` | POST | Ladda upp .sqlite-fil för att ersätta databas |
| `/api/db-backups/exportAll` | FÅ | Ladda ner fullständig säkerhetskopia som .tar.gz-arkiv |### Cloud Sync

| Slutpunkt | Metod | Beskrivning |
| ---------------------------- | ------- | ---------------------- |
| `/api/sync/moln` | Olika | Molnsynkroniseringsoperationer |
| `/api/sync/initialize` | POST | Initiera synkronisering |
| `/api/moln/*` | Olika | Molnhantering |### Tunnels

| Slutpunkt | Metod | Beskrivning |
| -------------------------- | ------ | ------------------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | FÅ | Läs Cloudflare Quick Tunnel installation/körningsstatus för instrumentpanelen |
| `/api/tunnels/cloudflared` | POST | Aktivera eller inaktivera Cloudflare Quick Tunnel (`action=enable/disable`) |### CLI Tools

| Slutpunkt | Metod | Beskrivning |
| ---------------------------------- | ------ | ------------------ |
| `/api/cli-tools/claude-settings` | FÅ | Claude CLI status |
| `/api/cli-tools/codex-inställningar` | FÅ | Codex CLI-status |
| `/api/cli-tools/droid-inställningar` | FÅ | Droid CLI-status |
| `/api/cli-tools/openclaw-inställningar` | FÅ | OpenClaw CLI-status |
| `/api/cli-tools/runtime/[toolId]` | FÅ | Generisk CLI-körtid |

CLI-svar inkluderar: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Slutpunkt | Metod | Beskrivning |
| ------------------ | ------ | ------------------------------------------------------------------ |
| `/api/acp/agents` | FÅ | Lista alla upptäckta agenter (inbyggd + anpassad) med status |
| `/api/acp/agents` | POST | Lägg till anpassad agent eller uppdatera detekteringscache |
| `/api/acp/agents` | DELETE | Ta bort en anpassad agent med "id" frågeparam |

GET-svaret inkluderar `agenter[]` (id, namn, binär, version, installerad, protokoll, isCustom) och `sammanfattning` (totalt, installerat, notFound, inbyggt, anpassat).### Resilience & Rate Limits

| Slutpunkt | Metod | Beskrivning |
| ---------------------------- | ---------- | ------------------------------------ |
| `/api/resilience` | GET/PATCH | Skaffa/uppdatera resiliensprofiler |
| `/api/resilience/reset` | POST | Återställ strömbrytare |
| `/api/rate-limits` | FÅ | Räntegränsstatus per konto |
| `/api/rate-limit` | FÅ | Global hastighetsgränskonfiguration |### Evals

| Slutpunkt | Metod | Beskrivning |
| ------------ | -------- | ---------------------------------- |
| `/api/evals` | GET/POSTA | Lista utvärderingssviter / kör utvärdering |### Policies

| Slutpunkt | Metod | Beskrivning |
| --------------- | --------------- | ---------------------------- |
| `/api/policyer` | GET/POSTA/RADERA | Hantera ruttpolicyer |### Compliance

| Slutpunkt | Metod | Beskrivning |
| -------------------------- | ------ | ------------------------------ |
| `/api/compliance/audit-log` | FÅ | Granskningslogg för efterlevnad (sista N) |### v1beta (Gemini-Compatible)

| Slutpunkt | Metod | Beskrivning |
| -------------------------- | ------ | ---------------------------------- |
| `/v1beta/modeller` | FÅ | Lista modeller i Gemini-format |
| `/v1beta/models/{...sökväg}` | POST | Gemini `generateContent` slutpunkt |

Dessa slutpunkter speglar Geminis API-format för klienter som förväntar sig inbyggd Gemini SDK-kompatibilitet.### Internal / System APIs

| Slutpunkt | Metod | Beskrivning |
| --------------- | ------ | ------------------------------------------------------------ |
| `/api/init` | FÅ | Applikationsinitieringskontroll (används vid första körningen) |
| `/api/taggar` | FÅ | Ollama-kompatibla modelltaggar (för Ollama-klienter) |
| `/api/restart` | POST | Utlösa graciös serveromstart |
| `/api/shutdown` | POST | Utlösa graciös serveravstängning |

>**Obs:**Dessa slutpunkter används internt av systemet eller för Ollama-klientkompatibilitet. De anropas vanligtvis inte av slutanvändare.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transkribera ljudfiler med Deepgram eller AssemblyAI.

**Begäran:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Svar:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Leverantörer som stöds:**`deepgram/nova-3`, `assemblyai/bästa`.

**Format som stöds:**"mp3", "wav", "m4a", "flac", "ogg", "webm".---

## Ollama Compatibility

För klienter som använder Ollamas API-format:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Förfrågningar översätts automatiskt mellan Ollama och interna format.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Svar:**```json
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

1. Klienten skickar begäran till `/v1/*`
2. Rutthanteraren anropar 'handleChat', 'handleEmbedding', 'handleAudioTranscription' eller 'handleImageGeneration'
3. Modellen är löst (direkt leverantör/modell eller alias/kombo)
4. Inloggningsuppgifter valda från lokal DB med filtrering av kontotillgänglighet
5. För chatt: `handleChatCore` — formatdetektering, översättning, cachekontroll, idempotenskontroll
6. Leverantörs exekutor skickar uppströmsbegäran
7. Svar översatt till klientformat (chatt) eller returnerat som det är (inbäddningar/bilder/ljud)
8. Användning/loggning registrerad
9. Fallback gäller vid fel enligt komboregler

Fullständig arkitekturreferens: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Dashboard-rutter (`/dashboard/*`) använder en `auth_token`-cookie
- Inloggning använder sparad lösenordshash; reserv till `INITIAL_PASSWORD`
- `requireLogin` kan växlas via `/api/settings/require-login`
- `/v1/*`-rutter kräver valfritt Bearer API-nyckel när `REQUIRE_API_KEY=true`
