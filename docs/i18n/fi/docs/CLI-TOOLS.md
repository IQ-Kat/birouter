# CLI Tools Setup Guide — OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Tämä opas selittää, kuinka asentaa ja määrittää kaikki tuetut AI-koodauksen CLI-työkalut
käyttää**OmniRoutea**yhtenäisenä taustajärjestelmänä, mikä antaa sinulle keskitetyn avaintenhallinnan,
kustannusseuranta, mallin vaihto ja pyyntöjen kirjaaminen kaikissa työkaluissa.---

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

**Edut:**

- Yksi API-avain kaikkien työkalujen hallintaan
- Kustannusten seuranta kaikissa hallintapaneelin CLI:issä
- Mallinvaihto ilman jokaisen työkalun uudelleenkonfigurointia
- Toimii paikallisesti ja etäpalvelimilla (VPS)---

## Supported Tools (Dashboard Source of Truth)

Kohteen "/dashboard/cli-tools" kojelautakortit luodaan tiedostosta "src/shared/constants/cliTools.ts".
Nykyinen luettelo (v3.0.0-rc.16):

| Työkalu             | ID                | Komento       | Asennustila | Asennusmenetelmä |
| ------------------- | ----------------- | ------------- | ----------- | ---------------- | -------------------------------------------- |
| **Claude Code**     | `claude`          | `claude`      | env         | npm              |
| **OpenAI Codex**    | "koodi"           | "koodi"       | mukautettu  | npm              |
| **Tehdasdroidi**    | "droidi"          | "droidi"      | mukautettu  | niputettu/CLI    |
| **OpenClaw**        | "avokynsi"        | "avokynsi"    | mukautettu  | niputettu/CLI    |
| **Osoitin**         | `kursori`         | sovellus      | opas        | työpöytäsovellus |
| **Cline**           | "cline"           | "cline"       | mukautettu  | npm              |
| **Kilokoodi**       | "kilo"            | "kilokoodi"   | mukautettu  | npm              |
| **Jatka**           | "jatka"           | laajennus     | opas        | VS-koodi         |
| **Antigravitaatio** | "antigravitaatio" | sisäinen      | mitm        | OmniRoute        |
| **GitHub Copilot**  | "kakkospilotti"   | laajennus     | mukautettu  | VS-koodi         |
| **OpenCode**        | "avoin koodi"     | "avoin koodi" | opas        | npm              |
| **Kiro AI**         | "kiro"            | app/cli       | mitm        | työpöytä/CLI     | ### CLI fingerprint sync (Agents + Settings) |

"/dashboard/agents" ja "Settings > CLI Fingerprint" käyttävät "src/shared/constants/cliCompatProviders.ts".
Tämä pitää palveluntarjoajan tunnukset kohdakkain CLI-korttien ja vanhojen tunnuksien kanssa.

| CLI ID                                                                                                 | Sormenjälkien tarjoajan tunnus |
| ------------------------------------------------------------------------------------------------------ | ------------------------------ |
| "kilo"                                                                                                 | "kilokoodi"                    |
| "kakkospilotti"                                                                                        | "github"                       |
| "claude" / "codex" / "antigravity" / "kiro" / "kursori" / "cline" / "avokoodi" / "droidi" / "avokynsi" | sama tunnus                    |

Vanhat tunnukset hyväksytään edelleen yhteensopivuutta varten: "copilot", "kimi-coding", "qwen".---

## Step 1 — Get an OmniRoute API Key

1. Avaa OmniRoute-hallintapaneeli →**API Manager**(`/dashboard/api-manager`)
2. Napsauta**Luo API-avain**
3. Anna sille nimi (esim. "cli-tools") ja valitse kaikki käyttöoikeudet
4. Kopioi avain – tarvitset sitä jokaiseen alla olevaan CLI:hen

> Avaimesi näyttää tältä: "sk-xxxxxxxxxxxxxxxxx-xxxxxxxxxx"---

## Step 2 — Install CLI Tools

Kaikki npm-pohjaiset työkalut vaativat Node.js 18+:n:```bash

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

**Vahvista:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Lisää tiedostoon `~/.bashrc` (tai `~/.zshrc`) ja suorita sitten `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Jos kyseessä on**etäpalvelin**, korvaa "localhost:20128" palvelimen IP-osoitteella tai toimialueella,
> esim. "http://192.168.0.15:20128".---

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

