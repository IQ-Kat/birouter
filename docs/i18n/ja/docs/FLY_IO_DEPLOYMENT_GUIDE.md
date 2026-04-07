# OmniRoute Fly.io 部署指南 (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [in](../../in/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/FLY_IO_DEPLOYMENT_GUIDE.md)

---

本文衣记录 Fly.io 上の OmniRoute の実際の配置方法、次の 2 つの分野に適しています:

- 初回把握当前项目 Fly.io に配置
- 後代コード更新後続発行
- 新项目参照同样流程配置

本明細書では、現在のトップが通過した構成に基づいて「オムニルート」と名付けられる。---

## 1. 部署目标

- 平台：Fly.io
- 展開方式：本地 `flyctl` 直接配布
- 実行方法: `Dockerfile` と `fly.toml` を使用します。
- データ持久化：Fly Volume `/data` にダウンロード
- 访问地址：`https://omniroute.fly.dev/`---

## 2. 当前项目关键配置

現在のファイル内の `fly.toml` には以下の内容が含まれていることが確認されています：```toml
app = 'omniroute'
primary_region = 'sin'

[[mounts]]
source = 'data'
destination = '/data'

[processes]
app = 'node run-standalone.mjs'

[http_service]
internal_port = 20128

[env]
TZ = "Asia/Shanghai"
HOST = "0.0.0.0"
HOSTNAME = "0.0.0.0"
BIND = "0.0.0.0"

````

説明：

- `app = 'omniroute'` 决定实际配置到哪个 飛行应用
- `destination = '/data'` 决定持久卷挂下目录
- この項目は `DATA_DIR=/data` を確認する必要があります。データ パッケージと秘密鍵がコンテナに書き込まれるかどうかは、常に目録に記載されています。---

## 3. 必备工具

### 3.1 安装 Fly CLI

Windows PowerShell：```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
````

インストールしたスクリプトが現在の環境で失われた場合は、「flyctl」を手動でダウンロードして「PATH」に配置することもできます。### 3.2 登录 Fly 账号

```powershell
flyctl auth login
```

### 3.3 检查登录状态

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. 首次部署当前项目

### 4.1 获取代码并进入目录

```powershell
git clone https://github.com/xiaoge1688/OmniRoute.git
cd OmniRoute
```

### 4.2 确认应用名

`fly.toml` を押してください、注目して見てください：```toml
app = 'omniroute'

````

自分自身の新しいアプリケーションを準備する場合は、完全に局所的な固有名に変更できます。例:```toml
app = 'omniroute-yourname'
````

注意：

- 制御台の要点は `fly.toml` の里 `app` と一致するアプリケーションです
- 以前のように結果用の名前、例: `orout`、不要と `omniroute` が混在### 4.3 创建应用

このアプリケーションが存在しない場合：```powershell
flyctl apps create omniroute

````

それぞれのアプリケーション名が変更された場合は、「omniroute」がその名前に置き換えられます。### 4.4 首次部署

```powershell
flyctl deploy
````

---

## 5. 必配参数

この目的では、Fly.io 上で少なくとも次のパラメータを構成します。### 5.1 已验证使用的参数

これらのパラメータは現在「omniroute」上に配置されています：

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `STORAGE_ENCRYPTION_KEY`### 5.2 关于 `INITIAL_PASSWORD`

現在、現在の配置では「INITIAL_PASSWORD」が設定されていないため、これを使用する必要はありません。

設置しない場合：

- 启アニメーション日志会提案默认密码は `CHANGEME`
- 配備後应尽快在システム统設定置中修正登录密码

如果你希望無人值守初開始化後台密码，後軭补：

- `初期パスワード`---

## 6. 推荐参数说明

### 6.1 Secrets 中设置

建议入 フライの秘密：

| 变量名                   | 否推荐   | 说明                                 |
| ------------------------ | -------- | ------------------------------------ | ---------------------- |
| `API_KEY_SECRET`         | 必須     | API キーの生成与校验使用             |
| `JWT_SECRET`             | 必須     | 登録と JWT 名前の使用                |
| `STORAGE_ENCRYPTION_KEY` | 强烈推荐 | 加密存储敏感接続情報                 |
| `MACHINE_ID_SALT`        | 推荐     | 生成稳定机器标识                     |
| `初期パスワード`         | 可       | 最初の配備時直接指定後台初期秘密暗号 |
| OAuth/API 秘密鍵证       | 必要性   | 各外部平台鉴权配置                   | ### 6.2 当前项目推荐值 |

