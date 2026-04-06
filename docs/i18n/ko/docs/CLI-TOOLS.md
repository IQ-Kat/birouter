# CLI Tools Setup Guide — OmniRoute (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

이 가이드에서는 지원되는 모든 AI 코딩 CLI 도구를 설치하고 구성하는 방법을 설명합니다.
**OmniRoute**를 통합 백엔드로 사용하여 중앙 집중식 키 관리를 제공합니다.
모든 도구에 걸쳐 비용 추적, 모델 전환 및 요청 로깅이 가능합니다.---

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

**혜택:**

- 모든 도구를 관리하는 하나의 API 키
- 대시보드의 모든 CLI에 대한 비용 추적
- 모든 도구를 재구성하지 않고 모델 전환
- 로컬 및 원격 서버(VPS)에서 작동---

## Supported Tools (Dashboard Source of Truth)

`/dashboard/cli-tools`의 대시보드 카드는 `src/shared/constants/cliTools.ts`에서 생성됩니다.
현재 목록(v3.0.0-rc.16):

| 도구                | 아이디     | 명령       | 설정 모드 | 설치 방법    |
| ------------------- | ---------- | ---------- | --------- | ------------ | -------------------------------------------- |
| **클로드 코드**     | '클로드'   | '클로드'   | 환경      | npm          |
| **OpenAI 코덱스**   | `코덱스`   | `코덱스`   | 맞춤      | npm          |
| **팩토리 드로이드** | `드로이드` | `드로이드` | 맞춤      | 번들/CLI     |
| **오픈클로**        | '오픈클로' | '오픈클로' | 맞춤      | 번들/CLI     |
| **커서**            | `커서`     | 앱         | 가이드    | 데스크톱 앱  |
| **클라인**          | `클라인`   | `클라인`   | 맞춤      | npm          |
| **킬로 코드**       | '킬로'     | `킬로코드` | 맞춤      | npm          |
| **계속**            | 계속하다   | 확장       | 가이드    | VS 코드      |
| **반중력**          | '반중력'   | 내부       | 미트      | 옴니루트     |
| **GitHub 부조종사** | '부조종사' | 확장       | 맞춤      | VS 코드      |
| **오픈코드**        | '오픈코드' | '오픈코드' | 가이드    | npm          |
| **키로 AI**         | '키로'     | 앱/cli     | 미트      | 데스크탑/CLI | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` 및 `설정 > CLI 지문`은 `src/shared/constants/cliCompatProviders.ts`를 사용합니다.
이렇게 하면 공급자 ID가 CLI 카드 및 레거시 ID와 일치하도록 유지됩니다.

| CLI ID                                                                                               | 지문 제공업체 ID |
| ---------------------------------------------------------------------------------------------------- | ---------------- |
| '킬로'                                                                                               | `킬로코드`       |
| '부조종사'                                                                                           | `github`         |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | 같은 아이디      |

호환성을 위해 여전히 허용되는 레거시 ID: `copilot`, `kimi-coding`, `qwen`.---

## Step 1 — Get an OmniRoute API Key

1. OmniRoute 대시보드 열기 →**API 관리자**(`/dashboard/api-manager`) 2.**API 키 생성**을 클릭하세요.
2. 이름(예: `cli-tools`)을 지정하고 모든 권한을 선택합니다.
3. 키를 복사합니다. 아래의 모든 CLI에 필요합니다.

> 키는 다음과 같습니다: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

모든 npm 기반 도구에는 Node.js 18 이상이 필요합니다.```bash

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

**확인하다:**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

`~/.bashrc`(또는 `~/.zshrc`)에 추가한 다음 `source ~/.bashrc`를 실행합니다.```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

>**원격 서버**의 경우 `localhost:20128`을 서버 IP 또는 도메인으로 바꾸세요.
> 예를 들어 `http://192.168.0.15:20128`.---

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

**테스트:**`claude "안녕하세요"`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**테스트:**`codex "2+2가 무엇인가요?"`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**테스트:**`오픈코드`---

