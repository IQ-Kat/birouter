<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
<div align="center">
=======
# 9Router - FREE AI Router & Token Saver
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file

# 🚀 Birouter CLI — AI Router & Token Saver

**One endpoint for all your AI providers. Smart routing, auto-fallback, and 20-40% token savings.**

<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
*Satu endpoint untuk semua penyedia AI. Routing cerdas, fallback otomatis, dan hemat token 20-40%.*

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![NPM Version](https://img.shields.io/npm/v/birouter.svg)](https://www.npmjs.com/package/birouter)

[🚀 Quick Start](#-quick-start) • [💡 Features](#-features) • [📖 Documentation](https://github.com/IQ-Kat/birouter) • [🤝 Contributing](https://github.com/IQ-Kat/birouter/blob/master/router-app/docs/CONTRIBUTING.md)
=======
[![npm](https://img.shields.io/npm/v/9router.svg)](https://www.npmjs.com/package/9router)
[![Downloads](https://img.shields.io/npm/dm/9router.svg)](https://www.npmjs.com/package/9router)
[![Docker Pulls](https://img.shields.io/docker/pulls/decolua/9router.svg?logo=docker&label=Docker%20pulls)](https://hub.docker.com/r/decolua/9router)
[![GHCR](https://img.shields.io/badge/GHCR-decolua%2F9router-blue?logo=github)](https://github.com/decolua/9router/pkgs/container/9router)
[![License](https://img.shields.io/npm/l/9router.svg)](https://github.com/decolua/9router/blob/main/LICENSE)

<a href="https://trendshift.io/repositories/22628" target="_blank"><img src="https://trendshift.io/api/badge/repositories/22628" alt="decolua%2F9router | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

[🌐 Website](https://9router.com) • [📖 Full Docs](https://github.com/decolua/9router)

---

## 🤔 Why 9Router?
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file

</div>

---

<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
## 🤔 Why Birouter? / Mengapa Birouter?
=======
**9Router solves this:**
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file

Birouter is a smart local gateway that sits between your AI tools (Claude Code, Cursor, Cline, Aider...) and 40+ AI providers. It helps you **maximize subscriptions** and **minimize costs**.

- 💰 **RTK Token Saver** — Auto-compress tool outputs (git diff, ls, grep), saving **20-40%** tokens.
- 🔄 **Auto Fallback** — Smooth transition: **Subscription → Cheap → Free**. Never hit a rate limit again.
- 🌍 **Universal Format** — Seamlessly translate between OpenAI, Claude, Gemini, and Vertex.
- 📊 **Savings Tracker** — Real-time analytics on how much money and tokens you've saved.

---

## ⚡ Quick Start / Mulai Cepat

<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
### Installation / Instalasi
=======
**Option 1 — npm (recommended for desktop):**
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file

**Install globally via npm:**
```bash
<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
npm install -g birouter
```

**Run Birouter:**
```bash
birouter
=======
npm install -g 9router
9router

# Or run directly with npx
npx 9router
```

**Option 2 — Docker (server/VPS):**

```bash
docker run -d --name 9router -p 20128:20128 \
  -v "$HOME/.9router:/app/data" -e DATA_DIR=/app/data \
  decolua/9router:latest
```

Published images: [Docker Hub](https://hub.docker.com/r/decolua/9router) • [GHCR](https://github.com/decolua/9router/pkgs/container/9router) (multi-platform amd64/arm64).

🎉 Dashboard opens at `http://localhost:20128`

**2. Connect a FREE provider (no signup needed):**

Dashboard → Providers → Connect **Kiro AI** (free Claude unlimited) or **OpenCode Free** (no auth) → Done!

**3. Use in your CLI tool:**

```
Claude Code/Codex/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key:  [copy from dashboard]
  Model:    kr/claude-sonnet-4.5
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file
```

🎉 **Dashboard opens at `http://localhost:2004`**
- Default Password: `123456` (change in dashboard)
- API key is generated automatically.

---

## 💡 Key Features / Fitur Unggulan

<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
| Feature / Fitur | Description / Deskripsi |
|:--- |:--- |
| 🚀 **RTK Token Saver** | Compresses tool outputs to save massive input tokens. / Kompres output tool untuk hemat token. |
| 🪨 **Caveman Mode** | Forces terse LLM replies to save output tokens. / Paksa jawaban singkat untuk hemat token output. |
| 🎯 **Smart Fallback** | Automatic routing across multiple tiers. / Routing otomatis antar tingkatan penyedia. |
| 👥 **Multi-Account** | Round-robin between multiple accounts per provider. / Bergilir antar banyak akun per penyedia. |
| 🔄 **Format Translation** | OpenAI ↔ Claude ↔ Gemini ↔ Vertex ↔ Kiro. |
| 🔍 **Fetch Models** | Discover available models with one click. / Temukan model yang tersedia dengan satu klik. |
=======
```bash
9router                    # Start with default settings
9router --port 8080        # Custom port
9router --no-browser       # Don't open browser
9router --skip-update      # Skip auto-update check
9router --help             # Show all options
```

**Dashboard**: `http://localhost:20128/dashboard`
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file

---

## 🛠️ Supported CLI Tools / Alat yang Didukung

Claude Code • Cursor • Cline • RooCode • Aider • OpenClaw • Codex • OpenCode • Continue • Droid • Copilot • Kilo Code • Gemini CLI • Qwen Code • iFlow ... and any OpenAI/Claude compatible tool!

---

## 🇮🇩 Dokumentasi Bahasa Indonesia

<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
Tersedia panduan lengkap dalam Bahasa Indonesia di repositori utama kami:
- [Panduan Mulai Cepat](https://github.com/IQ-Kat/birouter/blob/master/router-app/gitbook/content/id/getting-started/quick-start.md)
- [Halaman Utama Dokumentasi](https://github.com/IQ-Kat/birouter/blob/master/router-app/gitbook/content/id/index.md)
=======
- **macOS/Linux**: `~/.9router/db/data.sqlite`
- **Windows**: `%APPDATA%/9router/db/data.sqlite`
- **Docker**: `/app/data/db/data.sqlite` (mount `$HOME/.9router` to persist)
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file

---

## 💝 Support / Dukungan

<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
If Birouter helps you save money, consider supporting the development:
*Jika Birouter membantu Anda berhemat, pertimbangkan untuk mendukung pengembangan:*
=======
Full docs, advanced setup, video tutorials & development guide:

- **GitHub**: https://github.com/decolua/9router
- **Full README**: https://github.com/decolua/9router/blob/main/app/README.md
- **Website**: https://9router.com
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file

[Support on Saweria](https://saweria.co/iqkat)

<<<<<<< D:\Projek\Birouter\router-app\temp_ours_file
---
=======
## 🙏 Acknowledgments

- **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** - Original Go implementation

## 📄 License
>>>>>>> D:\Projek\Birouter\router-app\temp_theirs_file

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/IQ-Kat">Ikbal (IQ-Kat)</a>. Based on 9Router.</sub>
</div>
