# Test Coverage Plan (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Viimeksi päivitetty: 28-03-2026## Baseline

Kattavuuslukuja on useita riippuen siitä, miten raportti lasketaan. Suunnittelussa vain yksi niistä on hyödyllinen.

| Metrinen             | Soveltamisala                                                   | Lausunnot / rivit | Sivukonttorit | Toiminnot | Huomautuksia                                                |
| -------------------- | --------------------------------------------------------------- | ----------------: | ------------: | --------: | ----------------------------------------------------------- |
| Legacy               | Vanha `npm run test:coverage`                                   |           79,42 % |       75,15 % |   67,94 % | Paisutettu: laskee testitiedostot ja jättää pois "open-sse" |
| Diagnostiikka        | Vain lähdekoodi, pois lukien testit ja pois lukien "open-sse"   |           68,16 % |       63,55 % |   64,06 % | Hyödyllinen vain eristämään `src/**`                        |
| Suositeltu lähtötaso | Vain lähdekoodi, pois lukien testit ja mukaan lukien "open-sse" |           56,95 % |       66,05 % |   57,80 % | Tämä on hankkeen laajuinen lähtökohta                       |

Suositeltu perustaso on luku, jota vastaan ​​optimoidaan.## Rules

- Kattavuustavoitteet koskevat lähdetiedostoja, eivät testejä/\*\*.
- "open-sse/\*\*" on osa tuotetta ja sen on pysyttävä voimassa.
- Uuden koodin ei pitäisi vähentää kattavuutta kosketetuilla alueilla.
- Suosi testauskäyttäytymistä ja haaran tuloksia toteutustietojen sijaan.
- Pidä parempana tilapäisiä SQLite-tietokantoja ja pieniä kalusteita `src/lib/db/**`:n laajojen pilkkien sijaan.## Current command set

- "npm run test:coverage".
  - Päälähteen peittoportti yksikkötestisarjalle
  - Luo tekstin yhteenvedon, html:n, json-summaryn ja lcov:n
- "npm run coverage:report".
  - Yksityiskohtainen tiedostokohtainen raportti viimeisimmästä ajon
- "npm run test:coverage:legacy".
  - Vain historiallinen vertailu## Milestones

| Vaihe   |                    Kohde | Keskity                                              |
| ------- | -----------------------: | ---------------------------------------------------- |
| Vaihe 1 | 60 % lausuntoja / rivejä | Nopeat voitot ja alhaisen riskin hyötykäyttö         |
| Vaihe 2 | 65 % lausuntoja / rivejä | DB ja reitin perustukset                             |
| Vaihe 3 | 70 % lausuntoja / rivejä | Palveluntarjoajan validointi ja käyttöanalytiikka    |
| Vaihe 4 | 75 % lausuntoja / rivejä | "open-sse" kääntäjät ja avustajat                    |
| Vaihe 5 | 80 % lausuntoja / rivejä | "open-sse"-käsittelijät ja toimeenpanijahaarat       |
| Vaihe 6 | 85 % lausuntoja / rivejä | Vaikeimmat tapaukset, haaravelat, regressiosarjat    |
| Vaihe 7 | 90 % lausuntoja / rivejä | Viimeinen pyyhkäisy, aukon sulkeminen, tiukka räikkä |

Haarojen ja funktioiden tulisi räihdä ylöspäin jokaisen vaiheen myötä, mutta ensisijainen kova kohde on lauseet / rivit.## Priority hotspots

Nämä tiedostot tai alueet tarjoavat parhaan tuoton seuraaville vaiheille:

1. "open-sse/handlers".
   - "chatCore.ts" 7,57 %
   - Kokonaishakemisto 29,07 %
2. "open-sse/kääntäjä/pyyntö".
   - Kokonaishakemisto 36,39 %
   - Monet kääntäjät ovat vielä lähellä yksinumeroista kattavuutta
3. "open-sse/translator/response".
   - Kokonaishakemisto 8,07 %
4. "open-sse/executors".
   - Kokonaishakemisto 36,62 %
5. "src/lib/db".
   - "mallit.ts" 20,66 %
   - "registeredKeys.ts" 34,46 %
   - "modelComboMappings.ts" 36,25 %
   - "asetukset.ts" 46,40 %
   - "webhooks.ts" 33,33 %
