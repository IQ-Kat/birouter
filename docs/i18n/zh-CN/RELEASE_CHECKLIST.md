🌐 **语言:** 🇺🇸 [English](../../RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../pt-BR/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../es/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../fr/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../de/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../it/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../ru/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../zh-CN/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../ja/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../ko/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../ar/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../in/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../th/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../vi/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../id/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../ms/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../nl/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../pl/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../sv/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../no/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../da/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../fi/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../pt/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../ro/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../hu/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../bg/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../sk/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../uk-UA/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../he/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../phi/RELEASE_CHECKLIST.md)

---

# 发布检查清单

在打标签或发布新的 OmniRoute 版本之前，请使用此检查清单。

## 版本和变更日志

1. 在发布分支中更新 `package.json` 的版本号（`x.y.z`）。
2. 将发布说明从 `CHANGELOG.md` 中的 `## [Unreleased]` 移动到带日期的章节：
   - `## [x.y.z] — YYYY-MM-DD`
3. 保留 `## [Unreleased]` 作为变更日志的第一个章节，用于后续工作。
4. 确保 `CHANGELOG.md` 中最新的语义化版本章节与 `package.json` 的版本号一致。

## API 文档

1. 更新 `docs/openapi.yaml`：
   - `info.version` 必须与 `package.json` 的版本号一致。
2. 如果 API 契约发生变化，请验证端点示例。

## 运行时文档

1. 检查 `docs/ARCHITECTURE.md` 是否存在存储/运行时偏移。
2. 检查 `docs/TROUBLESHOOTING.md` 是否存在环境变量和操作偏移。
3. 如果源文档发生重大变更，请更新本地化文档。

## 自动化检查

在开启 PR 之前，在本地运行同步检查：

```bash
npm run check:docs-sync
```

CI 也会在 `.github/workflows/ci.yml`（lint 作业）中运行此检查。
