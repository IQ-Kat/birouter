# zws_docs（ZWS 作者自用 + PR 备忘归档）

> **本目录**以 ZWS 作者备忘为主；其中 **「给上游 PR 的备忘」** 一节可直接给维护者看或贴进 PR 评论，便于 review。全员架构仍以仓库根目录 **`AGENTS.md`** 为准。

---

## 本目录用途

- **ZWS_README_V*.md**：版本化变更记录（现象、根因、方案、文件清单、回退、后续 CI 补丁）。
- **PR_DRAFT_FOR_UPSTREAM.md**：英文 PR 描述草稿（可复制到 GitHub）。
- **本 README**：项目速记 + **记忆归档**（检查脚本行为、提交习惯、PR 链接等）。

---

## 给上游 PR 的备忘（记忆归档）

### 已开 PR（示例，以 GitHub 实际为准）

- **上游仓库**：`diegosouzapw/OmniRoute`
- **PR**：https://github.com/diegosouzapw/OmniRoute/pull/575（若编号变化请自行替换）
- **来源分支**：fork `zhangqiang8vip/OmniRoute` 的 **`feat/zws-v8`** → `base: main`

### PR 主体功能（V8 大包）

- 模型级 **上游额外 HTTP 头**（Dashboard → `PUT /api/provider-models` → DB → `chatCore` → `mergeUpstreamExtraHeaders`）。
- **别名**：`buildUpstreamHeadersForExecute` 主路径合并 **客户端 model + `resolvedModel`**，解析后 id **同名覆盖**。
- **T5 族内 fallback**：仅对 **fallback 模型 + `resolveModelAlias(fallback)`** 重算头，避免 A 的头带到 B。
- **401/403 重试**：`retryModelId = String(translatedBody.model || effectiveModel)`，与 body 一致。
- **禁止头名单**：`src/shared/constants/upstreamHeaders.ts`（与 `sanitize`、Zod 同步）。
- **Zod**：`compatByProtocol` 稀疏 PATCH；header value 禁止 `\r\n`。
- **Dev**：`run-next.mjs` 先 `bootstrapEnv`；`instrumentation` 字面量子路径；`credentialLoader` 可防抖日志。

### 随 PR 跟进的小补丁（记在 V8 文档「九」及以后）

| 主题 | 说明 |
|------|------|
| **T06** `npm run check:route-validation:t06` | 凡 `request.json()` 的同文件须出现 **`validateBody(`**（脚本文本匹配）。已补 5 个路由；校验失败体为 `{ error: { message, details } }`。 |
| **Zed / Linux CI** | `keychain-reader.ts` **禁止顶层 `import keytar`**，改为 **`await import("keytar")`**，避免无 libsecret 时 `next build` 收集 `/api/providers/zed/import` 失败。 |
| **T11** `npm run check:any-budget:t11` | 用 **`/\bany\b/g` 数单词**，**注释里的 "any" 也算**。需改注释措辞或去掉 `: any` / `as any`。`stream.ts` passthrough 下 **`state` 为 null**，工具调用标记改用闭包变量 **`passthroughHasToolCalls`**。 |

### 提交 / 推送习惯（记忆）

- **不要提交**：`.env`、`.cursor/`、`.idea/`、`.history/`；无 `package.json` 变更时 **不要提交无关的 `package-lock.json` 大 diff**。
- **Husky**：pre-commit 会跑整包 `test:unit`，很慢；本地赶进度可 **`HUSKY=0 git commit`**，但 **CI / 合并前务必自己跑** `npm run test:unit`、`npm run lint`、`npm run build`。
- **给 PR 写正文**：用 **`PR_DRAFT_FOR_UPSTREAM.md`** 裁剪；验证结果可 **`gh pr comment`** 贴表格。

### 维护者若不想收 zws_docs

可在合并时 **只合代码路径**，本目录整夹删除或保留由上游决定；**`AGENTS.md`** 里上游头说明建议保留。

---

## 一、项目摘要（备忘）

**OmniRoute**：统一 AI 代理/路由；`open-sse` 处理 Chat 等；Executor 发上游；SQLite 经 `src/lib/db/*`，`localDb.ts` 仅再导出；MCP、A2A、Combo 等见 `AGENTS.md`。

**数据流（极简）**：客户端 → handlers → 可选 translator → executor（鉴权 + `mergeUpstreamExtraHeaders`）→ 上游。

**易踩坑**：客户端组件勿经 `localDb` 拉 Node 链；协议常量用 `src/shared/constants/`；模型兼容按 `compatByProtocol` + `sourceFormat`；上游头合并与别名/T5 见 **V8** 与 **`AGENTS.md`**。

---

## 二、仓库地图（备忘）

| 关心什么 | 路径 |
|----------|------|
| Chat、别名、T5、上游头 | `open-sse/handlers/chatCore.ts` |
| `resolveModelAlias` 等 | `open-sse/services/modelDeprecation.ts` |
| 模型行、upstreamHeaders | `src/lib/db/models.ts` |
| 执行器合并头 | `open-sse/executors/base.ts` |
| Zod | `src/shared/validation/schemas.ts` |
| 厂商模型 API | `src/app/api/provider-models/route.ts` |
| 厂商详情 UI | `src/app/(dashboard)/dashboard/providers/[id]/page.tsx` |
| 启动 / env | `scripts/run-next.mjs` |
| instrumentation | `src/instrumentation.ts`、`instrumentation-node.ts` |
| Zed keychain | `src/lib/zed-oauth/keychain-reader.ts` |

---

## 三、ZWS 版本文档索引

| 文档 | 说明 |
|------|------|
| [ZWS_README_V4.md](./ZWS_README_V4.md) | 启动与 dev：HMR、globalThis、Turbopack、instrumentation 等 |
| [ZWS_README_V5.md](./ZWS_README_V5.md) | `compatByProtocol`、`sourceFormat`、Map 优化、Zod |
| [ZWS_README_V8.md](./ZWS_README_V8.md) | 上游额外头、别名/T5/401、禁止头、T06/T11/keytar 等 **后续节** |
| [PR_DRAFT_FOR_UPSTREAM.md](./PR_DRAFT_FOR_UPSTREAM.md) | 英文 PR 描述草稿 |

---

## 四、作者自用检查清单

1. 大改前先扫 **`AGENTS.md`** 对应节。  
2. 动兼容/上游头：对照 **V5、V8** 与 `chatCore` / `models` / `schemas`。  
3. 动 dev 启动：对照 **V4** 与 `run-next.mjs` / instrumentation。  
4. 提 PR 前跑：**`npm run check:route-validation:t06`**、**`npm run check:any-budget:t11`**（若 CI 启用）、`npm test`、`npm run lint`、`npm run build`。  
5. 新大块变更可新增 **`ZWS_README_V*.md`** 并在 **第三节** 表内加一行。

---

## 五、维护说明

**ZWS** 维护本目录；若 fork 随上游同步，可把本 README **复制一段「给上游 PR 的备忘」** 到 PR 描述或评论，减少维护者上下文切换。
