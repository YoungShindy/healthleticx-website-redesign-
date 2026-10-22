// Erzeugt alle Werbemittel aus config.json + templates/ nach ausgabe/,
// dazu bearbeitbare PPTX-Dateien und Versandpakete (ZIP) nach versand/.
// Aufruf: npm run build            (alles)
//         node build.mjs gym       (nur Dateien, deren Pfad "gym" enthält, ohne Pakete)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import PptxGenJS from 'pptxgenjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'ausgabe');
const PKG = path.join(ROOT, 'versand');
const TMP = path.join(ROOT, '.build');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8'));
const filter = (process.argv[2] || '').toLowerCase();

const segments = ['marke', 'endnutzer', 'kampagnen', 'influencer', 'gyms', 'marken', 'coaches'];
const assets = [];
for (const s of segments) {
  const mod = await import(pathToFileURL(path.join(ROOT, 'templates', `${s}.mjs`)));
  assets.push(...await mod.default(cfg));
}
const todo = assets.filter(a => !filter || `${a.dir}/${a.name}`.toLowerCase().includes(filter));

fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const hiPage = await browser.newPage({ deviceScaleFactor: 300 / 96 }); // Hintergründe für Druck-PPTX
const base = `<base href="${pathToFileURL(ROOT).href}/">`;

let pptxCount = 0;
for (const a of todo) {
  const dir = path.join(OUT, a.dir);
  fs.mkdirSync(dir, { recursive: true });
  if (a.file) { // fertige Datei (z. B. SVG)
    fs.writeFileSync(path.join(dir, a.name), a.file);
    console.log('  ', a.dir, a.name);
    continue;
  }
  const htmlPath = path.join(TMP, `${a.name}.html`);
  fs.writeFileSync(htmlPath, a.html.replace('<head>', `<head>${base}`));
  const url = pathToFileURL(htmlPath).href;
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  if (a.pdf) {
    const out = path.join(dir, `${a.name}.pdf`);
    await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
    const prev = path.join(OUT, '_vorschau', a.dir);
    fs.mkdirSync(prev, { recursive: true });
    execFileSync('pdftoppm', ['-png', '-r', '40', '-f', '1', '-l', '2', out, path.join(prev, a.name)]);
  } else {
    await page.setViewportSize({ width: a.w, height: a.h });
    await page.screenshot({ path: path.join(dir, `${a.name}.png`), omitBackground: !!a.transparent, clip: { x: 0, y: 0, width: a.w, height: a.h } });
  }
  // Bearbeitbare PPTX: alle Social-Bilder und Druckdateien (außer transparente Overlays, Logos, Falz-Aufsteller)
  const editable = a.editable ?? (!a.transparent && !a.name.includes('Tischaufsteller') && (a.pdf || !a.dir.startsWith('00_Marke')));
  if (editable) {
    let pg = page, w = a.w, h = a.h, pages = 1;
    if (a.pdf) {
      [w, h, pages] = (await page.evaluate(() => { const r = document.querySelector('.page').getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height), document.querySelectorAll('.page').length]; }));
      pg = hiPage;
      await pg.setViewportSize({ width: w, height: h });
    }
    await exportPptx(pg, url, w, h, pages, path.join(dir, 'Bearbeitbar-PPTX'), a.name);
    pptxCount++;
  }
  console.log('  ', a.dir, a.name);
}
await browser.close();
writeIndex();
if (!filter) writePackages();
fs.rmSync(TMP, { recursive: true, force: true });
console.log(`\n${todo.length} Dateien + ${pptxCount} PPTX erzeugt in ausgabe/${filter ? '' : ', Pakete in versand/'}`);

