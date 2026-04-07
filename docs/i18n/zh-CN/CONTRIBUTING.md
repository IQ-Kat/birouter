# Contributing to OmniRoute (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

感谢您有兴趣贡献！本指南涵盖了入门所需的一切。---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24（推荐：22 LTS）-**npm**10+ -**吉特**### Clone & Install

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Key variables for development:

| 变量                   | Development Default      | 描述           |
| ---------------------- | ------------------------ | -------------- | ---------------------- |
| `端口`                 | `20128`                  | 服务器端口     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | 前端的基本 URL |
| `JWT_SECRET`           | (generate above)         | JWT 签名秘笈   |
| `初始密码`             | `CHANGEME`               | 首次登录密码   |
| `APP_LOG_LEVEL`        | `info`                   | 日志详细级别   | ### Dashboard Settings |

仪表板提供了功能的 UI 切换，也可以通过环境变量进行配置：

| 设置位置  | 切换         | 描述                  |
| --------- | ------------ | --------------------- |
| 设置→高级 | 调试模式     | 启用调试请求日志 (UI) |
| 设置→常规 | 侧边栏可见性 | 显示/隐藏侧边栏部分   |

这些设置存储在数据库中并在重新启动后保留，并在设置时覆盖环境变量默认值。### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

默认网址：

-**仪表板**：`http://localhost:20128/dashboard` -**API**：`http://localhost:20128/v1`---

## Git Workflow

> ⚠️**永远不要直接提交到 `main`。**始终使用功能分支。```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

|前缀 |目的|
| ----------- | ---------------------------------- |
| `壮举/` |新功能 |
| `修复/` |错误修复 |
| `重构/` |代码重组 |
| `文档/` |文档变更 |
| `测试/` |测试添加/修复 |
| `家务/` |工具、CI、依赖项 |### Commit Messages

遵循[常规提交](https://www.conventionalcommits.org/)：```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

范围：`db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`内存`、`技能`。---

## Running Tests

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.mjs

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (60% min statements/lines/functions/branches)
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check
```

覆盖范围注释：

- `npm run test:coverage` 测量主单元测试套件的源覆盖率，不包括 `tests/**`，并包括 `open-sse/**`
- Pull 请求必须将语句、行、函数和分支的总体覆盖率保持在**60% 或更高**
- 如果 PR 更改了 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生产代码，则必须在同一 PR 中添加或更新自动化测试
- `npm runcoverage:report` 从最新的覆盖率运行中打印详细的逐个文件报告
- `npm run test:coverage:legacy` 保留旧指标以进行历史比较
- 有关分阶段覆盖率改进路线图，请参阅“docs/COVERAGE_PLAN.md”### Pull Request Requirements

在打开或合并 PR 之前：

- 运行“npm run test:unit”
- 运行“npm run test：覆盖率”
- 确保所有指标的覆盖范围保持在**60%+**
- 当生产代码更改时，在 PR 描述中包含更改或添加的测试文件
- 当在 CI 中配置项目机密时，检查 PR 上的 SonarQube 结果

当前测试状态：**122 个单元测试文件**涵盖：

- 提供翻译器和格式转换
- 速率限制、断路器和弹性
- 语义缓存、幂等性、进度跟踪
- 数据库操作和架构（21 个数据库模块）
- OAuth 流程和身份验证
- API端点验证（Zod v4）
- MCP 服务器工具和范围实施
- 记忆和技能系统---

## Code Style

-**ESLint**— 在提交之前运行 `npm run lint` -**Prettier**— 在提交时通过 `lint-staged` 自动格式化（2 个空格、分号、双引号、100 个字符宽度、es5 尾随逗号）-**TypeScript**— 所有 `src/` 代码都使用 `.ts`/`.tsx`； `open-sse/` 使用 `.ts`/`.js`；带有 TSDoc 的文档（`@param`、`@returns`、`@throws`）-**没有 `eval()`**— ESLint 强制执行 `no-eval`、`no-implied-eval`、`no-new-func` -**Zod 验证**— 使用 Zod v4 模式进行所有 API 输入验证 -**命名**：文件 = 驼峰命名法/短横线命名法，组件 = PascalCase，常量 = UPPER_SNAKE---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (21 modules + 16 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (60+), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 14 provider-specific request executors
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (25 tools, 3 transports, 10 scopes)
├── services/               # 36+ services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (25 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Adding a New Provider

### Step 1: Register Provider Constants

添加到 `src/shared/constants/providers.ts` — 在模块加载时经过 Zod 验证。### Step 2: Add Executor (if custom logic needed)

在`open-sse/executors/your-provider.ts`中创建执行器来扩展基本执行器。### Step 3: Add Translator (if non-OpenAI format)

在`open-sse/translator/`中创建请求/响应转换器。### Step 4: Add OAuth Config (if OAuth-based)

在 `src/lib/oauth/constants/oauth.ts` 中添加 OAuth 凭据，并在 `src/lib/oauth/services/` 中添加服务。### Step 5: Register Models

在 `open-sse/config/providerRegistry.ts` 中添加模型定义。### Step 6: Add Tests

在“tests/unit/”中编写单元测试，至少涵盖：

- 提供商注册
- 请求/响应翻译
- 错误处理---

## Pull Request Checklist

- [ ] 测试通过（`npm test`）
- [ ] Linting 通行证（`npm run lint`）
- [ ] 构建成功（`npm run build`）
- [ ] 为新的公共函数和接口添加了 TypeScript 类型
- [ ] 没有硬编码的秘密或后备值
- [ ] 所有输入均使用 Zod 模式进行验证
- [ ] 更新变更日志（如果面向用户的变更）
- [ ] 更新文档（如果适用）---

## Releasing

发布是通过“/generate-release”工作流程进行管理的。创建新的 GitHub 版本时，该包会通过 GitHub Actions**自动发布到 npm**。---

## Getting Help

-**架构**：参见 [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**API 参考**：参见 [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**问题**：[github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR**：有关架构决策记录，请参阅“docs/adr/”
