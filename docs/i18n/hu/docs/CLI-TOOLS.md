# CLI Tools Setup Guide — OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Ez az útmutató elmagyarázza, hogyan kell telepíteni és konfigurálni az összes támogatott AI kódoló CLI eszközt
az**OmniRoute**egységes háttérként való használata, amely központi kulcskezelést biztosít,
költségkövetés, modellváltás és kérések naplózása minden eszközön.---

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

**Előnyök:**

- Egy API-kulcs az összes eszköz kezeléséhez
- Költségkövetés az összes CLI-ben az irányítópulton
- Modellváltás minden szerszám újrakonfigurálása nélkül
- Helyben és távoli szervereken (VPS) működik---

## Supported Tools (Dashboard Source of Truth)

A „/dashboard/cli-tools” irányítópult-kártyái az „src/shared/constants/cliTools.ts” fájlból jönnek létre.
Jelenlegi lista (v3.0.0-rc.16):

| Szerszám               | ID               | Parancs       | Beállítási mód | Telepítési módszer |
| ---------------------- | ---------------- | ------------- | -------------- | ------------------ | -------------------------------------------- |
| **Claude Code**        | `claude`         | `claude`      | env            | npm                |
| **OpenAI Codex**       | "kódex"          | "kódex"       | egyedi         | npm                |
| **Gyári droid**        | "droid"          | "droid"       | egyedi         | csomagban/CLI      |
| **OpenClaw**           | "nyílt karmú"    | "nyílt karmú" | egyedi         | csomagban/CLI      |
| **Kurzor**             | "kurzor"         | app           | útmutató       | asztali alkalmazás |
| **Cline**              | "cline"          | "cline"       | egyedi         | npm                |
| **Kiló kód**           | "kiló"           | "kilokód"     | egyedi         | npm                |
| **Folytatás**          | "folytatás"      | kiterjesztése | útmutató       | VS kód             |
| **Antigravitáció**     | "antigravitáció" | belső         | mitm           | OmniRoute          |
| **GitHub másodpilóta** | "másodpilóta"    | kiterjesztése | egyedi         | VS kód             |
| **OpenCode**           | "nyitott kód"    | "nyitott kód" | útmutató       | npm                |
| **Kiro AI**            | "kiro"           | app/cli       | mitm           | asztali/CLI        | ### CLI fingerprint sync (Agents + Settings) |

A „/dashboard/agents” és a „Settings > CLI Fingerprint” az „src/shared/constants/cliCompatProviders.ts” fájlt használja.
Ez a szolgáltatói azonosítókat a CLI-kártyákhoz és a régi azonosítókhoz igazítja.

| CLI ID                                                                                                  | Ujjlenyomat-szolgáltató azonosítója |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| "kiló"                                                                                                  | "kilokód"                           |
| "másodpilóta"                                                                                           | "github"                            |
| "claude" / "codex" / "antigravitáció" / "kiro" / "kurzor" / "cline" / "opencode" / "droid" / "openclaw" | ugyanaz az azonosító                |

A kompatibilitás szempontjából továbbra is elfogadott régebbi azonosítók: "copilot", "kimi-coding", "qwen".---

## Step 1 — Get an OmniRoute API Key

1. Nyissa meg az OmniRoute irányítópultot →**API Manager**(`/dashboard/api-manager`)
2. Kattintson az**API-kulcs létrehozása**lehetőségre.
3. Adjon neki nevet (pl. "cli-tools"), és válassza ki az összes engedélyt
4. Másolja ki a kulcsot – minden alábbi CLI-hez szüksége lesz rá

> A kulcs így néz ki: "sk-xxxxxxxxxxxxxxxxx-xxxxxxxxxx"---

## Step 2 — Install CLI Tools

Minden npm-alapú eszközhöz Node.js 18+ szükséges:```bash

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

**Ellenőrzés:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Adja hozzá a "~/.bashrc" (vagy "~/.zshrc") fájlhoz, majd futtassa a "source ~/.bashrc" parancsot:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

>**Távoli szerver**esetén cserélje ki a `localhost:20128' szót a szerver IP-címére vagy tartományára,
> pl. "http://192.168.0.15:20128".---

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

