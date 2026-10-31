import { useState, useEffect, useRef } from 'react'

const Y = '#d4b84a'
const GD = '#0e1c13'
const GM = '#1c3525'
const FONT = "'Inter', system-ui, sans-serif"

// Unterseiten hängen am Hash (#impressum usw.), damit sie direkt verlinkbar sind
// und der Zurück-Knopf des Browsers funktioniert. Funktioniert ohne Server-Rewrites.
type Page = 'home' | 'anfrage' | 'impressum' | 'datenschutz' | 'gesundheit'
const SUBPAGES: Page[] = ['anfrage', 'impressum', 'datenschutz', 'gesundheit']

function pageFromHash(): Page {
  const h = window.location.hash.slice(1)
  return (SUBPAGES as string[]).includes(h) ? (h as Page) : 'home'
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash)
  const firstRender = useRef(true)

  useEffect(() => {
    const fn = () => setPage(pageFromHash())
    window.addEventListener('hashchange', fn)
    return () => window.removeEventListener('hashchange', fn)
  }, [])

  // Beim Seitenwechsel nach oben scrollen und den Fokus auf die neue Überschrift setzen (Screenreader, Tastatur).
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    if (page !== 'home') window.scrollTo(0, 0)
    document.querySelector<HTMLElement>('main h1')?.focus()
  }, [page])

  const skipToContent = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('inhalt')?.focus()
  }

  return (
    <div style={{ background: GD, color: '#fff', fontFamily: FONT, overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#inhalt" className="skip-link" onClick={skipToContent}>Zum Inhalt springen</a>
      {page === 'home' && <HomePage />}
      {page === 'anfrage' && <CoachingForm />}
      {page === 'impressum' && <LegalPage title="Impressum"><ImpressumContent /></LegalPage>}
      {page === 'datenschutz' && <LegalPage title="Datenschutzerklärung"><DatenschutzContent /></LegalPage>}
      {page === 'gesundheit' && <LegalPage title="Gesundheitshinweis"><GesundheitContent /></LegalPage>}
      <Footer />
    </div>
  )
}

/* ── Startseite ── */

function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* NAV */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(14,28,19,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,184,74,0.1)' : '1px solid transparent',
        transition: 'all 0.25s',
      }}>
        <nav aria-label="Hauptnavigation" className="nav-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <a href="#top" aria-label="healthleticx, zur Startseite" style={{ display: 'block' }}>
            <HLXLogo size={32} decorative />
          </a>
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {[['#about', 'Story'], ['#links', 'Links']].map(([h, l]) => (
                <a key={l} href={h} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{l}</a>
              ))}
            </div>
            <a href="#anfrage" style={{ background: Y, color: GD, padding: '8px 18px', borderRadius: 7, fontWeight: 800, fontSize: 13, textDecoration: 'none' }}>
              Erstgespräch anfragen
            </a>
          </div>
        </nav>
      </header>

      <main id="inhalt" tabIndex={-1}>
        {/* HERO */}
        <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 32px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ width: '100%', paddingTop: 60 }}>
            <div className="hero-grid">
              <div>
                <div style={{ display: 'inline-block', background: Y, color: GD, fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 4, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>
                  @healthleticx
                </div>
                <h1 className="hero-h1" tabIndex={-1} style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.0, letterSpacing: -2, marginBottom: 24, textTransform: 'uppercase' }}>
                  Gesund.<br />
                  <span style={{ color: Y }}>Stark.</span><br />
                  Echt.
                </h1>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 36, maxWidth: 400 }}>
                  Keine Ausreden. Kein Bullshit. Ehrliche Inhalte zu Training, Ernährung und mentalem Wachstum. Für alle, die es wirklich wollen.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href="#anfrage" style={{ background: Y, color: GD, padding: '13px 28px', borderRadius: 8, fontWeight: 800, fontSize: 14, textDecoration: 'none' }}>
                    Erstgespräch anfragen
                  </a>
                  <a href="#links" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)', padding: '13px 28px', borderRadius: 8, fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                    Zur Community
                  </a>
                </div>
              </div>
              <div className="logo-hero" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: 420 }}>
                  <HLXLogoFull />
                </div>
              </div>
            </div>

            <ul className="strip" style={{ listStyle: 'none', marginTop: 60, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28 }}>
              {[
                { val: 'Training', sub: 'Für jeden Level' },
                { val: 'Ernährung', sub: 'Alltagstauglich' },
                { val: 'Mindset', sub: 'Mental stark' },
                { val: 'Community', sub: 'Für alle' },
              ].map((s, i) => (
                <li key={s.val} className="strip-item" style={{ padding: '0 20px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: Y, marginBottom: 3 }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{s.sub}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider />

        {/* ABOUT */}
        <section id="about" aria-labelledby="about-h" className="section-pad" style={{ padding: '72px 32px', maxWidth: 1100, margin: '0 auto' }}>
          <div className="two-col">
            <div>
              <SLabel>Die Story</SLabel>
              <h2 id="about-h" style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.5 }}>Warum healthleticx?</h2>
            </div>
            <div>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: 18 }}>
                healthleticx steht für ein gesundes Leben ohne Kompromisse. Sport, Ernährung, mentale Gesundheit: Für mich gehört das zusammen.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>
                Auf Instagram, TikTok und YouTube teile ich regelmäßig ehrlichen Content. Keine gefilterte Traumwelt. Nur das, was sich für mich im Alltag bewährt hat.
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* SOCIAL LINKS */}
        <section id="links" aria-labelledby="links-h" className="section-pad" style={{ padding: '72px 32px', maxWidth: 1100, margin: '0 auto' }}>
          <div className="social-grid">
            <div>
              <SLabel>Community</SLabel>
              <h2 id="links-h" style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 10 }}>Überall dabei sein.</h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.7 }}>Regelmäßig neuer Content zu Training, Ernährung und Mindset.</p>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SOCIALS.map(s => <li key={s.label}><SocialBtn {...s} /></li>)}
            </ul>
          </div>
        </section>

        <Divider />

        {/* COACHING CTA */}
        <section aria-labelledby="cta-h" className="section-pad" style={{ padding: '72px 32px 100px', maxWidth: 1100, margin: '0 auto' }}>
          <div className="coaching-cta cta-box-inner" style={{ background: GM, border: '1px solid rgba(212,184,74,0.18)', borderRadius: 20, padding: '52px 48px' }}>
            <div>
              <SLabel>1:1 Coaching</SLabel>
              <h2 id="cta-h" style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5, marginBottom: 12 }}>Dein Weg. Dein Tempo.</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, maxWidth: 480, lineHeight: 1.75 }}>
                Training, Ernährung, Mindset: alles auf dich zugeschnitten. Kein Copy-Paste-Plan, sondern persönliche Betreuung und ehrliches Feedback. Ergebnisse sind individuell.
              </p>
            </div>
            <a href="#anfrage" style={{ background: Y, color: GD, padding: '15px 32px', borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Erstgespräch anfragen
            </a>
          </div>
        </section>
      </main>
    </>
  )
}

