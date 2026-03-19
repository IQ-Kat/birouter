# Odstraňování problémů

🌐 **Jazyky:** 🇺🇸 [angličtina](TROUBLESHOOTING.md) | 🇧🇷 [Português (Brazílie)](i18n/pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](i18n/es/TROUBLESHOOTING.md) | 🇫🇷 [Français](i18n/fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](i18n/it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](i18n/ru/TROUBLESHOOTING.md) | 🇨🇳[中文 (简体)](i18n/zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](i18n/de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](i18n/in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](i18n/th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](i18n/uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](i18n/ar/TROUBLESHOOTING.md) | 🇯🇵[日本語](i18n/ja/TROUBLESHOOTING.md)| 🇻🇳 [Tiếng Việt](i18n/vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](i18n/bg/TROUBLESHOOTING.md) | 🇩🇰 [Dánsko](i18n/da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](i18n/fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](i18n/he/TROUBLESHOOTING.md) | 🇭🇺 [maďarština](i18n/hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonésie](i18n/id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](i18n/ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](i18n/ms/TROUBLESHOOTING.md) | 🇳🇱 [Nizozemsko](i18n/nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](i18n/no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugalsko)](i18n/pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](i18n/ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](i18n/pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](i18n/sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](i18n/sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipínec](i18n/phi/TROUBLESHOOTING.md) | 🇨🇿 [Čeština](i18n/cs/TROUBLESHOOTING.md)

Běžné problémy a řešení pro OmniRoute.

---

## Rychlé opravy

Problém | Řešení
--- | ---
První přihlášení nefunguje | Nastavit `INITIAL_PASSWORD` v `.env` (bez pevně zakódovaného výchozího nastavení)
Dashboard se otevírá na nesprávném portu | Nastavte `PORT=20128` a `NEXT_PUBLIC_BASE_URL=http://localhost:20128`
Žádné protokoly požadavků v sekci `logs/` | Nastavte `ENABLE_REQUEST_LOGS=true`
PŘÍSTUP: povolení zamítnuto | Nastavením `DATA_DIR=/path/to/writable/dir` přepíšete `~/.omniroute`
Strategie směrování se neukládá | Aktualizace na v1.4.11+ (oprava schématu Zod pro perzistenci nastavení)

---

## Problémy s poskytovateli

### "Jazykový model neposkytoval zprávy"

**Příčina:** Vyčerpání kvóty poskytovatele.

**Opravit:**

1. Zkontrolujte sledovač kvót na řídicím panelu
2. Použijte kombinaci se záložními úrovněmi
3. Přepnout na levnější/bezplatnou úroveň

### Omezení rychlosti

**Příčina:** Vyčerpání kvóty předplatného.

**Opravit:**

- Přidat záložní variantu: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Použijte GLM/MiniMax jako levnou zálohu

### Platnost tokenu OAuth vypršela

OmniRoute automaticky obnovuje tokeny. Pokud problémy přetrvávají:

1. Ovládací panel → Poskytovatel → Znovu připojit
2. Odstranění a opětovné přidání připojení poskytovatele

---

## Problémy s cloudem

### Chyby synchronizace s cloudem

1. Ověřte, zda `BASE_URL` odkazuje na vaši spuštěnou instanci (např. `http://localhost:20128` )
2. Ověřte, zda `CLOUD_URL` odkazuje na váš cloudový koncový bod (např. `https://omniroute.dev` ).
3. Udržujte hodnoty `NEXT_PUBLIC_*` zarovnané s hodnotami na straně serveru.

### Cloud `stream=false` Vrací 500

**Příznak:** `Unexpected token 'd'...` na cloudovém koncovém bodu pro nestreamovaná volání.

**Příčina:** Upstream vrací datovou část SSE, zatímco klient očekává JSON.

**Řešení:** Pro přímá volání z cloudu použijte `stream=true` . Lokální běhové prostředí zahrnuje záložní SSE→JSON.

### Cloud hlásí připojení, ale „neplatný klíč API“.

1. Vytvořte nový klíč z lokálního dashboardu ( `/api/keys` )
2. Spuštění synchronizace s cloudem: Povolit cloud → Synchronizovat nyní
3. Staré/nesynchronizované klíče mohou v cloudu stále vracet `401`

---

## Problémy s Dockerem

### Nástroj CLI se zobrazuje jako nenainstalovaný

1. Zkontrolujte běhová pole: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Pro přenosný režim: použijte cílový soubor image `runner-cli` (dodávané CLI)
3. Pro režim připojení hostitele: nastavte `CLI_EXTRA_PATHS` a připojte adresář hostitele bin jako pouze pro čtení.
4. Pokud `installed=true` a `runnable=false` : binární soubor byl nalezen, ale kontrola stavu selhala.

