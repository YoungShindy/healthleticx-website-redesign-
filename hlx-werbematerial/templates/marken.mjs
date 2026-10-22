// 04 Marken & Firmen: Kooperationen, Corporate Health, Kampagnen.
import { C, logo, icon, qr, phone, plates, doc, printDoc, link } from './lib.mjs';

export default async function marken(cfg) {
  const A = [];
  const url = link(cfg, 'marken');
  const fmt = (ic, t, d) => `<div style="padding:6mm;border-radius:4mm;background:${C.surface}">
      <div style="width:12mm;height:12mm;border-radius:3mm;background:${C.ground};display:flex;align-items:center;justify-content:center">${icon(ic, 26, C.yellow)}</div>
      <div class="wide" style="font-size:12.5pt;margin-top:4mm">${t}</div>
      <div class="m" style="font-size:9.5pt;line-height:1.45;margin-top:1.5mm">${d}</div></div>`;

  A.push({ dir: '04_Marken-Firmen', name: 'MRK-Partnerschaften-A4', pdf: true, html: printDoc(210, 297, 3, [`
    <div style="position:absolute;inset:0;background:${C.ground}"></div>
    <div style="position:absolute;left:0;right:0;top:0;height:120mm" class="bg"></div>
    ${plates(C.yellow, .07, 'right:-60mm;top:-10mm;height:150mm')}
    ${phone(3, 'position:absolute;width:42mm;right:22mm;top:22mm;transform:rotate(4deg)')}
    <div class="safe" style="inset:19mm 21mm">
      ${logo(C.yellow, 'height:11mm')}
      <div class="kick" style="font-size:9pt;margin-top:13mm">Für Marken &amp; Unternehmen</div>
      <h1 class="disp" style="font-size:30pt;margin-top:3mm;max-width:120mm">Gesundheit, die bleibt.<br><span class="y">Gemeinsam.</span></h1>
      <p class="m" style="font-size:10.5pt;line-height:1.45;margin-top:5mm;max-width:112mm">${cfg.appName} von ${cfg.brand} verbindet Training, Ernährung und Routinen in einer App. Unsere Haltung: Balance statt Verbote, auf Augenhöhe, für jedes Level. Wir suchen Partner, die das teilen.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5mm;margin-top:22mm">
        ${fmt('building', 'Corporate Health', 'App-Zugänge für Mitarbeitende, Team-Challenges und Routinen für einen gesünderen Arbeitsalltag.')}
        ${fmt('chef', 'Produkt-Kooperationen', 'Passende Produkte sinnvoll eingebunden, z. B. in Rezepte und Meal-Prep-Inhalte.')}
        ${fmt('megaphone', 'Kampagnen &amp; Content', `Gemeinsame Aktionen mit ${cfg.brand} und unseren Creatorn auf Instagram, TikTok und YouTube.`)}
        ${fmt('target', 'Challenges &amp; Events', 'Mitmach-Aktionen in der App und vor Ort, die Menschen in Bewegung bringen.')}
      </div>
      <div class="row" style="gap:3mm;margin-top:9mm;flex-wrap:wrap">
        ${['Fokus DACH', 'Deutschsprachig', 'Ehrlich, ohne Heilversprechen', 'Für jedes Level'].map(t => `<span style="font-size:9pt;font-weight:600;padding:1.8mm 3.5mm;border-radius:99px;border:.3mm solid rgba(238,243,238,.3)">${t}</span>`).join('')}
      </div>
      <div class="row" style="position:absolute;left:0;right:0;bottom:0;gap:7mm;padding:6mm;border-radius:5mm;background:${C.yellow};color:${C.ground}">
        <div style="background:#fff;border-radius:2mm;padding:2mm;width:28mm;height:28mm">${await qr(url)}</div>
        <div><div class="disp" style="font-size:17pt">Lass uns sprechen.</div>
        <div style="font-size:10pt;font-weight:600;margin-top:2mm">${cfg.email} · ${cfg.handle}</div></div>
      </div>
    </div>
    <div class="ref" style="right:9mm;bottom:5mm">HLX-MRK-B01</div>`]) });

  const social = (w, h, title, sub, ph) => doc(`
    <div class="bg" style="width:${w}px;height:${h}px;position:relative;overflow:hidden">
      ${plates(C.yellow, .07, `right:${-w * 0.2}px;top:${h * 0.08}px;height:${h * 0.95}px`)}
      <div style="position:absolute;left:${w * 0.07}px;top:${h * 0.08}px">${logo(C.yellow, `height:${h * 0.045}px`)}</div>
      <div style="position:absolute;left:${w * 0.07}px;width:${ph ? w * 0.5 : w * 0.86}px;top:${h * 0.24}px">
        <div class="kick" style="font-size:${h * 0.024}px;margin-bottom:${h * 0.025}px">Partnerschaften</div>
        <h1 class="disp" style="font-size:${Math.min(h * 0.075, w * 0.055)}px">${title}</h1>
        <p class="m" style="font-size:${h * 0.03}px;line-height:1.4;margin-top:${h * 0.03}px">${sub}</p>
      </div>
      ${ph ? phone(ph, `position:absolute;height:${h * 0.72}px;width:auto;right:${w * 0.07}px;top:${h * 0.14}px;transform:rotate(4deg)`) : ''}
      <div class="row" style="position:absolute;left:${w * 0.07}px;bottom:${h * 0.07}px;gap:${w * 0.02}px;font-size:${h * 0.026}px;font-weight:600"><span class="pill" style="padding:${h * 0.018}px ${h * 0.035}px">Partner werden</span><span class="m">${cfg.email}</span></div>
    </div>`);
  A.push({ dir: '04_Marken-Firmen/Social', name: 'MRK-LinkedIn-Post_1200x1200', w: 1200, h: 1200, html: social(1200, 1200, `Gesündere Teams.<br><span class="y">Mit ${cfg.appName}.</span>`, 'Training, Ernährung und Routinen in einer App. Für Mitarbeitende, Kundschaft und Community.', 1) });
  A.push({ dir: '04_Marken-Firmen/Social', name: 'MRK-LinkedIn-Banner_1200x627', w: 1200, h: 627, html: social(1200, 627, `Gesundheit, die bleibt.<br><span class="y">Gemeinsam.</span>`, `Corporate Health, Kooperationen und Kampagnen mit ${cfg.brand}.`, 3) });
  return A;
}