/* ── Footer (auf jeder Seite, damit Impressum & Datenschutz immer erreichbar sind) ── */

function Footer() {
  const link: React.CSSProperties = { color: 'rgba(255,255,255,0.7)', fontSize: 13, textDecoration: 'underline', textUnderlineOffset: 3 }
  return (
    <footer style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <HLXLogo size={26} />
        <nav aria-label="Rechtliches">
          <ul style={{ listStyle: 'none', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <li><a href="mailto:info@healthleticx.de" style={link}>info@healthleticx.de</a></li>
            <li><a href="#impressum" style={link}>Impressum</a></li>
            <li><a href="#datenschutz" style={link}>Datenschutz</a></li>
            <li><a href="#gesundheit" style={link}>Gesundheitshinweis</a></li>
          </ul>
        </nav>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>© 2026 healthleticx</span>
      </div>
      <p style={{ maxWidth: 1100, margin: '14px auto 0', color: 'rgba(255,255,255,0.6)', fontSize: 12, lineHeight: 1.6 }}>
        Hinweis: Ich bin kein Arzt und mache keine Heilversprechen. Meine Inhalte und mein Coaching ersetzen keine medizinische Beratung, Diagnose oder Behandlung.
      </p>
    </footer>
  )
}

/* ── Coaching-Anfrage ── */

const TIME_SLOTS = [
  'Mo – Fr, Vormittags (9 – 12 Uhr)',
  'Mo – Fr, Mittags (12 – 15 Uhr)',
  'Mo – Fr, Abends (17 – 20 Uhr)',
  'Samstag (10 – 14 Uhr)',
  'Sonntag (10 – 14 Uhr)',
]

function CoachingForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [slots, setSlots] = useState<string[]>([])
  const [slotError, setSlotError] = useState(false)
  const [opened, setOpened] = useState(false)

  const toggleSlot = (s: string) => {
    setSlotError(false)
    setSlots(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (slots.length === 0) {
      setSlotError(true)
      document.getElementById('slot-0')?.focus()
      return
    }
    const subject = `Coaching-Anfrage von ${name}`
    const body = `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || 'nicht angegeben'}\n\nVerfügbare Zeiten:\n${slots.join('\n')}\n\nNachricht:\n${message}`
    window.location.href = `mailto:info@healthleticx.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  const input: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 15, fontFamily: 'inherit',
  }
  const label: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 6, display: 'block' }
  const hint: React.CSSProperties = { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 6, lineHeight: 1.5 }

  return (
    <main id="inhalt" tabIndex={-1} style={{ padding: '80px 24px 60px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <BackLink />

        <SLabel>Unverbindlich & kostenlos</SLabel>
        <h1 tabIndex={-1} style={{ fontSize: 34, fontWeight: 900, letterSpacing: -1, marginBottom: 10 }}>Erstgespräch anfragen</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
          Füll das Formular aus und ich melde mich so bald wie möglich bei dir. Das Erstgespräch ist kostenlos und unverbindlich.
        </p>

        {opened ? (
          <div role="status" style={{ background: GM, border: '1px solid rgba(212,184,74,0.2)', borderRadius: 16, padding: '40px 32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Fast geschafft!</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.7 }}>
              Dein E-Mail-Programm sollte sich mit einer vorbereiteten Nachricht geöffnet haben. Bitte sende sie dort ab, erst dann erhalte ich deine Anfrage.
              Falls sich nichts geöffnet hat, schreib mir direkt an <a href="mailto:info@healthleticx.de" style={{ color: Y }}>info@healthleticx.de</a>.
            </p>
            <a href="#top" style={{ display: 'inline-block', marginTop: 28, background: Y, color: GD, padding: '12px 28px', borderRadius: 8, fontWeight: 800, fontSize: 14, textDecoration: 'none' }}>
              Zurück zur Startseite
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Pflichtfelder sind mit * markiert.</p>

            <div className="form-row">
              <div>
                <label htmlFor="f-name" style={label}>Name *</label>
                <input id="f-name" name="name" autoComplete="name" style={input} placeholder="Dein Name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="f-email" style={label}>E-Mail *</label>
                <input id="f-email" name="email" autoComplete="email" style={input} type="email" placeholder="deine@email.de" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div>
              <label htmlFor="f-phone" style={label}>Telefon (optional)</label>
              <input id="f-phone" name="tel" type="tel" autoComplete="tel" style={input} placeholder="+49 ..." value={phone} onChange={e => setPhone(e.target.value)} />
            </div>

            <fieldset style={{ border: 'none' }} aria-describedby={slotError ? 'slot-error' : undefined}>
              <legend style={{ ...label, marginBottom: 12 }}>Wann passt es dir? * (mehrere möglich)</legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {TIME_SLOTS.map((s, i) => {
                  const on = slots.includes(s)
                  return (
                    <label key={s} htmlFor={`slot-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 12, background: on ? 'rgba(212,184,74,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${on ? 'rgba(212,184,74,0.5)' : 'rgba(255,255,255,0.2)'}`, borderRadius: 10, padding: '12px 16px', cursor: 'pointer', transition: 'all 0.15s' }}>
                      <input id={`slot-${i}`} type="checkbox" checked={on} onChange={() => toggleSlot(s)} style={{ accentColor: Y, width: 18, height: 18 }} />
                      <span style={{ fontSize: 14, color: on ? Y : 'rgba(255,255,255,0.8)', fontWeight: on ? 600 : 400 }}>{s}</span>
                    </label>
                  )
                })}
              </div>
              {slotError && (
                <p id="slot-error" role="alert" style={{ marginTop: 10, fontSize: 14, color: '#ffb4a8', fontWeight: 600 }}>
                  Bitte wähle mindestens eine Zeit aus.
                </p>
              )}
            </fieldset>

            <div>
              <label htmlFor="f-message" style={label}>Was möchtest du besprechen? (optional)</label>
              <textarea id="f-message" name="message" aria-describedby="f-message-hint" style={{ ...input, minHeight: 100, resize: 'vertical' }} placeholder="Deine Ziele, Fragen, wie viel Zeit du hast ..." value={message} onChange={e => setMessage(e.target.value)} />
              <p id="f-message-hint" style={hint}>Bitte keine Gesundheitsdaten wie Diagnosen, Verletzungen oder Medikamente. Falls das wichtig ist, frage ich im Gespräch danach.</p>
            </div>

            <button type="submit" style={{ background: Y, color: GD, padding: '15px', borderRadius: 10, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer' }}>
              E-Mail-Anfrage vorbereiten
            </button>

            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, textAlign: 'center' }}>
              Der Knopf öffnet dein E-Mail-Programm mit einer vorbereiteten Nachricht. Diese Website speichert nichts. Deine Angaben nutze ich nur, um deine Anfrage zu beantworten.
              Mehr dazu in der <a href="#datenschutz" style={{ color: Y }}>Datenschutzerklärung</a>.
            </p>
          </form>
        )}
      </div>
    </main>
  )
}