// Texte als echte Textfelder, Rest als Hintergrundbild, .slot als markiertes Logo-/Foto-Feld.
async function exportPptx(pg, url, W, H, pages, outDir, name) {
  const inch = px => px / 96;
  const hex = c => c.match(/\d+(\.\d+)?/g).map(Number).slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'HLX', width: inch(W), height: inch(H) });
  pptx.layout = 'HLX';
  pptx.author = cfg.brand;
  pptx.title = name;
  fs.mkdirSync(outDir, { recursive: true });
  for (let i = 0; i < pages; i++) {
  await pg.goto(url);
  await pg.evaluate(() => document.fonts.ready);
  // Mehrseitige Druckdateien: jeweils nur Seite i zeigen
  await pg.evaluate(i => document.querySelectorAll('.page').forEach((p, j) => { if (j !== i) p.style.display = 'none'; }), i);
  const data = await pg.evaluate(() => {
    document.querySelectorAll('.po').forEach(e => { e.style.visibility = 'visible'; });
    const hasText = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    const all = [...document.body.querySelectorAll('*')].filter(el => !el.closest('svg') && !el.closest('.slot') && hasText(el));
    const tops = all.filter(el => !all.some(o => o !== el && o.contains(el)));
    const texts = [];
    for (const el of tops) {
      const cs = getComputedStyle(el);
      const rects = [];
      const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = tw.nextNode(); n; n = tw.nextNode()) {
        if (!n.textContent.trim()) continue;
        const r = document.createRange(); r.selectNodeContents(n);
        rects.push(...r.getClientRects());
      }
      if (!rects.length) continue;
      const runs = [];
      const rec = node => {
        for (const c of node.childNodes) {
          if (c.nodeType === 3) {
            const p = getComputedStyle(c.parentElement);
            let t = c.textContent.replace(/\s+/g, ' ');
            if (p.textTransform === 'uppercase') t = t.toUpperCase();
            runs.push({ t, color: p.color, w: +p.fontWeight, fs: parseFloat(p.fontSize), disp: /wdth" 1(18|25)/.test(p.fontVariationSettings) || +p.fontWeight >= 800 });
          } else if (c.nodeName === 'BR') runs.push({ br: true });
          else if (c.nodeType === 1 && c.nodeName !== 'svg' && c.nodeName !== 'IMG') rec(c);
        }
      };
      rec(el);
      texts.push({
        x: Math.min(...rects.map(r => r.left)), y: Math.min(...rects.map(r => r.top)),
        r: Math.max(...rects.map(r => r.right)), b: Math.max(...rects.map(r => r.bottom)),
        align: cs.textAlign, lh: parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2, fs: parseFloat(cs.fontSize),
        ls: parseFloat(cs.letterSpacing) || 0, runs,
      });
      el.classList.add('edhide');
    }
    const slots = [...document.querySelectorAll('.slot')].map(s => { const r = s.getBoundingClientRect(); s.style.visibility = 'hidden'; return { x: r.left, y: r.top, w: r.width, h: r.height, label: s.dataset.slot }; });
    document.querySelectorAll('.po').forEach(e => { e.style.visibility = 'hidden'; });
    const st = document.createElement('style');
    st.textContent = '.edhide,.edhide *:not(svg):not(svg *){color:transparent!important}';
    document.head.appendChild(st);
    return { texts, slots };
  });
  const bg = path.join(TMP, `${name}_bg${i}.png`);
  await pg.screenshot({ path: bg, clip: { x: 0, y: 0, width: W, height: H } });
  const slide = pptx.addSlide();
  slide.addImage({ path: bg, x: 0, y: 0, w: inch(W), h: inch(H) });

  for (const t of data.texts) {
    // Läufe säubern: Zeilenumbrüche an den vorherigen Lauf hängen, Leerraum am Rand entfernen
    const runs = [];
    for (const r of t.runs) {
      if (r.br) { if (runs.length) runs.at(-1).options.breakLine = true; continue; }
      let text = r.t;
      if (!runs.length || runs.at(-1).options.breakLine) text = text.trimStart();
      if (!text) continue;
      runs.push({ text, options: { color: hex(r.color), fontSize: +(r.fs * 0.75).toFixed(1), fontFace: r.disp ? 'Archivo Black' : 'Archivo', bold: r.disp || r.w >= 600 } });
    }
    if (!runs.length) continue;
    runs.at(-1).text = runs.at(-1).text.trimEnd();
    const w = t.r - t.x, h = t.b - t.y;
    const lines = Math.max(1, Math.round(h / t.lh));
    const slack = w * 0.2 + 20;
    const align = t.align === 'center' ? 'center' : t.align === 'right' || t.align === 'end' ? 'right' : 'left';
    const x = align === 'center' ? t.x - slack / 2 : align === 'right' ? t.x - slack : t.x;
    slide.addText(runs, {
      x: inch(x), y: inch(t.y), w: inch(w + slack), h: inch(h + 8), margin: 0, valign: 'top', align,
      lineSpacingMultiple: +(t.lh / t.fs).toFixed(2), charSpacing: +(t.ls * 0.75).toFixed(1), wrap: lines > 1, fit: 'none',
    });
  }
  for (const s of data.slots) {
    slide.addText(`${s.label} hier einfügen`, {
      shape: pptx.ShapeType.roundRect, rectRadius: 0.08, x: inch(s.x), y: inch(s.y), w: inch(s.w), h: inch(s.h),
      fill: { color: 'FFFFFF', transparency: 85 }, line: { color: 'FFFF00', width: 1.5, dashType: 'dash' },
      align: 'center', valign: 'middle', fontFace: 'Archivo', fontSize: Math.max(7, Math.min(20, s.h * 0.75 * 0.22)), color: 'FFFF00', bold: true,
    });
  }
  }
  await pptx.writeFile({ fileName: path.join(outDir, `${name}.pptx`) });
}

