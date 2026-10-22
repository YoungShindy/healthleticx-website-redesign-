// 01 Endnutzer (Klienten): kostenlos starten, Premium für mehr.
import { C, logo, icon, qr, phone, plates, doc, printDoc, link, qrCaption } from './lib.mjs';

const chip = (ic, t) => `<span class="chip">${icon(ic, 30, C.yellow)}${t}</span>`;
const SOCIAL = `
.s{position:relative;overflow:hidden}
.chip{display:inline-flex;align-items:center;gap:12px;padding:14px 22px;border-radius:999px;background:rgba(238,243,238,.07);border:1.5px solid rgba(238,243,238,.14);font-size:28px;font-weight:600}
.chips{display:flex;flex-wrap:wrap;gap:14px}`;

function slide({ n, total = 5, kicker, title, sub, chips = [], ph, tilt = -4 }) {
  return `<div class="s bg" style="width:1080px;height:1350px">
    ${plates(C.yellow, .07, 'right:-260px;top:120px;height:1250px')}
    <div style="position:absolute;left:84px;top:80px">${logo(C.yellow, 'height:52px')}</div>
    <div class="m" style="position:absolute;right:84px;top:92px;font-size:28px;font-weight:600">${n}/${total}</div>
    <div style="position:absolute;left:84px;right:84px;top:210px">
      <div class="kick" style="font-size:28px;margin-bottom:26px">${kicker}</div>
      <h1 class="disp" style="font-size:100px;margin-bottom:30px">${title}</h1>
      <p class="m" style="font-size:36px;line-height:1.35;max-width:860px;margin-bottom:34px">${sub}</p>
      <div class="chips">${chips.map(c => chip(...c)).join('')}</div>
    </div>
    ${phone(ph, `position:absolute;width:560px;left:260px;top:${chips.length ? 790 : 700}px;transform:rotate(${tilt}deg)`)}
    ${n < total ? `<div class="row" style="position:absolute;right:84px;bottom:70px;gap:12px;font-size:28px;font-weight:700;color:${C.yellow}">Wischen ${icon('arrow', 34, C.yellow, 2.2)}</div>` : ''}
  </div>`;
}

