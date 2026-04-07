# OmniRoute — Dashboard Features Gallery (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Visual na gabay sa bawat seksyon ng OmniRoute dashboard.---

## 🔌 Providers

Pamahalaan ang mga koneksyon sa AI provider: OAuth provider (Claude Code, Codex, Gemini CLI), API key provider (Groq, DeepSeek, OpenRouter), at libreng provider (Qoder, Qwen, Kiro). Kasama sa mga Kiro account ang pagsubaybay sa balanse ng kredito — mga natitirang credit, kabuuang allowance, at petsa ng pag-renew na makikita sa Dashboard → Paggamit.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Gumawa ng mga combo sa pagruruta ng modelo na may 6 na diskarte: priority, weighted, round-robin, random, hindi gaanong ginagamit, at cost-optimized. Ang bawat combo ay nagkakadena ng maraming modelo na may awtomatikong fallback at may kasamang mabilis na mga template at mga pagsusuri sa kahandaan.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Komprehensibong analytics ng paggamit na may pagkonsumo ng token, mga pagtatantya sa gastos, mga heatmap ng aktibidad, lingguhang chart ng pamamahagi, at mga breakdown sa bawat provider.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Real-time na pagsubaybay: uptime, memorya, bersyon, latency percentiles (p50/p95/p99), mga istatistika ng cache, at mga estado ng circuit breaker ng provider.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Apat na mode para sa pag-debug ng mga pagsasalin ng API:**Playground**(format converter),**Chat Tester**(live na kahilingan),**Test Bench**(batch tests), at**Live Monitor**(real-time stream).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Subukan ang anumang modelo nang direkta mula sa dashboard. Pumili ng provider, modelo, at endpoint, magsulat ng mga prompt gamit ang Monaco Editor, mag-stream ng mga tugon sa real-time, i-abort ang mid-stream, at tingnan ang mga sukatan ng timing.---

## 🎨 Themes _(v2.0.5+)_

Nako-customize na mga tema ng kulay para sa buong dashboard. Pumili mula sa 7 preset na kulay (Coral, Blue, Red, Green, Violet, Orange, Cyan) o gumawa ng custom na tema sa pamamagitan ng pagpili ng anumang hex na kulay. Sinusuportahan ang liwanag, madilim, at system mode.---

## ⚙️ Settings

Panel ng kumpletong mga setting na may mga tab:

-**General**— System storage, backup management (export/import database) -**Hitsura**— Tagapili ng tema (madilim/liwanag/system), mga preset ng tema ng kulay at mga custom na kulay, visibility ng log ng kalusugan, mga kontrol sa visibility ng item sa sidebar -**Seguridad**— Proteksyon ng endpoint ng API, custom na pagharang ng provider, pag-filter ng IP, impormasyon ng session -**Pagruruta**— Mga alyas ng modelo, pagkasira ng gawain sa background -**Resilience**— Pagpapatuloy ng limitasyon sa rate, pag-tune ng circuit breaker, awtomatikong i-disable ang mga naka-ban na account, pagsubaybay sa expiration ng provider -**Advanced**— Mga override sa configuration, configuration audit trail, fallback degradation mode![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Isang-click na configuration para sa AI coding tool: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor, at Factory Droid. Nagtatampok ng awtomatikong paglalapat/pag-reset ng config, mga profile ng koneksyon, at pagmamapa ng modelo.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard para sa pagtuklas at pamamahala ng mga ahente ng CLI. Nagpapakita ng grid ng 14 na built-in na ahente (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) na may:

-**Katayuan ng pag-install**— Naka-install / Hindi Natagpuan na may pagtukoy ng bersyon -**Protocol badge**— stdio, HTTP, atbp. -**Mga custom na ahente**— Magrehistro ng anumang CLI tool sa pamamagitan ng form (pangalan, binary, version command, spawn args) -**Pagtutugma ng CLI Fingerprint**— Toggle ng bawat provider upang tumugma sa mga native na lagda ng kahilingan sa CLI, na binabawasan ang panganib sa pagbabawal habang pinapanatili ang proxy IP---

## 🖼️ Media _(v2.0.3+)_

Bumuo ng mga larawan, video, at musika mula sa dashboard. Sinusuportahan ang OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open, at MusicGen.---

## 📝 Request Logs

Real-time na pag-log ng kahilingan gamit ang pag-filter ayon sa provider, modelo, account, at API key. Nagpapakita ng mga status code, paggamit ng token, latency, at mga detalye ng pagtugon.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Ang iyong pinag-isang API endpoint na may pagkasira ng kakayahan: Mga Pagkumpleto ng Chat, Mga Tugon na API, Mga Pag-embed, Pagbuo ng Larawan, Muling Ranggo, Transkripsyon ng Audio, Text-to-Speech, Mga Moderation, at mga nakarehistrong API key. Cloudflare Quick Tunnel integration at suporta sa cloud proxy para sa malayuang pag-access.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Gumawa, saklaw, at bawiin ang mga API key. Ang bawat key ay maaaring paghigpitan sa mga partikular na modelo/provider na may ganap na access o read-only na mga pahintulot. Pamamahala ng visual key na may pagsubaybay sa paggamit.---

## 📋 Audit Log

Pagsubaybay sa administratibong pagkilos na may pag-filter ayon sa uri ng pagkilos, aktor, target, IP address, at timestamp. Buong kasaysayan ng kaganapan sa seguridad.---

## 🖥️ Desktop Application

Native Electron desktop app para sa Windows, macOS, at Linux. Patakbuhin ang OmniRoute bilang isang standalone na application na may system tray integration, offline na suporta, auto-update, at one-click na pag-install.

Mga pangunahing tampok:

- Pagboto sa kahandaan ng server (walang blangkong screen sa malamig na simula)
- System tray na may port management
- Patakaran sa Seguridad ng Nilalaman
- Single-instance lock
- Auto-update sa pag-restart
- Platform-conditional UI (macOS traffic lights, Windows/Linux default titlebar)
- Hardened Electron build packaging — ang mga naka-symlink na `node_modules` sa standalone na bundle ay nakita at tinanggihan bago ang packaging, na pumipigil sa runtime dependency sa build machine (v2.5.5+)

📖 Tingnan ang [`electron/README.md`](../electron/README.md) para sa buong dokumentasyon.