### Rychlé ověření za běhu

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Problémy s náklady

### Vysoké náklady

1. Zkontrolujte statistiky využití v sekci Nástěnka → Využití
2. Přepnout primární model na GLM/MiniMax
3. Pro nekritické úlohy použijte bezplatnou úroveň (Gemini CLI, iFlow).
4. Nastavení rozpočtů nákladů pro každý klíč API: Dashboard → API klíče → Rozpočet

---

## Ladění

### Povolit protokoly požadavků

V souboru `.env` nastavte `ENABLE_REQUEST_LOGS=true` . Protokoly se zobrazují v adresáři `logs/` .

### Zkontrolujte stav poskytovatele

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtimové úložiště

- Hlavní stav: `${DATA_DIR}/storage.sqlite` (poskytovatelé, kombinace, aliasy, klíče, nastavení)
- Použití: SQLite tabulky v `storage.sqlite` ( `usage_history` , `call_logs` , `proxy_logs` ) + volitelné `${DATA_DIR}/log.txt` a `${DATA_DIR}/call_logs/`
- Záznamy požadavků: `<repo>/logs/...` (pokud `ENABLE_REQUEST_LOGS=true` )

---

## Problémy s jističi

### Poskytovatel uvízl ve stavu OPEN (OTEVŘENO)

Pokud je jistič poskytovatele VYPNUTÝ, požadavky jsou blokovány, dokud neuplyne doba ochlazování.

**Opravit:**

1. Přejděte do **nabídky Ovládací panel → Nastavení → Odolnost**
2. Zkontrolujte kartu jističe u dotčeného poskytovatele
3. Kliknutím na **Obnovit vše** vynulujete všechny jističe nebo počkejte, až vyprší doba zpoždění.
4. Před resetováním ověřte, zda je poskytovatel skutečně dostupný.

### Poskytovatel neustále vypíná jistič

Pokud poskytovatel opakovaně přechází do stavu OTEVŘENO:

1. Zkontrolujte **v části Dashboard → Stav → Stav poskytovatele** vzorec selhání.
2. Přejděte do **Nastavení → Odolnost → Profily poskytovatelů** a zvyšte prahovou hodnotu selhání.
3. Zkontrolujte, zda poskytovatel změnil limity API nebo vyžaduje opětovné ověření.
4. Zkontrolujte telemetrii latence – vysoká latence může způsobit selhání z důvodu časového limitu.

---

## Problémy s přepisem zvuku

### Chyba „Nepodporovaný model“

- Ujistěte se, že používáte správný prefix: `deepgram/nova-3` nebo `assemblyai/best`
- Ověřte, zda je poskytovatel připojen v **nabídce Dashboard → Poskytovatelé.**

### Přepis vrací prázdný výsledek nebo selže

- Zkontrolujte podporované zvukové formáty: `mp3` , `wav` , `m4a` , `flac` , `ogg` , `webm`
- Ověřte, zda je velikost souboru v rámci limitů poskytovatele (obvykle &lt; 25 MB)
- Zkontrolujte platnost klíče API poskytovatele v kartě poskytovatele

---

## Ladění překladače

Pro ladění problémů s překladem formátu použijte **Dashboard → Translator** :

Režim | Kdy použít
--- | ---
**Dětské hřiště** | Porovnejte vstupní/výstupní formáty vedle sebe – vložte neúspěšný požadavek a podívejte se, jak se přeloží
**Tester chatu** | Odesílejte živé zprávy a kontrolujte kompletní datovou část požadavků/odpovědí včetně záhlaví
**Zkušební stolice** | Spusťte dávkové testy napříč kombinacemi formátů a zjistěte, které překlady jsou poškozené.
**Živý monitor** | Sledujte tok požadavků v reálném čase a zachyťte občasné problémy s překladem

### Běžné problémy s formátováním