export default async function endnutzer(cfg) {
  const url = link(cfg, 'endnutzer');
  const A = [];
  const S = '01_Endnutzer/Social/Allgemein', P = '01_Endnutzer/Druck';

  // ---------- Karussell 4:5 ----------
  const slides = [
    { kicker: cfg.appName, title: 'Gesund leben.<br><span class="y">Ohne Verzicht.</span>', sub: 'Training, Ernährung und Routinen in einer App. Für jedes Level.', chips: [['dumbbell', 'Training'], ['apple', 'Ernährung'], ['moon', 'Schlaf & Routinen']], ph: 1 },
    { kicker: '01 · Training', title: 'Jede Einheit<br>im Blick.', sub: 'Vorlagen nutzen oder frei eintragen. Dauer, Puls und Fortschritt automatisch.', chips: [['dumbbell', 'Studio'], ['users', 'Zuhause'], ['target', 'Draußen']], ph: 2 },
    { kicker: '02 · Ernährung', title: 'Balance<br><span class="y">statt Verbote.</span>', sub: 'Kalorien und Makros auf einen Blick. Essen, das dir schmeckt und dich stärkt.', chips: [['apple', 'Kalorien'], ['chart', 'Makros'], ['calendar', 'Mahlzeiten']], ph: 3 },
    { kicker: '03 · Rezepte & Meal Prep', title: 'Woche planen.<br>Liste fertig.', sub: 'Rezepte speichern, KI-Meal-Plan erstellen, Einkaufsliste automatisch.', chips: [['chef', 'Rezepte'], ['sparkle', 'KI-Meal-Plan']], ph: 4 },
  ];
  slides.forEach((s, i) => A.push({ dir: S, name: `END-Karussell-${i + 1}von5_1080x1350`, w: 1080, h: 1350, html: doc(slide({ ...s, n: i + 1 }), SOCIAL) }));
  A.push({ dir: S, name: 'END-Karussell-5von5_1080x1350', w: 1080, h: 1350, html: doc(`
    <div class="s bg" style="width:1080px;height:1350px">
      ${plates(C.yellow, .07, 'right:-260px;top:120px;height:1250px')}
      <div style="position:absolute;left:84px;top:80px">${logo(C.yellow, 'height:52px')}</div>
      <div class="m" style="position:absolute;right:84px;top:92px;font-size:28px;font-weight:600">5/5</div>
      <div class="col" style="position:absolute;left:84px;right:84px;top:300px;gap:40px">
        <div class="kick" style="font-size:28px">${cfg.appName}</div>
        <h1 class="disp" style="font-size:150px">Kostenlos<br><span class="y">starten.</span></h1>
        <p style="font-size:44px;line-height:1.3;font-weight:600">Premium, wenn du mehr willst.</p>
        <div class="col" style="gap:22px;margin-top:20px;font-size:34px">
          ${['Training, Ernährung und Schlaf in einer App', 'Streaks, die dich dranbleiben lassen', 'Kein Abo nötig, um loszulegen'].map(t => `<div class="row" style="gap:20px">${icon('check', 40, C.yellow, 2.6)}${t}</div>`).join('')}
        </div>
      </div>
      <div style="position:absolute;left:84px;right:84px;bottom:90px" class="row">
        <span class="pill" style="font-size:38px;padding:26px 52px">Link in Bio</span>
        <span class="m" style="font-size:32px;margin-left:30px;font-weight:600">${cfg.handle}</span>
      </div>
    </div>`, SOCIAL) });

  // ---------- Einzelposts 1:1 ----------
  const disc = (label, fill, stroke, txt) => `<div class="col" style="align-items:center;gap:22px">
      <div style="width:120px;height:300px;border-radius:14px;background:${fill};border:6px solid ${stroke}"></div>
      <div class="wide" style="font-size:34px;color:${txt}">${label}</div></div>`;
  A.push({ dir: S, name: 'END-Post-DreiScheiben_1080x1080', w: 1080, h: 1080, html: doc(`
    <div class="s bg" style="width:1080px;height:1080px">
      <div style="position:absolute;left:84px;top:80px">${logo(C.yellow, 'height:48px')}</div>
      <div style="position:absolute;left:84px;right:84px;top:210px;text-align:center">
        <h1 class="disp" style="font-size:96px">Drei Scheiben.<br><span class="y">Ein Lifestyle.</span></h1>
      </div>
      <div class="row" style="position:absolute;left:0;right:0;top:510px;justify-content:center;gap:70px">
        ${disc('Training', C.yellow, C.yellow, C.text)}${disc('Ernährung', C.petrol, C.mint, C.text)}${disc('Mindset', C.grey, C.grey, C.text)}
      </div>
      <div style="position:absolute;left:84px;right:84px;bottom:76px;text-align:center;font-size:32px" class="m">Alles in einer App: <b style="color:${C.text}">${cfg.appName}</b> · kostenlos starten</div>
    </div>`, SOCIAL) });

  A.push({ dir: S, name: 'END-Post-Zitat_1080x1080', w: 1080, h: 1080, html: doc(`
    <div class="s" style="width:1080px;height:1080px;background:${C.yellow};color:${C.ground}">
      ${plates(C.ground, .08, 'right:-200px;top:-40px;height:1160px')}
      <div style="position:absolute;left:96px;top:96px">${logo(C.ground, 'height:50px')}</div>
      <div style="position:absolute;left:96px;right:120px;top:300px">
        <p class="disp" style="font-size:78px;line-height:1.05">„Gesundheit soll sich nicht nach Verzicht anfühlen, sondern nach Leben.“</p>
      </div>
      <div class="row" style="position:absolute;left:96px;right:96px;bottom:90px;justify-content:space-between;font-size:32px;font-weight:700">
        <span>${cfg.appName}</span><span>${cfg.handle}</span>
      </div>
    </div>`, SOCIAL) });

  // ---------- Stories 9:16 ----------
  const story = inner => `<div class="s bg" style="width:1080px;height:1920px">
      ${plates(C.yellow, .06, 'right:-330px;top:300px;height:1500px')}
      <div style="position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center">${logo(C.yellow, 'height:56px')}</div>
      ${inner}</div>`;
  const ctaRow = (t = 'Kostenlos starten') => `<div class="col" style="position:absolute;left:0;right:0;top:1500px;align-items:center;gap:22px">
      <span class="pill" style="font-size:42px;padding:28px 64px">${t}</span>
      <span class="m" style="font-size:30px;font-weight:600">Link in Bio · ${cfg.handle}</span></div>`;

  A.push({ dir: S, name: 'END-Story-DeinPlan_1080x1920', w: 1080, h: 1920, html: doc(story(`
      <h1 class="disp" style="position:absolute;left:80px;right:80px;top:380px;text-align:center;font-size:104px">Dein Plan.<br><span class="y">Immer dabei.</span></h1>
      ${phone(1, 'position:absolute;width:440px;left:320px;top:640px;clip-path:inset(0 0 24% 0)')}
      ${ctaRow()}`), SOCIAL) });

  A.push({ dir: S, name: 'END-Story-Tag1_1080x1920', w: 1080, h: 1920, html: doc(story(`
      <div class="col" style="position:absolute;left:80px;right:80px;top:390px;align-items:center;text-align:center;gap:30px">
        <div class="row" style="gap:16px;font-size:34px;font-weight:700" class="mint">${icon('flame', 44, C.mint, 2.2)}<span style="color:${C.mint}">20-Tage-Streak?</span></div>
        <h1 class="disp" style="font-size:118px">Fang bei<br><span class="y">Tag 1</span> an.</h1>
        <p class="m" style="font-size:38px;line-height:1.35;max-width:820px">Kleine Routinen, die bleiben. Lieber wenig und dauerhaft als viel und nur kurz.</p>
      </div>
      <div class="row" style="position:absolute;left:0;right:0;top:1130px;justify-content:center;gap:18px">
        ${['M', 'D', 'M', 'D', 'F', 'S', 'S'].map((d, i) => `<div class="col" style="align-items:center;gap:14px"><div style="width:98px;height:98px;border-radius:24px;display:flex;align-items:center;justify-content:center;${i === 0 ? `background:${C.yellow}` : 'border:3px solid rgba(238,243,238,.22)'}">${i === 0 ? icon('check', 54, C.ground, 3) : ''}</div><span class="m" style="font-size:28px;font-weight:700">${d}</span></div>`).join('')}
      </div>
      ${ctaRow()}`), SOCIAL) });

  A.push({ dir: S, name: 'END-Story-KostenlosPremium_1080x1920', w: 1080, h: 1920, html: doc(story(`
      <h1 class="disp" style="position:absolute;left:80px;right:80px;top:390px;text-align:center;font-size:84px">Starte kostenlos.<br><span class="y">Wachse mit Premium.</span></h1>
      <div class="col" style="position:absolute;left:90px;right:90px;top:700px;gap:30px">
        <div style="border-radius:36px;padding:48px 52px;background:rgba(238,243,238,.06);border:2px solid rgba(238,243,238,.16)">
          <div class="kick" style="font-size:28px;color:${C.mint};margin-bottom:16px">Kostenlos</div>
          <p class="wide" style="font-size:50px;margin-bottom:14px">Alles, um loszulegen.</p>
          <p class="m" style="font-size:32px;line-height:1.35">Training loggen, Ernährung tracken, Routinen aufbauen.</p>
        </div>
        <div style="border-radius:36px;padding:48px 52px;background:${C.yellow};color:${C.ground}">
          <div class="kick" style="font-size:28px;color:${C.ground};margin-bottom:16px">Premium</div>
          <p class="wide" style="font-size:50px;margin-bottom:14px">Alles freigeschaltet.</p>
          <p style="font-size:32px;line-height:1.35;font-weight:500">Für alle, die mehr wollen. Jederzeit upgraden.</p>
        </div>
      </div>
      ${ctaRow()}`), SOCIAL) });

  // ---------- Druck ----------
  const qrBox = async (mm) => `<div style="background:#fff;border-radius:${mm * 0.08}mm;padding:${mm * 0.09}mm;width:${mm}mm;height:${mm}mm">${await qr(url)}</div>`;
  const features = (size = 10.5) => [
    ['dumbbell', 'Training', 'Vorlagen oder frei eintragen, Fortschritt sehen.'],
    ['apple', 'Ernährung', 'Kalorien und Makros, ohne Verbote.'],
    ['chef', 'Rezepte & Meal Prep', 'KI-Meal-Plan mit Einkaufsliste.'],
    ['moon', 'Schlaf, Gewicht, Streaks', 'Routinen, die bleiben.'],
  ].map(([ic, t, d]) => `<div class="row" style="gap:3.5mm;align-items:flex-start">
      <div style="width:${size}mm;height:${size}mm;border-radius:2.6mm;background:${C.surface};display:flex;align-items:center;justify-content:center">${icon(ic, size * 2.3, C.yellow, 1.9)}</div>
      <div><div class="wide" style="font-size:${size * 1.02}pt">${t}</div><div class="m" style="font-size:${size * 0.82}pt;line-height:1.35">${d}</div></div></div>`).join('');

  // Flyer A5 beidseitig
  A.push({ dir: P, name: 'END-Flyer-A5_beidseitig_3mm-Beschnitt', pdf: true, html: printDoc(148, 210, 3, [
    `<div class="bg" style="position:absolute;inset:0"></div>
     ${plates(C.yellow, .07, 'right:-55mm;top:20mm;height:200mm')}
     <div class="safe">
       ${logo(C.yellow, 'height:11mm')}
       <div class="kick" style="font-size:9pt;margin-top:14mm">${cfg.appName}</div>
       <h1 class="disp" style="font-size:40pt;margin-top:4mm">Gesund leben.<br><span class="y">Ohne Verzicht.</span></h1>
       <p class="m" style="font-size:11pt;line-height:1.4;margin-top:5mm;max-width:105mm">Training, Ernährung und Routinen in einer App. Für jedes Level, im Studio, zu Hause oder draußen.</p>
     </div>
     ${phone(1, 'position:absolute;width:62mm;left:14mm;top:118mm;transform:rotate(-5deg)')}
     ${phone(3, 'position:absolute;width:62mm;left:80mm;top:108mm;transform:rotate(5deg)')}`,
    `<div style="position:absolute;inset:0;background:${C.ground}"></div>
     <div class="safe col" style="gap:6.5mm">
       <h2 class="disp" style="font-size:24pt">Alles, was du brauchst.<br><span class="y">In einer App.</span></h2>
       <div class="col" style="gap:7mm;margin-top:6mm">${features(13)}</div>
       <div class="row" style="gap:7mm;margin-top:auto;padding:6mm;border-radius:5mm;background:${C.yellow};color:${C.ground}">
         ${await qrBox(34)}
         <div><div class="disp" style="font-size:20pt">Scannen &amp;<br>kostenlos starten.</div>
         <div style="font-size:10pt;font-weight:600;margin-top:3mm">Premium, wenn du mehr willst.</div></div>
       </div>
       <div class="row" style="justify-content:space-between;font-size:9pt" class="m"><span class="m">${qrCaption(cfg)}</span><span class="m">${cfg.brand} · ${cfg.claim}</span></div>
     </div>
     <div class="ref" style="right:9mm;bottom:5mm">HLX-END-F01</div>`,
  ]) });

  // Postkarte A6 beidseitig
  A.push({ dir: P, name: 'END-Postkarte-A6_beidseitig_3mm-Beschnitt', pdf: true, html: printDoc(105, 148, 3, [
    `<div class="bg" style="position:absolute;inset:0"></div>
     <div class="safe">
       ${logo(C.yellow, 'height:8mm')}
       <h1 class="disp" style="font-size:25pt;margin-top:8mm">Dein Plan.<br><span class="y">Immer dabei.</span></h1>
     </div>
     ${phone(1, 'position:absolute;width:52mm;left:29mm;top:58mm;transform:rotate(-4deg)')}`,
    `<div style="position:absolute;inset:0;background:${C.ground}"></div>
     <div class="safe col" style="gap:4.2mm">
       <div class="kick" style="font-size:7.5pt">${cfg.appName}</div>
       <h2 class="disp" style="font-size:17pt">Training, Ernährung,<br>Routinen. <span class="y">Eine App.</span></h2>
       <div class="col" style="gap:3.4mm">${features(8)}</div>
       <div class="row" style="gap:5mm;margin-top:auto">
         ${await qrBox(26)}
         <div><div class="disp" style="font-size:13pt">Scannen &amp;<br><span class="y">kostenlos starten.</span></div>
         <div class="m" style="font-size:7.5pt;margin-top:2mm">${qrCaption(cfg)}</div></div>
       </div>
     </div>
     <div class="ref" style="right:7mm;bottom:4.5mm">HLX-END-K01</div>`,
  ]) });

  // Plakat A3 (skaliert verlustfrei auf A2/A1)
  A.push({ dir: P, name: 'END-Plakat-A3_skalierbar-A2-A1_3mm-Beschnitt', pdf: true, html: printDoc(297, 420, 3, [
    `<div class="bg" style="position:absolute;inset:0"></div>
     ${plates(C.yellow, .07, 'right:-110mm;top:40mm;height:400mm')}
     <div class="safe" style="inset:21mm">
       ${logo(C.yellow, 'height:20mm')}
       <h1 class="disp" style="font-size:64pt;margin-top:20mm">Gesund leben.<br><span class="y">Ohne Verzicht.</span></h1>
       <p class="m" style="font-size:21pt;line-height:1.35;margin-top:9mm;max-width:200mm">Training, Ernährung und Routinen in einer App: <b style="color:${C.text}">${cfg.appName}</b>.</p>
     </div>
     ${phone(2, 'position:absolute;width:88mm;left:22mm;top:200mm;transform:rotate(-5deg)')}
     ${phone(1, 'position:absolute;width:88mm;left:108mm;top:188mm;transform:rotate(3deg)')}
     <div class="col" style="position:absolute;right:21mm;bottom:24mm;width:72mm;align-items:center;gap:5mm;text-align:center">
       <div style="background:${C.yellow};border-radius:7mm;padding:6mm">${await qrBox(60)}</div>
       <div class="disp" style="font-size:22pt">Scannen &amp;<br><span class="y">kostenlos starten.</span></div>
       <div class="m" style="font-size:12pt">${qrCaption(cfg)}</div>
     </div>
     <div class="ref" style="left:24mm;bottom:9mm;font-size:8pt">HLX-END-P01 · ${cfg.brand} · ${cfg.claim}</div>`,
  ]) });

  return A;
}
