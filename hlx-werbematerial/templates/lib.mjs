// Gemeinsame Bausteine: Farben, Logo, Icons, QR, Grund-CSS.
import QRCode from 'qrcode';

export const C = {
  ground: '#04201B', surface: '#0A2E27', deep: '#0b3a31', petrol: '#08594A',
  text: '#EEF3EE', muted: '#A9C2BA', yellow: '#FFFF00', mint: '#6FD3A8', grey: '#D9DED9',
};

const LOGO_INNER = `
  <rect x="-362" y="-122" width="38" height="244" fill="none" stroke="currentColor" stroke-width="12"/>
  <rect x="-397" y="-104" width="32" height="208" fill="none" stroke="currentColor" stroke-width="12"/>
  <rect x="-483" y="-27" width="68" height="54"/>
  <rect x="324" y="-122" width="38" height="244" fill="none" stroke="currentColor" stroke-width="12"/>
  <rect x="365" y="-104" width="32" height="208" fill="none" stroke="currentColor" stroke-width="12"/>
  <rect x="415" y="-27" width="68" height="54"/>
  <rect x="-318" y="-9" width="82" height="18"/>
  <rect x="236" y="-9" width="82" height="18"/>
  <rect x="-220" y="-76" width="42" height="152"/>
  <rect x="-134" y="-76" width="42" height="152"/>
  <rect x="-220" y="-18" width="128" height="36"/>
  <rect x="-78" y="-76" width="42" height="152"/>
  <rect x="-78" y="36" width="106" height="40"/>
  <polygon points="40,-76 94,-76 220,76 166,76"/>
  <polygon points="166,-76 220,-76 94,76 40,76"/>`;

const MARK_INNER = `
  <rect x="-194" y="-122" width="38" height="244" fill="none" stroke="currentColor" stroke-width="14"/>
  <rect x="-229" y="-104" width="32" height="208" fill="none" stroke="currentColor" stroke-width="14"/>
  <rect x="-315" y="-27" width="68" height="54"/>
  <rect x="156" y="-122" width="38" height="244" fill="none" stroke="currentColor" stroke-width="14"/>
  <rect x="197" y="-104" width="32" height="208" fill="none" stroke="currentColor" stroke-width="14"/>
  <rect x="247" y="-27" width="68" height="54"/>
  <rect x="-150" y="-9" width="300" height="18"/>`;

// Wortmarke HLX mit Hantel (Seitenverhältnis 1006:296)
export const logo = (color = C.yellow, style = '') =>
  `<svg class="logo" viewBox="-503 -148 1006 296" style="color:${color};${style}" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor">${LOGO_INNER}</g></svg>`;

// Nur die Hantel (Seitenverhältnis 690:290)
export const mark = (color = C.yellow, style = '') =>
  `<svg viewBox="-345 -145 690 290" style="color:${color};${style}" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor">${MARK_INNER}</g></svg>`;

