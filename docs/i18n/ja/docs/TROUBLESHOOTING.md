# Troubleshooting (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

OmniRoute の一般的な問題と解決策。---

## Quick Fixes

| 問題                                      | ソリューション                                                                               |
| ----------------------------------------- | -------------------------------------------------------------------------------------------- | --- |
| 最初のログインが機能しない                | `.env` に `INITIAL_PASSWORD` を設定します (ハードコーディングされたデフォルトはありません)。 |
| ダッシュボードが間違ったポートで開きます  | `PORT=20128` と `NEXT_PUBLIC_BASE_URL=http://localhost:20128` を設定します。                 |
| `logs/` の下にリクエスト ログがありません | `ENABLE_REQUEST_LOGS=true` を設定します。                                                    |
| EACCES: 許可が拒否されました              | `DATA_DIR=/path/to/writable/dir` を設定して `~/.omniroute` をオーバーライドします。          |
| ルーティング戦略が保存されない            | v1.4.11+ に更新 (設定永続性のための Zod スキーマ修正)                                        | --- |

## Provider Issues

### "Language model did not provide messages"

**原因:**プロバイダーの割り当てが枯渇しました。

**修正:**

1. ダッシュボードのクォータ トラッカーを確認する
2. フォールバック層とのコンボを使用する
3. より安価な/無料枠に切り替える### Rate Limiting

**原因:**サブスクリプション割り当てを使い果たしました。

**修正:**

- フォールバックを追加: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2- Thinking`
- 安価なバックアップとして GLM/MiniMax を使用する### OAuth Token Expired

OmniRoute はトークンを自動更新します。問題が解決しない場合:

1. ダッシュボード → プロバイダー → 再接続
2. プロバイダー接続を削除して再度追加します。---

## Cloud Issues

### Cloud Sync Errors

1. 「BASE_URL」が実行中のインスタンスを指していることを確認します (例: 「http://localhost:20128」)
2. `CLOUD_URL` がクラウド エンドポイント (例: `https://omniroute.dev`) を指していることを確認します。
3. `NEXT_PUBLIC_*` 値をサーバー側の値と一致させます。### Cloud `stream=false` Returns 500

**症状:**非ストリーミング呼び出しのクラウド エンドポイントで「予期しないトークン 'd'...」が発生します。

**原因:**クライアントが JSON を期待しているのに、アップストリームは SSE ペイロードを返します。

**回避策:**クラウドの直接呼び出しには「stream=true」を使用します。ローカル ランタイムには SSE→JSON フォールバックが含まれます。### Cloud Says Connected but "Invalid API key"

1. ローカル ダッシュボード (`/api/keys`) から新しいキーを作成します。
2. クラウド同期を実行します: [クラウドを有効にする] → [今すぐ同期]
3. 古い/非同期キーはクラウド上でも「401」を返す可能性がある---

## Docker Issues

### CLI Tool Shows Not Installed

