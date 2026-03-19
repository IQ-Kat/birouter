# Kontrolní seznam vydání

Tento kontrolní seznam použijte před označením nebo publikováním nové verze OmniRoute.

## Verze a seznam změn

1. Navýšit verzi `package.json` ( `xyz` ) ve větvi release.
2. Přesunout poznámky k vydání z `## [Unreleased]` v `CHANGELOG.md` do sekce s datem vydání:
    - `## [x.y.z] — YYYY-MM-DD`
3. Ponechte `## [Unreleased]` jako první sekci changelogu pro nadcházející práci.
4. Ujistěte se, že nejnovější sekce semver v `CHANGELOG.md` je rovna verzi `package.json` .

## Dokumentace API

1. Aktualizace `docs/openapi.yaml` :
    - Soubor `info.version` se musí rovnat verzi `package.json` .
2. Ověřte příklady koncových bodů, pokud se změnily smlouvy API.

## Dokumentace k běhovému prostředí

1. Projděte si `docs/ARCHITECTURE.md` , zda nedochází k posunu v úložišti/běhovém prostředí.
2. Projděte si soubor `docs/TROUBLESHOOTING.md` , kde naleznete informace o proměnné prostředí a provozním posunu.
3. Aktualizujte lokalizovanou dokumentaci, pokud se zdrojová dokumentace výrazně změnila.

## Automatická kontrola

Před otevřením PR spusťte lokálně ochranu synchronizace:

```bash
npm run check:docs-sync
```

CI také spouští tuto kontrolu v `.github/workflows/ci.yml` (úloha lint).