### Cline (CLI or VS Code)

**CLI 모드:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS 코드 모드:**
Cline 확장 설정 → API 제공자: `OpenAI Compatible` → 기본 URL: `http://localhost:20128/v1`

또는 OmniRoute 대시보드 →**CLI 도구 → Cline → 구성 적용**을 사용하세요.---

### KiloCode (CLI or VS Code)

**CLI 모드:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS 코드 설정:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

또는 OmniRoute 대시보드 →**CLI 도구 → KiloCode → 구성 적용**을 사용하세요.---

### Continue (VS Code Extension)

`~/.continue/config.yaml`을 편집합니다.```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

편집 후 VS Code를 다시 시작합니다.---

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

> **참고:**Cursor는 클라우드를 통해 요청을 라우팅합니다. OmniRoute 통합의 경우
> OmniRoute 설정에서**Cloud Endpoint**를 활성화하고 공개 도메인 URL을 사용하세요.

GUI를 통해:**설정 → 모델 → OpenAI API 키**

- 기본 URL: `https://your-domain.com/v1`
- API 키: OmniRoute 키---

## Dashboard Auto-Configuration

OmniRoute 대시보드는 대부분의 도구에 대한 구성을 자동화합니다.

1. `http://localhost:20128/dashboard/cli-tools`로 이동합니다.
2. 도구 카드를 확장합니다.
3. 드롭다운에서 API 키를 선택하세요. 4.**구성 적용**을 클릭합니다(도구가 설치된 것으로 감지된 경우).
4. 또는 생성된 구성 조각을 수동으로 복사합니다.---

## Built-in Agents: Droid & OpenClaw

**Droid**및**OpenClaw**는 OmniRoute에 직접 내장된 AI 에이전트이므로 설치가 필요하지 않습니다.
내부 경로로 실행되며 OmniRoute의 모델 라우팅을 자동으로 사용합니다.

- 접속: `http://localhost:20128/dashboard/agents`
- 구성: 다른 모든 도구와 동일한 콤보 및 공급자
- API 키나 CLI 설치가 필요하지 않습니다.---

## Available API Endpoints

| 엔드포인트        | 설명                     | 사용 대상                      |
| ----------------- | ------------------------ | ------------------------------ | --- |
| `/v1/채팅/완료`   | 표준 채팅(모든 제공업체) | 모든 최신 도구                 |
| `/v1/응답`        | 응답 API(OpenAI 형식)    | Codex, 에이전트 워크플로우     |
| `/v1/완성`        | 레거시 텍스트 완성       | `prompt:`를 사용하는 이전 도구 |
| `/v1/임베딩`      | 텍스트 임베딩            | RAG, 검색                      |
| `/v1/이미지/세대` | 이미지 생성              | DALL-E, Flux 등                |
| `/v1/오디오/음성` | 텍스트 음성 변환         | 일레븐랩스, 오픈AI TTS         |
| `/v1/오디오/녹음` | 음성-텍스트              | 딥그램, AssemblyAI             | --- |

## 문제 해결

| 오류                           | 원인                      | 수정                                                    |
| ------------------------------ | ------------------------- | ------------------------------------------------------- | --- |
| '연결이 거부되었습니다'        | OmniRoute가 실행되지 않음 | 'pm2 시작 옴니루트'                                     |
| '401 무단'                     | 잘못된 API 키             | `/dashboard/api-manager`에서 확인                       |
| `구성된 콤보 없음`             | 활성 라우팅 콤보 없음     | `/dashboard/combos`에서 설정                            |
| '잘못된 모델'                  | 카탈로그에 없는 모델      | `auto`를 사용하거나 `/dashboard/providers`를 확인하세요 |
| CLI에 "설치되지 않음"이 표시됨 | PATH에 없는 바이너리      | `어떤 <명령>`을 확인하세요                              |
| `kiro-cli: 찾을 수 없음`       | PATH에 없음               | `내보내기 PATH="$HOME/.local/bin:$PATH"`                | --- |

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
