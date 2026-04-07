# OmniRoute Fly.io 部署指南 (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [in](../../in/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/FLY_IO_DEPLOYMENT_GUIDE.md)

---

OmniRoute ve Fly.io'nun kullanımı:

- Fly.io'nun kullanımı
- 后续代码更新后继续发布
- 新项目参考同样流程部署

本文基于当前项目已经验证通过的配置整理,应用名为 "omniroute".---

## 1. 部署目标

- Adı: Fly.io
- 部署方式: 本地 `flyctl' 直接发布
- Dosya yönetimi `Dockerfile' ve `fly.toml' arasında geçerlidir.
- 数据持久化:Fly Volume 挂载到 `/data`
- Kaynak: "https://omniroute.fly.dev/"---

## 2. 当前项目关键配置

`fly.toml` uygulamasının kullanımı:```toml
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

Yani şarkı sözleri:

- `app = 'omniroute'` 决定实际部署到哪个 Fly 应用
- `hedef = '/data'`
- `DATA_DIR=/data' dosyası, daha fazla bilgi için veri aktarımını sağlar---

## 3. 必备工具

### 3.1 安装 Fly CLI

Windows PowerShell:```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
````

`flyctl` ile `PATH` arasında bir bağlantı kurun.### 3.2 登录 Fly 账号

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

`fly.toml` dosyası:```toml
app = 'omniroute'

````

如果你准备部署到自己的新应用,可改成全局唯一名称,例如:```toml
app = 'omniroute-yourname'
````

Yani:

- `fly.toml` veya `app` uygulamasının kullanımı
- 以前如果用过别的名字, 例如 `oroute', 不要 ve `omniroute' 混淆### 4.3 创建应用

En iyi örnek:```powershell
flyctl apps create omniroute

````

如果你已经改成别的应用名, ``omniroute'' 替换成你的名字。### 4.4 首次部署

```powershell
flyctl deploy
````

---

## 5. 必配参数

Fly.io ile bağlantı kurun.### 5.1 已验证使用的参数

Omniroute'un kullanımı:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `STORAGE_ENCRYPTION_KEY`### 5.2 关于 `INITIAL_PASSWORD`

`INITIAL_PASSWORD`, parolanın şifrelenmesi için kullanılır.

örnek:

- 启动日志会提示默认密码是 `CHANGEME'
- 部署后应尽快在系统设置中修改登录密码

如果你希望无人值守初始化后台密码,也可以后续补:

- `BAŞLANGIÇ_ŞİFRE`---

## 6. 推荐参数说明

### 6.1 Secrets 中设置

Fly Secrets:

| Kitap                        | Anahtar Kelimeler |                        |
| ---------------------------- | ----------------- | ---------------------- | ---------------------- |
| 'API_KEY_SECRET'             | Tercüme           | API Anahtarı Anahtarı  |
| 'JWT_SECRET'                 | Tercüme           | JWT Haritalama         |
| `STORAGE_ENCRYPTION_KEY`     | Kitapçığı         | Ev Dekorasyonu         |
| `MACHINE_ID_SALT`            | İngilizce         | Kitaplıklar            |
| `INITIAL_PASSWORD`           |                   | Ev aletleri            |
| OAuth/API kimlik doğrulaması | Etiketler         | Endüstriyel Ekipmanlar | ### 6.2 当前项目推荐值 |

| Kitap                  | Kitap                       |
| ---------------------- | --------------------------- |
| 'DATA_DIR'             | `/veri`                     |
| 'NEXT_PUBLIC_BASE_URL' | `https://omniroute.fly.dev` |

Yani şarkı sözleri:

- `DATA_DIR=/data` 非常关键，必须与 Fly Volume 挂载点一致
- `NEXT_PUBLIC_BASE_URL` adresi---

## 7. 一键设置参数

下面命令会生成安全随机值,并把当前项目需要的参数一次性写入 Fly Secrets。

Yani şarkı sözleri:

- `INITIAL_PASSWORD` şifresini girin
- 适用于当前项目 `çok yönlü rota'```powershell
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

Bir başka deyişle:```powershell
flyctl secrets set INITIAL_PASSWORD=你的强密码 -a omniroute
````

---

## 8. 查看当前参数

```powershell
flyctl secrets list -a omniroute
```

如果控制台 `Sırlar' 页面没有显示你期待的变量,先检查:

