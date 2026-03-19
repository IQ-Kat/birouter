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

> [!CAUTION]
> **NEVER** use `pm2 restart omniroute` after `npm install -g`. This drops env vars.
> Always use `pm2 delete omniroute && pm2 start <ecosystem.config.cjs> --update-env`.
> After `npm install -g`, always rebuild better-sqlite3: `cd .../app && npm rebuild better-sqlite3`

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
ssh root@69.164.221.35 "npm install -g /tmp/omniroute-*.tgz --ignore-scripts && cd /usr/lib/node_modules/omniroute/app && npm rebuild better-sqlite3 && pm2 delete omniroute 2>/dev/null; pm2 start /root/.omniroute/ecosystem.config.cjs --update-env && pm2 save && echo '✅ Akamai done'"
```

```bash
ssh root@192.168.0.15 "npm install -g /tmp/omniroute-*.tgz --ignore-scripts && cd /usr/lib/node_modules/omniroute/app && npm rebuild better-sqlite3 && pm2 delete omniroute 2>/dev/null; pm2 start /root/.omniroute/ecosystem.config.cjs --update-env && pm2 save && echo '✅ Local done'"
```

### 3. Verify the deployment

```bash
ssh root@69.164.221.35 "pm2 list && cat \$(npm root -g)/omniroute/app/package.json | grep version | head -1 && curl -s -o /dev/null -w 'HTTP %{http_code}' http://localhost:20128/"
```

```bash
ssh root@192.168.0.15 "pm2 list && cat \$(npm root -g)/omniroute/app/package.json | grep version | head -1 && curl -s -X POST http://localhost:20128/api/auth/login -H 'Content-Type: application/json' -d '{\"password\":\"123456\"}'"
```

Expected: PM2 shows `online`, version matches, login returns `{"success":true}`.

## How it works

1. `npm run build:cli` builds Next.js standalone → `app/` and strips Turbopack hashed require() calls from chunks
2. `npm pack --ignore-scripts` packages without re-running the build
3. `scp` transfers the .tgz to each VPS (~286MB)
4. `npm install -g /tmp/omniroute-*.tgz --ignore-scripts` installs pre-built package
5. `npm rebuild better-sqlite3` recompiles native bindings for the VPS Node.js version
6. `pm2 delete` + `pm2 start ecosystem.config.cjs --update-env` restarts with env vars
7. `pm2 save` persists the process list for reboot survival

## Ecosystem Config

Both VPSs have `ecosystem.config.cjs` at `/root/.omniroute/ecosystem.config.cjs`.
This file defines env vars (PORT, DATA_DIR, INITIAL_PASSWORD, OAuth secrets, etc.)
that `pm2 restart` does NOT inject — only `pm2 start --update-env` does.

## PM2 Setup (one-time — if reconfiguring from scratch)

```bash
ssh root@<VPS> "
  pm2 delete omniroute 2>/dev/null;
  cd /usr/lib/node_modules/omniroute/app && npm rebuild better-sqlite3 &&
  pm2 start /root/.omniroute/ecosystem.config.cjs --update-env &&
  pm2 save && pm2 startup
"
```

> [!NOTE]
> Ensure `/root/.omniroute/ecosystem.config.cjs` exists with all required env vars.
> For fresh installs, copy from the existing VPS or create from the template in `.env`.

## Notes

- Env vars are in `/root/.omniroute/ecosystem.config.cjs` (NOT `.env` in app dir)
- PM2 is configured with `pm2 startup` to auto-restart on reboot
- Nginx proxies `omniroute.online` → `localhost:20128`
- The VPS has only 1GB RAM — builds happen locally, never on the VPS
- After `npm install -g`, `better-sqlite3` MUST be rebuilt in the `app/` subdir
