# Changelog (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Väliohjelmisto:**Ratkaistu loputon uudelleenohjaussilmukka kojelaudassa uusille tapauksille, kun vaatia kirjautumista ei ole käytössä.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Qoder API:n alkuperäinen integrointi:**Qoder Executor on täysin uudelleen muotoiltu ohittamaan vanhan COZY AES/RSA -salausalgoritmin ja reitittämään suoraan alkuperäiseen DashScope OpenAi -yhteensopivaan URL-osoitteeseen. Poistaa monimutkaiset riippuvuudet solmun salausmoduuleista ja parantaa samalla streamin tarkkuutta. -**Resilience Engine Rehaul:**Integroitu kontekstin ylivuoto, sulavia varaosia, ennakoiva OAuth-tunnuksen tunnistus ja tyhjän sisällön päästöjen esto (#990). -**Kontekstin mukaan optimoitu reititysstrategia:**Lisätty uusi älykäs reititysominaisuus, joka maksimoi kontekstiikkunoiden natiivisti automatisoiduissa yhdistelmäasetuksissa (#990).### 🐛 Bug Fixes

-**Responses API Stream Corruption:**Korjattu syväkloonausvirhe, jossa Anthropic/OpenAI-käännösrajat riisuivat "response."-spesifiset SSE-etuliitteet suoratoistorajoista (#992). -**Claude Cache Passthrough Alignment:**Kohdistetut CC-yhteensopivat välimuistimerkit johdonmukaisesti ylävirran Client Pass-Through -tilan kanssa, mikä säilyttää nopean välimuistin. -**Turbopack-muistivuoto:**Kiinnitetty Next.js-tiedostoon tiukka `16.0.10`, mikä estää muistivuotoja ja rakentaa vanhenemista viimeaikaisista Turbopackin hajautusmoduuliregressioista (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev-integraatio:**Integroitu models.dev mallin hinnoittelun, ominaisuuksien ja teknisten tietojen luotettavana ajonaikaisena lähteenä, ohittaen kovakoodatut hinnat. Sisältää asetusten käyttöliittymän synkronointivälien hallintaa varten, käännösjonot kaikille 30 kielelle ja vankan testikattavuuden. -**Tarjoajan alkuperäiset ominaisuudet:**Lisätty tuki alkuperäisten API-ominaisuuksien (esim. "systemInstructions_supported") ilmoittamiseen ja tarkistamiseen, mikä estää virheitä poistamalla virheelliset roolit. Tällä hetkellä määritetty Gemini Base- ja Antigravity OAuth -palveluntarjoajille. -**API Provider Advanced Settings:**Lisätty yhteyskohtaiset mukautetut User-Agent ohitukset API-avaintoimittajayhteyksille. Ohitus on tallennettu "providerSpecificData.customUserAgent"-tiedostoon, ja se koskee nyt vahvistustutkimuksia ja ylävirran suorituspyyntöjä.### 🐛 Bug Fixes

-**Qwen OAuth -luotettavuus:**Ratkaistiin useita OAuth-integraatioongelmia, mukaan lukien 400 Bad Request -estäjä vanhentuneissa tunnisteissa, varasukupolvi OIDC:n "access_token" -ominaisuuksien jäsentämiseen, kun "id_token" jätetään pois, malliluetteloiden etsintävirheet ja tiukka suodatus re-\*`Dashersco`X:n välttämiseksi. OpenAI-yhteensopivista päätepisteistä.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Valmistettu natiivi CRUD-elinkaariintegrointi edistyneelle Auto-Combo-moottorille (#955). -**Ydintoiminnot:**Korjattu uusien alkuperäisten automaattisten yhdistelmävaihtoehtojen puuttuvat käännökset (#955). -**Security Validation:**Poistettu käytöstä SQLite-automaattiset varmuuskopiointitehtävät natiivisti yksikkötestin CI-suorituksen aikana solmun 22 tapahtumasilmukan riippuvien muistivuotojen ratkaisemiseksi (#956). -**Ekosysteemin välityspalvelimet:**Valmiit eksplisiittiset integraatiokartoitusmallin synkronoinnin aikataulut, OAuth-syklit ja Token Check päivittyvät turvallisesti OmniRouten alkuperäisen järjestelmän ylävirran välityspalvelinten kautta (#953). -**MCP:n laajennettavuus:**Lisätty ja rekisteröity onnistuneesti uusi `omniroute_web_search` MCP-kehystyökalu pois beta-versiosta tuotantomalleihin (#951). -**Tokens Buffer Logic:**Lisätty ajonaikaiset konfigurointirajoitukset, jotka laajentavat määritettäviä tulo-/lähtötunnistepuskureita tarkkoja käytönseurantamittareita varten (#959).### 🐛 Bug Fixes

-**CodeQL-korjaus:**Täysin ratkaistu ja suojattu kriittisten merkkijonojen indeksointitoiminnot, jotka estävät palvelinpuolen pyyntöväärennösten (SSRF) taulukoita indeksoimasta heuristiikkaa yhdessä polynomialgoritmisen taaksepäinseurannan (ReDoS) kanssa syvällä välityspalvelinmoduulissa. -**Crypto Hashes:**Korvattu heikot vahvistamattomat vanhat OAuth 1.0 -tiivisteet vankilla HMAC-SHA-256-standardin vahvistusprimitiiveillä, jotka varmistavat tiukan pääsyn hallinnan. -**Sovellusliittymän rajasuojaus:**Oikein tarkistetut ja kartoitetut rakenteelliset reittisuojaukset, jotka pakottavat tiukan "isAuthenticated()"-väliohjelmistologiikkaan, joka kattaa uudemmat dynaamiset päätepisteet kohdistusasetusten manipuloinnin ja alkuperäisten taitojen lataamisen. -**CLI Ecosystem Compat:**Korjattu rikkinäiset ajonaikaiset jäsennyssidokset, jotka kaatuvat "jos" -ympäristön ilmaisimet tiukasti .cmd/.exe-reunatapausten yli sulavasti ulkoisille laajennuksille (#969). -**Välimuistiarkkitehtuuri:**Uudelleenfaktoroitu tarkka Analytics- ja järjestelmäasetusten kojelautaparametrien asettelurakenteen välimuisti ylläpitää vakaat uudelleenhydraation pysyvyysjaksot, jotka ratkaisevat visuaaliset kohdistamattomat tilan välähdykset (#952). -**Claude Caching Standards:**Normalisoidut ja tarkasti säilytetyt kriittiset lyhytkestoiset lohkomerkit. "Efemeraalit" välimuistissa olevat TTL-käskyt alavirran solmuille, jotka pakottavat standardien kanssa yhteensopivien CC-pyyntöjen kartoituksen puhtaasti ilman pudotettuja mittareita (#948). -**Sisäisten aliasten todennus:**Yksinkertaistetut sisäiset ajonaikaiset mappaukset, jotka normalisoivat Codexin valtuustietojen hyötykuorman haut globaalien käännösparametrien sisällä ja ratkaisevat 401 todentamatonta pudotusta (#958).### 🛠️ Maintenance

-**Käyttöliittymän löydettävyys:**Oikein säädetyt asetteluluokitukset, jotka erottavat selkeästi ilmaisten tason tarjoajien logiikan, mikä parantaa käyttöliittymän lajitteluvirtoja yleisillä API-rekisterisivuilla (#950). -**Käyttöönottotopologia:**Unified Docker -käyttöönoton artefaktit varmistavat, että juuri "fly.toml" vastaa odotettuja pilvi-ilmentymien parametreja heti valmiina ja käsittelee automaattisesti automaattisten käyttöönottojen skaalausta oikein. -**Kehitystyökalut:**Irrotetut LKGP-ajonaikaiset parametrit eksplisiittisiksi DB-kerroksen abstraktiovälimuistiapuohjelmiksi varmistaen tiukan testieristyksen peiton ydinvälimuistikerroille turvallisesti.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Kojelaudan automaattinen yhdistelmäpaneeli:**`/dashboard/auto-combo`-käyttöliittymä on täysin uudistettu, jotta se integroituu saumattomasti alkuperäisiin Dashboard-kortteihin ja standardoituun visuaaliseen täyteen/otsikoihin. Lisätty dynaamiset visuaaliset edistymispalkit, jotka kartoittavat mallin valinnan painomekanismeja. -**Settings Routing Sync:**Täysin avoimet kehittyneet reititys "prioriteetti" ja "painotettu" skeemakohteet sisäisesti yleisten asetusten varaluetteloissa.### Bug Fixes

-**Muistin ja taitojen kielisolmut:**Ratkaistiin tyhjät hahmontamistunnisteet muisti- ja taidotvaihtoehtoille suoraan yleisten asetusnäkymien sisällä kytkemällä kaikki asetukset.\*-kartoitusarvot sisäisesti en.json-tiedostoon (joka on myös yhdistetty epäsuorasti ristiinkäännöstyökaluja varten).### Internal Integrations

- Integroitu PR #946 - korjaus: säilytä Claude Code -yhteensopivuus vastausten muuntamisessa
- Integroitu PR #944 - fix(gemini): säilyttää ajatuksen allekirjoitukset antigravitaatiotyökalukutsuissa
- Integroitu PR #943 - korjaus: palauta GitHub Copilot -runko
- Integroitu PR #942 - Korjaa cc-yhteensopivat välimuistimerkit
- Integroitu PR #941 - Refaktori (auth): paranna NVIDIA-aliashakua + lisää LKGP-virheloki
- Integroitu PR #939 - Palauta Claude OAuth localhost -puhelujen takaisinsoitto
- _(Huomautus: PR #934 jätettiin pois syklistä 3.4.9 ydinkonfliktin regressioiden estämiseksi)_---

## [3.4.8] — 2026-04-03

### Turvallisuus

- Korjattiin täysin kaikki erinomaiset Github Advanced Security (CodeQL) -havainnot ja Dependabot-hälytykset.
- Korjattu epävarman satunnaisuuden haavoittuvuudet siirtymällä `Math.random`:sta `crypto.randomUUID()`:ään.
- Suojatut komentotulkkikomennot automaattisissa skripteissä merkkijonoinjektiosta.
- Siirretty haavoittuvia katastrofaalisia taaksepäin suuntautuvia RegEx-jäsennysmalleja chat-/käännösputkissa.
- Parannetut lähdön puhdistamisen ohjaimet React UI -komponenttien sisällä ja Server Sent Events (SSE) -tunnisteen lisäys.---

## [3.4.7] — 2026-04-03

### Ominaisuudet

- Lisätty kryptografiasolmu valvontaan ja MCP-kunnontarkistuksiin (#798)
- Vahvistettu malli-luettelo reitin käyttöoikeuskartoitus (`/models`) (#781)### Bug Fixes

- Korjattu Claude OAuth -tunnuksen päivitykset, jotka eivät säilyttäneet välimuistikonteksteja (#937)
- Korjattu CC-yhteensopivan palveluntarjoajan virheet, jotka tekevät välimuistissa olevista malleista tavoittamattomia (#937)
- Korjattu virheellisiin kontekstitaulukoihin liittyvät GitHub Executor -virheet (#937)
- Korjattu NPM-asennettujen CLI-työkalujen kuntotarkastuksen epäonnistumiset Windowsissa (#935)
- Korjattu hyötykuorman käännös, joka poistaa kelvollisen sisällön virheellisten API-kenttien vuoksi (#927)
- Korjattu ajonaikainen kaatuminen solmussa 25 koskien API-avaimen suorittamista (#867)
- Korjattu MCP-erillinen moduuliresoluutio (`ERR_MODULE_NOT_FOUND`) esbuildin kautta (#936)
- Korjattu NVIDIA NIM -reitityksen valtuustietojen resoluution aliaksen yhteensopimattomuus (#931)### Turvallisuus

- Lisätty turvallinen tiukka syöttörajasuojaus raakaa "shell: true" etäkoodin suorittamista vastaan.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Toimittajat:**Rekisteröidyt uudet kuvan, videon ja äänen luomisen tarjoajat yhteisön pyytämästä luettelosta (#926). -**Kojelaudan käyttöliittymä:**Lisätty erillinen sivupalkkinavigointi uusille Memory- ja Skills-moduuleille (#926). -**i18n:**Lisätty käännösmerkkijonot ja asettelukartoitukset 30 kielelle Muisti- ja Taidot-nimiavaruille.### 🐛 Bug Fixes

-**Kestävyys:**Esti välityspalvelimen katkaisijaa juuttumasta AUKI-tilaan määräämättömäksi ajaksi käsittelemällä suoria siirtymiä CLOSED-tilaan varayhdistelmäpoluilla (#930). -**Protokollan käännös:**Virtausmuuntaja korjattu desinfioimaan vastauslohkot odotetun _source_-protokollan perusteella toimittajan _target_-protokollan sijaan. Korjattiin Anthropics-mallit, jotka on kääritty OpenAI-hyötykuormiin, jotka kaasivat Claude Coden (#929). -**API-tiedot ja Gemini:**Korjattu "thought_signature" jäsennys "openai-to-gemini"- ja "claude-to-gemini"-kääntäjiin, mikä estää HTTP 400 -virheet kaikissa Gemini 3 -sovellusliittymän työkalukutsuissa. -**Toimittajat:**Puhdistettu ei-OpenAI-yhteensopiva päätepiste, joka estää kelvolliset ylävirran yhteydet (#926). -**Cache Trends:**Korjattu virheellinen kiinteistökartoitustietojen ristiriita, joka aiheutti Cache Trends -käyttöliittymän kaavioiden kaatumisen, ja purettu ylimääräiset välimuistin tietowidgetit (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**CLIProxyAPI Ecosystem Integration:**Lisätty "cliproxyapi" -suoritin, jossa on sisäänrakennettu moduulitason välimuisti ja välityspalvelinreititys. Esitteli kattavan Version Manager -palvelun, joka testaa automaattisesti kuntoa, lataa binaarit GitHubista, synnyttää eristettyjä taustaprosesseja ja hallitsee puhtaasti ulkoisten CLI-työkalujen elinkaarta suoraan käyttöliittymän kautta. Sisältää DB-taulukot välityspalvelimen määritystä varten, jotta ulkoisten OpenAI-pyyntöjen automaattinen SSRF-portitettu ristireititys voidaan ottaa käyttöön paikallisen CLI-työkalukerroksen kautta (#914, #915, #916). -**Qoder PAT -tuki:**Integrated Personal Access Tokens (PAT) -tuki suoraan paikallisen qodercli-siirron kautta vanhojen .cn-etäselainkokoonpanojen sijaan (#913). -**Gemini 3.1 Pro Preview (GitHub):**Lisätty "gemini-3.1-pro-preview" kanoninen eksplisiittinen mallituki natiivisti GitHub Copilot -toimittajaan säilyttäen samalla vanhemmat reititysaliakset (#924).### 🐛 Bug Fixes

-**GitHub Copilot Token Stabiliteetti:**Korjattiin Copilot-tunnuksen päivityssilmukka, jossa vanhentuneita tunnuksia ei sulautettu syvälle tietokantaan, ja poistettiin "reasoning_text"-kentät, jotka tuhosivat kuolemaan monen kierroksen keskustelujen antrooppiset lohkomuunnokset (#923). -**Yleinen aikakatkaisumatriisi:**Keskitetyt ja parametroidut pyyntöjen aikakatkaisut nimenomaisesti `REQUEST_TIMEOUT_MS`:stä estämään piilotetut (~300 s) oletushakupuskurit, jotka katkaisevat ennenaikaisesti pitkäikäiset SSE-suoratoistovastaukset raskailta päättelymalleilta (#918). -**Cloudflare Quick Tunnels -tila:**Korjattu vakava tilan epäjohdonmukaisuus, jossa uudelleenkäynnistetyt OmniRoute-esiintymät osoittivat virheellisesti tuhoutuneita tunneleita aktiivisina, ja oletusarvoisesti cloudflared-tunnelointi on HTTP/2 poistaakseen UDP-vastaanottopuskurin roskapostin (#925). -**i18n-käännösten korjaus (tšekki ja hindi):**Korjattu hindi-koodi KÄYTETTYÄ "in.jsonista" kanoniseen "hi.json"-muotoon, tarkistettu tšekkiläisen tekstin kartoitukset, purettu "untranslable-keys.json" korjataksesi CI/CD:n vääriä positiivisia vahvistuksia, ja 1 loi 8-asiakirjat kattaviin opasteisiin. (#912). -**Tokens Provider Recovery:**Korjattu se, että Qwen menetti tietyt resurssiUrl-päätepisteet automaattisen kuntotarkistuksen tunnuksen päivityksen jälkeen puuttuvien tietokannan syväyhdistysten vuoksi (#917). -**CC-yhteensopiva UX & Streaming:**Yhdisti Add CC/OpenAI/Anthropic-yhteensopivia toimintoja Anthropic UI -käsittelyn ympärille, pakotti CC-yhteensopivat alkupään pyynnöt käyttää SSE:tä, mutta palauttaa silti suoratoisto- tai ei-suoratoistovastauksia asiakkaan pyynnön perusteella, poistettiin CC-malliluettelon määritykset/tuontituki ja otettiin käyttöön nimenomaisen CC-mallin peilauksen tuki-, mallin poisto-tuki- OAuth Claude Code -rekisteriluettelo (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Lähetä `response.completed` oikeilla `input_tokens`/`output_tokens`-kentillä Codex CLI -asiakkaille, korjaa tunnuksen käytön näyttö (#909 – kiitos @christopher-s). -**SQLite WAL Checkpoint on Shutdown:**Huuhtele WAL-muutokset ensisijaiseen tietokantatiedostoon sulavan sammutuksen/uudelleenkäynnistyksen aikana, mikä estää tietojen katoamisen Dockerin kontin pysähtyessä (#905 - kiitos @rdself). -**Graceful Shutdown Signal:**Muutettu /api/restart- ja /api/shutdown-reitit process.exit(0)-reiteistä processs.kill(SIGTERM)-muotoon, mikä varmistaa, että sammutuskäsittelijä toimii ennen poistumista. -**Docker Stop Grace Period:**Lisätty "stop_grace_period: 40s" Docker Compose -tiedostoihin ja "--stop-timeout 40" Docker-ajoesimerkkeihin.### 🛠️ Maintenance

- Suljettiin 5 ratkaistua/ei-bug-ongelmaa (#872, #814, #816, #890, #877).
- Triaged 6 ongelmaa tarvetietopyyntöjen kanssa (#892, #887, #886, #865, #895, #870).
- Vastasi CLI-tunnistuksen seurantaongelmaan (#863) avustajan ohjeilla.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravity-muisti ja -taidot:**Valmis etämuisti ja taitojen lisäys Antigravity-palveluntarjoajalle välityspalvelinverkkotasolla. -**Claude Code -yhteensopivuus:**Rakennettu natiivisti piilotettu yhteensopivuussilta Claude Codelle, joka välittää työkalut ja muotoilut puhtaasti läpi. -**Web Search MCP:**Lisätty "omniroute_web_search" -työkalu, jonka laajuus on "execute:search". -**Välimuistikomponentit:**Toteutetut dynaamiset välimuistikomponentit, jotka käyttävät TDD:tä. -**Käyttöliittymä ja mukauttaminen:**Lisätty mukautettu favicon-tuki, ulkoasuvälilehdet, langallinen valkoinen merkintä sivupalkkiin ja lisätty Windsurf-oppaan vaiheet kaikilla 33 kielellä. -**Lokin säilyttäminen:**Yhtenäinen pyyntölokin säilyttäminen ja artefaktit natiivisti. -**Mallin parannukset:**Lisätty selkeä "contextLength" kaikille opencode-zen-malleille. -**i18n ja käännökset:**Integroidut 33 kielen natiivikäännökset, mukaan lukien paikkamerkkien CI-vahvistukset ja kiinalaisen dokumentaation päivitykset (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth Mapping:**Palautettiin "id_token" -luottamus "access_tokeniin" ja otettiin käyttöön dynaaminen "resource_url" API-päätepisteen lisäys oikeaa alueellista reititystä varten (#900). -**Mallin synkronointimoottori:**Tallentui tiukan sisäisen palveluntarjoajan tunnuksen getCustomModels()-synkronointirutiineihin UI Channel Alias ​​-muodon sijaan, mikä estää SQLite-luetteloiden lisäysvirheet (#903). -**Claude Code & Codex:**Standardoidut ei-streaming-tyhjät vastaukset Anthropic-muotoillulle `(tyhjälle vastaukselle)` estämään CLI-välityspalvelimen kaatumiset (#866). -**CC-yhteensopiva reititys:**Ratkaistu päällekkäinen `/v1'-päätepisteen törmäys polun ketjuttamisen aikana yleisille Claude Code -yhdyskäytäville (#904).
-**Antigravity Dashboards:**Estetty rajoittamattomia kiintiömalleja rekisteröitymästä väärin 100 %:n käyttörajatiloihin palveluntarjoajan käyttöliittymässä (#857).
-**Claude Image Passthrough:**Korjatut Claude-malleista puuttuvat kuvalohkojen läpiviennit (#898).
-**Gemini CLI Routing:**Ratkaistu 403 valtuutuksen lukitus ja sisällön kertymisongelmat päivittämällä projektin tunnus "loadCodeAssist" (#868) avulla.
-**Antigravitaatiovakaus:**Korjatut mallien käyttöoikeusluettelot, pakotetut 404-lukitukset, kiinteät 429-sarjat, jotka lukitsevat vakioliitännät, ja rajatut "gemini-3.1-pro"-lähtötunnisteet (#885).
-**Provider Sync Cadence:**Korjattu palveluntarjoajan synkronointirajoitukset sisäisen ajastimen kautta (#888).
-**Käyttöpaneelin optimointi:**Ratkaistu käyttöliittymän `/dashboard/limits' jumiutuminen, kun yli 70 tiliä käsitellään kappaleiden rinnakkaistoiminnolla (#784). -**SSRF Hardening:**Pakotettiin tiukka SSRF-IP-alueen suodatus ja estettiin `::1` loopback-liitäntä. -**MIME-tyypit:**Standardoitu "mime_type" snake_case-muotoon vastaamaan Gemini API -määrityksiä. -**CI-vakautus:**Korjattu epäonnistuneet analytiikka-/asetukset Playwright-valitsimet ja -pyynnöt, jotta GitHub Actions E2E -ajot kulkevat luotettavasti paikallisten käyttöliittymien ja kytkinpohjaisten ohjainten välillä. -**Deterministiset testit:**Poistettiin päivämääräherkät kiintiötestit Copilotin käyttötesteistä ja kohdistettiin idempotenssi-/malliluettelotestit yhdistetyn ajonaikaisen käyttäytymisen kanssa. -**MCP Type Hardening:**Poistettu nollabudjetin eksplisiittiset "kaikki" regressiot MCP-palvelintyökalun rekisteröintipolusta. -**Mallin synkronointimoottori:**Ohitettu tuhoava "korvaa" ohittaa, kun toimittajan automaattinen synkronointi tuottaa tyhjän malliluettelon, mikä säilyttää dynaamisten luetteloiden vakauden (#899).### 🛠️ Maintenance

-**Pipeline Logging:**Tarkennetut putken kirjaamisen artefaktit ja valvoa säilytysrajoituksia (#880). -**AGENTS.md:n peruskorjaus:**Tiivistetty 297→153 rivistä. Lisätty rakennus-/testaus-/tyyliohjeet, koodityönkulut (Prettier, TypeScript, ESLint) ja leikatut monisanaiset taulukot (#882). -**Release Branch Integration:**Yhdisti aktiiviset ominaisuushaarat "release/v3.4.2":ksi nykyisen "main" päälle ja vahvisti haaran nukka-, yksikkö-, peitto-, koonti- ja CI-tilan E2E-ajoilla. -**Testaus:**Lisätty vitest-määritys komponenttien testausta varten ja Playwright-määritykset asetusten vaihtoihin. -**Dokumentin päivitykset:**Laajennettiin juuri readmes-tiedostoja, käännettiin kiinalaiset asiakirjat alkuperäisesti ja siivottiin vanhentuneet tiedostot.## [3.4.1] - 2026-03-31

> [!VAROITUS]
> **MUUTOKSEEN KATKEVAT: Pyynnön loki-, säilytys- ja kirjausympäristömuuttujat on suunniteltu uudelleen.**
> Ensimmäisellä käynnistyksellä päivityksen jälkeen OmniRoute arkistoi vanhat pyyntölokit hakemistosta DATA_DIR/logs/, vanhat DATA_DIR/call_logs/ ja DATA_DIR/log.txt tiedostoon DATA_DIR/log_archives/\*.zipified ja poistaa sitten uuden unprecified-muodon. kohdassa DATA_DIR/call_logs/.### ✨ New Features

-**.ENV-siirtoapuohjelma:**Sisältää scripts/migrate-env.mjs-tiedoston, joka siirtää saumattomasti <v3.3-määritykset v3.4.x-tiukkojen suojausrajoitusten (FASE-01) mukaisiksi ja korjaa lyhyiden JWT_SECRET-esiintymien aiheuttamat käynnistyskaatumiset. -**Kiro AI -välimuistin optimointi:**Toteutettu deterministinen "conversationId"-sukupolvi (uuidv5) mahdollistaa AWS Builder ID -kehotteen välimuistin oikein kutsujen välillä (#814). -**Kojelaudan käyttöliittymän palauttaminen ja yhdistäminen:**Ratkaistu sivupalkin logiikka jättämällä pois Debug-osio ja tyhjennetty Nextjs-reititysvaroitukset siirtämällä erilliset `/dashboard/mcp`- ja `/dashboard/a2a` -sivut nimenomaisesti upotettuihin Endpoint Proxy -käyttöliittymäkomponentteihin. -**Yhdistetyt pyyntölokin artefaktit:**Pyyntöloki tallentaa nyt yhden SQLite-indeksirivin ja yhden JSON-artefaktin pyyntöä kohden kohtaan DATA_DIR/call_logs/, ja samaan tiedostoon on upotettu valinnainen liukuhihnakaappaus. -**Kieli:**Parannettu kiinankielistä käännöstä (#855) -**Opencode-Zen-mallit:**Lisätty 4 ilmaista mallia opencode-zen-rekisteriin (#854) -**Testit:**Lisätty yksikkö- ja E2E-testit asetusten vaihtoille ja virheenkorjauksille (#850)### 🐛 Bug Fixes

-**429 Kiintiön jäsentäminen:**Jäsennetyt pitkät kiintiön palautusajat virhekappaleista oikeiden peruutusten kunnioittamiseksi ja nopeusrajoitettujen tilikieltojen estämiseksi (#859) -**Kehotevälimuisti:**Säilötyt asiakkaan "cache_control"-otsikot kaikille Claude-protokollan tarjoajille (kuten Minimax, GLM ja Bailian), jotka tunnistavat välimuistin tuen oikein (#856) -**Mallin synkronointilokit:**Vähentynyt lokiroskaposti tallentamalla "synkronointimalleja" vain, kun kanava todella muuttaa luetteloa (#853) -**Provider Quota & Token Parsing:**Antigravity-rajoituksia vaihdettiin käyttämään "retrieveUserQuota" natiivisti ja oikein kartoitettuja Claude-tunnuksen päivityshyötykuormia URL-koodattuihin lomakkeisiin (#862) -**Nopeutta rajoittava vakaus:**Universalisoi 429 Retry-After -jäsennysarkkitehtuurin rajoittamaan palveluntarjoajan aiheuttamat jäähtymiset 24 tunnin kohdalla (#862) -**Dashboard Limit Rendering:**Uudelleen arkkitehtuuri / dashboard/limits -kiintiökartoitus renderöimään välittömästi osien sisällä, mikä korjaa suuren käyttöliittymän jäätymisviiveen tileissä, joissa on yli 70 aktiivista yhteyttä (#784) -**QWEN OAuth -valtuutus:**Yhdistettiin OIDC `id_token' ensisijaiseksi API Bearer -tunnukseksi Dashscope-pyyntöille, mikä korjaa välittömästi 401 luvattomat virheet tilien yhdistämisen tai tunnuksien päivittämisen jälkeen (#864) -**ZAI-sovellusliittymän vakaus:**Kovettunut palvelinlähetettyjen tapahtumien kääntäjä, joka palaa sulavasti tyhjiin merkkijonoihin, kun DeepSeek-palveluntarjoajat suoratoistavat matemaattisesti tyhjää sisältöä päättelyvaiheiden aikana (#871) -**Claude Code/Codex Translations:**Suojatut ei-streaming-hyötykuorman muunnokset ylävirran Codex-työkalujen tyhjiltä vastauksilta välttäen katastrofaaliset tyyppivirheet (#866) -**NVIDIA NIM -renderöinti:**Ehdollisesti poistettu identtiset palveluntarjoajan etuliitteet, joita äänimallit työntää dynaamisesti, mikä eliminoi päällekkäiset nim/nim-tunnisterakenteet, jotka heittävät 404:n Media Playgroundiin (#872)### ⚠️ Breaking Changes

-**Pyyntölokin asettelu:**Poistettiin vanhat monitiedostoiset DATA*DIR/logs/-pyyntöloki-istunnot ja DATA_DIR/log.txt-yhteenvetotiedosto. Uudet pyynnöt kirjoitetaan yksittäisinä JSON-artefakteina hakemistoon DATA_DIR/call_logs/YYYY-MM-DD/. -**Lokiympäristömuuttujat:**Korvattu `LOG**`, `ENABLE*REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` ja PROXY_LOG_MAX_ENTRIES uudella APP_LOG**LOG`TION-malleilla ja.
-**Pipeline Toggle Setting:**Korvattiin vanha `detailed_logs_enabled`-asetus`call_log_pipeline_enabled`. Uudet liukuhihnan tiedot upotetaan pyyntöartefaktin sisään sen sijaan, että ne tallennettaisiin erillisinä "request_detail_logs" -tietueina.### 🛠️ Maintenance

-**Vanha pyyntölokin päivitysvarmuuskopio:**Päivitykset arkistoivat nyt vanhat data/logs/-, vanhat data/call_logs/- ja data/log.txt-asettelut DATA_DIR/log_archives/\*.zip-kansioon ennen vanhentuneen rakenteen poistamista. -**Streaming-käytön pysyvyys:**Suoratoistopyynnöt kirjoittavat nyt yhden `usage_history`-rivin valmistuessaan sen sijaan, että lähettäisivät päällekkäisen käynnissä olevan käyttörivin tyhjillä tilan metatiedoilla. -**Lokien seuranta:**Liukulinjalokit eivät enää kaappaa 'LÄHDEPYYNTÖ', pyyntöjen artefaktimerkinnät kunnioittavat nyt 'CALL_LOG_MAX_ENTRIES', ja sovelluslokiarkistot kunnioittavat nyt tiedostoa 'APP_LOG_MAX_FILES'.---

## [3.4.0] - 2026-03-31

### Ominaisuudet

-**Tilauksen käyttöanalyysi:**Lisätty kiintiön tilannekuvan aikasarjan seuranta, Provider Utilisation- ja Combo Health -välilehdet, joissa on uudelleenkaavioiden visualisoinnit, ja vastaavat API-päätepisteet (#847) -**SQLite Backup Control:**Uusi `OMNIROUTE_DISABLE_AUTO_BACKUP` env-merkki automaattisen SQLite-varmuuskopioinnin poistamiseksi käytöstä (#846) -**Mallirekisterin päivitys:**Lisätty "gpt-5.4-mini" Codex-toimittajan mallivalikoimaan (#756) -**Provider Limit Tracking:**Seuraa ja näytä, milloin palveluntarjoajan hintarajat on viimeksi päivitetty tiliä kohti (#843)### 🐛 Bug Fixes

-**Qwen Auth -reititys:**Uudelleenreititys Qwen OAuth -päätökset DashScope API:sta Web Inference API:hen (`chat.qwen.ai`), valtuutusvirheiden ratkaiseminen (#844, #807, #832) -**Qwen Auto-Retry Loop:**Lisätty kohdistettu 429 kiintiö ylitetty backoff käsittely "chatCore" suojaa purskepyyntöjä -**Codex OAuth Fallback:**Nykyaikainen selaimen ponnahdusikkunoiden esto ei enää pidätä käyttäjää; se palaa automaattisesti manuaaliseen URL-osoitteen syöttämiseen (#808) -**Claude Token Refresh:**Anthropicin tiukkoja sovellus/json-rajoja kunnioitetaan nyt tunnuksen luomisen aikana koodattujen URL-osoitteiden sijaan (#836) -**Codex Messages Schema:**Poistettuja puristisia "viestejä" ruiskutetaan alkuperäisistä läpivientipyynnöistä välttääkseen rakenteelliset hylkäykset ChatGPT:stä alkupään (#806) -**CLI Detection Size Limit:**Node binääriskannauksen yläraja nousi turvallisesti 100 megatavusta 350 megatavuun, jolloin VPS-ajonaika (#809) pystyi havaitsemaan oikein raskaat itsenäiset työkalut, kuten Claude Code (229 Mt) ja OpenCode (153 Mt) -**CLI-ajoympäristö:**CLI-kokoonpanojen palautettu kyky kunnioittaa käyttäjän ohituspolkuja (`CLI_{PROVIDER}_BIN`) ohittaen tiukat polkuun sidotut etsintäsäännöt -**Nvidian otsikkoristiriidat:**Prompt_cache_key-ominaisuudet poistettiin ylävirran otsikoista, kun soitettiin ei-antrooppisille palveluntarjoajille (#848) -**Codex Fast Tier Toggle:**Palautettu Codex-palvelutason vaihtokontrasti valotilassa (#842) -**Testausinfrastruktuuri:**Päivitetty t28-model-catalog-updates -testi, joka odotti virheellisesti vanhentuneen DashScope-päätepisteen Qwenin alkuperäisessä rekisterissä---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Muokattu palveluntarjoajan kierto:**Integroitu "getRotatingApiKey" DefaultExecutoriin sisäisesti, mikä varmistaa, että "extraApiKeys"-kierto käynnistyy oikein mukautetuille ja yhteensopiville alkupään tarjoajille (#815)---

## [3.3.8] - 2026-03-30

### Ominaisuudet

-**Mallien sovellusliittymän suodatus:**Päätepiste `/v1/models' suodattaa nyt luettelonsa dynaamisesti valtuutukseen: Bearer <token> -sidottujen käyttöoikeuksien perusteella, kun rajoitettu käyttöoikeus on päällä (#781) -**Qoder-integraatio:**Qoder AI:n alkuperäinen integrointi korvaa alkuperäiset iFlow-alustan kartoitukset (#660) -**Prompt Cache Tracking:**Lisätty seurantaominaisuudet ja käyttöliittymän visualisointi (tilastokortti) semanttista ja nopeaa välimuistia varten Dashboard-käyttöliittymässä### 🐛 Bug Fixes

-**Välimuistin hallintapaneelin koko:**Parannettu käyttöliittymän asettelukokoja ja kontekstiotsikoita edistyneille välimuistisivuille (#835) -**Virheenkorjauksen sivupalkin näkyvyys:**Korjattu ongelma, jossa virheenkorjauskytkin ei näyttänyt tai piilottanut sivupalkin virheenkorjaustietoja oikein (#834) -**Gemini-mallin etuliite:**Muokattu nimiavaruuden varaosaa siten, että se reitittää oikein gemini-cli/:n kautta gc/:n sijaan alkuvirran speksien noudattamiseksi (#831) -**OpenRouter Sync:**Parannettu yhteensopivuussynkronointi, joka mahdollistaa käytettävissä olevien mallien luettelon automaattisesti syöttämisen oikein OpenRouterista (#830) -**Streaming Hyötykuormien kartoitus:**Päättelykenttien uudelleenserialointi ratkaisee natiivisti ristiriitaaliaspolut, kun tulos suoratoistaa reunalaitteisiin---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Uudelleenjärjestetty luotu "opencode.json" käyttää @ai-sdk/openai-yhteensopivaa tietuepohjaista skeemaa "optioilla" ja "malleja" objektikarttoina tasaisten taulukoiden sijaan, mikä korjaa asetusten vahvistusvirheet (#816) -**i18n Missing Keys:**Lisätty puuttuva "cloudflaredUrlNotice"-käännösavain kaikkiin 30 kielitiedostoon, jotta voidaan estää MISSING_MESSAGE-konsolivirheet Päätepiste-sivulla (#823).---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Token Accounting:**Sisällytti välimuistin välimuistitunnukset turvallisesti historiallisten käyttösyötteiden laskelmiin oikeiden kiintiöiden vähentämiseksi (PR #822) -**Yhdistelmätestausanturit:**Korjattu yhdistelmätestauslogiikan vääriä negatiivisia virheitä ratkaisemalla jäsennys vain perusteluihin perustuville vastauksille ja mahdollistanut massiivisen rinnastamisen Promise.all:n kautta (PR #828) -**Docker Quick Tunnels:**Upotetut vaaditut ca-sertifikaatit perusajonaikaiseen säilöön Cloudflared TLS -käynnistysvirheiden ja yleisten poistumiskoodien korvaavien vakioverkkovirheiden ratkaisemiseksi (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini Quota Tracking:**Lisätty reaaliaikainen Gemini CLI -kiintiön seuranta "retrieveUserQuota" API:n kautta (PR #825) -**Välimuistin hallintapaneeli:**Paranneltu välimuistin hallintapaneeli näyttää nopeat välimuistitiedot, 24 tunnin trendit ja arvioidut kustannussäästöt (PR #824)### 🐛 Bug Fixes

-**Käyttäjäkokemus:**Poistettu invasiiviset automaattisesti avautuvat OAuth-modaalisilmukat karuilta palveluntarjoajan yksityiskohtaisilta sivuilta (PR #820) -**Riippuvuuspäivitykset:**Virheelliset ja lukitut riippuvuudet kehitys- ja tuotantopuille, mukaan lukien Next.js 16.2.1, Recharts ja TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A-työnkulut:**Lisätty deterministinen FSM-orkesteri monivaiheisiin agenttien työnkulkuihin. -**Graceful Degradation:**Lisätty uusi monikerroksinen varakehys ydintoimintojen säilyttämiseksi osittaisten järjestelmäkatkosten aikana. -**Config Audit:**Lisätty auditointiketju erontunnistimella muutosten seuraamiseksi ja asetusten palautusten mahdollistamiseksi. -**Provider Health:**Lisätty palveluntarjoajan vanhenemisen seuranta ennakoivilla käyttöliittymävarotuksilla vanhentuvista API-avaimista. -**Adaptiivinen reititys:**Lisätty mukautuva äänenvoimakkuuden ja monimutkaisuuden ilmaisin ohittamaan reititysstrategiat dynaamisesti kuormituksen perusteella. -**Provider Diversity:**Toteutettu tarjoajien diversiteettipisteytys Shannon-entropian avulla kuormituksen jakautumisen parantamiseksi. -**Automaattisten rajoitusten poistaminen käytöstä:**Lisätty Kiellettyjen tilien automaattinen käytöstäpoisto -asetuskytkin Resilience-hallintapaneeliin.### 🐛 Bug Fixes

-**Codex- ja Claude-yhteensopivuus:**Korjattu käyttöliittymän varaosia, korjattu Codexin ei-suoratoisto-integraatioongelmia ja ratkaistu CLI-ajonaikainen tunnistus Windowsissa. -**Release Automation:**GitHub Actionsin Electron App -koontiversion edellyttämät laajennetut käyttöoikeudet. -**Cloudflare Runtime:**Cloudflared-tunnelin komponenttien oikeita ajonaikaisen eristyksen poistumiskoodeja on korjattu.### 🧪 Tests

-**Test Suite -päivitykset:**Laajennettu testikattavuus äänenvoimakkuuden ilmaisimille, palveluntarjoajien monimuotoisuudelle, konfigurointitarkastukselle ja FSM:lle.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD-luotettavuus:**GitHub-toiminnot on korjattu vakaisiin riippuvuusversioihin ("actions/checkout@v4", "actions/upload-artifact@v4") ennalta ilmoittamattomien rakentajaympäristöjen vanhenemisen vähentämiseksi. -**Image Fallbacks:**Korvattiin mielivaltaiset varaketjut ProviderIcon.tsx:ssä eksplisiittisellä omaisuuden tarkistuksella estääkseen käyttöliittymän <Image>-komponenttien lataamisen tiedostoille, joita ei ole olemassa, mikä eliminoi 404-virheet kojelaudan konsolin lokeissa (#745). -**Järjestelmänvalvojan päivitys:**Dynaaminen lähdeasennuksen tunnistus kojelaudan päivitykselle. Poistaa "Päivitä nyt" -painikkeen turvallisesti käytöstä, kun OmniRoute on rakennettu paikallisesti npm:n sijaan, jolloin kehotetaan "git pull" (#743). -**Update ERESOLVE Error:**Lisätty "package.json" ohittaa "react"/"react-dom" ja otettu käyttöön "--legacy-peer-deps" sisäisissä automaattisissa päivitysskripteissä ratkaisemaan katkeavat riippuvuuspuuristiriidat "@lobehub/ui" kanssa.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare-tunnelit:**Cloudflare Quick Tunnel -integraatio kojelaudan ohjaimilla (PR #772). -**Diagnostiikka:**Semanttisen välimuistin ohitus live-yhdistelmätesteihin (PR #773).### 🐛 Bug Fixes

-**Suoratoiston vakaus:**Käytä FETCH_TIMEOUT_MS-toimintoa suoratoistopyyntöjen ensimmäiseen fetch()-kutsuun estääksesi 300s Node.js TCP:n aikakatkaisun aiheuttamasta hiljaisten tehtävien virheitä (#769). -**i18n:**Lisää puuttuvat "windsurf"- ja "copilot"-merkinnät "toolDescriptions"-kohtaan kaikissa 33 kielitiedostossa (#748). -**GLM Coding Audit:**Täydellinen palveluntarjoajan tarkastus, joka korjaa ReDoS-haavoittuvuudet, kontekstiikkunoiden koon (128k/16k) ja mallirekisterin synkronoinnin (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Varakäsittelykorjaus `type: "text"-elementeille, jotka sisältävät nolla- tai tyhjiä tietojoukkoja, jotka aiheuttivat 400-hylkäyksen (#742). -**Avoin koodi:**Päivitä skeeman kohdistus yksittäiseen "palveluntarjoajaan" vastaamaan virallisia tietoja (#774). -**Gemini CLI:**Lisää puuttuvat loppukäyttäjäkiintiön otsikot estäen 403:n valtuutuksen lukituksen (#775). -**DB Recovery:**Refaktoroi moniosainen hyötykuorma tuodaan raakaan binääriin puskuroituihin matriisiin käänteisen välityspalvelimen enimmäisrungon rajoitusten ohittamiseksi (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Release Stabilization**— Valmis v3.2.9-julkaisu (yhdistelmädiagnostiikka, laatuportit, Gemini-työkalun korjaus) ja luotiin puuttuva git-tunniste. Yhdisti kaikki vaiheittaiset muutokset yhdeksi atomijulkaisusitoumukseksi.### 🐛 Bug Fixes

-**Automaattinen päivitystesti**— Korjattu `buildDockerComposeUpdateScript` -testivahvistus vastaamaan laajentamattomia komentotulkkimuuttujaviittauksia (`$TARGET_TAG`, `${TARGET_TAG#v}`) luodussa käyttöönottokomentosarjassa, linjassa v3.2:n uudelleenmuutetun mallin kanssa. -**Circuit Breaker Test**— Kovetettu "combo-circuit-breaker.test.mjs" lisäämällä "maxRetries: 0" estämään uudelleenyritysten inflaatio vääristämästä vikalaskennan väitteitä katkaisijan tilan siirtymien aikana.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Yhdistelmädiagnostiikka**– Esitteli live-testin ohituslipun (`forceLiveComboTest`), jonka avulla järjestelmänvalvojat voivat suorittaa todellisia alkuvaiheen terveystarkastuksia, jotka ohittavat kaikki paikalliset katkaisija- ja jäähdytystilan mekanismit, mikä mahdollistaa tarkan diagnosoinnin katkosten aikana (PR #759) -**Laatuportit**— Lisätty automaattinen vastauslaadun vahvistus komboihin ja virallisesti integroitu "claude-4.6" -mallituki ydinreititysskeemoihin (PR #762)### 🐛 Bug Fixes

-**Tool Definition Validation**— Korjattu Gemini API -integraatio normalisoimalla enum-tyypit työkalumäärittelyissä, mikä estää ylävirran HTTP 400 -parametrivirheet (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**- Integroitu irrotettu taustapäivitysprosessi Docker Compose -käyttöönotuksiin. Dashboard-käyttöliittymä seuraa nyt saumattomasti päivitysten elinkaaritapahtumia yhdistämällä JSON REST -vastaukset SSE-suoratoiston edistymispeittokuviin, mikä takaa kestävän ympäristöjen välisen luotettavuuden. -**Cache Analytics**— Korjattu nollametriikan visualisoinnin kartoitus siirtämällä semanttisen välimuistin telemetrialokit suoraan keskitettyyn seuranta-SQLite-moduuliin.### 🐛 Bug Fixes

-**Authentication Logic**— Korjattu virhe, jossa kojelaudan asetusten tallentaminen tai mallien lisääminen epäonnistui 401 Luvaton -virheen vuoksi, kun "requireLogin" oli poistettu käytöstä. API-päätepisteet arvioivat nyt oikein globaalin todennuksen vaihtokytkimen. Ratkaistu yleinen uudelleenohjaus aktivoimalla `src/middleware.ts' uudelleen.
-**CLI Tool Detection (Windows)**— Esti kohtalokkaat alustuspoikkeukset CLI-ympäristön tunnistuksen aikana saamalla "cross-spawn" ENOENT-virheet oikein. Lisää nimenomaiset tunnistuspolut tiedostolle \AppData\Local\droid\droid.exe.
-**Codex Native Passthrough**– Normalisoidut mallin käännösparametrit, jotka estävät kontekstin myrkytyksen välityspalvelimen läpivientitilassa, pakottavat yleiset "store: false" -rajoitukset erikseen kaikille Codex-alkuperäisille pyynnöille.
-**SSE Token Reporting**– Normalisoitu palveluntarjoajan työkalukutsun "finish_reason" -tunnistus, joka korjaa 0 %:n käyttöanalytiikka vain suoratoistovastauksille, joista puuttuu tiukat <VALMIS>-ilmaisimet.
-**DeepSeek <think> -tunnisteet**— Oti käyttöön eksplisiittisen `<think>`-poiminnan kartoituksen `responsesHandler.ts-tiedostossa, mikä varmistaa, että DeepSeek-päättelyvirrat vastaavat alkuperäisiä antrooppisia `<think>`-rakenteita.---

## [3.2.7] - 2026-03-29

### Fixed

-**Saumattomat käyttöliittymäpäivitykset**: Dashboardin "Päivitä nyt" -ominaisuus tarjoaa nyt suoraa, läpinäkyvää palautetta palvelimen lähettämien tapahtumien (SSE) avulla. Se suorittaa pakettien asennuksen, alkuperäisten moduulien uudelleenrakentamisen (parempi sqlite3) ja PM2 käynnistyy uudelleen luotettavasti samalla, kun se näyttää reaaliaikaisia ​​latauslaitteita hiljaisen roikkumisen sijaan.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API-avaimen paljastaminen (#740)**— Lisätty laajennettu API-avaimen kopiointikulku Api Manageriin, suojattu ympäristömuuttujalla ALLOW_API_KEY_REVEAL. -**Sivupalkin näkyvyyssäätimet (#739)**— Järjestelmänvalvojat voivat nyt piilottaa minkä tahansa sivupalkin navigointilinkin Ulkoasu-asetusten kautta vähentääkseen visuaalista sotkua. -**Strict Combo Testing (#735)**– Kovennettiin yhdistelmäkuormituksen päätepistettä vaatimaan reaaliaikaisia ​​tekstivastauksia malleilta pelkkien pehmeiden tavoitettavuussignaalien sijaan. -**Streamed Detailed Logs (#734)**— Vaihdettu yksityiskohtainen pyyntöloki SSE-virroille lopullisen hyötykuorman rekonstruoimiseksi, mikä säästää valtavia määriä SQLite-tietokannan kokoa ja puhdistaa merkittävästi käyttöliittymää.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Korjattiin todennusotsikkologiikka "minimax"-malleille OpenCode Gossa käyttämään "x-api-key" -tunnusta tavallisten siirtotietunnusten sijaan "/messages"-protokollassa.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Integroitu `xbps-src` -pakkausmalli ja ohjeet OmniRoute-sovelluksen alkuperäiseen kääntämiseen ja asentamiseen "parempi-sqlite3"-sidoksilla ristiinkäännöskohteen kautta.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**– Vanha iFlow-ydintoimittaja on siirretty kokonaan Qoder AI:hen ylläpitäen vakaat API-reititysominaisuudet.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Payload Invalid Argument (#731)**— Estetty "thoughtSignature"-taulukon lisäykset tavallisten Gemini "functionCall"-sekvenssien sisällä, jotka estävät agenttien reititysvirrat.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Provider Limits Quota UI (#728)**— Normalisoitu kiintiörajoitusten logiikka ja datamerkinnät Limits-rajapinnassa.### 🐛 Bug Fixes

-**Ydinreititysskeemat ja -vuodot**— Laajennettu "comboStrategySchema" tukee natiivisti "fill-first"- ja "p2c"-strategioita monimutkaisen yhdistelmämuokkauksen eston poistamiseksi natiivisti. -**Thinking Tags Extraction (CLI)**— Uudelleenjärjestetty CLI-tunnisteiden vastausten puhdistaja RegEx kaappaa mallin päättelyrakenteet virtojen sisällä välttäen rikkinäiset `<thinking>`-poiminnat, jotka rikkovat vastaustekstin tulostusmuotoa. -**Strict Format Enforcements**– Kovetettu putkilinjan desinfiointi, joten sitä sovelletaan yleisesti käännöstilan kohteisiin.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Nelivaiheinen pyyntölokiputkisto (#705)**— Refactoroitu lokin pysyvyys kattavien hyötykuormien tallentamiseksi neljässä erillisessä prosessivaiheessa: asiakaspyyntö, käännetyn palveluntarjoajan pyyntö, toimittajan vastaus ja käännetyn asiakkaan vastaus. Esitelty "streamPayloadCollector" tehokkaaseen SSE-virran katkaisuun ja hyötykuorman sarjoitukseen.### 🐛 Bug Fixes

-**Mobiilikäyttöliittymän korjaukset (#659)**— Esti kojelaudan taulukkokomponentteja rikkomasta asettelua kapeissa näkymäporteissa lisäämällä asianmukainen vaakasuora vieritys ja ylivuodon suojaus "DashboardLayoutiin". -**Claude Prompt -välimuistin korjaukset (#708)**— Varmistetut "cache_control"-lohkot Claude-Claude-varasilmukoissa säilytetään tarkasti ja siirretään turvallisesti takaisin Anthropic-malleihin. -**Gemini Tool Definitions (#725)**— Korjattu skeeman käännösvirheet määritettäessä yksinkertaisia ​​"objekti"-parametrityyppejä Gemini-funktiokutsussa.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Fallback Provider (#689)**— Kun kaikki yhdistelmämallit ovat lopussa (502/503), OmniRoute yrittää nyt konfiguroitavaa globaalia varamallia ennen virheen palauttamista. Ota käyttöön määrittämällä asetuksissa "globalFallbackModel".### 🐛 Bug Fixes

-**Korjaus #721**— Korjattu kontekstin kiinnityksen ohitus työkalukutsuvastausten aikana. Ei-suoratoistokoodaus käytti väärää JSON-polkua (`json.messages` → `json.choices[0].message`). Suoratoiston lisäys laukaisee nyt "finish_reason"-osien vain työkalukutsun suoratoistossa. "injectModelTag()" liittää nyt synteettisiä pin-viestejä ei-merkkijonosisällölle. -**Korjaus #709**— Vahvistettu jo korjatuksi (v3.1.9) — `system-info.mjs` luo hakemistoja rekursiivisesti. Suljettu. -**Korjaus #707**— Vahvistettu, että se on jo korjattu (v3.1.9) — tyhjä työkalun nimen puhdistus `chatCore.ts' -tiedostossa. Suljettu.### 🧪 Tests

- Lisätty 6 yksikkötestiä kontekstin kiinnittämiseen työkalukutsuvastauksilla (nollasisältö, taulukon sisältö, kiertomatka, uudelleeninjektio)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Välimuistin hallinnan käyttöliittymä**— Lisätty erillinen semanttisen välimuistin kojelauta osoitteeseen \`/dashboard/cache\` kohdistetulla API:n mitätöinnillä ja 31-kielisellä i18n-tuella (PR #701, @oyi77) -**GLM-kiintiön seuranta**— Lisätty reaaliaikainen käytön ja istuntojen kiintiöiden seuranta GLM-koodauksen (Z.AI) toimittajalle (PR #698, @christopher-s) -**Yksityiskohtaiset lokin hyötykuormat**— Langallinen nelivaiheinen putkistohyötykuorman sieppaus (alkuperäinen, käännetty, palveluntarjoajan vastaus, suoratoistettu delta) suoraan käyttöliittymään (PR #705, @rdself)### 🐛 Bug Fixes

-**Korjaus #708**— Estetty tunnuksen vuotaminen Claude Coden käyttäjille, jotka reitittävät OmniRouten kautta, säilyttämällä oikein alkuperäiset \`cache_control\`-otsikot Claude-to-Claude-läpiviennin aikana (PR #708, @tombii) -**Korjaus #719**— Aseta sisäiset todennusrajat \`ModelSyncSchedulerille\` estämään todentamattomat daemon-virheet käynnistyksen yhteydessä (PR #719, @rdself) -**Korjaus #718**– Uudelleen rakennettu tunnuksen renderöinti Provider Limits -käyttöliittymässä, mikä estää huonojen kiintiörajojen päällekkäisyyden (PR #718, @rdself) -**Korjaus #704**— Korjattu yhdistelmävarat, jotka rikkovat HTTP 400 -sisältökäytäntövirheitä, jotka estivät mallin kierron kuolleen reitityksen (PR #704, @rdself)### 🔒 Security & Dependencies

- \`path-to-regexp\` törmättiin \`8.4.0\` dependabot-haavoittuvuuksiin (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Korjaus #706**— Korjattu Tailwind V4:n "font-sans" ohituksen aiheuttama kuvakkeen vararenderöinti lisäämällä "!tärkeää" kohtaan ".material-symbols-outlined". -**Korjaus #703**— Korjattiin GitHub Copilotin rikkinäiset streamit ottamalla käyttöön "responses" "openai"-muotoon käännöksissä kaikissa mukautetuissa malleissa, joissa hyödynnetään "apiFormat: "responses"". -**Korjaus #702**— Korvattu kiinteähintainen käytön seuranta tarkoilla DB-hinnoittelulaskelmilla sekä suoratoisto- että ei-suoratoistovastauksille. -**Korjaus #716**- Claude-työkalukutsun käännöstila on puhdistettu, suoratoistoargumentit jäsennetään oikein ja OpenAI-työkalukutsut-kappaleet estetään toistamasta id-kenttää.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**– pakottaa automaattisesti merkkijonokoodatut numeeriset JSON-skeemarajoitukset (esim. "minimi": "1") oikeisiin tyyppeihin, mikä estää 400 virhettä Cursorista, Clinesta ja muista virheellisistä työkaluskeemoista lähettävistä asiakkaista. -**Työkalukuvauksen puhdistus**— Varmista, että työkalun kuvaukset ovat aina merkkijonoja; muuntaa "null"-, "undefined"- tai numeeriset kuvaukset tyhjiksi merkkijonoiksi ennen lähettämistä palveluntarjoajille. -**Tyhjennä kaikki mallit -painike**— Lisätty i18n-käännökset "Tyhjennä kaikki mallit" -palveluntarjoajatoimintoon kaikilla 30 kielellä. -**Codex Auth Export**- Lisätty Codex `auth.json` vienti- ja Apply-local-painikkeet saumattomaan CLI-integraatioon. -**Windsurf BYOK Notes**— Lisätty viralliset rajoitusvaroitukset Windsurf CLI -työkalukorttiin, joka dokumentoi BYOK-rajoitukset.### 🐛 Bug Fixes

-**Korjaus #709**— `system-info.mjs` ei enää kaatuu, kun tuloshakemistoa ei ole olemassa (lisätty `mkdirSync` rekursiivisella lipulla). -**Korjaus #710**— A2A "TaskManager" singleton käyttää nyt "globalThis"-toimintoa estääkseen tilavuodot Next.js API -reitin uudelleenkäännösten välillä kehittäjätilassa. E2E-testipaketti päivitetty käsittelemään 401:tä sulavasti. -**Korjaus #711**— Lisätty palveluntarjoajakohtainen "max_tokens"-rajoituksen valvonta ylävirran pyyntöihin. -**Korjaus #605 / #592**— Poista välityspalvelin-etuliite työkalujen nimistä ei-suoratoistossa olevissa Claude-vastauksissa; korjattu LongCat-vahvistus-URL-osoite. -**Puhelulokien enimmäisraja**— Päivitetty `getMaxCallLogs()', jossa on välimuistikerros, env var -tuki (`CALL_LOGS_MAX`) ja tietokanta-asetusten integrointi.### 🧪 Tests

- Testisarjaa laajennettu 964 → 1027 testistä (63 uutta testiä)
- Lisätty "schema-coercion.test.mjs" - 9 testiä numeerisen kentän pakottamiseksi ja työkalun kuvauksen puhdistamiseksi
- Lisätty "t40-opencode-cli-tools-integration.test.mjs" - OpenCode/Windsurf CLI-integraatiotestit
- Tehostettu ominaisuustestien haara, jossa on kattava kattavuustyökalu### 📁 New Files

| Tiedosto                                                 | Tarkoitus                                                        |
| -------------------------------------------------------- | ---------------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Kaavojen pakottaminen ja työkalun kuvaus desinfiointiapuohjelmat |
| `tests/unit/schema-coercion.test.mjs`                    | Yksikkötestit skeeman pakottamista varten                        |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI-työkalun integrointitestit                                   |
| `COVERAGE_PLAN.md`                                       | Testin kattavuuden suunnitteluasiakirja                          | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Korjattu cache_control-merkkien poistaminen Claude-passthrough-tilassa (Claude → OmniRoute → Claude), mikä sai Claude Coden käyttäjät kuluttamaan Anthropic API -kiintiönsä 5–10 kertaa nopeammin kuin suorat yhteydet. OmniRoute säilyttää nyt asiakkaan cache_control-merkit, kun sourceFormat ja targetFormat ovat molemmat Claude, mikä varmistaa, että välimuisti toimii oikein ja vähentää dramaattisesti tunnuksen kulutusta.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Platform Core:**Toteutettu globaali tilakäsittely piilomalleille ja yhdistelmälle, joka estää niitä sotkemasta luetteloa tai vuotamasta yhdistettyihin MCP-agentteihin (#681). -**Vakaus:**Korjatut suoratoiston kaatumiset, jotka liittyvät alkuperäisen Antigravity-palveluntarjoajan integrointiin, joka epäonnistui käsittelemättömien määrittelemättömien tilataulukoiden vuoksi (#684). -**Lokalisoinnin synkronointi:**Otettiin käyttöön täysin uusittu i18n-synkronointilaite, joka havaitsee puuttuvat sisäkkäiset JSON-ominaisuudet ja sovitti jälkikäteen 30 aluetta peräkkäin (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Suoratoiston vakaus:**Korjattu "hasValuableContent", joka palauttaa "undefined" tyhjille paloille SSE-virroissa (#676). -**Työkalun kutsuminen:**Korjattu ongelma tiedostossa "sseParser.ts", jossa useat työkalukutsut sisältävät ei-suorat Claude-vastaukset poistivat myöhempien työkalukutsujen tunnuksen virheellisen indeksipohjaisen duplikoinnin vuoksi (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Native Tool Name Restoration**– Työkalujen nimissä, kuten TodoWrite, ei enää ole välityspalvelinta Clauden läpivientivastauksissa (sekä suoratoistossa että ei-suoratoistossa). Sisältää yksikkötestin kattavuuden (PR #663, @coobabm) -**Tyhjennä kaikkien mallien aliasten puhdistus**— "Tyhjennä kaikki mallit" -painike poistaa nyt myös niihin liittyvät mallien aliakset, mikä estää haamumallit käyttöliittymässä (PR #664, @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**– Rate-rajoitetut tilit palautuvat nyt automaattisesti, kun niiden jäähtymisikkuna umpeutuu, mikä korjaa umpikujan, jossa korkea "backoffLevel" on jättänyt tilit pysyvästi etusijalle (PR #657, @brendandebeasi)### 🌍 i18n

-**Kiinankielisen käännöksen uudistus**– zh-CN.jsonin kattava uudelleenkirjoitus parannetulla tarkkuudella (PR #658, @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Streaming Override Fix**– Yksilöllinen "stream: true" pyynnön rungossa on nyt etusijalla "Accept: application/json"-otsikon yläpuolelle. Asiakkaat, jotka lähettävät molemmat, saavat oikein SSE-suoratoistovastaukset (#656)### 🌍 i18n

-**Tšekin kielen merkkijonoparannuksia**— Tarkennettu terminologia `cs.jsonissa` (PR #655, @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 puuttuvaa käännösavainta**lisätty en.jsoniin ja 12 kieleen (PR #652, @zen0bit) -**Tšekinkielinen dokumentaatio päivitetty**— CLI-TOOLS-, API_REFERENCE-, VM_DEPLOYMENT-oppaat (PR #652) -**Käännösten tarkistusskriptit**— `check_translations.py` ja `validate_translation.py` CI/QA:lle (PR #651, @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kriittinen: Tool Calling Regression**— Korjattu proxy_Bash-virheet poistamalla välityspalvelimen nimen etuliite käytöstä Claude-läpivientipolussa. Työkaluja, kuten "Bash", "Read" ja "Write", nimettiin uudelleen muotoon "proxy_Bash", "proxy_Read" jne., jolloin Claude hylkäsi ne (#618). -**Kiron tilikiellon dokumentaatio**– dokumentoitu AWS:n petostentorjunnan alkupään vääräksi positiiviseksi, ei OmniRoute-ongelmaksi (#649)### 🧪 Tests

-**936 testiä, 0 virhettä**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Vision Capability Metadata**: Lisätty "capabilities.vision", "input_modalities" ja "output_modalities" näkökykyisten mallien /v1/models-merkintöihin (PR #646) -**Gemini 3.1 -mallit**: Lisätty "gemini-3.1-pro-preview" ja "gemini-3.1-flash-lite-preview" Antigravity-toimittajaan (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401 -virhe**: Korjattu virheellinen API-perus-URL-osoite – muutettu osoitteesta "api.ollama.com" viralliseen osoitteeseen "ollama.com/v1/chat/completions" (#643) -**Expired Token Retry**: Lisätty rajoitettu uudelleenyritys eksponentiaalisella perääntymisellä (5→10→20 min) vanhentuneille OAuth-yhteyksille sen sijaan, että niitä ohitettaisiin pysyvästi (PR #647)### 🧪 Tests

-**936 testiä, 0 virhettä**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**GitHub Issue Templates**: Lisätty standardoitu virheraportti, ominaisuuspyyntö ja määritys-/välityspalvelinongelmamallit (#641) -**Tyhjennä kaikki mallit**: Lisätty "Tyhjennä kaikki mallit" -painike palveluntarjoajan tietosivulle i18n-tuella 29 kielellä (#634)### 🐛 Bug Fixes

-**Kieliristiriita ("in.json")**: Hindi-kieli-kielitiedosto nimettiin uudelleen "in.jsonista" (indonesialainen ISO-koodi) muotoon "hi.json" käännösristiriitojen korjaamiseksi Weblatessa (#642). -**Tyhjät koodin työkalujen nimet**: Työkalun nimen puhdistus siirrettiin ennen alkuperäistä Codex-läpivientiä, mikä korjaa 400 virhettä alkupään toimittajilta, kun työkaluilla oli tyhjiä nimiä (#637) -**Striimaamalla rivinvaihtoartefakteja**: "collapseExcessiveNewlines" lisätty vastauksen puhdistajaan, mikä tiivistää 3+ peräkkäisen rivinvaihdon ajattelumalleista tavalliseksi kaksoisriviriviksi (#638) -**Claude Reasoning Effort**: Muunnettiin OpenAI:n "reasoning_effort"-parametri Clauden alkuperäiseksi "ajattelu"-budjettilohkoksi kaikilla pyyntöpoluilla, mukaan lukien automaattinen "max_tokens"-säätö (#627) -**Qwen Token Refresh**: OAuth-tunnuksen vanhenemista edeltävät proaktiiviset päivitykset (5 minuutin puskuri) estämään pyyntöjen epäonnistuminen käytettäessä lyhytikäisiä tunnuksia (#631)### 🧪 Tests

-**936 testiä, 0 virhettä**(+10 testiä 3.0.9 jälkeen)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**NaN-tunnukset Claude Codessa / asiakkaan vastaukset (#617):**

- "sanitizeUsage()" yhdistää nyt merkinnät "input_tokens" → "prompt_tokens" ja "output_tokens" → "completion_tokens" ennen sallittujen luettelosuodatinta ja korjaavat vastaukset, jotka näyttävät NaN/0-tunnistemäärän, kun palveluntarjoajat palauttavat Claude-tyylisiä käyttökenttien nimiä### Turvallisuus

- Päivitetty 'yaml'-paketti pinon ylivuotohaavoittuvuuden korjaamiseksi (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Suljettu #613 (Codestral – ratkaistu mukautetun palveluntarjoajan ratkaisulla)
- Kommentoi numeroa 615 (OpenCode-kaksoispäätepiste – kiertotapa tarjotaan, seurataan ominaisuuspyyntönä)
- Kommentoi numeroa 618 (työkalukutsun näkyvyys — vaaditaan v3.0.9-testiä)
- Kommentoi numeroa 627 (ponnistustaso – jo tuettu)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Käännösvirheet OpenAI-muodon tarjoajille Claude CLI:ssä (#632):**

- Käsittele `reasoning_details[]`-taulukkomuotoa StepFun/OpenRouterista – muuntaa `reasoning_content`-muotoon
- Käsittele joidenkin palveluntarjoajien perustelukentän aliaksia → normalisoitu arvoon "reasoning_content"
- Ristikarttojen käyttökenttien nimet: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens `filterUsageForFormat-kohdassa
- Korjaa "extractUsage" hyväksyäksesi sekä "input_tokens"/"output_tokens" että "prompt_tokens"/"completion_tokens" kelvollisiksi käyttökentiksi
- Koskee sekä suoratoistoa (`sanitizeStreamingChunk`, `openai-to-claude.ts`-kääntäjä) ja ei-suoratoistopolkuja (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Refresh:**Korjattu "client_secret puuttuu" -virhe npm-asennetuille käyttäjille – ClientSecretDefault oli tyhjä palveluntarjoajan rekisterissä, minkä vuoksi Google hylkäsi tunnuksen päivityspyynnöt (#588) -**OpenCode Zen -mallit:**Lisättiin "modelsUrl" OpenCode Zen -rekisterimerkintään, joten "Tuonti / mallit" toimii oikein (#612) -**Streamingartefacts:**Korjattu liiallinen rivinvaihto vastauksiin ajattelutagin allekirjoituksen poistamisen jälkeen (#626) -**Välityspalvelimen vara:**Lisätty automaattinen uudelleenyritys ilman välityspalvelinta, kun SOCKS5-rele epäonnistuu -**Välityspalvelintesti:**Testin päätepiste ratkaisee nyt todelliset valtuustiedot DB:stä proxyId:n kautta### ✨ New Features

-**Playground-tilin/avaimen valitsin:**Pysyvä, aina näkyvä pudotusvalikko tiettyjen palveluntarjoajan tilien/avainten valitsemiseksi testausta varten – hakee kaikki yhteydet käynnistyksen yhteydessä ja suodattaa valitun palveluntarjoajan mukaan -**CLI Toolsin dynaamiset mallit:**Mallin valinta haetaan nyt dynaamisesti `/v1/models' API:sta – Kiron kaltaiset toimittajat näyttävät nyt täydellisen malliluettelonsa
-**Antigraviteettimalliluettelo:**Päivitetty Claude Sonnet 4.5:llä, Claude Sonnetilla 4, GPT 5:llä, GPT 5 Minillä; `passthroughModels` käytössä dynaamisen mallin pääsyä varten (#628)### 🔧 Maintenance

- Yhdistetty PR #625 — Palveluntarjoaja rajoittaa valotilan taustakorjausta---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Rajat/välityspalvelin:**Korjattu Codex-rajoitusten nouto SOCKS5-välityspalvelinten takana oleville tileille – tunnuksen päivitys suoritetaan nyt välityspalvelimen sisällä -**CI:**Korjattu integrointitestin "v1/models" vahvistusvirhe CI-ympäristöissä ilman palveluntarjoajan yhteyksiä -**Asetukset:**Välityspalvelimen testipainike näyttää nyt onnistumis-/epäonnistumistulokset välittömästi (aiemmin piilotettu terveystietojen taakse)### ✨ New Features

-**Leikkikenttä:**Lisätty avattava Tilin valitsin -valikko – testaa tiettyjä yhteyksiä yksitellen, kun palveluntarjoajalla on useita tilejä### 🔧 Maintenance

- Yhdistetty PR #623 - LongCat API -perus-URL-polun korjaus---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limits UI:**Lisätty tunnisteiden ryhmittelyominaisuus yhteyksien kojelautaan parantaaksesi visuaalista organisaatiota muokattuja tunnisteita sisältäville tileille.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Korjattu "TextDecoder"-tilan vioittuminen Combo "sanitize" TransformStreamissa, joka aiheutti SSE:n vääristyneen tulosteen, joka vastasi monitavuisia merkkejä (PR #614) -**Providers-UI:**hahmonna HTML-tunnisteet turvallisesti palveluntarjoajan yhteysvirhetyökaluvihjeissä käyttämällä `dangerouslySetInnerHTML-komentoa -**Välityspalvelimen asetukset:**Lisätty puuttuvat "käyttäjänimi" ja "salasana" hyötykuorman rungon ominaisuudet, mikä mahdollistaa todennettujen välityspalvelinten onnistuneen vahvistamisen hallintapaneelista. -**Provider API:**Sidottu pehmeä poikkeus palaa "getCodexUsageen" ja estää API HTTP 500 -virheet, kun tunnuksen nouto epäonnistuu---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Automaattisen synkronoinnin mallit:**Lisätty käyttöliittymän vaihtokytkin ja "sync-mallit" -päätepiste, joka synkronoi malliluettelot automaattisesti palveluntarjoajakohtaisesti ajoitetun aikavälin ajastimen avulla (PR #597)### 🐛 Bug Fixes

-**Aikakatkaisut:**Nostettu oletusvälityspalvelimet FETCH_TIMEOUT_MS ja STREAM_IDLE_TIMEOUT_MS 10 minuuttiin, jotta ne tukevat kunnolla syvällisiä päättelymalleja (kuten o1) ilman, että pyyntöjä keskeytetään (korjaus #609) -**CLI-työkalun tunnistus:**Paranneltu eri alustojen tunnistus, joka käsittelee NVM-polut, Windowsin PATHEXT (estää .cmd-kääreiden ongelman) ja mukautetut NPM-etuliitteet (PR #598) -**Suoratoistolokit:**Toteutettu "tool_calls" delta-kertymä suoratoiston vastauslokeissa, jotta toimintokutsuja seurataan ja ne säilyvät tarkasti tietokannassa (PR #603) -**Malliluettelo:**Poistettu todennusvapautus, piilottaa comfyui- ja sdwebui-mallit oikein, kun palveluntarjoajaa ei ole erikseen määritetty (PR #599)### 🌐 Translations

-**cs:**Parannetut tšekinkieliset käännösjonot sovelluksessa (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Lisätty Tag/Group-kenttä "EditConnectionModal"-kenttään (tallennettu "providerSpecificData.tag"-tiedostoon) ilman DB-skeeman siirtoja.
- Palveluntarjoajanäkymän yhteydet ryhmitellään nyt dynaamisesti tunnisteen mukaan visuaalisilla jakajilla.
- Koodaamattomat yhteydet näkyvät ensin ilman otsikkoa, jonka jälkeen tunnistetut ryhmät näkyvät aakkosjärjestyksessä.
- Tunnisteiden ryhmittely koskee automaattisesti Codex/Copilot/Antigravity Limits -osiota, koska kytkimet ovat yhteysrivien sisällä.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Puuttuvat merkit yhteyskorteista:**Korjattu käyttämällä "resolveProxyForConnection()"-toimintoa staattisen kartoituksen sijaan. -**Testiyhteys pois käytöstä tallennetussa tilassa:**Testaa-painike on otettu käyttöön poistamalla välityspalvelimen asetukset tallennetusta luettelosta. -**Config Modal freezing:**Lisätty onClose()-kutsut tallennuksen/tyhjennyksen jälkeen käyttöliittymän jäätymisen estämiseksi. -**Kaksoiskäytön laskenta:**"ProxyRegistryManager" lataa nyt käyttöä innokkaasti asennuksessa poistamalla duplikoinnin "scope" + "scopeId" avulla. Käyttömäärät korvattiin Test-painikkeella, joka näyttää IP/latenssin rivin.#### fix(translator): `function_call` prefix stripping

- Korjattu PR #607:n epätäydellinen korjaus, jossa vain `tool_use`-lohkot poistivat Clauden `proxy_`-työkaluetuliitteestä. Nyt OpenAI Responses API -muotoa käyttävät asiakkaat saavat myös työkalutyökalut oikein ilman proxy\_-etuliitettä.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Kolme kriittistä regressiota, jotka käyttäjät ilmoittivat v3.0.0:n julkaisun jälkeen, on ratkaistu.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Claude OAuthin lisäämä välityspalvelin-etuliite poistettiin vain**streaming**-vastauksista.**Ei-suoratoistossa**-tilassa `translateNonStreamingResponse` ei voinut käyttää `toolNameMap'-toimintoa, minkä vuoksi asiakkaat saivat sekoitettuja työkalunimiä, kuten `proxy_read_file` `read_file` sijaan.

**Korjaus:**Lisätty valinnainen "toolNameMap"-parametri "translateNonStreamingResponse"-parametriin ja otettu käyttöön etuliite poisto Clauden "tool_use"-lohkokäsittelyssä. `chatCore.ts' kulkee nyt kartan läpi.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI ei paljasta "GET /v1/models". Yleinen "validateOpenAICompatibleProvider" -tarkistus onnistui keskustelun loppuunsaattamista varten vain, jos "validationModelId" oli asetettu, mitä LongCat ei määritä. Tämä aiheutti palveluntarjoajan vahvistuksen epäonnistumisen, ja lisäys/tallennuksessa tapahtui harhaanjohtava virhe.

**Korjaus:**Lisätty "longcat" erikoisvalidaattorien karttaan, joka tutkii "/chat/completions" suoraan ja käsittelee ei-todennusta vastaukset läpäisynä.#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP-työkalut (esim. `pencil`, `computer_use`) välittävät työkalumäärittelyt eteenpäin {type:"object"}-määritteellä, mutta ilman ominaisuudet-kenttää. Anthropicin API hylkää nämä seuraavasti: "objektiskeeman ominaisuudet puuttuvat".

**Korjaus:**Lisää tiedostoon `openai-to-claude.ts` `properties: {}` turvalliseksi oletusasetukseksi, kun `type` on `objekti` ja `properties` puuttuu.---

### 🔀 Community PRs Merged (2)

| PR       | Tekijä  | Yhteenveto                                                                                       |
| -------- | ------- | ------------------------------------------------------------------------------------------------ | --- |
| **#589** | @flobo3 | docs(i18n): korjaa venäjänkielinen käännös Playgroundille ja Testbedille                         |
| **#591** | @rdself | fix(ui): parantaa Palveluntarjoajaa Rajoittaa valotilan kontrastia ja suunnittelee tason näyttöä | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

- **926 tests, 0 failures** (unchanged from v3.0.0)

---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Kaikkien aikojen suurin julkaisu.**36 palveluntarjoajalta versiossa 2.9.5**67+ palveluntarjoajaan**versiossa 3.0.0 – MCP-palvelimella, A2A-protokollalla, automaattisella yhdistelmämoottorilla, palveluntarjoajan kuvakkeilla, rekisteröityjen avainten API:lla, 926 testiä ja**12 yhteisön jäsenen**panoksella**10 yhdistettyä PR:tä**.
>
> Konsolidoitu v3.0.0-rc.1:stä rc.17:ään (17 julkaisuehdokasta kolmen päivän intensiivisen kehityksen aikana).---

### 🆕 New Providers (+31 since v2.9.5)

| Palveluntarjoaja                | Alias ​​        | Taso           | Huomautuksia                                                                                               |
| ------------------------------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**                | "opencode-zen"  | Ilmainen       | 3 mallia `opencode.ai/zen/v1`:n kautta (PR #530, @kang-heewon)                                             |
| **OpenCode Go**                 | "opencode-go"   | Maksettu       | 4 mallia osoitteessa `opencode.ai/zen/go/v1` (PR #530, @kang-heewon)                                       |
| **LongCat AI**                  | "lc"            | Ilmainen       | 50 miljoonaa tokenia/päivä (Flash-Lite) + 500 000/päivä (keskustelu/ajattelu) julkisen beta-vaiheen aikana |
| **Pölytys AI**                  | "pol"           | Ilmainen       | API-avainta ei tarvita — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 tarve/15s)                         |
| **Cloudflare Workers AI**       | `cf`            | Ilmainen       | 10 000 neuronia/päivä — ~150 LLM-vastausta tai 500 s Whisper-ääni, reunapäätelmä                           |
| **Scaleway AI**                 | "scw"           | Ilmainen       | 1 miljoona ilmaista tokenia uusille tileille – EU/GDPR-yhteensopiva (Pariisi)                              |
| **AI/ML API**                   | "aiml"          | Ilmainen       | 0,025 $/päivä ilmaisia ​​luottoja – 200+ mallia yhden päätepisteen kautta                                  |
| **Puter AI**                    | `pu`            | Ilmainen       | Yli 500 mallia (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                                   |
| **Alibaba Cloud (DashScope)**   | "ali"           | Maksettu       | Kansainväliset + Kiina -päätepisteet `alicode`/`alicode-intl`                                              | :n kautta                                                                                                                                                      |
| **Alibaban koodaussuunnitelma** | "bcp"           | Maksettu       | Alibaba Model Studio Anthropic-yhteensopivalla API:lla                                                     |
| **Kimi-koodaus (API-avain)**    | "kmca"          | Maksettu       | Erillinen API-avainpohjainen Kimi-käyttöoikeus (erillinen OAuthista)                                       |
| **MiniMax-koodaus**             | "minimax"       | Maksettu       | Kansainvälinen päätepiste                                                                                  |
| **MiniMax (Kiina)**             | "minimax-cn"    | Maksettu       | Kiinakohtainen päätepiste                                                                                  |
| **Z.AI (GLM-5)**                | "zai"           | Maksettu       | Zhipu AI seuraavan sukupolven GLM-mallit                                                                   |
| **Vertex AI**                   | "vertex"        | Maksettu       | Google Cloud – Palvelutili JSON tai OAuth access_token                                                     |
| **Ollama-pilvi**                | "ollamacloud"   | Maksettu       | Ollaman isännöimä API-palvelu                                                                              |
| **Synteettinen**                | "synteettinen"  | Maksettu       | Läpivientimallien yhdyskäytävä                                                                             |
| **Kilo Gateway**                | "kg"            | Maksettu       | Läpivientimallien yhdyskäytävä                                                                             |
| **Hämmityshaku**                | `pplx-search'   | Maksettu       | Oma hakumaadoitettu päätepiste                                                                             |
| **Palvelijahaku**               | `server-haku`   | Maksettu       | Verkkohaun API-integrointi                                                                                 |
| **Rohkea haku**                 | `rohkea haku`   | Maksettu       | Brave Search API -integraatio                                                                              |
| **Exa Search**                  | `exa-haku`      | Maksettu       | Hermohaun API-integrointi                                                                                  |
| **Tavily Search**               | "tavily-search" | Maksettu       | AI-hakusovellusliittymän integrointi                                                                       |
| **NanoBanaani**                 | "nb"            | Maksettu       | Kuvan luonnin API                                                                                          |
| **ElevenLabs**                  | "el"            | Maksettu       | Text-to-speech voice synthesis                                                                             |
| **Cartesia**                    | "cartesia"      | Maksettu       | Erittäin nopea TTS-äänen synteesi                                                                          |
| **PlayHT**                      | `playht`        | Maksettu       | Äänen kloonaus ja TTS                                                                                      |
| **Sisämaailma**                 | "sisäinen"      | Maksettu       | AI-hahmon äänikeskustelu                                                                                   |
| **SD WebUI**                    | `sdwebui`       | Itse isännöimä | Vakaa diffuusio paikallinen kuvan luominen                                                                 |
| **ComfyUI**                     | `comfyui`       | Itse isännöimä | ComfyUI paikallisen työnkulun solmupohjainen sukupolvi                                                     |
| **GLM-koodaus**                 | "glm"           | Maksettu       | BigModel/Zhipu-koodauskohtainen päätepiste                                                                 | **Yhteensä: 67+ palveluntarjoajaa**(4 ilmaista, 8 OAuth, 55 API-avain) + rajoittamaton määrä OpenAI/Anthropic-yhteensopivia mukautettuja palveluntarjoajia.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Luo ja anna OmniRoute API -avaimet automaattisesti palveluntarjoaja- ja tilikohtaisen kiintiön täytäntöönpanon avulla.

| Päätepiste                      | Menetelmä      | Kuvaus                                                    |
| ------------------------------- | -------------- | --------------------------------------------------------- |
| `/api/v1/registered-keys'       | `POSTI`        | Anna uusi avain — raaka-avain palautettiin**vain kerran** |
| `/api/v1/registered-keys'       | "HAKU"         | Listaa rekisteröidyt avaimet (naamioitu)                  |
| `/api/v1/registered-keys/{id}`  | "HAE/POISTA"   | Hae metatiedot / Peru                                     |
| "/api/v1/quotas/check"          | "HAKU"         | Vahvista kiintiö ennen myöntämistä                        |
| `/api/v1/providers/{id}/limits` | "HANKI/LAISTA" | Määritä toimittajakohtaiset myöntämisrajoitukset          |
| `/api/v1/accounts/{id}/limits`  | "HANKI/LAISTA" | Määritä tilikohtaiset myöntämisrajat                      |
| `/api/v1/issues/report`         | `POSTI`        | Raportoi kiintiötapahtumista GitHub Issues                |

**Turvallisuus:**Avaimet on tallennettu SHA-256-tiivisteinä. Raaka-avain näkyy kerran luonnissa, ei koskaan noudettavissa uudelleen.#### 🎨 Provider Icons via @lobehub/icons (#529)

Yli 130 palveluntarjoajan logoa @lobehub/icons React-komponenttien (SVG) avulla. Varaketju:**Lobehub SVG → olemassa oleva PNG → yleinen kuvake**. Sovelletaan Dashboard-, Providers- ja Agents-sivuilla standardoidulla ProviderIcon-komponentilla.#### 🔄 Model Auto-Sync Scheduler (#488)

Päivittää yhdistettyjen palveluntarjoajien malliluettelot automaattisesti**24 tunnin**välein. Toimii palvelimen käynnistyksen yhteydessä. Konfiguroitavissa kohdassa MODEL_SYNC_INTERVAL_HOURS.#### 🔀 Per-Model Combo Routing (#563)

Yhdistä mallin nimimallit (glob) tiettyihin yhdistelmiin automaattista reititystä varten:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Uusi `model_combo_mappings` -taulukko, jossa on glob-to-regex-vastaavuus
- Kojelaudan käyttöliittymäosio: "Mallin reitityssäännöt", jossa on upotettu lisää/muokkaa/vaihda/poista#### 🧭 API Endpoints Dashboard

Interaktiivinen luettelo, webhooksien hallinta, OpenAPI-katseluohjelma – kaikki yhdellä välilehdellä sivulla `/dashboard/endpoint'.#### 🔍 Web Search Providers

5 uutta hakupalveluntarjoajan integraatiota:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**– mahdollistaa maadoitetut tekoälyvastaukset reaaliaikaisilla verkkotiedoilla.#### 📊 Search Analytics

Uusi välilehti "/dashboard/analyticsissa" – palveluntarjoajien erittely, välimuistin osumaprosentti, kustannusten seuranta. API: GET /api/v1/search/analytics.#### 🛡️ Per-API-Key Rate Limits (#452)

"max_requests_per_day"- ja "max_requests_per_minute" -sarakkeet, joissa on muistissa oleva liukuvan ikkunan pakotus, joka palauttaa HTTP 429:n.#### 🎵 Media Playground

Täysi median luomisen leikkipaikka osoitteessa `/dashboard/media': kuvien luominen, video, musiikki, äänen transkriptio (2 Gt:n latausraja) ja tekstistä puheeksi.---

### 🔒 Security & CI/CD

-**CodeQL-korjaus**— Korjattu 10+ ilmoitusta: 6 polynomi-uudelleen, 1 epävarma satunnaisuus (`Math.random()` → `crypto.randomUUID()`), 1 komentotulkki-injektio -**Reitin vahvistus**— Zod-skeemat + `validateBody()`**176/176 API-reiteillä**— CI pakotettu -**CVE-korjaus**— poista XSS-haavoittuvuus (GHSA-v2wj-7wpq-c8vv), joka on ratkaistu npm-ohituksella -**Litteä**— Törmäys 3.3.3 → 3.4.2 (CWE-1321 prototyypin saastuminen) -**Docker**— päivitetty `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**- Gemini CLI OAuth: tyhjennä toiminnallinen virhe, kun "GEMINI_OAUTH_CLIENT_SECRET" puuttuu Dockerista -**#549**— CLI-asetusreitit ratkaisevat nyt oikean API-avaimen "keyId":stä (ei maskattuja merkkijonoja) -**#574**— Kirjautuminen ei enää jumiudu ohjatun toiminnon salasanan määrityksen ohituksen jälkeen -**#506**— Cross-platform "machineId" kirjoitettu uudelleen (Windows REG.exe → macOS ioreg → Linux → isäntänimen vara)#### Providers & Routing

-**#536**— LongCat AI: kiinteä "baseUrl" ja "authHeader" -**#535**— Kiinnitetyn mallin ohitus: "body.model" on asetettu oikein arvoon "pinnedModel". -**#570**— Etuliitteettomat Claude-mallit päätyvät nyt Anthropic-toimittajaksi -**#585**— `<omniModel>` sisäiset tunnisteet eivät enää vuoda asiakkaille SSE-suoratoistossa -**#493**– Muokatun palveluntarjoajan mallin nimeämistä ei enää sovelleta etuliitteen poistamisella -**#490**- Suoratoisto + kontekstivälimuistin suojaus "TransformStream"-injektiolla -**#511**— `<omniModel>` -tunniste lisätty ensimmäiseen sisältöosaan (ei `[VALMIS]` jälkeen)#### CLI & Tools

-**#527**— Claude Code + Codex-silmukka: "tool_result" -lohkot muunnetaan nyt tekstiksi -**#524**— OpenCode-määritys tallennettu oikein (XDG_CONFIG_HOME, TOML-muoto) -**#522**— API Manager: poistettu harhaanjohtava "Kopioi peitetty avain" -painike -**#546**- "--versio" palauttaa "tuntemattoman" Windowsissa (PR kirjoittaja @k0valik) -**#544**— Suojattu CLI-työkalun tunnistus tunnettujen asennuspolkujen kautta (PR by @k0valik) -**#510**— Windows MSYS2/Git-Bash -polut normalisoituivat automaattisesti -**#492**- CLI havaitsee "mise"/"nvm"-hallitun solmun, kun "app/server.js" puuttuu#### Streaming & SSE

-**PR #587**— Palauta "resolveDataDir" -tuonti vastauksessaTransformer for Cloudflare Workers compat (@k0valik) -**PR #495**— Pullonkaula 429 ääretön odotus: pudota odottavat työt nopeusrajoituksella (@xandr0s) -**#483**- Lopeta data: null -signaalin "[VALMIS]" jälkeen. -**#473**— Zombie SSE -streamit: aikakatkaisua lyhennetty 300 s → 120 s nopeamman varauksen saamiseksi#### Media & Transcription

-**Transkriptio**— Deepgram `video/mp4` → `audio/mp4` MIME-kartoitus, automaattinen kielen tunnistus, välimerkit -**TTS**— "[object Object]" virhenäyttö korjattu ElevenLabs-tyylisille sisäkkäisille virheille -**Latausrajoitukset**— Median transkriptio nostettu 2 Gt:iin (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— 'requested_model' -sarake puhelulokeissa (siirto 009) -**T02**— Poista tyhjät tekstilohkot sisäkkäisestä "tool_result.content" -tiedostosta -**T03**— jäsentää `x-codex-5h-*` / `x-codex-7d-*` kiintiöotsikot -**T04**- "X-Session-Id"-otsikko ulkoista tarttuvaa reititystä varten -**T05**— Rate-rate DB pysyvyys erillisellä API:lla -**T06**— Tili deaktivoitu → pysyvä esto (1 vuoden jäähdytys) -**T07**— X-Forwarded-For IP validation (`extractClientIp()`) -**T08**— API-avainkohtaiset istuntorajoitukset liukuvan ikkunan täytäntöönpanolla -**T09**— Codex vs Spark -nopeusrajoitusalueet (erilliset poolit) -**T10**— Tekijät loppuneet → erillinen 1 tunnin jäähdytysvaraus -**T11**— "maksimi" perustelutyö → 131072 budjettitunnusta -**T12**— MiniMax M2.7 -hinnoittelumerkinnät -**T13**— Vanhentunut kiintiön näyttökorjaus (nollaa ikkunan tietoisuus) -**T14**— Välityspalvelimen nopea epäonnistunut TCP-tarkistus (≤2 s, välimuistissa 30 s) -**T15**— Array-sisällön normalisointi Anthropicille -**T23**– Älykäs kiintiön palautus (otsikon purkaminen) -**T24**— 503-jäähdytys + 406-kartoitus -**T25**— Palveluntarjoajan vahvistuksen varavaihtoehto -**T29**— Vertex AI Service Account JWT auth -**T33**— Ajattelutaso budjetin muuntamiseen -**T36**— 403 vs 429 virheluokitus -**T38**— Keskitetyt mallin tekniset tiedot (`modelSpecs.ts`) -**T39**— Päätepisteen varahanke "fetchAvailableModels". -**T41**— Taustatehtävän automaattinen uudelleenohjaus flash-malleihin -**T42**— Image generation aspect ratio mapping#### Other Improvements

-**Per-model upstream custom headers**— via configuration UI (PR #575 by @zhangqiang8vip) -**Model context length**— configurable in model metadata (PR #578 by @hijak) -**Model prefix stripping**— option to remove provider prefix from model names (PR #582 by @jay77721) -**Gemini CLI -poisto**– merkitty vanhentuneeksi Google OAuth -rajoitusvaroituksella -**YAML-jäsennin**— muokattu jäsennys korvattiin js-yaml:lla oikean OpenAPI-määrityksen jäsentämiseksi -**ZWS v5**— HMR-vuodon korjaus (485 DB liitännät → 1, muisti 2,4 Gt → 195 Mt) -**Log export**— New JSON export button on dashboard with time range dropdown -**Update notification banner**— dashboard homepage shows when new versions are available---

### 🌐 i18n & Documentation

-**30 kieltä**100 % pariteetilla - 2 788 puuttuvaa avainta synkronoitu -**Tšekki**— Täysi käännös: 22 asiakirjaa, 2 606 käyttöliittymämerkkijonoa (PR by @zen0bit) -**Kiina (zh-CN)**- Täydellinen uudelleenkäännös (PR by @only4copilot) -**VM Deployment Guide**- Käännetty lähdeasiakirjaksi englanniksi -**API-viite**- Lisätty /v1/embeddings- ja /v1/audio/speech-päätepisteet -**Tarjoajien määrä**- Päivitetty 36+/40+/44+ arvoon**67+**README:ssä ja kaikissa 30 i18n README:ssä---

### 🔀 Community PRs Merged (10)

| PR       | Tekijä          | Yhteenveto                                                           |
| -------- | --------------- | -------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): palauta solveDataDir-tuonti Cloudflare Workers compat      |
| **#582** | @jay77721       | feat(proxy): mallin nimen etuliitteen poistovaihtoehto               |
| **#581** | @jay77721       | fix(npm): linkitä elektronien julkaisu npm-publish-työnkulkuun       |
| **#578** | @hijak          | feat: määritettävä kontekstin pituus mallin metatiedoissa            |
| **#575** | @zhangqiang8vip | feat: mallikohtaiset ylävirran otsikot, compat PATCH, chat-kohdistus |
| **#562** | @coobabm        | korjaus: MCP-istunnon hallinta, Claude-läpivienti, detectFormat      |
| **#561** | @zen0bit        | fix(i18n): Tšekin käännöksen korjaukset                              |
| **#555** | @k0valik        | fix(sse): keskitetty "resolveDataDir()" polun ratkaisuun             |
| **#546** | @k0valik        | fix(cli): "--versio" palauttaa "tuntemattoman" Windowsissa           |
| **#544** | @k0valik        | fix(cli): suojattu CLI-työkalun tunnistus asennuspolkujen kautta     |
| **#542** | @rdself         | fix(ui): valotilan kontrastin CSS-teeman muuttujat                   |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go -palveluntarjoajat OpencodeExecutorilla      |
| **#512** | @zhangqiang8vip | feat: protokollakohtaisen mallin yhteensopivuus (`compatByProtocol`) |
| **#497** | @zhangqiang8vip | fix: dev-mode HMR resource leaks (ZWS v5)                            |
| **#495** | @xandr0s        | korjaus: Pullonkaula 429 ääretön odotus (pudota odottavat työt)      |
| **#494** | @zhangqiang8vip | feat: MiniMax-kehittäjä→järjestelmän roolin korjaus                  |
| **#480** | @prakersh       | korjaus: stream huuhtele käytön purku                                |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 ja Anthropic pricing -merkinnät                  |
| **#475** | @only4copilot   | feat(i18n): parannettu kiinalainen käännös                           |

**Kiitos kaikille osallistujille!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491`3` `#491`3 `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#5315` `#533` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 testiä, 0 virhettä**(821 versiossa 2.9.5)

- +105 uutta testiä, jotka kattavat: malli-yhdistelmäkartoitukset, rekisteröidyt avaimet, OpencodeExecutor, Bailian-palveluntarjoajan, reitin validoinnin, virheluokituksen, kuvasuhdekartoituksen ja paljon muuta---

### 📦 Database Migrations

| Muutto  | Kuvaus                                                                                  |
| ------- | --------------------------------------------------------------------------------------- | --- |
| **008** | "rekisteröidyt_avaimet", "palveluntarjoajan_avainrajoitukset", "tilin_avainrajoitukset" |
| **009** | 'requested_model' -sarake 'call_logs' -kohdassa                                         |
| **010** | `model_combo_mappings` -taulukko mallikohtaista yhdistelmäreititystä varten             | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Muutokset:**Ei mitään. Kaikki olemassa olevat kokoonpanot, yhdistelmät ja API-avaimet säilytetään.
> Tietokannan siirrot 008-010 suoritetaan automaattisesti käynnistyksen yhteydessä.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL-korjaus**- Korjattu 10+ hälytystä:

- 6 polynomi-redoa kentässä "provider.ts" / "chatCore.ts" (korvattu "(?:^|/)"-vuorottelumallit segmenttipohjaisella vastaavuudella)
- 1 epävarma satunnaisuus tiedostossa "acp/manager.ts" ("Math.random()" → "crypto.randomUUID()")
- 1 shell-komento-injektio tiedostossa "prepublish.mjs" ("JSON.stringify()"-polun escaping) -**Reitin vahvistus**— Zod-skeemat + `validateBody()' lisätty viiteen reittiin, joista puuttuu vahvistus:
- "malliyhdistelmäkartoitukset" (POST, PUT), "webhooks" (POST, PUT), "openapi/try" (POST)
- CI `check:route-validation:t06` läpäisee nyt:**176/176 reittiä vahvistettu**### 🐛 Bug Fixes

-**#585**— `<omniModel>` sisäiset tunnisteet eivät enää vuoda asiakkaille SSE-vastauksissa. Combo.ts-tiedostoon lisätty lähtevä "TransformStream" -puhdistus### ⚙️ Infrastructure

-**Docker**– Päivitetty `docker/setup-buildx-action` v3:sta → v4:stä (Node.js 20:n vanhentumiskorjaus) -**CI-puhdistus**— Poistettu yli 150 epäonnistunutta/peruutettua työnkulkua### 🧪 Tests

- Testisarja:**926 testiä, 0 virhettä**(+3 uutta)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Median transkriptiorajoituksia on lisätty
- Mallin kontekstin pituus lisättiin rekisterin metatietoihin
- Lisätty mallikohtaiset ylävirran mukautetut otsikot määrityskäyttöliittymän kautta
- Korjattu useita bugeja, Zod-validointi korjaustiedostoille ja ratkaistu useita yhteisön ongelmia.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Mallikohtainen yhdistelmäreititys: yhdistä mallin nimimallit (glob) tiettyihin yhdistelmiin automaattista reititystä varten

- Uusi `model_combo_mappings' -taulukko (siirto 010), jossa on kuvio, combo_id, prioriteetti, käytössä
- `resolveComboForModel()` DB-funktio, jossa on glob-to-regex-sovitus (kirjainkoolla ei väliä, `*` ja `?` jokerimerkit)
- "getComboForModel()" mallissa "model.ts": täydentää "getCombo()" mallimallin varauksella
- "chat.ts": reitityspäätös tarkistaa nyt malli-yhdistelmäkartoitukset ennen yksittäisen mallin käsittelyä
- API: "GET/POST /api/model-combo-mappings", "GET/PUT/DELETE /api/model-combo-mappings/:id"
- Hallintapaneeli: "Mallin reitityssäännöt" -osio lisätty yhdistelmäsivulle upottamalla lisää/muokkaa/vaihda/poista
- Esimerkkejä: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Täysi i18n-synkronointi**: 2 788 puuttuvaa avainta lisätty 30 kielitiedostoon – kaikki kielet nyt 100 % pariteetissa en.jsonin kanssa -**Agenttisivu i18n**: OpenCode Integration -osio täysin kansainvälistetty (otsikko, kuvaus, skannaus, lataustarrat) -**6 uutta avainta**lisätty "agenttien" nimiavaruuteen OpenCode-osion### 🎨 UI/UX

-**Provider Icons**: 16 puuttuvaa palveluntarjoajan kuvaketta lisätty (3 kopioitu, 2 ladattu, 11 luotu SVG) -**SVG-varaus**: ProviderIcon-komponentti päivitetty 4-tason strategialla: Lobehub → PNG → SVG → Yleinen kuvake -**Agenttien sormenjälkien otto**: Synkronoitu CLI-työkalujen kanssa - lisätty droidi, openclaw, copilot, avoin koodi sormenjälkiluetteloon (yhteensä 14)### Turvallisuus

-**CVE-korjaus**: Korjattu dompurify XSS -haavoittuvuus (GHSA-v2wj-7wpq-c8vv) npm-korjausten kautta pakottamalla dompurify@^3.3.2

- "npm audit" raportoi nyt**0 haavoittuvuutta**### 🧪 Tests

- Testisarja:**923 testiä, 0 virhettä**(+15 uutta malli-yhdistelmäkartoitustestiä)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Tekijä   | Yhteenveto                                                                                   |
| -------- | -------- | -------------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): MCP-istunnon hallinta, Clauden läpimenon normalisointi, OAuth-modaali, detectFormat |
| **#561** | @zen0bit | fix(i18n): Tšekin käännöskorjaukset — HTTP-menetelmien nimet ja dokumentaatiopäivitykset     | ### 🧪 Tests |

- Testisarja:**908 testiä, 0 virhettä**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**ratkaise todellinen API-avain `keyId':stä CLI-asetusreiteissä (`codex-settings`, `droid-settings`, `kilo-settings`) estääksesi maskattujen merkkijonojen kirjoittamisen (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Tekijä   | Yhteenveto                                                                                                                                                                                  |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): "--version" palauttaa "tuntemattoman" Windowsissa - käytä "JSON.parse(readFileSync)" ESM-tuonnin sijaan                                                                           |
| **#555** | @k0valik | fix(sse): centralized `resolveDataDir()` for path resolution in credentials, autoCombo, responses logger, and request logger                                                                |
| **#544** | @k0valik | fix(cli): suojattu CLI-työkalun tunnistus tunnettujen asennuspolkujen kautta (8 työkalua), symlink-tarkistus, tiedostotyyppitarkistukset, kokorajoitukset, minimaalinen env Healthcheckissä |
| **#542** | @rdself  | fix(ui): paranna vaalean tilan kontrastia — lisää puuttuvat CSS-teemamuuttujat (`bg-primary`, `bg-subtle`, `text-primary`) ja korjaa vain tummat värit lokin yksityiskohdissa               | ### 🔧 Bug Fixes |

-**TDZ-korjaus tiedostossa "cliRuntime.ts"**— "validateEnvPath" käytettiin ennen alustusta moduulin käynnistyksen yhteydessä "getExpectedParentPaths()". Uudelleenjärjestetyt ilmoitukset "ReferenceError" -virheen korjaamiseksi. -**Build-korjaukset**— Lisätty "pino" ja "pino-pretty" "serverExternalPackages"-kohtaan, jotta Turbopack ei katkaise Pinon sisäistä työntekijälatausta.### 🧪 Tests

- Testisarja:**905 testiä, 0 virhettä**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Electron build regression: Next.js alennettiin arvosta `16.1.x` `16.0.10:een` Turbopack-moduulin hajautusepävakauden poistamiseksi, joka aiheutti tyhjiä näyttöjä Electron-työpöytäpaketissa. -**Yksikkötestin korjaukset**— Korjattu kaksi vanhentunutta testiväittämää ("nanobanana-image-handler" -kuvasuhde/resoluutio, "thinking-budget" Gemini "thinkingConfig" -kenttäkartoitus), jotka olivat ajautuneet viimeaikaisten toteutusmuutosten jälkeen. -**#541**— Vastasi käyttäjien palautteeseen asennuksen monimutkaisuudesta; koodimuutoksia ei vaadita.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: toteutettu käyttämällä "jose"-kirjastoa käsittelemään JWT/Service Account -todennusta sekä käyttöliittymän määritettäviä alueita ja automaattista kumppanimallin URL-osoitteiden rakentamista. -**T42**— Kuvan luomisen kuvasuhteen kartoitus: luotu "sizeMapper"-logiikka yleisille OpenAI-muodoille ("koko"), lisätty natiivi "imagen3"-käsittely ja päivitetty NanoBanana-päätepisteet, jotka käyttävät kartoitettuja kuvasuhteita automaattisesti. -**T38**— Keskitetyt mallispesifikaatiot: "modelSpecs.ts" luotu mallikohtaisia ​​rajoja ja parametreja varten.### 🔧 Improvements

-**T40**— OpenCode CLI -työkalujen integrointi: natiivi "opencode-zen"- ja "opencode-go"-integrointi suoritettu aikaisemmassa PR:ssä.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` viilennys odottaa korjausta + `406`-kartoitus: yhdistetty `406 Not Acceptable` arvoon `503 Palvelu ei saatavilla` oikeilla viilennysväleillä. -**T25**— Palveluntarjoajan varmennusvarmennus: tyylikäs palautus vakiovarmennusmalleihin, kun tiettyä "validationModelId"-tunnusta ei ole olemassa. -**T36**— "403" vs. "429" palveluntarjoajan käsittelyn tarkentaminen: purettu tiedostoon "errorClassifier.ts", jotta kovat käyttöoikeusvirheet ("403") voidaan erottaa oikein nopeusrajoituksista ('429'). -**T39**— Endpoint Fallback for `fetchAvailableModels`: otti käyttöön kolmikerroksisen mekanismin (`/models` -> `/v1/models` -> paikallinen yleinen luettelo) + `list_models_catalog` MCP-työkalupäivitykset lähde- ja varoitustietojen mukaan. -**T33**— Ajattelutasolta budjetin muuntaminen: muuntaa laadulliset ajattelutasot tarkiksi budjetin allokoinneiksi. -**T41**— Taustatehtävän automaattinen uudelleenohjaus: reitittää raskaat taustan arviointitehtävät automaattisesti flash-/tehokkaisiin malleihin. -**T23**– Älykäs kiintiön nollausvaraus: poimii tarkasti "x-ratelimit-reset" / "retry-after"-otsikkoarvot tai kartoittaa staattiset viivytykset.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Päivitys versiosta 2.9.5:**16 ongelmaa ratkaistu · 2 yhteisön PR:tä yhdistetty · 2 uutta palveluntarjoajaa · 7 uutta API-päätepistettä · 3 uutta ominaisuutta · DB-siirto 008+009 · 832 testiä läpäisty · 15 sub2api-aukon parannusta (T01–T15 valmis).### 🆕 New Providers

| Palveluntarjoaja | Alias ​​       | Taso     | Huomautuksia                                                         |
| ---------------- | -------------- | -------- | -------------------------------------------------------------------- |
| **OpenCode Zen** | "opencode-zen" | Ilmainen | 3 mallia `opencode.ai/zen/v1`:n kautta (PR #530, @kang-heewon)       |
| **OpenCode Go**  | "opencode-go"  | Maksettu | 4 mallia osoitteessa `opencode.ai/zen/go/v1` (PR #530, @kang-heewon) |

Molemmat palveluntarjoajat käyttävät uutta OpencodeExecutoria monimuotoisella reitityksellä (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Luo ja anna OmniRoute API -avaimet automaattisesti palveluntarjoaja- ja tilikohtaisen kiintiön täytäntöönpanon avulla.

| Päätepiste                            | Menetelmä      | Kuvaus                                                    |
| ------------------------------------- | -------------- | --------------------------------------------------------- |
| `/api/v1/registered-keys'             | `POSTI`        | Anna uusi avain — raaka-avain palautettiin**vain kerran** |
| `/api/v1/registered-keys'             | "HAKU"         | Listaa rekisteröidyt avaimet (naamioitu)                  |
| `/api/v1/registered-keys/{id}`        | "HAKU"         | Get key metadata                                          |
| `/api/v1/registered-keys/{id}`        | "POISTA"       | Perua avain                                               |
| `/api/v1/registered-keys/{id}/revoke` | `POSTI`        | Peruuta (asiakkaille, joilla ei ole DELETE-tukea)         |
| "/api/v1/quotas/check"                | "HAKU"         | Vahvista kiintiö ennen myöntämistä                        |
| `/api/v1/providers/{id}/limits`       | "HANKI/LAISTA" | Määritä toimittajakohtaiset myöntämisrajoitukset          |
| `/api/v1/accounts/{id}/limits`        | "HANKI/LAISTA" | Määritä tilikohtaiset myöntämisrajat                      |
| "/api/v1/issues/report"               | `POSTI`        | Raportoi kiintiötapahtumista GitHub Issues                |

**DB — Migration 008:**Kolme uutta taulukkoa: "registered_keys", "provider_key_limits", "account_key_limits".
**Turvallisuus:**Avaimet on tallennettu SHA-256-tiivisteinä. Raaka-avain näkyy kerran luonnissa, ei koskaan noudettavissa uudelleen.
**Kiintiötyypit:**"maxActiveKeys", "dailyIssueLimit", "hourlyIssueLimit" palveluntarjoaja- ja tilikohtaisesti.
**Idempotency:**Idempotency_key-kenttä estää päällekkäisen myöntämisen. Palauttaa arvon "409 IDEMPOTENCY_CONFLICT", jos avain oli jo käytössä.
**Avainkohtainen budjetti:**"dailyBudget" / "hourlyBudget" – rajoittaa, kuinka monta pyyntöä avain voi reitittää ikkunaa kohden.
**GitHub-raportointi:**Valinnainen. Aseta "GITHUB_ISSUES_REPO" + "GITHUB_ISSUES_TOKEN" luodaksesi automaattisesti GitHub-ongelmia kiintiön ylittyessä tai myöntämisvirheissä.#### 🎨 Provider Icons — @lobehub/icons (#529)

Kaikki hallintapaneelin tarjoajakuvakkeet käyttävät nyt `@lobehub/icons` React-komponentteja (yli 130 palveluntarjoajaa SVG:llä).
Varaketju:**Lobehub SVG → olemassa oleva `/providers/{id}.png` → yleinen kuvake**. Käyttää oikeaa React "ErrorBoundary" -kuviota.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute päivittää nyt automaattisesti yhdistettyjen palveluntarjoajien malliluettelot**24 tunnin**välein.

- Toimii palvelimen käynnistyksen yhteydessä olemassa olevan /api/sync/initialize-koukun kautta
- Määritettävissä MODEL_SYNC_INTERVAL_HOURS-ympäristömuuttujan kautta
- Kattaa 16 suurta palveluntarjoajaa
- Tallentaa viimeisimmän synkronoinnin ajan asetustietokantaan---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 – Gemini CLI OAuth:**Tyhjennä toimintakelpoinen virhe, kun "GEMINI_OAUTH_CLIENT_SECRET" puuttuu Dockerin/itseisännöidystä käyttöönotosta. Aiemmin näytetty salaperäinen "asiakassalaisuus puuttuu" Googlesta. Tarjoaa nyt tarkat ohjeet `docker-compose.yml` ja `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**Korjattu `baseUrl` (`api.longcat.chat/openai`) ja `authHeader` (`Valtuutus: Bearer`). -**#535 — Kiinnitetyn mallin ohitus:**"body.model" on nyt asetettu oikein arvoon "pinnedModel", kun kontekstivälimuistisuojaus on aktiivinen. -**#532 — OpenCode Go -avaimen vahvistus:**Käyttää nyt zen/v1-testipäätepistettä (testKeyBaseUrl) – sama avain toimii molemmilla tasoilla.#### CLI & Tools

-**#527 — Claude Code + Codex -silmukka:**"tool_result" -lohkot muunnetaan nyt tekstiksi pudotuksen sijaan, mikä pysäyttää loputtomat työkalu-tulossilmukat. -**#524 — OpenCode-asetusten tallennus:**Lisätty "saveOpenCodeConfig()" -käsittelijä (XDG_CONFIG_HOME tietoinen, kirjoittaa TOML). -**#521 — Kirjautuminen jumissa:**Kirjautuminen ei enää jumiudu salasanan määrityksen ohituksen jälkeen – ohjaa oikein käyttöönottoon. -**#522 – API Manager:**Harhaanjohtava "Kopioi maskattu avain" -painike poistettu (korvattu lukkokuvakkeen työkaluvihjeellä). -**#532 — OpenCode Go -määritys:**Opasasetusten käsittelijä käsittelee nyt "opencode" toolId:n.#### Developer Experience

-**#489 — Antigravity:**Puuttuva googleProjectId palauttaa strukturoidun 422-virheen yhdistämisohjeineen salaperäisen kaatumisen sijaan. -**#510 — Windows-polut:**MSYS2/Git-Bash-polut (`/c/Program Files/...`) normalisoidaan nyt automaattisesti muotoon `C:\Program Files\...`. -**#492 — CLI:n käynnistys:**"omniroute" CLI havaitsee nyt "mise"/"nvm"-hallitun solmun, kun "app/server.js" puuttuu, ja näyttää kohdistetut korjausohjeet.---

### 📖 Documentation Updates

-**#513**— Dockerin salasanan palautus: 'INITIAL_PASSWORD' env var kiertotapa dokumentoitu -**#520**— pnpm: "pnpm hyväksy - rakentaa paremman sqlite3" -vaihe dokumentoitu---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#5353` `#535---

### 🔀 Community PRs Merged

| PR       | Tekijä       | Yhteenveto                                                                              |
| -------- | ------------ | --------------------------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | OpenCode Zen + Go -palveluntarjoajat, joissa on "OpencodeExecutor" ja parannetut testit | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Rate-limit DB:n pysyvyys: "setConnectionRateLimitUntil()", "isConnectionRateLimited()", "getRateLimitedConnections()" tiedostossa "providers.ts". Olemassa oleva "rate_limited_until" -sarake on nyt esillä erillisenä sovellusliittymänä – OAuth-tunnuksen päivitys EI saa koskettaa tätä kenttää nopeusrajoitussilmukan estämiseksi. -**T08**— API-avainkohtainen istuntorajoitus: "max_sessions INTEGER DEFAULT 0" lisättiin "api_keys" -kohtaan automaattisen siirron kautta. "sessionManager.ts" saa "registerKeySession()", "unregisterKeySession()", "checkSessionLimit()" ja "getActiveSessionCountForKey()". ChatCore.js:n soittajat voivat pakottaa rajaa ja pienentää req.closea. -**T09**— Codex vs Spark -nopeusrajoitusalueet: "getCodexModelScope()" ja "getCodexRateLimitKey()" koodissa "codex.ts". Vakiomallit ("gpt-5.x-codex", "codex-mini") saavat laajuuden "codex"; kipinämallit (`codex-spark*`) saavat laajuuden `"spark"`. Rate-raja-avainten tulee olla `${accountId}:${scope}`, jotta yhden poolin tyhjentäminen ei estä toista. -**T13**— Vanhentunut kiintiön näyttökorjaus: "getEffectiveQuotaUsage(used, resetAt)" palauttaa arvon "0", kun palautusikkuna on kulunut. "formatResetCountdown(resetAt)" palauttaa ihmisen luettavan laskurijonon (esim. "2h 35m"). Molemmat viety tiedostoista "providers.ts" + "localDb.ts" hallintapaneelin käyttöä varten. -**T14**— Välityspalvelimen nopea epäonnistuminen: uusi `src/lib/proxyHealth.ts`, jossa on `isProxyReachable(proxyUrl, timeoutMs=2000)` (TCP-tarkistus, ≤2s 30 s aikakatkaisun sijaan), `getCachedProxyHealth()`, Prox`, jahealthidate "getAllProxyHealthStatuses()". Tulokset välimuistissa oletuksena 30s; konfiguroitavissa `PROXY_FAST_FAIL_TIMEOUT_MS`/`PROXY_HEALTH_CACHE_TTL_MS` kautta.### 🧪 Tests

- Testisarja:**832 testiä, 0 virhettä**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— 'requested_model' -sarake 'call_logs' -kohdassa (siirto 009): seuraa asiakkaan alun perin pyytämää mallia verrattuna todelliseen reititettyyn malliin. Ottaa käyttöön varanopeusanalytiikan. -**T02**— Poista tyhjät tekstilohkot sisäkkäisestä "tool_result.content":sta: estää Anthropic 400 -virheet ("tekstisisältölohkojen ei saa olla tyhjiä"), kun Claude Code ketjuttaa työkalutuloksia. -**T03**— Jäsennä `x-codex-5h-*` / `x-codex-7d-*`-otsikot: `parseCodexQuotaHeaders()` + `getCodexResetTime()` -poimi Codex-kiintiöikkunat tarkan jäähtymisaikataulun saamiseksi yleisen 5 minuutin varapuheenvuoron sijaan. -**T04**— "X-Session-Id"-otsikko ulkoiselle tahmealle reititykselle: "extractExternalSessionId()" tiedostossa "sessionManager.ts" lukee "x-session-id" / "x-omniroute-session"-otsikot, joissa on SHA-25-etuliite, jotta vältetään sisäiset tunnukset "ext:-ision". Nginx-yhteensopiva (tavutettu otsikko). -**T06**— Tili deaktivoitu → pysyvä esto: "isAccountDeactivated()": `accountFallback.ts' havaitsee 401 deaktivointisignaalia ja soveltaa 1 vuoden viivettä estääkseen pysyvästi kuolleiden tilien uudelleen yrittämisen.
-**T07**— X-Forwarded-For IP validation: uusi "src/lib/ipUtils.ts" ja "extractClientIp()" ja "getClientIpFromRequest()" - ohittaa "tuntemattomat"/ei-IP-merkinnät X-Forwarded-Forward-pyyntöketjuissa (Nginx).
-**T10**— Krediitit käytetty loppuun → erillinen varavaihtoehto: "isCreditsExhausted()":ssa "accountFallback.ts" palauttaa 1 tunnin jäähdytysajan "creditsExhausted"-lipulla, joka eroaa yleisestä 429-nopeusrajoituksesta.
-**T11**— `maksimi` perustelutyö → 131072 budjettitunnusta: EFFORT_BUDGETS ja THINKING_LEVEL_MAP päivitetty; käänteinen kartoitus palauttaa nyt arvon "max" täyden budjetin vastauksille. Yksikkötesti päivitetty. -**T12**— MiniMax M2.7 -hinnoittelumerkinnät lisätty: "minimax-m2.7", "MiniMax-M2.7", "minimax-m2.7-highspeed" lisätty hinnoittelutaulukkoon (sub2api PR #1120). M2.5/GLM-4.7/GLM-5/Kimi-hinnoittelu oli jo olemassa. -**T15**— Array-sisällön normalisointi: "normalizeContentToString()" -apuohjelma "openai-to-claude.ts" -tiedostossa tiivistää oikein taulukkomuotoiset järjestelmä-/työkaluviestit merkkijonoksi ennen lähettämistä Anthropicille.### 🧪 Tests

- Testisarja:**832 testiä, 0 virhettä**(muuttumaton rc.5:stä)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— Registred Keys Provisioning API: automaattisesti myönnettävä API-avaimet palveluntarjoaja- ja tilikohtaisilla kiintiövalvoilla

- "POST /api/v1/registered-keys" - anna avaimet idempotenssituella
- "GET /api/v1/registered-keys" - luettelo (naamioituneet) rekisteröidyt avaimet
- "GET /api/v1/registered-keys/{id}" - hanki avaimen metatiedot
- `POISTA /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — peruuta avaimet
- "GET /api/v1/quotas/check" - esivahvistettava ennen myöntämistä
- "PUT /api/v1/providers/{id}/limits" - aseta palveluntarjoajan myöntämisrajoitukset
- `PUT /api/v1/accounts/{id}/limits` — set account issuance limits
- "POST /api/v1/issues/report" - valinnainen GitHub-ongelmien raportointi
- Tietokannan siirto 008: "rekisteröidyt_avaimet", "palveluntarjoajan_avainrajoitukset", "account_key_limits"-taulukot---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— OpenCode Zen- ja OpenCode Go -palveluntarjoajat lisätty (tekijä @kang-heewon)

- Uusi OpencodeExecutor monimuotoisella reitityksellä (/chat/completions,/messages,/responses)
- 7 mallia molemmilla tasoilla---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**– Palveluntarjoajan kuvakkeet käyttävät nyt muotoa [@lobehub/icons](https://github.com/lobehub/lobe-icons), jossa on tyylikäs PNG-varaustoiminto ja ProviderIcon-komponentti (tuettu yli 130 palveluntarjoajaa) -**#488**— Auto-update model lists every 24h via `modelSyncScheduler` (configurable via `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: näyttää nyt selkeän toimintakelpoisen virheen, kun "GEMINI_OAUTH_CLIENT_SECRET" puuttuu Dockerin/itseisännöidystä käyttöönotosta---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— LongCat AI -avaimen vahvistus: kiinteä baseUrl (`api.longcat.chat/openai`) ja authHeader (`Authorization: Bearer`) -**#535**— Kiinnitetyn mallin ohitus: "body.model" on nyt asetettu arvoon "pinnedModel", kun kontekstivälimuistisuojaus havaitsee kiinnitetyn mallin -**#524**— OpenCode-määritykset on nyt tallennettu oikein: lisätty "saveOpenCodeConfig()" -käsittelijä (XDG_CONFIG_HOME tietoinen, kirjoittaa TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Kirjautuminen ei enää jumiudu salasanan määrittämisen väliin (uudelleenohjaukset käyttöönottoon) -**#522**— API Manager: Harhaanjohtava "Kopioi maskattu avain" -painike poistettu (korvattu lukkokuvakkeen työkaluvihjeellä) -**#527**— Claude Code + Codexin supervoimien silmukka: "tool_result" -lohkot muunnetaan nyt tekstiksi pudotuksen sijaan -**#532**— OpenCode GO API -avaimen vahvistus käyttää nyt oikeaa zen/v1-päätepistettä ("testKeyBaseUrl") -**#489**- Antigravity: puuttuva "googleProjectId" palauttaa strukturoidun 422-virheen yhdistämisohjauksella -**#510**— Windows: MSYS2/Git-Bash-polut (`/c/Program Files/...`) on nyt normalisoitu muotoon `C:\Program Files\...` -**#492**- "omniroute" CLI havaitsee nyt "mise"/"nvm", kun "app/server.js" puuttuu ja näyttää kohdistetun korjauksen### Dokumentaatio

-**#513**— Dockerin salasanan palautus: 'INITIAL_PASSWORD' env var kiertotapa dokumentoitu -**#520**— pnpm: `pnpm approve-builds better-sqlite3` documented### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Uudet OpenCode-palveluntarjoajat, upotustunnistetietojen korjaus, CLI-naamioitu avaimen virhe, CACHE_TAG_PATTERN-korjaus.### 🐛 Bug Fixes

-**CLI-työkalut tallentavat peitetyn API-avaimen määritystiedostoihin**— "claude-settings", "cline-settings" ja "openclaw-settings" POST-reitit hyväksyvät nyt "keyId"-parametrin ja ratkaisevat todellisen API-avaimen tietokannasta ennen levylle kirjoittamista. "ClaudeToolCard" päivitettiin lähettämään "keyId" peitetyn näyttömerkkijonon sijaan. Korjaukset #523, #526. -**Muokatut upotuspalveluntarjoajat: Ei tunnistetietoja -virhe**— `/v1/embeddings' seuraa nyt credentialsProviderId-tunnusta erillään reititysetuliitteestä, joten kirjautumistiedot haetaan vastaavasta tarjoajan solmun tunnuksesta julkisen etuliitemerkkijonon sijaan. Korjaa regression, jossa google/gemini-embedding-001 ja vastaavat mukautetun palveluntarjoajan mallit epäonnistuvat aina valtuustietovirheen vuoksi. Korjaukset #532:een liittyen. (PR #528, @jacob2826)
-**Kontekstivälimuistin suojauksen regex puuttuu `
`etuliite**—`CACHE_TAG_PATTERN`tiedostossa`comboAgentMiddleware.ts`päivitetty vastaamaan molempia kirjaimellisia`
` (kenoviiva-n) ja varsinainen rivinvaihto U+000A, jonka "combo.ts" -suoratoisto lisää <omniModel>-tunnisteen ympärille korjauksen #515 jälkeen. Korjaus #531.### ✨ New Providers

-**OpenCode Zen**— Ilmainen tasoyhdyskäytävä osoitteessa "opencode.ai/zen/v1" kolmella mallilla: "minimax-m2.5-free", "big-pickle", "gpt-5-nano" -**OpenCode Go**– Tilauspalvelu osoitteessa `opencode.ai/zen/go/v1` neljällä mallilla: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude-muoto), `minimax-m2.5` (Claude-muoto)

- Molemmat palveluntarjoajat käyttävät uutta "OpencodeExecutoria", joka reitittää dynaamisesti kohtiin "/chat/completions", "/messages", "/responses" tai "/models/{model}:generateContent" pyydetyn mallin perusteella. (PR #530, @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Virheenkorjauksia – säilytä Codex-kehotteen välimuistiavain, korjaa tagContent JSON-pako, synkronoi vanhentuneen tunnuksen tila DB:hen.### 🐛 Bug Fixes

-**fix(translator)**: Preserve `prompt_cache_key` in Responses API → Chat Completions translation (#517)
— Kenttä on Codexin käyttämä välimuistin affiniteettisignaali; sen poistaminen esti välimuistin nopeat osumat.
Korjattu tiedostoissa "openai-responses.ts" ja "responsesApiHelper.ts".

-**korjaa(yhdistelmä)**: Escape `
` tagContentissa, joten lisätty JSON-merkkijono on kelvollinen (#515)
— Mallin kirjaimelliset rivinvaihdot (U+000A) eivät ole sallittuja ilman koodinvaihtomerkkejä JSON-merkkijonoarvojen sisällä.
Korvattu "\n" kirjaimellisilla sarjoilla tiedostossa "open-sse/services/combo.ts".

-**fix(usage)**: Synkronoi vanhentuneen tunnuksen tila takaisin DB:hen live-todennusvirheen yhteydessä (#491)
— Kun Limits & Quota live check palauttaa 401/403, yhteyden "testStatus" päivitetään nyt
`"vanhentunut"` tietokannassa, jotta Palveluntarjoajat-sivu heijastelee samaa huonontunutta tilaa.
Korjattu tiedostossa "src/app/api/usage/[connectionId]/route.ts".---

## [2.9.3] — 2026-03-21

> Sprint: Lisää 5 uutta ilmaista tekoälyn tarjoajaa — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Add LongCat AI (`lc/`) — 50M tokens/day free (Flash-Lite) + 500K/day (Chat/Thinking) during public beta. OpenAI-yhteensopiva, standardi Bearer-auth. -**feat(providers/pollinations)**: Lisää Pollinations AI (`pol/`) – API-avainta ei tarvita. Välityspalvelimet GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 tarve/15s ilmaiseksi). Mukautettu suorittaja käsittelee valinnaisen todennuksen. -**feat(providers/cloudflare-ai)**: Lisää Cloudflare Workers AI (`cf/`) — 10 000 neuronia päivässä ilmaiseksi (~150 LLM-vastausta tai 500 s Whisper-ääntä). Yli 50 mallia maailmanlaajuisesti. Mukautettu suorittaja rakentaa dynaamisen URL-osoitteen "accountId"-tunnuksella valtuustiedoista. -**feat(providers/scaleway)**: Lisää Scaleway Generatiiviset API:t (`scw/`) – 1 miljoonaa ilmaista tokenia uusille tileille. EU/GDPR-yhteensopiva (Pariisi). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2. -**feat(providers/aimlapi)**: Lisää AI/ML API (`aiml/`) — 0,025 $/päivä ilmainen luotto, 200+ mallia (GPT-4o, Claude, Gemini, Llama) yhden kokoajan päätepisteen kautta.### 🔄 Provider Updates

-**feat(providers/together)**: Lisää "hasFree: true" + 3 pysyvästi ilmaista mallitunnusta: "Llama-3.3-70B-Instruct-Turbo-Free", "Llama-Vision-Free", "DeepSeek-R1-Distill-Llama-70B" -**feat(providers/gemini)**: Lisää "hasFree: true" + "freeNote" (1 500 req/päivä, luottokorttia ei tarvita, aistudio.google.com) -**chore(providers/gemini)**: Selvyyden vuoksi nimeä näyttönimeksi "Gemini (Google AI Studio)".### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Uusi "PollinationsExecutor" - jättää "Authorization"-otsikon pois, kun API-avainta ei ole annettu -**feat(executors/cloudflare-ai)**: Uusi "CloudflareAIExecutor" – dynaaminen URL-osoitteiden rakentaminen edellyttää "accountId" palveluntarjoajan tunnistetiedoissa -**feat(executors)**: Rekisteröi "pollinations", "pol", "cloudflare-ai", "cf" toteuttajakuvaukset### Dokumentaatio

-**docs(readme)**: Laajennettu ilmainen yhdistelmäpino 11 palveluntarjoajalle (0 dollaria ikuisesti) -**docs(readme)**: Lisätty 4 uutta ilmaista palveluntarjoajaosiota (LongCat, Pollinations, Cloudflare AI, Scaleway) mallitaulukoineen -**docs(readme)**: Päivitetty hinnoittelutaulukko, jossa on 4 uutta ilmaista tasoriviä -**docs(i18n/pt-BR)**: Päivitetty hinnoittelutaulukko + lisätty portugaliksi LongCat/Pollinations/Cloudflare AI/Scaleway-osiot -**docs(new-features/ai)**: 10 tehtävän spesifikaatiotiedostoa + yleinen toteutussuunnitelma kohteessa `docs/new-features/ai/`### 🧪 Tests

- Testisarja:**821 testiä, 0 virhettä**(ennallaan)---

## [2.9.2] — 2026-03-21

> Sprint: Korjaa median transkriptio (Deepgram/HuggingFace Content-Type, kielentunnistus) ja TTS-virheen näyttö.### 🐛 Bug Fixes

-**fix(transkriptio)**: Deepgram- ja HuggingFace-äänitranskriptio yhdistävät nyt oikein `video/mp4` → `audio/mp4` ja muut median MIME-tyypit uuden `resolveAudioContentType()-apuohjelman avulla. Aiemmin .mp4-tiedostojen lataaminen palautti jatkuvasti "Puhetta ei havaittu", koska Deepgram vastaanotti "Content-Type: video/mp4".
-**fix(transkriptio)**: Deepgram-pyyntöihin lisätty "detect_language=true" - tunnistaa automaattisesti äänen kielen (portugali, espanja jne.) englannin sijaan. Korjaa ei-englanninkieliset transkriptiot, jotka palauttavat tyhjiä tai roskatuloksia.
-**fix(transcription)**: Lisätty "punctuate=true" Deepgram-pyyntöihin korkealaatuisemman transkription tulosteen saamiseksi oikeilla välimerkeillä.
-**fix(tts)**: "[object Object]" virhenäyttö tekstistä puheeksi -vastauksissa korjattu sekä "audioSpeech.ts"- että "audioTranscription.ts"-tiedostoissa. Funktio "upstreamErrorResponse()" poimii nyt oikein sisäkkäiset merkkijonoviestit palveluntarjoajilta, kuten ElevenLabs, jotka palauttavat `{ error: { message: "...", status_code: 401 } }` tasaisen virhemerkkijonon sijaan.### 🧪 Tests

- Testisarja:**821 testiä, 0 virhettä**(ennallaan)### Triaged Issues

-**#508**— Työkalukutsumuodon regressio: pyydetyt välityspalvelinlokit ja toimittajaketjun tiedot ("needs-info") -**#510**— Windowsin CLI-kunnontarkistuspolku: pyydetty komentotulkin/solmun versiotiedot ("needs-info") -**#485**— Kiro MCP -työkalukutsut: suljettu ulkoisena Kiro-ongelmana (ei OmniRoute) -**#442**— Baseten /models päätepiste: suljettu (dokumentoitu manuaalinen kiertotapa) -**#464**— Avaimen hallintasovellusliittymä: tunnustettu etenemissuunnitelman kohteeksi---

## [2.9.1] — 2026-03-21

> Sprint: Korjaa SSE omniModel -tietojen menetys, yhdistä protokollakohtaisen mallin yhteensopivuus.### Bug Fixes

-**#511**— Kriittinen: "<omniModel>" -tunniste lähetettiin SSE-virroissa "finish_reason:stop" -tunnisteen jälkeen, mikä aiheutti tietojen menetyksen. Tagi lisätään nyt ensimmäiseen ei-tyhjään sisältöpalaan, mikä takaa toimituksen ennen kuin SDK:t sulkevat yhteyden.### Merged PRs

-**PR #512**(@zhangqiang8vip): Yhteensopivuus protokollakohtaisesti - "normalizeToolCallId" ja "preserveOpenAIDeveloperRole" voidaan nyt määrittää asiakasprotokollan mukaan (OpenAI, Claude, Responses API). Uusi compatByProtocol-kenttä mallin kokoonpanossa Zod-tarkistuksen kanssa.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: pyydetty PATH/versiotiedot -**#509**— Turbopack Electron -regressio: ylävirran Next.js-virhe, dokumentoidut kiertotavat -**#508**— macOS:n musta näyttö: ehdotettu "--disable-gpu" -kiertotapa---

## [2.9.0] — 2026-03-20

> Sprint: Cross-platform machineId-korjaus, API-avainkohtaiset nopeusrajoitukset, suoratoistokontekstin välimuisti, Alibaba DashScope, hakuanalytiikka, ZWS v5 ja 8 ongelmaa suljettu.### ✨ New Features

-**feat(search)**: Hae Analytics-välilehteä kohdassa `/dashboard/analytics' – tarjoajien erittely, välimuistin osumaprosentti, kustannusseuranta. Uusi API: "GET /api/v1/search/analytics" (#feat/search-provider-routing)
-**feat(provider)**: Alibaba Cloud DashScope, johon on lisätty mukautetun päätepistepolun vahvistus – määritettävä chatPath ja modelsPath solmukohtaisesti (#feat/custom-endpoint-paths)
-**feat(api)**: API-avainkohtaiset pyyntömäärärajat – `max_requests_per_day' ja `max_requests_per_minute' -sarakkeet, joissa on muistissa oleva liukuikkunan valvonta, joka palauttaa HTTP 429:n (#452) -**feat(dev)**: ZWS v5 — HMR-vuodon korjaus (485 DB yhteyksiä → 1), muisti 2,4 Gt → 195 Mt, "globalThis" singletons, Edge Runtime -varoituskorjaus (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Cross-platform `machineId` — `getMachineIdRaw()` kirjoitettu uudelleen try/catch-vesiputouksella (Windows REG.exe → macOS ioreg → Linux-tiedoston luku → isäntänimi → `os.hostname()`). Poistaa "process.platform" -haaroittumisen, jonka Next.js-niputtaja eliminoi kuolleen koodin. Korjausta "head" ei tunnisteta Windowsissa. Korjaa myös #466. -**fix(#493)**: Muokatun palveluntarjoajan mallin nimeäminen — poistettu virheelliset etuliitteet tiedostosta "DefaultExecutor.transformRequest()", joka sekoitti organisaation laajuisia mallitunnuksia, kuten "zai-org/GLM-5-FP8". -**fix(#490)**: Suoratoisto + kontekstivälimuistin suojaus — `TransformStream` sieppaa SSE:n ja lisää `<omniModel>-tunnisteen ennen `[DONE]`-merkkiä, mikä mahdollistaa kontekstivälimuistin suojauksen suoratoistovastauksille.
-**fix(#458)**: Yhdistelmäskeeman vahvistus — `system_message`, `tool_filter_regex-, `context_cache_protection` -kentät läpäisevät nyt Zod-vahvistuksen tallennuksen yhteydessä. -**fix(#487)**: KIRO MITM -kortin puhdistus — poistettu ZWS_README, luotu "AntigravityToolCard" dynaamisten työkalujen metatietojen käyttämiseksi.### 🧪 Tests

- Lisätty Anthropic-format työkalut suodatinyksikkötestit (PR #397) - 8 regressiotestiä työkalulle.name ilman .function-käärettä
- Testisarja:**821 testiä, 0 virhettä**(813:sta)### 📋 Issues Closed (8)

-**#506**- Windows machineId -päätä ei tunnisteta (korjattu) -**#493**- Muokattu toimittajamallin nimeäminen (korjattu) -**#490**- Suoratoiston kontekstivälimuisti (korjattu) -**#452**- API-avaimen pyyntörajoitukset (toteutettu) -**#466**— Windowsin kirjautumisvirhe (sama syy kuin #506) -**#504**- MITM ei ole aktiivinen (odotettu toiminta) -**#462**- Gemini CLI PSA (ratkaistu) -**#434**- Electron-sovelluksen kaatuminen (kopio numerosta 402)## [2.8.9] — 2026-03-20

> Sprint: Yhdistä yhteisön PR:t, korjaa KIRO MITM -kortti, riippuvuuspäivitykset.### Merged PRs

-**PR #498**(@Sajid11194): Korjaa Windows-koneen tunnuksen kaatuminen (`undefined\REG.exe`). Korvaa "node-machine-id" alkuperäisillä käyttöjärjestelmän rekisterikyselyillä.**Sulkeutuu #486.** -**PR #497**(@zhangqiang8vip): Korjaa dev-tilan HMR-resurssivuotoja — 485 vuotanutta DB-liitäntää → 1, muistia 2,4 Gt → 195 Mt. "globalThis" singletons, Edge Runtime -varoituskorjaus, Windows-testin vakaus. (+1168/-338 22 tiedostossa) -**PR:t #499-503**(Dependabot): GitHub Actions -päivitykset — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-description@5`, `docker/setup-qemu-description@5`, `docker/setup-qemu-log,-`action@4/`-`action.### Bug Fixes

-**#505**— KIRO MITM -kortti näyttää nyt työkalukohtaiset ohjeet (`api.anthropic.com`) antigravitaatiokohtaisen tekstin sijaan. -**#504**— Vastattiin UX-selvennyksellä (MITM "Ei-aktiivinen" on odotettu käyttäytyminen, kun välityspalvelin ei ole käynnissä).---

## [2.8.8] — 2026-03-20

> Sprint: Korjaa OAuthin erätestin kaatuminen, lisää "Testaa kaikki" -painike yksittäisille palveluntarjoajan sivuille.### Bug Fixes

-**OAuth-erätestin kaatuminen**(ERR_CONNECTION_REFUSED): Korvattu peräkkäinen for-silmukka 5-yhteyden samanaikaisuusrajalla + 30 s yhteyskohtaisella aikakatkaisulla "Promise.race()" + "Promise.allSettled()" kautta. Estää palvelimen kaatumisen, kun testataan suuria OAuth-palveluntarjoajia (~30+ yhteyttä).### Ominaisuudet

-**"Testaa kaikki" -painike palveluntarjoajan sivuilla**: Yksittäisten palveluntarjoajien sivuilla (esim. "/providers/codex") näkyy nyt "Testaa kaikki" -painike Yhteydet-otsikossa, kun yhteyksiä on yli 2. Käyttää `POST /api/providers/test-batch` ja `{mode: "provider", providerId}`. Tulokset näytetään modaalissa, jossa on hyväksytty/hylätty yhteenveto ja yhteyskohtainen diagnoosi.---

## [2.8.7] — 2026-03-20

> Sprint: Yhdistä PR #495 (pullonkaula 429 pudotus), korjaus #496 (muokatut upotustoimittajat), lajitteluominaisuudet.### Bug Fixes

-**Pullonkaula 429: ääretön odotus**(PR #495, @xandr0s): 429:ssä `limiter.stop({ dropWaitingJobs: true })` epäonnistuu välittömästi kaikissa jonossa olevissa pyynnöissä, joten ylävirran soittajat voivat laukaista varapuheenvuoron. Limiter poistetaan kartasta, joten seuraava pyyntö luo uuden esiintymän. -**Muokatut upotusmallit, joita ei voida ratkaista**(#496): "POST /v1/embeddings" ratkaisee nyt mukautetut upotusmallit KAIKISTA palveluntarjoajan_solmuista (ei vain localhostista). Enables models like `google/gemini-embedding-001` added via dashboard.### Issues Responded

-**#452**- API-avaimen pyyntömäärärajat (hyväksytty, etenemissuunnitelmassa) -**#464**- Anna automaattisesti API-avaimia palveluntarjoajan/tilin rajoituksilla (vaatii lisätietoja) -**#488**- Päivitä malliluettelot automaattisesti (hyväksytty, etenemissuunnitelmassa) -**#496**- Muokatun upotustarjoajan resoluutio (kiinteä)---

## [2.8.6] — 2026-03-20

> Sprint: Yhdistä PR #494 (MiniMax-roolin korjaus), korjaa KIRO MITM -kojelauta, triage 8 -ongelmat.### Ominaisuudet

-**MiniMax-kehittäjä→järjestelmän roolin korjaus**(PR #494, @zhangqiang8vip): Mallikohtainen "preserveDeveloperRole" -kytkin. Lisää "Yhteensopivuus"-käyttöliittymän tarjoajien sivulle. Korjaa 422 "rooliparametrivirheen" MiniMaxille ja vastaaville yhdyskäytäville. -**roleNormalizer**: `normalizeDeveloperRole()` hyväksyy nyt preserveDeveloperRole-parametrin kolmitilakäyttäytymisellä (undefined=keep, true=keep, false=convert). -**DB**: Uusi getModelPreserveOpenADeveloperRole() ja mergeModelCompatOverride() mallissa models.ts.### Bug Fixes

-**KIRO MITM -hallintapaneeli**(#481/#487): `CLIToolsPageClient` reitittää nyt minkä tahansa `configType: "mitm"-työkalun `AntigravityToolCard'-kortille (MITM-aloitus/pysäytysohjaimet). Aikaisemmin vain Antigravity oli kovakoodattu. -**AntigravityToolCard geneerinen**: Käyttää "tool.image", "tool.description" ja "tool.id" kovakoodattujen Antigravity-arvojen sijaan. Suojaa puuttuvilta oletusmalleja.### Cleanup

- Poistettu "ZWS_README_V2.md" (vain kehitysasiakirjat PR #494:stä).### Issues Triaged (8)

-**#487**— Suljettu (KIRO MITM korjattu tässä julkaisussa) -**#486**— needs-info (Windows REG.exe PATH -ongelma) -**#489**— tarpeet-tiedot (Antigravity projectId puuttuu, OAuth-uudelleenyhteys tarvitaan) -**#492**— needs-info (puuttuu app/server.js väärinhallitusta solmusta) -**#490**— Hyväksytty (suoratoisto + kontekstivälimuistin esto, korjaus suunnitteilla) -**#491**- Hyväksytty (Codex-todennustilan epäjohdonmukaisuus) -**#493**- Hyväksytty (Modaalisen toimittajan mallin nimen etuliite, kiertotapa) -**#488**— Ominaisuuspyyntöjen ruuhka (automaattisesti päivitetyt malliluettelot)---

## [2.8.5] — 2026-03-19

> Sprint: Korjaa zombie SSE -virrat, kontekstivälimuistin ensimmäinen kierros, KIRO MITM ja triage 5 ulkoiset ongelmat.### Bug Fixes

-**Zombie SSE Streams**(#473): Pienennä `STREAM_IDLE_TIMEOUT_MS` aikavälillä 300 s → 120 s nopeuttaaksesi yhdistelmävaroitusta, kun palveluntarjoajat keskeyttävät virran kesken. Konfiguroitavissa env var. -**Context Cache Tag**(#474): Korjaa "injectModelTag()" käsittelemään ensimmäisen vuoron pyyntöjä (ei avustajaviestejä) – kontekstivälimuistin suojaus toimii nyt heti ensimmäisestä vastauksesta lähtien. -**KIRO MITM**(#481): Muuta KIRO `configType` arvosta `guide` → `mitm`, jotta kojelauta näyttää MITM:n käynnistys-/pysäytysohjaimet. -**E2E-testi**(CI): Korjaa "providers-bailian-coding-plan.spec.ts" — hylkää olemassa oleva modaalinen peittokuva ennen kuin napsautat Lisää API-avain -painiketta.### Closed Issues

- #473 — Zombie SSE -suoratoisto ohittaa yhdistelmävaran
- #474 - Kontekstivälimuistin <omniModel>-tunniste puuttuu ensimmäisellä kierroksella
- #481 — MITM for KIRO ei aktivoidu kojelaudalta
- #468 — Gemini CLI -etäpalvelin (korjattu #462 käytöstäpoistolla)
- #438 - Claude ei pysty kirjoittamaan tiedostoja (ulkoinen CLI-ongelma)
- #439 - AppImage ei toimi (dokumentoitu libfuse2-kiertotapa)
- #402 - ARM64 DMG "vaurioitunut" (dokumentoitu xattr -cr -kiertotapa)
- #460 - CLI ei ole käytettävissä Windowsissa (dokumentoitu PATH-korjaus)---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI:n vanheneminen, VM Guide i18n -korjaus, dependabot-tietoturvakorjaus, palveluntarjoajan skeeman laajennus.### Ominaisuudet

-**Gemini CLI Deprecation**(#462): Merkitse "gemini-cli" -palveluntarjoaja vanhentuneeksi varoituksella – Google rajoittaa kolmannen osapuolen OAuthin käyttöä maaliskuusta 2026 alkaen -**Provider Schema**(#462): Laajenna Zod-tarkistus valinnaisilla kentillä "deprecated", "deprecationReason", "hasFree", "freeNote", "authHint", "apiHint".### Bug Fixes

-**VM Guide i18n**(#471): Lisää VM_DEPLOYMENT_GUIDE.md i18n-käännösputkeen, luo uudelleen kaikki 30 kielikäännöstä englanninkielisestä lähteestä (juttuivat portugaliksi)### Turvallisuus

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — korjaa CWE-1321 prototyypin saastumisen (#484, @dependabot)### Closed Issues

- #472 - Mallin aliasten regressio (korjattu v2.8.2:ssa)
- #471 — VM-oppaan käännökset rikki
- #483 - "data: null" perässä "[VALMIS]" jälkeen (korjattu v2.8.3:ssa)### Merged PRs

- #484 — deps: litistetty 3.3.3:sta 3.4.2:een (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Tšekin i18n, SSE-protokollan korjaus, VM-oppaan käännös.### Ominaisuudet

-**Tšekin kieli**(#482): koko tšekki (cs) i18n – 22 dokumenttia, 2606 käyttöliittymämerkkijonoa, kielenvaihtopäivitykset (@zen0bit) -**VM Deployment Guide**: Käännetty portugalista englanniksi lähdeasiakirjana (@zen0bit)### Bug Fixes

-**SSE-protokolla**(#483): Lopeta data: null-tunnisteen lähettäminen [DONE]-signaalin jälkeen – korjaa AI_TypeValidationError-virheen tiukoissa AI SDK -asiakasohjelmissa (Zod-pohjaiset tarkistajat)### Merged PRs

- #482 — Lisää tšekin kieli + Korjaa VM_DEPLOYMENT_GUIDE.md englanninkielinen lähde (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 yhdistettyä PR:tä, mallialiasten reitityksen korjaus, lokien vienti ja ongelman triage.### Ominaisuudet

-**Lokin vienti**: Uusi vientipainike kohdassa `/dashboard/logs', jossa on avattava aikavälivalikko (1h, 6h, 12h, 24h). Lataa pyyntö-/välityspalvelin-/puhelulokien JSON-tiedosto `/api/logs/export-sovellusliittymän kautta (#user-request)### Bug Fixes

-**Mallialiasten reititys**(#472): Asetukset → Mallialiakset vaikuttavat nyt oikein palveluntarjoajan reitittämiseen, eivät vain muodon havaitsemiseen. Aikaisemmin "resolveModelAlias()" -tulostusta käytettiin vain "getModelTargetFormat()" -funktiolle, mutta alkuperäinen mallitunnus lähetettiin toimittajalle -**Stream Flush Usage**(#480): Puskurin viimeisimmän SSE-tapahtuman käyttötiedot puretaan nyt oikein stream-huuhtelun aikana (yhdistetty @prakershista)### Merged PRs

- #480 — Pura käyttö huuhtelukäsittelijän jäljellä olevasta puskurista (@prakersh)
- #479 - Lisää puuttuvat Codex 5.3/5.4 ja Anthropic Model ID -hinnoittelumerkinnät (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Viisi yhteisön PR:tä – suoratoistopuhelulokin korjaukset, Kiro-yhteensopivuus, välimuistin tunnuksen analytiikka, kiinankielinen käännös ja konfiguroitavat työkalujen puhelutunnukset.### Ominaisuudet

-**feat(logs)**: Puhelulokin vastaussisältö on nyt kerätty oikein raakapalveluntarjoajan osista (OpenAI/Claude/Gemini) ennen käännöstä, mikä korjaa tyhjät vastaushyötykuormat suoratoistotilassa (#470, @zhangqiang8vip) -**feat(providers)**: Mallikohtainen konfiguroitava 9-merkkinen työkalukutsun tunnuksen normalisointi (Mistral-tyylinen) – vain mallit, joissa vaihtoehto on käytössä, saavat katkaistut tunnukset (#470) -**feat(api)**: Key PATCH API laajennettu tukemaan "allowedConnections", "name", "autoResolve", "isActive" ja "accessSchedule" -kenttiä (#470) -**feat(dashboard)**: Response-first-layout pyyntölokin tietojen käyttöliittymässä (#470) -**feat(i18n)**: Parannettu kiinan (zh-CN) käännös – täydellinen uudelleenkäännös (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Poista lisätty "malli"-kenttä pyynnön rungosta — Kiro API hylkää tuntemattomat ylätason kentät (#478, @prakersh) -**fix(usage)**: Sisällytä välimuistin luku- ja välimuistin luontitunnukset käyttöhistorian syöttösummaan tarkan analytiikan varmistamiseksi (#477, @prakersh) -**fix(callLogs)**: Tukee Claude-muodon käyttökenttiä (`input_tokens`/`output_tokens`) OpenAI-muodon ohella, sisältää kaikki välimuistitunnuksen muunnelmat (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Bailian Coding Plan -palveluntarjoaja muokattavilla perus-URL-osoitteilla sekä yhteisön lahjoitukset Alibaba Cloudiin ja Kimi Codingiin.### Ominaisuudet

-**feat(providers)**: Lisätty Bailian Coding Plan ("bailian-coding-plan") – Alibaba Model Studio Anthropic-yhteensopivalla API:lla. Staattinen luettelo 8 mallista, mukaan lukien Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 ja Kimi K2.5. Sisältää mukautetun todennuksen (400 = kelvollinen, 401/403 = virheellinen) (#467, @Mind-Dragon) -**feat(admin)**: Muokattava oletus-URL palveluntarjoajan järjestelmänvalvojan luonti-/muokkauskulkuissa – käyttäjät voivat määrittää mukautettuja perus-URL-osoitteita yhteyttä kohti. Pysyi providerSpecificData.baseUrl:ssä Zod-skeeman tarkistuksen kanssa, joka hylkäsi muut kuin http-mallit (#467)### 🧪 Tests

- Lisätty yli 30 yksikkötestiä ja 2 e2e-skenaariota Bailian Coding Plan -palveluntarjoajalle, jotka kattavat todennuksen, skeeman vahvistamisen, reittitason käyttäytymisen ja tasojen välisen integraation---

## [2.7.10] — 2026-03-19

> Sprint: Kaksi uutta yhteisön toimittamaa palveluntarjoajaa (Alibaba Cloud Coding, Kimi Coding API-avain) ja Docker pino fix.### Ominaisuudet

-**feat(providers)**: Lisätty Alibaba Cloud Coding Plan -tuki kahdella OpenAI-yhteensopivalla päätepisteellä - "alicode" (Kiina) ja "alicode-intl" (kansainvälinen), kummassakin 8 mallia (#465, @dtk1985) -**feat(providers)**: Lisätty oma "kimi-coding-apikey" -palveluntarjoajapolku – API-avainpohjainen Kimi Coding -käyttöä ei enää pakoteta OAuth-vain "kimi-coding" -reitin kautta. Sisältää rekisterin, vakiot, mallien sovellusliittymän, konfiguroinnin ja validointitestin (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Lisätty puuttuva split2-riippuvuus Docker-kuvaan – 'pino-abstract-transport' vaatii sen ajon aikana, mutta sitä ei kopioitu itsenäiseen säilöön, mikä aiheutti moduulin split2 kaatumisen (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Codex-vastausten alipolun läpivienti on natiivisti tuettu, Windowsin MITM-kaatumiskorjattu ja Combos-agenttiskeemoja säädetty.### Ominaisuudet

-**feat(codex)**: alkuperäisten vastausten alipolku Codexille – reitittää natiivisti "POST /v1/responses/compact" Codexiin ylävirtaan säilyttäen Claude Coden yhteensopivuuden poistamatta "/compact" -liitettä (#457)### 🐛 Bug Fixes

-**fix(combos)**: Zod-skeemat ("updateComboSchema" ja "createComboSchema") sisältävät nyt parametrit "system_message", "tool_filter_regex" ja "context_cache_protection". Korjaa virheen, jossa hallintapaneelin kautta luodut agenttikohtaiset asetukset hylkäsivät hiljaa taustajärjestelmän vahvistuskerros (#458) -**fix(mitm)**: Kiro MITM -profiilin kaatuminen Windowsissa korjattu — "solmun konetunnus" epäonnistui puuttuvan "REG.exe" env:n takia, ja varajärjestelmä antoi kohtalokkaan "crypto ei ole määritelty" -virheen. Varajärjestelmä tuo nyt krypton turvallisesti ja oikein (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Budjetin säästövirhe + yhdistelmäagentin käyttöliittymä + omniModel-tunnisteen suojauskorjaus.### 🐛 Bug Fixes

-**fix(budget)**: "Tallenna rajat" ei enää palauta arvoa 422 — "warningThreshold" lähetetään nyt oikein murtolukuna (0–1) prosenttiosuuden (0–100) sijaan (#451) -**fix(combos)**: `<omniModel>` sisäinen välimuistitagi on nyt poistettu ennen pyyntöjen välittämistä palveluntarjoajille, mikä estää välimuistin istunnon katkokset (#454)### Ominaisuudet

-**feat(combos)**: Agentin ominaisuudet -osio lisätty modaalin luonti/muokkausyhdistelmään – paljasta system_message-ohitus, tool_filter_regex ja context_cache_protection suoraan hallintapaneelista (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker Pinon kaatuminen, Codex CLI -vastausten työntekijän korjaus, pakettilukitussynkronointi.### 🐛 Bug Fixes

-**fix(docker)**: "pino-abstract-transport" ja "pino-pretty" on nyt kopioitu nimenomaisesti Docker runner -vaiheessa — Next.js:n erillinen jäljitys jättää nämä vertaisryhmät huomiotta, mikä aiheuttaa "Cannot find module pino-abstract-transport" kaatumisen käynnistyksen yhteydessä (#449) -**fix(responses)**: Poista "initTranslators()" reitiltä "/v1/responses" – kaatui Next.js-työntekijä ja "työntekijä on poistunut" uncaughtPoikkeuksesta Codex CLI -pyyntöihin (#450)### 🔧 Maintenance

-**chore(deps)**: "package-lock.json" on nyt sitoutunut jokaiseen versiovirheeseen varmistaakseen, että Docker `npm ci' käyttää tarkkoja riippuvuusversioita---

## [2.7.5] — 2026-03-18

> Sprint: UX-parannuksia ja Windows CLI -kunnontarkistuksen korjaus.### 🐛 Bug Fixes

-**fix(ux)**: Näytä oletussalasanavihje kirjautumissivulla – uudet käyttäjät näkevät nyt salasanan alapuolella tekstin "Oletussalasana: 123456" (#437) -**fix(cli)**: Claude CLI ja muut npm-asennetut työkalut havaitaan nyt oikein käytettäviksi Windowsissa – spawn käyttää komentoa "shell:true" .cmd-kääreiden ratkaisemiseen PATHEXT:n kautta (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Hakutyökalujen kojelauta, i18n-korjaukset, Copilot-rajoitukset, Serper-vahvistuskorjaus.### Ominaisuudet

-**feat(search)**: Lisää Search Playground (10. päätepiste), Hakutyökalut-sivu, jossa on Vertaa tarjoajia/Uudelleensijoitusputki/Hakuhistoria, paikallinen uudelleensijoitusreititys, todennusvartijat hakusovellusliittymässä (#443, @Regis-RCR)

- Uusi reitti: `/dashboard/search-tools`
- Sivupalkkimerkintä Debug-osiossa
- "GET /api/search/providers" ja "GET /api/search/stats" todennusvartijoilla
- Paikallisen palveluntarjoajan_solmujen reititys kohteelle "/v1/rerank".
- Yli 30 i18n-näppäintä haun nimiavaruudessa### 🐛 Bug Fixes

-**fix(search)**: Korjaa Brave News -normalisoija (palautti 0 tulosta), pakota max_results-lyhennys normalisoinnin jälkeen, korjaa päätepisteiden sivun haun URL-osoite (#443, @Regis-RCR) -**fix(analytics)**: lokalisoi analytiikan päivä-/päivämäärätunnisteet – korvaa kovakoodatut portugalilaiset merkkijonot Intl.DateTimeFormat(locale)' (#444, @hijak) -**fix(copilot)**: oikea GitHub Copilot -tilin tyyppinäyttö, suodata harhaanjohtavat rajattomat kiintierivit limits-hallintapaneelista (#445, @hijak) -**fix(providers)**: Lopeta kelvollisten Serper API -avainten hylkääminen – käsittele muita kuin 4xx-vastauksia kelvollisena todennusna (#446 @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Codex Direct API -kiintiön varakorjaus.### 🐛 Bug Fixes

-**fix(codex)**: Estä viikoittain loppuun kuluneet tilit suorassa API-varassa (#440)

- "resolveQuotaWindow()" etuliite vastaa: "weekly" vastaa nyt "weekly (7d)" välimuistiavaimia
- "applyCodexWindowPolicy()" pakottaa "useWeekly"/"use5h" vaihtumaan oikein
- 4 uutta regressiotestiä (yhteensä 766)---

## [2.7.2] — 2026-03-18

> Sprint: Light mode -käyttöliittymän kontrastin korjaukset.### 🐛 Bug Fixes

-**fix(logs)**: Korjaa valotilan kontrastia pyyntölokien suodatinpainikkeissa ja yhdistelmämerkissä (#378)

- Error/Success/Combo-suodatinpainikkeet ovat nyt luettavissa valotilassa
- Yhdistelmärivimerkki käyttää vahvempaa violettia valotilassa---

## [2.7.1] — 2026-03-17

> Sprint: Yhtenäinen verkkohaun reititys (POST /v1/search) viidellä palveluntarjoajalla + Next.js 16.1.7 -tietoturvakorjaukset (6 CVE:tä).### ✨ New Features

-**feat(search)**: Yhtenäinen verkkohaun reititys – `POST /v1/search` 5 palveluntarjoajan kanssa (Serper, Brave, Perplexity, Exa, Tavily)

- Automaattinen vikasieto palveluntarjoajien välillä, yli 6 500 ilmaista hakua kuukaudessa
- Muistissa oleva välimuisti pyyntöjen yhdistämisellä (konfiguroitava TTL)
- Hallintapaneeli: Hae Analytics-välilehti hakemistossa "/dashboard/analytics", jossa on palveluntarjoajan erittely, välimuistin osumaprosentti, kustannusseuranta
- Uusi API: "GET /api/v1/search/analytics" hakupyyntötilastoja varten
- Tietokannan siirto: pyyntötyyppi-sarake puhelulokeissa ei-chat-pyyntöjen seurantaa varten
- Zod-vahvistus (`v1SearchSchema'), todennettu, kustannukset kirjataan `recordCost()-toiminnolla### Turvallisuus

-**deps**: Next.js 16.1.6 → 16.1.7 — korjaa 6 CVE:tä: -**Kriittinen**: CVE-2026-29057 (HTTP-pyyntöjen salakuljetus http-välityspalvelimen kautta) -**Korkea**: CVE-2026-27977, CVE-2026-27978 (WebSocket + palvelintoiminnot) -**Keskitaso**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| File                                                             | Tarkoitus                                                   |
| ---------------------------------------------------------------- | ----------------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Hakukäsittelijä 5-palveluntarjoajan reitityksellä           |
| `open-sse/config/searchRegistry.ts`                              | Palveluntarjoajan rekisteri (todennus, hinta, kiintiö, TTL) |
| `open-sse/services/searchCache.ts`                               | Muistissa oleva välimuisti pyyntöjen yhdistämisellä         |
| `src/app/api/v1/search/route.ts`                                 | Next.js-reitti (POST + GET)                                 |
| `src/app/api/v1/search/analytics/route.ts'                       | Hakutilastot API                                            |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Analyticsin hallintapaneelin välilehti                      |
| `src/lib/db/migrations/007_search_request_type.sql'              | DB-siirto                                                   |
| `tests/unit/search-registry.test.mjs`                            | 277 riviä yksikkötestejä                                    | --- |

## [2.7.0] — 2026-03-17

> Sprint: ClawRouterin inspiroimat ominaisuudet – toolCalling-merkki, monikielinen tarkoitusten tunnistus, vertailuperusteinen varatoiminto, pyyntöjen duplikointi, kytkettävä RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 -hinnoittelu.### ✨ New Models & Pricing

-**feat(pricing)**: xAI Grok-4 Fast – `0,20 $/0,50 $ per 1 milj. tunniste', 1143 ms p50-viive, työkalukutsuja tuettu
-**feat(hinnoittelu)**: xAI Grok-4 (vakio) – "0,20 $ / 1,50 $ per 1 miljoona tokenia", päättelyn lippulaiva
-**feat(pricing)**: GLM-5 Z.AI:n kautta - "0,5 $/1M", 128 000 lähtökonteksti
-**feat(hinnoittelu)**: MiniMax M2.5 — `0,30 $/1M syöttö`, perustelut + agenttitehtävät
-**feat(pricing)**: DeepSeek V3.2 – päivitetty hinnoittelu `0,27 $/1,10 $ per 1 milj. -**feat(pricing)**: Kimi K2.5 Moonshot APIn kautta – suora Moonshot API -käyttö -**feat(providers)**: Z.AI-toimittaja lisätty (`zai` alias) – GLM-5-perhe 128K-lähdöllä### 🧠 Routing Intelligence

-**feat(registry)**: "toolCalling"-merkki mallin mukaan toimittajarekisterissä – yhdistelmät voivat nyt suosia/vaatia työkalukutsuja tukevia malleja -**feat(scoring)**: Monikielinen tarkoituksentunnistus AutoCombo-pisteytystä varten — PT/ZH/ES/AR-skripti-/kielimallit vaikuttavat mallin valintaan pyyntökontekstikohtaisesti -**feat(fallback)**: vertailuperusteisiin perustuvat varaketjut – todellista latenssidataa (p50 `comboMetricsistä`) käytetään varaprioriteetin dynaamiseen järjestykseen. -**feat(dedup)**: Pyydä päällekkäisyyden poistoa sisällön hajautusjärjestelmän kautta – 5 sekunnin idempotenssiikkuna estää päällekkäisiä palveluntarjoajan kutsuja yrittämästä uudelleen asiakkaita -**feat(router)**: Kytkettävä RouterStrategy-liitäntä 'autoCombo/routerStrategy.ts' -tiedostossa – mukautettu reitityslogiikka voidaan lisätä ilman ydintä muuttamatta### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 uutta edistynyttä työkalumallia: "omniroute_get_provider_metrics" (p50/p95/p99 per tarjoaja) ja "omniroute_explain_route" (reitityspäätöksen selitys) -**feat(mcp)**: MCP-työkalun todennusalueet päivitetty - "metrics:read" -laajuus lisätty tarjoajan mittaustyökaluihin -**feat(mcp)**: `omniroute_best_combo_for_task` hyväksyy nyt `languageHint-parametrin monikielistä reititystä varten### 📊 Observability

-**feat(metrics)**: "comboMetrics.ts" laajennettu reaaliaikaisella latenssiprosenttipisteen seurannalla palveluntarjoaja-/tilikohtaisesti -**feat(health)**: Health API (`/api/monitoring/health`) palauttaa nyt palveluntarjoajakohtaiset kentät "p50Latency" ja "errorRate" -**feat(usage)**: Käyttöhistorian siirto mallikohtaista latenssin seurantaa varten### 🗄️ DB Migrations

-**feat(migrations)**: Uusi sarake "latency_p50" "combo_metrics" -taulukossa – nollaa rikkova, turvallinen nykyisille käyttäjille### 🐛 Bug Fixes / Closures

-**close(#411)**: better-sqlite3 hashed module resolution on Windows — fixed in v2.6.10 (f02c5b5) -**close(#409)**: GitHub Copilot -keskustelujen suorittaminen epäonnistuu Claude-malleilla, kun tiedostoja on liitetty – korjattu v2.6.9:ssä (838f1d6) -**close(#405)**: Kohteen #411 kopio — ratkaistu## [2.6.10] — 2026-03-17

> Windows-korjaus: parempi-sqlite3-esi rakennettu lataus ilman node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Windowsissa "npm install -g omniroute" epäonnistui komennolla "better_sqlite3.node ei ole kelvollinen Win32-sovellus", koska mukana toimitettu alkuperäinen binaari on käännetty Linuxille. Lisää**Strategy 1.5:n**tiedostoon `scripts/postinstall.mjs`: käyttää `@mapbox/node-pre-gyp install --fallback-to-build=false` (joka on `better-sqlite3`:ssa) ladatakseen oikean valmiiksi rakennetun binaarin nykyiselle käyttöjärjestelmälle/archille ilman, että vaaditaan mitään koontityökaluja M (, nodet-hongyp, no). Palautuu npm-uudelleenrakennukseen vain, jos lataus epäonnistuu. Lisää alustakohtaisia ​​virheilmoituksia ja selkeät manuaaliset korjausohjeet.---

## [2.6.9] — 2026-03-17

> CI-korjaukset (t11 any-budget), virheenkorjaus #409 (tiedostoliitteet Copilot+Clauden kautta), vapauta työnkulun korjaus.### 🐛 Bug Fixes

-**fix(ci)**: Poista sana "any" kommenteista "openai-responses.ts"- ja "chatCore.ts"-tiedostoissa, jotka eivät läpäisseet t11-budjetin tarkistusta (väärä positiivinen säännöllisen lausekkeen laskentakommenteista) -**fix(chatCore)**: Normalisoi ei-tuetut sisällön osatyypit ennen lähettämistä palveluntarjoajille (#409 - Kohdistin lähettää `{type:"file"}`, kun `.md`-tiedostot on liitetty; Copilot ja muut OpenAI-yhteensopivat palveluntarjoajat hylkäävät "tyypin on oltava joko 'image_url' tai 'text block`s'-fimentti ja putoaa tuntemattomia tyyppejä)### 🔧 Workflow

-**chore(generate-release)**: Lisää ATOMIC COMMIT RULE — version bump (`npm version patch`) TÄYTYY tapahtua ennen ominaisuustiedostojen sitomista, jotta tunniste osoittaa aina vahvistukseen, joka sisältää kaikki versiomuutokset yhdessä---

## [2.6.8] — 2026-03-17

> Sprint: Combo agenttina (järjestelmäkehote + työkalusuodatin), kontekstin välimuistin suojaus, automaattinen päivitys, yksityiskohtaiset lokit, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Uusi "request_detail_logs"-taulukko, jossa on 500 merkinnän soittopuskurilaukaisu, ota käyttöön asetusten vaihtokytkimellä### Ominaisuudet

-**feat(combo)**: Järjestelmäsanoman ohitus yhdistelmää kohti (#399 – "system_message" -kenttä korvaa tai lisää järjestelmäkehotteen ennen lähettämistä toimittajalle) -**feat(combo)**: Tool Filter Regex per Combo (#399 — "tool_filter_regex" säilyttää vain työkalut, jotka vastaavat mallia; tukee OpenAI + Anthropic muotoja) -**feat(combo)**: Kontekstin välimuistin suojaus (#401 — `context_cache_protection` merkitsee vastaukset `<omniModel>provider/model</omniModel>- ja pins-mallilla istunnon jatkuvuuden varmistamiseksi)
-**feat(settings)**: Automaattinen päivitys asetusten kautta (#320 — `GET /api/system/version`+`POST /api/system/update`— tarkistaa npm-rekisterin ja päivitykset taustalla pm2-uudelleenkäynnistyksen avulla)
-**feat(logs)**: Yksityiskohtaiset pyyntölokit (#378 - kaappaa koko putkirungon 4 vaiheessa: asiakkaan pyyntö, käännetty pyyntö, palveluntarjoajan vastaus, asiakkaan vastaus - valinnainen vaihtokytkin, 64 kt:n leikkaus, 500 merkinnän rengaspuskuri)
-**feat(mitm)**: MITM Kiro IDE -profiili (#336 —`src/mitm/targets/kiro.ts` kohdistuu api.anthropic.comiin, käyttää uudelleen olemassa olevaa MITM-infrastruktuuria)---

## [2.6.7] — 2026-03-17

> Sprint: SSE-parannukset, paikalliset provider_nodes-laajennukset, välityspalvelinrekisteri, Claude-läpivientikorjaukset.### Ominaisuudet

-**feat(health)**: Taustan kuntotarkastus paikallisille "provider_nodes" -arvoille eksponentiaalisella backoffilla (30s→300s) ja Promise.allSettled eston välttämiseksi (#423, @Regis-RCR) -**feat(embeddings)**: Reititä `/v1/embeddings` paikallisiin `provider_nodes` - `buildDynamicEmbeddingProvider()` isäntänimen vahvistuksella (#422, @Regis-RCR) -**feat(audio)**: Route TTS/STT to local `provider_nodes` — `buildDynamicAudioProvider()` with SSRF protection (#416, @Regis-RCR) -**feat(proxy)**: Välityspalvelinrekisteri, hallintasovellusliittymät ja kiintiörajoitusten yleistys (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Poista Claude-kohtaiset kentät ("metadata", "anthropic_version"), kun kohde on OpenAI-yhteensopiva (#421, @prakersh) -**fix(sse)**: Pura Claude SSE:n käyttö (`input_tokens`, `output_tokens`, cache tokens) passthrough-stream-tilassa (#420, @prakersh) -**fix(sse)**: Luo varapuhelutunnus työkalukutsuille, joissa on puuttuvat/tyhjät tunnukset (#419, @prakersh) -**fix(sse)**: Claude-to-Claude -läpivienti – etuvartalo täysin koskematon, ei uudelleenkäännöstä (#418, @prakersh) -**fix(sse)**: Suodata orvot `tool_result` kohteet Claude Coden kontekstin tiivistämisen jälkeen välttääksesi 400-virheet (#417, @prakersh) -**fix(sse)**: Ohita tyhjän nimen työkalukutsut Responses API -kääntäjässä estääksesi "placeholder_tool" äärettömät silmukat (#415, @prakersh) -**fix(sse)**: Poista tyhjät tekstisisältölohkot ennen käännöstä (#427, @prakersh) -**fix(api)**: Lisää "refreshable: true" Claude OAuth -testimäärityksiin (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` ja niihin liittyvät devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: Turbopack/Docker-yhteensopivuus — poista `node:`-protokolla kaikista `src/`-tuonnista.### 🐛 Bug Fixes

-**fix(build)**: Node:-protokollan etuliite poistettu 17 tiedostosta src/-tiedoston tuontilausekkeista. Node:fs-, node:path-, node:url-, node:os- jne. tuonnit aiheuttivat "Ecmascript-tiedostossa virheen" Turbopack-koontiversioissa (Next.js 15 Docker) ja päivityksissä vanhemmista npm-asennuksista. Vaikuttavat tiedostot: "migrationRunner.ts", "core.ts", "backup.ts", "prompts.ts", "dataPaths.ts" ja 12 muuta tiedostoissa "src/app/api/" ja "src/lib/". -**chore(työnkulku)**: Päivitetty "generate-release.md", jotta Docker Hub -synkronointi ja kaksois-VPS ottavat käyttöön**pakolliset**vaiheet jokaisessa julkaisussa.---

## [2.6.5] — 2026-03-17

> Sprint: päättelymallin parametrien suodatus, paikallisen palveluntarjoajan 404-korjaus, Kilo Gateway -palveluntarjoaja, riippuvuushäiriöt.### ✨ New Features

-**feat(api)**: Lisätty**Kilo Gateway**(`api.kilo.ai`) uudeksi API-avaimen toimittajaksi (alias `kg`) — 335+ mallia, 6 ilmaista mallia, 3 automaattista reititysmallia (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto). Passthrough models supported via `/api/gateway/models` endpoint. (PR #408, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Poista ei-tuetut parametrit päättelymalleista (o1, o1-mini, o1-pro, o3, o3-mini). Mallit `o1`/`o3` perheessä hylkäävät lämpötila-, top_p-, frequency_penalty-, `presence_penalty-, `logprobs-, `top_logprobs- ja n-parametrit HTTP 400:lla. Parametrit poistetaan nyt tasosta chatCore. Käyttää deklaratiivista "unsupportedParams" -kenttää mallia kohden ja esilaskettua O(1)-karttaa hakuun. (PR #412, @Regis-RCR) -**fix(sse)**: Paikallinen palveluntarjoaja 404 johtaa nyt**vain mallin lukitukseen (5 sekuntia)**yhteystason lukituksen (2 minuuttia) sijaan. Kun paikallinen päättelytausta (Ollama, LM Studio, oMLX) palauttaa 404 tuntemattomalle mallille, yhteys pysyy aktiivisena ja muut mallit jatkavat toimintaansa välittömästi. Korjaa myös olemassa olevan virheen, jossa "mallia" ei ole välitetty "markAccountUnavailable()". Paikalliset palveluntarjoajat tunnistettu isäntänimen kautta ("localhost", "127.0.0.1", "::1", laajennettavissa parametrilla "LOCAL_HOSTNAMES" env var). (PR #410, @Regis-RCR)### 📦 Dependencies

- "better-sqlite3" 12.6.2 → 12.8.0
- "Undici" 7.24.2 → 7.24.4
- "https-proxy-agent" 7 → 8
- "agenttikanta" 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(providers)**: Poistettiin olemattomat mallien nimet viideltä toimittajalta: -**gemini / gemini-cli**: poistettu "gemini-3.1-pro/flash" ja "gemini-3-\*-preview" (ei ole Google API v1beta -versiossa); replaced with `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravity**: poistettu "gemini-3.1-pro-high/low" ja "gemini-3-flash" (virheelliset sisäiset aliakset); korvattu oikeilla 2.x-malleilla -**github (Copilot)**: poistettu "gemini-3-flash-preview" ja "gemini-3-pro-preview"; korvattu sanalla "gemini-2.5-flash". -**nvidia**: korjattu "nvidia/llama-3.3-70b-instruct" → "meta/llama-3.3-70b-instruct" (NVIDIA NIM käyttää "meta/"-nimiavaruutta Meta-malleille); lisätty "nvidia/llama-3.1-70b-instruct" ja "nvidia/llama-3.1-405b-instruct" -**fix(db/combo)**: Päivitetty "free-stack"-yhdistelmä etätietokannassa: poistettu "qw/qwen3-coder-plus" (vanhentunut päivitystunnus), korjattu "nvidia/llama-3.3-70b-instruct" → "nvidia/meta/llama-3.3-70 correctedb-instruct" "gemini/gemini-3.1-flash" → "gemini/gemini-2.5-flash", lisätty "if/deepseek-v3.2"---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino-hash-kaistale lisätty rakennusputkiin, synteettinen toimittaja lisätty, VPS PM2 -polku korjattu.### 🐛 Bug Fixes

-**fix(build)**: Turbopackin hash-nauha toimii nyt**käännösaikana**KAIKILLE paketeille – ei vain "better-sqlite3". Vaihe 5.6 tiedostossa "prepublish.mjs" kävelee jokaisen "app/.next/server/":n .js:n ja poistaa 16-merkkisen heksadesimaaliliitteen kaikista hajautusarvoista "require()". Korjaa `zod-dcb22c...`, `pino-...` jne. MODULE_NOT_FOUND yleisissä npm-asennuksissa. Sulkee #398 -**fix(deploy)**: Molempien VPS:ien PM2 osoitti vanhentuneita git-kloonihakemistoja. Määritetty uudelleen muotoon "app/server.js" yleisessä npm-paketissa. Työnkulku `/deploy-vps' päivitetty käyttämään npm pack + scp -toimintoa (npm-rekisteri hylkää 299 Mt:n paketit).### Ominaisuudet

-**feat(provider)**: Synteettinen ([synthetic.new](https://synthetic.new)) – yksityisyyteen keskittyvä OpenAI-yhteensopiva päätelmä. "passthroughModels: true" dynaamiselle HuggingFace-malliluettelolle. Alkuperäiset mallit: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404, @Regis-RCR)### 📋 Issues Closed

-**sulje #398**: npm hash-regressio – korjattu käännösajan hash-nauhalla ennakkojulkaisussa -**triage #324**: Virheen kuvakaappaus ilman vaiheita – pyydetyt jäljennöstiedot---

## [2.6.2] — 2026-03-16

> Sprint: moduulien hajautus täysin korjattu, 2 PR:tä yhdistetty (Anthropic Tools -suodatin + mukautetut päätepistepolut), Alibaba Cloud DashScope -toimittaja lisätty, 3 vanhentunutta ongelmaa suljettu.### 🐛 Bug Fixes

-**fix(build)**: Laajennettu verkkopaketin "externals" hash-kaistale kattaa KAIKKI "serverExternal Packages", ei vain "better-sqlite3". Next.js 16 Turbopack tiivistää "zod"-, "pino"- ja kaikki muut palvelimen ulkoiset paketit nimiksi, kuten "zod-dcb22c6336e0bc69", joita ei ole "node_modules" -kohdassa suorituksen aikana. HASH_PATTERN regex-keräys poistaa nyt 16 merkin jälkiliitteen ja palaa peruspaketin nimeen. Also added `NEXT_PRIVATE_BUILD_WORKER=0` in `prepublish.mjs` to reinforce webpack mode, plus a post-build scan that reports any remaining hashed refs. (#396, #398, PR #403) -**fix(chat)**: Antrooppisen muodon työkalujen nimet (työkalun.nimi ilman .function-käärettä) poistettiin hiljaa julkaisussa #346 esitellyllä tyhjän nimen suodattimella. LiteLLM välittää pyynnöt anthropic/-etuliitteellä Anthropic Messages API -muodossa, jolloin kaikki työkalut suodatetaan ja Anthropic palauttaa 400: tool_choice.any voidaan määrittää vain työkaluja tarjottaessa. Korjattu palaamalla työkaluun.nimi, kun työkalu.funktio.nimi puuttuu. Lisätty 8 regressioyksikkötestiä. (PR #397)### Ominaisuudet

-**feat(api)**: Muokatut päätepistepolut OpenAI-yhteensopiville toimittajasolmuille – määritä chatPath ja modelsPath solmukohtaisesti (esim. `/v4/chat/completions`) palveluntarjoajan yhteyden käyttöliittymässä. Sisältää tietokantasiirron (`003_provider_node_custom_paths.sql`) ja URL-polun puhdistamisen (ei `..` läpikulkua, täytyy alkaa kirjaimella `/`). (PR #400) -**feat(provider)**: Alibaba Cloud DashScope lisätty OpenAI-yhteensopivaksi palveluntarjoajaksi. Kansainvälinen päätepiste: `dashscope-intl.aliyuncs.com/yhteensopiva-mode/v1`. 12 mallia: qwen-max, qwen-plus, qwen-turbo, qwen3-coder-plus/flash, qwq-plus, qwq-32b, qwen3-32b, qwen3-235b-a. Auth: Bearer API-avain.### 📋 Issues Closed

-**sulje #323**: Cline-yhteysvirhe `[object Object]` — korjattu v2.3.7:ssä; kehotti käyttäjää päivittämään versiosta 2.2.9 -**sulje #337**: Kiro-luottoseuranta — toteutettu versiossa 2.5.5 (#381); osoitti käyttäjälle Dashboard → Käyttö -**triage #402**: ARM64 macOS DMG vaurioitunut – pyydetty macOS-versiota, tarkka virhe ja neuvottu "xattr -d com.apple.quarantine" -kiertotapa---

## [2.6.1] — 2026-03-15

> Kriittinen käynnistyskorjaus: v2.6.0 globaalit npm-asennukset kaatui 500-virheellä Next.js 16 -instrumentointikoukun Turbopack/webpack-moduulin nimen hajautusvirheen vuoksi.### 🐛 Bug Fixes

-**fix(build)**: Pakota `better-sqlite3' vaatimaan aina sen tarkka paketin nimi webpack-palvelinpaketissa. Next.js 16 käänsi instrumentointikoukun erilliseen osaan ja lähetti "require('better-sqlite3-<hash>')" - tiivistetyn moduulin nimen, jota ei ole "node_modules" -kohdassa, vaikka paketti oli listattu "serverExternalPackages" -kohdassa. Lisätty eksplisiittinen `externals`-funktio palvelimen verkkopaketin kokoonpanoon, joten niputtaja lähettää aina `require('better-sqlite3')', mikä ratkaisee käynnistyksen '500 Internal Server Error' -virheen puhtaissa globaaleissa asennuksissa. (#394, PR #395)### 🔧 CI

-**ci**: "workflow_dispatch" lisätty tiedostoon "npm-publish.yml", jossa on versionsynkronoinnin suojaus manuaalisia laukaisimia varten (#392) -**ci**: Workflow_dispatch lisätty docker-publish.yml-tiedostoon, GitHub Actions päivitetty uusimpiin versioihin (#392)---

## [2.6.0] - 2026-03-15

> Ongelmanratkaisusprintti: 4 vikaa korjattu, lokien käyttökokemusta parannettu, Kiron luottoseuranta lisätty.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI ja SD WebUI eivät enää näy Media-sivun tarjoajien luettelossa, kun niitä ei ole määritetty — hakee `/api/providers` liitettäessä ja piilottaa paikalliset palveluntarjoajat, joilla ei ole yhteyksiä (#390) -**fix(auth)**: Round-robin ei enää valitse uudelleen nopeusrajoitettuja tilejä välittömästi jäähtymisen jälkeen – "backoffLevel" on nyt käytössä ensisijaisena lajitteluavaimena LRU-rotaatiossa (#340) -**fix(oauth)**: Qoder (ja muut omalle käyttöliittymälleen uudelleenohjaavat palveluntarjoajat) eivät enää jätä OAuth-modaalia jumiin "Odottaa valtuutusta" - ponnahdusikkuna sulkeutuu tunnistimeen, joka siirtyy automaattisesti URL-osoitteen manuaaliseen syöttötilaan (#344). -**fix(logs)**: Pyyntölokitaulukko on nyt luettavissa vaaleassa tilassa – tilamerkit, merkkien määrät ja yhdistelmätunnisteet käyttävät mukautuvia "dark:"-väriluokkia (#378)### Ominaisuudet

-**feat(kiro)**: Kiro-luottoseuranta lisätty käyttöhakijaan — kysyy "getUserCredits" AWS CodeWhisperer -päätepisteestä (#337)### 🛠 Chores

-**chore(tests)**: Tasattu "test:plan3", "test:fixes", "test:security" käyttämään samaa tsx/esm-latainta kuin "npm-testissä" – eliminoi moduulin resoluution vääriä negatiivisia kohdistetuissa ajoissa (PR #386)---

## [2.5.9] - 2026-03-15

> Codexin alkuperäinen läpivientikorjaus + reitin rungon vahvistus.### 🐛 Bug Fixes

-**fix(codex)**: Säilytä native Responses API -läpikulku Codex-asiakkaille – välttää tarpeettomat käännösmutaatiot (PR #387) -**fix(api)**: Tarkista hinnoittelu-/synkronointi- ja tehtävien reititysreittien pyyntöosat – estää virheellisten syötteiden aiheuttamat kaatumiset (PR #388) -**fix(auth)**: JWT-salaisuus säilyy uudelleenkäynnistyksen ajan `src/lib/db/secrets.ts' -tiedoston kautta — eliminoi 401-virheet pm2-uudelleenkäynnistyksen jälkeen (PR #388)---

## [2.5.8] - 2026-03-15

> Rakennuskorjaus: palauta VPS-yhteys, joka on katkennut v2.5.7:n puutteellisesta julkaisusta.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` käytti edelleen vanhentunutta `--webpack`-merkkiä, mikä aiheutti Next.js:n erillisen koontiversion epäonnistumisen äänettömästi – npm-julkaisu suoritettu ilman `app/server.js-tiedostoa, mikä rikkoo VPS:n käyttöönoton---

## [2.5.7] - 2026-03-15

> Median leikkikentän virheenkäsittelyn korjaukset.### 🐛 Bug Fixes

-**fix(media)**: Transkriptio "API Key Required" on väärä positiivinen, kun ääni ei sisällä puhetta (musiikkia, hiljaisuutta) – näyttää nyt "Puhetta ei havaittu" sen sijaan -**fix(media)**: "upstreamErrorResponse" tiedostoissa "audioTranscription.ts" ja "audioSpeech.ts" palauttaa nyt oikean JSON:n (`{error:{message}}`), mikä mahdollistaa oikean 401/403-tunnistevirheen havaitsemisen MediaPageClientissä -**fix(media)**: "parseApiError" käsittelee nyt Deepgramin "err_msg"-kentän ja havaitsee "api-avaimen" virhesanomissa tarkkoja valtuustietojen virheluokituksia varten---

## [2.5.6] - 2026-03-15

> Kriittiset tietoturva-/todennuskorjaukset: Antigravity OAuth rikki + JWT-istunnot menetettiin uudelleenkäynnistyksen jälkeen.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth lähettää nyt oikein "client_secret" -tunnisteen päätepisteeseen. Kohteen ANTIGRAVITY_OAUTH_CLIENT_SECRET varavaihtoehto oli tyhjä merkkijono, joka on virheellinen – joten asiakassalaisuutta ei koskaan sisällytetty pyyntöön, mikä aiheutti "asiakassalaisuus puuttuu" -virheitä kaikille käyttäjille, joilla ei ole mukautettua env var. Sulkee #383. -**fix(auth) #385**: `JWT_SECRET` säilyy nyt SQLitessä (`namespace='secrets'`) ensimmäisessä sukupolvessa ja ladataan uudelleen seuraavissa käynnistyksissä. Aiemmin uusi satunnainen salaisuus luotiin jokaisessa prosessin käynnistyksessä, mikä mitätöi kaikki olemassa olevat evästeet/istunnot uudelleenkäynnistyksen tai päivityksen jälkeen. Vaikuttaa sekä `JWT_SECRET` että `API_KEY_SECRET`. Sulkee #382.---

## [2.5.5] - 2026-03-15

> Malliluettelon dedup-korjaus, Electron-erillinen koontirakentaminen ja Kiro-luottoseuranta.### 🐛 Bug Fixes

-**fix(models) #380**: "GET /api/models" sisältää nyt palveluntarjoajan aliaksia aktiivisen palveluntarjoajan suodatinta rakennettaessa - mallit "claude" (alias "cc") ja "github" (alias "gh") näytettiin aina riippumatta siitä, onko yhteys määritetty, mutta palveluntarjoajan aliakset ovat PROVIDER_MO:n alla. tunnukset. Korjattu laajentamalla jokaista aktiivista palveluntarjoajatunnusta sisältämään myös sen aliaksen PROVIDER_ID_TO_ALIAS-palvelun kautta. Sulkee #353. -**fix(electron) #379**: Uudet "scripts/prepare-electron-standalone.mjs" -tiedostot muodostavat erillisen "/.next/electron-standalone" -paketin ennen Electron-pakkausta. Keskeytyy selkeällä virheellä, jos "solmumoduulit" on symlink (electron-builder lähettäisi ajonaikaisen riippuvuuden koontikoneesta). Platform-polkujen puhdistaminen "path.basename":n kautta. Kirjailija @kfiramar### ✨ New Features

-**feat(kiro) #381**: Kiron luottosaldon seuranta – käytön päätepiste palauttaa nyt Kiro-tilien luottotiedot kutsumalla `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (sama päätepiste, jota Kiro IDE käyttää sisäisesti). Palauttaa jäljellä olevat krediitit, kokonaiskorvauksen, uusimispäivän ja tilaustason. Sulkee #337.## [2.5.4] - 2026-03-15

> Loggerin käynnistyskorjaus, sisäänkirjautumisen käynnistyksen suojauskorjaus ja dev HMR:n luotettavuuden parannus. CI-infrastruktuuri kovettunut.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Palauta pinon kuljetusloggerin polku — pino hylkäsi `formatters.level` yhdistettynä `transport.targets`-kohteeseen. Kuljetustuetut asetukset poistavat nyt tason muotoilun "getTransportCompatibleConfig()" -komennolla. Korjaa myös numeerisen tason kartoituksen kohteessa `/api/logs/console`: `30→info, 40→varoitus, 50→virhe’ (siirretty yhdellä). -**fix(login) #375**: Kirjautumissivu käynnistyy nyt julkisesta /api/settings/require-login-päätepisteestä suojatun /api/settings-päätepisteen sijaan. Salasanalla suojatuissa asetuksissa esitodennussivu sai 401:n ja palasi turvallisiin oletusasetuksiin tarpeettomasti. Julkinen reitti palauttaa nyt kaikki bootstrap-metatiedot ("requireLogin", "hasPassword", "setupComplete") konservatiivisella 200-varmistuksella virheen sattuessa. -**fix(dev) #374**: Lisää "localhost" ja "127.0.0.1" kohtaan "allowedDevOrigins" tiedostossa "next.config.mjs" — HMR-verkkoliitäntä estettiin käytettäessä sovellusta takaisinkytkentäosoitteen kautta, mikä tuotti toistuvia eri alkuperävaroituksia.### 🔧 CI & Infrastructure

-**ESLint OOM -korjaus**: `eslint.config.mjs` jättää nyt huomioimatta kohdat `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` ja `clipr/**` — ESLint kaatui JS-keon VS Codes andbinarybloedb Codes- ja binarybloedb OOM:n kanssa. paloina. -**Yksikkötestin korjaus**: Vanhentunut ALTER TABLE provider_connections ADD COLUMN "group" poistettiin kahdesta testitiedostosta — sarake on nyt osa perusskeemaa (lisätty kohtaan #373), mikä aiheuttaa SQLITE_ERROR: kaksoissarakkeen nimen jokaisessa CI-ajossa. -**Pre-commit hook**: Lisätty "npm run test:unit" kohtaan ".husky/pre-commit" - yksikkötestit estävät nyt rikkoutuneita sitoumuksia ennen kuin ne saavuttavat CI:n.## [2.5.3] - 2026-03-14

> Kriittiset virheenkorjaukset: DB-skeeman siirto, käynnistysympäristön lataus, toimittajan virhetilan tyhjennys ja i18n-työkaluvihjeen korjaus. Koodin laadun parannuksia jokaisen PR:n päälle.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Lisää sarake "provider_connections.group" perusskeemaan + jälkitäyttösiirto olemassa oleviin tietokantoihin – saraketta käytettiin kaikissa kyselyissä, mutta se puuttuu skeeman määrittelystä -**fix(i18n) #371**: Korvaa olematon t("deleteConnection")-avain olemassa olevalla providers.delete-avaimella — korjaa MISSING_MESSAGE: providers.deleteConnection -ajonaikaisen virheen palveluntarjoajan tietosivulla -**fix(auth) #372**: Poista vanhentuneet virheen metatiedot ("errorCode", "lastErrorType", "lastErrorSource") palveluntarjoajan tileiltä todellisen palautuksen jälkeen – aiemmin palautetut tilit näyttivät edelleen epäonnistuneilta -**fix(startup) #369**: Yhdistä env-lataus "npm run start"-, "run-standalone.mjs"- ja Electron-parametrien välillä siten, että se noudattaa DATA_DIR/.env → ~/.omniroute/.env → ./.env -prioriteettia - estää uuden salatun tietokannan luomisen `P RY STORAGE_ENC` over an STORAGE_ENC.### 🔧 Code Quality

- Dokumentoidut "result.success" vs "response?.ok" -mallit "auth.ts"-tiedostossa (molemmat tarkoituksellisia, nyt selitetty)
- Normalisoitu "overridePath?.trim()" tiedostossa "electron/main.js" vastaamaan "bootstrap-env.mjs"
- Lisätty "preferredEnv" yhdistämistilauksen kommentti Electronin käynnistyksessä

> Codex-tilin kiintiökäytäntö, jossa on automaattinen kierto, nopea tason vaihto, gpt-5.4-malli ja analytiikkatunnisteen korjaus.### ✨ New Features (PRs #366, #367, #368)

-**Koodikiintiökäytäntö (PR #366)**: Tilikohtainen 5 h/viikkokiintiöikkuna vaihtuu palveluntarjoajan hallintapaneelissa. Tilit ohitetaan automaattisesti, kun käytössä olevat ikkunat saavuttavat 90 %:n kynnyksen, ja ne hyväksytään uudelleen "resetAt":n jälkeen. Sisältää `quotaCache.ts' ja sivuvaikutuksia ilmaisen status getterin.
-**Codex Fast Tier Toggle (PR #367)**: Dashboard → Asetukset → Codex Service Tier. Oletus-off-kytkin lisää `service_tier: "flex" -arvon vain Codex-pyynnöille, mikä vähentää kustannuksia ~80%. Täysi pino: UI-välilehti + API-päätepiste + suorittaja + kääntäjä + käynnistyksen palautus. -**gpt-5.4-malli (PR #368)**: Lisää koodit "cx/gpt-5.4" ja "codex/gpt-5.4" Codex-mallirekisteriin. Mukana regressiotesti.### 🐛 Bug Fixes

-**Korjaus #356**: Analytics-kaaviot (huipputoimittaja, tilin mukaan, tarjoajien erittely) näyttävät nyt ihmisten luettavissa olevat tarjoajien nimet/tunnisteet OpenAI-yhteensopivien palveluntarjoajien sisäisten raakatunnuksien sijaan.

> Tärkeä julkaisu: tiukka satunnainen reititysstrategia, API-avainten pääsynhallinta, yhteysryhmät, ulkoinen hinnoittelusynkronointi ja kriittiset virheenkorjaukset ajattelumalleihin, yhdistelmätestaus ja työkalun nimen validointi.### ✨ New Features (PRs #363 & #365)

-**Strict-Random Routing Strategy**: Fisher-Yates shuffle dekki, jossa on toiston eston takuu ja mutex-sarjasointi samanaikaisille pyynnöille. Riippumattomat dekit yhdistelmää ja tarjoajaa kohti. -**API Key Access Controls**: "allowedConnections" (rajoita, mitä yhteyksiä avain voi käyttää), "is_active" (käyttöön/poistaa avain 403:lla), "accessSchedule" (aikaperusteinen pääsynhallinta), "AutoResolve" -kytkin, nimeä avaimet uudelleen PATCH-toiminnolla. -**Yhteysryhmät**: Ryhmittele palveluntarjoajan yhteydet ympäristön mukaan. Harmonikkanäkymä Limits-sivulla, jossa on paikallinen tallennustilan pysyvyys ja älykäs automaattinen vaihto. -**Ulkoinen hinnoittelun synkronointi (LiteLLM)**: 3-tason hinnoitteluresoluutio (käyttäjien ohitukset → synkronoitu → oletusasetukset). Ota käyttöön "PRICING_SYNC_ENABLED=true". MCP-työkalu `omniroute_sync_pricing'. 23 uutta testiä. -**i18n**: 30 kieltä päivitetty tiukasti satunnaisella strategialla, API-avainten hallintamerkkijonoilla. pt-BR täysin käännetty.### 🐛 Bug Fixes

-**korjaus #355**: Stream joutokäynnin aikakatkaisu nostettu 60 sekunnista 300 sekuntiin — estää laajennetun ajattelun mallien (claude-opus-4-6, o3 jne.) keskeyttämisen pitkien päättelyvaiheiden aikana. Määritettävissä kohdassa STREAM_IDLE_TIMEOUT_MS. -**korjaus #350**: Yhdistelmätesti ohittaa nyt `REQUIRE_API_KEY=true` sisäisen otsikon avulla ja käyttää OpenAI-yhteensopivaa muotoa yleisesti. Aikakatkaisu pidennettiin 15 sekunnista 20 sekuntiin. -**Korjaus #346**: Työkalut, joissa on tyhjä `function.name` (välittäjä Claude Code), suodatetaan nyt ennen kuin ylävirran toimittajat vastaanottavat ne, mikä estää "Virheellinen syöttö[N].nimi: tyhjä merkkijono" -virheet.### 🗑️ Closed Issues

-**#341**: Virheenkorjausosio poistettu – korvataan "/dashboard/logs" ja "/dashboard/health".

> API Key Round-Robin -tuki usean avaimen tarjoajan asetuksille ja vahvistus jokerimerkkireitityksestä ja kiintiöikkunan rullauksesta.### ✨ New Features

-**API Key Round-Robin (T07)**: Palveluntarjoajan yhteyksissä voi nyt olla useita API-avaimia (Muokkaa yhteyttä → Ylimääräisiä API-avaimia). Pyynnöt kiertävät ensisijaisten ja lisäavaimien välillä providerSpecificData.extraApiKeys[]':n kautta. Avaimet säilytetään muistissa indeksoituina yhteyskohtaisesti – DB-skeeman muutoksia ei vaadita.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: "wildcardRouter.ts", jossa on glob-tyylinen jokerimerkkivastaavuus ("gpt\*", "claude-?-sonnet" jne.), on jo integroitu "model.ts"-tiedostoon tarkkuudella. -**Kiintiöikkunan rullaaminen (T08)**: `accountFallback.ts:isModelLocked()` siirtyy jo automaattisesti eteenpäin ikkunassa — jos `Date.now() > entry.until`, lukko poistetaan välittömästi (ei vanhentunutta estoa).

> Käyttöliittymän kiillotus, reititysstrategian lisäykset ja siro virheiden käsittely käyttörajoituksille.### ✨ New Features

-**Fill-First- ja P2C-reititysstrategiat**: Lisätty 'fill-first' (tyhjennä kiintiö ennen kuin siirryt eteenpäin) ja 'p2c' (Power-of-Two-Choices matalan viiveen valinta) yhdistelmästrategiavalitsimeen, jossa on täydelliset opastuspaneelit ja värikoodatut merkit. -**Free Stack Preset -mallit**: Yhdistelmän luominen Free Stack -mallilla täyttää nyt automaattisesti 7 luokkansa parasta ilmaista toimittajamallia (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Käyttäjät vain aktivoivat palveluntarjoajat ja saavat käyttöönsä 0 dollaria kuukaudessa. -**Leveämpi yhdistelmämodaali**: Luo/muokkaa yhdistelmämodaali käyttää nyt arvoa "max-w-4xl" suurten yhdistelmien mukavaan muokkaamiseen.### 🐛 Bug Fixes

-**Codexin ja GitHubin HTTP 500 -rajoitussivu**: "getCodexUsage()" ja "getGitHubUsage()" palauttavat nyt käyttäjäystävällisen viestin, kun palveluntarjoaja palauttaa 401/403 (vanhentunut merkki), sen sijaan, että he heittäisivät ja aiheuttaisivat 500-virheen Limits-sivulla. -**MaintenanceBanner väärä positiivinen**: Bannerissa ei enää näy "Palvelin on tavoittamaton" virheellisesti sivun latauksen yhteydessä. Korjattu kutsumalla "checkHealth()" välittömästi asennuksen yhteydessä ja poistamalla vanhentunut "show"-tilan sulkeminen. -**Tarjoajan kuvakkeen työkaluvinkit**: Muokkaa (kynä) ja poista kuvakepainikkeilla palveluntarjoajan yhteysrivillä on nyt natiivi HTML-työkaluvihjeitä – kaikki kuusi toimintokuvaketta ovat nyt itse dokumentoituja.

> Useita parannuksia yhteisön ongelma-analyysistä, uuden palveluntarjoajan tuki, virheenkorjaukset tunnuksen seurantaan, mallin reititys ja suoratoiston luotettavuus.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Automaattinen mallin valinta pyynnön sisältötyypin mukaan — koodaus → deepseek-chat, analyysi → gemini-2.5-pro, visio → gpt-4o, yhteenveto → gemini-2.5-flash. Konfiguroitavissa asetusten kautta. Uusi GET/PUT/POST /api/settings/task-routing API. -**HuggingFace Provider**: HuggingFace Router lisätty OpenAI-yhteensopivaksi palveluntarjoajaksi Llama 3.1 70B/8B:n, Qwen 2.5 72B:n, Mistral 7B:n, Phi-3.5 Minin kanssa. -**Vertex AI Provider**: Lisätty Vertex AI (Google Cloud) -palveluntarjoaja, jossa on Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude Vertexin kautta. -**Playground File Uploads**: äänen lataus transkriptiota varten, kuvan lataus näkömalleille (automaattinen tunnistus mallin nimen mukaan), upotettu kuvan renderöinti kuvien luomista varten. -**Mallin valinnan visuaalinen palaute**: Yhdistelmävalitsimen jo lisätyissä malleissa näkyy nyt ✓ vihreä merkki - estää päällekkäiset sekaannukset. -**Qwen-yhteensopivuus (PR #352)**: Päivitetyt User-Agent- ja CLI-sormenjälkiasetukset Qwen-palveluntarjoajan yhteensopivuutta varten. -**Round-Robin State Management (PR #349)**: Parannettu round-robin-logiikka, joka käsittelee poissuljettuja tilejä ja ylläpitää rotaatiotilaa oikein. -**Leikepöydän UX (PR #360)**: Kovetetut leikepöydän toiminnot, joissa on varaturva ei-suojattuja yhteyksiä varten; Claude-työkalun normalisointiparannuksia.### 🐛 Bug Fixes

-**Korjaus #302 — OpenAI SDK stream=False drops tool_calls**: T01 Hyväksy otsikkoneuvottelu ei enää pakota suoratoistoa, kun "body.stream" on nimenomaisesti "false". Aiheutti tool_calls:n hiljaisen pudotuksen, kun OpenAI Python SDK:ta käytettiin ei-suoratoistotilassa. -**Korjaus #73 – Claude Haiku reititetty OpenAI:hen ilman palveluntarjoajan etuliitettä**: "claude-_"-mallit, jotka lähetetään ilman palveluntarjoajan etuliitettä, reitittävät nyt oikein "antigravity" (Anthropic) -palveluntarjoajalle. Lisätty `gemini-_`/`gemma-\*`→`gemini`-heuristiikka myös. -**Korjaus #74 – Tokenin määrä on aina 0 Antigravity/Claude-suoratoistossa**: ExtractUsage() ei jäsentänyt "message_start" SSE-tapahtumaa, joka kuljettaa "input_tokens" -parametrin, joten kaikki syötetunnisteiden määrät putosivat. Tulo-/lähtötunnisteseuranta toimii nyt oikein suoratoistovastauksissa. -**Korjaus #180 – Mallin tuontikopiot ilman palautetta**: "ModelSelectModal" näyttää nyt ✓ vihreän korostuksen jo yhdistelmässä oleville malleille, mikä tekee selväksi, että ne on jo lisätty. -**Mediasivun luontivirheet**: Kuvatulokset renderöidään nyt <img>-tunnisteina raaka-JSONin sijaan. Transkriptiotulokset näytetään luettavana tekstinä. Tunnistevirheet näyttävät keltaisen bannerin hiljaisen vian sijaan. -**Tokenin päivityspainike palveluntarjoajan sivulla**: OAuth-palveluntarjoajille on lisätty tunnuksen manuaalinen päivityskäyttöliittymä.### 🔧 Improvements

-**Provider Registry**: HuggingFace ja Vertex AI lisättiin "providerRegistry.ts"- ja "providers.ts"-tiedostoihin (käyttöliittymä). -**Lukuvälimuisti**: Uusi `src/lib/db/readCache.ts` tehokkaaseen DB-lukuvälimuistiin. -**Kiintiön välimuisti**: Parannettu kiintiövälimuisti TTL-pohjaisella häätöllä.### 📦 Dependencies

- "Dompurify" → 3.3.3 (PR #347)
- "undici" → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Tiedosto                                      | Tarkoitus                                            |
| --------------------------------------------- | ---------------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Tehtävätietoinen reitityslogiikka (7 tehtävätyyppiä) |
| `src/app/api/settings/task-routing/route.ts'  | Tehtävän reitityksen konfigurointisovellusliittymä   |
| "src/app/api/providers/[id]/refresh/route.ts" | Manuaalinen OAuth-tunnuksen päivitys                 |
| `src/lib/db/readCache.ts`                     | Tehokas DB-lukuvälimuisti                            |
| `src/shared/utils/clipboard.ts`               | Karkaistu leikepöytä varaosalla                      | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Yhdistelmät modaali: Free Stack näkyvä ja näkyvä**— Free Stack -malli piilotettiin (4. 3-sarakkeisessa ruudukossa). Korjattu: siirretty kohtaan 1, vaihdettu 2x2-ruudukkoon, jotta kaikki 4 mallia ovat näkyvissä, vihreä reunus + ILMAINEN merkin korostus.## [2.4.0] - 2026-03-13

> **Tärkeä julkaisu**— Ilmainen pinoekosysteemi, leikkikenttien transkriptiouudistus, yli 44 palveluntarjoajaa, kattava ilmainen tasodokumentaatio ja käyttöliittymäparannuksia kauttaaltaan.### Ominaisuudet

-**Yhdistelmät: Ilmainen pinomalli**— Uusi 4. malli "Free Stack ($0)" käyttäen round-robinia Kiro + Qoder + Qwen + Gemini CLI:n välillä. Suosittelee valmiiksi rakennettua nollakustannusyhdistelmää ensimmäisellä käyttökerralla. -**Media/Transkriptio: Deepgram oletuksena**— Deepgram (Nova 3, 200 $ ilmainen) on nyt oletustranskriptiotoimittaja. AssemblyAI (50 dollaria ilmaiseksi) ja Groq Whisper (ilmainen ikuisesti) näytetään ilmaisilla luottomerkeillä. -**README: "Aloita ilmaiseksi" -osio**— Uusi varhaisen README 5-vaiheinen taulukko, joka näyttää kuinka luodaan nollakustannus AI muutamassa minuutissa. -**README: Free Transcription Combo**— Uusi osio, jossa on Deepgram/AssemblyAI/Groq-yhdistelmäehdotus ja palveluntarjoajakohtaiset ilmaiset luottotiedot. -**providers.ts: hasFree flag**— NVIDIA NIM, Cerebras ja Groq merkitty hasFree-merkillä ja freeNote palveluntarjoajan käyttöliittymälle. -**i18n: templateFreeStack-avaimet**— Ilmainen pinoyhdistelmämalli käännetty ja synkronoitu kaikille 30 kielelle.## [2.3.16] - 2026-03-13

### Dokumentaatio

-**README: 44+ Providers**— Päivitetty kaikki 3 esiintymää "36+ tarjoajat" arvoon "44+", mikä kuvastaa todellista koodikannan määrää (44 tarjoajaa palveluntarjoajissa.ts) -**LUE: Uusi osio "🆓 Ilmaiset mallit — mitä saat"**— Lisätty 7 palveluntarjoajan taulukko mallikohtaisilla nopeusrajoituksilla seuraaville: Kiro (Claude rajoittamaton AWS Builder ID:n kautta), Qoder (5 mallia rajoittamaton), Qwen (4 mallia rajoittamaton), Gemini NPM (4-0for devmo), NVIDIAK/devmo (180 Aivot (1 M tok/päivä / 60 000 TPM), Groq (30 RPM / 14,4 000 RPD). Sisältää \/usr/bin/bash Ultimate Free Stack -yhdistelmäsuosituksen. -**README: Hintataulukko päivitetty**— Aivot lisätty API KEY -tasolle, NVIDIA korjattu "1000 krediitistä" "dev-forever free", päivitetty Qoder/Qwen-mallien määrä ja nimet -**LUE: Qoder 8→5 mallia**(nimeltään: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4 mallia**(nimeltään: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Ominaisuudet

-**Auto-Combo Dashboard (Tier Priority)**: Lisätty "🏷️ Taso" seitsemänneksi pisteytystekijän tunnisteeksi "/dashboard/auto-combo" -tekijäerittelyn näyttöön – kaikki 7 automaattisen yhdistelyn pisteytystekijää ovat nyt näkyvissä. -**i18n — autoCombo-osio**: Lisätty 20 uutta käännösavainta Auto-Combo-hallintapaneeliin ("nimi", "status", "modePack", "providerScores", "factorTierPriority" jne.) kaikkiin 30 kielitiedostoon.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Palautti kelvollisen oletusarvon "clientSecret" - oli aiemmin tyhjä merkkijono, mikä aiheutti "huonot asiakkaan tunnistetiedot" jokaisessa yhteysyrityksessä. Julkinen valtuustieto on nyt oletusvaraustieto (ohitattavissa QODER_OAUTH_CLIENT_SECRET-komennolla env var). -**MITM-palvelinta ei löydy (#335)**: "prepublish.mjs" kääntää nyt "src/mitm/\*.ts" JavaScriptiksi käyttämällä "tsc"-komentoa ennen kopioimista npm-pakettiin. Aiemmin kopioitiin vain raakoja .ts-tiedostoja, mikä tarkoittaa, että palvelin.js-tiedostoa ei koskaan ollut npm/Voltan globaaleissa asennuksissa. -**GeminiCLI puuttuu projectId (#338)**: Sen sijaan, että OmniRoute antaisi kovan 500-virheen, kun "projectId" puuttuu tallennetuista valtuustiedoista (esim. Dockerin uudelleenkäynnistyksen jälkeen), OmniRoute kirjaa nyt varoituksen ja yrittää pyyntöä palauttaen OmniRouten kaatumisen sijaan merkittävän palveluntarjoajan virheen. -**Elektroniversion epäsuhta (#323)**: Electron/package.json-versio synkronoitu versioon 2.3.13 (oli 2.0.13), joten työpöydän binaariversio vastaa npm-pakettia.### ✨ New Models (#334)

-**Kiro**: "claude-sonnet-4", "claude-opus-4.6", "deepseek-v3.2", "minimax-m2.1", "qwen3-coder-next", "auto" -**Koodikoodi**: "gpt5.4".### 🔧 Improvements

-**Tier Scoring (API + Validation)**: Lisätty "tierPriority" (paino "0,05") "ScoringWeights" Zod-skeemaan ja "combos/auto" API-reitille – REST API hyväksyy nyt 7. pisteytystekijän ja se vahvistetaan syötteen perusteella. "vakauden" paino muutettu arvosta "0,10" arvoon "0,05", jotta kokonaissumma pysyy 1,0:na.### ✨ New Features

-**Tiered Quota Scoring (Auto-Combo)**: "TierPriority" lisättiin seitsemänneksi pisteytystekijäksi – Ultra/Pro-tasoilla varustetut tilit ovat nyt etusijalla ilmaisiin tasoihin verrattuna, kun muut tekijät ovat samat. ProviderCandidatessa uudet valinnaiset kentät "accountTier" ja "quotaResetIntervalSecs". Kaikki 4 tilapakettia päivitetty ("nopea toimitus", "kustannussäästö", "laatu ensimmäinen", "offline-ystävällinen"). -**Perheen sisäiset mallit (T5)**: Kun malli ei ole saatavilla (404/400/403), OmniRoute siirtyy nyt automaattisesti takaisin saman perheen sisarmalleihin ennen kuin palauttaa virheen (`modelFamilyFallback.ts`). -**Määritettävä API Bridgen aikakatkaisu**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var antaa operaattoreille virittää välityspalvelimen aikakatkaisun (oletus 30 s). Korjaa 504-virheet hitaissa ylävirran vastauksissa. (#332) -**Tähtihistoria**: Star-history.com-widget on korvattu starchart.cc:llä (`?variant=adaptive`) kaikissa 30 README:ssä – mukautuu vaaleaan/tummaan teemaan, reaaliaikaiset päivitykset.### 🐛 Bug Fixes

-**Auth — Ensimmäinen salasana**: "INITIAL*PASSWORD" env var hyväksytään nyt ensimmäistä kojelaudan salasanaa määritettäessä. Käyttää "timingSafeEqual"-parametria jatkuvan ajan vertailuun, mikä estää ajoitushyökkäykset. (#333) -**README-leikkaus**: Korjattu puuttuva `</details>` -sulkutunniste Vianetsintä-osiossa, jonka vuoksi GitHub lakkasi hahmontamasta kaikkea sen alapuolella (Tech Stack, Docs, Roadmap, Contributors). -**pnpm-asennus**: Package.json-tiedostosta poistettiin ylimääräinen @swc/helpers-ohitus, joka oli ristiriidassa suoran riippuvuuden kanssa, mikä aiheutti EOVERRIDE-virheitä pnpm:ssä. Lisätty pnpm.onlyBuiltDependencies-määritys. -**CLI-polun lisäys (T12)**: Lisätty "isSafePath()"-tarkistustyökalu "cliRuntime.ts"-tiedostoon estämään polun läpikulku ja komentotulkin metamerkit kentässä CLI*\*\_BIN env vars. -**CI**: Regeneroitu "package-lock.json" ohituksen poistamisen jälkeen GitHub Actionsin "npm ci" -virheiden korjaamiseksi.### 🔧 Improvements

-**Response Format (T1)**: "response_format" (json_schema/json_object) on nyt lisätty järjestelmäkehotteena Claudelle, mikä mahdollistaa strukturoidun tulosteen yhteensopivuuden. -**429 Retry (T2)**: URL-sisäinen yritys uudelleen 429 vastaukselle (2x yritystä 2 sekunnin viiveellä) ennen kuin palaat seuraavaan URL-osoitteeseen. -**Gemini CLI Headers (T3)**: Lisätty "User-Agent" ja "X-Goog-Api-Client" sormenjälkiotsikot Gemini CLI -yhteensopivuutta varten. -**Hinnoitteluluettelo (T9)**: Lisätty hinnoittelumerkinnät "deepseek-3.1", "deepseek-3.2" ja "qwen3-coder-next".### 📁 New Files

| Tiedosto                                   | Tarkoitus                                                 |
| ------------------------------------------ | --------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Malliperheen määritelmät ja perheen sisäinen varalogiikka | ### Fixed |

-**KiloCode**: kilokoodin terveystarkistuksen aikakatkaisu on jo korjattu versiossa 2.3.11 -**OpenCode**: Lisää avoin koodi cliRuntime-rekisteriin 15 sekunnin terveystarkistuksen aikakatkaisulla -**OpenClaw / Cursor**: pidennä terveystarkistuksen aikakatkaisua 15 sekuntiin hitaalla käynnistyksellä -**VPS**: Asenna droidi- ja openclaw npm -paketit; aktivoi CLI_EXTRA_PATHS kiro-clille -**cliRuntime**: Lisää avoimen koodin työkalun rekisteröinti ja lisää aikakatkaisua jatkamista varten## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode-terveystarkastus**: Nosta "healthcheckTimeoutMs" 4000 ms:sta 15 000 ms:iin – kilokoodi näyttää ASCII-logobannerin käynnistettäessä ja aiheuttaa virheellisen "healthcheck_failed" hidas-/kylmäkäynnistysympäristöissä## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Korjaa "check:any-budget:t11" -virhe – korvaa "as any" arvolla "as Record<merkkijono, tuntematon>" tiedostossa OAuthModal.tsx (3 esiintymää)### Docs

-**CLI-TOOLS.md**: Täydellinen opas kaikille 11 CLI-työkalulle (claude, codex, gemini, opencode, cline, kilocode, jatka, kiro-cli, kursori, droidi, openclaw) -**i18n**: CLI-TOOLS.md synkronoitu 30 kielelle käännetyllä otsikolla + johdanto## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Uusi vanha OpenAI-täydennysten päätepiste – hyväksyy sekä kehotemerkkijonon että viestitaulukon, normalisoituu chat-muotoon automaattisesti -**EndpointPage**: näyttää nyt kaikki kolme OpenAI-yhteensopivaa päätetyyppiä: Chat Completions, Responses API ja Legacy Completions -**i18n**: Lisätty "completionsLegacy/completionsLegacyDesc" 30 kielitiedostoon### Fixed

-**OAuthModal**: Korjaa `[object Object]`, joka näkyy kaikissa OAuth-yhteysvirheissä — poimi `.message` oikein virhevastausobjekteista kaikissa kolmessa `heittää uusi Error(data.error)` -kutsu (vaihto, laitekoodi, valtuutus)

- Vaikuttaa Clineen, Codexiin, GitHubiin, Qweniin, Kiroon ja kaikkiin muihin OAuth-palveluntarjoajiin## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Lisää "decodeURIComponent" ennen base64-dekoodausta, jotta takaisinkutsun URL-osoitteen URL-koodatut todennuskoodit jäsennetään oikein, mikä korjaa "virheellisen tai vanhentuneen valtuutuskoodin" virheet etäasetuksissa (LAN IP) -**Cline OAuth**: `mapTokens` täyttää nyt `name = etunimi + sukunimi || sähköpostiin, joten Cline-tilit näyttävät oikeat käyttäjätunnukset "Account #ID" -tunnuksen sijaan -**OAuth-tilien nimet**: Kaikki OAuth-vaihtovirrat (vaihto, kysely, kyselyn takaisinsoitto) normalisoivat nyt "nimi = sähköposti", kun nimi puuttuu, joten jokainen OAuth-tili näyttää sähköpostinsa näyttötunnisteena palveluntarjoajien hallintapaneelissa -**OAuth-tilien nimet**: Poistettu peräkkäinen "Account N" -varaustiedosto tiedostosta "db/providers.ts" – tilit, joilla ei ole sähköpostiosoitetta tai nimeä, käyttävät nyt vakaata tunnistepohjaista tunnistetta "getAccountDisplayName()":n kautta sen järjestysnumeron sijaan, joka muuttuu tilien poistamisen yhteydessä.## [2.3.6] - 2026-03-12

### Fixed

-**Toimittajan testierä**: Korjattu Zod-skeema, joka hyväksyy providerId: null (käyttöliittymä lähettää nolla-arvon ei-palveluntarjoajan tiloissa); palautti virheellisesti "Virheellinen pyyntö" kaikille erätesteille -**Provider Test modal**: Korjattu "[object Object]" -näyttö normalisoimalla API-virheobjektit merkkijonoiksi ennen hahmontamista setTestResults- ja ProviderTestResultsView-kohdissa -**i18n**: puuttuvat avaimet "cliTools.toolDescriptions.opencode", "cliTools.toolDescriptions.kiro", "cliTools.guides.opencode", "cliTools.guides.kiro" lisättiin tiedostoon "en.json". -**i18n**: Synkronoitu 1111 puuttuvaa avainta kaikissa 29 ei-englanninkielisessä tiedostossa käyttämällä englanninkielisiä arvoja varauksina## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Lisätty pysyvä "postinstall"-korjaus, jolla "@swc/helpers" kopioidaan itsenäisen sovelluksen "node_modules" -moduuliin - estää MODULE_NOT_FOUND-kaatumisen globaaleissa npm-asennuksissa## [2.3.4] - 2026-03-10

### Added

- Useiden palveluntarjoajien integraatiot ja kojelautaparannukset
