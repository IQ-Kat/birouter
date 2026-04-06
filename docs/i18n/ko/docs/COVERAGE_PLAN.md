# Test Coverage Plan (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

최종 업데이트 날짜: 2026-03-28## Baseline

보고서 계산 방법에 따라 여러 적용 범위 번호가 있습니다. 계획에는 그중 하나만 유용합니다.

| 미터법    | 범위                                   | 문/라인 |   지점 |   기능 | 메모                                                      |
| --------- | -------------------------------------- | ------: | -----: | -----: | --------------------------------------------------------- |
| 레거시    | 이전 `npm 실행 테스트:범위`            |  79.42% | 75.15% | 67.94% | 팽창됨: 테스트 파일 수를 계산하고 'open-sse'를 제외합니다 |
| 진단      | 소스만, 테스트 제외 및 'open-sse' 제외 |  68.16% | 63.55% | 64.06% | `src/**`를 분리하는 데에만 유용합니다                     |
| 권장 기준 | 소스만, 테스트 제외 및 'open-sse' 포함 |  56.95% | 66.05% | 57.80% | 이는 개선을 위한 프로젝트 전반의 기준선입니다             |

권장되는 기준은 최적화할 수치입니다.## Rules

- 적용 대상은 `tests/**`가 아닌 소스 파일에 적용됩니다.
- `open-sse/**`는 제품의 일부이므로 범위 내에 있어야 합니다.
- 새로운 코드는 접촉된 영역의 적용 범위를 줄여서는 안 됩니다.
- 구현 세부 사항보다 테스트 동작 및 분기 결과를 선호합니다. -`src/lib/db/**`에 대한 광범위한 모의보다 임시 SQLite 데이터베이스와 작은 고정 장치를 선호합니다.## Current command set

- `npm 실행 테스트:범위`
  - 단위 테스트 스위트의 주요 소스 커버리지 게이트
  - `text-summary`, `html`, `json-summary` 및 `lcov`를 생성합니다.
- `npm 실행 범위:보고`
  - 최근 실행의 자세한 파일별 보고서
- `npm 실행 테스트:범위:레거시`
  - 과거 비교만 가능## Milestones

| 단계  |          대상 | 집중                                          |
| ----- | ------------: | --------------------------------------------- |
| 1단계 |   60% 문/라인 | 빠른 성공 및 저위험 유틸리티 보장             |
| 2단계 | 65% 진술/라인 | DB 및 루트 기반                               |
| 3단계 | 70% 진술/라인 | 공급자 검증 및 사용량 분석                    |
| 4단계 | 75% 진술/라인 | `open-sse` 번역가 및 도우미                   |
| 5단계 | 80% 진술/라인 | `open-sse` 핸들러 및 실행기 분기              |
| 6단계 | 85% 진술/라인 | 더 어려운 엣지 케이스, 지점 부채, 회귀 스위트 |
| 7단계 |   90% 문/라인 | 최종 청소, 격차 해소, 엄격한 래칫             |

분기와 기능은 각 단계마다 상향 조정되어야 하지만 주요 목표는 문/라인입니다.## Priority hotspots

이러한 파일 또는 영역은 다음 단계에 가장 적합한 결과를 제공합니다.

1. `open-sse/핸들러`
   - 'chatCore.ts' 7.57%
   - 전체 디렉토리 29.07%
2. `open-sse/번역기/요청`
   - 전체 디렉토리 36.39%
   - 많은 번역가가 여전히 한 자릿수 커버리지에 가깝습니다.
3. `open-sse/번역기/응답`
   - 전체 디렉토리 8.07%
4. `open-sse/실행자`
   - 전체 디렉토리 36.62% 5.`src/lib/db`
   - 'models.ts' 20.66%
   - 'registeredKeys.ts' 34.46%
   - 'modelComboMappings.ts' 36.25%
   - `settings.ts` 46.40%
   - 'webhooks.ts' 33.33% 6.`src/lib/사용법`
   - 'usageHistory.ts' 21.12%
   - 'usageStats.ts' 9.56%
   - `costCalculator.ts` 30.00% 7.`src/lib/공급자`
   - `validation.ts` 41.16%
