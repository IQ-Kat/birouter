# Contributing to OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

貢献にご関心をお寄せいただきありがとうございます。このガイドには、開始するために必要なすべてが記載されています。---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (推奨: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

開発のための主要な変数:

| 変数                   | 開発のデフォルト         | 説明                       |
| ---------------------- | ------------------------ | -------------------------- | ---------------------- |
| `ポート`               | `20128`                  | サーバーポート             |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | フロントエンドのベース URL |
| `JWT_SECRET`           | (上記で生成)             | JWT signing secret         |
| `初期パスワード`       | `チェンジメ`             | 初回ログインパスワード     |
| `APP_LOG_LEVEL`        | `情報`                   | ログの詳細レベル           | ### Dashboard Settings |

ダッシュボードには、環境変数を介して構成できる機能の UI トグルが用意されています。

| 設置場所    | 切り替え           | 説明                              |
| ----------- | ------------------ | --------------------------------- |
| 設定 → 詳細 | デバッグモード     | デバッグ要求ログを有効にする (UI) |
| 設定 → 一般 | サイドバーの可視性 | サイドバーセクションの表示/非表示 |

これらの設定はデータベースに保存され、再起動後も保持され、設定された環境変数のデフォルトをオーバーライドします。### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

デフォルトの URL:

-**ダッシュボード**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**`main` に直接コミットしないでください。**常に機能ブランチを使用してください。```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

|プレフィックス | Purpose                   |
| ----------- | ------------------------- |
| `feat/` | New features              |
| `修正/` | Bug fixes                 |
| `リファクタリング/` | Code restructuring        |
| `docs/` | Documentation changes     |
| `テスト/` | Test additions/fixes      |
| `雑用/` | Tooling, CI, dependencies |### Commit Messages

[従来のコミット](https://www.conventionalcommits.org/) に従ってください。```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

スコープ: `db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`。---

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

取材メモ:

- `npm run test:coverage` は、メインユニットのテストスイートのソースカバレッジを測定します。`tests/**` は除外され、`open-sse/**` が含まれます。
- プル リクエストでは、ステートメント、行、関数、ブランチの全体的なカバレッジ ゲートを**60% 以上**に保つ必要があります
- PR が `src/`、`open-sse/`、`electron/`、または `bin/` の実稼働コードを変更する場合、同じ PR 内の自動テストを追加または更新する必要があります
- `npm run cover:report` は、最新のカバレッジ実行からファイルごとの詳細なレポートを出力します。
- 「npm run test:coverage:legacy」は、履歴比較のために古いメトリクスを保存します。
- 段階的なカバレッジ改善ロードマップについては、「docs/COVERAGE_PLAN.md」を参照してください。### Pull Request Requirements

PR を開くかマージする前に、次のことを行ってください。

- `npm run test:unit` を実行します。
- 「npm run test:coverage」を実行します。
- すべての指標についてカバレッジ ゲートが**60%+**に留まるようにする
- 製品コードが変更された場合、変更または追加されたテスト ファイルを PR 記述に含めます。
- プロジェクトのシークレットが CI で構成されている場合、PR で SonarQube の結果を確認します。

現在のテスト ステータス:**122 個の単体テスト ファイル**対象:

- プロバイダーのトランスレーターとフォーマット変換
- レート制限、サーキットブレーカー、復元力
- Semantic cache, idempotency, progress tracking
- データベース操作とスキーマ (21 DB モジュール)
- OAuth フローと認証
- API エンドポイントの検証 (Zod v4)
- MCP サーバー ツールとスコープの適用
- 記憶とスキルのシステム---

## Code Style

-**ESLint**— コミットする前に「npm run lint」を実行します。-**Prettier**— コミット時に `lint-staged` によって自動フォーマットされます (スペース 2 個、セミコロン、二重引用符、100 文字幅、es5 末尾のカンマ) -**TypeScript**— すべての `src/` コードは `.ts`/`.tsx` を使用します。 `open-sse/` は `.ts`/`.js` を使用します。 TSDoc を使用したドキュメント (`@param`、`@returns`、`@throws`) -**No `eval()`**— ESLint は `no-eval`、`no-implied-eval`、`no-new-func` を強制します -**Zod 検証**— すべての API 入力検証に Zod v4 スキーマを使用します -**名前**: ファイル = キャメルケース/ケバブケース、コンポーネント = PascalCase、定数 = UPPER_SNAKE---

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

`src/shared/constants/providers.ts` に追加 — モジュールのロード時に ZOD で検証されます。### Step 2: Add Executor (if custom logic needed)

基本エグゼキュータを拡張して「open-sse/executors/your-provider.ts」にエグゼキュータを作成します。### Step 3: Add Translator (if non-OpenAI format)

`open-sse/translator/` にリクエスト/レスポンス トランスレータを作成します。### Step 4: Add OAuth Config (if OAuth-based)

`src/lib/oauth/constants/oauth.ts` に OAuth 資格情報を追加し、`src/lib/oauth/services/` にサービスを追加します。### Step 5: Register Models

`open-sse/config/providerRegistry.ts` にモデル定義を追加します。### Step 6: Add Tests

少なくとも以下をカバーする単体テストを `tests/unit/` に記述します。

- プロバイダー登録
- リクエスト/レスポンスの翻訳
- エラー処理---

## Pull Request Checklist

- [ ] テストに合格 (`npm test`)
- [ ] lint パス (`npm run lint`)
- [ ] ビルドは成功します (`npm run build`)
- [ ] 新しいパブリック関数とインターフェイス用に TypeScript タイプが追加されました
- [ ] ハードコーディングされたシークレットやフォールバック値はありません
- [ ] Zod スキーマで検証されたすべての入力
- [ ] CHANGELOG が更新されました (ユーザー向けの変更の場合)
- [ ] ドキュメントが更新されました (該当する場合)---

## Releasing

リリースは「/generate-release」ワークフローを通じて管理されます。新しい GitHub リリースが作成されると、パッケージは GitHub Actions 経由で**自動的に npm**に公開されます。---

## Getting Help

-**アーキテクチャ**: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) を参照してください。-**API リファレンス**: [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) を参照してください。-**問題**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADR**: アーキテクチャ上の決定記録については、「docs/adr/」を参照してください。
