🌐 **Languages:** 🇺🇸 [English](../../README.md) · 🇧🇷 [pt-BR](../pt-BR/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../es/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../fr/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../de/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../it/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../ru/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../zh-CN/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../ja/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../ko/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../ar/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../in/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../th/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../vi/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../id/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../ms/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../nl/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../pl/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../sv/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../no/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../da/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../fi/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../pt/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../ro/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../hu/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../bg/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../sk/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../uk-UA/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../he/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../phi/RELEASE_CHECKLIST.md)

---

# Release Checklist

Use this checklist before tagging or publishing a new OmniRoute release.

## Version and Changelog

1. Bump `package.json` version (`x.y.z`) in the release branch.
2. Move release notes from `## [Unreleased]` in `CHANGELOG.md` to a dated section:
   - `## [x.y.z] — YYYY-MM-DD`
3. Keep `## [Unreleased]` as the first changelog section for upcoming work.
4. Ensure the latest semver section in `CHANGELOG.md` equals `package.json` version.

## API Docs

1. Update `docs/openapi.yaml`:
   - `info.version` must equal `package.json` version.
2. Validate endpoint examples if API contracts changed.

## Runtime Docs

1. Review `docs/ARCHITECTURE.md` for storage/runtime drift.
2. Review `docs/TROUBLESHOOTING.md` for env var and operational drift.
3. Update localized docs if source docs changed significantly.

## Automated Check

Run the sync guard locally before opening PR:

```bash
npm run check:docs-sync
```

CI also runs this check in `.github/workflows/ci.yml` (lint job).
