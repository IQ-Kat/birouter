# OmniRoute — Guide de déploiement sur VM avec Cloudflare

🌐 **Languages:** 🇺🇸 [English](../../VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](../es/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](../fr/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](../it/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](../ru/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](../de/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](../in/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](../th/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](../ar/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](../ja/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](../bg/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](../da/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](../fi/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](../he/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](../hu/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](../ko/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](../nl/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](../no/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](../ro/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](../pl/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](../sv/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](../phi/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](../cs/VM_DEPLOYMENT_GUIDE.md)

Guide complet pour installer et configurer OmniRoute sur une VM (VPS) avec domaine géré via Cloudflare.

---

## Prérequis

| Article        | Minimum                | Recommandé             |
| -------------- | ---------------------- | ---------------------- |
| **processeur** | 1 processeur virtuel   | 2 processeurs virtuels |
| **RAM**        | 1 Go                   | 2 Go                   |
| **Disque**     | Disque SSD de 10 Go    | Disque SSD de 25 Go    |
| **OS**         | Ubuntu 22.04 LTS       | Ubuntu 24.04 LTS       |
| **Domaine**    | Inscrit sur Cloudflare | —                      |
| **Docker**     | Moteur Docker 24+      | Docker 27+             |

**Fournisseurs testés** : Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Configurer la VM

### 1.1 Créer l'instance

Sur votre fournisseur VPS préféré :

- Choisissez Ubuntu 24.04 LTS
- Sélectionnez le forfait minimum (1 vCPU / 1 Go de RAM)
- Définissez un mot de passe root fort ou configurez la clé SSH
- Notez l'**IP publique** (par exemple, `203.0.113.10`)

### 1.2 Connectez-vous via SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Mettre à jour le système

```bash
apt update && apt upgrade -y
```

### 1.4 Installer Docker

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

### 1.5 Installer nginx

```bash
apt install -y nginx
```

### 1.6 Configurer le pare-feu (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirect)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Conseil** : Pour une sécurité maximale, limitez les ports 80 et 443 aux IP Cloudflare uniquement. Voir la section [Advanced Security](#advanced-security).

---

## 2. Installez OmniRoute

### 2.1 Créer un répertoire de configuration

```bash
mkdir -p /opt/omniroute
```

### 2.2 Créer un fichier de variables d'environnement

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

> ⚠️ **IMPORTANT** : Générez des clés secrètes uniques ! Utilisez `openssl rand -hex 32` pour chaque clé.

### 2.3 Démarrer le conteneur

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

### 2.4 Vérifiez qu'il est en cours d'exécution

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Il doit afficher : `[DB] SQLite database ready` et `listening on port 20128`.

---

## 3. Configurer nginx (proxy inverse)

### 3.1 Générer un certificat SSL (Cloudflare Origin)

Dans le tableau de bord Cloudflare :

1. Accédez à **SSL/TLS → Serveur d'origine**
2. Cliquez sur **Créer un certificat**
3. Conservez les valeurs par défaut (15 ans, \*.votredomaine.com)
4. Copiez le **Certificat d'origine** et la **Clé privée**

```bash
mkdir -p /etc/nginx/ssl

# Paste the certificate
nano /etc/nginx/ssl/origin.crt

# Paste the private key
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Configuration de Nginx

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

### 3.3 Activer et tester

```bash
# Remove default configuration
rm -f /etc/nginx/sites-enabled/default

# Enable OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Test and reload
nginx -t && systemctl reload nginx
```

---

## 4. Configurer le DNS Cloudflare

### 4.1 Ajouter un enregistrement DNS

Dans le tableau de bord Cloudflare → DNS :

| Tapez | Nom    | Contenu                                     | Proxy         |
| ----- | ------ | ------------------------------------------- | ------------- |
| Un    | `llms` | `203.0.113.10` (IP de la machine virtuelle) | ✅ Mandataire |

### 4.2 Configurer SSL

Sous **SSL/TLS → Présentation** :

- Mode : **Complet (strict)**

Sous **SSL/TLS → Certificats Edge** :

- Utilisez toujours HTTPS : ✅ Activé
  -Version TLS minimale : TLS 1.2
- Réécritures HTTPS automatiques : ✅ Activée

### 4.3 Tests

```bash
curl -sI https://llms.seudominio.com/health
# Should return HTTP/2 200
```

---

## 5. Exploitation et maintenance

### Mettre à niveau vers une nouvelle version

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Afficher les journaux

```bash
docker logs -f omniroute          # Real-time stream
docker logs omniroute --tail 50   # Last 50 lines
```

### Sauvegarde manuelle de la base de données

```bash
# Copy data from the volume to the host
docker cp omniroute:/app/data ./backup-$(date +%F)

# Or compress the entire volume
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Restaurer à partir d'une sauvegarde

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c “rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /”
docker start omniroute
```

---

## 6. Sécurité avancée

### Restreindre nginx aux IP Cloudflare

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

Ajoutez ce qui suit à `nginx.conf` à l'intérieur du bloc `http {}` :

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Installer fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status sshd
```

### Bloquer l'accès direct au port Docker

```bash
# Prevent direct external access to port 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Persist the rules
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Déployer sur Cloudflare Workers (facultatif)

Pour un accès à distance via Cloudflare Workers (sans exposer directement la VM) :

```bash
# In the local repository
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Consultez la documentation complète sur [omnirouteCloud/README.md](../omnirouteCloud/README.md).

---

## Résumé des ports

| Port  | Services    | Accès                            |
| ----- | ----------- | -------------------------------- |
| 22    | SSH         | Public (avec fail2ban)           |
| 80    | nginx HTTP  | Redirection → HTTPS              |
| 443   | nginx HTTPS | Via le proxy Cloudflare          |
| 20128 | OmniRoute   | Localhost uniquement (via nginx) |
