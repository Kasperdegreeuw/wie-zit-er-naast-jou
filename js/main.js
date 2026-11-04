/*
  Hooligan-scrollytelling
  - Je scrolt omlaag, het verhaal schuift omhoog (GSAP ScrollTrigger, gepind).
  - Per scène: laadt assets/svg/<id>.svg uit Figma, anders een storyboard-placeholder.
  - Tussen scènes met een ander jaar: een tijdlijn (liniaal met jaren en Marks leeftijd) die voorbijschuift.
  - Guided view: de camera gaat paneel voor paneel (leesvolgorde), daarna zoomt hij uit naar de hele pagina.
  - Het jaartal linksboven telt mee (2026 → 1996 → 2026).
  - Lagen met fx "pulse" kloppen als een hart, "shake" trilt (zoals een telefoon).
*/
(async function () {
  gsap.registerPlugin(ScrollTrigger);
  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // minder beweging: geen lussen, camera springt
  const NS = "http://www.w3.org/2000/svg";
  const track = document.getElementById("track");
  const yearEl = document.getElementById("year");
  const labelEl = document.getElementById("label");

  /* ---------- 1. SVG per hoofdstuk: Figma-export of placeholder ---------- */
  // assets/svg/index.json somt de geëxporteerde scènes op, zodat we geen bestanden opvragen die er niet zijn (geen 404's)
  const figmaIds = await fetch("assets/svg/index.json", { cache: "no-store" }).then((r) => (r.ok ? r.json() : [])).catch(() => []);
  async function loadFigmaSvg(id) {
    if (!figmaIds.includes(id)) return null;
    try {
      const res = await fetch(`assets/svg/${id}.svg`, { cache: "no-store" });
      if (!res.ok) return null;
      let txt = await res.text();
      // Figma geeft elke export dezelfde clip-/filter-ID's: maak ze uniek per hoofdstuk
      txt = txt.replace(/\b(id="|url\(#|href="#)((?:clip|filter|paint|mask|pattern|image)\d[^"\)]*)/g, `$1${id}-$2`);
      const svg = new DOMParser().parseFromString(txt, "image/svg+xml").documentElement;
      return svg.nodeName === "svg" ? document.importNode(svg, true) : null;
    } catch (e) { return null; }
  }

  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };

  function wrapText(parent, text, x, y, w, size, cw = 0.54, lh = 1.3) {
    const perLine = Math.max(6, Math.floor(w / (size * cw)));
    const lines = []; let cur = "";
    for (const wd of text.split(" ")) { if ((cur + " " + wd).trim().length > perLine) { lines.push(cur.trim()); cur = wd; } else cur += " " + wd; }
    lines.push(cur.trim());
    const t = el("text", { x, y, class: "ph-text", "font-size": size }, parent);
    lines.forEach((ln, i) => { const s = el("tspan", { x, dy: i === 0 ? size : size * lh }, t); s.textContent = ln; });
  }

  // Grootste lettergrootte waarbij de tekst in het vak past
  const textSize = (l) => {
    const avail = (l.type === "bubble" ? l.h - 14 : l.h) - 14;
    for (let size = l.type === "bubble" ? 24 : 22; size > 13; size--) {
      const perLine = Math.max(6, Math.floor((l.w - 36) / (size * 0.54)));
      let lines = 1, cur = 0;
      for (const wd of l.text.split(" ")) { if (cur && cur + 1 + wd.length > perLine) { lines++; cur = wd.length; } else cur += (cur ? 1 : 0) + wd.length; }
      if (lines * size * 1.3 <= avail) return size;
    }
    return 14;
  };

  const fitHeight = (l) => {
    const size = textSize(l), perLine = Math.max(6, Math.floor((l.w - 36) / (size * 0.54)));
    let lines = 1, cur = 0;
    for (const wd of l.text.split(" ")) { if (cur && cur + 1 + wd.length > perLine) { lines++; cur = wd.length; } else cur += (cur ? 1 : 0) + wd.length; }
    return Math.min(l.h, Math.round(lines * size * 1.3 + 26 + (l.type === "bubble" ? 14 : 0)));
  };

  // Losse koppen echt opmeten (na het laden van het lettertype) en zo nodig verkleinen of over twee regels zetten
  const fitLayers = [];
  function fitText({ lg, l }) {
    const t = lg.querySelector("text"); if (!t) return;
    const lh = l.bold ? 0.98 : 1.4;
    let size = l.size || 24;
    const rebuild = (lines) => { t.innerHTML = ""; lines.forEach((ln, i) => { const s = el("tspan", { x: t.getAttribute("x"), dy: i === 0 ? size : size * lh }, t); s.textContent = ln; }); t.setAttribute("font-size", size); };
    const width = () => Math.max(...[...t.querySelectorAll("tspan")].map((n) => n.getComputedTextLength()));
    const words = l.text.split(" ");
    for (; size >= 12; size -= 2) {
      // eerst één regel proberen, dan zo gelijk mogelijk over twee regels
      rebuild([l.text]);
      if (width() <= l.w && size <= l.h) return;
      if (size * (1 + lh) <= l.h + size * 0.2) {
        let best = null; // de meest gelijke verdeling over twee regels
        for (let k = 1; k < words.length; k++) { rebuild([words.slice(0, k).join(" "), words.slice(k).join(" ")]); const w = width(); if (w <= l.w && (!best || w < best.w)) best = { k, w }; }
        if (best) { rebuild([words.slice(0, best.k).join(" "), words.slice(best.k).join(" ")]); return; }
      }
    }
  }

  function placeholderSvg(scene) {
    const svg = el("svg", { viewBox: "0 0 1440 900" });
    if (scene.word) { const w = el("text", { x: 1360, y: 62, "text-anchor": "end", class: "ph-word", id: "woord" }, svg); w.textContent = scene.word; }
    for (const p of scene.panels) {
      // Buitenste <g> draagt de id (zoals in een Figma-export), binnenste de positie
      const g = el("g", { transform: `translate(${p.x} ${p.y})` }, el("g", { id: p.name }, svg));
      if (p.herinnering) g.classList.add("is-herinnering");
      if (!p.plain) el("rect", { width: p.w, height: p.h, class: p.dark ? "ph-panel ph-dark" : "ph-panel" }, g);
      for (const l of p.layers) {
        const lg = el("g", { transform: `translate(${l.x} ${l.y})` }, el("g", { id: l.name }, g));
        if (p.herinnering && !l.text) lg.classList.add("vaag"); // figuren in een herinnering lichter, tekst niet
        const key = window.ASSET_MAP && window.ASSET_MAP[l.name];
        if (key && window.ASSETS[key]) {
          // Eerste versie van het asset (zelfde tekening als het Figma-component)
          const a = window.ASSETS[key];
          const cells = l.type === "crowd" ? window.crowdCells(l.w, l.h, l.n || 5) : [{ x: 0, y: 0, w: l.w, h: l.h }];
          // swap: { celnummer: asset } zet één persoon in een groep (bijv. Mark en zijn zoon op de tribune)
          lg.innerHTML = cells.map((c, ci) => { const k = (l.swap && l.swap[ci]) || key; const fit = window.assetFit(k, c.w, c.h);
            const mist = c.row ? ` opacity="${window.crowdMist(c.row)}"` : "";
            return `<g transform="translate(${c.x + fit.x} ${c.y + fit.y}) scale(${fit.s})"${mist}>${window.ASSETS[k].svg}</g>`; }).join("");
        } else if (l.type !== "text") {
          // Kaders en ballonnen zo hoog als de tekst (geen lege ruimte onderin)
          const fitted = l.text && (l.type === "caption" || l.type === "bubble") ? Object.assign({}, l, { h: fitHeight(l) }) : l;
          lg.innerHTML = window.shapeSVG(fitted);
        }
        if (l.type === "text") { // los type, zonder kader
          const fitOne = l.fit; // fit: op één regel als het kan, anders krimpen tot het past
          wrapText(lg, l.text, l.center ? l.w / 2 : 0, 0, fitOne ? 99999 : l.w, l.size || 24, l.bold ? 0.42 : 0.54, l.bold ? 0.98 : 1.4);
          if (l.center) lg.querySelector("text").setAttribute("text-anchor", "middle");
          if (fitOne) fitLayers.push({ lg, l });
          lg.classList.add("ph-los"); if (l.bold) lg.classList.add("is-bold"); if (l.c === "muted") lg.classList.add("is-muted"); if (l.c === "ink") lg.classList.add("is-ink");
        } else if (l.text) { wrapText(lg, l.text, 18, 12, l.w - 36, textSize(l)); if (l.dark) lg.classList.add("on-dark"); }
        else if (!key && (l.type === "object" || l.type === "round")) { const lab = el("text", { x: 8, y: 18, class: "ph-label" }, lg); lab.textContent = l.name; }
      }
    }
    return svg;
  }

  /* Tijdlijn tussen scènes: een verticale liniaal. Elk jaar een streep, het jaartal en Marks leeftijd. */
  const STEP = 190; // pixels per jaar
  function rulerSvg(item) {
    const lo = Math.min(item.from, item.to), hi = Math.max(item.from, item.to);
    const svg = el("svg", { viewBox: "0 0 1440 900" });
    const g = el("g", { id: "liniaal" }, svg);
    el("rect", { x: 718, y: -STEP, width: 4, height: (hi - lo + 2) * STEP, class: "tl-lijn" }, g);
    const marks = [];
    const sceneYears = new Set(SCENES.map((s) => s.year));
    for (let y = lo; y <= hi; y++) {
      const yy = (y - lo) * STEP;
      const m = el("g", { transform: `translate(0 ${yy})` }, g);
      if (sceneYears.has(y)) el("circle", { cx: 720, cy: 0, r: 12, class: "tl-punt" }, m);
      else el("rect", { x: 700, y: -2, width: 40, height: 4, class: "tl-streep" }, m);
      const t = el("text", { x: 772, y: 40, class: "tl-jaar" }, m); t.textContent = y;
      const a = el("text", { x: 776, y: 74, class: "tl-leeftijd" }, m); a.textContent = `Mark is ${y - window.MARK_GEBOREN}`;
      marks.push({ y, m });
    }
    el("path", { d: "M650 450 L680 436 L680 464 Z", class: "tl-nu" }, svg); // het 'nu'
    item.ruler = { g, marks, lo };
    return svg;
  }

  // Scènes en tijdlijnen achter elkaar
  const ITEMS = [];
  SCENES.forEach((s, i) => {
    const prev = SCENES[i - 1];
    if (prev && prev.year !== s.year) ITEMS.push({ tijd: true, id: `tijd-${prev.year}-${s.year}`, from: prev.year, to: s.year, year: s.year, label: "", panels: [] });
    ITEMS.push(s);
  });

  const chapters = await Promise.all(ITEMS.map(async (scene) => {
    const sec = document.createElement("section");
    sec.className = scene.tijd ? "chapter tijd" : "chapter"; sec.dataset.id = scene.id;
    const svg = scene.tijd ? rulerSvg(scene) : (await loadFigmaSvg(scene.id)) || placeholderSvg(scene);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.removeAttribute("width"); svg.removeAttribute("height");
    // Ontwerpnotities uit Figma (camera-aanwijzingen) niet tonen
    svg.querySelectorAll('[id^="notitie"]').forEach((n) => (n.style.display = "none"));
    sec.appendChild(svg); track.appendChild(sec);
    return { scene, svg };
  }));

  /* Tekstversie voor schermlezers: alle captions en ballonnen in leesvolgorde, per scène een kop.
     De tekeningen (SVG) en het jaartal linksboven slaat een schermlezer over. */
  chapters.forEach(({ svg }) => svg.setAttribute("aria-hidden", "true"));
  document.querySelector(".hud").setAttribute("aria-hidden", "true");
  document.getElementById("hint").setAttribute("aria-hidden", "true");
  const sr = document.createElement("article");
  sr.className = "sr-only";
  SCENES.forEach((scene) => {
    // per paneel: eerst plaats en tijd (lagen plek-…), dan de rest in laagvolgorde
    const teksten = scene.panels.flatMap((p) => { const ls = p.layers.filter((l) => l.text && !l.name.startsWith("notitie")); return [...ls.filter((l) => l.name.startsWith("plek")), ...ls.filter((l) => !l.name.startsWith("plek"))].map((l) => l.text); });
    if (scene.hud === false && scene.id === SCENES[0].id) {
      const h = document.createElement("h1"); h.textContent = teksten.shift(); sr.appendChild(h);
    } else {
      const h = document.createElement("h2"); h.textContent = scene.hud === false ? "Tot slot" : scene.year + (scene.label ? ", " + scene.label : ""); sr.appendChild(h);
    }
    teksten.forEach((t) => { const p = document.createElement("p"); p.textContent = t; sr.appendChild(p); });
  });
  document.body.prepend(sr);

  /* ---------- 3. Hoofdtijdlijn (gescrubd door scroll) ---------- */
  const yearObj = { v: SCENES[0].year };
  // Positie in hoofdstukken (0 = eerste). Alleen de twee hoofdstukken rond de positie worden getekend.
  const secs = chapters.map((c) => c.svg.parentNode);
  const posObj = { v: 0 };
  const applyPos = () => {
    const p = posObj.v;
    secs.forEach((sec, i) => {
      const d = i - p;
      const show = d > -1 && d < 1;
      if (show) sec.style.transform = `translate3d(0, ${(d * 100).toFixed(3)}%, 0)`;
      if (sec._show !== show) { sec.style.visibility = show ? "visible" : "hidden"; sec._show = show; }
    });
    // Jaartal en label vervagen terwijl de strip eronder doorschuift, en komen terug als hij stilstaat
    const hudOp = Math.max(0, 1 - Math.abs(p - Math.round(p)) * 20).toFixed(3);
    yearEl.style.opacity = hudOp; labelEl.style.opacity = hudOp;
  };
  const fxByChapter = chapters.map(() => []);
  const renderYear = () => { yearEl.textContent = Math.round(yearObj.v); };
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  const starts = [];
  const volStart = {}; // per hoofdstuk: tijd waarop een schermvullend (zwart) paneel begint

  chapters.forEach(({ scene, svg }, i) => {
    const q = (sel) => { try { return svg.querySelector("#" + CSS.escape(sel)); } catch (e) { return null; } };
    const panels = scene.panels.map((p) => q(p.name)).filter(Boolean);
    const texts = scene.panels.flatMap((p) => p.layers.filter((l) => l.text).map((l) => q(l.name))).filter(Boolean);
    const word = q("woord");

    const mode = scene.tijd ? "slow" : scene.transition || "assemble";
    if (i > 0) {
      const moveDur = mode === "cut" || mode === "beat" ? 0.05 : 0.8;
      tl.addLabel("move" + i);
      tl.to(posObj, { v: i, duration: moveDur, ease: mode === "cut" || mode === "beat" ? "none" : "power2.inOut", onUpdate: applyPos }, "move" + i);
      if (!scene.tijd) tl.to(yearObj, { v: scene.year, duration: Math.max(moveDur, 0.05), ease: "none", onUpdate: renderYear }, "move" + i);
      starts.push(tl.duration() - moveDur / 2); // label wisselt halverwege de overgang
    } else starts.push(0);

    // TIJDLIJN: de liniaal schuift langs het 'nu', jaar voor jaar. Hoe meer jaren, hoe langer.
    if (scene.tijd) {
      const r = scene.ruler, cur = { v: scene.from };
      const apply = () => {
        r.g.setAttribute("transform", `translate(0 ${450 - (cur.v - r.lo) * STEP})`);
        r.marks.forEach(({ y, m }) => { const d = Math.abs(y - cur.v); m.setAttribute("opacity", Math.max(0.18, 1 - d * 0.4).toFixed(2)); });
        yearObj.v = cur.v; renderYear();
      };
      apply();
      const gap = Math.abs(scene.to - scene.from);
      // korter dan voorheen (v27): de tijdlijn mag voelbaar terugspoelen, maar geen kwart van de scroll innemen
      tl.to({}, { duration: 0.15 });
      tl.to(cur, { v: scene.to, duration: 0.5 + Math.min(1.2, gap * 0.06), ease: "power1.inOut", onUpdate: apply });
      tl.to({}, { duration: 0.35 });
      return;
    }

    // GUIDED VIEW: de camera gaat paneel voor paneel, in leesvolgorde.
    // Je ziet steeds één moment groot; daarna zoomt hij uit naar de hele pagina.
    const camDur = RM ? 0.01 : { slow: 0.9, assemble: 0.6, shock: 0.25, beat: 0.01, cut: 0.01 }[mode] || 0.6;
    const camEase = { slow: "sine.inOut", assemble: "power2.inOut", shock: "power4.out", beat: "none", cut: "none" }[mode] || "power2.inOut";
    const guided = i > 0 && panels.length > 1;
    const textsOf = (p) => p.layers.filter((l) => l.text).map((l) => q(l.name)).filter(Boolean);
    if (guided) {
      // Alles behalve het grote woord in een camera-groep
      const cam = document.createElementNS(NS, "g"); cam.setAttribute("class", "cam");
      [...svg.childNodes].forEach((n) => { if (n.id !== "woord" && n.nodeName !== "defs") cam.appendChild(n); });
      svg.insertBefore(cam, word || null);
      const camObj = { s: 1, x: 0, y: 0 };
      const applyCam = () => cam.setAttribute("transform", `translate(${camObj.x} ${camObj.y}) scale(${camObj.s})`);
      // Paneel passend in het beeld tussen jaartal (boven) en tijdlijn (onder)
      // vol: het paneel vult het hele scherm (zoals het zwart in 03); anders passend tussen jaartal en onderrand
      const fit = (p) => { const s = p.vol ? Math.max(1440 / p.w, 900 / p.h) : Math.min(1280 / p.w, 700 / p.h, 2.4); return { s, x: 720 - s * (p.x + p.w / 2), y: (p.vol ? 450 : 455) - s * (p.y + p.h / 2) }; };
      const scenePanels = scene.panels.filter((p) => q(p.name));
      Object.assign(camObj, fit(scenePanels[0])); applyCam();
      gsap.set(panels, { opacity: 0 }); gsap.set(panels[0], { opacity: 1 });
      scenePanels.forEach((p, j) => {
        if (j > 0) {
          tl.addLabel(`c${i}-${j}`);
          tl.to(camObj, { ...fit(p), duration: camDur, ease: camEase, onUpdate: applyCam }, `c${i}-${j}`);
          tl.to(panels[j - 1], { opacity: 0.12, duration: Math.max(camDur, 0.01), ease: "none" }, `c${i}-${j}`);
          tl.to(panels[j], { opacity: 1, duration: Math.max(camDur * 0.6, 0.01), ease: "none" }, `c${i}-${j}`);
          if (p.vol) volStart[i] = tl.labels[`c${i}-${j}`];
        }
        const tx = textsOf(p);
        if (tx.length && mode !== "beat") tl.fromTo(tx, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.4 });
        tl.to({}, { duration: 0.45 }); // even lezen
      });
      // Uitzoomen naar de hele pagina: nu zie je de stripbladzijde als geheel (niet als de scène op één paneel eindigt)
      if (scene.uitzoomen !== false) {
        tl.addLabel(`uit${i}`);
        tl.to(camObj, { s: 1, x: 0, y: 0, duration: mode === "beat" ? 0.01 : 0.9, ease: "power2.inOut", onUpdate: applyCam }, `uit${i}`);
        tl.to(panels, { opacity: 1, duration: mode === "beat" ? 0.01 : 0.6, ease: "none" }, `uit${i}`);
      }
    } else if (panels.length && i > 0) {
      tl.fromTo(panels, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power1.inOut" }, ">-0.1");
      if (texts.length) tl.fromTo(texts, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.45 });
    }
    if (word) {
      gsap.set(word, { transformOrigin: "100% 100%" });
      tl.fromTo(word, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" });
    }
    tl.to({}, { duration: 0.4 * (scene.duration || 1) }); // even blijven staan

    // Doorlopende effecten (los van de scroll)
    scene.panels.forEach((p) => p.layers.forEach((l) => {
      const n = q(l.name); if (!n || !l.fx || RM) return; // tijdlijnen hebben geen panelen
      gsap.set(n, { transformOrigin: "50% 50%", transformBox: "fill-box" });
      // Lussen draaien alleen in het hoofdstuk dat in beeld is
      if (l.fx === "pulse") fxByChapter[i].push(gsap.to(n, { scale: 1.12, duration: 0.35, repeat: -1, yoyo: true, ease: "power1.inOut", repeatDelay: 0.25, paused: true }));
      if (l.fx === "shake") fxByChapter[i].push(gsap.to(n, { x: "+=4", duration: 0.05, repeat: -1, yoyo: true, repeatDelay: 1.6, ease: "none", paused: true }));
    }));
  });

  /* ---------- 4. Koppelen aan scroll ---------- */
  const total = tl.duration();
  // Schermhoogtes scroll per seconde tijdlijn. 1,3 geeft ± 1,5 schermhoogte per paneel of tekst
  // (gangbaar is 1–3) en het hele verhaal in ± 4 minuten.
  const SCROLL_PER_SEC = 1.3;
  window.__story = { tl, starts, factor: SCROLL_PER_SEC }; // voor testen
  ScrollTrigger.create({
    animation: tl,
    trigger: "#pin",
    pin: true,
    scrub: 1,
    start: "top top",
    end: () => "+=" + total * window.innerHeight * SCROLL_PER_SEC,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      // Hint weg zodra je begint te scrollen, vóór de eerste scène inschuift
      document.getElementById("hint").style.opacity = self.progress * total > 0.2 ? 0 : 1;
    }
  });

  // Label, tijdlijn en jaartal volgen de (vertraagde) animatie zelf
  let last = -1;
  tl.eventCallback("onUpdate", () => {
    const t = tl.time();
    let cur = 0; starts.forEach((s, i) => { if (t >= s) cur = i; });
    // Schermvullend zwart: ook de randen van het scherm zwart, jaartal weg
    document.body.classList.toggle("is-zwart", volStart[cur] != null && t >= volStart[cur]);
    if (cur === last) return; last = cur;
    labelEl.textContent = ITEMS[cur].label || "";
    document.body.classList.toggle("is-tijd", !!ITEMS[cur].tijd || ITEMS[cur].hud === false);
    document.body.classList.toggle("is-einde", !!ITEMS[cur].einde);
    document.body.classList.toggle("is-dark", !!ITEMS[cur].panels.some((p) => p.dark && p.w >= 1440));
    fxByChapter.forEach((list, i) => list.forEach((tw) => (i === cur ? tw.play() : tw.pause())));
  });
  renderYear(); applyPos();
  const doFit = () => fitLayers.forEach(fitText);
  doFit();
  if (document.fonts) document.fonts.ready.then(() => { doFit(); ScrollTrigger.refresh(); });

  // Klein scherm: "Toch bekijken" haalt de melding weg
  const toch = document.getElementById("toch");
  if (toch) toch.addEventListener("click", () => document.body.classList.add("toch"));

  // Opnieuw beginnen: scherm vervaagt, je staat weer bij de titel
  const again = document.getElementById("opnieuw");
  if (again) again.addEventListener("click", () => {
    gsap.to("#pin", { opacity: 0, duration: RM ? 0 : 0.45, onComplete: () => {
      window.scrollTo(0, 0);
      tl.progress(0); ScrollTrigger.update();
      gsap.to("#pin", { opacity: 1, duration: RM ? 0 : 0.8, delay: 0.1 });
    }});
  });
  document.body.classList.toggle("is-tijd", ITEMS[0].hud === false);
  fxByChapter[0].forEach((tw) => tw.play());
})();
