# CLI Tools Setup Guide — OmniRoute (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

В этом руководстве объясняется, как установить и настроить все поддерживаемые инструменты CLI для кодирования AI.
использовать**OmniRoute**в качестве единой серверной части, обеспечивающей централизованное управление ключами,
отслеживание затрат, переключение моделей и регистрация запросов для каждого инструмента.---

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

**Преимущества:**

- Один ключ API для управления всеми инструментами
- Отслеживание затрат по всем интерфейсам командной строки на информационной панели.
- Переключение модели без перенастройки каждого инструмента
- Работает локально и на удаленных серверах (VPS)---

## Supported Tools (Dashboard Source of Truth)

Карты информационной панели в `/dashboard/cli-tools` генерируются из `src/shared/constants/cliTools.ts`.
Текущий список (v3.0.0-rc.16):

| Инструмент              | удостоверение личности | Команда           | Режим настройки | Способ установки      |
| ----------------------- | ---------------------- | ----------------- | --------------- | --------------------- | -------------------------------------------- |
| **Код Клода**           | `Клод`                 | `Клод`            | окружение       | НПМ                   |
| **Кодекс OpenAI**       | `кодекс`               | `кодекс`          | обычай          | НПМ                   |
| **Заводской дроид**     | `дроид`                | `дроид`           | обычай          | в комплекте/CLI       |
| **Открытый коготь**     | `открытый коготь`      | `открытый коготь` | обычай          | в комплекте/CLI       |
| **Курсор**              | `курсор`               | приложение        | гид             | настольное приложение |
| **Клайн**               | `клин`                 | `клин`            | обычай          | НПМ                   |
| **Код килограмма**      | `кило`                 | `килокод`         | обычай          | НПМ                   |
| **Продолжить**          | `продолжить`           | расширение        | гид             | Код VS                |
| **Антигравитация**      | `антигравитация`       | внутренний        | митм            | ОмниРоут              |
| **Второй пилот GitHub** | `второй пилот`         | расширение        | обычай          | Код VS                |
| **Открытый код**        | `открытый код`         | `открытый код`    | гид             | НПМ                   |
| **Киро А.И.**           | `киро`                 | приложение/клиент | митм            | рабочий стол/CLI      | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` и `Settings > CLI Fingerprint` используют `src/shared/constants/cliCompatProviders.ts`.
Благодаря этому идентификаторы поставщиков будут соответствовать картам CLI и устаревшим идентификаторам.

| Идентификатор CLI                                                                                    | Идентификатор поставщика отпечатков пальцев |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `кило`                                                                                               | `килокод`                                   |
| `второй пилот`                                                                                       | `гитхаб`                                    |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | тот же идентификатор                        |

Устаревшие идентификаторы по-прежнему принимаются для совместимости: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Откройте панель управления OmniRoute →**Менеджер API**(`/dashboard/api-manager`)
2. Нажмите**Создать ключ API**.
3. Дайте ему имя (например, `cli-tools`) и выберите все разрешения.
4. Скопируйте ключ — он понадобится для каждого интерфейса командной строки ниже.

> Ваш ключ выглядит так: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Для всех инструментов на основе npm требуется Node.js 18+:```bash

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

**Проверять:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Добавьте в `~/.bashrc` (или `~/.zshrc`), затем запустите `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> Для**удаленного сервера**замените `localhost:20128` на IP-адрес или домен сервера.
> например `http://192.168.0.15:20128`.---

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

**Тест:**`Клод "поздоровайся"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Тест:**`кодекс "Сколько будет 2+2?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Тест:**`opencode`---

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

**Режим VS Code:**
Настройки расширения Cline → Поставщик API: `OpenAI Compatible` → Базовый URL: `http://localhost:20128/v1`

Или используйте панель управления OmniRoute →**Инструменты CLI → Cline → Применить конфигурацию**.---

### KiloCode (CLI or VS Code)

**Режим CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Настройки VS Code:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Или используйте панель управления OmniRoute →**Инструменты CLI → KiloCode → Применить конфигурацию**.---

### Continue (VS Code Extension)

Отредактируйте `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Перезапустите VS Code после редактирования.---

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

> **Примечание.**Курсор маршрутизирует запросы через свое облако. Для интеграции OmniRoute:
> включите**Конечную точку облака**в настройках OmniRoute и используйте общедоступный URL-адрес.

Через графический интерфейс:**Настройки → Модели → Ключ API OpenAI**

- Базовый URL-адрес: https://your-domain.com/v1.
- Ключ API: ваш ключ OmniRoute.---

## Dashboard Auto-Configuration

Панель управления OmniRoute автоматизирует настройку большинства инструментов:

1. Перейдите по адресу http://localhost:20128/dashboard/cli-tools.
2. Разверните любую карточку инструмента.
3. Выберите свой ключ API из раскрывающегося списка.
4. Нажмите**Применить конфигурацию**(если инструмент определен как установленный).
5. Или скопируйте сгенерированный фрагмент конфигурации вручную.---

## Built-in Agents: Droid & OpenClaw

**Droid**и**OpenClaw**— это агенты искусственного интеллекта, встроенные непосредственно в OmniRoute — установка не требуется.
Они выполняются как внутренние маршруты и автоматически используют маршрутизацию модели OmniRoute.

- Доступ: `http://localhost:20128/dashboard/agents`
- Настройка: те же комбинации и поставщики, что и для всех других инструментов.
- Не требуется ключ API или установка CLI.---

## Available API Endpoints

| Конечная точка              | Описание                         | Использовать для                           |
| --------------------------- | -------------------------------- | ------------------------------------------ | --- |
| `/v1/чат/завершения`        | Стандартный чат (все провайдеры) | Все современные инструменты                |
| `/v1/ответы`                | API ответов (формат OpenAI)      | Кодекс, агентские рабочие процессы         |
| `/v1/завершения`            | Дополнение устаревших текстов    | Старые инструменты, использующие `prompt:` |
| `/v1/вложения`              | Встраивание текста               | ТРЯПКА, поиск                              |
| `/v1/images/generations`    | Генерация изображений            | ДАЛЛ-Э, Флюс и др.                         |
| `/v1/аудио/речь`            | Преобразование текста в речь     | ElevenLabs, OpenAI TTS                     |
| `/v1/audio/transscriptions` | Преобразование речи в текст      | Дипграмма, АссамблеяИИ                     | --- |

## Устранение неполадок

| Ошибка                          | Причина                               | Исправить                                               |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------- | --- |
| `Соединение отклонено`          | OmniRoute не работает                 | `pm2 начать омнирут`                                    |
| `401 Несанкционированный`       | Неправильный ключ API                 | Проверьте `/dashboard/api-manager`                      |
| `Комбинация не настроена`       | Нет активной комбинации маршрутизации | Настроить в `/dashboard/combos`                         |
| `неверная модель`               | Модели нет в каталоге                 | Используйте `auto` или проверьте `/dashboard/providers` |
| CLI показывает «не установлено» | Двоичный файл отсутствует в PATH      | Проверьте `какая <команда>`                             |
| `киро-кли: не найден`           | Не в PATH                             | `export PATH="$HOME/.local/bin:$PATH"`                  | --- |

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
