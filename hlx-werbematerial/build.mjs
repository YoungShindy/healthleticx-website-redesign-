// Erzeugt alle Werbemittel aus config.json + templates/ nach ausgabe/.
// Aufruf: npm run build            (alles)
//         node build.mjs gym       (nur Dateien, deren Pfad "gym" enthält)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'ausgabe');
const TMP = path.join(ROOT, '.build');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8'));
const filter = (process.argv[2] || '').toLowerCase();

const segments = ['marke', 'endnutzer', 'influencer', 'gyms', 'marken', 'coaches'];
const assets = [];
for (const s of segments) {
  const mod = await import(pathToFileURL(path.join(ROOT, 'templates', `${s}.mjs`)));
  assets.push(...await mod.default(cfg));
}
const todo = assets.filter(a => !filter || `${a.dir}/${a.name}`.toLowerCase().includes(filter));

fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined });
const page = await browser.newPage();
const base = `<base href="${pathToFileURL(ROOT).href}/">`;

for (const a of todo) {
  const dir = path.join(OUT, a.dir);
  fs.mkdirSync(dir, { recursive: true });
  if (a.file) { // fertige Datei (z. B. SVG, Markdown)
    fs.writeFileSync(path.join(dir, a.name), a.file);
    console.log('  ', a.dir, a.name);
    continue;
  }
  const htmlPath = path.join(TMP, `${a.name}.html`);
  fs.writeFileSync(htmlPath, a.html.replace('<head>', `<head>${base}`));
  await page.goto(pathToFileURL(htmlPath).href);
  await page.evaluate(() => document.fonts.ready);
  if (a.pdf) {
    const out = path.join(dir, `${a.name}.pdf`);
    await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
    // Vorschaubild der ersten Seite für die Übersicht
    const prev = path.join(OUT, '_vorschau', a.dir);
    fs.mkdirSync(prev, { recursive: true });
    execFileSync('pdftoppm', ['-png', '-r', '40', '-f', '1', '-l', '2', out, path.join(prev, a.name)]);
  } else {
    await page.setViewportSize({ width: a.w, height: a.h });
    await page.screenshot({ path: path.join(dir, `${a.name}.png`), omitBackground: !!a.transparent, clip: { x: 0, y: 0, width: a.w, height: a.h } });
  }
  console.log('  ', a.dir, a.name);
}
await browser.close();
writeIndex();
fs.rmSync(TMP, { recursive: true, force: true });
console.log(`\n${todo.length} Dateien erzeugt in ausgabe/`);

// Übersichtsseite ausgabe/index.html mit Vorschaubildern aller Dateien
function writeIndex() {
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  const files = walk(OUT).map(f => path.relative(OUT, f)).filter(f => !f.startsWith('_vorschau') && f !== 'index.html').sort();
  const groups = {};
  for (const f of files) (groups[f.split(path.sep)[0]] ??= []).push(f);
  const thumb = f => {
    if (f.endsWith('.pdf')) {
      const base = path.join('_vorschau', f.replace(/\.pdf$/, ''));
      const cand = fs.readdirSync(path.join(OUT, path.dirname(base))).filter(x => x.startsWith(path.basename(base) + '-')).sort();
      return cand.map(c => `<img src="${path.join(path.dirname(base), c)}" alt="">`).join('');
    }
    return `<img src="${f}" alt="" class="${/dunkel|helle-Fl/.test(f) ? 'lt' : f.includes('Overlay') || f.includes('transparent') ? 'chk' : ''}">`;
  };
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>HLX Werbematerial</title><style>
@font-face{font-family:Archivo;src:url(../assets/archivo-variable.woff2)}
body{margin:0;background:#04201B;color:#EEF3EE;font-family:Archivo,Arial,sans-serif;padding:32px 16px}
main{max-width:1200px;margin:auto} h1{font-size:2.2rem;margin:0 0 .3rem} h2{color:#FFFF00;margin:2.5rem 0 1rem;font-size:1.3rem;border-top:1px solid rgba(238,243,238,.14);padding-top:1.2rem}
p{color:#A9C2BA;max-width:60ch} .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}
a.card{display:block;background:#0A2E27;border-radius:8px;padding:10px;text-decoration:none;color:inherit}
a.card:hover{outline:2px solid #FFFF00} .imgs{display:flex;gap:4px;align-items:center;justify-content:center;height:200px}
.imgs img{max-height:200px;max-width:100%;object-fit:contain;flex:1 1 0;min-width:0}
.chk{background:repeating-conic-gradient(#3a4a46 0 25%,#56635f 0 50%) 0 0/16px 16px}
.lt{background:#EEF3EE}
.n{font-size:.72rem;color:#A9C2BA;margin-top:8px;word-break:break-all}
</style></head><body><main><h1>HLX Werbematerial</h1>
<p>Werbemittel für ${cfg.appName}, getrennt nach Zielgruppe. Klick auf eine Karte öffnet die Datei. Druck-PDFs mit 3 mm Beschnitt.</p>
${Object.entries(groups).map(([g, fs_]) => `<h2>${g.replace(/^\d+_/, '').replace(/-/g, ' / ')}</h2><div class="grid">${fs_.map(f => `<a class="card" href="${f}" target="_blank"><div class="imgs">${thumb(f)}</div><div class="n">${path.basename(f)}</div></a>`).join('')}</div>`).join('')}
</main></body></html>`;
  fs.writeFileSync(path.join(OUT, 'index.html'), html);
}
