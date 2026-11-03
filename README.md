# Wie zit er naast jou? – scrollytelling (eerste opzet)

CMD-opdracht tijdsverloop. Een fictief leven van 1996 tot 2026, als comic in de jij-vorm. Je scrolt omlaag, het verhaal schuift mee omhoog.

## Starten

Open de map met een lokale server (nodig omdat de SVG's met `fetch` worden geladen):

```
npx serve .
# of
python3 -m http.server
```

Online zetten: push naar GitHub → Settings → Pages → branch `main`, map `/root`.

## Mappen

```
index.html
css/style.css      neutrale opmaak, nog geen stijl
js/scenes.js       alle hoofdstukken, panelen, lagen en teksten (namen = Figma-laagnamen)
js/shapes.js       storyboard-vormen (ballonnen, captions) voor de placeholders
js/assets.js       eerste versie van alle personen en objecten (zelfde als Figma-pagina Assets)
js/briefs.js       regie-tekst per hoofdstuk (staat ook naast elk frame in Figma)
js/main.js         scroll-logica (GSAP + ScrollTrigger)
assets/svg/        hier komen de exports uit Figma
```

## Van Figma naar de site

1. Ontwerp in het Figma-bestand *Hooligan scrollytelling – assets*. Elk frame (1440 × 900) is één hoofdstuk, bijvoorbeeld `03-1996`. Houd de bovenste 80 px vrij voor het jaartal en het woord, en de onderste 80 px voor de tijdlijn.
2. **Houd de laagnamen gelijk** (`lift`, `oog`, `ballon-moeder` …). Daarmee vindt de code welk paneel of welke ballon moet bewegen.
3. Selecteer het frame → Export → **SVG** → zet **Include "id" attribute** aan.
4. Sla het op als `assets/svg/<frame-naam>.svg`, bijvoorbeeld `assets/svg/03-1996.svg`.
5. Ververs de pagina. Bestaat het bestand, dan gebruikt de site jouw ontwerp in plaats van de grijze placeholder.

Een nieuw paneel of een nieuwe laag die moet bewegen? Voeg hem toe in `js/scenes.js` met dezelfde naam als in Figma.

## Wat er beweegt

- **Jaartal linksboven** telt mee met het scrollen (2026 → 1996 → 2026).
- **Guided view:** de camera gaat per hoofdstuk paneel voor paneel in leesvolgorde (zoals een strip-app) en zoomt daarna uit naar de hele pagina. De volgorde van de panelen in `scenes.js` is de leesvolgorde.
- **Tekstballonnen en captions** verschijnen als de camera bij hun paneel is.
- **Eén groot woord** per periode (laag `woord`).
- **Tijdlijn onderaan:** een dunne lijn over de volle breedte die volloopt, met een stip per hoofdstuk en zonder tekst.
- **Context onderin** (`context` in `scenes.js`): één zin uitleg per hoofdstuk over wie, waar en wat. In Figma staat hij als `notitie-context`.
- **Overgangen per hoofdstuk** (`transition` in `scenes.js`): `assemble`, `slow`, `shock`, `cut` of `beat` (harde cuts, paneel voor paneel). Hoe meer jaren tussen twee hoofdstukken, hoe langer de overgang.
- Lagen met `fx: "pulse"` kloppen als een hart (markering op de tribune), `fx: "shake"` trilt (prepaid telefoon, rennen).
- Laagnamen die beginnen met `notitie` (camera-aanwijzingen in Figma) worden op de site verborgen.
- `duration` in `scenes.js` bepaalt hoe lang een hoofdstuk blijft staan.

## Assets aanpassen in je eigen stijl

Op de Figma-pagina **Assets** staat elk personage en object als component (`asset/p-mark-pak`, `asset/o-krant` …).
Pas je het component aan, dan verandert het overal in de hoofdstukken mee. Exporteer daarna de hoofdstukframes opnieuw als SVG.
Naast elk hoofdstukframe staat een beschrijving: wat er gebeurt, wat de kijker voelt, beweging, wat zij zien, ontwerptip en bronnen.

## Versies

Elke versie blijft bewaard:

- **Code:** git-tags (`git tag` → `v4`, `v5` …) en een zip per versie in `versies/`.
- **Figma:** per versie een pagina *Versie N* met een bevroren kopie van alle hoofdstukken.
- v5 (3 nov): assets in de stijl van *Prei ani assets*, hartslag in 03 vervangen door drie panelen (wijd → sneakers → zwart), mist op achterste rijen.
- v5.1 (3 nov): soepeler scrollen.
- v6 (3 nov): verhaal met één draad, Ruud en zijn rode sjaal (1996 → 2026). Rood komt alleen in die sjaal voor.
- v7 (3 nov): guided view, één paneel tegelijk groot in beeld, dan de hele pagina.
- v8 (3 nov): contextzin per hoofdstuk, rustige tijdlijn zonder tekst.
- v9 (3 nov): "Wat zij zien" weg, dubbel blauw oog in 01 weg (zit al in het asset), koffiebeker in zijn hand.
