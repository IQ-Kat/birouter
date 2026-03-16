---
description: Deploy the latest OmniRoute code to the Akamai VPS (69.164.221.35) via npm
---

# Deploy to VPS Workflow

Deploy OmniRoute to the production VPS using `npm pack + scp` + PM2.

**VPS:** `69.164.221.35` (Akamai, Ubuntu 24.04, 1GB RAM + 2.5GB swap)
**Local VPS:** `192.168.0.15` (same setup)
**Process manager:** PM2 (`omniroute`)
**Port:** `20128`
**PM2 entry:** `/usr/lib/node_modules/omniroute/app/server.js`

> [!IMPORTANT]
> PM2 runs from the global npm package at `/usr/lib/node_modules/omniroute`.
> The Next.js standalone build is at `app/server.js` inside that directory.
> The npm registry rejects packages > 100MB, so deployment uses **npm pack + scp**.

## Steps

### 1. Build + pack locally

Run the full build (includes hash-strip patch) and create the .tgz:

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router && npm run build:cli && npm pack --ignore-scripts
```

### 2. Copy to both VPS and install

// turbo-all

```bash
scp omniroute-*.tgz root@69.164.221.35:/tmp/ && scp omniroute-*.tgz root@192.168.0.15:/tmp/
```

```bash
ssh root@69.164.221.35 "npm install -g /tmp/omniroute-*.tgz --ignore-scripts && pm2 restart omniroute && pm2 save && echo '✅ Akamai done'"
```

```bash
ssh root@192.168.0.15 "npm install -g /tmp/omniroute-*.tgz --ignore-scripts && pm2 restart omniroute && pm2 save && echo '✅ Local done'"
```

### 3. Verify the deployment

```bash
ssh root@69.164.221.35 "pm2 list && cat \$(npm root -g)/omniroute/app/package.json | grep version | head -1 && curl -s -o /dev/null -w 'HTTP %{http_code}' http://localhost:20128/"
```

Expected: PM2 shows `online`, version matches, HTTP returns `307`.

## How it works

1. `npm run build:cli` builds Next.js standalone → `app/` and strips Turbopack hashed require() calls from chunks
2. `npm pack --ignore-scripts` packages without re-running the build
3. `scp` transfers the .tgz to each VPS (~286MB)
4. `npm install -g /tmp/omniroute-*.tgz --ignore-scripts` installs pre-built package
5. PM2 runs `app/server.js` from `/usr/lib/node_modules/omniroute`

## PM2 Setup (one-time — if reconfiguring from scratch)

```bash
ssh root@<VPS> "
  pm2 delete omniroute ;
  cp /opt/omniroute-app/.env /usr/lib/node_modules/omniroute/.env &&
  PORT=20128 pm2 start /usr/lib/node_modules/omniroute/app/server.js --name omniroute --cwd /usr/lib/node_modules/omniroute/app &&
  pm2 save && pm2 startup
"
```

> [!NOTE]
> Copy `.env` from the old installation first. For Akamai it was at `/opt/omniroute-app/.env`,
> for the local VPS it was at `/root/omniroute-fresh/.env`.

## Notes

- `.env` should be placed at `/usr/lib/node_modules/omniroute/app/.env`
- PM2 is configured with `pm2 startup` to auto-restart on reboot
- Nginx proxies `omniroute.online` → `localhost:20128`
- The VPS has only 1GB RAM — builds happen locally, never on the VPS
