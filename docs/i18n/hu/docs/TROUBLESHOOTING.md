# Troubleshooting (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Az OmniRoute gyakori problémái és megoldásai.---

## Quick Fixes

| Probléma                            | Megoldás                                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- | --- |
| Az első bejelentkezés nem működik   | Állítsa be az 'INITIAL_PASSWORD' értéket a '.env'-ben (nincs merevkódolt alapértelmezés)              |
| A műszerfal rossz porton nyílik meg | Állítsa be: `PORT=20128` és `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                             |
| Nincs kérésnapló a `logs/`          | alatt Állítsa be a következőt: `ENABLE_REQUEST_LOGS=true'                                             |
| EACCES: engedély megtagadva         | A `~/.omniroute` felülbírálásához állítsa be a `DATA_DIR=/útvonal/útvonal/írható/könyvtár` paramétert |
| Az útválasztási stratégia nem menti | Frissítés v1.4.11+ verzióra (Zod-séma javítása a beállítások fennmaradásához)                         | --- |

## Provider Issues

### "Language model did not provide messages"

**Ok:**A szolgáltatói kvóta kimerült.

**Javítás:**

1. Ellenőrizze az irányítópult kvótakövetőjét
2. Használjon kombót tartalék szintekkel
3. Váltson olcsóbb/ingyenes szintre### Rate Limiting

**Ok:**Az előfizetési kvóta kimerült.

**Javítás:**

- Tartalék hozzáadása: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Használja a GLM/MiniMax-ot olcsó tartalékként### OAuth Token Expired

Az OmniRoute automatikusan frissíti a tokeneket. Ha a problémák továbbra is fennállnak:

1. Irányítópult → Szolgáltató → Újracsatlakozás
2. Törölje és adja hozzá újra a szolgáltatói kapcsolatot---

## Cloud Issues

### Cloud Sync Errors

