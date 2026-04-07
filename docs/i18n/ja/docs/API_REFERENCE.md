# API Reference (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

すべての OmniRoute API エンドポイントの完全なリファレンス。---

## Table of Contents

- [チャットの完了](#chat-completions)
- [埋め込み](#embeddings)
- [イメージ生成](#image-generate)
- [モデルのリスト](#list-models)
- [互換性エンドポイント](#compatibility-endpoints)
- [セマンティックキャッシュ](#semantic-cache)
- [ダッシュボードと管理](#dashboard--management)
- [リクエスト処理](#request-processing)
- [認証](#authentication)---

## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Custom Headers

| ヘッダー                    | 方向       | 説明                                                        |
| --------------------------- | ---------- | ----------------------------------------------------------- | ---------------------------------------------- |
| `X-OmniRoute-No-Cache`      | リクエスト | キャッシュをバイパスするには「true」に設定します。          |
| `X-OmniRoute-Progress`      | リクエスト | 進行状況イベントの場合は「true」に設定します。              |
| `X セッション ID`           | リクエスト | 外部セッション アフィニティ用のスティッキー セッション キー |
| `x_session_id`              | リクエスト | アンダースコアのバリアントも受け入れられます (直接 HTTP)。  |
| `冪等性キー`                | リクエスト | 重複排除キー (5 秒ウィンドウ)                               |
| `X-リクエストID`            | リクエスト | 代替の重複排除キー                                          |
| `X-オムニルートキャッシュ`  | 応答       | `HIT` または `MISS` (非ストリーミング)                      |
| `X-OmniRoute-冪等`          | 応答       | 重複排除されている場合は「true」                            |
| `X-OmniRoute-Progress`      | 応答       |                                                             | で進行状況を追跡する場合は「有効」になります。 |
| `X-OmniRoute-セッション-Id` | 応答       | OmniRoute によって使用される有効なセッション ID             |

> Nginx 注: アンダースコアヘッダー (例: `x_session_id`) に依存する場合は、`underscores_in_headers on;` を有効にしてください。---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

利用可能なプロバイダー: Nebius、OpenAI、Mistral、Togetter AI、Fireworks、NVIDIA。```bash

# List all embedding models

GET /v1/embeddings

````

---

## Image Generation

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
````

利用可能なプロバイダー: OpenAI (DALL-E)、xAI (Grok Image)、Togetter AI (FLUX)、Fireworks AI。```bash

# List all image models

GET /v1/images/generations

````

---

## List Models

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
````

---

## Compatibility Endpoints

| 方法 | パス                        | フォーマット          |
| ---- | --------------------------- | --------------------- | ----------------------------- |
| 投稿 | `/v1/chat/completions`      | オープンAI            |
| 投稿 | `/v1/messages`              | 人類                  |
| 投稿 | `/v1/responses`             | OpenAI の応答         |
| 投稿 | `/v1/embeddings`            | オープンAI            |
| 投稿 | `/v1/images/世代`           | オープンAI            |
| 入手 | `/v1/models`                | オープンAI            |
| 投稿 | `/v1/messages/count_tokens` | Anthropic             |
| 入手 | `/v1beta/models`            | ジェミニ              |
| 投稿 | `/v1beta/models/{...path}`  | Gemini コンテンツ生成 |
| 投稿 | `/v1/api/chat`              | オラマ                | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

プロバイダーのプレフィックスが存在しない場合は、自動的に追加されます。モデルが一致しない場合は「400」が返されます。---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

応答例:```json
{
"semanticCache": {
"memorySize": 42,
"memoryMaxSize": 500,
"dbSize": 128,
"hitRate": 0.65
},
"idempotency": {
"activeKeys": 3,
"windowMs": 5000
}
}

````

---

## Dashboard & Management

### Authentication

|エンドポイント |方法 |説明 |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/login` |投稿 |ログイン |
| `/api/auth/logout` |投稿 |ログアウト |
| `/api/settings/require-login` | GET/PUT |ログインが必要かどうかを切り替えます |### Provider Management

|エンドポイント |方法 | Description              |
| ---------------------------- | --------------- | ------------------------ |
| `/api/プロバイダー` |取得/投稿 |プロバイダーのリスト/作成 |
| `/api/providers/[id]` |取得/挿入/削除 |プロバイダーを管理する |
| `/api/providers/[id]/test` |投稿 |プロバイダー接続をテストする |
| `/api/providers/[id]/models` |入手 |プロバイダーモデルのリスト |
| `/api/providers/validate` |投稿 |プロバイダー構成を検証する |
| `/api/provider-nodes*` |いろいろ |プロバイダーノード管理 |
| `/api/provider-models` |取得/投稿/削除 |カスタムモデル |### OAuth Flows

|エンドポイント |方法 |説明 |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[プロバイダー]/[アクション]` |いろいろ |プロバイダー固有の OAuth |### Routing & Config

|エンドポイント |方法 |説明 |
| --------------------- | -------- | ----------------------------- |
| `/api/models/alias` |取得/投稿 |モデルの別名 |
| `/api/モデル/カタログ` |入手 |プロバイダー + タイプ別のすべてのモデル |
| `/api/combos*` |いろいろ |コンボ管理 |
| `/api/keys*` |いろいろ | API キー管理 |
| `/api/価格` |入手 |モデルの価格 |### Usage & Analytics

|エンドポイント |方法 |説明 |
| ------------------------- | ------ | -------------------- |
| `/api/使用法/履歴` |入手 |利用履歴 |
| `/api/usage/logs` |入手 |使用ログ |
| `/api/usage/request-logs` |入手 |リクエストレベルのログ |
| `/api/usage/[接続ID]` |入手 |接続ごとの使用量 |### Settings

|エンドポイント |方法 |説明 |
| ------------------------------- | ------------- | ---------------------- |
| `/api/設定` |取得/挿入/パッチ |一般設定 |
| `/api/settings/proxy` | GET/PUT |ネットワークプロキシ設定 |
| `/api/settings/proxy/test` |投稿 |プロキシ接続をテストする |
| `/api/settings/ip-filter` | GET/PUT | IP 許可リスト/ブロックリスト |
| `/api/settings/ Thinking-budget` | GET/PUT |トークンの予算の推論 |
| `/api/settings/システムプロンプト` | GET/PUT |グローバル システム プロンプト |### Monitoring

|エンドポイント |方法 |説明 |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------- |
| `/api/sessions` |入手 |アクティブなセッションの追跡 |
| `/api/rate-limits` |入手 |アカウントごとのレート制限 |
| `/api/モニタリング/ヘルス` |入手 |ヘルスチェック + プロバイダーの概要 (`catalogCount`、`configuredCount`、`activeCount`、`monitoredCount`) |
| `/api/cache/stats` |取得/削除 |キャッシュ統計 / クリア |### Backup & Export/Import

|エンドポイント |方法 |説明 |
| ------------------------- | ------ | -------------------------------------- |
| `/api/db-backups` |入手 |利用可能なバックアップをリストする |
| `/api/db-backups` |置く |手動バックアップを作成する |
| `/api/db-backups` |投稿 |特定のバックアップから復元する |
| `/api/db-backups/export` |入手 |データベースを .sqlite ファイルとしてダウンロード |
| `/api/db-backups/import` |投稿 | .sqlite ファイルをアップロードしてデータベースを置き換える |
| `/api/db-backups/exportAll` |入手 |完全バックアップを .tar.gz アーカイブとしてダウンロード |### Cloud Sync

|エンドポイント |方法 |説明 |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud` |いろいろ |クラウド同期操作 |
| `/api/sync/initialize` |投稿 |同期を初期化する |
| `/api/cloud/*` |いろいろ |クラウド管理 |### Tunnels

|エンドポイント |方法 |説明 |
| ------------------------ | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` |入手 |ダッシュボードの Cloudflare Quick Tunnel インストール/ランタイム ステータスを読む |
| `/api/tunnels/cloudflared` |投稿 | Cloudflare クイック トンネルを有効または無効にします (`action=enable/disable`) |### CLI Tools

|エンドポイント |方法 |説明 |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` |入手 |クロード CLI ステータス |
| `/api/cli-tools/codex-settings` |入手 | Codex CLI ステータス |
| `/api/cli-tools/droid-settings` |入手 | Droid CLI ステータス |
| `/api/cli-tools/openclaw-settings` |入手 | OpenClaw CLI ステータス |
| `/api/cli-tools/runtime/[toolId]` |入手 |汎用 CLI ランタイム |

CLI 応答には、「installed」、「runnable」、「command」、「commandPath」、「runtimeMode」、「reason」が含まれます。### ACP Agents

|エンドポイント |方法 |説明 |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/acp/agents` |入手 |検出されたすべてのエージェント (組み込み + カスタム) をステータスとともにリストします。
| `/api/acp/agents` |投稿 |カスタム エージェントを追加するか、検出キャッシュを更新する |
| `/api/acp/agents` |削除 | `id` クエリ パラメータによってカスタム エージェントを削除します。

GET 応答には、`agents[]` (id、name、binary、version、installed、protocol、isCustom) および `summary` (total、installed、notFound、builtIn、custom) が含まれます。### Resilience & Rate Limits

|エンドポイント |方法 |説明 |
| ----------------------- | --------- | ------------------------------- |
| `/api/resilience` |取得/パッチ |回復力プロファイルを取得/更新する |
| `/api/resilience/reset` |投稿 |サーキットブレーカーをリセットする |
| `/api/rate-limits` |入手 |アカウントごとのレート制限ステータス |
| `/api/レート制限` |入手 |グローバルレート制限の設定 |### Evals

|エンドポイント |方法 |説明 |
| ------------ | -------- | --------------------------------- |
| `/api/evals` |取得/投稿 |評価スイートのリスト / 評価の実行 |### Policies

|エンドポイント |方法 |説明 |
| --------------- | --------------- | ----------------------- |
| `/api/ポリシー` |取得/投稿/削除 |ルーティング ポリシーを管理する |### Compliance

|エンドポイント |方法 |説明 |
| ------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` |入手 |コンプライアンス監査ログ (最後の N) |### v1beta (Gemini-Compatible)

|エンドポイント |方法 |説明 |
| ------------------------ | ------ | --------------------------------- |
| `/v1beta/models` |入手 | Gemini 形式でモデルをリストする |
| `/v1beta/models/{...path}` |投稿 | Gemini の「generateContent」エンドポイント |

これらのエンドポイントは、ネイティブの Gemini SDK 互換性を期待するクライアント向けに、Gemini の API 形式を反映しています。### Internal / System APIs

|エンドポイント |方法 |説明 |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init` |入手 |アプリケーション初期化チェック (最初の実行時に使用) |
| `/api/tags` |入手 | Ollama 互換モデル タグ (Ollama クライアント用) |
| `/api/restart` |投稿 |サーバーの正常な再起動をトリガーする |
| `/api/シャットダウン` |投稿 |サーバーの正常なシャットダウンをトリガーする |

>**注:**これらのエンドポイントは、システムによって内部的に使用されるか、Ollama クライアントの互換性のために使用されます。 They are not typically called by end users.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Deepgram または AssemblyAI を使用して音声ファイルを文字起こしします。

**リクエスト：**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**応答：**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**サポートされているプロバイダー:**`deepgram/nova-3`、`assemblyai/best`。

**サポートされている形式:**`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。---

## Ollama Compatibility

Ollama の API 形式を使用するクライアントの場合:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

リクエストは、Ollama 形式と内部形式の間で自動的に変換されます。---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**応答：**```json
{
"providers": {
"claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
"github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
}
}

````

---

## Budget

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
````

---

## Model Availability

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Request Processing

1. クライアントはリクエストを `/v1/*` に送信します
2. ルート ハンドラーが `handleChat`、`handleEmbedding`、`handleAudioTranscription`、または `handleImageGeneration` を呼び出します。
3. モデルが解決されます (直接プロバイダー/モデルまたはエイリアス/コンボ)
4. アカウント可用性フィルタリングを使用してローカル DB から選択された資格情報
5. チャットの場合: `handleChatCore` — フォーマット検出、変換、キャッシュ チェック、冪等性チェック
6. プロバイダーエグゼキューターがアップストリームリクエストを送信します
7. 応答はクライアント形式に変換されるか (チャット)、またはそのまま返されます (埋め込み/画像/音声)
8. 使用状況/ログの記録
9. フォールバックはコンボルールに従ってエラーに適用されます

完全なアーキテクチャリファレンス: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- ダッシュボード ルート (`/dashboard/*`) は `auth_token` Cookie を使用します
- ログインには保存されたパスワード ハッシュが使用されます。 `INITIAL_PASSWORD` へのフォールバック
- 「requireLogin」は「/api/settings/require-login」経由で切り替え可能
- `REQUIRE_API_KEY=true` の場合、`/v1/*` ルートはオプションでベアラー API キーを必要とします
