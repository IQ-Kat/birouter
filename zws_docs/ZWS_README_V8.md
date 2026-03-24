# ZWS_README_V8 — 上游额外 HTTP 头、别名/族内 fallback 一致性、校验与文案硬化

> **仅供 ZWS 作者自用**，非项目正式文档；其他协作者请以仓库根目录 `AGENTS.md` 为准。

V5 已完成按协议维度的模型兼容性（`compatByProtocol`、Map 查找优化等）。V8 在 V5 基础上补齐 **模型级「发往上游的额外请求头」** 全链路：Dashboard 配置 → API/Zod → SQLite → `chatCore` 与执行器合并；并修复 **别名解析与族内 fallback** 下「头与真实调用模型不一致」的行为；同步 **禁止头名单**、**Zod 与 sanitize 对齐**、**401 重试参数一致性**、**启动脚本读合并后 env**、**instrumentation 字面量 import** 等。

---

## 一、如何发现问题

### 现象与审查结论

1. **别名与 header 查找 key 不一致**  
   `getModelUpstreamExtraHeaders(provider, model, sourceFormat)` 若只使用客户端原始 `model`，而用户在 Dashboard 把 `upstreamHeaders` 配在 **解析后的 canonical id** 上，则客户端仍用别名调用时，**请求可能不带配置的头**。

2. **T5 族内模型 fallback**  
   `executeProviderRequest(nextModel)` 若始终传入外层一次性算好的 `upstreamExtraHeaders`（对应首次 **`effectiveModel`**），则族内从模型 A 切到 B 时，**可能仍带 A 的头**。

3. **401/403 刷新后重试**  
   `executor.execute` 第一个参数仍传 **原始 `model`**，与主路径里 `translatedBody.model === effectiveModel` 不一致，存在 **边缘路径与主路径漂移**。

4. **API 与落库静默不一致**  
   Zod 对 header 值未禁止 `\r\n` 时，可能出现 **校验通过但 sanitize 落库丢字段**。

5. **hop-by-hop / 帧相关头**  
   除 `Host` 外未统一禁止 `Connection`、`Transfer-Encoding`、`Content-Length` 等，纵深防御不足。

6. **自定义头覆盖鉴权**  
   `mergeUpstreamExtraHeaders` 在鉴权之后应用，**同名会覆盖**（如 `Authorization` 覆盖 Bearer）。需在 UI/文档标明 **高权限**，且避免向终端用户强调实现细节。

7. **Zod 4 与 PATCH**  
   `compatByProtocol` 使用 `z.record` 时对缺失键校验过严，**仅 PATCH 单协议** 可能失败；需改为 **稀疏 patch**（如 `partialRecord`）。

8. **启动与 dev**  
   `.env` 中 `PORT` / `DASHBOARD_PORT` / `OMNIROUTE_USE_TURBOPACK` 若未在 `bootstrapEnv` 之后参与解析，launcher 行为与预期不一致；`instrumentation` 动态 import 在 dev 下可能出现 **MODULE_NOT_FOUND**，需改为字面量子路径。

### 排查过程

1. 沿链路追踪：`providers/[id]/page.tsx` → `PUT /api/provider-models` → `models.ts` → `getModelUpstreamExtraHeaders` → `chatCore` → `BaseExecutor.mergeUpstreamExtraHeaders`。  
2. 对照 `resolveModelAlias`、`effectiveModel`、T5 `getNextFamilyFallback` 的调用点，确认 `upstreamExtraHeaders` 闭包是否绑定错误模型。  
3. 对照 `sanitizeUpstreamHeadersMap` 与 `schemas.ts` 中 record 的 value 规则。  
4. 将禁止头名抽为 **单一常量源**，避免 Zod / sanitize / 文档三套漂移。

---

## 二、根因分析

### 根因 1（P1）：`chatCore` 仅用「原始 model」取 upstream headers

`getModelUpstreamExtraHeaders` 单次调用只覆盖传入的 `modelId`。别名场景下配置写在 **resolved id** 上时，仅传客户端别名会 **lookup  miss**。

### 根因 2（P1）：族内 fallback 复用首次合并结果

