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
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

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
