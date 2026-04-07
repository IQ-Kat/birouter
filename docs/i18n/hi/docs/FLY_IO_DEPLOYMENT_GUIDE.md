# OmniRoute Fly.io 部署指南 (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [in](../../in/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/FLY_IO_DEPLOYMENT_GUIDE.md)

---

ओमनीरूट और फ़्लाई.आईओ के बारे में अधिक जानकारी के लिए, कृपया मुझे बताएं:

- 首次把当前项目部署到 Fly.io
- 后续代码更新后继续发布
- 新项目参考同样流程部署

मैं आपको `omniroute` के बारे में बताता हूं।---

## 1. 部署目标

- स्रोत: Fly.io
- स्रोत: `flyctl` 直接发布
- उत्तर: `Dockerfile` और `fly.toml` के बारे में जानकारी प्राप्त करें
- शीर्षक: फ्लाई वॉल्यूम का अर्थ `/डेटा`
- उत्तर:`https://omniroute.fly.dev/`---

## 2. 当前项目关键配置

`fly.toml` के बारे में अधिक जानें```toml
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

उत्तर:

- `ऐप = 'ऑम्नीरूट'` 决定实际部署到哪个 फ्लाई 应用
- `गंतव्य = '/डेटा'`
- `DATA_DIR=/data` का उपयोग करने के लिए, आपको इसे देखने के लिए `DATA_DIR=/data` की आवश्यकता है---

## 3. 必备工具

### 3.1 安装 Fly CLI

विंडोज़ पॉवरशेल：```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
````

`flyctl` और `PATH` के बारे में अधिक जानें।### 3.2 登录 Fly 账号

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

`fly.toml`, या `fly.toml` का उत्तर दें:```toml
app = 'omniroute'

````

उत्तर:```toml
app = 'omniroute-yourname'
````

उत्तर:

- `fly.toml` `app` 一致的应用 一致的应用 控制台里要看的是与
- 以前如果用过别的名字,例如 `oroute`,不要和 `omniroute` 混淆### 4.3 创建应用

如果该应用尚不存在:```powershell
flyctl apps create omniroute

````

मैं आपको 'ओम्निरूटे' के बारे में बताना चाहता हूं, जिसका उपयोग आप कर सकते हैं।### 4.4 首次部署

```powershell
flyctl deploy
````

---

## 5. 必配参数

本项目在Fly.io 上建议至少配以下参数。### 5.1 已验证使用的参数

`omniroute` के बारे में अधिक जानें:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `मशीन_आईडी_नमक`
- `NEXT_PUBLIC_BASE_URL`
- `STORAGE_ENCRYPTION_KEY`### 5.2 关于 `INITIAL_PASSWORD`

`INITIAL_PASSWORD` को डाउनलोड करने के लिए, आपको एक पासवर्ड प्राप्त करने की आवश्यकता है।

如果不设置:

- `चेंजमे` को देखने के लिए आपको क्या करना चाहिए
- 部署后应尽快在系统设置中修改登录密码

如果你希望无人值守初始化后台密码,也可以后续补:

- `प्रारंभिक_पासवर्ड`---

## 6. 推荐参数说明

### 6.1 Secrets 中设置

建议放入 फ्लाई सीक्रेट्स:

| 变量名                   | 是否推荐 | 说明                                 |
| ------------------------ | -------- | ------------------------------------ | ---------------------- |
| `API_KEY_SECRET`         | 必需     | एपीआई कुंजी डाउनलोड करें             |
| `JWT_SECRET`             | 必需     | JWT के बारे में जानकारी प्राप्त करें |
| `STORAGE_ENCRYPTION_KEY` | 强烈推荐 | 加密存储敏感连接信息                 |
| `MACHINE_ID_SALT`        | 推荐     | 生成稳定机器标识                     |
| `प्रारंभिक_पासवर्ड`      | 可选     | 首次部署时直接指定后台初始密码       |
| OAuth/API 私密凭证       | 按需     | 各类外部平台鉴权配置                 | ### 6.2 当前项目推荐值 |

| 变量名                 | 推荐值                      |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/डेटा`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

उत्तर:

- `DATA_DIR=/data` 非常关键, 必须与 फ्लाई वॉल्यूम 挂载点一致
- `NEXT_PUBLIC_BASE_URL` 用于调度器和前端回调等场景---

## 7. 一键设置参数

फ्लाई सीक्रेट्स के बारे में अधिक जानें।

उत्तर:

- `INITIAL_PASSWORD` पर क्लिक करें
- 适用于当前项目 `omniroute````powershell
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

如果你还要加初始密码:```powershell
flyctl secrets set INITIAL_PASSWORD=你的强密码 -a omniroute
````

---

## 8. 查看当前参数

```powershell
flyctl secrets list -a omniroute
```

如果控制台 `रहस्य' 页面没有显示你期待的变量,先检查：

