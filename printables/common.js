// Shared plumbing for the Printables pages: paper sizes, sheet composition,
// page furniture (header, binder holes), settings storage, fonts and offline support.
const P = (() => {
  const SVGNS = "http://www.w3.org/2000/svg";
  const SIZES = { A4: [210, 297], A5: [148, 210] };
  const PAPERS = { A4: "A4", A5: "A5", "2A5": "2 × A5 on A4" };

  const $ = (id) => document.getElementById(id);
  const round05 = (v) => Math.round(v * 2) / 2;

  function el(name, attrs, parent) {
    const n = document.createElementNS(SVGNS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    parent?.appendChild(n);
    return n;
  }

  function load(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return null;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  // ---------- URL state ----------
  // Every sidebar option is mirrored in the query string, so a link reproduces the sheet.
  // Values are parsed by the type of the matching key in `template`; unknown keys are ignored.
  function readUrl(template) {
    const out = {};
    for (const [k, v] of new URLSearchParams(location.search)) {
      if (!(k in template)) continue;
      const t = typeof template[k];
      if (t === "number") {
        if (v !== "" && Number.isFinite(Number(v))) out[k] = Number(v);
      } else if (t === "boolean") out[k] = v === "1";
      else out[k] = v;
    }
    return out;
  }

  function writeUrl(state, first = {}) {
    const q = new URLSearchParams(first);
    for (const [k, v] of Object.entries(state)) {
      if (k in first || v == null) continue;
      q.set(k, typeof v === "boolean" ? (v ? "1" : "0") : v);
    }
    history.replaceState(null, "", location.pathname + "?" + q);
  }

  // ---------- paper ----------
  // Paper and sheet options are shared by every generator; the URL overrides the saved ones.
  const PAPER_KEYS = ["paper", "orient", "namefield", "datefield", "holes"];

  function loadPaper() {
    const p = { paper: "A4", orient: "portrait", namefield: false, datefield: false, holes: false, ...load("printables.paper") };
    const q = readUrl(p);
    if (!PAPERS[q.paper]) delete q.paper;
    if (!["portrait", "landscape"].includes(q.orient)) delete q.orient;
    return { ...p, ...q };
  }

  function savePaper(s) {
    save("printables.paper", Object.fromEntries(PAPER_KEYS.map((k) => [k, s[k]])));
  }

  // A5 and 2 × A5 both print A5-sized pages, so they share recommendations.
  const isSmall = (paper) => paper !== "A4";

  function pageSize(paper, orient) {
    const [w, h] = SIZES[isSmall(paper) ? "A5" : "A4"];
    return orient === "portrait" ? [w, h] : [h, w];
  }

  function geometry(s) {
    const [pw, ph] = pageSize(s.paper, s.orient);
    const small = isSmall(s.paper);
    const margin = small ? 10 : 15;
    // Holes sit 7 mm from the binding edge; keep the content clear of them.
    const holeEdge = s.orient === "portrait" ? "left" : "top";
    const bind = s.holes ? Math.max(margin, 15) : margin;
    const left = holeEdge === "left" ? bind : margin;
    const top = holeEdge === "top" ? bind : margin;
    const headerH = s.title || s.namefield || s.datefield ? (small ? 13 : 16) : 0;
    return { pw, ph, small, margin, left, right: pw - margin, top, bottom: ph - margin, holeEdge, headerH };
  }

  function newPage(g, s, titleFont) {
    const svg = el("svg", { viewBox: `0 0 ${g.pw} ${g.ph}`, width: g.pw, height: g.ph });
    el("rect", { width: g.pw, height: g.ph, fill: "#fff" }, svg);
    drawHeader(svg, g, s, titleFont);
    drawHoles(svg, g, s);
    return svg;
  }

  // 6-ring planner pattern (A5 Filofax-style): gaps between hole centres in mm.
  const HOLE_GAPS = [19, 19, 70, 19, 19];

  function drawHoles(svg, g, s) {
    if (!s.holes) return;
    const span = HOLE_GAPS.reduce((a, b) => a + b, 0);
    const edgeLen = g.holeEdge === "left" ? g.ph : g.pw;
    let pos = (edgeLen - span) / 2;
    const grp = el("g", { stroke: "#9a9a9a", fill: "none", "stroke-width": 0.2 }, svg);
    for (let i = 0; i <= HOLE_GAPS.length; i++) {
      const [cx, cy] = g.holeEdge === "left" ? [7, pos] : [pos, 7];
      el("circle", { cx, cy, r: 2.75, "stroke-dasharray": "0.8 0.6" }, grp);
      el("line", { x1: cx - 1, x2: cx + 1, y1: cy, y2: cy }, grp);
      el("line", { x1: cx, x2: cx, y1: cy - 1, y2: cy + 1 }, grp);
      pos += HOLE_GAPS[i] ?? 0;
    }
  }

  function drawHeader(svg, g, s, titleFont = "Andika, sans-serif") {
    if (!g.headerH) return;
    const y = g.top + g.headerH * 0.55;
    const fs = g.small ? 4.2 : 5;
    if (s.title)
      el("text", { x: g.left, y, "font-size": fs * 1.25, "font-family": titleFont, fill: "#222" }, svg).textContent = s.title;
    // Fields are laid out right-to-left so whichever ones are enabled stay flush right.
    const fields = [
      s.datefield && ["Date", g.small ? 22 : 28],
      s.namefield && ["Name", g.small ? 34 : 50],
    ].filter(Boolean);
    let x = g.right;
    for (const [label, w] of fields) {
      x -= w + fs * 2.8;
      el("text", { x, y, "font-size": fs * 0.75, "font-family": "system-ui, sans-serif", fill: "#555" }, svg).textContent = label;
      el("line", { x1: x + fs * 2.8, x2: x + fs * 2.8 + w, y1: y + 0.8, y2: y + 0.8, stroke: "#999", "stroke-width": 0.2 }, svg);
      x -= 6;
    }
  }

  // Lay logical pages onto physical sheets; 2 × A5 puts two A5 pages on one A4 with a cut line.
  function present(main, pages, s) {
    const two = s.paper === "2A5";
    const [sw, sh] = two ? (s.orient === "portrait" ? [297, 210] : [210, 297]) : pageSize(s.paper, s.orient);
    let sheets = pages;
    if (two) {
      sheets = [];
      for (let i = 0; i < pages.length; i += 2) {
        const sheet = el("svg", { viewBox: `0 0 ${sw} ${sh}` });
        el("rect", { width: sw, height: sh, fill: "#fff" }, sheet);
        pages.slice(i, i + 2).forEach((pg, j) => {
          const lw = Number(pg.getAttribute("width"));
          const lh = Number(pg.getAttribute("height"));
          const side = s.orient === "portrait";
          pg.setAttribute("x", side ? j * (sw / 2) + (sw / 2 - lw) / 2 : (sw - lw) / 2);
          pg.setAttribute("y", side ? (sh - lh) / 2 : j * (sh / 2) + (sh / 2 - lh) / 2);
          sheet.appendChild(pg);
        });
        const cut = s.orient === "portrait" ? { x1: sw / 2, x2: sw / 2, y1: 0, y2: sh } : { x1: 0, x2: sw, y1: sh / 2, y2: sh / 2 };
        el("line", { ...cut, stroke: "#bbb", "stroke-width": 0.2, "stroke-dasharray": "2 2" }, sheet);
        sheets.push(sheet);
      }
    }

    const phys = two ? "A4" : s.paper;
    pageStyle.textContent = `@page { size: ${phys} ${sw > sh ? "landscape" : "portrait"}; margin: 0; }`;
    document.documentElement.style.setProperty("--pw", sw + "mm");
    document.documentElement.style.setProperty("--ph", sh + "mm");

    main.replaceChildren();
    for (const sheet of sheets) {
      sheet.setAttribute("class", "sheet");
      sheet.setAttribute("width", sw + "mm");
      sheet.setAttribute("height", sh + "mm");
      const wrap = document.createElement("div");
      wrap.className = "sheet-wrap";
      wrap.style.maxWidth = Math.round(sw * 3.6) + "px";
      wrap.appendChild(sheet);
      main.appendChild(wrap);
    }
    return sheets.length;
  }

  const pageStyle = document.createElement("style");
  document.head.appendChild(pageStyle);

  // ---------- controls ----------
  function bindSeg(seg, get, set) {
    const sync = () => {
      for (const b of seg.children) b.classList.toggle("on", b.dataset.v === String(get()));
    };
    seg.addEventListener("click", (e) => {
      const v = e.target.closest("button")?.dataset.v;
      if (v == null) return;
      set(v);
      sync();
    });
    sync();
    return sync;
  }

  // Builds the shared "Page" fieldset. onChange receives a patch of changed keys.
  function paperBox(box, s, onChange) {
    box.innerHTML = `<legend>Page</legend>
      <label>Paper</label>
      <div class="seg" data-key="paper">${Object.entries(PAPERS)
        .map(([v, l]) => `<button type="button" data-v="${v}">${l}</button>`)
        .join("")}</div>
      <label>Orientation</label>
      <div class="seg" data-key="orient">
        <button type="button" data-v="portrait">Portrait</button>
        <button type="button" data-v="landscape">Landscape</button>
      </div>
      <label for="title">Title</label>
      <input type="text" id="title" placeholder="Optional" />
      <label class="check"><input type="checkbox" data-key="namefield" /> Name field</label>
      <label class="check"><input type="checkbox" data-key="datefield" /> Date field</label>
      <label class="check"><input type="checkbox" data-key="holes" /> 6-ring binder hole marks</label>
      <p class="hint">19–19–70–19–19 mm, as in A5 planners. Left edge in portrait, top edge in landscape.</p>`;
    const syncs = [...box.querySelectorAll(".seg")].map((seg) =>
      bindSeg(seg, () => s[seg.dataset.key], (v) => onChange({ [seg.dataset.key]: v })),
    );
    const checks = [...box.querySelectorAll("input[type=checkbox]")];
    for (const c of checks) c.addEventListener("change", () => onChange({ [c.dataset.key]: c.checked }));
    const title = box.querySelector("#title");
    title.addEventListener("input", () => onChange({ title: title.value }));
    return function sync() {
      syncs.forEach((f) => f());
      for (const c of checks) c.checked = !!s[c.dataset.key];
      title.value = s.title || "";
    };
  }

  // ---------- text measurement ----------
  const ctx = document.createElement("canvas").getContext("2d");
  const ratioCache = {};

  function widthMm(str, font, sizeMm) {
    ctx.font = `100px "${font}"`;
    return (ctx.measureText(str).width / 100) * sizeMm;
  }

  // Height of `probe` above the baseline as a fraction of the font size (x-height, digit height…).
  function glyphRatio(font, probe, fallback) {
    const key = font + "|" + probe;
    if (!ratioCache[key]) {
      ctx.font = `100px "${font}"`;
      const m = ctx.measureText(probe).actualBoundingBoxAscent / 100;
      ratioCache[key] = m > 0.2 && m < 1.2 ? m : fallback;
    }
    return ratioCache[key];
  }

  function fontsLoaded(families, sample) {
    return Promise.all(families.map((f) => document.fonts.load(`20px "${f}"`, sample).catch(() => {}))).then(() => {
      for (const k in ratioCache) delete ratioCache[k];
    });
  }

  // ---------- user fonts (kept in IndexedDB, never uploaded anywhere) ----------
  function fontDb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open("printables-fonts", 1);
      req.onupgradeneeded = () => req.result.createObjectStore("fonts", { keyPath: "name" });
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function dbOp(mode, fn) {
    const db = await fontDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("fonts", mode);
      const req = fn(tx.objectStore("fonts"));
      tx.oncomplete = () => resolve(req?.result);
      tx.onerror = () => reject(tx.error);
    });
  }

  // Wires the "Upload your own font" controls next to a font <select>.
  function customFonts({ select, file, clear, onPick, fallbackFont }) {
    const group = document.createElement("optgroup");
    group.label = "Your fonts";
    group.hidden = true;
    select.appendChild(group);

    async function add(name, data) {
      const face = new FontFace(name, data);
      await face.load();
      document.fonts.add(face);
      if (![...group.children].some((o) => o.value === name)) group.appendChild(new Option(name, name));
      group.hidden = false;
      clear.hidden = false;
    }

    file.addEventListener("change", async () => {
      const f = file.files[0];
      file.value = "";
      if (!f) return;
      const name = f.name.replace(/\.[^.]+$/, "").replace(/["\\]/g, "").trim() || "My font";
      const data = await f.arrayBuffer();
      try {
        await add(name, data);
      } catch {
        alert("Could not read this font. Use a TTF, OTF, WOFF or WOFF2 file.");
        return;
      }
      try {
        await dbOp("readwrite", (st) => st.put({ name, data }));
      } catch {}
      select.value = name;
      onPick(name);
    });

    clear.addEventListener("click", async () => {
      try {
        await dbOp("readwrite", (st) => st.clear());
      } catch {}
      const had = [...group.children].some((o) => o.value === select.value);
      group.replaceChildren();
      group.hidden = true;
      clear.hidden = true;
      if (had) onPick(fallbackFont());
    });

    // Resolves once stored fonts are registered. IndexedDB can stall on file:// pages, so give up after a moment.
    return (async () => {
      try {
        const timeout = new Promise((_, reject) => setTimeout(reject, 1500));
        const all = await Promise.race([dbOp("readonly", (st) => st.getAll()), timeout]);
        for (const f of all || []) await add(f.name, f.data).catch(() => {});
      } catch {}
    })();
  }

  // ---------- seeded random ----------
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Precache the app so it keeps working offline (file:// pages work without it).
  if ("serviceWorker" in navigator && location.protocol.startsWith("http"))
    navigator.serviceWorker.register("sw.js").catch(() => {});

  return {
    $, el, round05, load, save, readUrl, writeUrl, loadPaper, savePaper, isSmall, geometry, newPage, present,
    bindSeg, paperBox, widthMm, glyphRatio, fontsLoaded, customFonts, rng,
  };
})();
