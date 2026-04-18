# Feature: Native Termux (Android/arm64) Support (हिन्दी (IN))

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/833-termux-android-support.md) · 🇪🇸 [es](../../../es/_ideia/notfit/833-termux-android-support.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/833-termux-android-support.md) · 🇩🇪 [de](../../../de/_ideia/notfit/833-termux-android-support.md) · 🇮🇹 [it](../../../it/_ideia/notfit/833-termux-android-support.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/833-termux-android-support.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/833-termux-android-support.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/833-termux-android-support.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/833-termux-android-support.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/833-termux-android-support.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/833-termux-android-support.md) · 🇮🇳 [in](../../../in/_ideia/notfit/833-termux-android-support.md) · 🇹🇭 [th](../../../th/_ideia/notfit/833-termux-android-support.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/833-termux-android-support.md) · 🇮🇩 [id](../../../id/_ideia/notfit/833-termux-android-support.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/833-termux-android-support.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/833-termux-android-support.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/833-termux-android-support.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/833-termux-android-support.md) · 🇳🇴 [no](../../../no/_ideia/notfit/833-termux-android-support.md) · 🇩🇰 [da](../../../da/_ideia/notfit/833-termux-android-support.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/833-termux-android-support.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/833-termux-android-support.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/833-termux-android-support.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/833-termux-android-support.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/833-termux-android-support.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/833-termux-android-support.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/833-termux-android-support.md) · 🇮🇱 [he](../../../he/_ideia/notfit/833-termux-android-support.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/833-termux-android-support.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/833-termux-android-support.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/833-termux-android-support.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/833-termux-android-support.md)

---

> GitHub Issue: #833 — opened by @marojiro on 2026-03-30
> Status: 📋 Cataloged | Priority: Medium
> Duplicate of: #821 (92% similarity per Kilo)

## 📝 Original Request

OmniRoute can't run on Termux (Android/arm64) due to three blockers:

1. **`keytar` fails to compile** on Node 22+ — useless on Android (no system keychain)
2. **`better-sqlite3` missing `binding.gyp`** — bundled binary is x86_64, can't rebuild without sources
3. **`isNativeBinaryCompatible()` rejects Android** — `process.platform` returns "android" but ELF binary is detected as "linux"

### Proposed Fix for #3

```javascript
// Before:
if (target.platform !== runtimePlatform || ...
// After:
if ((target.platform !== runtimePlatform && !(target.platform === "linux" && runtimePlatform === "android")) || ...
```

## 💬 Community Discussion

- @kilo-code-bot flagged duplicate of #821

## 🎯 Refined Feature Description

Three concrete, small changes to unblock Termux users:

### What it solves

- OmniRoute unusable on Android devices (Termux)
- Growing mobile developer use case (coding on tablets/phones)

### How it should work

1. Make `keytar` optional with try/catch wrapper
2. Ensure `better-sqlite3` can be rebuilt from source on arm64
3. Treat `android` as equivalent to `linux` in platform checks

### Affected areas

- `scripts/native-binary-compat.mjs` — platform check fix (one-liner)
- `package.json` — make keytar optional dependency
- Docker/build — ensure better-sqlite3 sources are included

## 🔗 Related Ideas

- Duplicate of #821 — consolidate fixes
