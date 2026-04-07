# CLI Tools Setup Guide — OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

このガイドでは、サポートされているすべての AI コーディング CLI ツールをインストールして構成する方法について説明します。
**OmniRoute**を統合バックエンドとして使用し、一元的なキー管理を実現します。
すべてのツールにわたるコストの追跡、モデルの切り替え、リクエストのログ記録。---

## How It Works

```
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Kiro / Cursor / Copilot
           │
           ▼  (all point to OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute routes to the right provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**利点:**

- 1 つの API キーですべてのツールを管理
- ダッシュボード内のすべての CLI にわたるコスト追跡
- すべてのツールを再構成することなくモデルを切り替える
- ローカルおよびリモートサーバー (VPS) 上で動作します---

## Supported Tools (Dashboard Source of Truth)

「/dashboard/cli-tools」のダッシュボード カードは、「src/shared/constants/cliTools.ts」から生成されます。
現在のリスト (v3.0.0-rc.16):

| ツール                    | ID                   | コマンド         | セットアップモード | インストール方法   |
| ------------------------- | -------------------- | ---------------- | ------------------ | ------------------ | -------------------------------------------- |
| **クロード・コード**      | クロードクロード環境 | npm              |
| **OpenAI コーデックス**   | `コーデックス`       | `コーデックス`   | カスタム           | npm                |
| **ファクトリー ドロイド** | ドロイド             | ドロイド         | カスタム           | バンドル/CLI       |
| **オープンクロウ**        | `オープンクロー`     | `オープンクロー` | カスタム           | バンドル/CLI       |
| **カーソル**              | `カーソル`           | アプリ           | ガイド             | デスクトップアプリ |
| **クライン**              | `クライン`           | `クライン`       | カスタム           | npm                |
| **キロコード**            | `キロ`               | `キロコード`     | カスタム           | npm                |
| **続行**                  | `続行`               | 拡張子           | ガイド             | VSコード           |
| **反重力**                | 反重力               | 内部             | ミットム           | OmniRoute          |
| **GitHub コパイロット**   | `副操縦士`           | 拡張子           | カスタム           | VSコード           |
| **オープンコード**        | `オープンコード`     | `オープンコード` | ガイド             | npm                |
| **Kiro AI**               | `キロ`               | アプリ/cli       | ミットム           | デスクトップ/CLI   | ### CLI fingerprint sync (Agents + Settings) |

「/dashboard/agents」および「設定 > CLI フィンガープリント」では、「src/shared/constants/cliCompatProviders.ts」を使用します。
これにより、プロバイダー ID が CLI カードおよびレガシー ID と一致した状態に保たれます。

| CLI ID                                                                                               | 指紋プロバイダー ID |
| ---------------------------------------------------------------------------------------------------- | ------------------- |
| `キロ`                                                                                               | `キロコード`        |
| `副操縦士`                                                                                           | `github`            |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | 同じID              |

互換性のためにレガシー ID も引き続き受け入れられます: `copilot`、`kimi-coding`、`qwen`。---

## Step 1 — Get an OmniRoute API Key

1. OmniRoute ダッシュボード →**API マネージャー**(`/dashboard/api-manager`) を開きます。
2. [**API キーの作成**] をクリックします。
3. 名前を付けて (例: `cli-tools`)、すべての権限を選択します。
4. キーをコピーします。以下のすべての CLI で必要になります。

> キーは次のようになります: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

すべての npm ベースのツールには Node.js 18 以降が必要です。```bash

# Claude Code (Anthropic)

npm install -g @anthropic-ai/claude-code

# OpenAI Codex

npm install -g @openai/codex

# OpenCode

npm install -g opencode-ai

# Cline

npm install -g cline

# KiloCode

npm install -g kilocode

# Kiro CLI (Amazon — requires curl + unzip)

apt-get install -y unzip # on Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH" # add to ~/.bashrc

````

**確認する：**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

`~/.bashrc` (または `~/.zshrc`) に追加し、`source ~/.bashrc` を実行します。```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

>**リモートサーバー**の場合、「localhost:20128」をサーバーのIPまたはドメインに置き換えます。
> 例: 「http://192.168.0.15:20128」。---

## Step 4 — Configure Each Tool

### Claude Code

```bash
# Via CLI:
claude config set --global api-base-url http://localhost:20128/v1

# Or create ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "apiBaseUrl": "http://localhost:20128/v1",
  "apiKey": "sk-your-omniroute-key"
}
EOF
````

**テスト:**`クロード「こんにちは」`---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**テスト:**`コーデックス「2+2 とは何ですか?」`---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**テスト:**`オープンコード`---

### Cline (CLI or VS Code)

**CLI モード:**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS コード モード:**
Cline 拡張機能の設定 → API プロバイダー: `OpenAI 互換` → ベース URL: `http://localhost:20128/v1`

