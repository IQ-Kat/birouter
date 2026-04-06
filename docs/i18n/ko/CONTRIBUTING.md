# Contributing to OmniRoute (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

기여에 관심을 가져주셔서 감사합니다! 이 가이드에서는 시작하는 데 필요한 모든 내용을 다룹니다.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24(권장: 22 LTS) -**npm**10+ -**기트**### Clone & Install

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

개발을 위한 주요 변수:

| 변수                   | 개발 기본값              | 설명                    |
| ---------------------- | ------------------------ | ----------------------- | ---------------------- |
| '포트'                 | `20128`                  | 서버 포트               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | 프런트엔드의 기본 URL   |
| `JWT_SECRET`           | (위에서 생성)            | JWT 서명 비밀           |
| `초기_비밀번호`        | '변경'                   | 첫 번째 로그인 비밀번호 |
| `APP_LOG_LEVEL`        | `정보`                   | 로그 상세 수준          | ### Dashboard Settings |

대시보드는 환경 변수를 통해 구성할 수도 있는 기능에 대한 UI 토글을 제공합니다.

| 설정 위치   | 토글            | 설명                        |
| ----------- | --------------- | --------------------------- |
| 설정 → 고급 | 디버그 모드     | 디버그 요청 로그(UI) 활성화 |
| 설정 → 일반 | 사이드바 가시성 | 사이드바 섹션 표시/숨기기   |

이러한 설정은 데이터베이스에 저장되고 다시 시작해도 지속되며 설정 시 env var 기본값을 재정의합니다.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

기본 URL:

-**대시보드**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**`main`에 직접 커밋하지 마세요.**항상 기능 브랜치를 사용하세요.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| 접두사 | 목적 |
| ----------- | ------------ |
| `위업/` | 새로운 기능 |
| `수정/` | 버그 수정 |
| `리팩터링/` | 코드 재구성 |
| `문서/` | 문서 변경 |
| `테스트/` | 테스트 추가/수정 |
| 집안일/` | 툴링, CI, 종속성 |### Commit Messages

[기존 커밋](https://www.conventionalcommits.org/)을 따르세요.```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

범위: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

## Running Tests

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.mjs

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (60% min statements/lines/functions/branches)
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check
```

적용 범위 참고사항:

- `npm run test:coverage`는 기본 단위 테스트 모음에 대한 소스 커버리지를 측정하고 `tests/**`를 제외하고 `open-sse/**`를 포함합니다.
- 풀 요청은 명령문, 라인, 기능 및 분기에 대해 전체 적용 범위 게이트를**60% 이상**으로 유지해야 합니다.
- PR이 `src/`, `open-sse/`, `electron/` 또는 `bin/`에서 프로덕션 코드를 변경하는 경우 동일한 PR에서 자동화된 테스트를 추가하거나 업데이트해야 합니다.
- `npm run Coverage:report`는 최신 커버리지 실행에서 자세한 파일별 보고서를 인쇄합니다.
- `npm run test:coverage:legacy`는 기록 비교를 위해 이전 측정항목을 유지합니다.
- 단계적 커버리지 개선 로드맵은 `docs/COVERAGE_PLAN.md`를 참조하세요.### Pull Request Requirements

PR을 열거나 병합하기 전에:

- `npm run test:unit`을 실행하세요.
- `npm run test:coverage` 실행
- 모든 지표에 대해 적용 범위 게이트가**60%+**로 유지되는지 확인하세요.
- 프로덕션 코드 변경 시 PR 설명에 변경되거나 추가된 테스트 파일 포함
- CI에 프로젝트 비밀이 구성되면 PR에서 SonarQube 결과를 확인하세요.

현재 테스트 상태:**122개의 단위 테스트 파일**포함:

- 제공자 번역기 및 형식 변환
- 속도 제한, 회로 차단기 및 복원력
- 의미론적 캐시, 멱등성, 진행률 추적
- 데이터베이스 운영 및 스키마(21개 DB 모듈)
- OAuth 흐름 및 인증
- API 엔드포인트 검증(Zod v4)
- MCP 서버 도구 및 범위 적용
- 메모리 및 스킬 시스템---

## Code Style

-**ESLint**— 커밋하기 전에 `npm run lint`를 실행하세요. -**더 예쁘다**— 커밋 시 `lint-staged`를 통해 자동 형식화됩니다(공백 2개, 세미콜론, 큰따옴표, 문자 너비 100자, 후행 쉼표 es5). -**TypeScript**— 모든 `src/` 코드는 `.ts`/`.tsx`를 사용합니다. `open-sse/`는 `.ts`/`.js`를 사용합니다. TSDoc이 포함된 문서(`@param`, `@returns`, `@throws`) -**`eval()` 없음**— ESLint는 `no-eval`, `no-implied-eval`, `no-new-func`를 시행합니다. -**Zod 유효성 검사**— 모든 API 입력 유효성 검사에 Zod v4 스키마를 사용합니다. -**이름 지정**: 파일 = camelCase/kebab-case, 구성 요소 = PascalCase, 상수 = UPPER_SNAKE---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (21 modules + 16 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (60+), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 14 provider-specific request executors
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (25 tools, 3 transports, 10 scopes)
├── services/               # 36+ services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (25 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Adding a New Provider

### Step 1: Register Provider Constants

`src/shared/constants/providers.ts`에 추가 — 모듈 로드 시 Zod 검증됨.### Step 2: Add Executor (if custom logic needed)

기본 실행기를 확장하는 `open-sse/executors/your-provider.ts`에 실행기를 만듭니다.### Step 3: Add Translator (if non-OpenAI format)

`open-sse/translator/`에서 요청/응답 변환기를 만듭니다.### Step 4: Add OAuth Config (if OAuth-based)

`src/lib/oauth/constants/oauth.ts`에 OAuth 자격 증명을 추가하고 `src/lib/oauth/services/`에 서비스를 추가합니다.### Step 5: Register Models

`open-sse/config/providerRegistry.ts`에 모델 정의를 추가합니다.### Step 6: Add Tests

최소한 다음을 포함하는 `tests/unit/`에 단위 테스트를 작성하세요.

- 공급자 등록
- 요청/응답 번역
- 오류 처리---

## Pull Request Checklist

- [ ] 테스트 통과(`npm test`)
- [ ] 린팅 통과(`npm run lint`)
- [ ] 빌드 성공(`npm run build`)
- [ ] 새로운 공용 함수 및 인터페이스를 위해 TypeScript 유형이 추가되었습니다.
- [ ] 하드코딩된 비밀 또는 대체 값이 없습니다.
- [ ] Zod 스키마로 검증된 모든 입력
- [ ] CHANGELOG가 업데이트되었습니다(사용자가 변경하는 경우).
- [ ] 문서 업데이트됨(해당되는 경우)---

## Releasing

릴리스는 `/generate-release` 워크플로를 통해 관리됩니다. 새로운 GitHub 릴리스가 생성되면 패키지는 GitHub Actions를 통해**npm에 자동으로 게시**됩니다.---

## Getting Help

-**아키텍처**: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)를 참조하세요. -**API 참조**: [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md)를 참조하세요. -**문제**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR**: 아키텍처 결정 기록은 `docs/adr/`을 참조하세요.
