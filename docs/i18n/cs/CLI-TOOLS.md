# Průvodce nastavením nástrojů CLI — OmniRoute

Tato příručka vysvětluje, jak nainstalovat a nakonfigurovat všechny podporované nástroje CLI pro kódování umělé inteligence tak, aby **OmniRoute** fungoval jako jednotný backend, což vám umožní centralizovanou správu klíčů, sledování nákladů, přepínání modelů a protokolování požadavků napříč všemi nástroji.

---

## Jak to funguje

```
Claude / Codex / Gemini CLI / OpenCode / Cline / KiloCode / Continue / Kiro CLI
           │
           ▼  (all point to OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute routes to the right provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**Výhody:**

- Jeden klíč API pro správu všech nástrojů
- Sledování nákladů napříč všemi rozhraními příkazového řádku v dashboardu
- Přepínání modelů bez nutnosti překonfigurování každého nástroje
- Funguje lokálně i na vzdálených serverech (VPS)

---

## Podporované nástroje

Nástroj | Příkaz | Typ | Metoda instalace
--- | --- | --- | ---
**Claude Code** | `claude` | Rozhraní příkazového řádku | npm
**Kodex OpenAI** | `codex` | Rozhraní příkazového řádku | npm
**Rozhraní příkazového řádku Gemini** | `gemini` | Rozhraní příkazového řádku | npm
**OpenCode** | `opencode` | Rozhraní příkazového řádku | npm
**Cline** | `cline` | Rozšíření CLI + VS kódu | npm
**KiloCode** | `kilocode` / `kilo` | Rozšíření CLI + VS kódu | npm
**Pokračovat** | průvodce | VS Code ext | VS kód
**Kiro CLI** | `kiro-cli` | Rozhraní příkazového řádku | instalační program Curl
**Kurzor** | `cursor` | Aplikace pro stolní počítače | Stáhnout
**Droid** | webový | Vestavěný agent | OmniRoute
**OpenClaw** | webový | Vestavěný agent | OmniRoute

---

## Krok 1 – Získejte klíč OmniRoute API

1. Otevřete dashboard OmniRoute → **Správce API** ( `/dashboard/api-manager` )
2. Klikněte na **Vytvořit klíč API**
3. Pojmenujte to (např. `cli-tools` ) a vyberte všechna oprávnění.
4. Zkopírujte klíč – budete ho potřebovat pro každé níže uvedené rozhraní příkazového řádku.

> Váš klíč vypadá takto: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

## Krok 2 – Instalace nástrojů CLI

Všechny nástroje založené na npm vyžadují Node.js 18+:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# Gemini CLI (Google)
npm install -g @google/gemini-cli

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilecode

# Kiro CLI (Amazon — requires curl + unzip)
apt-get install -y unzip   # on Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH"   # add to ~/.bashrc
```

**Ověřit:**

```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
gemini --version     # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
```

---

## Krok 3 – Nastavení globálních proměnných prostředí

Přidejte do `~/.bashrc` (nebo `~/.zshrc` ) a poté spusťte `source ~/.bashrc` :

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Pro **vzdálený server** nahraďte `localhost:20128` IP adresou nebo doménou serveru, např. `http://192.168.0.15:20128` .

---

## Krok 4 – Konfigurace jednotlivých nástrojů

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
```

**Test:** `claude "say hello"`

---

### Kodex OpenAI

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:** `codex "what is 2+2?"`

---

### Rozhraní příkazového řádku Gemini

```bash
mkdir -p ~/.gemini && cat > ~/.gemini/settings.json << EOF
{
  "apiKey": "sk-your-omniroute-key",
  "baseUrl": "http://localhost:20128/v1"
}
EOF
```

**Test:** `gemini "hello"`

---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test:** `opencode`

---

### Cline (CLI nebo VS kód)

**Režim CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Režim VS Code:** Nastavení rozšíření Cline → Poskytovatel API: `OpenAI Compatible` → Základní URL: `http://localhost:20128/v1`

Nebo použijte dashboard OmniRoute → **CLI Tools → Cline → Apply Config** .

---

### KiloCode (CLI nebo VS kód)

**Režim CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Nastavení VS kódu:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Nebo použijte dashboard OmniRoute → **CLI Tools → KiloCode → Apply Config** .

---

### Pokračovat (rozšíření kódu VS)

Upravit `~/.continue/config.yaml` :

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Po úpravě restartujte VS Code.

