# OmniRoute Auto-Combo Engine

> Samosprávné řetězce modelů s adaptivním bodováním

## Jak to funguje

Systém Auto-Combo dynamicky vybírá nejlepšího poskytovatele/model pro každý požadavek pomocí **6faktorové skórovací funkce** :

Faktor | Hmotnost | Popis
:-- | :-- | :--
Kvóta | 0,20 | Zbývající kapacita [0..1]
Zdraví | 0,25 | Jistič: ZAVŘENO=1,0, POLOVINA=0,5, OTEVŘENO=0,0
Náklady na fakturu | 0,20 | Inverzní náklady (levnější = vyšší skóre)
LatencyInv | 0,15 | Inverzní latence p95 (rychlejší = vyšší)
TaskFit | 0,10 | Skóre zdatnost modelu × typu úlohy
Stabilita | 0,10 | Nízká variabilita latence/chyb

## Balíčky módů

Balíček | Soustředit | Hmotnost klíče
:-- | :-- | :--
🚀 **Rychlé odeslání** | Rychlost | latenceInv: 0,35
💰 **Úspora nákladů** | Ekonomika | Náklady na účet: 0,40
🎯 **Kvalita na prvním místě** | Nejlepší model | taskFit: 0,40
📡 **Vhodné pro offline použití** | Dostupnost | kvóta: 0,40

## Samoléčení

- **Dočasné vyloučení** : Skóre &lt; 0,2 → vyloučeno na 5 minut (postupné oddlužování, max. 30 minut)
- **Upozornění na jistič** : OTEVŘENO → automatické vyloučení; POLOVIČNÍ OTEVŘENO → požadavky sondy
- **Režim incidentu** : &gt;50% OTEVŘENO → deaktivovat průzkum, maximalizovat stabilitu
- **Obnova po zchlazení** : Po vyloučení je první požadavek „sonda“ se zkráceným časovým limitem.

## Průzkum banditů

5 % požadavků (konfigurovatelných) je směrováno k náhodným poskytovatelům k prozkoumání. V režimu incidentu je toto nastavení zakázáno.

## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Úkol Fitness

Více než 30 modelů hodnocených v 6 typech úkolů ( `coding` , `review` , `planning` , `analysis` , `debugging` , `documentation` ). Podporuje zástupné znaky (např. `*-coder` → vysoké skóre kódování).

## Soubory

Soubor | Účel
:-- | :--
`open-sse/services/autoCombo/scoring.ts` | Skórovací funkce a normalizace poolu
`open-sse/services/autoCombo/taskFitness.ts` | Vyhledávání vhodnosti modelu × úkolu
`open-sse/services/autoCombo/engine.ts` | Logika výběru, bandita, rozpočtový strop
`open-sse/services/autoCombo/selfHealing.ts` | Vyloučení, sondy, režim incidentu
`open-sse/services/autoCombo/modePacks.ts` | 4 hmotnostní profily
`src/app/api/combos/auto/route.ts` | REST API
