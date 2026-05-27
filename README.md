<div align="center">

# Birouter — AI Router & Token Saver

**One endpoint for all your AI providers. Smart routing, auto-fallback, and 20-40% token savings.**

Connect your AI tools (Claude Code, Codex, Cursor, Cline, OpenClaw...) to 40+ providers & 100+ models through a single local gateway.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[🚀 Quick Start](#-quick-start) • [💡 Features](#-features) • [📖 Setup](#-setup) • [💝 Support](#-support)

</div>

---

## 🤔 Why Birouter?

- ✅ **RTK Token Saver** — Auto-compress tool outputs, save 20-40% tokens per request
- ✅ **Auto fallback** — Subscription → Cheap → Free, zero downtime
- ✅ **Multi-account** — Round-robin between accounts per provider
- ✅ **Format translation** — OpenAI ↔ Claude ↔ Gemini ↔ Vertex ↔ any format
- ✅ **40+ providers** — OpenAI, Anthropic, Gemini, DeepSeek, Groq, Mistral, xAI, and more
- ✅ **Fetch Models** — Discover available models from any provider with one click
- ✅ **Rate limiting** — Configurable RPM per API key (default off)
- ✅ **Savings tracker** — See how much money you've saved

---

## 🔄 How It Works

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Cursor, Cline, OpenClaw...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:2004/v1
       ↓
┌─────────────────────────────────────────────┐
│           Birouter (Smart Router)           │
│  • RTK Token Saver (cut tool_result tokens) │
│  • Format translation (OpenAI ↔ Claude)     │
│  • Quota tracking & auto-fallback           │
└──────┬──────────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, GitHub Copilot
       ├─→ [Tier 2: CHEAP] GLM, MiniMax, DeepSeek
       └─→ [Tier 3: FREE] Kiro, OpenCode Free, Vertex
```

---

## ⚡ Quick Start

**Run from source:**

```bash
git clone https://github.com/IQ-Kat/birouter.git
cd birouter
cp .env.example .env
npm install
npm run dev
```

🎉 Dashboard opens at `http://localhost:2004`

**Connect your CLI tool:**

```
Endpoint: http://localhost:2004/v1
API Key:  [copy from dashboard]
Model:    kr/claude-sonnet-4.5
```

**Docker:**

```bash
docker build -t birouter .
docker run -d --name birouter -p 2004:2004 --env-file .env -v birouter-data:/app/data birouter
```

---

## 💡 Features

| Feature | Description |
|---------|-------------|
| 🚀 **RTK Token Saver** | Compress tool outputs before sending to LLM — save 20-40% input tokens |
| 🪨 **Caveman Mode** | Terse LLM replies — save up to 65% output tokens |
| 🎯 **Smart Fallback** | Auto-route: Subscription → Cheap → Free |
| 🔄 **Format Translation** | OpenAI ↔ Claude ↔ Gemini ↔ Vertex ↔ Cursor ↔ Kiro |
| 👥 **Multi-Account** | Round-robin between accounts per provider |
| 🔍 **Fetch Models** | Discover models from provider API with one click |
| 📊 **Usage Analytics** | Track tokens, cost, savings over time |
| 💰 **Savings Tracker** | See estimated money saved by using Birouter |
| ⏱️ **Rate Limiting** | Configurable RPM per API key (default off) |
| 🎨 **Custom Combos** | Create model fallback sequences |
| 🔐 **API Key Auth** | Optional key requirement for remote access |
| 🌐 **Tunnel Support** | Cloudflare / Tailscale tunnel for remote access |
| 🎵 **Media Providers** | TTS, STT, Image, Embedding — all through one endpoint |
| 💾 **Cloud Sync** | Sync config across devices |

---

## 📖 Setup

### Environment Variables

Copy `.env.example` to `.env` and adjust:

```env
PORT=2004
DATA_DIR=D:\DataApp\birouter
JWT_SECRET=change-me-to-a-long-random-secret
INITIAL_PASSWORD=change-me
API_KEY_SECRET=birouter-api-key-secret
```

### Default URLs

- Dashboard: `http://localhost:2004/dashboard`
- OpenAI-compatible API: `http://localhost:2004/v1`

### API Key Format

Birouter uses `bi-` prefix for API keys:
```
bi-{machineId}-{keyId}-{crc8}
```

---

## 🌐 Supported Providers

### OAuth Providers
Claude Code, Codex, GitHub Copilot, Cursor, xAI (Grok), Kilo Code, Cline

### Free Providers
Kiro AI, OpenCode Free, Vertex AI ($300 credits)

### API Key Providers (40+)
OpenAI, Anthropic, Gemini, DeepSeek, Groq, Mistral, xAI, NVIDIA, OpenRouter, Together, Fireworks, Cerebras, Cohere, Nebius, SiliconFlow, GLM, Kimi, MiniMax, Alibaba, BytePlus, Cloudflare AI, and more...

### Custom Providers
Add any OpenAI-compatible or Anthropic-compatible endpoint.

---

## 💝 Support

If Birouter helps you save money and time, consider supporting development:

<div align="center">

[![Saweria](https://img.shields.io/badge/Saweria-Support%20Development-orange?style=for-the-badge)](https://saweria.co/iqkat)

</div>

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

Based on [9Router](https://github.com/decolua/9router) by decolua.

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://github.com/IQ-Kat">Ikbal (IQ-Kat)</a></sub>
</div>
