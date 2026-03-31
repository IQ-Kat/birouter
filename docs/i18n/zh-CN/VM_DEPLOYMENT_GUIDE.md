# OmniRoute — 使用 Cloudflare 在虚拟机上部署指南

🌐 **语言:** 🇺🇸 [English](../../VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](../es/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](../fr/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](../it/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](../ru/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](../de/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](../in/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](../th/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](../ar/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](../ja/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](../bg/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](../da/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](../fi/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](../he/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](../hu/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](../ko/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](../nl/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](../no/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](../ro/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](../pl/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](../sv/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](../phi/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](../cs/VM_DEPLOYMENT_GUIDE.md)

在通过 Cloudflare 管理域名的 VM (VPS) 上安装和配置 OmniRoute 的完整指南。

---

## 先决条件

| 项目         | 最低要求             | 推荐               |
| ------------ | -------------------- | ------------------ |
| **CPU**      | 1 vCPU               | 2 vCPU             |
| **内存**     | 1 GB                 | 2 GB               |
| **磁盘**     | 10 GB SSD            | 25 GB SSD          |
| **操作系统** | Ubuntu 22.04 LTS     | Ubuntu 24.04 LTS   |
| **域名**     | 在 Cloudflare 上注册 | —                  |
| **Docker**   | Docker Engine 24+    | Docker 27+         |

**已测试的服务商**：Akamai (Linode)、DigitalOcean、Vultr、Hetzner、AWS Lightsail。

---

## 1. 配置虚拟机

### 1.1 创建实例

在您首选的 VPS 服务商上：

- 选择 Ubuntu 24.04 LTS
- 选择最低配置（1 vCPU / 1 GB RAM）
- 设置强 root 密码或配置 SSH 密钥
- 记下**公网 IP**（例如 `203.0.113.10`）

### 1.2 通过 SSH 连接

```bash
ssh root@203.0.113.10
```

### 1.3 更新系统

```bash
apt update && apt upgrade -y
```

### 1.4 安装 Docker

```bash
# 安装依赖
apt install -y ca-certificates curl gnupg

# 添加官方 Docker 仓库
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo “$VERSION_CODENAME”) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 安装 nginx

```bash
apt install -y nginx
```

### 1.6 配置防火墙 (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP（重定向）
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **提示**：为获得最高安全性，请将端口 80 和 443 仅限制为 Cloudflare IP。参见[高级安全](#6-高级安全性)部分。

---

## 2. 安装 OmniRoute

### 2.1 创建配置目录

```bash
mkdir -p /opt/omniroute
```

### 2.2 创建环境变量文件

```bash
cat > /opt/omniroute/.env << ‘EOF’
# === 安全配置 ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT

# === 应用配置 ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
STORAGE_DRIVER=sqlite
ENABLE_REQUEST_LOGS=true
AUTH_COOKIE_SECURE=false
REQUIRE_API_KEY=false

# === 域名（修改为您的域名） ===
BASE_URL=https://llms.seudominio.com
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com

# === 云同步（可选） ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **重要**：生成唯一的密钥！对每个密钥使用 `openssl rand -hex 32`。

### 2.3 启动容器

```bash
docker pull diegosouzapw/omniroute:latest

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### 2.4 验证运行状态

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

应显示：`[DB] SQLite database ready` 和 `listening on port 20128`。

---

## 3. 配置 nginx（反向代理）

### 3.1 生成 SSL 证书（Cloudflare Origin）

在 Cloudflare 仪表板中：

1. 前往 **SSL/TLS → Origin Server**
2. 点击 **Create Certificate**
3. 保持默认设置（15 年，\*.yourdomain.com）
4. 复制 **Origin Certificate** 和 **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# 粘贴证书
nano /etc/nginx/ssl/origin.crt

# 粘贴私钥
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Nginx 配置

```bash
cat > /etc/nginx/sites-available/omniroute << ‘NGINX’
# 默认服务器 — 阻止通过 IP 直接访问
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    ssl_certificate     /etc/nginx/ssl/origin.crt;
    ssl_certificate_key /etc/nginx/ssl/origin.key;
    server_name _;
    return 444;
}

# OmniRoute — HTTPS
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name llms.yourdomain.com;  # 修改为您的域名

    ssl_certificate     /etc/nginx/ssl/origin.crt;
    ssl_certificate_key /etc/nginx/ssl/origin.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:20128;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection “upgrade”;

        # SSE (Server-Sent Events) — AI 流式响应
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}

# HTTP → HTTPS 重定向
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

### 3.3 启用和测试

```bash
# 删除默认配置
rm -f /etc/nginx/sites-enabled/default

# 启用 OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# 测试并重载
nginx -t && systemctl reload nginx
```

---

## 4. 配置 Cloudflare DNS

### 4.1 添加 DNS 记录

在 Cloudflare 仪表板 → DNS 中：

| 类型 | 名称   | 内容                   | 代理      |
| ---- | ------ | ---------------------- | --------- |
| A    | `llms` | `203.0.113.10`（VM IP）| ✅ Proxied |

### 4.2 配置 SSL

在 **SSL/TLS → Overview** 下：

- 模式：**Full (Strict)**

在 **SSL/TLS → Edge Certificates** 下：

- Always Use HTTPS：✅ 开启
- Minimum TLS Version：TLS 1.2
- Automatic HTTPS Rewrites：✅ 开启

### 4.3 测试

```bash
curl -sI https://llms.seudominio.com/health
# 应返回 HTTP/2 200
```

---

## 5. 运维与维护

### 升级到新版本

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### 查看日志

```bash
docker logs -f omniroute          # 实时流
docker logs omniroute --tail 50   # 最后 50 行
```

### 手动数据库备份

```bash
# 从卷复制数据到主机
docker cp omniroute:/app/data ./backup-$(date +%F)

# 或压缩整个卷
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### 从备份恢复

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c “rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /”
docker start omniroute
```

---

## 6. 高级安全性

### 将 nginx 限制为 Cloudflare IP

```bash
cat > /etc/nginx/cloudflare-ips.conf << ‘CF’
# Cloudflare IPv4 范围 — 定期更新
# https://www.cloudflare.com/ips-v4/
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;
real_ip_header CF-Connecting-IP;
CF
```

将以下内容添加到 `nginx.conf` 的 `http {}` 块中：

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### 安装 fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# 检查状态
fail2ban-client status sshd
```

### 阻止直接访问 Docker 端口

```bash
# 防止外部直接访问端口 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# 持久化规则
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. 部署到 Cloudflare Workers（可选）

通过 Cloudflare Workers 进行远程访问（无需直接暴露 VM）：

```bash
# 在本地仓库中
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

完整文档请参见 [omnirouteCloud/README.md](../omnirouteCloud/README.md)。

---

## 端口汇总

| 端口  | 服务        | 访问                       |
| ----- | ----------- | -------------------------- |
| 22    | SSH         | 公开（配合 fail2ban）      |
| 80    | nginx HTTP  | 重定向 → HTTPS             |
| 443   | nginx HTTPS | 通过 Cloudflare 代理       |
| 20128 | OmniRoute   | 仅本地（通过 nginx）       |