**Teszt:**`claude "köszönj"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Teszt:**"mi a 2+2?" kódex---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Teszt:**"nyílt kód".---

### Cline (CLI or VS Code)

**CLI mód:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS kód mód:**
Klinikabővítmény beállításai → API-szolgáltató: "OpenAI-kompatibilis" → Alap URL: "http://localhost:20128/v1"

Vagy használja az OmniRoute irányítópultot →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**CLI mód:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS kód beállításai:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Vagy használja az OmniRoute irányítópultot →**CLI Tools → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Szerkessze a `~/.continue/config.yaml` fájlt:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Szerkesztés után indítsa újra a VS kódot.---

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

> **Megjegyzés:**A kurzor a felhőn keresztül irányítja a kéréseket. Az OmniRoute integrációhoz
> engedélyezze a**Cloud Endpoint**lehetőséget az OmniRoute beállításaiban, és használja a nyilvános domain URL-jét.

GUI-n keresztül:**Beállítások → Modellek → OpenAI API-kulcs**

- Alap URL: `https://sajat-domain.com/v1`
- API-kulcs: az Ön OmniRoute-kulcsa---

## Dashboard Auto-Configuration

Az OmniRoute irányítópult a legtöbb eszköz konfigurálását automatizálja:

1. Nyissa meg a "http://localhost:20128/dashboard/cli-tools" oldalt.
2. Bontsa ki bármelyik szerszámkártyát
3. Válassza ki az API-kulcsot a legördülő menüből
4. Kattintson az**Apply Config**elemre (ha a rendszer telepített eszközt észlel)
5. Vagy másolja ki manuálisan a generált konfigurációs kódrészletet---

## Built-in Agents: Droid & OpenClaw

A**Droid**és**OpenClaw**közvetlenül az OmniRoute-ba beépített mesterséges intelligencia-ügynökök – nincs szükség telepítésre.
Belső útvonalként futnak, és automatikusan az OmniRoute modell-útválasztását használják.

- Hozzáférés: `http://localhost:20128/dashboard/agents`
- Konfigurálás: ugyanazok a kombinációk és szolgáltatók, mint az összes többi eszköz
- Nincs szükség API-kulcsra vagy CLI-telepítésre---

## Available API Endpoints

| Végpont                    | Leírás                               | Használja                      |
| -------------------------- | ------------------------------------ | ------------------------------ | --- |
| "/v1/chat/completions"     | Normál csevegés (minden szolgáltató) | Minden modern eszköz           |
| "/v1/responses"            | Responses API (OpenAI formátum)      | Codex, ügynöki munkafolyamatok |
| "/v1/befejezések"          | Hagyományos szövegkiegészítések      | Régebbi, `prompt:`             |
| "/v1/beágyazások"          | Szöveg beágyazások                   | RAG, keresés                   |
| "/v1/images/generations"   | Képgenerálás                         | DALL-E, Flux stb.              |
| "/v1/audio/speech"         | Szövegfelolvasó                      | ElevenLabs, OpenAI TTS         |
| "/v1/audio/transcriptions" | Beszéd-szöveg                        | Deepgram, AssemblyAI           | --- |

## Hibaelhárítás

| Hiba                                      | Ok                             | Fix                                                                      |
| ----------------------------------------- | ------------------------------ | ------------------------------------------------------------------------ | --- |
| "Kapcsolat elutasítva"                    | Az OmniRoute nem fut           | `pm2 start omniroute`                                                    |
| "401 Jogosulatlan"                        | Hibás API-kulcs                | Bejelentkezés: `/dashboard/api-manager`                                  |
| `Nincs kombó konfigurálva`                | Nincs aktív útválasztási kombó | Beállítás itt: `/dashboard/combos`                                       |
| `érvénytelen modell`                      | Modell nincs a katalógusban    | Használja az „auto” beállítást, vagy jelölje be a „/dashboard/providers” |
| A CLI azt mutatja, hogy "nincs telepítve" | Bináris nem a PATH             | Jelölje be, `melyik <parancs>`                                           |
| `kiro-cli: nem található`                 | Nem a PATH                     | `export PATH="$HOME/.local/bin:$PATH"`                                   | --- |

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
