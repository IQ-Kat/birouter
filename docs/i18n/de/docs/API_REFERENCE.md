# API Reference (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Vollständige Referenz für alle OmniRoute-API-Endpunkte.---

## Table of Contents

- [Chat-Abschlüsse](#chat-completions)
- [Einbettungen](#embeddings)
- [Bildgenerierung](#image-generation)
- [Modelle auflisten](#list-models)
- [Kompatibilitätsendpunkte](#compatibility-endpoints)
- [Semantischer Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Anfrageverarbeitung](#request-processing)
- [Authentifizierung](#authentication)---

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

| Kopfzeile                | Richtung | Beschreibung                                                  |
| ------------------------ | -------- | ------------------------------------------------------------- | -------------- |
| `X-OmniRoute-No-Cache`   | Anfrage  | Auf „true“ setzen, um den Cache zu umgehen                    |
| `X-OmniRoute-Progress`   | Anfrage  | Für Fortschrittsereignisse auf „true“ setzen                  |
| „X-Sitzungs-ID“          | Anfrage  | Sticky-Sitzungsschlüssel für externe Sitzungsaffinität        |
| `x_session_id`           | Anfrage  | Unterstrichvariante wird ebenfalls akzeptiert (direktes HTTP) |
| `Idempotenz-Schlüssel`   | Anfrage  | Dedup-Schlüssel (5-Sekunden-Fenster)                          |
| `X-Request-Id`           | Anfrage  | Alternativer Deduplizierungsschlüssel                         |
| `X-OmniRoute-Cache`      | Antwort  | „HIT“ oder „MISS“ (kein Streaming)                            |
| `X-OmniRoute-Idempotent` | Antwort  | „true“, wenn dedupliziert                                     |
| `X-OmniRoute-Progress`   | Antwort  | „aktiviert“, wenn Fortschrittsverfolgung auf                  |
| `X-OmniRoute-Session-Id` | Antwort  | Effektive Sitzungs-ID, die von OmniRoute                      | verwendet wird |

> Nginx-Hinweis: Wenn Sie sich auf Unterstrich-Header verlassen (z. B. „x_session_id“), aktivieren Sie „underscores_in_headers on;“.---

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

Verfügbare Anbieter: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Verfügbare Anbieter: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Methode | Pfad                        | Formatieren                 |
| ------- | --------------------------- | --------------------------- | ----------------------------- |
| POST    | `/v1/chat/completions`      | OpenAI                      |
| POST    | `/v1/messages`              | Anthropisch                 |
| POST    | `/v1/responses`             | OpenAI-Antworten            |
| POST    | `/v1/embeddings`            | OpenAI                      |
| POST    | `/v1/images/generations`    | OpenAI                      |
| GET     | `/v1/models`                | OpenAI                      |
| POST    | `/v1/messages/count_tokens` | Anthropisch                 |
| GET     | `/v1beta/models`            | Zwillinge                   |
| POST    | `/v1beta/models/{...path}`  | Zwillinge generierenContent |
| POST    | `/v1/api/chat`              | Ollama                      | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Das Anbieterpräfix wird automatisch hinzugefügt, wenn es fehlt. Nicht übereinstimmende Modelle geben „400“ zurück.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Antwortbeispiel:```json
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

| Endpunkt | Methode | Beschreibung |
| -------------- | ------- | --------------------- |
| `/api/auth/login` | POST | Anmelden |
| `/api/auth/logout` | POST | Abmelden |
| `/api/settings/require-login` | GET/PUT | Anmeldung erforderlich umschalten |### Provider Management

| Endpunkt | Methode | Beschreibung |
| ------------- | --------------- | ------------------------ |
| `/api/providers` | GET/POST | Anbieter auflisten/anlegen |
| `/api/providers/[id]` | GET/PUT/DELETE | Einen Anbieter verwalten |
| `/api/providers/[id]/test` | POST | Provider-Verbindung testen |
| `/api/providers/[id]/models` | GET | Anbietermodelle auflisten |
| `/api/providers/validate` | POST | Anbieterkonfiguration validieren |
| `/api/provider-nodes*` | Verschiedene | Provider-Knotenverwaltung |
| `/api/provider-models` | GET/POST/DELETE | Kundenspezifische Modelle |### OAuth Flows

| Endpunkt | Methode | Beschreibung |
| -------------------------------- | ------- | --------- |
| `/api/oauth/[Anbieter]/[Aktion]` | Verschiedene | Anbieterspezifisches OAuth |### Routing & Config

| Endpunkt | Methode | Beschreibung |
| --------------------- | -------- | -------------- |
| `/api/models/alias` | GET/POST | Modell-Aliase |
| `/api/models/catalog` | GET | Alle Modelle nach Anbieter + Typ |
| `/api/combos*` | Verschiedene | Combo-Management |
| `/api/keys*` | Verschiedene | API-Schlüsselverwaltung |
| `/api/pricing` | GET | Modellpreise |### Usage & Analytics

| Endpunkt | Methode | Beschreibung |
| ------------ | ------ | -------------------- |
| `/api/usage/history` | GET | Nutzungshistorie |
| `/api/usage/logs` | GET | Nutzungsprotokolle |
| `/api/usage/request-logs` | GET | Protokolle auf Anforderungsebene |
| `/api/usage/[connectionId]` | GET | Nutzung pro Verbindung |### Settings

| Endpunkt | Methode | Beschreibung |
| ---------------- | ------------- | ---------------------- |
| `/api/settings` | GET/PUT/PATCH | Allgemeine Einstellungen |
| `/api/settings/proxy` | GET/PUT | Netzwerk-Proxy-Konfiguration |
| `/api/settings/proxy/test` | POST | Proxy-Verbindung testen |
| `/api/settings/ip-filter` | GET/PUT | IP-Zulassungs-/Blockierungsliste |
| `/api/settings/thinking-budget` | GET/PUT | Begründung des Token-Budgets |
| `/api/settings/system-prompt` | GET/PUT | Globale Systemaufforderung |### Monitoring

| Endpunkt | Methode | Beschreibung |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------- |
| `/api/sessions` | GET | Aktive Sitzungsverfolgung |
| `/api/rate-limits` | GET | Tariflimits pro Konto |
| `/api/monitoring/health` | GET | Integritätsprüfung + Anbieterzusammenfassung (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | ERHALTEN/LÖSCHEN | Cache-Statistiken / löschen |### Backup & Export/Import

| Endpunkt | Methode | Beschreibung |
| ------------ | ------ | --------------------------------------- |
| `/api/db-backups` | GET | Verfügbare Backups auflisten |
| `/api/db-backups` | PUT | Erstellen Sie ein manuelles Backup |
| `/api/db-backups` | POST | Von einem bestimmten Backup wiederherstellen |
| `/api/db-backups/export` | GET | Datenbank als .sqlite-Datei herunterladen |
| `/api/db-backups/import` | POST | Laden Sie die .sqlite-Datei hoch, um die Datenbank zu ersetzen |
| `/api/db-backups/exportAll` | GET | Vollständiges Backup als .tar.gz-Archiv herunterladen |### Cloud Sync

| Endpunkt | Methode | Beschreibung |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud` | Verschiedene | Cloud-Synchronisierungsvorgänge |
| `/api/sync/initialize` | POST | Synchronisierung initialisieren |
| `/api/cloud/*` | Verschiedene | Cloud-Management |### Tunnels

| Endpunkt | Methode | Beschreibung |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | GET | Lesen Sie den Installations-/Laufzeitstatus von Cloudflare Quick Tunnel für das Dashboard |
| `/api/tunnels/cloudflared` | POST | Aktivieren oder deaktivieren Sie den Cloudflare Quick Tunnel (`action=enable/disable`) |### CLI Tools

| Endpunkt | Methode | Beschreibung |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | GET | Claude CLI-Status |
| `/api/cli-tools/codex-settings` | GET | Codex-CLI-Status |
| `/api/cli-tools/droid-settings` | GET | Droid-CLI-Status |
| `/api/cli-tools/openclaw-settings` | GET | OpenClaw CLI-Status |
| `/api/cli-tools/runtime/[toolId]` | GET | Generische CLI-Laufzeit |

Zu den CLI-Antworten gehören: „installed“, „runnable“, „command“, „commandPath“, „runtimeMode“, „reason“.### ACP Agents

| Endpunkt | Methode | Beschreibung |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/acp/agents` | GET | Alle erkannten Agenten (integriert + benutzerdefiniert) mit Status | auflisten
| `/api/acp/agents` | POST | Benutzerdefinierten Agent hinzufügen oder Erkennungscache aktualisieren |
| `/api/acp/agents` | LÖSCHEN | Entfernen Sie einen benutzerdefinierten Agenten anhand des Abfrageparameters „id“ |

Die GET-Antwort umfasst „agents[]“ (ID, Name, Binärdatei, Version, installiert, Protokoll, isCustom) und „summary“ (gesamt, installiert, notFound, integriert, benutzerdefiniert).### Resilience & Rate Limits

| Endpunkt | Methode | Beschreibung |
| --------- | --------- | ---------------- |
| `/api/resilience` | GET/PATCH | Resilienzprofile abrufen/aktualisieren |
| `/api/resilience/reset` | POST | Leistungsschalter zurücksetzen |
| `/api/rate-limits` | GET | Status der Ratenbegrenzung pro Konto |
| `/api/rate-limit` | GET | Konfiguration des globalen Ratenlimits |### Evals

| Endpunkt | Methode | Beschreibung |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | GET/POST | Evaluierungssuiten auflisten / Evaluierung ausführen |### Policies

| Endpunkt | Methode | Beschreibung |
| --------------- | --------------- | --------- |
| `/api/policies` | GET/POST/DELETE | Routing-Richtlinien verwalten |### Compliance

| Endpunkt | Methode | Beschreibung |
| ------------ | ------ | -------------- |
| `/api/compliance/audit-log` | GET | Compliance-Audit-Protokoll (letztes N) |### v1beta (Gemini-Compatible)

| Endpunkt | Methode | Beschreibung |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/models` | GET | Modelle im Gemini-Format auflisten |
| `/v1beta/models/{...path}` | POST | Gemini-Endpunkt „generateContent“ |

Diese Endpunkte spiegeln das API-Format von Gemini für Kunden wider, die native Gemini SDK-Kompatibilität erwarten.### Internal / System APIs

| Endpunkt | Methode | Beschreibung |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | GET | Überprüfung der Anwendungsinitialisierung (wird beim ersten Start verwendet) |
| `/api/tags` | GET | Ollama-kompatible Modell-Tags (für Ollama-Clients) |
| `/api/restart` | POST | Ordentlichen Serverneustart auslösen |
| `/api/shutdown` | POST | Ordentliches Herunterfahren des Servers auslösen |

>**Hinweis:**Diese Endpunkte werden intern vom System oder für die Ollama-Client-Kompatibilität verwendet. Sie werden normalerweise nicht von Endbenutzern aufgerufen.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transkribieren Sie Audiodateien mit Deepgram oder AssemblyAI.

**Anfrage:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Antwort:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Unterstützte Anbieter:**„deepgram/nova-3“, „assemblyai/best“.

**Unterstützte Formate:**„mp3“, „wav“, „m4a“, „flac“, „ogg“, „webm“.---

## Ollama Compatibility

Für Kunden, die das API-Format von Ollama verwenden:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Anfragen werden automatisch zwischen Ollama und internen Formaten übersetzt.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Antwort:**```json
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

1. Der Client sendet eine Anfrage an „/v1/\*“.
2. Der Routenhandler ruft „handleChat“, „handleEmbedding“, „handleAudioTranscription“ oder „handleImageGeneration“ auf
3. Modell wird aufgelöst (direkter Anbieter/Modell oder Alias/Kombination)
4. Aus der lokalen Datenbank ausgewählte Anmeldeinformationen mit Kontoverfügbarkeitsfilterung
5. Für Chat: „handleChatCore“ – Formaterkennung, Übersetzung, Cache-Prüfung, Idempotenzprüfung
6. Der Executor des Anbieters sendet eine Upstream-Anfrage
7. Antwort zurück ins Client-Format übersetzt (Chat) oder unverändert zurückgegeben (Einbettungen/Bilder/Audio)
8. Nutzung/Protokollierung aufgezeichnet
9. Bei Fehlern gilt ein Fallback gemäß den Combo-Regeln

Vollständige Architekturreferenz: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Dashboard-Routen (`/dashboard/*`) verwenden das Cookie „auth_token“.
- Bei der Anmeldung wird der gespeicherte Passwort-Hash verwendet. Fallback auf „INITIAL_PASSWORD“.
- „requireLogin“ umschaltbar über „/api/settings/require-login“.
  – „/v1/\*“-Routen erfordern optional einen Bearer-API-Schlüssel, wenn „REQUIRE_API_KEY=true“ ist
