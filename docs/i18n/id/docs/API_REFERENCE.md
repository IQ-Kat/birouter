# API Reference (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Referensi lengkap untuk semua titik akhir OmniRoute API.---

## Table of Contents

- [Penyelesaian Obrolan](#penyelesaian obrolan)
- [Penyematan](#penyematan)
- [Pembuatan Gambar](#pembuatan gambar)
- [Daftar Model](#daftar-model)
- [Titik Akhir Kompatibilitas](#titik akhir kompatibilitas)
- [Cache Semantik](#semantik-cache)
- [Dasbor & Manajemen](#dashboard--manajemen)
- [Pemrosesan Permintaan](#pemrosesan permintaan)
- [Otentikasi](#autentikasi)---

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

| Tajuk                     | Arah       | Deskripsi                                        |
| ------------------------- | ---------- | ------------------------------------------------ |
| `X-OmniRoute-Tanpa-Cache` | Permintaan | Setel ke `true` untuk melewati cache             |
| `Kemajuan-OmniRoute-X`    | Permintaan | Setel ke `true` untuk peristiwa kemajuan         |
| `Id-Sesi-X`               | Permintaan | Kunci sesi melekat untuk afinitas sesi eksternal |
| `x_sesi_id`               | Permintaan | Varian garis bawah juga diterima (HTTP langsung) |
| `Kunci Idempotensi`       | Permintaan | Kunci Dedup (jendela 5 detik)                    |
| `X-Permintaan-Id`         | Permintaan | Kunci dedup alternatif                           |
| `X-OmniRoute-Cache`       | Tanggapan  | `HIT` atau `MISS` (non-streaming)                |
| `X-OmniRoute-Idempotent`  | Tanggapan  | `benar` jika duplikatnya                         |
| `Kemajuan-OmniRoute-X`    | Tanggapan  | `diaktifkan` jika pelacakan kemajuan aktif       |
| `Id-Sesi-OmniRoute-`      | Tanggapan  | ID sesi efektif yang digunakan oleh OmniRoute    |

> Catatan Nginx: jika Anda mengandalkan header garis bawah (misalnya `x_session_id`), aktifkan `underscores_in_headers on;`.---

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

Penyedia yang tersedia: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Penyedia yang tersedia: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Metode   | Jalur                       | Format                     |
| -------- | --------------------------- | -------------------------- | ----------------------------- |
| POSTING  | `/v1/obrolan/penyelesaian`  | OpenAI                     |
| POSTING  | `/v1/pesan`                 | Antropik                   |
| POSTING  | `/v1/tanggapan`             | Tanggapan OpenAI           |
| POSTING  | `/v1/embeddings`            | OpenAI                     |
| POSTING  | `/v1/gambar/generasi`       | OpenAI                     |
| DAPATKAN | `/v1/model`                 | OpenAI                     |
| POSTING  | `/v1/messages/count_tokens` | Antropik                   |
| DAPATKAN | `/v1beta/model`             | Gemini                     |
| POSTING  | `/v1beta/models/{...path}`  | Gemini menghasilkan Konten |
| POSTING  | `/v1/api/obrolan`           | Ollama                     | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Awalan penyedia ditambahkan secara otomatis jika tidak ada. Model yang tidak cocok menghasilkan `400`.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Contoh tanggapan:```json
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

| Titik akhir | Metode | Deskripsi |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/login` | POSTING | Masuk |
| `/api/auth/keluar` | POSTING | Keluar |
| `/api/settings/memerlukan-login` | DAPATKAN/MASUKKAN | Beralih login diperlukan |### Provider Management

| Titik akhir | Metode | Deskripsi |
| ---------------------------- | --------------- | ------------------------ |
| `/api/penyedia` | DAPATKAN/POSTING | Daftar / buat penyedia |
| `/api/penyedia/[id]` | DAPATKAN/MASUKKAN/HAPUS | Kelola penyedia |
| `/api/providers/[id]/test` | POSTING | Koneksi penyedia tes |
| `/api/providers/[id]/models` | DAPATKAN | Daftar model penyedia |
| `/api/penyedia/validasi` | POSTING | Validasi konfigurasi penyedia |
| `/api/node-penyedia*` | Berbagai | Manajemen simpul penyedia |
| `/api/penyedia-model` | DAPATKAN/POSTING/HAPUS | Model khusus |### OAuth Flows

| Titik akhir | Metode | Deskripsi |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[penyedia]/[tindakan]` | Berbagai | OAuth khusus penyedia |### Routing & Config

| Titik akhir | Metode | Deskripsi |
| --------------------- | -------- | ----------------------------- |
| `/api/model/alias` | DAPATKAN/POSTING | Alias ​​model |
| `/api/models/katalog` | DAPATKAN | Semua model berdasarkan penyedia + tipe |
| `/api/combos*` | Berbagai | Manajemen kombo |
| `/api/kunci*` | Berbagai | Manajemen kunci API |
| `/api/harga` | DAPATKAN | Penetapan harga model |### Usage & Analytics

| Titik akhir | Metode | Deskripsi |
| --------------------------- | ------ | -------------------- |
| `/api/penggunaan/sejarah` | DAPATKAN | Riwayat penggunaan |
| `/api/penggunaan/log` | DAPATKAN | Log penggunaan |
| `/api/penggunaan/permintaan-logs` | DAPATKAN | Log tingkat permintaan |
| `/api/penggunaan/[connectionId]` | DAPATKAN | Penggunaan per koneksi |### Settings

| Titik akhir | Metode | Deskripsi |
| ------------------------------- | ------------- | ---------------------- |
| `/api/pengaturan` | DAPATKAN/MASUKKAN/PATCH | Pengaturan umum |
| `/api/pengaturan/proksi` | DAPATKAN/MASUKKAN | Konfigurasi proksi jaringan |
| `/api/settings/proxy/test` | POSTING | Uji koneksi proxy |
| `/api/settings/ip-filter` | DAPATKAN/MASUKKAN | Daftar IP yang diizinkan/daftar blokir |
| `/api/settings/berpikir-anggaran` | DAPATKAN/MASUKKAN | Penalaran anggaran token |
| `/api/settings/system-prompt` | DAPATKAN/MASUKKAN | Perintah sistem global |### Monitoring

| Titik akhir | Metode | Deskripsi |
| ------------------------ | ---------- | --------------------------------------------------------------------------------------------------- |
| `/api/sesi` | DAPATKAN | Pelacakan sesi aktif |
| `/api/batas kecepatan` | DAPATKAN | Batas tarif per akun |
| `/api/pemantauan/kesehatan` | DAPATKAN | Pemeriksaan kesehatan + ringkasan penyedia (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/statistik` | DAPATKAN/HAPUS | Statistik cache / hapus |### Backup & Export/Import

| Titik akhir | Metode | Deskripsi |
| --------------------------- | ------ | --------------------------------------- |
| `/api/db-backup` | DAPATKAN | Daftar cadangan yang tersedia |
| `/api/db-backup` | TETAPKAN | Buat cadangan manual |
| `/api/db-backup` | POSTING | Pulihkan dari cadangan tertentu |
| `/api/db-backup/ekspor` | DAPATKAN | Unduh database sebagai file .sqlite |
| `/api/db-backup/impor` | POSTING | Unggah file .sqlite untuk menggantikan database |
| `/api/db-backups/exportAll` | DAPATKAN | Unduh cadangan lengkap sebagai arsip .tar.gz |### Cloud Sync

| Titik akhir | Metode | Deskripsi |
| ---------------------- | ------- | --------------------- |
| `/api/sinkronisasi/cloud` | Berbagai | Operasi sinkronisasi cloud |
| `/api/sync/inisialisasi` | POSTING | Inisialisasi sinkronisasi |
| `/api/cloud/*` | Berbagai | Manajemen awan |### Tunnels

| Titik akhir | Metode | Deskripsi |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | DAPATKAN | Baca status instalasi/runtime Cloudflare Quick Tunnel untuk dasbor |
| `/api/tunnels/cloudflared` | POSTING | Mengaktifkan atau menonaktifkan Terowongan Cepat Cloudflare (`action=enable/disable`) |### CLI Tools

| Titik akhir | Metode | Deskripsi |
| ----------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | DAPATKAN | Status Claude CLI |
| `/api/cli-tools/codex-settings` | DAPATKAN | Status CLI Kodeks |
| `/api/cli-tools/droid-settings` | DAPATKAN | Status CLI Droid |
| `/api/cli-tools/openclaw-settings` | DAPATKAN | Status CLI OpenClaw |
| `/api/cli-tools/runtime/[toolId]` | DAPATKAN | Waktu proses CLI generik |

Respons CLI meliputi: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Titik akhir | Metode | Deskripsi |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/acp/agen` | DAPATKAN | Daftar semua agen yang terdeteksi (bawaan + khusus) dengan status |
| `/api/acp/agen` | POSTING | Tambahkan agen khusus atau segarkan cache deteksi |
| `/api/acp/agen` | HAPUS | Hapus agen khusus berdasarkan parameter kueri `id` |

Respons GET mencakup `agen[]` (id, nama, biner, versi, terinstal, protokol, isCustom) dan `ringkasan` (total, terinstal, notFound, builtIn, custom).### Resilience & Rate Limits

| Titik akhir | Metode | Deskripsi |
| ----------------------- | --------- | ------------------------------- |
| `/api/ketahanan` | DAPATKAN/PATCH | Dapatkan/perbarui profil ketahanan |
| `/api/ketahanan/reset` | POSTING | Setel ulang pemutus sirkuit |
| `/api/batas kecepatan` | DAPATKAN | Status batas tarif per akun |
| `/api/batas kecepatan` | DAPATKAN | Konfigurasi batas tarif global |### Evals

| Titik akhir | Metode | Deskripsi |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | DAPATKAN/POSTING | Daftar eval suites/jalankan evaluasi |### Policies

| Titik akhir | Metode | Deskripsi |
| --------------- | --------------- | ----------------------- |
| `/api/kebijakan` | DAPATKAN/POSTING/HAPUS | Kelola kebijakan perutean |### Compliance

| Titik akhir | Metode | Deskripsi |
| --------------------------- | ------ | ----------------------------- |
| `/api/kepatuhan/audit-log` | DAPATKAN | Log audit kepatuhan (N terakhir) |### v1beta (Gemini-Compatible)

| Titik akhir | Metode | Deskripsi |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/model` | DAPATKAN | Daftar model dalam format Gemini |
| `/v1beta/models/{...path}` | POSTING | Titik akhir `generateContent` Gemini |

Titik akhir ini mencerminkan format API Gemini untuk klien yang mengharapkan kompatibilitas asli Gemini SDK.### Internal / System APIs

| Titik akhir | Metode | Deskripsi |
| --------------- | ------ | ------------------------------------- |
| `/api/init` | DAPATKAN | Pemeriksaan inisialisasi aplikasi (digunakan saat pertama kali dijalankan) |
| `/api/tag` | DAPATKAN | Tag model yang kompatibel dengan Ollama (untuk klien Ollama) |
| `/api/mulai ulang` | POSTING | Memicu restart server dengan anggun |
| `/api/mati` | POSTING | Memicu penutupan server dengan baik |

>**Catatan:**Titik akhir ini digunakan secara internal oleh sistem atau untuk kompatibilitas klien Ollama. Mereka biasanya tidak dipanggil oleh pengguna akhir.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Transkripsikan file audio menggunakan Deepgram atau AssemblyAI.

**Meminta:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Tanggapan:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Penyedia yang didukung:**`deepgram/nova-3`, `assemblyai/best`.

**Format yang didukung:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Untuk klien yang menggunakan format API Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Permintaan secara otomatis diterjemahkan antara Ollama dan format internal.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Tanggapan:**```json
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

1. Klien mengirimkan permintaan ke `/v1/*`
2. Pengendali rute memanggil `handleChat`, `handleEmbedding`, `handleAudioTranscription`, atau `handleImageGeneration`
3. Model terselesaikan (penyedia/model langsung atau alias/kombo)
4. Kredensial dipilih dari DB lokal dengan pemfilteran ketersediaan akun
5. Untuk obrolan: `handleChatCore` — deteksi format, terjemahan, pemeriksaan cache, pemeriksaan idempotensi
6. Pelaksana penyedia mengirimkan permintaan upstream
7. Respons diterjemahkan kembali ke format klien (obrolan) atau dikembalikan apa adanya (embeddings/images/audio)
8. Penggunaan/logging dicatat
9. Fallback berlaku pada error sesuai dengan aturan kombo

Referensi arsitektur lengkap: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Rute dasbor (`/dashboard/*`) menggunakan cookie `auth_token`
- Login menggunakan hash kata sandi yang disimpan; mundur ke `INITIAL_PASSWORD`
- `requireLogin` dapat dialihkan melalui `/api/settings/require-login`
- Rute `/v1/*` secara opsional memerlukan kunci API Pembawa ketika `REQUIRE_API_KEY=true`
