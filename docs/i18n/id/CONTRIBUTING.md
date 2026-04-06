# Contributing to OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Terima kasih atas minat Anda untuk berkontribusi! Panduan ini mencakup semua yang Anda perlukan untuk memulai.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (direkomendasikan: 22 LTS) -**npm**10+ -**Git**### Clone & Install

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variabel kunci untuk pengembangan:

| Variabel               | Default Pengembangan     | Deskripsi                   |
| ---------------------- | ------------------------ | --------------------------- | ---------------------- |
| `PELABUHAN`            | `20128`                  | Pelabuhan server            |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | URL dasar untuk frontend    |
| `JWT_RAHASIA`          | (hasilkan di atas)       | Rahasia penandatanganan JWT |
| `INITIAL_PASSWORD`     | `GANTI`                  | Kata sandi masuk pertama    |
| `APP_LOG_LEVEL`        | `info`                   | Catat tingkat verbositas    | ### Dashboard Settings |

Dasbor menyediakan peralihan UI untuk fitur yang juga dapat dikonfigurasi melalui variabel lingkungan:

| Mengatur Lokasi       | Beralih                | Deskripsi                            |
| --------------------- | ---------------------- | ------------------------------------ |
| Pengaturan → Lanjutan | Mode Debug             | Aktifkan log permintaan debug (UI)   |
| Pengaturan → Umum     | Visibilitas Bilah Sisi | Tampilkan/sembunyikan bagian sidebar |

Pengaturan ini disimpan dalam database dan bertahan selama restart, mengesampingkan default env var ketika diatur.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

URL bawaan:

-**Dasbor**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**JANGAN PERNAH berkomitmen langsung ke `main`.**Selalu gunakan cabang fitur.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Awalan | Tujuan |
| ----------- | ------------------------- |
| `prestasi/` | Fitur baru |
| `perbaiki/` | Perbaikan bug |
| `pemfaktoran ulang/` | Restrukturisasi kode |
| `dokumen/` | Perubahan dokumentasi |
| `tes/` | Uji penambahan/perbaikan |
| `tugas/` | Perkakas, CI, ketergantungan |### Commit Messages

Ikuti [Komitmen Konvensional](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Cakupan: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

## Running Tests

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.mjs

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (60% min statements/lines/functions/branches)
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check
```

Catatan cakupan:

- `npm run test:coverage` mengukur cakupan sumber untuk rangkaian pengujian unit utama, tidak termasuk `tests/**`, dan menyertakan `open-sse/**`
- Permintaan penarikan harus menjaga gerbang cakupan keseluruhan pada**60% atau lebih tinggi**untuk pernyataan, jalur, fungsi, dan cabang
- Jika PR mengubah kode produksi di `src/`, `open-sse/`, `electron/`, atau `bin/`, PR harus menambah atau memperbarui pengujian otomatis di PR yang sama
- `npm run coverage:report` mencetak laporan detail file demi file dari cakupan run terbaru
- `npm run test:coverage:legacy` mempertahankan metrik lama untuk perbandingan historis
- Lihat `docs/COVERAGE_PLAN.md` untuk peta jalan peningkatan cakupan bertahap### Pull Request Requirements

Sebelum membuka atau menggabungkan PR:

- Jalankan `npm run test:unit`
- Jalankan `npm run test:coverage`
- Pastikan gerbang cakupan tetap di**60%+**untuk semua metrik
- Sertakan file pengujian yang diubah atau ditambahkan dalam deskripsi PR ketika kode produksi diubah
- Periksa hasil SonarQube di PR ketika rahasia proyek dikonfigurasi di CI

Status pengujian saat ini:**122 file pengujian unit**meliputi:

- Penyedia penerjemah dan konversi format
- Pembatasan laju, pemutus sirkuit, dan ketahanan
- Cache semantik, idempotensi, pelacakan kemajuan
- Operasi dan skema database (21 modul DB)
- Alur dan autentikasi OAuth
- Validasi titik akhir API (Zod v4)
- Alat server MCP dan penegakan cakupan
- Sistem Memori dan Keterampilan---

## Code Style

-**ESLint**— Jalankan `npm run lint` sebelum melakukan -**Lebih cantik**— Diformat otomatis melalui `lint-staged` saat penerapan (2 spasi, titik koma, tanda kutip ganda, lebar 100 karakter, es5 di akhir koma) -**TypeScript**— Semua kode `src/` menggunakan `.ts`/`.tsx`; `open-sse/` menggunakan `.ts`/`.js`; dokumen dengan TSDoc (@`@param`, `@returns`, `@throws`) -**Tidak ada `eval()`**— ESLint menerapkan `no-eval`, `no-implied-eval`, `no-new-func` -**Validasi Zod**— Gunakan skema Zod v4 untuk semua validasi input API -**Penamaan**: File = camelCase/kebab-case, komponen = PascalCase, konstanta = UPPER_SNAKE---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (21 modules + 16 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (60+), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 14 provider-specific request executors
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (25 tools, 3 transports, 10 scopes)
├── services/               # 36+ services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (25 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Adding a New Provider

### Step 1: Register Provider Constants

Tambahkan ke `src/shared/constants/providers.ts` — Divalidasi Zod saat memuat modul.### Step 2: Add Executor (if custom logic needed)

Buat eksekutor di `open-sse/executors/your-provider.ts` dengan memperluas eksekutor dasar.### Step 3: Add Translator (if non-OpenAI format)

Buat penerjemah permintaan/tanggapan di `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Tambahkan kredensial OAuth di `src/lib/oauth/constants/oauth.ts` dan layanan di `src/lib/oauth/services/`.### Step 5: Register Models

Tambahkan definisi model di `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Tulis pengujian unit dalam `tes/unit/` yang mencakup minimal:

- Pendaftaran penyedia
- Terjemahan permintaan/tanggapan
- Penanganan kesalahan---

## Pull Request Checklist

- [ ] Tes lulus (`npm test`)
- [ ] Linting lolos (`npm run lint`)
- [ ] Pembangunan berhasil (`npm run build`)
- [ ] Jenis TypeScript ditambahkan untuk fungsi dan antarmuka publik baru
- [ ] Tidak ada rahasia hardcode atau nilai cadangan
- [ ] Semua input divalidasi dengan skema Zod
- [ ] CHANGELOG diperbarui (jika ada perubahan yang dihadapi pengguna)
- [ ] Dokumentasi diperbarui (jika ada)---

## Releasing

Rilis dikelola melalui alur kerja `/generate-release`. Saat Rilis GitHub baru dibuat, paket tersebut**secara otomatis dipublikasikan ke npm**melalui GitHub Actions.---

## Getting Help

-**Arsitektur**: Lihat [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Referensi API**: Lihat [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Masalah**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: Lihat `docs/adr/` untuk catatan keputusan arsitektur
