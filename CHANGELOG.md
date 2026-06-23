# Changelog

# v0.3.7 (2026-06-23)
*Synchronized with upstream v0.5.8*

## 🚀 Features / Fitur Baru
- **Antigravity Image Support**: Dukungan penuh untuk pembuatan gambar (image generation) secara native. Model gambar akan ditandai dengan `kind:image` dan ditampilkan di UI media-providers.
- **CodeBuddy CN Improvements**: Menambahkan autentikasi API key, pelacak kuota kredit (credit quota tracker), dan alias prefix model singkat `cbcn`.

## 🛡️ Fixes & Improvements / Perbaikan & Peningkatan
- **MiniMax-M3**: Mengaktifkan kemampuan vision (pengenalan gambar).
- **Headroom**: Mendukung Docker sidecar proxy untuk kestabilan koneksi.
- **mimo-free**: Rotasi Chrome User-Agent otomatis untuk melewati gerbang anti-abuse.
- **cloudflare-ai**: Perataan (flattening) array content-part menjadi string guna menghindari error oneOf 400.
- **Translator**: Normalisasi tools ke bentuk Anthropic-native untuk penyedia non-Anthropic.
- **CLI**: Penanganan otomatis Next.js 16 nested standalone output path.
- **Codex**: Mempertahankan kustom tools selama normalisasi request.

# v0.3.5 (2026-06-21)
*Synchronized with upstream v0.5.6*

