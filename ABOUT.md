# About Birouter

**Created by [Ikbal-Kat](https://github.com/IQ-Kat) & BinerAI Copilot**

Birouter is a unified AI proxy/router — route any LLM through one endpoint with multi-provider support, MCP Server, A2A Protocol, and Electron desktop app.

---

## Latest Updates

### v3.8.52 — Latest

- **New Provider Gateways (xKiro & OpenVecta)**:
  - Added **xKiro** OpenAI-compatible provider gateway (`https://api.xkiro.com/v1`) with passthrough models, free tier support, and live `/v1/models` discovery.
  - Ported **OpenVecta** provider registry (`openvectaProvider`), supporting models like GLM 4.7 Flash, Claude Sonnet 4.6, DeepSeek V4 Flash, GPT OSS 120B, Llama 4 Maverick, etc.
- **Live Model Discovery Auto-Derivation**: Enhanced `discoveryConfig.ts` to automatically derive live `/models` discovery URLs for all OpenAI-compatible providers directly from their `baseUrl`.
- **Core AI Translators & Stream Fixes**:
  - **Kiro Stream Filter**: Stripped leaked `<thinking>` tags from Kiro content streams.
  - **GLM / Fireworks Tool Call Fix**: Prevented GLM & Fireworks translators from repeating `tc.id` on every tool call argument chunk.
  - **Kiro Reasoning Field**: Added `reasoning` property to `additionalModelRequestFields` in `openai-to-kiro.ts`.
  - **Upstream 9Router Fixes**: Ported core translator & executor fixes (#2473, #2596, Codex v0.144.6).
- **Dashboard UI & Provider Management**:
  - **Custom Model Persistence & Alias Fix**: Connected manual model creation (`+` button) to SQLite `customModels` persistence via `POST /api/provider-models` in `PassthroughModelsSection` and cleared stale alias collisions.
  - **Responsive 2-Column Grid & Bounded Scrolling**: Constrained available models containers with scrollable `max-h-[560px]` and updated grid breakpoints to `md:grid-cols-2` for a clean 2-column layout on standard screens (>=768px).
  - **Enhanced Free/Paid Model Detection**: Improved `isFree` evaluation to inspect pricing flags, `:free` tags, and free/gratis keywords across imported and custom models.
  - **CLIProxy Provider Exposure**: Implemented `POST /api/services/cliproxy/provider-expose` endpoint to toggle CLIProxy exposure.
- **Desktop & System Features**:
  - **Windows Tray DPI Awareness**: Made Windows context menu DPI-aware in System Tray (`trayWindows.mjs`).
  - **Electron Symlink Materialization**: Added `materializeSymlinks: true` in `assembleStandalone` build script.
  - **Windows Spawn Shell & Kiro Auto-Import**: Ported Kiro auto-import `isCloudEnabled` await fix and Electron Windows spawn shell options.
- **Cost Calculation, Security & Dependency Hardening**:
  - **xAI Exact Cost & SSRF Guard**: Ported xAI exact cost calculation rules and provider validation SSRF guard.
  - **Secure Random Routing**: Replaced `Math.random` with `crypto.randomInt` in combo runtime units selection.
  - **Security Overrides**: Applied package overrides for `adm-zip` (^0.6.0), `dompurify`, `fast-xml-parser`, `sharp`, `hono`, `@hono/node-server`, `fast-uri`, and `body-parser`.

### v3.8.51

- **Linter & Type Alignment**: Resolved type-casting mismatch for `translatedResponse` in `chatCore.ts` using type assertion (`as typeof translatedResponse`) without introducing `any` keyword to adhere to the strict `t11` budget.
- **ESLint Bulk Suppressions Update**: Formally registered `chatCore.ts` into `eslint-suppressions.json` to lock legacy warnings and enable seamless integration with the master branch.
- **Next.js Client Components Props**: Fixed compilation error regarding Next.js serializable props on Client React components by renaming handlers callback `onSuccess` to server action compliant `onSuccessAction`.
- **SQLite Auto-Recovery & WAL Safety**: Solidified WAL-recovery database handlers to prevent corruption during sudden shutdown (like Ctrl+C) on Android/Termux devices.

### v3.8.50

- **Console Log Clearance**: Added a manual logs truncate/clear option directly in the Console Log Viewer, backed by a dynamic confirmation modal.
- **Amazon Q Model Listing Support**: Resolved the model listing issue for the Amazon Q provider by enabling dynamic model mapping to Kiro.
- **Mac-Style Modal Controls**: Refactored modal header exit buttons into interactive macOS window control styles (dots) with interactive hover and proper styling.
- **CLI & UI Layout Adjustments**: Raised z-index of the dashboard header to fix language dropdown overlap issues, and corrected backslash alignment in the CLI launch banner.

---

_Stay up to date by pulling the latest changes from [github.com/IQ-Kat/birouter](https://github.com/IQ-Kat/birouter)_
