// 02 Influencer & Creator: Story- und Feed-Vorlagen (fertig + transparentes Overlay) und Briefing.
import { C, logo, icon, phone, plates, doc, printDoc } from './lib.mjs';

const anzeige = (top = 250) => `<div style="position:absolute;left:70px;top:${top}px;font-size:26px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:8px 16px;border-radius:8px;background:rgba(4,32,27,.72);color:${C.text}">Anzeige</div>`;
const scrims = (h) => `
  <div style="position:absolute;left:0;right:0;top:0;height:${h === 1920 ? 820 : 520}px;background:linear-gradient(rgba(4,32,27,.92),rgba(4,32,27,.6) 55%,rgba(4,32,27,0))"></div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:${h === 1920 ? 760 : 560}px;background:linear-gradient(rgba(4,32,27,0),rgba(4,32,27,.75) 40%,rgba(4,32,27,.95))"></div>`;

// Jede Vorlage wird zweimal erzeugt: "fertig" (mit Hintergrund) und "Overlay" (transparent, für eigenes Foto/Video).
function pair(A, dir, name, w, h, body, fertigExtra = '') {
  const frame = overlay => `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden" class="${overlay ? '' : 'bg'}">
      ${overlay ? scrims(h) : plates(C.yellow, .06, `right:-330px;top:300px;height:${h - 420}px`) + fertigExtra}
      ${body}${anzeige(h === 1920 ? 250 : 70)}</div>`;
  A.push({ dir: `${dir}/fertig`, name: `${name}_fertig_${w}x${h}`, w, h, html: doc(frame(false)) });
  A.push({ dir: `${dir}/Overlay-transparent`, name: `${name}_Overlay_${w}x${h}`, w, h, transparent: true, html: doc(frame(true)) });
}

