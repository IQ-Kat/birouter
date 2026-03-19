# OmniRoute — Cloudflare を使用した VM の導入ガイド

🌐 **Languages:** 🇺🇸 [English](../../VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](../es/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](../fr/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](../it/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](../ru/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](../de/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](../in/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](../th/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](../ar/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](../ja/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](../bg/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](../da/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](../fi/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](../he/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](../hu/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](../ko/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](../nl/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](../no/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](../ro/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](../pl/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](../sv/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](../phi/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](../cs/VM_DEPLOYMENT_GUIDE.md)

Cloudflare経由でドメインが管理されているVM（VPS）にOmniRouteをインストールして構成するための完全なガイド。

---

## 前提条件

| アイテム     | 最小                 | おすすめ         |
| ------------ | -------------------- | ---------------- |
| **CPU**      | 1 vCPU               | 2 vCPU           |
| **RAM**      | 1GB                  | 2GB              |
| **ディスク** | 10GB SSD             | 25 GB SSD        |
| **OS**       | Ubuntu 22.04 LTS     | Ubuntu 24.04 LTS |
| **ドメイン** | Cloudflareに登録済み | —                |
| **ドッカー** | Docker エンジン 24+  | ドッカー 27+     |

**テスト済みプロバイダ**: Akamai (Linode)、DigitalOcean、Vultr、Hetzner、AWS Lightsail。

---

## 1. VM を構成する

### 1.1 インスタンスを作成する

好みの VPS プロバイダーで:

- Ubuntu 24.04 LTS を選択します
- 最小プラン (1 vCPU / 1 GB RAM) を選択します。
- 強力な root パスワードを設定するか、SSH キーを構成します
- **パブリック IP** に注意してください (例: `203.0.113.10`)

### 1.2 SSH 経由で接続する

```bash
ssh root@203.0.113.10
```

### 1.3 システムをアップデートする

```bash
apt update && apt upgrade -y
```

### 1.4 Docker のインストール

```bash
# Install dependencies
apt install -y ca-certificates curl gnupg

# Add official Docker repository
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo “$VERSION_CODENAME”) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 nginx をインストールする

```bash
apt install -y nginx
```

### 1.6 ファイアウォールの構成 (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirect)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **ヒント**: セキュリティを最大限に高めるには、ポート 80 と 443 を Cloudflare IP のみに制限します。 [Advanced Security](#advanced-security) セクションを参照してください。

---

## 2. OmniRoute をインストールする

### 2.1 構成ディレクトリの作成

```bash
mkdir -p /opt/omniroute
```

### 2.2 環境変数ファイルの作成

```bash
cat > /opt/omniroute/.env << ‘EOF’
# === Security ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT

# === App ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
STORAGE_DRIVER=sqlite
ENABLE_REQUEST_LOGS=true
AUTH_COOKIE_SECURE=false
REQUIRE_API_KEY=false

# === Domain (change to your domain) ===
BASE_URL=https://llms.seudominio.com
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Cloud Sync (optional) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **重要**: 一意の秘密キーを生成してください。各キーに `openssl rand -hex 32` を使用します。

### 2.3 コンテナの起動

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

### 2.4 実行中であることを確認する

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

`[DB] SQLite database ready` および `listening on port 20128` と表示されます。

---

## 3. nginx (リバースプロキシ) の設定

### 3.1 SSL証明書の生成(Cloudflare Origin)

Cloudflareダッシュボードで:

1. **SSL/TLS → オリジンサーバー** に移動します。
2. [**証明書の作成**] をクリックします。
3. デフォルトのまま (15 年、\*.yourdomain.com)
4. **送信元証明書**と**秘密キー**をコピーします。

```bash
mkdir -p /etc/nginx/ssl

# Paste the certificate
nano /etc/nginx/ssl/origin.crt

# Paste the private key
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Nginx の構成

```bash
cat > /etc/nginx/sites-available/omniroute << ‘NGINX’
# Default server — blocks direct access via IP
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
    server_name llms.yourdomain.com;  # Change to your domain

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

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection “upgrade”;

        # SSE (Server-Sent Events) — streaming AI responses
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}

# HTTP → HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

### 3.3 有効化とテスト

```bash
# Remove default configuration
rm -f /etc/nginx/sites-enabled/default

# Enable OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Test and reload
nginx -t && systemctl reload nginx
```

---

## 4. Cloudflare DNS を構成する

### 4.1 DNS レコードの追加

Cloudflareダッシュボード → DNS:

| タイプ | 名前   | コンテンツ             | プロキシ    |
| ------ | ------ | ---------------------- | ----------- |
| あ     | `llms` | `203.0.113.10` (VM IP) | ✅ プロキシ |

### 4.2 SSL の構成

**SSL/TLS → 概要** の下:

- モード: **フル (厳密)**

**SSL/TLS → エッジ証明書** の下:

- 常に HTTPS を使用する: ✅ オン
- 最小 TLS バージョン: TLS 1.2
- 自動 HTTPS 書き換え: ✅ オン

### 4.3 テスト

```bash
curl -sI https://llms.seudominio.com/health
# Should return HTTP/2 200
```

---

## 5. 運用と保守

### 新しいバージョンにアップグレードする

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### ログを表示する

```bash
docker logs -f omniroute          # Real-time stream
docker logs omniroute --tail 50   # Last 50 lines
```

### データベースの手動バックアップ

```bash
# Copy data from the volume to the host
docker cp omniroute:/app/data ./backup-$(date +%F)

# Or compress the entire volume
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### バックアップから復元する

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c “rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /”
docker start omniroute
```

---

## 6. 高度なセキュリティ

### nginx を Cloudflare IP に制限する

```bash
cat > /etc/nginx/cloudflare-ips.conf << ‘CF’
# Cloudflare IPv4 ranges — update periodically
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

`http {}` ブロック内の `nginx.conf` に以下を追加します。

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

###fail2ban をインストールする

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status sshd
```

### Docker ポートへの直接アクセスをブロックする

```bash
# Prevent direct external access to port 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Persist the rules
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Cloudflare ワーカーへのデプロイ (オプション)

Cloudflare Workersを介したリモートアクセスの場合(VMを直接公開しない):

```bash
# In the local repository
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

[omnirouteCloud/README.md](../omnirouteCloud/README.md) で完全なドキュメントを参照してください。

---

## ポートの概要

| ポート | サービス     | アクセス                        |
| ------ | ------------ | ------------------------------- |
| 22     | SSH          | パブリック (fail2ban あり)      |
| 80     | nginx HTTP   | リダイレクト → HTTPS            |
| 443    | nginx HTTPS  | Cloudflare プロキシ経由         |
| 20128  | オムニルート | ローカルホストのみ (nginx 経由) |
