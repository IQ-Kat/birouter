# Changelog

All notable changes to Birouter will be documented in this file.

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