1. 実行時フィールドを確認します。 `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. ポータブル モードの場合: イメージ ターゲット `runner-cli` (バンドルされた CLI) を使用します。
3. ホスト マウント モードの場合: 「CLI_EXTRA_PATHS」を設定し、ホストの bin ディレクトリを読み取り専用としてマウントします。
4. `installed=true` および `runnable=false` の場合: バイナリは見つかりましたが、ヘルスチェックに失敗しました### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1.「ダッシュボード」→「使用状況」で使用状況統計を確認します。2. Switch primary model to GLM/MiniMax 3. 重要でないタスクには無料枠 (Gemini CLI、Qoder) を使用する 4. API キーごとにコスト予算を設定します: [ダッシュボード] → [API キー] → [予算]---

## Debugging

### Enable Request Logs

`.env` ファイルに `ENABLE_REQUEST_LOGS=true` を設定します。ログは「logs/」ディレクトリの下に表示されます。### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- メイン状態: `${DATA_DIR}/storage.sqlite` (プロバイダー、コンボ、エイリアス、キー、設定)
- 使用法: `storage.sqlite` 内の SQLite テーブル (`usage_history`、`call_logs`、`proxy_logs`) + オプションの `${DATA_DIR}/log.txt` および `${DATA_DIR}/call_logs/`
- リクエストログ: `<repo>/logs/...` (`ENABLE_REQUEST_LOGS=true`の場合)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

プロバイダーのサーキット ブレーカーが OPEN の場合、リクエストはクールダウンが期限切れになるまでブロックされます。

**修正:**

1.**ダッシュボード → 設定 → レジリエンス**に移動します 2. 影響を受けるプロバイダーのサーキット ブレーカー カードを確認します。3. [**すべてリセット**] をクリックしてすべてのブレーカーをクリアするか、クールダウンが期限切れになるまで待ちます。4. リセットする前に、プロバイダーが実際に利用可能であることを確認します。### Provider keeps tripping the circuit breaker

プロバイダーが繰り返し OPEN 状態になる場合:

1.**ダッシュボード → ヘルス → プロバイダーのヘルス**で障害パターンを確認します。2.**[設定] → [復元力] → [プロバイダー プロファイル]**に移動し、失敗のしきい値を増やします。3. プロバイダーが API 制限を変更したか、再認証が必要かどうかを確認します。4. レイテンシーテレメトリを確認します - レイテンシーが長いとタイムアウトベースのエラーが発生する可能性があります---

## Audio Transcription Issues

### "Unsupported model" error

- 正しいプレフィックスを使用していることを確認してください: `deepgram/nova-3` または `assemblyai/best` -**「ダッシュボード」→「プロバイダー」**でプロバイダーが接続されていることを確認します。### Transcription returns empty or fails

- サポートされているオーディオ形式を確認します: `mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`
- ファイル サイズがプロバイダーの制限内であることを確認します (通常は < 25MB)
- プロバイダー カードのプロバイダー API キーの有効性を確認します。---

## Translator Debugging

**ダッシュボード → トランスレーター**を使用して、形式変換の問題をデバッグします。

| モード                | いつ使用するか                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------ |
| **遊び場**            | 入力/出力形式を並べて比較します。失敗したリクエストを貼り付けて、それがどのように変換されるかを確認します。 |
| **チャット テスター** | ライブ メッセージを送信し、ヘッダーを含む完全なリクエスト/レスポンス ペイロードを検査します。               |
| **テストベンチ**      | フォーマットの組み合わせ全体でバッチ テストを実行して、どの翻訳が壊れているかを見つけます。                 |
| **ライブモニター**    | リアルタイムのリクエスト フローを監視して断続的な翻訳の問題を検出                                           | ### Common format issues |

-**思考タグが表示されない**— ターゲットプロバイダーが思考と思考予算設定をサポートしているかどうかを確認してください -**ツール呼び出しのドロップ**— 一部の形式変換では、サポートされていないフィールドが削除される場合があります。プレイグラウンド モードで確認する -**システム プロンプトがありません**— クロードとジェミニはシステム プロンプトの処理方法が異なります。翻訳出力を確認する -**SDK はオブジェクトではなく生の文字列を返します**— v1.1.0 で修正されました: 応答サニタイザーは、OpenAI SDK Pydantic 検証エラーの原因となる非標準フィールド (`x_groq`、`usage_breakdown` など) を削除するようになりました。-**GLM/ERNIE が「システム」ロールを拒否する**— v1.1.0 で修正: ロール ノーマライザーは、互換性のないモデルのシステム メッセージをユーザー メッセージに自動的にマージします -**`developer` ロールが認識されない**— v1.1.0 で修正: 非 OpenAI プロバイダーの場合は自動的に `system` に変換されます -**`json_schema` が Gemini で動作しない**— v1.1.0 で修正: `response_format` は Gemini の `responseMimeType` + `responseSchema` に変換されるようになりました。---

## Resilience Settings

### Auto rate-limit not triggering

- 自動レート制限は API キープロバイダーにのみ適用されます (OAuth/サブスクリプションには適用されません) -**設定 → 復元力 → プロバイダー プロファイル**で自動レート制限が有効になっていることを確認します
- プロバイダーが「429」ステータス コードまたは「Retry-After」ヘッダーを返したかどうかを確認します。### Tuning exponential backoff

プロバイダー プロファイルは次の設定をサポートします。

-**基本遅延**— 最初の失敗後の初期待機時間 (デフォルト: 1 秒) -**最大遅延**— 最大待機時間の上限 (デフォルト: 30 秒) -**乗数**— 連続した失敗ごとにどれだけ遅延を増加させるか (デフォルト: 2x)### Anti-thundering herd

多くの同時リクエストがレート制限プロバイダーに到達すると、OmniRoute はミューテックスと自動レート制限を使用してリクエストをシリアル化し、連鎖的な失敗を防ぎます。これは API キープロバイダーの場合は自動的に行われます。---

## Optional RAG / LLM failure taxonomy (16 problems)

一部の OmniRoute ユーザーは、RAG またはエージェント スタックの前にゲートウェイを配置します。これらの設定では、奇妙なパターンがよく見られます。OmniRoute は正常に見えます (プロバイダーは稼働しており、ルーティング プロファイルは正常で、レート制限アラートはありません)。しかし、最終的な答えは依然として間違っています。

実際には、これらのインシデントは通常、ゲートウェイ自体からではなく、ダウンストリームの RAG パイプラインから発生します。

これらの障害を説明するための共有語彙が必要な場合は、16 の繰り返し発生する RAG / LLM 障害パターンを定義する外部 MIT ライセンス テキスト リソースである WFGY 問題マップを使用できます。大まかに説明すると、次のことがカバーされます。

- 検索ドリフトと壊れたコンテキスト境界
- 空または古いインデックスとベクター ストア
- 埋め込みとセマンティックの不一致
- プロンプトアセンブリとコンテキストウィンドウの問題
- 論理崩壊と自信過剰な回答
- 長いチェーンとエージェントの調整の失敗
- マルチエージェントの記憶と役割のドリフト
- デプロイメントとブートストラップの順序付けの問題

アイデアはシンプルです。

1. 悪い応答を調査する場合は、以下をキャプチャします。
   - ユーザーのタスクとリクエスト
   - OmniRoute のルートまたはプロバイダーの組み合わせ
   - ダウンストリームで使用される任意の RAG コンテキスト (取得されたドキュメント、ツール呼び出しなど)
2. インシデントを 1 つまたは 2 つの WFGY 問題マップ番号 (「No.1」…「No.16」) にマッピングします。
3. この番号を独自のダッシュボード、ランブック、またはインシデント トラッカーの OmniRoute ログの隣に保存します。
4. 対応する WFGY ページを使用して、RAG スタック、レトリーバー、またはルーティング戦略を変更する必要があるかどうかを決定します。

全文と具体的なレシピはここにあります (MIT ライセンス、テキストのみ):

[WFGY 問題マップの README](https://github.com/onestardao/WFGY/blob/main/問題マップ/README.md)

OmniRoute の背後で RAG またはエージェント パイプラインを実行しない場合は、このセクションを無視してかまいません。---

## Still Stuck?

-**GitHub の問題**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**アーキテクチャ**: 内部の詳細については、[`docs/ARCHITECTURE.md`](ARCHITECTURE.md) を参照してください。-**API リファレンス**: すべてのエンドポイントについては、[`docs/API_REFERENCE.md`](API_REFERENCE.md) を参照してください。-**ヘルス ダッシュボード**: リアルタイムのシステム ステータスについては、**ダッシュボード → ヘルス**を確認してください。-**トランスレータ**:**ダッシュボード → トランスレータ**を使用して形式の問題をデバッグします
