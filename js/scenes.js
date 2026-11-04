/*
  Eén bron voor alle scènes. Dezelfde namen staan als laagnamen in Figma.
  Elke scène is 1440 x 900. Bovenin (0–80) staat het jaartal.

  Er zijn geen hoofdstukken meer. Tussen twee scènes met een ander jaar zet main.js automatisch
  een TIJDLIJN: een liniaal met jaren en Marks leeftijd die voorbijschuift (ook terug in de tijd).

  Laagtypes: person · hood · crowd (n, swap) · phone · object · round · bubble · caption · text (los type, size/bold/c)
  Opties laag:  suit, n, swap { cel: asset }, dark (donkere caption), tail: "right" (ballon), fx: "pulse" | "shake"
  Opties panel: shot (camera-notitie, alleen in Figma), dark (donker paneel), plain (geen kader)
  Opties scène:
    transition: "assemble" | "slow" | "shock" | "beat" (harde cuts) | "cut" → hoe de camera beweegt
    duration:   hoe lang de scène blijft staan
    hud: false  → geen jaartal linksboven (titel, slot)
    einde: true → laatste scherm, toont de knop "Opnieuw beginnen"
  Laag "text": size, bold, c ("muted" | "ink"), center, fit (krimpt tot hij op één regel / in het vak past)
  De volgorde van de panelen is de leesvolgorde (de camera gaat paneel voor paneel).
  Plaats en tijd staan als klein stripkadertje (laag "plek-…") in het eerste paneel.

  Verhaal (één draad: Ruud en zijn rode sjaal):
    2026  maandag: blauw oog op kantoor → zaterdag: het afgesproken gevecht
    1996  Ruud vraagt "Hoe oud ben jij?" en geeft je zijn sjaal
    1997  Beverwijk; je eerste rel: Ruud trekt je mee, Jeroens vader zegt "Jij komt daar nooit meer."
    1999–2005  broederschap en dubbelleven
    2013  je zoon wordt geboren, je wilt stoppen; Ruud belt, je neemt niet op; zijn begrafenis
    2014  je gaat terug, voor Ruud, met zijn sjaal om
    2026  zaterdagavond na het gevecht: je zoon (13) draagt de sjaal en krijgt hetzelfde bericht
          → twee zinnen uit je leven: welke zeg jij?
  Rood komt alleen voor in Ruuds sjaal.
*/
(function () {
  const L = (name, type, x, y, w, h, extra = {}) => Object.assign({ name, type, x, y, w, h }, extra);
  const T = (name, type, x, y, w, h, text, extra = {}) => L(name, type, x, y, w, h, Object.assign({ text }, extra));
  const P = (name, x, y, w, h, shot, layers, extra = {}) => Object.assign({ name, x, y, w, h, shot, layers }, extra);

  window.MARK_GEBOREN = 1983; // voor de leeftijd op de tijdlijn

  window.SCENES = [
    {
      id: "00-titel", year: 2026, label: "", transition: "slow", duration: 1.2, hud: false,
      // Geen kaders: groot type links, rechts de rode sjaal (de draad door het verhaal)
      panels: [
        P("titel", 0, 0, 1440, 900, "", [
          T("titel-tekst", "text", 80, 190, 760, 340, "Wie zit er naast jou?", { size: 150, bold: true, fit: true }),
          T("titel-sub", "text", 84, 560, 560, 90, "Dertig jaar uit het leven van een hooligan. Verzonnen, maar opgebouwd uit echte verhalen.", { size: 22, c: "muted" }),
          L("titel-sjaal", "object", 900, 330, 440, 220)
        ], { plain: true })
      ]
    },
    {
      id: "01-maandag", year: 2026, label: "43 jaar", transition: "slow", duration: 1.4,
      // Bron: P. (FC Twente) in Vos 2006
      panels: [
        P("lift", 80, 90, 620, 720, "POV · SPIEGEL IN DE LIFT", [
          L("spiegel", "object", 40, 30, 540, 640),
          L("mark", "person", 210, 120, 200, 470, { suit: true }),
          L("koffie", "object", 360, 337, 36, 51),
          T("plek-maandag", "caption", 20, 20, 330, 60, "Rotterdam, maandag 08:47."),
          T("caption-mark", "caption", 20, 600, 580, 100, "Je bent Mark. Op je werk weet niemand wat je in het weekend doet.")
        ]),
        P("close-up-oog", 740, 90, 620, 330, "EXTREME CLOSE-UP", [
          L("oog-groot", "round", 210, 40, 250, 250)
        ]),
        P("collega", 740, 450, 620, 360, "HALF-TOTAAL", [
          L("collega-persoon", "person", 30, 60, 150, 300),
          T("ballon-collega", "bubble", 200, 40, 380, 100, "Jezus, wat is er met je oog gebeurd?"),
          T("ballon-mark", "bubble", 200, 170, 380, 100, "Iemand juichte te wild. Elleboog.")
        ])
      ]
    },
    {
      id: "02-zaterdag", year: 2026, label: "Twee dagen eerder", transition: "assemble", duration: 1.2,
      // Bronnen: vechtafspraken via prepaid (Politie & Wetenschap); Kievits (erecode)
      panels: [
        P("telefoon", 80, 90, 360, 720, "POV · TWEEDE TELEFOON", [
          T("plek-zaterdag", "caption", 20, 20, 320, 60, "Zaterdag, twee dagen eerder."),
          L("prepaid", "phone", 70, 100, 220, 450, { fx: "shake" }),
          T("bericht-1", "bubble", 112, 148, 136, 48, "za 14:00"),
          T("bericht-2", "bubble", 112, 200, 136, 72, "loods 7, 20 tegen 20"),
          T("ballon-leugen", "bubble", 20, 600, 320, 90, "Schat, ik ga voetbal kijken met de jongens.")
        ]),
        P("loods", 480, 90, 880, 720, "WIJD · INDUSTRIETERREIN", [
          L("loods-achtergrond", "object", 20, 20, 840, 200),
          L("groep-eigen", "crowd", 20, 260, 400, 330, { n: 5 }),
          L("mark-capuchon", "hood", 160, 240, 120, 350),
          L("groep-tegenover", "crowd", 460, 260, 400, 330, { n: 5 }),
          T("caption-code-1", "caption", 20, 610, 840, 90, "Twintig van Feyenoord, twintig van Ajax, ver van de politie. Regel één: ligt iemand op de grond, dan is het klaar.")
        ])
      ]
    },
    {
      id: "03-zwart", year: 2026, label: "14:20", transition: "beat", duration: 1.8,
      // McCloud (closure): drie momenten steeds dichterbij, dan zwart.
      panels: [
        P("afstand", 80, 90, 400, 720, "WIJD · TWINTIG METER", [
          L("groep-links", "crowd", 20, 470, 160, 210, { n: 4 }),
          L("groep-rechts", "crowd", 220, 470, 160, 210, { n: 4 }),
          T("caption-stil", "caption", 20, 20, 360, 90, "Niemand zegt iets.")
        ]),
        P("dichterbij", 520, 90, 400, 720, "CLOSE-UP · SNEAKERS OP HET GRIND", [
          L("sneakers", "object", 0, 240, 400, 300),
          T("caption-stap", "caption", 20, 20, 360, 90, "Iemand zet een stap.")
        ]),
        P("zwart", 960, 90, 400, 720, "ZWART · HET GEVECHT ZIE JE NIET", [
          T("caption-rent", "caption", 20, 300, 360, 120, "Dan rent de eerste.", { dark: true })
        ], { dark: true })
      ]
    },
    {
      id: "05-1996", year: 1996, label: "13 jaar", transition: "assemble", duration: 1.8,
      // Bronnen: Martin (station); Spaaij p. 99; VICE ("doodeng, maar onweerstaanbaar")
      panels: [
        P("station", 80, 90, 640, 720, "WIJD · STATION, DE HARDE KERN KOMT TERUG", [
          T("plek-1996", "caption", 20, 20, 600, 100, "Rotterdam Centraal. Je beste vriend Jeroen en jij zien de harde kern van Feyenoord terugkomen."),
          L("terugkomers", "crowd", 20, 260, 380, 420, { n: 4 }),
          L("mark-13", "person", 420, 420, 100, 260),
          L("jeroen-13", "person", 520, 420, 100, 260)
        ]),
        P("ruud-vraagt", 760, 90, 600, 340, "HALF-TOTAAL · RUUD, 19", [
          L("ruud-96", "person", 40, 40, 130, 290),
          T("ballon-ruud", "bubble", 190, 30, 380, 90, "Hoe oud ben jij?"),
          L("mark-96", "person", 470, 110, 100, 220),
          T("ballon-mark-16", "bubble", 230, 170, 220, 80, "Zestien.", { tail: "right" })
        ]),
        P("sjaal", 760, 470, 600, 340, "CLOSE-UP · DE SJAAL", [
          L("sjaal-om", "object", 160, 30, 280, 160),
          T("caption-sjaal", "caption", 20, 220, 560, 100, "Hij heet Ruud. Hij weet dat je liegt, en geeft je toch zijn sjaal.")
        ])
      ]
    },
    {
      id: "06-beverwijk", year: 1997, label: "14 jaar", transition: "slow", duration: 2.4,
      // FOCAL POINT. Spaaij p. 104–106; P. in Vos 2006. Geen naam, geen beeld van het echte slachtoffer.
      panels: [
        P("krant-groot", 80, 90, 1280, 720, "SPLASH · POV KEUKENTAFEL", [
          L("krant-pagina", "object", 300, 40, 680, 560),
          T("krant-kop", "text", 340, 60, 600, 90, "Dode bij treffen Beverwijk", { size: 60, bold: true, fit: true }),
          T("caption-vader", "caption", 20, 260, 260, 220,"Bij Beverwijk vechten hooligans van Feyenoord en Ajax. Een Ajax-supporter overlijdt. Hij was vader van twee kinderen."),
          L("handen-vader", "object", 260, 600, 760, 110),
          T("plek-beverwijk", "caption", 20, 20, 260, 90, "23 maart 1997."),
          T("caption-drie", "caption", 1000, 260, 260, 160, "Ruud was erbij. Hij zegt er niks over.")
        ])
      ]
    },
    {
      id: "07-1997", year: 1997, label: "14 jaar", transition: "shock", duration: 1.6,
      // Spaaij p. 106 (jongeren komen af op de reputatie); De Generaal in Vos 2006
      panels: [
        P("rennen", 80, 90, 760, 720, "ACTIE · JE EERSTE REL", [
          L("ruud-rent", "person", 40, 260, 160, 420, { fx: "shake" }),
          L("mark-rent", "person", 200, 330, 140, 350, { fx: "shake" }),
          L("jeroen-opgepakt", "person", 450, 330, 140, 350),
          L("agent", "person", 590, 240, 150, 440),
          T("ballon-rennen", "bubble", 30, 30, 300, 90, "Rennen!"),
          T("caption-rennen", "caption", 360, 30, 380, 140, "Een maand later, je eerste rel. Ruud trekt je mee. Jeroen blijft staan.")
        ]),
        P("bureau", 880, 90, 480, 720, "CONTRAST · POLITIEBUREAU", [
          L("vader-jeroen", "person", 40, 300, 170, 380),
          L("jeroen-bureau", "person", 230, 400, 120, 280),
          T("ballon-vader-jeroen", "bubble", 20, 30, 440, 110, "Jij komt daar nooit meer."),
          T("caption-jeroen-weg", "caption", 20, 160, 440, 110, "Jeroens vader haalt hem op. Op het station zie je Jeroen nooit meer.")
        ])
      ]
    },
    {
      id: "08-1999", year: 1999, label: "16 jaar", transition: "assemble", duration: 1.6,
      // Kievits ("elke week wordt onze band hechter"); Newson 2018 (identity fusion)
      panels: [
        P("trein", 80, 90, 1280, 400, "WIJD · DE TREIN", [
          L("treinraam", "object", 20, 20, 1240, 360),
          L("jonge-kern", "crowd", 60, 130, 1160, 250, { n: 10 }),
          L("ruud-trein", "person", 520, 150, 100, 230),
          L("mark-trein", "hood", 630, 150, 100, 230),
          T("caption-150", "caption", 40, 30, 700, 70, "Elke uitwedstrijd zit je met honderdvijftig jongens in de trein. Ruud houdt een plek voor je vrij.")
        ]),
        P("cel", 80, 520, 620, 290, "POV · CELDEUR", [
          L("celdeur", "object", 30, 20, 240, 250),
          T("caption-cel", "caption", 300, 30, 300, 230, "Eerste nacht in de cel. Je bent trots.")
        ]),
        P("ochtend", 740, 520, 620, 290, "WIJD · 06:00, VOOR HET BUREAU", [
          L("ruud-wacht", "person", 60, 30, 110, 250),
          T("caption-wacht", "caption", 200, 30, 400, 230, "Om zes uur 's ochtends staat Ruud buiten. Hij wacht op jou.")
        ])
      ]
    },
    {
      id: "09-2005", year: 2005, label: "22 jaar", transition: "shock", duration: 1.6,
      // Kievits ("aan de sleur ontsnappen"); Martin ("mijn ei kwijt"); Spaaij p. 113; Stott 2011
      panels: [
        P("kantoor", 80, 90, 620, 720, "HALF-TOTAAL · KANTOOR", [
          T("klok", "caption", 40, 30, 300, 70, "Je eerste baan. Vrijdag, 16:58."),
          L("monitor", "object", 40, 150, 400, 250),
          L("mark-pak", "person", 450, 290, 140, 380, { suit: true }),
          T("caption-tellen", "caption", 40, 560, 380, 130, "Excel tot vijf uur. Je telt de uren tot zondag.")
        ]),
        P("me-linie", 740, 90, 620, 720, "POV · ZONDAG, VOOR DE ME-LINIE", [
          L("schilden", "crowd", 20, 40, 580, 300, { n: 5 }),
          L("rook", "round", 400, 300, 200, 180),
          L("ruud-linie", "person", 110, 330, 140, 330),
          L("mark-voor", "hood", 260, 320, 150, 340, { fx: "shake" }),
          T("caption-zondag", "caption", 20, 610, 580, 90, "Zondag. Ruud naast je. Hier ben je iemand.")
        ])
      ]
    },
    {
      id: "10-2013", year: 2013, label: "30 jaar", transition: "slow", duration: 2.4,
      // Kievits (vrienden kapot aan drugs); Danny ("dan komen de begrafenissen"); Fozz (Vos 2006)
      panels: [
        P("wieg", 80, 90, 400, 720, "BOVENAANZICHT", [
          L("wieg-bed", "object", 40, 220, 320, 240),
          L("baby", "round", 130, 270, 140, 140),
          T("caption-stop", "caption", 20, 20, 360, 130, "Je zoon wordt geboren. Je belooft je vrouw Lisa dat je stopt.")
        ]),
        P("nacht", 520, 90, 400, 720, "CLOSE-UP · 03:12", [
          L("telefoon-nacht", "phone", 100, 140, 200, 380),
          T("bericht-nacht", "bubble", 110, 260, 180, 80, "Ruud belt…"),
          T("caption-nacht", "caption", 20, 560, 360, 120, "Je neemt niet op. Je bent gestopt.")
        ]),
        P("begrafenis", 960, 90, 400, 720, "WIJD · BEGRAAFPLAATS", [
          L("rouw", "crowd", 20, 230, 360, 340, { n: 4 }),
          L("sjaal-graf", "object", 100, 590, 200, 100),
          T("caption-ruud", "caption", 20, 20, 360, 120, "Ruud, 1977–2013. Je zult nooit weten waarom hij belde.")
        ])
      ]
    },
    {
      id: "11-2014", year: 2014, label: "31 jaar", transition: "slow", duration: 1.8,
      // Waarom je niet stopt: schuld en trouw aan de groep. Kievits (groep als familie)
      panels: [
        P("terug", 80, 90, 760, 720, "WIJD · DE GROEP", [
          T("plek-2014", "caption", 20, 20, 720, 90, "Een jaar later sta je er weer. Met zijn sjaal om."),
          L("groep-terug", "crowd", 20, 300, 720, 380, { n: 5 }),
          L("mark-terug", "hood", 300, 240, 160, 440),
          T("ballon-voor-ruud", "bubble", 440, 140, 300, 80, "Voor Ruud.")
        ]),
        P("lisa", 880, 90, 480, 720, "HALF-TOTAAL · THUIS", [
          L("lisa-persoon", "person", 60, 260, 170, 420),
          T("ballon-lisa", "bubble", 20, 30, 440, 90, "Je zou stoppen."),
          T("caption-lisa", "caption", 240, 520, 220, 120, "Je zegt niks.")
        ])
      ]
    },
    {
      id: "12-thuis", year: 2026, label: "43 jaar", transition: "assemble", duration: 2,
      // Terug bij het begin: de avond van het gevecht. Kievits ("jong geleerd is oud gedaan"); COT (nieuwe generatie)
      panels: [
        P("kamer", 80, 90, 700, 720, "POV · DEUROPENING", [
          T("plek-thuis", "caption", 180, 30, 500, 100, "Terug bij die zaterdag. 's Avonds staat je zoon in de deur. Hij is dertien en draagt Ruuds sjaal."),
          L("deur", "object", 20, 20, 130, 680),
          L("zoon", "person", 280, 250, 220, 450),
          T("ballon-zoon", "bubble", 180, 140, 500, 80, "Pap, mag ik volgende keer mee?")
        ]),
        P("schermen", 820, 90, 540, 720, "CLOSE-UP · TWEE SCHERMEN", [
          L("scherm-zoon-groot", "phone", 30, 110, 230, 320),
          L("prepaid-mark", "phone", 280, 110, 230, 320, { fx: "shake" }),
          T("bericht-zoon", "bubble", 30, 450, 230, 80, "za 14:00, locatie volgt"),
          T("bericht-mark", "bubble", 280, 450, 230, 80, "za 14:00, locatie volgt"),
          T("caption-twee", "caption", 20, 590, 500, 110, "Ze hebben hem al gevonden. Hetzelfde bericht als op jouw telefoon.")
        ])
      ]
    },
    {
      id: "13-keuze", year: 2026, label: "43 jaar", transition: "slow", duration: 2.4,
      // Twee zinnen uit je eigen leven. Het einde blijft open: de kijker beslist.
      panels: [
        P("echo-ruud", 80, 90, 620, 340, "HERINNERING · 1996", [
          L("ruud-echo", "person", 40, 40, 130, 290),
          T("ballon-echo-ruud", "bubble", 200, 60, 390, 100, "Hoe oud ben jij?")
        ]),
        P("echo-vader", 80, 470, 620, 340, "HERINNERING · 1997", [
          L("vader-echo", "person", 40, 30, 140, 300),
          T("ballon-echo-vader", "bubble", 200, 60, 390, 100, "Jij komt daar nooit meer.")
        ]),
        P("antwoord", 740, 90, 620, 720, "POV · JIJ EN JE ZOON", [
          L("mark-rug", "hood", 60, 240, 200, 460),
          L("zoon-wacht", "person", 360, 330, 180, 370),
          T("ballon-leeg", "bubble", 60, 60, 500, 110, "…"),
          T("caption-wat", "caption", 300, 200, 300, 90, "Wat zeg jij?")
        ])
      ]
    },
    {
      id: "14-einde", year: 2026, label: "", transition: "slow", duration: 1.8,
      // Spaaij p. 130 en 192 (hooligans uit alle milieus); Rijnmond 2025 (nuance)
      panels: [
        P("tribune", 80, 90, 1280, 520, "UITZOOMEN", [
          L("tribune-mensen", "crowd", 20, 20, 1240, 480, { n: 40, swap: { 34: "p-mark-capuchon" } }),
          L("mark-tribune", "round", 505, 280, 180, 230)
        ]),
        P("vraag", 0, 630, 1440, 200, "", [
          T("vraag-tekst", "text", 80, 20, 1280, 120, "Wie zit er naast jou?", { size: 96, bold: true, fit: true })
        ], { plain: true })
      ]
    }
,
    {
      id: "15-slot", year: 2026, label: "", transition: "slow", duration: 2, hud: false, einde: true,
      // Het einde: de sjaal ligt er nog. Knop 'Opnieuw beginnen' (index.html) brengt je terug naar 1996… of naar het begin.
      panels: [
        P("slot", 0, 0, 1440, 900, "", [
          L("slot-sjaal", "object", 500, 190, 440, 220),
          T("slot-tekst", "text", 220, 470, 1000, 110, "Ruud was negentien. Jij was dertien. Je zoon is dertien.", { size: 34, c: "ink", center: true, fit: true }),
          T("slot-bron", "text", 320, 600, 800, 80, "Gebaseerd op onderzoek en interviews met Nederlandse hooligans. Gemaakt door Kasper voor CMD, Hogeschool van Amsterdam, 2026.", { size: 16, c: "muted", center: true })
        ], { plain: true })
      ]
    }
  ];
})();
