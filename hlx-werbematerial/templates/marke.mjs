// 00 Marke: Logos, App-Icon, "powered by HLX"-Badges, Markenblatt.
import { C, logo, poweredBy, plates, doc, printDoc, logoSvgFile, appIconSvgFile } from './lib.mjs';

export default async function marke(cfg) {
  const A = [];
  const L = '00_Marke/Logos';
  for (const [n, col] of [['gelb', C.yellow], ['hell', C.text], ['dunkel', C.ground]]) {
    A.push({ dir: L, name: `HLX-Logo-${n}.svg`, file: logoSvgFile(col) });
    A.push({ dir: L, name: `HLX-Logo-${n}_transparent_2000px`, w: 2000, h: 588, transparent: true, html: doc(`<div style="width:2000px;height:588px;display:flex;align-items:center;justify-content:center">${logo(col, 'width:1900px')}</div>`) });
  }
  A.push({ dir: L, name: 'HLX-Logo-gelb-auf-gruen.svg', file: logoSvgFile(C.yellow, C.ground) });
  A.push({ dir: L, name: 'HLX-App-Icon.svg', file: appIconSvgFile() });
  A.push({ dir: L, name: 'HLX-App-Icon_1024px', w: 1024, h: 1024, transparent: true, html: doc(`<img src="data:image/svg+xml;base64,${Buffer.from(appIconSvgFile()).toString('base64')}" style="width:1024px;height:1024px;display:block">`) });

  for (const [n, txt, lg] of [['fuer-dunkle-Flaechen', C.text, C.yellow], ['fuer-helle-Flaechen', C.ground, C.ground]]) {
    A.push({ dir: '00_Marke/PoweredBy-Badge', name: `HLX-PoweredBy_${n}_transparent`, w: 1400, h: 260, transparent: true, html: doc(`<div style="width:1400px;height:260px;display:flex;align-items:center;justify-content:center">${poweredBy(txt, lg, 150)}</div>`) });
  }
  A.push({ dir: '00_Marke/PoweredBy-Badge', name: 'HLX-PoweredBy_Plakette', w: 1400, h: 400, transparent: true, html: doc(`<div style="width:1400px;height:400px;display:flex;align-items:center;justify-content:center"><div style="padding:60px 90px;border-radius:200px;background:${C.ground};border:6px solid ${C.yellow}">${poweredBy(C.text, C.yellow, 150)}</div></div>`) });

  // Markenblatt A4
  const sw = (hex, name, use, dark = false) => `<div><div style="height:22mm;border-radius:3mm;background:${hex};border:.3mm solid rgba(238,243,238,.2)"></div>
      <div class="wide" style="font-size:10pt;margin-top:2.5mm">${name}</div><div class="m" style="font-size:8.5pt;margin-top:.5mm">${hex} · ${use}</div></div>`;
  A.push({ dir: '00_Marke', name: 'HLX-Markenblatt-A4', pdf: true, html: printDoc(210, 297, 0, [`
    <div style="position:absolute;inset:0;background:${C.ground}"></div>
    ${plates(C.yellow, .06, 'right:-60mm;top:-10mm;height:150mm')}
    <div class="safe" style="inset:18mm 20mm">
      ${logo(C.yellow, 'height:12mm')}
      <div class="kick" style="font-size:9pt;margin-top:12mm">Markenblatt · ${cfg.brand}</div>
      <h1 class="disp" style="font-size:28pt;margin-top:3mm">${cfg.claim}.</h1>
      <p style="font-size:11pt;line-height:1.5;margin-top:4mm;max-width:160mm"><b class="y">Mission:</b> Gesundheit soll sich nicht nach Verzicht anfühlen, sondern nach Leben. Training, Ernährung und Mindset gehören zusammen, auf Augenhöhe und für jedes Level.</p>
      <h2 class="disp" style="font-size:14pt;margin-top:10mm">Farben</h2>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;margin-top:4mm">
        ${sw(C.ground, 'Waldgrün', 'Hintergrund')}${sw(C.petrol, 'Petrol', 'App-Icon, Flächen')}${sw(C.yellow, 'Signalgelb', 'Akzent, CTA, Logo')}${sw(C.text, 'Nebelweiß', 'Text')}
      </div>
      <h2 class="disp" style="font-size:14pt;margin-top:10mm">Schrift</h2>
      <div class="row" style="gap:10mm;margin-top:3mm;align-items:flex-end">
        <div class="disp" style="font-size:30pt">Archivo</div>
        <div class="m" style="font-size:9.5pt;line-height:1.5">Überschriften: Archivo, Breite 125, sehr fett.<br>Fließtext: Archivo normal. Lizenz: SIL OFL (frei nutzbar).</div>
      </div>
      <h2 class="disp" style="font-size:14pt;margin-top:10mm">Logo</h2>
      <div class="row" style="gap:5mm;margin-top:4mm">
        <div style="flex:1;height:26mm;border-radius:3mm;background:${C.surface};display:flex;align-items:center;justify-content:center">${logo(C.yellow, 'height:10mm')}</div>
        <div style="flex:1;height:26mm;border-radius:3mm;background:${C.yellow};display:flex;align-items:center;justify-content:center">${logo(C.ground, 'height:10mm')}</div>
        <div style="flex:1;height:26mm;border-radius:3mm;background:#fff;display:flex;align-items:center;justify-content:center">${poweredBy(C.ground, C.ground, 22)}</div>
      </div>
      <ul class="m" style="padding-left:4.5mm;font-size:9pt;line-height:1.5;margin-top:4mm">
        <li>Schutzraum rund ums Logo: mindestens die Höhe des „H“. Mindestbreite 25 mm bzw. 120 px.</li>
        <li>Logo nicht verzerren, drehen, umfärben oder mit Effekten versehen. Nur Gelb, Weiß oder Waldgrün.</li>
        <li>Markenname immer klein: <b style="color:${C.text}">${cfg.brand}</b>. Kurzform: <b style="color:${C.text}">HLX</b>. App: <b style="color:${C.text}">${cfg.appName}</b>.</li>
        <li>Partner nutzen „powered by HLX“ neben dem eigenen Logo, nicht in dessen Logo hinein.</li>
      </ul>
      <h2 class="disp" style="font-size:14pt;margin-top:8mm">Tonalität</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4mm;margin-top:3mm;font-size:9pt;line-height:1.45">
        ${[['Auf Augenhöhe', 'Wir duzen. Begleiter statt Besserwisser.'], ['Balance statt Verbote', 'Kein Verzicht, keine Schuld, kein Druck.'], ['Ehrlich', 'Keine Heilversprechen, keine garantierten Ergebnisse.']]
          .map(([t, d]) => `<div style="border-top:.6mm solid ${C.yellow};padding-top:2mm"><b>${t}</b><div class="m">${d}</div></div>`).join('')}
      </div>
    </div>
    <div class="ref" style="right:9mm;bottom:5mm">HLX-BRD-01</div>`]) });
  return A;
}
