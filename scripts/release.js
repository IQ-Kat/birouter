#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var execSync = require("child_process").execSync;

var ROOT = path.resolve(__dirname, "..");
var CLI_PKG = path.join(ROOT, "cli", "package.json");
var APP_PKG = path.join(ROOT, "package.json");
var DOCS_PKG = path.join(ROOT, "gitbook", "package.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}

function bumpVersion(version, type) {
  var parts = version.split(".").map(Number);
  if (type === "major") return (parts[0] + 1) + ".0.0";
  if (type === "minor") return parts[0] + "." + (parts[1] + 1) + ".0";
  return parts[0] + "." + parts[1] + "." + (parts[2] + 1);
}

function run(cmd, cwd) {
  console.log("  $ " + cmd);
  execSync(cmd, { stdio: "inherit", cwd: cwd || ROOT });
}

var type = process.argv[2] || "patch";
if (["patch", "minor", "major"].indexOf(type) === -1) {
  console.error("Usage: node scripts/release.js [patch|minor|major]");
  process.exit(1);
}

var cliPkg = readJson(CLI_PKG);
var oldVersion = cliPkg.version;
var newVersion = bumpVersion(oldVersion, type);

console.log("");
console.log("  Birouter Release");
console.log("  " + oldVersion + " -> " + newVersion + " (" + type + ")");
console.log("");

cliPkg.version = newVersion;
writeJson(CLI_PKG, cliPkg);
console.log("  [ok] cli/package.json -> " + newVersion);

var appPkg = readJson(APP_PKG);
appPkg.version = newVersion;
writeJson(APP_PKG, appPkg);
console.log("  [ok] package.json -> " + newVersion);

if (fs.existsSync(DOCS_PKG)) {
  var docsPkg = readJson(DOCS_PKG);
  docsPkg.version = newVersion;
  writeJson(DOCS_PKG, docsPkg);
  console.log("  [ok] gitbook/package.json -> " + newVersion);
}

console.log("");
console.log("  Publishing to npm...");
run("npm publish", path.join(ROOT, "cli"));
console.log("  [ok] Published birouter@" + newVersion);
console.log("");

console.log("  Git commit and push...");
run("git add -A");
run("git commit -m \"release: v" + newVersion + "\"");
run("git tag v" + newVersion);
run("git push");
run("git push --tags");

console.log("");
console.log("  Done! Released v" + newVersion);
console.log("");
