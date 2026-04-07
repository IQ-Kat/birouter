# CLI Tools Setup Guide — OmniRoute (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Esta guía explica cómo instalar y configurar todas las herramientas CLI de codificación AI compatibles.
utilizar**OmniRoute**como backend unificado, brindándole administración de claves centralizada,
seguimiento de costos, cambio de modelo y registro de solicitudes en cada herramienta.---

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

**Beneficios:**

- Una clave API para gestionar todas las herramientas
- Seguimiento de costos en todas las CLI en el panel
- Cambio de modelo sin reconfigurar cada herramienta
- Funciona localmente y en servidores remotos (VPS)---

## Supported Tools (Dashboard Source of Truth)

Las tarjetas del panel en `/dashboard/cli-tools` se generan desde `src/shared/constants/cliTools.ts`.
Lista actual (v3.0.0-rc.16):

| Herramienta            | identificación   | Comando          | Modo de configuración | Método de instalación    |
| ---------------------- | ---------------- | ---------------- | --------------------- | ------------------------ | -------------------------------------------- |
| **Código Claude**      | `claude`         | `claude`         | entorno               | mpn                      |
| **Códice OpenAI**      | `códice`         | `códice`         | personalizado         | mpn                      |
| **Droide de fábrica**  | `droide`         | `droide`         | personalizado         | incluido/CLI             |
| **OpenClaw**           | `garra abierta`  | `garra abierta`  | personalizado         | incluido/CLI             |
| **Cursor**             | `cursor`         | aplicación       | guía                  | aplicación de escritorio |
| **Clina**              | `clina`          | `clina`          | personalizado         | mpn                      |
| **Código Kilo**        | `kilo`           | `kilocódigo`     | personalizado         | mpn                      |
| **Continuar**          | `continuar`      | extensión        | guía                  | Código VS                |
| **Antigravedad**       | `antigravedad`   | interno          | mitm                  | OmniRuta                 |
| **Copiloto de GitHub** | `copiloto`       | extensión        | personalizado         | Código VS                |
| **Código Abierto**     | `código abierto` | `código abierto` | guía                  | mpn                      |
| **Kiro IA**            | `kiro`           | aplicación/cli   | mitm                  | escritorio/CLI           | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` y `Configuración > CLI Fingerprint` usan `src/shared/constants/cliCompatProviders.ts`.
Esto mantiene las identificaciones de los proveedores alineadas con las tarjetas CLI y las identificaciones heredadas.

| ID CLI                                                                                               | ID del proveedor de huellas dactilares |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `kilo`                                                                                               | `kilocódigo`                           |
| `copiloto`                                                                                           | `github`                               |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | misma identificación                   |

Aún se aceptan ID heredados por compatibilidad: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Abra el panel de OmniRoute →**Administrador de API**(`/dashboard/api-manager`)
2. Haga clic en**Crear clave API**
3. Asígnele un nombre (por ejemplo, `cli-tools`) y seleccione todos los permisos.
4. Copie la clave; la necesitará para cada CLI a continuación

> Su clave se ve así: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Todas las herramientas basadas en npm requieren Node.js 18+:```bash

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

Agregue a `~/.bashrc` (o `~/.zshrc`), luego ejecute `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Para un**servidor remoto**reemplace `localhost:20128` con la IP o el dominio del servidor,
> por ej. `http://192.168.0.15:20128`.---

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

**Prueba:**`claude "saluda"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Prueba:**`codex "¿qué es 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Prueba:**`código abierto`---

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
Configuración de la extensión Cline → Proveedor API: `Compatible con OpenAI` → URL base: `http://localhost:20128/v1`

O utilice el panel de OmniRoute →**Herramientas CLI → Cline → Aplicar configuración**.---

### KiloCode (CLI or VS Code)

**Modo CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Configuración del código VS:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

O utilice el panel de OmniRoute →**Herramientas CLI → KiloCode → Aplicar configuración**.---

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

Reinicie VS Code después de editarlo.---

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

> **Nota:**El cursor enruta las solicitudes a través de su nube. Para la integración de OmniRoute,
> habilite**Cloud Endpoint**en la configuración de OmniRoute y use su URL de dominio público.

A través de GUI:**Configuración → Modelos → Clave API OpenAI**

- URL base: `https://tu-dominio.com/v1`
- Clave API: su clave OmniRoute---

## Dashboard Auto-Configuration

El panel de OmniRoute automatiza la configuración de la mayoría de las herramientas:

1. Vaya a `http://localhost:20128/dashboard/cli-tools`
2. Expanda cualquier tarjeta de herramientas
3. Seleccione su clave API en el menú desplegable.
4. Haga clic en**Aplicar configuración**(si se detecta que la herramienta está instalada)
5. O copie manualmente el fragmento de configuración generado---

## Built-in Agents: Droid & OpenClaw

**Droid**y**OpenClaw**son agentes de IA integrados directamente en OmniRoute, sin necesidad de instalación.
Se ejecutan como rutas internas y utilizan automáticamente el modelo de enrutamiento de OmniRoute.

- Acceso: `http://localhost:20128/dashboard/agents`
- Configurar: los mismos combos y proveedores que todas las demás herramientas
- No se requiere clave API ni instalación CLI---

## Available API Endpoints

| Punto final                 | Descripción                           | Usar para                                    |
| --------------------------- | ------------------------------------- | -------------------------------------------- | --- |
| `/v1/chat/compleciones`     | Chat estándar (todos los proveedores) | Todas las herramientas modernas              |
| `/v1/respuestas`            | API de respuestas (formato OpenAI)    | Codex, flujos de trabajo agentes             |
| `/v1/compleciones`          | Completaciones de textos heredados    | Herramientas más antiguas que usan `prompt:` |
| `/v1/incrustaciones`        | Incrustaciones de texto               | RAG, buscar                                  |
| `/v1/imagenes/generaciones` | Generación de imágenes                | DALL-E, Flujo, etc.                          |
| `/v1/audio/voz`             | Texto a voz                           | ElevenLabs, OpenAI TTS                       |
| `/v1/audio/transcripciones` | Voz a texto                           | Deepgram, AsambleaAI                         | --- |

## Solución de Problemas

| Error                             | Causa                            | Arreglar                                       |
| --------------------------------- | -------------------------------- | ---------------------------------------------- | --- |
| `Conexión rechazada`              | OmniRoute no se está ejecutando  | `pm2 iniciar omniruta`                         |
| `401 No autorizado`               | Clave API incorrecta             | Verifique en `/dashboard/api-manager`          |
| `No hay ningún combo configurado` | Sin combo de enrutamiento activo | Configurar en `/dashboard/combos`              |
| `modelo no válido`                | Modelo no en catálogo            | Utilice `auto` o marque `/dashboard/providers` |
| CLI muestra "no instalado"        | Binario no en RUTA               | Marque `cuál <comando>`                        |
| `kiro-cli: no encontrado`         | No en RUTA                       | `exportar RUTA="$HOME/.local/bin:$RUTA"`       | --- |

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