`upstreamExtraHeaders` 在 `executeProviderRequest` 外只算一次，**不随 `modelToCall` 变化**，导致 fallback 模型与头配置 **错配**。

### 根因 3（P2）：401 重试路径未与主路径对齐

重试分支直接 `executor.execute({ model, ... })`，**未使用 `effectiveModel`**，与 `translatedBody.model` 及格式检测链不一致。

### 根因 4（P2）：Zod 与 sanitize 对 header value 规则不一致

`z.string().max(4096)` 允许换行；sanitize 丢弃含 `\r`/`\n` 的值 → **静默丢配置**。

### 根因 5（P3）：禁止头名单分散

Host 单独判断、其余 hop-by-hop 未系统化，维护成本高且易漏（如 `content-length`）。

### 根因 6（工程）：PATCH 语义与 Zod `record` 行为

Zod 4 下全键 `record` 与「只提交部分协议」的 PATCH 语义冲突，需 **partialRecord** 或等价稀疏结构。

---

## 三、修复方案

### 修复 1：`src/shared/constants/upstreamHeaders.ts`（单一事实来源）

- 导出 `isForbiddenUpstreamHeaderName(name)`。  
- 禁止集合包含：`host`、`connection`、`content-length`、`keep-alive`、`proxy-connection`、`transfer-encoding`、`te`、`trailer`、`upgrade`（小写比较）。  
- 文件头注释注明：**改列表须同步** `models.ts`（sanitize）、`schemas.ts`（Zod）、`tests/unit/upstream-headers-sanitize.test.mjs`。

### 修复 2：`models.ts` — `sanitizeUpstreamHeadersMap` / `isValidUpstreamHeaderName`

- 使用 `isForbiddenUpstreamHeaderName` 替代仅 `host` 特判。  
- **`getModelUpstreamExtraHeaders` JSDoc**：说明 `modelId` 以 canonical 为准；接受别名的调用方（如 chat 代理）应 **合并别名与 `resolveModelAlias`**，并指向 `chatCore`。

### 修复 3：`schemas.ts` — 与 sanitize 对齐

- `upstreamHeaderNameSchema`：refine 调用 `isForbiddenUpstreamHeaderName`。  
- `upstreamHeaderValueSchema`：`max(4096)` + **禁止 `\r`/`\n`**。  
- `upstreamHeadersRecordSchema`：条数上限 + 键层面禁止集合。  
- `compatByProtocol`：**partialRecord**（或项目内等价实现），支持稀疏 PATCH。

### 修复 4：`chatCore.ts` — `buildUpstreamHeadersForExecute(modelToCall)`

- **`modelToCall === effectiveModel`（主路径）**：  
  ```text
  spread: getModelUpstreamExtraHeaders(provider, model, sourceFormat)
  then: getModelUpstreamExtraHeaders(provider, resolvedModel, sourceFormat)
  ```  
  **后者覆盖同名 key**（解析后 id 侧优先于客户端别名侧）。

- **`modelToCall !== effectiveModel`（T5 族内 fallback）**：  
  仅  
  `getModelUpstreamExtraHeaders(provider, modelToCall, …)`  
  +  
  `getModelUpstreamExtraHeaders(provider, resolveModelAlias(modelToCall), …)`  
  **不再混入**原始请求 `model` / 首次 `resolvedModel`，避免 A 的头带到 B。

- **`executeProviderRequest`**：`upstreamExtraHeaders: buildUpstreamHeadersForExecute(modelToCall)`，**每轮调用按模型重算**。

### 修复 5：`chatCore.ts` — 401/403 刷新后重试

- `model: effectiveModel`（不再用原始 `model`）。  
- `upstreamExtraHeaders: buildUpstreamHeadersForExecute(effectiveModel)`。

### 修复 6：执行器 — `mergeUpstreamExtraHeaders`（行为保持，文档化）

- 仍在 **鉴权等默认头之后** 合并；**同名 key 覆盖**。  
- `ExecuteInput` 注释已说明「values override same-named defaults」。

### 修复 7：紧急预算回退（emergency fallback）

- **`fbExecutor.execute` 不传 `upstreamExtraHeaders`**（换 provider/model，避免把原模型头带到 fallback 目标）。**保持 intentionally**。

