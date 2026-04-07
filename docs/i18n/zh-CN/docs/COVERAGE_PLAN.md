# Test Coverage Plan (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

最后更新: 2026-03-28## Baseline

根据报告的计算方式，有多个覆盖范围数字。对于规划来说，只有其中之一是有用的。

|公制|范围 |声明/行|分支机构 |功能|笔记|
| -------------------- | ---------------------------------------------------------------- | -----------------: | --------： | --------：| --------------------------------------------------- |
|遗产|旧的 `npm run test:coverage` | 79.42% | 75.15% | 67.94% |膨胀：对测试文件进行计数并排除“open-sse” |
|诊断|仅限源代码，不包括测试和“open-sse” | 68.16% | 63.55% | 64.06% |仅用于隔离 `src/**` |
|推荐基线 |仅限源代码，不包括测试并包括 `open-sse` | 56.95% | 66.05% | 57.80% |这是整个项目范围内需要改进的基线|

推荐的基线是优化的依据。## Rules

- 覆盖目标适用于源文件，而不是“tests/\*\*”。
- `open-sse/**` 是产品的一部分，必须保留在范围内。
- 新代码不应减少接触区域的覆盖范围。
- 更喜欢测试行为和分支结果而不是实施细节。
- 更喜欢临时 SQLite 数据库和小型装置，而不是“src/lib/db/\*\*”的广泛模拟。## Current command set

- `npm 运行测试：覆盖率`
  - 单元测试套件的主要源代码覆盖门
  - 生成“text-summary”、“html”、“json-summary”和“lcov”
- `npm 运行覆盖率：报告`
  - 最新运行的详细的逐个文件报告
- `npm 运行测试：覆盖范围：遗留`
  - 仅历史比较## Milestones

| 相       |        目标 | 焦点                                     |
| -------- | ----------: | ---------------------------------------- |
| 第一阶段 | 60% 语句/行 | 快速获胜和低风险公用事业保险             |
| 第二阶段 | 65% 语句/行 | DB 和路线基础                            |
| 第三阶段 | 70% 语句/行 | 提供商验证和使用分析                     |
| 第四阶段 | 75% 语句/行 | `open-sse` 翻译器和助手                  |
| 第五阶段 | 80% 语句/行 | `open-sse` 处理程序和执行器分支          |
| 第六阶段 | 85% 语句/行 | 更困难的边缘情况、分支机构债务、回归套件 |
| 第七阶段 | 90% 语句/行 | 最终扫描、间隙闭合、严格棘轮             |

分支和函数应该在每个阶段逐步向上，但主要的硬目标是语句/行。## Priority hotspots

这些文件或区域为下一阶段提供最佳回报：

1.`open-sse/处理程序`

- `chatCore.ts` 为 7.57%
- 总体目录占 29.07%

2. `open-sse/翻译器/请求`
   - 总体目录占 36.39%
   - 许多译者的覆盖率仍接近个位数
3. `open-sse/翻译器/响应`
   - 总体目录为 8.07%
4. `open-sse/executors`
   - 总体目录占 36.62%
5. `src/lib/db`
   - `models.ts` 为 20.66%
   - `registeredKeys.ts` 为 34.46%
   - `modelComboMappings.ts` 为 36.25%
   - `settings.ts` 为 46.40%
   - `webhooks.ts` 为 33.33%
6. `src/lib/usage`
   - `usageHistory.ts` 为 21.12%
   - `usageStats.ts` 为 9.56%
   - `costCalculator.ts` 为 30.00%
7. `src/lib/providers`
   - `validation.ts` 为 41.16%
8. 低风险的实用程序和 API 文件可实现早期收益
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] 修复覆盖率指标，使其反映源代码而不是测试文件
- [x] 保留遗留覆盖脚本以进行比较
- [x] 在repo中记录基线和热点
- [ ] 添加针对低风险公用事业的重点测试：
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] 添加路由测试：
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] 添加数据库支持的测试：
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] 覆盖分支行为：
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] 添加使用分析测试：
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] 扩大代理管理和设置分支的路由覆盖范围### Phase 4: 70% -> 75%

- [ ] 涵盖翻译助手和中心翻译路径：
  - `open-sse/translator/index.ts`
  - `open-sse/翻译器/helpers/*`
  - `open-sse/翻译器/请求/*`
  - `open-sse/翻译器/响应/*`### Phase 5: 75% -> 80%

- [ ] 添加处理程序级别测试：
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] 为特定于提供者的身份验证、重试和端点覆盖添加执行器分支覆盖范围### Phase 6: 80% -> 85%

- [ ] 将更多边缘情况套件合并到主要覆盖路径中
- [ ] 增加构造函数/辅助函数覆盖范围较弱的数据库模块的函数覆盖范围
- [ ] 关闭 `settings.ts`、`registeredKeys.ts`、`validation.ts` 和翻译助手中的分支间隙### Phase 7: 85% -> 90%

- [ ] 将剩余的低覆盖率文件视为阻止程序
- [ ] 为推送至 90% 期间修复的每个未发现的生产错误添加回归测试
- [ ] 仅在局部基线至少连续两次运行稳定后，才提高 CI 中的覆盖门限## Ratchet policy

仅在项目实际超过下一个里程碑并具有舒适的缓冲区后，才更新“npm run test：覆盖率”阈值。

推荐的棘轮顺序：

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

顺序是“语句行/分支/函数”。## Known gap

当前的覆盖命令测量主节点单元套件并包括从它到达的源，包括“open-sse”。它还没有将 Vitest 的覆盖范围合并到一个统一的报告中。该合并值得稍后进行，但它并不是开始 60% -> 80% 爬升的障碍。
