function Locations({ compact = true }) {
  const locations = [
    {
      city: 'Concord',
      state: 'CA',
      status: 'open',
      label: 'Pilot live · Indoor Pickleball X',
      address: 'Indoor Pickleball X · Concord, CA',
      courts: 9,
      sqft: '4,000+ players',
      opened: 'Software live',
      features: ['Booking + AI live', 'Robots 2026'],
      tag: 'PILOT',
    },
    {
      city: 'Fresno',
      state: 'CA',
      status: 'soon',
      label: 'Coming Winter 2026 · Flagship',
      address: '3070 W Shaw Ave',
      courts: 15,
      sqft: '36,000',
      opened: 'Winter 2026',
      features: ['Full robotics fleet', 'Café & pro shop'],
      tag: 'FLAGSHIP',
      cta: { label: 'Reserve your spot on OpenDinks', href: 'https://opendinks.com' },
    },
    {
      city: 'Sacramento',
      state: 'CA',
      status: 'soon',
      label: 'Coming Q4 2026',
      address: 'R Street District',
      courts: 8,
      sqft: '36,000',
      opened: 'Q4 2026',
      features: ['Vision system standard', 'Robot bays · 3', 'Outdoor patio'],
      tag: 'NEXT',
    },
    {
      city: 'Portland',
      state: 'OR',
      status: 'soon',
      label: 'Coming Q1 2027',
      address: 'Central Eastside',
      courts: 8,
      sqft: '34,000',
      opened: 'Q1 2027',
      features: ['Vision system standard', 'Robot bays · 3', 'Recovery suite'],
      tag: 'PLANNED',
    },
    {
      city: 'San Jose',
      state: 'CA',
      status: 'soon',
      label: 'Coming Q2 2027',
      address: 'Site selection',
      courts: 12,
      sqft: '48,000',
      opened: 'Q2 2027',
      features: ['Tournament-grade', 'Robot bays · 5', 'Research wing'],
      tag: 'PLANNED',
    },
  ];

  return (
    <section className="section" id="locations" style={{ background: 'var(--gray-100)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 48, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 600 }}>
            <div className="eyebrow">04 — Locations</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', marginTop: 16 }}>
              One pilot live. Four clubs on the way.
            </h2>
          </div>
          {compact && (
            <a href="locations.html" className="btn btn-ghost">
              All locations
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {locations.map(loc => <LocationCard key={loc.city} {...loc} />)}
        </div>
      </div>
    </section>
  );
}

function LocationCard({ city, state, status, label, address, courts, sqft, opened, features, tag, cta }) {
  const isOpen = status === 'open';
  const cityHref = city.toLowerCase().replace(/\s+/g, '') + '.html';
  return (
    <a
      href={cta ? cta.href : cityHref}
      target={cta ? '_blank' : undefined}
      rel={cta ? 'noopener' : undefined}
      className="card loc-card"
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'block',
        background: isOpen ? 'var(--navy)' : 'white',
        color: isOpen ? 'var(--off-white)' : 'var(--navy)',
        border: isOpen ? '1px solid var(--navy)' : '1px solid var(--gray-200)',
      }}
    >
      {/* Visual block — placeholder map / aerial */}
      <div style={{
        height: 180,
        position: 'relative',
        background: isOpen
          ? 'linear-gradient(135deg, var(--navy-2), var(--navy))'
          : 'repeating-linear-gradient(45deg, #E4E4DD, #E4E4DD 8px, #F2F2EE 8px, #F2F2EE 16px)',
        overflow: 'hidden',
      }}>
        {/* Ghost court diagram */}
        <svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: isOpen ? 0.4 : 0.5 }}>
          <rect x="20" y="20" width="160" height="60" fill="none" stroke={isOpen ? '#C4D82E' : '#6B7280'} strokeWidth="0.8"/>
          <line x1="100" y1="20" x2="100" y2="80" stroke={isOpen ? '#FF6B4A' : '#6B7280'} strokeWidth="0.8" strokeDasharray="2 2"/>
          <rect x="80" y="20" width="20" height="60" fill="none" stroke={isOpen ? '#C4D82E' : '#6B7280'} strokeWidth="0.5" opacity="0.6"/>
          <rect x="100" y="20" width="20" height="60" fill="none" stroke={isOpen ? '#C4D82E' : '#6B7280'} strokeWidth="0.5" opacity="0.6"/>
        </svg>

        {/* Status pill */}
        <div style={{
          position: 'absolute',
          top: 14,
          left: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 10px',
          borderRadius: 999,
          background: isOpen ? 'var(--green)' : 'rgba(15, 26, 46, 0.06)',
          color: isOpen ? 'var(--navy)' : 'var(--navy)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          border: isOpen ? 'none' : '1px solid rgba(15, 26, 46, 0.1)',
        }}>
          {isOpen && <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)' }}></span>}
          {label.toUpperCase()}
        </div>

        {/* Tag */}
        <div style={{
          position: 'absolute',
          top: 14,
          right: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.16em',
          color: isOpen ? 'rgba(196, 216, 46, 0.7)' : 'var(--warm-gray)',
        }}>
          {tag}
        </div>
      </div>

      <div style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', letterSpacing: '-0.02em', margin: 0 }}>
            {city}
          </h3>
          <span className="mono" style={{ color: isOpen ? 'rgba(250, 250, 247, 0.5)' : 'var(--warm-gray)' }}>{state}</span>
        </div>
        <div style={{ color: isOpen ? 'rgba(250, 250, 247, 0.6)' : 'var(--warm-gray)', fontSize: '0.92rem', marginBottom: 20 }}>
          {address}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
          padding: '14px 0',
          borderTop: `1px solid ${isOpen ? 'rgba(250, 250, 247, 0.1)' : 'var(--gray-200)'}`,
          borderBottom: `1px solid ${isOpen ? 'rgba(250, 250, 247, 0.1)' : 'var(--gray-200)'}`,
          marginBottom: 16,
        }}>
          <Stat label="Courts" value={courts} dark={isOpen}/>
          <Stat label={isOpen ? 'Players' : 'Sq ft'} value={sqft} dark={isOpen}/>
          <Stat label={isOpen ? 'Status' : 'Opens'} value={opened} dark={isOpen}/>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
          {features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: isOpen ? 'rgba(250, 250, 247, 0.8)' : 'var(--navy)' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: isOpen ? 'var(--green)' : 'var(--coral)' }}></span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      {cta && (
        <div style={{
          padding: '14px 28px 16px',
          background: '#F25C2D',
          color: '#FFFEFB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '0.95rem',
          letterSpacing: '-0.01em',
        }}>
          <span>{cta.label}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      <style>{`
        .loc-card { transition: transform 240ms ease, box-shadow 240ms ease; }
        .loc-card:hover { transform: translateY(-3px); }
      `}</style>
    </a>
  );
}

function Stat({ label, value, dark }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: '0.62rem', color: dark ? 'var(--green)' : 'var(--warm-gray)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', marginTop: 2 }}>{value}</div>
    </div>
  );
}

window.Locations = Locations;