- **Štítky myšlení se nezobrazují** – Zkontrolujte, zda cílový poskytovatel podporuje myšlení a nastavení rozpočtu myšlení.
- **Volání nástrojů se vynechávají** – Některé překlady formátů mohou odstranit nepodporovaná pole; ověřte v režimu Playground.
- **Chybí systémová výzva** – Claude a Gemini zpracovávají systémové výzvy odlišně; zkontrolujte překlad výstupu
- **SDK vrací nezpracovaný řetězec místo objektu** – Opraveno ve verzi 1.1.0: sanitizér odpovědí nyní odstraňuje nestandardní pole ( `x_groq` , `usage_breakdown` atd.), která způsobují selhání validace OpenAI SDK v Pydantic.
- **GLM/ERNIE odmítá `system` roli** — Opraveno ve verzi 1.1.0: normalizátor rolí automaticky slučoval systémové zprávy s uživatelskými zprávami pro nekompatibilní modely.
- **role `developer` nebyla rozpoznána** – Opraveno ve verzi 1.1.0: automaticky převedeno na `system` pro poskytovatele, kteří nepoužívají OpenAI
- **`json_schema` nefunguje s Gemini** — Opraveno ve verzi 1.1.0: `response_format` se nyní převádí na `responseMimeType` + `responseSchema` z Gemini.

---

## Nastavení odolnosti

### Automatické omezení rychlosti se nespouští

- Automatické omezení rychlosti se vztahuje pouze na poskytovatele klíčů API (ne na OAuth/předplatné)
- Ověřte **Nastavení → Odolnost → Profily poskytovatelů** mají povoleno automatické omezení rychlosti
- Zkontrolujte, zda poskytovatel vrací stavové kódy `429` nebo hlavičky `Retry-After`

### Ladění exponenciálního poklesu

Profily poskytovatelů podporují tato nastavení:

- **Základní zpoždění** — Počáteční doba čekání po prvním selhání (výchozí: 1 s)
- **Max. zpoždění** — Maximální doba čekání (výchozí: 30 s)
- **Násobitel** — O kolik se má zvýšit zpoždění za každou po sobě jdoucí chybu (výchozí: 2x)

### Stádo proti hromům

Když se na poskytovatele s omezenou rychlostí odesílá mnoho souběžných požadavků, OmniRoute použije mutex + automatické omezení rychlosti k serializaci požadavků a zabránění kaskádovým selháním. Toto je automatické pro poskytovatele klíčů API.

---

## Volitelná taxonomie selhání RAG / LLM (16 problémů)

Někteří uživatelé OmniRoute umisťují bránu před RAG nebo agent stacky. V těchto nastaveních je běžné vidět zvláštní vzorec: OmniRoute vypadá v pořádku (poskytovatelé aktivní, profily směrování v pořádku, žádná upozornění na limity rychlosti), ale konečná odpověď je stále nesprávná.

V praxi tyto incidenty obvykle pocházejí z následného RAG kanálu, nikoli ze samotné brány.

Pokud chcete sdílenou slovní zásobu pro popis těchto selhání, můžete použít WFGY ProblemMap, externí textový zdroj s licencí MIT, který definuje šestnáct opakujících se vzorců selhání RAG / LLM. Na obecné úrovni zahrnuje:

- drift vyhledávání a narušené hranice kontextu
- prázdné nebo zastaralé indexy a vektorové úložiště
- vkládání versus sémantický nesoulad
- problémy s assembly promptu a kontextovým oknem
- logický kolaps a přehnaně sebevědomé odpovědi
- selhání dlouhého řetězce a koordinace agentů
- paměť více agentů a posun rolí
- problémy s nasazením a objednáváním bootstrapů

Myšlenka je jednoduchá:

1. Při vyšetřování špatné odpovědi zaznamenejte:
    - úkol a požadavek uživatele
    - Kombinace trasy nebo poskytovatele v OmniRoute
    - jakýkoli kontext RAG použitý v následných fázích (načtené dokumenty, volání nástrojů atd.)
2. Namapujte incident na jedno nebo dvě čísla z WFGY ProblemMap ( `No.1` … `No.16` ).
3. Uložte číslo do vlastního řídicího panelu, runbooku nebo sledovače incidentů vedle protokolů OmniRoute.
4. Pro rozhodnutí, zda je potřeba změnit RAG stack, retriever nebo směrovací strategii, použijte odpovídající stránku WFGY.

Plný text a konkrétní recepty naleznete zde (licence MIT, pouze text):

[Soubor README pro mapu problémů WFGY](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Tuto část můžete ignorovat, pokud za OmniRoute nespouštěte RAG ani agenty.

---

## Stále v koncích?

- **Problémy s GitHubem** : [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architektura** : Viz [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) pro interní podrobnosti
- **Referenční informace k API** : Všechny koncové body naleznete v [`docs/API_REFERENCE.md`](API_REFERENCE.md)
- **Panel stavu** : Zkontrolujte **Panel stavu, kde** najdete stav systému v reálném čase.
- **Překladač** : Použijte **Dashboard → Překladač** k ladění problémů s formátem
