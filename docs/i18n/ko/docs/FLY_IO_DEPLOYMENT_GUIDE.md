# OmniRoute Fly.io 部署指南 (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [in](../../in/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/FLY_IO_DEPLOYMENT_GUIDE.md)

---

Fly.io의 OmniRoute에 대한 본문서의 사용 방식은 다음과 같습니다.

- 首次把当前项目part署到 Fly.io
- 后续代码更新后继续发布
- 新项目参考同样流程署

本文基于当前项目已经验证通过的配置整리, 应용명为 'omniroute'입니다.---

## 1. 部署目标

- 平台：Fly.io
- PART署方式：本地 `flyctl` 直接发布
- 运行方式：使用仓库内现有 `Dockerfile` 과 `fly.toml`
- 数据持久化：Fly Volume 挂载到 `/data`
- 访问地址：`https://omniroute.fly.dev/`---

## 2. 当前项目关键配置

当前仓库中的 `fly.toml` 已确认包含以下关键项 :```toml
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

설명:

- `app = 'omniroute'` 决定实际part署到哪个 Fly 应용
- `destination = '/data'` 决定持久卷挂载目录
- 本项目必须让 `DATA_DIR=/data` ，否则数据库및密钥会写到容器临时目录---

## 3. 必备工具

### 3.1 安装 Fly CLI

윈도우 파워셸:```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
````

如果安装脚本이 当前环境失败，也可以手动下载 `flyctl` two 进system并放到 `PATH` 中。### 3.2 登录 Fly 账号

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

打开 `fly.toml````toml
app = 'omniroute'

````

如果你准备부署到自己的新应用,可改成全局唯一name称，例如：```toml
app = 'omniroute-yourname'
````

참고:

- 控台里要看的是与 `fly.toml` 里`app` 一致的应용
- 以前如果사용 过别의 이름, 例如 `oroute`, 不要 및 `omniroute` 混淆### 4.3 创建应用

如果该应用尚不存：```powershell
flyctl apps create omniroute

````

如果你已经改成别의 应사용 이름, 把 'omniroute' 替换成你의 이름입니다.### 4.4 首次部署

```powershell
flyctl deploy
````

---

## 5. 必配参数

本项目는 Fly.io에서 上建议至少配置以下参数。### 5.1 已验证使用的参数

这些参数已经在当前 `omniroute` 应用上实际part署：

- `API_KEY_SECRET`
- `DATA_DIR` -`JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `STORAGE_ENCRYPTION_KEY`### 5.2 关于 `INITIAL_PASSWORD`

当前项目没有设置 `INITIAL_PASSWORD`，因为本次part署按需求不使用它。

如果不设置：

- 启动日志会提示默认密码是 'CHANGEME'
- PART署后应尽快 系统设置中修改登录密码

如果你希望无人值守初始化后台密码，也可以后续补 :

- `INITIAL_PASSWORD`---

## 6. 推荐参数说明

### 6.1 Secrets 中设置

建议放入 플라이 비밀 :

| 수량명                   | 是否推荐 | 설명                             |
| ------------------------ | -------- | -------------------------------- | ---------------------- |
| `API_KEY_SECRET`         | 必需     | API 키 생성                      |
| `JWT_SECRET`             | 必需     | JWT 네트워크 이름 사용           |
| `STORAGE_ENCRYPTION_KEY` | 强烈推荐 | 加密存储敏感连接信息             |
| `MACHINE_ID_SALT`        | 推荐     | 生成稳定机器标识                 |
| `초기_비밀번호`          | 可选     | 首次part署时直接指定后台初始密码 |
| OAuth/API 관리           | 按需     | 各类외부 平台鉴权配置            | ### 6.2 当前项目推荐值 |

| 수량명                 | 推荐值                      |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/데이터`                   |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

설명:

- `DATA_DIR=/data` 不常关键，必须与 플라이 볼륨 挂载点一致
- `NEXT_PUBLIC_BASE_URL` 于调島器和前端回调等场景---

## 7. 一键设置参数

下면命令会生成안전한随机值，并把当前项目需要的参数一次性写入 Fly Secrets。

설명:

- 不包含 `INITIAL_PASSWORD`
- 适用于当前项目 '옴니루트'```powershell
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

如果你还要加初始密码：```powershell
flyctl secrets set INITIAL_PASSWORD=你的强密码 -a omniroute
````

---

## 8. 查看当前参数

```powershell
flyctl secrets list -a omniroute
```

