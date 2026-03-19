# Aplikace OmniRoute Electron pro stolní počítače

Tento adresář obsahuje obalovou aplikaci Electron pro desktopovou aplikaci OmniRoute.

## Architektura (v1.6.4)

```
electron/
├── main.js          # Main process — window, tray, server lifecycle, CSP, IPC
├── preload.js       # Preload script — secure IPC bridge with disposer pattern
├── package.json     # Electron-specific dependencies & electron-builder config
├── types.d.ts       # TypeScript definitions (AppInfo, ServerStatus, ElectronAPI)
└── assets/          # Application icons and resources

src/shared/hooks/
└── useElectron.ts   # React hooks — useSyncExternalStore, zero re-renders
```

## Klíčová rozhodnutí o designu

Rozhodnutí | Odůvodnění
--- | ---
dotazování `waitForServer()` | Zabraňuje zobrazení prázdné obrazovky při studeném startu — před načtením se ozve `http://localhost:PORT`
`stdio: 'pipe'` | Zachycuje stdout/stderr serveru pro logování + detekci připravenosti ( `inherit` )
Vzor drtiče odpadu | `onServerStatus()` vrací `() => void` pro přesné vyčištění listeneru (ne `removeAllListeners` )
`useSyncExternalStore` | Nulové renderování pro `useIsElectron()` — žádný cyklus `useState` + `useEffect`
CSP prostřednictvím záhlaví relace | `Content-Security-Policy` omezuje `script-src` , `connect-src` atd. dle osvědčených postupů Electron.
Podmíněný titulek pro platformu | `titleBarStyle: 'hiddenInset'` pouze v systému macOS; `default` ve Windows/Linuxu

## Rozvoj

### Předpoklady

1. Nejprve sestavte aplikaci Next.js:

```bash
npm run build
```

1. Instalace závislostí Electronu:

```bash
cd electron
npm install
```

### Spuštěno ve vývoji

1. Spusťte vývojový server Next.js:

```bash
npm run dev
```

1. V jiném terminálu spusťte Electron:

```bash
cd electron
npm run dev
```

### Spuštění v produkčním režimu

1. Sestavení Next.js v samostatném režimu:

```bash
npm run build
```

1. Spuštění elektronu:

```bash
cd electron
npm start
```

## Budova

### Sestavení pro aktuální platformu

```bash
cd electron
npm run build
```

### Vytvořte pro specifické platformy

```bash
# Windows
npm run build:win

# macOS (x64 + arm64)
npm run build:mac

# Linux
npm run build:linux
```

## Výstup

Vytvořené aplikace jsou umístěny v `dist-electron/` :

- Windows: `.exe` instalační program (NSIS) + přenosný `.exe`
- macOS: instalační soubor `.dmg` (Intel + Apple Silicon)
- Linux: `.AppImage`

## Instalace

### macOS

