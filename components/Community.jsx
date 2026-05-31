// Community / coaches section + waitlist
function Community() {
  const coaches = [
    { name: 'Maya Chen', role: 'Head of Coaching', rating: '5.0 PRO', tag: 'Strategy · Drills' },
    { name: 'Andre Park', role: 'Robotics Lead', rating: 'PHD ROBOTICS', tag: 'Builds the feeders' },
    { name: 'Jules Okafor', role: 'Senior Coach', rating: '4.5+', tag: 'Beginners welcome' },
    { name: 'Sam Reyes', role: 'CV Engineer', rating: 'ML', tag: 'Trains the eye' },
  ];
  return (
    <section className="section" id="community" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <div className="eyebrow">05 — The team</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', marginTop: 16 }}>
            Coaches, engineers, regulars.
          </h2>
          <p style={{ color: 'var(--warm-gray)', fontSize: '1.05rem', marginTop: 20, maxWidth: '60ch' }}>
            The people who build PikLab also play here. Every Tuesday's open play has an engineer or two on the courts. We listen, then we ship.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {coaches.map((c, i) => (
            <div key={c.name} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                aspectRatio: '4/5',
                background: i % 2 === 0
                  ? 'linear-gradient(135deg, var(--green) 0%, var(--green-dim) 100%)'
                  : 'linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: 20,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '4.5rem',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.85,
                    color: i % 2 === 0 ? 'var(--navy)' : 'var(--green)',
                    opacity: 0.85,
                  }}>
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  color: i % 2 === 0 ? 'var(--navy)' : 'var(--green)',
                  opacity: 0.7,
                }}>
                  {c.rating}
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{c.name}</div>
                <div style={{ color: 'var(--warm-gray)', fontSize: '0.88rem', marginTop: 2 }}>{c.role}</div>
                <div className="mono" style={{ color: 'var(--coral)', fontSize: '0.68rem', marginTop: 12 }}>{c.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Community = Community;
