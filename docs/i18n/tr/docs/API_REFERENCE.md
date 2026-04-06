# API Reference (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Tüm OmniRoute API uç noktaları için eksiksiz referans.---

## Table of Contents

- [Sohbet Tamamlamaları](#sohbet tamamlamaları)
- [Gömmeler](#gömmeler)
- [Görüntü Oluşturma](#görüntü oluşturma)
- [Modelleri Listele](#list-models)
- [Uyumluluk Uç Noktaları](#uyumluluk-uç noktaları)
- [Anlamsal Önbellek](#semantik-önbellek)
- [Gösterge Paneli ve Yönetim](#gösterge paneli--yönetim)
- [İstek İşleniyor](#istek işleniyor)
- [Kimlik Doğrulama](#kimlik doğrulama)---

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

| Başlık                       | Yön   | Açıklama                                              |
| ---------------------------- | ----- | ----------------------------------------------------- |
| `X-OmniRoute-Önbellek Yok`   | Talep | Önbelleği atlamak için "true" olarak ayarlayın        |
| 'X-OmniRoute-İlerleme'       | Talep | İlerleme olayları için "true" olarak ayarlayın        |
| 'X-Oturum Kimliği'           | Talep | Harici oturum benzeşimi için yapışkan oturum anahtarı |
| 'x_session_id'               | Talep | Alt çizgi çeşidi de kabul edilir (doğrudan HTTP)      |
| 'Idempotency-Anahtarı'       | Talep | Tekilleştirme anahtarı (5s penceresi)                 |
| 'X-İstek Kimliği'            | Talep | Alternatif yinelenenleri kaldırma anahtarı            |
| 'X-OmniRoute-Önbellek'       | Yanıt | 'HIT' veya 'MISS' (akışsız)                           |
| 'X-OmniRoute-Idempotent'     | Yanıt | tekilleştirilmişse "doğru"                            |
| 'X-OmniRoute-İlerleme'       | Yanıt | ilerleme takibi açıksa 'etkin'                        |
| 'X-OmniRoute-Oturum Kimliği' | Yanıt | OmniRoute tarafından kullanılan etkili oturum kimliği |

> Nginx notu: alt çizgi başlıklarına güveniyorsanız (örneğin 'x_session_id'), 'underscores_in_headers on;' seçeneğini etkinleştirin.---

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

Mevcut sağlayıcılar: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Mevcut sağlayıcılar: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Yöntem | Yol                         | Biçim                  |
| ------ | --------------------------- | ---------------------- | ----------------------------- |
| YAYIN  | `/v1/sohbet/tamamlamalar`   | OpenAI                 |
| YAYIN  | `/v1/mesajlar`              | Antropik               |
| YAYIN  | `/v1/yanıtlar`              | OpenAI Yanıtları       |
| YAYIN  | `/v1/yerleştirmeler`        | OpenAI                 |
| YAYIN  | `/v1/images/jenerasyonlar`  | OpenAI                 |
| AL     | `/v1/models`                | OpenAI                 |
| YAYIN  | `/v1/messages/count_tokens` | Antropik               |
| AL     | `/v1beta/models`            | İkizler                |
| YAYIN  | `/v1beta/models/{...path}`  | İkizler İçerik Oluştur |
| YAYIN  | `/v1/api/sohbet`            | Olma                   | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Sağlayıcı öneki eksikse otomatik olarak eklenir. Eşleşmeyen modeller "400" değerini döndürür.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Yanıt örneği:```json
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

| Uç nokta | Yöntem | Açıklama |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/login` | YAYIN | Giriş |
| `/api/auth/logout` | YAYIN | Oturumu kapat |
| `/api/settings/require-login` | AL/koy | Oturum açmayı aç / kapat |### Provider Management

| Uç nokta | Yöntem | Açıklama |
| ---------------------------- | --------------- | ------------------------ |
| `/api/sağlayıcılar` | AL/GÖNDER | Sağlayıcıları listele / oluştur |
| `/api/providers/[id]` | AL/PUT/SİL | Bir sağlayıcıyı yönetin |
| `/api/providers/[id]/test` | YAYIN | Sağlayıcı bağlantısını test edin |
| `/api/providers/[id]/models` | AL | Sağlayıcı modellerini listeleyin |
| `/api/providers/validate` | YAYIN | Sağlayıcı yapılandırmasını doğrulayın |
| `/api/provider-nodes*` | Çeşitli | Sağlayıcı düğüm yönetimi |
| `/api/provider-models` | AL/GÖNDER/SİL | Özel modeller |### OAuth Flows

| Uç nokta | Yöntem | Açıklama |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[provider]/[action]` | Çeşitli | Sağlayıcıya özel OAuth |### Routing & Config

| Uç nokta | Yöntem | Açıklama |
| --------------------- | -------- | ----------------------------- |
| `/api/models/takma ad` | AL/GÖNDER | Model takma adları |
| `/api/models/catalog` | AL | Sağlayıcıya göre tüm modeller + tür |
| `/api/kombinasyonlar*` | Çeşitli | Kombinasyon yönetimi |
| `/api/keys*` | Çeşitli | API anahtar yönetimi |
| `/api/pricing` | AL | Model fiyatlandırması |### Usage & Analytics

| Uç nokta | Yöntem | Açıklama |
| ---------------------------- | ------ | -------------------- |
| `/api/kullanım/geçmiş` | AL | Kullanım geçmişi |
| `/api/kullanım/loglar` | AL | Kullanım günlükleri |
| `/api/usage/request-logs` | AL | İstek düzeyindeki günlükler |
| `/api/kullanım/[bağlantıKimliği]` | AL | Bağlantı başına kullanım |### Settings

| Uç nokta | Yöntem | Açıklama |
| ------------------------------- | ------------- | ----------------------- |
| `/api/settings` | AL/koy/yama | Genel ayarlar |
| `/api/settings/proxy` | AL/koy | Ağ proxy yapılandırması |
| `/api/settings/proxy/test` | YAYIN | Proxy bağlantısını test edin |
| `/api/settings/ip-filter` | AL/koy | IP izin verilenler listesi/engellenenler listesi |
| `/api/settings/thinking-budget` | AL/koy | Belirteç bütçesinin akıl yürütmesi |
| `/api/settings/system-prompt` | AL/koy | Küresel sistem istemi |### Monitoring

| Uç nokta | Yöntem | Açıklama |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------- |
| `/api/sessions` | AL | Aktif oturum takibi |
| `/api/hız-limitleri` | AL | Hesap başına ücret limitleri |
| `/api/monitoring/health` | AL | Durum kontrolü + sağlayıcı özeti (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | AL/SİL | Önbellek istatistikleri / temizle |### Backup & Export/Import

| Uç nokta | Yöntem | Açıklama |
| ---------------------------- | ------ | --------------------------------------- |
| `/api/db-backups` | AL | Mevcut yedeklemeleri listele |
| `/api/db-backups` | KOY | Manuel yedekleme oluşturun |
| `/api/db-backups` | YAYIN | Belirli bir yedekten geri yükleme |
| `/api/db-backups/export` | AL | Veritabanını .sqlite dosyası olarak indir |
| `/api/db-backups/import` | YAYIN | Veritabanını değiştirmek için .sqlite dosyasını yükleyin |
| `/api/db-backups/exportAll` | AL | Tam yedeklemeyi .tar.gz arşivi olarak indirin |### Cloud Sync

| Uç nokta | Yöntem | Açıklama |
| ----------------------- | ------- | --------------------- |
| `/api/sync/cloud` | Çeşitli | Bulut senkronizasyon işlemleri |
| '/api/sync/initialize' | YAYIN | Senkronizasyonu başlat |
| `/api/bulut/*` | Çeşitli | Bulut yönetimi |### Tunnels

| Uç nokta | Yöntem | Açıklama |
| -------------------------- | ------ | ------------------------------------------------------------ |
| `/api/tunnels/cloudflared` | AL | Kontrol paneli için Cloudflare Hızlı Tünel kurulum/çalışma zamanı durumunu okuyun |
| `/api/tunnels/cloudflared` | YAYIN | Cloudflare Hızlı Tüneli'ni etkinleştirin veya devre dışı bırakın (`action=enable/disable`) |### CLI Tools

| Uç nokta | Yöntem | Açıklama |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | AL | Claude CLI durumu |
| `/api/cli-tools/codex-settings` | AL | Codex CLI durumu |
| `/api/cli-tools/droid-settings` | AL | Droid CLI durumu |
| `/api/cli-tools/openclaw-settings` | AL | OpenClaw CLI durumu |
| `/api/cli-tools/runtime/[toolId]` | AL | Genel CLI çalışma zamanı |

CLI yanıtları şunları içerir: "kurulu", "çalıştırılabilir", "komut", "komutPath", "runtimeMode", "sebep".### ACP Agents

| Uç nokta | Yöntem | Açıklama |
| ----------------- | ------ | --------------------------------------------- |
| `/api/acp/agents` | AL | Algılanan tüm aracıları (yerleşik + özel) durum bilgisi ile listeleyin |
| `/api/acp/agents` | YAYIN | Özel aracı ekleyin veya algılama önbelleğini yenileyin |
| `/api/acp/agents` | SİL | Özel aracıyı "kimlik" sorgu parametresine göre kaldırın |

GET yanıtı "agents[]" (kimlik, ad, ikili dosya, sürüm, yüklü, protokol, isCustom) ve "özet"i (toplam, yüklü, notFound, yerleşik, özel) içerir.### Resilience & Rate Limits

| Uç nokta | Yöntem | Açıklama |
| ----------------------- | --------- | ------------------------------- |
| `/api/esneklik` | AL/YAMA | Dayanıklılık profillerini alın/güncelleyin |
| `/api/resilience/reset` | YAYIN | Devre kesicileri sıfırlayın |
| `/api/hız-limitleri` | AL | Hesap başına oran sınırı durumu |
| `/api/rate-limit` | AL | Küresel oran sınırı yapılandırması |### Evals

| Uç nokta | Yöntem | Açıklama |
| ------------ | -------- | ---------------------------------- |
| `/api/evals` | AL/GÖNDER | Değerlendirme paketlerini listele / değerlendirmeyi çalıştır |### Policies

| Uç nokta | Yöntem | Açıklama |
| --------------- | --------------- | ----------------------- |
| `/api/policies` | AL/GÖNDER/SİL | Yönlendirme politikalarını yönetin |### Compliance

| Uç nokta | Yöntem | Açıklama |
| ---------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` | AL | Uyumluluk denetim günlüğü (son N) |### v1beta (Gemini-Compatible)

| Uç nokta | Yöntem | Açıklama |
| -------------------------- | ------ | ---------------------------------- |
| `/v1beta/models` | AL | Modelleri Gemini formatında listeleyin |
| `/v1beta/models/{...path}` | YAYIN | Gemini 'generateContent' uç noktası |

Bu uç noktalar, yerel Gemini SDK uyumluluğu bekleyen istemciler için Gemini'nin API formatını yansıtır.### Internal / System APIs

| Uç nokta | Yöntem | Açıklama |
| --------------- | ------ | ---------------------------------------------------- |
| '/api/init' | AL | Uygulama başlatma kontrolü (ilk çalıştırmada kullanılır) |
| `/api/tags` | AL | Ollama uyumlu model etiketleri (Ollama istemcileri için) |
| '/api/yeniden başlat' | YAYIN | Sunucunun zarif bir şekilde yeniden başlatılmasını tetikleyin |
| `/api/shutdown` | YAYIN | Sunucunun zarif bir şekilde kapatılmasını tetikleyin |

>**Not:**Bu uç noktalar sistem tarafından dahili olarak veya Ollama istemci uyumluluğu için kullanılır. Genellikle son kullanıcılar tarafından çağrılmazlar.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Deepgram veya AssemblyAI kullanarak ses dosyalarını yazıya dökün.

**Rica etmek:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Cevap:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Desteklenen sağlayıcılar:**"deepgram/nova-3", "assemblyai/best".

**Desteklenen formatlar:**"mp3", "wav", "m4a", "flac", "ogg", "webm".---

## Ollama Compatibility

Ollama'nın API biçimini kullanan istemciler için:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

İstekler Ollama ve dahili formatlar arasında otomatik olarak çevrilir.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Cevap:**```json
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

1. İstemci isteğini `/v1/*` adresine gönderir
2. Rota işleyicisi `handleChat`, `handleEmbedding`, `handleAudioTranscription` veya `handleImageGeneration`ı çağırır
3. Model çözüldü (doğrudan sağlayıcı/model veya takma ad/birleşik)
4. Hesap kullanılabilirliği filtrelemesi ile yerel veritabanından seçilen kimlik bilgileri
5. Sohbet için: `handleChatCore` — format algılama, çeviri, önbellek kontrolü, yetersizlik kontrolü
6. Sağlayıcı yürütücüsü yukarı akış isteği gönderir
7. Yanıt, istemci biçimine (sohbet) geri çevrildi veya olduğu gibi döndürüldü (yerleştirmeler/resimler/ses)
8. Kullanım/günlüğe kaydetme kaydedildi
9. Geri çekilme, birleşik kurallara göre hatalara uygulanır

Tam mimari referansı: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Kontrol paneli rotaları (`/dashboard/*`) 'auth_token' çerezini kullanır
- Giriş kayıtlı şifre karmasını kullanır; `INITIAL_PASSWORD`a geri dönüş
- 'requireLogin', '/api/settings/require-login' aracılığıyla değiştirilebilir
- `/v1/*` rotaları, `REQUIRE_API_KEY=true` olduğunda isteğe bağlı olarak Taşıyıcı API anahtarı gerektirir
