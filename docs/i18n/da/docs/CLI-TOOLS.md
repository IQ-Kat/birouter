# CLI Tools Setup Guide — OmniRoute (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Denne vejledning forklarer, hvordan du installerer og konfigurerer alle understøttede AI-kodnings-CLI-værktøjer
at bruge**OmniRoute**som den forenede backend, hvilket giver dig centraliseret nøglestyring,
omkostningssporing, modelskift og anmodningslogning på tværs af hvert værktøj.---

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

**Fordele:**

- Én API-nøgle til at administrere alle værktøjer
- Omkostningssporing på tværs af alle CLI'er i dashboardet
- Modelskift uden at rekonfigurere hvert værktøj
- Fungerer lokalt og på fjernservere (VPS)---

## Supported Tools (Dashboard Source of Truth)

Dashboard-kortene i `/dashboard/cli-tools` er genereret fra `src/shared/constants/cliTools.ts`.
Aktuel liste (v3.0.0-rc.16):

| Værktøj            | ID                | Kommando    | Opsætningstilstand | Installationsmetode |
| ------------------ | ----------------- | ----------- | ------------------ | ------------------- | -------------------------------------------- |
| **Claude-kode**    | `claude`          | `claude`    | env                | npm                 |
| **OpenAI Codex**   | `codex`           | `codex`     | brugerdefineret    | npm                 |
| **Fabrik Droid**   | `droid`           | `droid`     | brugerdefineret    | bundtet/CLI         |
| **OpenClaw**       | `openclaw`        | `openclaw`  | brugerdefineret    | bundtet/CLI         |
| **Markør**         | `markør`          | app         | guide              | desktop app         |
| **Cline**          | `cline`           | `cline`     | brugerdefineret    | npm                 |
| **Kilokode**       | `kilo`            | `kilokode`  | brugerdefineret    | npm                 |
| **Fortsæt**        | `fortsæt`         | forlængelse | guide              | VS-kode             |
| **Antigravity**    | `antityngdekraft` | intern      | mitm               | OmniRoute           |
| **GitHub Copilot** | `copilot`         | forlængelse | brugerdefineret    | VS-kode             |
| **OpenCode**       | `opencode`        | `opencode`  | guide              | npm                 |
| **Kiro AI**        | `kiro`            | app/cli     | mitm               | desktop/CLI         | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` og `Settings > CLI Fingerprint` bruger `src/shared/constants/cliCompatProviders.ts`.
Dette holder udbyder-id'er på linje med CLI-kort og ældre ID'er.

| CLI ID                                                                                               | Fingeraftryksudbyder-id |
| ---------------------------------------------------------------------------------------------------- | ----------------------- |
| `kilo`                                                                                               | `kilokode`              |
| `copilot`                                                                                            | `github`                |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | samme ID                |

Ældre id'er accepteres stadig for kompatibilitet: "copilot", "kimi-coding", "qwen".---

## Step 1 — Get an OmniRoute API Key

1. Åbn OmniRoute-dashboardet →**API Manager**(`/dashboard/api-manager`)
2. Klik på**Create API Key**
3. Giv det et navn (f.eks. `cli-tools`), og vælg alle tilladelser
4. Kopier nøglen - du skal bruge den til hver CLI nedenfor

> Din nøgle ser sådan ud: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxxx`---

## Step 2 — Install CLI Tools

Alle npm-baserede værktøjer kræver Node.js 18+:```bash

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

**Verificere:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Tilføj til `~/.bashrc` (eller `~/.zshrc`), kør derefter `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> For en**fjernserver**erstatter `localhost:20128` med serverens IP eller domæne,
> f.eks. "http://192.168.0.15:20128".---

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

**Test:**`claude "sig hej"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`codex "hvad er 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test:**'opencode'---

### Cline (CLI or VS Code)

**CLI-tilstand:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS-kodetilstand:**
Cline-udvidelsesindstillinger → API-udbyder: `OpenAI-kompatibel` → Basis-URL: `http://localhost:20128/v1`

Eller brug OmniRoute-dashboardet →**CLI-værktøjer → Cline → Anvend konfiguration**.---

### KiloCode (CLI or VS Code)

**CLI-tilstand:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS-kodeindstillinger:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Eller brug OmniRoute-dashboardet →**CLI-værktøjer → KiloCode → Anvend konfiguration**.---

### Continue (VS Code Extension)

Rediger `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Genstart VS-kode efter redigering.---

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

> **Bemærk:**Markøren dirigerer anmodninger gennem sin sky. Til OmniRoute-integration,
> aktiver**Cloud Endpoint**i OmniRoute-indstillinger og brug din offentlige domæne-URL.

Via GUI:**Indstillinger → Modeller → OpenAI API Key**

- Basis-URL: `https://dit-domæne.com/v1`
- API-nøgle: din OmniRoute-nøgle---

## Dashboard Auto-Configuration

OmniRoute-dashboardet automatiserer konfigurationen for de fleste værktøjer:

1. Gå til `http://localhost:20128/dashboard/cli-tools`
2. Udvid ethvert værktøjskort
3. Vælg din API-nøgle fra rullemenuen
4. Klik på**Anvend konfiguration**(hvis værktøjet registreres som installeret)
5. Eller kopier det genererede konfigurationskodestykke manuelt---

## Built-in Agents: Droid & OpenClaw

**Droid**og**OpenClaw**er AI-agenter indbygget direkte i OmniRoute - ingen installation nødvendig.
De kører som interne ruter og bruger OmniRoutes modelrouting automatisk.

- Adgang: `http://localhost:20128/dashboard/agents`
- Konfigurer: samme kombinationer og udbydere som alle andre værktøjer
- Ingen API-nøgle eller CLI-installation påkrævet---

## Available API Endpoints

| Slutpunkt                   | Beskrivelse                   | Brug til                              |
| --------------------------- | ----------------------------- | ------------------------------------- | --- |
| `/v1/chat/afslutninger`     | Standard chat (alle udbydere) | Alle moderne værktøjer                |
| `/v1/svar`                  | Responses API (OpenAI-format) | Codex, agentiske arbejdsgange         |
| `/v1/fuldførelser`          | Ældre tekstfuldførelser       | Ældre værktøjer, der bruger `prompt:` |
| `/v1/indlejringer`          | Tekstindlejringer             | RAG, søg                              |
| `/v1/billeder/generationer` | Billedgenerering              | DALL-E, Flux osv.                     |
| `/v1/lyd/tale`              | Tekst-til-tale                | ElevenLabs, OpenAI TTS                |
| `/v1/audio/transcriptions`  | Tale-til-tekst                | Deepgram, AssemblyAI                  | --- |

## Fejlfinding

| Fejl                             | Årsag                           | Rette                                          |
| -------------------------------- | ------------------------------- | ---------------------------------------------- | --- |
| `Forbindelse nægtet`             | OmniRoute kører ikke            | `pm2 start omniroute`                          |
| `401 Uautoriseret`               | Forkert API-nøgle               | Tjek ind `/dashboard/api-manager`              |
| `Ingen kombination konfigureret` | Ingen aktiv routing-kombination | Konfigurer i `/dashboard/combos`               |
| "ugyldig model"                  | Model ikke i kataloget          | Brug `auto` eller marker `/dashboard/udbydere` |
| CLI viser "ikke installeret"     | Binær ikke i PATH               | Tjek `hvilken <kommando>`                      |
| `kiro-cli: ikke fundet`          | Ikke i PATH                     | `eksport PATH="$HOME/.local/bin:$PATH"`        | --- |

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
