# CLI Tools Setup Guide — OmniRoute (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Questa guida spiega come installare e configurare tutti gli strumenti CLI di codifica AI supportati
utilizzare**OmniRoute**come backend unificato, offrendoti una gestione centralizzata delle chiavi,
monitoraggio dei costi, cambio di modello e registrazione delle richieste su ogni strumento.---

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

**Vantaggi:**

- Una chiave API per gestire tutti gli strumenti
- Monitoraggio dei costi su tutte le CLI nella dashboard
- Model switching without reconfiguring every tool
- Funziona localmente e su server remoti (VPS)---

## Supported Tools (Dashboard Source of Truth)

Le schede dashboard in `/dashboard/cli-tools` sono generate da `src/shared/constants/cliTools.ts`.
Elenco attuale (v3.0.0-rc.16):

| Strumento              | ID                | Comando      | Modalità di configurazione | Metodo di installazione |
| ---------------------- | ----------------- | ------------ | -------------------------- | ----------------------- | -------------------------------------------- |
| **Codice Claude**      | `claude`          | `claude`     | inv                        | npm                     |
| **Codice OpenAI**      | `codex`           | `codice`     | personalizzato             | npm                     |
| **Droide di fabbrica** | "droide"          | "droide"     | personalizzato             | in bundle/CLI           |
| **OpenClaw**           | `artiglio aperto` | `openclaw`   | custom                     | bundled/CLI             |
| **Cursor**             | `cursore`         | applicazione | guida                      | desktop app             |
| **Cline**              | `cline`           | `clino`      | custom                     | npm                     |
| **Kilo Code**          | `chilo`           | `kilocode`   | personalizzato             | npm                     |
| **Continue**           | `continue`        | extension    | guide                      | Codice VS               |
| **Antigravità**        | `antigravità`     | interno      | mitm                       | OmniRoute               |
| **Copilota GitHub**    | `copilota`        | estensione   | personalizzato             | Codice VS               |
| **OpenCode**           | "opencode"        | "opencode"   | guida                      | npm                     |
| **Kiro AI**            | `kirò`            | app/cli      | mimm                       | desktop/CLI             | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` and `Settings > CLI Fingerprint` use `src/shared/constants/cliCompatProviders.ts`.
This keeps provider IDs aligned with CLI cards and legacy IDs.

| CLI ID                                                                                               | ID fornitore di impronte digitali |
| ---------------------------------------------------------------------------------------------------- | --------------------------------- |
| `kilo`                                                                                               | `kilocodice`                      |
| `copilot`                                                                                            | "github"                          |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | stesso ID                         |

Legacy IDs still accepted for compatibility: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Apri il dashboard di OmniRoute →**Gestore API**(`/dashboard/api-manager`)
2. Fai clic su**Crea chiave API**
3. Dagli un nome (ad esempio "cli-tools") e seleziona tutte le autorizzazioni
4. Copia la chiave: ti servirà per ogni CLI riportata di seguito

> La tua chiave è simile a: "sk-xxxxxxxxxxxxxxxxxx-xxxxxxxxx".---

## Step 2 — Install CLI Tools

Tutti gli strumenti basati su npm richiedono Node.js 18+:```bash

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

**Verificare:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Aggiungi a `~/.bashrc` (o `~/.zshrc`), quindi esegui `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Per un**server remoto**sostituisci `localhost:20128` con l'IP o il dominio del server,
> ad es. "http://192.168.0.15:20128".---

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

**Test:**`claude "saluta"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`codice "quanto fa 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test:**"opencode".---

### Cline (CLI or VS Code)

**Modalità CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Modalità VS Codice:**
Impostazioni estensione Cline → Provider API: `Compatibile con OpenAI` → URL di base: `http://localhost:20128/v1`

Oppure utilizza il dashboard OmniRoute →**Strumenti CLI → Cline → Applica configurazione**.---

### KiloCode (CLI or VS Code)

**Modalità CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Impostazioni VS Code:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Oppure utilizza il dashboard OmniRoute →**Strumenti CLI → KiloCode → Applica configurazione**.---

### Continue (VS Code Extension)

Modifica `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Riavvia VS Code dopo la modifica.---

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

> **Nota:**Il cursore instrada le richieste attraverso il suo cloud. Per l'integrazione OmniRoute,
> attiva**Endpoint cloud**nelle Impostazioni OmniRoute e utilizza l'URL del tuo dominio pubblico.

Tramite GUI:**Impostazioni → Modelli → Chiave API OpenAI**

- URL di base: "https://tuo-dominio.com/v1".
- Chiave API: la tua chiave OmniRoute---

## Dashboard Auto-Configuration

Il dashboard OmniRoute automatizza la configurazione per la maggior parte degli strumenti:

1. Vai su "http://localhost:20128/dashboard/cli-tools".
2. Espandere qualsiasi scheda strumento
3. Seleziona la tua chiave API dal menu a discesa
4. Fare clic su**Applica configurazione**(se lo strumento viene rilevato come installato)
5. Oppure copia manualmente lo snippet di configurazione generato---

## Built-in Agents: Droid & OpenClaw

**Droid**e**OpenClaw**sono agenti IA integrati direttamente in OmniRoute: non è necessaria alcuna installazione.
Vengono eseguiti come percorsi interni e utilizzano automaticamente il modello di routing di OmniRoute.

- Accesso: `http://localhost:20128/dashboard/agents`
- Configura: stesse combinazioni e provider di tutti gli altri strumenti
- Non è richiesta alcuna chiave API o installazione CLI---

## Available API Endpoints

| Punto finale               | Descrizione                       | Utilizzare per                                  |
| -------------------------- | --------------------------------- | ----------------------------------------------- | --- |
| `/v1/chat/completamenti`   | Chat standard (tutti i fornitori) | Tutti gli strumenti moderni                     |
| `/v1/risposte`             | API di risposta (formato OpenAI)  | Codex, flussi di lavoro agentici                |
| `/v1/completamenti`        | Completamenti di testo legacy     | Strumenti meno recenti che utilizzano `prompt:` |
| `/v1/embedding`            | Incorporamenti di testo           | RAG, cerca                                      |
| `/v1/immagini/generazioni` | Generazione di immagini           | DALL-E, Flux, ecc.                              |
| `/v1/audio/discorso`       | Sintesi vocale                    | ElevenLabs, OpenAI TTS                          |
| `/v1/audio/trascrizioni`   | Discorso in testo                 | Deepgram, AssembleaAI                           | --- |

## Risoluzione dei Problemi

| Errore                         | Causa                                  | Correzione                                         |
| ------------------------------ | -------------------------------------- | -------------------------------------------------- | --- |
| `Connessione rifiutata`        | OmniRoute non in esecuzione            | `pm2 avvia omniroute`                              |
| "401 Non autorizzato"          | Chiave API errata                      | Controlla in `/dashboard/api-manager`              |
| `Nessuna combo configurata`    | Nessuna combinazione di routing attiva | Configurato in `/dashboard/combos`                 |
| `modello non valido`           | Modello fuori catalogo                 | Utilizza `auto` o seleziona `/dashboard/providers` |
| La CLI mostra "non installato" | Binario non in PATH                    | Seleziona "quale <comando>"                        |
| `kiro-cli: non trovato`        | Non nel PERCORSO                       | `export PATH="$HOME/.local/bin:$PATH"`             | --- |

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
