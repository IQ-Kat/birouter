🌐 **语言:** 🇺🇸 [English](../../MCP-SERVER.md) · 🇧🇷 [pt-BR](../pt-BR/MCP-SERVER.md) · 🇪🇸 [es](../es/MCP-SERVER.md) · 🇫🇷 [fr](../fr/MCP-SERVER.md) · 🇩🇪 [de](../de/MCP-SERVER.md) · 🇮🇹 [it](../it/MCP-SERVER.md) · 🇷🇺 [ru](../ru/MCP-SERVER.md) · 🇨🇳 [zh-CN](../zh-CN/MCP-SERVER.md) · 🇯🇵 [ja](../ja/MCP-SERVER.md) · 🇰🇷 [ko](../ko/MCP-SERVER.md) · 🇸🇦 [ar](../ar/MCP-SERVER.md) · 🇮🇳 [in](../in/MCP-SERVER.md) · 🇹🇭 [th](../th/MCP-SERVER.md) · 🇻🇳 [vi](../vi/MCP-SERVER.md) · 🇮🇩 [id](../id/MCP-SERVER.md) · 🇲🇾 [ms](../ms/MCP-SERVER.md) · 🇳🇱 [nl](../nl/MCP-SERVER.md) · 🇵🇱 [pl](../pl/MCP-SERVER.md) · 🇸🇪 [sv](../sv/MCP-SERVER.md) · 🇳🇴 [no](../no/MCP-SERVER.md) · 🇩🇰 [da](../da/MCP-SERVER.md) · 🇫🇮 [fi](../fi/MCP-SERVER.md) · 🇵🇹 [pt](../pt/MCP-SERVER.md) · 🇷🇴 [ro](../ro/MCP-SERVER.md) · 🇭🇺 [hu](../hu/MCP-SERVER.md) · 🇧🇬 [bg](../bg/MCP-SERVER.md) · 🇸🇰 [sk](../sk/MCP-SERVER.md) · 🇺🇦 [uk-UA](../uk-UA/MCP-SERVER.md) · 🇮🇱 [he](../he/MCP-SERVER.md) · 🇵🇭 [phi](../phi/MCP-SERVER.md)

---

# OmniRoute MCP 服务器文档

> Model Context Protocol 服务器，包含 16 个智能工具

## 安装

OmniRoute MCP 已内置。使用以下命令启动：

```bash
omniroute --mcp
```

或通过 open-sse 传输方式：

```bash
# HTTP 可流式传输 (端口 20130)
omniroute --dev  # MCP 在 /mcp 端点自动启动
```

## IDE 配置

请参阅 [IDE Configs](integrations/ide-configs.md) 了解 Antigravity、Cursor、Copilot 和 Claude Desktop 的设置方法。

---

## 基础工具 (8 个)

| 工具                            | 描述                              |
| :------------------------------ | :-------------------------------- |
| `omniroute_get_health`          | 网关健康状态、熔断器、运行时间     |
| `omniroute_list_combos`         | 所有已配置的组合及其模型           |
| `omniroute_get_combo_metrics`   | 特定组合的性能指标                 |
| `omniroute_switch_combo`        | 通过 ID/名称切换活动组合           |
| `omniroute_check_quota`         | 按服务商或全部查询配额状态         |
| `omniroute_route_request`       | 通过 OmniRoute 发送聊天完成请求    |
| `omniroute_cost_report`         | 指定时间段的成本分析               |
| `omniroute_list_models_catalog` | 完整模型目录及能力说明             |

## 高级工具 (8 个)

| 工具                               | 描述                                  |
| :--------------------------------- | :------------------------------------ |
| `omniroute_simulate_route`         | 带有回退树的路由模拟（空跑）           |
| `omniroute_set_budget_guard`       | 会话预算及降级/阻止/告警操作           |
| `omniroute_set_resilience_profile` | 应用保守/平衡/激进预设                 |
| `omniroute_test_combo`             | 实时测试组合中的所有模型               |
| `omniroute_get_provider_metrics`   | 单个服务商的详细指标                   |
| `omniroute_best_combo_for_task`    | 任务适配推荐及替代方案                 |
| `omniroute_explain_route`          | 解释历史路由决策                       |
| `omniroute_get_session_snapshot`   | 完整会话状态：成本、token、错误        |

## 身份验证

MCP 工具通过 API 密钥作用域进行身份验证。每个工具需要特定的作用域：

| 作用域         | 工具                                             |
| :------------- | :----------------------------------------------- |
| `read:health`  | get_health, get_provider_metrics                 |
| `read:combos`  | list_combos, get_combo_metrics                   |
| `write:combos` | switch_combo                                     |
| `read:quota`   | check_quota                                      |
| `write:route`  | route_request, simulate_route, test_combo        |
| `read:usage`   | cost_report, get_session_snapshot, explain_route |
| `write:config` | set_budget_guard, set_resilience_profile         |
| `read:models`  | list_models_catalog, best_combo_for_task         |

## 审计日志

每个工具调用都会记录到 `mcp_tool_audit`，包含：

- 工具名称、参数、结果
- 耗时（毫秒）、成功/失败状态
- API 密钥哈希值、时间戳

## 文件

| 文件                                         | 用途                              |
| :------------------------------------------- | :-------------------------------- |
| `open-sse/mcp-server/server.ts`              | MCP 服务器创建 + 16 个工具注册     |
| `open-sse/mcp-server/transport.ts`           | Stdio + HTTP 传输                 |
| `open-sse/mcp-server/auth.ts`                | API 密钥 + 作用域验证              |
| `open-sse/mcp-server/audit.ts`               | 工具调用审计日志                   |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 个高级工具处理器                 |
