/*
  Assets, versie 5 – in de stijl van "Prei ani assets":
  vlak (geen lijnen), afgeronde blokvormen, tonen in banden (donker boven, lichter onder),
  ovale zwarte ogen met boogjes, dunne stokjes als armen en benen, gedempte kleuren.
  Groepen: achterste rijen donkerder en met mist (zie crowdCells → row).
  Dezelfde tekeningen staan als componenten op de Figma-pagina "Assets".
  Elk asset: { vb: [breedte, hoogte], svg }. Personen staan op 100 x 240, voeten onderaan.
*/
(function () {
  const C = {
    cream: "#f4f1e4", pale: "#f2f1ea", light: "#d9d9d9", mid: "#c9c9c9", grey: "#a39c9c", stone: "#929292",
    s1: "#777f87", s2: "#646c75", s3: "#4b525a", s4: "#363c43", ink: "#1f2123", black: "#000000",
    wood: "#6d5b4a", wood2: "#5a4e43", green: "#55843f", green2: "#8fb55d", mint: "#e3f0e8",
    red: "#b5534c", red2: "#8f3f3a", white: "#ffffff", blue: "#6f8aa3", denim: "#8d9fb3", denim2: "#7a8ca1"
  };
  const R = (x, y, w, h, fill, r = 0, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
  const E = (cx, cy, rx, ry, fill, extra = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
  const Pth = (d, fill, extra = "") => `<path d="${d}" fill="${fill}" ${extra}/>`;
  const stick = (d, c = C.light, w = 3.2) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

  // Ogen zoals bij de prei: ovaal zwart met een boogje erboven
  const eyes = (cx, cy, gap = 6.5, s = 1) =>
    E(cx - gap, cy, 2.2 * s, 3.2 * s, C.black) + E(cx + gap, cy, 2.2 * s, 3.2 * s, C.black) +
    stick(`M${cx - gap - 2.6} ${cy - 5.2} Q${cx - gap} ${cy - 7.2} ${cx - gap + 2.6} ${cy - 5.2} M${cx + gap - 2.6} ${cy - 5.2} Q${cx + gap} ${cy - 7.2} ${cx + gap + 2.6} ${cy - 5.2}`, C.black, 1.4);

  /* ---------- Personen ----------
     opbouw: dunne beentjes + voetjes, blokromp met tonen, dunne armpjes met rond handje, hoofd als afgerond blok */
  function person(o = {}) {
    const t = o.top || [C.mid, C.light, C.pale];         // romp: boven / midden / onder
    const legC = o.legC || C.light, skin = o.skin || C.cream;
    let s = "";
    // benen (stokjes) of broek
    if (o.trousers) s += R(34, 150, 13, 78, o.trousers, 5) + R(53, 150, 13, 78, o.trousers, 5);
    else s += stick("M42 150 L42 228 M58 150 L58 228", legC, 3.4);
    // schoenen
    if (o.sneakers) s += R(30, 224, 20, 11, C.white, 5) + R(50, 224, 20, 11, C.white, 5) + R(30, 231, 20, 4, C.mid, 2) + R(50, 231, 20, 4, C.mid, 2);
    else s += E(40, 231, 9, 4.5, o.shoe || C.s4) + E(60, 231, 9, 4.5, o.shoe || C.s4);
    // armen (stokjes) met handjes
    const armC = o.armC || C.mid;
    if (o.armsUp) s += stick("M30 70 L14 30 M70 70 L86 30", armC, 3.6) + E(14, 28, 4.5, 4.5, skin) + E(86, 28, 4.5, 4.5, skin);
    else s += stick("M30 74 L16 124 M70 74 L84 124", armC, 3.6) + E(16, 126, 4.5, 4.5, skin) + E(84, 126, 4.5, 4.5, skin);
    // romp: afgerond blok met drie tonen
    const tall = o.coat ? 118 : 96;
    // Lang haar achter het lichaam (valt op de schouders), en een hals zodat het hoofd niet zweeft
    if (o.hairLong && !o.back) s += R(31, 11, 38, 50, o.hairLong, 16) + R(33, 40, 34, 26, o.hairLong, 10);
    if (!o.back) s += R(45, 44, 10, 16, skin, 4);
    s += `<g>` + R(28, 56, 44, tall, t[2], 14) + R(28, 56, 44, tall * 0.62, t[1], 14) + R(28, 56, 44, tall * 0.28, t[0], 14) + R(28, 56 + tall * 0.2, 44, tall * 0.1, t[1]) + `</g>`;
    if (o.suit) s += Pth("M44 56 L50 80 L56 56 Z", C.white) + Pth("M48.2 58 L51.8 58 L53 82 L50 87 L47 82 Z", C.s4);
    if (o.pocket) s += R(38, 112, 24, 14, t[0], 5);
    if (o.lanyard) s += stick("M43 57 L50 84 L57 57", C.s2, 1.6) + R(45, 84, 10, 12, C.white, 2);
    if (o.vest) s += R(32, 74, 36, 46, "#e8e3a8", 6) + R(32, 92, 36, 6, C.white);
    if (o.scarf) { const sc = o.scarfC || C.red; s += R(33, 52, 34, 10, sc, 4) + R(39, 52, 6, 10, C.pale) + R(55, 52, 6, 10, C.pale) + R(56, 58, 9, 40, sc, 3) + R(56, 70, 9, 6, C.pale) + R(56, 84, 9, 6, C.pale); }
    if (o.phone) s += R(76, 110, 12, 20, C.ink, 3) + R(78, 112, 8, 14, C.s1, 1);
    if (o.backpack) s += stick("M32 60 L32 110 M68 60 L68 110", C.s3, 3);
    // hoofd
    if (o.back) {
      s += R(35, 14, 30, 34, o.hood ? t[0] : (o.hair || C.wood), 13);
    } else {
      if (o.hood) s += R(30, 8, 40, 46, t[0], 18);
      if (o.hairLong) s += R(34, 11, 32, 12, o.hairLong, 10); // pony boven het gezicht
      s += R(36, 16, 28, 32, skin, 12);
      if (o.hair && !o.hood && !o.helmet) s += R(36, 14, 28, 11, o.hair, 10) + R(36, 20, 28, 4, o.hair);
      s += eyes(50, 32);
      if (o.bruise) s += E(56.5, 32, 5.5, 5, "#8f8aa0", 'opacity=".55"');
      if (o.glasses) s += stick("M40 32 a3.6 3.6 0 1 0 7.2 0 a3.6 3.6 0 1 0 -7.2 0 M52.8 32 a3.6 3.6 0 1 0 7.2 0 a3.6 3.6 0 1 0 -7.2 0 M47.2 32 L52.8 32", C.s4, 1.4);
      if (o.mask) s += R(36, 36, 28, 12, o.mask, 4);
      if (o.cap) s += R(34, 10, 32, 12, C.s4, 6) + R(34, 19, 40, 5, C.s4, 2.5);
      if (o.helmet) s += R(31, 8, 38, 42, C.s3, 16) + R(35, 20, 30, 6, C.s4, 3) + [42, 47, 52, 57].map((x) => R(x, 28, 2.6, 14, C.s4, 1.3)).join("");
    }
    if (o.shield) s += R(10, 70, 80, 150, C.s1, 10) + R(14, 74, 72, 142, C.s2, 8) + R(26, 84, 48, 20, "#9aa3ab", 4, 'opacity=".9"');
    return o.scale ? `<g transform="translate(${50 - 50 * o.scale} ${240 - 240 * o.scale}) scale(${o.scale})">${s}</g>` : s;
  }
  const P = (o) => ({ vb: [100, 240], svg: person(o) });

  // tonen per kledingstuk (donker boven → licht onder)
  const T = {
    suit: ["#8f97a0", "#a7aeb5", "#bfc4c9"],
    hoodieGrey: [C.s2, C.s1, "#8a929a"],
    hoodieDark: [C.s4, C.s3, C.s2],
    hoodieLight: ["#b9bec3", "#c9cdd1", "#d9dcdf"],
    jacket: ["#9c8f80", "#ada192", "#bfb4a7"],
    tshirt: ["#c9c9c9", "#d9d9d9", "#e6e6e6"],
    coat: ["#7d7a86", "#8e8b96", "#a19ea8"],
    black: [C.ink, "#2b2e30", C.s4],
    summer: ["#d7c9a7", "#e2d7bb", "#ece4cf"]
  };

  const A = {
    "p-mark-pak": P({ top: T.suit, suit: true, trousers: "#8f97a0", bruise: true, hair: C.wood }),
    "p-mark-capuchon": P({ top: T.hoodieGrey, hood: true, pocket: true, trousers: C.denim, sneakers: true }),
    "p-mark-jong": P({ top: T.jacket, hair: C.wood, trousers: C.denim, sneakers: true, scale: 0.8 }),
    // Ruud: bomberjack, pet en de rode sjaal. De sjaal is de draad door het verhaal (1996 → 2026).
    "p-ruud": P({ top: ["#4f5a48", "#5d6955", "#6c7863"], cap: true, scarf: true, trousers: C.denim2, sneakers: true }),
    // Ruud na 1996: de rode sjaal heeft hij aan jou gegeven, hij draagt nu een grijze.
    "p-ruud-later": P({ top: ["#4f5a48", "#5d6955", "#6c7863"], cap: true, scarf: true, scarfC: C.s3, trousers: C.denim2, sneakers: true }),
    "p-mark-jong-sjaal": P({ top: T.jacket, hair: C.wood, scarf: true, trousers: C.denim, sneakers: true, scale: 0.8 }),
    "p-mark-sjaal": P({ top: T.hoodieGrey, hood: true, pocket: true, scarf: true, trousers: C.denim, sneakers: true }),
    "p-jeroen-jong": P({ top: T.hoodieLight, hair: "#c9a56b", pocket: true, trousers: C.denim2, sneakers: true, scale: 0.8 }),
    "p-collega": P({ top: T.tshirt, hair: C.s3, lanyard: true, trousers: C.s2 }),
    "p-man": P({ top: T.jacket, hair: C.s3, trousers: C.s3 }),
    "p-jeroen-43": P({ top: ["#a9b5a0", "#b9c4b1", "#c9d2c3"], hair: "#c9a56b", glasses: true, backpack: true, trousers: C.s2 }),
    "p-vrouw": P({ top: T.coat, coat: true, hairLong: C.wood }),
    "p-agent": P({ top: ["#3f4a5c", "#4b5669", "#586377"], vest: true, cap: true, trousers: "#3f4a5c" }),
    "p-me": P({ top: T.hoodieDark, helmet: true, shield: true, trousers: C.s4 }),
    "p-hool-voor": P({ top: T.hoodieGrey, hood: true, pocket: true, scarf: true, scarfC: C.s3, trousers: C.denim, sneakers: true }),
    "p-hool-masker": P({ top: T.hoodieDark, hood: true, pocket: true, mask: C.s1, trousers: C.denim2, sneakers: true }),
    "p-hool-achter": P({ top: T.hoodieGrey, hood: true, back: true, trousers: C.denim, sneakers: true }),
    "p-zomer": P({ top: T.summer, hair: C.wood, sneakers: true, armC: C.cream, legC: C.cream }),
    "p-rouw": P({ top: T.black, coat: true, back: true, hair: C.s4, trousers: C.ink }),
    "p-supporter": P({ top: T.jacket, hair: C.s3, scarf: true, scarfC: C.s1, trousers: C.s2, armsUp: true }),
    "p-zoon": P({ top: T.hoodieLight, hair: C.wood, scarf: true, phone: true, trousers: C.denim, sneakers: true, scale: 0.85 }),
    "p-kind": P({ top: ["#d9b7a6", "#e3c6b8", "#ecd6cb"], coat: true, hairLong: "#c9a56b", scale: 0.62 }),
    "p-gehurkt": { vb: [100, 130], svg:
      stick("M44 96 L30 120 L46 124 M62 96 L72 122 L86 122", C.light, 3.4) + R(26, 118, 22, 10, C.white, 5) + R(70, 118, 20, 10, C.white, 5) +
      R(32, 52, 44, 50, T.hoodieGrey[1], 14) + R(32, 52, 44, 18, T.hoodieGrey[0], 14) +
      stick("M38 70 L30 96", C.mid, 3.6) + E(30, 98, 4.5, 4.5, C.cream) +
      R(34, 10, 40, 46, T.hoodieGrey[0], 18) + R(40, 18, 28, 30, C.cream, 12) + eyes(54, 33) },
    "p-liggend": { vb: [320, 90], svg:
      R(2, 46, 74, 28, C.white, 12) + R(22, 18, 40, 40, C.cream, 14) + eyes(42, 34) + R(22, 44, 40, 12, C.white, 6) + R(22, 22, 40, 6, C.white, 3) +
      R(62, 34, 256, 46, "#c9d6dc", 16) + R(62, 34, 256, 16, "#b3c3ca", 16) + stick("M110 44 L170 50", C.mid, 3.4) + E(172, 50, 5, 5, C.cream) },

    /* ---------- Objecten ---------- */
    "o-spiegel": { vb: [540, 640], svg: R(0, 0, 540, 640, C.s1, 16) + R(18, 18, 504, 570, "#dfe6e9", 10) + Pth("M60 90 L170 30 L210 30 L80 110 Z", C.white, 'opacity=".5"') + Pth("M380 560 L490 490 L500 520 L410 576 Z", C.white, 'opacity=".4"') + R(0, 596, 540, 16, C.mid, 8) },
    "o-koffie": { vb: [50, 70], svg: Pth("M8 16 L42 16 L38 68 L12 68 Z", C.pale) + R(5, 8, 40, 10, C.wood2, 4) + Pth("M10 34 L40 34 L39 48 L11 48 Z", C.wood) },
    "o-blauw-oog": { vb: [36, 26], svg: E(18, 13, 17, 12, "#8f8aa0", 'opacity=".55"') + E(18, 13, 4.6, 6, C.black) + stick("M12 4 Q18 1 24 4", C.black, 1.6) },
    "o-oog": { vb: [250, 250], svg: E(125, 125, 118, 104, "#8f8aa0", 'opacity=".45"') + E(125, 125, 88, 72, "#a59fb3", 'opacity=".45"') + R(40, 60, 170, 150, C.cream, 70) + E(125, 135, 30, 42, C.black) + E(136, 120, 7, 9, C.white) + stick("M70 62 Q125 30 180 62", C.black, 6) },
    "o-hart": { vb: [120, 120], svg: Pth("M60 108 Q10 72 12 40 Q14 14 38 14 Q54 14 60 32 Q66 14 82 14 Q106 14 108 40 Q110 72 60 108 Z", C.red) },
    "o-telefoon": { vb: [100, 190], svg: R(0, 0, 100, 190, C.ink, 16) + R(8, 14, 84, 154, "#dfe6e9", 6) + R(38, 174, 24, 5, C.s2, 2.5) },
    "o-telefoon-groot": { vb: [220, 300], svg: R(0, 0, 220, 300, C.ink, 24) + R(12, 18, 196, 254, "#eef1f2", 8) + R(22, 30, 176, 122, C.s2, 6) + Pth("M96 72 L132 92 L96 112 Z", C.white) + R(22, 164, 130, 8, C.light, 4) + R(22, 180, 96, 8, C.light, 4) },
    "o-prepaid": { vb: [100, 205], svg: R(4, 0, 92, 205, C.s2, 30) + R(4, 0, 92, 70, C.s1, 30) + R(18, 20, 64, 60, "#b8c7a3", 6) +
      [0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => R(22 + c * 20, 100 + r * 22, 16, 14, C.light, 5)).join("")).join("") },
    "o-loods": { vb: [840, 170], svg: R(0, 0, 840, 170, "#e6ebee") + Pth("M10 170 L10 64 L210 22 L410 64 L410 170 Z", C.mid) + Pth("M10 64 L210 22 L410 64 L410 82 L210 40 L10 82 Z", C.stone) +
      R(140, 84, 140, 86, C.s1, 4) + [0, 1, 2, 3, 4].map((i) => R(140, 96 + i * 15, 140, 4, C.s2)).join("") + R(450, 72, 290, 98, C.light, 4) + R(560, 90, 60, 34, C.s1, 6) +
      R(0, 130, 840, 4, C.s2) + Array.from({ length: 29 }, (_, i) => R(i * 30, 130, 3, 40, C.s2)).join("") },
    "o-stadion": { vb: [760, 190], svg: Pth("M10 176 Q380 30 750 176 Z", C.mid) + Pth("M60 176 Q380 70 700 176 Z", C.light) + Pth("M120 176 Q380 108 640 176 Z", "#e6e2d6") +
      R(86, 22, 8, 154, C.s2, 4) + R(666, 22, 8, 154, C.s2, 4) + R(64, 8, 52, 22, C.s1, 6) + R(644, 8, 52, 22, C.s1, 6) + R(0, 174, 760, 16, C.green2, 4) },
    "o-wieg": { vb: [170, 110], svg: R(4, 16, 162, 78, C.pale, 14) + Array.from({ length: 9 }, (_, i) => R(18 + i * 16, 28, 6, 56, C.mid, 3)).join("") + R(4, 16, 162, 14, "#d9c9b0", 7) + R(10, 92, 8, 18, C.wood, 3) + R(152, 92, 8, 18, C.wood, 3) },
    "o-wieg-boven": { vb: [320, 240], svg: R(0, 0, 320, 240, "#d9c9b0", 18) + R(18, 18, 284, 204, C.pale, 12) + R(18, 120, 284, 102, "#e8e2d2", 12) },
    "o-baby": { vb: [140, 140], svg: R(26, 40, 88, 96, "#c9d6dc", 40) + R(26, 80, 88, 56, "#b3c3ca", 40) + R(42, 8, 56, 56, C.cream, 24) + stick("M57 38 Q61 42 65 38 M75 38 Q79 42 83 38", C.black, 2) },
    "o-tafel": { vb: [800, 80], svg: R(0, 40, 800, 18, C.wood, 6) + R(0, 40, 800, 6, "#7d6a58", 3) + R(40, 56, 10, 24, C.wood2, 3) + R(750, 56, 10, 24, C.wood2, 3) +
      R(120, 6, 22, 34, "#e8c55a", 4) + R(120, 6, 22, 8, C.white, 4) + R(260, 2, 22, 38, "#e8c55a", 4) + R(260, 2, 22, 8, C.white, 4) + R(420, 6, 22, 34, "#e8c55a", 4) + R(420, 6, 22, 8, C.white, 4) },
    "o-krant": { vb: [680, 560], svg: R(0, 0, 680, 560, C.pale, 6) + R(36, 150, 300, 220, C.light, 6) + Pth("M60 350 L130 250 L180 310 L230 230 L320 350 Z", C.mid) +
      Array.from({ length: 12 }, (_, i) => R(370, 168 + i * 18, 270, 6, C.light, 3)).join("") + Array.from({ length: 6 }, (_, i) => R(36, 400 + i * 20, 604, 6, C.light, 3)).join("") + R(36, 130, 604, 4, C.s3) },
    "o-handen": { vb: [760, 110], svg: R(70, 10, 110, 50, C.cream, 22) + R(90, 40, 60, 70, C.cream, 10) + R(580, 10, 110, 50, C.cream, 22) + R(610, 40, 60, 70, C.cream, 10) + R(150, 60, 20, 50, "#9c8f80", 6) + R(590, 60, 20, 50, "#9c8f80", 6) },
    "o-treinraam": { vb: [780, 290], svg: R(0, 0, 780, 290, "#c9d6dc", 10) + [0, 1, 2].map((i) => R(30 + i * 250, 18, 220, 92, C.mint, 20) + Pth(`M${50 + i * 250} 100 Q${140 + i * 250} 60 ${230 + i * 250} 100 Z`, "#a8c7b3")).join("") + R(0, 126, 780, 8, C.s1) + R(0, 240, 780, 50, C.s2, 6) },
    "o-vuilnisbak": { vb: [140, 150], svg: Pth("M20 30 L120 30 L112 150 L28 150 Z", C.green) + Pth("M20 30 L120 30 L117 70 L23 70 Z", "#4a7437") + R(8, 16, 124, 18, "#3f6330", 8) + R(48, 84, 8, 54, "#6b9a52", 4) + R(84, 84, 8, 54, "#6b9a52", 4) },
    "o-celdeur": { vb: [260, 250], svg: R(0, 0, 260, 250, C.s3, 6) + R(16, 16, 228, 234, C.s1, 6) + R(16, 16, 228, 70, C.s2, 6) +
      [0, 1, 2, 3].map((i) => E(32, 40 + i * 58, 4, 4, C.s4) + E(228, 40 + i * 58, 4, 4, C.s4)).join("") + R(196, 118, 22, 48, C.s4, 8) },
    "o-luikje": { vb: [120, 40], svg: R(0, 0, 120, 40, C.s4, 6) + R(8, 8, 104, 24, C.ink, 4) },
    "o-zon": { vb: [120, 80], svg: E(60, 54, 32, 32, "#f0c868") + E(60, 54, 22, 22, "#f6dc93") + R(0, 70, 120, 10, "#e3d3a8", 4) },
    "o-monitor": { vb: [420, 260], svg: R(0, 0, 420, 224, C.ink, 14) + R(12, 12, 396, 200, "#eef1f2", 6) +
      Array.from({ length: 9 }, (_, i) => R(12, 32 + i * 20, 396, 2, C.light)).join("") + [80, 160, 240, 320].map((x) => R(x, 12, 2, 200, C.light)).join("") +
      R(160, 92, 80, 20, "#b8c7a3") + Pth("M186 224 L178 258 L242 258 L234 224 Z", C.s2) },
    "o-rook": { vb: [220, 180], svg: [[60, 120, 50], [110, 90, 60], [160, 120, 48], [90, 60, 40], [150, 50, 36]].map(([x, y, r]) => E(x, y, r, r, "#cfd3d6", 'opacity=".75"')).join("") },
    "o-envelop": { vb: [280, 170], svg: R(40, 0, 200, 124, C.white, 4) + R(60, 24, 160, 6, C.light, 3) + R(60, 42, 140, 6, C.light, 3) + R(60, 60, 150, 6, C.red, 3) +
      R(0, 60, 280, 110, "#e6dcc4", 6) + Pth("M0 60 L140 128 L280 60 L280 70 L140 138 L0 70 Z", "#d6c9ac") },
    "o-ziekenhuisbed": { vb: [360, 140], svg: R(0, 40, 360, 42, C.white, 10) + R(0, 70, 360, 14, C.light, 4) + R(6, 82, 8, 46, C.s1, 3) + R(346, 82, 8, 46, C.s1, 3) + R(0, 14, 10, 70, C.s1, 4) + R(350, 26, 10, 58, C.s1, 4) +
      E(16, 132, 7, 7, C.s2) + E(344, 132, 7, 7, C.s2) + R(296, 0, 6, 40, C.mid, 3) + R(288, 6, 22, 26, "#dfe6e9", 6) },
    "o-deur": { vb: [130, 680], svg: R(0, 0, 130, 680, "#c9b69c", 6) + Pth("M130 0 L100 26 L100 654 L130 680 Z", "#a8957c") + E(108, 360, 6, 6, C.s3) + R(10, 0, 4, 680, "#b3a086") },
    "o-sjaal": { vb: [240, 120], svg: R(10, 30, 220, 60, C.red, 10) + [40, 90, 140, 190].map((x) => R(x, 30, 18, 60, C.pale)).join("") + Array.from({ length: 9 }, (_, i) => R(14 + i * 3, 90, 2, 16, C.red, 1)).join("") + Array.from({ length: 9 }, (_, i) => R(200 + i * 3, 90, 2, 16, C.red, 1)).join("") + R(10, 30, 220, 12, C.red2, 6) },
    // Snelheidslijnen (McCloud H4): strakke horizontale streepjes achter wie rent; grijs, nooit rood
    // wigvorm: dik bij de renner, dun en lichter naar achteren
    "o-snelheid": { vb: [300, 360], svg: [[20, 50, 150], [50, 105, 200], [25, 170, 120], [45, 225, 210], [20, 285, 140], [60, 335, 170]].map(([x, y, l], i) => Pth(`M${x} ${y - 3} L${x + l} ${y} L${x} ${y + 3} Z`, i % 2 ? "#a9afb7" : "#c3c7cd", `opacity="${(0.5 - (i % 3) * 0.1).toFixed(2)}"`)).join("") },
    "o-markering": { vb: [60, 60], svg: `<circle cx="30" cy="30" r="25" fill="none" stroke="${C.ink}" stroke-width="5" stroke-dasharray="7 5"/>` },
    // Grind begint boven de schoenen, zodat de witte sneakers niet wegvallen tegen het witte paneel; schaduw eronder
    "o-sneakers": { vb: [400, 300], svg: R(0, 110, 400, 190, "#b3aea4") + Array.from({ length: 48 }, (_, i) => E(12 + (i * 53) % 376, 125 + ((i * 37) % 165), 6 + (i % 4), 4 + (i % 3), i % 2 ? "#a19b90" : "#c7c2b8")).join("") +
      E(130, 208, 72, 9, "#8f897f", 'opacity=".6"') + E(274, 204, 72, 9, "#8f897f", 'opacity=".6"') +
      stick("M120 0 L130 170 M270 0 L262 170", C.denim, 30) + R(70, 160, 120, 46, C.white, 22) + R(70, 192, 120, 16, C.mid, 8) + E(98, 196, 10, 6, "#dfe6e9") +
      R(214, 156, 120, 46, C.white, 22) + R(214, 188, 120, 16, C.mid, 8) + E(306, 192, 10, 6, "#dfe6e9") }
  };

  window.ASSETS = A;
  window.ASSET_COLORS = C;

  // Welke laag welk asset gebruikt. Groepen (crowd) herhalen één persoon.
  window.ASSET_MAP = {
    spiegel: "o-spiegel", mark: "p-mark-pak", "mark-collega": "p-mark-pak",oog: "o-blauw-oog", koffie: "o-koffie", "oog-groot": "o-oog", "collega-persoon": "p-collega",
    prepaid: "o-prepaid", "loods-achtergrond": "o-loods", "groep-eigen": "p-hool-achter", "mark-capuchon": "p-mark-capuchon", "groep-tegenover": "p-hool-masker",
    "groep-links": "p-hool-achter", "groep-rechts": "p-hool-masker", sneakers: "o-sneakers",
    vader: "p-man", wieg: "o-wieg", terugkomers: "p-hool-voor", "mark-13": "p-mark-jong", "mark-96": "p-mark-jong",stadion: "o-stadion", "mark-kuip": "p-mark-jong", "jeroen-kuip": "p-jeroen-jong",
    "oudere-jongens": "p-hool-voor", tafel: "o-tafel", "mark-kroeg": "p-mark-jong",
    "krant-pagina": "o-krant", "handen-vader": "o-handen",
    fluisteraars: "p-jeroen-jong", "mark-rent": "p-mark-jong-sjaal", "snelheid-rennen": "o-snelheid","jeroen-opgepakt": "p-jeroen-jong", agent: "p-agent", "vader-jeroen": "p-man", "jeroen-bureau": "p-jeroen-jong",
    treinraam: "o-treinraam", "jonge-kern": "p-hool-voor", "vuilnisbak-object": "o-vuilnisbak", "mark-verstopt": "p-gehurkt", celdeur: "o-celdeur", luikje: "o-luikje", veertig: "p-zomer", zon: "o-zon",
    monitor: "o-monitor", "mark-pak": "p-mark-pak", schilden: "p-me", rook: "o-rook", "mark-voor": "p-mark-sjaal", "telefoon-ziek": "o-telefoon",
    "wieg-bed": "o-wieg-boven", baby: "o-baby", envelop: "o-envelop", bed: "o-ziekenhuisbed", "mark-bed": "p-liggend", bezoek: "p-hool-voor", rouw: "p-rouw", "ruud-persoon": "p-man",
    deur: "o-deur", zoon: "p-zoon", "telefoon-zoon": "o-telefoon", "scherm-zoon-groot": "o-telefoon-groot", "prepaid-mark": "o-prepaid", "jeroen-43": "p-jeroen-43", dochter: "p-kind",
    "tribune-mensen": "p-supporter", "mark-tribune": "o-markering",
    // Verhaal met Ruud als draad (v6)
    "jeroen-13": "p-jeroen-jong", "ruud-96": "p-ruud", "sjaal-om": "o-sjaal", "ruud-rent": "p-ruud-later", "ruud-trein": "p-ruud-later", "mark-trein": "p-mark-sjaal",
    "ruud-wacht": "p-ruud-later", "ruud-linie": "p-ruud-later", "telefoon-nacht": "o-telefoon", "sjaal-graf": "o-sjaal", "titel-sjaal": "o-sjaal", "slot-sjaal": "o-sjaal",
    // v10: zonder hoofdstukken, met 2014 en de keuze
    "groep-terug": "p-hool-voor", "mark-terug": "p-mark-sjaal", "lisa-persoon": "p-vrouw",
    "ruud-echo": "p-ruud", "vader-echo": "p-man", "mark-rug": "p-hool-achter", "zoon-wacht": "p-zoon"
  };

  // Plaatst een asset passend in een vak (w x h): op schaal, gecentreerd, onderaan uitgelijnd.
  window.assetFit = function (key, w, h) {
    const a = A[key]; if (!a) return null;
    const s = Math.min(w / a.vb[0], h / a.vb[1]);
    return { s, x: (w - a.vb[0] * s) / 2, y: h - a.vb[1] * s };
  };

  // Rijen voor een groep: vakjes (x, y, w, h, row), achterste rij eerst.
  // Zoals de achtergrondfiguren in de Prei-assets: hoe verder naar achter, hoe meer mist (zie mist()).
  window.crowdCells = function (w, h, n) {
    const rows = n > 12 ? 3 : n > 6 ? 2 : 1, per = Math.ceil(n / rows), cells = [];
    for (let row = rows - 1; row >= 0; row--) {
      const scale = 1 - row * 0.12, cw = (w / per) * scale, ch = (rows > 1 ? (h / rows) * 1.35 : h) * scale;
      const y = h - ch - row * (h - (h / rows) * 1.35) / Math.max(1, rows - 1);
      for (let i = 0; i < per; i++) cells.push({ x: (w / per) * i + (w / per - cw) / 2 + (row % 2 ? w / per / 4 : 0), y, w: cw, h: ch, row });
    }
    return cells;
  };
  window.crowdMist = (row) => [1, 0.62, 0.42][row] || 0.35;
})();
