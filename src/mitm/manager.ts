// ESM imports for child_process, fs, path are deferred to function bodies
// to prevent Turbopack from statically bundling native Node.js modules
import { resolveDataDir } from "@/lib/dataPaths";
import { addDNSEntry, removeDNSEntry } from "./dns/dnsConfig";
import { generateCert } from "./cert/generate";
import { installCert } from "./cert/install";

// Lazy-loaded native modules (avoids Turbopack static trace)
 
const getPath = () => require("path") as typeof import("path");
 
const getFs = () => require("fs") as typeof import("fs");
 
const getSpawn = () => (require("child_process") as typeof import("child_process")).spawn;

// Store server process
let serverProcess = null;
let serverPid = null;

// Module-scoped password cache (not exposed on globalThis).
// Cleared automatically when the MITM proxy is stopped.
let _cachedPassword = null;
export function getCachedPassword() {
  return _cachedPassword;
}
export function setCachedPassword(pwd) {
  _cachedPassword = pwd || null;
}
export function clearCachedPassword() {
  _cachedPassword = null;
}

// Lazily compute PID_FILE path to avoid top-level path.join
function getPidFile() {
  return getPath().join(resolveDataDir(), "mitm", ".mitm.pid");
}

// Check if a PID is alive
function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get MITM status
 */
export async function getMitmStatus() {
  const fs = getFs();
  const path = getPath();
  const PID_FILE = getPidFile();

  // Check in-memory process first, then fallback to PID file
  let running = serverProcess !== null && !serverProcess.killed;
  let pid = serverPid;

  if (!running) {
    try {
      if (fs.existsSync(PID_FILE)) {
        const savedPid = parseInt(fs.readFileSync(PID_FILE, "utf-8").trim(), 10);
        if (savedPid && isProcessAlive(savedPid)) {
          running = true;
          pid = savedPid;
        } else {
          // Stale PID file, clean up
          fs.unlinkSync(PID_FILE);
        }
      }
    } catch {
      // Ignore
    }
  }

  // Check DNS configuration
  let dnsConfigured = false;
  try {
    const hostsContent = fs.readFileSync("/etc/hosts", "utf-8");
    dnsConfigured = hostsContent.includes("daily-cloudcode-pa.googleapis.com");
  } catch {
    // Ignore
  }

  // Check cert
  const certDir = path.join(resolveDataDir(), "mitm");
  const certExists = fs.existsSync(path.join(certDir, "server.crt"));

  return { running, pid, dnsConfigured, certExists };
}

/**
 * Start MITM proxy
 * @param {string} apiKey - OmniRoute API key
 * @param {string} sudoPassword - Sudo password for DNS/cert operations
 */
export async function startMitm(apiKey, sudoPassword) {
  const fs = getFs();
  const path = getPath();
  const spawn = getSpawn();
  const PID_FILE = getPidFile();

  // Check if already running
  if (serverProcess && !serverProcess.killed) {
    throw new Error("MITM proxy is already running");
  }

  // 1. Generate SSL certificate if not exists
  const certPath = path.join(resolveDataDir(), "mitm", "server.crt");
  if (!fs.existsSync(certPath)) {
    console.log("Generating SSL certificate...");
    await generateCert();
  }

  // 2. Install certificate to system keychain
  await installCert(sudoPassword, certPath);

  // 3. Add DNS entry
  console.log("Adding DNS entry...");
  await addDNSEntry(sudoPassword);

  // 4. Start MITM server
  console.log("Starting MITM server...");
  // Use Buffer.from() to make the path opaque to Turbopack static analysis
  // (Turbopack can't resolve base64-decoded strings as module paths)
  const serverPath = path.join(
    process.cwd(),
    Buffer.from("c3JjL21pdG0vc2VydmVyLmpz", "base64").toString() // src/mitm/server.js
  );
  serverProcess = spawn("node", [serverPath], {
    env: {
      ...process.env,
      ROUTER_API_KEY: apiKey,
      NODE_ENV: "production",
    },
    detached: false,
    stdio: ["ignore", "pipe", "pipe"],
  });

  serverPid = serverProcess.pid;

  // Save PID to file
  fs.writeFileSync(PID_FILE, String(serverPid));

  // Log server output
  serverProcess.stdout.on("data", (data) => {
    console.log(`[MITM Server] ${data.toString().trim()}`);
  });

  serverProcess.stderr.on("data", (data) => {
    console.error(`[MITM Server Error] ${data.toString().trim()}`);
  });

  serverProcess.on("exit", (code) => {
    console.log(`MITM server exited with code ${code}`);
    serverProcess = null;
    serverPid = null;

    // Remove PID file
    try {
      fs.unlinkSync(PID_FILE);
    } catch (error) {
      // Ignore
    }
  });

  // Wait and verify server actually started
  const started = await new Promise((resolve) => {
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(true);
      }
    }, 2000);

    serverProcess.on("exit", (code) => {
      clearTimeout(timeout);
      if (!resolved) {
        resolved = true;
        resolve(false);
      }
    });

    // Check stderr for error messages
    serverProcess.stderr.on("data", (data) => {
      const msg = data.toString().trim();
      if (msg.includes("Port") && msg.includes("already in use")) {
        clearTimeout(timeout);
        if (!resolved) {
          resolved = true;
          resolve(false);
        }
      }
    });
  });

  if (!started) {
    throw new Error("MITM server failed to start (port 443 may be in use)");
  }

  return {
    running: true,
    pid: serverPid,
  };
}

/**
 * Stop MITM proxy
 * @param {string} sudoPassword - Sudo password for DNS cleanup
 */
export async function stopMitm(sudoPassword) {
  const fs = getFs();
  const PID_FILE = getPidFile();

  // 1. Kill server process (in-memory or from PID file)
  const proc = serverProcess;
  if (proc && !proc.killed) {
    console.log("Stopping MITM server...");
    proc.kill("SIGTERM");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!proc.killed) {
      proc.kill("SIGKILL");
    }
    serverProcess = null;
    serverPid = null;
  } else {
    // Fallback: kill by PID file
    try {
      if (fs.existsSync(PID_FILE)) {
        const savedPid = parseInt(fs.readFileSync(PID_FILE, "utf-8").trim(), 10);
        if (savedPid && isProcessAlive(savedPid)) {
          console.log(`Killing MITM server (PID: ${savedPid})...`);
          process.kill(savedPid, "SIGTERM");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (isProcessAlive(savedPid)) {
            process.kill(savedPid, "SIGKILL");
          }
        }
      }
    } catch {
      // Ignore
    }
    serverProcess = null;
    serverPid = null;
  }

  // 2. Remove DNS entry
  console.log("Removing DNS entry...");
  await removeDNSEntry(sudoPassword);

  // 3. Clean up
  clearCachedPassword(); // Clear password from memory when proxy stops
  try {
    fs.unlinkSync(PID_FILE);
  } catch (error) {
    // Ignore
  }

  return {
    running: false,
    pid: null,
  };
}