5. 초기 이익을 위한 저위험 유틸리티 및 API 파일 -`src/shared/utils/upstreamError.ts` -`src/shared/utils/apiAuth.ts` -`src/lib/api/errorResponse.ts` -`src/app/api/settings/require-login/route.ts` -`src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] 테스트 파일 대신 소스 코드를 반영하도록 적용 범위 측정항목 수정
- [x] 비교를 위해 기존 적용 범위 스크립트 유지
- [x] 리포지토리에 기준선 및 핫스팟 기록
- [ ] 위험도가 낮은 유틸리티에 대한 집중 테스트를 추가합니다. -`src/shared/utils/upstreamError.ts` -`src/shared/utils/fetchTimeout.ts` -`src/lib/api/errorResponse.ts` -`src/shared/utils/apiAuth.ts` -`src/lib/display/names.ts`
- [ ] 다음에 대한 경로 테스트를 추가합니다. -`src/app/api/settings/require-login/route.ts` -`src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] 다음에 대한 DB 지원 테스트를 추가합니다. -`src/lib/db/modelComboMappings.ts` -`src/lib/db/settings.ts` -`src/lib/db/registeredKeys.ts`
- [ ] 다음의 분기 동작을 다룹니다. -`src/lib/providers/validation.ts` -`src/app/api/v1/embeddings/route.ts` -`src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] 다음에 대한 사용 분석 테스트를 추가합니다. -`src/lib/usage/usageHistory.ts` -`src/lib/usage/usageStats.ts` -`src/lib/usage/costCalculator.ts`
- [ ] 프록시 관리 및 설정 분기에 대한 경로 범위 확장### Phase 4: 70% -> 75%

- [ ] 표지 번역 도우미 및 중앙 번역 경로: -`open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/번역기/요청/*`
  - `open-sse/번역기/응답/*`### Phase 5: 75% -> 80%

- [ ] 다음에 대한 핸들러 수준 테스트를 추가합니다. -`open-sse/handlers/chatCore.ts` -`open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js` -`open-sse/handlers/embeddings.js`
- [ ] 공급자별 인증, 재시도 및 엔드포인트 재정의를 위한 실행기 분기 적용 범위를 추가합니다.### Phase 6: 80% -> 85%

- [ ] 더 많은 엣지 케이스 제품군을 기본 적용 범위 경로에 병합
- [ ] 생성자/도우미 적용 범위가 약한 DB 모듈의 기능 적용 범위를 늘립니다.
- [ ] `settings.ts`, `registeredKeys.ts`, `validation.ts` 및 변환기 도우미의 분기 간격을 닫습니다.### Phase 7: 85% -> 90%

- [ ] 적용 범위가 낮은 나머지 파일을 차단기로 처리
- [ ] 푸시 중에 수정된 모든 발견된 프로덕션 버그에 대한 회귀 테스트를 90%까지 추가합니다.
- [ ] 로컬 기준선이 최소 2회 연속 실행 동안 안정적인 후에만 CI의 적용 범위 게이트를 높입니다.## Ratchet policy

프로젝트가 실제로 편안한 버퍼를 사용하여 다음 마일스톤을 초과한 후에만 'npm run test:coverage' 임계값을 업데이트하세요.

권장되는 래칫 순서:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

순서는 `문장-라인/분기/함수`입니다.## Known gap

현재 적용 범위 명령은 기본 노드 장치 제품군을 측정하고 'open-sse'를 포함하여 여기에서 도달한 소스를 포함합니다. 아직 Vitest 적용 범위를 단일 통합 보고서로 병합하지 않습니다. 그 병합은 나중에 할 가치가 있지만 60% -> 80% 상승을 시작하는 데 방해가 되지는 않습니다.
