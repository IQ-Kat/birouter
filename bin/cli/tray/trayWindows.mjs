import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const BIROUTER_IPC_PORT_BASE = 29128;
const __dirname = dirname(fileURLToPath(import.meta.url));

export function initWinTray({ port, onQuit, onOpenDashboard, onShowLogs }) {
  if (process.platform !== "win32") return null;

  const ipcPort = BIROUTER_IPC_PORT_BASE + (port % 1000);
  const scriptPath = join(tmpdir(), `birouter-tray-${process.pid}.ps1`);
  const iconPath = join(__dirname, "icon.ico");
  const hasIcon = existsSync(iconPath);

  const iconLoader = hasIcon
    ? `
try {
  $bitmap = New-Object System.Drawing.Bitmap("${iconPath.replace(/\\/g, "\\\\")}")
  $handle = $bitmap.GetHicon()
  $tray.Icon = [System.Drawing.Icon]::FromHandle($handle)
} catch {
  $tray.Icon = [System.Drawing.SystemIcons]::Application
}
`
    : `$tray.Icon = [System.Drawing.SystemIcons]::Application`;

  const ps1 = `
$ErrorActionPreference = "Stop"

Add-Type @"
using System;
using System.Runtime.InteropServices;

public static class WinDpiAwareness {
  public static IntPtr PerMonitorAwareV2 { get { return new IntPtr(-4); } }
  public static IntPtr PerMonitorAware { get { return new IntPtr(-3); } }

  [DllImport("user32.dll")]
  public static extern bool SetProcessDpiAwarenessContext(IntPtr value);

  [DllImport("user32.dll")]
  public static extern IntPtr SetThreadDpiAwarenessContext(IntPtr value);

  [DllImport("shcore.dll")]
  public static extern int SetProcessDpiAwareness(int value);

  [DllImport("user32.dll")]
  public static extern bool SetProcessDPIAware();
}
"@

function Enable-HighDpiAwareness {
  $contexts = @(
    [WinDpiAwareness]::PerMonitorAwareV2,
    [WinDpiAwareness]::PerMonitorAware
  )

  foreach ($context in $contexts) {
    try {
      if ([WinDpiAwareness]::SetProcessDpiAwarenessContext($context)) { break }
    } catch {}
  }

  try { [WinDpiAwareness]::SetProcessDpiAwareness(2) | Out-Null } catch {}
  try { [WinDpiAwareness]::SetProcessDPIAware() | Out-Null } catch {}

  foreach ($context in $contexts) {
    try {
      $previous = [WinDpiAwareness]::SetThreadDpiAwarenessContext($context)
      if ($previous -ne [IntPtr]::Zero) { break }
    } catch {}
  }
}

Enable-HighDpiAwareness

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

[System.Windows.Forms.Application]::EnableVisualStyles()
[System.Windows.Forms.Application]::SetCompatibleTextRenderingDefault($false)

$tray = New-Object System.Windows.Forms.NotifyIcon
$tray.Text = "Birouter - Port ${port}"
${iconLoader}
$tray.Visible = $true

$menu = New-Object System.Windows.Forms.ContextMenuStrip

$mDash = $menu.Items.Add("Open Dashboard")
$mDash.add_Click({ Write-Host "DASHBOARD" })

$mLogs = $menu.Items.Add("Show Logs")
$mLogs.add_Click({ Write-Host "LOGS" })

$reg = Get-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' -Name 'Birouter' -ErrorAction SilentlyContinue
$startupFile = "$env:APPDATA\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\birouter.vbs"
$hasStartup = Test-Path $startupFile
$initialText = "[ ] Auto-start"
if ($reg -or $hasStartup) { $initialText = "[x] Auto-start" }

$mAutostart = $menu.Items.Add($initialText)
$mAutostart.add_Click({
  Write-Host "AUTOSTART"
  if ($this.Text -eq "[ ] Auto-start") {
    $this.Text = "[x] Auto-start"
  } else {
    $this.Text = "[ ] Auto-start"
  }
})

$mQuit = $menu.Items.Add("Quit Birouter")
$mQuit.add_Click({ Write-Host "QUIT"; [System.Windows.Forms.Application]::Exit() })

$tray.ContextMenuStrip = $menu
[System.Windows.Forms.Application]::Run()
$tray.Dispose()
`.trim();

  writeFileSync(scriptPath, ps1, "utf8");

  const proc = spawn("powershell.exe", ["-NonInteractive", "-File", scriptPath], {
    stdio: ["ignore", "pipe", "ignore"],
    windowsHide: true,
    detached: false,
    shell: false,
  });

  proc.stdout.on("data", async (data) => {
    const line = data.toString().trim();
    if (line === "DASHBOARD") onOpenDashboard?.();
    else if (line === "LOGS") onShowLogs?.();
    else if (line === "AUTOSTART") {
      const { enable, disable, isAutostartEnabled } = await import("./autostart.mjs");
      if (isAutostartEnabled()) disable();
      else enable();
    } else if (line === "QUIT") onQuit?.();
  });

  proc.on("exit", () => {
    try {
      if (existsSync(scriptPath)) unlinkSync(scriptPath);
    } catch {}
  });

  return proc;
}

export function killWinTray(proc) {
  try {
    proc.kill("SIGTERM");
  } catch {}
}
