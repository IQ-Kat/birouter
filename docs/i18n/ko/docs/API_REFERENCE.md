# API Reference (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

모든 OmniRoute API 엔드포인트에 대한 전체 참조입니다.---

## Table of Contents

- [채팅 완료](#chat-completions)
- [임베딩](#embeddings)
- [이미지 생성](#image-generation)
- [모델 목록](#list-models)
- [호환성 끝점](#compatibility-endpoints)
- [의미적 캐시](#semantic-cache)
- [대시보드 및 관리](#dashboard--관리)
- [요청 처리](#request-processing)
- [인증](#인증)---

## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Custom Headers

| 헤더                     | 방향 | 설명                                       |
| ------------------------ | ---- | ------------------------------------------ |
| `X-OmniRoute-No-Cache`   | 요청 | 캐시를 우회하려면 `true`로 설정            |
| `X-OmniRoute-진행`       | 요청 | 진행 이벤트에 대해 'true'로 설정           |
| `X-세션 ID`              | 요청 | 외부 세션 선호도를 위한 고정 세션 키       |
| `x_session_id`           | 요청 | 밑줄 변형도 허용됨(직접 HTTP)              |
| '멱등성 키'              | 요청 | 중복 제거 키(5초 창)                       |
| `X-요청-ID`              | 요청 | 대체 중복 제거 키                          |
| `X-OmniRoute-캐시`       | 응답 | `HIT` 또는 `MISS`(비스트리밍)              |
| `X-OmniRoute-멱등성`     | 응답 | 중복이 제거된 경우 'true'                  |
| `X-OmniRoute-진행`       | 응답 | 진행 상황 추적이 켜져 있는 경우 '활성화됨' |
| `X-OmniRoute-Session-Id` | 응답 | OmniRoute에서 사용하는 유효 세션 ID        |

> Nginx 참고: 밑줄 헤더(예: `x_session_id`)를 사용하는 경우 `underscores_in_headers on;`을 활성화하세요.---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

사용 가능한 공급자: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

# List all embedding models

GET /v1/embeddings

````

---

## Image Generation

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
````

사용 가능한 제공업체: OpenAI(DALL-E), xAI(Grok Image), Together AI(FLUX), Fireworks AI.```bash

# List all image models

GET /v1/images/generations

````

---

## List Models

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
````

---

## Compatibility Endpoints

| 방법   | 경로                        | 형식                    |
| ------ | --------------------------- | ----------------------- | ----------------------------- |
| 포스트 | `/v1/채팅/완료`             | 오픈AI                  |
| 포스트 | `/v1/메시지`                | 인류학                  |
| 포스트 | `/v1/응답`                  | OpenAI 응답             |
| 포스트 | `/v1/임베딩`                | 오픈AI                  |
| 포스트 | `/v1/이미지/세대`           | 오픈AI                  |
| 받기   | `/v1/모델`                  | 오픈AI                  |
| 포스트 | `/v1/messages/count_tokens` | 인류학                  |
| 받기   | `/v1beta/모델`              | 쌍둥이자리              |
| 포스트 | `/v1beta/models/{...경로}`  | 쌍둥이 자리 생성 콘텐츠 |
| 포스트 | `/v1/api/chat`              | 올라마                  | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

공급자 접두사가 누락된 경우 자동으로 추가됩니다. 일치하지 않는 모델이 '400'을 반환합니다.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

응답 예:```json
{
"semanticCache": {
"memorySize": 42,
"memoryMaxSize": 500,
"dbSize": 128,
"hitRate": 0.65
},
"idempotency": {
"activeKeys": 3,
"windowMs": 5000
}
}

````

---

## Dashboard & Management

### Authentication

| 엔드포인트 | 방법 | 설명 |
| ---------------- | ------- | -------- |
| `/api/auth/로그인` | 포스트 | 로그인 |
| `/api/auth/logout` | 포스트 | 로그아웃 |
| `/api/settings/require-login` | 가져오기/넣기 | 토글 로그인 필요 |### Provider Management

| 엔드포인트 | 방법 | 설명 |
| --------------- | --------------- | ----------- |
| `/api/공급자` | 받기/게시 | 공급자 목록/생성 |
| `/api/providers/[id]` | 가져오기/넣기/삭제 | 공급자 관리 |
| `/api/providers/[id]/test` | 포스트 | 테스트 공급자 연결 |
| `/api/providers/[id]/models` | 받기 | 공급자 모델 나열 |
| `/api/providers/validate` | 포스트 | 공급자 구성 확인 |
| `/api/provider-nodes*` | 다양한 | 공급자 노드 관리 |
| `/api/provider-models` | 가져오기/게시/삭제 | 맞춤형 모델 |### OAuth Flows

| 엔드포인트 | 방법 | 설명 |
| -------------------------------- | ------- | ---------- |
| `/api/oauth/[공급자]/[작업]` | 다양한 | 공급자별 OAuth |### Routing & Config

| 엔드포인트 | 방법 | 설명 |
| -------- | -------- | ---------------- |
| `/api/모델/별칭` | 받기/게시 | 모델 별칭 |
| `/api/모델/카탈로그` | 받기 | 공급자 + 유형별 모든 모델 |
| `/api/combos*` | 다양한 | 콤보 관리 |
| `/api/키*` | 다양한 | API 키 관리 |
| `/api/가격` | 받기 | 모델 가격 |### Usage & Analytics

| 엔드포인트 | 방법 | 설명 |
| -------------- | ------ | ------- |
| `/api/사용/역사` | 받기 | 이용내역 |
| `/api/사용/로그` | 받기 | 사용 로그 |
| `/api/사용/요청-로그` | 받기 | 요청 수준 로그 |
| `/api/usage/[connectionId]` | 받기 | 연결별 사용량 |### Settings

| 엔드포인트 | 방법 | 설명 |
| ------------------ | ------------- | --------- |
| `/api/설정` | 가져오기/넣기/패치 | 일반 설정 |
| `/api/settings/proxy` | 가져오기/넣기 | 네트워크 프록시 구성 |
| `/api/settings/proxy/test`      | 포스트 | 프록시 연결 테스트 |
| `/api/settings/ip-필터` | 가져오기/넣기 | IP 허용 목록/차단 목록 |
| `/api/settings/thinking-budget` | 가져오기/넣기 | 토큰 예산 추론 |
| `/api/settings/system-prompt` | 가져오기/넣기 | 글로벌 시스템 프롬프트 |### Monitoring

| 엔드포인트 | 방법 | 설명 |
| ----------- | ---------- | -------------------------------------------------------------------------- |
| `/api/세션` | 받기 | 활성 세션 추적 |
| `/api/속도 제한` | 받기 | 계정당 비율 제한 |
| `/api/모니터링/건강` | 받기 | 상태 확인 + 공급자 요약(`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/캐시/통계` | 가져오기/삭제 | 캐시 통계 / 지우기 |### Backup & Export/Import

| 엔드포인트 | 방법 | 설명 |
| -------------- | ------ | -------------------------- |
| `/api/db-백업` | 받기 | 사용 가능한 백업 나열 |
| `/api/db-백업` | 넣어 | 수동 백업 생성 |
| `/api/db-백업` | 포스트 | 특정 백업에서 복원 |
| `/api/db-백업/내보내기` | 받기 | 데이터베이스를 .sqlite 파일로 다운로드 |
| `/api/db-백업/가져오기` | 포스트 | 데이터베이스를 대체할 .sqlite 파일 업로드 |
| `/api/db-backups/exportAll` | 받기 | 전체 백업을 .tar.gz 아카이브로 다운로드 |### Cloud Sync

| 엔드포인트 | 방법 | 설명 |
| --------- | ------- | -------- |
| `/api/sync/cloud` | 다양한 | 클라우드 동기화 작업 |
| `/api/sync/초기화` | 포스트 | 동기화 초기화 |
| `/api/cloud/*` | 다양한 | 클라우드 관리 |### Tunnels

| 엔드포인트 | 방법 | 설명 |
| ------------- | ------ | ---------------------------------------------------------- |
| `/api/tunnels/cloudflared` | 받기 | 대시보드에 대한 Cloudflare Quick Tunnel 설치/런타임 상태 읽기 |
| `/api/tunnels/cloudflared` | 포스트 | Cloudflare Quick Tunnel 활성화 또는 비활성화(`action=enable/disable`) |### CLI Tools

| 엔드포인트 | 방법 | 설명 |
| --------------------- | ------ | ------ |
| `/api/cli-tools/claude-settings` | 받기 | 클로드 CLI 상태 |
| `/api/cli-tools/codex-settings` | 받기 | 코덱스 CLI 상태 |
| `/api/cli-tools/droid-settings` | 받기 | 드로이드 CLI 상태 |
| `/api/cli-tools/openclaw-settings` | 받기 | OpenClaw CLI 상태 |
| `/api/cli-tools/runtime/[toolId]` | 받기 | 일반 CLI 런타임 |

CLI 응답에는 `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`이 포함됩니다.### ACP Agents

| 엔드포인트 | 방법 | 설명 |
| ----------------- | ------ | ------------------------------------------- |
| `/api/acp/에이전트` | 받기 | 탐지된 모든 에이전트(기본 제공 + 사용자 지정)를 상태와 함께 나열 |
| `/api/acp/에이전트` | 포스트 | 사용자 정의 에이전트 추가 또는 새로 고침 감지 캐시 |
| `/api/acp/에이전트` | 삭제 | `id` 쿼리 매개변수로 사용자 정의 에이전트 제거 |

GET 응답에는 `agents[]`(id, 이름, 바이너리, 버전, 설치됨, 프로토콜, isCustom) 및 `summary`(전체, 설치됨, notFound, 내장, 사용자 정의)가 포함됩니다.### Resilience & Rate Limits

| 엔드포인트 | 방법 | 설명 |
| ---------- | --------- | ------------------ |
| `/api/resilience` | 가져오기/패치 | 탄력성 프로필 가져오기/업데이트 |
| `/api/resilience/reset` | 포스트 | 회로 차단기 재설정 |
| `/api/속도 제한` | 받기 | 계정별 비율한도 현황 |
| `/api/속도 제한` | 받기 | 글로벌 비율 제한 구성 |### Evals

| 엔드포인트 | 방법 | 설명 |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | 받기/게시 | 평가 제품군 나열/평가 실행 |### Policies

| 엔드포인트 | 방법 | 설명 |
| --------------- | --------------- | ---------- |
| `/api/정책` | 가져오기/게시/삭제 | 라우팅 정책 관리 |### Compliance

| 엔드포인트 | 방법 | 설명 |
| -------------- | ------ | ---------------- |
| `/api/compliance/audit-log` | 받기 | 규정 준수 감사 로그(마지막 N) |### v1beta (Gemini-Compatible)

| 엔드포인트 | 방법 | 설명 |
| ------------- | ------ | --------------------------------- |
| `/v1beta/모델` | 받기 | Gemini 형식으로 모델 나열 |
| `/v1beta/models/{...경로}` | 포스트 | Gemini 'generateContent' 엔드포인트 |

이러한 엔드포인트는 기본 Gemini SDK 호환성을 기대하는 클라이언트를 위한 Gemini의 API 형식을 미러링합니다.### Internal / System APIs

| 엔드포인트 | 방법 | 설명 |
| --------------- | ------ | --------------------------------------- |
| `/api/init` | 받기 | 애플리케이션 초기화 확인(첫 실행 시 사용) |
| `/api/태그` | 받기 | Ollama 호환 모델 태그(Ollama 고객용) |
| `/api/다시 시작` | 포스트 | 정상적인 서버 다시 시작 트리거 |
| `/api/종료` | 포스트 | 정상적인 서버 종료 트리거 |

>**참고:**이러한 끝점은 시스템 내부적으로 또는 Ollama 클라이언트 호환성을 위해 사용됩니다. 일반적으로 최종 사용자는 호출하지 않습니다.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Deepgram 또는 AssemblyAI를 사용하여 오디오 파일을 녹음합니다.

**요구:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**응답:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**지원되는 공급자:**`deepgram/nova-3`, `assembleai/best`.

**지원되는 형식:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Ollama의 API 형식을 사용하는 클라이언트의 경우:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

요청은 Ollama와 내부 형식 간에 자동으로 번역됩니다.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**응답:**```json
{
"providers": {
"claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
"github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
}
}

````

---

## Budget

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
````

---

## Model Availability

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Request Processing

1. 클라이언트는 `/v1/*`에 요청을 보냅니다.
2. 경로 핸들러는 `handleChat`, `handleEmbedding`, `handleAudioTranscription` 또는 `handleImageGeneration`을 호출합니다.
3. 모델이 해결되었습니다(직접 공급자/모델 또는 별칭/콤보).
4. 계정 가용성 필터링을 통해 로컬 DB에서 자격 증명을 선택합니다.
5. 채팅의 경우: `handleChatCore` — 형식 감지, 번역, 캐시 확인, 멱등성 확인
6. 공급자 실행자가 업스트림 요청을 보냅니다.
7. 응답은 클라이언트 형식(채팅)으로 다시 변환되거나 있는 그대로 반환됩니다(임베딩/이미지/오디오).
8. 사용/로깅 기록
9. 콤보 규칙에 따라 오류 발생 시 Fallback 적용

전체 아키텍처 참조: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- 대시보드 경로(`/dashboard/*`)는 `auth_token` 쿠키를 사용합니다.
- 로그인은 저장된 비밀번호 해시를 사용합니다. `INITIAL_PASSWORD`로 대체
- `/api/settings/require-login`을 통해 `requireLogin` 전환 가능
- `/v1/*` 경로에는 `REQUIRE_API_KEY=true`인 경우 선택적으로 Bearer API 키가 필요합니다.
