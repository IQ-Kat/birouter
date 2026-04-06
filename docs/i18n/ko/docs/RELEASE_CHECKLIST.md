# Release Checklist (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

새로운 OmniRoute 릴리스에 태그를 지정하거나 게시하기 전에 이 체크리스트를 사용하십시오.## Version and Changelog

1. 릴리스 브랜치에서 `package.json` 버전(`x.y.z`)을 범프합니다.
2. `CHANGELOG.md`의 `## [Unreleased]`에서 날짜가 지정된 섹션으로 릴리스 노트를 이동합니다.
   - `## [x.y.z] — YYYY-MM-DD`
3. '## [Unreleased]'를 향후 작업의 첫 번째 변경 로그 섹션으로 유지하세요.
4. `CHANGELOG.md`의 최신 semver 섹션이 `package.json` 버전과 동일한지 확인하세요.## API Docs

5. `docs/openapi.yaml` 업데이트:
   - `info.version`은 `package.json` 버전과 동일해야 합니다.
6. API 계약이 변경된 경우 엔드포인트 예시를 확인합니다.## Runtime Docs

7. 'docs/ARCHITECTURE.md'를 검토하여 저장/런타임 드리프트를 확인하세요.
8. 환경 변수 및 작동 드리프트에 대한 `docs/TROUBLESHOOTING.md`를 검토합니다.
9. 소스 문서가 크게 변경된 경우 현지화된 문서를 업데이트하세요.## Automated Check

PR을 열기 전에 로컬로 동기화 가드를 실행하세요.```bash
npm run check:docs-sync

```

CI는 `.github/workflows/ci.yml`(lint 작업)에서도 이 검사를 실행합니다.
```
