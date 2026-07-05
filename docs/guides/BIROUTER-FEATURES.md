---
title: "Birouter Custom Features & Watchdog"
version: 1.0.0
lastUpdated: 2026-07-04
---

# Birouter Custom Features & Watchdog Guide

This guide documents the custom integration features added to **Birouter**, specifically focusing on the automatic tunnel watchdog, auto-resume capability, MITM decryption features, and system tray integration.

---

## 🛡️ Tunnels Watchdog & Auto-Resume

Birouter includes a robust background watcher service (`tunnelWatchdog`) that runs continuously to ensure network tunnels and traffic capture layers remain active.

### Supported Services

The watchdog monitors three main components:

1. **Tailscale Tunnel**: Monitors the status of the local Tailscale client. If Tailscale is enabled in settings but drops off or goes offline, the watchdog automatically attempts to resume the tunnel connection.
2. **Cloudflare Tunnel (`cloudflared`)**: Resolves connection states from the persistency layer (`quick-tunnel-state.json`). If a Cloudflare tunnel was previously running but stopped due to a crash or service disruption, it auto-resumes the connector.
3. **MITM Decryption Proxy (Windows)**: Inspects the MITM status and verifies active `.mitm.pid` processes. On Windows, if the proxy crashed or was shut down uncleanly, the watchdog automatically recovers and restarts the decryption server.

### Watchdog Behavior

- **Interval**: Runs every **60 seconds**.
- **Execution**: Triggered automatically on server start (`src/server-init.ts`).
- **Logs**: Errors and resume steps are reported under the `tunnel-watchdog` service logger.

---

## 💻 Desktop System Tray

When running Birouter as a desktop application, it integrates directly with the system tray (running in the OS background):

- **Rebranded Interface**: Tooltips, menu labels, and notifications are customized as **Birouter** (instead of Birouter).
- **Double-Click Actions**: Double-clicking the tray icon opens the main Birouter app interface.
- **Port Swapping**: You can change the server port directly from the system tray menu. The desktop app handles server teardown, tree-kills any orphaned processes on Windows, and binds the Next.js server to the new port cleanly.
- **Autostart Support**: On Windows and Linux, the desktop app supports launching minimized in the background.

---

## 🔑 MITM Decryption Tunnels

The MITM (Man-in-the-Middle) HTTPS decryption proxy allows Birouter to inspect SSL/TLS traffic, route requests dynamically, and inject custom attributes.

- **Forced IDE Version Override**: The proxy forces `ideVersion=1.23.2` compatibility settings on outgoing requests to ensure downstream editor endpoints (like Windsurf/Cursor) match expected backend API interfaces without client-side modifications.