/* ── Logo ── */

function HLXLogo({ size = 32, decorative = false }: { size?: number; decorative?: boolean }) {
  return (
    <svg viewBox="0 0 530 130" height={size} style={{ display: 'block' }}
      {...(decorative ? { 'aria-hidden': true, focusable: false } : { role: 'img', 'aria-label': 'healthleticx Logo' })}>
      <rect width="530" height="130" rx="8" fill="#1a5c3a" />
      <LogoInner />
    </svg>
  )
}

function HLXLogoFull() {
  return (
    <svg viewBox="0 0 530 130" width="100%" style={{ display: 'block', borderRadius: 14 }} role="img" aria-label="healthleticx Logo: Schriftzug HLX">
      <rect width="530" height="130" rx="14" fill="#1a5c3a" />
      <LogoInner />
    </svg>
  )
}

function LogoInner() {
  return (
    <g fill="#f5e400">
      <rect x="6" y="58" width="48" height="14" />
      <rect x="54" y="18" width="8" height="94" />
      <rect x="54" y="18" width="28" height="8" />
      <rect x="54" y="104" width="28" height="8" />
      <rect x="74" y="18" width="8" height="94" />
      <rect x="82" y="58" width="14" height="14" />
      <rect x="96" y="18" width="8" height="94" />
      <rect x="96" y="18" width="28" height="8" />
      <rect x="96" y="104" width="28" height="8" />
      <rect x="116" y="18" width="8" height="94" />
      <rect x="124" y="58" width="14" height="14" />
      {/* H */}
      <rect x="138" y="18" width="20" height="94" />
      <rect x="138" y="58" width="88" height="14" />
      <rect x="206" y="18" width="20" height="94" />
      {/* L */}
      <rect x="242" y="18" width="20" height="94" />
      <rect x="242" y="94" width="60" height="18" />
      {/* X */}
      <polygon points="320,18 342,18 416,112 394,112" />
      <polygon points="394,18 416,18 342,112 320,112" />
      {/* Right side mirror */}
      <rect x="416" y="58" width="14" height="14" />
      <rect x="430" y="18" width="8" height="94" />
      <rect x="430" y="18" width="28" height="8" />
      <rect x="430" y="104" width="28" height="8" />
      <rect x="450" y="18" width="8" height="94" />
      <rect x="458" y="58" width="14" height="14" />
      <rect x="472" y="18" width="8" height="94" />
      <rect x="472" y="18" width="28" height="8" />
      <rect x="472" y="104" width="28" height="8" />
      <rect x="492" y="18" width="8" height="94" />
      <rect x="500" y="58" width="24" height="14" />
    </g>
  )
}

