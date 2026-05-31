// "Marquee" of stats / values
function Marquee() {
  const items = [
    'Pilot live · Concord',
    'AI shot tracking',
    'Robotics flagship · Fresno 2026',
    'Built to generalize',
    '5 cities by 2027',
  ];
  return (
    <section style={{ background: 'var(--navy)', color: 'var(--off-white)', overflow: 'hidden', padding: '20px 0', borderTop: '1px solid rgba(196, 216, 46, 0.2)', borderBottom: '1px solid rgba(196, 216, 46, 0.2)' }}>
      <div style={{
        display: 'flex',
        gap: 56,
        whiteSpace: 'nowrap',
        animation: 'marquee 40s linear infinite',
      }}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mono" style={{ color: i % 2 ? 'var(--green)' : 'var(--off-white)', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--coral)', marginRight: 12 }}>◆</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}

window.Marquee = Marquee;
