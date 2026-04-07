# API Reference (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Teljes referencia az összes OmniRoute API-végponthoz.---

## Table of Contents

- [Csevegés befejezése](#chat-completions)
- [Beágyazások](#beágyazások)
- [Képgenerálás](#image-generation)
- [Modellek listája](#list-models)
- [Kompatibilitási végpontok](#kompatibilitási végpontok)
- [Szemantikai gyorsítótár](#szemantikus-gyorsítótár)
- [Irányítópult és kezelés](#dashboard--kezelés)
- [Kérés feldolgozása](#request-processing)
- [Authentication](#hitelesítés)---

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

| Fejléc                   | Irány  | Leírás                                                 |
| ------------------------ | ------ | ------------------------------------------------------ | -------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Kérés  | Állítsa "true" értékre a gyorsítótár megkerüléséhez    |
| "X-OmniRoute-Progress"   | Kérés  | Állítsa "igaz" értékre az előrehaladási eseményekhez   |
| "X-Session-Id"           | Kérés  | Ragadó munkamenetkulcs a külső munkamenet-affinitáshoz |
| `x_session_id`           | Kérés  | Az aláhúzás változat is elfogadott (közvetlen HTTP)    |
| "Idempotency-Key"        | Kérés  | Dedup kulcs (5s ablak)                                 |
| "X-Request-Id"           | Kérés  | Alternatív dedup kulcs                                 |
| `X-OmniRoute-Cache`      | Válasz | "HIT" vagy "MISS" (nem adatfolyam)                     |
| `X-OmniRoute-Idempotent` | Válasz | "igaz", ha deduplikált                                 |
| "X-OmniRoute-Progress"   | Válasz | `engedélyezve`, ha a folyamatkövetés bekapcsolva       |
| `X-OmniRoute-Session-Id` | Válasz | Az OmniRoute                                           | által használt hatékony munkamenet-azonosító |

> Nginx megjegyzés: ha aláhúzásjelekre hagyatkozik (például `x_session_id`), engedélyezze az `underscores_in_headers on;`.---

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

Elérhető szolgáltatók: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Elérhető szolgáltatók: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Módszer | Útvonal                          | Formátum                 |
| ------- | -------------------------------- | ------------------------ | ----------------------------- |
| POST    | "/v1/chat/completions"           | OpenAI                   |
| POST    | "/v1/messages"                   | Antropikus               |
| POST    | "/v1/responses"                  | OpenAI válaszok          |
| POST    | "/v1/beágyazások"                | OpenAI                   |
| POST    | "/v1/images/generations"         | OpenAI                   |
| GET     | "/v1/models"                     | OpenAI                   |
| POST    | `/v1/messages/count_tokens`      | Antropikus               |
| GET     | "/v1beta/models"                 | Ikrek                    |
| POST    | `/v1beta/models/{...elérési út}` | Gemini GenerationContent |
| POST    | `/v1/api/chat`                   | Ollama                   | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

A szolgáltató előtagja automatikusan hozzáadódik, ha hiányzik. A nem megfelelő modellek „400”-at adnak vissza.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Válasz példa:```json
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

| Végpont | Módszer | Leírás |
| ------------------------------ | ------- | ---------------------- |
| "/api/auth/login" | POST | Bejelentkezés |
| "/api/auth/logout" | POST | Kijelentkezés |
| `/api/settings/require-login` | GET/PUT | Bejelentkezés szükséges |### Provider Management

| Végpont | Módszer | Leírás |
| ----------------------------- | ---------------- | ------------------------- |
| "/api/szolgáltatók" | GET/POST | Szolgáltatók listázása/létrehozása |
| "/api/providers/[id]" | GET/PUT/DELETE | Szolgáltató kezelése |
| "/api/providers/[id]/test" | POST | Szolgáltatói kapcsolat tesztelése |
| "/api/providers/[id]/models" | GET | Szolgáltatói modellek listázása |
| "/api/providers/validate" | POST | A szolgáltató konfigurációjának ellenőrzése |
| `/api/provider-nodes*` | Különféle | Szolgáltatói csomópontok kezelése |
| "/api/provider-models" | GET/POST/DELETE | Egyedi modellek |### OAuth Flows

| Végpont | Módszer | Leírás |
| --------------------------------- | ------- | ------------------------ |
| "/api/oauth/[szolgáltató]/[művelet]" | Különféle | Szolgáltató-specifikus OAuth |### Routing & Config

| Végpont | Módszer | Leírás |
| ---------------------- | -------- | ------------------------------ |
| "/api/models/alias" | GET/POST | Modell álnevek |
| "/api/models/catalog" | GET | Minden modell szolgáltató + típus szerint |
| `/api/combos*` | Különféle | Kombinált menedzsment |
| `/api/keys*` | Különféle | API-kulcskezelés |
| "/api/árképzés" | GET | Modell árképzés |### Usage & Analytics

| Végpont | Módszer | Leírás |
| ---------------------------- | ------ | -------------------- |
| "/api/usage/history" | GET | Használati előzmények |
| "/api/usage/logs" | GET | Használati naplók |
| `/api/usage/request-logs` | GET | Kérelem szintű naplók |
| `/api/usage/[connectionId]` | GET | Kapcsolatonkénti használat |### Settings

| Végpont | Módszer | Leírás |
| -------------------------------- | ------------- | ----------------------- |
| "/api/beállítások" | GET/PUT/PATCH | Általános beállítások |
| "/api/settings/proxy" | GET/PUT | Hálózati proxy konfiguráció |
| "/api/settings/proxy/test" | POST | Proxy kapcsolat tesztelése |
| `/api/settings/ip-filter` | GET/PUT | IP engedélyezési lista/blokkolólista |
| `/api/settings/thhinking-budget` | GET/PUT | Indoklási jelképes költségvetés |
| `/api/settings/system-prompt` | GET/PUT | Globális rendszerkérdés |### Monitoring

| Végpont | Módszer | Leírás |
| ------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| "/api/munkamenetek" | GET | Aktív munkamenet-követés |
| "/api/rate-limits" | GET | Számlánkénti kamatkorlátok |
| "/api/monitoring/health" | GET | Állapotellenőrzés + szolgáltató összefoglalója (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| "/api/cache/stats" | GET/DELETE | Gyorsítótár statisztika / törlés |### Backup & Export/Import

| Végpont | Módszer | Leírás |
| ---------------------------- | ------ | ---------------------------------------- |
| `/api/db-backups` | GET | Az elérhető biztonsági másolatok listája |
| `/api/db-backups` | PUT | Kézi biztonsági mentés létrehozása |
| `/api/db-backups` | POST | Visszaállítás egy adott biztonsági másolatból |
| `/api/db-backups/export` | GET | Adatbázis letöltése .sqlite fájlként |
| `/api/db-backups/import` | POST | Töltse fel az .sqlite fájlt az adatbázis |
| `/api/db-backups/exportAll` | GET | A teljes biztonsági másolat letöltése .tar.gz archívumként |### Cloud Sync

| Végpont | Módszer | Leírás |
| ----------------------- | ------- | ---------------------- |
| `/api/sync/cloud` | Különféle | Felhős szinkronizálási műveletek |
| "/api/sync/initialize" | POST | Szinkronizálás inicializálása |
| `/api/cloud/*` | Különféle | Felhőkezelés |### Tunnels

| Végpont | Módszer | Leírás |
| --------------------------- | ------ | ------------------------------------------------------------------------ |
| "/api/tunnels/cloudflared" | GET | Olvassa el a Cloudflare Quick Tunnel telepítési/futási állapotát az irányítópulthoz |
| "/api/tunnels/cloudflared" | POST | A Cloudflare Quick Tunnel engedélyezése vagy letiltása (`action=enable/disable`) |### CLI Tools

| Végpont | Módszer | Leírás |
| ---------------------------------- | ------ | -------------------- |
| `/api/cli-tools/claude-settings` | GET | Claude CLI állapota |
| "/api/cli-tools/codex-settings" | GET | Codex CLI állapota |
| "/api/cli-tools/droid-settings" | GET | Droid CLI állapot |
| "/api/cli-tools/openclaw-settings" | GET | OpenClaw CLI állapota |
| `/api/cli-tools/runtime/[toolId]` | GET | Általános CLI futásidejű |

A CLI-válaszok a következők: "telepített", "futtatható", "command", "commandPath", "runtimeMode", "ok".### ACP Agents

| Végpont | Módszer | Leírás |
| ------------------ | ------ | --------------------------------------------------------- |
| "/api/acp/agents" | GET | List all detected agents (built-in + custom) with status |
| "/api/acp/agents" | POST | Egyéni ügynök hozzáadása vagy észlelési gyorsítótár frissítése |
| "/api/acp/agents" | TÖRLÉS | Távolítsa el az egyéni ügynököt az „id” lekérdezési paraméter |

A GET válasz tartalmazza az "agents[]" (azonosító, név, bináris, verzió, telepített, protokoll, isCustom) és az "összefoglaló" (összes, telepített, notFound, beépített, egyéni) elemet.### Resilience & Rate Limits

| Végpont | Módszer | Leírás |
| ------------------------ | --------- | -------------------------------- |
| "/api/resilience" | GET/PATCH | Rugalmassági profilok beszerzése/frissítése |
| "/api/resilience/reset" | POST | Megszakítók visszaállítása |
| "/api/rate-limits" | GET | számlánkénti kamatláb korlát állapota |
| "/api/rate-limit" | GET | Globális díjkorlát konfiguráció |### Evals

| Végpont | Módszer | Leírás |
| ------------ | -------- | --------------------------------- |
| "/api/evals" | GET/POST | Eval suites listázás / kiértékelés futtatása |### Policies

| Végpont | Módszer | Leírás |
| ---------------- | ---------------- | ------------------------ |
| "/api/policies" | GET/POST/DELETE | Útválasztási házirendek kezelése |### Compliance

| Végpont | Módszer | Leírás |
| ---------------------------- | ------ | ------------------------------ |
| "/api/compliance/audit-log" | GET | Megfelelőségi ellenőrzési napló (utolsó N) |### v1beta (Gemini-Compatible)

| Végpont | Módszer | Leírás |
| --------------------------- | ------ | --------------------------------- |
| "/v1beta/models" | GET | Modellek listája Gemini formátumban |
| `/v1beta/models/{...elérési út}` | POST | Gemini `generateContent` végpont |

Ezek a végpontok tükrözik a Gemini API-formátumát azon ügyfelek számára, akik natív Gemini SDK-kompatibilitást várnak el.### Internal / System APIs

| Végpont | Módszer | Leírás |
| ---------------- | ------ | ---------------------------------------------------- |
| `/api/init` | GET | Application initialization check (used on first run) |
| "/api/tags" | GET | Ollama-kompatibilis modellcímkék (Ollama ügyfelek számára) |
| `/api/restart` | POST | A kiszolgáló kecses újraindításának elindítása |
| `/api/shutdown` | POST | A kiszolgáló kecses leállításának elindítása |

>**Megjegyzés:**Ezeket a végpontokat a rendszer belsőleg vagy az Ollama kliens kompatibilitás érdekében használja. Általában nem hívják a végfelhasználók.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Írja át a hangfájlokat a Deepgram vagy az AssemblyAI segítségével.

**Kér:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Válasz:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Támogatott szolgáltatók:**`deepgram/nova-3`, `assemblyai/best`.

**Támogatott formátumok:**"mp3", "wav", "m4a", "flac", "ogg", "webm".---

## Ollama Compatibility

Az Ollama API formátumát használó ügyfelek számára:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

A kéréseket a rendszer automatikusan lefordítja az Ollama és a belső formátumok között.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Válasz:**```json
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

1. Az ügyfél kérést küld a `/v1/*` címre
2. Az útvonalkezelő meghívja a "handleChat", a "handleEmbedding", a "handleAudioTranscription" vagy a "handleImageGeneration" függvényt
3. A modell feloldva (közvetlen szolgáltató/modell vagy álnév/kombináció)
4. A helyi adatbázisból kiválasztott hitelesítő adatok fiók elérhetőségi szűréssel
5. Csevegés esetén: "handleChatCore" – formátumészlelés, fordítás, gyorsítótár-ellenőrzés, idempotencia ellenőrzése
6. A szolgáltató végrehajtója upstream kérést küld
7. A válasz visszafordítva ügyfélformátumra (csevegés) vagy visszaküldve (beágyazások/képek/audio)
8. Használat/naplózás rögzítve
9. A hibákra a tartalék a kombinált szabályok szerint érvényes

Teljes architektúra hivatkozás: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Az irányítópult útvonalai (`/dashboard/*`) az `auth_token` cookie-t használják
- A bejelentkezés elmentett jelszókivonatot használ; vissza a következőre: `INITIAL_PASSWORD'
- A `requireLogin` átkapcsolható a `/api/settings/require-login' oldalon
- A `/v1/*` útvonalak opcionálisan megkövetelik a Bearer API kulcsot, ha `REQUIRE_API_KEY=true'
