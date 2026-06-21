# Changelog

# v0.5.6 (2026-06-20)

## Features
- **Ponytail**: minimalist code generation feature
- **Headroom**: proxy lifecycle management + dashboard UI (one-click start/stop, install detection, status probing, token saver, claude↔openai shape conversion)
- **CodeBuddy CN**: new OAuth provider (copilot.tencent.com) — 15-model catalog, /v2 inference, forced streaming, OpenAI-style reasoning
- **OpenCode-Go**: align models with official endpoints; route Qwen 3.7 MiniMax via /v1/messages, GLM/Kimi/DeepSeek/MiMo via /chat/completions

## Fixes
- **Anthropic-compatible validation**: use POST /v1/messages (GET /models not spec, false "invalid" for valid keys)
- **CLI tools**: tolerate JSONC configs in all 8 settings routes (opencode, openclaw, kilo, droid, cowork, copilot, claude, cline)
- **Gemini/Antigravity**: preserve 'pattern' in tool schema translation (glob/grep)
- **Combo/Fusion**: flatten Anthropic-style tool messages in panel calls (prevent 503)
- **Models**: store provider custom models by provider scope
- **Perplexity**: use /v1/models endpoint for key validation

# v0.5.4 (2026-06-18)

## Fixes
- **Kiro**: honor thinking effort budgets
- **AG/Kiro/Xiaomi**: provider fixes
- **Combo/Fusion**: flatten tool history in panel calls to prevent 503
- **LLM selector**: show custom vision models in selector and model list
- **Image**: prevent compatible nodes from shadowing provider aliases

# v0.5.2 (2026-06-17)

## Features
- **Combo Fusion strategy** — fans the prompt out to all member models in parallel, then a configurable judge model synthesizes one final answer (quorum-grace, anonymized sources, graceful degradation)
- **Per-combo strategy selector** — pick `fallback` / `round-robin` / `fusion` / `capacity` per combo (replaces the old round-robin toggle), with a judge picker for fusion
- **Capacity auto-switch** — reorders models per request so images/PDFs route to capable models first
- **Kiro headless API-key auth** (`ksk_`) + direct `claude↔kiro` route that avoids the lossy OpenAI two-hop pivot
- **Claude auto-ping** — warms the 5h quota window right after reset so a fresh window starts immediately (per-connection toggle)

## Fixes
- **Claude 429**: stop hammering the OAuth usage endpoint — cache resetAt, throttle quota refresh to 3 min, cool down after a 429 (chat unaffected)
- **Usage logs always empty**: missing `await` on `getAdapter()` in `getRecentLogs` made `/api/usage/logs` & `/api/usage/request-logs` return nothing
- **Executors**: strip params unsupported by the provider/model (drops deprecated `temperature` for claude-opus-4 → Anthropic 400)
- **Translator**: derive deterministic tool_call ids for gemini/antigravity → OpenAI so function call/response pair correctly (fixes tool-pairing 400s)
- **Antigravity**: strip `optional` from tool schemas before sending to Gemini
- **Claude-to-OpenAI**: handle OpenAI-format responses in the non-streaming path (e.g. xiaomi-tokenplan)
- **Usage views**: show edited connection names consistently across Providers & Quota Tracker
- **Security**: hardened reverse-proxy local-access trust
- **Security**: SSRF hardening on web fetch

## Internal
- Large **open-sse / translator refactor** (~40 commits): unified provider/model registry (LiteLLM-style `models[]` + `kind` field, 100 co-located registry files), single-sourced media/OAuth/refresh/token URLs, registry-based dispatch for usage & token-refresh, DRY translator concerns (buildUsage, encodeDataUri, finishReasonMap, chunkBuilder, reasoningDelta…), ESM-safe registry init, large-file splits, dead-code removal, and golden/no-regression test gates

# v0.4.80 (2026-06-13)

All notable changes to Birouter will be documented in this file.

## v0.2.7 (2026-06-09)
*Synchronized with 9Router v0.4.71*

### 🚀 New Features (from 9Router v0.4.71)
- **Caveman Mode Update**: Added Wenyan classical Chinese levels and synchronized upstream prompts.
- **New Providers & Models**:
  - Added **xiaomi-tokenplan**: Claude-native MiMo V2.5 Pro alias.
  - Added **MiniMax-M3** support and updated Quota Tracker.
  - Added `gemini-3.5-flash-extra-low` (Low) model for Antigravity.
- **Qoder Improvements**: Support for fetching latest models and dashboard import-model button.
- **i18n**: Added Russian README and endpoint exposure notices across multiple languages.

### 🛡️ Fixes & Stability (from 9Router v0.4.71)
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
- **New Models**: Added Claude Opus 4.8 (Claude Code) and GPT 5.4 Mini (Codex).

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
