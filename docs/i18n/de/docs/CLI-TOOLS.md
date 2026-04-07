# CLI Tools Setup Guide — OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

In dieser Anleitung wird erläutert, wie Sie alle unterstützten KI-Codierungs-CLI-Tools installieren und konfigurieren
**OmniRoute**als einheitliches Backend zu verwenden, was Ihnen eine zentralisierte Schlüsselverwaltung ermöglicht,
Kostenverfolgung, Modellwechsel und Anforderungsprotokollierung für jedes Tool.---

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

**Vorteile:**

- Ein API-Schlüssel zur Verwaltung aller Tools
- Kostenverfolgung über alle CLIs im Dashboard
- Modellwechsel ohne Neukonfiguration jedes Werkzeugs
- Funktioniert lokal und auf Remote-Servern (VPS)---

## Supported Tools (Dashboard Source of Truth)

Die Dashboard-Karten in „/dashboard/cli-tools“ werden aus „src/shared/constants/cliTools.ts“ generiert.
Aktuelle Liste (v3.0.0-rc.16):

| Werkzeug            | ID                | Befehl         | Setup-Modus       | Installationsmethode |
| ------------------- | ----------------- | -------------- | ----------------- | -------------------- | -------------------------------------------- |
| **Claude Code**     | `Claude`          | `Claude`       | env               | npm                  |
| **OpenAI-Codex**    | `Kodex`           | `Kodex`        | benutzerdefiniert | npm                  |
| **Fabrikdroide**    | „Droide“          | „Droide“       | benutzerdefiniert | gebündelt/CLI        |
| **OpenClaw**        | „offene Klaue“    | „offene Klaue“ | benutzerdefiniert | gebündelt/CLI        |
| **Cursor**          | „Cursor“          | App            | Führer            | Desktop-App          |
| **Cline**           | `cline`           | `cline`        | benutzerdefiniert | npm                  |
| **Kilo-Code**       | „Kilo“            | `Kilocode`     | benutzerdefiniert | npm                  |
| **Weiter**          | `weiter`          | Erweiterung    | Führer            | VS-Code              |
| **Antigravitation** | „Antigravitation“ | intern         | mitm              | OmniRoute            |
| **GitHub Copilot**  | „Copilot“         | Erweiterung    | benutzerdefiniert | VS-Code              |
| **OpenCode**        | `opencode`        | `opencode`     | Führer            | npm                  |
| **Kiro KI**         | `Kiro`            | app/cli        | mitm              | Desktop/CLI          | ### CLI fingerprint sync (Agents + Settings) |

„/dashboard/agents“ und „Einstellungen > CLI-Fingerabdruck“ verwenden „src/shared/constants/cliCompatProviders.ts“.
Dadurch bleiben die Anbieter-IDs an den CLI-Karten und den Legacy-IDs ausgerichtet.

| CLI-ID                                                                                               | Fingerabdruck-Anbieter-ID |
| ---------------------------------------------------------------------------------------------------- | ------------------------- |
| „Kilo“                                                                                               | `Kilocode`                |
| „Copilot“                                                                                            | `github`                  |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | gleiche ID                |

Aus Kompatibilitätsgründen werden weiterhin ältere IDs akzeptiert: „copilot“, „kimi-coding“, „qwen“.---

## Step 1 — Get an OmniRoute API Key

1. Öffnen Sie das OmniRoute-Dashboard →**API Manager**(`/dashboard/api-manager`)
2. Klicken Sie auf**API-Schlüssel erstellen**
3. Geben Sie ihm einen Namen (z. B. „cli-tools“) und wählen Sie alle Berechtigungen aus
4. Kopieren Sie den Schlüssel – Sie benötigen ihn für jede unten aufgeführte CLI

> Ihr Schlüssel sieht so aus: „sk-xxxxxxxxxxxxxxxx-xxxxxxxxx“.---

## Step 2 — Install CLI Tools

