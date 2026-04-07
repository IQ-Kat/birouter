# CLI Tools Setup Guide — OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Den här guiden förklarar hur du installerar och konfigurerar alla CLI-verktyg för AI-kodning som stöds
att använda**OmniRoute**som den enhetliga backend, vilket ger dig centraliserad nyckelhantering,
kostnadsspårning, modellbyte och förfrågningsloggning över alla verktyg.---

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

**Fördelar:**

- En API-nyckel för att hantera alla verktyg
- Kostnadsspårning över alla CLI:er i instrumentpanelen
- Modellbyte utan att omkonfigurera varje verktyg
- Fungerar lokalt och på fjärrservrar (VPS)---

## Supported Tools (Dashboard Source of Truth)

Dashboardkorten i `/dashboard/cli-tools` genereras från `src/shared/constants/cliTools.ts`.
Aktuell lista (v3.0.0-rc.16):

| Verktyg             | ID                | Kommando    | Inställningsläge | Installationsmetod |
| ------------------- | ----------------- | ----------- | ---------------- | ------------------ | -------------------------------------------- |
| **Claude Code**     | `claude`          | `claude`    | env              | npm                |
| **OpenAI Codex**    | `codex`           | `codex`     | anpassad         | npm                |
| **Factory Droid**   | `droid`           | `droid`     | anpassad         | buntad/CLI         |
| **OpenClaw**        | `openclaw`        | `openclaw`  | anpassad         | buntad/CLI         |
| **Markör**          | `markör`          | app         | guide            | skrivbordsapp      |
| **Cline**           | `cline`           | `cline`     | anpassad         | npm                |
| **Kilokod**         | `kilo`            | `kilokod`   | anpassad         | npm                |
| **Fortsätt**        | `fortsätt`        | förlängning | guide            | VS-kod             |
| **Antigravitation** | `antigravitation` | intern      | mitm             | OmniRoute          |
| **GitHub Copilot**  | `copilot`         | förlängning | anpassad         | VS-kod             |
| **OpenCode**        | `öppenkod`        | `öppenkod`  | guide            | npm                |
| **Kiro AI**         | `kiro`            | app/cli     | mitm             | skrivbord/CLI      | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` och `Settings > CLI Fingerprint` använder `src/shared/constants/cliCompatProviders.ts`.
Detta håller leverantörs-ID:n i linje med CLI-kort och äldre ID:n.

| CLI ID                                                                                               | Fingeravtrycksleverantörs-ID |
| ---------------------------------------------------------------------------------------------------- | ---------------------------- |
| `kilo`                                                                                               | `kilokod`                    |
| `copilot`                                                                                            | `github`                     |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | samma ID                     |

Äldre ID:n accepteras fortfarande för kompatibilitet: "copilot", "kimi-coding", "qwen".---

## Step 1 — Get an OmniRoute API Key

1. Öppna OmniRoute-instrumentpanelen →**API Manager**(`/dashboard/api-manager`)
2. Klicka på**Skapa API-nyckel**
3. Ge det ett namn (t.ex. `cli-tools`) och välj alla behörigheter
4. Kopiera nyckeln – du behöver den för varje CLI nedan

> Din nyckel ser ut så här: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxxx`---

## Step 2 — Install CLI Tools

Alla npm-baserade verktyg kräver Node.js 18+:```bash

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

**Kontrollera:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Lägg till i `~/.bashrc` (eller `~/.zshrc`), kör sedan `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> För en**fjärrserver**ersätt `localhost:20128` med serverns IP eller domän,
> t.ex. "http://192.168.0.15:20128".---

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

**Test:**`claude "säg hej"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`codex "vad är 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test:**"öppenkod".---

### Cline (CLI or VS Code)

**CLI-läge:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS-kodläge:**
Cline-tilläggsinställningar → API-leverantör: `OpenAI-kompatibel` → Bas-URL: `http://localhost:20128/v1`

Eller använd OmniRoute-instrumentpanelen →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**CLI-läge:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS-kodinställningar:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Eller använd OmniRoute-instrumentpanelen →**CLI Tools → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Redigera `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Starta om VS-koden efter redigering.---

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

> **Obs!**Markören dirigerar förfrågningar genom sitt moln. För OmniRoute-integration,
> aktivera**Cloud Endpoint**i OmniRoute-inställningarna och använd din offentliga domän-URL.

Via GUI:**Inställningar → Modeller → OpenAI API Key**

- Basadress: `https://din-domän.com/v1`
- API-nyckel: din OmniRoute-nyckel---

## Dashboard Auto-Configuration

OmniRoute-instrumentpanelen automatiserar konfigurationen för de flesta verktyg:

1. Gå till `http://localhost:20128/dashboard/cli-tools`
2. Expandera valfritt verktygskort
3. Välj din API-nyckel i rullgardinsmenyn
4. Klicka på**Apply Config**(om verktyget identifieras som installerat)
5. Eller kopiera det genererade konfigurationskodavsnittet manuellt---

## Built-in Agents: Droid & OpenClaw

**Droid**och**OpenClaw**är AI-agenter inbyggda direkt i OmniRoute – ingen installation behövs.
De körs som interna rutter och använder OmniRoutes modellrutt automatiskt.

- Åtkomst: `http://localhost:20128/dashboard/agents`
- Konfigurera: samma kombinationer och leverantörer som alla andra verktyg
- Ingen API-nyckel eller CLI-installation krävs---

## Available API Endpoints

| Slutpunkt                   | Beskrivning                       | Använd för                           |
| --------------------------- | --------------------------------- | ------------------------------------ | --- |
| `/v1/chatt/kompletteringar` | Standardchatt (alla leverantörer) | Alla moderna verktyg                 |
| `/v1/svar`                  | Responses API (OpenAI-format)     | Codex, agentiska arbetsflöden        |
| `/v1/kompletteringar`       | Äldre textkompletteringar         | Äldre verktyg som använder `prompt:` |
| `/v1/inbäddningar`          | Textinbäddningar                  | RAG, sök                             |
| `/v1/images/generations`    | Bildgenerering                    | DALL-E, Flux, etc.                   |
| `/v1/ljud/tal`              | Text-till-tal                     | ElevenLabs, OpenAI TTS               |
| `/v1/audio/transcriptions`  | Tal-till-text                     | Deepgram, AssemblyAI                 | --- |

## Felsökning

| Fel                              | Orsak                          | Fixa                                               |
| -------------------------------- | ------------------------------ | -------------------------------------------------- | --- |
| `Anslutning nekad`               | OmniRoute körs inte            | `pm2 start omniroute`                              |
| `401 Obehörig`                   | Fel API-nyckel                 | Checka in `/dashboard/api-manager`                 |
| `Ingen kombination konfigurerad` | Ingen aktiv routingkombination | Ställ in i `/dashboard/combos`                     |
| "ogiltig modell"                 | Modell inte i katalogen        | Använd `auto` eller markera `/dashboard/providers` |
| CLI visar "inte installerat"     | Binär inte i PATH              | Kontrollera `vilket <kommando>`                    |
| `kiro-cli: hittades inte`        | Inte i PATH                    | `export PATH="$HOME/.local/bin:$PATH"`             | --- |

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
