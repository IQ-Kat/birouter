# ZWS_README_V3 — V2 完成 + 按协议配置兼容性

V2 内容（developer 角色与 role param error 修复）已完成；V3 在 V2 基础上实现**按协议维度配置兼容性**，并修复客户端构建与深色模式显示问题。

---

## 一、V2 摘要（已完成）

- **问题**：OpenAI Responses API 的 `developer` 角色经 OmniRoute 转发到 MiniMax 等网关时触发 422 `role param error`。
- **修复**：`roleNormalizer` 按 `preserveDeveloperRole` 统一做 developer→system；translator 不硬编码；三态存储（undefined/true/false）；前端「兼容性」弹层提供「不保留 developer 角色」开关，默认不勾选=保留。
- 详见 **ZWS_README_V2.md** 第一～三节及第五节文件列表。

---

## 二、V3：按协议配置兼容性

### 2.1 目标

- 同一模型可被多种**客户端请求形态**调用（OpenAI Chat、OpenAI Responses、Anthropic Messages 等），兼容选项应对**协议**生效，而非全局。
- 用户为每种协议单独配置「工具 ID 9 位」「不保留 developer 角色」，避免误导（V2 时未标明协议）。

### 2.2 协议维度

- **协议键**：`openai`（Chat Completions）、`openai-responses`（Responses API）、`claude`（Anthropic Messages），与 `detectFormat(body)` 的返回值一致。
- **存储**：在原有 `normalizeToolCallId` / `preserveOpenAIDeveloperRole` 顶层字段基础上，增加 **`compatByProtocol`**：
  - `compatByProtocol[protocol] = { normalizeToolCallId?, preserveOpenAIDeveloperRole? }`
  - 路由时按请求的 **sourceFormat** 优先读取 `compatByProtocol[sourceFormat]`，无则回退到顶层字段。

### 2.3 后端

- **`src/lib/db/models.ts`**
  - 引入 **`MODEL_COMPAT_PROTOCOL_KEYS`** 与 **`ModelCompatProtocolKey`** 自 **`@/shared/constants/modelCompat`**（见 2.5）。
  - **ModelCompatOverride** / custom model 行支持 **`compatByProtocol`**；**mergeModelCompatOverride**、**updateCustomModel** 支持对 `compatByProtocol` 做深度合并。
  - **getModelNormalizeToolCallId(providerId, modelId, sourceFormat?)**、**getModelPreserveOpenAIDeveloperRole(..., sourceFormat?)** 增加第三参 **sourceFormat**；若为已知协议则优先用 `compatByProtocol[sourceFormat]`，否则用顶层字段。
- **`open-sse/handlers/chatCore.ts`**
  - 调用上述 getter 时传入当前请求的 **sourceFormat**（由 `detectFormat(body)` 得到），从而按客户端请求形态选用对应协议配置。
- **`src/app/api/provider-models/route.ts`**
  - PUT body 支持 **compatByProtocol**（校验与写入）；仅更新兼容配置时也可只传 `compatByProtocol`，走 **mergeModelCompatOverride**。
- **`src/shared/validation/schemas.ts`**
  - **providerModelMutationSchema** 增加 **compatByProtocol**：`z.record(z.string(), modelCompatPerProtocolSchema).optional()`。

### 2.4 前端

- **兼容性弹层（ModelCompatPopover）**
  - 增加 **「客户端请求协议」** 下拉：OpenAI Chat Completions、OpenAI Responses API、Anthropic Messages。
  - 下方两个开关（工具 ID 9 位、不保留 developer）**针对当前选中的协议**生效；选 Claude 时仅展示工具 ID 开关（developer 仅对 OpenAI 系有意义）。
  - 保存时调用 **saveModelCompatFlags(modelId, { compatByProtocol: { [protocol]: payload } })**，与后端按协议合并。
- **解析与角标**
  - **effectiveModelNormalize** / **effectiveModelPreserveDeveloper** 增加 **protocol** 参数，按 **effectiveNormalizeForProtocol** / **effectivePreserveForProtocol** 从 customModels + modelCompatOverrides 的 **compatByProtocol** 与顶层字段解析。
  - 角标「ID×9」「不保留」：任意协议存在对应配置即显示（**anyNormalizeCompatBadge** / **anyNoPreserveCompatBadge**）。
- **自定义模型**
  - 列表拉取并展示 **modelCompatOverrides**；编辑区内兼容性弹层同样按协议选择并保存 **compatByProtocol**；支持仅传 **compatByProtocol** 的 PUT。
- **深色模式**
  - 协议下拉框使用 **bg-white dark:bg-zinc-800**、**text-zinc-900 dark:text-zinc-100**，保证深色主题下可读。

### 2.5 客户端安全常量（解决构建报错）

- **问题**：`page.tsx`（"use client"）从 **@/lib/localDb** 引入 **MODEL_COMPAT_PROTOCOL_KEYS** 时，会间接拉取 **db/proxies.ts**（使用 **node:crypto**），Webpack 报 `UnhandledSchemeError: Reading from "node:crypto" is not handled`。
- **处理**：
  - 新增 **`src/shared/constants/modelCompat.ts`**，仅定义 **MODEL_COMPAT_PROTOCOL_KEYS** 与 **ModelCompatProtocolKey**，不依赖 Node/DB。
  - **models.ts** 从 **@/shared/constants/modelCompat** 引入并再导出；**localDb** 不再导出 **MODEL_COMPAT_PROTOCOL_KEYS**；**page.tsx** 改为从 **@/shared/constants/modelCompat** 引入。客户端不再经过 localDb → db → proxies → node:crypto。

### 2.6 i18n（V3 新增）

- **compatProtocolLabel**、**compatProtocolHint**、**compatProtocolOpenAI**、**compatProtocolOpenAIResponses**、**compatProtocolClaude**（中/英），见 `src/i18n/messages/`。

---

## 三、使用方式（V3）

- 点击模型行的 **「兼容性」**，在弹层内先选择 **「客户端请求协议」**（OpenAI Chat / OpenAI Responses / Anthropic Messages），再勾选该协议下的「工具 ID 9 位」或「不保留 developer 角色」；保存后仅在该协议形态的请求下生效。
- 未配置某协议时，该协议下行为回退到顶层兼容字段（若存在）或默认（保留 developer、不规范化 tool id）。

---

## 四、涉及文件摘要（V3）

| 区域       | 文件                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 协议常量   | `src/shared/constants/modelCompat.ts`（新建，客户端安全）                                                                                   |
| 配置与读写 | `src/lib/db/models.ts`（compatByProtocol、getter 第三参）、`src/lib/localDb.ts`（不再导出协议常量）、`src/app/api/provider-models/route.ts` |
| 校验       | `src/shared/validation/schemas.ts`（compatByProtocol）                                                                                      |
| 请求管线   | `open-sse/handlers/chatCore.ts`（传入 sourceFormat）                                                                                        |
| 前端 UI    | `src/app/(dashboard)/dashboard/providers/[id]/page.tsx`（协议选择器、按协议解析/保存、角标、深色 select）                                   |
| 文案       | `src/i18n/messages/zh-CN.json`，`src/i18n/messages/en.json`                                                                                 |

V2 涉及文件仍见 **ZWS_README_V2.md** 第五节；上表仅列出 V3 新增或修改部分。

---

以上为 V3 版本说明；V2 逻辑保留，V3 在此基础上完成按协议配置兼容性及构建/深色模式修复。
