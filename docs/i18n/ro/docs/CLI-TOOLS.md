# CLI Tools Setup Guide — OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Acest ghid explică cum să instalați și să configurați toate instrumentele CLI de codare AI acceptate
pentru a utiliza**OmniRoute**ca backend unificat, oferindu-vă gestionarea centralizată a cheilor,
urmărirea costurilor, schimbarea modelului și înregistrarea cererilor în fiecare instrument.---

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

**Beneficii:**

- O cheie API pentru a gestiona toate instrumentele
- Urmărirea costurilor în toate CLI-urile din tabloul de bord
- Schimbarea modelului fără a reconfigura fiecare unealtă
- Funcționează local și pe servere la distanță (VPS)---

## Supported Tools (Dashboard Source of Truth)

Cardurile de bord din `/dashboard/cli-tools` sunt generate din `src/shared/constants/cliTools.ts`.
Lista curentă (v3.0.0-rc.16):

| Instrument         | ID               | Comanda       | Modul de configurare | Metoda de instalare |
| ------------------ | ---------------- | ------------- | -------------------- | ------------------- | -------------------------------------------- |
| **Codul Claude**   | `claude`         | `claude`      | env                  | npm                 |
| **OpenAI Codex**   | `codex`          | `codex`       | personalizat         | npm                 |
| **Factory Droid**  | `droid`          | `droid`       | personalizat         | pachet/CLI          |
| **OpenClaw**       | `openclaw`       | `openclaw`    | personalizat         | pachet/CLI          |
| **Cursor**         | `cursor`         | aplicație     | ghid                 | aplicație desktop   |
| **Cline**          | `clin`           | `clin`        | personalizat         | npm                 |
| **Cod Kilo**       | `kilo`           | `kilocode`    | personalizat         | npm                 |
| **Continuare**     | `continuare`     | extensie      | ghid                 | Cod VS              |
| **Antigravitație** | `antigravitație` | intern        | mitm                 | OmniRoute           |
| **Copilot GitHub** | `copilot`        | extensie      | personalizat         | Cod VS              |
| **OpenCode**       | `cod deschis`    | `cod deschis` | ghid                 | npm                 |
| **Kiro AI**        | `kiro`           | app/cli       | mitm                 | desktop/CLI         | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` și `Settings > CLI Fingerprint` folosesc `src/shared/constants/cliCompatProviders.ts`.
Acest lucru menține ID-urile furnizorilor aliniate cu cardurile CLI și ID-urile vechi.

| ID CLI                                                                                               | ID furnizor de amprentă digitală |
| ---------------------------------------------------------------------------------------------------- | -------------------------------- |
| `kilo`                                                                                               | `kilocode`                       |
| `copilot`                                                                                            | `github`                         |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | același ID                       |

ID-uri vechi încă acceptate pentru compatibilitate: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Deschideți tabloul de bord OmniRoute →**Manager API**(`/dashboard/api-manager`)
2. Faceți clic pe**Creați cheia API**
3. Dați-i un nume (de exemplu, „cli-tools”) și selectați toate permisiunile
4. Copiați cheia — veți avea nevoie de ea pentru fiecare CLI de mai jos

> Cheia dvs. arată astfel: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Toate instrumentele bazate pe npm necesită Node.js 18+:```bash

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

**Verifica:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Adăugați la `~/.bashrc` (sau `~/.zshrc`), apoi rulați `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Pentru un**server la distanță**înlocuiți `localhost:20128` cu IP-ul sau domeniul serverului,
> de ex. `http://192.168.0.15:20128`.---

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

**Test:**`claude "să salută"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`codex "ce este 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test:**`cod deschis`---

### Cline (CLI or VS Code)

**Mod CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Modul cod VS:**
Setări pentru extensia de linie → Furnizor API: `Compatibil OpenAI` → Adresa URL de bază: `http://localhost:20128/v1`

Sau utilizați tabloul de bord OmniRoute →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**Mod CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Setări VS Code:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Sau utilizați tabloul de bord OmniRoute →**CLI Tools → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Editați `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Reporniți VS Code după editare.---

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

> **Notă:**Cursorul direcționează cererile prin cloud. Pentru integrarea OmniRoute,
> activați**Cloud Endpoint**în Setările OmniRoute și utilizați adresa URL a domeniului public.

Prin GUI:**Setări → Modele → Cheie API OpenAI**

- Adresa URL de bază: `https://domeniul-tau.com/v1`
- Cheia API: cheia dvs. OmniRoute---

## Dashboard Auto-Configuration

Tabloul de bord OmniRoute automatizează configurarea pentru majoritatea instrumentelor:

1. Accesați „http://localhost:20128/dashboard/cli-tools”
2. Extindeți orice card de instrumente
3. Selectați cheia dvs. API din meniul drop-down
4. Faceți clic pe**Aplicați configurația**(dacă instrumentul este detectat ca fiind instalat)
5. Sau copiați manual fragmentul de configurare generat---

## Built-in Agents: Droid & OpenClaw

**Droid**și**OpenClaw**sunt agenți AI încorporați direct în OmniRoute – nu este necesară instalarea.
Acestea rulează ca rute interne și utilizează automat rutarea modelului OmniRoute.

- Acces: `http://localhost:20128/dashboard/agents`
- Configurați: aceleași combinații și furnizori ca toate celelalte instrumente
- Nu este necesară instalarea unei chei API sau CLI---

## Available API Endpoints

| Punct final                | Descriere                       | Utilizare pentru                              |
| -------------------------- | ------------------------------- | --------------------------------------------- | --- |
| `/v1/chat/completions`     | Chat standard (toți furnizorii) | Toate instrumentele moderne                   |
| `/v1/responses`            | Responses API (format OpenAI)   | Codex, fluxuri de lucru agentice              |
| `/v1/completions`          | Terminări vechi ale textului    | Instrumente mai vechi care folosesc `prompt:` |
| `/v1/embeddings`           | Încorporarea textului           | RAG, căutare                                  |
| `/v1/images/generations`   | Generarea imaginii              | DALL-E, Flux etc.                             |
| `/v1/audio/vorbire`        | Text-to-speech                  | ElevenLabs, OpenAI TTS                        |
| `/v1/audio/transcriptions` | Vorbire în text                 | Deepgram, AssemblyAI                          | --- |

## Depanare

| Eroare                    | Cauza                             | Fix                                                   |
| ------------------------- | --------------------------------- | ----------------------------------------------------- | --- |
| `Conexiune refuzată`      | OmniRoute nu rulează              | `pm2 start omniroute`                                 |
| `401 Neautorizat`         | Cheie API greșită                 | Verificați `/dashboard/api-manager`                   |
| `Niciun combo configurat` | Nicio combinație de rutare activă | Configurați în `/dashboard/combos`                    |
| `model invalid`           | Modelul nu este în catalog        | Folosiți `auto` sau verificați `/dashboard/providers` |
| CLI arată „neinstalat”    | Binar nu este în PATH             | Verificați `care <comandă>`                           |
| `kiro-cli: negăsit`       | Nu în PATH                        | `export PATH="$HOME/.local/bin:$PATH"`                | --- |

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
