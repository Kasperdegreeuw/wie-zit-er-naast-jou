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
- **Panelen** komen per hoofdstuk los en schuin binnen en schuiven op hun plek.
- **Tekstballonnen en captions** verschijnen na de panelen.
- **Eén groot woord** per periode (laag `woord`).
- **Tijdlijn onderaan** loopt vol, met een stip per hoofdstuk.
- **Overgangen per hoofdstuk** (`transition` in `scenes.js`): `assemble`, `slow`, `shock`, `cut` of `beat` (harde cuts, paneel voor paneel). Hoe meer jaren tussen twee hoofdstukken, hoe langer de overgang.
- **Wat zij zien** (`outside` in `scenes.js`) staat bovenin het midden en verandert per hoofdstuk. In Figma staat de plek als `notitie-zij-zien`.
- Lagen met `fx: "pulse"` kloppen als een hart (oog, telefoon van de zoon, markering), `fx: "shake"` trilt (prepaid telefoon, rennen).
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