### 修复 8：Dashboard — `page.tsx`

- **`ModelCompatSavePatch`**：`normalizeToolCallId`、`preserveOpenAIDeveloperRole`、顶层 **`upstreamHeaders`**、`compatByProtocol`（与 API / `ModelCompatPerProtocol` 形状一致）。  
- 上游头 UI：`ModelCompatPopover`、失焦/关面板提交、`compatUpstreamHeadersHint` 等（细节见 V5 UI 演进与本轮 i18n）。

### 修复 9：i18n — `compatUpstreamHeadersHint`（zh-CN / en）

- 说明：高权限、合并顺序、**同名覆盖鉴权头**、401 风险。  
- **不**在文案中强调「明文存数据库」等实现细节（产品要求）。

### 修复 10：`AGENTS.md`

- 增加 **Upstream model extra headers** 短节：主路径双 lookup 与 **resolved 侧同名优先**；T5 **仅对 fallback 模型重算**；禁止名单与三处同步。

### 修复 11：单测 — `tests/unit/upstream-headers-sanitize.test.mjs`

- 禁止名（含 `content-length`）、值含换行丢弃、最多 16 条。

### 修复 12：启动与 instrumentation（与 V4 并列的工程项）

- `scripts/run-next.mjs`：**先 `bootstrapEnv()`，再 `resolveRuntimePorts(env)`**；`OMNIROUTE_USE_TURBOPACK` 从合并后的 `env` 读取。  
- `instrumentation.ts`：使用 **字面量** `import("./instrumentation-node")`（或项目内等价路径），避免 dev 下动态段导致的 **MODULE_NOT_FOUND**。  
- `open-sse/config/credentialLoader.ts`：可用 `globalThis` **防抖日志**（避免 HMR 刷屏），不引入新敏感数据。

---

## 四、使用方式（运维 / 产品）

1. **Dashboard** → 厂商 → 模型 → **兼容性**弹层：按协议配置 **上游额外请求头**（名称 + 值；值字段可悬停/聚焦查看）。  
2. 保存时机：失焦、点空白、关闭弹层等（以当前 `page.tsx` 行为为准）。  
3. **主路径**：同时识别 **客户端写的 model id** 与 **解析后的 id** 上的配置；**两处都有且同名 header 冲突时，解析后 id 侧获胜**。  
4. **族内 fallback**：自动切换为 **当前 fallback 模型** 及其别名解析上的配置，**不继承**首次模型的额外头。  
5. **不要**在自定义头里随意填写与系统重复的 `Authorization`，除非明确需要覆盖 Bearer（高权限场景）。  
6. 禁止的头名在 UI/API 层会被拒绝；与 framing 相关的头不应由用户注入。

---

## 五、预期效果

| 维度 | 修复前 | 修复后 |
|------|--------|--------|
| 别名 + 配置在 canonical id | 可能不带配置头 | 主路径双 lookup，resolved 侧覆盖同名键 |
| T5 族内 fallback | 可能携带首次模型的头 | 按 fallback 模型（+其 alias 解析）重算 |
| 401/403 重试 `execute.model` | 可能为原始 `model` | 与 `effectiveModel` / body 一致 |
| Zod vs sanitize（header value） | 可能 200 后静默丢 | 值含换行 → 400 |
| 禁止头 | Host 等零散 | 统一常量 + content-length 等 |
| PATCH `compatByProtocol` | 易触发全键校验问题 | 稀疏 partialRecord |
| 文案 | 不易理解覆盖 Bearer | 高权限与风险说明清楚，不强调存库实现细节 |

---

## 六、涉及文件清单（核心）

