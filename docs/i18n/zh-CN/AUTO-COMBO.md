🌐 **语言:** 🇺🇸 [English](../../AUTO-COMBO.md) · 🇧🇷 [pt-BR](../pt-BR/AUTO-COMBO.md) · 🇪🇸 [es](../es/AUTO-COMBO.md) · 🇫🇷 [fr](../fr/AUTO-COMBO.md) · 🇩🇪 [de](../de/AUTO-COMBO.md) · 🇮🇹 [it](../it/AUTO-COMBO.md) · 🇷🇺 [ru](../ru/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../zh-CN/AUTO-COMBO.md) · 🇯🇵 [ja](../ja/AUTO-COMBO.md) · 🇰🇷 [ko](../ko/AUTO-COMBO.md) · 🇸🇦 [ar](../ar/AUTO-COMBO.md) · 🇮🇳 [in](../in/AUTO-COMBO.md) · 🇹🇭 [th](../th/AUTO-COMBO.md) · 🇻🇳 [vi](../vi/AUTO-COMBO.md) · 🇮🇩 [id](../id/AUTO-COMBO.md) · 🇲🇾 [ms](../ms/AUTO-COMBO.md) · 🇳🇱 [nl](../nl/AUTO-COMBO.md) · 🇵🇱 [pl](../pl/AUTO-COMBO.md) · 🇸🇪 [sv](../sv/AUTO-COMBO.md) · 🇳🇴 [no](../no/AUTO-COMBO.md) · 🇩🇰 [da](../da/AUTO-COMBO.md) · 🇫🇮 [fi](../fi/AUTO-COMBO.md) · 🇵🇹 [pt](../pt/AUTO-COMBO.md) · 🇷🇴 [ro](../ro/AUTO-COMBO.md) · 🇭🇺 [hu](../hu/AUTO-COMBO.md) · 🇧🇬 [bg](../bg/AUTO-COMBO.md) · 🇸🇰 [sk](../sk/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../uk-UA/AUTO-COMBO.md) · 🇮🇱 [he](../he/AUTO-COMBO.md) · 🇵🇭 [phi](../phi/AUTO-COMBO.md)

---

# OmniRoute Auto-Combo 引擎

> 具有自适应评分的自管理模型链

## 工作原理

Auto-Combo 引擎使用 **6 因子评分函数** 为每个请求动态选择最佳服务商/模型：

| 因子       | 权重 | 描述                                     |
| :--------- | :--- | :--------------------------------------- |
| Quota      | 0.20 | 剩余容量 [0..1]                          |
| Health     | 0.25 | 熔断器状态：CLOSED=1.0, HALF=0.5, OPEN=0.0 |
| CostInv    | 0.20 | 成本倒数（越便宜得分越高）                |
| LatencyInv | 0.15 | p95 延迟倒数（越快得分越高）              |
| TaskFit    | 0.10 | 模型 × 任务类型适配度                     |
| Stability  | 0.10 | 延迟/错误率的低方差                       |

## 模式包

| 模式包                  | 侧重点 | 关键权重         |
| :---------------------- | :----- | :--------------- |
| 🚀 **Ship Fast**        | 速度   | latencyInv: 0.35 |
| 💰 **Cost Saver**       | 经济   | costInv: 0.40    |
| 🎯 **Quality First**    | 最优模型 | taskFit: 0.40  |
| 📡 **Offline Friendly** | 可用性 | quota: 0.40      |

## 自愈能力

- **临时排除**：评分 < 0.2 → 排除 5 分钟（渐进退避，最长 30 分钟）
- **熔断器感知**：OPEN → 自动排除；HALF_OPEN → 探测请求
- **事故模式**：>50% OPEN → 禁用探索，最大化稳定性
- **冷却恢复**：排除结束后，首个请求为"探测"请求，使用缩短的超时时间

## Bandit 探索

5% 的请求（可配置）会被路由到随机服务商进行探索。在事故模式下禁用。

## API

```bash
# 创建 auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# 列出 auto-combos
curl http://localhost:20128/api/combos/auto
```

## 任务适配度

30+ 个模型在 6 种任务类型（`coding`、`review`、`planning`、`analysis`、`debugging`、`documentation`）上进行评分。支持通配符模式（例如 `*-coder` → 高编码得分）。

## 文件

| 文件                                         | 用途                      |
| :------------------------------------------- | :------------------------ |
| `open-sse/services/autoCombo/scoring.ts`     | 评分函数 & 池归一化        |
| `open-sse/services/autoCombo/taskFitness.ts` | 模型 × 任务适配度查询      |
| `open-sse/services/autoCombo/engine.ts`      | 选择逻辑、bandit、预算上限 |
| `open-sse/services/autoCombo/selfHealing.ts` | 排除、探测、事故模式       |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 种权重配置               |
| `src/app/api/combos/auto/route.ts`           | REST API                   |
