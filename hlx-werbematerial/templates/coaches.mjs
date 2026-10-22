// 05 Coaches: Personal Trainer und Ernährungscoaches für HLX Together gewinnen.
import { C, logo, icon, qr, phone, plates, doc, printDoc, link } from './lib.mjs';

export default async function coaches(cfg) {
  const A = [];
  const url = link(cfg, 'coaches');
  const pt = (ic, t, d) => `<div class="row" style="gap:4.5mm;align-items:flex-start">
      <div style="width:12mm;height:12mm;border-radius:3mm;background:${C.surface};display:flex;align-items:center;justify-content:center">${icon(ic, 26, C.yellow)}</div>
      <div><div class="wide" style="font-size:12pt">${t}</div><div class="m" style="font-size:9.5pt;line-height:1.4;margin-top:.8mm">${d}</div></div></div>`;

  A.push({ dir: '05_Coaches/A_Akquise-zum-Verschicken', name: 'COA-Info-A4_fuer-Coaches', pdf: true, html: printDoc(210, 297, 3, [`
    <div style="position:absolute;inset:0;background:${C.ground}"></div>
    <div style="position:absolute;left:0;right:0;top:0;height:120mm" class="bg"></div>
    ${plates(C.yellow, .07, 'right:-60mm;top:-10mm;height:150mm')}
    ${phone(2, 'position:absolute;width:42mm;right:22mm;top:22mm;transform:rotate(4deg)')}
    <div class="safe" style="inset:19mm 21mm">
      ${logo(C.yellow, 'height:11mm')}
      <div class="kick" style="font-size:9pt;margin-top:13mm">Für Personal Trainer &amp; Coaches</div>
      <h1 class="disp" style="font-size:30pt;margin-top:3mm;max-width:120mm">Coache mit<br><span class="y">${cfg.appName}.</span></h1>
      <p class="m" style="font-size:10.5pt;line-height:1.45;margin-top:5mm;max-width:112mm">Deine Klienten haben Plan, Ernährung und Routinen in einer App. Du hast mehr Zeit für das, was zählt: echtes Coaching auf Augenhöhe.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8mm 10mm;margin-top:24mm">
        ${pt('phone', 'Alles in einer App', 'Training, Ernährung, Rezepte, Schlaf und Gewicht an einem Ort.')}
        ${pt('chart', 'Fortschritt sichtbar', 'Einheiten, Makros und Streaks zeigen, was wirkt.')}
        ${pt('sparkle', 'Weniger Tabellen', 'Vorlagen, Rezepte und KI-Meal-Plan sparen dir Zeit.')}
        ${pt('heart', 'Eine Marke mit Haltung', 'Balance statt Verbote. Ehrlich, ohne Heilversprechen.')}
        ${pt('users', 'Online &amp; vor Ort', 'Für Online-Coaching genauso wie für Personal Training.')}
        ${pt('megaphone', 'Werbematerial inklusive', 'Fertige Vorlagen für Social, Flyer und QR-Aufsteller.')}
      </div>
      <h2 class="disp" style="font-size:15pt;margin-top:13mm">Werde Teil von ${cfg.brand}</h2>
      <div class="row" style="gap:6mm;margin-top:5mm;align-items:stretch">
        ${['Interesse anmelden', 'Kennenlerngespräch', 'Mit deinen Klienten starten'].map((t, i) => `<div style="flex:1;border-top:.6mm solid ${C.yellow};padding-top:3mm"><div class="disp y" style="font-size:20pt">${i + 1}</div><div style="font-size:10pt;line-height:1.35;margin-top:1.5mm">${t}</div></div>`).join('')}
      </div>
      <div class="row" style="position:absolute;left:0;right:0;bottom:0;gap:7mm;padding:6mm;border-radius:5mm;background:${C.yellow};color:${C.ground}">
        <div style="background:#fff;border-radius:2mm;padding:2mm;width:28mm;height:28mm">${await qr(url)}</div>
        <div><div class="disp" style="font-size:17pt">Jetzt Interesse anmelden.</div>
        <div style="font-size:10pt;font-weight:600;margin-top:2mm">${cfg.email} · ${cfg.handle}</div></div>
      </div>
    </div>
    <div class="ref" style="right:9mm;bottom:5mm">HLX-COA-B01</div>`]) });

  const S = '05_Coaches/C_HLX-eigene-Kanaele';
  const feed = (kick, title, sub, ph) => doc(`
    <div class="bg" style="width:1080px;height:1350px;position:relative;overflow:hidden">
      ${plates(C.yellow, .07, 'right:-260px;top:120px;height:1250px')}
      <div style="position:absolute;left:84px;top:80px">${logo(C.yellow, 'height:52px')}</div>
      <div style="position:absolute;left:84px;right:84px;top:210px">
        <div class="kick" style="font-size:28px;margin-bottom:26px">${kick}</div>
        <h1 class="disp" style="font-size:92px">${title}</h1>
        <p class="m" style="font-size:36px;line-height:1.35;margin-top:30px;max-width:880px">${sub}</p>
      </div>
      ${phone(ph, 'position:absolute;width:460px;left:130px;top:770px;transform:rotate(-4deg)')}
      <div style="position:absolute;right:84px;bottom:70px"><span class="pill" style="font-size:32px;padding:22px 44px">Interesse anmelden</span></div>
    </div>`);
  A.push({ dir: S, name: 'COA-Post-CoacheMitHLX_1080x1350', w: 1080, h: 1350, html: feed('Für Coaches', `Coache mit<br><span class="y">${cfg.appName}.</span>`, 'Plan, Ernährung und Routinen deiner Klienten in einer App.', 2) });
  A.push({ dir: S, name: 'COA-Post-MehrZeit_1080x1350', w: 1080, h: 1350, html: feed('Für Coaches', 'Weniger Tabellen.<br><span class="y">Mehr Coaching.</span>', 'Vorlagen, Rezepte und KI-Meal-Plan sparen dir Zeit.', 4) });
  A.push({ dir: S, name: 'COA-Story-WirSuchenCoaches_1080x1920', w: 1080, h: 1920, html: doc(`
    <div class="bg" style="width:1080px;height:1920px;position:relative;overflow:hidden">
      ${plates(C.yellow, .06, 'right:-330px;top:300px;height:1500px')}
      <div style="position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center">${logo(C.yellow, 'height:56px')}</div>
      <div class="kick" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:32px">Personal Trainer &amp; Coaches</div>
      <h1 class="disp" style="position:absolute;left:70px;right:70px;top:460px;text-align:center;font-size:110px">Wir suchen<br><span class="y">dich.</span></h1>
      <div class="col" style="position:absolute;left:110px;right:110px;top:840px;gap:34px;font-size:46px;font-weight:600">
        ${['Coaching auf Augenhöhe', 'Deine Klienten in einer App', 'Online und vor Ort', 'Marke mit Haltung'].map(t => `<div class="row" style="gap:20px">${icon('check', 54, C.yellow, 2.6)}${t}</div>`).join('')}
      </div>
      <div class="col" style="position:absolute;left:0;right:0;top:1480px;align-items:center;gap:22px">
        <span class="pill" style="font-size:42px;padding:28px 64px">Interesse anmelden</span>
        <span class="m" style="font-size:30px;font-weight:600">Link in Bio · ${cfg.handle}</span>
      </div>
    </div>`) });
  return A;
}
