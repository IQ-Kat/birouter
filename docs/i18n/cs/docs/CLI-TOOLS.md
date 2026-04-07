# CLI Tools Setup Guide — OmniRoute (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Tato příručka vysvětluje, jak nainstalovat a nakonfigurovat všechny podporované nástroje CLI pro kódování AI
používat**OmniRoute**jako jednotný backend, který vám poskytne centralizovanou správu klíčů,
sledování nákladů, přepínání modelů a protokolování požadavků napříč každým nástrojem.---

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

**Výhody:**

- Jeden klíč API pro správu všech nástrojů
- Sledování nákladů napříč všemi CLI na řídicím panelu
- Přepínání modelů bez překonfigurování každého nástroje
- Funguje lokálně i na vzdálených serverech (VPS)---

## Supported Tools (Dashboard Source of Truth)

Karty řídicího panelu v `/dashboard/cli-tools` jsou generovány z `src/shared/constants/cliTools.ts`.
Aktuální seznam (v3.0.0-rc.16):

| Nástroj            | ID              | Příkaz          | Režim nastavení | Způsob instalace    |
| ------------------ | --------------- | --------------- | --------------- | ------------------- | -------------------------------------------- |
| **Claude Code**    | "claude"        | "claude"        | env             | npm                 |
| **Kodex OpenAI**   | "kodex"         | "kodex"         | vlastní         | npm                 |
| **Factory Droid**  | "droid"         | "droid"         | vlastní         | svázaný/CLI         |
| **OpenClaw**       | "otevřený spár" | "otevřený spár" | vlastní         | svázaný/CLI         |
| **Kurzor**         | "kurzor"        | aplikace        | průvodce        | desktopová aplikace |
| **Cline**          | "cline"         | "cline"         | vlastní         | npm                 |
| **Kilokód**        | "kilo"          | "kilokód"       | vlastní         | npm                 |
| **Pokračovat**     | "pokračovat"    | prodloužení     | průvodce        | VS kód              |
| **Antigravitace**  | "antigravitace" | vnitřní         | mitm            | OmniRoute           |
| **GitHub Copilot** | "kopilot"       | prodloužení     | vlastní         | VS kód              |
| **OpenCode**       | "opencode"      | "opencode"      | průvodce        | npm                 |
| **Kiro AI**        | "kiro"          | aplikace/kli    | mitm            | desktop/CLI         | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` a `Nastavení > CLI Fingerprint` používají `src/shared/constants/cliCompatProviders.ts`.
To udržuje ID poskytovatelů v souladu s kartami CLI a staršími ID.

| CLI ID                                                                                                 | ID poskytovatele otisků prstů |
| ------------------------------------------------------------------------------------------------------ | ----------------------------- |
| "kilo"                                                                                                 | "kilokód"                     |
| "kopilot"                                                                                              | `github`                      |
| `claude` / `codex` / `antigravitace` / `kiro` / `kurzor` / `cline` / `opencode` / `droid` / `openclaw` | stejné ID                     |

Z důvodu kompatibility jsou stále přijímána starší ID: `kopilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Otevřete řídicí panel OmniRoute →**Správce rozhraní API**(`/dashboard/api-manager`)
2. Klikněte na**Vytvořit klíč API**
3. Pojmenujte jej (např. `cli-tools`) a vyberte všechna oprávnění
4. Zkopírujte klíč – budete jej potřebovat pro každé CLI níže

> Váš klíč vypadá takto: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Všechny nástroje založené na npm vyžadují Node.js 18+:```bash

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

**Ověřit:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Přidejte do `~/.bashrc` (nebo `~/.zshrc`), poté spusťte `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> V případě**vzdáleného serveru**nahraďte `localhost:20128` IP nebo doménou serveru,
> např. `http://192.168.0.15:20128`.---

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

**Test:**`claude "řekni ahoj"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`kodex "co je 2+2?"`---

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

**Režim CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Režim VS kódu:**
Nastavení rozšíření Cline → Poskytovatel rozhraní API: `OpenAI Compatible` → Základní URL: `http://localhost:20128/v1`

Nebo použijte řídicí panel OmniRoute →**Nástroje CLI → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**Režim CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Nastavení VS kódu:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Nebo použijte řídicí panel OmniRoute →**Nástroje CLI → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Upravit `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Po úpravě restartujte kód VS.---

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

> **Poznámka:**Kurzor směruje požadavky přes svůj cloud. Pro integraci OmniRoute,
> povolte**Cloud Endpoint**v nastavení OmniRoute a použijte adresu URL své veřejné domény.

Přes GUI:**Nastavení → Modely → Klíč OpenAI API**

– Základní adresa URL: „https://vase-domena.com/v1“.

- API Key: váš klíč OmniRoute---

## Dashboard Auto-Configuration

Řídicí panel OmniRoute automatizuje konfiguraci pro většinu nástrojů:

1. Přejděte na `http://localhost:20128/dashboard/cli-tools`
2. Rozbalte libovolnou kartu nástroje
3. Z rozevírací nabídky vyberte klíč API
4. Klikněte na**Apply Config**(pokud je nástroj detekován jako nainstalovaný)
5. Nebo ručně zkopírujte vygenerovaný konfigurační fragment---

## Built-in Agents: Droid & OpenClaw

**Droid**a**OpenClaw**jsou agenti umělé inteligence zabudovaní přímo do OmniRoute – není potřeba žádná instalace.
Běží jako interní trasy a automaticky používají modelové směrování OmniRoute.

- Přístup: `http://localhost:20128/dashboard/agents`
- Konfigurace: stejná komba a poskytovatelé jako všechny ostatní nástroje
- Nevyžaduje se žádná instalace klíče API nebo CLI---

## Available API Endpoints

| Koncový bod              | Popis                                   | Použití pro                           |
| ------------------------ | --------------------------------------- | ------------------------------------- | --- |
| `/v1/chat/completions`   | Standardní chat (všichni poskytovatelé) | Všechny moderní nástroje              |
| `/v1/responses`          | Responses API (formát OpenAI)           | Codex, agentní pracovní postupy       |
| `/v1/completions`        | Dokončení starších textů                | Starší nástroje používající `prompt:` |
| `/v1/embeddings`         | Vkládání textu                          | RAG, hledání                          |
| `/v1/images/generations` | Generování obrázku                      | DALL-E, Flux atd.                     |
| `/v1/audio/řeč`          | Převod textu na řeč                     | ElevenLabs, OpenAI TTS                |
| `/v1/audio/přepisy`      | Převod řeči na text                     | Deepgram, AssemblyAI                  | --- |

## Řešení problémů

| Chyba                              | Příčina                       | Opravit                                                  |
| ---------------------------------- | ----------------------------- | -------------------------------------------------------- | --- |
| "Spojení odmítnuto"                | OmniRoute neběží              | `pm2 start omniroute`                                    |
| "401 Neoprávněné"                  | Špatný klíč API               | Zkontrolujte `/dashboard/api-manager`                    |
| `Není nakonfigurováno žádné kombo` | Žádné aktivní směrovací kombo | Nastavit v `/dashboard/combos`                           |
| "neplatný model"                   | Model není v katalogu         | Použijte `auto` nebo zkontrolujte `/dashboard/providers` |
| CLI zobrazuje "není nainstalováno" | Binární není v PATH           | Zkontrolujte `který <příkaz>`                            |
| `kiro-cli: nenalezeno`             | Ne v PATH                     | `export PATH="$HOME/.local/bin:$PATH"`                   | --- |

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
