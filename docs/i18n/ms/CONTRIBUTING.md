# Contributing to OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Terima kasih kerana berminat untuk menyumbang! Panduan ini merangkumi semua yang anda perlukan untuk bermula.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (disyorkan: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Pembolehubah utama untuk pembangunan:

| Pembolehubah              | Lalai Pembangunan        | Penerangan                      |
| ------------------------- | ------------------------ | ------------------------------- | ---------------------- |
| `PORT`                    | `20128`                  | Port pelayan                    |
| `URL_ASA_AWAM_SETERUSNYA` | `http://localhost:20128` | URL asas untuk bahagian hadapan |
| `JWT_RAHSIA`              | (jana di atas)           | Rahsia tandatangan JWT          |
| `KATA_laluan_AWAL`        | `TUKAR`                  | Kata laluan log masuk pertama   |
| `APP_LOG_LEVEL`           | `maklumat`               | Tahap verbositi log             | ### Dashboard Settings |

Papan pemuka menyediakan togol UI untuk ciri yang juga boleh dikonfigurasikan melalui pembolehubah persekitaran:

| Menetapkan Lokasi  | Togol                 | Penerangan                              |
| ------------------ | --------------------- | --------------------------------------- |
| Tetapan → Lanjutan | Mod Nyahpepijat       | Dayakan log permintaan nyahpepijat (UI) |
| Tetapan → Umum     | Keterlihatan Bar Sisi | Tunjukkan/sembunyikan bahagian bar sisi |

Tetapan ini disimpan dalam pangkalan data dan berterusan sepanjang permulaan semula, mengatasi lalai env var apabila ditetapkan.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

URL lalai:

-**Papan pemuka**: `http://localhost:20128/papan pemuka` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**JANGAN PERNAH komited terus ke `utama`.**Sentiasa gunakan cawangan ciri.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Awalan | Tujuan |
| ----------- | -------------------------- |
| `feat/` | Ciri baharu |
| `baiki/` | Pembetulan pepijat |
| `refactor/` | Penstrukturan semula kod |
| `dokumen/` | Perubahan dokumentasi |
| `ujian/` | Ujian tambahan/pembetulan |
| `tugas/` | Perkakas, CI, kebergantungan |### Commit Messages

Ikuti [Komitmen Konvensional](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Skop: `db`, `sse`, `oauth`, `papan pemuka`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memori`, `kemahiran`.---

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

Nota liputan:

- `npm run test:coverage` mengukur liputan sumber untuk suite ujian unit utama, tidak termasuk `tests/**` dan termasuk `open-sse/**`
- Permintaan tarik mesti memastikan pintu liputan keseluruhan pada**60% atau lebih tinggi**untuk pernyataan, baris, fungsi dan cawangan
- Jika PR menukar kod pengeluaran dalam `src/`, `open-sse/`, `electron/` atau `bin/`, ia mesti menambah atau mengemas kini ujian automatik dalam PR yang sama
- `npm run coverage:report` mencetak laporan fail demi fail terperinci daripada larian liputan terkini
- `npm run test:coverage:legacy` mengekalkan metrik lama untuk perbandingan sejarah
- Lihat `docs/COVERAGE_PLAN.md` untuk peta jalan peningkatan liputan berperingkat### Pull Request Requirements

Sebelum membuka atau menggabungkan PR:

- Jalankan `npm run test:unit`
- Jalankan `npm run test:coverage`
- Pastikan pintu liputan kekal pada**60%+**untuk semua metrik
- Sertakan fail ujian yang diubah atau ditambah dalam perihalan PR apabila kod pengeluaran ditukar
- Semak keputusan SonarQube pada PR apabila rahsia projek dikonfigurasikan dalam CI

Status ujian semasa:**122 unit fail ujian**meliputi:

- Penterjemah penyedia dan penukaran format
- Pengehadan kadar, pemutus litar dan daya tahan
- Cache semantik, idempotensi, penjejakan kemajuan
- Operasi pangkalan data dan skema (21 modul DB)
- Aliran dan pengesahan OAuth
- Pengesahan titik akhir API (Zod v4)
- Alat pelayan MCP dan penguatkuasaan skop
- Sistem ingatan dan Kemahiran---

## Code Style

-**ESLint**— Jalankan `npm run lint` sebelum melakukan -**Lebih Cantik**— Diformat secara automatik melalui `lint-staged` pada komit (2 ruang, koma bertitik, petikan berganda, lebar 100 aksara, koma di belakang es5) -**TypeScript**— Semua kod `src/` menggunakan `.ts`/`.tsx`; `open-sse/` menggunakan `.ts`/`.js`; dokumen dengan TSDoc (`@param`, `@returns`, `@throws`) -**Tiada `eval()`**— ESLint menguatkuasakan `no-eval`, `no-implied-eval`, `no-new-func` -**Pengesahan Zod**— Gunakan skema Zod v4 untuk semua pengesahan input API -**Penamaan**: Fail = sarung unta/sarung kebab, komponen = PascalCase, pemalar = UPPER_SNAKE---

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

Tambahkan pada `src/shared/constant/providers.ts` — Zod-disahkan pada beban modul.### Step 2: Add Executor (if custom logic needed)

Cipta pelaksana dalam `open-sse/executors/your-provider.ts` melanjutkan pelaksana asas.### Step 3: Add Translator (if non-OpenAI format)

Buat penterjemah permintaan/tindak balas dalam `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Tambahkan bukti kelayakan OAuth dalam `src/lib/oauth/constants/oauth.ts` dan perkhidmatan dalam `src/lib/oauth/services/`.### Step 5: Register Models

Tambah definisi model dalam `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Tulis ujian unit dalam `ujian/unit/` meliputi sekurang-kurangnya:

- Pendaftaran pembekal
- Permintaan/tindak balas terjemahan
- Ralat pengendalian---

## Pull Request Checklist

- [ ] Lulus ujian (`ujian npm`)
- [ ] Hantaran linting (`npm run lint`)
- [ ] Binaan berjaya (`npm run build`)
- [ ] Jenis TypeScript ditambah untuk fungsi awam dan antara muka baharu
- [ ] Tiada rahsia berkod keras atau nilai sandaran
- [ ] Semua input disahkan dengan skema Zod
- [ ] CHANGELOG dikemas kini (jika perubahan yang dihadapi pengguna)
- [ ] Dokumentasi dikemas kini (jika berkenaan)---

## Releasing

Keluaran diuruskan melalui aliran kerja `/generate-release`. Apabila Keluaran GitHub baharu dibuat, pakej tersebut**diterbitkan secara automatik ke npm**melalui Tindakan GitHub.---

## Getting Help

-**Seni Bina**: Lihat [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Rujukan API**: Lihat [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Isu**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR**: Lihat `docs/adr/` untuk rekod keputusan seni bina
