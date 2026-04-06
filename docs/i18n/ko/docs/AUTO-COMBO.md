# OmniRoute Auto-Combo Engine (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> 적응형 채점 기능을 갖춘 자체 관리 모델 체인## How It Works

자동 콤보 엔진은**6가지 요소 채점 기능**을 사용하여 각 요청에 가장 적합한 공급자/모델을 동적으로 선택합니다.

| 요인      | 무게 | 설명                                        |
| :-------- | :--- | :------------------------------------------ | ------------- |
| 할당량    | 0.20 | 남은 용량 [0..1]                            |
| 건강      | 0.25 | 회로 차단기: CLOSED=1.0, HALF=0.5, OPEN=0.0 |
| 비용투자  | 0.20 | 역비용(저렴할수록 점수가 높음)              |
| 지연 시간 | 0.15 | 역 p95 대기 시간(빠를수록 높음)             |
| 태스크핏  | 0.10 | 모델 × 작업 유형 피트니스 점수              |
| 안정성    | 0.10 | 대기 시간/오류의 낮은 변동                  | ## Mode Packs |

| 팩                    | 집중        | 키 가중치        |
| :-------------------- | :---------- | :--------------- | --------------- |
| 🚀**빠른 배송**       | 속도        | LatencyInv: 0.35 |
| 💰**비용 절감**       | 경제        | 비용 인v: 0.40   |
| 🎯**품질 우선**       | 최고의 모델 | 태스크핏: 0.40   |
| 📡**오프라인 친화적** | 가용성      | 할당량: 0.40     | ## Self-Healing |

-**임시 제외**: 점수 < 0.2 → 5분간 제외(점진적 백오프, 최대 30분) -**회로 차단기 인식**: OPEN → 자동 제외; HALF_OPEN → 프로브 요청 -**사건 모드**: >50% OPEN → 탐색 비활성화, 안정성 최대화 -**쿨다운 복구**: 제외 후 첫 번째 요청은 시간 초과가 감소된 "프로브"입니다.## Bandit Exploration

요청(구성 가능)의 5%는 탐색을 위해 임의의 공급자에게 라우팅됩니다. 사고 모드에서는 비활성화되었습니다.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

6가지 작업 유형('코딩', '검토', '계획', '분석', '디버깅', '문서화')에 걸쳐 30개 이상의 모델이 점수를 매겼습니다. 와일드카드 패턴을 지원합니다(예: `*-coder` → 높은 코딩 점수).## Files

| 파일                                         | 목적                      |
| :------------------------------------------- | :------------------------ |
| `open-sse/services/autoCombo/scoring.ts`     | 채점 기능 및 풀 정규화    |
| `open-sse/services/autoCombo/taskFitness.ts` | 모델 × 작업 피트니스 조회 |
| `open-sse/services/autoCombo/engine.ts`      | 선택논리, 산적, 예산상한  |
| `open-sse/services/autoCombo/selfHealing.ts` | 제외, 프로브, 사고 모드   |
| `open-sse/services/autoCombo/modePacks.ts`   | 4가지 체중 프로필         |
| `src/app/api/combos/auto/route.ts`           | REST API                  |