// Versandpakete: ein ZIP pro Empfänger, jeweils mit LIESMICH.txt
function writePackages() {
  const packs = [
    ['HLX_Paket-Komplett', 'Alle Werbemittel.', ['.']],
    ['HLX_Paket-Endnutzer-Werbung', 'Werbung für die App: Posts, Stories, Nischen-Serie, Flyer, Plakat.', ['01_Endnutzer', '00_Marke']],
    ['HLX_Paket-Influencer', 'Story- und Feed-Vorlagen (fertig + Overlay), Briefing.', ['02_Influencer', '00_Marke']],
    ['HLX_Paket-Gym-Studio-Partner', 'QR-Aufsteller, Sticker, Plakat, Partnerinfo, Social, Partner-Studio-Vorlagen.', ['03_Gyms-Studios', '00_Marke']],
    ['HLX_Paket-Firmen-Akquise', 'Partnerschafts-Onepager zum Verschicken an Unternehmen und Marken.', ['04_Marken-Firmen/A_Akquise-zum-Verschicken', '00_Marke/HLX-Markenblatt-A4.pdf']],
    ['HLX_Paket-Firmen-Partner', 'Für bestehende Partner: "Offizieller Partner"-Vorlagen und Logos.', ['04_Marken-Firmen/B_Fuer-Partner-Firmen', '00_Marke']],
    ['HLX_Paket-Coach-Akquise', 'Info-Onepager zum Verschicken an interessierte Coaches.', ['05_Coaches/A_Akquise-zum-Verschicken', '00_Marke/HLX-Markenblatt-A4.pdf']],
    ['HLX_Paket-Partner-Coach', 'Für Partner-Coaches: "Offizieller Partner-Coach"-Vorlagen, App-Werbung für Klienten, Logos.', ['05_Coaches/B_Fuer-Partner-Coaches', '01_Endnutzer/Social', '00_Marke']],
    ['HLX_Paket-HLX-eigene-Kanaele', 'Für die eigenen HLX-Kanäle: Wir suchen Coaches / Partner, LinkedIn.', ['05_Coaches/C_HLX-eigene-Kanaele', '04_Marken-Firmen/C_HLX-eigene-Kanaele']],
  ];
  fs.rmSync(PKG, { recursive: true, force: true });
  fs.mkdirSync(PKG, { recursive: true });
  const readme = desc => `${cfg.appName} von ${cfg.brand} · Werbematerial\n\n${desc}\n\n` +
    `PNG: direkt posten (Stories 1080x1920, Posts 1080x1350 / 1080x1080).\n` +
    `PDF: druckfertig mit 3 mm Beschnitt.\n` +
    `Ordner "Bearbeitbar-PPTX": in Canva (Hochladen/Importieren), PowerPoint, Keynote oder Google Slides öffnen.\n` +
    `  Texte sind änderbar, gelb gestrichelte Felder sind für euer Logo oder Foto.\n` +
    `  Schrift: Archivo / Archivo Black (kostenlos bei Google Fonts).\n` +
    `Overlay-transparent: über eigenes Foto/Video legen.\n\n` +
    `Bitte Logo nicht verändern. Werbung als "Anzeige" kennzeichnen. Keine Heilversprechen.\n` +
    `Kontakt: ${cfg.email} · ${cfg.handle}\n`;
  for (const [name, desc, paths] of packs) {
    const lies = path.join(TMP, 'LIESMICH.txt');
    fs.writeFileSync(lies, readme(desc));
    const zip = path.join(PKG, `${name}.zip`);
    execFileSync('zip', ['-qr', zip, ...paths, '-x', '_vorschau/*', 'index.html'], { cwd: OUT });
    execFileSync('zip', ['-qj', zip, lies]);
  }
}

