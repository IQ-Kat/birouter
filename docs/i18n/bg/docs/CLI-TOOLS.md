# CLI Tools Setup Guide — OmniRoute (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

Това ръководство обяснява как да инсталирате и конфигурирате всички поддържани CLI инструменти за AI кодиране
да използвате**OmniRoute**като унифициран бекенд, който ви дава централизирано управление на ключове,
проследяване на разходите, превключване на модели и регистриране на заявки във всеки инструмент.---

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

**Ползи:**

- Един API ключ за управление на всички инструменти
- Проследяване на разходите във всички CLI в таблото за управление
- Превключване на модел без преконфигуриране на всеки инструмент
- Работи локално и на отдалечени сървъри (VPS)---

## Supported Tools (Dashboard Source of Truth)

Картите на таблото за управление в `/dashboard/cli-tools` се генерират от `src/shared/constants/cliTools.ts`.
Текущ списък (v3.0.0-rc.16):

| Инструмент         | ID               | Команда        | Режим на настройка | Метод на инсталиране |
| ------------------ | ---------------- | -------------- | ------------------ | -------------------- | -------------------------------------------- |
| **Клод Код**       | `клод`           | `клод`         | env                | npm                  |
| **OpenAI Codex**   | `кодекс`         | `кодекс`       | обичай             | npm                  |
| **Фабричен дроид** | `дроид`          | `дроид`        | обичай             | в пакет/CLI          |
| **OpenClaw**       | `openclaw`       | `openclaw`     | обичай             | в пакет/CLI          |
| **Курсор**         | `курсор`         | приложение     | ръководство        | настолно приложение  |
| **Клайн**          | `cline`          | `cline`        | обичай             | npm                  |
| **Kilo Code**      | `килограм`       | `килокод`      | обичай             | npm                  |
| **Продължи**       | `продължи`       | разширение     | ръководство        | VS код               |
| **Антигравитация** | `антигравитация` | вътрешен       | митм               | OmniRoute            |
| **GitHub Copilot** | `втори пилот`    | разширение     | обичай             | VS код               |
| **OpenCode**       | `отворен код`    | `отворен код`  | ръководство        | npm                  |
| **Киро AI**        | `киро`           | приложение/кли | митм               | работен плот/CLI     | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` и `Settings > CLI Fingerprint` използват `src/shared/constants/cliCompatProviders.ts`.
Това поддържа идентификаторите на доставчици в съответствие с CLI картите и наследените идентификатори.

| CLI ID                                                                                               | ID на доставчика на пръстови отпечатъци |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `килограм`                                                                                           | `килокод`                               |
| `втори пилот`                                                                                        | `github`                                |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | същия ID                                |

Наследените идентификатори все още се приемат за съвместимост: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Отворете таблото за управление на OmniRoute →**API Manager**(`/dashboard/api-manager`)
2. Щракнете върху**Създаване на API ключ**
3. Дайте му име (напр. `cli-tools`) и изберете всички разрешения
4. Копирайте ключа — ще ви трябва за всеки CLI по-долу

> Вашият ключ изглежда така: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Всички базирани на npm инструменти изискват Node.js 18+:```bash

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

**Потвърдете:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Добавете към `~/.bashrc` (или `~/.zshrc`), след което стартирайте `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> За**отдалечен сървър**заменете `localhost:20128` с IP адреса на сървъра или домейна,
> напр. `http://192.168.0.15:20128`.---

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

**Тест:**`claude "кажи здравей"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Тест:**`кодекс "колко е 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Тест:**`отворен код`---

### Cline (CLI or VS Code)

**CLI режим:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS кодов режим:**
Настройки на разширението на Cline → Доставчик на API: `Съвместим с OpenAI` → Основен URL: `http://localhost:20128/v1`

Или използвайте таблото OmniRoute →**CLI Tools → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**CLI режим:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Настройки на VS кода:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Или използвайте таблото OmniRoute →**CLI Tools → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Редактирайте `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Рестартирайте VS Code след редактиране.---

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

> **Забележка:**Cursor маршрутизира заявките през своя облак. За интеграция на OmniRoute,
> активирайте**Крайна точка в облака**в настройките на OmniRoute и използвайте URL адреса на обществения си домейн.

Чрез GUI:**Настройки → Модели → OpenAI API ключ**

- Основен URL адрес: `https://your-domain.com/v1`
- API ключ: вашият OmniRoute ключ---

## Dashboard Auto-Configuration

Таблото OmniRoute автоматизира конфигурацията за повечето инструменти:

1. Отидете на `http://localhost:20128/dashboard/cli-tools`
2. Разгънете произволна карта с инструменти
3. Изберете вашия API ключ от падащото меню
4. Щракнете върху**Apply Config**(ако инструментът бъде открит като инсталиран)
5. Или копирайте ръчно генерирания конфигурационен фрагмент---

## Built-in Agents: Droid & OpenClaw

**Droid**и**OpenClaw**са AI агенти, вградени директно в OmniRoute — не е необходима инсталация.
Те се изпълняват като вътрешни маршрути и автоматично използват модела на OmniRoute.

- Достъп: `http://localhost:20128/dashboard/agents`
- Конфигуриране: същите комбинации и доставчици като всички други инструменти
- Не се изисква инсталиране на API ключ или CLI---

## Available API Endpoints

| Крайна точка               | Описание                           | Използвайте за                             |
| -------------------------- | ---------------------------------- | ------------------------------------------ | --- |
| `/v1/chat/completions`     | Стандартен чат (всички доставчици) | Всички съвременни инструменти              |
| `/v1/отговори`             | API за отговори (формат OpenAI)    | Codex, агентски работни процеси            |
| `/v1/завършвания`          | Наследени довършвания на текст     | По-стари инструменти, използващи `prompt:` |
| `/v1/вграждания`           | Вграждане на текст                 | RAG, търсене                               |
| `/v1/images/generations`   | Генериране на изображения          | DALL-E, Flux и др.                         |
| `/v1/audio/speech`         | Преобразуване на текст в реч       | ElevenLabs, OpenAI TTS                     |
| `/v1/audio/transcriptions` | Преобразуване на реч в текст       | Deepgram, AssemblyAI                       | --- |

## Отстраняване на проблеми

| Грешка                          | Причина                                   | Поправете                                                |
| ------------------------------- | ----------------------------------------- | -------------------------------------------------------- | --- |
| `Връзката е отказана`           | OmniRoute не работи                       | `pm2 стартиране на omniroute`                            |
| „401 неразрешено“               | Грешен API ключ                           | Проверете в `/dashboard/api-manager`                     |
| `Няма конфигурирана комбинация` | Няма активна комбинация за маршрутизиране | Настройте в `/dashboard/combos`                          |
| `невалиден модел`               | Моделът не е в каталога                   | Използвайте `auto` или маркирайте `/dashboard/providers` |
| CLI показва „не е инсталирано“  | Двоичният файл не е в PATH                | Проверете `коя <команда>`                                |
| `kiro-cli: не е намерено`       | Не е в PATH                               | `export PATH="$HOME/.local/bin:$PATH"`                   | --- |

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
