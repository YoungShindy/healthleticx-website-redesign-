import { useState, useEffect } from 'react'

const Y = '#d4b84a'
const GD = '#0e1c13'
const GM = '#1c3525'

type Page = 'home' | 'coaching-form' | 'impressum' | 'datenschutz' | 'gesundheit'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [page, setPage] = useState<Page>('home')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { window.scrollTo(0, 0) }, [page])

  if (page === 'coaching-form') return <CoachingForm onBack={() => setPage('home')} />
  if (page === 'impressum') return <LegalPage title="Impressum" onBack={() => setPage('home')}><ImpressumContent /></LegalPage>
  if (page === 'datenschutz') return <LegalPage title="Datenschutzerklärung" onBack={() => setPage('home')}><DatenschutzContent /></LegalPage>
  if (page === 'gesundheit') return <LegalPage title="Gesundheitshinweis" onBack={() => setPage('home')}><GesundheitContent /></LegalPage>

  const openCoaching = () => setPage('coaching-form')

  return (
    <div style={{ background: GD, color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(14,28,19,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,184,74,0.1)' : '1px solid transparent',
        transition: 'all 0.25s',
      }}>
        <div className="nav-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <HLXLogo size={32} />
          </button>
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {[['#about', 'Story'], ['#links', 'Links']].map(([h, l]) => (
                <a key={l} href={h} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{l}</a>
              ))}
            </div>
            <button onClick={openCoaching} style={{ background: Y, color: GD, padding: '8px 18px', borderRadius: 7, fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer' }}>
              Coaching
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ width: '100%', paddingTop: 60 }}>
          <div className="hero-grid">
            <div>
              <div style={{ display: 'inline-block', background: Y, color: GD, fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 4, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>
                @healthleticx
              </div>
              <h1 className="hero-h1" style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.0, letterSpacing: -2, marginBottom: 24, textTransform: 'uppercase' }}>
                Gesund.<br />
                <span style={{ color: Y }}>Stark.</span><br />
                Echt.
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 36, maxWidth: 400 }}>
                Keine Ausreden. Kein Bullshit. Ehrliche Inhalte zu Training, Ernährung und mentalem Wachstum. Für alle, die es wirklich wollen.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={openCoaching} style={{ background: Y, color: GD, padding: '13px 28px', borderRadius: 8, fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                  Coaching buchen
                </button>
                <a href="#links" style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)', padding: '13px 28px', borderRadius: 8, fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  Community
                </a>
              </div>
            </div>
            <div className="logo-hero" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 420 }}>
                <HLXLogoFull />
              </div>
            </div>
          </div>

          <div className="strip" style={{ marginTop: 60, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28 }}>
            {[
              { val: 'Training', sub: 'Für jeden Level' },
              { val: 'Ernährung', sub: 'Alltagstauglich' },
              { val: 'Mindset', sub: 'Mental stark' },
              { val: 'Community', sub: 'Für alle' },
            ].map((s, i) => (
              <div key={s.val} className="strip-item" style={{ padding: '0 20px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: Y, marginBottom: 3 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ABOUT */}
      <section id="about" className="section-pad" style={{ padding: '72px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="two-col">
          <div>
            <SLabel>Die Story</SLabel>
            <h2 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.5 }}>Warum Healthletics?</h2>
          </div>
          <div>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: 18 }}>
              Healthletics steht für ein gesundes Leben ohne Kompromisse. Sport, Ernährung, mentale Gesundheit: Das gehört für uns zusammen.
            </p>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85 }}>
              Auf Instagram, TikTok und YouTube teilen wir täglich ehrlichen Content. Keine gefilterte Traumwelt. Nur das, was wirklich funktioniert.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* SOCIAL LINKS */}
      <section id="links" className="section-pad" style={{ padding: '72px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="social-grid">
          <div>
            <SLabel>Community</SLabel>
            <h2 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 10 }}>Überall dabei sein.</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.7 }}>Täglich neuer Content zu Training, Ernährung und Mindset.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      <Divider />

      {/* COACHING CTA */}
      <section className="section-pad" style={{ padding: '72px 32px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="coaching-cta cta-box-inner" style={{ background: GM, border: '1px solid rgba(212,184,74,0.18)', borderRadius: 20, padding: '52px 48px' }}>
          <div>
            <SLabel>1:1 Coaching</SLabel>
            <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5, marginBottom: 12 }}>Deine Transformation. Jetzt.</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, maxWidth: 480, lineHeight: 1.75 }}>
              Training, Ernährung, Mindset: alles auf dich zugeschnitten. Kein Copy-Paste-Plan. Echte Betreuung, echte Ergebnisse.
            </p>
          </div>
          <button onClick={openCoaching} style={{ background: Y, color: GD, padding: '15px 32px', borderRadius: 10, fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Jetzt starten
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <HLXLogo size={26} />
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <a href="mailto:info@healthleticx.de" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, textDecoration: 'none' }}>info@healthleticx.de</a>
            <button onClick={() => setPage('impressum')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 12, cursor: 'pointer', padding: 0 }}>Impressum</button>
            <button onClick={() => setPage('datenschutz')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 12, cursor: 'pointer', padding: 0 }}>Datenschutz</button>
            <button onClick={() => setPage('gesundheit')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 12, cursor: 'pointer', padding: 0 }}>Gesundheitshinweis</button>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>© 2026 healthleticx</span>
        </div>
        <p style={{ maxWidth: 1100, margin: '14px auto 0', color: 'rgba(255,255,255,0.3)', fontSize: 11, lineHeight: 1.6 }}>
          Hinweis: Ich bin kein Arzt und mache keine Heilversprechen. Meine Inhalte und mein Coaching ersetzen keine medizinische Beratung, Diagnose oder Behandlung.
        </p>
      </footer>
    </div>
  )
}

