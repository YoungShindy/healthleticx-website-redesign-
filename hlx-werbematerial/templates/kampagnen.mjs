// Kampagnen: klassische App-Werbung, Nischen-Serie, "Offizieller Partner"-Vorlagen, Recruiting.
// .slot = Platzhalter für Logo/Foto (in der PPTX ein markiertes Feld), .po = Text nur in der PPTX sichtbar.
import { C, logo, icon, phone, plates, poweredBy, doc } from './lib.mjs';

const EXTRA = `.s{position:relative;overflow:hidden}`;
const slot = (label, style) => `<div class="slot po" data-slot="${label}" style="position:absolute;${style}"></div>`;
const bullets = (items, size, gap, iconSize) => items.map(([ic, t]) =>
  `<div class="row" style="gap:${size * 0.55}px;font-size:${size}px;font-weight:600;line-height:1.2">${icon(ic, iconSize, C.yellow, 2.2)}<span>${t}</span></div>`).join('');

// Werbe-Story 1080x1920: Titel oben, Handy Mitte, Punkte unten, CTA
function promoStory({ kick, title, items, ph, cta = 'Kostenlos starten', foot, clip = 46 }) {
  const n = items.length;
  const listTop = n > 3 ? 1060 : 1180;
  return `<div class="s bg" style="width:1080px;height:1920px">
    ${plates(C.yellow, .06, 'right:-330px;top:300px;height:1500px')}
    <div style="position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center">${logo(C.yellow, 'height:56px')}</div>
    <div class="kick" style="position:absolute;left:0;right:0;top:370px;text-align:center;font-size:30px">${kick}</div>
    <h1 class="disp" style="position:absolute;left:60px;right:60px;top:430px;text-align:center;font-size:92px">${title}</h1>
    ${phone(ph, `position:absolute;width:${n > 3 ? 360 : 400}px;left:${n > 3 ? 360 : 340}px;top:660px;clip-path:inset(0 0 ${n > 3 ? 56 : clip}% 0)`)}
    <div class="col" style="position:absolute;left:150px;right:120px;top:${listTop}px;gap:${n > 3 ? 24 : 28}px">${bullets(items, n > 3 ? 38 : 42, 0, n > 3 ? 46 : 50)}</div>
    <div class="col" style="position:absolute;left:0;right:0;top:1500px;align-items:center;gap:22px">
      <span class="pill" style="font-size:42px;padding:28px 64px">${cta}</span>
      <span class="m" style="font-size:30px;font-weight:600">${foot}</span>
    </div></div>`;
}

// Werbe-Post 1080x1350: Text links, Handy rechts
function promoPost({ kick, title, items, ph, cta = 'Kostenlos starten', foot }) {
  return `<div class="s bg" style="width:1080px;height:1350px">
    ${plates(C.yellow, .07, 'right:-260px;top:120px;height:1250px')}
    <div style="position:absolute;left:84px;top:80px">${logo(C.yellow, 'height:50px')}</div>
    <div style="position:absolute;left:84px;right:84px;top:200px">
      <div class="kick" style="font-size:28px;margin-bottom:24px">${kick}</div>
      <h1 class="disp" style="font-size:80px">${title}</h1>
    </div>
    <div class="col" style="position:absolute;left:84px;width:560px;top:${items.length > 3 ? 500 : 540}px;gap:${items.length > 3 ? 26 : 34}px">${bullets(items, 32, 0, 40)}</div>
    ${phone(ph, 'position:absolute;width:380px;left:640px;top:500px;transform:rotate(4deg)')}
    <div class="col" style="position:absolute;left:84px;bottom:80px;gap:18px">
      <span class="pill" style="font-size:34px;padding:22px 46px;align-self:flex-start">${cta}</span>
      <span class="m" style="font-size:26px;font-weight:600">${foot}</span>
    </div></div>`;
}

// Abzeichen "Offizieller Partner ..."
const badge = (pre, role, s = 1) => `<div style="width:${660 * s}px;padding:${44 * s}px ${36 * s}px ${48 * s}px;border-radius:${44 * s}px;background:${C.yellow};color:${C.ground};text-align:center;box-shadow:0 0 0 ${14 * s}px rgba(255,255,0,.16)">
    <div style="font-size:${30 * s}px;font-weight:750;letter-spacing:.16em;text-transform:uppercase">${pre}</div>
    <div class="disp" style="font-size:${60 * s}px;white-space:nowrap;margin:${12 * s}px 0 ${26 * s}px">${role}</div>
    <div style="display:flex;justify-content:center">${logo(C.ground, `height:${58 * s}px`)}</div></div>`;