| 变量名                 | 推荐值                      |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/データ`                   |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

説明：

- `DATA_DIR=/data` は非常に重要で、Fly Volume のダウンロード ポイントと一致する必要があります
- `NEXT_PUBLIC_BASE_URL` は、调度器およびフロントエンド回调等场景に使用されます。---

## 7. 一键设置参数

次のコマンドは安全な値を生成し、現在のトップ アイテムに必要なパラメータを直接書き込みます。

説明：

- `INITIAL_PASSWORD` は含まれません
- 現在のメニュー「オムニルート」に使用します```powershell
  $apiKeySecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$jwtSecret = [Convert]::ToHexString((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
  $machineIdSalt = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$storageKey = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()

flyctl secrets set `  API_KEY_SECRET=$apiKeySecret`
JWT_SECRET=$jwtSecret `
  MACHINE_ID_SALT=$machineIdSalt `  STORAGE_ENCRYPTION_KEY=$storageKey`
DATA_DIR=/data `  NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev`
-a omniroute

````

如果你还要加初密码：```powershell
flyctl secrets set INITIAL_PASSWORD=你的强密码 -a omniroute
````

---

## 8. 查看当前参数

```powershell
flyctl secrets list -a omniroute
```

如果制御台「秘密」页面無表示你期待的变量，先检查：

- 見えるアプリケーションは「オムニルート」ではありません
- `fly.toml` の `app` が制御台应用に一致するかどうか---

## 9. 后续更新发布

代コード有更新後，発行步骤很简单：```powershell
git pull
flyctl deploy

````

場合のみパラメータを更新します，不変更コード：```powershell
flyctl secrets set KEY=value -a omniroute
````

フライミーティング自動更新機。### 9.1 跟踪原仓库更新并保留 fork 的 `fly.toml`

現在のクラスがフォークであり、上で `https://github.com/diegosouzapw/OmniRoute` を更新する必要がある場合、次のフローが実行されます。

先确认远程：```powershell
git remote -v

````

少なくとも含まれるもの：

- `origin` 指向你自己的フォーク
- `上流` 指向原仓库

「上流」がない場合、先追加：```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
````

同步上游前，先抓取最新提交和标签：```powershell
git fetch upstream --tags

````

查看現在の最新版和上游标签：```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
````

場合は最新の `main` を上に置き、フォークを保留する現在の前の `fly.toml` を使用して、次のフロー実行を実行できます。```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main

````

説明：

- `git mergeupstream/main` は同原最新コードに使用されます
- `git checkout HEAD~1 -- fly.toml` は自己の `fly.toml` をフォークするために使用されます。
- 上に `fly.toml` が変更されていない場合、これには問題がありません
- 上が `fly.toml` を変更した場合、この能确保 Fly 应用名、挂下卷、エリア等 fork 自定义配置配置不被覆盖

'v3.4.7' などの特定の配信サービスを明らかにする場合は、'upstream/main' に含まれているかどうかを事前に確認することもできます。```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
````

成功を返すと、「upstream/main」にそのバージョンが含まれていることを示し、「upstream/main」に直接結合するだけで済みます。### 9.2 同步上游后的标准发布顺序

同步原仓库完了後，推荐按下顺序播布：

1. `git fetchupstream --tags`
2. `git merge アップストリーム/メイン`
3. フォークの `fly.toml`
4. `git Push Origin main` 5.「flyctlデプロイ」
5. `flyctl status -a オムニルート`
6. `flyctl logs --no-tail -aomniroute`

これは、現在のトップが「v3.4.7」に上がったときに使用される実際のフローです。---

## 10. 发布后检查

### 10.1 查看应用状态

```powershell
flyctl status -a omniroute
```

### 10.2 查看启动日志

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 检查网站可访问

```powershell
try {
  (Invoke-WebRequest -Uri "https://omniroute.fly.dev" -MaximumRedirection 5 -UseBasicParsing).StatusCode
} catch {
  if ($_.Exception.Response) {
    $_.Exception.Response.StatusCode.value__
  } else {
    throw
  }
}
```

`200` が返されると、ステーション ポイントが正常に動作していることが示されます。---

## 11. 成功标志

展開が成功した後、日志里应は同様の内容を閲覧しました：```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite

````

この点很关键：

- `/data/server.env` 说明行時間密钥落到了持久卷
- `/data/storage.sqlite` 说明データ台库写入持久卷

`/app/data/...` が見つかった場合は、`DATA_DIR` が割り当てられていないことが示されているため、すぐに修正する必要があります。---

## 12. 常见问题

### 12.1 `Secrets` 页面是空的

通常、次の 2 つの原因があります。

- 你还没行 `flyctl Secrets set`
- 運行中は別の用途です。例: 'orute' であり、'omniroute' ではありません。### 12.2 `flyctl deploy` 报 `app not found`

先创建应用：```powershell
flyctl apps create omniroute
````

### 12.3 `fly.toml` 解析失败

注目ポイント：

- 注释里是否乱数字符
- TOML 引号と缩进の有無は正确### 12.4 数据没有持久化

以下の2点：

- `fly.toml` が存在するかどうか `destination = '/data'`
- `DATA_DIR` が `/data` に設定されているかどうか### 12.5 不设置 `INITIAL_PASSWORD` 是否能跑

実行することはできますが、生成された環境は、できるだけ修正された「CHANGEME」に戻る可能性があります。---

## 13. 新项目复用建议

その後にこの文書に従って新しいアイテムが配置される場合は、少なくともこの項目を変更します:

1. `fly.toml` 里の `app` を修正2.「NEXT_PUBLIC_BASE_URL」を修正
2. `DATA_DIR=/data` を保持します。
3. `API_KEY_SECRET`、`JWT_SECRET`、`MACHINE_ID_SALT`、`STORAGE_ENCRYPTION_KEY`を再生成します5.初回配置後检查日志が `/data` に書き込まれるかどうか

古いトップの目的のセキュリティを直接使用する必要はありません。---

## 14. 当前项目的最小发布清单

現在前目後最もよく使用されるコマンドは次のとおりです:```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute

````

如果只是常刊，心核就是：```powershell
flyctl deploy
````

如果是新環境初回配置，核心就是：

1. `flyctl 認証ログイン` 2.「flyctl アプリがオムニルートを作成」
2. `flyctl シークレット セット ... -a オムニルート` 4.「flyctlデプロイ」
3. `flyctl logs --no-tail -aomniroute`
