# CLI Tools Setup Guide — OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

W tym przewodniku wyjaśniono, jak zainstalować i skonfigurować wszystkie obsługiwane narzędzia CLI do kodowania AI
używać**OmniRoute**jako ujednoliconego backendu, zapewniającego scentralizowane zarządzanie kluczami,
śledzenie kosztów, przełączanie modeli i rejestrowanie żądań w każdym narzędziu.---

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

**Korzyści:**

- Jeden klucz API do zarządzania wszystkimi narzędziami
- Śledzenie kosztów we wszystkich interfejsach CLI na pulpicie nawigacyjnym
- Przełączanie modeli bez konieczności rekonfiguracji każdego narzędzia
- Works locally and on remote servers (VPS)---

## Supported Tools (Dashboard Source of Truth)

Karty dashboardów w `/dashboard/cli-tools` są generowane z `src/shared/constants/cliTools.ts`.
Aktualna lista (v3.0.0-rc.16):

| Narzędzie               | Identyfikator    | Polecenie        | Tryb konfiguracji | Metoda instalacji     |
| ----------------------- | ---------------- | ---------------- | ----------------- | --------------------- | -------------------------------------------- |
| **Kod Claude’a**        | ,,klaudiusz”     | ,,klaudiusz”     | środowisko        | npm                   |
| **Kodeks OpenAI**       | `kodeks`         | `kodeks`         | niestandardowe    | npm                   |
| **Droid fabryczny**     | `droid`          | `droid`          | niestandardowe    | w pakiecie/CLI        |
| **OpenClaw**            | „otwarty pazur”  | „otwarty pazur”  | niestandardowe    | w pakiecie/CLI        |
| **Kursor**              | `kursor`         | aplikacja        | przewodnik        | aplikacja komputerowa |
| **Klin**                | `klina`          | `klina`          | niestandardowe    | npm                   |
| **Kod kilograma**       | `kilogram`       | `kilokod`        | niestandardowe    | npm                   |
| **Kontynuuj**           | „kontynuuj”      | rozszerzenie     | przewodnik        | Kod VS                |
| **Antygrawitacja**      | „antygrawitacja” | wewnętrzne       | mit               | OmniRoute             |
| **Drugi pilot GitHuba** | „drugi pilot”    | rozszerzenie     | niestandardowe    | Kod VS                |
| **OpenKod**             | `otwarty kod`    | `otwarty kod`    | przewodnik        | npm                   |
| **Kiro AI**             | `kiro`           | aplikacja/klient | mit               | pulpit/CLI            | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` i `Ustawienia > Odcisk palca CLI` używają pliku `src/shared/constants/cliCompatProviders.ts`.
Dzięki temu identyfikatory dostawców są zgodne z kartami CLI i starszymi identyfikatorami.

| Identyfikator CLI                                                                                       | Identyfikator dostawcy odcisków palców |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `kilogram`                                                                                              | `kilokod`                              |
| „drugi pilot”                                                                                           | `github`                               |
| `claude` / `codex` / `antygrawitacja` / `kiro` / `kursor` / `cline` / `opencode` / `droid` / `openclaw` | ten sam identyfikator                  |

Starsze identyfikatory są nadal akceptowane ze względu na kompatybilność: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. Otwórz panel OmniRoute →**Menedżer API**(`/dashboard/api-manager`)
2. Kliknij**Utwórz klucz API**
3. Nadaj mu nazwę (np. „cli-tools”) i wybierz wszystkie uprawnienia
4. Skopiuj klucz — będziesz go potrzebować dla każdego poniższego interfejsu CLI

> Twój klucz wygląda następująco: `sk-xxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

Wszystkie narzędzia oparte na npm wymagają Node.js 18+:```bash

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

**Zweryfikować:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

Dodaj do `~/.bashrc` (lub `~/.zshrc`), a następnie uruchom `source ~/.bashrc`:```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> W przypadku**serwera zdalnego**zamień `localhost:20128` na adres IP lub domenę serwera,
> np. `http://192.168.0.15:20128`.---

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

**Test:**`claude „przywitaj się”`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:**`kodeks „co to jest 2+2?”`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test:**`otwarty kod`---

### Cline (CLI or VS Code)

