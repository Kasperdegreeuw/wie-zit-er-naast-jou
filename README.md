# Wie zit er naast jou? – scrollytelling (eerste opzet)

CMD-opdracht tijdsverloop. Een fictief leven van 1996 tot 2026, als comic in de jij-vorm. Je scrolt omlaag, het verhaal schuift mee omhoog.

## Starten

Open de map met een lokale server (nodig omdat de SVG's met `fetch` worden geladen):

```
npx serve .
# of
python3 -m http.server
```

Online: https://kasperdegreeuw.github.io/wie-zit-er-naast-jou/ (GitHub Pages, branch `main`, map `/`). Elke push naar `main` zet de site binnen een minuut live.

## Mappen

```
index.html
css/style.css      neutrale opmaak, nog geen stijl
js/scenes.js       alle scènes, panelen, lagen en teksten (namen = Figma-laagnamen)
js/shapes.js       storyboard-vormen (ballonnen, captions) voor de placeholders
js/assets.js       eerste versie van alle personen en objecten (zelfde als Figma-pagina Assets)
js/briefs.js       regie-tekst per scène (staat ook naast elk frame in Figma)
js/main.js         scroll-logica (GSAP + ScrollTrigger)
assets/svg/        hier komen de exports uit Figma
```

## Van Figma naar de site

1. Ontwerp in het Figma-bestand *Hooligan scrollytelling – assets*. Elk frame (1440 × 900) is één hoofdstuk, bijvoorbeeld `03-1996`. Houd de bovenste 80 px vrij voor het jaartal en het woord, en de onderste 80 px voor de tijdlijn.
2. **Houd de laagnamen gelijk** (`lift`, `oog`, `ballon-moeder` …). Daarmee vindt de code welk paneel of welke ballon moet bewegen.
3. Selecteer het frame → Export → **SVG** → zet **Include "id" attribute** aan.
4. Sla het op als `assets/svg/<frame-naam>.svg`, bijvoorbeeld `assets/svg/03-1996.svg`.
5. Zet de naam erbij in `assets/svg/index.json`, bijvoorbeeld `["03-1996"]`. Alleen scènes in die lijst worden opgehaald.
6. Ververs de pagina. De site gebruikt nu jouw ontwerp in plaats van de placeholder.

Een nieuw paneel of een nieuwe laag die moet bewegen? Voeg hem toe in `js/scenes.js` met dezelfde naam als in Figma.

## Wat er beweegt

- **Geen hoofdstukken.** Het verhaal loopt door; tussen twee scènes met een ander jaar staat een **tijdlijn**: een verticale liniaal met jaren en "Mark is …" die langs het pijltje schuift. Van 2026 naar 1996 spoelt hij terug. Hoe meer jaren, hoe langer. De tijdlijnen maakt `main.js` zelf; in Figma staan ze als `tijd-…`-frames om de stijl te ontwerpen.
- **Jaartal linksboven** telt mee in de scènes (verdwijnt tijdens de tijdlijn).
- **Guided view:** de camera gaat per scène paneel voor paneel in leesvolgorde en zoomt daarna uit. De volgorde van de panelen in `scenes.js` is de leesvolgorde.
- **Camera per scène** (`transition`): `slow` glijdt, `assemble` normaal, `shock` snel, `beat` harde cuts.
- **Plaats en tijd** staan als klein stripkadertje in het eerste paneel (lagen `plek-…`).
- `fx: "shake"` trilt (telefoons, rennen). Laagnamen die beginnen met `notitie` worden op de site verborgen.

## Assets aanpassen in je eigen stijl

Op de Figma-pagina **Assets** (scènes staan op **Scènes**) staat elk personage en object als component (`asset/p-mark-pak`, `asset/o-krant` …).
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
- v10 (3 nov): geen hoofdstukken meer, tijdlijnen tussen de scènes, tekstbalk onderin weg. Verhaal sluit: 2014 "voor Ruud", terug bij de avond van het gevecht, en de keuze tussen twee zinnen.
- v11 (3 nov): nieuwe titelpagina (groot type en de rode sjaal, geen kaders), vraag-scène en "bestaan niet" weg, slotvraag groot onder de tribune.
- v12 (3 nov): fine-tuning met de UI/UX-skill: Inter + JetBrains Mono, donkere inkt (#18181b) voor kaders en tekst, vaste tekstmaten (captions 20, ballonnen 22), kaders zo hoog als de tekst, grotere jaartallen op de tijdlijn, scroll-hint in het midden, respect voor "minder beweging".
- v13 (3 nov): trager scrollen (1,6× zo lang, scrub 1). Ontwerp volgens de frontend-design-skill: beton (#e9eaec) en asfalt (#1c1f23), één familie Archivo (smal en zwaar voor titel, jaartallen en krantenkop; normaal voor captions), geen kapitalen-labels of monospace, grote smalle jaartallen als het opvallende element op de tijdlijn.
- v14 (4 nov): wit papier in plaats van beton; Lenis (js/vendor) maakt muiswiel-scrollen op laptop vloeiend; teksten aangescherpt (Ruud en Lisa bij naam, plaats en regels concreet); krantenkop en titel meten zichzelf en passen altijd; echt einde met de knop "Opnieuw beginnen".
- v15 (4 nov): Lenis weer weg (native scroll, scrub 1); personages hebben een hals, Lisa's lange haar valt nu achter haar hoofd; tijdlijn staat als componenten op de Figma-pagina Assets (tijdlijn/jaar-moment, tijdlijn/jaar-tussen, tijdlijn/lijn, tijdlijn/nu).
- v16 (4 nov): cirkel om Mark op de tribune (14-einde) is inkt in plaats van rood; rood zit nu alleen nog in de sjaal.
- v17 (4 nov): Ruud draagt na 1996 een grijze sjaal (nieuw asset `p-ruud-later` voor ruud-rent, ruud-trein, ruud-wacht en ruud-linie). Er is nu steeds maar één rode sjaal in beeld.
- v18 (4 nov): bericht in 12-thuis zonder middenpuntje ("za 14:00, locatie volgt").
- v19 (4 nov): jaartal en label linksboven vervagen terwijl de strip naar de volgende scène schuift, zodat de panelen er niet onder doorlopen.
- v20 (4 nov): overlappingen weg: Mark in 01 iets kleiner (voeten boven de caption, koffie mee), sms'jes in 02 binnen het schermpje, feitencaption in 06 links naast de krant, scroll-hint verdwijnt voordat de eerste scène inschuift.
- v21 (4 nov): in 05-1996 staat de jonge Mark (laag mark-96) rechts in het paneel bij Ruud; de ballon "Zestien." heeft zijn staartje naar hem (nieuwe ballonoptie tail: "right").
- v22 (4 nov): herinneringen in 13-keuze (echo-ruud, echo-vader) hebben een stippelrand in staal en lichtere figuren; nieuwe paneloptie herinnering: true.
- v23 (4 nov): bronregel in 15-slot noemt dat de interviews uit boeken en artikelen komen (onder meer Spaaij, Vos en Kievits); tekstvak breder zodat hij op twee regels past.
- v24 (4 nov): geen 404's meer in de console: assets/svg/index.json zegt welke Figma-exports er zijn, en een lege favicon.
- v25 (4 nov): in 01-maandag staat Mark (laag mark-collega) rechts in het paneel bij de collega; zijn ballon "Iemand juichte te wild." wijst naar hem.
- v26 (4 nov): ballon "Voor Ruud." in 11-2014 staat boven Mark, zodat het staartje naar hem wijst.
- v27 (4 nov): korter scrollen op basis van onderzoek naar scrollytelling (1–3 schermhoogtes per stap, 3–5 minuten totaal): factor 1,6 naar 1,3 (SCROLL_PER_SEC) en kortere tijdlijnen. Van ± 1.390 naar ± 1.060 wieltikken.
- v28 (4 nov): het zwart in 03 vult het hele scherm (paneloptie vol, scèneoptie uitzoomen: false); alleen "Dan rent de eerste." in wit, jaartal weg.
- v29 (4 nov): jaartal en label schalen mee met de strip; op een laptop (1366 × 768, 1280 × 720) staan ze recht boven de panelen in plaats van ertegenaan.
- v30 (4 nov): op kleine schermen (smaller dan 900 px of lager dan 500 px) een korte melding dat de strip voor een groter scherm is, met de knop "Toch bekijken".
- v31 (4 nov): tekstversie voor schermlezers: alle captions en ballonnen in leesvolgorde, met per scène het jaartal als kop; tekeningen en jaartal worden overgeslagen.
