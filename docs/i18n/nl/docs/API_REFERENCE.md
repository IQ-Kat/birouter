# API Reference (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Volledige referentie voor alle OmniRoute API-eindpunten.---

## Table of Contents

- [Chat-voltooiingen](#chat-completions)
- [Insluitingen](#embeddings)
- [Afbeelding genereren](#image-generation)
- [Lijstmodellen](#list-modellen)
- [Compatibiliteitseindpunten](#compatibiliteitseindpunten)
- [Semantische cache](#semantische cache)
- [Dashboard en beheer](#dashboard--beheer)
- [Verzoekverwerking](#request-processing)
- [Authenticatie](#authenticatie)---

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

| Kop                      | Richting | Beschrijving                                             |
| ------------------------ | -------- | -------------------------------------------------------- |
| `X-OmniRoute-Geen-Cache` | Verzoek  | Stel in op `true` om cache te omzeilen                   |
| `X-OmniRoute-Voortgang`  | Verzoek  | Ingesteld op `true` voor voortgangsgebeurtenissen        |
| `X-sessie-ID`            | Verzoek  | Sticky sessiesleutel voor externe sessie-affiniteit      |
| `x_session_id`           | Verzoek  | Underscore-variant ook geaccepteerd (direct HTTP)        |
| `Idempotentiesleutel`    | Verzoek  | Ontdubbelingssleutel (5s-venster)                        |
| `X-Verzoek-ID`           | Verzoek  | Alternatieve ontdubbelsleutel                            |
| `X-OmniRoute-Cache`      | Reactie  | `HIT` of `MISS` (niet-streaming)                         |
| `X-OmniRoute-Idempotent` | Reactie  | `true` indien gededupliceerd                             |
| `X-OmniRoute-Voortgang`  | Reactie  | `ingeschakeld` als voortgangsregistratie is ingeschakeld |
| `X-OmniRoute-sessie-ID`  | Reactie  | Effectieve sessie-ID gebruikt door OmniRoute             |

> Nginx-opmerking: als u vertrouwt op underscore-headers (bijvoorbeeld `x_session_id`), schakelt u `underscores_in_headers on;` in.---

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

Beschikbare providers: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Beschikbare providers: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Werkwijze | Pad                         | Formaat                    |
| --------- | --------------------------- | -------------------------- | ----------------------------- |
| POST      | `/v1/chat/completions`      | Open AI                    |
| POST      | `/v1/berichten`             | Antropisch                 |
| POST      | `/v1/reacties`              | OpenAI-reacties            |
| POST      | `/v1/embeddings`            | Open AI                    |
| POST      | `/v1/images/generations`    | Open AI                    |
| KRIJG     | `/v1/modellen`              | Open AI                    |
| POST      | `/v1/messages/count_tokens` | Antropisch                 |
| KRIJG     | `/v1beta/modellen`          | Tweeling                   |
| POST      | `/v1beta/models/{...pad}`   | Tweelingen genererenInhoud |
| POST      | `/v1/api/chat`              | Ollama                     | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Het providervoorvoegsel wordt automatisch toegevoegd als het ontbreekt. Niet-overeenkomende modellen retourneren '400'.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Voorbeeld van een antwoord:```json
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

| Eindpunt | Werkwijze | Beschrijving |
| --------------------------- | ------- | -------------------- |
| `/api/auth/login` | POST | Inloggen |
| `/api/auth/uitloggen` | POST | Uitloggen |
| `/api/settings/require-login` | KRIJG/ZET | Schakel inloggen vereist |### Provider Management

| Eindpunt | Werkwijze | Beschrijving |
| -------------------------- | --------------- | ----------------------- |
| `/api/providers` | KRIJGEN/POST | Providers weergeven / aanmaken |
| `/api/providers/[id]` | KRIJGEN/ZET/VERWIJDEREN | Beheer een aanbieder |
| `/api/providers/[id]/test` | POST | Providerverbinding testen |
| `/api/providers/[id]/modellen` | KRIJG | Providermodellen weergeven |
| `/api/providers/validate` | POST | Providerconfiguratie valideren |
| `/api/provider-nodes*` | Diverse | Beheer van providerknooppunten |
| `/api/provider-modellen` | KRIJGEN/POST/VERWIJDEREN | Aangepaste modellen |### OAuth Flows

| Eindpunt | Werkwijze | Beschrijving |
| ----------------------------- | ------- | ---------------------- |
| `/api/oauth/[provider]/[actie]` | Diverse | Providerspecifieke OAuth |### Routing & Config

| Eindpunt | Werkwijze | Beschrijving |
| -------------------- | -------- | --------------------------- |
| `/api/modellen/alias` | KRIJGEN/POST | Modelaliassen |
| `/api/modellen/catalog` | KRIJG | Alle modellen per aanbieder + type |
| `/api/combo's*` | Diverse | Combinatiebeheer |
| `/api/keys*` | Diverse | API-sleutelbeheer |
| `/api/prijzen` | KRIJG | Modelprijzen |### Usage & Analytics

| Eindpunt | Werkwijze | Beschrijving |
| ------------------------- | ------ | ------------------- |
| `/api/gebruik/geschiedenis` | KRIJG | Gebruiksgeschiedenis |
| `/api/usage/logs` | KRIJG | Gebruikslogboeken |
| `/api/usage/request-logs` | KRIJG | Logboeken op aanvraagniveau |
| `/api/usage/[connectionId]` | KRIJG | Gebruik per verbinding |### Settings

| Eindpunt | Werkwijze | Beschrijving |
| ----------------------------- | ------------- | ---------------------- |
| `/api/instellingen` | KRIJG/ZET/PATCH | Algemene instellingen |
| `/api/settings/proxy` | KRIJG/ZET | Netwerkproxyconfiguratie |
| `/api/settings/proxy/test` | POST | Proxyverbinding testen |
| `/api/settings/ip-filter` | KRIJG/ZET | IP-toelatingslijst/blokkeerlijst |
| `/api/settings/thinking-budget` | KRIJG/ZET | Redeneren tokenbudget |
| `/api/settings/systeemprompt` | KRIJG/ZET | Globale systeemprompt |### Monitoring

| Eindpunt | Werkwijze | Beschrijving |
| ----------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `/api/sessions` | KRIJG | Actieve sessietracking |
| `/api/rate-limits` | KRIJG | Tarieflimieten per account |
| `/api/monitoring/gezondheid` | KRIJG | Gezondheidscontrole + samenvatting van de provider (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | OPHALEN/VERWIJDEREN | Cachestatistieken / wissen |### Backup & Export/Import

| Eindpunt | Werkwijze | Beschrijving |
| ------------------------- | ------ | ------------------------------------ |
| `/api/db-back-ups` | KRIJG | Beschikbare back-ups weergeven |
| `/api/db-back-ups` | ZET | Maak een handmatige back-up |
| `/api/db-back-ups` | POST | Herstellen vanaf een specifieke back-up |
| `/api/db-backups/export` | KRIJG | Database downloaden als .sqlite-bestand |
| `/api/db-backups/import` | POST | Upload .sqlite-bestand om database te vervangen |
| `/api/db-backups/exportAll` | KRIJG | Volledige back-up downloaden als .tar.gz-archief |### Cloud Sync

| Eindpunt | Werkwijze | Beschrijving |
| ---------------------- | ------- | -------------------- |
| `/api/sync/cloud` | Diverse | Cloudsynchronisatiebewerkingen |
| `/api/sync/initialiseren` | POST | Synchronisatie initialiseren |
| `/api/cloud/*` | Diverse | Cloudbeheer |### Tunnels

| Eindpunt | Werkwijze | Beschrijving |
| ------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | KRIJG | Lees de installatie-/runtimestatus van Cloudflare Quick Tunnel voor het dashboard |
| `/api/tunnels/cloudflared` | POST | Schakel de Cloudflare Quick Tunnel in of uit (`action=enable/disable`) |### CLI Tools

| Eindpunt | Werkwijze | Beschrijving |
| --------------------------------- | ------ | ------------------ |
| `/api/cli-tools/claude-settings` | KRIJG | Claude CLI-status |
| `/api/cli-tools/codex-settings` | KRIJG | Codex CLI-status |
| `/api/cli-tools/droid-settings` | KRIJG | Droid CLI-status |
| `/api/cli-tools/openclaw-settings` | KRIJG | OpenClaw CLI-status |
| `/api/cli-tools/runtime/[toolId]` | KRIJG | Algemene CLI-runtime |

CLI-antwoorden omvatten: `geïnstalleerd`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Eindpunt | Werkwijze | Beschrijving |
| ----------------- | ------ | -------------------------------------------------- |
| `/api/acp/agents` | KRIJG | Lijst van alle gedetecteerde agenten (ingebouwd + aangepast) met status |
| `/api/acp/agents` | POST | Aangepaste agent toevoegen of detectiecache vernieuwen |
| `/api/acp/agents` | VERWIJDEREN | Verwijder een aangepaste agent met `id` queryparam |

Het GET-antwoord omvat `agents[]` (id, naam, binair, versie, geïnstalleerd, protocol, isCustom) en `samenvatting` (totaal, geïnstalleerd, notFound, ingebouwde, aangepast).### Resilience & Rate Limits

| Eindpunt | Werkwijze | Beschrijving |
| ---------------------- | --------- | ----------------------------- |
| `/api/veerkracht` | KRIJGEN/PATCH | Veerkrachtprofielen ophalen/bijwerken |
| `/api/veerkracht/reset` | POST | Stroomonderbrekers resetten |
| `/api/rate-limits` | KRIJG | Status van tarieflimiet per account |
| `/api/rate-limiet` | KRIJG | Configuratie van globale tarieflimieten |### Evals

| Eindpunt | Werkwijze | Beschrijving |
| ------------ | -------- | ------------------------------- |
| `/api/evals` | KRIJGEN/POST | Evaluatiesuites weergeven / evaluatie uitvoeren |### Policies

| Eindpunt | Werkwijze | Beschrijving |
| --------------- | --------------- | ---------------------- |
| `/api/beleid` | KRIJGEN/POST/VERWIJDEREN | Routingbeleid beheren |### Compliance

| Eindpunt | Werkwijze | Beschrijving |
| ------------------------- | ------ | --------------------------- |
| `/api/compliance/audit-log` | KRIJG | Nalevingsauditlogboek (laatste N) |### v1beta (Gemini-Compatible)

| Eindpunt | Werkwijze | Beschrijving |
| ------------------------- | ------ | ------------------------------- |
| `/v1beta/modellen` | KRIJG | Lijstmodellen in Gemini-formaat |
| `/v1beta/models/{...pad}` | POST | Gemini `generateContent` eindpunt |

Deze eindpunten weerspiegelen het API-formaat van Gemini voor klanten die native Gemini SDK-compatibiliteit verwachten.### Internal / System APIs

| Eindpunt | Werkwijze | Beschrijving |
| --------------- | ------ | ----------------------------------------------- |
| `/api/init` | KRIJG | Initialisatiecontrole van applicatie (gebruikt bij eerste run) |
| `/api/tags` | KRIJG | Ollama-compatibele modeltags (voor Ollama-klanten) |
| `/api/herstart` | POST | Trigger een sierlijke herstart van de server |
| `/api/shutdown` | POST | Trigger een elegante serveruitschakeling |

>**Opmerking:**Deze eindpunten worden intern gebruikt door het systeem of voor Ollama-clientcompatibiliteit. Ze worden doorgaans niet door eindgebruikers gebeld.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transcribeer audiobestanden met Deepgram of AssemblyAI.

**Verzoek:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Antwoord:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Ondersteunde providers:**`deepgram/nova-3`, `assemblyai/best`.

**Ondersteunde formaten:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Voor klanten die het API-formaat van Ollama gebruiken:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Verzoeken worden automatisch vertaald tussen Ollama en interne formaten.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Antwoord:**```json
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

1. Klant stuurt verzoek naar `/v1/*`
2. Route-handler roept `handleChat`, `handleEmbedding`, `handleAudioTranscription` of `handleImageGeneration` aan
3. Model is opgelost (directe provider/model of alias/combo)
4. Inloggegevens geselecteerd uit lokale DB met filtering van accountbeschikbaarheid
5. Voor chat: `handleChatCore` — formaatdetectie, vertaling, cachecontrole, idempotentiecontrole
6. Provider-uitvoerder verzendt een upstream-verzoek
7. Antwoord terugvertaald naar clientformaat (chat) of geretourneerd zoals het is (insluitingen/afbeeldingen/audio)
8. Verbruik/logboekregistratie
9. Fallback is van toepassing op fouten volgens comboregels

Volledige architectuurreferentie: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Dashboardroutes (`/dashboard/*`) gebruiken de `auth_token`-cookie
- Inloggen maakt gebruik van opgeslagen wachtwoord-hash; terugval naar `INITIAL_PASSWORD`
- `requireLogin` kan worden omgeschakeld via `/api/settings/require-login`
- `/v1/*` routes vereisen optioneel Bearer API-sleutel wanneer `REQUIRE_API_KEY=true`
