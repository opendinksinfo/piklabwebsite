// Stats / proof strip between Manifesto and AI demo
function Stats() {
  return (
    <section className="section-tight" style={{ background: 'var(--off-white)', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
          {[
            { v: '4,000+', sub: 'players · Concord pilot', accent: false },
            { v: '9 + 15', sub: 'courts now + 2026', accent: true },
            { v: '4', sub: 'robot classes', accent: false },
            { v: '24 / 7', sub: 'pilot ops live', accent: false },
          ].map((s, i) => (
            <div key={i} style={{ borderLeft: i === 0 ? 'none' : '1px solid var(--gray-200)', paddingLeft: i === 0 ? 0 : 24 }} className="stats-cell">
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                letterSpacing: '-0.03em',
                color: s.accent ? 'var(--coral)' : 'var(--navy)',
                lineHeight: 1,
              }}>
                {s.v}
              </div>
              <div style={{ color: 'var(--warm-gray)', fontSize: '0.92rem', marginTop: 8, maxWidth: '22ch' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .stats-cell { border-left: none !important; padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}

window.Stats = Stats;
