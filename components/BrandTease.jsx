// What you can do — a tight 2-column tease that lives below the brand hero
function BrandTease() {
  return (
    <section className="section" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        {/* Tagline / mission */}
        <div style={{ maxWidth: 840, marginBottom: 64 }}>
          <div className="eyebrow">PikLab is two things at once</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: 18 }}>
            A real pickleball club where every paddle, ball, and court is also a sensor — and a research lab where what we learn doesn't stay in pickleball.
          </h2>
        </div>

        {/* Side-by-side tease */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          alignItems: 'stretch',
        }} className="bt-grid">
          {/* CLUB tease */}
          <a href="club.html" className="card bt-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(28px, 4vw, 48px)',
            minHeight: 420,
            background: 'var(--off-white)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <svg viewBox="0 0 400 220" style={{ position: 'absolute', right: -20, top: 0, width: '60%', opacity: 0.7, pointerEvents: 'none' }}>
              <rect x="40" y="40" width="320" height="140" fill="none" stroke="var(--navy)" strokeWidth="1.4"/>
              <line x1="200" y1="40" x2="200" y2="180" stroke="var(--coral)" strokeWidth="1.2" strokeDasharray="3 3"/>
              <rect x="160" y="40" width="40" height="140" fill="none" stroke="var(--navy)" strokeWidth="0.8" opacity="0.5"/>
              <rect x="200" y="40" width="40" height="140" fill="none" stroke="var(--navy)" strokeWidth="0.8" opacity="0.5"/>
              <circle cx="285" cy="130" r="6" fill="var(--green)"/>
              <path d="M 145 110 L 285 130" stroke="var(--green)" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.6"/>
            </svg>

            <div style={{ position: 'relative' }}>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--coral)', letterSpacing: '0.16em' }}>SIDE A · THE CLUB</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)',
                letterSpacing: '-0.025em',
                marginTop: 18,
                lineHeight: 1.05,
                maxWidth: '14ch',
              }}>
                Open play, leagues, clinics, drills.
              </h3>
            </div>

            <div style={{ position: 'relative', marginTop: 32 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                {['Pilot live at Indoor Pickleball X Concord', 'PikLab software runs court ops + AI today', 'Fresno Winter 2026: 16 courts + full robotics fleet', 'Three more cities by 2027'].map(x => (
                  <li key={x} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: 'var(--navy)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--coral)' }}></span>
                    {x}
                  </li>
                ))}
              </ul>
              <div style={{
                marginTop: 28,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: 'var(--coral)',
                fontSize: '1rem',
                paddingBottom: 4,
                borderBottom: '2px solid var(--coral)',
              }}>
                See the club
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </a>

          {/* LAB tease */}
          <a href="lab.html" className="card bt-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(28px, 4vw, 48px)',
            minHeight: 420,
            background: 'var(--navy)',
            color: 'var(--off-white)',
            border: '1px solid var(--navy)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <svg viewBox="0 0 400 220" style={{ position: 'absolute', right: -10, top: 10, width: '60%', opacity: 0.6, pointerEvents: 'none' }}>
              <defs>
                <pattern id="bt-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(196, 216, 46, 0.15)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="400" height="220" fill="url(#bt-grid)"/>
              <rect x="40" y="60" width="80" height="40" rx="4" fill="rgba(15, 26, 46, 0.8)" stroke="var(--green)" strokeWidth="1.2"/>
              <rect x="180" y="60" width="80" height="40" rx="4" fill="rgba(15, 26, 46, 0.8)" stroke="var(--green)" strokeWidth="1.2"/>
              <rect x="320" y="60" width="60" height="40" rx="4" fill="rgba(15, 26, 46, 0.8)" stroke="var(--green)" strokeWidth="1.2"/>
              <line x1="120" y1="80" x2="180" y2="80" stroke="var(--coral)" strokeWidth="1.2" strokeDasharray="3 3"/>
              <line x1="260" y1="80" x2="320" y2="80" stroke="var(--coral)" strokeWidth="1.2" strokeDasharray="3 3"/>
              <text x="80" y="84" fill="var(--green)" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">VISION</text>
              <text x="220" y="84" fill="var(--green)" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">PLAN</text>
              <text x="350" y="84" fill="var(--green)" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">ACT</text>
            </svg>

            <div style={{ position: 'relative' }}>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--green)', letterSpacing: '0.16em' }}>SIDE B · THE LAB</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)',
                letterSpacing: '-0.025em',
                marginTop: 18,
                lineHeight: 1.05,
                color: 'var(--off-white)',
                maxWidth: '14ch',
              }}>
                LLM-orchestrated robots, embodied research.
              </h3>
            </div>

            <div style={{ position: 'relative', marginTop: 32 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                {['Real-world embodied agents', 'LLM orchestrator for facility ops', 'Vision + tracking research', 'Open papers, hiring engineers'].map(x => (
                  <li key={x} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: 'rgba(250, 250, 247, 0.85)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)' }}></span>
                    {x}
                  </li>
                ))}
              </ul>
              <div style={{
                marginTop: 28,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: 'var(--green)',
                fontSize: '1rem',
                paddingBottom: 4,
                borderBottom: '2px solid var(--green)',
              }}>
                See research & openings
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Locations strip */}
        <div style={{
          marginTop: 48,
          padding: '24px clamp(20px, 3vw, 36px)',
          borderRadius: 16,
          background: 'var(--gray-100)',
          border: '1px solid var(--gray-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <div>
            <div className="mono" style={{ color: 'var(--warm-gray)', fontSize: '0.66rem', letterSpacing: '0.16em' }}>LOCATIONS</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.02em', marginTop: 4 }}>
              Find your home club
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { c: 'Concord', s: 'CA', l: 'Pilot live', href: 'concord.html', primary: true },
              { c: 'Fresno', s: 'CA', l: 'Winter 2026 · Flagship', href: 'fresno.html' },
              { c: 'Sacramento', s: 'CA', l: 'Q2 2027', href: 'sacramento.html' },
              { c: 'Portland', s: 'OR', l: 'Q3 2027', href: 'portland.html' },
              { c: 'San Jose', s: 'CA', l: 'Q4 2027', href: 'sanjose.html' },
            ].map(loc => (
              <a key={loc.c} href={loc.href} style={{
                padding: '12px 18px',
                borderRadius: 999,
                background: loc.primary ? 'var(--navy)' : 'white',
                color: loc.primary ? 'var(--off-white)' : 'var(--navy)',
                border: `1px solid ${loc.primary ? 'var(--navy)' : 'var(--gray-300)'}`,
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                gap: 10,
                alignItems: 'center',
              }}>
                {loc.c}, {loc.s}
                <span className="mono" style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  color: loc.primary ? 'var(--green)' : 'var(--warm-gray)',
                  fontWeight: 500,
                }}>{loc.l.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { .bt-grid { grid-template-columns: 1fr !important; } }
        .bt-card { transition: transform 220ms ease, box-shadow 220ms ease; }
        .bt-card:hover { transform: translateY(-3px); }
      `}</style>
    </section>
  );
}

window.BrandTease = BrandTease;
