# OmniRoute MCP Server Documentation (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> 16가지 지능형 도구를 갖춘 모델 컨텍스트 프로토콜 서버## 설치

OmniRoute MCP가 내장되어 있습니다. 다음으로 시작하세요:```bash
omniroute --mcp

````

또는 open-sse 전송을 통해:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

반중력, 커서, Copilot 및 Claude Desktop 설정은 [IDE 구성](integrations/ide-configs.md)을 참조하세요.---

## Essential Tools (8)

| 도구                            | 설명                                    |
| :------------------------------ | :-------------------------------------- | --------------------- |
| `omniroute_get_health`          | 게이트웨이 상태, 회로 차단기, 가동 시간 |
| `omniroute_list_combos`         | 모델과 함께 구성된 모든 콤보            |
| `omniroute_get_combo_metrics`   | 특정 콤보에 대한 성능 지표              |
| `omniroute_switch_combo`        | ID/이름으로 활성 콤보 전환              |
| `omniroute_check_quota`         | 공급자별 또는 전체별 할당량 상태        |
| `omniroute_route_request`       | OmniRoute를 통해 채팅 완료 보내기       |
| `omniroute_cost_report`         | 특정 기간에 대한 비용 분석              |
| `omniroute_list_models_catalog` | 기능을 갖춘 전체 모델 카탈로그          | ## Advanced Tools (8) |

| 도구                               | 설명                                                       |
| :--------------------------------- | :--------------------------------------------------------- | ----------------- |
| `omniroute_simulate_route`         | 대체 트리를 사용한 테스트 실행 라우팅 시뮬레이션           |
| `omniroute_set_budget_guard`       | 성능 저하/차단/경고 조치가 포함된 세션 예산                |
| `omniroute_set_resilience_profile` | 보수적/균형적/공격적 사전 설정 적용                        |
| `omniroute_test_combo`             | 실제 업스트림 요청을 통해 콤보의 모든 모델을 실시간 테스트 |
| `omniroute_get_provider_metrics`   | 한 제공업체에 대한 자세한 측정항목                         |
| `omniroute_best_combo_for_task`    | 대안이 포함된 작업 적합성 추천                             |
| `omniroute_explain_route`          | 과거 라우팅 결정 설명                                      |
| `omniroute_get_session_snapshot`   | 전체 세션 상태: 비용, 토큰, 오류                           | ## Authentication |

MCP 도구는 API 키 범위를 통해 인증됩니다. 각 도구에는 특정 범위가 필요합니다.

| 범위          | 도구                                             |
| :------------ | :----------------------------------------------- | ---------------- |
| `읽기:건강`   | get_health, get_provider_metrics                 |
| `읽기:콤보`   | list_combos, get_combo_metrics                   |
| `쓰기:콤보`   | 스위치 콤보                                      |
| `읽기:할당량` | 수표\_할당량                                     |
| `쓰기:경로`   | Route_request,simulate_route, test_combo         |
| `읽기:사용`   | 비용 보고서, get_session_snapshot, explain_route |
| `쓰기:구성`   | set_budget_guard, set_resilience_profile         |
| `읽기:모델`   | 목록*모델*카탈로그, best_combo_for_task          | ## Audit Logging |

모든 도구 호출은 다음과 같이 `mcp_tool_audit`에 기록됩니다.

- 도구 이름, 인수, 결과
- 기간(ms), 성공/실패
- API 키 해시, 타임스탬프## Files

| 파일                                         | 목적                           |
| :------------------------------------------- | :----------------------------- |
| `open-sse/mcp-server/server.ts`              | MCP 서버 생성 + 16개 도구 등록 |
| `open-sse/mcp-server/transport.ts`           | Stdio + HTTP 전송              |
| `open-sse/mcp-server/auth.ts`                | API 키 + 범위 유효성 검사      |
| `open-sse/mcp-server/audit.ts`               | 도구 호출 감사 로깅            |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8개의 고급 도구 핸들러         |
