# API Reference (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Kompletná referencia pre všetky koncové body rozhrania API OmniRoute.---

## Table of Contents

- [Dokončenia rozhovoru](#chat-completions)
- [Embeddings](#embeddings)
- [Generovanie obrázkov](#image-generation)
- [Zoznam modelov](#list-models)
- [Koncové body kompatibility](#compatibility-endpoints)
- [Sémantická vyrovnávacia pamäť](#sémantická vyrovnávacia pamäť)
- [Dashboard & Management](#dashboard--management)
- [Spracovanie žiadosti](#request-processing)
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

| Hlavička                 | Smer    | Popis                                                 |
| ------------------------ | ------- | ----------------------------------------------------- | ----------------------------- |
| "X-OmniRoute-No-Cache"   | Žiadosť | Ak chcete obísť vyrovnávaciu pamäť                    | , nastavte na hodnotu „true“. |
| "X-OmniRoute-Progress"   | Žiadosť | Nastavte na hodnotu „true“ pre udalosti postupu       |
| "X-Session-Id"           | Žiadosť | Sticky session key pre externú príbuznosť relácie     |
| `x_session_id`           | Žiadosť | Akceptovaný je aj variant podčiarknutia (priame HTTP) |
| "Idempotency-key"        | Žiadosť | Deup kľúč (okno 5s)                                   |
| "X-Id žiadosti"          | Žiadosť | Alternatívny dedup kľúč                               |
| "X-OmniRoute-Cache"      | Odpoveď | „HIT“ alebo „MISS“ (bez streamovania)                 |
| "X-OmniRoute-Idempotent" | Odpoveď | "pravda", ak je deduplikovaná                         |
| "X-OmniRoute-Progress"   | Odpoveď | "povolené", ak je sledovanie pokroku zapnuté          |
| "X-OmniRoute-Session-Id" | Odpoveď | Efektívne ID relácie používané OmniRoute              |

> Poznámka Nginx: ak sa spoliehate na hlavičky podčiarknutia (napríklad `x_session_id`), povoľte `underscores_in_headers on;`.---

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

Dostupní poskytovatelia: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Dostupní poskytovatelia: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Metóda    | Cesta                       | Formát                |
| --------- | --------------------------- | --------------------- | ----------------------------- |
| Zverejniť | `/v1/chat/completions`      | OpenAI                |
| Zverejniť | `/v1/messages`              | Antropický            |
| Zverejniť | `/v1/responses`             | Odpovede OpenAI       |
| Zverejniť | `/v1/embeddings`            | OpenAI                |
| Zverejniť | `/v1/images/generations`    | OpenAI                |
| ZÍSKAJTE  | `/v1/models`                | OpenAI                |
| Zverejniť | `/v1/messages/count_tokens` | Antropický            |
| ZÍSKAJTE  | `/v1beta/modely`            | Blíženci              |
| Zverejniť | `/v1beta/modely/{...cesta}` | Gemini generovaťObsah |
| Zverejniť | `/v1/api/chat`              | Ollama                | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Ak chýba predpona poskytovateľa, automaticky sa pridá. Nezhodné modely vrátia hodnotu „400“.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Príklad odpovede:```json
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

| Koncový bod | Metóda | Popis |
| ------------------------------ | ------- | ---------------------- |
| `/api/auth/login` | Zverejniť | Prihlásiť sa |
| `/api/auth/logout` | Zverejniť | Odhlásiť sa |
| `/api/settings/require-login` | GET/PUT | Prepnúť požadované prihlásenie |### Provider Management

| Koncový bod | Metóda | Popis |
| ----------------------------- | ---------------- | ------------------------- |
| `/api/poskytovatelia` | ZÍSKAŤ/POSLAŤ | Zoznam / vytvorenie poskytovateľov |
| `/api/providers/[id]` | GET/PUT/DELETE | Spravovať poskytovateľa |
| `/api/providers/[id]/test` | Zverejniť | Test pripojenia poskytovateľa |
| `/api/providers/[id]/models` | ZÍSKAJTE | Zoznam modelov poskytovateľov |
| `/api/providers/validate` | Zverejniť | Overiť konfiguráciu poskytovateľa |
| `/api/provider-nodes*` | Rôzne | Správa uzla poskytovateľa |
| `/api/provider-models` | ZÍSKAŤ/POSLAŤ/VYMAZAŤ | Vlastné modely |### OAuth Flows

| Koncový bod | Metóda | Popis |
| --------------------------------- | ------- | ------------------------ |
| `/api/oauth/[poskytovateľ]/[akcia]` | Rôzne | OAuth špecifické pre poskytovateľa |### Routing & Config

| Koncový bod | Metóda | Popis |
| ---------------------- | -------- | ------------------------------ |
| `/api/models/alias` | ZÍSKAŤ/POSLAŤ | Modelové aliasy |
| `/api/models/catalog` | ZÍSKAJTE | Všetky modely podľa poskytovateľa + typ |
| `/api/combos*` | Rôzne | Kombinovaný manažment |
| `/api/keys*` | Various  | Správa kľúčov API |
| `/api/pricing` | ZÍSKAJTE | Cena modelu |### Usage & Analytics

| Koncový bod | Metóda | Popis |
| ---------------------------- | ------ | --------------------- |
| `/api/usage/history` | ZÍSKAJTE | História používania |
| `/api/usage/logs` | ZÍSKAJTE | Denníky používania |
| `/api/usage/request-logs` | ZÍSKAJTE | Protokoly na úrovni žiadosti |
| `/api/usage/[connectionId]` | ZÍSKAJTE | Použitie na pripojenie |### Settings

| Koncový bod | Metóda | Popis |
| -------------------------------- | -------------- | ----------------------- |
| `/api/settings` | GET/PUT/PATCH | Všeobecné nastavenia |
| `/api/settings/proxy` | GET/PUT | Konfigurácia sieťového proxy |
| `/api/settings/proxy/test` | Zverejniť | Test pripojenia proxy |
| `/api/settings/ip-filter` | GET/PUT | Zoznam povolených/blokovaných IP |
| `/api/settings/thinking-budget` | GET/PUT | Zdôvodnenie symbolického rozpočtu |
| `/api/settings/system-prompt` | GET/PUT | Výzva globálneho systému |### Monitoring

| Koncový bod | Metóda | Popis |
| ------------------------- | ---------- | --------------------------------------------------------------------------------------------------
| `/api/sessions` | ZÍSKAJTE | Sledovanie aktívnej relácie |
| `/api/rate-limits` | ZÍSKAJTE | Limity sadzieb na účet |
| `/api/monitoring/health` | ZÍSKAJTE | Kontrola stavu + súhrn poskytovateľa (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | GET/DELETE | Štatistiky vyrovnávacej pamäte / vymazať |### Backup & Export/Import

| Koncový bod | Metóda | Popis |
| ---------------------------- | ------ | ---------------------------------------- |
| `/api/db-backups` | ZÍSKAJTE | Zoznam dostupných záloh |
| `/api/db-backups` | PUT | Vytvorte manuálnu zálohu |
| `/api/db-backups` | Zverejniť | Obnoviť z konkrétnej zálohy |
| `/api/db-backups/export` | ZÍSKAJTE | Stiahnuť databázu ako súbor .sqlite |
| `/api/db-backups/import` | Zverejniť | Nahrajte súbor .sqlite na nahradenie databázy |
| `/api/db-backups/exportAll` | ZÍSKAJTE | Stiahnite si úplnú zálohu ako archív .tar.gz |### Cloud Sync

| Koncový bod | Metóda | Popis |
| ----------------------- | ------- | ---------------------- |
| `/api/sync/cloud` | Rôzne | Operácie synchronizácie s cloudom |
| `/api/sync/initialize` | Zverejniť | Inicializovať synchronizáciu |
| `/api/cloud/*` | Rôzne | Správa cloudu |### Tunnels

| Koncový bod | Metóda | Popis |
| --------------------------- | ------ | ------------------------------------------------------------------------ |
| `/api/tunely/cloudflared` | ZÍSKAJTE | Prečítajte si stav inštalácie/spustenia Cloudflare Quick Tunnel pre dashboard |
| `/api/tunely/cloudflared` | Zverejniť | Povoliť alebo zakázať rýchly tunel Cloudflare (`action=enable/disable`) |### CLI Tools

| Koncový bod | Metóda | Popis |
| ----------------------------------- | ------ | -------------------- |
| `/api/cli-tools/claude-settings` | ZÍSKAJTE | Claude stav CLI |
| `/api/cli-tools/codex-settings` | ZÍSKAJTE | Status Codex CLI |
| `/api/cli-tools/droid-settings` | ZÍSKAJTE | Stav CLI Droid |
| `/api/cli-tools/openclaw-settings` | ZÍSKAJTE | Stav OpenClaw CLI |
| `/api/cli-tools/runtime/[toolId]` | ZÍSKAJTE | Generic CLI runtime |

Odpovede CLI zahŕňajú: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Koncový bod | Metóda | Popis |
| ------------------ | ------ | --------------------------------------------------------- |
| `/api/acp/agents` | ZÍSKAJTE | Zoznam všetkých zistených agentov (vstavaných + vlastných) so stavom |
| `/api/acp/agents` | Zverejniť | Pridať vlastného agenta alebo obnoviť vyrovnávaciu pamäť detekcie |
| `/api/acp/agents` | VYMAZAŤ | Odstráňte vlastného agenta pomocou parametra dotazu `id` |

Odpoveď GET zahŕňa „agentov[]“ (identifikátor, názov, binárny súbor, verzia, nainštalovaný, protokol, isCustom) a „summary“ (celkom, nainštalovaný, nenájdený, vstavaný, vlastný).### Resilience & Rate Limits

| Koncový bod | Metóda | Popis |
| ------------------------ | --------- | -------------------------------- |
| `/api/resilience` | GET/PATCH | Získať/aktualizovať profily odolnosti |
| `/api/resilience/reset` | Zverejniť | Resetujte ističe |
| `/api/rate-limits` | ZÍSKAJTE | Stav limitu sadzby na účet |
| `/api/rate-limit` | ZÍSKAJTE | Konfigurácia globálneho limitu sadzby |### Evals

| Koncový bod | Metóda | Popis |
| ------------ | -------- | ---------------------------------- |
| `/api/evals` | ZÍSKAŤ/POSLAŤ | Vypísať vyhodnocovacie sady / spustiť vyhodnotenie |### Policies

| Koncový bod | Metóda | Popis |
| ---------------- | ---------------- | ------------------------ |
| "/api/politiky" | ZÍSKAŤ/POSLAŤ/VYMAZAŤ | Spravovať pravidlá smerovania |### Compliance

| Koncový bod | Metóda | Popis |
| ---------------------------- | ------ | ------------------------------ |
| `/api/compliance/audit-log` | ZÍSKAJTE | Protokol auditu súladu (posledné N) |### v1beta (Gemini-Compatible)

| Koncový bod | Metóda | Popis |
| --------------------------- | ------ | ---------------------------------- |
| `/v1beta/modely` | ZÍSKAJTE | Zoznam modelov vo formáte Gemini |
| `/v1beta/modely/{...cesta}` | Zverejniť | Koncový bod Gemini `generateContent` |

Tieto koncové body odzrkadľujú formát API Gemini pre klientov, ktorí očakávajú natívnu kompatibilitu Gemini SDK.### Internal / System APIs

| Koncový bod | Metóda | Popis |
| ---------------- | ------ | ----------------------------------------------------- |
| `/api/init` | ZÍSKAJTE | Kontrola inicializácie aplikácie (používa sa pri prvom spustení) |
| `/api/tags` | ZÍSKAJTE | Modelové štítky kompatibilné s Ollamou (pre klientov Ollamy) |
| `/api/restart` | Zverejniť | Spustenie elegantného reštartu servera |
| `/api/shutdown` | Zverejniť | Spustiť elegantné vypnutie servera |

>**Poznámka:**Tieto koncové body sú používané interne systémom alebo kvôli kompatibilite klienta Ollama. Koncoví používatelia ich zvyčajne nevolajú.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Prepisujte zvukové súbory pomocou Deepgram alebo AssemblyAI.

**Žiadosť:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Odpoveď:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Podporovaní poskytovatelia:**`deepgram/nova-3`, `assemblyai/best`.

**Podporované formáty:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Pre klientov, ktorí používajú formát Ollama's API:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Žiadosti sa automaticky prekladajú medzi Ollama a internými formátmi.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Odpoveď:**```json
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

1. Klient odošle požiadavku na `/v1/*`
2. Volanie obslužného programu trasy `handleChat`, `handleEmbedding`, `handleAudioTranscription` alebo `handleImageGeneration`
3. Model je vyriešený (priamy poskytovateľ/model alebo alias/kombo)
4. Prihlasovacie údaje vybrané z lokálnej databázy s filtrovaním dostupnosti účtu
5. Pre chat: `handleChatCore` — detekcia formátu, preklad, kontrola vyrovnávacej pamäte, kontrola idempotencie
6. Exekútor poskytovateľa odošle upstream požiadavku
7. Odpoveď preložená späť do formátu klienta (chat) alebo vrátená tak, ako je (vložené/obrázky/audio)
8. Používanie/protokolovanie zaznamenané
9. Záložný postup sa vzťahuje na chyby podľa pravidiel komba

Úplný odkaz na architektúru: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Trasy riadiaceho panela (`/dashboard/*`) používajú súbor cookie `auth_token`
- Prihlásenie používa uložený hash hesla; záložné k `INITIAL_PASSWORD`
- `requireLogin` prepínateľné cez `/api/settings/require-login`
- trasy `/v1/*` voliteľne vyžadujú kľúč API nosiča, keď je `REQUIRE_API_KEY=true`
