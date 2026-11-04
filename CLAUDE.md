# Wie zit er naast jou? – werkafspraken voor Claude

CMD-opdracht (HvA) "visualisatie van een verloop over de tijd". Een scrollytelling in stripvorm over Mark, een verzonnen Feyenoord-hooligan, van 1996 tot 2026. Het verhaal is in de jij-vorm. Desktop 1440 × 900, gehost op GitHub Pages: https://kasperdegreeuw.github.io/wie-zit-er-naast-jou/ (repo `Kasperdegreeuw/wie-zit-er-naast-jou`, branch `main`; een push naar `main` zet de site live, tags apart pushen met `git push origin --tags`).
Ontwerp: Kasper (Figma). Code: GSAP 3.12.5 + ScrollTrigger via cdnjs, verder plain HTML/CSS/JS zonder build-stap.

## Communicatie
- Altijd in het **Nederlands**, kort en direct.
- Geef gerichte feedback en één concreet voorbeeld. Herschrijf zijn teksten niet zonder dat hij erom vraagt.

## Harde regels
- **Elke versie bewaren.** Commit en tag vóór elke inhoudelijke wijziging (`v16`, `v17` …) en zet een regel in README › Versies. In Figma bevries je eerst de pagina *Scènes* als *Versie N*: dupliceren en alle instances detachen.
- **Rood (#b5534c) is alleen voor Ruuds sjaal.** Geen rood in de interface of in andere assets (ook niet de markering in 14-einde: die is inkt). Sjaals van andere figuren zijn grijs (`scarfC`). Er is steeds maar één rode sjaal in beeld: tot en met 1996 om Ruud (`p-ruud`), daarna om Mark en later om zijn zoon. Ruud draagt na 1996 een grijze (`p-ruud-later`).
- **Geen Lenis of smooth-scroll-library.** Kasper vond het raar scrollen. Gebruik native scroll met ScrollTrigger `scrub: 1`.
- **Laagnamen in Figma zijn gelijk aan de namen in `js/scenes.js`.** Hernoem nooit één kant zonder de andere.
- Stijl volgens de frontend-design-skill:
  - wit papier, asfalt-inkt (#1c1f23), staal (#5c636e) voor bijtekst
  - één letterfamilie: **Archivo**. Smal en zwaar (wdth 62, 800) voor titel, jaartallen en krantenkop; normaal voor captions en ballonnen
  - geen labels in kapitalen, geen monospace, geen middenpuntjes (`A · B`) in zichtbare tekst
  - zinnen in sentence case
- Geweld laat je niet zien (closure: 03-zwart). Van het echte slachtoffer van Beverwijk (1997) komen geen naam en geen beeld in de strip.

## Verhaal (één draad: Ruud en zijn rode sjaal)
| Scène | Jaar | Wat er gebeurt |
|---|---|---|
| 00-titel | – | Titel en sjaal, geen jaartal in beeld |
| 01-maandag | 2026 | Blauw oog in de lift, een collega |
| 02-zaterdag | 2026 | Prepaid-bericht, leugen tegen Lisa, loods: Feyenoord tegen Ajax |
| 03-zwart | 2026 | Drie panelen (wijd → sneakers → zwart), camera "beat" |
| tijdlijn | 2026 → 1996 | Spoelt terug |
| 05-1996 | 1996 | Station; Ruud (19): "Hoe oud ben jij?" – Mark (13, staat rechts in het paneel) liegt: "Zestien." Hij geeft je de sjaal |
| 06-beverwijk | 1997 | Krant, focal point; "Ruud was erbij" |
| 07-1997 | 1997 | Eerste rel; Jeroens vader: "Jij komt daar nooit meer." |
| 08-1999 / 09-2005 | 1999, 2005 | Broederschap, dubbelleven |
| 10-2013 | 2013 | Zoon geboren, Ruud belt, je neemt niet op, begrafenis |
| 11-2014 | 2014 | "Voor Ruud." Je gaat terug |
| 12-thuis | 2026 | Zoon (13) draagt de sjaal, hetzelfde bericht |
| 13-keuze | 2026 | Twee herinneringszinnen (panelen met `herinnering: true`: stippelrand, lichtere figuren), een lege ballon: "Wat zeg jij?" |
| 14-einde | 2026 | Tribune: "Wie zit er naast jou?" |
| 15-slot | 2026 | "Ruud was negentien. Jij was dertien. Je zoon is dertien." en de knop *Opnieuw beginnen* |

Mark is geboren in 1983 (`MARK_GEBOREN`). Tussen scènes met een ander jaar maakt `main.js` automatisch een tijdlijn met de tekst "Mark is …".

## Code
- `js/scenes.js`: alle scènes, panelen en lagen, met de opties uitgelegd bovenin. Paneelvolgorde = leesvolgorde (guided view). Ballonnen hebben het staartje linksonder; `tail: "right"` als de spreker rechts staat.
- `js/assets.js`: personages en objecten als SVG. `window.ASSET_MAP` koppelt een laagnaam aan een asset. Personen zijn 100 × 240.
- `js/main.js` bevat:
  - de placeholder-renderer
  - de tijdlijn (`rulerSvg`)
  - de guided-view-camera
  - `fitText` voor losse koppen
  - de einde-knop
  - `window.__story` voor tests (`tl`, `starts`; labels `move<i>` en `c<i>-<j>` om naar een scène of paneel te scrollen)
- Scrolllengte: `SCROLL_PER_SEC` in `main.js` (1,3 schermhoogte per seconde tijdlijn, ± 1.060 wieltikken in totaal, ± 4 min). Onderbouwing (4 nov): gangbaar is 1–3 schermhoogtes per stap en 3–5 minuten voor het hele verhaal. Tijdlijnen zijn bewust kort (2026 → 1996 ± 35 tikken).
- Paneeloptie `vol` en scèneoptie `uitzoomen: false` bestaan nog in de code, maar worden niet gebruikt: Kasper vond 03-zwart schermvullend er raar uitzien (v28 teruggedraaid in v32). Niet opnieuw toepassen.
- Tijd volgens McCloud (*Understanding Comics* H4, ruimte = tijd): stille panelen krijgen meer scroll met paneeloptie `pauze` (10 nacht, 11 lisa, 13 antwoord). In de guided view blijven vorige panelen op 30 % zichtbaar; volgende panelen blijven verborgen (geen spoilers). Snelheidslijnen (`o-snelheid`) in 07 tonen beweging binnen één paneel. Het antwoordpaneel in 13 heeft geen kader (`plain`): het open einde blijft hangen.
- Jaartal en label schalen mee met de strip (`--u` in de CSS). Op schermen smaller dan 900 px of lager dan 500 px staat een melding met "Toch bekijken".
- Schermlezers krijgen een verborgen tekstversie (`article.sr-only`, gebouwd uit `SCENES`); de SVG's zijn `aria-hidden`.
- Jaartal en label linksboven vervagen terwijl de strip naar de volgende scène schuift (`applyPos`).
- Testen met Playwright op 1440 × 900. Git staat in `C:\Program Files\Git\cmd\git.exe` (niet in elke shell in het PATH).
- `js/briefs.js`: regietekst per scène, ook te zien naast elk frame in Figma.
- Een Figma-export `assets/svg/<scene-id>.svg` vervangt de placeholder, mits de id in `assets/svg/index.json` staat (zo vraagt de site geen bestanden op die er niet zijn).
- Lokaal starten: `npx serve .` of `python3 -m http.server`.

## Figma
- Bestand `RCsiCUmohfI1ONO50UAJo8` met deze pagina's:
  - **Scènes**: frames `00-titel` … `15-slot` en `tijd-…`, met een kaart `beschrijving/<id>` ernaast
  - **Assets**: componenten `asset/<key>` en `tijdlijn/*`
  - **Versie N**: bevroren kopieën (laatste: Versie 38, eindstand)
- Lagen zijn frames met de laagnaam, met daarin een instance van `asset/<key>` (personen, objecten) of een `-vorm`-frame plus `-tekst` (ballonnen, captions).
- Teksten in Figma staan in Archivo, net als op de site. Koppen (titel, krantenkop, slotvraag, jaartallen) zijn ExtraBold met `wdth 62`. Captions en ballonnen hebben dezelfde tekstmaat en kaderhoogte als de site (`textSize` en `fitHeight` in `main.js`).
- Stijlreferentie: Kaspers bestand *Prei ani assets* (`C29pMEZlfIeEdgSz6X2jaU`). Kenmerken:
  - vlakke vormen, afgeronde blokken met drie tonen, donker bovenaan
  - ovale ogen, stokjesarmen
- De tijdlijn wordt in code getekend (`rulerSvg` en de `.tl-*`-CSS). Kasper vindt hem zo goed (4 nov); `tijdlijn/*` in Figma is een kopie van de code-stijl.

## Open punten
- Twee contextclaims zijn niet gecheckt. Ze zijn eruit gehaald, dus niet opnieuw toevoegen zonder bron.

Afgerond: bronvermelding in `15-slot` is gecontroleerd door Kasper (v23): de interviews komen uit boeken en artikelen, niet uit eigen gesprekken.