/* ── Helpers ── */

function Divider() {
  return <div aria-hidden="true" style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(212,184,74,0.15), transparent)', margin: '0 32px' }} />
}

function SLabel({ children }: { children: string }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: Y, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>{children}</div>
}

function BackLink() {
  return (
    <a href="#top" style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)', padding: '7px 16px', borderRadius: 7, fontSize: 13, marginBottom: 36, textDecoration: 'none' }}>
      <span aria-hidden="true">← </span>Zurück zur Startseite
    </a>
  )
}

function SocialBtn({ label, handle, icon, color, url }: { label: string; handle: string; icon: string; color: string; url: string }) {
  const [hov, setHov] = useState(false)
  const external = url.startsWith('http')
  return (
    <a href={url} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 14, background: hov ? 'rgba(212,184,74,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid ${hov ? 'rgba(212,184,74,0.35)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 11, padding: '12px 16px', textDecoration: 'none', color: '#fff', transition: 'all 0.15s' }}>
      <div aria-hidden="true" style={{ width: 38, height: 38, borderRadius: 8, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>{handle}</div>
      </div>
      {external && <span className="sr-only">(öffnet in neuem Tab)</span>}
      <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
    </a>
  )
}

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main id="inhalt" tabIndex={-1} style={{ padding: '80px 24px 60px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <BackLink />
        <h1 tabIndex={-1} style={{ fontSize: 34, fontWeight: 800, marginBottom: 40, letterSpacing: -0.5 }}>{title}</h1>
        <div style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, fontSize: 15 }}>{children}</div>
      </div>
    </main>
  )
}

