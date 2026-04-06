# OmniRoute — Dashboard Features Gallery (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

OmniRoute 대시보드의 모든 섹션에 대한 시각적 가이드입니다.---

## 🔌 Providers

AI 공급자 연결 관리: OAuth 공급자(Claude Code, Codex, Gemini CLI), API 키 공급자(Groq, DeepSeek, OpenRouter) 및 무료 공급자(Qoder, Qwen, Kiro). Kiro 계정에는 크레딧 잔액 추적 기능이 포함되어 있습니다. 남은 크레딧, 총 허용량, 갱신 날짜는 대시보드 → 사용량에서 확인할 수 있습니다.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

우선 순위, 가중치 적용, 라운드 로빈, 무작위, 최소 사용, 비용 최적화 등 6가지 전략을 사용하여 모델 라우팅 콤보를 만듭니다. 각 콤보는 자동 폴백을 통해 여러 모델을 연결하며 빠른 템플릿과 준비 상태 확인을 포함합니다.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

토큰 소비, 비용 추정, 활동 히트맵, 주간 분포 차트 및 공급자별 분석을 포함한 포괄적인 사용량 분석입니다.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

실시간 모니터링: 가동 시간, 메모리, 버전, 대기 시간 백분위수(p50/p95/p99), 캐시 통계 및 공급자 회로 차단기 상태.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

API 번역 디버깅을 위한 4가지 모드:**플레이그라운드**(형식 변환기),**채팅 테스터**(실시간 요청),**테스트 벤치**(일괄 테스트),**라이브 모니터**(실시간 스트림).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

대시보드에서 직접 모델을 테스트해 보세요. 공급자, 모델 및 엔드포인트를 선택하고, Monaco Editor로 프롬프트를 작성하고, 실시간으로 응답을 스트리밍하고, 중간 스트림을 중단하고, 타이밍 측정항목을 확인하세요.---

## 🎨 Themes _(v2.0.5+)_

전체 대시보드에 대한 사용자 정의 가능한 색상 테마입니다. 7가지 사전 설정된 색상(산호색, 파란색, 빨간색, 녹색, 보라색, 주황색, 청록색) 중에서 선택하거나 16진수 색상을 선택하여 사용자 정의 테마를 만드세요. 밝음, 어두움 및 시스템 모드를 지원합니다.---

## ⚙️ Settings

탭이 포함된 종합 설정 패널:

-**일반**— 시스템 스토리지, 백업 관리(데이터베이스 내보내기/가져오기) -**모양**— 테마 선택기(어두움/밝음/시스템), 색상 테마 사전 설정 및 사용자 정의 색상, 상태 로그 표시, 사이드바 항목 표시 제어 -**보안**— API 엔드포인트 보호, 맞춤형 공급자 차단, IP 필터링, 세션 정보 -**라우팅**— 모델 별칭, 백그라운드 작업 성능 저하 -**복원력**— 속도 제한 지속성, 회로 차단기 조정, 금지된 계정 자동 비활성화, 공급자 만료 모니터링 -**고급**— 구성 재정의, 구성 감사 추적, 대체 성능 저하 모드![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

AI 코딩 도구에 대한 원클릭 구성: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor 및 Factory Droid. 자동화된 구성 적용/재설정, 연결 프로필 및 모델 매핑 기능이 있습니다.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

CLI 에이전트를 검색하고 관리하기 위한 대시보드입니다. 다음을 포함하는 14개의 내장 에이전트(Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp)의 그리드를 표시합니다.

-**설치 상태**— 버전 감지를 통해 설치됨/찾을 수 없음 -**프로토콜 배지**— stdio, HTTP 등 -**사용자 지정 에이전트**— 양식(이름, 바이너리, 버전 명령, 생성 인수)을 통해 모든 CLI 도구 등록 -**CLI 지문 일치**— 기본 CLI 요청 서명과 일치하도록 공급자별 토글을 통해 프록시 IP를 유지하면서 금지 위험을 줄입니다.---

## 🖼️ Media _(v2.0.3+)_

대시보드에서 이미지, 비디오, 음악을 생성하세요. OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open 및 MusicGen을 지원합니다.---

## 📝 Request Logs

공급자, 모델, 계정 및 API 키별로 필터링하여 실시간 요청 로깅. 상태 코드, 토큰 사용량, 대기 시간 및 응답 세부 정보를 표시합니다.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

기능 분석이 포함된 통합 API 엔드포인트: 채팅 완료, 응답 API, 임베딩, 이미지 생성, 순위 재지정, 오디오 전사, 텍스트 음성 변환, 조정 및 등록된 API 키. 원격 액세스를 위한 Cloudflare Quick Tunnel 통합 및 클라우드 프록시 지원.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

API 키를 생성, 범위 지정, 취소합니다. 각 키는 전체 액세스 또는 읽기 전용 권한이 있는 특정 모델/공급업체로 제한될 수 있습니다. 사용 추적을 통한 시각적 키 관리.---

## 📋 Audit Log

작업 유형, 행위자, 대상, IP 주소 및 타임스탬프를 기준으로 필터링하여 관리 작업을 추적합니다. 전체 보안 이벤트 내역.---

## 🖥️ Desktop Application

Windows, macOS, Linux용 기본 Electron 데스크톱 앱입니다. 시스템 트레이 통합, 오프라인 지원, 자동 업데이트 및 원클릭 설치 기능을 갖춘 독립형 애플리케이션으로 OmniRoute를 실행하세요.

주요 기능:

- 서버 준비 폴링(콜드 스타트 시 빈 화면 없음)
- 포트 관리 기능이 있는 시스템 트레이
- 콘텐츠 보안 정책
- 단일 인스턴스 잠금
- 재시작 시 자동 업데이트
- 플랫폼 조건부 UI(macOS 신호등, Windows/Linux 기본 제목 표시줄)
- 강화된 Electron 빌드 패키징 — 독립 실행형 번들의 심볼릭 링크된 'node_modules'가 패키징 전에 감지 및 거부되어 빌드 시스템(v2.5.5+)에 대한 런타임 종속성을 방지합니다.

📖 전체 문서는 [`electron/README.md`](../electron/README.md)를 참조하세요.
