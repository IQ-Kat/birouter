# OmniRoute — Cloudflare를 사용한 VM 배포 가이드

🌐 **Languages:** 🇺🇸 [English](../../VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](../es/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](../fr/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](../it/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](../ru/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](../de/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](../in/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](../th/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](../ar/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](../ja/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](../bg/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](../da/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](../fi/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](../he/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](../hu/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](../ko/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](../nl/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](../no/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](../ro/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](../pl/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](../sv/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](../phi/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](../cs/VM_DEPLOYMENT_GUIDE.md)

Cloudflare를 통해 관리되는 도메인이 있는 VM(VPS)에 OmniRoute를 설치하고 구성하기 위한 전체 가이드입니다.

---

## 전제조건

| 아이템     | 최소                | 추천             |
| ---------- | ------------------- | ---------------- |
| **CPU**    | vCPU 1개            | vCPU 2개         |
| **램**     | 1GB                 | 2GB              |
| **디스크** | 10GB SSD            | 25GB SSD         |
| **OS**     | 우분투 22.04 LTS    | 우분투 24.04 LTS |
| **도메인** | Cloudflare에 등록됨 | —                |
| **도커**   | 도커 엔진 24+       | 도커 27+         |

**테스트된 공급자**: Akamai(Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. VM 구성

### 1.1 인스턴스 생성

선호하는 VPS 제공업체에서:

- 우분투 24.04 LTS를 선택하세요
- 최소 요금제 선택(vCPU 1개 / RAM 1GB)
- 강력한 루트 비밀번호를 설정하거나 SSH 키를 구성하세요.
- **공용 IP**(예: `203.0.113.10`)를 기록해 두세요.

### 1.2 SSH를 통해 연결

```bash
ssh root@203.0.113.10
```

### 1.3 시스템 업데이트

```bash
apt update && apt upgrade -y
```

### 1.4 도커 설치

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

### 1.5 nginx 설치

```bash
apt install -y nginx
```

### 1.6 방화벽 구성(UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirect)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **팁**: 보안을 극대화하려면 포트 80과 443을 Cloudflare IP로만 제한하세요. [Advanced Security](#advanced-security) 섹션을 참조하세요.

---

## 2. OmniRoute 설치

### 2.1 구성 디렉터리 생성

```bash
mkdir -p /opt/omniroute
```

### 2.2 환경변수 파일 생성

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

> ⚠️ **중요**: 고유한 비밀 키를 생성하세요! 각 키에 `openssl rand -hex 32`을 사용하세요.

### 2.3 컨테이너 시작

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

### 2.4 실행 중인지 확인

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

`[DB] SQLite database ready` 및 `listening on port 20128`이 표시되어야 합니다.

---

## 3. nginx(역방향 프록시) 구성

### 3.1 SSL 인증서 생성(Cloudflare 원본)

Cloudflare 대시보드에서:

1. **SSL/TLS → 원본 서버**로 이동합니다.
2. **인증서 만들기**를 클릭하세요.
3. 기본값(15년, \*.yourdomain.com)을 유지합니다.
4. **원본 인증서** 및 **개인 키**를 복사합니다.

```bash
mkdir -p /etc/nginx/ssl

# Paste the certificate
nano /etc/nginx/ssl/origin.crt

# Paste the private key
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Nginx 구성

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

### 3.3 활성화 및 테스트

```bash
# Remove default configuration
rm -f /etc/nginx/sites-enabled/default

# Enable OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Test and reload
nginx -t && systemctl reload nginx
```

---

## 4. Cloudflare DNS 구성

### 4.1 DNS 레코드 추가

Cloudflare 대시보드 → DNS:

| 유형 | 이름   | 내용                  | 프록시      |
| ---- | ------ | --------------------- | ----------- |
| A    | `llms` | `203.0.113.10`(VM IP) | ✅ 프록시됨 |

### 4.2 SSL 구성

**SSL/TLS → 개요**에서:

- 모드: **전체(엄격)**

**SSL/TLS → 에지 인증서**에서:

- 항상 HTTPS 사용: ✅ 켜기
- 최소 TLS 버전: TLS 1.2
- 자동 HTTPS 재작성: ✅ 켜짐

### 4.3 테스트

```bash
curl -sI https://llms.seudominio.com/health
# Should return HTTP/2 200
```

---

## 5. 운영 및 유지 관리

### 새 버전으로 업그레이드

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### 로그 보기

```bash
docker logs -f omniroute          # Real-time stream
docker logs omniroute --tail 50   # Last 50 lines
```

### 수동 데이터베이스 백업

```bash
# Copy data from the volume to the host
docker cp omniroute:/app/data ./backup-$(date +%F)

# Or compress the entire volume
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### 백업에서 복원

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c “rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /”
docker start omniroute
```

---

## 6. 고급 보안

### nginx를 Cloudflare IP로 제한

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

`http {}` 블록 내부의 `nginx.conf`에 다음을 추가합니다.

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Fail2ban 설치

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status sshd
```

### Docker 포트에 대한 직접 액세스 차단

```bash
# Prevent direct external access to port 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Persist the rules
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Cloudflare Workers에 배포(선택 사항)

Cloudflare Workers를 통한 원격 액세스의 경우(VM을 직접 노출하지 않고):

```bash
# In the local repository
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

[omnirouteCloud/README.md](../omnirouteCloud/README.md)에서 전체 문서를 참조하세요.

---

## 포트 요약

| 포트  | 서비스      | 액세스                        |
| ----- | ----------- | ----------------------------- |
| 22    | SSH         | 공개(fail2ban 포함)           |
| 80    | nginx HTTP  | 리디렉션 → HTTPS              |
| 443   | nginx HTTPS | Cloudflare 프록시를 통해      |
| 20128 | 옴니루트    | 로컬호스트 전용(nginx를 통해) |
