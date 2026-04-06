# CLI Tools Setup Guide — OmniRoute (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Denne veiledningen forklarer hvordan du installerer og konfigurerer alle støttede AI-kodings-CLI-verktøy
å bruke**OmniRoute**som den enhetlige backend, noe som gir deg sentralisert nøkkeladministrasjon,
kostnadssporing, modellbytte og forespørselslogging på tvers av hvert verktøy.---

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

**Fordeler:**

- Én API-nøkkel for å administrere alle verktøy
- Kostnadssporing på tvers av alle CLI-er i dashbordet
- Modellbytte uten å rekonfigurere hvert verktøy
- Fungerer lokalt og på eksterne servere (VPS)---

## Supported Tools (Dashboard Source of Truth)

Dashboard-kortene i `/dashboard/cli-tools` er generert fra `src/shared/constants/cliTools.ts`.
Gjeldende liste (v3.0.0-rc.16):

| Verktøy             | ID                | Kommando   | Oppsettmodus | Installasjonsmetode |
| ------------------- | ----------------- | ---------- | ------------ | ------------------- | -------------------------------------------- |
| **Claude-kode**     | `claude`          | `claude`   | env          | npm                 |
| **OpenAI Codex**    | `kodeks`          | `kodeks`   | tilpasset    | npm                 |
| **Factory Droid**   | `droid`           | `droid`    | tilpasset    | buntet/CLI          |
| **OpenClaw**        | `openclaw`        | `openclaw` | tilpasset    | buntet/CLI          |
| **Markør**          | `markør`          | app        | guide        | desktop app         |
| **Cline**           | `cline`           | `cline`    | tilpasset    | npm                 |
| **Kilokode**        | `kilo`            | `kilokode` | tilpasset    | npm                 |
| **Fortsett**        | `fortsett`        | utvidelse  | guide        | VS-kode             |
| **Antigravitasjon** | `antigravitasjon` | intern     | mitm         | OmniRoute           |
| **GitHub Copilot**  | `copilot`         | utvidelse  | tilpasset    | VS-kode             |
| **OpenCode**        | `opencode`        | `opencode` | guide        | npm                 |
| **Kiro AI**         | `kiro`            | app/cli    | mitm         | desktop/CLI         | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` og `Settings > CLI Fingerprint` bruker `src/shared/constants/cliCompatProviders.ts`.
Dette holder leverandør-ID-er på linje med CLI-kort og eldre ID-er.

| CLI ID                                                                                               | Fingeravtrykkleverandør-ID |
| ---------------------------------------------------------------------------------------------------- | -------------------------- |
| `kilo`                                                                                               | `kilokode`                 |
| `copilot`                                                                                            | `github`                   |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | samme ID                   |

Eldre ID-er er fortsatt akseptert for kompatibilitet: "copilot", "kimi-coding", "qwen".---

## Step 1 — Get an OmniRoute API Key

1. Åpne OmniRoute-dashbordet →**API Manager**(`/dashboard/api-manager`)
2. Klikk på**Create API Key**
3. Gi den et navn (f.eks. "cli-tools") og velg alle tillatelser
4. Kopier nøkkelen – du trenger den for hver CLI nedenfor

> Nøkkelen din ser slik ut: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxxx`---

## Step 2 — Install CLI Tools

Alle npm-baserte verktøy krever Node.js 18+:```bash

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

**Verifisere:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Legg til `~/.bashrc` (eller `~/.zshrc`), og kjør deretter `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> For en**ekstern server**erstatte `localhost:20128` med serverens IP eller domene,
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

**Test:**`claude "si hei"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`kodeks "hva er 2+2?"`---

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

**CLI-modus:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS-kodemodus:**
Cline-utvidelsesinnstillinger → API-leverandør: `OpenAI-kompatibel` → Base-URL: `http://localhost:20128/v1`

Eller bruk OmniRoute-dashbordet →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**CLI-modus:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS-kodeinnstillinger:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Eller bruk OmniRoute-dashbordet →**CLI Tools → KiloCode → Apply Config**.---

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

Start VS-koden på nytt etter redigering.---

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

> **Merk:**Markøren ruter forespørsler gjennom skyen. For OmniRoute-integrasjon,
> aktiver**Cloud Endpoint**i OmniRoute-innstillingene og bruk nettadressen for det offentlige domene.

Via GUI:**Innstillinger → Modeller → OpenAI API Key**

- Base URL: `https://ditt-domene.com/v1`
- API Key: din OmniRoute-nøkkel---

## Dashboard Auto-Configuration

OmniRoute-dashbordet automatiserer konfigurasjonen for de fleste verktøy:

1. Gå til `http://localhost:20128/dashboard/cli-tools`
2. Utvid et hvilket som helst verktøykort
3. Velg din API-nøkkel fra rullegardinmenyen
4. Klikk på**Apply Config**(hvis verktøyet oppdages som installert)
5. Eller kopier den genererte konfigurasjonskodebiten manuelt---

## Built-in Agents: Droid & OpenClaw

**Droid**og**OpenClaw**er AI-agenter innebygd direkte i OmniRoute – ingen installasjon nødvendig.
De kjører som interne ruter og bruker OmniRoutes modellruting automatisk.

- Tilgang: `http://localhost:20128/dashboard/agents`
- Konfigurer: samme kombinasjoner og leverandører som alle andre verktøy
- Ingen API-nøkkel eller CLI-installasjon kreves---

## Available API Endpoints

| Endepunkt                  | Beskrivelse                       | Bruk for                           |
| -------------------------- | --------------------------------- | ---------------------------------- | --- |
| `/v1/chat/fullføringer`    | Standard chat (alle leverandører) | Alle moderne verktøy               |
| `/v1/responses`            | Responses API (OpenAI-format)     | Codex, agentiske arbeidsflyter     |
| `/v1/fullføringer`         | Eldre tekstfullføringer           | Eldre verktøy som bruker "prompt:" |
| `/v1/embeddings`           | Tekstinnbygging                   | RAG, søk                           |
| `/v1/bilder/generasjoner`  | Bildegenerering                   | DALL-E, Flux, etc.                 |
| `/v1/lyd/tale`             | Tekst-til-tale                    | ElevenLabs, OpenAI TTS             |
| `/v1/audio/transcriptions` | Tale-til-tekst                    | Deepgram, AssemblyAI               | --- |

## Feilsøking

| Feil                            | Årsak                         | Fiks                                           |
| ------------------------------- | ----------------------------- | ---------------------------------------------- | --- |
| `Tilkobling nektet`             | OmniRoute kjører ikke         | `pm2 start omniroute`                          |
| `401 Uautorisert`               | Feil API-nøkkel               | Sjekk inn `/dashboard/api-manager`             |
| `Ingen kombinasjon konfigurert` | Ingen aktiv rutingkombinasjon | Sett opp i `/dashboard/combos`                 |
| "ugyldig modell"                | Modell ikke i katalogen       | Bruk `auto` eller sjekk `/dashboard/providers` |
| CLI viser "ikke installert"     | Binær ikke i PATH             | Sjekk `hvilken <kommando>`                     |
| `kiro-cli: ikke funnet`         | Ikke i PATH                   | `eksport PATH="$HOME/.local/bin:$PATH"`        | --- |

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
