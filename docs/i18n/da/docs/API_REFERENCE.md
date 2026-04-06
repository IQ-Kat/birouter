# API Reference (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Komplet reference for alle OmniRoute API-slutpunkter.---

## Table of Contents

- [Chat-afslutninger](#chat-afslutninger)
- [Indelejringer](#indlejringer)
- [Billedgenerering](#billedgenerering)
- [List Models](#liste-modeller)
- [Kompatibilitetsendepunkter](#kompatibilitetsslutpunkter)
- [Semantisk cache](#semantisk-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Godkendelse](#godkendelse)---

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

| Overskrift               | Retning   | Beskrivelse                                           |
| ------------------------ | --------- | ----------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Anmodning | Indstil til "true" for at omgå cache                  |
| `X-OmniRoute-Progress`   | Anmodning | Indstil til "sand" for fremskridtsbegivenheder        |
| `X-Session-Id`           | Anmodning | Sticky session nøgle til ekstern session affinitet    |
| `x_session_id`           | Anmodning | Understregningsvariant accepteres også (direkte HTTP) |
| `Idempotens-nøgle`       | Anmodning | Dedup nøgle (5s vindue)                               |
| `X-Request-Id`           | Anmodning | Alternativ dedup nøgle                                |
| `X-OmniRoute-Cache`      | Svar      | "HIT" eller "MISS" (ikke-streaming)                   |
| `X-OmniRoute-Idempotent` | Svar      | 'sand' hvis deduplikeret                              |
| `X-OmniRoute-Progress`   | Svar      | "aktiveret", hvis statussporing på                    |
| `X-OmniRoute-Session-Id` | Svar      | Effektivt sessions-id brugt af OmniRoute              |

> Nginx note: Hvis du stoler på understregningsoverskrifter (for eksempel `x_session_id`), skal du aktivere `understregninger_i_overskrifter på;`.---

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

Tilgængelige udbydere: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Tilgængelige udbydere: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Metode | Sti                         | Format                 |
| ------ | --------------------------- | ---------------------- | ----------------------------- |
| POST   | `/v1/chat/afslutninger`     | OpenAI                 |
| POST   | `/v1/meddelelser`           | Antropisk              |
| POST   | `/v1/svar`                  | OpenAI-svar            |
| POST   | `/v1/indlejringer`          | OpenAI                 |
| POST   | `/v1/billeder/generationer` | OpenAI                 |
| FÅ     | `/v1/modeller`              | OpenAI                 |
| POST   | `/v1/messages/count_tokens` | Antropisk              |
| FÅ     | `/v1beta/modeller`          | Tvillingerne           |
| POST   | `/v1beta/models/{...sti}`   | Gemini generer indhold |
| POST   | `/v1/api/chat`              | Ollama                 | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Udbyderpræfikset tilføjes automatisk, hvis det mangler. Umatchede modeller returnerer '400'.---

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

| Slutpunkt | Metode | Beskrivelse |
| ------------------------------ | ------- | ---------------------- |
| `/api/auth/login` | POST | Log ind |
| `/api/auth/logout` | POST | Log ud |
| `/api/settings/require-login` | GET/PUT | Skift login påkrævet |### Provider Management

| Slutpunkt | Metode | Beskrivelse |
| ---------------------------- | --------------- | -------------------------- |
| `/api/udbydere` | GET/POST | Liste/opret udbydere |
| `/api/providers/[id]` | GET/SETT/SLET | Administrer en udbyder |
| `/api/providers/[id]/test` | POST | Test udbyderforbindelse |
| `/api/providers/[id]/modeller` | FÅ | Liste udbydermodeller |
| `/api/providers/validate` | POST | Valider udbyderkonfiguration |
| `/api/provider-nodes*` | Forskellige | Udbyder node management |
| `/api/udbyder-modeller` | GET/POST/SLET | Brugerdefinerede modeller |### OAuth Flows

| Slutpunkt | Metode | Beskrivelse |
| ---------------------------------- | ------- | ---------------------------- |
| `/api/oauth/[udbyder]/[handling]` | Forskellige | Udbyderspecifik OAuth |### Routing & Config

| Slutpunkt | Metode | Beskrivelse |
| ---------------------- | -------- | ------------------------------ |
| `/api/models/alias` | GET/POST | Modelaliaser |
| `/api/models/catalog` | FÅ | Alle modeller efter udbyder + type |
| `/api/combos*` | Forskellige | Combo management |
| `/api/keys*` | Forskellige | API nøglestyring |
| `/api/prissætning` | FÅ | Modelpriser |### Usage & Analytics

| Slutpunkt | Metode | Beskrivelse |
| -------------------------- | ------ | -------------------- |
| `/api/brug/historie` | FÅ | Brugshistorik |
| `/api/brug/logfiler` | FÅ | Brugslogs |
| `/api/usage/request-logs` | FÅ | Logfiler på anmodningsniveau |
| `/api/usage/[connectionId]` | FÅ | Brug pr. forbindelse |### Settings

| Slutpunkt | Metode | Beskrivelse |
| -------------------------------------- | ------------- | ---------------------- |
| `/api/indstillinger` | GET/PUT/PATCH | Generelle indstillinger |
| `/api/indstillinger/proxy` | GET/PUT | Netværk proxy-konfiguration |
| `/api/settings/proxy/test` | POST | Test proxyforbindelse |
| `/api/indstillinger/ip-filter` | GET/PUT | IP-tilladelsesliste/blokeringsliste |
| `/api/indstillinger/tænkebudget` | GET/PUT | Begrundelse token budget |
| `/api/settings/system-prompt` | GET/PUT | Global systemprompt |### Monitoring

| Slutpunkt | Metode | Beskrivelse |
| -------------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| `/api/sessioner` | FÅ | Aktiv sessionssporing |
| `/api/rate-limits` | FÅ | Satsgrænser pr. konto |
| `/api/monitorering/sundhed` | FÅ | Sundhedstjek + udbyderoversigt (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | FÅ/SLET | Cache-statistik/ryd |### Backup & Export/Import

| Slutpunkt | Metode | Beskrivelse |
| -------------------------- | ------ | ----------------------------------------------- |
| `/api/db-backups` | FÅ | Liste over tilgængelige sikkerhedskopier |
| `/api/db-backups` | SÆT | Opret en manuel backup |
| `/api/db-backups` | POST | Gendan fra en specifik sikkerhedskopi |
| `/api/db-backups/eksport` | FÅ | Download database som .sqlite-fil |
| `/api/db-backups/import` | POST | Upload .sqlite-fil for at erstatte databasen |
| `/api/db-backups/exportAll` | FÅ | Download fuld backup som .tar.gz-arkiv |### Cloud Sync

| Slutpunkt | Metode | Beskrivelse |
| ---------------------- | ------- | ---------------------- |
| `/api/sync/cloud` | Forskellige | Cloud-synkroniseringsoperationer |
| `/api/sync/initialize` | POST | Initialiser synkronisering |
| `/api/cloud/*` | Forskellige | Cloud management |### Tunnels

| Slutpunkt | Metode | Beskrivelse |
| -------------------------- | ------ | ------------------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | FÅ | Læs Cloudflare Quick Tunnel installation/runtime status for dashboardet |
| `/api/tunnels/cloudflared` | POST | Aktiver eller deaktiver Cloudflare Quick Tunnel (`action=enable/disable`) |### CLI Tools

| Slutpunkt | Metode | Beskrivelse |
| ---------------------------------- | ------ | ------------------ |
| `/api/cli-tools/claude-settings` | FÅ | Claude CLI status |
| `/api/cli-tools/codex-indstillinger` | FÅ | Codex CLI-status |
| `/api/cli-tools/droid-indstillinger` | FÅ | Droid CLI status |
| `/api/cli-tools/openclaw-indstillinger` | FÅ | OpenClaw CLI status |
| `/api/cli-tools/runtime/[toolId]` | FÅ | Generisk CLI runtime |

CLI-svar inkluderer: 'installed', 'runnable', 'command', 'commandPath', 'runtimeMode', 'reason'.### ACP Agents

| Slutpunkt | Metode | Beskrivelse |
| ------------------ | ------ | ---------------------------------------------------------- |
| `/api/acp/agents` | FÅ | Liste alle registrerede agenter (indbygget + brugerdefineret) med status |
| `/api/acp/agents` | POST | Tilføj tilpasset agent eller opdater registreringscache |
| `/api/acp/agents` | SLET | Fjern en brugerdefineret agent ved "id" forespørgsel param |

GET-svaret inkluderer `agenter[]` (id, navn, binær, version, installeret, protokol, isCustom) og `resumé` (total, installeret, notFound, indbygget, brugerdefineret).### Resilience & Rate Limits

| Slutpunkt | Metode | Beskrivelse |
| ---------------------------- | ---------- | -------------------------------------- |
| `/api/resilience` | GET/PATCH | Få/opdater resiliensprofiler |
| `/api/resilience/reset` | POST | Nulstil afbrydere |
| `/api/rate-limits` | FÅ | Satsgrænsestatus pr. konto |
| `/api/rate-limit` | FÅ | Global hastighedsgrænsekonfiguration |### Evals

| Slutpunkt | Metode | Beskrivelse |
| ------------ | -------- | ---------------------------------- |
| `/api/evals` | GET/POST | Liste eval suiter / køre evaluering |### Policies

| Slutpunkt | Metode | Beskrivelse |
| --------------- | --------------- | ---------------------------- |
| `/api/politikker` | GET/POST/SLET | Administrer routingpolitikker |### Compliance

| Slutpunkt | Metode | Beskrivelse |
| -------------------------- | ------ | ------------------------------ |
| `/api/compliance/audit-log` | FÅ | Overholdelsesrevisionslog (sidste N) |### v1beta (Gemini-Compatible)

| Slutpunkt | Metode | Beskrivelse |
| -------------------------- | ------ | ---------------------------------- |
| `/v1beta/modeller` | FÅ | Vis modeller i Gemini-format |
| `/v1beta/models/{...sti}` | POST | Gemini `generateContent` slutpunkt |

Disse endepunkter afspejler Geminis API-format for klienter, der forventer indbygget Gemini SDK-kompatibilitet.### Internal / System APIs

| Slutpunkt | Metode | Beskrivelse |
| --------------- | ------ | ------------------------------------------------------------ |
| `/api/init` | FÅ | Applikationsinitieringskontrol (bruges ved første kørsel) |
| `/api/tags` | FÅ | Ollama-kompatible modelmærker (til Ollama-kunder) |
| `/api/genstart` | POST | Udløs yndefuld servergenstart |
| `/api/shutdown` | POST | Udløs yndefuld serverlukning |

>**Bemærk:**Disse endepunkter bruges internt af systemet eller til Ollama-klientkompatibilitet. De kaldes typisk ikke af slutbrugere.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transskriber lydfiler ved hjælp af Deepgram eller AssemblyAI.

**Anmodning:**```bash
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

**Understøttede udbydere:**`deepgram/nova-3`, `assemblyai/best`.

**Understøttede formater:**"mp3", "wav", "m4a", "flac", "ogg", "webm".---

## Ollama Compatibility

For klienter, der bruger Ollamas API-format:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Forespørgsler oversættes automatisk mellem Ollama og interne formater.---

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

1. Klienten sender anmodningen til `/v1/*`
2. Rutehandler kalder 'handleChat', 'handleEmbedding', 'handleAudioTranscription' eller 'handleImageGeneration'
3. Modellen er løst (direkte udbyder/model eller alias/kombination)
4. Oplysninger valgt fra lokal DB med filtrering af kontotilgængelighed
5. Til chat: `handleChatCore` — formatdetektion, oversættelse, cache-tjek, idempotenstjek
6. Udbyder eksekutør sender upstream anmodning
7. Svar oversat tilbage til klientformat (chat) eller returneret som det er (indlejringer/billeder/lyd)
8. Brug/logning registreret
9. Fallback gælder for fejl i henhold til combo regler

Fuld arkitekturreference: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Dashboard-ruter (`/dashboard/*`) bruger 'auth_token'-cookie
- Login bruger gemt adgangskode-hash; fallback til "INITIAL_PASSWORD".
- `requireLogin` kan skiftes via `/api/settings/require-login`
- `/v1/*`-ruter kræver valgfrit Bearer API-nøgle, når `REQUIRE_API_KEY=true`
