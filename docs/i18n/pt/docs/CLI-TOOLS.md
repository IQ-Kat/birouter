# CLI Tools Setup Guide — OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Este guia explica como instalar e configurar todas as ferramentas CLI de codificação de IA suportadas
usar o**OmniRoute**como back-end unificado, proporcionando gerenciamento centralizado de chaves,
rastreamento de custos, troca de modelo e registro de solicitações em todas as ferramentas.---

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

**Benefícios:**

- Uma chave API para gerenciar todas as ferramentas
- Acompanhamento de custos em todas as CLIs no painel
- Troca de modelo sem reconfigurar todas as ferramentas
- Funciona localmente e em servidores remotos (VPS)---

## Supported Tools (Dashboard Source of Truth)

Os cartões do painel em `/dashboard/cli-tools` são gerados a partir de `src/shared/constants/cliTools.ts`.
Lista atual (v3.0.0-rc.16):

| Ferramenta             | ID              | Comando        | Modo de configuração | Método de instalação  |
| ---------------------- | --------------- | -------------- | -------------------- | --------------------- | -------------------------------------------- |
| **Código Claude**      | `cláudio`       | `cláudio`      | ambiente             | npm                   |
| **Códice OpenAI**      | `códice`        | `códice`       | personalizado        | npm                   |
| **Droid de fábrica**   | `dróide`        | `dróide`       | personalizado        | empacotado/CLI        |
| **OpenClaw**           | `garra aberta`  | `garra aberta` | personalizado        | empacotado/CLI        |
| **Cursor**             | `cursor`        | aplicativo     | guia                 | aplicativo de desktop |
| **Cline**              | `cline`         | `cline`        | personalizado        | npm                   |
| **Código Quilo**       | `quilo`         | `quilocódigo`  | personalizado        | npm                   |
| **Continuar**          | `continuar`     | extensão       | guia                 | Código VS             |
| **Antigravidade**      | `antigravidade` | interno        | mitim                | OmniRoute             |
| **Copiloto do GitHub** | `copiloto`      | extensão       | personalizado        | Código VS             |
| **CódigoAberto**       | `opencode`      | `opencode`     | guia                 | npm                   |
| **Kiro IA**            | `kiro`          | aplicativo/cli | mitim                | área de trabalho/CLI  | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` e `Settings > CLI Fingerprint` usam `src/shared/constants/cliCompatProviders.ts`.
Isso mantém os IDs do provedor alinhados com os cartões CLI e os IDs legados.

| ID CLI                                                                                                 | ID do provedor de impressão digital |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `quilo`                                                                                                | `quilocódigo`                       |
| `copiloto`                                                                                             | `github`                            |
| `claude` / `codex` / `antigravidade` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | mesmo ID                            |

IDs legados ainda aceitos para compatibilidade: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Abra o painel do OmniRoute →**API Manager**(`/dashboard/api-manager`)
2. Clique em**Criar chave de API**
3. Dê um nome (por exemplo, `cli-tools`) e selecione todas as permissões
4. Copie a chave – você precisará dela para cada CLI abaixo

> Sua chave se parece com: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Todas as ferramentas baseadas em npm requerem Node.js 18+:```bash

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

**Verificar:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Adicione a `~/.bashrc` (ou `~/.zshrc`) e execute `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Para um**servidor remoto**substitua `localhost:20128` pelo IP do servidor ou domínio,
> por exemplo `http://192.168.0.15:20128`.---

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

**Teste:**`claude "diga olá"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Teste:**`códice "o que é 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Teste:**`opencode`---

### Cline (CLI or VS Code)

**Modo CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Modo de código VS:**
Configurações de extensão Cline → Provedor de API: `Compatível com OpenAI` → URL base: `http://localhost:20128/v1`

Ou use o painel do OmniRoute →**Ferramentas CLI → Cline → Aplicar configuração**.---

### KiloCode (CLI or VS Code)

**Modo CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Configurações do código VS:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Ou use o painel do OmniRoute →**Ferramentas CLI → KiloCode → Aplicar configuração**.---

### Continue (VS Code Extension)

Edite `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Reinicie o VS Code após a edição.---

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

> **Observação:**O cursor roteia solicitações por meio de sua nuvem. Para integração OmniRoute,
> habilite o**Cloud Endpoint**nas configurações do OmniRoute e use seu URL de domínio público.

Via GUI:**Configurações → Modelos → Chave API OpenAI**

- URL base: `https://seu-domínio.com/v1`
- Chave API: sua chave OmniRoute---

## Dashboard Auto-Configuration

O painel OmniRoute automatiza a configuração da maioria das ferramentas:

1. Vá para `http://localhost:20128/dashboard/cli-tools`
2. Expanda qualquer cartão de ferramenta
3. Selecione sua chave API no menu suspenso
4. Clique em**Aplicar configuração**(se a ferramenta for detectada como instalada)
5. Ou copie o snippet de configuração gerado manualmente---

## Built-in Agents: Droid & OpenClaw

**Droid**e**OpenClaw**são agentes de IA integrados diretamente no OmniRoute — sem necessidade de instalação.
Eles são executados como rotas internas e usam o modelo de roteamento do OmniRoute automaticamente.

- Acesso: `http://localhost:20128/dashboard/agents`
- Configurar: mesmos combos e provedores de todas as outras ferramentas
- Nenhuma chave API ou instalação CLI necessária---

## Available API Endpoints

| Ponto final              | Descrição                              | Usar para                                 |
| ------------------------ | -------------------------------------- | ----------------------------------------- | --- |
| `/v1/chat/completions`   | Bate-papo padrão (todos os provedores) | Todas as ferramentas modernas             |
| `/v1/respostas`          | API de respostas (formato OpenAI)      | Codex, fluxos de trabalho de agente       |
| `/v1/conclusões`         | Conclusões de texto legado             | Ferramentas mais antigas usando `prompt:` |
| `/v1/embeddings`         | Incorporações de texto                 | RAG, pesquisa                             |
| `/v1/imagens/gerações`   | Geração de imagens                     | DALL-E, Fluxo, etc.                       |
| `/v1/áudio/fala`         | Conversão de texto para fala           | ElevenLabs, OpenAI TTS                    |
| `/v1/áudio/transcrições` | Fala para texto                        | Deepgram, AssemblyAI                      | --- |

## Resolução de Problemas

| Erro                       | Causa                                  | Correção                                    |
| -------------------------- | -------------------------------------- | ------------------------------------------- | --- |
| `Conexão recusada`         | OmniRoute não está em execução         | `pm2 iniciar omniroute`                     |
| `401 Não autorizado`       | Chave de API errada                    | Verifique em `/dashboard/api-manager`       |
| `Nenhum combo configurado` | Nenhuma combinação de roteamento ativa | Configure em `/dashboard/combos`            |
| `modelo inválido`          | Modelo não em catálogo                 | Use `auto` ou marque `/dashboard/providers` |
| CLI mostra "não instalado" | Binário não está em PATH               | Verifique `qual <comando>`                  |
| `kiro-cli: não encontrado` | Não está em PATH                       | `exportar PATH="$HOME/.local/bin:$PATH"`    | --- |

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
