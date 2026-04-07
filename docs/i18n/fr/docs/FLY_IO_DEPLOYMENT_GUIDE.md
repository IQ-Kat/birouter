# OmniRoute Fly.io 部署指南 (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [in](../../in/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/FLY_IO_DEPLOYMENT_GUIDE.md)

---

Il existe un lien entre OmniRoute et Fly.io pour le lancement d'OmniRoute :

- 首次把当前项目部署到 Fly.io
- 后续代码更新后继续发布
- 新项目参考同样流程部署

Il s'agit de l'omniroute.---

## 1. 部署目标

- Sujet : Fly.io
- Nom du produit : "flyctl" est utilisé
- Nom du produit : il s'agit de `Dockerfile` et `fly.toml`
- 数据持久化：Volume de vol `/data`
- 访问地址：`https://omniroute.fly.dev/`---

## 2. 当前项目关键配置

La description de `fly.toml` est la suivante :```toml
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

Description :

- `app = 'omniroute'`
- `destination = '/data'`
- Il s'agit de `DATA_DIR=/data`, et il s'agit d'un fichier `DATA_DIR=/data`.---

## 3. 必备工具

### 3.1 安装 Fly CLI

Windows PowerShell :```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
````

Il y a un lien vers `flyctl` et `PATH` vers `PATH`.### 3.2 登录 Fly 账号

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

Pour `fly.toml`, il s'agit de :```toml
app = 'omniroute'

````

如果你准备部署到自己的新应用，可改成全局唯一名称，例如：```toml
app = 'omniroute-yourname'
````

注意:

- Il s'agit de `fly.toml` et `app` de `fly.toml` et `app`.
- 以前如果用过别的名字，例如 `oroute`, 不要和 `omniroute` 混淆### 4.3 创建应用

如果该应用尚不存在：```powershell
flyctl apps create omniroute

````

Il s'agit de l'omniroute.### 4.4 首次部署

```powershell
flyctl deploy
````

---

## 5. 必配参数

Le site Fly.io est basé sur Fly.io.### 5.1 已验证使用的参数

Le terme "omniroute" est le suivant :

- `API_KEY_SECRET`
- `DONNEES_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `STORAGE_ENCRYPTION_KEY`### 5.2 关于 `INITIAL_PASSWORD`

Il s'agit de `INITIAL_PASSWORD`, et il s'agit d'un mot de passe `INITIAL_PASSWORD`.

如果不设置:

- `CHANGEME`
- 部署后应尽快在系统设置中修改登录密码

如果你希望无人值守初始化后台密码，也可以后续补 :

- `INITIAL_PASSWORD`---

## 6. 推荐参数说明

### 6.1 Secrets 中设置

建议放入 Fly Secrets：

| 变量名                   | 是否推荐 | 明                             |
| ------------------------ | -------- | ------------------------------ | ---------------------- |
| `API_KEY_SECRET`         | 必需     | Clé API                        |
| `JWT_SECRET`             | 必需     | Liens vers JWT                 |
| `STORAGE_ENCRYPTION_KEY` | 强烈推荐 | 加密存储敏感连接信息           |
| `MACHINE_ID_SALT`        | 推荐     | 生成稳定机器标识               |
| `INITIAL_PASSWORD`       | 可选     | 首次部署时直接指定后台初始密码 |
| OAuth/API                | 按需     | 各类外部平台鉴权配置           | ### 6.2 当前项目推荐值 |

| 变量名                 | 推荐值                      |
| ---------------------- | --------------------------- |
| `DONNEES_DIR`          | `/données`                  |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Description :

- `DATA_DIR=/data` pour le volume de vol et le volume de vol.
- `NEXT_PUBLIC_BASE_URL` pour les projets de recherche en ligne---

## 7. 一键设置参数

Il s'agit de Fly Secrets.

Description :

