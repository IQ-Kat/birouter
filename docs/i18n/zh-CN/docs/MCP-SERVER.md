# OmniRoute MCP Server Documentation (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> 具有 16 个智能工具的模型上下文协议服务器## 安装

OmniRoute MCP 是内置的。开始：```bash
omniroute --mcp

````

或者通过 open-sse 传输：```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

有关 Antigravity、Cursor、Copilot 和 Claude Desktop 设置，请参阅 [IDE 配置](integrations/ide-configs.md)。---

## Essential Tools (8)

| 工具                            | 描述                               |
| :------------------------------ | :--------------------------------- | --------------------- |
| `omniroute_get_health`          | 网关运行状况、断路器、正常运行时间 |
| `omniroute_list_combos`         | 所有已配置的组合与模型             |
| `omniroute_get_combo_metrics`   | 特定组合的性能指标                 |
| `omniroute_switch_combo`        | 按 ID/名称切换活动组合             |
| `omniroute_check_quota`         | 每个提供商或所有提供商的配额状态   |
| `omniroute_route_request`       | 通过 OmniRoute 发送聊天完成信息    |
| `omniroute_cost_report`         | 一段时间的成本分析                 |
| `omniroute_list_models_catalog` | 具有功能的完整型号目录             | ## Advanced Tools (8) |

| 工具                               | 描述                                       |
| :--------------------------------- | :----------------------------------------- | ----------------- |
| `omniroute_simulate_route`         | 使用后备树进行试运行路由模拟               |
| `omniroute_set_budget_guard`       | 具有降级/阻止/警报操作的会话预算           |
| `omniroute_set_resilience_profile` | 应用保守/平衡/激进预设                     |
| `omniroute_test_combo`             | 通过真实的上游请求实时测试组合中的所有模型 |
| `omniroute_get_provider_metrics`   | 某一提供商的详细指标                       |
| `omniroute_best_combo_for_task`    | 任务健身建议及替代方案                     |
| `omniroute_explain_route`          | 解释过去的路由决策                         |
| `omniroute_get_session_snapshot`   | 完整会话状态：成本、令牌、错误             | ## Authentication |

MCP 工具通过 API 密钥范围进行身份验证。每个工具都需要特定的范围：

| 范围         | 工具                                             |
| :----------- | :----------------------------------------------- | ---------------- |
| `阅读：健康` | get_health、get_provider_metrics                 |
| `阅读：组合` | 列表组合、获取组合指标                           |
| `写：组合`   | 开关组合                                         |
| `阅读：配额` | 检查配额                                         |
| `写：路线`   | 路由请求、模拟路由、测试组合                     |
| `阅读：用法` | cost_report、get_session_snapshot、explain_route |
| `写：配置`   | set_budget_guard、set_resilience_profile         |
| `阅读：模型` | list_models_catalog，best_combo_for_task         | ## Audit Logging |

每个工具调用都会记录到“mcp_tool_audit”中：

- 工具名称、参数、结果
- 持续时间（毫秒）、成功/失败
- API 密钥哈希、时间戳## Files

|文件|目的|
| ：-------------------------------------------------------- | :------------------------------------------ |
| `open-sse/mcp-server/server.ts` | MCP服务器创建+16个工具注册|
| `open-sse/mcp-server/transport.ts` | Stdio + HTTP 传输 |
| `open-sse/mcp-server/auth.ts` | API 密钥 + 范围验证 |
| `open-sse/mcp-server/audit.ts` |工具调用审计日志记录|
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 个高级工具处理程序 |
