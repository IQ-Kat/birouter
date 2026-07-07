# About Birouter

**Created by [Ikbal-Kat](https://github.com/IQ-Kat)**

Birouter is a unified AI proxy/router — route any LLM through one endpoint with multi-provider support, MCP Server, A2A Protocol, and Electron desktop app.

---

## Latest Updates

### v3.8.48 — Latest

- **Production Build Sanitization**: Fix Next.js standalone server paths (`outputFileTracingRoot`, `appDir`) serialization formatting for Windows systems, preventing launch crashes on other client devices.
- **Detached Tray Mode**: Allow the System Tray option (Option 2) in the CLI launch menu to detach completely from the terminal lifecycle, allowing the terminal window to close immediately while keeping the server running in the background.

### v3.8.47

- **New Provider Support**: Add Iamhc AI gateway (`iamhc`) with OpenAI-compatible passthrough models and signup free credits
- **Tray Mode & Build Fixes**: Improve Windows tray mode, autostart behavior, and clean up npm build file packaging
- **AgentRouter & Format Fixes**: Fix AgentRouter routing/validation and Anthropic message format translation schemas

---

_Stay up to date by pulling the latest changes from [github.com/IQ-Kat/birouter](https://github.com/IQ-Kat/birouter)_