- Il s'agit de `INITIAL_PASSWORD`
- `omniroute````powershell
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

La description de `Secrets` 页面没有显示你期待的变量：

- `omniroute`
- `fly.toml` et `app` 是否和控制台应用一致---

## 9. 后续更新发布

代码有更新后，发布步骤很简单 :```powershell
git pull
flyctl deploy

````

如果只更新参数，不改代码：```powershell
flyctl secrets set KEY=value -a omniroute
````

Fly 会自动滚动更新机器。### 9.1 跟踪原仓库更新并保留 fork 的 `fly.toml`

如果当前仓库是 fork，并且你要同步上游 `https://github.com/diegosouzapw/OmniRoute` 的更新，推荐按下面流程执行。

先确认远程:```powershell
git remote -v

````

应至少包含:

- Fourche `origine` 指向你自己的
- `amont` 指向原仓库

En amont :```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
````

同步上游前，先抓取最新提交和标签：```powershell
git fetch upstream --tags

````

查看当前版本和上游标签:```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
````

Il y a aussi `main` et `main`, ainsi que fork et `fly.toml`, et `fly.toml`:```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main

````

Description :

- `git merge amont/main` est utilisé
- `git checkout HEAD~1 -- fly.toml` pour fork et `fly.toml`
- Il s'agit de `fly.toml`, il s'agit de "fly.toml"
- Il s'agit de `fly.toml`, de la version Fly.

La version `v3.4.7` de la version `v3.4.7` est `upstream/main` :```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
````

Il s'agit de « amont/main » et de « amont/principal ».### 9.2 同步上游后的标准发布顺序

同步原仓库完成后，推荐按下面顺序发布：

1. `git fetch en amont --tags`
2. `git merge amont/main`
3. Fourche 恢复 `fly.toml`
4. `git push origin main`
5. `déploiement flyctl`
6. `statut flyctl -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

La version `v3.4.7` de la version `v3.4.7` est également disponible.---

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

部署成功后，日志里应看到类似内容 :```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite

````

这两个点很关键:

- `/data/server.env` est utilisé
- `/data/storage.sqlite` est également disponible

Il s'agit de `/app/data/...`, et `DATA_DIR` est également utilisé.---

## 12. 常见问题

### 12.1 `Secrets` 页面是空的

通常有两种原因：

- `Jeu de secrets flyctl`
- 你打开的是另一个应用，例如 `oroute`, 不是 `omniroute`### 12.2 `flyctl deploy` 报 `app not found`

先创建应用:```powershell
flyctl apps create omniroute
````

### 12.3 `fly.toml` 解析失败

重点检查：

- 注释里是否有乱码字符
- TOML 引号和缩进是否正确### 12.4 数据没有持久化

检查以下两点 :

- `fly.toml` remplace `destination = '/data'`
- `DATA_DIR` correspond à `/data`### 12.5 不设置 `INITIAL_PASSWORD` 是否能跑

Il s'agit de `CHANGEME`.---

## 13. 新项目复用建议

如果以后是新项目照着这份文档部署，最少改这几项 :

1. Utiliser `fly.toml` et `app`
2. Utiliser `NEXT_PUBLIC_BASE_URL`
3. Utilisez `DATA_DIR=/data`
4. Il s'agit de `API_KEY_SECRET`,`JWT_SECRET`,`MACHINE_ID_SALT`,`STORAGE_ENCRYPTION_KEY`
5. Le fichier `/data`

不要直接复用旧项目的密钥。---

## 14. 当前项目的最小发布清单

当前项目后续最常用的命令如下：```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute

````

如果只是正常发版，核心就是：```powershell
flyctl deploy
````

如果是新环境首次部署，核心就是：

1. `Connexion d'authentification flyctl`
2. « Les applications flyctl créent omniroute »
3. `les secrets flyctl définis... -un omniroute`
4. `déploiement flyctl`
5. `flyctl logs --no-tail -a omniroute`