または、OmniRoute ダッシュボード →**CLI ツール → Cline → 構成の適用**を使用します。---

### KiloCode (CLI or VS Code)

**CLI モード:**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS コードの設定:**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

または、OmniRoute ダッシュボード →**CLI ツール → KiloCode → 構成の適用**を使用します。---

### Continue (VS Code Extension)

`~/. continue/config.yaml` を編集します。```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

編集後、VS Code を再起動します。---

### Kiro CLI (Amazon)

```bash
# Login to your AWS/Kiro account:
kiro-cli login

# The CLI uses its own auth — OmniRoute is not needed as backend for Kiro CLI itself.
# Use kiro-cli alongside OmniRoute for other tools.
kiro-cli status
```

---

### Cursor (Desktop App)

> **注:**Cursor はクラウド経由でリクエストをルーティングします。オムニルート統合の場合、
> OmniRoute 設定で**クラウド エンドポイント**を有効にし、パブリック ドメイン URL を使用します。

GUI 経由:**設定 → モデル → OpenAI API キー**

- ベース URL: `https://your-domain.com/v1`
- API キー: OmniRoute キー---

## Dashboard Auto-Configuration

OmniRoute ダッシュボードは、ほとんどのツールの構成を自動化します。

1. 「http://localhost:20128/dashboard/cli-tools」に移動します。
2. ツール カードを展開します。
3. ドロップダウンから API キーを選択します
4. [**Apply Config**] をクリックします (ツールがインストールされていることが検出された場合)
5. または、生成された構成スニペットを手動でコピーします---

## Built-in Agents: Droid & OpenClaw

**Droid**と**OpenClaw**は、OmniRoute に直接組み込まれた AI エージェントです。インストールは必要ありません。
これらは内部ルートとして実行され、OmniRoute のモデル ルーティングを自動的に使用します。

- アクセス: `http://localhost:20128/dashboard/agents`
- 構成: 他のすべてのツールと同じコンボとプロバイダー
- API キーや CLI のインストールは必要ありません---

## Available API Endpoints

| エンドポイント             | 説明                                | 用途                                    |
| -------------------------- | ----------------------------------- | --------------------------------------- | --- |
| `/v1/chat/completions`     | 標準チャット (すべてのプロバイダー) | すべての最新ツール                      |
| `/v1/responses`            | レスポンスAPI（OpenAI形式）         | コーデックス、エージェント ワークフロー |
| `/v1/completions`          | 従来のテキスト補完                  | `prompt:` を使用する古いツール          |
| `/v1/embeddings`           | テキストの埋め込み                  | RAG、検索                               |
| `/v1/images/世代`          | 画像生成                            | ダルイー、フラックスなど                |
| `/v1/audio/speech`         | テキスト読み上げ                    | イレブンラボ、OpenAI TTS                |
| `/v1/audio/transcriptions` | 音声からテキストへ                  | ディープグラム、AssemblyAI              | --- |

## トラブルシューティング

| エラー                                           | 原因                                        | 修正                                                                   |
| ------------------------------------------------ | ------------------------------------------- | ---------------------------------------------------------------------- | --- |
| `接続が拒否されました`                           | オムニルートが実行されていません            | `pm2 オムニルートを開始`                                               |
| `401 不正行為`                                   | 間違った API キー                           | `/dashboard/api-manager` をチェックインします。                        |
| `コンボが設定されていません`                     | アクティブなルーティング コンボがありません | `/dashboard/combos` で設定します                                       |
| `無効なモデル`                                   | カタログにないモデル                        | 「auto」を使用するか、「/dashboard/providers」をチェックしてください。 |
| CLI で「インストールされていません」と表示される | バイナリが PATH にありません                | `どの<コマンド>`を確認してください。                                   |
| `kiro-cli: 見つかりません`                       | PATH にありません                           | `export PATH="$HOME/.local/bin:$PATH"`                                 | --- |

## Quick Setup Script (One Command)

```bash
# Install all CLIs and configure for OmniRoute (replace with your key and server URL)
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_KEY="sk-your-omniroute-key"

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai cline kilocode

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# Write configs
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json   <<< "{\"apiBaseUrl\":\"$OMNIROUTE_URL\",\"apiKey\":\"$OMNIROUTE_KEY\"}"
cat > ~/.codex/config.yaml      <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
cat >> ~/.bashrc << EOF
export OPENAI_BASE_URL="$OMNIROUTE_URL"
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export ANTHROPIC_BASE_URL="$OMNIROUTE_URL"
export ANTHROPIC_API_KEY="$OMNIROUTE_KEY"
EOF

source ~/.bashrc
echo "✅ All CLIs installed and configured for OmniRoute"
```