**Testi:**`claude "say hello"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Testi:**`koodi "mikä on 2+2?"---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Testi:**`avoin koodi`---

### Cline (CLI or VS Code)

**CLI-tila:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS-kooditila:**
Cline-laajennusasetukset → API-palveluntarjoaja: "OpenAI-yhteensopiva" → Perus-URL-osoite: "http://localhost:20128/v1"

Tai käytä OmniRoute-hallintapaneelia →**CLI-työkalut → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**CLI-tila:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS-koodin asetukset:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Tai käytä OmniRoute-hallintapaneelia →**CLI-työkalut → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Muokkaa `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Käynnistä VS-koodi uudelleen muokkauksen jälkeen.---

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

> **Huomaa:**Kursori reitittää pyynnöt pilvensä kautta. OmniRoute-integraatiota varten
> ota**Cloud Endpoint**käyttöön OmniRoute-asetuksissa ja käytä julkista URL-osoitettasi.

GUI:n kautta:**Asetukset → Mallit → OpenAI API-avain**

- Perus-URL-osoite: "https://oma-verkkotunnus.com/v1".
- API-avain: OmniRoute-avaimesi---

## Dashboard Auto-Configuration

OmniRoute-hallintapaneeli automatisoi useimpien työkalujen määrityksen:

1. Siirry osoitteeseen "http://localhost:20128/dashboard/cli-tools"
2. Laajenna mitä tahansa työkalukorttia
3. Valitse sovellusliittymäavaimesi pudotusvalikosta
4. Napsauta**Apply Config**(jos työkalu havaitaan asennetuksi).
5. Tai kopioi luotu määrityskoodinpätkä manuaalisesti---

## Built-in Agents: Droid & OpenClaw

**Droid**ja**OpenClaw**ovat tekoälyagentteja, jotka on rakennettu suoraan OmniRouteen – asennusta ei tarvita.
Ne toimivat sisäisinä reiteinä ja käyttävät OmniRouten mallireititystä automaattisesti.

- Pääsy: "http://localhost:20128/dashboard/agents".
- Määritä: samat yhdistelmät ja palveluntarjoajat kuin kaikki muut työkalut
- API-avainta tai CLI-asennusta ei tarvita---

## Available API Endpoints

| Päätepiste                | Kuvaus                                   | Käytä                                             |
| ------------------------- | ---------------------------------------- | ------------------------------------------------- | --- |
| "/v1/chat/completions"    | Normaali chat (kaikki palveluntarjoajat) | Kaikki nykyaikaiset työkalut                      |
| "/v1/responses"           | Responses API (OpenAI-muoto)             | Codex, agenttityönkulut                           |
| "/v1/completions"         | Vanhat tekstin täydennykset              | Vanhemmat työkalut, joissa käytetään "kehotetta:" |
| "/v1/embeddings"          | Tekstin upotukset                        | RAG, haku                                         |
| "/v1/images/generations"  | Kuvan luominen                           | DALL-E, Flux jne.                                 |
| "/v1/audio/speech"        | Tekstistä puheeksi                       | ElevenLabs, OpenAI TTS                            |
| `/v1/audio/transkriptiot` | Puhe tekstiksi                           | Deepgram, AssemblyAI                              | --- |

## Vianmääritys

| Virhe                           | Syy                               | Korjaa                                          |
| ------------------------------- | --------------------------------- | ----------------------------------------------- | --- |
| "Yhteys evätty"                 | OmniRoute ei ole käynnissä        | `pm2 start omniroute`                           |
| "401 Luvaton"                   | Väärä API-avain                   | Kirjaudu sisään `/dashboard/api-manager`        |
| "Yhdistelmää ei ole määritetty" | Ei aktiivista reititysyhdistelmää | Määritä kohdassa `/dashboard/combos'            |
| "virheellinen malli"            | Malli ei ole luettelossa          | Käytä "auto" tai valitse "/dashboard/providers" |
| CLI näyttää "ei asennettu"      | Binaari ei sisällä PATH           | Tarkista `mikä <komento>`                       |
| `kiro-cli: ei löydy`            | Ei sisällä PATH                   | `export PATH="$HOME/.local/bin:$PATH"`          | --- |

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