const H2 = ({ children }: { children: React.ReactNode }) => <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700, marginBottom: 8, marginTop: 28 }}>{children}</h2>

// PLATZHALTER: Name und ladungsfähige Anschrift liefert Loris; nach Firmengründung Firmendaten (Rechtsform, Vertretung, Register, USt-IdNr.).
function ImpressumContent() {
  return (
    <>
      <H2>Angaben gemäß § 5 DDG</H2>
      <p>[Vorname Nachname]<br />healthleticx<br />[Straße Hausnummer]<br />[PLZ Ort]</p>
      <H2>Kontakt</H2>
      <p>E-Mail: info@healthleticx.de</p>
      <H2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</H2>
      <p>[Vorname Nachname], Anschrift wie oben</p>
      <H2>Verbraucherstreitbeilegung</H2>
      <p>Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <H2>Haftung für Inhalte und Links</H2>
      <p>Die Inhalte dieser Website wurden mit Sorgfalt erstellt, für Richtigkeit, Vollständigkeit und Aktualität kann ich jedoch keine Gewähr übernehmen. Für verlinkte externe Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
      <H2>Gesundheitshinweis</H2>
      <p>Die Inhalte dieser Website dienen der allgemeinen Information und Motivation. Sie stellen keine medizinische oder therapeutische Beratung dar und ersetzen keinen Arzt.</p>
    </>
  )
}

