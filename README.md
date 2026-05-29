<div align="center">

# Birouter — AI Router & Token Saver

**One endpoint for all your AI providers. Smart routing, auto-fallback, and 20-40% token savings.**

Connect your AI tools (Claude Code, Codex, Cursor, Cline, OpenClaw...) to 40+ providers & 100+ models through a single local gateway.

[🇮🇩 Baca dalam Bahasa Indonesia](#-bahasa-indonesia)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🤔 Why Birouter?

- ✅ **RTK Token Saver** — Auto-compress tool outputs, save 20-40% tokens per request
- ✅ **Auto fallback** — Subscription → Cheap → Free, zero downtime
- ✅ **Multi-account** — Round-robin between accounts per provider
- ✅ **Format translation** — OpenAI ↔ Claude ↔ Gemini ↔ Vertex ↔ any format
- ✅ **40+ providers** — OpenAI, Anthropic, Gemini, DeepSeek, Groq, Mistral, xAI, and more
- ✅ **Savings tracker** — See how much money you've saved

---

## ⚡ Quick Start

**Install via NPM:**

```bash
npm install -g birouter
birouter
```

**Run from source:**

```bash
git clone https://github.com/IQ-Kat/birouter.git
cd birouter/router-app
cp .env.example .env
npm install
npm run dev
```

🎉 Dashboard opens at `http://localhost:2004`

---

## 🇮🇩 Bahasa Indonesia

**Satu endpoint untuk semua penyedia AI Anda. Routing cerdas, fallback otomatis, dan penghematan token 20-40%.**

Hubungkan alat AI Anda (Claude Code, Codex, Cursor, Cline...) ke 40+ penyedia & 100+ model melalui satu gateway lokal.

### Mengapa Birouter?

- ✅ **RTK Token Saver** — Kompres output tool secara otomatis, hemat 20-40% token per permintaan.
- ✅ **Auto fallback** — Langganan → Murah → Gratis, tanpa downtime.
- ✅ **Multi-akun** — Round-robin antar akun per penyedia.
- ✅ **Translasi Format** — OpenAI ↔ Claude ↔ Gemini ↔ Vertex ↔ format apa pun.
- ✅ **40+ Penyedia** — OpenAI, Anthropic, Gemini, DeepSeek, Groq, Mistral, xAI, dan banyak lagi.

### Mulai Cepat

**Instal via NPM:**

```bash
npm install -g birouter
birouter
```

**Jalankan dari source:**

```bash
git clone https://github.com/IQ-Kat/birouter.git
cd birouter/router-app
cp .env.example .env
npm install
npm run dev
```

🎉 Dashboard terbuka di `http://localhost:2004`

---

## 💡 Features

| Feature | Description |
|---------|-------------|
| 🚀 **RTK Token Saver** | Compress tool outputs before sending to LLM — save 20-40% input tokens |
| 🪨 **Caveman Mode** | Terse LLM replies — save up to 65% output tokens |
| 🎯 **Smart Fallback** | Auto-route: Subscription → Cheap → Free |
| 🔄 **Format Translation** | OpenAI ↔ Claude ↔ Gemini ↔ Vertex ↔ Cursor ↔ Kiro |
| 📊 **Usage Analytics** | Track tokens, cost, savings over time |
| 💰 **Savings Tracker** | See estimated money saved by using Birouter |

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
