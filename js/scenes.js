/*
  Eén bron voor alle hoofdstukken. Dezelfde namen staan als laagnamen in Figma.
  Elk hoofdstuk is 1440 x 900.
  Bovenste band (0–80): links jaartal, midden "wat zij zien", rechts het woord. Onderste band (820–900): tijdlijn.

  Laagtypes: person · hood · crowd (n) · phone · object · round · bubble · caption
  Opties laag:  suit, n, dark (donkere caption), fx: "pulse" | "shake"
  Opties panel: shot (camera-notitie, alleen in Figma), dark (donker paneel)
  Opties hoofdstuk:
    transition: "assemble" (panelen vallen op hun plek) | "slow" (traag invloeien) | "shock" (hard binnen) | "cut" (direct)
    outside:    { who, text }  → wat de buitenwereld ziet (vaste plek bovenin)
    context:    één zin uitleg onderin (wie, waar, wat): de kijker moet het verhaal zonder voorkennis kunnen volgen
    duration:   hoe lang het hoofdstuk blijft staan. De overgang zelf duurt langer naarmate er meer jaren tussen zitten.

  Verhaalstructuur (v6, één draad: Ruud en zijn rode sjaal):
    KI    – 00–03  het gewone leven en de onthulling (2026)
    SHŌ   – 04–10  Ruud haalt je erin (1996), wordt je broer (1999–2005) en gaat kapot (2013). Beverwijk als focal point.
    TEN   – 11     je zoon is 13 en draagt Ruuds sjaal
    KETSU – 12     de tribune: naast jou zit je zoon
  Rood komt alleen voor in Ruuds sjaal, zodat je hem door het hele verhaal kunt volgen.
*/
(function () {
  const L = (name, type, x, y, w, h, extra = {}) => Object.assign({ name, type, x, y, w, h }, extra);
  const T = (name, type, x, y, w, h, text, extra = {}) => L(name, type, x, y, w, h, Object.assign({ text }, extra));
  const P = (name, x, y, w, h, shot, layers, extra = {}) => Object.assign({ name, x, y, w, h, shot, layers }, extra);

  window.SCENES = [
    {
      id: "00-kader", year: 1996, label: "1996 – 2026", word: "", transition: "slow", duration: 1.2,
      context: "Een verzonnen leven, gebouwd uit echte verhalen van Nederlandse voetbalhooligans. Je scrolt door dertig jaar, van 1996 tot 2026.",
      // Begin en eind bewust gekozen: jij bent 13 als Ruud je ziet; je zoon is 13 als hij Ruuds sjaal vindt.
      panels: [
        P("titel", 320, 160, 800, 200, "", [
          T("titel-tekst", "caption", 0, 0, 800, 200, "Wie zit er naast jou?")
        ]),
        P("begin", 80, 420, 600, 390, "", [
          T("jaar-begin", "caption", 30, 30, 540, 160, "1996"),
          T("reden-begin", "caption", 30, 220, 540, 140, "Je bent 13. Daar begint het.")
        ]),
        P("eind", 760, 420, 600, 390, "", [
          T("jaar-eind", "caption", 30, 30, 540, 160, "2026"),
          T("reden-eind", "caption", 30, 220, 540, 140, "Je zoon is 13. Daar begint het opnieuw.")
        ])
      ]
    },
    {
      id: "01-maandag", year: 2026, label: "MAANDAG 08:47 · 43 JAAR", word: "MAANDAG", transition: "slow", duration: 1.4,
      context: "Rotterdam, 2026. Je bent Mark, 43, en werkt op kantoor. Al dertig jaar ben je hooligan bij Feyenoord. Op je werk weet niemand het.",
      outside: { who: "Collega's", text: "Ja, ja. Dat zal wel!" },
      // Bron: P. (FC Twente) in Vos 2006
      panels: [
        P("lift", 80, 90, 620, 720, "POV · SPIEGEL IN DE LIFT", [
          L("spiegel", "object", 40, 30, 540, 640),
          L("mark", "person", 190, 120, 240, 600, { suit: true }),
          L("oog", "round", 330, 196, 36, 26, { fx: "pulse" }),
          L("koffie", "object", 440, 430, 50, 70)
        ]),
        P("close-up-oog", 740, 90, 620, 330, "EXTREME CLOSE-UP", [
          L("oog-groot", "round", 210, 40, 250, 250)
        ]),
        P("collega", 740, 450, 620, 360, "HALF-TOTAAL", [
          L("collega-persoon", "person", 30, 60, 150, 300),
          T("ballon-collega", "bubble", 200, 40, 380, 100, "Jezus, wat is er met jou gebeurd?"),
          T("ballon-mark", "bubble", 200, 170, 380, 100, "Iemand juichte wild. Elleboog.")
        ])
      ]
    },
    {
      id: "02-zaterdag", year: 2026, label: "ZATERDAG · TWEE DAGEN EERDER", word: "KICK", transition: "assemble", duration: 1.2,
      context: "Hooligans spreken vechtpartijen af buiten het stadion, met een prepaid telefoon zodat de politie niet meeleest. Twintig tegen twintig, op een verlaten plek.",
      outside: { who: "Lisa", text: "Veel plezier met de jongens." },
      // Bronnen: vechtafspraken via prepaid (Politie & Wetenschap); Kievits (erecode)
      panels: [
        P("telefoon", 80, 90, 360, 720, "POV · TWEEDE TELEFOON", [
          L("prepaid", "phone", 70, 40, 220, 450, { fx: "shake" }),
          T("bericht-1", "bubble", 90, 130, 180, 60, "za 14:00"),
          T("bericht-2", "bubble", 90, 210, 180, 80, "loods 7 · 20 tegen 20"),
          T("ballon-leugen", "bubble", 20, 540, 320, 90, "Voetbal kijken met de jongens.")
        ]),
        P("loods", 480, 90, 880, 720, "WIJD · INDUSTRIETERREIN", [
          L("loods-achtergrond", "object", 20, 20, 840, 200),
          L("groep-eigen", "crowd", 20, 260, 400, 330, { n: 5 }),
          L("mark-capuchon", "hood", 160, 240, 120, 350),
          L("groep-tegenover", "crowd", 460, 260, 400, 330, { n: 5 }),
          T("caption-code-1", "caption", 20, 610, 840, 90, "Ligt iemand op de grond, dan is het klaar.")
        ])
      ]
    },
    {
      id: "03-zwart", year: 2026, label: "14:20", word: "", transition: "beat", duration: 1.8,
      context: "Zo'n gevecht duurt vaak maar een minuut. Het blauwe oog draag je de hele week.",
      // McCloud (closure): drie momenten steeds dichterbij, dan zwart. Het gevecht zelf gebeurt in het zwart.
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
      id: "04-terug", year: 1996, label: "DERTIG JAAR EERDER", word: "", transition: "slow", duration: 1.2,
      context: "Bijna niemand wordt als volwassene hooligan. Het begint meestal rond je dertiende.",
      panels: [
        P("vraag-terug", 320, 300, 800, 300, "", [
          T("caption-terug", "caption", 0, 0, 800, 300, "Hoe word je iemand die dit doet?")
        ])
      ]
    },
    {
      id: "05-1996", year: 1996, label: "1996 · 13 JAAR", word: "RUUD", transition: "assemble", duration: 1.8,
      context: "Rotterdam, 1996. Met je vriend Jeroen kijk je naar de harde kern van Feyenoord, die terugkomt van een uitwedstrijd. Ruud (19) hoort daarbij.",
      outside: { who: "Moeder", text: "Hij is bij een vriendje." },
      // Bronnen: Martin (station); Spaaij p. 99 (aantrekkingskracht van de harde kern); VICE ("doodeng, maar onweerstaanbaar")
      panels: [
        P("station", 80, 90, 640, 720, "WIJD · STATION, DE HARDE KERN KOMT TERUG", [
          L("terugkomers", "crowd", 20, 260, 380, 420, { n: 4 }),
          L("mark-13", "person", 420, 420, 100, 260),
          L("jeroen-13", "person", 520, 420, 100, 260),
          T("caption-station", "caption", 20, 20, 600, 100, "Jeroen en jij, dertien. Je kunt niet wegkijken.")
        ]),
        P("ruud-vraagt", 760, 90, 600, 340, "HALF-TOTAAL · RUUD, 19", [
          L("ruud-96", "person", 40, 40, 130, 290),
          T("ballon-ruud", "bubble", 190, 30, 380, 90, "Hoe oud ben jij?"),
          T("ballon-mark-16", "bubble", 190, 160, 380, 90, "Zestien.")
        ]),
        P("sjaal", 760, 470, 600, 340, "CLOSE-UP · DE SJAAL", [
          L("sjaal-om", "object", 160, 30, 280, 160),
          T("caption-sjaal", "caption", 20, 220, 560, 100, "Hij weet dat je liegt. Hij geeft je zijn sjaal.")
        ])
      ]
    },
    {
      id: "06-beverwijk", year: 1997, label: "23 MAART 1997 · 14 JAAR", word: "BEVERWIJK", transition: "slow", duration: 2.4,
      context: "Op 23 maart 1997 vechten hooligans van Feyenoord en Ajax bij Beverwijk. Een Ajax-supporter komt om het leven. Ruud is verzonnen, deze dag niet.",
      outside: { who: "Vader, aan tafel", text: "Wat een tuig." },
      // FOCAL POINT. Bronnen: Spaaij p. 104–106; P. in Vos 2006 ("een vader van twee kinderen").
      // Carlo Picornie is echt: geen naam, geen beeld van het slachtoffer, alleen de krant. Ruud is verzonnen.
      panels: [
        P("krant-groot", 80, 90, 1280, 720, "SPLASH · POV KEUKENTAFEL", [
          L("krant-pagina", "object", 300, 40, 680, 560),
          T("krant-kop", "caption", 340, 80, 600, 110, "DODE BIJ TREFFEN BEVERWIJK"),
          T("caption-vader", "caption", 340, 420, 600, 120, "Hij was een vader van twee kinderen."),
          L("handen-vader", "object", 260, 600, 760, 110),
          T("caption-drie", "caption", 1000, 260, 260, 160, "Ruud was erbij. Hij zegt er niks over.")
        ])
      ]
    },
    {
      id: "07-1997", year: 1997, label: "1997 · 14 JAAR", word: "RENNEN", transition: "shock", duration: 1.6,
      context: "Na Beverwijk stoppen veel oudere hooligans. Er komt plek voor jonge jongens. Je eerste rel is na een wedstrijd, buiten het stadion.",
      outside: { who: "Moeder", text: "Was het gezellig bij Jeroen?" },
      // Bronnen: Spaaij p. 106 (jongeren komen af op de reputatie); De Generaal ("klappen, opgepakt of verkering")
      panels: [
        P("rennen", 80, 90, 760, 720, "ACTIE · JE EERSTE REL", [
          L("ruud-rent", "person", 40, 260, 160, 420, { fx: "shake" }),
          L("mark-rent", "person", 200, 330, 140, 350, { fx: "shake" }),
          L("jeroen-opgepakt", "person", 450, 330, 140, 350),
          L("agent", "person", 590, 240, 150, 440),
          T("ballon-rennen", "bubble", 30, 30, 300, 90, "Rennen!"),
          T("caption-rennen", "caption", 360, 30, 380, 140, "Ruud trekt je mee. Jeroen blijft staan.")
        ]),
        P("bureau", 880, 90, 480, 720, "CONTRAST · POLITIEBUREAU", [
          L("vader-jeroen", "person", 40, 300, 170, 380),
          L("jeroen-bureau", "person", 230, 400, 120, 280),
          T("ballon-vader-jeroen", "bubble", 20, 30, 440, 110, "Jij komt daar nooit meer."),
          T("caption-jeroen-weg", "caption", 20, 160, 440, 110, "Jeroen zie je niet meer op het station.")
        ])
      ]
    },
    {
      id: "08-1999", year: 1999, label: "1999 · 16 JAAR", word: "BROERS", transition: "assemble", duration: 1.6,
      context: "Je bent 16 en reist mee naar elke uitwedstrijd. De groep wordt belangrijker dan school of thuis.",
      outside: { who: "Ouders", text: "Hij zit veel bij vrienden, maar zijn cijfers zijn prima." },
      // Bronnen: Kievits ("elke week wordt onze band hechter"); Newson 2018 (identity fusion)
      panels: [
        P("trein", 80, 90, 1280, 400, "WIJD · DE TREIN", [
          L("treinraam", "object", 20, 20, 1240, 360),
          L("jonge-kern", "crowd", 60, 130, 1160, 250, { n: 10 }),
          L("ruud-trein", "person", 520, 150, 100, 230),
          L("mark-trein", "hood", 630, 150, 100, 230),
          T("caption-150", "caption", 40, 30, 620, 70, "Honderdvijftig jongens. Ruud houdt een plek voor je vrij.")
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
      id: "09-2005", year: 2005, label: "2005 · 22 JAAR", word: "UITLAATKLEP", transition: "shock", duration: 1.6,
      context: "Je bent 22 en leidt een dubbelleven. Op 17 april 2005, rond Feyenoord–Ajax, raken tientallen agenten gewond.",
      outside: { who: "Collega's", text: "Hij is goed bezig." },
      // Bronnen: Kievits ("aan de sleur ontsnappen"); Martin ("mijn ei kwijt"); Spaaij p. 113; Stott 2011
      panels: [
        P("kantoor", 80, 90, 620, 720, "HALF-TOTAAL · KANTOOR", [
          T("klok", "caption", 40, 30, 240, 70, "VR 16:58"),
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
      id: "10-2013", year: 2013, label: "2013 · 30 JAAR", word: "PRIJS", transition: "slow", duration: 2.4,
      context: "Je bent 30 en wordt vader. Je wilt stoppen. Maar wie uit de groep stapt, laat ook zijn vrienden achter.",
      outside: { who: "Lisa", text: "Hij is rustiger geworden." },
      // Bronnen: Kievits (vrienden kapot aan drugs); Danny ("dan komen de begrafenissen"); Fozz (Vos 2006)
      panels: [
        P("wieg", 80, 90, 400, 720, "BOVENAANZICHT", [
          L("wieg-bed", "object", 40, 220, 320, 240),
          L("baby", "round", 130, 270, 140, 140),
          T("caption-stop", "caption", 20, 20, 360, 130, "Je zoon wordt geboren. Nu stop ik, denk je.")
        ]),
        P("nacht", 520, 90, 400, 720, "CLOSE-UP · 03:12", [
          L("telefoon-nacht", "phone", 100, 140, 200, 380),
          T("bericht-nacht", "bubble", 110, 260, 180, 80, "Ruud belt"),
          T("caption-nacht", "caption", 20, 560, 360, 120, "Je neemt niet op.")
        ]),
        P("begrafenis", 960, 90, 400, 720, "WIJD · BEGRAAFPLAATS", [
          L("rouw", "crowd", 20, 230, 360, 340, { n: 4 }),
          L("sjaal-graf", "object", 100, 590, 200, 100),
          T("caption-ruud", "caption", 20, 20, 360, 120, "Ruud. 1977 – 2013.")
        ])
      ]
    },
    {
      id: "11-2026", year: 2026, label: "2026 · 43 JAAR", word: "13", transition: "assemble", duration: 2,
      context: "Je zoon is 13, net zo oud als jij in 1996. Ook nu zoeken hooligangroepen jonge jongens, via apps en sociale media.",
      outside: { who: "Lisa", text: "Hij lijkt steeds meer op jou." },
      // TEN (de wending). Bronnen: Kievits ("jong geleerd is oud gedaan"); COT (nieuwe generatie)
      panels: [
        P("kamer", 80, 90, 700, 720, "POV · DEUROPENING", [
          L("deur", "object", 20, 20, 130, 680),
          L("zoon", "person", 280, 250, 220, 450),
          T("caption-zoon", "caption", 180, 30, 500, 100, "Je zoon is 13. Hij heeft Ruuds sjaal gevonden."),
          T("ballon-zoon", "bubble", 180, 140, 500, 80, "Pap, ga jij zaterdag ook?")
        ]),
        P("schermen", 820, 90, 540, 720, "CLOSE-UP · TWEE SCHERMEN", [
          L("scherm-zoon-groot", "phone", 30, 110, 230, 320),
          L("prepaid-mark", "phone", 280, 110, 230, 320, { fx: "shake" }),
          T("bericht-zoon", "bubble", 30, 450, 230, 80, "za 14:00 · locatie volgt"),
          T("bericht-mark", "bubble", 280, 450, 230, 80, "za 14:00 · locatie volgt"),
          T("caption-twee", "caption", 20, 590, 500, 110, "Zijn telefoon. Jouw telefoon. Hetzelfde bericht.")
        ])
      ]
    },
    {
      id: "12-einde", year: 2026, label: "", word: "", transition: "slow", duration: 1.8,
      context: "Hooligans komen uit alle lagen van de samenleving. Aan de buitenkant zie je het niet.",
      // KETSU. Bronnen: Spaaij p. 130 en 192; Rijnmond 2025 (nuance). Cel 34 = jij, cel 35 = je zoon met de rode sjaal.
      panels: [
        P("tribune", 80, 90, 1280, 520, "UITZOOMEN", [
          L("tribune-mensen", "crowd", 20, 20, 1240, 480, { n: 40, swap: { 34: "p-mark-capuchon", 35: "p-zoon" } }),
          L("mark-tribune", "round", 530, 250, 220, 260, { fx: "pulse" })
        ]),
        P("niet-echt", 80, 640, 400, 170, "", [
          T("caption-niet-echt", "caption", 20, 20, 360, 130, "Mark bestaat niet. Ruud ook niet. Elk moment wel.")
        ]),
        P("rollen", 520, 640, 460, 170, "", [
          T("caption-rollen", "caption", 20, 20, 420, 130, "Een leraar. Een verpleegkundige. Een bouwvakker. Een man in pak. Een vader.")
        ]),
        P("vraag", 1020, 640, 340, 170, "", [
          T("vraag-tekst", "caption", 20, 20, 300, 130, "Wie zit er naast jou?")
        ])
      ]
    }
  ];
})();