**Tryb CLI:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**Tryb kodu VS:**
Ustawienia rozszerzenia Cline → Dostawca API: `Kompatybilny z OpenAI` → Podstawowy adres URL: `http://localhost:20128/v1`

Możesz też skorzystać z panelu OmniRoute →**Narzędzia CLI → Cline → Apply Config**.---

### KiloCode (CLI or VS Code)

**Tryb CLI:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**Ustawienia kodu VS:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

Możesz też skorzystać z panelu OmniRoute →**Narzędzia CLI → KiloCode → Apply Config**.---

### Continue (VS Code Extension)

Edytuj `~/.continue/config.yaml`:```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

Uruchom ponownie kod VS po edycji.---

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

> **Uwaga:**Kursor kieruje żądania przez swoją chmurę. W przypadku integracji z OmniRoute,
> włącz**Cloud Endpoint**w Ustawieniach OmniRoute i użyj adresu URL swojej domeny publicznej.

Przez GUI:**Ustawienia → Modele → Klucz API OpenAI**

- Podstawowy adres URL: `https://twoja-domena.com/v1`
- Klucz API: Twój klucz OmniRoute---

## Dashboard Auto-Configuration

Panel OmniRoute automatyzuje konfigurację większości narzędzi:

1. Przejdź do `http://localhost:20128/dashboard/cli-tools`
2. Rozwiń dowolną kartę narzędzi
3. Wybierz klucz API z listy rozwijanej
4. Kliknij**Zastosuj konfigurację**(jeśli narzędzie zostanie wykryte jako zainstalowane)
5. Lub skopiuj ręcznie wygenerowany fragment konfiguracji---

## Built-in Agents: Droid & OpenClaw

**Droid**i**OpenClaw**to agenci AI wbudowani bezpośrednio w OmniRoute — nie wymagają instalacji.
Działają jako trasy wewnętrzne i automatycznie korzystają z modelu routingu OmniRoute.

- Dostęp: `http://localhost:20128/dashboard/agents`
- Konfiguracja: te same kombinacje i dostawcy, co w przypadku wszystkich innych narzędzi
- Nie jest wymagany klucz API ani instalacja CLI---

## Available API Endpoints

| Punkt końcowy            | Opis                                | Użyj dla                                        |
| ------------------------ | ----------------------------------- | ----------------------------------------------- | --- |
| `/v1/czat/uzupełnienia`  | Czat standardowy (wszyscy dostawcy) | Wszystkie nowoczesne narzędzia                  |
| `/v1/odpowiedzi`         | API odpowiedzi (format OpenAI)      | Kodeks, przepływy pracy agentów                 |
| `/v1/ukończenia`         | Starsze uzupełnienia tekstu         | Starsze narzędzia korzystające z `podpowiedzi:` |
| `/v1/osadzania`          | Osadzanie tekstu                    | RAG, szukaj                                     |
| `/v1/obrazy/generacje`   | Generowanie obrazu                  | DALL-E, strumień itp.                           |
| `/v1/audio/mowa`         | Zamiana tekstu na mowę              | ElevenLabs, OpenAI TTS                          |
| `/v1/audio/transkrypcje` | Zamiana mowy na tekst               | Deepgram, AssemblyAI                            | --- |

## Rozwiązywanie problemów

| Błąd                                          | Przyczyna                         | Napraw                                         |
| --------------------------------------------- | --------------------------------- | ---------------------------------------------- | --- |
| `Połączenie odrzucone`                        | OmniRoute nie działa              | `pm2 rozpocznij omniroute`                     |
| `401 Nieautoryzowane`                         | Zły klucz API                     | Sprawdź w `/dashboard/api-manager`             |
| `Żadna kombinacja nie została skonfigurowana` | Brak aktywnej kombinacji routingu | Skonfiguruj w `/dashboard/combos`              |
| `nieprawidłowy model`                         | Modelu nie ma w katalogu          | Użyj `auto` lub zaznacz `/dashboard/providers` |
| CLI pokazuje „nie zainstalowano”              | Plik binarny nie jest w PATH      | Sprawdź `które <polecenie>`                    |
| `kiro-cli: nie znaleziono`                    | Nie w PATH                        | `export PATH="$HOME/.local/bin:$PATH"`         | --- |

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
