# Changelog

All notable changes to OmniRoute are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [2.2.0] — 2026-03-10

> ### 🔧 Bug Fixes · Provider Support · CI Recovery

### Bug Fixes

- **Cursor tool-call loop (#275/#274)** — Stabilized Cursor executor to stop double-translating tool results. Set-based `finalizedIds` for O(1) dedup, byte guard (`0x7b`) before payload `.toString()`, `escapeXml()` to prevent tag injection, and converted all debug `console.log` to `debugLog()`. Fixes the 400 Bad Request loop that corrupted multi-turn Cursor sessions.
- **A/V provider validation (#281)** — Added `validateElevenLabsProvider` (GET `/v1/voices` with `xi-api-key`) and `validateInworldProvider` (POST `/tts/v1/voice` with Basic auth) so both providers can be test-connected without false 400 errors.
- **OpenAI-compatible Add Connection button (#272)** — "Add Connection" button was hidden behind `!isCompatible` guard in the Connections card. Button now appears for compatible providers when 0 connections exist, limited to 1 (matches single-key-per-node policy).
- **CI: unit tests** — Fixed circuit breaker tests using wrong instance keys (`combo:groq` → `combo:groq/llama-3.3-70b`).
- **CI: E2E protocol-visibility** — Updated spec to click "Protocols" tab before asserting MCP/A2A links (now tabs inside `/dashboard/endpoint`).
- **CI: i18n** — Added missing `header.mcp`, `header.mcpDescription`, `header.a2a`, `header.a2aDescription` keys to `en.json`.

### New Features

- **Kimi Coding plan quota display (#279)** — New `getKimiUsage()` with `X-Msh-*` device headers. Parses weekly quota + rate-limit breakdown from `/v1/usages`. Wires `kimi-coding` into the provider usage switch; adds quota capability flag.

### Dependencies

- **Dev dependencies** — Bumped `@playwright/test`, `@types/react`, `eslint-plugin-*` and 2 others (#264).
- **Prod dependencies** — Bumped 2 production packages (#263).

---

## [2.1.2] — 2026-03-09

> ### 🔨 CI Green + Electron .deb + Link Fixes

### Bug Fixes

- **CI: `check:docs-sync`** — fixed 2 failures: bumped `docs/openapi.yaml` version to 2.1.1 (was 2.0.0), added required `## [Unreleased]` section to CHANGELOG.
- **CI: npm-publish workflow** — rewrote to use `npm ci --ignore-scripts` + explicit `node scripts/prepublish.mjs` with `JWT_SECRET` env; fixes the prepublish loop that caused every npm CI publish to fail.
- **README.md language bar** — fixed all 29 broken links that pointed to root `README.<lang>.md` (now `docs/i18n/<lang>/README.md`).
- **docs/i18n READMEs** — fixed back-links to English (`../../README.md`) and cross-links to sibling languages.

### New Features

- **Electron Linux `.deb` package** — added `deb` target (x64 + arm64) to `electron/package.json`; updated `electron-release.yml` to collect and attach `.deb` files to GitHub releases alongside `.AppImage`.

> ### 🔧 CI Fix + Docs Reorganization

### Bug Fixes

- **CI: fixed `any`-budget violation in `open-sse/services/usage.ts`** — replaced 5 explicit `any` annotations with proper TypeScript types (`UsageQuota`, `JsonRecord`, `Error`), restoring the green CI lint gate.
- **Deleted all duplicate draft GitHub releases** — automated workflow was creating unnamed draft releases on each push; cleaned up all draft artifacts for v2.0.17–v2.1.0.

### Documentation

- **Root cleanup**: moved all 29 `README.<lang>.md` files from the project root into their correct `docs/i18n/<lang>/README.md` locations. The root now contains only `README.md` (English).
- **i18n sync**: all 11 `docs/*.md` files synced with language bar headers to all 30 `docs/i18n/<lang>/` directories (319 file updates across ar, bg, da, de, es, fi, fr, he, hu, id, in, it, ja, ko, ms, nl, no, phi, pl, pt, pt-BR, ro, ru, sk, sv, th, uk-UA, vi, zh-CN).

---

## [2.1.0] — 2026-03-09

> ### 🗺️ Full Provider-UI Gap Audit — All Backends Now Accessible from Dashboard

### ✨ New Features

- **7 missing API-key providers added to Providers page** — ElevenLabs, Cartesia, PlayHT, Inworld, SD WebUI, ComfyUI, and Ollama Cloud now all appear in `/dashboard/providers` with API key configuration cards. Previously these providers existed only in the backend with no UI entry point.

- **Media page: provider + model selectors for all 5 modalities** — `/dashboard/media` now has a **Provider** dropdown and a **Model** dropdown for every tab. Selecting a provider shows only its models:
  - 🖼️ **Image**: OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, SD WebUI, ComfyUI (9 providers)
  - 🎬 **Video**: ComfyUI (AnimateDiff, SVD), SD WebUI (2 providers)
  - 🎵 **Music**: ComfyUI (Stable Audio Open, MusicGen)
  - 🔊 **Speech**: OpenAI, ElevenLabs, Deepgram, Hyperbolic, NVIDIA, Inworld, Cartesia, PlayHT, HuggingFace, Qwen (10 providers). Voice dropdown updates per provider.
  - 🎙️ **Transcription**: New tab — OpenAI Whisper, Groq, Deepgram, AssemblyAI, NVIDIA, HuggingFace, Qwen (7 providers). File upload instead of text prompt.

- **Playground: 4 new endpoint options** — Audio Transcription (`/v1/audio/transcriptions`), Video Generation (`/v1/videos/generations`), Music Generation (`/v1/music/generations`), Rerank (`/v1/rerank`). Previously only Chat, Responses, Images, Embeddings, Speech were available.

- **CLI Tools: OpenCode + Kiro** — Both tools now appear in `/dashboard/cli-tools` with step-by-step setup guides. OpenCode was already detected in Agents but had no configuration screen.

- **Agents: expanded CLI fingerprint providers** — kiro, cursor, kimi-coding, kilocode, cline added to the CLI fingerprint toggle list (previously only codex, claude, github, antigravity).

### 🧹 Maintenance

- Deleted 3 stale remote branches (`features-agente-mcp-a2a`, `fix/issue-218-round-robin-lastUsedAt`, `fix/resolve-open-issues`) — all their changes were already in main.
- Added minimal `layout.tsx` to all error-page routes (`400`, `401`, `403`, `408`, `429`, `500`, `502`, `503`) to fix Next.js standalone build.

### 📁 Files Changed

| File                                                      | Change                                                     |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| `src/shared/constants/providers.ts`                       | Add 7 missing APIKEY_PROVIDERS                             |
| `src/shared/constants/cliTools.ts`                        | Add opencode, kiro entries                                 |
| `src/app/(dashboard)/dashboard/media/MediaPageClient.tsx` | Full rewrite — provider/model selectors, transcription tab |
| `src/app/(dashboard)/dashboard/playground/page.tsx`       | Add 4 new endpoint options                                 |
| `src/app/(dashboard)/dashboard/agents/page.tsx`           | Expand cliCompatProviders list                             |
| `src/app/{400..503}/layout.tsx`                           | Add minimal layouts to fix Next.js build                   |

---

## [2.0.20] — 2026-03-09

> ### 🔊 TTS Expansion + 📱 Mobile UX + 🏷️ Friendly Names

### ✨ New Features

- **Inworld TTS provider** (`#248`) — Cloud TTS via `https://api.inworld.ai/tts/v1/voice`; Basic auth; JSON response with base64 `audioContent` decoded to binary. Use prefix `inworld/<model-id>`. Available models: `inworld-tts-1.5-max`, `inworld-tts-1.5-mini`.

- **Cartesia TTS provider** (`#248`) — Cloud TTS via `https://api.cartesia.ai/tts/bytes`; `X-API-Key` + `Cartesia-Version: 2024-06-10` headers; returns binary audio stream. Use prefix `cartesia/<model-id>`. Available models: `sonic-2`, `sonic-3`. Voice is mapped via voice ID.

- **PlayHT TTS provider** (`#248`) — Cloud TTS via `https://api.play.ht/api/v2/tts/stream`; dual auth `X-USER-ID` + `Authorization: Bearer` (store token as `userId:apiKey`). Use prefix `playht/<model-id>`. Available models: `PlayDialog`, `Play3.0-mini`.

- **ElevenLabs voice presets in dashboard** (`#248`) — `/dashboard/media` → Speech tab now shows provider-aware voice dropdowns: ElevenLabs (9 premade voices), Cartesia (3 preset voices), Deepgram Aura (5 voices), Inworld (2 voices), OpenAI (6 standard voices). Voice list updates automatically based on the model prefix typed.

- **Speech tab in `/dashboard/media`** (`#248`) — New "Text to Speech" tab alongside Image/Video/Music. Includes model text input (supports all provider prefixes), voice/format selectors, and an inline `<audio>` player with Blob URL + download button.

- **Text to Speech in `/dashboard/playground`** (`#248`) — New endpoint option; pre-filled body with model/input/voice/response_format; binary audio responses auto-rendered in an inline audio player instead of JSON.

- **Friendly display names** (`#260`) — New `src/lib/display/names.ts` with `getAccountDisplayName()` (name → displayName → email → Account #XXXXXX) and `getProviderDisplayName()` (node.name → node.prefix → de-UUIDed ID). Applied to `usageStats.ts` and `rate-limits/route.ts` to replace raw UUID fallbacks.

### 📱 Mobile UX (`#261`)

- **Sidebar scroll on short screens** — Mobile sidebar wrapper now uses `h-dvh` for true viewport height; `aside` receives `h-full` so the inner `nav` can actually scroll on short devices.
- **Providers page action areas** — All 4 section headers changed from `flex justify-between` to `flex flex-wrap` so multi-button action bars wrap gracefully on narrow screens.

### 📁 New Files

| File                       | Purpose                                                      |
| -------------------------- | ------------------------------------------------------------ |
| `src/lib/display/names.ts` | Centralized friendly-name helpers for accounts and providers |

### 📁 Files Changed

| File                                                      | Change                                                                  |
| --------------------------------------------------------- | ----------------------------------------------------------------------- |
| `open-sse/config/audioRegistry.ts`                        | Add Inworld, Cartesia, PlayHT to `AUDIO_SPEECH_PROVIDERS`               |
| `open-sse/handlers/audioSpeech.ts`                        | Add `handleInworldSpeech`, `handleCartesiaSpeech`, `handlePlayHtSpeech` |
| `src/app/(dashboard)/dashboard/media/MediaPageClient.tsx` | Full rewrite with Speech tab + provider-aware voice presets             |
| `src/app/(dashboard)/dashboard/playground/page.tsx`       | Add Speech endpoint option + audio Blob URL response renderer           |
| `src/app/(dashboard)/dashboard/providers/page.tsx`        | `flex-wrap` mobile fix for section headers                              |
| `src/lib/usage/usageStats.ts`                             | Use `getAccountDisplayName()`                                           |
| `src/app/api/rate-limits/route.ts`                        | Use `getAccountDisplayName()`                                           |
| `src/shared/components/Sidebar.tsx`                       | Add `h-full` to aside                                                   |
| `src/shared/components/layouts/DashboardLayout.tsx`       | Add `h-dvh` to mobile sidebar wrapper                                   |

---

## [2.0.19] — 2026-03-09

> ### 🔌 New Provider: Ollama Cloud + 🔒 Security Hardening

### ✨ New Features

- **Ollama Cloud provider** (`#255`, alias: `ollamacloud`) — API-key provider via `https://api.ollama.com/v1` (OpenAI-compatible). Use any cloud model with the `ollamacloud/<model>` prefix. Generate API keys at https://ollama.com/settings/api-keys. Pre-loaded models: Gemma 3 27B, Llama 3.3 70B, Qwen3 72B, Devstral 24B, DeepSeek R2 671B, Phi 4 14B, Mistral Small 3.2 24B. Passthrough model names also supported.

### 🔒 Security Fixes (`#258`)

- **CRITICAL — DB export endpoint unprotected** — Added `isAuthRequired + isAuthenticated` guard to `GET /api/db-backups/export`. Previously any unauthenticated user could download the full SQLite database (containing OAuth tokens and API keys).

- **CRITICAL — DB import endpoint unprotected** — Added `isAuthRequired + isAuthenticated` guard to `POST /api/db-backups/import`. Previously any unauthenticated user could replace the application database, effectively taking admin control.

- **HIGH — Cursor auto-import endpoint unprotected** — Added auth guard to `GET /api/oauth/cursor/auto-import`. Previously any unauthenticated user could read Cursor IDE access tokens from the local machine.

- **HIGH — Kiro auto-import endpoint unprotected** — Added auth guard to `GET /api/oauth/kiro/auto-import`. Previously any unauthenticated user could read AWS SSO refresh tokens from the local filesystem.

- **LOW (×4) — Non-constant-time string comparison (CWE-208)** — Replaced `===` with `safeEqual()` via `crypto.timingSafeEqual()` at all 4 email/workspaceId comparison sites in the OAuth route, preventing timing-oracle attacks.

- **False positive — `package.json` `reset-password`** — The scanner flagged `omniroute-reset-password` (a CLI binary name) as a hardcoded password. This is not a credential; no action required.

### 📁 Files Changed

| File                                             | Change                                    |
| ------------------------------------------------ | ----------------------------------------- |
| `open-sse/config/providerRegistry.ts`            | Add `ollama-cloud` registry entry         |
| `src/app/api/db-backups/export/route.ts`         | Add auth guard (CRITICAL)                 |
| `src/app/api/db-backups/import/route.ts`         | Add auth guard (CRITICAL)                 |
| `src/app/api/oauth/cursor/auto-import/route.ts`  | Add auth guard (HIGH)                     |
| `src/app/api/oauth/kiro/auto-import/route.ts`    | Add auth guard (HIGH)                     |
| `src/app/api/oauth/[provider]/[action]/route.ts` | Replace `===` with `safeEqual()` (LOW ×4) |

---

## [2.0.18] — 2026-03-09

> ### 🐛 Bug Fixes — Cursor Decompression, Codex Token Refresh, Password Setup

### 🐛 Bug Fixes

- **#250 — Cursor OAuth tool calls fail (decompression error)** — Frames flagged as `GZIP_ALT (0x02)` or `GZIP_BOTH (0x03)` may use zlib deflate format instead of gzip. `decompressPayload()` previously only tried `gunzipSync`, failing silently and returning raw bytes that downstream protobuf parsing rejected. Fix adds cascaded fallbacks: `gunzipSync` → `inflateSync` → `inflateRawSync`, with verbose error logging when all methods fail.

- **#251 — Codex OAuth accounts fail after v2.0.16 upgrade** — `CodexExecutor` was inheriting `BaseExecutor.refreshCredentials()` which always returns `null`. When a Codex access token expires after a server upgrade/restart, `chatCore.ts` calls `executor.refreshCredentials()` on every 401 response — which returned `null` for Codex, blocking token renewal entirely. Fix: `CodexExecutor` now overrides `refreshCredentials()` to call the existing `refreshCodexToken()` from `tokenRefresh.ts`, restoring automatic recovery.

- **#256 — Configure Password button broken after skipping onboarding** — `isAuthRequired()` in `apiAuth.ts` had a `setupComplete` guard: once `setupComplete=true`, it always required auth. But when the password step is skipped, `setupComplete=true` and `password=null`, making the dashboard inaccessible without a valid JWT (which doesn't exist because no password was ever set). Fix: removed the `setupComplete` check — auth is now skipped whenever no password is configured at all, allowing users to navigate to Settings → Security to set a first password.

### 📁 Files Changed

| File                           | Change                                                               |
| ------------------------------ | -------------------------------------------------------------------- |
| `open-sse/executors/cursor.ts` | Add `inflateSync`/`inflateRawSync` fallback in `decompressPayload()` |
| `open-sse/executors/codex.ts`  | Override `refreshCredentials()` to call `refreshCodexToken()`        |
| `src/shared/utils/apiAuth.ts`  | Remove `setupComplete` guard from `isAuthRequired()`                 |

---

## [2.0.17] — 2026-03-09

> ### 🐛 Bug Fixes + 🔌 Integrations

### 🐛 Bug Fixes

- **Antigravity/Gemini streaming broken in Claude Code** — Fixed `gemini-to-claude.ts` response translator that was emitting `content_block_start` + `content_block_stop` on **every single streaming chunk**. Claude Code interpreted each block as a separate element, rendering each text delta on its own line. Fix: `openTextBlockIdx` state variable keeps the text block open across chunks and only closes it when the block type changes or at `finishReason`. Fixes #253.

### 🔌 New Integrations

- **OpenCode native integration** — Agents dashboard now shows a **"Download opencode.json"** button when `opencode` is detected as installed. Clicking it fetches all available models from `/v1/models`, auto-fills `baseURL` from your current OmniRoute instance, and downloads a ready-to-use `opencode.json` config file. Inspired by @Alph4d0g's plugin (discussion #162).

### 🔧 CI Improvements

- **Electron macOS Intel CI fixed** — Updated CI runner from deprecated `macos-13` to `macos-15-intel` (GitHub's new Intel x64 runner, GA since April 2025). Fixes all macOS Intel build failures.
- **Electron binary version sync** — Added step to sync `electron/package.json` version before build so binaries are named correctly (`OmniRoute-2.0.17.dmg` instead of `OmniRoute-2.0.13.dmg`).
- **Release asset deduplication** — Removed duplicate `*-arm64.dmg` pattern from release files; added `fail_on_unmatched_files: false` for optional `.blockmap` files.

---

## [2.0.16] — 2026-03-08

> ### 🐛 Bug Fixes + 🔧 CI Hardening

### 🐛 Bug Fixes

- **NanoBanana async image polling** — Fixed `data: []` results from `/v1/images/generations` for NanoBanana. The previous implementation treated the submit response as a final image payload. NanoBanana APIs return a `taskId` requiring status polling — the handler now submits, extracts `taskId`, polls `/record-info` until `successFlag=1`, and normalizes to OpenAI format. Added `aspectRatio`/`resolution` inference from `size`. Backward compatible. PR #247 by @hijak

### 🔧 CI Fixes

- **Electron build token missing** — `electron-builder`'s GitHub publish provider requires `GH_TOKEN` to be set, but the build step didn't have it in its `env`. The workflow was failing with `GitHub Personal Access Token is not set` on all 4 platforms. **Fixed**: added `GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` to the `Build Electron for...` step (`.github/workflows/electron-release.yml`)

- **Security test `inputSanitizer.js` import** — `tests/unit/security-fase01.test.mjs` imported `inputSanitizer.js` (non-existent) instead of `inputSanitizer.ts`, causing `ERR_MODULE_NOT_FOUND` in CI. Fixed extension.

- **Route validation lint (t06)** — `POST /api/acp/agents` used `request.json()` without `validateBody()`, failing `check:route-validation:t06`. Added `validateBody(jsonObjectSchema)` — all 139 routes now pass.

- **Deploy to VPS SSH failure** — Added `continue-on-error: true` and `command_timeout: 5m` to the SSH step so that connection failures (when VPS is unreachable) don't mark the workflow as failed.

### 📁 Files Changed

| File                                              | Change                                                   |
| ------------------------------------------------- | -------------------------------------------------------- |
| `open-sse/config/imageRegistry.ts`                | Added NanoBanana `statusUrl`, extended `supportedSizes`  |
| `open-sse/handlers/imageGeneration.ts`            | NanoBanana async submit/poll flow + sync backward compat |
| `tests/unit/nanobanana-image-handler.test.mjs`    | **NEW** — unit tests                                     |
| `tests/unit/nanobanana-image-generation.test.mjs` | **NEW** — unit tests                                     |
| `.github/workflows/electron-release.yml`          | Add `GH_TOKEN` to build step (critical fix)              |
| `tests/unit/security-fase01.test.mjs`             | Fix `inputSanitizer.js` → `.ts`                          |
| `src/app/api/acp/agents/route.ts`                 | Add `validateBody(jsonObjectSchema)` to POST             |
| `.github/workflows/deploy-vps.yml`                | `continue-on-error: true` + `command_timeout: 5m`        |

---

## [2.0.15] — 2026-03-08

> ### ✨ New Features + 🐛 Bug Fix

### ✨ New Features

- **Codex Effort Clamp** — `CodexExecutor` now caps `reasoning_effort` to each model's maximum. Added `MAX_EFFORT_BY_MODEL` table and `clampEffort()` — silently clamps with debug log. Unknown models default to `xhigh` (unrestricted). PR #246

- **OpenRouter Catalog Cache** — New `src/lib/catalog/openrouterCatalog.ts`: persistent JSON cache at `DATA_DIR/cache/openrouter-catalog.json`, TTL 24h (`OPENROUTER_CATALOG_TTL_MS`), stale-if-error fallback. New endpoint `GET /api/models/openrouter-catalog` (authenticated, `?refresh=true` forces refresh). PR #246

- **Quota Preflight — opt-in toggle per provider** — New `open-sse/services/quotaPreflight.ts`. Proactively checks quota before requests, enabling account switching before 429s. Toggle via `providerSpecificData.quotaPreflightEnabled` (default: `false`). Extensible via `registerQuotaFetcher()`. Graceful degradation. PR #246

- **Quota Session Monitor — opt-in toggle per provider** — New `open-sse/services/quotaMonitor.ts`. Adaptive polling: 60s normal → 15s critical. Alert deduplication per session (5min window). Toggle via `providerSpecificData.quotaMonitorEnabled` (default: `false`). `timer.unref()` for clean exit. PR #246

### 🛠️ Improvements

- **Provider API supports `providerSpecificData` partial patch** — `PUT /api/providers/[id]` merges `providerSpecificData` (preserves existing keys). Validation schema updated. PR #246

### 🐛 Bug Fixes

- **#244 — Gemini rejects schemas with `"optional"` field** — Added `"optional"` to `UNSUPPORTED_SCHEMA_CONSTRAINTS` in `geminiHelper.ts`. Gemini API returns `400: Cannot find field: optional` when tool schemas include this field. PR #245

### 📦 Desktop Binaries (Electron)

Auto-generated on tag push via `electron-release.yml`:

| Platform            | Download                                           |
| ------------------- | -------------------------------------------------- |
| Windows             | `OmniRoute-Setup.exe` + `OmniRoute.exe` (portable) |
| macOS Intel         | `OmniRoute.dmg`                                    |
| macOS Apple Silicon | `OmniRoute-arm64.dmg`                              |
| Linux               | `OmniRoute.AppImage`                               |

### 📁 Files Changed

| File                                             | Change                     |
| ------------------------------------------------ | -------------------------- |
| `open-sse/executors/codex.ts`                    | Effort clamp logic         |
| `open-sse/services/quotaPreflight.ts`            | **NEW**                    |
| `open-sse/services/quotaMonitor.ts`              | **NEW**                    |
| `src/lib/catalog/openrouterCatalog.ts`           | **NEW**                    |
| `src/app/api/models/openrouter-catalog/route.ts` | **NEW**                    |
| `src/app/api/providers/[id]/route.ts`            | providerSpecificData merge |
| `src/shared/validation/schemas.ts`               | Schema update              |
| `open-sse/translator/helpers/geminiHelper.ts`    | Fix #244                   |

---

## [2.0.14] — 2026-03-08

> ### 🐛 Bug Fixes + Electron Release Fix

### 🐛 Bug Fixes

- **#243 — OpenAI-Compatible model name stripping** — Fixed `model.split("/").pop()` stripping vendor namespace from model names with slashes. Models like `moonshotai/Kimi-K2-Instruct` were being truncated to just `Kimi-K2-Instruct`. Now uses `slice(1).join("/")` to preserve the full vendor/model path
- **#242 — Multimodal image_url rejection on Responses API** — Fixed `image_url` content parts from Chat Completions format being passed through without conversion to `input_image` format expected by Responses/Codex backends. Now properly converts `{type: "image_url", image_url: {url: "..."}}` → `{type: "input_image", image_url: "..."}`

### 🔧 Infrastructure

- **PR #241 — Electron release workflow** — Synced `electron/package.json` version to `2.0.13`, separated macOS x64 and arm64 into dedicated CI runner jobs, using `macos-13` (Intel) runner for x64 builds to prevent cross-compilation timeouts (thanks @benzntech)

### 📁 Files Changed

| File                                              | Change                                                   |
| ------------------------------------------------- | -------------------------------------------------------- |
| `open-sse/executors/default.ts`                   | Fix model name stripping: `pop()` → `slice(1).join("/")` |
| `open-sse/translator/request/openai-responses.ts` | Convert `image_url` → `input_image` for Responses API    |
| `.github/workflows/electron-release.yml`          | Separate mac x64/arm64 builds                            |
| `electron/package.json`                           | Version sync + arch-specific build scripts               |

---

## [2.0.11] — 2026-03-07

> ### 🤖 ACP Agents Dashboard + Anti-Ban Docs

### ✨ New Features

- **ACP Agents Dashboard** — New Debug > Agents page: grid of 14 built-in CLI agents (codex, claude, goose, gemini, openclaw, aider, opencode, cline, qwen-code, forge, amazon-q, interpreter, cursor-cli, warp) with installation status, version detection, protocol badges, and custom agent form
- **Custom Agent Support** — Users can register any CLI tool for auto-detection via dashboard form (name, binary, version command, spawn args). Stored in settings DB
- **60-Second Detection Cache** — Agent detection results cached to avoid repeated `execSync` calls

### 🐛 Bug Fixes

- **Fix `settings.themeCoral` untranslated** — Theme color "Coral" was missing from the `settings` i18n namespace in all 30 languages. Added translations for all

### 📝 Documentation

- **Anti-Ban Features Clarified** — Improved README descriptions for TLS Fingerprint Spoofing and CLI Fingerprint Matching, emphasizing ban-risk reduction benefits and proxy IP preservation
- **ACP Agents Dashboard** — Added to v2.0.9+ features table and deployment features table in README

### 📁 Files Changed

| File                                            | Change                                                           |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| `src/lib/acp/registry.ts`                       | Expanded from 5 to 14 agents + custom agent support + 60s cache  |
| `src/app/api/acp/agents/route.ts`               | GET/POST/DELETE for full agent management                        |
| `src/app/(dashboard)/dashboard/agents/page.tsx` | New dashboard page                                               |
| `src/shared/components/Sidebar.tsx`             | Added Agents to Debug section                                    |
| `src/shared/validation/settingsSchemas.ts`      | Added `customAgents` array field                                 |
| `src/i18n/messages/*.json` (×30)                | Fixed `themeCoral`, added sidebar `agents` key, agents namespace |

---

## [2.0.9] — 2026-03-07

> ### 🚀 Feature Drop — Playground, CLI Fingerprints, ACP

### ✨ New Features

- **#234 — Model Playground** — Dashboard page to test any model directly (provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing metrics). Available in the Debug sidebar section.
- **#223 — CLI Fingerprint Matching** — Per-provider header/body field ordering to match native CLI binary fingerprints, reducing account flagging risk. Enable via `CLI_COMPAT_<PROVIDER>=1` or `CLI_COMPAT_ALL=1` env vars.
- **#235 — ACP Support** — Agent Client Protocol module with CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner/manager, and `/api/acp/agents` endpoint.

### 🧹 Housekeeping

- **#192 & #200** — Closed as stale (needs-info, v1.8.1, no reproduction info provided)

---

## [2.0.8] — 2026-03-07

> ### 🐛 Bug Fix — Custom Image Model Handler Resolution

### 🐛 Bug Fixes

- **#238 — Custom image models still fail in handler layer** — v2.0.7 fixed the route-layer validation, but the handler (`handleImageGeneration()`) called `parseImageModel()` again internally, rejecting custom models a second time. Fix: handler now accepts an optional `resolvedProvider` parameter; when provided, it skips re-validation and routes custom models to the OpenAI-compatible handler with a synthetic config. PR #239

### 📁 Files Changed

| File                                         | Change                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| `open-sse/handlers/imageGeneration.ts`       | Added `resolvedProvider` param + custom model fallback                           |
| `src/app/api/v1/images/generations/route.ts` | Tracks `isCustomModel`, passes `resolvedProvider`, credentials for custom models |

---

## [2.0.7] — 2026-03-07

> ### 🐛 Bug Fixes — Custom Image Models + Codex OAuth Workspace Isolation

### 🐛 Bug Fixes

- **#232 — Custom Gemini image models fail on `/v1/images/generations`** — Custom models tagged with `supportedEndpoints: ["images"]` appeared in the model listing (GET) but were rejected by the POST handler. `parseImageModel()` only checked the built-in `IMAGE_PROVIDERS` registry. Fix: added a custom model DB fallback for models with the `images` endpoint tag. PR #237
- **#236 — Codex OAuth overwrites existing connection when same email added to another workspace** — The OAuth callback route had 3 upsert blocks matching connections by email-only, bypassing the workspace-aware logic in `createProviderConnection()`. When the same email authenticated to a new workspace, the existing connection's `workspaceId` was silently overwritten. Fix: for Codex, the match now also checks `providerSpecificData.workspaceId`, allowing separate connections per workspace. PR #237

### 📁 Files Changed

| File                                             | Change                                               |
| ------------------------------------------------ | ---------------------------------------------------- |
| `src/app/api/v1/images/generations/route.ts`     | Custom model DB fallback in POST handler             |
| `src/app/api/oauth/[provider]/[action]/route.ts` | Workspace-aware Codex matching in 3 upsert locations |

### ⏭️ Issues Triaged

- **#234** — Playground feature request — Acknowledged, added to roadmap
- **#235** — ACP support feature request — Acknowledged, added to roadmap

---

## [2.0.6] — 2026-03-07

> ### 🐛 Bug Fix — Custom Model API Format Routing

### 🐛 Bug Fixes

- **#204 — Custom model `apiFormat` not used in routing** — Custom models configured with `apiFormat: "responses"` in the dashboard were still being routed through the Chat Completions translator. The `apiFormat` field was stored in the DB and displayed in the UI, but never consumed by the routing layer. Fix: `getModelInfo()` now returns `apiFormat` from the custom model DB, and both `resolveModelOrError()` functions override `targetFormat` to `openai-responses` when set. PR #233

### ✅ Issues Closed

- **#205** — Combo endpoint support — Already implemented in v2.0.2
- **#206** — Manual model→endpoint mapping — Already implemented in v2.0.2
- **#223** — CLI fingerprint parity — Responded with 4-phase roadmap

### 📁 Files Changed

| File                              | Change                                                                 |
| --------------------------------- | ---------------------------------------------------------------------- |
| `src/sse/services/model.ts`       | Added `lookupCustomModelApiFormat()`, enriched `getModelInfo()` return |
| `src/sse/handlers/chat.ts`        | Override `targetFormat` when `apiFormat === "responses"`               |
| `src/sse/handlers/chatHelpers.ts` | Same override in duplicate `resolveModelOrError()`                     |

---

## [2.0.5] — 2026-03-06

> ### 🐛 Bug Fix, Electron Auto-Update & Dependency Bumps

### 🐛 Bug Fixes

- **#224 — Chat→Responses translation creates invalid reasoning IDs** — Removed synthetic reasoning item generation in `openaiToOpenAIResponsesRequest()`. The translator was creating reasoning items with IDs like `reasoning_15`, but OpenAI's Responses API requires server-generated `rs_*` IDs, causing `400 Invalid Request` errors from Responses-compatible upstreams. Fix: omit reasoning items entirely during translation
- **CI: duplicate OmniRoute.exe in release workflow** — Removed redundant explicit `release-assets/OmniRoute.exe` entry that caused `softprops/action-gh-release` to fail with 404 on duplicate upload. PR #222 by @benzntech

### ✨ New Features

- **Electron Auto-Update** — Added auto-update functionality to the desktop app using `electron-updater`. Includes IPC handlers for check/download/install, "Check for Updates" in system tray menu, desktop notification when update is ready, and silent startup check (3s delay). PR #221 by @benzntech

### 📦 Dependencies

- Bump `actions/cache` from 4 to 5 (#225)
- Bump `actions/download-artifact` from 4 to 8 (#226)
- Bump `docker/login-action` from 3 to 4 (#227)
- Bump `actions/upload-artifact` from 4 to 7 (#228)
- Bump `docker/build-push-action` from 6 to 7 (#229)
- Bump `express-rate-limit` from 8.2.1 to 8.3.0 (#230)

### 📁 Files Changed

| File                                              | Change                                               |
| ------------------------------------------------- | ---------------------------------------------------- |
| `open-sse/translator/request/openai-responses.ts` | Remove synthetic reasoning item generation           |
| `.github/workflows/electron-release.yml`          | Remove duplicate exe entry, bump GH Actions          |
| `.github/workflows/docker-publish.yml`            | Bump docker/login-action and build-push-action       |
| `electron/main.js`                                | Auto-updater setup, IPC handlers, tray menu          |
| `electron/package.json`                           | Added electron-updater dep and GitHub publish config |
| `electron/preload.js`                             | Exposed update APIs via contextBridge                |
| `package-lock.json`                               | Updated express-rate-limit                           |

---

## [2.0.4] — 2026-03-06

> ### 🐛 Bug Fixes — Round-Robin Persistence & Docker Compatibility

### 🐛 Bug Fixes

- **#218 — Round-robin sticks to one account** — Added `last_used_at` column to `provider_connections` schema. Round-robin routing relied on `lastUsedAt` to rotate between accounts, but the column was missing from the database — the value was always `null`, causing selection to fall back to the same account. Includes auto-migration for existing databases
- **#217 — `Cannot find module 'zod'` in Docker/standalone builds** — Added `zod` to `serverExternalPackages` in `next.config.mjs`. Next.js standalone builds weren't tracing `zod` through dynamic imports, causing crashes on Docker startup. Data is **not lost** — the crash prevented the server from reading the existing database

### 📁 Files Changed

| File                      | Change                                                 |
| ------------------------- | ------------------------------------------------------ |
| `src/lib/db/core.ts`      | Schema + migration + JSON migration for `last_used_at` |
| `src/lib/db/providers.ts` | INSERT + UPDATE SQL for `last_used_at`                 |
| `next.config.mjs`         | `serverExternalPackages: ['better-sqlite3', 'zod']`    |

---

## [2.0.3] — 2026-03-05

> ### 🐛 Bug Fixes & Quota System Hardening

### 🐛 Bug Fixes

- **#215 — Deferred tools 400 error** — Skip `cache_control` on tools with `defer_loading=true` when assigning prompt caching to the last tool. Previously, the API rejected requests with 400 when MCP tools (Playwright, etc.) had deferred loading enabled. Fix applied in both `claudeHelper.ts` and `openai-to-claude.ts` translation layers. PR #216 by @DavyMassoneto
- **Stale compiled schemas.js** — Deleted stale compiled `schemas.js` (912 lines) that shadowed the TypeScript `.ts` source, causing `cloudSyncActionSchema` warnings in the dashboard. PR #216 by @DavyMassoneto
- **#202 — False quota exhaustion** — Fixed empty API responses (`{}`) creating quota objects with `utilization ?? 0` = 0% remaining, incorrectly marking accounts as exhausted. Added `hasUtilization()` guard. PR #214 by @DavyMassoneto
- **Invalid date crash** — `parseDate()` now validates dates before comparison, handling `Invalid Date` from malformed `resetAt` values gracefully. PR #214 by @DavyMassoneto
- **`total=0` false infinite quota** — `normalizeQuotas` now defaults to 0% remaining when `total` is zero (was incorrectly reporting 100%). PR #214 by @DavyMassoneto
- **Tailwind v4 build failure** — Tailwind v4 scanned `*.sqlite-shm`/`.sqlite-wal` binary files, triggering "Invalid code point" errors. Added `@source not` exclusions in `globals.css`. PR #214 by @DavyMassoneto

### ✨ Improvements

- **Quota-aware account selection** — All load-balancing strategies (sticky, round-robin, p2c, random, least-used, cost-optimized, fill-first) now prioritize accounts with available quota over exhausted ones. PR #214 by @DavyMassoneto
- **Concurrent refresh protection** — `tickRunning` flag prevents overlapping background quota refresh ticks; `refreshingSet` deduplicates per-connection refreshes. Thundering herd prevention with `MAX_CONCURRENT_REFRESHES=5`. PR #214 by @DavyMassoneto
- **`clearModelUnavailability` on success** — Model unavailability is now cleared on every successful request, not only on fallback paths. PR #214 by @DavyMassoneto
- **Centralized `anthropic-version`** — Hardcoded `anthropic-version` header (3 occurrences) centralized into `CLAUDE_CONFIG.apiVersion`. PR #214 by @DavyMassoneto
- **Extracted `safePercentage()` utility** — Shared percentage validation function extracted to `src/shared/utils/formatting.ts`, eliminating duplication between backend and frontend. PR #214 by @DavyMassoneto
- **`isRecord()` type guard** — Replaces inline `typeof` chain in usage API route. PR #214 by @DavyMassoneto

### 📁 Files Changed

| File                                                                                  | Change                                                     |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `open-sse/translator/helpers/claudeHelper.ts`                                         | Skip `cache_control` on deferred tools                     |
| `open-sse/translator/request/openai-to-claude.ts`                                     | Same fix in translator layer                               |
| `src/shared/validation/schemas.js`                                                    | **DELETED** — stale compiled JS                            |
| `.gitignore`                                                                          | Exclude Tailwind binary scanning                           |
| `open-sse/services/usage.ts`                                                          | Legacy endpoint fallback logging                           |
| `src/domain/quotaCache.ts`                                                            | **NEW** — Core quota cache with hardening                  |
| `src/shared/utils/formatting.ts`                                                      | **NEW** — `safePercentage()` utility                       |
| `src/instrumentation.ts`                                                              | Startup log for quota cache                                |
| `src/sse/handlers/chat.ts`                                                            | `clearModelUnavailability` + `markAccountExhaustedFrom429` |
| `src/sse/services/auth.ts`                                                            | Quota-aware account selection                              |
| `src/app/globals.css`                                                                 | Tailwind `@source not` exclusions                          |
| `src/app/api/usage/[connectionId]/route.ts`                                           | `isRecord()` type guard                                    |
| `src/app/(dashboard)/dashboard/usage/components/ProviderLimits/ProviderLimitCard.tsx` | Use `remainingPercentage` directly                         |
| `src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx`             | Use shared `safePercentage()`                              |

---

## [2.0.2] — 2026-03-05

> ### 🐛 Bug Fixes & ✨ Endpoint-Aware Model Management

### 🐛 Bug Fixes

- **#212 — API Key creation crash** — Auto-generate `API_KEY_SECRET` at startup (like `JWT_SECRET`) to prevent HMAC crashes
- **#213 — Circuit breaker scope** — Changed circuit breaker key from provider-level to model-level; a 429 on one account no longer blocks all accounts for the same provider
- **#200 — Custom provider connection check** — Added connectivity fallback for OpenAI-compatible providers (Ollama, LM Studio); if `/models` and `/chat/completions` fail, a simple HTTP ping to the base URL marks the provider as connected

### ✨ New Features

- **#204 — API Format selector** — Custom models can now specify `apiFormat`: `chat-completions` (default) or `responses` (for the Responses API)
- **#205 — Combo endpoint support** — Combos now accept an `endpoint` field in the schema (`chat` | `embeddings` | `images`), enabling fallback/rotation combos for non-chat endpoints
- **#206 — Supported Endpoints mapping** — When adding custom models, users can check which endpoints the model supports (💬 Chat, 📐 Embeddings, 🖼️ Images, 🔊 Audio). Models tagged for embeddings appear in `/v1/embeddings` and models tagged for images appear in `/v1/images/generations`
- **Visual badges** — Model rows now display colored badges for non-default API formats and endpoint types
- **Model catalog metadata** — `/v1/models` response includes `api_format`, `type`, and `supported_endpoints` for custom models

### 📁 Files Changed

| File                                                    | Change                                           |
| ------------------------------------------------------- | ------------------------------------------------ |
| `src/instrumentation.ts`                                | Auto-generate `API_KEY_SECRET`                   |
| `open-sse/services/combo.ts`                            | Circuit breaker keyed per-model                  |
| `src/lib/providers/validation.ts`                       | Connectivity fallback ping                       |
| `src/lib/db/models.ts`                                  | `apiFormat` + `supportedEndpoints` fields        |
| `src/shared/schemas/validation.ts`                      | `endpoint` in `comboSchema`                      |
| `src/shared/validation/schemas.ts`                      | Extended `providerModelMutationSchema`           |
| `src/app/api/provider-models/route.ts`                  | Pass new fields through API                      |
| `src/app/(dashboard)/dashboard/providers/[id]/page.tsx` | API format dropdown, endpoint checkboxes, badges |
| `src/app/api/v1/models/catalog.ts`                      | Custom model metadata enrichment                 |
| `src/app/api/v1/embeddings/route.ts`                    | Include custom embedding models                  |
| `src/app/api/v1/images/generations/route.ts`            | Include custom image models                      |

---

## [2.0.0] — 2026-03-05

> ### 🚀 Major Release — MCP Multi-Transport, A2A Protocol, Auto-Combo Engine & Full Type Safety Overhaul
>
> **OmniRoute 2.0** transforms the AI gateway into a fully **agent-controllable platform**. AI agents can now discover, orchestrate, and optimize routing through 16 MCP tools (via 3 transports: stdio, SSE, Streamable HTTP) or the A2A v0.3 protocol. Accompanied by a self-healing Auto-Combo engine, VS Code extension, consolidated Endpoints dashboard with service toggles, and a comprehensive type safety overhaul across the entire codebase.

### 🔌 MCP Multi-Transport (3 Modes)

- **stdio** — Local transport for IDE integration (Claude Desktop, Cursor, VS Code Copilot). Launched via `omniroute --mcp`
- **SSE (Server-Sent Events)** — Remote HTTP transport at `/api/mcp/sse` (GET+POST). Runs in-process inside Next.js
- **Streamable HTTP** — Modern bidirectional HTTP transport at `/api/mcp/stream` (GET+POST+DELETE). Uses `WebStandardStreamableHTTPServerTransport` singleton
- **Transport Selector UI** — When MCP is enabled, a transport picker shows all 3 modes with connection URLs and a Copy button
- **Settings Persistence** — `mcpTransport` field in settings API (enum: `stdio` | `sse` | `streamable-http`)

### 🆕 MCP Server (16 Tools)

- **8 Essential Tools** — `get_health`, `list_combos`, `get_combo_metrics`, `switch_combo`, `check_quota`, `route_request`, `cost_report`, `list_models_catalog`
- **8 Advanced Tools** — `simulate_route`, `set_budget_guard`, `set_resilience_profile`, `test_combo`, `get_provider_metrics`, `best_combo_for_task`, `explain_route`, `get_session_snapshot`
- **Scoped Authorization** — 9 permission scopes (`read:health`, `read:combos`, `read:quota`, `read:usage`, `read:models`, `execute:completions`, `write:combos`, `write:budget`, `write:resilience`) with wildcard support
- **Audit Logging** — Every tool call logged to SQLite with SHA-256 input hashing, output summarization, and duration tracking
- **IDE Configs** — MCP configuration templates for Claude Desktop, Cursor, VS Code Copilot, and stdio transport
- **Type-Safe Schemas** — All 16 tools defined with Zod input/output schemas, descriptions, and scope declarations
- 📖 **Documentation** — [`open-sse/mcp-server/README.md`](open-sse/mcp-server/README.md) with architecture, tool reference, and client examples in Python, TypeScript, and Go

### 🤖 A2A Server (Agent-to-Agent v0.3)

- **JSON-RPC 2.0** — Full router with `message/send`, `message/stream`, `tasks/get`, `tasks/cancel`
- **Agent Card** — Dynamic `/.well-known/agent.json` with 2 skills and bearer auth
- **Skills** — `smart-routing` (routing explanation, cost envelope, resilience trace, policy verdict) and `quota-management` (natural language quota queries with ranking, free combo suggestions, and full summaries)
- **SSE Streaming** — Real-time task streaming with 15s heartbeat, chunk events, and completion metadata
- **Task Manager** — State machine (`submitted`→`working`→`completed`/`failed`/`cancelled`), TTL (5min default), auto-cleanup (2× TTL)
- **Routing Logger** — Decision audit trail with 7-day retention and routing statistics
- **Task Execution** — Generic executor with proper state transitions on success/failure
- 📖 **Documentation** — [`src/lib/a2a/README.md`](src/lib/a2a/README.md) with JSON-RPC methods, skill reference, client examples, and MCP vs A2A comparison

### ⚡ Auto-Combo Engine

- **6-Factor Scoring** — Quota, health, costInv, latencyInv, taskFit, stability (normalized 0-1)
- **Task Fitness Table** — 30+ models × 6 task types with wildcard boosts
- **4 Mode Packs** — Ship Fast, Cost Saver, Quality First, Offline Friendly
- **Self-Healing** — Progressive cooldown exclusion, probe-based re-admission, incident mode (>50% OPEN)
- **Bandit Exploration** — 5% exploratory routing for discovering better providers
- **Adaptation Persistence** — EMA scoring with disk persistence every 10 decisions
- **REST API** — `POST/GET /api/combos/auto` for CRUD operations

### 🎛️ Consolidated Endpoints Dashboard

- **Tabbed Navigation** — Merged standalone Endpoint, MCP, and A2A sidebar entries into a single **"Endpoints"** page using `SegmentedControl`. Four tabs: **Endpoint Proxy**, **MCP**, **A2A**, **API Endpoints**
- **Service Enable/Disable Toggles** — MCP and A2A tabs have clickable ON/OFF toggle switches with settings persistence (default: OFF)
- **Service Status Indicators** — Inline status badges (green "Online" / red "Offline") with 30s auto-refresh
- **API Endpoints Tab** — Placeholder page with "Coming Soon" badge, listing planned features: REST API catalog, webhooks, OpenAPI/Swagger spec, and per-endpoint auth management
- **Sidebar Cleanup** — Removed standalone MCP and A2A entries; renamed "Endpoint" to "Endpoints"

### 🧩 VS Code Extension — Advanced Features

- **MCP Client** — 16 tool wrappers with REST API fallback
- **A2A Client** — Agent discovery, message send/stream, task management
- **Smart Dispatch** — Task type detection, combo recommendation, risk scoring
- **Preflight Dialog** — Risk-based display (auto-skip low, info medium, modal high)
- **Budget Guard** — Session cost tracking with status bar indicator and threshold actions
- **Mode Pack Selector** — Quick-pick UI for switching optimization profiles
- **Health Monitor** — Circuit breaker state change notifications
- **Human Checkpoint** — Multi-factor confidence evaluation with handoff dialog

### 📊 Dashboard Pages

- **MCP Dashboard** — Tool listing, usage stats, audit log with 30s auto-refresh
- **A2A Dashboard** — Agent Card display, skill listing, task history with routing metadata
- **Auto-Combo Dashboard** — Provider score bars, factor breakdown, mode pack selector, incident indicator, exclusion list
- **Error Pages** — Custom error and not-found pages for the dashboard

### 🔗 Integrations

- **OpenClaw** — Dynamic `provider.order` endpoint at `/api/cli-tools/openclaw/auto-order`
- **Configurable Tool Name Prefix** — `TOOL_NAME_PREFIX` env var for custom MCP tool naming (#199)
- **Custom RPM/TPM Rate Limits** — Per-provider rate limit overrides (#198)
- **CORS Fix** — CORS headers on early-return error responses (#208)
- **Auto-Combo Validation** — Proper validation for auto-combo CRUD operations (#209)

### 🌐 i18n (30 Languages)

- **Endpoints Namespace** — Added `endpoints` i18n namespace with tab labels, toggle labels, and API Endpoints page translations across all 30 locales
- **Sidebar & Header Updates** — Updated sidebar key from `endpoint` to `endpoints` and header breadcrumb descriptions across all 30 locales
- **Media & Themes i18n** — Added media section and combo strategy guide translations across all 30 locales

### 🔧 Code Quality & Type Safety

- **Eliminated `any` types** — Replaced `any` casts across `open-sse/` services, translators, and handlers with proper generics and explicit types
- **Zod Validation Schemas** — Added Zod-based validation for all MCP tool inputs/outputs and API validation layer
- **Shared Contracts** — Normalized quota and combos API responses with shared contracts (`src/shared/contracts/quota.ts`) for consistent data shapes across MCP, A2A, and REST APIs
- **TypeScript Translator Types** — Added strict types and modularized the translator registry with proper interfaces
- **DB Layer Hardening** — Improved database layer with proper error handling and type safety in the compliance module
- **A2A Lifecycle Safety** — Enhanced A2A task lifecycle with type-safe state transitions, preventing invalid state changes on completed tasks
- **Stream Handling** — Improved ComfyUI and stream handling with proper type safety
- **Webpack Barrel-File Fix** — Extracted `updateSettingsSchema` into dedicated `settingsSchemas.ts` to bypass webpack tree-shaking bug
- **Security Fix** — Insecure randomness fix for code scanning alert #54

### 🧪 Tests

- **E2E Test Suite** — 6 scenarios covering MCP, A2A, Auto-Combo, OpenClaw, Stress (100+50 parallel), Security
- **Unit Tests** — Essential tools (139 tests), advanced tools (141 tests), Auto-Combo engine (162 tests), A2A lifecycle regression tests
- **Schema Hardening Tests** — `t06-schema-hardening.test.mjs` (132 tests) for input validation
- **Security Tests** — `t07-no-log-key-config.test.mjs` (138 tests), `t08-mcp-scope-enforcement.test.mjs` (72 tests)
- **Integration Tests** — `v1-contracts-behavior.test.mjs` (171 tests), `security-hardening.test.mjs` (103 tests)
- **Migrated Tests to TypeScript** — E2E ecosystem tests migrated from `.mjs` to `.ts` with proper typing
- **Combo E2E Tests** — Strategy guides, advanced settings, readiness checks

### 📝 Documentation

- **AGENTS.md** — Updated to v2.0.0 with MCP multi-transport, A2A Protocol, Auto-Combo Engine, consolidated Endpoints dashboard, and Zod validation references
- **README.md** — Updated Agent & Protocol feature table with 3 transport modes, consolidated endpoints, and service toggles
- **30 Translated READMEs** — Synced feature tables across all language versions
- **CHANGELOG.md** — Comprehensive release notes covering all v1.8.1 → v2.0.0 changes

### 📁 New Files (60+)

| Directory                        | Files                                                                                                                                                      |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/`           | `server.ts`, `index.ts`, `audit.ts`, `scopeEnforcement.ts`, `httpTransport.ts`, `tools/advancedTools.ts`, `README.md`                                      |
| `open-sse/mcp-server/schemas/`   | `tools.ts`, `a2a.ts`, `audit.ts`, `index.ts`                                                                                                               |
| `src/lib/a2a/`                   | `taskManager.ts`, `taskExecution.ts`, `streaming.ts`, `routingLogger.ts`, `README.md`                                                                      |
| `src/lib/a2a/skills/`            | `smartRouting.ts`, `quotaManagement.ts`                                                                                                                    |
| `src/app/a2a/`                   | `route.ts` (JSON-RPC 2.0 dispatch handler)                                                                                                                 |
| `src/app/api/mcp/sse/`           | `route.ts` (SSE transport endpoint)                                                                                                                        |
| `src/app/api/mcp/stream/`        | `route.ts` (Streamable HTTP transport endpoint)                                                                                                            |
| `open-sse/services/autoCombo/`   | `scoring.ts`, `taskFitness.ts`, `engine.ts`, `selfHealing.ts`, `modePacks.ts`, `persistence.ts`, `index.ts`                                                |
| `src/shared/contracts/`          | `quota.ts` (shared API contracts)                                                                                                                          |
| `src/shared/constants/`          | `mcpScopes.ts`                                                                                                                                             |
| `src/shared/validation/`         | `settingsSchemas.ts` (extracted settings Zod schema)                                                                                                       |
| `src/lib/db/migrations/`         | `002_mcp_a2a_tables.sql`                                                                                                                                   |
| `src/app/(dashboard)/`           | `dashboard/mcp/page.tsx`, `dashboard/a2a/page.tsx`, `dashboard/auto-combo/page.tsx`, `dashboard/endpoint/ApiEndpointsTab.tsx`                              |
| `vscode-extension/src/services/` | `mcpClient.ts`, `a2aClient.ts`, `policyEngine.ts`, `preflightDialog.ts`, `budgetGuard.ts`, `healthMonitor.ts`, `modePackSelector.ts`, `humanCheckpoint.ts` |
| `scripts/`                       | `check-cycles.mjs`, `check-docs-sync.mjs`, `check-route-validation.mjs`, `check-t11-any-budget.mjs`, `run-playwright-tests.mjs`, `runtime-env.mjs`         |
| `tests/`                         | `t06-schema-hardening.test.mjs`, `t07-no-log-key-config.test.mjs`, `t08-mcp-scope-enforcement.test.mjs`, `ecosystem.test.ts`                               |
| `docs/`                          | `mcp-server.md`, `a2a-server.md`, `auto-combo.md`, `vscode-extension.md`, `integrations/ide-configs.md`, `RELEASE_CHECKLIST.md`                            |

### 📝 Commit History (`features-agente-mcp-a2a` branch)

| Commit    | Date       | Description                                                                              |
| :-------- | :--------- | :--------------------------------------------------------------------------------------- |
| `e0ddb22` | 2026-03-03 | feat: add MCP server mode with `--mcp` flag for IDE integration                          |
| `09a1748` | 2026-03-03 | feat: add Phase 3 advanced MCP tools and A2A smart routing skill                         |
| `1e1a9c9` | 2026-03-04 | feat: migrate tests to TypeScript and add MCP advanced tools test suite                  |
| `ab77452` | 2026-03-04 | feat: normalize quota and combos API responses with shared contracts                     |
| `88ad4cc` | 2026-03-04 | feat: add MCP server, A2A protocol, auto-combo engine & VS Code extension                |
| `cc429d4` | 2026-03-04 | feat: add TypeScript types and modularize translator registry                            |
| `adc8fdf` | 2026-03-04 | feat: add A2A protocol support and refactor API validation layer                         |
| `500cae3` | 2026-03-04 | refactor: replace `any` types with generics and add Zod validation schemas               |
| `889e2ba` | 2026-03-04 | feat: add error pages, harden DB layer and compliance module                             |
| `cbd0b1c` | 2026-03-04 | refactor: harden open-sse services, eliminate any casts, add dashboard pages             |
| `b33a853` | 2026-03-04 | feat: Introduce A2A lifecycle management, add type safety to ComfyUI and stream handling |
| `a1a2610` | 2026-03-04 | feat: v2.0.0 - MCP server, A2A agent, proxy improvements and docs update                 |
| `d615ca5` | 2026-03-05 | feat: configurable tool name prefix (#199) and custom rpm/tpm rate limits (#198)         |
| `6d8868b` | 2026-03-05 | fix: extract validation helpers to fix webpack barrel-file resolution bug                |
| `bc2e60c` | 2026-03-05 | feat: Introduce new A2A and MCP API routes, enhance dashboard UI, E2E tests              |
| `79c23df` | 2026-03-05 | feat: Add i18n for media/themes, enhance combos with strategy guides, E2E tests          |
| `2490ba5` | 2026-03-05 | feat: Introduce combo readiness checks and strategy recommendations                      |
| `48dda26` | 2026-03-05 | fix: CORS headers on early-return error responses + auto-combo validation (#208, #209)   |
| `078a42b` | 2026-03-05 | feat: consolidate Endpoint, MCP, A2A into tabbed Endpoints page                          |
| `6f1e6a0` | 2026-03-05 | feat: add MCP/A2A enable/disable toggle switches on Endpoints page                       |
| `bb9d85b` | 2026-03-05 | fix: extract updateSettingsSchema to bypass webpack barrel-file bug                      |
| `cc7e1a0` | 2026-03-05 | feat: add MCP multi-transport (stdio + SSE + Streamable HTTP)                            |

---

## [1.8.1] — 2026-03-03

### 🐛 Bug Fixes

- **Usage API Proxy Support** — Quota/usage fetch calls (`/api/usage/[connectionId]`) now route through the dashboard-configured proxy (Global → Provider → Key level). Previously, usage fetchers used bare `fetch()` which bypassed the Global Proxy setting, causing "fetch failed" errors in Docker deployments behind a proxy. Fixes #194

## [1.8.0] — 2026-03-03

### 🐛 Bug Fixes

- **Empty `tool_use.name` Validation** — Fixed intermittent HTTP 400 errors when using Claude Code through OmniRoute. Assistant messages with empty `tool_use.name` fields (from interrupted tool calls or malformed history) are now validated and filtered at two layers: the `openai-to-claude` request translator and the `prepareClaudeRequest` sanitizer. Fixes #191
- **Windows Electron Release** — Fixed the "Collect installers" step failing in every Windows build since v1.7.5+. `electron-builder` produces versioned portable exe filenames (e.g., `OmniRoute 1.6.9.exe`), not the hardcoded `OmniRoute.exe` the workflow expected. Now finds the portable exe dynamically by pattern. PR #190 by @benzntech

## [1.7.14] — 2026-03-02

### 🐛 Bug Fixes

- **Responses SSE Passthrough** — Passthrough mode is now format-aware: Responses SSE payloads (`response.*` type) skip Chat Completions-specific sanitization (`sanitizeStreamingChunk`, `fixInvalidId`, `hasValuableContent`), preventing potential stream corruption for Responses-native clients. Usage extraction still works for both formats. Fixes #186

### ✨ Features

- **Blackbox AI Dashboard** — Added blackbox.ai provider to the dashboard frontend (providers page, pricing, models endpoint). Completes #175

## [1.7.11] — 2026-03-02

### ✨ Features

- **Blackbox AI Provider** — Added blackbox.ai as a new OpenAI-compatible provider with 6 default models (GPT-4o, Gemini 2.5 Flash, Claude Sonnet 4, DeepSeek V3, Blackbox AI, Blackbox AI Pro) and provider logo. Fixes #175

### 🐛 Bug Fixes

- **Antigravity 404 Error** — Added warning logs when `generateProjectId()` generates a fallback project ID because `credentials.projectId` is null. The executor now prefers the translator-set `body.project` before generating a new fallback, eliminating duplicate warnings and ID mismatch. Fixes #176. Includes improvements from PRs #184 and #185

## [1.7.10] — 2026-03-02

### 🐛 Bug Fixes

- **Streaming Tool Calls (Responses→ChatCompletions)** — Fixed two issues in the `openaiResponsesToOpenAIResponse` translator that broke tool call execution in agentic clients (OpenCode, Claude Code, Cursor, etc.): (1) Argument delta chunks now include `tool_calls[].id` and `type: "function"` so clients can associate argument fragments correctly. (2) `finish_reason` is now `"tool_calls"` instead of hardcoded `"stop"` when tool calls occurred. Fixes #180

## [1.7.9] — 2026-03-02

### 🐛 Bug Fixes

- **Electron CI Build** — Added `JWT_SECRET` environment variable to the Electron release workflow `Build Next.js standalone` step, fixing build failures in GitHub Actions. PR #178 by @benzntech

### 📝 Documentation

- **README** — Updated OpenClaw link from `cline/cline` to `openclaw/openclaw` to reflect the project rename. PR #179 by @MAINER4IK

## [1.7.8] — 2026-03-02

### ✨ New Features

- **Theme Color Customization** — Users can now select from 7 preset accent colors (Coral, Blue, Red, Green, Violet, Orange, Cyan) or define a custom color via color picker/hex input. The chosen color dynamically updates `--color-primary` and `--color-primary-hover` CSS variables across the entire UI. PR #174 by @mainer4ik

### 🌐 Multi-Language Sync

- **Theme & Media i18n** — Added `themeCoral`, `themeBlue`, `themeRed`, `themeGreen`, `themeViolet`, `themeOrange`, `themeCyan`, `themeAccent`, `themeAccentDesc`, `themeCustom`, `themeCreate`, and media section translations across all **30 language locales**

### 🔧 Code Quality (Review Improvements)

- Exported `COLOR_THEMES` constant from `themeStore.ts` for DRY reuse
- Added hex color validation with visual feedback (red border + disabled apply button)
- Synced local state via Zustand `subscribe` pattern for cross-tab consistency
- Removed dead `/themes` route from Header.tsx
- Added CSS `color-mix()` fallback for older browsers

## [1.7.7] — 2026-03-02

### 🐛 Bug Fixes

- **Gemini Tool Schema Sanitization** — The standard Gemini provider now sanitizes OpenAI tool schemas before forwarding to Gemini API, removing unsupported JSON Schema keywords (`additionalProperties`, `$schema`, `const`, `default`, `not`, etc.). Previously, sanitization only ran in the CLI executor path, causing Gemini to reject tool calls when schemas contained unsupported constraints. Also applied sanitization to `response_format.json_schema`. Fixes #173

## [1.7.6] — 2026-03-02

### 🐛 Bug Fixes

- **Cloud Proxy `undefined/v1` Fix** — When the `NEXT_PUBLIC_CLOUD_URL` environment variable is not set (common in Docker deployments), the endpoint page now correctly falls back instead of showing `undefined/v1`. The cloud sync API now returns `cloudUrl` in its response so the frontend can use it dynamically. Fixes #171

### ✨ New Features

- **Cloud Worker `/v1/models` Endpoint** — The Cloud Worker now supports the `/v1/models` endpoint for both URL formats (`/v1/models` and `/{machineId}/v1/models`), returning all available models synced from the local OmniRoute instance

### 🔧 Infrastructure

- **Cloudflare Workers Compatibility** — Fixed `setInterval` in global scope issue in `accountFallback.ts` that blocked Cloud Worker deployment. Lazy initialization pattern ensures compatibility with Cloudflare Workers runtime restrictions

## [1.7.5] — 2026-03-02

### 🐛 Bug Fixes

- **OAuth Re-Auth Duplicate Fix** — Re-authenticating an expired OAuth connection now updates the existing connection instead of creating a duplicate entry. When re-auth is triggered, the system matches by `provider` + `email` + `authType` and refreshes tokens in-place. Fixes #170

## [1.7.4] — 2026-03-01

### ✨ New Features

- **OpenCode CLI Integration** — Added full integration guide for [OpenCode](https://opencode.ai) AI CLI tool using `@ai-sdk/openai-compatible` adapter with custom `opencode.json` config. Resolves #169
- **Endpoint Page Restructured** — Reorganized the Endpoint dashboard page into 3 grouped categories (Core APIs, Media & Multi-Modal, Utility & Management) with visual dividers. Added 2 new endpoint sections: **Responses API** (`/v1/responses`) and **List Models** (`/v1/models`)
- **Model Aliases & Background Degradation i18n** — Added 14 translated settings keys and 7 translated endpoint keys across all **30 language locales**. Fixed missing translations showing raw keys like `settings.modelAliasesTitle` in the UI

### 🌐 Multi-Language Sync

- **30 README translations synced** — All 28 translated READMEs updated with v1.7.3 feature entries (Model Aliases, Background Degradation, Rate Limit Persistence, Token Refresh Resilience)
- **6 docs/i18n FEATURES.md updated** — Settings description expanded in da, it, nl, phi, pl, sv

### 📁 New Files

| File                                    | Purpose                                                     |
| --------------------------------------- | ----------------------------------------------------------- |
| `.agents/workflows/update-docs.md`      | Documentation update workflow with multi-language sync step |
| `.agents/workflows/generate-release.md` | Release generation workflow (version bump, npm, GitHub)     |
| `.agents/workflows/issue-triage.md`     | Issue triage workflow for issues with insufficient info     |

## [1.7.3] — 2026-03-01

### ✨ New Features

- **Model Deprecation Auto-Forward** — New `modelDeprecation.ts` service with 10+ built-in aliases for legacy Gemini, Claude, and OpenAI models. Deprecated model IDs (e.g., `gemini-pro`, `claude-2`) are automatically forwarded to their current replacements. Custom aliases configurable via new Settings → Routing → Model Aliases UI tab with full CRUD API (`/api/settings/model-aliases`)
- **Background Task Smart Degradation** — New `backgroundTaskDetector.ts` service detects background/utility requests (title generation, summarization, etc.) via 19 system prompt patterns and `X-Request-Priority` header, and automatically reroutes them to cheaper models. Configurable degradation map and detection patterns via new Settings → Routing → Background Degradation UI tab. Disabled by default (opt-in)
- **Rate Limit Persistence** — Learned rate limits from API response headers are now persisted to SQLite with 60-second debouncing and restored on startup (24h staleness filter). Rate limits survive server restarts instead of being lost in memory
- **thinkingLevel String Conversion** — `applyThinkingBudget()` now handles string-based `thinkingLevel` inputs (`"high"`, `"medium"`, `"low"`, `"none"`) by converting them to numeric token budgets. Supports `thinkingLevel`, `thinking_level`, and Gemini's `generationConfig.thinkingConfig.thinkingLevel` fields
- **Claude -thinking Model Auto-Injection** — Models ending with `-thinking` suffix (e.g., `claude-opus-4-6-thinking`) automatically get thinking parameters injected to prevent API errors. `hasThinkingCapableModel()` updated to recognize these suffixes
- **Gemini 3.0/3.1 Model Registry** — Updated provider registry to explicitly distinguish Gemini 3.1 (Pro, Flash) from 3.0 Preview variants across `gemini`, `gemini-cli`, and `antigravity` providers with clear naming conventions
- **Token Refresh Circuit Breaker** — Per-provider circuit breaker in `refreshWithRetry()`: 5 consecutive failures trigger a 30-minute cooldown to prevent infinite retry loops. Added 30-second timeout wrapper per refresh attempt. Exported `isProviderBlocked()` and `getCircuitBreakerStatus()` for diagnostics

### 🧪 Tests

- **40+ new unit tests** across 3 files: `model-deprecation.test.mjs` (14 tests), `background-task-detector.test.mjs` (14 tests), extended `thinking-budget.test.mjs` (+13 tests). Total suite: **561 tests, 0 failures**

### 📁 New Files

| File                                                                   | Purpose                                                               |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `open-sse/services/modelDeprecation.ts`                                | Model deprecation alias resolver with built-in + custom aliases       |
| `open-sse/services/backgroundTaskDetector.ts`                          | Background task detection with pattern matching and model degradation |
| `src/app/api/settings/model-aliases/route.ts`                          | CRUD API for model alias management                                   |
| `src/app/api/settings/background-degradation/route.ts`                 | API for background degradation config                                 |
| `src/app/(dashboard)/settings/components/ModelAliasesTab.tsx`          | Settings UI for model alias management                                |
| `src/app/(dashboard)/settings/components/BackgroundDegradationTab.tsx` | Settings UI for background degradation                                |
| `tests/unit/model-deprecation.test.mjs`                                | 14 unit tests for model deprecation                                   |
| `tests/unit/background-task-detector.test.mjs`                         | 14 unit tests for background task detection                           |

---

## [1.7.2] — 2026-03-01

### ✨ New Features

- **Multi-Modal Provider Support** — Added 6 TTS providers (ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3), 3 STT providers, 2 image providers (SD WebUI, ComfyUI), and two new modalities: `/v1/videos/generations` (Text-to-Video) and `/v1/music/generations` (Text-to-Music). Shared abstractions via `registryUtils.ts` and `comfyuiClient.ts` ([PR #167](https://github.com/diegosouzapw/OmniRoute/pull/167) by @ken2190)
- **Media Playground Page** — New dashboard page at `/dashboard/media` with tabbed interface (Image/Video/Music), model selector, prompt input, and JSON result viewer
- **Unit Tests for Registry Utils** — 24 tests covering `parseModelFromRegistry`, `getAllModelsFromRegistry`, `buildAuthHeaders`, and integration with video/music registries
- **WFGY 16-Problem RAG Failure Map** — Added troubleshooting reference for RAG/LLM failure taxonomy in `docs/TROUBLESHOOTING.md` ([PR #164](https://github.com/diegosouzapw/OmniRoute/pull/164) by @onestardao)

### 🐛 Fixed

- **Gemini Imported Models Return 404** — Strip `models/` prefix from Gemini model IDs during import to prevent doubled paths ([#163](https://github.com/diegosouzapw/OmniRoute/issues/163))
- **Pino File Transport Fails in Next.js Production** — Log actual error + add sync `pino.destination()` fallback ([#165](https://github.com/diegosouzapw/OmniRoute/issues/165))
- **Windows Electron CI Build** — Added `shell: bash` to Collect installers step for Windows runners ([PR #168](https://github.com/diegosouzapw/OmniRoute/pull/168) by @benzntech)
- **TypeScript Safety** — Replaced `Record<string, any>` with `Record<string, unknown>` in `registryUtils.ts`

---

## [1.7.1] — 2026-02-28

### 🐛 Fixed

- **Dashboard Layout Breakage** — Tailwind CSS v4 auto-detection failed to scan Next.js route group directories with parentheses (e.g. `(dashboard)`), causing all responsive grid utilities (`sm:grid-cols-*`, `md:grid-cols-*`, `lg:grid-cols-*`, `xl:grid-cols-*`) to be purged from production CSS. Cards displayed in a single column instead of multi-column grids. Fixed by adding explicit `@source` directives in `globals.css`

---

## [1.7.0] — 2026-02-28

### ✨ New Features

- **16 Pain Points Documentation** — New collapsible section "🎯 What OmniRoute Solves — 16 Real Pain Points" added to the main README and all 29 language-specific READMEs. Each pain point uses `<details>/<summary>` tags for clean, expandable content
- **Configurable User-Agent per Provider** — User-Agent strings for OAuth providers (Claude, Codex, GitHub, Antigravity, Kiro, iFlow, Qwen, Cursor, Gemini CLI) are now configurable via environment variables. Format: `{PROVIDER_ID}_USER_AGENT=custom-value` ([#155](https://github.com/diegosouzapw/OmniRoute/issues/155))

### 🐛 Fixed

- **Hardcoded `$HOME` Path in Standalone/Bun Builds** — 5 files (`backupService.ts`, `mitm/manager.ts`, `mitm/server.ts`, `mitm/cert/generate.ts`, `codex-profiles/route.ts`) were bypassing the centralized `dataPaths.ts` and using `os.homedir()` directly. This caused paths to bake the build machine's `$HOME` into standalone/bun builds, producing `EACCES: permission denied` errors on other machines. All files now use `resolveDataDir()` from `dataPaths.ts`, respecting `DATA_DIR` env var and XDG conventions ([#156](https://github.com/diegosouzapw/OmniRoute/issues/156))

### 📝 Documentation

- **`.env` and `.env.example` Synced** — Added 9 User-Agent env vars with latest known default values to both environment files
- **30 README Translations Updated** — All language READMEs now include the 16 Pain Points section

---

## [1.6.9] — 2026-02-28

### 🐛 Fixed

- **Proxy Port Preservation** — `new URL()` silently strips default ports (80/443); proxy connections now extract the port from the raw URL string before parsing, preventing connection timeouts ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **Proxy Credential Encoding** — URL-encode special characters in proxy username/password; decode during legacy migration ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **HTTPS Proxy Default Port** — Changed from 8080 to 443 in frontend and migration logic ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **Proxy Dispatcher Cache** — Invalidate cached dispatchers when proxy config is updated or deleted ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **Proxy Logger SQLite Type** — Cast `proxyPort` to `Number` for INTEGER column ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **CopilotToolCard URL** — Use `baseUrl` prop directly instead of redundant `window.location.origin`; filter to chat models only (`!m.type && !m.parent`) ([PR #160](https://github.com/diegosouzapw/OmniRoute/pull/160))

---

## [1.6.8] — 2026-02-28

### 🔧 Improved

- **Electron Release Workflow** — Refactored CI to trigger on git tags (`v*`) + manual dispatch, with version validation, artifact upload/download pattern across 3 platforms, and a single release job. Only installer files (`.dmg`, `.exe`, `.AppImage`) are uploaded — no more 5K+ unpacked files ([PR #159](https://github.com/diegosouzapw/OmniRoute/pull/159))
- **Windows Portable Exe** — Added standalone portable `.exe` build alongside the NSIS installer ([PR #159](https://github.com/diegosouzapw/OmniRoute/pull/159))
- **Source Code Archives** — Releases now include `OmniRoute-vX.Y.Z.source.tar.gz` and `.zip` via `git archive` ([PR #159](https://github.com/diegosouzapw/OmniRoute/pull/159))
- **Installation Docs** — Added platform-specific installation instructions with macOS Gatekeeper workaround ([PR #159](https://github.com/diegosouzapw/OmniRoute/pull/159))

### 🐛 Fixed

- **Next.js App Router Conflict** — Added `app/` (production standalone build) to `.gitignore`. This directory was conflicting with Next.js App Router detection in dev mode, causing all routes to return 404
- **Git Tracking** — Added `electron/node_modules/` to `.gitignore`

---

## [1.6.7] — 2026-02-28

### ✨ New Feature

- **GitHub Copilot Configuration Generator** — New tool on the CLI Tools dashboard page. Select models and generate the `chatLanguageModels.json` config block for VS Code GitHub Copilot using the Azure vendor pattern. Features: bulk model selection from `/v1/models` (includes combos/custom), search/filter, configurable tokens/tool-calling/vision, one-click copy, persistent selection via localStorage. Version compatibility warning for VS Code ≥ 1.109 / Copilot Chat ≥ v0.37 ([#142](https://github.com/diegosouzapw/OmniRoute/issues/142))

### 🧹 Housekeeping

- Added `electron/dist-electron/` to `.gitignore` (build artifact)

---

## [1.6.6] — 2026-02-28

### 🔒 Security Fix

- **Auth bypass after onboarding** — Fixed regression where users could access the dashboard without authentication after upgrading from older versions. The "no password" safeguard (for fresh installs) was incorrectly firing after onboarding was complete, allowing unauthenticated access when `setupComplete=true` but the password DB row was missing ([#151](https://github.com/diegosouzapw/OmniRoute/issues/151))

---

## [1.6.5] — 2026-02-28

### 🖥️ Electron Desktop

- **Official app icons** — Added proper platform-specific icons derived from the OmniRoute SVG logo: `.icns` (macOS), `.ico` (Windows), `.png` (Linux), and `tray-icon.png` (32×32) — via PR [#154](https://github.com/diegosouzapw/OmniRoute/pull/154)
- **Automated release workflow** — New GitHub Actions workflow (`electron-release.yml`) builds Electron for Windows/macOS/Linux on every GitHub release publish
- **CI fix** — Changed `npm ci` → `npm install` in the Electron build step since `electron/package-lock.json` is `.gitignored`

### 📖 Documentation

- **Desktop App section** — Added to all 30 README files (9 fully translated: PT-BR, ES, FR, DE, ZH-CN, JA, RU, KO, AR)
- **Electron Fix Plan** — Published detailed code review and fix documentation at `docs/ELECTRON_FIX_PLAN.md`

### 🐛 Issue Triage

- **#151** — Auth bypass after v1.6.3 upgrade — triaged, requesting more info from reporter
- **#142** — Copilot Config Generator — previously triaged, 5 comments

---

## [1.6.4] — 2026-02-28

### 🖥️ Electron Desktop — Code Review Hardening (16 Fixes)

#### 🔴 Critical

- **Server readiness** — Window now waits for server health check before loading URL; no more blank screens on cold start (#1)
- **Restart timeout** — `restart-server` IPC handler now has 5s timeout + `SIGKILL` to prevent indefinite hangs (#2)
- **Port change lifecycle** — `changePort()` now stops and restarts the server on the new port instead of just reloading the URL (#3)

#### 🟡 Important

- **Tray cleanup** — Old `Tray` instance is now destroyed before recreating, preventing duplicate icons and memory leaks (#4)
- **IPC event emission** — Main process now emits `server-status` and `port-changed` events to renderer, making React hooks functional (#5)
- **Listener accumulation** — Preload now returns disposer functions for precise listener cleanup instead of `removeAllListeners` (#6)
- **useIsElectron performance** — Replaced `useState`+`useEffect` with `useSyncExternalStore` to eliminate 5x unnecessary re-renders (#7)

#### 🔵 Minor

- Removed dead `isProduction` variable (#8)
- Platform-conditional `titleBarStyle` — `hiddenInset` only on macOS, `default` on Windows/Linux (#9)
- `stdio: pipe` — Server output captured for logging and readiness detection instead of `inherit` (#10)
- Shared `AppInfo` type — `useElectronAppInfo` now uses the shared interface from `types.d.ts` (#11)
- `useDataDir` error state — Now exposes errors instead of swallowing silently (#12)
- Synced `electron/package.json` version to `1.6.4` (#13)
- Removed dead `omniroute://` protocol config — no handler existed (#14)
- **Content Security Policy** — Added CSP via `session.webRequest.onHeadersReceived` (#15)
- Simplified preload validation — Generic `safeInvoke`/`safeSend`/`safeOn` wrappers reduce boilerplate (#16)

### 🧪 Test Suite Expansion

- **76 tests** across 15 suites (up from 64 tests / 9 suites)
- New: server readiness timeout, restart race condition, CSP directives, platform options, disposer pattern, generic IPC wrappers

---

## [1.6.3] — 2026-02-28

### 🐛 Bug Fixes

- **Database data preservation on upgrade** — Previously, upgrading from older versions (e.g. v1.2.0 → v1.6.x) could cause data loss by renaming the existing database when a legacy `schema_migrations` table was detected. Now checks for actual data before deciding to reset ([#146](https://github.com/diegosouzapw/OmniRoute/issues/146))
- **Hardcoded build-machine paths in npm package** — Next.js standalone output baked absolute paths from the build machine into `server.js` and `required-server-files.json`. On other machines these paths don't exist, causing `ENOENT` errors. The prepublish script now sanitizes all build paths to relative ([#147](https://github.com/diegosouzapw/OmniRoute/issues/147))

---

## [1.6.2] — 2026-02-27

### ✨ New Features

- **Provider labels in Combos** — Combo cards now show user-defined provider names instead of long UUID identifiers, making complex multi-provider combos easier to read ([#121](https://github.com/diegosouzapw/OmniRoute/issues/121))
- **Improved request log labels** — RequestLoggerV2 resolves OpenAI-compatible provider IDs to user-defined names via provider nodes lookup
- **Smarter API key display** — `formatApiKey()` now shows the full key name for named keys instead of truncating them

---

## [1.6.1] — 2026-02-27

### 🐛 Bug Fixes

- **Cross-platform npm install** — Added `postinstall` script to auto-rebuild `better-sqlite3` for the user's OS/architecture. Previously, the npm package shipped Linux x64 binaries that failed on Windows and macOS ([#129](https://github.com/diegosouzapw/OmniRoute/issues/129))

---

## [1.6.0] — 2026-02-27

> ### 🔀 Feature Release — Split-Port Mode
>
> API and Dashboard can now run on separate ports for advanced deployment scenarios (reverse proxies, container networking, network isolation). Community contribution by [@npmSteven](https://github.com/npmSteven) — PR [#140](https://github.com/diegosouzapw/OmniRoute/pull/140).

### ✨ New Features

- **Split-Port Runtime** — Serve dashboard and OpenAI-compatible API on different ports via `API_PORT` and `DASHBOARD_PORT` env vars. Opt-in; single-port mode unchanged ([#140](https://github.com/diegosouzapw/OmniRoute/pull/140))
- **API Bridge Server** — Lightweight HTTP proxy routes only OpenAI-compatible paths (`/v1`, `/chat/completions`, `/responses`, `/models`, `/codex`) on the API port, returns 404 for everything else
- **Centralized Port Resolution** — New `src/lib/runtime/ports.ts` module ensures consistent port config across server, CLI, OAuth, and cloud sync
- **Runtime Wrapper Scripts** — `scripts/run-next.mjs` and `scripts/run-standalone.mjs` for proper env propagation in dev and Docker modes

### 🐛 Bug Fixes & Polish

- Added 30s timeout to API bridge proxy requests to prevent resource exhaustion
- Extracted healthcheck into `scripts/healthcheck.mjs` (replaces duplicated inline code)
- CLI tools page and onboarding derive endpoints from runtime API port
- OAuth server fallback resolves to effective dashboard port
- Cloud sync internal URL follows dashboard port

### 🔒 Security

- API bridge defaults to `127.0.0.1` (not `0.0.0.0`) — network-safe by default
- `API_HOST` env var available for explicit override when needed

### 📦 Dependencies

- Bump `actions/upload-artifact` from 4 to 7 ([#143](https://github.com/diegosouzapw/OmniRoute/pull/143))
- Bump `actions/download-artifact` from 4 to 8 ([#144](https://github.com/diegosouzapw/OmniRoute/pull/144))

### 🧪 Tests

- Added 14 unit tests for `parsePort` and `resolveRuntimePorts`

---

## [1.5.0] — 2026-02-26

> ### 🌍 Massive i18n Expansion — 30 Languages
>
> Dashboard UI, README, and technical documentation now available in 30 languages. CI pipeline hardened with deploy guards.

### ✨ New Features

- **Dashboard i18n — 30 Languages** — Expanded dashboard internationalization from 2 languages (EN, PT-BR) to 30 languages: Arabic, Bulgarian, Danish, German, Spanish, Finnish, French, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Malay, Dutch, Norwegian, Polish, Portuguese (PT), Portuguese (BR), Romanian, Russian, Slovak, Swedish, Thai, Ukrainian, Vietnamese, Chinese (Simplified), Filipino, and English. All 500+ translation keys fully localized with RTL support for Arabic and Hebrew
- **Multi-Language READMEs** — Added 22 new README translations (total: 30 languages), up from the original 8. Each translation includes full project overview, setup guide, feature list, and pricing table
- **Multi-Language Documentation** — New `docs/i18n/` directory with translations of all core technical docs (API Reference, Architecture, Codebase Documentation, Features, Troubleshooting, User Guide) in 30 languages
- **i18n QA Tooling** — Added `scripts/i18n/` with i18n-specific QA and validation scripts
- **GitHub Discussions** — Enabled Discussions on the repository for community support and Q&A (#136)

### 🐛 Bug Fixes

- **Dashboard Responsiveness** — Fixed layout and responsiveness issues in dashboard components; improved i18n error message handling for missing translation keys

### 🔧 CI/CD

- **Deploy VPS Guard** — Added `DEPLOY_ENABLED` environment variable guard to `deploy-vps.yml` workflow, preventing accidental deployments. Removed broken Tailscale SSH step
- **Deleted Broken Workflow** — Removed non-functional `codex-review.yml` workflow that was failing in CI

---

## [1.4.11] — 2026-02-25

> ### 🐛 Settings Persistence Fix
>
> Fixes routing strategy and wildcard aliases not saving after page refresh.

### 🐛 Bug Fixes

- **Routing Strategy Not Saved After Refresh (#134)** — Added `fallbackStrategy`, `wildcardAliases`, and `stickyRoundRobinLimit` to the Zod validation schema. These fields were silently stripped during validation, preventing them from being persisted to the database

### 📝 Notes

- **#135 Closed** — Feature request for proxy configuration (global + per-provider) was already implemented in v1.4.10

---

## [1.4.10] — 2026-02-25

> ### 🔒 Proxy Visibility + Bug Fixes
>
> Color-coded proxy badges, provider-level proxy configuration, CLI tools page fix, and EACCES fix for restricted environments.

### ✨ New Features

- **Color-Coded Proxy Badges** — Each provider connection now shows its proxy status with color-coded badges: 🟢 green (global proxy), 🟡 amber (provider-level proxy), 🔵 blue (per-connection proxy). Badge always displays the proxy IP/host
- **Provider-Level Proxy Button** — New "Provider Proxy" button in the Connections header of each provider detail page. Allows configuring a proxy that applies to all connections of that provider
- **Proxy IP Display** — The proxy badge now always shows the proxy host/IP address for quick identification

### 🐛 Bug Fixes

- **CLI Tools Page Stuck in Loading** — Fixed the `/api/cli-tools/status` endpoint hanging indefinitely when binary checks stall on VPS. Added 5s server-side timeout per tool and 8s client-side AbortController timeout (#cli-tools-hang)
- **EACCES on Restricted Home Directories** — Fixed crash when `~/.omniroute` directory cannot be created due to permission issues. Now gracefully warns and suggests using the `DATA_DIR` environment variable (#133)

---

> ### 🌐 Full Internationalization (i18n) + Multi-Account Fix
>
> Complete dashboard i18n migration with next-intl, supporting English and Portuguese (Brazil). Fixes production build issues and enables multiple Codex accounts from the same workspace.

### ✨ New Features

- **Full Dashboard Internationalization** — Complete i18n migration of 21+ pages and components using `next-intl`. Every dashboard string is now translatable with full EN and PT-BR support. Includes language selector (globe icon) in the header for real-time language switching
- **Portuguese (Brazil) Translation** — Complete `pt-BR.json` translation file with 500+ keys covering all pages: Home, Providers, Settings, Combos, Analytics, Costs, Logs, Health, CLI Tools, Endpoint, API Manager, and Onboarding
- **Language Selector Component** — New `LanguageSelector` component in the header with flag icons and dropdown for switching between 🇺🇸 English and 🇧🇷 Português

### 🐛 Bug Fixes

- **Multiple Codex Accounts from Same Workspace** — Fixed deduplication logic in `createProviderConnection` that prevented adding multiple OpenAI Pro Business accounts from the same Team workspace. Now uses compound check (workspaceId + email) instead of workspaceId-only, allowing separate connections per user
- **Production Build — Crypto Import** — Fixed `instrumentation.ts` using `eval('require')('crypto')` to bypass webpack's static analysis that blocked the Node.js crypto module in the bundled instrumentation file
- **Production Build — Translation Scope** — Fixed sub-components `ProviderOverviewCard` and `ProviderModelsModal` in `HomePageClient.tsx` that referenced parent-scope translation hooks. Each sub-component now has its own `useTranslations()` call
- **Production Build — app/ Directory Conflict** — Resolved Next.js 16 confusing the production `app/` directory (server build output) with the `src/app/` app router directory, which caused "missing root layout" build failures

### 📄 i18n Pages Migrated

Home, Endpoint, API Manager, Providers (list + detail + new), Combos, Logs, Costs, Analytics, Health, CLI Tools, Settings (General, Security, Routing, Session, IP Filter, Compliance, Fallback Chains, Thinking Budget, Policies, Pricing, Resilience, Advanced), Onboarding Wizard, Audit Log, Usage

---

## [1.4.7] — 2026-02-25

> ### 🐛 Bugfix — Antigravity Model Prefix & Version Sync
>
> Fixes model name sent to Antigravity upstream API containing `antigravity/` prefix, causing 400 errors for non-opus models. Also syncs package-lock.json version.

### 🐛 Bug Fixes

- **Antigravity Model Prefix Stripping** — Model names sent to the Antigravity upstream API (Google Cloud Code) now have any `provider/` prefix defensively stripped. Previously, models like `antigravity/gemini-3-flash` were sent with the prefix intact, causing 400 errors from the upstream API. Only `claude-opus-4-6-thinking` worked because its routing path differed. Fix applied in 3 locations: `antigravity.ts` executor, and both `wrapInCloudCodeEnvelope` and `wrapInCloudCodeEnvelopeForClaude` in the translator
- **Package-lock.json Version Sync** — Fixed `package-lock.json` being stuck at `1.4.3` while `package.json` was at `1.4.6`, which prevented npm from publishing the correct version and caused the VPS deploy to stay on the old version

---

## [1.4.6] — 2026-02-25

> ### ✨ Community Release — Security Fix, Multi-Platform Docker, Model Updates & Plus Tier
>
> Enforces API key model restrictions across all endpoints, adds ARM64 Docker support, updates model registry for latest AI models, and introduces Plus tier in ProviderLimits.

### 🔒 Security

- **API Key Model Restrictions Enforced** — `isModelAllowedForKey()` was never called, allowing API keys with `allowedModels` restrictions to access any model. Created centralized `enforceApiKeyPolicy()` middleware and wired it into all `/v1/*` endpoints (chat, embeddings, images, audio, moderations, rerank). Supports exact match, prefix match (`openai/*`), and wildcard patterns ([#130](https://github.com/diegosouzapw/OmniRoute/issues/130), [PR #131](https://github.com/diegosouzapw/OmniRoute/pull/131) by [@ersintarhan](https://github.com/ersintarhan))
- **ApiKeyMetadata Type Safety** — Replaced `any` types with proper `ApiKeyMetadata` interface in the policy middleware. Added error logging in catch blocks for metadata fetch and budget check failures

### ✨ New Features

- **Docker Multi-Platform Builds** — Restructured Docker CI workflow to support both `linux/amd64` and `linux/arm64` using native runners and digest-based manifest merging. ARM64 users (Apple Silicon, AWS Graviton, Raspberry Pi) can now run OmniRoute natively ([PR #127](https://github.com/diegosouzapw/OmniRoute/pull/127) by [@npmSteven](https://github.com/npmSteven))
- **Plus Tier in ProviderLimits** — Added "Plus" as a separate category in the ProviderLimits dashboard, distinguishing Plus/Paid plans from Pro plans with proper ranking and filtering ([PR #126](https://github.com/diegosouzapw/OmniRoute/pull/126) by [@nyatoru](https://github.com/nyatoru))

### 🔧 Improvements

- **Model Registry Updates** — Updated provider registry, usage tracking, CLI tools config, and pricing for latest AI models: added Claude Sonnet 4.6, Gemini 3.1 Pro (High/Low), GPT OSS 120B Medium; removed deprecated Claude 4.5 variants and Gemini 2.5 Flash ([PR #128](https://github.com/diegosouzapw/OmniRoute/pull/128) by [@nyatoru](https://github.com/nyatoru))
- **Model ID Consistency** — Fixed `claude-sonnet-4-6-thinking` → `claude-sonnet-4-6` mismatch in `importantModels` to match the provider registry

---

## [1.4.5] — 2026-02-24

> ### 🐛 Bugfix Release — Claude Code OAuth & OAuth Proxy Routing
>
> Fixes Claude Code OAuth failures on remote deployments and routes all OAuth token exchanges through configured proxy.

### 🐛 Bug Fixes

- **Claude Code OAuth** — Fixed `400 Bad Request` on remote deployments by using Anthropic's registered `redirect_uri` (`https://platform.claude.com/oauth/code/callback`) instead of the dynamic server URL. Added missing OAuth scopes (`user:sessions:claude_code`, `user:mcp_servers`) to match the official Claude CLI. Configurable via `CLAUDE_CODE_REDIRECT_URI` env var ([#124](https://github.com/diegosouzapw/OmniRoute/issues/124))
- **OAuth Token Exchange Through Proxy** — OAuth token exchange during new connection setup now routes through the configured proxy (provider-level → global → direct), fixing `unsupported_country_region_territory` errors for region-restricted providers like OpenAI Codex ([#119](https://github.com/diegosouzapw/OmniRoute/issues/119))

---

## [1.4.4] — 2026-02-24

> ### ✨ Feature Release — Custom Provider Models in /v1/models
>
> Compatible provider models are now saved to the customModels database, making them visible via `/v1/models` for all OpenAI-compatible clients.

### ✨ New Features

- **Custom Provider Model Persistence** — Compatible provider models (manual or imported) are now saved to the `customModels` database so they appear in `/v1/models` listing for clients like Cursor, Cline, Antigravity, and Claude Code ([PR #122](https://github.com/diegosouzapw/OmniRoute/pull/122) by [@nyatoru](https://github.com/nyatoru))
- **Provider Models API** — New `/api/provider-models` endpoint (GET/POST/DELETE) for managing custom model entries with full authentication via `isAuthenticated`
- **Unified Model Deletion** — New `handleDeleteModel` removes models from both alias configuration and `customModels` database, preventing orphaned entries
- **Provider Node Prefix Resolution** — `getModelInfo` refactored to use provider node prefixes for accurate custom provider model resolution

### 🔒 Security

- **Authentication on Provider Models API** — All `/api/provider-models` endpoints require API key or JWT session authentication via shared `isAuthenticated` utility
- **URL Parameter Injection Fix** — Applied `encodeURIComponent` to all user-controlled URL parameters (`providerStorageAlias`, `providerId`) to prevent query string injection attacks
- **Shared Auth Utility** — Authentication logic extracted to `@/shared/utils/apiAuth.ts`, eliminating code duplication across `/api/models/alias` and `/api/provider-models`

### 🔧 Improvements

- **Toast Notifications** — Replaced blocking `alert()` calls with non-blocking `notify.error`/`notify.success` toast notifications matching the project's notification system
- **Transactional Save** — Model persistence is now transactional: database save must succeed before alias creation, preventing inconsistent state
- **Consistent Error Handling** — All model operations (add, import, delete) now provide user-facing error/success feedback via toast notifications
- **ComboFormModal Matching** — Improved provider node matching by ID or prefix for combo model selection

---

## [1.4.3] — 2026-02-23

### 🐛 Bug Fix

- **OAuth LAN Access** — Fixed OAuth flow for remote/LAN IP access (`192.168.x.x`). Previously, LAN IPs incorrectly used popup mode, leading to a broken redirect loop. Now defaults to manual callback URL input mode for non-localhost access

---

## [1.4.2] — 2026-02-23

### 🐛 Bug Fix

- **OAuth Token Refresh** — Fixed `client_secret is missing` error for Google-based OAuth providers (Antigravity, Gemini, Gemini CLI, iFlow). Desktop/CLI OAuth secrets are now hardcoded as defaults since Next.js inlined empty strings at build time.

---

## [1.4.1] — 2026-02-23

### 🔧 Improvements

- **Endpoint Page Cleanup** — Removed redundant API Key Management section from Endpoint page (now fully managed in the dedicated API Manager page)
- **CI/CD** — Added `deploy-vps.yml` workflow for automatic VPS deployment on new releases

---

## [1.4.0] — 2026-02-23

> ### ✨ Feature Release — Dedicated API Key Manager with Model Permissions
>
> Community-contributed API Key Manager page with model-level access control, enhanced with usage statistics, key status indicators, and improved UX.

### ✨ New Features

- **Dedicated API Key Manager** — New `/dashboard/api-manager` page for managing API keys, extracted from the Endpoint page. Includes create, delete, and permissions management with a clean table UI ([PR #118](https://github.com/diegosouzapw/OmniRoute/pull/118) by [@nyatoru](https://github.com/nyatoru))
- **Model-Level API Key Permissions** — Restrict API keys to specific models using `allowed_models` with wildcard pattern support (e.g., `openai/*`). Toggle between "Allow All" and "Restrict" modes with an intuitive provider-grouped model selector
- **API Key Validation Cache** — 3-tier caching layer (validation, metadata, permission) reduces database hits on every request, with automatic cache invalidation on key changes
- **Usage Statistics Per Key** — Each API key shows total request count and last used timestamp, with a stats summary dashboard (total keys, restricted keys, total requests, models available)
- **Key Status Indicators** — Color-coded lock/unlock icons and copy buttons on each key row for quick identification of restricted vs unrestricted keys

### 🔧 Improvements

- **Endpoint Page Simplified** — API key management removed from Endpoint page and replaced with a prominent link to the API Manager
- **Sidebar Navigation** — New "API Manager" entry with `vpn_key` icon in the sidebar
- **Prepared Statements** — API key database operations now use cached prepared statements for better performance
- **Input Validation** — XSS-safe sanitization and regex validation for key names; ID format validation for API calls

---

## [1.3.1] — 2026-02-23

> ### 🐛 Bugfix Release — Proxy Connection Tests & Compatible Provider Display
>
> Fixes provider connection tests bypassing configured proxy and improves compatible provider display in the request logger.

### 🐛 Bug Fixes

- **Connection Tests Now Use Proxy** — Provider connection tests (`Test Connection` button) now route through the configured proxy (key → combo → provider → global → direct), matching the behavior of real API calls. Previously, `fetch()` was called directly, bypassing the proxy entirely ([#119](https://github.com/diegosouzapw/OmniRoute/issues/119))
- **Compatible Provider Display in Logs** — OpenAI/Anthropic compatible providers now show friendly labels (`OAI-COMPAT`, `ANT-COMPAT`) instead of raw UUID-based IDs in the request logger's provider column, dropdown, and quick filters ([#113](https://github.com/diegosouzapw/OmniRoute/issues/113))

### 🧪 Tests

- **Connection Test Unit Tests** — 26 new test cases covering error classification logic, token expiry detection, and provider display label resolution

---

## [1.3.0] — 2026-02-23

> ### ✨ Feature Release — iFlow Fix, Health Check Logs Toggle, Kilocode Models & Model Deduplication
>
> Community-driven release with iFlow HMAC-SHA256 signature support, health check log management, expanded Kilocode model list, and model deduplication on the dashboard.

### ✨ New Features

- **Hide Health Check Logs** — New toggle in Settings → Appearance to suppress verbose `[HealthCheck]` messages from the server console. Uses a 30-second cache to minimize database reads with request coalescing for concurrent calls ([PR #111](https://github.com/diegosouzapw/OmniRoute/pull/111) by [@nyatoru](https://github.com/nyatoru))
- **Kilocode Custom Models Endpoint** — Added `modelsUrl` support in `RegistryEntry` for providers with non-standard model endpoints. Expanded Kilocode model list from 8 to 26 models including Qwen3, GPT-5, Claude 3 Haiku, Gemini 2.5, DeepSeek V3, Llama 4, and more ([PR #115](https://github.com/diegosouzapw/OmniRoute/pull/115) by [@benzntech](https://github.com/benzntech))

### 🐛 Bug Fixes

- **iFlow 406 Error** — Created dedicated `IFlowExecutor` with HMAC-SHA256 signature support (`session-id`, `x-iflow-timestamp`, `x-iflow-signature` headers). The iFlow provider was previously using the default executor which lacked the required signature headers, causing 406 errors ([#114](https://github.com/diegosouzapw/OmniRoute/issues/114))
- **Duplicate Models in Endpoint Lists** — Filtered out parent models (`!m.parent`) from all model categorization and count logic on the Endpoint page. Provider modal lists also exclude duplicates ([PR #112](https://github.com/diegosouzapw/OmniRoute/pull/112) by [@nyatoru](https://github.com/nyatoru))

### 🧪 Tests

- **IFlowExecutor Unit Tests** — 11 new test cases covering HMAC-SHA256 signature generation, header building, URL construction, body passthrough, and executor registry integration

---

## [1.2.0] — 2026-02-22

> ### ✨ Feature Release — Dashboard Session Auth for Models Endpoint
>
> Dashboard users can now access `/v1/models` via their existing session when API key auth is required.

### ✨ New Features

- **JWT Session Auth Fallback** — When `requireAuthForModels` is enabled, the `/v1/models` endpoint now accepts both API key (Bearer token) for external clients **and** the dashboard JWT session cookie (`auth_token`), allowing logged-in dashboard users to view models without needing an explicit API key ([PR #110](https://github.com/diegosouzapw/OmniRoute/pull/110) by [@nyatoru](https://github.com/nyatoru))

### 🔧 Improvements

- **401 instead of 404** — Authentication failures on `/v1/models` now return `401 Unauthorized` with a structured JSON error body (OpenAI-compatible format) instead of a generic `404 Not Found`, improving debuggability for API clients
- **Simplified auth logic** — Refactored the JWT cookie verification to reuse the same pattern as `apiAuth.ts`, removing redundant same-origin detection (~60 lines) since the `sameSite:lax` + `httpOnly` cookie flags already provide equivalent CSRF protection

---

## [1.1.1] — 2026-02-22

> ### 🐛 Bugfix Release — API Key Creation & Codex Team Plan Quotas
>
> Fixes API key creation crash when `API_KEY_SECRET` is not set and adds Code Review rate limit window to Codex quota display.

### 🐛 Bug Fixes

- **API Key Creation** — Added deterministic fallback for `API_KEY_SECRET` to prevent `crypto.createHmac` crash when the environment variable is not configured. Keys created without the secret are insecure (warned at startup) but the application no longer crashes ([#108](https://github.com/diegosouzapw/OmniRoute/issues/108))
- **Codex Code Review Quota** — Added parsing of the third rate limit window (`code_review_rate_limit`) from the ChatGPT usage API, supporting Plus/Pro/Team plan differences. The dashboard now displays all three quota bars: Session (5h), Weekly, and Code Review ([#106](https://github.com/diegosouzapw/OmniRoute/issues/106))

---

## [1.1.0] — 2026-02-21

> ### 🐛 Bugfix Release — OAuth Client Secret and Codex Business Quotas
>
> Fixes missing remote-server OAuth configurations and adds ChatGPT Business account quota monitoring.

### 🐛 Bug Fixes

- **OAuth Client Secret** — Omitted explicitly empty `client_secret` parameters to resolve token exchange connection rejection on remote servers missing environment variables for Antigravity, Gemini and iFlow ([#103](https://github.com/diegosouzapw/OmniRoute/issues/103))
- **Codex Business Quotas** — Automatically fetches the appropriate ChatGPT workspace to unlock the 5-hour Business usage limits directly inside the Quota tab and mapped `BIZ` string variant perfectly ([#101](https://github.com/diegosouzapw/OmniRoute/issues/101))

---

## [1.0.10] — 2026-02-21

> ### 🐛 Bugfix — Multi-Account Support for Qwen
>
> Solves the issue where adding a second Qwen account would overwrite the first one.

### 🐛 Bug Fixes

- **OAuth Accounts** — Extracted user email from the `id_token` using JWT decoding for Qwen and similar providers, allowing multiple accounts of the same provider to be authenticated simultaneously instead of triggering the fallback overwrite logic ([#99](https://github.com/diegosouzapw/OmniRoute/issues/99))

---

## [1.0.9] — 2026-02-21

> ### 🐛 Hotfix — Settings Persistence
>
> Fixes blocked providers and API auth toggle not being saved after page reload.

### 🐛 Bug Fixes

- **Settings Persistence** — Added `requireAuthForModels` (boolean) and `blockedProviders` (string array) to the Zod validation schema, which was silently stripping these fields during PATCH requests, preventing them from being saved to the database

---

## [1.0.8] — 2026-02-21

> ### 🔒 API Security & Windows Support
>
> Adds API Endpoint Protection for `/models`, Windows server startup fixes, and UI improvements.

### ✨ New Features

- **API Endpoint Protection (`/models`)** — New Security Tab settings to optionally require an API key for the `/v1/models` endpoint (returns 404 when unauthorized) and to selectively block specific providers from appearing in the models list ([#100](https://github.com/diegosouzapw/OmniRoute/issues/100), [#96](https://github.com/diegosouzapw/OmniRoute/issues/96))
- **Interactive Provider UI** — Blocked Providers setting features an interactive chip selector with visual badges for all available AI providers

### 🐛 Bug Fixes

- **Windows Server Startup** — Fixed `ERR_INVALID_FILE_URL_PATH` crash on Windows by safely wrapping `import.meta.url` resolution with a fallback to `process.cwd()` for globally installed npm packages ([#98](https://github.com/diegosouzapw/OmniRoute/issues/98))
- **Combo buttons visibility** — Fixed layout overlap and tight spacing for the Quick Action buttons (Clone / Delete / Test) on the Combos page on narrower screens ([#95](https://github.com/diegosouzapw/OmniRoute/issues/95))

---

## [1.0.7] — 2026-02-20

> ### 🐛 Bugfix Release — OpenAI Compatibility, Custom Models & OAuth UX
>
> Fixes three community-reported issues: stream default now follows OpenAI spec, custom OpenAI-compatible providers appear in `/v1/models`, and Google OAuth shows a clear error + tutorial for remote deployments.

### 🐛 Bug Fixes

- **`stream` defaults to `false`** — Aligns with the OpenAI specification which explicitly states `stream` defaults to `false`. Previously OmniRoute defaulted to `true`, causing SSE data to be returned instead of a JSON object, breaking clients like Spacebot, OpenCode, and standard Python/Rust/Go OpenAI SDKs that don't explicitly set `stream: true` ([#89](https://github.com/diegosouzapw/OmniRoute/issues/89))
- **Custom AI providers now appear in `/v1/models`** — OpenAI-compatible custom providers (e.g. FriendLI) whose provider ID wasn't in the built-in alias map were silently excluded from the models list even when active. Fixed by also checking the raw provider ID from the database against active connections ([#90](https://github.com/diegosouzapw/OmniRoute/issues/90))
- **OAuth `redirect_uri_mismatch` — improved UX for remote deployments** — Google OAuth providers (Antigravity, Gemini CLI) now always use `localhost` as redirect URI matching the registered credentials. Remote-access users see a targeted amber warning with a link to the new setup guide. The token exchange error message explains the root cause and guides users to configure their own credentials ([#91](https://github.com/diegosouzapw/OmniRoute/issues/91))

### 📖 Documentation

- **OAuth em Servidor Remoto tutorial** — New README section with step-by-step guide to configure custom Google Cloud OAuth 2.0 credentials for remote/VPS/Docker deployments
- **`.env.example` Google OAuth block** — Added prominent warning block explaining remote credential requirements with direct links to Google Cloud Console

### 📁 Files Modified

| File                                   | Change                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------- |
| `open-sse/handlers/chatCore.ts`        | `stream` defaults to `false` (was `true`) per OpenAI spec                                   |
| `src/app/api/v1/models/route.ts`       | Added raw `providerId` check for custom models active-provider filter                       |
| `src/shared/components/OAuthModal.tsx` | Force `localhost` redirect for Google OAuth; improved `redirect_uri_mismatch` error message |
| `.env.example`                         | Added ⚠️ Google OAuth remote credentials block with step-by-step instructions               |
| `README.md`                            | New "🔐 OAuth em Servidor Remoto" tutorial section                                          |

---

## [1.0.6] — 2026-02-20

> ### ✨ Provider & Combo Toggles — Strict Model Filtering
>
> `/v1/models` now shows only models from providers with active connections. Combos and providers can be toggled on/off directly from the dashboard.

### ✨ New Features

- **Provider toggle on Providers page** — Enable/disable all connections for a provider directly from the main Providers list. Toggle is always visible, no hover needed
- **Combo enable/disable toggle** — Each combo on the Combos page now has a toggle. Disabled combos are excluded from `/v1/models`
- **OAuth private IP support** — Expanded localhost detection to include private/LAN IPs (`192.168.x.x`, `10.x.x.x`, `172.16-31.x.x`) for correct OAuth redirect URIs

### 🐛 Bug Fixes

- **`/v1/models` strict filtering** — Models are now shown only from providers with active, enabled connections. Previously, if no connections existed or all were disabled, all 378+ models were shown as a fallback
- **Disabled provider models hidden** — Toggling off a provider immediately removes its models from `/v1/models`

---

## [1.0.5] — 2026-02-20

> ### 🐛 Hotfix — Model Filtering & Docker DATA_DIR
>
> Filters all model types in `/v1/models` by active providers and fixes Docker data directory mismatch.

### 🐛 Bug Fixes

- **`/v1/models` full filtering** — Embedding, image, rerank, audio, and moderation models are now filtered by active provider connections, matching chat model behavior. Providers like Together AI no longer appear without a configured API key (#88)
- **Docker `DATA_DIR`** — Added `ENV DATA_DIR=/app/data` to Dockerfile and `docker-compose.yml` ensuring the volume mount always matches the app data directory — prevents empty database on container recreation

---

## [1.0.4] — 2026-02-19

> ### 🔧 Provider Filtering, OAuth Proxy Fix & Documentation
>
> Dashboard model filtering by active providers, provider enable/disable visual indicators, OAuth login fix for nginx reverse proxy, and LLM onboarding documentation.

### ✨ Features

- **API Models filtering** — `GET /api/models` now returns only models from active providers; use `?all=true` for all models (#85)
- **Provider disabled indicator** — Provider cards show ⏸ "Disabled" badge with reduced opacity when all connections are inactive (#85)
- **`llm.txt`** — Comprehensive LLM onboarding file with project overview, architecture, flows, and conventions (#84)
- **WhatsApp Community** — Added WhatsApp group link to README badges and Support section

### 🐛 Bug Fixes

- **OAuth behind nginx** — Fixed OAuth login failing when behind a reverse proxy by using `window.location.origin` for redirect URI instead of hardcoded `localhost` (#86)
- **`NEXT_PUBLIC_BASE_URL` for OAuth** — Documented env var usage as redirect URI override for proxy deployments (#86)

### 📁 Files Added

| File      | Purpose                                            |
| --------- | -------------------------------------------------- |
| `llm.txt` | LLM and contributor onboarding (llms.txt standard) |

### 📁 Files Modified

| File                                               | Change                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| `src/app/api/models/route.ts`                      | Filter by active providers, `?all=true` param, `available` field |
| `src/app/(dashboard)/dashboard/providers/page.tsx` | `allDisabled` detection + ⏸ badge + opacity-50 on provider cards |
| `src/shared/components/OAuthModal.tsx`             | Proxy-aware redirect URI using `window.location.origin`          |
| `.env.example`                                     | Documented `NEXT_PUBLIC_BASE_URL` for OAuth behind proxy         |

---

## [1.0.3] — 2026-02-19

> ### 📊 Logs Dashboard & Real-Time Console Viewer
>
> Unified logs interface with real-time console log viewer, file-based logging via console interception, and server initialization improvements.

### ✨ Features

- **Logs Dashboard** — Consolidated 4-tab page at `/dashboard/logs` with Request Logs, Proxy Logs, Audit Logs, and Console tabs
- **Console Log Viewer** — Terminal-style real-time log viewer with color-coded log levels, auto-scroll, search/filtering, level filter, and 5-second polling
- **Console Interceptor** — Monkey-patches `console.log/info/warn/error/debug` at server start to capture all application output as JSON lines to `logs/application/app.log`
- **Log Rotation** — Size-based rotation and retention-based cleanup for log files

### 🔧 Improvements

- **Instrumentation consolidation** — Moved `initAuditLog()`, `cleanupExpiredLogs()`, and console interceptor initialization to Next.js `instrumentation.ts` (runs on both dev and prod server start)
- **Structured Logger file output** — `structuredLogger.ts` now also appends JSON log entries to the log file
- **Pino Logger fix** — Fixed broken mix of pino `transport` targets + manual `createWriteStream`; now uses `pino/file` transport targets exclusively with absolute paths

### 🗂️ Files Added

| File                                                 | Purpose                                                           |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/logs/page.tsx`        | Tabbed Logs Dashboard page                                        |
| `src/app/(dashboard)/dashboard/logs/AuditLogTab.tsx` | Audit log tab component extracted from standalone page            |
| `src/shared/components/ConsoleLogViewer.tsx`         | Terminal-style real-time log viewer                               |
| `src/app/api/logs/console/route.ts`                  | API endpoint to read log file (filters last 1h, level, component) |
| `src/lib/consoleInterceptor.ts`                      | Console method monkey-patching for file capture                   |
| `src/lib/logRotation.ts`                             | Log rotation by size and cleanup by retention days                |

### 🗂️ Files Modified

| File                                    | Change                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| `src/shared/components/Sidebar.tsx`     | Nav: "Request Logs" → "Logs" with `description` icon                            |
| `src/shared/components/Breadcrumbs.tsx` | Added breadcrumb labels for `logs`, `audit-log`, `console`                      |
| `src/instrumentation.ts`                | Added console interceptor + audit log init + expired log cleanup                |
| `src/server-init.ts`                    | Added console interceptor import (backup init)                                  |
| `src/shared/utils/logger.ts`            | Fixed pino file transport using `pino/file` targets                             |
| `src/shared/utils/structuredLogger.ts`  | Added `appendFileSync` file writing + log file config                           |
| `.env.example`                          | Added `LOG_TO_FILE`, `LOG_FILE_PATH`, `LOG_MAX_FILE_SIZE`, `LOG_RETENTION_DAYS` |

### ⚙️ Configuration

New environment variables:

| Variable             | Default                    | Description                   |
| -------------------- | -------------------------- | ----------------------------- |
| `LOG_TO_FILE`        | `true`                     | Enable/disable file logging   |
| `LOG_FILE_PATH`      | `logs/application/app.log` | Log file path                 |
| `LOG_MAX_FILE_SIZE`  | `50M`                      | Max file size before rotation |
| `LOG_RETENTION_DAYS` | `7`                        | Days to retain old log files  |

---

## [1.0.2] — 2026-02-18

> ### 🔒 Security Hardening, Architecture Improvements & UX Polish
>
> Comprehensive audit-driven improvements across security, architecture, testing, and user experience.

### 🛡️ Security (Phase 0)

- **Auth guard** — API route protection via `withAuth` middleware for all dashboard routes
- **CSRF protection** — Token-based CSRF guard for all state-changing API routes
- **Request payload validation** — Zod schemas for provider, combo, key, and settings endpoints
- **Prompt injection guard** — Input sanitization against malicious prompt patterns
- **Body size guard** — Route-specific body size limits with dedicated audio upload threshold
- **Rate limiter** — Per-IP rate limiting with configurable windows and thresholds

### 🏗️ Architecture (Phase 1–2)

- **DI container** — Simple dependency injection container for service registration
- **Policy engine** — Consolidated `PolicyEngine` for routing, security, and rate limiting
- **SQLite migration** — Database migration system with versioned migration runner
- **Graceful shutdown** — Clean server shutdown with connection draining
- **TypeScript fixes** — Resolved all `tsc` errors; removed redundant `@ts-check` directives
- **Pipeline decomposition** — `handleSingleModelChat` decomposed into composable pipeline stages
- **Prompt template versioning** — Version-tracked prompt templates with rollback support
- **Eval scheduling** — Automated evaluation suite scheduling with cron-based runner
- **Plugin architecture** — Extensible plugin system for custom middleware and handlers

### 🧪 Testing & CI (Phase 2)

- **Coverage thresholds** — Jest coverage thresholds enforced in CI (368 tests passing)
- **Proxy pipeline integration tests** — End-to-end tests for the proxy request pipeline
- **CI audit workflow** — npm audit and security scanning in GitHub Actions
- **k6 load tests** — Performance testing with ramping VUs and custom metrics

### ✨ UX & Polish (Phase 3–4)

- **Session management** — Session info card with login time, age, user agent, and logout
- **Focus indicators** — Global `:focus-visible` styles and `--focus-ring` CSS utility
- **Audit log viewer** — Security event audit log with structured data display
- **Dashboard cleanup** — Removed unused files, fixed Quick Start links to Endpoint page
- **Documentation** — Troubleshooting guide, deployment improvements

---

## [1.0.1] — 2026-02-18

> ### 🔧 API Compatibility & SDK Hardening
>
> Response sanitization, role normalization, and structured output improvements for strict OpenAI SDK compatibility and cross-provider robustness.

### 🛡️ Response Sanitization (NEW)

- **Response sanitizer module** — New `responseSanitizer.ts` strips non-standard fields (`x_groq`, `usage_breakdown`, `service_tier`, etc.) from all OpenAI-format provider responses, fixing OpenAI Python SDK v1.83+ Pydantic validation failures that returned raw strings instead of parsed `ChatCompletion` objects
- **Streaming chunk sanitization** — Passthrough streaming mode now sanitizes each SSE chunk in real-time via `sanitizeStreamingChunk()`, ensuring strict `chat.completion.chunk` schema compliance
- **ID/Object/Usage normalization** — Ensures `id`, `object`, `created`, `model`, `choices`, and `usage` fields always exist with correct types
- **Usage field cleanup** — Strips non-standard usage sub-fields, keeps only `prompt_tokens`, `completion_tokens`, `total_tokens`, and OpenAI detail fields

### 🧠 Think Tag Extraction (NEW)

- **`<think>` tag extraction** — Automatically extracts `<think>...</think>` blocks from thinking model responses (DeepSeek R1, Kimi K2 Thinking, etc.) into OpenAI's standard `reasoning_content` field
- **Streaming think-tag stripping** — Real-time `<think>` extraction in passthrough SSE stream, preventing JSON parsing errors in downstream tools
- **Preserves native reasoning** — Providers that already send `reasoning_content` natively (e.g., OpenAI o1) are not overwritten

### 🔄 Role Normalization (NEW)

- **`developer` → `system` conversion** — OpenAI's new `developer` role is automatically converted to `system` for all non-OpenAI providers (Claude, Gemini, Kiro, etc.)
- **`system` → `user` merging** — For models that reject the `system` role (GLM, ERNIE), system messages are intelligently merged into the first user message with clear delimiters
- **Model-aware normalization** — Uses model name prefix matching (`glm-*`, `ernie-*`) for compatibility decisions, avoiding hardcoded provider-level flags

### 📐 Structured Output for Gemini (NEW)

- **`response_format` → Gemini conversion** — OpenAI's `json_schema` structured output is now translated to Gemini's `responseMimeType` + `responseSchema` in the translator pipeline
- **`json_object` support** — `response_format: { type: "json_object" }` maps to Gemini's `application/json` MIME type
- **Schema cleanup** — Automatically removes unsupported JSON Schema keywords (`$schema`, `additionalProperties`) for Gemini compatibility

### 📁 Files Added

| File                                     | Purpose                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| `open-sse/handlers/responseSanitizer.ts` | Response field stripping, think-tag extraction, ID/usage normalization |
| `open-sse/services/roleNormalizer.ts`    | Developer→system, system→user role conversion pipeline                 |

### 📁 Files Modified

| File                                              | Change                                                                          |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `open-sse/handlers/chatCore.ts`                   | Integrated response sanitizer for non-streaming OpenAI responses                |
| `open-sse/utils/stream.ts`                        | Integrated streaming chunk sanitizer + think-tag extraction in passthrough mode |
| `open-sse/translator/index.ts`                    | Integrated role normalizer into the request translation pipeline                |
| `open-sse/translator/request/openai-to-gemini.ts` | Added `response_format` → `responseMimeType`/`responseSchema` conversion        |

---

## [1.0.0] — 2026-02-18

> ### 🎉 First Major Release — OmniRoute 1.0
>
> OmniRoute is an intelligent API gateway that unifies 20+ AI providers behind a single OpenAI-compatible endpoint. This release represents the culmination of the entire development effort — from initial prototype to production-ready platform.

### 🧠 Core Routing & Intelligence

- **Smart 4-tier fallback** — Auto-routing: Subscription → Cheap → Free → Emergency
- **6 routing strategies** — Fill First, Round Robin, Power-of-Two-Choices, Random, Least Used, Cost Optimized
- **Semantic caching** — Auto-cache responses for deduplication with configurable TTL
- **Request idempotency** — Prevent duplicate processing of identical requests
- **Thinking budget validation** — Control reasoning token allocation per request
- **System prompt injection** — Configurable global system prompts for all requests

### 🔌 Providers & Models

- **20+ AI providers** — OpenAI, Claude (Anthropic), Gemini, GitHub Copilot, DeepSeek, Groq, xAI, Mistral, Qwen, iFlow, Kiro, OpenRouter, GLM, MiniMax, Kimi, NVIDIA NIM, and more
- **Multi-account support** — Multiple accounts per provider with automatic rotation
- **OAuth 2.0 (PKCE)** — Automatic token management and refresh for Claude Code, Codex, Gemini CLI, Copilot, Kiro
- **Auto token refresh** — Background refresh with expiry detection and unrecoverable error handling
- **Model import** — Import models from API-compatible passthrough providers
- **OpenAI-compatible validation** — Fallback validation via chat completions for providers without `/models` endpoint
- **TLS fingerprint spoofing** — Browser-like TLS fingerprinting via `wreq-js` to bypass bot detection

### 🔄 Format Translation

- **Multi-format translation** — Seamless OpenAI ↔ Claude ↔ Gemini ↔ OpenAI Responses API conversion
- **Translator Playground** — 4 interactive modes:
  - **Playground** — Test format translations between any provider formats
  - **Chat Tester** — Send real requests through the proxy with visual response rendering
  - **Test Bench** — Automated batch testing across multiple providers
  - **Live Monitor** — Real-time stream of active proxy requests and translations

### 🎯 Combos & Fallback Chains

- **Custom combos** — Create model combinations with multi-provider fallback chains
- **6 combo balancing strategies** — Fill First, Round Robin, Random, Least Used, P2C, Cost Optimized
- **Combo circuit breaker** — Auto-disable failing providers within a combo chain

### 🛡️ Resilience & Security

- **Circuit breakers** — Auto-recovery with configurable thresholds and cooldown periods
- **Exponential backoff** — Progressive retry delays for failed requests
- **Anti-thundering herd** — Mutex-based protection against concurrent retry storms
- **Rate limit detection** — Per-provider RPM, min gap, and max concurrent request tracking
- **Editable rate limits** — Configurable defaults via Settings → Resilience with persistence
- **Prompt injection guard** — Input sanitization for malicious prompt patterns
- **PII redaction** — Automatic detection and masking of personally identifiable information
- **AES-256-GCM encryption** — Credential encryption at rest
- **IP access control** — Whitelist/blacklist IP filtering
- **SOCKS5 proxy support** — Outbound proxy for upstream provider calls

### 📊 Observability & Analytics

- **Analytics dashboard** — Recharts-based SVG charts: stat cards, model usage bar chart, provider breakdown table with success rates and latency
- **Real-time health monitoring** — Provider health, rate limits, latency telemetry
- **Request logs** — Dedicated page with SQLite-persisted proxy request/response logs
- **Limits & Quotas** — Separate dashboard for quota monitoring with reset countdowns
- **Cost analytics** — Token cost tracking and budget management per provider
- **Request telemetry** — Correlation IDs, structured logging, request timing

### 💾 Database & Backup

- **Dual database** — LowDB (JSON) for config + SQLite for domain state and proxy logs
- **Export database** — `GET /api/db-backups/export` — Download SQLite database file
- **Export all** — `GET /api/db-backups/exportAll` — Full backup as `.tar.gz` archive (DB + settings + combos + providers + masked API keys)
- **Import database** — `POST /api/db-backups/import` — Upload and restore with validation, integrity check, and pre-import backup
- **Automatic backups** — Configurable backup schedule with retention
- **Storage health** — Dashboard widget with database size, path, and backup status

### 🖥️ Dashboard & UI

- **Full dashboard** — Provider management, analytics, health monitoring, settings, CLI tools
- **9 dashboard sections** — Providers, Combos, Analytics, Health, Translator, Settings, CLI Tools, Usage, Endpoint
- **Settings restructure** — 6 tabs: Security, Routing, Resilience, AI, System/Storage, Advanced
- **Shared UI component library** — Reusable components (Avatar, Badge, Button, Card, DataTable, Modal, etc.)
- **Dark/Light/System theme** — Persistent theme selection with system preference detection
- **Agent showcase grid** — Visual grid of 10 AI coding agents in README header
- **Provider logos** — Logo assets for all supported agents and providers
- **Red shield badges** — Styled badge icons across all documentation

### ☁️ Deployment & Infrastructure

- **Docker support** — Multi-stage Dockerfile with `base` and `cli` profiles
- **Docker Hub** — `diegosouzapw/omniroute` with `latest` and versioned tags
- **Docker CI/CD** — GitHub Actions auto-build and push on release
- **npm CLI package** — `npx omniroute` with auto-launch
- **npm CI/CD** — GitHub Actions auto-publish to npm on release
- **Akamai VM deployment** — Production deployment on Nanode 1GB with nginx reverse proxy
- **Cloud sync** — Sync configuration across devices via Cloudflare Worker
- **Edge compatibility** — Native `crypto.randomUUID()` for Cloudflare Workers

### 🧪 Testing & Quality

- **100% TypeScript** — Full migration of `src/` (200+ files) and `open-sse/` (94 files) — zero `@ts-ignore`, zero TypeScript errors
- **CI/CD pipeline** — GitHub Actions for lint, build, test, npm publish, Docker publish
- **Unit tests** — 20+ test suites covering domain logic, security, caching, routing
- **E2E tests** — Playwright specs for API, navigation, and responsive behavior
- **LLM evaluations** — Golden set testing framework with 4 match strategies (`exact`, `contains`, `regex`, `custom`)
- **Security tests** — CLI runtime, Docker hardening, cloud sync, and OpenAI compatibility

### 📖 Documentation

- **8 language READMEs** — English, Portuguese (pt-BR), Spanish, Russian, Chinese (zh-CN), German, French, Italian
- **VM Deployment Guide** — Complete guide (VM + Docker + nginx + Cloudflare + security)
- **Features Gallery** — 9 dashboard screenshots with descriptions
- **API Reference** — Full endpoint documentation including backup/export/import
- **User Guide** — Step-by-step setup, configuration, and usage instructions
- **Architecture docs** — System design, component decomposition, ADRs
- **OpenAPI specification** — Machine-readable API documentation
- **Troubleshooting guide** — Common issues and solutions
- **Security policy** — `SECURITY.md` with vulnerability reporting via GitHub Security Advisories
- **Roadmap** — 150+ planned features across 6 categories

### 🔌 API Endpoints

- `/v1/chat/completions` — OpenAI-compatible chat endpoint with format translation
- `/v1/embeddings` — Embedding generation
- `/v1/images/generations` — Image generation
- `/v1/models` — Model listing with provider filtering
- `/v1/rerank` — Re-ranking endpoint
- `/v1/audio/*` — Audio transcription and translation
- `/v1/moderations` — Content moderation
- `/api/db-backups/export` — Database export
- `/api/db-backups/exportAll` — Full archive export
- `/api/db-backups/import` — Database import with validation
- 30+ dashboard API routes for providers, combos, settings, analytics, health, CLI tools

---

[1.6.3]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.6.3
[1.6.2]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.6.2
[1.6.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.6.1
[1.6.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.6.0
[1.5.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.5.0
[1.4.11]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.11
[1.4.10]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.10
[1.4.9]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.9
[1.4.8]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.8
[1.4.7]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.7
[1.4.6]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.6
[1.4.5]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.5
[1.4.4]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.4
[1.4.3]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.3
[1.4.2]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.2
[1.4.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.1
[1.4.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.0
[1.3.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.3.1
[1.3.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.3.0
[1.2.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.2.0
[1.1.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.1.1
[1.0.7]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.7
[1.0.6]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.6
[1.0.5]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.5
[1.0.4]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.4
[1.1.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.1.0
[1.0.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.1
[1.0.3]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.3
[1.0.2]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.2
[1.0.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.0
