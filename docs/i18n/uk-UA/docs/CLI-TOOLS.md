# CLI Tools Setup Guide — OmniRoute (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

У цьому посібнику пояснюється, як встановити та налаштувати всі підтримувані інструменти CLI кодування AI
використовувати**OmniRoute**як уніфіковану серверну частину, що забезпечує централізоване керування ключами,
відстеження витрат, перемикання моделей і журналювання запитів у кожному інструменті.---

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

**Переваги:**

- Один ключ API для керування всіма інструментами
- Відстеження витрат у всіх CLI на інформаційній панелі
- Перемикання моделі без переналаштування кожного інструменту
- Працює локально та на віддалених серверах (VPS)---

## Supported Tools (Dashboard Source of Truth)

Картки інформаційної панелі в `/dashboard/cli-tools` створюються з `src/shared/constants/cliTools.ts`.
Поточний список (v3.0.0-rc.16):

| Інструмент           | ID               | Команда         | Режим налаштування | Метод встановлення |
| -------------------- | ---------------- | --------------- | ------------------ | ------------------ | -------------------------------------------- |
| **Клод Код**         | `клод`           | `клод`          | env                | npm                |
| **Кодекс OpenAI**    | `кодекс`         | `кодекс`        | звичай             | npm                |
| **Заводський дроїд** | `дроїд`          | `дроїд`         | звичай             | у комплекті/CLI    |
| **OpenClaw**         | `openclaw`       | `openclaw`      | звичай             | у комплекті/CLI    |
| **Курсор**           | `курсор`         | додаток         | керівництво        | настільна програма |
| **Клайн**            | `cline`          | `cline`         | звичай             | npm                |
| **Код кілограмів**   | `кілограм`       | `кілокод`       | звичай             | npm                |
| **Продовжити**       | `продовжити`     | розширення      | керівництво        | Код VS             |
| **Антигравітація**   | `антигравітація` | внутрішні       | mitm               | OmniRoute          |
| **GitHub Copilot**   | `другий пілот`   | розширення      | звичай             | Код VS             |
| **OpenCode**         | `відкритий код`  | `відкритий код` | керівництво        | npm                |
| **Кіро А.І.**        | `kiro`           | додаток/cli     | mitm               | робочий стіл/CLI   | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` і `Settings > CLI Fingerprint` використовують `src/shared/constants/cliCompatProviders.ts`.
Це зберігає ідентифікатори постачальників узгодженими з картками CLI та застарілими ідентифікаторами.

| Ідентифікатор CLI                                                                                    | ID постачальника відбитків пальців |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `кілограм`                                                                                           | `кілокод`                          |
| `другий пілот`                                                                                       | `github`                           |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | той же ID                          |

Застарілі ідентифікатори все ще приймаються для сумісності: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Відкрийте інформаційну панель OmniRoute →**API Manager**(`/dashboard/api-manager`)
2. Натисніть**Створити ключ API**
3. Дайте йому назву (наприклад, `cli-tools`) і виберіть усі дозволи
4. Скопіюйте ключ — він знадобиться для кожного CLI нижче

> Ваш ключ виглядає так: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Усі інструменти на основі npm вимагають Node.js 18+:```bash

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

**Підтвердити:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Додайте до `~/.bashrc` (або `~/.zshrc`), потім запустіть `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Для**віддаленого сервера**замініть `localhost:20128` на IP або домен сервера,
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

**Тест:**`claude "say hello"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Тест:**`кодекс "що таке 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Тест:**`відкритий код`---

### Cline (CLI or VS Code)

**Режим CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Режим коду VS:**
Налаштування розширення Cline → Постачальник API: `Сумісність з OpenAI` → Основна URL-адреса: `http://localhost:20128/v1`

Або скористайтеся інформаційною панеллю OmniRoute →**Інструменти CLI → Cline → Застосувати конфігурацію**.---

### KiloCode (CLI or VS Code)

**Режим CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Налаштування коду VS:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Або скористайтеся інформаційною панеллю OmniRoute →**Інструменти CLI → KiloCode → Застосувати конфігурацію**.---

### Continue (VS Code Extension)

Відредагуйте `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Перезапустіть код VS після редагування.---

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

> **Примітка:**Курсор направляє запити через свою хмару. Для інтеграції OmniRoute,
> увімкніть**Cloud Endpoint**у налаштуваннях OmniRoute і використовуйте URL-адресу загальнодоступного домену.

Через GUI:**Налаштування → Моделі → Ключ OpenAI API**

- Базова URL-адреса: `https://your-domain.com/v1`
- Ключ API: ваш ключ OmniRoute---

## Dashboard Auto-Configuration

Інформаційна панель OmniRoute автоматизує налаштування більшості інструментів:

1. Перейдіть до `http://localhost:20128/dashboard/cli-tools`
2. Розгорніть будь-яку картку інструментів
3. Виберіть свій ключ API зі спадного списку
4. Натисніть**Застосувати конфігурацію**(якщо інструмент виявлено як встановлений)
5. Або скопіюйте згенерований фрагмент конфігурації вручну---

## Built-in Agents: Droid & OpenClaw

**Droid**і**OpenClaw**— це агенти штучного інтелекту, вбудовані безпосередньо в OmniRoute — інсталяція не потрібна.
Вони запускаються як внутрішні маршрути та автоматично використовують модель маршрутизації OmniRoute.

- Доступ: `http://localhost:20128/dashboard/agents`
- Налаштування: ті самі комбінації та постачальники, що й усі інші інструменти
- Не потрібно встановлювати ключ API або CLI---

## Available API Endpoints

| Кінцева точка              | Опис                             | Використовувати для                          |
| -------------------------- | -------------------------------- | -------------------------------------------- | --- |
| `/v1/chat/completions`     | Стандартний чат (всі провайдери) | Всі сучасні засоби                           |
| `/v1/відповіді`            | Responses API (формат OpenAI)    | Codex, агентські робочі процеси              |
| `/v1/completions`          | Старі доповнення тексту          | Старіші інструменти використовують `prompt:` |
| `/v1/вбудовування`         | Текстові вставки                 | РАГ, пошук                                   |
| `/v1/images/generations`   | Генерація зображення             | DALL-E, Flux тощо                            |
| `/v1/audio/speech`         | Синтез мовлення                  | ElevenLabs, OpenAI TTS                       |
| `/v1/audio/transcriptions` | Перетворення мови в текст        | Deepgram, AssemblyAI                         | --- |

## Усунення несправностей

| Помилка                      | Причина                                 | Виправити                                                 |
| ---------------------------- | --------------------------------------- | --------------------------------------------------------- | --- |
| `Відмовлено в підключенні`   | OmniRoute не працює                     | `pm2 почати omniroute`                                    |
| `401 Неавторизовано`         | Неправильний ключ API                   | Перевірте `/dashboard/api-manager`                        |
| `Комбо не налаштовано`       | Немає активної комбінації маршрутизації | Налаштувати в `/dashboard/combos`                         |
| `недійсна модель`            | Модель відсутня в каталозі              | Використовуйте `auto` або позначте `/dashboard/providers` |
| CLI показує «не встановлено» | Двійковий файл не в PATH                | Перевірте `яка <команда>`                                 |
| `kiro-cli: не знайдено`      | Не в PATH                               | `експорт PATH="$HOME/.local/bin:$PATH"`                   | --- |

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