- 看的应用是不是 `çok yönlü rota'
- `fly.toml` ve `app` uygulaması---

## 9. 后续更新发布

Başka bir deyişle:```powershell
git pull
flyctl deploy

````

Bir başka deyişle:```powershell
flyctl secrets set KEY=value -a omniroute
````

Fly ile uçun.### 9.1 跟踪原仓库更新并保留 fork 的 `fly.toml`

如果当前仓库是 fork，并且你要同步上游 `https://github.com/diegosouzapw/OmniRoute` 的更新,推荐按下面流程执行。

örnek:```powershell
git remote -v

````

örnek:

- "orijin" 指向你自己的 çatal
- "yukarı akış"

如果没有 "yukarı akış":```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
````

Bir başka deyişle:```powershell
git fetch upstream --tags

````

Bir örnek:```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
````

如果你想合并上游最新 `ana',并强制保留 çatal 当前的 `fly.toml`,可按下面流程执行:```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main

````

Yani şarkı sözleri:

- `git birleştirme yukarı/ana'
- `git checkout HEAD~1 -- fly.toml` 用于恢复合并前你 fork 自己的 `fly.toml`
- 如果上游没有改 `fly.toml`,这一步不会带来额外差异
- 如果上游改了 `fly.toml`,这一步能确保 Fly 应用名、挂载卷、区域等 çatal自定义部署配置不被覆盖

如果你明确只想对齐某个发布标签,例如 `v3.4.7`,也可以先确认标签是否已经包含在'yukarı akış/ana':```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
````

返回成功表示 `yukarı akış/ana' 已经包含该版本,直接合并 `yukarı akış/ana' 即可。### 9.2 同步上游后的标准发布顺序

同步原仓库完成后,推荐按下面顺序发布:

1. `git yukarı akış getir --tags'
2. 'git birleştirme yukarı/ana'
3. çatal ve `fly.toml'
4. 'git push orijini ana'
5. 'flyctl dağıtımı'
6. 'uçuş durumu - çok yönlü bir rota'
7. `flyctl günlükleri --kuyruk yok -çok yönlü bir rota'

Yeni sürüm `v3.4.7` ile güncellendi.---

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

`200` 说明站点已正常响应。---

## 11. 成功标志

部署成功后,日志里应看到类似内容:```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite

````

Başka bir deyişle:

- `/data/server.env` dosyasında veri aktarımı
- `/data/storage.sqlite` dosyası

`/app/data/...`, `DATA_DIR` dosyasına bakın.---

## 12. 常见问题

### 12.1 `Secrets` 页面是空的

En iyi örnek:

- 你还没执行 `flyctl sırları seti'
- 你打开的是另一个应用,例如 'oroute', 不是 'omniroute'### 12.2 `flyctl deploy` 报 `app not found`

örnek:```powershell
flyctl apps create omniroute
````

### 12.3 `fly.toml` 解析失败

örnek:

- 注释里是否有乱码字符
- TOML 引号和缩进是否正确### 12.4 数据没有持久化

Bir örnek:

- `fly.toml` `destination = '/data'`
- `DATA_DIR` `/data` dosyası### 12.5 不设置 `INITIAL_PASSWORD` 是否能跑

可以运行，但会回退到默认 `CHANGEME`。生产环境建议尽快修改后台密码。---

## 13. 新项目复用建议

如果以后是新项目照着这份文档部署,最少改这几项:

1. `fly.toml` ve `app` uygulamasını kullanın
2. `NEXT_PUBLIC_BASE_URL` adresine gidin
3. `DATA_DIR=/data' dosyası
4. "API_KEY_SECRET", "JWT_SECRET", "MACHINE_ID_SALT", "STORAGE_ENCRYPTION_KEY" anahtarlarını kullanın
5. Verilerin saklanması `/data'

Bir başka deyişle, bu çok iyi bir şey.---

## 14. 当前项目的最小发布清单

当前项目后续最常用的命令如下:```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute

````

如果只是正常发版,核心就是:```powershell
flyctl deploy
````

如果是新环境首次部署,核心就是:

1. 'flyctl kimlik doğrulama girişi'
2. `flyctl uygulamaları çok yönlü rota oluşturur`
3. 'flyctl sırları seti ... -çok yönlü bir yol'
4. 'flyctl dağıtımı'
5. `flyctl günlükleri --kuyruk yok -çok yönlü bir rota'
