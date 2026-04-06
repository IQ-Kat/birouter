# API Reference (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Referință completă pentru toate punctele finale API OmniRoute.---

## Table of Contents

- [Finalizări de chat](#chat-completions)
- [Embeddings](#embeddings)
- [Generarea imaginii](#image-generation)
- [Lista modele](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Tabloul de bord și management](#tabloul de bord--management)
- [Procesarea cererii](#request-processing)
- [Autentificare](#authentication)---

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

| Antet                    | Direcția | Descriere                                                      |
| ------------------------ | -------- | -------------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Cerere   | Setați la `true` pentru a ocoli memoria cache                  |
| `X-OmniRoute-Progress`   | Cerere   | Setați la „adevărat” pentru evenimentele de progres            |
| `X-Session-Id`           | Cerere   | Cheie de sesiune lipicioasă pentru afinitatea sesiunii externe |
| `x_session_id`           | Cerere   | Varianta de subliniere acceptată (HTTP direct)                 |
| `Idempotenta-Cheie`      | Cerere   | Tasta Dedup (fereastră 5s)                                     |
| `X-Request-Id`           | Cerere   | Cheie alternativă de deducție                                  |
| `X-OmniRoute-Cache`      | Răspuns  | `HIT` sau `MISS` (non-streaming)                               |
| `X-OmniRoute-Idempotent` | Răspuns  | `adevărat` dacă este deduplicat                                |
| `X-OmniRoute-Progress`   | Răspuns  | `activat` dacă urmărirea progresului pe                        |
| `X-OmniRoute-Session-Id` | Răspuns  | ID de sesiune efectiv utilizat de OmniRoute                    |

> Notă Nginx: dacă vă bazați pe anteturile de subliniere (de exemplu `x_session_id`), activați `Underscores_in_headers on;`.---

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

Furnizori disponibili: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Furnizori disponibili: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Metoda | Calea                       | Format                 |
| ------ | --------------------------- | ---------------------- | ----------------------------- |
| POST   | `/v1/chat/completions`      | OpenAI                 |
| POST   | `/v1/messages`              | antropic               |
| POST   | `/v1/responses`             | Răspunsuri OpenAI      |
| POST   | `/v1/embeddings`            | OpenAI                 |
| POST   | `/v1/images/generations`    | OpenAI                 |
| GET    | `/v1/models`                | OpenAI                 |
| POST   | `/v1/messages/count_tokens` | antropic               |
| GET    | `/v1beta/models`            | Gemeni                 |
| POST   | `/v1beta/models/{...path}`  | Gemeni generateContent |
| POST   | `/v1/api/chat`              | Ollama                 | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Prefixul furnizorului este adăugat automat dacă lipsește. Modelele nepotrivite returnează `400`.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Exemplu de răspuns:```json
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

| Punct final | Metoda | Descriere |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/login` | POST | Autentificare |
| `/api/auth/logout` | POST | Deconectare |
| `/api/settings/require-login` | GET/PUT | Comutare autentificare necesară |### Provider Management

| Punct final | Metoda | Descriere |
| ---------------------------- | --------------- | ------------------------ |
| `/api/providers` | GET/POST | Listează / creează furnizori |
| `/api/providers/[id]` | GET/PUT/DELETE | Gestionați un furnizor |
| `/api/providers/[id]/test` | POST | Testează conexiunea furnizorului |
| `/api/providers/[id]/models` | GET | Listați modele de furnizori |
| `/api/providers/validate` | POST | Validați configurația furnizorului |
| `/api/provider-nodes*` | Diverse | Managementul nodului furnizorului |
| `/api/provider-models` | GET/POST/DELETE | Modele personalizate |### OAuth Flows

| Punct final | Metoda | Descriere |
| --------------------------------- | ------- | ----------------------- |
| `/api/oauth/[furnizor]/[acțiune]` | Diverse | OAuth specific furnizorului |### Routing & Config

| Punct final | Metoda | Descriere |
| --------------------- | -------- | ----------------------------- |
| `/api/models/alias` | GET/POST | Aliasuri de model |
| `/api/models/catalog` | GET | Toate modelele după furnizor + tip |
| `/api/combos*` | Diverse | Combo management |
| `/api/keys*` | Diverse | Gestionarea cheilor API |
| `/api/pricing` | GET | Prețul modelului |### Usage & Analytics

| Punct final | Metoda | Descriere |
| --------------------------- | ------ | -------------------- |
| `/api/usage/history` | GET | Istoricul utilizării |
| `/api/usage/logs` | GET | Jurnalele de utilizare |
| `/api/usage/request-logs` | GET | Jurnalele la nivel de cerere |
| `/api/usage/[connectionId]` | GET | Utilizare per conexiune |### Settings

| Punct final | Metoda | Descriere |
| ------------------------------- | ------------- | ---------------------- |
| `/api/settings` | GET/PUT/PATCH | Setări generale |
| `/api/settings/proxy` | GET/PUT | Configurare proxy de rețea |
| `/api/settings/proxy/test` | POST | Testați conexiunea proxy |
| `/api/settings/ip-filter` | GET/PUT | Lista IP permisă/lista blocată |
| `/api/settings/thinking-budget` | GET/PUT | Bugetul simbol de raționament |
| `/api/settings/system-prompt` | GET/PUT | Sistem global prompt |### Monitoring

| Punct final | Metoda | Descriere |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------- |
| `/api/sessions` | GET | Urmărire activă a sesiunii |
| `/api/rate-limits` | GET | Limitele ratei per cont |
| `/api/monitoring/health` | GET | Verificarea stării + rezumatul furnizorului (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | GET/DELETE | Cache stats / clear |### Backup & Export/Import

| Punct final | Metoda | Descriere |
| --------------------------- | ------ | --------------------------------------- |
| `/api/db-backups` | GET | Listează copiile de rezervă disponibile |
| `/api/db-backups` | PUNE | Creați o copie de rezervă manuală |
| `/api/db-backups` | POST | Restaurare dintr-o anumită copie de rezervă |
| `/api/db-backups/export` | GET | Descărcați baza de date ca fișier .sqlite |
| `/api/db-backups/import` | POST | Încărcați fișierul .sqlite pentru a înlocui baza de date |
| `/api/db-backups/exportAll` | GET | Descărcați backup complet ca arhivă .tar.gz |### Cloud Sync

| Punct final | Metoda | Descriere |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud` | Diverse | Operațiuni de sincronizare în cloud |
| `/api/sync/initialize` | POST | Inițializați sincronizarea |
| `/api/cloud/*` | Diverse | Management cloud |### Tunnels

| Punct final | Metoda | Descriere |
| -------------------------- | ------ | ---------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | GET | Citiți starea instalării/execuției Cloudflare Quick Tunnel pentru tabloul de bord |
| `/api/tunnels/cloudflared` | POST | Activați sau dezactivați tunelul rapid Cloudflare (`action=enable/disable`) |### CLI Tools

| Punct final | Metoda | Descriere |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | GET | Starea Claude CLI |
| `/api/cli-tools/codex-settings` | GET | Status CLI Codex |
| `/api/cli-tools/droid-settings` | GET | Stare CLI Droid |
| `/api/cli-tools/openclaw-settings` | GET | Stare CLI OpenClaw |
| `/api/cli-tools/runtime/[toolId]` | GET | Timp de rulare CLI generic |

Răspunsurile CLI includ: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reson`.### ACP Agents

| Punct final | Metoda | Descriere |
| ----------------- | ------ | ------------------------------------------------------- |
| `/api/acp/agents` | GET | Listați toți agenții detectați (încorporați + personalizați) cu starea |
| `/api/acp/agents` | POST | Adăugați agent personalizat sau reîmprospătați memoria cache de detectare |
| `/api/acp/agents` | ȘTERGE | Eliminați un agent personalizat prin parametrul de interogare `id` |

Răspunsul GET include `agents[]` (id, nume, binar, versiune, instalat, protocol, isCustom) și `rezumat` (total, instalat, notFound, builtIn, personalizat).### Resilience & Rate Limits

| Punct final | Metoda | Descriere |
| ----------------------- | --------- | ------------------------------- |
| `/api/resilience` | GET/PATCH | Obține/actualizează profiluri de rezistență |
| `/api/resilience/reset` | POST | Resetați întrerupătoarele |
| `/api/rate-limits` | GET | Starea limitei ratei per cont |
| `/api/rate-limit` | GET | Configurație globală a limitei ratei |### Evals

| Punct final | Metoda | Descriere |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | GET/POST | Listează suite de evaluare / rulează evaluarea |### Policies

| Punct final | Metoda | Descriere |
| --------------- | --------------- | ----------------------- |
| `/api/policies` | GET/POST/DELETE | Gestionați politicile de rutare |### Compliance

| Punct final | Metoda | Descriere |
| --------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` | GET | Jurnal de audit de conformitate (ultimul N) |### v1beta (Gemini-Compatible)

| Punct final | Metoda | Descriere |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/models` | GET | Listează modele în format Gemeni |
| `/v1beta/models/{...path}` | POST | Punct final `generateContent` Gemini |

Aceste puncte finale reflectă formatul API al Gemini pentru clienții care se așteaptă la compatibilitate nativă cu SDK Gemini.### Internal / System APIs

| Punct final | Metoda | Descriere |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | GET | Verificarea inițializării aplicației (utilizată la prima rulare) |
| `/api/tags` | GET | Etichete de model compatibile cu Ollama (pentru clienții Ollama) |
| `/api/restart` | POST | Declanșează repornirea grațioasă a serverului |
| `/api/shutdown` | POST | Declanșează închiderea grațioasă a serverului |

>**Notă:**Aceste puncte finale sunt utilizate intern de sistem sau pentru compatibilitatea clientului Ollama. De obicei, acestea nu sunt apelate de utilizatorii finali.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transcrie fișiere audio folosind Deepgram sau AssemblyAI.

**Cerere:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Răspuns:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Furnizori acceptați:**`deepgram/nova-3`, `assemblyai/best`.

**Formate acceptate:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Pentru clienții care folosesc formatul API al Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Cererile sunt traduse automat între Ollama și formatele interne.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Răspuns:**```json
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

1. Clientul trimite cererea către `/v1/*`
2. Managerul de rută apelează `handleChat`, `handleEmbedding`, `handleAudioTranscription` sau `handleImageGeneration`
3. Modelul este rezolvat (furnizor direct/model sau alias/combo)
4. Acreditări selectate din DB local cu filtrarea disponibilității contului
5. Pentru chat: `handleChatCore` — detectare format, traducere, verificare cache, verificare idempotity
6. Executorul furnizorului trimite cererea în amonte
7. Răspunsul tradus înapoi în formatul client (chat) sau returnat așa cum este (încorporare/imagini/audio)
8. Utilizare/înregistrare înregistrată
9. Fallback se aplică erorilor conform regulilor combinate

Referință completă pentru arhitectură: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Rutele tabloului de bord (`/dashboard/*`) folosesc cookie-ul `auth_token`
- Conectarea folosește hash-ul parolei salvate; revenire la `INITIAL_PASSWORD`
- `requireLogin` poate fi comutat prin `/api/settings/require-login`
- Rutele `/v1/*` necesită opțional cheia API Bearer când `REQUIRE_API_KEY=true`
