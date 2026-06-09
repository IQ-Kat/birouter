'use strict';
// prebuild.cjs
// BLOCK webpack/@vercel/nft from scanning or following symlinks in C:\Users\ during build.
// Issues fixed:
//   1. webpack glob scans C:\Users\ikbal (.node_modules legacy path) → EPERM junction points
//   2. @vercel/nft sees C:\Users as a symlink → readlink returns self → "Recursive symlink"
//   3. OOM from webpack scanning thousands of files in C:\Users
// Strategy:
//   - readdir(C:\Users\*) → always return [] (block scan entirely)
//   - lstat(C:\Users\*)  → always return fakeStat with isSymbolicLink=false
//   - readlink(C:\Users\*) → throw EINVAL (not a symlink) as safety net

const fs = require('fs');

function isUserPath(p) {
  if (typeof p !== 'string') return false;
  const n = p.replace(/\\/g, '/').toLowerCase();
  return n === 'c:/users' || n.startsWith('c:/users/');
}

function isPermErr(e) {
  return e && (e.code === 'EPERM' || e.code === 'EACCES' || e.code === 'ELOOP');
}

// A plain stat object that says: regular file, not a symlink, not a dir
const fakeStat = {
  isSymbolicLink: () => false,
  isDirectory:    () => false,
  isFile:         () => true,
  isFIFO:         () => false,
  isSocket:       () => false,
  isCharacterDevice: () => false,
  isBlockDevice:  () => false,
  size: 0, mode: 0o100644,
  uid: 0, gid: 0, nlink: 1,
  atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0,
};

function makeEINVAL(p) {
  const e = Object.assign(new Error(`EINVAL: invalid argument, readlink '${p}'`),
    { code: 'EINVAL', syscall: 'readlink', path: p });
  return e;
}

// ── readdirSync ───────────────────────────────────────────────────────────────
const oRS = fs.readdirSync;
fs.readdirSync = function (p, o) {
  if (isUserPath(p)) return [];
  try { return oRS.call(fs, p, o); }
  catch (e) { if (isPermErr(e)) return []; throw e; }
};

// ── readdir (async) ───────────────────────────────────────────────────────────
const oR = fs.readdir;
fs.readdir = function (p, o, c) {
  const cb = typeof o === 'function' ? o : c;
  const op = typeof o === 'function' ? undefined : o;
  if (isUserPath(p)) return process.nextTick(cb, null, []);
  function done(e, f) { if (isPermErr(e)) return cb(null, []); cb(e, f); }
  op !== undefined ? oR.call(fs, p, op, done) : oR.call(fs, p, done);
};

// ── fs.promises.readdir ───────────────────────────────────────────────────────
const oRP = fs.promises.readdir;
fs.promises.readdir = async function (p, o) {
  if (isUserPath(p)) return [];
  try { return await oRP.call(fs.promises, p, o); }
  catch (e) { if (isPermErr(e)) return []; throw e; }
};

// ── lstatSync ─────────────────────────────────────────────────────────────────
// Always fake for C:\Users: prevents nft from detecting junctions as symlinks.
const oLS = fs.lstatSync;
fs.lstatSync = function (p, o) {
  if (isUserPath(p)) return fakeStat;
  try { return oLS.call(fs, p, o); }
  catch (e) { if (isPermErr(e)) return fakeStat; throw e; }
};

// ── lstat (async) ─────────────────────────────────────────────────────────────
const oLA = fs.lstat;
fs.lstat = function (p, o, c) {
  const cb = typeof o === 'function' ? o : c;
  const op = typeof o === 'function' ? undefined : o;
  if (isUserPath(p)) return process.nextTick(cb, null, fakeStat);
  function done(e, s) { if (isPermErr(e)) return cb(null, fakeStat); cb(e, s); }
  op !== undefined ? oLA.call(fs, p, op, done) : oLA.call(fs, p, done);
};

// ── fs.promises.lstat ─────────────────────────────────────────────────────────
const oLP = fs.promises.lstat;
fs.promises.lstat = async function (p, o) {
  if (isUserPath(p)) return fakeStat;
  try { return await oLP.call(fs.promises, p, o); }
  catch (e) { if (isPermErr(e)) return fakeStat; throw e; }
};

// ── readlinkSync ──────────────────────────────────────────────────────────────
// Safety net: if lstat still leaks as symlink, throw EINVAL (not a symlink).
const oRLS = fs.readlinkSync;
fs.readlinkSync = function (p, o) {
  if (isUserPath(p)) throw makeEINVAL(p);
  try { return oRLS.call(fs, p, o); }
  catch (e) { if (isPermErr(e) && isUserPath(p)) throw makeEINVAL(p); throw e; }
};

// ── readlink (async) ──────────────────────────────────────────────────────────
const oRL = fs.readlink;
fs.readlink = function (p, o, c) {
  const cb = typeof o === 'function' ? o : c;
  const op = typeof o === 'function' ? undefined : o;
  if (isUserPath(p)) return process.nextTick(cb, makeEINVAL(p));
  function done(e, l) { if (e && isUserPath(p)) return cb(makeEINVAL(p)); cb(e, l); }
  op !== undefined ? oRL.call(fs, p, op, done) : oRL.call(fs, p, done);
};