Alle npm-basierten Tools erfordern Node.js 18+:```bash

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

**Verifizieren:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Fügen Sie „~/.bashrc“ (oder „~/.zshrc“) hinzu und führen Sie dann „source ~/.bashrc“ aus:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Für einen**Remote-Server**ersetzen Sie „localhost:20128“ durch die Server-IP oder Domäne,
> z.B. „http://192.168.0.15:20128“.---

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

**Test:**`Claude „Sag Hallo“`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`Codex „Was ist 2+2?“`---

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

**CLI-Modus:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS-Code-Modus:**
Cline-Erweiterungseinstellungen → API-Anbieter: „OpenAI-kompatibel“ → Basis-URL: „http://localhost:20128/v1“.

Oder verwenden Sie das OmniRoute-Dashboard →**CLI-Tools → Cline → Konfiguration anwenden**.---

### KiloCode (CLI or VS Code)

**CLI-Modus:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS-Code-Einstellungen:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Oder verwenden Sie das OmniRoute-Dashboard →**CLI-Tools → KiloCode → Konfiguration anwenden**.---

### Continue (VS Code Extension)

Bearbeiten Sie „~/.continue/config.yaml“:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Starten Sie VS Code nach der Bearbeitung neu.---

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

> **Hinweis:**Cursor leitet Anfragen über seine Cloud weiter. Für die OmniRoute-Integration:
> Aktivieren Sie**Cloud Endpoint**in den OmniRoute-Einstellungen und verwenden Sie Ihre Public-Domain-URL.

Über GUI:**Einstellungen → Modelle → OpenAI API-Schlüssel**

- Basis-URL: „https://your-domain.com/v1“.
- API-Schlüssel: Ihr OmniRoute-Schlüssel---

## Dashboard Auto-Configuration

Das OmniRoute-Dashboard automatisiert die Konfiguration für die meisten Tools:

1. Gehen Sie zu „http://localhost:20128/dashboard/cli-tools“.
2. Erweitern Sie eine beliebige Werkzeugkarte
3. Wählen Sie Ihren API-Schlüssel aus der Dropdown-Liste aus
4. Klicken Sie auf**Konfiguration anwenden**(wenn das Tool als installiert erkannt wird).
5. Oder kopieren Sie das generierte Konfigurations-Snippet manuell---

## Built-in Agents: Droid & OpenClaw

**Droid**und**OpenClaw**sind KI-Agenten, die direkt in OmniRoute integriert sind – keine Installation erforderlich.
Sie laufen als interne Routen und nutzen automatisch das Modellrouting von OmniRoute.

- Zugriff: „http://localhost:20128/dashboard/agents“.
- Konfigurieren: gleiche Kombinationen und Anbieter wie alle anderen Tools
- Kein API-Schlüssel oder CLI-Installation erforderlich---

## Available API Endpoints

| Endpunkt                   | Beschreibung                   | Verwenden Sie für          |
| -------------------------- | ------------------------------ | -------------------------- | --- |
| `/v1/chat/completions`     | Standard-Chat (alle Anbieter)  | Alle modernen Werkzeuge    |
| `/v1/responses`            | Antwort-API (OpenAI-Format)    | Codex, Agenten-Workflows   |
| `/v1/completions`          | Legacy-Textvervollständigungen | Ältere Tools mit „prompt:“ |
| `/v1/embeddings`           | Texteinbettungen               | RAG, Suche                 |
| `/v1/images/generations`   | Bilderzeugung                  | DALL-E, Flux usw.          |
| `/v1/audio/speech`         | Text-zu-Sprache                | ElevenLabs, OpenAI TTS     |
| `/v1/audio/transcriptions` | Speech-to-Text                 | Deepgram, AssemblyAI       | --- |

## Fehlerbehebung

| Fehler                           | Ursache                          | Fix                                                             |
| -------------------------------- | -------------------------------- | --------------------------------------------------------------- | --- |
| `Verbindung abgelehnt`           | OmniRoute wird nicht ausgeführt  | `pm2 start omniroute`                                           |
| `401 Nicht autorisiert`          | Falscher API-Schlüssel           | Checken Sie „/dashboard/api-manager“ ein                        |
| „Keine Kombination konfiguriert“ | Keine aktive Routing-Kombination | Einrichten in „/dashboard/combos“                               |
| „ungültiges Modell“              | Modell nicht im Katalog          | Verwenden Sie „auto“ oder überprüfen Sie „/dashboard/providers“ |
| CLI zeigt „nicht installiert“    | an Binärdatei nicht im PATH      | Überprüfen Sie „welcher <Befehl>“                               |
| `kiro-cli: nicht gefunden`       | Nicht in PATH                    | `export PATH="$HOME/.local/bin:$PATH"`                          | --- |

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
