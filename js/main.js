/*
  Hooligan-scrollytelling – opzet 2
  - Je scrolt omlaag, het verhaal schuift omhoog (GSAP ScrollTrigger, gepind).
  - Per hoofdstuk: laadt assets/svg/<id>.svg uit Figma, anders een storyboard-placeholder.
  - Panelen komen los binnen en schuiven op hun plek; daarna ballonnen en captions.
  - Het jaartal linksboven telt mee (2026 → 1996 → 2026).
  - Lagen met fx "pulse" kloppen als een hart, "shake" trilt (zoals een telefoon).
*/
(async function () {
  gsap.registerPlugin(ScrollTrigger);
  const NS = "http://www.w3.org/2000/svg";
  const track = document.getElementById("track");
  const yearEl = document.getElementById("year");
  const labelEl = document.getElementById("label");
  const fill = document.getElementById("timelineFill");
  const ticks = document.getElementById("ticks");
  const outsideEl = document.getElementById("outside");
  const outsideWho = document.getElementById("outsideWho");
  const outsideText = document.getElementById("outsideText");

  /* ---------- 1. SVG per hoofdstuk: Figma-export of placeholder ---------- */
  async function loadFigmaSvg(id) {
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

  function wrapText(parent, text, x, y, w, size) {
    const perLine = Math.max(6, Math.floor(w / (size * 0.52)));
    const lines = []; let cur = "";
    for (const wd of text.split(" ")) { if ((cur + " " + wd).trim().length > perLine) { lines.push(cur.trim()); cur = wd; } else cur += " " + wd; }
    lines.push(cur.trim());
    const t = el("text", { x, y, class: "ph-text", "font-size": size }, parent);
    lines.forEach((ln, i) => { const s = el("tspan", { x, dy: i === 0 ? size : size * 1.2 }, t); s.textContent = ln; });
  }

  // Grootste lettergrootte waarbij de tekst in het vak past
  const textSize = (l) => {
    const avail = (l.type === "bubble" ? l.h - 14 : l.h) - 14;
    for (let size = 26; size > 11; size--) {
      const perLine = Math.max(6, Math.floor((l.w - 28) / (size * 0.52)));
      let lines = 1, cur = 0;
      for (const wd of l.text.split(" ")) { if (cur && cur + 1 + wd.length > perLine) { lines++; cur = wd.length; } else cur += (cur ? 1 : 0) + wd.length; }
      if (lines * size * 1.2 <= avail) return size;
    }
    return 12;
  };

  function placeholderSvg(scene) {
    const svg = el("svg", { viewBox: "0 0 1440 900" });
    if (scene.word) { const w = el("text", { x: 1360, y: 62, "text-anchor": "end", class: "ph-word", id: "woord" }, svg); w.textContent = scene.word; }
    for (const p of scene.panels) {
      // Buitenste <g> draagt de id (zoals in een Figma-export), binnenste de positie
      const g = el("g", { transform: `translate(${p.x} ${p.y})` }, el("g", { id: p.name }, svg));
      el("rect", { width: p.w, height: p.h, class: p.dark ? "ph-panel ph-dark" : "ph-panel" }, g);
      for (const l of p.layers) {
        const lg = el("g", { transform: `translate(${l.x} ${l.y})` }, el("g", { id: l.name }, g));
        const key = window.ASSET_MAP && window.ASSET_MAP[l.name];
        if (key && window.ASSETS[key]) {
          // Eerste versie van het asset (zelfde tekening als het Figma-component)
          const a = window.ASSETS[key];
          const cells = l.type === "crowd" ? window.crowdCells(l.w, l.h, l.n || 5) : [{ x: 0, y: 0, w: l.w, h: l.h }];
          lg.innerHTML = cells.map((c) => { const fit = window.assetFit(key, c.w, c.h);
            const mist = c.row ? ` opacity="${window.crowdMist(c.row)}"` : "";
            return `<g transform="translate(${c.x + fit.x} ${c.y + fit.y}) scale(${fit.s})"${mist}>${a.svg}</g>`; }).join("");
        } else lg.innerHTML = window.shapeSVG(l);
        if (l.text) { wrapText(lg, l.text, 14, 8, l.w - 28, textSize(l)); if (l.dark) lg.classList.add("on-dark"); }
        else if (!key && (l.type === "object" || l.type === "round")) { const lab = el("text", { x: 8, y: 18, class: "ph-label" }, lg); lab.textContent = l.name; }
      }
    }
    return svg;
  }

  const chapters = await Promise.all(SCENES.map(async (scene) => {
    const sec = document.createElement("section");
    sec.className = "chapter"; sec.dataset.id = scene.id;
    const svg = (await loadFigmaSvg(scene.id)) || placeholderSvg(scene);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.removeAttribute("width"); svg.removeAttribute("height");
    // Ontwerpnotities uit Figma (camera-aanwijzingen) niet tonen
    svg.querySelectorAll('[id^="notitie"]').forEach((n) => (n.style.display = "none"));
    sec.appendChild(svg); track.appendChild(sec);
    return { scene, svg };
  }));

  /* ---------- 2. Tijdlijn onderaan ---------- */
  const tickEls = SCENES.map((s, i) => {
    const t = document.createElement("div");
    t.className = "tick"; t.style.left = (i / (SCENES.length - 1)) * 100 + "%";
    t.textContent = s.id.slice(3);
    ticks.appendChild(t); return t;
  });

  /* ---------- 3. Hoofdtijdlijn (gescrubd door scroll) ---------- */
  const yearObj = { v: SCENES[0].year };
  const renderYear = () => { yearEl.textContent = Math.round(yearObj.v); };
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  const starts = [];
  const rand = (a) => gsap.utils.random(-a, a);

  chapters.forEach(({ scene, svg }, i) => {
    const q = (sel) => { try { return svg.querySelector("#" + CSS.escape(sel)); } catch (e) { return null; } };
    const panels = scene.panels.map((p) => q(p.name)).filter(Boolean);
    const texts = scene.panels.flatMap((p) => p.layers.filter((l) => l.text).map((l) => q(l.name))).filter(Boolean);
    const word = q("woord");

    const mode = scene.transition || "assemble";
    if (i > 0) {
      // Hoe meer jaren ertussen, hoe langer de overgang: zo voel je de tijd
      const gap = Math.abs(scene.year - SCENES[i - 1].year);
      const moveDur = mode === "cut" || mode === "beat" ? 0.05 : 0.8 + Math.min(2.2, gap * 0.08);
      tl.addLabel("move" + i);
      tl.to(track, { y: () => -i * window.innerHeight, duration: moveDur, ease: mode === "cut" || mode === "beat" ? "none" : "power2.inOut" }, "move" + i);
      tl.to(yearObj, { v: scene.year, duration: Math.max(moveDur, 0.05), ease: "none", onUpdate: renderYear }, "move" + i);
      starts.push(tl.duration() - moveDur / 2); // label wisselt halverwege de overgang
    } else starts.push(0);

    // Panelen binnen laten komen, per sfeer anders
    if (panels.length && i > 0) {
      gsap.set(panels, { transformOrigin: "50% 50%" });
      if (mode === "assemble") tl.fromTo(panels,
        { opacity: 0, x: () => rand(200), y: () => rand(140) + 60, rotation: () => rand(7), scale: 0.9 },
        { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 0.5, stagger: 0.25 }, ">-0.2");
      if (mode === "slow") tl.fromTo(panels, { opacity: 0 }, { opacity: 1, duration: 0.9, stagger: 0.45, ease: "power1.inOut" }, ">-0.1");
      if (mode === "beat") tl.fromTo(panels, { opacity: 0 }, { opacity: 1, duration: 0.01, stagger: 0.7, ease: "none" }, ">"); // harde cuts, paneel voor paneel
      if (mode === "shock") tl.fromTo(panels, { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.18, stagger: 0.12, ease: "power4.out" }, ">");
      // "cut": panelen staan er meteen
    }
    if (texts.length && i > 0 && mode !== "beat") tl.fromTo(texts, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: mode === "slow" ? 0.6 : 0.3, stagger: mode === "slow" ? 0.5 : 0.28 });
    if (word) {
      gsap.set(word, { transformOrigin: "100% 100%" });
      tl.fromTo(word, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" });
    }
    tl.to({}, { duration: 0.5 * (scene.duration || 1) }); // even blijven staan

    // Doorlopende effecten (los van de scroll)
    scene.panels.forEach((p) => p.layers.forEach((l) => {
      const n = q(l.name); if (!n || !l.fx) return;
      gsap.set(n, { transformOrigin: "50% 50%", transformBox: "fill-box" });
      if (l.fx === "pulse") gsap.to(n, { scale: 1.12, duration: 0.35, repeat: -1, yoyo: true, ease: "power1.inOut", repeatDelay: 0.25 });
      if (l.fx === "shake") gsap.to(n, { x: "+=4", duration: 0.05, repeat: -1, yoyo: true, repeatDelay: 1.6, ease: "none" });
    }));
  });

  /* ---------- 4. Koppelen aan scroll ---------- */
  const total = tl.duration();
  ScrollTrigger.create({
    animation: tl,
    trigger: "#pin",
    pin: true,
    scrub: 1,
    start: "top top",
    end: () => "+=" + total * window.innerHeight * 1.1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      document.getElementById("hint").style.opacity = self.progress > 0.02 ? 0 : 1;
    }
  });

  // Label, tijdlijn en jaartal volgen de (vertraagde) animatie zelf
  let last = -1;
  tl.eventCallback("onUpdate", () => {
    const t = tl.time();
    let cur = 0; starts.forEach((s, i) => { if (t >= s) cur = i; });
    fill.style.width = (t / total) * 100 + "%";
    if (cur === last) return; last = cur;
    labelEl.textContent = SCENES[cur].label || "";
    const o = SCENES[cur].outside;
    gsap.to(outsideEl, { opacity: 0, duration: 0.15, overwrite: true, onComplete: () => {
      if (!o) return;
      outsideWho.textContent = o.who; outsideText.textContent = "\u201C" + o.text + "\u201D";
      gsap.to(outsideEl, { opacity: 1, duration: 0.4, overwrite: true });
    }});
    document.body.classList.toggle("is-dark", !!SCENES[cur].panels.some((p) => p.dark && p.w >= 1440));
    tickEls.forEach((el, i) => el.classList.toggle("done", i <= cur));
  });
  renderYear();
})();
