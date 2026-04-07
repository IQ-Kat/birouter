# CLI Tools Setup Guide — OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Táto príručka vysvetľuje, ako nainštalovať a nakonfigurovať všetky podporované nástroje CLI na kódovanie AI
používať**OmniRoute**ako jednotný backend, ktorý vám poskytne centralizovanú správu kľúčov,
sledovanie nákladov, prepínanie modelov a zaznamenávanie požiadaviek v rámci každého nástroja.---

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

- Jeden kľúč API na správu všetkých nástrojov
- Sledovanie nákladov vo všetkých CLI na palubnej doske
- Prepínanie modelov bez prekonfigurovania každého nástroja
- Funguje lokálne aj na vzdialených serveroch (VPS)---

## Supported Tools (Dashboard Source of Truth)

Karty dashboardu v `/dashboard/cli-tools` sú generované z `src/shared/constants/cliTools.ts`.
Aktuálny zoznam (v3.0.0-rc.16):

| Nástroj             | ID               | Príkaz     | Režim nastavenia | Spôsob inštalácie    |
| ------------------- | ---------------- | ---------- | ---------------- | -------------------- | -------------------------------------------- |
| **Claude Code**     | "claude"         | "claude"   | env              | npm                  |
| **OpenAI Codex**    | "kódex"          | "kódex"    | zvyk             | npm                  |
| **Factory Droid**   | "droid"          | "droid"    | zvyk             | balík/CLI            |
| **OpenClaw**        | "openclaw"       | "openclaw" | zvyk             | balík/CLI            |
| **Kurzor**          | "kurzor"         | aplikácia  | sprievodca       | desktopová aplikácia |
| **Cline**           | "cline"          | "cline"    | zvyk             | npm                  |
| **Kilogramový kód** | "kilo"           | "kilokód"  | zvyk             | npm                  |
| **Pokračovať**      | "pokračovať"     | rozšírenie | sprievodca       | VS kód               |
| **Antigravitácia**  | "antigravitácia" | interné    | mitm             | OmniRoute            |
| **GitHub Copilot**  | "kopilot"        | rozšírenie | zvyk             | VS kód               |
| **OpenCode**        | "opencode"       | "opencode" | sprievodca       | npm                  |
| **Kiro AI**         | "kiro"           | app/cli    | mitm             | desktop/CLI          | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` a `Nastavenia > CLI Fingerprint` používajú `src/shared/constants/cliCompatProviders.ts`.
Vďaka tomu budú ID poskytovateľa zarovnané s kartami CLI a staršími ID.

| CLI ID                                                                                                  | ID poskytovateľa odtlačkov prstov |
| ------------------------------------------------------------------------------------------------------- | --------------------------------- |
| "kilo"                                                                                                  | "kilokód"                         |
| "kopilot"                                                                                               | `github`                          |
| `claude` / `codex` / `antigravitácia` / `kiro` / `kurzor` / `cline` / `opencode` / `droid` / `openclaw` | rovnaké ID                        |

Z dôvodu kompatibility sú stále akceptované staršie ID: `kopilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Otvorte informačný panel OmniRoute →**API Manager**(`/dashboard/api-manager`)
2. Kliknite na**Vytvoriť kľúč API**
3. Pomenujte ho (napr. `cli-tools`) a vyberte všetky povolenia
4. Skopírujte kľúč – budete ho potrebovať pre každé CLI nižšie

> Váš kľúč vyzerá takto: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Všetky nástroje založené na npm vyžadujú Node.js 18+:```bash

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

**Overiť:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Pridajte do `~/.bashrc` (alebo `~/.zshrc`), potom spustite `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> V prípade**vzdialeného servera**nahraďte `localhost:20128` IP alebo doménou servera,
> napr. `http://192.168.0.15:20128`.---

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

**Test:**`claude "pozdraviť"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`kódex „čo je 2+2?“`---

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
Nastavenia rozšírenia Cline → Poskytovateľ API: `OpenAI Compatible` → Základná adresa URL: `http://localhost:20128/v1`

Alebo použite ovládací panel OmniRoute →**Nástroje CLI → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**Režim CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Nastavenia VS kódu:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Alebo použite ovládací panel OmniRoute →**Nástroje CLI → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Upravte `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Po úprave reštartujte kód VS.---

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

> **Poznámka:**Kurzor smeruje požiadavky cez svoj cloud. Pre integráciu OmniRoute,
> povoľte**Cloud Endpoint**v nastaveniach OmniRoute a použite adresu URL svojej verejnej domény.

Cez GUI:**Nastavenia → Modely → Kľúč OpenAI API**

– Základná adresa URL: https://vasa-domena.com/v1

- API Key: váš kľúč OmniRoute---

## Dashboard Auto-Configuration

Ovládací panel OmniRoute automatizuje konfiguráciu pre väčšinu nástrojov:

1. Prejdite na stránku `http://localhost:20128/dashboard/cli-tools`
2. Rozbaľte ľubovoľnú kartu nástroja
3. V rozbaľovacej ponuke vyberte kľúč API
4. Kliknite na**Apply Config**(ak je nástroj detekovaný ako nainštalovaný)
5. Alebo skopírujte vygenerovaný konfiguračný úryvok manuálne---

## Built-in Agents: Droid & OpenClaw

**Droid**a**OpenClaw**sú agenti AI zabudovaní priamo do OmniRoute – nie je potrebná žiadna inštalácia.
Bežia ako interné trasy a automaticky používajú modelové smerovanie OmniRoute.

- Prístup: `http://localhost:20128/dashboard/agents`
- Konfigurácia: rovnaké kombá a poskytovatelia ako všetky ostatné nástroje
- Nevyžaduje sa žiadna inštalácia kľúča API alebo CLI---

## Available API Endpoints

| Koncový bod              | Popis                                   | Použiť pre                             |
| ------------------------ | --------------------------------------- | -------------------------------------- | --- |
| `/v1/chat/completions`   | Štandardný chat (všetci poskytovatelia) | Všetky moderné nástroje                |
| `/v1/responses`          | Responses API (formát OpenAI)           | Kódex, pracovné postupy agentov        |
| `/v1/completions`        | Dokončenia staršieho textu              | Staršie nástroje používajúce `prompt:` |
| `/v1/embeddings`         | Vloženie textu                          | RAG, hľadanie                          |
| `/v1/images/generations` | Generovanie obrázkov                    | DALL-E, Flux atď.                      |
| `/v1/audio/reč`          | Prevod textu na reč                     | ElevenLabs, OpenAI TTS                 |
| `/v1/audio/prepisy`      | Prevod reči na text                     | Deepgram, AssemblyAI                   | --- |

## Riešenie problémov

| Chyba                                 | Príčina                         | Opraviť                                                  |
| ------------------------------------- | ------------------------------- | -------------------------------------------------------- | --- |
| "Spojenie odmietnuté"                 | OmniRoute nefunguje             | `pm2 štart omniroute`                                    |
| "401 Neoprávnené"                     | Nesprávny kľúč API              | Skontrolujte `/dashboard/api-manager`                    |
| "Nie je nakonfigurované žiadne kombo" | Žiadne aktívne smerovacie kombo | Nastaviť v `/dashboard/combos`                           |
| "neplatný model"                      | Model nie je v katalógu         | Použite `auto` alebo skontrolujte `/dashboard/providers` |
| CLI zobrazuje "nenainštalované"       | Binárne nie je v PATH           | Skontrolujte `ktorý <príkaz>`                            |
| `kiro-cli: nenájdené`                 | Nie v PATH                      | `export PATH="$HOME/.local/bin:$PATH"`                   | --- |

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