export default async function influencer(cfg) {
  const A = [];
  const ST = '02_Influencer/Stories', FE = '02_Influencer/Feed';
  const top = (kick, title, y = 340) => `<div style="position:absolute;left:70px;right:70px;top:${y}px">
      <div class="kick" style="font-size:30px;margin-bottom:22px">${kick}</div>
      <h1 class="disp" style="font-size:96px">${title}</h1></div>`;
  const brandFoot = (y = 1660) => `<div class="row" style="position:absolute;left:70px;right:70px;top:${y}px;justify-content:space-between">${logo(C.yellow, 'height:42px')}<span style="font-size:28px;font-weight:600;color:${C.muted}">${cfg.appName}</span></div>`;
  const linkHint = (y) => `<div class="row" style="position:absolute;left:0;right:0;top:${y}px;justify-content:center;gap:14px;font-size:34px;font-weight:700;color:${C.yellow}">Link ${icon('down', 40, C.yellow, 2.4)}</div>`;

  // 1 Ich tracke jetzt mit HLX Together (+ Link + Code)
  pair(A, ST, 'INF-Story-1-IchTrackeJetzt', 1080, 1920, `
    ${top(`Ich tracke jetzt mit ${cfg.appName}`, 'Mein Alltag.<br><span class="y">Eine App.</span>')}
    ${linkHint(1250)}
    <div class="row" style="position:absolute;left:70px;right:70px;top:1470px;justify-content:center;gap:24px">
      <span style="font-size:34px;font-weight:700">Mein Code:</span>
      <span style="display:inline-block;width:420px;height:92px;border-radius:20px;background:${C.yellow}"></span>
    </div>
    ${brandFoot()}`, phone(1, 'position:absolute;width:440px;left:320px;top:700px;clip-path:inset(0 0 52% 0)'));

  // 2 Mein Tag in Zahlen (zum Ausfüllen)
  const rows = [['dumbbell', 'Training', 'min'], ['apple', 'Kalorien', 'kcal'], ['moon', 'Schlaf', 'h'], ['flame', 'Streak', 'Tage']];
  pair(A, ST, 'INF-Story-2-MeinTagInZahlen', 1080, 1920, `
    ${top('Zum Ausfüllen', 'Mein Tag<br><span class="y">in Zahlen.</span>')}
    <div class="col" style="position:absolute;left:70px;right:70px;top:930px;gap:22px;padding:44px;border-radius:40px;background:rgba(10,46,39,.88);border:2px solid rgba(238,243,238,.14)">
      ${rows.map(([ic, t, u]) => `<div class="row" style="gap:26px;font-size:42px;font-weight:700">${icon(ic, 54, C.yellow, 2)}<span style="width:250px">${t}</span><span style="flex:1;border-bottom:3px solid rgba(238,243,238,.35);height:52px"></span><span class="m" style="width:100px">${u}</span></div>`).join('')}
    </div>
    ${brandFoot()}`);

  // 3 Fragt mich alles zur App (Platz für Fragen-Sticker)
  pair(A, ST, 'INF-Story-3-FragMich', 1080, 1920, `
    ${top(`Q&amp;A · ${cfg.appName}`, 'Fragt mich<br><span class="y">alles zur App.</span>')}
    <div class="row" style="position:absolute;left:0;right:0;top:1180px;justify-content:center;gap:14px;font-size:34px;font-weight:700;color:${C.yellow}">Frage-Sticker hier ${icon('down', 40, C.yellow, 2.4)}</div>
    ${brandFoot()}`, phone(5, 'position:absolute;width:420px;left:330px;top:680px;clip-path:inset(0 0 60% 0);opacity:.9'));

  // 4 Meal Prep Sonntag
  pair(A, ST, 'INF-Story-4-MealPrep', 1080, 1920, `
    ${top('Meal Prep Sonntag', 'Woche geplant.<br><span class="y">Liste fertig.</span>')}
    <div class="col" style="position:absolute;left:70px;right:70px;top:1330px;gap:18px;font-size:36px;font-weight:600">
      ${['Rezepte speichern', 'KI-Meal-Plan für die Woche', 'Einkaufsliste automatisch'].map(t => `<div class="row" style="gap:18px">${icon('check', 44, C.yellow, 2.6)}${t}</div>`).join('')}
    </div>
    ${brandFoot()}`, phone(4, 'position:absolute;width:440px;left:320px;top:700px;clip-path:inset(0 0 55% 0)'));

  // 5 7-Tage-Challenge
  pair(A, ST, 'INF-Story-5-7TageChallenge', 1080, 1920, `
    ${top('Challenge', 'Sieben Tage<br><span class="y">dranbleiben.</span>')}
    <p style="position:absolute;left:70px;right:70px;top:690px;font-size:38px;line-height:1.35;font-weight:500">Jeden Tag eine kleine Routine. Ich mache mit, du auch?</p>
    <div class="row" style="position:absolute;left:0;right:0;top:1180px;justify-content:center;gap:18px">
      ${['M', 'D', 'M', 'D', 'F', 'S', 'S'].map(d => `<div class="col" style="align-items:center;gap:14px"><div style="width:110px;height:110px;border-radius:26px;border:4px solid ${C.yellow};background:rgba(4,32,27,.6)"></div><span style="font-size:30px;font-weight:700">${d}</span></div>`).join('')}
    </div>
    ${linkHint(1450)}
    ${brandFoot()}`);

  // 6 Mein Code für dich
  pair(A, ST, 'INF-Story-6-MeinCode', 1080, 1920, `
    ${top(cfg.appName, 'Mein Code<br><span class="y">für dich.</span>')}
    <div class="col" style="position:absolute;left:70px;right:70px;top:1080px;align-items:center;gap:26px">
      <div style="width:100%;height:190px;border-radius:36px;background:${C.yellow};box-shadow:0 0 0 10px rgba(255,255,0,.18)"></div>
      <p style="font-size:34px;font-weight:600;text-align:center">Kostenlos starten. Alle Details im Link.</p>
    </div>
    ${linkHint(1430)}
    ${brandFoot()}`);

  // Feed 4:5
  pair(A, FE, 'INF-Feed-1-MeinAlltag', 1080, 1350, `
    <div style="position:absolute;left:70px;right:70px;bottom:80px">
      <div class="kick" style="font-size:28px;margin-bottom:18px">Mein Alltag mit</div>
      <div class="row" style="justify-content:space-between;align-items:flex-end"><h1 class="disp" style="font-size:96px">${cfg.appName}</h1></div>
      <div style="margin-top:28px">${logo(C.yellow, 'height:40px')}</div>
    </div>`);
  pair(A, FE, 'INF-Feed-2-RezeptKarte', 1080, 1350, `
    <div style="position:absolute;left:70px;right:70px;bottom:80px;padding:44px;border-radius:36px;background:rgba(10,46,39,.9);border:2px solid rgba(238,243,238,.14)">
      <div class="kick" style="font-size:26px;margin-bottom:14px">Schnell &amp; lecker</div>
      <div style="height:70px;border-bottom:3px solid rgba(238,243,238,.35);margin-bottom:30px"></div>
      <div class="row" style="gap:20px;font-size:30px;font-weight:700">
        ${['kcal', 'Protein', 'Kohlenh.', 'Fett'].map(t => `<div style="flex:1"><div style="height:52px;border-bottom:3px solid rgba(238,243,238,.35)"></div><div class="m" style="margin-top:10px;font-size:24px">${t}</div></div>`).join('')}
      </div>
      <div class="row" style="justify-content:space-between;margin-top:34px">${logo(C.yellow, 'height:36px')}<span class="m" style="font-size:24px;font-weight:600">Rezept in ${cfg.appName}</span></div>
    </div>`);

  // Briefing A4 (2 Seiten)
  const li = items => items.map(t => `<li style="margin:0 0 2.2mm 0">${t}</li>`).join('');
  const box = (title, color, items) => `<div style="flex:1;padding:6mm;border-radius:4mm;background:${C.surface}"><div class="wide" style="font-size:12pt;color:${color};margin-bottom:3mm">${title}</div><ul style="padding-left:4.5mm;font-size:9.5pt;line-height:1.4">${li(items)}</ul></div>`;
  A.push({ dir: '02_Influencer', name: 'INF-Briefing-A4_fuer-Creator', pdf: true, html: printDoc(210, 297, 0, [`
    <div style="position:absolute;inset:0;background:${C.ground}"></div>
    ${plates(C.yellow, .06, 'right:-60mm;top:-10mm;height:150mm')}
    <div class="safe" style="inset:18mm 20mm">
      ${logo(C.yellow, 'height:10mm')}
      <div class="kick" style="font-size:9pt;margin-top:12mm">Creator-Briefing</div>
      <h1 class="disp" style="font-size:30pt;margin-top:3mm">${cfg.appName}<br><span class="y">ehrlich gezeigt.</span></h1>
      <p class="m" style="font-size:10.5pt;line-height:1.5;margin-top:5mm;max-width:150mm">Danke, dass du dabei bist. ${cfg.appName} ist die App von ${cfg.brand}: Training, Ernährung und Routinen an einem Ort. Uns geht es um Gesundheit ohne Verzicht, auf Augenhöhe und für jedes Level. Zeig die App so, wie du sie wirklich nutzt.</p>
      <h2 class="disp" style="font-size:15pt;margin-top:10mm">Kernbotschaften</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4mm;margin-top:4mm">
        ${[['Eine App für alles', 'Training, Ernährung, Schlaf und Routinen an einem Ort.'], ['Balance statt Verbote', 'Essen, das schmeckt. Kein Verzicht-Narrativ.'], ['Für jedes Level', 'Studio, zu Hause oder draußen. Starten, wo man steht.'], ['Kostenlos starten', 'Einstieg ohne Abo. Premium für alle, die mehr wollen.']]
          .map(([t, d]) => `<div style="border-top:.6mm solid ${C.yellow};padding-top:2.5mm"><div class="wide" style="font-size:11pt">${t}</div><div class="m" style="font-size:9.5pt;line-height:1.4;margin-top:1mm">${d}</div></div>`).join('')}
      </div>
      <h2 class="disp" style="font-size:15pt;margin-top:10mm">So nutzt du die Vorlagen</h2>
      <ul style="padding-left:4.5mm;font-size:9.5pt;line-height:1.45;margin-top:3mm;color:${C.text}">${li([
        '<b>fertig</b>: direkt posten. <b>Overlay-transparent</b>: über dein eigenes Foto oder Video legen.',
        'Link-Sticker und Code-Text in Instagram/TikTok an die markierten Stellen setzen.',
        'Story-Vorlagen sind 1080 × 1920 px, Feed-Vorlagen 1080 × 1350 px.',
        'Oben und unten ca. 250 px frei lassen, dort liegen die App-Bedienelemente.',
      ])}</ul>
      <div class="m" style="position:absolute;left:0;right:0;bottom:0;font-size:8.5pt">Fragen? ${cfg.email} · ${cfg.handle}</div>
    </div>
    <div class="ref" style="right:9mm;bottom:5mm">HLX-INF-B01 · Seite 1/2</div>`, `
    <div style="position:absolute;inset:0;background:${C.ground}"></div>
    <div class="safe" style="inset:18mm 20mm">
      <h2 class="disp" style="font-size:20pt">Pflicht: <span class="y">Werbung kennzeichnen.</span></h2>
      <p style="font-size:10.5pt;line-height:1.5;margin-top:4mm">Sobald du für den Beitrag etwas bekommst (Geld, Premium-Zugang, Provision, Produkte), ist er Werbung. Kennzeichne ihn <b>gut sichtbar am Anfang</b> mit „Anzeige“ oder „Werbung“, zusätzlich die Funktion „Bezahlte Partnerschaft“ nutzen. Ein #ad am Ende der Hashtags reicht nicht. Die Vorlagen haben das Label „Anzeige“ bereits eingebaut.</p>
      <div class="row" style="gap:5mm;margin-top:8mm;align-items:stretch">
        ${box('Bitte so', C.mint, ['Eigene, echte Erfahrungen mit der App zeigen', 'Screens aus deinem Alltag (ohne fremde Daten)', 'Positiv und motivierend, ohne Druck', '„Kostenlos starten“ und deinen Link/Code nennen', 'Brand immer klein schreiben: <b>healthleticx</b>; App: <b>' + cfg.appName + '</b>'])}
        ${box('Bitte nicht', '#FF9C8A', ['Heilversprechen oder medizinische Aussagen („heilt“, „gegen Krankheit X“)', 'Garantierte Ergebnisse („10 kg in 4 Wochen“)', 'Crash-Diäten, Verzicht- oder Body-Shaming-Sprache', 'Vorher/Nachher-Fotos ohne Absprache', 'Logo verändern, verzerren oder umfärben'])}
      </div>
      <h2 class="disp" style="font-size:15pt;margin-top:10mm">Hashtags &amp; Erwähnung</h2>
      <p style="font-size:10.5pt;line-height:1.6;margin-top:3mm"><span class="y">${cfg.handle}</span> markieren · #HLXTogether · #healthleticx · #HealthyAndAthletic · #FitnessOhneVerzicht · #MealPrep</p>
      <h2 class="disp" style="font-size:15pt;margin-top:10mm">Beispiel-Captions</h2>
      <div class="col" style="gap:3.5mm;margin-top:4mm;font-size:10pt;line-height:1.45">
        ${[`Anzeige · Training, Essen, Schlaf: Ich hab endlich alles in einer App. ${cfg.appName} ist kostenlos zum Starten, Link in meiner Bio. ${cfg.handle}`,
           `Anzeige · Meal Prep Sonntag! Rezepte rein, KI-Plan für die Woche, Einkaufsliste fertig. Mit meinem Code bekommst du [Vorteil]. ${cfg.handle}`,
           `Anzeige · Tag 1 von 7. Kleine Routine, jeden Tag. Wer macht mit? Getrackt mit ${cfg.appName}.`]
          .map(t => `<div style="padding:4mm 5mm;border-radius:3mm;background:${C.surface};border-left:1mm solid ${C.yellow}">${t}</div>`).join('')}
      </div>
      <div class="row" style="position:absolute;left:0;right:0;bottom:0;justify-content:space-between;align-items:flex-end">
        ${logo(C.yellow, 'height:8mm')}<span class="m" style="font-size:8.5pt">${cfg.brand} · ${cfg.claim}</span>
      </div>
    </div>
    <div class="ref" style="right:9mm;bottom:5mm">HLX-INF-B01 · Seite 2/2</div>`]) });

  return A;
}