| 区域 | 文件 | 说明 |
|------|------|------|
| 禁止头常量 | `src/shared/constants/upstreamHeaders.ts` | 单一来源 |
| 存储与 sanitize | `src/lib/db/models.ts` | `sanitizeUpstreamHeadersMap`、`getModelUpstreamExtraHeaders` 注释 |
| Zod | `src/shared/validation/schemas.ts` | header 名/值、`compatByProtocol` partialRecord |
| Chat 管线 | `open-sse/handlers/chatCore.ts` | `buildUpstreamHeadersForExecute`、401 重试 |
| 执行器 | `open-sse/executors/base.ts` | `mergeUpstreamExtraHeaders`（行为未改，语义依赖） |
| API | `src/app/api/provider-models/route.ts` | 与 schema 一致 |
| Dashboard | `src/app/(dashboard)/dashboard/providers/[id]/page.tsx` | `ModelCompatSavePatch`、上游头 UI |
| i18n | `src/i18n/messages/zh-CN.json`、`en.json` | `compatUpstreamHeadersHint` 等 |
| 文档 | `AGENTS.md` | 上游头合并与 T5 行为摘要 |
| 测试 | `tests/unit/upstream-headers-sanitize.test.mjs` | sanitize 行为 |
| 启动 | `scripts/run-next.mjs`、`src/instrumentation.ts` | env / Turbopack / instrumentation-node |
| 日志防抖 | `open-sse/config/credentialLoader.ts` | 可选 HMR 防抖 |

---

## 七、回退方案

- **关闭「按模型重算头」**：将 `executeProviderRequest` 内改回固定对象（**不推荐**，会复活 T5 错配）。  
- **主路径不合并别名**：去掉对 `resolvedModel` 的第二次 `getModelUpstreamExtraHeaders`（**不推荐**，会复活 canonical 配置不生效）。  
- **禁止头列表**：从 `upstreamHeaders.ts` 删减时务必同步 Zod、sanitize、单测，否则会出现「API 与运行时行为不一致」。  
- **partialRecord**：若需恢复严格全键校验，需同时调整前端 PATCH 载荷为「总是带全协议键」。

---

## 八、与 V5 的边界

- **V5**：`compatByProtocol` 下 **normalizeToolCallId / preserveOpenAIDeveloperRole** 的按协议读写、`sourceFormat` 传入 `chatCore` getter、前端协议选择与 Map 优化。  
- **V8**：在同一 `compatByProtocol`（及顶层）上扩展 **`upstreamHeaders`** 的端到端行为，以及 **chat 路径上「头与 model id 一致」** 的修正与校验硬化。  
- 阅读顺序建议：**V4（启动/HMR）→ V5（按协议兼容开关）→ V8（上游头 + fallback/别名）**。

---

## 九、后续补丁：T06 路由校验与 Zed `keytar`（CI / `next build`）

### T06：`check-route-validation.mjs`

脚本要求：凡调用 `request.json()` 的同文件内须出现 `validateBody(`。已补全：

- `src/app/api/providers/[id]/test/route.ts` — 可选 body，`validationModelId`  
- `src/app/api/v1/accounts/[id]/limits/route.ts`  
- `src/app/api/v1/issues/report/route.ts`  
- `src/app/api/v1/providers/[provider]/limits/route.ts`  
- `src/app/api/v1/registered-keys/route.ts`（POST）

校验失败时错误体与项目其余 API 一致：`{ error: { message, details[] } }`（部分路由由原先的 Zod `flatten()` 改为该形状）。

### Zed 导入与 Linux CI

`src/lib/zed-oauth/keychain-reader.ts` 顶层 **`import keytar`** 会在 `next build` 收集路由数据时加载原生模块；无 `libsecret` 的 Linux runner 会失败。改为 **`await import("keytar")`** 动态加载，失败则 **跳过读钥匙串**（返回空列表 / null），构建不再依赖本机 keytar。

> 若本文随上游合并，可删除文首「仅供 ZWS 作者自用」一句；**ZWS** 为贡献者笔名，可保留作变更索引。

### T11：`check:any-budget:t11`

脚本 `scripts/check-t11-any-budget.mjs` 用正则统计文件中 **单词 `any`**（含注释里的英文 *any*）。失败原因通常是：注释误触（如 “type **any** model ID”）、或真实 `: any` / `as any`。处理方式：改写注释用词、用 `unknown` / `Record<string, unknown>` / 显式接口替代 `any`。`open-sse/utils/stream.ts` 中 passthrough 分支原先对 `state`（在 passthrough 模式下为 `null`）做 `(state as any).passthroughHasToolCalls`，已改为闭包内独立布尔变量 `passthroughHasToolCalls`。