## 🚀 Features / Fitur Baru
- **Headroom Integration**: Fitur manajemen proxy kustom yang langsung terintegrasi di Dashboard (instalasi satu klik, start/stop, status check, kompresi prompt).
- **Ponytail (Lazy Senior Dev Mode)**: Strategi prompt baru (Lite, Full, Ultra) yang memaksa LLM menulis kode minimal, efisien, dan YAGNI (You Aren't Gonna Need It) untuk menghemat token output.
- **Combo Fusion Strategy**: Strategi combo baru yang mengirimkan prompt ke semua model anggota secara paralel, lalu disintesis menjadi satu jawaban terbaik oleh judge model pilihan Anda.
- **Per-Combo Strategy Selector**: Sekarang Anda bisa memilih strategi routing kustom (`fallback`, `round-robin`, `fusion`, atau `capacity`) untuk masing-masing combo secara independen.
- **Kiro Headless API Key**: Mendukung autentikasi langsung menggunakan Kiro API key (`ksk_`) dan rute langsung `claude ↔ kiro` tanpa harus melalui konversi OpenAI yang lossy.
- **Claude Auto-Ping**: Penghangat kuota 5 jam otomatis setelah reset agar jendela kuota baru segera dimulai (opsi per koneksi).
- **CodeBuddy CN**: Provider OAuth baru (copilot.tencent.com) dengan katalog 15 model, /v2 inference, dan reasoning ala OpenAI.

## 🛡️ Fixes & Improvements / Perbaikan & Peningkatan
- **Anthropic Key Validation**: Menggunakan endpoint POST `/v1/messages` (lebih andal untuk validasi kunci dibanding GET `/models`).
- **CLI Tools Settings**: Mendukung file konfigurasi berformat JSONC pada 8 rute setelan CLI (opencode, openclaw, cline, dll).
- **Gemini / Antigravity**: Mempertahankan parameter `'pattern'` saat menerjemahkan skema tool (berguna untuk filter glob/grep).
- **Claude 429 Cool-down**: Mengurangi spam ke endpoint OAuth usage dan menerapkan cool-down setelah terkena limit 429.
- **Combo/Fusion Flat History**: Meratakan riwayat pesan tool untuk mencegah error HTTP 503 saat panggilan panel.
- **Usage Logs Fix**: Memperbaiki error `missing await` yang membuat log riwayat request di dashboard selalu terlihat kosong.
- **Parameter Stripper**: Penanganan dinamis untuk memotong parameter yang tidak didukung provider (seperti menghapus parameter `temperature` usang di Claude Opus).

All notable changes to Birouter will be documented in this file.

## v0.3.1 (2026-06-17)

### 🚀 New Features & Enhancements
- **New Provider MiMo Free**: Added the `mimo-free` no-authentication provider option.
- **Vercel AI Gateway**: Added support for embeddings, images, and credit usage.
- **Vertex Integration**: Supported ADC `authorized_user` credentials.
- **Unified Model Registry**: Refactored the provider and model catalog to use a unified schema with a `kind` field (LiteLLM-style), simplifying model selection.
- **GitHub Copilot MITM**: Added auto-refresh for expired tokens and dedicated slots for `gpt-5-mini` and `gpt-5.4-nano`.
- **Kiro MITM Enhancements**: Added multi-endpoint failover for `GenerateAssistantResponse`, direct profile ARN resolution, and support for the `auto` slot.

### 🛡️ Fixes & Stability
- **SSRF Guard**: Implemented security validation on web fetches and database export/import paths.
- **Cursor Auto-Import**: Refactored SQLite loading using dynamic ESM `import()` instead of CJS `require()` to prevent native bindings issues and ensure robust mocking.
- **Windows Path Compatibility**: Standardized backslash matching in Cursor candidate path checking to prevent path mismatch errors on Windows.
- **SQLite Locking Fixes**: Fixed connection locks (EPERM) in database stress/benchmark tests by ensuring connections are closed during cleanup.
- **Claude & Gemini Message Alignment**:
  - Claude: Normalizes passthrough payloads, strips Anthropic billing headers from system prompts, and flattens text-only arrays to simple strings.
  - Gemini: Routes thought parts correctly to `reasoning_content` to prevent downstream errors.
- **Cerebras & Mistral**: Stripped unsupported `client_metadata` from downstream requests.
- **SiliconFlow**: Updated base URL to `.com` and cleaned up the verified model catalog.

## v0.2.7 (2026-06-09)
*Synchronized with upstream v0.4.71*

### 🚀 New Features (from upstream v0.4.71)
- **Caveman Mode Update**: Added Wenyan classical Chinese levels and synchronized upstream prompts.
- **New Providers & Models**:
  - Added **xiaomi-tokenplan**: Claude-native MiMo V2.5 Pro alias.
  - Added **MiniMax-M3** support and updated Quota Tracker.
  - Added `gemini-3.5-flash-extra-low` (Low) model for Antigravity.
- **Qoder Improvements**: Support for fetching latest models and dashboard import-model button.
- **i18n**: Added Russian README and endpoint exposure notices across multiple languages.

### 🛡️ Fixes & Stability (from upstream v0.4.71)
- **Codex Streaming**: Hardened streaming timeouts (60s), improved `response.done` handling, and terminal event emission to prevent client hangs.
- **OAuth Lifecycle**: Durable OAuth refresh lifecycle for Codex.
- **Network**: Skipped virtual interfaces in tunnel netchange watchdog to prevent false restarts.
- **Proxy**: Raised Next.js client body limit to 128MB.
- **Provider Fixes**:
  - Kiro: Handled 400 errors on tool history, added "auto" model slot, and fixed binary EventStream crashes.
  - Antigravity: Passthrough for tab-autocomplete.
  - Claude: Fixed forced `tool_choice` 400 errors.

## v0.2.6 (2026-05-30)

### 🐛 Bug Fixes
- **Terminal Input Freeze**: Fixed a bug where pressing Enter on the TUI pause prompt ("Press Enter to go back to menu...") did not work in Windows terminal (PowerShell/CMD) due to raw mode toggling issues.
- **Server Shutdown Crash**: Prevented the background server from crashing due to `EPIPE` (broken pipe) errors on `stdout`/`stderr` when the parent terminal is closed.

### ⚡ Improvements
- **NPM Package Links**: Added repository, bugs, and homepage metadata to the NPM package, enabling direct links to the GitHub repository.
- **Theme Color**: Restored the original brand Sky Blue theme color palette.

## v0.2.5 (2026-05-30)

### 🚀 New Features
- **Qoder Provider Support**: Added device-flow OAuth, COSY signing, WAF-bypass body encoding, live model catalog, dashboard quota tracker, and 11 models.
- **New Models**: Added Claude Opus 4.8 (Claude Code), GPT 5.4 Mini (Codex).

### 🐛 Bug Fixes
- **DeepSeek Thinking Mode**: Echoes `reasoning_content` back on follow-up/tool-call turns so OpenCode-free and custom providers no longer 400 with "reasoning_content must be passed back".
- **Reasoning Injector**: Matches deepseek/kimi model ids case-insensitively.
- **OpenCode Suggested Models**: Includes free models without the `-free` suffix (e.g. `big-pickle`).

### ⚡ Improvements
- **Codex**: Trimmed EOL/sunset models, keep gpt-5.5 / gpt-5.4 / gpt-5.3-codex family, add gpt-5.4-mini.
- **volcengine-ark**: Refreshed model list (added DeepSeek-V4-Flash/Pro, dropped EOL entries).
- **Lower Stream Stall Timeout**: Changed 35s → 30s for faster hang detection.

## v0.2.4 (2026-05-29)

### 📝 Documentation
- Improved NPM README layout and instructions for the CLI package.
- Updated package versions to v0.2.4.

## v0.2.3 (2026-05-29)

### 🚀 New Features

- **Birouter Agentic Super Skill**: Introduced an independent agentic skill to eliminate reliance on external agents.
  - Mandatory **300-Line Rule** (Chunked Write) protocol to bypass Kiro/Vertex server timeouts.
  - Native **RTK Awareness** for intelligent token compression handling.
  - Self-healing logic for 503, 429, and 401 errors.
- **Bilingual Documentation**: Added full support for **Bahasa Indonesia** across README and Gitbook documentation.

### 🛡️ Stability & Fixes

- **Hermes Agent Stability**:
  - Implemented dual-sync for `.env` and `config.yaml` to prevent configuration drops.
  - Strengthened YAML parsing regex for better compatibility with manual edits.
  - Expanded binary detection to support both `hermes` and `hermes-agent`.
- **README Overhaul**: Professional redesign with better technical density, architecture diagrams, and clear bilingual instructions.

## v0.2.2 (2026-05-28)

### ✨ New Features

- **Smart Pacing UI Control**: Added a dedicated card in Dashboard → Endpoint to manage anti-ban settings.
  - **Human Simulator Toggle**: Manual control to enable/disable the human-like typing simulation (2-8s gaps).
  - **Protection Toggle**: Easily enable/disable global request pacing.

## v0.2.1 (2026-05-28)

### 🐛 Bug Fixes

- **proxyFetch**: Restored missing `Readable` import causing runtime `ReferenceError` in DNS-bypass fetch path.

### ⚡ Improvements

- **Stream Stall**: Lowered stream stall timeout from 60s → 35s for faster hang detection.

## v0.2.0 (2026-05-28)

### ✨ New Features

- **Smart Pacing (Natural Request Patterns)** — Prevents account flagging by simulating human-like request rhythms (Jitter & Pacing).
  - **Adaptive Delay**: Automatically adds gaps (1-5s) between requests based on account activity.
  - **Global Queueing**: Ensures accounts aren't "bombarded" by multiple users/agents simultaneously.
  - **Human Simulator Mode**: Random "thinking time" (2-8s) for maximum safety in agentic workflows.
- **Fingerprint Consistency** — Automatic header sanitization to prevent account bans.
  - **Header Masking**: Strips dangerous headers like `x-forwarded-for`, `via`, and `cf-connecting-ip`.
  - **Gemini Anti-Ban**: Specifically removes `x-goog-user-project` which is a known trigger for permanent bans.
- **Sticky Proxy (IP Binding)** — Permanently binds each OAuth account to a specific proxy IP.
  - **Consistent Network Identity**: Ensures an account always appears to come from the same location.
  - **Auto-binding**: Automatically picks and locks a proxy from the pool on first use.
- **CLI Auto-Update** — Stay up to date easily.
  - **NPM Integration**: Birouter CLI now automatically checks for new versions on NPM registry during startup.
  - **Seamless Update Flow**: Provides a direct update command and menu option when a newer version is detected.
- **Context Length Awareness** — Better model information and selection.
  - **Metadata Fetching**: Automatically captures `context_length` from provider APIs during the "Fetch Models" process.
  - **UI Badges**: Displays context length badges (e.g., "128k", "200k") next to model names in selection modals and combos.

### 🔧 Improvements

- **Integrated Pacing & Fingerprinting across all handlers**: Chat, Embeddings, Fetch, Search, Image Generation, STT, and TTS.
- **Provider-specific Profiles**: Pre-tuned sensitivity settings for Anthropic, Gemini, OpenAI, and more.
- **Stats Dashboard**: New endpoint `/api/settings/smart-pacing` to monitor pacing activity.

## v0.1.0 (2026-05-27)

### 🎉 Initial Fork Release

Birouter is a fork of the parent upstream repository by decolua, customized and extended with new features.

### ✨ New Features

- **Fetch Models** — Button to fetch available models from provider's `/v1/models` endpoint using your API key. Models are saved to database and shown as suggestions you can manually enable. Works across all API key providers (OpenAI, Gemini, DeepSeek, Groq, Mistral, xAI, NVIDIA, and 20+ more).
- **Shared Fetched Models in Media Providers** — Fetched models are automatically filtered and shown in Media Provider pages (Embedding, Image, TTS, STT) based on keyword matching. Fetch once, use everywhere.
- **Auto-fetch on first connection** — When you add the first API key to a provider, models are automatically fetched in the background.
- **Rate Limiting** — Configurable rate limiting for `/v1/*` API endpoints. Default OFF, toggle in Dashboard → Endpoint. Set custom RPM (requests per minute) per API key.
- **Savings Tracker** — "You Saved" card in Usage page showing estimated money saved by routing through Birouter instead of paying full API prices.
- **Error Boundaries** — Proper error handling pages (global error, 404, dashboard error) so the app never shows a white screen on crashes.

### 🔧 Customizations

- **Port changed** — Default port `20128` → `2004`
- **API key prefix** — Changed from `sk-` to `bi-` for easy identification
- **Full rebrand** — All UI text, landing page, topology diagram updated to "Birouter"
- **About/Support modal** — Replaced upstream donate with project info + Saweria link
- **Cleaned up dead providers** — Removed iFlow, Qwen, Gemini CLI references from docs (discontinued in 2026)

### 📝 Documentation

- All README files updated with correct port (2004)
- Removed outdated i18n READMEs (vi, ja, zh-CN)
- Updated combo examples to use active providers (Kiro, OpenCode Free)
- Updated all source code, configs, Docker, CLI with new port

---

*Based on the parent project by decolua · MIT License*