export default async function kampagnen(cfg) {
  const A = [];
  const foot = `Premium, wenn du mehr willst · ${cfg.handle}`;

  // ---------- Klassische App-Werbung ----------
  const AW = '01_Endnutzer/Social/App-Werbung';
  const was = { kick: `Die App von ${cfg.brand}`, title: `Was ist<br><span class="y">${cfg.appName}?</span>`, ph: 1, foot,
    items: [['dumbbell', 'Training loggen, mit Vorlagen'], ['apple', 'Kalorien und Makros tracken'], ['chef', 'Rezepte und KI-Meal-Plan'], ['moon', 'Schlaf, Gewicht und Streaks'], ['heart', 'Für jedes Level, ohne Verbote']] };
  A.push({ dir: AW, name: 'END-Story-WasIstHLXTogether_1080x1920', w: 1080, h: 1920, html: doc(promoStory(was), EXTRA) });
  A.push({ dir: AW, name: 'END-Post-WasIstHLXTogether_1080x1350', w: 1080, h: 1350, html: doc(promoPost(was), EXTRA) });
  const tile = (ic, t, d) => `<div style="padding:30px;border-radius:26px;background:rgba(238,243,238,.06);border:1.5px solid rgba(238,243,238,.12)">${icon(ic, 46, C.yellow, 2)}<div class="wide" style="font-size:32px;margin-top:18px">${t}</div><div class="m" style="font-size:24px;line-height:1.35;margin-top:8px">${d}</div></div>`;
  A.push({ dir: AW, name: 'END-Post-AppSteckbrief_1080x1080', w: 1080, h: 1080, html: doc(`
    <div class="s bg" style="width:1080px;height:1080px">
      <div class="row" style="position:absolute;left:72px;right:72px;top:70px;justify-content:space-between">${logo(C.yellow, 'height:46px')}<span class="kick" style="font-size:24px">Kostenlos starten</span></div>
      <h1 class="disp" style="position:absolute;left:72px;right:72px;top:170px;font-size:84px">${cfg.appName}<br><span class="y">auf einen Blick.</span></h1>
      <div style="position:absolute;left:72px;right:72px;top:400px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
        ${tile('dumbbell', 'Training', 'Vorlagen, Log, Puls')}${tile('apple', 'Ernährung', 'Kalorien und Makros')}${tile('chef', 'Rezepte', 'KI-Meal-Plan, Einkauf')}
        ${tile('moon', 'Schlaf', 'Erholung im Blick')}${tile('scale', 'Gewicht', 'Verlauf statt Zahl')}${tile('flame', 'Streaks', 'Dranbleiben mit Spaß')}
      </div>
      <div class="row" style="position:absolute;left:72px;right:72px;bottom:62px;justify-content:space-between;font-size:28px;font-weight:600"><span>Premium, wenn du mehr willst.</span><span class="m">${cfg.handle}</span></div>
    </div>`, EXTRA) });

  // ---------- Nischen-Serie ----------
  const NI = '01_Endnutzer/Social/Nischen';
  const niches = [
    ['Einsteiger', 'Für Einsteiger', 'Starte da,<br><span class="y">wo du stehst.</span>', 1, [['dumbbell', 'Vorlagen für jedes Level'], ['flame', 'Kleine Routinen, die bleiben'], ['target', 'Studio, zu Hause oder draußen']]],
    ['Berufstaetige', 'Für Berufstätige', 'Wenig Zeit?<br><span class="y">Gut geplant.</span>', 3, [['apple', 'Mahlzeiten in Sekunden eintragen'], ['chef', 'Meal Prep mit Einkaufsliste'], ['calendar', 'Training, das in den Alltag passt']]],
    ['Muskelaufbau', 'Muskelaufbau', 'Fortschritt,<br><span class="y">den du siehst.</span>', 2, [['dumbbell', 'Einheiten und Übungen loggen'], ['chart', 'Protein und Makros im Blick'], ['heart', 'Dauer und Puls auswerten']]],
    ['Abnehmen', 'Abnehmen ohne Verzicht', 'Dein Ziel.<br><span class="y">Ohne Verbote.</span>', 3, [['apple', 'Kalorienbilanz auf einen Blick'], ['chef', 'Rezepte, die schmecken'], ['flame', 'Streaks statt schlechtem Gewissen']]],
    ['Zuhause', 'Training zu Hause', 'Kein Studio?<br><span class="y">Kein Problem.</span>', 2, [['users', 'Zu Hause oder draußen trainieren'], ['dumbbell', 'Eigener Übungspool'], ['chart', 'Fortschritt automatisch']]],
    ['MealPrep', 'Ernährung &amp; Meal Prep', 'Gut essen.<br><span class="y">Ohne Stress.</span>', 4, [['chef', 'Rezepte speichern'], ['sparkle', 'KI-Meal-Plan für die Woche'], ['check', 'Einkaufsliste automatisch']]],
    ['Balance', 'Schlaf &amp; Balance', 'Mehr als<br><span class="y">nur Training.</span>', 5, [['moon', 'Schlaf im Blick'], ['flame', 'Tägliche Streaks'], ['calendar', 'Kalender und Supplements']]],
    ['Sportler', 'Für Sportler', 'Healthy &amp;<br><span class="y">Athletic.</span>', 1, [['dumbbell', 'Training, Ernährung, Schlaf vereint'], ['chart', 'Daten, die motivieren'], ['target', 'Routinen wie ein Profi']]],
  ];
  niches.forEach(([id, kick, title, ph, items], i) => {
    const d = { kick, title, ph, items, foot };
    A.push({ dir: NI, name: `END-Nische-${i + 1}-${id}_Story_1080x1920`, w: 1080, h: 1920, html: doc(promoStory(d), EXTRA) });
    A.push({ dir: NI, name: `END-Nische-${i + 1}-${id}_Post_1080x1350`, w: 1080, h: 1350, html: doc(promoPost(d), EXTRA) });
  });

  // ---------- "Offizieller Partner" ----------
  // Story: Logo-Feld (nur PPTX) neben HLX, Titel, Abzeichen, Name/Handle (nur PPTX), CTA
  const partnerStory = ({ pre, role, kick, title, sub, cta, nameLine, logoSlot = true }) => `<div class="s bg" style="width:1080px;height:1920px">
    ${plates(C.yellow, .06, 'right:-330px;top:300px;height:1500px')}
    <div style="position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center">${logo(C.yellow, 'height:56px')}</div>
    ${logoSlot ? slot('Dein Logo', 'left:90px;top:210px;width:260px;height:100px') : ''}
    <div class="kick" style="position:absolute;left:0;right:0;top:380px;text-align:center;font-size:30px">${kick}</div>
    <h1 class="disp" style="position:absolute;left:60px;right:60px;top:440px;text-align:center;font-size:96px">${title}</h1>
    <div style="position:absolute;left:0;right:0;top:740px;display:flex;justify-content:center">${badge(pre, role)}</div>
    <p style="position:absolute;left:110px;right:110px;top:1150px;text-align:center;font-size:38px;line-height:1.4;font-weight:500">${sub}</p>
    <div class="po" style="position:absolute;left:0;right:0;top:1360px;text-align:center;font-size:36px;font-weight:700;color:${C.yellow}">${nameLine}</div>
    <div class="col" style="position:absolute;left:0;right:0;top:1480px;align-items:center;gap:22px">
      <span class="pill" style="font-size:40px;padding:26px 60px">${cta}</span>
      ${poweredBy(C.muted, C.yellow, 36)}
    </div></div>`;
  const partnerPost = ({ pre, role, kick, title, sub, cta, nameLine, logoSlot = true }) => `<div class="s bg" style="width:1080px;height:1350px">
    ${plates(C.yellow, .07, 'right:-260px;top:120px;height:1250px')}
    <div style="position:absolute;left:84px;top:80px">${logo(C.yellow, 'height:50px')}</div>
    ${logoSlot ? slot('Dein Logo', 'right:84px;top:60px;width:240px;height:96px') : ''}
    <div style="position:absolute;left:84px;right:84px;top:200px">
      <div class="kick" style="font-size:28px;margin-bottom:24px">${kick}</div>
      <h1 class="disp" style="font-size:84px">${title}</h1>
    </div>
    <div style="position:absolute;left:0;right:0;top:500px;display:flex;justify-content:center">${badge(pre, role, .85)}</div>
    <p style="position:absolute;left:110px;right:110px;top:885px;text-align:center;font-size:32px;line-height:1.4;font-weight:500">${sub}</p>
    <div class="po" style="position:absolute;left:84px;bottom:100px;font-size:30px;font-weight:700;color:${C.yellow}">${nameLine}</div>
    <div style="position:absolute;right:84px;bottom:84px"><span class="pill" style="font-size:32px;padding:20px 42px">${cta}</span></div>
    </div>`;
  const partnerOverlay = ({ pre, role, kick, title }) => `<div style="width:1080px;height:1920px;position:relative;overflow:hidden">
    <div style="position:absolute;left:0;right:0;top:0;height:720px;background:linear-gradient(rgba(4,32,27,.92),rgba(4,32,27,.55) 60%,rgba(4,32,27,0))"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:860px;background:linear-gradient(rgba(4,32,27,0),rgba(4,32,27,.8) 45%,rgba(4,32,27,.95))"></div>
    <div class="kick" style="position:absolute;left:70px;right:70px;top:290px;font-size:30px">${kick}</div>
    <h1 class="disp" style="position:absolute;left:70px;right:70px;top:340px;font-size:96px">${title}</h1>
    <div style="position:absolute;left:0;right:0;top:1260px;display:flex;justify-content:center">${badge(pre, role, .8)}</div></div>`;

  const roles = [
    { dir: '05_Coaches/B_Fuer-Partner-Coaches', id: 'COA-OffiziellerPartnerCoach', pre: 'Offizieller', role: 'Partner-Coach', kick: 'Neu &amp; offiziell', title: 'Offiziell<br><span class="y">dabei.</span>',
      sub: `Ich coache ab sofort mit ${cfg.appName}: Plan, Ernährung und Routinen in einer App.`, cta: 'Schreib mir für dein Coaching', nameLine: 'Coach Vorname · @deinhandle', overlay: true },
    { dir: '03_Gyms-Studios/Social', id: 'GYM-OffiziellesPartnerStudio', pre: 'Offizielles', role: 'Partner-Studio', kick: 'Neu bei uns', title: 'Wir sind<br><span class="y">offiziell dabei.</span>',
      sub: `Unsere Mitglieder trainieren ab sofort mit ${cfg.appName}. QR-Code im Studio scannen.`, cta: 'Kostenlos starten', nameLine: 'Studioname · Ort', overlay: true },
    { dir: '04_Marken-Firmen/B_Fuer-Partner-Firmen', id: 'MRK-OffiziellerPartner', pre: 'Offizieller', role: 'Partner', kick: 'Partnerschaft', title: 'Gemeinsam<br><span class="y">gesünder.</span>',
      sub: `Wir sind offizieller Partner von ${cfg.brand} und ${cfg.appName}.`, cta: 'Mehr erfahren', nameLine: 'Firmenname · @firmenhandle', overlay: false },
  ];
  for (const r of roles) {
    A.push({ dir: r.dir, name: `${r.id}_Story_1080x1920`, w: 1080, h: 1920, html: doc(partnerStory(r), EXTRA) });
    A.push({ dir: r.dir, name: `${r.id}_Post_1080x1350`, w: 1080, h: 1350, html: doc(partnerPost(r), EXTRA) });
    if (r.overlay) A.push({ dir: `${r.dir}/Overlay-transparent`, name: `${r.id}_Overlay_1080x1920`, w: 1080, h: 1920, transparent: true, html: doc(partnerOverlay(r), EXTRA) });
  }
  // Co-Branding-Version pro Partner aus config.json (Name statt Platzhalter)
  for (const p of cfg.partners) {
    const r = { ...roles[1], nameLine: p.name, logoSlot: false };
    A.push({ dir: '03_Gyms-Studios/Social', name: `GYM-OffiziellesPartnerStudio_Story_CoBranding-${p.id}_1080x1920`, w: 1080, h: 1920,
      html: doc(partnerStory(r).replace('class="po"', 'class=""').replace(`<div style="position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center">${logo(C.yellow, 'height:56px')}</div>`,
        `<div class="row" style="position:absolute;left:0;right:0;top:220px;justify-content:center;gap:28px"><div class="wide slot" data-slot="Euer Logo" style="font-size:40px;padding:14px 28px;border:3px solid rgba(238,243,238,.5);border-radius:16px;text-transform:uppercase;letter-spacing:.06em">${p.name}</div><span class="m" style="font-size:40px">×</span>${logo(C.yellow, 'height:50px')}</div>`), EXTRA) });
  }

  // ---------- Recruiting: HLX sucht ----------
  const recruit = ({ w, h, kick, title, items, cta, sub }) => {
    const story = h === 1920, sq = w === h;
    const k = story ? 1 : sq ? .82 : .9;
    return `<div class="s bg" style="width:${w}px;height:${h}px">
      ${plates(C.yellow, .07, `right:${-w * .25}px;top:${h * .1}px;height:${h * .85}px`)}
      <div style="position:absolute;left:${story ? 0 : 84}px;right:${story ? 0 : 'auto'};top:${story ? 230 : 76}px;display:flex;justify-content:${story ? 'center' : 'flex-start'}">${logo(C.yellow, `height:${story ? 56 : 48}px`)}</div>
      <div style="position:absolute;left:${story ? 90 : 84}px;right:${story ? 90 : 84}px;top:${story ? 380 : sq ? 170 : 190}px;${story ? 'text-align:center' : ''}">
        <div class="kick" style="font-size:${30 * k}px;margin-bottom:${22 * k}px">${kick}</div>
        <h1 class="disp" style="font-size:${(story ? 120 : sq ? 96 : 110)}px">${title}</h1>
        <p class="m" style="font-size:${34 * k}px;line-height:1.4;margin-top:${26 * k}px">${sub}</p>
      </div>
      <div class="col" style="position:absolute;left:${story ? 150 : 84}px;right:${story ? 120 : 84}px;top:${story ? 900 : sq ? 560 : 680}px;gap:${story ? 32 : 24}px">${bullets(items, story ? 44 : 34 * k / .9, 0, story ? 52 : 40)}</div>
      <div class="row" style="position:absolute;left:${story ? 0 : 84}px;right:${story ? 0 : 84}px;${story ? 'top:1480px;justify-content:center;flex-direction:column;gap:22px' : `bottom:${sq ? 64 : 80}px;gap:28px`}">
        <span class="pill" style="font-size:${story ? 42 : 32}px;padding:${story ? '28px 64px' : '20px 44px'}">${cta}</span>
        <span class="m" style="font-size:${story ? 30 : 26}px;font-weight:600">${cfg.email}</span>
      </div></div>`;
  };
  const coachR = { kick: 'Personal Trainer &amp; Coaches', title: 'Wir suchen<br><span class="y">Coaches.</span>', cta: 'Jetzt Interesse anmelden',
    sub: `Coache auf Augenhöhe, mit ${cfg.appName} an deiner Seite.`,
    items: [['dumbbell', 'Personal Trainer'], ['apple', 'Ernährungscoaches'], ['phone', 'Online-Coaches'], ['users', 'Online und vor Ort']] };
  const partnerR = { kick: 'Unternehmen &amp; Marken', title: 'Wir suchen<br><span class="y">Partner.</span>', cta: 'Partner werden',
    sub: `Gemeinsam Gesundheit in den Alltag bringen. Im DACH-Raum.`,
    items: [['building', 'Corporate Health für Teams'], ['chef', 'Marken und Produkte'], ['dumbbell', 'Gyms und Studios'], ['target', 'Events und Challenges']] };
  for (const [dir, id, d] of [['05_Coaches/C_HLX-eigene-Kanaele', 'COA-WirSuchenCoaches', coachR], ['04_Marken-Firmen/C_HLX-eigene-Kanaele', 'MRK-WirSuchenPartner', partnerR]]) {
    A.push({ dir, name: `${id}_Story_1080x1920`, w: 1080, h: 1920, html: doc(recruit({ w: 1080, h: 1920, ...d }), EXTRA) });
    A.push({ dir, name: `${id}_Post_1080x1350`, w: 1080, h: 1350, html: doc(recruit({ w: 1080, h: 1350, ...d }), EXTRA) });
    A.push({ dir, name: `${id}_Post_1080x1080`, w: 1080, h: 1080, html: doc(recruit({ w: 1080, h: 1080, ...d }), EXTRA) });
  }
  return A;
}
