/**
 * Launch Menu — shown when user types `birouter` without arguments.
 *
 * Lets the user choose between:
 *   1. Web Dashboard  — start server + open browser
 *   2. CLI Mode       — show full command help
 *   3. Tray Mode      — start server in background with system tray
 *   4. Quit           — exit
 */

import { createInterface } from "node:readline";
import { platform } from "node:os";

function createPrompt(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function printBanner() {
  console.log(`
\x1b[36m   ____  _                     _
  |  _ \\(_)               _   | |
  | |_) |_ _ __ ___  _   | |_ | |_ ___  _ __
  |  _ <| | '__/ _ \\| | | |  _|| __/ _ \\| '__|
  | |_) | | | | (_) | |_| | |_ | ||  __/| |
  |____/|_|_|  \\___/ \\__,_|\\__| \\__\\___||_|
\x1b[0m`);
}

/**
 * Show the interactive launch menu.
 * Returns the action to perform: "serve", "serve-tray", "help", or "quit".
 */
export async function showLaunchMenu() {
  printBanner();

  const supportsTray = platform() === "win32" || platform() === "darwin";

  console.log("\x1b[1m  Pilih mode:\x1b[0m\n");
  console.log("  \x1b[33m1\x1b[0m) \x1b[1m🌐  Web Dashboard\x1b[0m   — Buka Birouter di browser");
  if (supportsTray) {
    console.log(
      "  \x1b[33m2\x1b[0m) \x1b[1m🔧  Tray Mode\x1b[0m       — Jalankan di background (system tray)"
    );
  }
  console.log(
    "  \x1b[33m3\x1b[0m) \x1b[1m🖥️   CLI Mode\x1b[0m       — Tampilkan semua perintah CLI"
  );
  console.log("  \x1b[33m4\x1b[0m) \x1b[1m🚪  Keluar\x1b[0m          — Tutup");
  console.log("");

  const menuOptions = supportsTray
    ? { 1: "serve", 2: "serve-tray", 3: "help", 4: "quit" }
    : { 1: "serve", 2: "help", 3: "quit" };

  const validKeys = Object.keys(menuOptions);

  while (true) {
    const answer = await createPrompt("  \x1b[2mPilihan (1-" + validKeys.length + "):\x1b[0m ");

    if (menuOptions[answer]) {
      console.log("");
      return menuOptions[answer];
    }

    if (answer === "q" || answer === "quit" || answer === "exit" || answer === "4") {
      console.log("");
      return "quit";
    }

    console.log("  \x1b[31m✖ Pilihan tidak valid. Coba lagi.\x1b[0m\n");
  }
}
