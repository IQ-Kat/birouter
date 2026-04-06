# OmniRoute — Dashboard Features Gallery (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Visuaalinen opas OmniRoute-hallintapaneelin jokaiseen osioon.---

## 🔌 Providers

Hallinnoi AI-palveluntarjoajan yhteyksiä: OAuth-palveluntarjoajat (Claude Code, Codex, Gemini CLI), API-avaintoimittajat (Groq, DeepSeek, OpenRouter) ja ilmaiset palveluntarjoajat (Qoder, Qwen, Kiro). Kiro-tilit sisältävät luottosaldon seurannan – jäljellä olevat saldot, kokonaisrahoitus ja uusimispäivä näkyvät kohdassa Dashboard → Käyttö.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Luo mallin reitityskomboja kuudella strategialla: prioriteetti, painotettu, kiertävä, satunnainen, vähiten käytetty ja kustannusoptimoitu. Jokainen yhdistelmä ketjuttaa useita malleja automaattisilla varauksilla ja sisältää nopeat mallit ja valmiustarkistukset.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Kattava käyttöanalytiikka tunnuksen kulutuksella, kustannusarvioilla, aktiivisuuslämpökartoilla, viikoittaisilla jakelukaavioilla ja palveluntarjoajakohtaisilla erittelyillä.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Reaaliaikainen seuranta: käyttöaika, muisti, versio, latenssiprosenttipisteet (p50/p95/p99), välimuistitilastot ja palveluntarjoajan katkaisijan tilat.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Neljä tilaa API-käännösten virheenkorjaukseen:**Playground**(muodonmuunnin),**Chat Tester**(livepyynnöt),**Test Bench**(erätestit) ja**Live Monitor**(reaaliaikainen suoratoisto).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Testaa mitä tahansa mallia suoraan kojelaudalta. Valitse palveluntarjoaja, malli ja päätepiste, kirjoita kehotteita Monaco Editorilla, suoratoista vastaukset reaaliajassa, keskeytä kesken stream ja tarkastele ajoitusmittauksia.---

## 🎨 Themes _(v2.0.5+)_

Muokattavat väriteemat koko kojelautaan. Valitse 7 esiasetetusta väristä (koralli, sininen, punainen, vihreä, violetti, oranssi, syaani) tai luo mukautettu teema valitsemalla mikä tahansa kuusioväri. Tukee vaaleaa, tummaa ja järjestelmätilaa.---

## ⚙️ Settings

Kattava asetuspaneeli välilehdillä:

-**Yleistä**- Järjestelmän tallennus, varmuuskopioiden hallinta (vienti/tuonti tietokanta) -**Ulkoasu**- Teeman valitsin (tumma/vaalea/järjestelmä), väriteeman esiasetukset ja mukautetut värit, terveyslokin näkyvyys, sivupalkin kohteiden näkyvyyden säätimet -**Turvallisuus**— API-päätepisteiden suojaus, mukautetun palveluntarjoajan esto, IP-suodatus, istuntotiedot -**Reititys**— Mallin aliakset, taustatehtävän huononeminen -**Kestävyys**— Hintarajoituksen pysyvyys, katkaisijan viritys, estettyjen tilien automaattinen poistaminen käytöstä, palveluntarjoajan vanhenemisen valvonta -**Lisäasetukset**— Kokoonpanon ohitukset, määrityksen kirjausketju, varatilan heikkenemistila![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Yhden napsautuksen konfigurointi AI-koodaustyökaluille: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor ja Factory Droid. Sisältää automaattisen konfiguroinnin käyttöönotto/nollaus, yhteysprofiilit ja mallikartoituksen.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Kojelauta CLI-agenttien löytämiseen ja hallintaan. Näyttää 14 sisäänrakennetun agentin (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) ruudukon, jossa on:

-**Asennustila**— Asennettu / Ei löydy versiontunnistuksen kanssa -**Protokollamerkit**— stdio, HTTP jne. -**Muokatut agentit**— Rekisteröi mikä tahansa CLI-työkalu lomakkeella (nimi, binaari, versiokomento, spawn args) -**CLI-sormenjälkien vastaavuus**– Palveluntarjoajakohtainen kytkin vastaamaan alkuperäisten CLI-pyyntöjen allekirjoituksia, mikä vähentää eston riskiä ja säilyttää välityspalvelimen IP-osoitteen---

## 🖼️ Media _(v2.0.3+)_

Luo kuvia, videoita ja musiikkia kojelaudalta. Tukee OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open ja MusicGen.---

## 📝 Request Logs

Reaaliaikainen pyyntöjen kirjaaminen suodatuksella palveluntarjoajan, mallin, tilin ja API-avaimen mukaan. Näyttää tilakoodit, tunnuksen käytön, viiveen ja vastaustiedot.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Yhdistetty API-päätepisteesi ominaisuuksien erittelyllä: Chat Completions, Responses API, upotukset, kuvan luominen, uudelleensijoitus, äänen transkriptio, tekstistä puheeksi, moderaatiot ja rekisteröidyt API-avaimet. Cloudflare Quick Tunnel -integraatio ja pilvivälityspalvelintuki etäkäyttöä varten.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Luo, laajenna ja peruuta API-avaimia. Jokainen avain voidaan rajoittaa tiettyihin malleihin/palveluntarjoajiin, joilla on täydet käyttöoikeudet tai vain lukuoikeudet. Visuaalinen avainten hallinta käytön seurannalla.---

## 📋 Audit Log

Hallinnollinen toimintojen seuranta suodatuksella toimintotyypin, toimijan, kohteen, IP-osoitteen ja aikaleiman mukaan. Täydellinen tietoturvatapahtumahistoria.---

## 🖥️ Desktop Application

Native Electron -työpöytäsovellus Windowsille, macOS:lle ja Linuxille. Suorita OmniRoute itsenäisenä sovelluksena, jossa on järjestelmälokeron integrointi, offline-tuki, automaattinen päivitys ja asennus yhdellä napsautuksella.

Tärkeimmät ominaisuudet:

- Palvelimen valmiuskysely (ei tyhjää näyttöä kylmäkäynnistyksen yhteydessä)
- Järjestelmälokero portinhallinnan kanssa
- Sisällön suojauskäytäntö
- Yksiosainen lukko
- Automaattinen päivitys uudelleenkäynnistyksen yhteydessä
- Alustan ehdollinen käyttöliittymä (macOS-liikennevalot, Windowsin/Linuxin oletusotsikkopalkki)
- Hardened Electron build -pakkaus – itsenäisen nipun symlinkoidut "solmumoduulit" tunnistetaan ja hylätään ennen pakkausta, mikä estää ajonaikaisen riippuvuuden rakennuskoneesta (v2.5.5+)

📖 Katso täydelliset asiakirjat osoitteesta [`electron/README.md`](../electron/README.md).