function DatenschutzContent() {
  return (
    <>
      <p>Stand: 31. Oktober 2026</p>
      <H2>1. Verantwortlicher</H2>
      <p>[Vorname Nachname], healthleticx, [Straße Hausnummer], [PLZ Ort], E-Mail: info@healthleticx.de</p>
      <H2>2. Grundsätzliches</H2>
      <p>Diese Website setzt keine Cookies, speichert nichts in deinem Browser und nutzt kein Tracking und keine Analyse-Dienste. Schriften und alle Programmteile werden direkt von dieser Website geladen, nicht von Drittanbietern wie Google Fonts. Es sind keine Inhalte Dritter (z. B. Videos, Karten oder Social-Media-Beiträge) eingebettet.</p>
      <H2>3. Hosting (Cloud86)</H2>
      <p>Die Website liegt auf einem Server der Cloud86 B.V. (Lavendelheide 21-108, 9202 PD Drachten, Niederlande), der in meinem Auftrag tätig ist (Auftragsverarbeitung nach Art. 28 DSGVO). Der Server steht in den Niederlanden, eine Übermittlung in Drittländer findet nicht statt. Beim Aufruf werden technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browserangaben verarbeitet und in Server-Logdateien gespeichert, um die Website auszuliefern und vor Missbrauch zu schützen. Die Logdateien werden regelmäßig rotiert und gelöscht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren, funktionierenden Website).</p>
      <H2>4. Coaching-Anfrage</H2>
      <p>Das Anfrageformular öffnet dein eigenes E-Mail-Programm mit einer vorbereiteten Nachricht an info@healthleticx.de. Die Website selbst speichert oder überträgt dabei nichts. Erst wenn du die E-Mail absendest, erhalte ich deine Angaben (Name, E-Mail, optional Telefon, Wunschzeiten, Nachricht). Pflicht sind nur Name, E-Mail und eine Wunschzeit, weil ich dich sonst nicht erreichen kann. Ich nutze die Angaben, um deine Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO), und lösche sie, wenn keine Zusammenarbeit zustande kommt, spätestens nach 6 Monaten. Bitte schicke keine Gesundheitsdaten wie Diagnosen oder Medikamente per E-Mail.</p>
      <H2>5. Externe Links</H2>
      <p>Links zu Instagram, TikTok, YouTube, WhatsApp und Telegram sind einfache Links. Erst beim Anklicken verlässt du diese Website; dann gilt die Datenschutzerklärung des jeweiligen Anbieters.</p>
      <H2>6. Deine Rechte</H2>
      <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). Beschweren kannst du dich bei einer Aufsichtsbehörde, z. B. beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart.</p>
      <H2>7. Widerspruchsrecht (Art. 21 DSGVO)</H2>
      <p><strong>Soweit ich Daten auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) verarbeite, kannst du dem aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit widersprechen. Eine formlose Nachricht an info@healthleticx.de genügt.</strong></p>
    </>
  )
}

function GesundheitContent() {
  return (
    <>
      <H2>Keine medizinische Beratung</H2>
      <p>Ich bin kein Arzt und mache keine Heilversprechen. Mein Coaching, meine Inhalte und die App HLX Together dienen der allgemeinen Information und Motivation. Sie sind keine Diagnose, Therapie oder medizinische Beratung und ersetzen nicht den Rat von Ärztin oder Arzt, Physiotherapie oder Ernährungsfachkraft.</p>
      <H2>Bevor du startest</H2>
      <p>Sprich bitte vorher mit deiner Ärztin oder deinem Arzt, wenn du Vorerkrankungen, Verletzungen, Schmerzen, eine Schwangerschaft, eine Essstörung oder Medikamente hast. Intervallfasten oder ein Kaloriendefizit sind nicht für alle geeignet, insbesondere nicht für Schwangere, Stillende, Menschen mit Essstörungen oder Untergewicht und Personen unter 18 Jahren.</p>
      <H2>Ergebnisse sind individuell</H2>
      <p>Wie sich Fitness, Gewicht oder Wohlbefinden verändern, hängt von vielen Faktoren ab. Beispiele und Erfahrungen anderer sind keine Garantie.</p>
      <H2>Im Notfall</H2>
      <p>Bei akuten Beschwerden wie Brustschmerz, Atemnot, Ohnmacht oder starker Blutung sofort den Notruf 112 wählen.</p>
    </>
  )
}

const SOCIALS = [
  { label: 'Instagram', handle: '@healthleticx', icon: '📸', color: '#833ab4', url: 'https://www.instagram.com/healthleticx' },
  { label: 'TikTok', handle: '@healthleticx', icon: '🎵', color: '#010101', url: 'https://www.tiktok.com/@healthleticx' },
  { label: 'YouTube', handle: '@healthleticx', icon: '▶', color: '#ff0000', url: 'https://www.youtube.com/@healthleticx' },
  { label: 'WhatsApp Community', handle: 'Kostenlos beitreten', icon: '💬', color: '#25d366', url: 'https://whatsapp.com/channel/0029VbCZ3Jx0VycHkB8WfZ1o' },
  { label: 'Telegram', handle: 't.me/healthleticx', icon: '✈', color: '#0088cc', url: 'https://t.me/healthleticx' },
  { label: 'E-Mail', handle: 'info@healthleticx.de', icon: '✉', color: GM, url: 'mailto:info@healthleticx.de' },
]
