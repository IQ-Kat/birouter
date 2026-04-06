# CLI Tools Setup Guide — OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

In deze handleiding wordt uitgelegd hoe u alle ondersteunde CLI-tools voor AI-codering installeert en configureert
om**OmniRoute**te gebruiken als de uniforme backend, waardoor u gecentraliseerd sleutelbeheer krijgt,
kostenregistratie, modelwisseling en verzoekregistratie voor elke tool.---

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

**Voordelen:**

- Eén API-sleutel om alle tools te beheren
- Kostenregistratie voor alle CLI's in het dashboard
- Modelwisseling zonder elk gereedschap opnieuw te configureren
- Werkt lokaal en op externe servers (VPS)---

## Supported Tools (Dashboard Source of Truth)

De dashboardkaarten in `/dashboard/cli-tools` worden gegenereerd vanuit `src/shared/constants/cliTools.ts`.
Huidige lijst (v3.0.0-rc.16):

| Gereedschap           | Identiteitskaart    | Commando    | Instelmodus | Installatiemethode |
| --------------------- | ------------------- | ----------- | ----------- | ------------------ | -------------------------------------------- |
| **Claude-code**       | `claude`            | `claude`    | env         | npm                |
| **OpenAI-codex**      | `codex`             | `codex`     | op maat     | npm                |
| **Fabrieksdroid**     | `droid`             | `droid`     | op maat     | gebundeld/CLI      |
| **Open Klauw**        | `openklauw`         | `openklauw` | op maat     | gebundeld/CLI      |
| **Cursor**            | `cursor`            | app         | gids        | desktop-app        |
| **Klijn**             | `cline`             | `cline`     | op maat     | npm                |
| **Kilocode**          | `kilo`              | `kilocode`  | op maat     | npm                |
| **Doorgaan**          | `doorgaan`          | extensie    | gids        | VS-code            |
| **Antizwaartekracht** | `antizwaartekracht` | intern      | mit         | OmniRoute          |
| **GitHub Copiloot**   | `copiloot`          | extensie    | op maat     | VS-code            |
| **OpenCode**          | `opencode`          | `opencode`  | gids        | npm                |
| **KiroAI**            | `kiro`              | app/cli     | mit         | bureaublad/CLI     | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` en `Instellingen > CLI-vingerafdruk` gebruiken `src/shared/constants/cliCompatProviders.ts`.
Hierdoor blijven provider-ID's afgestemd op CLI-kaarten en oudere ID's.

| CLI-ID                                                                                               | Vingerafdrukprovider-ID |
| ---------------------------------------------------------------------------------------------------- | ----------------------- |
| `kilo`                                                                                               | `kilocode`              |
| `copiloot`                                                                                           | `github`                |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | dezelfde ID             |

Oudere ID's worden nog steeds geaccepteerd voor compatibiliteit: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Open het OmniRoute-dashboard →**API Manager**(`/dashboard/api-manager`)
2. Klik op**API-sleutel maken**
3. Geef het een naam (bijvoorbeeld `cli-tools`) en selecteer alle rechten
4. Kopieer de sleutel. U heeft deze nodig voor elke onderstaande CLI

> Uw sleutel ziet er als volgt uit: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Alle op NPM gebaseerde tools vereisen Node.js 18+:```bash

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

**Verifiëren:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Voeg toe aan `~/.bashrc` (of `~/.zshrc`) en voer vervolgens `source ~/.bashrc` uit:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Voor een**externe server**vervangt u `localhost:20128` door het server-IP of domein,
> bijv. `http://192.168.0.15:20128`.---

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

**Test:**`claude "zeg hallo"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`codex "wat is 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test:**`opencode`---

### Cline (CLI or VS Code)

**CLI-modus:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS-codemodus:**
Instellingen voor Cline-extensie → API-provider: `OpenAI Compatible` → Basis-URL: `http://localhost:20128/v1`

Of gebruik het OmniRoute-dashboard →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**CLI-modus:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS-code-instellingen:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Of gebruik het OmniRoute-dashboard →**CLI Tools → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Bewerk `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Start VS Code opnieuw na het bewerken.---

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

> **Opmerking:**Cursor routeert verzoeken via de cloud. Voor OmniRoute-integratie:
> schakel**Cloud Endpoint**in in OmniRoute-instellingen en gebruik uw openbare domein-URL.

Via GUI:**Instellingen → Modellen → OpenAI API-sleutel**

- Basis-URL: `https://uw-domein.com/v1`
- API-sleutel: uw OmniRoute-sleutel---

## Dashboard Auto-Configuration

Het OmniRoute-dashboard automatiseert de configuratie voor de meeste tools:

1. Ga naar `http://localhost:20128/dashboard/cli-tools`
2. Vouw een eventuele gereedschapskaart uit
3. Selecteer uw API-sleutel in de vervolgkeuzelijst
4. Klik op**Apply Config**(als het hulpprogramma als geïnstalleerd wordt gedetecteerd)
5. Of kopieer het gegenereerde configuratiefragment handmatig---

## Built-in Agents: Droid & OpenClaw

**Droid**en**OpenClaw**zijn AI-agents die rechtstreeks in OmniRoute zijn ingebouwd — geen installatie nodig.
Ze worden uitgevoerd als interne routes en gebruiken automatisch de modelroutering van OmniRoute.

- Toegang: `http://localhost:20128/dashboard/agents`
- Configureren: dezelfde combo's en providers als alle andere tools
- Geen API-sleutel of CLI-installatie vereist---

## Available API Endpoints

| Eindpunt                  | Beschrijving                   | Gebruik voor                |
| ------------------------- | ------------------------------ | --------------------------- | --------- |
| `/v1/chat/completions`    | Standaardchat (alle providers) | Alle moderne hulpmiddelen   |
| `/v1/reacties`            | Reacties-API (OpenAI-indeling) | Codex, agentische workflows |
| `/v1/voltooiingen`        | Verouderde tekstaanvullingen   | Oudere tools die `prompt:`  | gebruiken |
| `/v1/embeddings`          | Tekstinsluitingen              | RAG, zoek                   |
| `/v1/images/generations`  | Beeldgeneratie                 | DALL-E, Flux, enz.          |
| `/v1/audio/spraak`        | Tekst-naar-spraak              | ElfLabs, OpenAI TTS         |
| `/v1/audio/transcripties` | Spraak-naar-tekst              | Deepgram, AssemblyAI        | ---       |

## Probleemoplossing

| Fout                           | Oorzaak                           | Repareren                                     |
| ------------------------------ | --------------------------------- | --------------------------------------------- | --- |
| `Verbinding geweigerd`         | OmniRoute is niet actief          | `pm2 start omniroute`                         |
| `401 Ongeautoriseerd`          | Verkeerde API-sleutel             | Controleer in `/dashboard/api-manager`        |
| `Geen combo geconfigureerd`    | Geen actieve routeringscombinatie | Instellen in `/dashboard/combos`              |
| `ongeldig model`               | Model niet in catalogus           | Gebruik `auto` of vink `/dashboard/providers` | aan |
| CLI toont "niet geïnstalleerd" | Binair niet in PATH               | Controleer `welk <commando>`                  |
| `kiro-cli: niet gevonden`      | Niet in PATH                      | `export PATH="$HOME/.local/bin:$PATH"`        | --- |

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