---

### Kiro CLI (Amazon)

```bash
# Login to your AWS/Kiro account:
kiro-cli login

# The CLI uses its own auth — OmniRoute is not needed as backend for Kiro CLI itself.
# Use kiro-cli alongside OmniRoute for other tools.
kiro-cli status
```

---

### Kurzor (aplikace pro stolní počítače)

> **Poznámka:** Cursor směruje požadavky přes svůj cloud. Pro integraci OmniRoute povolte **cloudový koncový bod** v nastavení OmniRoute a použijte URL adresu vaší veřejné domény.

Přes GUI: **Nastavení → Modely → Klíč OpenAI API**

- Základní URL: `https://your-domain.com/v1`
- Klíč API: váš klíč OmniRoute

---

## Automatická konfigurace řídicího panelu

Ovládací panel OmniRoute automatizuje konfiguraci většiny nástrojů:

1. Přejděte na `http://localhost:20128/dashboard/cli-tools`
2. Rozbalit libovolnou kartu nástroje
3. Vyberte klíč API z rozbalovací nabídky
4. Klikněte **na Použít konfiguraci** (pokud je nástroj detekován jako nainstalovaný)
5. Nebo zkopírujte vygenerovaný konfigurační úryvek ručně

---

## Vestavění agenti: Droid a OpenClaw

**Droid** a **OpenClaw** jsou agenti umělé inteligence zabudovaní přímo do OmniRoute – není nutná žádná instalace. Běží jako interní trasy a automaticky používají modelové směrování OmniRoute.

- Přístup: `http://localhost:20128/dashboard/agents`
- Konfigurace: stejné kombinace a poskytovatelé jako u všech ostatních nástrojů
- Není vyžadována instalace klíče API ani příkazového řádku

---

## Dostupné koncové body API

Koncový bod | Popis | Použití pro
--- | --- | ---
`/v1/chat/completions` | Standardní chat (všichni poskytovatelé) | Všechny moderní nástroje
`/v1/responses` | API pro odpovědi (formát OpenAI) | Kodex, agentické pracovní postupy
`/v1/completions` | Doplňování starších textů | Starší nástroje používající `prompt:`
`/v1/embeddings` | Vkládání textu | RAG, vyhledávání
`/v1/images/generations` | Generování obrázků | DALL-E, Flux atd.
`/v1/audio/speech` | Převod textu na řeč | ElevenLabs, OpenAI TTS
`/v1/audio/transcriptions` | Převod řeči na text | Deepgram, AssemblyAI

---

## Odstraňování problémů

Chyba | Příčina | Opravit
--- | --- | ---
`Connection refused` | OmniRoute neběží | `pm2 start omniroute`
`401 Unauthorized` | Chybný klíč API | Zkontrolovat `/dashboard/api-manager`
`No combo configured` | Žádná aktivní routingová kombinace | Nastavení v `/dashboard/combos`
`invalid model` | Model není v katalogu | Použijte `auto` nebo zkontrolujte `/dashboard/providers`
CLI zobrazuje „není nainstalováno“ | Binární soubor není v cestě PATH | Zkontrolujte, `which <command>`
`kiro-cli: not found` | Není v PATH | `export PATH="$HOME/.local/bin:$PATH"`

---

## Skript pro rychlé nastavení (jeden příkaz)

```bash
# Install all CLIs and configure for OmniRoute (replace with your key and server URL)
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_KEY="sk-your-omniroute-key"

npm install -g @anthropic-ai/claude-code @openai/codex @google/gemini-cli opencode-ai cline kilecode

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# Write configs
mkdir -p ~/.claude ~/.codex ~/.gemini ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json   <<< "{\"apiBaseUrl\":\"$OMNIROUTE_URL\",\"apiKey\":\"$OMNIROUTE_KEY\"}"
cat > ~/.codex/config.yaml      <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
cat > ~/.gemini/settings.json   <<< "{\"apiKey\":\"$OMNIROUTE_KEY\",\"baseUrl\":\"$OMNIROUTE_URL\"}"
cat >> ~/.bashrc << EOF
export OPENAI_BASE_URL="$OMNIROUTE_URL"
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export ANTHROPIC_BASE_URL="$OMNIROUTE_URL"
export ANTHROPIC_API_KEY="$OMNIROUTE_KEY"
EOF

source ~/.bashrc
echo "✅ All CLIs installed and configured for OmniRoute"
```
