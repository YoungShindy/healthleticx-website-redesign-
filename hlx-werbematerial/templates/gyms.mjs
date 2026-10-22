// 03 Gyms & Studios: QR-Aufsteller "powered by HLX", Sticker, Plakat, Partnerinfo.
// Für jeden Eintrag in config.partners entsteht zusätzlich eine Co-Branding-Version.
import fs from 'node:fs';
import { C, logo, icon, qr, phone, plates, poweredBy, doc, printDoc, link, qrCaption } from './lib.mjs';

const partnerMark = (p, k) => {
  if (p.logo && fs.existsSync(p.logo)) {
    const data = fs.readFileSync(p.logo).toString('base64');
    const mime = p.logo.endsWith('.svg') ? 'image/svg+xml' : p.logo.endsWith('.png') ? 'image/png' : 'image/jpeg';
    return `<img class="slot" data-slot="Euer Logo" src="data:${mime};base64,${data}" style="height:${12 * k}mm;max-width:${50 * k}mm;object-fit:contain">`;
  }
  return `<div class="wide slot" data-slot="Euer Logo" style="font-size:${13 * k}pt;padding:${2.2 * k}mm ${4 * k}mm;border:${0.5 * k}mm solid rgba(238,243,238,.5);border-radius:${2 * k}mm;text-transform:uppercase;letter-spacing:.06em">${p.name}</div>`;
};

