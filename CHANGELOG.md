# Changelog

All notable changes to Birouter will be documented in this file.

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

Birouter is a fork of [9Router](https://github.com/decolua/9router) by decolua, customized and extended with new features.

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

*Based on 9Router by [decolua](https://github.com/decolua/9router) · MIT License*