// Übersichtsseite ausgabe/index.html mit Vorschaubildern aller Dateien
function writeIndex() {
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  const files = walk(OUT).map(f => path.relative(OUT, f)).filter(f => !f.startsWith('_vorschau') && f !== 'index.html' && !f.endsWith('.pptx')).sort();
  const groups = {};
  for (const f of files) (groups[path.dirname(f)] ??= []).push(f);
  const thumb = f => {
    if (f.endsWith('.pdf')) {
      const b = path.join('_vorschau', f.replace(/\.pdf$/, ''));
      const cand = fs.readdirSync(path.join(OUT, path.dirname(b))).filter(x => x.startsWith(path.basename(b) + '-')).sort();
      return cand.map(c => `<img src="${path.join(path.dirname(b), c)}" alt="">`).join('');
    }
    return `<img src="${f}" alt="" class="${/dunkel|helle-Fl/.test(f) ? 'lt' : f.includes('Overlay') || f.includes('transparent') ? 'chk' : ''}">`;
  };
  const pptxOf = f => {
    const p = path.join(path.dirname(f), 'Bearbeitbar-PPTX', path.basename(f).replace(/\.(png|pdf)$/, '.pptx'));
    return fs.existsSync(path.join(OUT, p)) ? `<a class="ed" href="${p}">Bearbeitbar (PPTX)</a>` : '';
  };
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>HLX Werbematerial</title><style>
@font-face{font-family:Archivo;src:url(../assets/archivo-variable.woff2)}
body{margin:0;background:#04201B;color:#EEF3EE;font-family:Archivo,Arial,sans-serif;padding:32px 16px}
main{max-width:1200px;margin:auto} h1{font-size:2.2rem;margin:0 0 .3rem} h2{color:#FFFF00;margin:2.5rem 0 1rem;font-size:1.1rem;border-top:1px solid rgba(238,243,238,.14);padding-top:1.2rem}
p{color:#A9C2BA;max-width:60ch} .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}
.card{background:#0A2E27;border-radius:8px;padding:10px} .card>a{text-decoration:none;color:inherit;display:block}
.card:hover{outline:2px solid #FFFF00} .imgs{display:flex;gap:4px;align-items:center;justify-content:center;height:200px}
.imgs img{max-height:200px;max-width:100%;object-fit:contain;flex:1 1 0;min-width:0}
.chk{background:repeating-conic-gradient(#3a4a46 0 25%,#56635f 0 50%) 0 0/16px 16px} .lt{background:#EEF3EE}
.n{font-size:.72rem;color:#A9C2BA;margin-top:8px;word-break:break-all} a.ed{display:inline-block;margin-top:6px;font-size:.75rem;color:#FFFF00}
</style></head><body><main><h1>HLX Werbematerial</h1>
<p>Werbemittel für ${cfg.appName}, getrennt nach Zielgruppe. Klick aufs Bild öffnet die Datei, „Bearbeitbar“ lädt die PPTX für Canva, PowerPoint oder Google Slides.</p>
${Object.entries(groups).map(([g, fs_]) => `<h2>${g.replace(/\d+_/g, '').replace(/[_/]/g, ' / ').replace(/-/g, ' ')}</h2><div class="grid">${fs_.map(f => `<div class="card"><a href="${f}" target="_blank"><div class="imgs">${thumb(f)}</div><div class="n">${path.basename(f)}</div></a>${pptxOf(f)}</div>`).join('')}</div>`).join('')}
</main></body></html>`;
  fs.writeFileSync(path.join(OUT, 'index.html'), html);
}
