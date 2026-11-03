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
    duration:   hoe lang het hoofdstuk blijft staan. De overgang zelf duurt langer naarmate er meer jaren tussen zitten.

  Verhaalstructuur (zie inspiratie/storytelling-research.md):
    KI    – 00–03  het gewone leven en de onthulling (2026)
    SHŌ   – 04–10  hoe het groeide (1996–2013), Beverwijk als focal point
    TEN   – 11     de wending: zijn zoon is 13, Jeroen staat aan de andere kant
    KETSU – 12     de tribune: wie zit er naast jou?
*/
(function () {
  const L = (name, type, x, y, w, h, extra = {}) => Object.assign({ name, type, x, y, w, h }, extra);
  const T = (name, type, x, y, w, h, text, extra = {}) => L(name, type, x, y, w, h, Object.assign({ text }, extra));
  const P = (name, x, y, w, h, shot, layers, extra = {}) => Object.assign({ name, x, y, w, h, shot, layers }, extra);

  window.SCENES = [
    {
      id: "00-kader", year: 1996, label: "1996 – 2026", word: "", transition: "slow", duration: 1.2,
      // Begin en eind bewust gekozen: de instap op zijn 13e, en het moment dat zijn zoon 13 is.
      panels: [
        P("titel", 320, 160, 800, 200, "", [
          T("titel-tekst", "caption", 0, 0, 800, 200, "Wie zit er naast jou?")
        ]),
        P("begin", 80, 420, 600, 390, "", [
          T("jaar-begin", "caption", 30, 30, 540, 160, "1996"),
          T("reden-begin", "caption", 30, 220, 540, 140, "Hij is 13. Daar wordt het beslist.")
        ]),
        P("eind", 760, 420, 600, 390, "", [
          T("jaar-eind", "caption", 30, 30, 540, 160, "2026"),
          T("reden-eind", "caption", 30, 220, 540, 140, "Zijn zoon is 13. Daar begint het opnieuw.")
        ])
      ]
    },
    {
      id: "01-maandag", year: 2026, label: "MAANDAG 08:47 · 43 JAAR", word: "MAANDAG", transition: "slow", duration: 1.4,
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
      outside: { who: "Lisa", text: "Doe Ruud de groeten." },
      // Bronnen: vechtafspraken via prepaid (Politie & Wetenschap); Kievits (erecode)
      panels: [
        P("telefoon", 80, 90, 360, 720, "POV · TWEEDE TELEFOON", [
          L("prepaid", "phone", 70, 40, 220, 450, { fx: "shake" }),
          T("bericht-1", "bubble", 90, 130, 180, 60, "za 14:00"),
          T("bericht-2", "bubble", 90, 210, 180, 80, "loods 7 · 20 tegen 20"),
          T("ballon-leugen", "bubble", 20, 540, 320, 90, "Ik ben bij Ruud.")
        ]),
        P("loods", 480, 90, 880, 460, "WIJD · INDUSTRIETERREIN", [
          L("loods-achtergrond", "object", 20, 20, 840, 170),
          L("groep-eigen", "crowd", 30, 210, 360, 240, { n: 5 }),
          L("mark-capuchon", "hood", 170, 190, 100, 260),
          L("groep-tegenover", "crowd", 490, 210, 360, 240, { n: 5 })
        ]),
        P("erecode", 480, 580, 880, 230, "", [
          T("caption-code-1", "caption", 20, 20, 410, 190, "Ligt iemand op de grond, dan is het klaar."),
          T("caption-code-2", "caption", 450, 20, 410, 190, "Je vecht alleen met wie het zelf wil.")
        ])
      ]
    },
    {
      id: "03-zwart", year: 2026, label: "14:20", word: "", transition: "beat", duration: 1.8,
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
      panels: [
        P("vraag-terug", 320, 300, 800, 300, "", [
          T("caption-terug", "caption", 0, 0, 800, 300, "Hoe word je iemand die dit doet?")
        ])
      ]
    },
    {
      id: "05-1996", year: 1996, label: "1996 · 13 JAAR", word: "SPANNING", transition: "assemble", duration: 1.6,
      outside: { who: "Moeder", text: "Hij is bij een vriendje." },
      // Bronnen: Kievits (lied bij de wieg); Martin (station); Spaaij p. 99; VICE ("doodeng, maar onweerstaanbaar")
      panels: [
        P("wieg-vader", 80, 90, 400, 330, "HERINNERING", [
          L("vader", "person", 40, 40, 120, 280),
          L("wieg", "object", 200, 200, 170, 110),
          T("ballon-lied", "bubble", 160, 30, 220, 90, "Hand in hand, kameraden…")
        ]),
        P("station", 80, 450, 400, 360, "POV · STATION", [
          L("terugkomers", "crowd", 20, 110, 360, 230, { n: 6 }),
          L("mark-13", "person", 160, 190, 70, 150),
          T("caption-station", "caption", 20, 20, 360, 80, "Ze komen terug van de uitwedstrijd. Je kunt niet wegkijken.")
        ]),
        P("kuip", 520, 90, 840, 330, "WIJD · DE KUIP", [
          L("stadion", "object", 40, 30, 760, 190),
          L("mark-kuip", "person", 320, 120, 80, 190),
          L("jeroen-kuip", "person", 420, 120, 80, 190),
          T("caption-kuip", "caption", 40, 240, 520, 70, "Jeroen en jij. Dertien. Je verveelt je niet meer.")
        ]),
        P("kroeg", 520, 450, 840, 360, "HALF-TOTAAL · HET KANTELPUNT", [
          L("oudere-jongens", "crowd", 30, 90, 540, 220, { n: 4 }),
          L("tafel", "object", 20, 268, 800, 80),
          L("mark-kroeg", "person", 640, 110, 110, 220),
          T("ballon-oud", "bubble", 260, 20, 300, 70, "Hoe oud ben jij?"),
          T("caption-eng", "caption", 590, 20, 230, 80, "Doodeng. En toch wil je meer.")
        ])
      ]
    },
    {
      id: "06-beverwijk", year: 1997, label: "23 MAART 1997 · 14 JAAR", word: "BEVERWIJK", transition: "slow", duration: 2.4,
      outside: { who: "Vader, aan tafel", text: "Wat een tuig." },
      // FOCAL POINT. Bronnen: Spaaij p. 104–106; P. in Vos 2006 ("een vader van twee kinderen").
      // Carlo Picornie is echt: geen naam, geen beeld van het slachtoffer, alleen de krant.
      panels: [
        P("krant-groot", 80, 90, 1280, 720, "SPLASH · POV KEUKENTAFEL", [
          L("krant-pagina", "object", 300, 40, 680, 560),
          T("krant-kop", "caption", 340, 80, 600, 110, "DODE BIJ TREFFEN BEVERWIJK"),
          T("caption-vader", "caption", 340, 420, 600, 120, "Hij was een vader van twee kinderen."),
          L("handen-vader", "object", 260, 600, 760, 110),
          T("caption-drie", "caption", 1000, 260, 260, 160, "Jij was er niet bij. Je leest het drie keer.")
        ])
      ]
    },
    {
      id: "07-1997", year: 1997, label: "1997 · 14 JAAR", word: "PLEK", transition: "shock", duration: 1.6,
      outside: { who: "Moeder", text: "Was het gezellig bij Jeroen?" },
      // Bronnen: Spaaij p. 106 (jongeren komen af op de reputatie); De Generaal ("klappen, opgepakt of verkering")
      panels: [
        P("schoolplein", 80, 90, 640, 300, "", [
          L("fluisteraars", "crowd", 30, 60, 380, 220, { n: 4 }),
          T("caption-plek", "caption", 430, 40, 190, 220, "De oude jongens stoppen. Er komt plek.")
        ]),
        P("rennen", 760, 90, 600, 720, "ACTIE · EERSTE REL", [
          L("mark-rent", "hood", 40, 260, 170, 400, { fx: "shake" }),
          L("jeroen-opgepakt", "person", 330, 230, 120, 360),
          L("agent", "person", 450, 210, 130, 380),
          T("caption-rennen", "caption", 20, 20, 560, 80, "Jij rent. Jeroen niet.")
        ]),
        P("bureau", 80, 420, 640, 390, "CONTRAST · POLITIEBUREAU", [
          L("vader-jeroen", "person", 60, 100, 150, 280),
          L("jeroen-bureau", "person", 230, 160, 100, 220),
          T("ballon-vader-jeroen", "bubble", 340, 40, 280, 120, "Jij komt daar nooit meer."),
          T("caption-thuis", "caption", 340, 220, 280, 130, "Bij jou thuis heeft niemand iets door.")
        ])
      ]
    },
    {
      id: "08-1999", year: 1999, label: "1999 · 16 JAAR", word: "BROERS", transition: "assemble", duration: 1.6,
      outside: { who: "Ouders", text: "Hij zit veel bij vrienden, maar zijn cijfers zijn prima." },
      // Bronnen: Kievits (RJK, Alkmaar, Salou, "elke week wordt onze band hechter"); Newson 2018
      panels: [
        P("trein", 80, 90, 820, 330, "WIJD · DE TREIN", [
          L("treinraam", "object", 20, 20, 780, 290),
          L("jonge-kern", "crowd", 40, 110, 740, 200, { n: 9 }),
          T("caption-150", "caption", 40, 30, 520, 60, "Honderdvijftig jongens. Capuchon, pet, Air Max.")
        ]),
        P("vuilnisbak", 940, 90, 420, 330, "", [
          L("vuilnisbak-object", "object", 60, 160, 140, 150),
          L("mark-verstopt", "hood", 210, 180, 100, 130),
          T("caption-vuilnis", "caption", 20, 20, 380, 110, "\"Wij rennen nooit.\" Jij ligt achter een vuilnisbak.")
        ]),
        P("cel", 80, 450, 420, 360, "POV · CELDEUR", [
          L("celdeur", "object", 80, 20, 260, 250),
          L("luikje", "object", 150, 90, 120, 40),
          T("caption-cel", "caption", 20, 280, 380, 60, "Eerste nacht in de cel. Je bent trots.")
        ]),
        P("salou", 540, 450, 820, 360, "ZOMER", [
          L("veertig", "crowd", 40, 110, 740, 230, { n: 8 }),
          L("zon", "round", 640, 20, 120, 80),
          T("caption-salou", "caption", 40, 20, 300, 70, "Salou. Veertig jongens. Geen ouders."),
          T("ballon-gekste", "bubble", 360, 20, 260, 70, "Wij zijn de gekste!")
        ])
      ]
    },
    {
      id: "09-2005", year: 2005, label: "2005 · 22 JAAR", word: "UITLAATKLEP", transition: "shock", duration: 1.6,
      outside: { who: "Collega's", text: "Hij is goed bezig." },
      // Bronnen: Kievits ("aan de sleur ontsnappen"); Martin ("mijn ei kwijt"); Spaaij p. 113; Stott 2011; Elitepauper (VICE)
      panels: [
        P("kantoor", 80, 90, 620, 400, "HALF-TOTAAL · KANTOOR", [
          L("monitor", "object", 60, 30, 420, 260),
          L("mark-pak", "person", 500, 120, 100, 270, { suit: true }),
          T("klok", "caption", 60, 310, 200, 60, "VR 16:58")
        ]),
        P("tellen", 80, 520, 620, 290, "", [
          T("caption-tellen", "caption", 30, 30, 560, 90, "Excel tot vijf uur. Je telt de uren tot zondag."),
          T("caption-ei", "caption", 30, 150, 560, 110, "\"Daar kon ik mijn ei kwijt na weer een week werken.\"")
        ]),
        P("me-linie", 740, 90, 620, 560, "POV · 17 APRIL 2005", [
          L("schilden", "crowd", 20, 30, 580, 260, { n: 6 }),
          L("rook", "round", 380, 300, 220, 180),
          L("mark-voor", "hood", 120, 290, 140, 250, { fx: "shake" })
        ]),
        P("ziek", 740, 680, 620, 130, "", [
          L("telefoon-ziek", "phone", 20, 10, 70, 110),
          T("bericht-ziek", "bubble", 110, 25, 320, 80, "Ziek vandaag.")
        ])
      ]
    },
    {
      id: "10-2013", year: 2013, label: "2013 · 30 JAAR", word: "PRIJS", transition: "slow", duration: 2.2,
      outside: { who: "Lisa", text: "Hij is rustiger geworden." },
      // Bronnen: Kievits (ziekenhuis, 200 supporters; vrienden kapot aan drugs); Danny ("dan komen de begrafenissen"); P.; Fozz
      panels: [
        P("wieg", 80, 90, 400, 400, "BOVENAANZICHT", [
          L("wieg-bed", "object", 40, 120, 320, 240),
          L("baby", "round", 130, 170, 140, 140),
          T("caption-stop", "caption", 20, 20, 360, 80, "Je zoon slaapt. Nu stop ik, denk je.")
        ]),
        P("brief", 80, 520, 400, 290, "", [
          L("envelop", "object", 60, 90, 280, 170),
          T("brief-tekst", "caption", 40, 14, 320, 66, "STADIONVERBOD · 5 JAAR")
        ]),
        P("ziekenhuis", 520, 90, 840, 400, "WIJD · ZIEKENHUIS", [
          L("bed", "object", 40, 230, 360, 140),
          L("mark-bed", "person", 50, 180, 340, 96),
          L("bezoek", "crowd", 420, 60, 400, 320, { n: 7 }),
          T("caption-200", "caption", 40, 20, 360, 120, "Gebroken kaak. Tweehonderd jongens komen langs. Dan weet je waarvoor je het doet.")
        ]),
        P("begrafenis", 520, 520, 560, 290, "", [
          L("rouw", "crowd", 20, 70, 520, 200, { n: 6 }),
          T("caption-sander", "caption", 20, 10, 520, 50, "Sander. 1984 – 2013.")
        ]),
        P("ruud", 1120, 520, 240, 290, "", [
          L("ruud-persoon", "person", 60, 130, 120, 160),
          T("caption-ruud", "caption", 10, 10, 220, 110, "Ruud zit aan de coke. Niemand zegt iets.")
        ])
      ]
    },
    {
      id: "11-2026", year: 2026, label: "2026 · 43 JAAR", word: "13", transition: "assemble", duration: 2,
      outside: { who: "Lisa", text: "Hij lijkt steeds meer op jou." },
      // TEN (de wending). Bronnen: Kievits ("jong geleerd is oud gedaan" / "ten strengste afraden"); COT (nieuwe generatie)
      panels: [
        P("kamer", 80, 90, 560, 720, "POV · DEUROPENING", [
          L("deur", "object", 20, 20, 130, 680),
          L("zoon", "person", 260, 220, 170, 440),
          L("telefoon-zoon", "phone", 420, 380, 56, 104, { fx: "pulse" }),
          T("caption-zoon", "caption", 170, 30, 370, 100, "Je zoon is 13. Zo oud als jij in 1996."),
          T("ballon-zoon", "bubble", 170, 150, 370, 80, "Pap, ga jij zaterdag ook?")
        ]),
        P("scherm-zoon", 680, 90, 330, 340, "CLOSE-UP · ZIJN SCHERM", [
          L("scherm-zoon-groot", "phone", 55, 20, 220, 300),
          T("bericht-zoon", "bubble", 75, 200, 180, 80, "za 14:00 · locatie volgt")
        ]),
        P("scherm-mark", 1030, 90, 330, 340, "CLOSE-UP · JOUW SCHERM", [
          L("prepaid-mark", "phone", 55, 20, 220, 300, { fx: "shake" }),
          T("bericht-mark", "bubble", 75, 200, 180, 80, "za 14:00 · locatie volgt")
        ]),
        P("jeroen-nu", 680, 460, 680, 350, "WIJD · SCHOOLHEK", [
          L("jeroen-43", "person", 60, 80, 140, 260),
          L("dochter", "person", 210, 180, 80, 160),
          T("caption-jeroen", "caption", 320, 40, 330, 130, "Jeroen, 43. Leraar. Hij wacht bij het schoolhek op zijn dochter."),
          T("caption-twee", "caption", 320, 200, 330, 120, "Twee telefoons. Eén bericht.")
        ])
      ]
    },
    {
      id: "12-einde", year: 2026, label: "", word: "", transition: "slow", duration: 1.6,
      // KETSU. Bronnen: Spaaij p. 130 en 192; Rijnmond 2025 (nuance)
      panels: [
        P("tribune", 80, 90, 1280, 520, "UITZOOMEN", [
          L("tribune-mensen", "crowd", 20, 20, 1240, 480, { n: 60 }),
          L("mark-tribune", "round", 610, 220, 60, 60, { fx: "pulse" })
        ]),
        P("niet-echt", 80, 640, 400, 170, "", [
          T("caption-niet-echt", "caption", 20, 20, 360, 130, "Mark bestaat niet. Jeroen ook niet. Elk moment wel.")
        ]),
        P("rollen", 520, 640, 460, 170, "", [
          T("caption-rollen", "caption", 20, 20, 420, 130, "Een leraar. Een verpleegkundige. Een journalist. Een bouwvakker. Een man in pak.")
        ]),
        P("vraag", 1020, 640, 340, 170, "", [
          T("vraag-tekst", "caption", 20, 20, 300, 130, "Wie zit er naast jou?")
        ])
      ]
    }
  ];
})();
