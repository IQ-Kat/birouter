# Release Checklist (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

新しい OmniRoute リリースをタグ付けまたは公開する前に、このチェックリストを使用してください。## Version and Changelog

1. `package.json` バージョン (`x.y.z`) をリリース ブランチにバンプします。
2. リリース ノートを「CHANGELOG.md」の「## [未リリース]」から日付付きセクションに移動します。
   - `## [x.y.z] — YYYY-MM-DD`
3. `## [未リリース]` を今後の作業の最初の変更ログ セクションとして保持します。
4. `CHANGELOG.md` の最新の semver セクションが `package.json` のバージョンと等しいことを確認します。## API Docs

1.「docs/openapi.yaml」を更新します。

- `info.version` は `package.json` のバージョンと等しくなければなりません。

2. API コントラクトが変更された場合は、エンドポイントの例を検証します。## Runtime Docs

1. ストレージ/ランタイムのドリフトについて「docs/ARCHITECTURE.md」を確認します。
1. `docs/TROUBLESHOOTING.md` を参照して、環境変数と運用上の変動を確認します。
1. ソースドキュメントが大幅に変更された場合は、ローカライズされたドキュメントを更新します。## Automated Check

PR を開く前に、同期ガードをローカルで実行します。```bash
npm run check:docs-sync

```

CI はこのチェックを `.github/workflows/ci.yml` でも実行します (lint ジョブ)。
```
