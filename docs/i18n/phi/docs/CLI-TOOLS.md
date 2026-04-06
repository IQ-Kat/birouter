# CLI Tools Setup Guide — OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Ipinapaliwanag ng gabay na ito kung paano i-install at i-configure ang lahat ng suportadong AI coding CLI tool
upang gamitin ang**OmniRoute**bilang pinag-isang backend, na nagbibigay sa iyo ng sentralisadong pamamahala ng key,
pagsubaybay sa gastos, pagpapalit ng modelo, at pag-log ng kahilingan sa bawat tool.---

## How It Works

```
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Kiro / Cursor / Copilot
           │
           ▼  (all point to OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute routes to the right provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**Mga Pakinabang:**

- Isang API key para pamahalaan ang lahat ng tool
- Pagsubaybay sa gastos sa lahat ng CLI sa dashboard
- Paglipat ng modelo nang hindi muling kino-configure ang bawat tool
- Gumagana nang lokal at sa mga malalayong server (VPS)---

## Supported Tools (Dashboard Source of Truth)

Ang mga dashboard card sa `/dashboard/cli-tools` ay nabuo mula sa `src/shared/constants/cliTools.ts`.
Kasalukuyang listahan (v3.0.0-rc.16):

| Tool               | ID            | Utos       | Mode ng Pag-setup | Paraan ng Pag-install |
| ------------------ | ------------- | ---------- | ----------------- | --------------------- | -------------------------------------------- |
| **Claude Code**    | `claude`      | `claude`   | env               | npm                   |
| **OpenAI Codex**   | `codex`       | `codex`    | custom            | npm                   |
| **Pabrika Droid**  | `droid`       | `droid`    | custom            | bundle/CLI            |
| **OpenClaw**       | `openclaw`    | `openclaw` | custom            | bundle/CLI            |
| **Cursor**         | `cursor`      | app        | gabay             | desktop app           |
| **Cline**          | `cline`       | `cline`    | custom            | npm                   |
| **Kilo Code**      | `kilo`        | `kilocode` | custom            | npm                   |
| **Magpatuloy**     | `magpatuloy`  | extension  | gabay             | VS Code               |
| **Antigravity**    | `antigravity` | panloob    | mitm              | OmniRoute             |
| **GitHub Copilot** | `kopilot`     | extension  | custom            | VS Code               |
| **OpenCode**       | `opencode`    | `opencode` | gabay             | npm                   |
| **Kiro AI**        | `kiro`        | app/cli    | mitm              | desktop/CLI           | ### CLI fingerprint sync (Agents + Settings) |

Gumagamit ang `/dashboard/agents` at `Settings > CLI Fingerprint` ng `src/shared/constants/cliCompatProviders.ts`.
Pinapanatili nitong nakahanay ang mga provider ID sa mga CLI card at legacy ID.

| CLI ID                                                                                               | Fingerprint Provider ID |
| ---------------------------------------------------------------------------------------------------- | ----------------------- |
| `kilo`                                                                                               | `kilocode`              |
| `kopilot`                                                                                            | `github`                |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | parehong ID             |

Tinatanggap pa rin ang mga legacy ID para sa compatibility: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Buksan ang dashboard ng OmniRoute →**API Manager**(`/dashboard/api-manager`)
2. I-click ang**Gumawa ng API Key**
3. Bigyan ito ng pangalan (hal. `cli-tools`) at piliin ang lahat ng pahintulot
4. Kopyahin ang susi — kakailanganin mo ito para sa bawat CLI sa ibaba

> Ang iyong susi ay mukhang: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Ang lahat ng mga tool na nakabatay sa npm ay nangangailangan ng Node.js 18+:```bash

# Claude Code (Anthropic)

npm install -g @anthropic-ai/claude-code

# OpenAI Codex

npm install -g @openai/codex

# OpenCode

npm install -g opencode-ai

# Cline

npm install -g cline

# KiloCode

npm install -g kilocode

# Kiro CLI (Amazon — requires curl + unzip)

apt-get install -y unzip # on Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH" # add to ~/.bashrc

````

**I-verify:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Idagdag sa `~/.bashrc` (o `~/.zshrc`), pagkatapos ay patakbuhin ang `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Para sa isang**remote server**palitan ang `localhost:20128` ng server IP o domain,
> hal. `http://192.168.0.15:20128`.---

## Step 4 — Configure Each Tool

### Claude Code

```bash
# Via CLI:
claude config set --global api-base-url http://localhost:20128/v1

# Or create ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "apiBaseUrl": "http://localhost:20128/v1",
  "apiKey": "sk-your-omniroute-key"
}
EOF
````

**Pagsubok:**`claude "kumusta"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Pagsubok:**`codex "ano ang 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Pagsubok:**`opencode`---

### Cline (CLI or VS Code)

**CLI mode:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS Code mode:**
Mga setting ng extension ng cline → Provider ng API: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

O gamitin ang OmniRoute dashboard →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**CLI mode:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Mga setting ng VS Code:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

O gamitin ang OmniRoute dashboard →**CLI Tools → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

I-edit ang `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

