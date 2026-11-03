/*
  Eerste versie van alle assets: ongestylde lijntekeningen (zwart, wit, grijs).
  Dezelfde tekeningen staan als componenten op de Figma-pagina "Assets".
  Elk asset: { vb: [breedte, hoogte], svg: "<...>" }. Personen staan op 100 x 240, voeten onderaan.
*/
(function () {
  const S = 'stroke="#222" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
  const SKIN = "#ffffff", CLOTH = "#d6d6d6", DARK = "#8f8f8f", LIGHT = "#efefef", BLACK = "#3a3a3a";
  const f = (c) => `fill="${c}" ${S}`;

  /* ---------- Personen ---------- */
  function person(o = {}) {
    const top = o.torso || "jacket", c = o.cloth || CLOTH, legs = o.legs || "trousers", lc = o.legCloth || DARK;
    let s = "";
    // benen
    if (legs === "shorts") {
      s += `<path d="M31 128 L30 172 L48 172 L50 140 L52 172 L70 172 L69 128 Z" ${f(lc)}/>`;
      s += `<path d="M33 172 L35 228 L45 228 L46 172 M54 172 L55 228 L65 228 L67 172" ${f(SKIN)}/>`;
    } else {
      s += `<path d="M30 128 L32 228 L46 228 L50 142 L54 228 L68 228 L70 128 Z" ${f(lc)}/>`;
    }
    // schoenen
    if (o.sneakers) s += `<path d="M26 226 L48 226 L49 236 L24 236 Z M52 226 L74 226 L76 236 L51 236 Z" ${f("#fff")}/><circle cx="31" cy="232" r="2.2" ${f(LIGHT)}/><circle cx="69" cy="232" r="2.2" ${f(LIGHT)}/>`;
    else s += `<path d="M27 227 Q38 222 48 228 L48 235 L27 235 Z M52 228 Q62 222 73 227 L73 235 L52 235 Z" ${f(BLACK)}/>`;
    // armen
    const sleeve = top === "tshirt" ? SKIN : c;
    s += `<path d="M27 56 L15 122 L24 125 L34 72 Z M73 56 L85 122 L76 125 L66 72 Z" ${f(sleeve)}/>`;
    if (top === "tshirt") s += `<path d="M27 56 L22 82 L32 85 L34 64 Z M73 56 L78 82 L68 85 L66 64 Z" ${f(c)}/>`;
    s += `<circle cx="19" cy="127" r="5.5" ${f(SKIN)}/><circle cx="81" cy="127" r="5.5" ${f(SKIN)}/>`;
    // romp
    if (top === "coat") s += `<path d="M27 54 Q50 46 73 54 L80 178 L20 178 Z" ${f(c)}/>`;
    else s += `<path d="M27 54 Q50 46 73 54 L71 132 L29 132 Z" ${f(c)}/>`;
    if (top === "suit") s += `<path d="M43 50 L50 76 L57 50" fill="none" ${S}/><path d="M48 53 L52 53 L53.5 78 L50 84 L46.5 78 Z" ${f(BLACK)}/><path d="M50 90 L50 130" fill="none" ${S}/>`;
    if (top === "hoodie") s += `<path d="M37 102 L63 102 L66 120 L34 120 Z" fill="none" ${S}/><path d="M45 52 L44 70 M55 52 L56 70" fill="none" ${S}/>`;
    if (top === "vest") s += `<rect x="31" y="62" width="38" height="54" rx="3" ${f(LIGHT)}/><text x="50" y="92" font-size="7" text-anchor="middle" font-family="Arial" font-weight="700" fill="#222">POLITIE</text>`;
    if (o.lanyard) s += `<path d="M42 52 L50 82 L58 52" fill="none" ${S}/><rect x="45" y="82" width="10" height="13" ${f("#fff")}/>`;
    if (o.scarf) s += `<path d="M37 45 L63 45 L65 56 L35 56 Z" ${f(LIGHT)}/><path d="M56 54 L58 100 L66 98 L63 54 Z" ${f(LIGHT)}/><path d="M57 66 L64 65 M57.5 78 L64.5 77 M58 90 L65 89 M42 45 L41 56 M50 45 L50 56" fill="none" ${S}/>`;
    if (o.phone) s += `<rect x="72" y="104" width="13" height="22" rx="2" ${f(BLACK)}/>`;
    if (o.backpack) s += `<path d="M31 58 L31 120 M69 58 L69 120" fill="none" ${S}/>`;
    // nek + hoofd
    s += `<rect x="45" y="42" width="10" height="10" ${f(SKIN)}/>`;
    if (o.back) {
      s += `<circle cx="50" cy="30" r="15" ${f(o.hood ? c : DARK)}/>`;
      if (o.hood) s += `<path d="M38 40 Q50 48 62 40" fill="none" ${S}/>`;
    } else {
      s += `<circle cx="50" cy="30" r="15" ${f(SKIN)}/>`;
      if (o.hair === "long") s += `<path d="M34 32 Q32 11 50 12 Q68 11 66 32 L69 60 Q61 54 62 34 Q50 24 38 34 Q39 54 31 60 Z" ${f(DARK)}/>`;
      else if (o.hair !== "none" && !o.hood && !o.cap && !o.helmet) s += `<path d="M35 28 Q36 13 50 14 Q64 13 65 28 Q58 20 50 21 Q42 20 35 28 Z" ${f(DARK)}/>`;
      s += `<circle cx="44.5" cy="31" r="1.6" fill="#222"/><circle cx="55.5" cy="31" r="1.6" fill="#222"/>`;
      if (!o.mask) s += `<path d="M45 38.5 Q50 40.5 55 38.5" fill="none" ${S}/>`;
      if (o.glasses) s += `<circle cx="44.5" cy="31" r="4.5" fill="none" ${S}/><circle cx="55.5" cy="31" r="4.5" fill="none" ${S}/><path d="M49 31 L51 31" ${S}/>`;
      if (o.bruise) s += `<ellipse cx="55.5" cy="31.5" rx="5.5" ry="4.5" fill="#bbb" opacity=".8"/>`;
      if (o.mask) s += `<rect x="35" y="33" width="30" height="12" rx="4" ${f(LIGHT)}/><path d="M42 33 L42 45 M50 33 L50 45 M58 33 L58 45" fill="none" ${S}/>`;
      if (o.hood) s += `<path d="M31 46 Q26 9 50 8 Q74 9 69 46 L62 46 Q65 22 50 21 Q35 22 38 46 Z" ${f(c)}/>`;
      if (o.cap) s += `<path d="M35 22 Q36 10 50 10 Q64 10 65 22 Z" ${f(BLACK)}/><path d="M34 22 L72 22 L73 26 L34 26 Z" ${f(BLACK)}/>`;
      if (o.helmet) s += `<path d="M32 36 Q30 8 50 8 Q70 8 68 36 Z" ${f(BLACK)}/><rect x="34" y="25" width="32" height="12" rx="3" fill="#ddd" opacity=".85" ${S}/>`;
    }
    if (o.shield) s += `<rect x="12" y="68" width="76" height="150" rx="5" fill="#f4f4f4" opacity=".92" ${S}/><rect x="26" y="80" width="48" height="22" rx="3" fill="#ddd" ${S}/><text x="50" y="160" font-size="9" text-anchor="middle" font-family="Arial" font-weight="700" fill="#222">POLITIE</text>`;
    return o.scale ? `<g transform="translate(${50 - 50 * o.scale} ${240 - 240 * o.scale}) scale(${o.scale})">${s}</g>` : s;
  }

  const P = (o) => ({ vb: [100, 240], svg: person(o) });

  const A = {
    "p-mark-pak": P({ torso: "suit", cloth: "#cfcfcf", legCloth: "#cfcfcf", bruise: true }),
    "p-mark-capuchon": P({ torso: "hoodie", hood: true, cloth: "#bdbdbd", legs: "jeans", legCloth: "#e3e3e3", sneakers: true }),
    "p-mark-jong": P({ torso: "jacket", cloth: "#cfcfcf", legCloth: "#e3e3e3", sneakers: true, scale: 0.8 }),
    "p-jeroen-jong": P({ torso: "hoodie", cloth: "#e6e6e6", legCloth: "#bdbdbd", sneakers: true, scale: 0.8 }),
    "p-collega": P({ torso: "tshirt", cloth: "#e8e8e8", legCloth: "#bdbdbd", lanyard: true }),
    "p-man": P({ torso: "jacket", cloth: "#c4c4c4", legCloth: DARK }),
    "p-jeroen-43": P({ torso: "jacket", cloth: "#e4e4e4", legCloth: "#bdbdbd", glasses: true, backpack: true }),
    "p-vrouw": P({ torso: "coat", cloth: "#d8d8d8", legCloth: "#bdbdbd", hair: "long" }),
    "p-agent": P({ torso: "vest", cloth: "#9a9a9a", legCloth: BLACK, cap: true }),
    "p-me": P({ torso: "jacket", cloth: BLACK, legCloth: BLACK, helmet: true, shield: true }),
    "p-hool-voor": P({ torso: "hoodie", hood: true, cloth: "#c8c8c8", legs: "jeans", legCloth: "#e3e3e3", sneakers: true, scarf: true }),
    "p-hool-masker": P({ torso: "hoodie", hood: true, cloth: "#a9a9a9", legs: "jeans", legCloth: "#d9d9d9", sneakers: true, mask: true }),
    "p-hool-achter": P({ torso: "hoodie", hood: true, back: true, cloth: "#c8c8c8", legCloth: "#e3e3e3", sneakers: true }),
    "p-zomer": P({ torso: "tshirt", cloth: "#e6e6e6", legs: "shorts", legCloth: "#bdbdbd", sneakers: true }),
    "p-rouw": P({ torso: "coat", back: true, cloth: BLACK, legCloth: BLACK }),
    "p-supporter": P({ torso: "jacket", cloth: "#d0d0d0", legCloth: "#bdbdbd", scarf: true }),
    "p-zoon": P({ torso: "hoodie", cloth: "#d9d9d9", legs: "jeans", legCloth: "#e6e6e6", sneakers: true, scarf: true, phone: true, scale: 0.85 }),
    "p-kind": P({ torso: "coat", cloth: "#e6e6e6", legCloth: "#bdbdbd", hair: "long", scale: 0.62 }),
    "p-gehurkt": {
      vb: [100, 130], svg:
        `<path d="M30 60 Q48 46 70 58 L74 100 L34 104 Z" ${f("#bdbdbd")}/>` +
        `<path d="M34 102 L22 126 L40 128 L52 104 M60 102 L66 126 L84 126 L74 100" ${f("#e3e3e3")}/>` +
        `<path d="M20 124 L42 124 L42 130 L18 130 Z M64 124 L86 124 L86 130 L62 130 Z" ${f("#fff")}/>` +
        `<path d="M36 62 L30 96 L38 98 L46 70 Z" ${f("#bdbdbd")}/><circle cx="34" cy="98" r="5" ${f(SKIN)}/>` +
        `<circle cx="52" cy="38" r="14" ${f(SKIN)}/><circle cx="47" cy="38" r="1.5" fill="#222"/><circle cx="57" cy="38" r="1.5" fill="#222"/>` +
        `<path d="M34 54 Q30 18 52 17 Q74 18 70 54 L64 54 Q66 30 52 29 Q38 30 40 54 Z" ${f("#bdbdbd")}/>`
    },
    "p-liggend": {
      vb: [320, 90], svg:
        `<rect x="2" y="44" width="70" height="26" rx="12" ${f("#fff")}/>` +
        `<circle cx="40" cy="38" r="18" ${f(SKIN)}/><circle cx="34" cy="34" r="1.6" fill="#222"/><circle cx="46" cy="34" r="1.6" fill="#222"/>` +
        `<path d="M24 42 Q40 62 56 42 L56 50 Q40 70 24 50 Z" ${f("#fff")}/><path d="M24 30 Q40 14 56 30" fill="none" ${S}/>` +
        `<path d="M62 30 L316 30 L316 78 L62 78 Q56 54 62 30 Z" ${f(LIGHT)}/><path d="M90 30 L90 78" fill="none" ${S}/>` +
        `<path d="M100 40 L170 46" fill="none" ${S}/><circle cx="174" cy="47" r="6" ${f(SKIN)}/>`
    },

    /* ---------- Objecten ---------- */
    "o-spiegel": { vb: [540, 640], svg: `<rect x="4" y="4" width="532" height="632" rx="6" ${f("#f6f6f6")}/><rect x="24" y="24" width="492" height="560" ${f("#fbfbfb")}/><path d="M60 80 L160 30 M90 140 L240 60 M400 520 L500 470" fill="none" stroke="#c8c8c8" stroke-width="3"/><rect x="4" y="596" width="532" height="14" rx="7" ${f(CLOTH)}/>` },
    "o-koffie": { vb: [50, 70], svg: `<path d="M8 14 L42 14 L38 66 L12 66 Z" ${f("#fff")}/><rect x="5" y="8" width="40" height="8" rx="3" ${f(BLACK)}/><path d="M10 34 L40 34 L39 46 L11 46 Z" ${f(CLOTH)}/>` },
    "o-blauw-oog": { vb: [36, 26], svg: `<ellipse cx="18" cy="13" rx="16" ry="11" fill="#9d9d9d" opacity=".75" ${S}/><path d="M8 13 Q18 6 28 13 Q18 19 8 13 Z" ${f("#fff")}/><circle cx="18" cy="13" r="3.2" fill="#222"/>` },
    "o-oog": { vb: [250, 250], svg: `<ellipse cx="125" cy="125" rx="118" ry="96" fill="#a8a8a8" opacity=".7" ${S}/><path d="M30 128 Q125 40 220 128 Q125 200 30 128 Z" ${f("#fff")}/><circle cx="125" cy="126" r="38" ${f(CLOTH)}/><circle cx="125" cy="126" r="17" fill="#222"/><circle cx="135" cy="115" r="6" fill="#fff"/><path d="M40 108 Q125 30 210 108" fill="none" ${S}/><path d="M60 196 Q90 210 120 204" fill="none" ${S}/>` },
    "o-hart": { vb: [120, 120], svg: `<path d="M60 108 Q10 72 12 40 Q14 14 38 14 Q54 14 60 32 Q66 14 82 14 Q106 14 108 40 Q110 72 60 108 Z" ${f(CLOTH)}/><path d="M4 64 L34 64 L44 44 L56 86 L68 52 L76 64 L116 64" fill="none" stroke="#222" stroke-width="3" stroke-linejoin="round"/>` },
    "o-telefoon": { vb: [100, 190], svg: `<rect x="3" y="3" width="94" height="184" rx="14" ${f(BLACK)}/><rect x="10" y="16" width="80" height="150" rx="5" fill="#fff" ${S}/><rect x="38" y="172" width="24" height="5" rx="2.5" fill="#bbb"/>` },
    "o-telefoon-groot": { vb: [220, 300], svg: `<rect x="3" y="3" width="214" height="294" rx="22" ${f(BLACK)}/><rect x="14" y="20" width="192" height="250" rx="8" fill="#fff" ${S}/><rect x="24" y="34" width="172" height="120" fill="#cfcfcf" ${S}/><path d="M96 74 L130 94 L96 114 Z" fill="#fff" ${S}/><path d="M24 168 L150 168 M24 182 L120 182" fill="none" stroke="#bbb" stroke-width="3"/>` },
    "o-prepaid": { vb: [100, 205], svg: `<rect x="6" y="3" width="88" height="199" rx="26" ${f(CLOTH)}/><rect x="18" y="20" width="64" height="64" rx="4" fill="#fff" ${S}/>` +
        [0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${24 + c * 19}" y="${104 + r * 22}" width="14" height="14" rx="4" ${f("#fff")}/>`).join("")).join("") },
    "o-loods": { vb: [840, 170], svg: `<path d="M10 168 L10 60 L210 20 L410 60 L410 168 Z" ${f(LIGHT)}/><rect x="140" y="80" width="140" height="88" ${f(CLOTH)}/>` +
        [0, 1, 2, 3, 4, 5].map((i) => `<path d="M140 ${92 + i * 14} L280 ${92 + i * 14}" stroke="#999" stroke-width="2"/>`).join("") +
        `<rect x="450" y="70" width="280" height="98" ${f(LIGHT)}/><text x="590" y="110" font-size="18" text-anchor="middle" font-family="Arial" font-weight="700" fill="#555">7</text>` +
        `<path d="M0 132 L840 132 M0 168 L840 168" stroke="#222" stroke-width="2"/>` + Array.from({ length: 29 }, (_, i) => `<path d="M${i * 30} 132 L${i * 30} 168" stroke="#222" stroke-width="2"/>`).join("") },
    "o-stadion": { vb: [760, 190], svg: `<path d="M20 170 Q380 40 740 170 Z" ${f(LIGHT)}/><path d="M60 170 Q380 80 700 170" fill="none" ${S}/><path d="M110 170 Q380 110 650 170" fill="none" ${S}/>` +
        `<path d="M90 170 L90 30 M670 170 L670 30" ${S}/><rect x="66" y="12" width="48" height="22" ${f(CLOTH)}/><rect x="646" y="12" width="48" height="22" ${f(CLOTH)}/><path d="M0 172 L760 172" ${S}/>` },
    "o-wieg": { vb: [170, 110], svg: `<rect x="6" y="20" width="158" height="70" ${f("#fff")}/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${22 + i * 16} 20 L${22 + i * 16} 90" ${S}/>`).join("") + `<path d="M6 90 L6 108 M164 90 L164 108" ${S}/><path d="M6 20 Q85 2 164 20" fill="none" ${S}/>` },
    "o-wieg-boven": { vb: [320, 240], svg: `<rect x="4" y="4" width="312" height="232" rx="8" ${f("#fff")}/><rect x="24" y="24" width="272" height="192" rx="6" ${f(LIGHT)}/>` + Array.from({ length: 15 }, (_, i) => `<path d="M${24 + i * 19} 4 L${24 + i * 19} 24 M${24 + i * 19} 216 L${24 + i * 19} 236" stroke="#222" stroke-width="2"/>`).join("") },
    "o-baby": { vb: [140, 140], svg: `<ellipse cx="70" cy="84" rx="44" ry="52" ${f(CLOTH)}/><path d="M30 70 Q70 100 110 70" fill="none" ${S}/><circle cx="70" cy="40" r="28" ${f(SKIN)}/><path d="M58 42 Q62 46 66 42 M74 42 Q78 46 82 42" fill="none" ${S}/>` },
    "o-tafel": { vb: [800, 80], svg: `<rect x="2" y="40" width="796" height="16" ${f(CLOTH)}/><path d="M40 56 L40 80 M760 56 L760 80" ${S}/><rect x="120" y="6" width="22" height="34" ${f("#fff")}/><rect x="260" y="2" width="22" height="38" ${f("#fff")}/><rect x="420" y="6" width="22" height="34" ${f("#fff")}/>` },
    "o-krant": { vb: [680, 560], svg: `<rect x="4" y="4" width="672" height="552" ${f("#fbfbfb")}/><rect x="40" y="160" width="300" height="220" ${f(CLOTH)}/><path d="M60 360 L120 260 L170 320 L220 240 L320 360" fill="none" ${S}/>` +
        Array.from({ length: 12 }, (_, i) => `<path d="M370 ${180 + i * 18} L640 ${180 + i * 18}" stroke="#bbb" stroke-width="4"/>`).join("") +
        Array.from({ length: 6 }, (_, i) => `<path d="M40 ${410 + i * 20} L640 ${410 + i * 20}" stroke="#bbb" stroke-width="4"/>`).join("") + `<path d="M40 140 L640 140" stroke="#222" stroke-width="3"/>` },
    "o-handen": { vb: [760, 110], svg: `<path d="M40 110 L60 40 Q70 10 110 14 L170 22 Q190 30 176 46 L130 50 L150 110 Z" ${f(SKIN)}/><path d="M720 110 L700 40 Q690 10 650 14 L590 22 Q570 30 584 46 L630 50 L610 110 Z" ${f(SKIN)}/><path d="M110 30 L150 34 M650 30 L610 34" fill="none" ${S}/>` },
    "o-treinraam": { vb: [780, 290], svg: `<rect x="4" y="4" width="772" height="282" ${f(LIGHT)}/>` + [0, 1, 2].map((i) => `<rect x="${30 + i * 250}" y="20" width="220" height="90" rx="14" ${f("#fff")}/>`).join("") + `<path d="M4 130 L776 130" ${S}/><rect x="4" y="240" width="772" height="46" ${f(CLOTH)}/>` },
    "o-vuilnisbak": { vb: [140, 150], svg: `<path d="M20 30 L120 30 L112 146 L28 146 Z" ${f(CLOTH)}/><rect x="10" y="16" width="120" height="16" rx="4" ${f(BLACK)}/><path d="M50 50 L50 130 M70 50 L70 130 M90 50 L90 130" fill="none" ${S}/>` },
    "o-celdeur": { vb: [260, 250], svg: `<rect x="4" y="4" width="252" height="246" ${f("#bdbdbd")}/><rect x="20" y="20" width="220" height="230" ${f(CLOTH)}/>` + [0, 1, 2, 3].map((i) => `<circle cx="32" cy="${40 + i * 60}" r="3.5" fill="#222"/><circle cx="228" cy="${40 + i * 60}" r="3.5" fill="#222"/>`).join("") + `<rect x="200" y="120" width="18" height="44" rx="4" ${f(BLACK)}/>` },
    "o-luikje": { vb: [120, 40], svg: `<rect x="2" y="2" width="116" height="36" ${f(BLACK)}/><rect x="10" y="10" width="100" height="20" fill="#666"/>` },
    "o-zon": { vb: [120, 80], svg: `<circle cx="60" cy="48" r="26" ${f("#fff")}/>` + Array.from({ length: 9 }, (_, i) => { const a = Math.PI + (i * Math.PI) / 8; return `<path d="M${60 + Math.cos(a) * 34} ${48 + Math.sin(a) * 34} L${60 + Math.cos(a) * 46} ${48 + Math.sin(a) * 46}" ${S}/>`; }).join("") + `<path d="M0 78 L120 78" ${S}/>` },
    "o-monitor": { vb: [420, 260], svg: `<rect x="4" y="4" width="412" height="220" rx="8" ${f(BLACK)}/><rect x="16" y="16" width="388" height="196" fill="#fff" ${S}/>` +
        Array.from({ length: 9 }, (_, i) => `<path d="M16 ${36 + i * 20} L404 ${36 + i * 20}" stroke="#ccc" stroke-width="1.5"/>`).join("") + [80, 160, 240, 320].map((x) => `<path d="M${x} 16 L${x} 212" stroke="#ccc" stroke-width="1.5"/>`).join("") +
        `<rect x="160" y="96" width="80" height="20" fill="#ddd"/><path d="M190 224 L182 256 L238 256 L230 224" ${f(CLOTH)}/>` },
    "o-rook": { vb: [220, 180], svg: [[60, 120, 50], [110, 90, 60], [160, 120, 48], [90, 60, 40], [150, 50, 36]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#e2e2e2" opacity=".85" stroke="#999" stroke-width="2"/>`).join("") },
    "o-envelop": { vb: [280, 170], svg: `<rect x="40" y="2" width="200" height="120" ${f("#fff")}/><path d="M60 26 L220 26 M60 44 L200 44 M60 62 L210 62" stroke="#bbb" stroke-width="4"/><rect x="4" y="60" width="272" height="106" ${f(LIGHT)}/><path d="M4 60 L140 128 L276 60" fill="none" ${S}/>` },
    "o-ziekenhuisbed": { vb: [360, 140], svg: `<rect x="4" y="40" width="352" height="40" rx="6" ${f("#fff")}/><path d="M10 80 L10 130 M350 80 L350 130 M4 20 L4 80 M356 30 L356 80" ${S}/><circle cx="20" cy="132" r="6" ${f(CLOTH)}/><circle cx="340" cy="132" r="6" ${f(CLOTH)}/><path d="M300 0 L300 40 M286 4 L314 4" ${S}/><rect x="292" y="8" width="16" height="22" rx="3" ${f(LIGHT)}/>` },
    "o-deur": { vb: [130, 680], svg: `<rect x="4" y="4" width="122" height="672" ${f(LIGHT)}/><path d="M126 4 L100 30 L100 650 L126 676" ${f(CLOTH)}/><circle cx="108" cy="360" r="5" fill="#222"/>` },
    "o-markering": { vb: [60, 60], svg: `<circle cx="30" cy="30" r="26" fill="none" stroke="#222" stroke-width="3" stroke-dasharray="6 5"/>` }
  };

  window.ASSETS = A;

  // Welke laag welk asset gebruikt. Groepen (crowd) herhalen één persoon.
  window.ASSET_MAP = {
    spiegel: "o-spiegel", mark: "p-mark-pak", oog: "o-blauw-oog", koffie: "o-koffie", "oog-groot": "o-oog", "collega-persoon": "p-collega",
    prepaid: "o-prepaid", "loods-achtergrond": "o-loods", "groep-eigen": "p-hool-achter", "mark-capuchon": "p-mark-capuchon", "groep-tegenover": "p-hool-masker",
    hartslag: "o-hart",
    vader: "p-man", wieg: "o-wieg", terugkomers: "p-hool-voor", "mark-13": "p-mark-jong", stadion: "o-stadion", "mark-kuip": "p-mark-jong", "jeroen-kuip": "p-jeroen-jong",
    "oudere-jongens": "p-hool-voor", tafel: "o-tafel", "mark-kroeg": "p-mark-jong",
    "krant-pagina": "o-krant", "handen-vader": "o-handen",
    fluisteraars: "p-jeroen-jong", "mark-rent": "p-mark-capuchon", "jeroen-opgepakt": "p-jeroen-jong", agent: "p-agent", "vader-jeroen": "p-man", "jeroen-bureau": "p-jeroen-jong",
    treinraam: "o-treinraam", "jonge-kern": "p-hool-voor", "vuilnisbak-object": "o-vuilnisbak", "mark-verstopt": "p-gehurkt", celdeur: "o-celdeur", luikje: "o-luikje", veertig: "p-zomer", zon: "o-zon",
    monitor: "o-monitor", "mark-pak": "p-mark-pak", schilden: "p-me", rook: "o-rook", "mark-voor": "p-mark-capuchon", "telefoon-ziek": "o-telefoon",
    "wieg-bed": "o-wieg-boven", baby: "o-baby", envelop: "o-envelop", bed: "o-ziekenhuisbed", "mark-bed": "p-liggend", bezoek: "p-hool-voor", rouw: "p-rouw", "ruud-persoon": "p-man",
    deur: "o-deur", zoon: "p-zoon", "telefoon-zoon": "o-telefoon", "scherm-zoon-groot": "o-telefoon-groot", "prepaid-mark": "o-prepaid", "jeroen-43": "p-jeroen-43", dochter: "p-kind",
    "tribune-mensen": "p-supporter", "mark-tribune": "o-markering"
  };

  // Plaatst een asset passend in een vak (w x h): op schaal, gecentreerd, onderaan uitgelijnd.
  window.assetFit = function (key, w, h) {
    const a = A[key]; if (!a) return null;
    const s = Math.min(w / a.vb[0], h / a.vb[1]);
    return { s, x: (w - a.vb[0] * s) / 2, y: h - a.vb[1] * s };
  };

  // Rijen voor een groep: geeft vakjes terug (x, y, w, h), achterste rij eerst.
  window.crowdCells = function (w, h, n) {
    const rows = n > 12 ? 3 : n > 6 ? 2 : 1, per = Math.ceil(n / rows), cells = [];
    for (let row = rows - 1; row >= 0; row--) {
      const scale = 1 - row * 0.12, cw = (w / per) * scale, ch = (rows > 1 ? (h / rows) * 1.35 : h) * scale;
      const y = h - ch - row * (h - (h / rows) * 1.35) / Math.max(1, rows - 1);
      for (let i = 0; i < per; i++) cells.push({ x: (w / per) * i + (w / per - cw) / 2 + (row % 2 ? w / per / 4 : 0), y, w: cw, h: ch });
    }
    return cells;
  };
})();
