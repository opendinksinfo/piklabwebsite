// Two-column manifesto: left = pickleball club story, right = AI/robotics story (co-equal)
function Manifesto() {
  return (
    <section className="section" id="club">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: 'clamp(40px, 7vw, 96px)', alignItems: 'start' }} className="manifesto-grid">
          <div style={{ position: 'sticky', top: 100 }}>
            <div className="eyebrow">02 — Robotics company, club out front</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', marginTop: 16 }}>
              A robotics company. The club is where we deploy.
            </h2>
            <p style={{ color: 'var(--warm-gray)', fontSize: '1.05rem', marginTop: 20, maxWidth: '38ch', lineHeight: 1.65 }}>
              Software live today. Robots next year. Generalizable everywhere. Our Concord pilot is the testbed. Fresno ships the full fleet.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 24 }}>
            <ManifestoBlock
              kicker="The platform"
              title="An AI that runs physical floors."
              body="One LLM. Speaks plain English. Runs intent → schedule → robots."
              icon={<RadarIcon />}
              tone="dark"
            />
            <ManifestoBlock
              kicker="The first deployment"
              title="A real pickleball club."
              body="Pilot at Indoor Pickleball X Concord. Members get a club that just works. We get a busy testbed."
              icon={<CourtIcon />}
              tone="light"
            />
            <ManifestoBlock
              kicker="The wider play"
              title="Designed to generalize."
              body="Built to generalize. Gyms, hotels, warehouses, anywhere physical things move."
              icon={<RobotIcon />}
              tone="green"
            />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .manifesto-grid { grid-template-columns: 1fr !important; }
          .manifesto-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}

function ManifestoBlock({ kicker, title, body, icon, tone }) {
  const styles = tone === 'dark'
    ? { background: 'var(--navy)', color: 'var(--off-white)', border: '1px solid var(--navy)' }
    : tone === 'green'
    ? { background: 'var(--green)', color: 'var(--navy)', border: '1px solid var(--green)' }
    : { background: 'white', color: 'var(--navy)', border: '1px solid var(--gray-200)' };
  const kickerColor = tone === 'dark' ? 'var(--green)' : tone === 'green' ? 'var(--navy)' : 'var(--warm-gray)';

  return (
    <div className="card" style={{ ...styles, padding: 36, borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 20 }}>
        <div className="mono" style={{ color: kickerColor, fontSize: '0.72rem', letterSpacing: '0.16em' }}>
          {kicker}
        </div>
        <div style={{ flexShrink: 0 }}>{icon}</div>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', letterSpacing: '-0.02em', margin: '0 0 14px', lineHeight: 1.1 }}>
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.6, opacity: tone === 'green' ? 0.85 : 0.78 }}>
        {body}
      </p>
    </div>
  );
}

function CourtIcon() {
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
      <rect x="2" y="2" width="52" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <line x1="28" y1="2" x2="28" y2="38" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
      <rect x="14" y="2" width="28" height="14" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <rect x="14" y="24" width="28" height="14" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
      <circle cx="22" cy="22" r="13" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="22" cy="22" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="22" cy="22" r="2" fill="currentColor"/>
      <line x1="22" y1="22" x2="38" y2="14" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function RobotIcon() {
  return (
    <svg width="48" height="44" viewBox="0 0 48 44" fill="none">
      <rect x="8" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="20" r="3" fill="currentColor"/>
      <circle cx="30" cy="20" r="3" fill="currentColor"/>
      <line x1="24" y1="2" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="24" cy="2" r="1.5" fill="currentColor"/>
      <line x1="14" y1="32" x2="14" y2="40" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="34" y1="32" x2="34" y2="40" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="10" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

window.Manifesto = Manifesto;