I-restart ang VS Code pagkatapos mag-edit.---

### Kiro CLI (Amazon)

```bash
# Login to your AWS/Kiro account:
kiro-cli login

# The CLI uses its own auth — OmniRoute is not needed as backend for Kiro CLI itself.
# Use kiro-cli alongside OmniRoute for other tools.
kiro-cli status
```

---

### Cursor (Desktop App)

> **Tandaan:**Mga kahilingan sa ruta ng cursor sa pamamagitan ng cloud nito. Para sa pagsasama ng OmniRoute,
> paganahin ang**Cloud Endpoint**sa Mga Setting ng OmniRoute at gamitin ang URL ng iyong pampublikong domain.

Sa pamamagitan ng GUI:**Mga Setting → Mga Modelo → OpenAI API Key**

- Base URL: `https://your-domain.com/v1`
- API Key: ang iyong OmniRoute key---

## Dashboard Auto-Configuration

Ang dashboard ng OmniRoute ay nag-o-automate ng configuration para sa karamihan ng mga tool:

1. Pumunta sa `http://localhost:20128/dashboard/cli-tools`
2. Palawakin ang anumang tool card
3. Piliin ang iyong API key mula sa dropdown
4. I-click ang**Apply Config**(kung nakitang naka-install ang tool)
5. O kopyahin nang manu-mano ang nabuong config snippet---

## Built-in Agents: Droid & OpenClaw

Ang**Droid**at**OpenClaw**ay mga ahente ng AI na direktang binuo sa OmniRoute — walang kinakailangang pag-install.
Tumatakbo sila bilang mga panloob na ruta at awtomatikong ginagamit ang pagruruta ng modelo ng OmniRoute.

- Access: `http://localhost:20128/dashboard/agents`
- I-configure: parehong combos at provider tulad ng lahat ng iba pang mga tool
- Walang kinakailangang pag-install ng API key o CLI---

## Available API Endpoints

| Endpoint                   | Paglalarawan                        | Gamitin Para sa                      |
| -------------------------- | ----------------------------------- | ------------------------------------ | --- |
| `/v1/chat/completions`     | Karaniwang chat (lahat ng provider) | Lahat ng modernong kasangkapan       |
| `/v1/mga tugon`            | Responses API (OpenAI format)       | Codex, mga ahenteng daloy ng trabaho |
| `/v1/completions`          | Mga legacy na pagkumpleto ng text   | Mga lumang tool gamit ang `prompt:`  |
| `/v1/embeddings`           | Mga pag-embed ng teksto             | RAG, maghanap                        |
| `/v1/images/generations`   | Pagbuo ng larawan                   | DALL-E, Flux, atbp.                  |
| `/v1/audio/speech`         | Text-to-speech                      | ElevenLabs, OpenAI TTS               |
| `/v1/audio/transcriptions` | Speech-to-text                      | Deepgram, AssemblyAI                 | --- |

## Pag-troubleshoot

| Error                                      | Dahilan                       | Ayusin                                                          |
| ------------------------------------------ | ----------------------------- | --------------------------------------------------------------- | --- |
| `Tumanggi sa koneksyon`                    | Hindi tumatakbo ang OmniRoute | `pm2 start omniroute`                                           |
| `401 Hindi Pinahintulutan`                 | Maling API key                | Mag-check in sa `/dashboard/api-manager`                        |
| `Walang combo na na-configure`             | Walang aktibong routing combo | I-set up sa `/dashboard/combos`                                 |
| `di-wastong modelo`                        | Wala sa catalog ang modelo    | Gamitin ang `auto` o lagyan ng check ang `/dashboard/providers` |
| CLI ay nagpapakita ng "hindi naka-install" | Binary wala sa PATH           | Lagyan ng check ang `aling <command>`                           |
| `kiro-cli: hindi nahanap`                  | Wala sa PATH                  | `export PATH="$HOME/.local/bin:$PATH"`                          | --- |

## Quick Setup Script (One Command)

```bash
# Install all CLIs and configure for OmniRoute (replace with your key and server URL)
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_KEY="sk-your-omniroute-key"

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai cline kilocode

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# Write configs
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json   <<< "{\"apiBaseUrl\":\"$OMNIROUTE_URL\",\"apiKey\":\"$OMNIROUTE_KEY\"}"
cat > ~/.codex/config.yaml      <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
cat >> ~/.bashrc << EOF
export OPENAI_BASE_URL="$OMNIROUTE_URL"
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export ANTHROPIC_BASE_URL="$OMNIROUTE_URL"
export ANTHROPIC_API_KEY="$OMNIROUTE_KEY"
EOF

source ~/.bashrc
echo "✅ All CLIs installed and configured for OmniRoute"
```
