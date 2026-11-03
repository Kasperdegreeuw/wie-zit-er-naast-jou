/*
  Ongestylde storyboard-vormen. Wordt gebruikt voor de placeholders in de code
  én (dezelfde functie) voor het bouwen van het Figma-bestand.
  Geeft SVG-markup terug in de lokale coördinaten van de laag (0,0 → w,h).
*/
window.shapeSVG = function shapeSVG(l) {
  const w = l.w, h = l.h, F = 'fill="#e4e4e4" stroke="#555" stroke-width="2"';
  const r = (n) => Math.round(n * 10) / 10;

  function person(x, y, pw, ph, opt = {}) {
    const hr = Math.min(pw * 0.22, ph * 0.11), cx = x + pw / 2, cy = y + hr + 2, sh = y + hr * 2 + 8;
    let s = `<path d="M${r(x + pw * 0.12)} ${r(y + ph)} L${r(x + pw * 0.12)} ${r(sh + hr)} Q${r(x + pw * 0.12)} ${r(sh)} ${r(x + pw * 0.32)} ${r(sh)} L${r(x + pw * 0.68)} ${r(sh)} Q${r(x + pw * 0.88)} ${r(sh)} ${r(x + pw * 0.88)} ${r(sh + hr)} L${r(x + pw * 0.88)} ${r(y + ph)} Z" ${F}/>`;
    s += `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(hr)}" ${F}/>`;
    if (opt.hood) s += `<path d="M${r(cx - hr * 1.35)} ${r(cy + hr * 1.1)} Q${r(cx - hr * 1.5)} ${r(cy - hr * 1.6)} ${r(cx)} ${r(cy - hr * 1.5)} Q${r(cx + hr * 1.5)} ${r(cy - hr * 1.6)} ${r(cx + hr * 1.35)} ${r(cy + hr * 1.1)}" fill="none" stroke="#555" stroke-width="2"/>`;
    if (opt.suit) s += `<path d="M${r(cx - pw * 0.12)} ${r(sh)} L${r(cx)} ${r(sh + ph * 0.18)} L${r(cx + pw * 0.12)} ${r(sh)}" fill="none" stroke="#555" stroke-width="2"/><path d="M${r(cx)} ${r(sh + 4)} L${r(cx)} ${r(sh + ph * 0.16)}" stroke="#555" stroke-width="${r(Math.max(2, pw * 0.04))}"/>`;
    return s;
  }

  switch (l.type) {
    case "person": return person(0, 0, w, h, { suit: l.suit });
    case "hood": return person(0, 0, w, h, { hood: true });
    case "crowd": {
      const n = l.n || 5, rows = n > 12 ? 3 : n > 6 ? 2 : 1, per = Math.ceil(n / rows);
      let s = "";
      for (let row = rows - 1; row >= 0; row--) {           // achterste rij eerst
        const scale = 1 - row * 0.12, pw = (w / per) * 0.9 * scale;
        const ph = (rows > 1 ? (h / rows) * 1.25 : h * 0.8) * scale;
        const y = h - ph - row * (h - h / rows * 1.25) / Math.max(1, rows - 1);
        for (let i = 0; i < per; i++) {
          const x = (w / per) * i + (w / per - pw) / 2 + (row % 2 ? w / per / 2 - pw / 2 : 0) * 0.5;
          s += person(x, y, pw, ph, { hood: (i + row) % 3 === 0 });
        }
      }
      return s;
    }
    case "phone":
      return `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="${r(Math.min(w, h) * 0.12)}" ${F}/>` +
        `<rect x="${r(w * 0.08)}" y="${r(h * 0.08)}" width="${r(w * 0.84)}" height="${r(h * 0.8)}" rx="4" fill="#fff" stroke="#555" stroke-width="1.5"/>`;
    case "round":
      return `<ellipse cx="${w / 2}" cy="${h / 2}" rx="${w / 2 - 1}" ry="${h / 2 - 1}" ${F}/>` +
        `<path d="M${r(w * 0.15)} ${r(h * 0.15)} L${r(w * 0.85)} ${r(h * 0.85)} M${r(w * 0.85)} ${r(h * 0.15)} L${r(w * 0.15)} ${r(h * 0.85)}" stroke="#999" stroke-width="1"/>`;
    case "bubble": {
      const bh = h - 14;
      return `<rect x="1" y="1" width="${w - 2}" height="${bh}" rx="16" fill="#fff" stroke="#333" stroke-width="2"/>` +
        `<path d="M24 ${bh} L18 ${h - 1} L44 ${bh}" fill="#fff" stroke="#333" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M26 ${bh - 1} L42 ${bh - 1}" stroke="#fff" stroke-width="3"/>`;
    }
    case "caption":
      return l.dark
        ? `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="#111" stroke="#111" stroke-width="2"/>`
        : `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="#fff" stroke="#333" stroke-width="2"/>`;
    default: // object
      return `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" ${F}/>` +
        `<path d="M1 1 L${w - 1} ${h - 1} M${w - 1} 1 L1 ${h - 1}" stroke="#aaa" stroke-width="1"/>`;
  }
};