export default async function gyms(cfg) {
  const url = link(cfg, 'gym');
  const A = [];
  const D = '03_Gyms-Studios/Druck', S = '03_Gyms-Studios/Social', B = '03_Gyms-Studios/Partnerinfo';
  const qrCard = async (mm, pad = 0.1) => `<div style="background:#fff;border-radius:${mm * 0.07}mm;padding:${mm * pad}mm;width:${mm}mm;height:${mm}mm">${await qr(url)}</div>`;
  const variants = [{ suffix: '', p: null }, ...cfg.partners.map(p => ({ suffix: `_CoBranding-${p.id}`, p }))];

  // ---------- QR-Aufsteller hoch (A6 + A5, gleiches Layout skaliert) ----------
  for (const [fmt, w, h] of [['A6', 105, 148], ['A5', 148, 210]]) {
    const k = w / 105;
    for (const { suffix, p } of variants) {
      A.push({ dir: D, name: `GYM-QR-Aufsteller-${fmt}-hoch${suffix}_3mm-Beschnitt`, pdf: true, html: printDoc(w, h, 3, [`
        <div class="bg" style="position:absolute;inset:0"></div>
        ${plates(C.yellow, .07, `right:${-40 * k}mm;top:${10 * k}mm;height:${140 * k}mm`)}
        <div class="safe col" style="align-items:center;text-align:center;inset:${9 * k}mm">
          ${p ? `<div class="row" style="gap:${3.5 * k}mm;height:${12 * k}mm">${partnerMark(p, k)}<span class="m" style="font-size:${12 * k}pt">×</span>${logo(C.yellow, `height:${7 * k}mm`)}</div>`
              : logo(C.yellow, `height:${9 * k}mm`)}
          <div class="kick" style="font-size:${7.5 * k}pt;margin-top:${7 * k}mm">${p ? 'Neu bei uns' : 'Trainierst du schon smart?'}</div>
          <h1 class="disp" style="font-size:${19 * k}pt;margin-top:${2.5 * k}mm;line-height:1.02">Dein Training.<br>Deine Ernährung.<br><span class="y">Eine App.</span></h1>
          <div style="margin-top:${6 * k}mm;background:${C.yellow};border-radius:${4.5 * k}mm;padding:${4 * k}mm">${await qrCard(44 * k)}</div>
          <div class="disp" style="font-size:${12.5 * k}pt;margin-top:${4 * k}mm">Scannen &amp; <span class="y">kostenlos starten</span></div>
          <div class="m" style="font-size:${7 * k}pt;margin-top:${1.5 * k}mm">${cfg.appName} · ${qrCaption(cfg)}</div>
          <div style="margin-top:auto">${poweredBy(C.muted, C.yellow, 6.2 * k * 3.78)}</div>
        </div>
        <div class="ref" style="right:${4.5 * k}mm;bottom:4.2mm">HLX-GYM-${fmt}${p ? '-CB' : ''}</div>`]) });
    }
  }

  // ---------- Tischaufsteller zum Falten (A4 hoch, Falz in der Mitte) ----------
  for (const { suffix, p } of variants) {
    const panel = await (async () => `
      <div class="bg" style="position:absolute;inset:0"></div>
      ${plates(C.yellow, .06, 'right:60mm;top:-10mm;height:170mm')}
      <div class="row" style="position:absolute;inset:14mm 15mm 12mm;gap:12mm;align-items:stretch">
        <div class="col" style="flex:1">
          ${p ? `<div class="row" style="gap:4mm;height:12mm">${partnerMark(p, 1)}<span class="m" style="font-size:12pt">×</span>${logo(C.yellow, 'height:7mm')}</div>` : logo(C.yellow, 'height:10mm')}
          <h1 class="disp" style="font-size:24pt;margin-top:8mm;line-height:1.02">Dein Training.<br>Deine Ernährung.<br><span class="y">Eine App.</span></h1>
          <p class="m" style="font-size:10pt;line-height:1.4;margin-top:4mm">Trainings loggen, Kalorien und Makros im Blick, Rezepte mit Einkaufsliste.</p>
          <div style="margin-top:auto">${poweredBy(C.muted, C.yellow, 22)}</div>
        </div>
        <div class="col" style="width:66mm;align-items:center;text-align:center;justify-content:center;background:${C.yellow};border-radius:6mm;padding:6mm;color:${C.ground}">
          ${await qrCard(48)}
          <div class="disp" style="font-size:13pt;margin-top:4mm">Scannen &amp;<br>kostenlos starten</div>
          <div style="font-size:7.5pt;margin-top:1.5mm;font-weight:600">${cfg.appName} · ${qrCaption(cfg)}</div>
        </div>
      </div>`)();
    A.push({ dir: D, name: `GYM-Tischaufsteller-A4-zum-Falten${suffix}_3mm-Beschnitt`, pdf: true, html: printDoc(210, 297, 3, [`
      <div style="position:absolute;inset:0;background:${C.ground}"></div>
      <div style="position:absolute;left:0;right:0;top:0;height:151.5mm;transform:rotate(180deg)"><div style="position:absolute;inset:0 0 3mm 0">${panel}</div></div>
      <div style="position:absolute;left:0;right:0;top:151.5mm;height:151.5mm"><div style="position:absolute;inset:0 0 3mm 0">${panel}</div></div>
      <div class="ref" style="left:6mm;top:150.5mm;font-size:5.5pt;color:rgba(169,194,186,.45)">Falz</div>
      <div class="ref" style="right:9mm;bottom:4.5mm">HLX-GYM-T01${p ? '-CB' : ''}</div>`]) });
  }

  // ---------- QR-Sticker 80 x 80 mm ----------
  A.push({ dir: D, name: 'GYM-QR-Sticker-80x80mm_2mm-Beschnitt', pdf: true, html: printDoc(80, 80, 2, [`
    <div style="position:absolute;inset:0;background:${C.yellow}"></div>
    <div class="col" style="position:absolute;inset:7mm;align-items:center;color:${C.ground}">
      <div class="disp" style="font-size:12pt">Scan mich</div>
      <div style="margin-top:3mm">${await qrCard(44, 0.06)}</div>
      <div style="margin-top:auto">${poweredBy(C.ground, C.ground, 22)}</div>
    </div>`]) });

  // ---------- Plakat A3 ----------
  A.push({ dir: D, name: 'GYM-Plakat-A3_skalierbar-A2-A1_3mm-Beschnitt', pdf: true, html: printDoc(297, 420, 3, [`
    <div class="bg" style="position:absolute;inset:0"></div>
    ${plates(C.yellow, .07, 'right:-110mm;top:40mm;height:400mm')}
    <div class="safe" style="inset:21mm">
      ${logo(C.yellow, 'height:18mm')}
      <div class="kick" style="font-size:15pt;margin-top:20mm">Für alle Mitglieder</div>
      <h1 class="disp" style="font-size:62pt;margin-top:6mm">Trainiere smarter.<br><span class="y">Iss entspannter.</span></h1>
      <p class="m" style="font-size:19pt;line-height:1.35;margin-top:8mm;max-width:210mm">Mit ${cfg.appName} hast du Training, Ernährung und Routinen in einer App. Kostenlos starten, direkt hier im Studio.</p>
    </div>
    ${phone(2, 'position:absolute;width:88mm;left:22mm;top:210mm;transform:rotate(-5deg)')}
    ${phone(3, 'position:absolute;width:88mm;left:108mm;top:198mm;transform:rotate(3deg)')}
    <div class="col" style="position:absolute;right:21mm;bottom:22mm;width:76mm;align-items:center;gap:5mm;text-align:center">
      <div style="background:${C.yellow};border-radius:7mm;padding:6mm">${await qrCard(62)}</div>
      <div class="disp" style="font-size:22pt">Scannen &amp;<br><span class="y">kostenlos starten.</span></div>
      ${poweredBy(C.muted, C.yellow, 28)}
    </div>
    <div class="ref" style="left:24mm;bottom:9mm;font-size:8pt">HLX-GYM-P01 · ${qrCaption(cfg)}</div>`]) });

  // ---------- Partnerinfo A4 (für Studio-Betreiber) ----------
  const benefit = (ic, t, d) => `<div class="row" style="gap:4.5mm;align-items:flex-start">
      <div style="width:12mm;height:12mm;border-radius:3mm;background:${C.surface};display:flex;align-items:center;justify-content:center">${icon(ic, 26, C.yellow)}</div>
      <div><div class="wide" style="font-size:12pt">${t}</div><div class="m" style="font-size:9.5pt;line-height:1.4;margin-top:.8mm">${d}</div></div></div>`;
  A.push({ dir: B, name: 'GYM-Partnerinfo-A4_fuer-Studiobetreiber', pdf: true, html: printDoc(210, 297, 3, [`
    <div style="position:absolute;inset:0;background:${C.ground}"></div>
    <div style="position:absolute;left:0;right:0;top:0;height:118mm" class="bg"></div>
    ${plates(C.yellow, .07, 'right:-60mm;top:-10mm;height:150mm')}
    ${phone(1, 'position:absolute;width:56mm;right:20mm;top:30mm;transform:rotate(4deg)')}
    <div class="safe" style="inset:19mm 21mm">
      ${logo(C.yellow, 'height:11mm')}
      <div class="kick" style="font-size:9pt;margin-top:13mm">Partnerschaft für Gyms &amp; Studios</div>
      <h1 class="disp" style="font-size:30pt;margin-top:3mm;max-width:118mm">Mehr Wert für eure Mitglieder.<br><span class="y">Ohne Mehraufwand.</span></h1>
      <p class="m" style="font-size:10.5pt;line-height:1.45;margin-top:5mm;max-width:112mm">${cfg.appName} bündelt Training, Ernährung und Routinen in einer App. Eure Mitglieder starten kostenlos, ihr bietet modernen Service unter eurem Namen: <b style="color:${C.text}">powered by HLX</b>.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8mm 10mm;margin-top:24mm">
        ${benefit('users', 'Bindung statt Kündigung', 'Mitglieder, die Fortschritt sehen und Routinen aufbauen, bleiben dran.')}
        ${benefit('dumbbell', 'Training im Blick', 'Einheiten loggen, Vorlagen nutzen, Dauer und Puls auswerten.')}
        ${benefit('apple', 'Ernährung ohne Verbote', 'Kalorien, Makros, Rezepte und KI-Meal-Plan mit Einkaufsliste.')}
        ${benefit('megaphone', 'Fertiges Werbematerial', 'QR-Aufsteller, Plakate, Sticker und Social-Vorlagen, auch mit eurem Logo.')}
        ${benefit('shield', 'Kein technischer Aufwand', 'Keine Integration nötig. QR-Code aufstellen, fertig.')}
        ${benefit('heart', 'Haltung, die passt', 'Gesundheit ohne Verzicht, auf Augenhöhe, für jedes Level.')}
      </div>
      <h2 class="disp" style="font-size:15pt;margin-top:13mm">So einfach geht's</h2>
      <div class="row" style="gap:6mm;margin-top:5mm;align-items:stretch">
        ${['Kurz austauschen und Material auswählen', 'Wir liefern Aufsteller &amp; Vorlagen mit eurem Logo', 'Aufstellen, posten, Mitglieder starten'].map((t, i) => `<div style="flex:1;border-top:.6mm solid ${C.yellow};padding-top:3mm"><div class="disp y" style="font-size:20pt">${i + 1}</div><div style="font-size:10pt;line-height:1.35;margin-top:1.5mm">${t}</div></div>`).join('')}
      </div>
      <div class="row" style="position:absolute;left:0;right:0;bottom:0;gap:7mm;padding:6mm;border-radius:5mm;background:${C.yellow};color:${C.ground}">
        <div style="background:#fff;border-radius:2mm;padding:2mm;width:28mm;height:28mm">${await qr(link(cfg, 'marken'))}</div>
        <div><div class="disp" style="font-size:17pt">Partner werden</div>
        <div style="font-size:10pt;font-weight:600;margin-top:2mm">${cfg.email} · ${cfg.handle}</div></div>
      </div>
    </div>
    <div class="ref" style="right:9mm;bottom:5mm">HLX-GYM-B01</div>`]) });

  // ---------- Social für Studios ----------
  for (const { suffix, p } of variants) {
    const head = p ? `<div class="row" style="position:absolute;left:0;right:0;top:230px;justify-content:center;gap:28px"><div class="wide slot" data-slot="Euer Logo" style="font-size:40px;padding:14px 28px;border:3px solid rgba(238,243,238,.5);border-radius:16px;text-transform:uppercase;letter-spacing:.06em">${p.name}</div><span class="m" style="font-size:40px">×</span>${logo(C.yellow, 'height:50px')}</div>`
      : `<div style="position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center">${logo(C.yellow, 'height:56px')}</div>`;
    A.push({ dir: S, name: `GYM-Story-NeuBeiUns${suffix}_1080x1920`, w: 1080, h: 1920, html: doc(`
      <div class="bg" style="width:1080px;height:1920px;position:relative;overflow:hidden">
        ${plates(C.yellow, .06, 'right:-330px;top:300px;height:1500px')}
        ${head}
        <div class="kick" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:32px">Neu bei uns</div>
        <h1 class="disp" style="position:absolute;left:70px;right:70px;top:460px;text-align:center;font-size:100px">Training &amp; Ernährung.<br><span class="y">Eine App.</span></h1>
        ${phone(2, 'position:absolute;width:440px;left:320px;top:820px;clip-path:inset(0 0 30% 0)')}
        <div class="col" style="position:absolute;left:0;right:0;top:1480px;align-items:center;gap:26px">
          <span class="pill" style="font-size:40px;padding:26px 60px">QR-Code im Studio scannen</span>
          ${poweredBy(C.muted, C.yellow, 40)}
        </div>
      </div>`) });
  }
  A.push({ dir: S, name: 'GYM-Post-PoweredByHLX_1080x1350', w: 1080, h: 1350, html: doc(`
    <div class="bg" style="width:1080px;height:1350px;position:relative;overflow:hidden">
      ${plates(C.yellow, .07, 'right:-260px;top:120px;height:1250px')}
      <div style="position:absolute;left:84px;top:80px">${logo(C.yellow, 'height:52px')}</div>
      <div style="position:absolute;left:84px;right:84px;top:210px">
        <div class="kick" style="font-size:28px;margin-bottom:26px">Für alle Mitglieder</div>
        <h1 class="disp" style="font-size:80px">Trainiere smarter.<br><span class="y">Iss entspannter.</span></h1>
        <p class="m" style="font-size:36px;line-height:1.35;margin-top:30px;max-width:880px">Scanne den QR-Code bei uns im Studio und starte kostenlos mit ${cfg.appName}.</p>
      </div>
      ${phone(1, 'position:absolute;width:480px;left:300px;top:760px;transform:rotate(-4deg)')}
      <div style="position:absolute;right:84px;bottom:76px">${poweredBy(C.text, C.yellow, 40)}</div>
    </div>`) });

  return A;
}