export const logoSvgFile = (color, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-503 -148 1006 296" width="1006" height="296">${bg ? `<rect x="-503" y="-148" width="1006" height="296" fill="${bg}"/>` : ''}<g fill="${color}" color="${color}">${LOGO_INNER.replaceAll('currentColor', color)}</g></svg>`;
export const appIconSvgFile = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-345 -345 690 690" width="1024" height="1024"><rect x="-345" y="-345" width="690" height="690" rx="96" fill="${C.petrol}"/><g fill="${C.yellow}" transform="scale(1.02)">${MARK_INNER.replaceAll('currentColor', C.yellow)}</g></svg>`;

const ICONS = {
  dumbbell: 'M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11',
  apple: 'M12 7.5c-1.6-1.3-5.2-1.6-6.6 1.5C4.2 11.8 5.3 16.4 7.6 19c1.3 1.4 2.8 1.4 4.4.6 1.6.8 3.1.8 4.4-.6 2.3-2.6 3.4-7.2 2.2-10-1.4-3.1-5-2.8-6.6-1.5zM12 7.5c0-2 1-3.6 3-4.5',
  chef: 'M7 17.5h10V21H7zM7 17.5v-4A4 4 0 1 1 9.6 6a4 4 0 0 1 4.8 0A4 4 0 1 1 17 13.5v4',
  moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
  flame: 'M12 3c1 3 4.5 4.6 4.5 9.2a4.5 4.5 0 0 1-9 0c0-2.2 1.1-3.4 2.2-4.3 0 2 1 3.1 2.1 3.1 0-3.2-1-5.3.2-8z',
  scale: 'M12 4v16M6 20h12M4 8h16M7 8l-3 6.5a3 3 0 0 0 6 0zM17 8l-3 6.5a3 3 0 0 0 6 0z',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z',
  chart: 'M4 20V11M10 20V5M16 20v-6M3 20.5h18',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.5 3.5 5.2',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  building: 'M4 21V5l8-2v18M12 8h8v13M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2M2 21h20',
  phone: 'M7 2.5h10a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V4A1.5 1.5 0 0 1 7 2.5zM10.5 18.5h3',
  heart: 'M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3.5v4M16 3.5v4',
  megaphone: 'M3.5 10v4h3l7 4.5v-13l-7 4.5zM17 9a4 4 0 0 1 0 6M6.5 14l1 5h2.5l-1-5',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3A4 4 0 0 0 13 5.3l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  down: 'M12 5v14M6 13l6 6 6-6',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  shield: 'M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z',
};
export const icon = (name, size = 24, color = 'currentColor', sw = 1.8) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${ICONS[name].split('M').filter(Boolean).map(d => `<path d="M${d}"/>`).join('')}</svg>`;

export async function qr(url, { dark = C.ground, light = '#FFFFFF', size = '100%' } = {}) {
  const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 0, color: { dark, light } });
  return svg.replace('<svg', `<svg style="width:${size};height:${size};display:block" shape-rendering="crispEdges"`);
}

export const phone = (n, style = '') => `<img class="phone" src="assets/app-${n}.png" style="${style}" alt="">`;

// Große Hantelscheiben als Hintergrund-Motiv (rechte Hantelseite)
export const plates = (color = C.yellow, opacity = 0.1, style = '') =>
  `<svg viewBox="300 -140 200 280" style="position:absolute;color:${color};opacity:${opacity};${style}" fill="currentColor"><rect x="324" y="-122" width="38" height="244" fill="none" stroke="currentColor" stroke-width="5"/><rect x="365" y="-104" width="32" height="208" fill="none" stroke="currentColor" stroke-width="5"/><rect x="415" y="-27" width="68" height="54"/><rect x="236" y="-9" width="88" height="18"/></svg>`;

export const poweredBy = (color = C.text, logoColor = C.yellow, h = 34) =>
  `<div class="pwr" style="color:${color};font-size:${h * 0.42}px;gap:${h * 0.32}px"><span>powered by</span>${logo(logoColor, `height:${h}px;width:auto`)}</div>`;

export const css = (extra = '') => `
@font-face{font-family:Archivo;src:url(assets/archivo-variable.woff2) format('woff2');font-weight:100 900;font-stretch:62% 125%;font-display:block}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{font-family:Archivo,Arial,sans-serif;color:${C.text};-webkit-font-smoothing:antialiased;font-variation-settings:"wdth" 100}
.disp{font-family:Archivo;font-variation-settings:"wdth" 125;font-weight:850;letter-spacing:-.01em;line-height:1}
.wide{font-variation-settings:"wdth" 118;font-weight:750}
.y{color:${C.yellow}} .m{color:${C.muted}} .mint{color:${C.mint}}
.kick{font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.yellow}}
.bg{background:radial-gradient(85% 65% at 50% 42%, ${C.deep}, ${C.ground} 72%)}
.phone{display:block;height:auto;filter:drop-shadow(0 30px 60px rgba(0,0,0,.55))}
.pwr{display:inline-flex;align-items:center;font-weight:600;letter-spacing:.06em;text-transform:uppercase;line-height:1}
.pill{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;font-weight:750;background:${C.yellow};color:${C.ground}}
.ghost{background:transparent;border:2px solid rgba(238,243,238,.28);color:${C.text}}
.row{display:flex;align-items:center}
.col{display:flex;flex-direction:column}
.ref{position:absolute;font-size:6.5pt;color:rgba(169,194,186,.6);letter-spacing:.06em}
${extra}`;

export const doc = (body, extra = '', pageCss = '') =>
  `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${pageCss}${css(extra)}</style></head><body>${body}</body></html>`;

// Druck: Seite in mm inkl. Beschnitt. Inhalt im .page-Container (Endformat + bleed rundum).
export const printDoc = (w, h, bleed, pages, extra = '') => {
  const W = w + 2 * bleed, H = h + 2 * bleed;
  return doc(pages.map(p => `<section class="page">${p}</section>`).join(''),
    `.page{position:relative;width:${W}mm;height:${H}mm;overflow:hidden;page-break-after:always;break-after:page}
     .page:last-child{page-break-after:auto;break-after:auto}
     .safe{position:absolute;inset:${bleed + 6}mm}
     ${extra}`, `@page{size:${W}mm ${H}mm;margin:0}`);
};

export const link = (cfg, key) => cfg.links[key].replace('{base}', cfg.baseUrl);

// Unter dem QR-Code: Kurz-URL sobald gesetzt, sonst Social-Handle
export const qrCaption = cfg => cfg.urlText || cfg.handle;
