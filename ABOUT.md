# About Birouter

**Created by [Ikbal-Kat](https://github.com/IQ-Kat)**

Birouter is a unified AI proxy/router — route any LLM through one endpoint with multi-provider support, MCP Server, A2A Protocol, and Electron desktop app.

---

## Latest Updates

### v3.8.49 — Latest

- **Cross-Platform Path Normalization**: Unconditionally normalize all Windows backslash path separators (`\\`) to forward slashes (`/`) within Next.js standalone configurations (`server.js` and `required-server-files.json`) during packaging, fixing launch crashes on Android/Termux and other Linux hosts.
- **New Provider Support**: Add Iamhc AI gateway (`iamhc`) with OpenAI-compatible passthrough models and signup free credits
- **Tray Mode & Build Fixes**: Improve Windows tray mode, autostart behavior, and clean up npm build file packaging
- **AgentRouter & Format Fixes**: Fix AgentRouter routing/validation and Anthropic message format translation schemas

---

_Stay up to date by pulling the latest changes from [github.com/IQ-Kat/birouter](https://github.com/IQ-Kat/birouter)_