6. "src/lib/usage".
   - "usageHistory.ts" 21,12 %
   - "usageStats.ts" 9,56 %
   - `costCalculator.ts` 30,00 %
7. "src/lib/providers".
   - "validation.ts" 41,16 %
8. Matalariskiset apuohjelma- ja API-tiedostot varhaisten hyötyjen saamiseksi
   - `src/shared/utils/upstreamError.ts`
   - "src/shared/utils/apiAuth.ts".
   - "src/lib/api/errorResponse.ts".
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Korjaa kattavuusmittari niin, että se heijastaa lähdekoodia testitiedostojen sijaan
- [x] Säilytä vanha kattavuusskripti vertailua varten
- [x] Tallenna perusviiva ja hotspotit repossa
- [ ] Lisää kohdennettuja testejä vähäriskisille apuohjelmille:
  - `src/shared/utils/upstreamError.ts`
  - "src/shared/utils/fetchTimeout.ts".
  - "src/lib/api/errorResponse.ts".
  - "src/shared/utils/apiAuth.ts".
  - `src/lib/display/names.ts'
- [ ] Lisää reittitestejä:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Lisää DB-tuetut testit:
  - "src/lib/db/modelComboMappings.ts".
  - "src/lib/db/settings.ts".
  - "src/lib/db/registeredKeys.ts".
- [ ] Kansihaaran käyttäytyminen:
  - "src/lib/providers/validation.ts".
  - "src/app/api/v1/embeddings/route.ts".
  - "src/app/api/v1/moderations/route.ts".### Phase 3: 65% -> 70%

- [ ] Lisää käyttöanalytiikkatestejä:
  - "src/lib/usage/usageHistory.ts".
  - "src/lib/usage/usageStats.ts".
  - "src/lib/usage/costCalculator.ts".
- [ ] Laajenna välityspalvelinhallinnan ja asetushaarojen reitin kattavuutta### Phase 4: 70% -> 75%

- [ ] Kansikääntäjän apuohjelmat ja keskeiset käännöspolut:
  - "open-sse/translator/index.ts".
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Lisää käsittelijän tason testejä:
  - "open-sse/handlers/chatCore.ts".
  - "open-sse/handlers/responsesHandler.js".
  - "open-sse/handlers/imageGeneration.js".
  - "open-sse/handlers/embeddings.js".
- [ ] Lisää suorittajan haaran kattavuus palveluntarjoajakohtaista todennusta, uudelleenyrityksiä ja päätepisteen ohituksia varten### Phase 6: 80% -> 85%

- [ ] Yhdistä useampi reunakotelopaketti pääpeittopolkuun
- [ ] Lisää toimintojen kattavuutta DB-moduuleille, joilla on heikko rakentaja/apuohjelma
- [ ] Sulje haarojen aukot parametreissa "settings.ts", "registeredKeys.ts", "validation.ts" ja kääntäjien apuohjelmat### Phase 7: 85% -> 90%

- [ ] Käsittele jäljellä olevia vähäpeittoisia tiedostoja estoina
- [ ] Lisää regressiotestit jokaiselle paljastuneelle tuotantovirheelle, joka korjattiin työntämisen aikana 90 prosenttiin
- [ ] Nosta peittoporttia CI:ssä vasta, kun paikallinen perusviiva on vakaa vähintään kahden peräkkäisen ajon ajan## Ratchet policy

Päivitä "npm run test:coverage" -kynnykset vasta, kun projekti todella ylittää seuraavan virstanpylvään mukavalla puskurilla.

Suositeltu räikkäjärjestys:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Järjestys on "lausekkeet-rivit / haarat / funktiot".## Known gap

Nykyinen peittokomento mittaa pääsolmuyksikköpakettia ja sisältää siitä saavutetun lähteen, mukaan lukien "open-sse". Se ei vielä yhdistä Vitestin kattavuutta yhdeksi yhtenäiseksi raportiksi. Tuo yhdistäminen kannattaa tehdä myöhemmin, mutta se ei estä 60 % -> 80 % nousun aloittamista.