- `omniroute` के बारे में जानकारी प्राप्त करें
- `fly.toml` ``app` 是否和控制台应用一致---

## 9. 后续更新发布

代码有更新后,发布步骤很简单：```powershell
git pull
flyctl deploy

````

如果只更新参数,不改代码:```powershell
flyctl secrets set KEY=value -a omniroute
````

会自动滚动更新机器。### 9.1 跟踪原仓库更新并保留 fork 的 `fly.toml`

如果当前仓库是fork,并且你要同步上游 `https://github.com/diegosouzapw/OmniRoute` मैं आपसे मिलना चाहता हूं, मैं आपसे संपर्क करना चाहता हूं।

先确认远程:```powershell
git remote -v

````

应至少包含:

- `उत्पत्ति` 指向你自己的 कांटा
- `अपस्ट्रीम` 指向原仓库

`अपस्ट्रीम`, 先添加: का अर्थ है```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
````

同步上游前,先抓取最新提交和标签:```powershell
git fetch upstream --tags

````

उत्तर:```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
````

`main``, 并强制保留 fork, `fly.toml`, 可按下面流程执行：```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main

````

उत्तर:

- `गिट मर्ज अपस्ट्रीम/मेन` का उपयोग करने के लिए एक समाधान चुनें
- `गिट चेकआउट हेड~1--fly.toml` का उपयोग करने के लिए fork का उपयोग करें `fly.toml`
- 如果上游没有改 `fly.toml`, 这一步不会带来额外差异
- 如果上游改了 `fly.toml`, 这一步能确保 Fly 应用名、挂载卷、区域等 fork自定义部署配置不被覆盖

`v3.4.7`, `v3.4.7`, 也可以先确认标签是否已经包含在 के बारे में अधिक जानें `अपस्ट्रीम/मेन`：```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
````

返回成功表示 `upstream/main` 已经包含该版本,直接合并 `upstream/main` 即可。### 9.2 同步上游后的标准发布顺序

同步原仓库完成后,推荐按下面顺序发布：

1. `गिट फ़ेच अपस्ट्रीम --टैग्स`
2. `गिट मर्ज अपस्ट्रीम/मेन`
3. 恢复 कांटा `fly.toml`
4. `गिट पुश ओरिजिन मेन`
5. `फ्लाईसीटीएल तैनाती`
6. `फ्लाईक्टल स्टेटस-ए ऑम्नीरूट`
7. `फ्लाईक्टल लॉग्स--नो-टेल-ए ऑम्नीरूट`

`v3.4.7` को डाउनलोड करने के लिए `v3.4.7` डाउनलोड करें।---

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

返回 `200` 说明站点已正常响应。---

## 11. 成功标志

部署成功后,日志里应看到类似内容：```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite

````

这两个点很关键:

- `/data/server.env` 说明运行时密钥落到了持久卷
- `/data/storage.sqlite` का उपयोग करने के लिए कोई विकल्प नहीं है

`/app/data/...`, `DATA_DIR` 没配对, 需要立即修正。 के बारे में जानें।---

## 12. 常见问题

### 12.1 `Secrets` 页面是空的

通常有两种原因:

- `flyctl सीक्रेट्स सेट` के बारे में जानें
- 你打开的是另一个应用,例如 `oroute`,不是 `omniroute`### 12.2 `flyctl deploy` 报 `app not found`

先创建应用:```powershell
flyctl apps create omniroute
````

### 12.3 `fly.toml` 解析失败

उत्तर:

- 注释里是否有乱码字符
- TOML 引号和缩进是否正确### 12.4 数据没有持久化

检查以下两点:

- `fly.toml` 中是否存在 `destination = '/data'`
- `DATA_DIR` का उपयोग `/data` के लिए किया जाता है### 12.5 不设置 `INITIAL_PASSWORD` 是否能跑

`चेंजमी` के लिए एक और विकल्प चुनें, और फिर इसे बदलें।---

## 13. 新项目复用建议

अधिक पढ़ें

1. 'fly.toml' या 'app' चुनें
2. `NEXT_PUBLIC_BASE_URL` का उपयोग करें
3. `DATA_DIR=/data` का उपयोग करें
4. `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT`, `STORAGE_ENCRYPTION_KEY` का चयन करें
5. 首次部署后检查日志是否写入 `/data`

मेरे पास एक अच्छा विकल्प है।---

## 14. 当前项目的最小发布清单

当前项目后续最常用的命令如下:```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute

````

如果只是正常发版, 核心就是:```powershell
flyctl deploy
````

如果是新环境首次部署, 核心就是:

1. `flyctl ऑथ लॉगइन`
2. `फ्लाईसीटीएल ऐप्स सर्वव्यापी बनाते हैं`
3. `फ्लाईक्टल सीक्रेट्स सेट...-ए ऑम्नीरूट`
4. `फ्लाईसीटीएल तैनाती`
5. `flyctl logs --no-tail -a omniroute`
