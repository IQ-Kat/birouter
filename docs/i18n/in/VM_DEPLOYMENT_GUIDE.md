# ओमनीरूट - क्लाउडफ्लेयर के साथ वीएम पर परिनियोजन गाइड

🌐 **Languages:** 🇺🇸 [English](../../VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](../es/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](../fr/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](../it/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](../ru/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](../de/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](../in/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](../th/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](../ar/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](../ja/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](../bg/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](../da/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](../fi/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](../he/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](../hu/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](../ko/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](../nl/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](../no/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](../ro/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](../pl/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](../sv/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](../phi/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](../cs/VM_DEPLOYMENT_GUIDE.md)

क्लाउडफ्लेयर के माध्यम से प्रबंधित डोमेन के साथ वीएम (वीपीएस) पर ओमनीरूट को स्थापित और कॉन्फ़िगर करने के लिए पूरी गाइड।

---

## पूर्वावश्यकताएँ

| आइटम       | न्यूनतम               | अनुशंसित           |
| ---------- | --------------------- | ------------------ |
| **सीपीयू** | 1 वीसीपीयू            | 2 वीसीपीयू         |
| **राम**    | 1 जीबी                | 2 जीबी             |
| **डिस्क**  | 10 जीबी एसएसडी        | 25 जीबी एसएसडी     |
| **ओएस**    | उबंटू 22.04 एलटीएस    | उबंटू 24.04 एलटीएस |
| **डोमेन**  | Cloudflare पर पंजीकृत | —                  |
| **डॉकर**   | डॉकर इंजन 24+         | डॉकर 27+           |

**परीक्षित प्रदाता**: अकामाई (लिनोड), डिजिटलओशन, वल्चर, हेट्ज़नर, एडब्ल्यूएस लाइटसेल।

---

## 1. वीएम को कॉन्फ़िगर करें

### 1.1 उदाहरण बनाएँ

आपके पसंदीदा VPS प्रदाता पर:

- उबंटू 24.04 एलटीएस चुनें
- न्यूनतम योजना चुनें (1 वीसीपीयू / 1 जीबी रैम)
- एक मजबूत रूट पासवर्ड सेट करें या SSH कुंजी कॉन्फ़िगर करें
- **सार्वजनिक आईपी** पर ध्यान दें (जैसे, `203.0.113.10`)

### 1.2 एसएसएच के माध्यम से कनेक्ट करें

```bash
ssh root@203.0.113.10
```

### 1.3 सिस्टम को अपडेट करें

**OMNI_टोकन_1**

### 1.4 डॉकर स्थापित करें

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

### 1.5 nginx स्थापित करें

```bash
apt install -y nginx
```

### 1.6 फ़ायरवॉल कॉन्फ़िगर करें (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirect)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **टिप**: अधिकतम सुरक्षा के लिए, पोर्ट 80 और 443 को केवल क्लाउडफ़ेयर आईपी तक सीमित रखें। [Advanced Security](#advanced-security) अनुभाग देखें।

---

## 2. ओमनीरूट स्थापित करें

### 2.1 कॉन्फ़िगरेशन निर्देशिका बनाएं

**OMNI_टोकन_5**

### 2.2 पर्यावरण चर फ़ाइल बनाएँ

**OMNI_टोकन_6**

> ⚠️ **महत्वपूर्ण**: अद्वितीय गुप्त कुंजियाँ उत्पन्न करें! प्रत्येक कुंजी के लिए `openssl rand -hex 32` का उपयोग करें।

### 2.3 कंटेनर प्रारंभ करें

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

### 2.4 सत्यापित करें कि यह चल रहा है

**OMNI_टोकन_8**

इसे प्रदर्शित करना चाहिए: `[DB] SQLite database ready` और `listening on port 20128`।

---

## 3. nginx कॉन्फ़िगर करें (रिवर्स प्रॉक्सी)

### 3.1 एसएसएल प्रमाणपत्र उत्पन्न करें (क्लाउडफ्लेयर ओरिजिन)

क्लाउडफ्लेयर डैशबोर्ड में:

1. **एसएसएल/टीएलएस → ओरिजिन सर्वर** पर जाएं
2. **प्रमाणपत्र बनाएं** पर क्लिक करें
3. डिफ़ॉल्ट रखें (15 वर्ष, \*.yourdomain.com)
4. **मूल प्रमाणपत्र** और **निजी कुंजी** की प्रतिलिपि बनाएँ

```bash
mkdir -p /etc/nginx/ssl

# Paste the certificate
nano /etc/nginx/ssl/origin.crt

# Paste the private key
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 नगनेक्स कॉन्फ़िगरेशन

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

### 3.3 सक्षम करें और परीक्षण करें

**OMNI_टोकन_11**

---

## 4. क्लाउडफ्लेयर डीएनएस कॉन्फ़िगर करें

### 4.1 डीएनएस रिकॉर्ड जोड़ें

क्लाउडफ़ेयर डैशबोर्ड में → DNS:

| प्रकार | नाम    | सामग्री                | प्रॉक्सी    |
| ------ | ------ | ---------------------- | ----------- |
| ए      | `llms` | `203.0.113.10` (VM IP) | ✅ प्रॉक्सी |

### 4.2 एसएसएल कॉन्फ़िगर करें

**एसएसएल/टीएलएस → अवलोकन** के अंतर्गत:

- मोड: **पूर्ण (सख्त)**

**एसएसएल/टीएलएस → एज सर्टिफिकेट** के अंतर्गत:

- हमेशा HTTPS का उपयोग करें: ✅ चालू
- न्यूनतम टीएलएस संस्करण: टीएलएस 1.2
- स्वचालित HTTPS पुनर्लेखन: ✅ चालू

### 4.3 परीक्षण

**OMNI_टोकन_12**

---

## 5. संचालन एवं रखरखाव

### नए संस्करण में अपग्रेड करें

**OMNI_टोकन_13**

### लॉग देखें

**OMNI_टोकन_14**

### मैनुअल डेटाबेस बैकअप

**OMNI_टोकन_15**

### बैकअप से पुनर्स्थापित करें

**OMNI_टोकन_16**

---

## 6. उन्नत सुरक्षा

### nginx को Cloudflare IP तक सीमित करें

**OMNI_टोकन_17**

निम्नलिखित को `http {}` ब्लॉक के अंदर `nginx.conf` में जोड़ें:

**OMNI_टोकन_18**

### फेल2बैन स्थापित करें

**OMNI_टोकन_19**

### डॉकर पोर्ट तक सीधी पहुंच को अवरुद्ध करें

```bash
# Prevent direct external access to port 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Persist the rules
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. क्लाउडफ्लेयर श्रमिकों की तैनाती (वैकल्पिक)

क्लाउडफ्लेयर वर्कर्स के माध्यम से रिमोट एक्सेस के लिए (वीएम को सीधे उजागर किए बिना):

**OMNI_टोकन_21**

पूरा दस्तावेज़ [omnirouteCloud/README.md](../omnirouteCloud/README.md) पर देखें।

---

## पोर्ट सारांश

| बंदरगाह | सेवा        | पहुंच                               |
| ------- | ----------- | ----------------------------------- |
| 22      | एसएसएच      | सार्वजनिक (fail2ban के साथ)         |
| 80      | nginx HTTP  | रीडायरेक्ट → HTTPS                  |
| 443     | nginx HTTPS | क्लाउडफ्लेयर प्रॉक्सी के माध्यम से  |
| 20128   | ओमनीरूट     | केवल लोकलहोस्ट (nginx के माध्यम से) |
