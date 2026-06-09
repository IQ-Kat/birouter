#!/usr/bin/env node
// install-local.cjs
// Shortcut: skip Next.js rebuild, copy existing .next/standalone → cli/app/, then reinstall CLI globally.
// Run: node install-local.cjs

'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const appDir = __dirname;
const cliDir = path.join(appDir, 'cli');
const cliAppDir = path.join(cliDir, 'app');
const standaloneDir = path.join(appDir, '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.error('❌ .next/standalone not found! Run npm run build first.');
  process.exit(1);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    try { fs.accessSync(s); } catch { continue; }
    if (entry.isDirectory()) copyRecursive(s, d);
    else if (entry.isSymbolicLink()) {
      try { const r = fs.realpathSync(s); fs.statSync(r).isDirectory() ? copyRecursive(r, d) : fs.copyFileSync(r, d); } catch {}
    } else {
      try { fs.copyFileSync(s, d); } catch {}
    }
  }
}

// Find server.js in standalone
let standaloneApp = '';
if (fs.existsSync(path.join(standaloneDir, 'server.js'))) {
  standaloneApp = standaloneDir;
} else {
  for (const e of fs.readdirSync(standaloneDir, { withFileTypes: true })) {
    if (e.isDirectory() && fs.existsSync(path.join(standaloneDir, e.name, 'server.js'))) {
      standaloneApp = path.join(standaloneDir, e.name);
      break;
    }
  }
}
if (!standaloneApp) { console.error('❌ server.js not found in .next/standalone'); process.exit(1); }

console.log('1️⃣  Cleaning cli/app ...');
if (fs.existsSync(cliAppDir)) fs.rmSync(cliAppDir, { recursive: true, force: true });

console.log('2️⃣  Copying standalone build → cli/app ...');
copyRecursive(standaloneApp, cliAppDir);

// node_modules at standalone root (nested workspace layout)
const standaloneNM = path.join(standaloneDir, 'node_modules');
if (standaloneApp !== standaloneDir && fs.existsSync(standaloneNM))
  copyRecursive(standaloneNM, path.join(cliAppDir, 'node_modules'));

console.log('3️⃣  Copying .next/static → cli/app/.next/static ...');
copyRecursive(path.join(appDir, '.next', 'static'), path.join(cliAppDir, '.next', 'static'));

console.log('4️⃣  Copying public → cli/app/public ...');
copyRecursive(path.join(appDir, 'public'), path.join(cliAppDir, 'public'));

console.log('5️⃣  Copying MITM files ...');
copyRecursive(path.join(appDir, 'src', 'mitm'), path.join(cliAppDir, 'src', 'mitm'));

console.log('6️⃣  Copying updater files ...');
copyRecursive(path.join(appDir, 'src', 'lib', 'updater'), path.join(cliAppDir, 'src', 'lib', 'updater'));

console.log('7️⃣  Building MITM server ...');
try { execSync('node scripts/buildMitm.js', { stdio: 'inherit', cwd: cliDir }); }
catch { console.warn('⚠ MITM build failed (skipping)'); }

console.log('\n✅ cli/app ready! Installing globally...');
try {
  execSync('npm install -g .', { stdio: 'inherit', cwd: cliDir });
  console.log('\n🎉 birouter updated! Run: birouter --version');
} catch (e) {
  console.error('❌ Global install failed:', e.message);
  process.exit(1);
}