/* ── Coaching Contact Form ── */

const TIME_SLOTS = [
  'Mo – Fr, Vormittags (9 – 12 Uhr)',
  'Mo – Fr, Mittags (12 – 15 Uhr)',
  'Mo – Fr, Abends (17 – 20 Uhr)',
  'Samstag (10 – 14 Uhr)',
  'Sonntag (10 – 14 Uhr)',
]

function CoachingForm({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [slots, setSlots] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const toggleSlot = (s: string) =>
    setSlots(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || slots.length === 0) return
    setStatus('sending')
    try {
      const body = `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || 'nicht angegeben'}\n\nVerfügbare Zeiten:\n${slots.join('\n')}\n\nNachricht:\n${message}`
      window.location.href = `mailto:info@healthleticx.de?subject=Coaching-Anfrage von ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const input: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none',
    fontFamily: 'inherit',
  }
  const label: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'block' }

  return (
    <div style={{ background: GD, color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh', padding: '80px 24px 60px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <button onClick={onBack} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', borderRadius: 7, cursor: 'pointer', fontSize: 13, marginBottom: 36 }}>
          ← Zurück
        </button>

        <SLabel>Unverbindlich & kostenlos</SLabel>
        <h1 style={{ fontSize: 34, fontWeight: 900, letterSpacing: -1, marginBottom: 10 }}>Erstgespräch anfragen</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
          Füll das Formular aus und ich melde mich innerhalb von 24 Stunden bei dir. Das Erstgespräch ist vollkommen unverbindlich.
        </p>

        {status === 'sent' ? (
          <div style={{ background: GM, border: '1px solid rgba(212,184,74,0.2)', borderRadius: 16, padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Anfrage gesendet!</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Ich melde mich bald bei dir. Bis dahin kannst du mir auch direkt schreiben.</p>
            <button onClick={onBack} style={{ marginTop: 28, background: Y, color: GD, padding: '12px 28px', borderRadius: 8, fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer' }}>
              Zurück zur Startseite
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div className="form-row">
              <div>
                <label style={label}>Name *</label>
                <input style={input} placeholder="Dein Name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label style={label}>E-Mail *</label>
                <input style={input} type="email" placeholder="deine@email.de" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div>
              <label style={label}>Telefon (optional)</label>
              <input style={input} placeholder="+49 ..." value={phone} onChange={e => setPhone(e.target.value)} />
            </div>

            <div>
              <label style={{ ...label, marginBottom: 12 }}>Wann passt es dir? * (mehrere möglich)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {TIME_SLOTS.map(s => (
                  <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, background: slots.includes(s) ? 'rgba(212,184,74,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${slots.includes(s) ? 'rgba(212,184,74,0.35)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 10, padding: '12px 16px', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <input type="checkbox" checked={slots.includes(s)} onChange={() => toggleSlot(s)} style={{ accentColor: Y, width: 16, height: 16 }} />
                    <span style={{ fontSize: 14, color: slots.includes(s) ? Y : 'rgba(255,255,255,0.7)', fontWeight: slots.includes(s) ? 600 : 400 }}>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={label}>Was möchtest du besprechen? (optional)</label>
              <textarea style={{ ...input, minHeight: 100, resize: 'vertical' }} placeholder="Kurze Beschreibung deiner Ziele, aktuelle Situation, Fragen..." value={message} onChange={e => setMessage(e.target.value)} />
            </div>

            <button
              type="submit"
              disabled={!name || !email || slots.length === 0 || status === 'sending'}
              style={{ background: (!name || !email || slots.length === 0) ? 'rgba(212,184,74,0.4)' : Y, color: GD, padding: '15px', borderRadius: 10, fontWeight: 800, fontSize: 16, border: 'none', cursor: (!name || !email || slots.length === 0) ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
            >
              {status === 'sending' ? 'Wird gesendet...' : 'Anfrage senden'}
            </button>

            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
              Deine Daten werden nur für die Kontaktaufnahme genutzt und nicht weitergegeben.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

/* ── Logo ── */

function HLXLogo({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 530 130" height={size} style={{ display: 'block' }} aria-label="Healthletics">
      <rect width="530" height="130" rx="8" fill="#1a5c3a" />
      <LogoInner />
    </svg>
  )
}

function HLXLogoFull() {
  return (
    <svg viewBox="0 0 530 130" width="100%" style={{ display: 'block', borderRadius: 14 }} aria-label="Healthletics HLX">
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
  return <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(212,184,74,0.15), transparent)', margin: '0 32px' }} />
}

function SLabel({ children }: { children: string }) {
  return <div style={{ fontSize: 10, fontWeight: 700, color: Y, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>{children}</div>
}

function SocialBtn({ label, handle, icon, color, url }: { label: string; handle: string; icon: string; color: string; url: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 14, background: hov ? 'rgba(212,184,74,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid ${hov ? 'rgba(212,184,74,0.25)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 11, padding: '12px 16px', textDecoration: 'none', color: '#fff', transition: 'all 0.15s' }}>
      <div style={{ width: 38, height: 38, borderRadius: 8, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{handle}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
    </a>
  )
}

function LegalPage({ title, onBack, children }: { title: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <div style={{ background: GD, color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh', padding: '80px 24px 60px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <button onClick={onBack} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', borderRadius: 7, cursor: 'pointer', fontSize: 13, marginBottom: 40 }}>
          ← Zurück
        </button>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 40, letterSpacing: -0.5 }}>{title}</h1>
        <div style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, fontSize: 15 }}>{children}</div>
      </div>
    </div>
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
      <p>Stand: 22. Oktober 2026</p>
      <H2>1. Verantwortlicher</H2>
      <p>[Vorname Nachname], healthleticx, [Straße Hausnummer], [PLZ Ort], E-Mail: info@healthleticx.de</p>
      <H2>2. Grundsätzliches</H2>
      <p>Diese Website setzt keine Cookies und nutzt kein Tracking. Schriften und alle Programmteile werden direkt von dieser Website geladen, nicht von Drittanbietern wie Google Fonts.</p>
      <H2>3. Hosting (Cloud86)</H2>
      <p>Die Website liegt auf einem Server der Cloud86 B.V. (Lavendelheide 21-108, 9202 PD Drachten, Niederlande), der in meinem Auftrag tätig ist (Auftragsverarbeitung nach Art. 28 DSGVO). Der Server steht in den Niederlanden, eine Übermittlung in Drittländer findet nicht statt. Beim Aufruf werden technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browserangaben verarbeitet und in Server-Logdateien gespeichert, um die Website auszuliefern und vor Missbrauch zu schützen. Die Logdateien werden regelmäßig rotiert und gelöscht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren, funktionierenden Website).</p>
      <H2>4. Coaching-Anfrage</H2>
      <p>Das Anfrageformular öffnet dein eigenes E-Mail-Programm mit einer vorbereiteten Nachricht an info@healthleticx.de. Erst wenn du sie dort absendest, erhalte ich deine Angaben (Name, E-Mail, optional Telefon, Wunschzeiten, Nachricht). Ich nutze sie, um deine Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO), und lösche sie, wenn keine Zusammenarbeit zustande kommt, spätestens nach 6 Monaten. Bitte schicke keine Gesundheitsdaten wie Diagnosen oder Medikamente per E-Mail.</p>
      <H2>5. Externe Links</H2>
      <p>Links zu Instagram, TikTok, YouTube, WhatsApp und Telegram sind einfache Links. Erst beim Anklicken verlässt du diese Website; dann gilt die Datenschutzerklärung des jeweiligen Anbieters.</p>
      <H2>6. Deine Rechte</H2>
      <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). Beschweren kannst du dich bei einer Aufsichtsbehörde, z. B. beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart.</p>
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