1. Stáhněte si nejnovější soubor `.dmg` ze stránky [Verze](https://github.com/diegosouzapw/OmniRoute/releases) .
2. Otevřete soubor `.dmg` .
3. Přetáhněte `OmniRoute.app` do složky Aplikace.
4. Spustit z Aplikací.

> ⚠️ **Poznámka:** Aplikace zatím není podepsána certifikátem Apple Developer. Pokud macOS aplikaci blokuje, spusťte:
>
> ```bash
> xattr -cr /Applications/OmniRoute.app
> ```
>
> Nebo klikněte pravým tlačítkem myši na aplikaci → Otevřít → Otevřít (pro obejití Gatekeeperu při prvním spuštění).

### Windows

**Instalační program (doporučeno):**

1. Stáhněte si `OmniRoute.Setup.*.exe` z [Releases](https://github.com/diegosouzapw/OmniRoute/releases) .
2. Spusťte instalační program.
3. Spuštění z nabídky Start nebo zástupce na ploše.

**Přenosné (bez instalace):**

1. Stáhněte si soubor `OmniRoute.exe` ze [sekce Vydání](https://github.com/diegosouzapw/OmniRoute/releases) .
2. Spouštět přímo z libovolné složky.

### Linux

1. Stáhněte si soubor `.AppImage` ze [sekce Releases](https://github.com/diegosouzapw/OmniRoute/releases) .
2. Udělejte z něj spustitelný soubor:
    ```bash
    chmod +x OmniRoute-*.AppImage
    ```
3. Běh:
    ```bash
    ./OmniRoute-*.AppImage
    ```

## Funkce

- **Připravenost serveru** – Před zobrazením okna čeká na kontrolu stavu
- **Systémový zásobník** — Minimalizace do systémového zásobníku s rychlými akcemi (otevřít, změnit port, ukončit)
- **Správa portů** — Změna portu z nabídky v systémové liště (server se automaticky restartuje)
- **Ovládací prvky oken** — Vlastní minimalizace, maximalizace, zavření přes IPC
- **Zásady zabezpečení obsahu** – Omezující CSP prostřednictvím záhlaví relací
- **Offline podpora** — Samostatný server Next.js v balíčku
- **Jedna instance** – V daném okamžiku může běžet pouze jedna instance aplikace.

## Konfigurace

### Proměnné prostředí

Proměnná | Výchozí | Popis
--- | --- | ---
`OMNIROUTE_PORT` | `20128` | Port serveru
`OMNIROUTE_MEMORY_MB` | `512` | Limit haldy Node.js (64–16384 MB)
`NODE_ENV` | `production` | Nastavit na `development` pro vývojářský režim

### Vlastní ikona

Umístěte ikony do `assets/` :

- `icon.ico` — ikona Windows (256×256)
- `icon.icns` — balíček ikon pro macOS
- `icon.png` — Linux/obecné použití (512×512)
- `tray-icon.png` — Ikona na systémové liště (16×16 nebo 32×32)

## Kanály IPC

### Vyvolání (Renderer → Hlavní, asynchronní)

Kanál | Vrácení zboží | Popis
--- | --- | ---
`get-app-info` | `AppInfo` | Název aplikace, verze, platforma, isDev, port
`open-external` | `void` | Otevřít URL ve výchozím prohlížeči (pouze http/https)
`get-data-dir` | `string` | Získat cestu k adresáři userData
`restart-server` | `{ success }` | Zastavení + restart serveru (časový limit 5 s + SIGKILL)

### Odeslat (Renderer → Hlavní, spustit a zapomenout)

Kanál | Popis
--- | ---
`window-minimize` | Minimalizovat okno
`window-maximize` | Přepnout maximalizaci/obnovení
`window-close` | Zavřít okno (minimalizovat do zásobníku)

### Příjem (Hlavní → Renderer, události)

Kanál | Užitečné zatížení | Vydáno, když
--- | --- | ---
`server-status` | `ServerStatus` | Server se spouští, zastavuje, dochází k chybám nebo se restartuje
`port-changed` | `number` | Změna portu přes menu zásobníku

> **Poznámka** : Posluchače vracejí funkce pro přesné čištění. Viz hooky `useServerStatus` a `usePortChanged` .

## Zabezpečení

Funkce | Implementace
--- | ---
Izolace kontextu | `contextIsolation: true` — renderer nemůže přistupovat k Node.js
Integrace uzlů | `nodeIntegration: false` — v rendereru není `require()`
Bílý seznam IPC | Názvy kanálů ověřené při předběžném načítání pomocí `safeInvoke` / `safeSend` / `safeOn`
Ověření URL adresy | `shell.openExternal()` povoluje pouze protokoly `http:` / `https:`
CSP | Záhlaví `Content-Security-Policy` nastavené pomocí `session.webRequest.onHeadersReceived`
Zabezpečení webu | `webSecurity: true` – vynucena politika stejného původu

## React Hooky

Háček | Vrácení zboží | Popis
--- | --- | ---
`useIsElectron()` | `boolean` | Detekce nulového renderování pomocí `useSyncExternalStore`
`useElectronAppInfo()` | `{ appInfo, loading, error }` | Informace o aplikaci z hlavního procesu
`useDataDir()` | `{ dataDir, loading, error }` | Adresář uživatelských dat
`useWindowControls()` | `{ minimize, maximize, close }` | Akce ovládání oken
`useOpenExternal()` | `{ openExternal }` | Otevřít URL adresy v prohlížeči
`useServerControls()` | `{ restart, restarting }` | Řízení restartu serveru
`useServerStatus(cb)` | Drtič odpadu | Poslouchejte události stavu serveru
`usePortChanged(cb)` | Drtič odpadu | Poslouchejte události změny portu

## Odstraňování problémů

### Aplikace se nespustí

1. Zkontrolujte, zda je port 20128 dostupný: `lsof -i :20128`
2. Zkontrolujte protokoly konzole pro prefix `[Electron]`
3. Ověřte, zda výstup sestavení existuje v souboru `.next/standalone`

### Bílá obrazovka

1. Ověření existence buildu Next.js – čekání na připravenost serveru maximálně 30 sekund
2. Zkontrolujte výstup protokolů `[Server]` a `[Server:err]`
3. Hledání porušení CSP v konzoli pro vývojáře

### Selhání sestavení

Ujistěte se, že máte nainstalované nástroje pro sestavení:

- Windows: Nástroje pro sestavení ve Visual Studiu
- macOS: Nástroje příkazového řádku Xcode
- Linux: `build-essential` , `libsecret-1-dev`

## Licence

MIT