如果控 조절台 `비밀` 页face没有显示你期待的变weight，先检查：

- 看的应用是不是 '옴니루트'
- `fly.toml` 의 `app` 是否和控system台应用一致---

## 9. 后续更新发布

代码有更新后，发布步骤很简单：```powershell
git pull
flyctl deploy

````

如果只更新参数，不改代码:```powershell
flyctl secrets set KEY=value -a omniroute
````

Fly 会自动滚动更新机器.### 9.1 跟踪原仓库更新并保留 fork 的 `fly.toml`

如果当前仓库是 포크，并且你要同步上游 `https://github.com/diegosouzapw/OmniRoute` 的更新，推荐按下면流程执行。

先确认远程：```powershell
git remote -v

````

应至少包含：

- `origin` 指向你自己의 포크
-`업스트림` 指向原仓库

如果没有`upstream`，先添加：```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
````

同步上游前，先抓取最新提交와标签：```powershell
git fetch upstream --tags

````

查看当前版本和上游标签：```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
````

如果你想同并上游最new `main`, 并强管保留 포크 当前的 `fly.toml`, 可按下면流程执行:```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main

````

설명:

- `git merge upstream/main`
- `git checkout HEAD~1 -- fly.toml` 사용于恢复合并前你 포크 자체 `fly.toml`
- 如果上游没有改 `fly.toml`，这一步不会带来额外差异
- 如果上游改了 `fly.toml`，这一步能确保 Fly 应사용명, 挂载卷, 区域等 포크 自정义부署配置不被覆盖

如果你明确只想对齐某个发布标签，例如 `v3.4.7`，也可以先确认标签是否已经包含에서 `upstream/main`:```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
````

返回成功表示 `upstream/main` 已经包含该版本，直接合并 `upstream/main` 即可。### 9.2 同步上游后的标准发布顺序

同步原仓库完成后，推荐按下면顺序发布 :

1. `git fetch upstream --tags`
2. `git 병합 업스트림/메인`
3. 恢复 포크의 `fly.toml`
4. `git push 원점 메인`
5. `flyctl 배포`
6. `flyctl status -a omniroute`
7. `flyctl 로그 --no-tail -a 옴니루트`

这就是当前项目升级到 `v3.4.7` 时使用实际流程.---

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

返回 `200` 说明站点已正常响应.---

## 11. 成功标志

PART署成功后，日志里应看到类似内容：```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite

````

这两个点很关键 :

- `/data/server.env` 说明运行时密钥落到了持久卷
- `/data/storage.sqlite` 说明数据库写入持久卷

如果你看到的是 `/app/data/...`，说明 `DATA_DIR` 没配对，需要立即修正。---

## 12. 常见问题

### 12.1 `Secrets` 页面是空的

일반적인 출처:

- 你还没执行 'flyctl secrets set'
- 你打开的是另一个应用，例如 'oroute'，不是 'omniroute'### 12.2 `flyctl deploy` 报 `app not found`

先创建应용:```powershell
flyctl apps create omniroute
````

### 12.3 `fly.toml` 解析失败

点检查:

- 注释里是否有乱码字符
- TOML 引号和缩进是否正确### 12.4 数据没有持久化

检查以下两点:

- `fly.toml` 中是否存재 `destination = '/data'`
- `DATA_DIR` 是否设置为 `/data`### 12.5 不设置 `INITIAL_PASSWORD` 是否能跑

可以运行，但会回退到默认 `CHANGEME`。生产环境建议尽快修改后台密码。---

## 13. 新项目复用建议

如果以后是new项目光着这份文档部署，最少改这几项：

1. 修改 `fly.toml` 다른 `app`
2. 修改 `NEXT_PUBLIC_BASE_URL`
3. 保持 `DATA_DIR=/data`
4. 새로운 생성 `API_KEY_SECRET`、`JWT_SECRET`、`MACHINE_ID_SALT`、`STORAGE_ENCRYPTION_KEY`
5. 首次部署后检查日志是否写入 `/data`

사용하지 않는 것이 좋습니다.---

## 14. 当前项目的最小发布清单

当前项目后续最常사용용命令如下：```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute

````

如果只是正常发版，核心就是：```powershell
flyctl deploy
````

如果是new环境首次part署，核心就是：

1.`flyctl 인증 로그인` 2. `flyctl 앱이 전방향 경로를 생성` 3. `flyctl 비밀 설정 ... -옴니루트` 4. `flyctl 배포` 5. `flyctl 로그 --no-tail -a 옴니루트`
