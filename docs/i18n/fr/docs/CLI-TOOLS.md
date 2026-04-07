# CLI Tools Setup Guide — OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Ce guide explique comment installer et configurer tous les outils CLI de codage AI pris en charge.
d'utiliser**OmniRoute**comme backend unifié, vous offrant une gestion centralisée des clés,
suivi des coûts, changement de modèle et journalisation des demandes dans chaque outil.---

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

**Avantages :**

- Une clé API pour gérer tous les outils
- Suivi des coûts sur toutes les CLI dans le tableau de bord
- Changement de modèle sans reconfigurer chaque outil
- Fonctionne localement et sur des serveurs distants (VPS)---

## Supported Tools (Dashboard Source of Truth)

Les cartes de tableau de bord dans `/dashboard/cli-tools` sont générées à partir de `src/shared/constants/cliTools.ts`.
Liste actuelle (v3.0.0-rc.16) :

| Outil               | ID               | Commande         | Mode de configuration | Méthode d'installation |
| ------------------- | ---------------- | ---------------- | --------------------- | ---------------------- | -------------------------------------------- |
| **Claude Code**     | `claude`         | `claude`         | env                   | npm                    |
| **Codex OpenAI**    | `codex`          | `codex`          | personnalisé          | npm                    |
| **Droïde d'usine**  | `droïde`         | `droïde`         | personnalisé          | groupé/CLI             |
| **OpenClaw**        | `griffe ouverte` | `griffe ouverte` | personnalisé          | groupé/CLI             |
| **Curseur**         | `curseur`        | application      | guider                | application de bureau  |
| **Clin**            | `cline`          | `cline`          | personnalisé          | npm                    |
| **Code kilo**       | `kilo`           | `kilocode`       | personnalisé          | npm                    |
| **Continuer**       | `continuer`      | rallonge         | guider                | Code VS                |
| **Antigravité**     | `antigravité`    | interne          | mitm                  | OmniRoute              |
| **Copilote GitHub** | `copilote`       | rallonge         | personnalisé          | Code VS                |
| **OpenCode**        | `code ouvert`    | `code ouvert`    | guider                | npm                    |
| **Kiro AI**         | `kiro`           | app/cli          | mitm                  | bureau/CLI             | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` et `Paramètres > CLI Fingerprint` utilisent `src/shared/constants/cliCompatProviders.ts`.
Cela permet de maintenir les ID de fournisseur alignés sur les cartes CLI et les ID hérités.

| ID CLI                                                                                                | ID du fournisseur d’empreintes digitales |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `kilo`                                                                                                | `kilocode`                               |
| `copilote`                                                                                            | `github`                                 |
| `claude` / `codex` / `antigravité` / `kiro` / `curseur` / `cline` / `opencode` / `droid` / `openclaw` | même identifiant                         |

Les anciens identifiants sont toujours acceptés pour des raisons de compatibilité : `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Ouvrez le tableau de bord OmniRoute →**API Manager**(`/dashboard/api-manager`)
2. Cliquez sur**Créer une clé API**
3. Donnez-lui un nom (par exemple `cli-tools`) et sélectionnez toutes les autorisations
4. Copiez la clé : vous en aurez besoin pour chaque CLI ci-dessous

> Votre clé ressemble à : `sk-xxxxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Tous les outils basés sur NPM nécessitent Node.js 18+ :```bash

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

**Vérifier:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Ajoutez à `~/.bashrc` (ou `~/.zshrc`), puis exécutez `source ~/.bashrc` :```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Pour un**serveur distant**remplacez `localhost:20128` par l'IP ou le domaine du serveur,
> par ex. « http://192.168.0.15:20128 ».---

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

**Test :**`claude "dis bonjour"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test :**`codex "qu'est-ce que 2+2 ?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test :**`opencode`---

### Cline (CLI or VS Code)

**Mode CLI :**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Mode VS Code :**
Paramètres de l'extension Cline → Fournisseur API : `OpenAI Compatible` → URL de base : `http://localhost:20128/v1`

Ou utilisez le tableau de bord OmniRoute →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**Mode CLI :**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Paramètres du code VS :**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Ou utilisez le tableau de bord OmniRoute →**CLI Tools → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Modifiez `~/.continue/config.yaml` :```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Redémarrez VS Code après l'édition.---

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

> **Remarque :**Le curseur achemine les requêtes via son cloud. Pour l'intégration OmniRoute,
> activez**Cloud Endpoint**dans les paramètres OmniRoute et utilisez votre URL de domaine public.

Via l'interface graphique :**Paramètres → Modèles → Clé API OpenAI**

- URL de base : `https://votre-domaine.com/v1`
- Clé API : votre clé OmniRoute---

## Dashboard Auto-Configuration

Le tableau de bord OmniRoute automatise la configuration de la plupart des outils :

1. Accédez à « http://localhost:20128/dashboard/cli-tools »
2. Développez n'importe quelle carte d'outils
3. Sélectionnez votre clé API dans la liste déroulante
4. Cliquez sur**Appliquer la configuration**(si l'outil est détecté comme installé)
5. Ou copiez manuellement l'extrait de configuration généré---

## Built-in Agents: Droid & OpenClaw

**Droid**et**OpenClaw**sont des agents IA intégrés directement dans OmniRoute — aucune installation n'est nécessaire.
Ils s'exécutent en tant que routes internes et utilisent automatiquement le modèle de routage d'OmniRoute.

- Accès : `http://localhost:20128/dashboard/agents`
- Configurer : mêmes combos et fournisseurs que tous les autres outils
- Aucune clé API ou installation CLI requise---

## Available API Endpoints

| Point de terminaison       | Descriptif                            | Use For                                 |
| -------------------------- | ------------------------------------- | --------------------------------------- | --- |
| `/v1/chat/completions`     | Chat standard (tous les fournisseurs) | Tous les outils modernes                |
| `/v1/réponses`             | API de réponses (format OpenAI)       | Codex, flux de travail agents           |
| `/v1/achèvements`          | Complétions de texte héritées         | Outils plus anciens utilisant `prompt:` |
| `/v1/intégrations`         | Intégrations de texte                 | RAG, recherche                          |
| `/v1/images/générations`   | Génération d'images                   | DALL-E, Flux, etc.                      |
| `/v1/audio/parole`         | Synthèse vocale                       | ElevenLabs, OpenAI TTS                  |
| `/v1/audio/transcriptions` | Parole-texte                          | Deepgram, AssemblyAI                    | --- |

## Dépannage

| Erreur                       | Parce que                    | Corriger                                           |
| ---------------------------- | ---------------------------- | -------------------------------------------------- | --- |
| `Connexion refusée`          | OmniRoute ne fonctionne pas  | `pm2 démarre omniroute`                            |
| `401 Non autorisé`           | Mauvaise clé API             | Enregistrez-vous dans `/dashboard/api-manager`     |
| `Aucun combo configuré`      | Aucun combo de routage actif | Configurer dans `/dashboard/combos`                |
| `modèle invalide`            | Modèle hors catalogue        | Utilisez `auto` ou vérifiez `/dashboard/providers` |
| CLI affiche « non installé » | Binaire pas dans PATH        | Vérifiez `quelle <commande>`                       |
| `kiro-cli : introuvable`     | Pas dans PATH                | `export PATH="$HOME/.local/bin:$PATH"`             | --- |

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
