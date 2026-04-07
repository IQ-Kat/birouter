# OmniRoute — Dashboard Features Gallery (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

OmniRoute ダッシュボードの各セクションへの視覚的なガイド。---

## 🔌 Providers

AI プロバイダー接続の管理: OAuth プロバイダー (Claude Code、Codex、Gemini CLI)、API キー プロバイダー (Groq、DeepSeek、OpenRouter)、および無料プロバイダー (Qoder、Qwen、Kiro)。 Kiro アカウントには、クレジット残高の追跡機能が含まれています。残存クレジット、合計許容量、更新日は、「ダッシュボード」→「使用状況」で確認できます。![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

6 つの戦略 (優先順位、重み付け、ラウンドロビン、ランダム、最小使用、コスト最適化) を使用してモデル ルーティング コンボを作成します。各コンボは自動フォールバックを使用して複数のモデルをチェーンし、クイック テンプレートと準備状況チェックが含まれます。![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

トークン消費量、コスト見積もり、アクティビティヒートマップ、週次分布グラフ、プロバイダーごとの内訳を含む包括的な使用状況分析。![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

リアルタイム監視: 稼働時間、メモリ、バージョン、遅延パーセンタイル (p50/p95/p99)、キャッシュ統計、プロバイダーのサーキット ブレーカーの状態。![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

API 変換をデバッグするための 4 つのモード:**プレイグラウンド**(フォーマット コンバーター)、**チャット テスター**(ライブ リクエスト)、**テスト ベンチ**(バッチ テスト)、**ライブ モニター**(リアルタイム ストリーム)。![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

ダッシュボードから直接任意のモデルをテストします。プロバイダー、モデル、エンドポイントを選択し、Monaco Editor でプロンプトを作成し、リアルタイムで応答をストリーミングし、ストリームの途中で中止し、タイミング メトリクスを表示します。---

## 🎨 Themes _(v2.0.5+)_

ダッシュボード全体のカスタマイズ可能なカラーテーマ。 7 つのプリセット色 (コーラル、ブルー、レッド、グリーン、バイオレット、オレンジ、シアン) から選択するか、任意の 16 進カラーを選択してカスタム テーマを作成します。ライト、ダーク、システム モードをサポートします。---

## ⚙️ Settings

タブのある包括的な設定パネル:

-**一般**— システム ストレージ、バックアップ管理 (データベースのエクスポート/インポート) -**外観**— テーマセレクター (ダーク/ライト/システム)、カラーテーマのプリセットとカスタムカラー、ヘルスログの表示、サイドバー項目の表示コントロール -**セキュリティ**- API エンドポイント保護、カスタム プロバイダー ブロック、IP フィルタリング、セッション情報 -**ルーティング**— モデルのエイリアス、バックグラウンド タスクの劣化 -**回復力**— レート制限の永続化、サーキット ブレーカーの調整、禁止アカウントの自動無効化、プロバイダーの有効期限の監視 -**上級**- 構成の上書き、構成監査証跡、フォールバック劣化モード![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

AI コーディング ツールのワンクリック構成: Claude Code、Codex CLI、Gemini CLI、OpenClaw、Kilo Code、Antigravity、Cline、Continue、Cursor、Factory Droid。自動構成の適用/リセット、接続プロファイル、モデル マッピングを備えています。![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

CLI エージェントを検出および管理するためのダッシュボード。 14 の組み込みエージェント (Codex、Claude、Goose、Gemini CLI、OpenClaw、Aider、OpenCode、Cline、Qwen Code、ForgeCode、Amazon Q、Open Interpreter、Cursor CLI、Warp) のグリッドを表示します。

-**インストール ステータス**- インストール済み / バージョン検出で見つからない -**プロトコル バッジ**— stdio、HTTP など。-**カスタム エージェント**- フォーム経由で CLI ツールを登録します (名前、バイナリ、バージョン コマンド、生成引数)。-**CLI フィンガープリント マッチング**— プロバイダーごとに切り替えてネイティブ CLI リクエストの署名を照合し、プロキシ IP を維持しながら禁止リスクを軽減します---

## 🖼️ Media _(v2.0.3+)_

ダッシュボードから画像、ビデオ、音楽を生成します。 OpenAI、xAI、Togetter、Hyperbolic、SD WebUI、ComfyUI、AnimateDiff、Stable Audio Open、および MusicGen をサポートします。---

## 📝 Request Logs

プロバイダー、モデル、アカウント、API キーによるフィルタリングを備えたリアルタイムのリクエストログ。ステータス コード、トークンの使用状況、待ち時間、応答の詳細を表示します。![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

機能の内訳を含む統合 API エンドポイント: チャット完了、応答 API、埋め込み、画像生成、再ランキング、音声文字起こし、テキスト読み上げ、モデレーション、登録された API キー。 Cloudflare Quick Tunnelの統合とリモートアクセスのためのクラウドプロキシのサポート。![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

API キーを作成、スコープ設定、取り消します。各キーは、フルアクセスまたは読み取り専用のアクセス許可を持つ特定のモデル/プロバイダーに制限できます。使用状況追跡による視覚的なキー管理。---

## 📋 Audit Log

アクション タイプ、アクター、ターゲット、IP アドレス、およびタイムスタンプによるフィルタリングによる管理アクションの追跡。完全なセキュリティ イベント履歴。---

## 🖥️ Desktop Application

Windows、macOS、Linux 用のネイティブ Electron デスクトップ アプリ。システム トレイの統合、オフライン サポート、自動更新、ワンクリック インストールを備えたスタンドアロン アプリケーションとして OmniRoute を実行します。

主な特徴:

- サーバー準備状況ポーリング (コールド スタート時に空白画面なし)
- ポート管理を備えたシステムトレイ
- コンテンツセキュリティポリシー
- 単一インスタンスのロック
- 再起動時の自動更新
- プラットフォーム条件付き UI (macOS 信号機、Windows/Linux のデフォルトのタイトルバー)
- 強化された Electron ビルド パッケージ化 - スタンドアロン バンドル内のシンボリックリンクされた `node_modules` がパッケージ化前に検出されて拒否され、ビルド マシン (v2.5.5 以降) へのランタイムの依存関係が防止されます。

📖 完全なドキュメントについては、[`electron/README.md`](../electron/README.md) を参照してください。
