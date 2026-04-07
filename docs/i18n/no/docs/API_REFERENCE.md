# API Reference (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Fullstendig referanse for alle OmniRoute API-endepunkter.---

## Table of Contents

- [Chatfullføringer](#chat-fullføringer)
- [Innebygginger](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Kompatibilitetsendepunkter](#kompatibilitetsendepunkter)
- [Semantisk buffer](#semantisk-cache)
- [Dashboard og administrasjon](#dashboard--administrasjon)
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

| Overskrift               | Retning     | Beskrivelse                                      |
| ------------------------ | ----------- | ------------------------------------------------ |
| `X-OmniRoute-No-Cache`   | Forespørsel | Sett til "true" for å omgå cache                 |
| `X-OmniRoute-Progress`   | Forespørsel | Sett til "true" for fremdriftshendelser          |
| `X-Session-Id`           | Forespørsel | Klistret øktnøkkel for ekstern økttilhørighet    |
| `x_session_id`           | Forespørsel | Understrekvariant aksepteres også (direkte HTTP) |
| `Idempotens-nøkkel`      | Forespørsel | Dedup-nøkkel (5s-vindu)                          |
| `X-Request-Id`           | Forespørsel | Alternativ dedup-nøkkel                          |
| `X-OmniRoute-Cache`      | Svar        | `HIT` eller `MISS` (ikke-streaming)              |
| `X-OmniRoute-Idempotent` | Svar        | «true» hvis deduplisert                          |
| `X-OmniRoute-Progress`   | Svar        | "aktivert" hvis fremdriftssporing på             |
| `X-OmniRoute-Session-Id` | Svar        | Effektiv økt-ID brukt av OmniRoute               |

> Nginx-merknad: Hvis du stoler på understrek-overskrifter (for eksempel `x_session_id`), aktiver `underscores_in_headers on;`.---

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

Tilgjengelige leverandører: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Tilgjengelige leverandører: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Metode  | Sti                         | Format                 |
| ------- | --------------------------- | ---------------------- | ----------------------------- |
| INNLEGG | `/v1/chat/fullføringer`     | OpenAI                 |
| INNLEGG | `/v1/meldinger`             | Antropisk              |
| INNLEGG | `/v1/responses`             | OpenAI-svar            |
| INNLEGG | `/v1/embeddings`            | OpenAI                 |
| INNLEGG | `/v1/bilder/generasjoner`   | OpenAI                 |
| FÅ      | `/v1/modeller`              | OpenAI                 |
| INNLEGG | `/v1/messages/count_tokens` | Antropisk              |
| FÅ      | `/v1beta/modeller`          | Tvillingene            |
| INNLEGG | `/v1beta/models/{...bane}`  | Gemini generer innhold |
| INNLEGG | `/v1/api/chat`              | Ollama                 | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Leverandørprefikset blir automatisk lagt til hvis det mangler. Umatchede modeller returnerer `400`.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Eksempel på svar:```json
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

| Endepunkt | Metode | Beskrivelse |
| ------------------------------ | ------- | ---------------------- |
| `/api/auth/login` | INNLEGG | Logg inn |
| `/api/auth/logout` | INNLEGG | Logg ut |
| `/api/settings/require-login` | GET/SETT | Bytt innlogging kreves |### Provider Management

| Endepunkt | Metode | Beskrivelse |
| ---------------------------- | --------------- | -------------------------- |
| `/api/leverandører` | GET/POST | Liste / opprette leverandører |
| `/api/providers/[id]` | GET/SETT/SLETT | Administrer en leverandør |
| `/api/providers/[id]/test` | INNLEGG | Test leverandørtilkobling |
| `/api/providers/[id]/modeller` | FÅ | Liste leverandørmodeller |
| `/api/providers/validate` | INNLEGG | Valider leverandørkonfigurasjon |
| `/api/provider-nodes*` | Diverse | Leverandørnodeadministrasjon |
| `/api/leverandør-modeller` | GET/POST/SLETT | Egendefinerte modeller |### OAuth Flows

| Endepunkt | Metode | Beskrivelse |
| ---------------------------------- | ------- | ---------------------------- |
| `/api/oauth/[leverandør]/[handling]` | Diverse | Leverandørspesifikk OAuth |### Routing & Config

| Endepunkt | Metode | Beskrivelse |
| ---------------------- | -------- | ------------------------------ |
| `/api/modeller/alias` | GET/POST | Modellaliaser |
| `/api/modeller/katalog` | FÅ | Alle modeller etter leverandør + type |
| `/api/combos*` | Diverse | Combo management |
| `/api/keys*` | Diverse | API-nøkkelstyring |
| `/api/prising` | FÅ | Modellprising |### Usage & Analytics

| Endepunkt | Metode | Beskrivelse |
| -------------------------- | ------ | -------------------- |
| `/api/bruk/historie` | FÅ | Brukshistorikk |
| `/api/bruk/logger` | FÅ | Brukslogger |
| `/api/usage/request-logs` | FÅ | Logger på forespørselsnivå |
| `/api/usage/[connectionId]` | FÅ | Bruk per tilkobling |### Settings

| Endepunkt | Metode | Beskrivelse |
| -------------------------------------- | ------------- | ---------------------------- |
| `/api/innstillinger` | GET/PUT/PATCH | Generelle innstillinger |
| `/api/settings/proxy` | GET/SETT | Nettverks proxy-konfigurasjon |
| `/api/settings/proxy/test` | INNLEGG | Test proxy-tilkobling |
| `/api/settings/ip-filter` | GET/SETT | IP-godkjenningsliste/blokkeringsliste |
| `/api/settings/tenkebudsjett` | GET/SETT | Begrunnelse token budsjett |
| `/api/settings/system-prompt` | GET/SETT | Global systemmelding |### Monitoring

| Endepunkt | Metode | Beskrivelse |
| -------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| `/api/sessions` | FÅ | Aktiv øktsporing |
| `/api/rate-limits` | FÅ | Satsgrenser per konto |
| `/api/overvåking/helse` | FÅ | Helsesjekk + leverandørsammendrag (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/statistikk` | FÅ/SLETT | Bufferstatistikk / slett |### Backup & Export/Import

| Endepunkt | Metode | Beskrivelse |
| -------------------------- | ------ | ----------------------------------------------- |
| `/api/db-backups` | FÅ | Liste tilgjengelige sikkerhetskopier |
| `/api/db-backups` | PUT | Lag en manuell sikkerhetskopi |
| `/api/db-backups` | INNLEGG | Gjenopprett fra en bestemt sikkerhetskopi |
| `/api/db-backups/export` | FÅ | Last ned database som .sqlite-fil |
| `/api/db-backups/import` | INNLEGG | Last opp .sqlite-fil for å erstatte databasen |
| `/api/db-backups/exportAll` | FÅ | Last ned full sikkerhetskopi som .tar.gz-arkiv |### Cloud Sync

| Endepunkt | Metode | Beskrivelse |
| ---------------------------- | ------- | ---------------------- |
| `/api/sync/cloud` | Diverse | Skysynkroniseringsoperasjoner |
| `/api/sync/initialize` | INNLEGG | Initialiser synkronisering |
| `/api/cloud/*` | Diverse | Cloud management |### Tunnels

| Endepunkt | Metode | Beskrivelse |
| -------------------------- | ------ | ------------------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | FÅ | Les Cloudflare Quick Tunnel installasjons-/kjøringsstatus for dashbordet |
| `/api/tunnels/cloudflared` | INNLEGG | Aktiver eller deaktiver Cloudflare Quick Tunnel (`action=enable/disable`) |### CLI Tools

| Endepunkt | Metode | Beskrivelse |
| ---------------------------------- | ------ | ------------------ |
| `/api/cli-tools/claude-settings` | FÅ | Claude CLI status |
| `/api/cli-tools/codex-settings` | FÅ | Codex CLI-status |
| `/api/cli-tools/droid-settings` | FÅ | Droid CLI-status |
| `/api/cli-tools/openclaw-settings` | FÅ | OpenClaw CLI-status |
| `/api/cli-tools/runtime/[toolId]` | FÅ | Generisk CLI kjøretid |

CLI-svar inkluderer: "installert", "kjørbar", "kommando", "kommandoPath", "runtimeMode", "reason".### ACP Agents

| Endepunkt | Metode | Beskrivelse |
| ------------------ | ------ | ---------------------------------------------------------- |
| `/api/acp/agents` | FÅ | Liste alle oppdagede agenter (innebygd + tilpasset) med status |
| `/api/acp/agents` | INNLEGG | Legg til egendefinert agent eller oppdater deteksjonsbuffer |
| `/api/acp/agents` | SLETT | Fjern en egendefinert agent ved "id" spørringsparam |

GET-svar inkluderer `agenter[]` (id, navn, binær, versjon, installert, protokoll, isCustom) og `sammendrag` (totalt, installert, notFound, innebygd, tilpasset).### Resilience & Rate Limits

| Endepunkt | Metode | Beskrivelse |
| ---------------------------- | ---------- | -------------------------------------- |
| `/api/resilience` | GET/PATCH | Få/oppdater resiliensprofiler |
| `/api/resilience/reset` | INNLEGG | Tilbakestill effektbrytere |
| `/api/rate-limits` | FÅ | Satsgrensestatus per konto |
| `/api/rate-limit` | FÅ | Global rategrensekonfigurasjon |### Evals

| Endepunkt | Metode | Beskrivelse |
| ------------ | -------- | ---------------------------------- |
| `/api/evals` | GET/POST | List eval suiter / kjør evaluering |### Policies

| Endepunkt | Metode | Beskrivelse |
| --------------- | --------------- | ---------------------------- |
| `/api/policyer` | GET/POST/SLETT | Administrer rutingpolicyer |### Compliance

| Endepunkt | Metode | Beskrivelse |
| -------------------------- | ------ | ------------------------------ |
| `/api/compliance/audit-log` | FÅ | Overholdelsesrevisjonslogg (siste N) |### v1beta (Gemini-Compatible)

| Endepunkt | Metode | Beskrivelse |
| -------------------------- | ------ | ---------------------------------- |
| `/v1beta/modeller` | FÅ | Vis modeller i Gemini-format |
| `/v1beta/models/{...bane}` | INNLEGG | Gemini `generateContent`-endepunkt |

Disse endepunktene gjenspeiler Geminis API-format for klienter som forventer naturlig Gemini SDK-kompatibilitet.### Internal / System APIs

| Endepunkt | Metode | Beskrivelse |
| --------------- | ------ | ------------------------------------------------------------ |
| `/api/init` | FÅ | Initialiseringssjekk av applikasjonen (brukes ved første kjøring) |
| `/api/tags` | FÅ | Ollama-kompatible modellkoder (for Ollama-klienter) |
| `/api/restart` | INNLEGG | Utløs grasiøs serveromstart |
| `/api/avslutning` | INNLEGG | Utløs grasiøs serveravslutning |

>**Merk:**Disse endepunktene brukes internt av systemet eller for Ollama-klientkompatibilitet. De kalles vanligvis ikke opp av sluttbrukere.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transkribere lydfiler ved hjelp av Deepgram eller AssemblyAI.

**Forespørsel:**```bash
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

**Støttede leverandører:**`deepgram/nova-3`, `assemblyai/best`.

**Støttede formater:**"mp3", "wav", "m4a", "flac", "ogg", "webm".---

## Ollama Compatibility

For klienter som bruker Ollamas API-format:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Forespørsler oversettes automatisk mellom Ollama og interne formater.---

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

1. Klienten sender forespørselen til `/v1/*`
2. Rutebehandler kaller 'handleChat', 'handleEmbedding', 'handleAudioTranscription' eller 'handleImageGeneration'
3. Modellen er løst (direkte leverandør/modell eller alias/kombinasjon)
4. Påloggingsinformasjon valgt fra lokal DB med filtrering av kontotilgjengelighet
5. For chat: 'handleChatCore' — formatdeteksjon, oversettelse, hurtigbuffersjekk, idempotenssjekk
6. Leverandør eksekutør sender oppstrømsforespørsel
7. Svar oversatt tilbake til klientformat (chat) eller returnert som det er (innbygginger/bilder/lyd)
8. Bruk/logging registrert
9. Fallback gjelder feil i henhold til kombinasjonsregler

Full arkitekturreferanse: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Dashboard-ruter (`/dashboard/*`) bruker 'auth_token'-informasjonskapsel
- Innlogging bruker lagret passordhash; fallback til `INITIAL_PASSWORD`
- `requireLogin` kan byttes via `/api/settings/require-login`
- `/v1/*`-ruter krever valgfritt Bearer API-nøkkel når `REQUIRE_API_KEY=true`
