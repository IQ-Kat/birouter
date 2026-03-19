# OmniRoute — คู่มือการปรับใช้บน VM พร้อม Cloudflare

🌐 **Languages:** 🇺🇸 [English](../../VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](../es/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](../fr/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](../it/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](../ru/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](../de/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](../in/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](../th/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](../ar/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](../ja/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](../bg/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](../da/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](../fi/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](../he/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](../hu/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](../ko/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](../nl/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](../no/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](../ro/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](../pl/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](../sv/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](../phi/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](../cs/VM_DEPLOYMENT_GUIDE.md)

คำแนะนำฉบับสมบูรณ์ในการติดตั้งและกำหนดค่า OmniRoute บน VM (VPS) ด้วยโดเมนที่จัดการผ่าน Cloudflare

---

## ข้อกำหนดเบื้องต้น

| รายการ             | ขั้นต่ำ                    | แนะนำ             |
| ------------------ | -------------------------- | ----------------- |
| **ซีพียู**         | 1 vCPU                     | 2 vCPU            |
| **แรม**            | 1 กิกะไบต์                 | 2 กิกะไบต์        |
| **ดิสก์**          | SSD 10GB                   | 25 GB SSD         |
| **ระบบปฏิบัติการ** | อูบุนตู 22.04 LTS          | อูบุนตู 24.04 LTS |
| **โดเมน**          | ลงทะเบียนบน Cloudflare     | —                 |
| **นักเทียบท่า**    | นักเทียบท่าเครื่องยนต์ 24+ | นักเทียบท่า 27+   |

**ผู้ให้บริการที่ผ่านการทดสอบ**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail

---

## 1. กำหนดค่า VM

### 1.1 สร้างอินสแตนซ์

บนผู้ให้บริการ VPS ที่คุณต้องการ:

- เลือก Ubuntu 24.04 LTS
- เลือกแผนขั้นต่ำ (1 vCPU / 1 GB RAM)
- ตั้งรหัสผ่านรูทที่รัดกุมหรือกำหนดค่าคีย์ SSH
- หมายเหตุ **IP สาธารณะ** (เช่น `203.0.113.10`)

### 1.2 เชื่อมต่อผ่าน SSH

```bash
ssh root@203.0.113.10
```

### 1.3 อัพเดตระบบ

```bash
apt update && apt upgrade -y
```

### 1.4 ติดตั้งนักเทียบท่า

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

### 1.5 ติดตั้ง nginx

```bash
apt install -y nginx
```

### 1.6 กำหนดค่าไฟร์วอลล์ (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirect)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **เคล็ดลับ**: เพื่อความปลอดภัยสูงสุด จำกัดพอร์ต 80 และ 443 ไว้เฉพาะ IP ของ Cloudflare เท่านั้น ดูส่วน [Advanced Security](#advanced-security)

---

## 2. ติดตั้ง OmniRoute

### 2.1 สร้างไดเร็กทอรีการกำหนดค่า

```bash
mkdir -p /opt/omniroute
```

### 2.2 สร้างไฟล์ตัวแปรสภาพแวดล้อม

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

> ⚠️ **สำคัญ**: สร้างคีย์ลับที่ไม่ซ้ำใคร! ใช้ `openssl rand -hex 32` สำหรับแต่ละคีย์

### 2.3 เริ่มคอนเทนเนอร์

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

### 2.4 ตรวจสอบว่ามันกำลังทำงานอยู่

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

ควรแสดง: `[DB] SQLite database ready` และ `listening on port 20128`

---

## 3. กำหนดค่า nginx (Reverse Proxy)

### 3.1 สร้างใบรับรอง SSL (Cloudflare Origin)

ในแดชบอร์ด Cloudflare:

1. ไปที่ **SSL/TLS → เซิร์ฟเวอร์ต้นทาง**
2. คลิก **สร้างใบรับรอง**
3. คงค่าเริ่มต้นไว้ (15 ปี \*.yourdomain.com)
4. คัดลอก **Origin Certificate** และ **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# Paste the certificate
nano /etc/nginx/ssl/origin.crt

# Paste the private key
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 การกำหนดค่า Nginx

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

### 3.3 เปิดใช้งานและทดสอบ

```bash
# Remove default configuration
rm -f /etc/nginx/sites-enabled/default

# Enable OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Test and reload
nginx -t && systemctl reload nginx
```

---

## 4. กำหนดค่า Cloudflare DNS

### 4.1 เพิ่มบันทึก DNS

ในแดชบอร์ด Cloudflare → DNS:

| พิมพ์ | ชื่อ   | เนื้อหา                | หนังสือมอบฉันทะ |
| ----- | ------ | ---------------------- | --------------- |
| ก     | `llms` | `203.0.113.10` (VM IP) | ✅ พร็อกซี      |

### 4.2 กำหนดค่า SSL

ภายใต้ **SSL/TLS → ภาพรวม**:

- โหมด: **เต็ม (เข้มงวด)**

ภายใต้ **SSL/TLS → Edge Certificates**:

- ใช้ HTTPS เสมอ: ✅ เปิด
- เวอร์ชัน TLS ขั้นต่ำ: TLS 1.2
- การเขียน HTTPS อัตโนมัติ: ✅เปิด

### 4.3 การทดสอบ

```bash
curl -sI https://llms.seudominio.com/health
# Should return HTTP/2 200
```

---

## 5. การดำเนินงานและการบำรุงรักษา

### อัปเกรดเป็นเวอร์ชันใหม่

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### ดูบันทึก

```bash
docker logs -f omniroute          # Real-time stream
docker logs omniroute --tail 50   # Last 50 lines
```

### สำรองฐานข้อมูลด้วยตนเอง

```bash
# Copy data from the volume to the host
docker cp omniroute:/app/data ./backup-$(date +%F)

# Or compress the entire volume
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### กู้คืนจากข้อมูลสำรอง

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c “rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /”
docker start omniroute
```

---

## 6. การรักษาความปลอดภัยขั้นสูง

### จำกัด nginx ไว้ที่ IP ของ Cloudflare

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

เพิ่มสิ่งต่อไปนี้ใน `nginx.conf` ภายในบล็อก `http {}`:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### ติดตั้ง Fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status sshd
```

### บล็อกการเข้าถึงพอร์ต Docker โดยตรง

```bash
# Prevent direct external access to port 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Persist the rules
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. ปรับใช้กับ Cloudflare Workers (ไม่บังคับ)

สำหรับการเข้าถึงระยะไกลผ่าน Cloudflare Workers (โดยไม่ต้องเปิดเผย VM โดยตรง):

```bash
# In the local repository
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

ดูเอกสารฉบับเต็มได้ที่ [omnirouteCloud/README.md](../omnirouteCloud/README.md)

---

## สรุปพอร์ต

| พอร์ต | บริการ      | เข้าถึง                         |
| ----- | ----------- | ------------------------------- |
| 22    | เอสเอสเอช   | สาธารณะ (พร้อม Fail2ban)        |
| 80    | nginx HTTP  | เปลี่ยนเส้นทาง → HTTPS          |
| 443   | nginx HTTPS | ผ่าน Cloudflare Proxy           |
| 20128 | OmniRoute   | Localhost เท่านั้น (ผ่าน nginx) |
