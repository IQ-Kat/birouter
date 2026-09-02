# About Birouter

**Created by [Ikbal-Kat](https://github.com/IQ-Kat) & BinerAI Copilot**

Birouter is a unified AI proxy/router — route any LLM through one endpoint with multi-provider support, MCP Server, A2A Protocol, and Electron desktop app.

---

## Latest Updates

### v3.8.54 — Latest

- **OpenCode Browser User-Agent Override**: Implemented synthesis of OpenCode CLI identity headers and browser User-Agent override. When a browser User-Agent is detected (such as in playground requests), it is replaced with the CLI User-Agent (`opencode-cli/1.0.0`) to avoid mixed identities that Cloudflare rejects with 429/403.
- **Custom Model Responses API Routing**: Fixed Responses API routing for custom models by passing the correct `targetFormat` to the executor (updating `open-sse/executors/base.ts`, `open-sse/executors/opencode.ts`, and `open-sse/handlers/chatCore.ts`), preventing routing errors. Includes new unit tests.
- **OpenCode Model Cleanups**: Removed deprecated free models from the OpenCode provider configuration (except for `big-pickle`).
- **Live WebSocket Server Auth Override**: Added settings check (`wsAuth`, `setupComplete`, `requireLogin`) to authorize live WebSocket connections without authentication if authorization is disabled in the settings.
- **PWA Service Worker & Caching Refactoring**: Updated Service Worker (`public/sw.js`) to cache `.webmanifest` and `.json` assets, robustly handling network failures and caching errors without disrupting the offline/PWA experience.
- **Standalone Build & Assembly Enhancements**: Improved standalone package bundle assembly and prepublish scripts with robust symlink materialization and caching configurations.

---

_Stay up to date by pulling the latest changes from [github.com/IQ-Kat/birouter](https://github.com/IQ-Kat/birouter)_
