# API Reference (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Pełna dokumentacja dla wszystkich punktów końcowych API OmniRoute.---

## Table of Contents

- [Zakończenia czatu](#zakończenia czatu)
- [Osadzenia](#osadzenia)
- [Generowanie obrazu](#generowanie obrazu)
- [Lista modeli](#list-models)
- [Punkty końcowe zgodności](#punkty końcowe zgodności)
- [Pamięć podręczna semantyczna](#pamięć podręczna semantyczna)
- [Panel i zarządzanie](#panel kontrolny--zarządzanie)
- [Przetworzenie żądania](#przetwarzanie żądania)
- [Uwierzytelnienie](#uwierzytelnienie)---

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

| Nagłówek                              | Kierunek  | Opis                                                           |
| ------------------------------------- | --------- | -------------------------------------------------------------- |
| `X-OmniRoute-Brak pamięci podręcznej` | Prośba    | Ustaw na `true`, aby ominąć pamięć podręczną                   |
| `X-OmniRoute-Progress`                | Prośba    | Ustaw na „true” dla zdarzeń postępu                            |
| `Identyfikator sesji X`               | Prośba    | Przyklejony klucz sesji dla powinowactwa sesji zewnętrznej     |
| `x_sesja_id`                          | Prośba    | Akceptowany jest także wariant podkreślenia (bezpośredni HTTP) |
| `Klucz idempotencji`                  | Prośba    | Klucz deduplikacji (okno 5s)                                   |
| `Identyfikator żądania X`             | Prośba    | Alternatywny klucz deduplikacji                                |
| `X-OmniRoute-Cache`                   | Odpowiedź | `HIT` lub `MISS` (bez przesyłania strumieniowego)              |
| `X-OmniRoute-Idempotent`              | Odpowiedź | `true`, jeśli deduplikowano                                    |
| `X-OmniRoute-Progress`                | Odpowiedź | „włączone”, jeśli śledzenie postępu jest włączone              |
| `Identyfikator sesji X-OmniRoute`     | Odpowiedź | Efektywny identyfikator sesji używany przez OmniRoute          |

> Uwaga Nginx: jeśli polegasz na nagłówkach podkreślonych (na przykład `x_session_id`), włącz `underscores_in_headers on;`.---

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

Dostępni dostawcy: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Dostępni dostawcy: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Metoda   | Ścieżka                        | Formatuj                     |
| -------- | ------------------------------ | ---------------------------- | ----------------------------- |
| POST     | `/v1/czat/uzupełnienia`        | OpenAI                       |
| POST     | `/v1/wiadomości`               | Antropiczny                  |
| POST     | `/v1/odpowiedzi`               | Odpowiedzi OpenAI            |
| POST     | `/v1/osadzania`                | OpenAI                       |
| POST     | `/v1/obrazy/generacje`         | OpenAI                       |
| OTRZYMAJ | `/v1/modele`                   | OpenAI                       |
| POST     | `/v1/wiadomości/liczba_tokens` | Antropiczny                  |
| OTRZYMAJ | `/v1beta/modele`               | Bliźnięta                    |
| POST     | `/v1beta/models/{...ścieżka}`  | Bliźnięta generują zawartość |
| POST     | `/v1/api/czat`                 | Ollama                       | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Prefiks dostawcy jest dodawany automatycznie, jeśli go brakuje. Niedopasowane modele zwracają „400”.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Przykład odpowiedzi:```json
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

| Punkt końcowy | Metoda | Opis |
| ------------------------------ | -------- | ----------------------------------- |
| `/api/auth/login` | POST | Zaloguj |
| `/api/auth/logout` | POST | Wyloguj |
| `/api/settings/require-login` | POBIERZ/WSTAW | Przełącz wymagane logowanie |### Provider Management

| Punkt końcowy | Metoda | Opis |
| ---------------------------- | --------------- | ------------------------ |
| `/api/dostawcy` | POBIERZ/WYŚLIJ | Lista / tworzenie dostawców |
| `/api/providers/[id]` | POBIERZ/PUT/USUŃ | Zarządzaj dostawcą |
| `/api/providers/[id]/test` | POST | Połączenie z dostawcą testów |
| `/api/providers/[id]/models` | OTRZYMAJ | Lista modeli dostawców |
| `/api/providers/validate` | POST | Sprawdź konfigurację dostawcy |
| `/api/węzły-dostawcy*` | Różne | Zarządzanie węzłami dostawcy |
| `/api/provider-models` | POBIERZ/POST/USUŃ | Modele niestandardowe |### OAuth Flows

| Punkt końcowy | Metoda | Opis |
| -------------------------------- | -------- | ------------------------ |
| `/api/oauth/[dostawca]/[akcja]` | Różne | OAuth specyficzne dla dostawcy |### Routing & Config

| Punkt końcowy | Metoda | Opis |
| ----------------------------------- | -------- | ------------------------------ |
| `/api/modele/alias` | POBIERZ/WYŚLIJ | Aliasy modeli |
| `/api/modele/katalog` | OTRZYMAJ | Wszystkie modele według dostawcy + typ |
| `/api/combo*` | Różne | Zarządzanie kombinacjami |
| `/api/klucze*` | Różne | Zarządzanie kluczami API |
| `/api/cennik` | OTRZYMAJ | Ceny modeli |### Usage & Analytics

| Punkt końcowy | Metoda | Opis |
| ------------------------------------- | ------ | ---------------------------------- |
| `/api/użytkowanie/historia` | OTRZYMAJ | Historia użytkowania |
| `/api/usage/logs` | OTRZYMAJ | Dzienniki użytkowania |
| `/api/usage/request-logs` | OTRZYMAJ | Dzienniki na poziomie żądania |
| `/api/usage/[identyfikator połączenia]` | OTRZYMAJ | Użycie na połączenie |### Settings

| Punkt końcowy | Metoda | Opis |
| ---------------------------------------- | --------- | -------------------------------- |
| `/api/ustawienia` | POBIERZ/WSTAW/POPRAW | Ustawienia ogólne |
| `/api/ustawienia/proxy` | POBIERZ/WSTAW | Konfiguracja serwera proxy sieci |
| `/api/settings/proxy/test` | POST | Testuj połączenie proxy |
| `/api/settings/ip-filter` | POBIERZ/WSTAW | Lista dozwolonych/blokowanych adresów IP |
| `/api/settings/myślenie-budżet` | POBIERZ/WSTAW | Rozumowanie budżetu symbolicznego |
| `/api/settings/system-prompt` | POBIERZ/WSTAW | Globalny monit systemowy |### Monitoring

| Punkt końcowy | Metoda | Opis |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `/api/sesje` | OTRZYMAJ | Śledzenie aktywnej sesji |
| `/api/limity-szybkości` | OTRZYMAJ | Limity stawek za konto |
| `/api/monitorowanie/zdrowie` | OTRZYMAJ | Kontrola stanu + podsumowanie dostawcy (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | POBIERZ/USUŃ | Statystyki pamięci podręcznej / wyczyść |### Backup & Export/Import

| Punkt końcowy | Metoda | Opis |
| ------------------------------------- | ------ | --------------------------------------- |
| `/api/db-backups` | OTRZYMAJ | Lista dostępnych kopii zapasowych |
| `/api/db-backups` | POSTAW | Utwórz ręczną kopię zapasową |
| `/api/db-backups` | POST | Przywróć z określonej kopii zapasowej |
| `/api/db-backups/export` | OTRZYMAJ | Pobierz bazę danych jako plik .sqlite |
| `/api/db-backups/import` | POST | Prześlij plik .sqlite, aby zastąpić bazę danych |
| `/api/db-backups/exportAll` | OTRZYMAJ | Pobierz pełną kopię zapasową jako archiwum .tar.gz |### Cloud Sync

| Punkt końcowy | Metoda | Opis |
| -------------------------------- | -------- | ----------------------------------- |
| `/api/sync/chmura` | Różne | Operacje synchronizacji w chmurze |
| `/api/sync/initialize` | POST | Zainicjuj synchronizację |
| `/api/chmura/*` | Różne | Zarządzanie chmurą |### Tunnels

| Punkt końcowy | Metoda | Opis |
| ------------------------------------ | ------ | ---------------------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | OTRZYMAJ | Przeczytaj stan instalacji/działania szybkiego tunelu Cloudflare dla panelu kontrolnego |
| `/api/tunnels/cloudflared` | POST | Włącz lub wyłącz Szybki tunel Cloudflare („akcja=włącz/wyłącz”) |### CLI Tools

| Punkt końcowy | Metoda | Opis |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | OTRZYMAJ | Stan CLI Claude'a |
| `/api/cli-tools/codex-settings` | OTRZYMAJ | Stan CLI Kodeksu |
| `/api/cli-tools/droid-settings` | OTRZYMAJ | Stan CLI droida |
| `/api/cli-tools/openclaw-settings` | OTRZYMAJ | Stan interfejsu CLI OpenClaw |
| `/api/cli-tools/runtime/[toolId]` | OTRZYMAJ | Ogólne środowisko wykonawcze CLI |

Odpowiedzi CLI obejmują: „zainstalowane”, „wykonalne”, „polecenie”, „ścieżka polecenia”, „tryb runtime”, „powód”.### ACP Agents

| Punkt końcowy | Metoda | Opis |
| ------------------ | ------ | ------------------------------------------------------------------ |
| `/api/acp/agents` | OTRZYMAJ | Lista wszystkich wykrytych agentów (wbudowanych i niestandardowych) ze statusem |
| `/api/acp/agents` | POST | Dodaj niestandardowego agenta lub odśwież pamięć podręczną wykrywania |
| `/api/acp/agents` | USUŃ | Usuń niestandardowego agenta według parametru zapytania `id` |

Odpowiedź GET zawiera „agents[]” (identyfikator, nazwa, plik binarny, wersja, zainstalowany, protokół, isCustom) i „podsumowanie” (ogółem, zainstalowane, notFound, wbudowane, niestandardowe).### Resilience & Rate Limits

| Punkt końcowy | Metoda | Opis |
| ------------------------ | --------- | ---------------------------------------- |
| `/api/odporność` | POBIERZ/ŁATKA | Pobierz/zaktualizuj profile odporności |
| `/api/odporność/reset` | POST | Zresetuj wyłączniki automatyczne |
| `/api/limity-szybkości` | OTRZYMAJ | Stan limitu stawek za konto |
| `/api/limit-rate` | OTRZYMAJ | Konfiguracja globalnego limitu szybkości |### Evals

| Punkt końcowy | Metoda | Opis |
| ------------ | -------- | ---------------------------------- |
| `/api/evals` | POBIERZ/WYŚLIJ | Lista zestawów ewaluacyjnych / uruchomienie ewaluacji |### Policies

| Punkt końcowy | Metoda | Opis |
| --------------- | --------------- | ------------------------ |
| `/api/polityki` | POBIERZ/POST/USUŃ | Zarządzaj zasadami routingu |### Compliance

| Punkt końcowy | Metoda | Opis |
| ------------------------------------- | ------ | ------------------------------ |
| `/api/compliance/audit-log` | OTRZYMAJ | Dziennik audytu zgodności (ostatnie N) |### v1beta (Gemini-Compatible)

| Punkt końcowy | Metoda | Opis |
| ------------------------------------ | ------ | ---------------------------------- |
| `/v1beta/modele` | OTRZYMAJ | Lista modeli w formacie Gemini |
| `/v1beta/models/{...ścieżka}` | POST | Punkt końcowy `generateContent` Gemini |

Te punkty końcowe odzwierciedlają format API Gemini dla klientów, którzy oczekują natywnej zgodności Gemini SDK.### Internal / System APIs

| Punkt końcowy | Metoda | Opis |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` | OTRZYMAJ | Kontrola inicjalizacji aplikacji (używana przy pierwszym uruchomieniu) |
| `/api/tags` | OTRZYMAJ | Tagi modeli zgodnych z Ollama (dla klientów Ollama) |
| `/api/restart` | POST | Wywołaj łagodny restart serwera |
| `/api/zamknięcie` | POST | Wywołaj łagodne zamknięcie serwera |

>**Uwaga:**Te punkty końcowe są używane wewnętrznie przez system lub w celu zapewnienia zgodności z klientem Ollama. Zwykle nie są one wywoływane przez użytkowników końcowych.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transkrypuj pliki audio za pomocą Deepgram lub AssemblyAI.

**Wniosek:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Odpowiedź:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Obsługiwani dostawcy:**`deepgram/nova-3`, `assemblyai/best`.

**Obsługiwane formaty:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Dla klientów korzystających z formatu API Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Żądania są automatycznie tłumaczone pomiędzy formatami Ollama i formatami wewnętrznymi.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Odpowiedź:**```json
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

1. Klient wysyła żądanie do `/v1/*`
2. Procedura obsługi tras wywołuje `handleChat`, `handleEmbedding`, `handleAudioTranscription` lub `handleImageGeneration`
3. Model został rozwiązany (bezpośredni dostawca/model lub alias/kombinacja)
4. Poświadczenia wybrane z lokalnej bazy danych z filtrowaniem dostępności kont
5. Dla czatu: `handleChatCore` — wykrywanie formatu, tłumaczenie, sprawdzanie pamięci podręcznej, sprawdzanie idempotencji
6. Wykonawca dostawcy wysyła żądanie nadrzędne
7. Odpowiedź przetłumaczona z powrotem na format klienta (czat) lub zwrócona w niezmienionej postaci (osadzone elementy/obrazy/audio)
8. Zarejestrowano użycie/rejestrowanie
9. Rezerwa ma zastosowanie w przypadku błędów zgodnie z zasadami kombinacji

Pełne odniesienie do architektury: [`ARCHITEKTURA.md`](ARCHITEKTURA.md)---

## Authentication

- Trasy panelu kontrolnego (`/dashboard/*`) korzystają z pliku cookie `auth_token`
- Logowanie wykorzystuje zapisany skrót hasła; wróć do `INITIAL_PASSWORD`
- opcję `requireLogin` można przełączać za pomocą `/api/settings/require-login`
- Trasy `/v1/*` opcjonalnie wymagają klucza API nośnika, gdy `REQUIRE_API_KEY = true`
