# OmniRoute Auto-Combo Engine (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> 具有自适应评分功能的自我管理模型链## How It Works

自动组合引擎使用**6 因素评分函数**为每个请求动态选择最佳提供商/模型：

| 因素     | 重量 | 描述                                     |
| :------- | :--- | :--------------------------------------- | ------------- |
| 配额     | 0.20 | 0.20剩余容量[0..1]                       |
| 健康     | 0.25 | 0.25断路器：闭合=1.0，一半=0.5，打开=0.0 |
| 成本Inv  | 0.20 | 0.20逆成本（更便宜=更高的分数）          |
| 延迟Inv  | 0.15 | 0.15逆 p95 延迟（更快 = 更高）           |
| 任务适应 | 0.10 | 0.10模型×任务类型适应度评分              |
| 稳定性   | 0.10 | 0.10延迟/错误的低方差                    | ## Mode Packs |

|包 |焦点|关键重量|
| :---------------------- | ：---------- | ：-------------- |
| 🚀**快速发货**|速度|延迟Inv：0.35 |
| 💰**节省成本**|经济|成本：0.40 |
| 🎯**品质第一**|最佳模特|任务适合度：0.40 |
| 📡**离线友好**|可用性 |配额：0.40 |## Self-Healing

-**临时排除**：分数 < 0.2 → 排除 5 分钟（渐进退避，最长 30 分钟）-**断路器意识**：打开→自动排除； HALF_OPEN → 探测请求 -**事件模式**：>50% OPEN → 禁用探索，最大化稳定性 -**冷却恢复**：排除后，第一个请求是超时时间缩短的“探测”## Bandit Exploration

5% 的请求（可配置）被路由到随机提供者进行探索。在事件模式下禁用。## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30 多个模型在 6 种任务类型（“编码”、“审查”、“规划”、“分析”、“调试”、“文档”）中进行评分。支持通配符模式（例如，“\*-coder”→高编码分数）。## Files

|文件|目的|
| ：-------------------------------------------------------- | :------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts` |评分函数和池标准化 |
| `open-sse/services/autoCombo/taskFitness.ts` |模型×任务适应度查找|
| `open-sse/services/autoCombo/engine.ts` |选择逻辑、强盗、预算上限 |
| `open-sse/services/autoCombo/selfHealing.ts` |排除、探测、事件模式 |
| `open-sse/services/autoCombo/modePacks.ts` | 4 种体重概况 |
| `src/app/api/combos/auto/route.ts` |休息 API |