1. Ellenőrizze, hogy a „BASE_URL” a futó példányra mutat (pl. „http://localhost:20128”).
2. Ellenőrizze, hogy a „CLOUD_URL” a felhő végpontjára mutat (pl. „https://omniroute.dev”).
3. Tartsa a `NEXT_PUBLIC_*` értékeket a szerveroldali értékekkel összhangban### Cloud `stream=false` Returns 500

**Tünet:**`Váratlan 'd'... token a felhő-végponton nem streaming hívásokhoz.

**Ok:**Az Upstream SSE hasznos adatot ad vissza, miközben az ügyfél a JSON-t várja.

**Megkerülő megoldás:**Használja a „stream=true” paramétert a felhőalapú közvetlen hívásokhoz. A helyi futási környezet tartalmazza az SSE→JSON tartalékot.### Cloud Says Connected but "Invalid API key"

1. Hozzon létre egy új kulcsot a helyi irányítópultról (`/api/keys`)
2. Futtassa a felhőszinkronizálást: Engedélyezze a Felhőt → Szinkronizálás most
3. A régi/nem szinkronizált kulcsok továbbra is „401”-et adhatnak vissza felhőben---

## Docker Issues

### CLI Tool Shows Not Installed

1. Ellenőrizze a futásidejű mezőket: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Hordozható módban: használja a "runner-cli" képcélzást (csomagolt CLI-k)
3. Gazda beillesztési módhoz: állítsa be a `CLI_EXTRA_PATHS'-t és a mount bin könyvtárat csak olvashatóként
4. Ha `installed=true` és `runnable=false`: bináris fájl található, de az állapotellenőrzés sikertelen### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Ellenőrizze a használati statisztikákat az Irányítópult → Használat menüpontban
2. Állítsa át az elsődleges modellt GLM/MiniMax-ra
3. Használjon ingyenes réteget (Gemini CLI, Qoder) a nem kritikus feladatokhoz
4. Állítsa be a költségkereteket API-kulcsonként: Irányítópult → API-kulcsok → Költségvetés---

## Debugging

### Enable Request Logs

Állítsa be az „ENABLE_REQUEST_LOGS=true” értéket az „.env” fájlban. A naplók a `logs/` könyvtárban jelennek meg.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Fő állapot: `${DATA_DIR}/storage.sqlite` (szolgáltatók, kombinációk, álnevek, kulcsok, beállítások)
- Használat: SQLite táblák a `storage.sqlite` fájlban (`használati_előzmények`, `hívásnaplók`, `proxy_logs`) + opcionális `${DATA_DIR}/log.txt` és `${DATA_DIR}/call_logs/`
- Naplók lekérése: `<repo>/logs/...` (amikor `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Amikor egy szolgáltató megszakítója NYITVA van, a kérések blokkolva vannak, amíg a leállás le nem jár.

**Javítás:**

1. Lépjen az**Irányítópult → Beállítások → Rugalmasság**menüpontra.
2. Ellenőrizze az érintett szolgáltató megszakítókártyáját
3. Kattintson a**Reset All**elemre az összes megszakító törléséhez, vagy várja meg, amíg a lehűlés lejár
4. A visszaállítás előtt ellenőrizze, hogy a szolgáltató valóban elérhető-e### Provider keeps tripping the circuit breaker

Ha egy szolgáltató ismételten NYITOTT állapotba lép:

1. Ellenőrizze a**Irányítópult → Állapot → Szolgáltató állapota**menüpontban a hibamintát
2. Lépjen a**Beállítások → Ellenállás → Szolgáltatói profilok**menüpontra, és növelje a meghibásodási küszöböt.
3. Ellenőrizze, hogy a szolgáltató megváltoztatta-e az API-korlátokat, vagy nem igényel-e újbóli hitelesítést
4. Tekintse át a késleltetési telemetriát – a magas késleltetés időtúllépésen alapuló hibákat okozhat---

## Audio Transcription Issues

### "Unsupported model" error

- Győződjön meg arról, hogy a megfelelő előtagot használja: "deepgram/nova-3" vagy "assemblyai/best"
- Ellenőrizze, hogy a szolgáltató csatlakoztatva van-e az**Irányítópult → Szolgáltatók**menüpontban.### Transcription returns empty or fails

- Ellenőrizze a támogatott hangformátumokat: "mp3", "wav", "m4a", "flac", "ogg", "webm"
- Ellenőrizze, hogy a fájl mérete a szolgáltatói korlátokon belül van (általában < 25 MB)
- Ellenőrizze a szolgáltatói API kulcs érvényességét a szolgáltatói kártyán---

## Translator Debugging

Használja az**Irányítópult → Fordító**lehetőséget a formátumfordítási problémák elhárításához:

| mód                   | Mikor kell használni                                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Játszótér**         | Hasonlítsa össze a bemeneti/kimeneti formátumokat egymás mellett – illesszen be egy hibás kérést, hogy megtudja, hogyan fordítja le |
| **Csevegés tesztelő** | Küldjön élő üzeneteket, és ellenőrizze a teljes kérés/válasz hasznos adatot, beleértve a fejléceket                                 |
| **Próbapad**          | Futtasson kötegelt teszteket a formátumkombinációk között, hogy megtudja, mely fordítások hibásak                                   |
| **Élő monitor**       | Nézze meg a valós idejű kérések folyamatát az időszakos fordítási problémák észleléséhez                                            | ### Common format issues |

-**Nem jelennek meg a gondolkodási címkék**— Ellenőrizze, hogy a célszolgáltató támogatja-e a gondolkodást és a gondolkodási költségvetés beállítását -**Eszközhívások megszakítása**— Egyes formátumfordítások eltávolíthatják a nem támogatott mezőket; ellenőrizze Playground módban -**Rendszerprompt hiányzik**— Claude és Gemini fogantyúrendszere eltérő módon szól; ellenőrizze a fordítás kimenetét -**Az SDK nyers karakterláncot ad vissza az objektum helyett**- Javítva az 1.1.0 verzióban: a válasz-fertőtlenítő mostantól eltávolítja azokat a nem szabványos mezőket ("x_groq", "usage_breakdown" stb.), amelyek az OpenAI SDK Pydantic ellenőrzési hibáit okozzák -**A GLM/ERNIE elutasítja a "rendszerszerepet"**- Javítva az 1.1.0 verzióban: a szerepnormalizáló automatikusan egyesíti a rendszerüzeneteket felhasználói üzenetekké az inkompatibilis modelleknél -**„fejlesztői” szerepkör nem ismerhető fel**– Javítva az 1.1.0-s verzióban: automatikusan „rendszerré” konvertálva a nem OpenAI-szolgáltatók számára

- A**`json_schema` nem működik a Geminivel**— Javítva az 1.1.0-s verzióban: a `response_format` most a Gemini `responseMimeType` + `responseSchema` formátumává alakul---

## Resilience Settings

### Auto rate-limit not triggering

- Az automatikus díjkorlát csak az API-kulcs-szolgáltatókra vonatkozik (nem az OAuth-ra/előfizetésre)
- Ellenőrizze, hogy a**Beállítások → Ellenállás → Szolgáltatói profilok**engedélyezve van-e az automatikus díjkorlátozás
- Ellenőrizze, hogy a szolgáltató 429-es állapotkódokat vagy „Retry-After” fejlécet ad-e vissza### Tuning exponential backoff

A szolgáltatói profilok az alábbi beállításokat támogatják:

-**Alapkésleltetés**- Kezdeti várakozási idő az első hiba után (alapértelmezett: 1 mp) -**Maximális késleltetés**- Maximális várakozási idő (alapértelmezett: 30 mp) -**Szorzó**- Mennyivel növelhető a késleltetés egy egymást követő hiba esetén (alapértelmezett: 2x)### Anti-thundering herd

Amikor sok egyidejű kérés ér egy korlátozott sebességű szolgáltatót, az OmniRoute mutex + automatikus sebességkorlátozást használ a kérések sorba rendezésére és a lépcsőzetes hibák megelőzésére. Ez automatikus az API-kulcs-szolgáltatók számára.---

## Optional RAG / LLM failure taxonomy (16 problems)

Egyes OmniRoute-felhasználók az átjárót a RAG- vagy ügynökveremek elé helyezik. Ezekben a beállításokban gyakran látni egy furcsa mintát: az OmniRoute egészségesnek tűnik (a szolgáltatók, az útválasztási profilok rendben vannak, nincs sebességkorlátozási figyelmeztetés), de a végső válasz továbbra is rossz.

A gyakorlatban ezek az incidensek általában az alsó RAG-csővezetékből származnak, nem pedig magából az átjáróból.

Ha megosztott szókészletet szeretne ezeknek a hibáknak a leírására, használhatja a WFGY ProblemMap-et, egy külső MIT licencszöveg erőforrást, amely tizenhat ismétlődő RAG/LLM hibamintát határoz meg. Magas szinten a következőkre terjed ki:

- visszakeresési sodródás és megtört kontextushatárok
- üres vagy elavult indexek és vektortárak
- beágyazás versus szemantikai eltérés
- azonnali összeszerelési és kontextusablak problémák
- logikai összeomlás és túlságosan magabiztos válaszok
- hosszú láncú és ügynökkoordinációs hibák
- többügynök memória és szerepsodródás
- telepítési és bootstrap rendelési problémák

Az ötlet egyszerű:

1. Amikor egy rossz választ vizsgál, rögzítse:
   - felhasználói feladat és kérés
   - útvonal vagy szolgáltató kombinációja az OmniRoute-ban
   - bármely lefelé használt RAG kontextus (lekért dokumentumok, eszközhívások stb.)
2. Térképezze le az incidenst egy vagy két WFGY ProblemMap számra (`No.1` … `No.16`).
3. Tárolja a számot saját irányítópultjában, runbookjában vagy eseménykövetőjében az OmniRoute naplók mellett.
4. Használja a megfelelő WFGY oldalt annak eldöntésére, hogy módosítania kell-e a RAG-vermet, a retrievert vagy az útválasztási stratégiát.

A teljes szöveg és a konkrét receptek itt élnek (MIT licenc, csak szöveg):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Figyelmen kívül hagyhatja ezt a szakaszt, ha nem futtat RAG- vagy ügynökfolyamatokat az OmniRoute mögött.---

## Still Stuck?

-**GitHub-problémák**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architektúra**: A belső részletekért lásd: [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) -**API-referencia**: Lásd: [`docs/API_REFERENCE.md`](API_REFERENCE.md) az összes végponthoz -**Egészségügyi irányítópult**: Az**Irányítópult → Egészség**menüpontban ellenőrizze a valós idejű rendszerállapotot -**Fordító**: Használja az**Irányítópult → Fordító**lehetőséget a formátumhibák elhárításához
