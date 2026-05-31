// Robot fleet — ball-feed bots, dogs (court managers), humanoids (front desk)
function RobotCrew() {
  const [active, setActive] = React.useState(0);
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const crew = [
    {
      id: 'humanoid',
      tag: 'CONCIERGE-01',
      name: 'Atlas',
      role: 'Humanoid · Front desk',
      copy: 'Greets you at the door, scans your member tag, hands you a paddle, and walks you to your reserved court. Speaks four languages and a little trash.',
      duties: ['Check-in / out', 'Locker assignment', 'Tour guide', 'Lost & found'],
      stats: [['Height', '5\'8"'], ['Languages', '4'], ['Uptime', '23h/day']],
    },
    {
      id: 'dog',
      tag: 'CANINE-04',
      name: 'Birdie',
      role: 'Quadruped · Court manager',
      copy: 'Patrols the floor between sessions. Resets cones, picks up stray balls, scans courts for hazards, and politely shoos you off when your time is up.',
      duties: ['Ball retrieval', 'Court reset', 'Floor scan', 'Hazard alerts'],
      stats: [['Speed', '2.4 m/s'], ['Carry', '6 lb'], ['Quiet mode', 'yes']],
    },
    {
      id: 'feeder',
      tag: 'FEEDER-M7',
      name: 'M-7',
      role: 'Ball-feed bot · Drills',
      copy: 'Fires whatever shot you can\'t handle. Reads your stance from the overhead cameras and adjusts spin, pace, and placement in real time.',
      duties: ['Drill plans', 'Spin control', 'Live targeting', 'Ball collect'],
      stats: [['Range', '0–60 mph'], ['Spin', '±3000 rpm'], ['Hopper', '180 balls']],
    },
    {
      id: 'collector',
      tag: 'SWEEP-02',
      name: 'Sweep',
      role: 'Roller · Ball collection',
      copy: 'Cruises the perimeter between rallies, vacuums up loose balls, and refills the feeder hoppers. Knows to wait when a point is live.',
      duties: ['Auto-collect', 'Hopper refill', 'Court edge sweep', 'Quiet pass'],
      stats: [['Capacity', '120 balls'], ['Pass', '< 30s'], ['Charge', 'docked auto']],
    },
  ];

  const a = crew[active];

  return (
    <section className="section dark" id="crew" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }} aria-hidden>
        <defs>
          <pattern id="crew-bg-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(196, 216, 46, 0.08)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crew-bg-grid)"/>
      </svg>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <div className="eyebrow" style={{ color: 'var(--green)' }}>01 — The fleet</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', marginTop: 16, color: 'var(--off-white)' }}>
            Four robots,<br/>
            <span style={{ color: 'var(--green)' }}>built to do the work.</span>
          </h2>
          <p style={{ color: 'rgba(250, 250, 247, 0.7)', fontSize: '1.05rem', marginTop: 20, lineHeight: 1.65, maxWidth: '60ch' }}>
            Humans play and coach. Robots do the rest. Each one general-purpose — built for the club, built to travel.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 32, alignItems: 'stretch' }} className="crew-grid">
          {/* Left — selector list */}
          <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
            {crew.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                style={{
                  textAlign: 'left',
                  padding: '20px 22px',
                  borderRadius: 14,
                  border: `1px solid ${active === i ? 'var(--green)' : 'rgba(196, 216, 46, 0.2)'}`,
                  background: active === i ? 'rgba(196, 216, 46, 0.08)' : 'rgba(15, 26, 46, 0.4)',
                  color: 'var(--off-white)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  transition: 'all 200ms ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <RobotGlyph kind={c.id} t={t} active={active === i} small/>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="mono" style={{ fontSize: '0.62rem', color: active === i ? 'var(--green)' : 'rgba(250, 250, 247, 0.5)', letterSpacing: '0.14em' }}>
                    {c.tag}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.15rem', letterSpacing: '-0.01em', marginTop: 3, color: 'var(--off-white)' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'rgba(250, 250, 247, 0.55)', marginTop: 2 }}>
                    {c.role}
                  </div>
                </div>
                <div style={{
                  fontSize: 18,
                  color: active === i ? 'var(--green)' : 'transparent',
                  transition: 'color 200ms',
                }}>→</div>
              </button>
            ))}
          </div>

          {/* Right — large detail card */}
          <div style={{
            background: 'var(--navy-2)',
            border: '1px solid rgba(196, 216, 46, 0.25)',
            color: 'var(--off-white)',
            borderRadius: 16,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            minHeight: 520,
          }}>
            {/* Animated stage */}
            <div style={{
              position: 'relative',
              flex: 1,
              minHeight: 280,
              background: 'linear-gradient(180deg, #0F1A2E 0%, #1A2740 100%)',
              overflow: 'hidden',
            }}>
              {/* Floor grid */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="crew-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(196, 216, 46, 0.1)" strokeWidth="1"/>
                  </pattern>
                  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(196, 216, 46, 0.05)"/>
                    <stop offset="100%" stopColor="rgba(196, 216, 46, 0.0)"/>
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#crew-grid)"/>
                <rect y="180" width="100%" height="180" fill="url(#floor)"/>
                <line x1="0" y1="240" x2="800" y2="240" stroke="rgba(196, 216, 46, 0.25)" strokeWidth="1" strokeDasharray="4 4"/>
              </svg>

              {/* Big robot */}
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -52%)' }}>
                <RobotGlyph kind={a.id} t={t} active={true} large/>
              </div>

              {/* Tag badges */}
              <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0, 0, 0, 0.4)', padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(196, 216, 46, 0.3)' }}>
                <span className="pulse-dot" style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--coral)' }}></span>
                <span className="mono" style={{ fontSize: '0.66rem', color: 'var(--green)' }}>ONLINE · {a.tag}</span>
              </div>
              <div className="mono" style={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontSize: '0.62rem',
                color: 'rgba(196, 216, 46, 0.6)',
                letterSpacing: '0.14em',
              }}>
                BAT {(86 + Math.round(Math.sin(t) * 5))}% · UPTIME {Math.floor((t * 10) % 99)}.{Math.floor((t * 100) % 9)}h
              </div>
            </div>

            {/* Detail */}
            <div style={{ padding: 32, display: 'grid', gap: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em', margin: 0, color: 'var(--off-white)' }}>
                  {a.name}
                </h3>
                <div className="mono" style={{ color: 'var(--green)', fontSize: '0.7rem', marginTop: 6 }}>{a.role.toUpperCase()}</div>
              </div>
              <p style={{ margin: 0, color: 'rgba(250, 250, 247, 0.78)', fontSize: '0.98rem', lineHeight: 1.6 }}>
                {a.copy}
              </p>

              <div style={{ display: 'grid', gap: 8 }}>
                <div className="mono" style={{ fontSize: '0.62rem', color: 'rgba(250, 250, 247, 0.5)', letterSpacing: '0.14em' }}>DUTIES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {a.duties.map(d => (
                    <span key={d} style={{
                      padding: '5px 11px',
                      borderRadius: 999,
                      border: '1px solid rgba(196, 216, 46, 0.3)',
                      color: 'var(--green)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                    }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                background: 'rgba(196, 216, 46, 0.15)',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
                {a.stats.map(([k, v]) => (
                  <div key={k} style={{ background: 'var(--navy-2)', padding: '14px 16px' }}>
                    <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--green)' }}>{k.toUpperCase()}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', marginTop: 3 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .crew-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// Geometric robot glyphs — humanoid, dog, ball-feeder, sweeper. No realistic illustration; just shapes that read.
function RobotGlyph({ kind, t, active, small, large }) {
  const size = small ? 56 : large ? 240 : 120;
  const bob = Math.sin(t * 1.4) * (large ? 6 : 2);
  const sway = Math.sin(t * 0.9) * (large ? 4 : 1);

  if (kind === 'humanoid') {
    return (
      <svg width={size} height={size * 1.4} viewBox="0 0 100 140" style={{ overflow: 'visible' }}>
        <g transform={`translate(${50 + sway}, ${bob})`}>
          {/* head */}
          <rect x="-14" y="6" width="28" height="22" rx="6" fill={active ? '#C4D82E' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
          <circle cx="-5" cy="17" r="2" fill={active ? '#0F1A2E' : '#C4D82E'}/>
          <circle cx="5" cy="17" r="2" fill={active ? '#0F1A2E' : '#C4D82E'}/>
          {/* antenna */}
          <line x1="0" y1="6" x2="0" y2="0" stroke={active ? '#FF6B4A' : '#C4D82E'} strokeWidth="1.5"/>
          <circle cx="0" cy="-1" r="2" fill="#FF6B4A"/>
          {/* neck */}
          <rect x="-3" y="28" width="6" height="4" fill={active ? '#0F1A2E' : '#1A2740'}/>
          {/* torso */}
          <rect x="-18" y="32" width="36" height="38" rx="6" fill={active ? '#FAFAF7' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
          {/* chest indicator */}
          <rect x="-6" y="44" width="12" height="3" rx="1" fill={active ? '#C4D82E' : '#C4D82E'}/>
          <rect x="-6" y="50" width="8" height="2" rx="1" fill={active ? '#FF6B4A' : '#FF6B4A'} opacity="0.8"/>
          {/* arms */}
          <rect x="-26" y="34" width="6" height="28" rx="3" fill={active ? '#C4D82E' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
          <rect x="20" y="34" width="6" height="28" rx="3" fill={active ? '#C4D82E' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
          <circle cx="-23" cy="65" r="3" fill={active ? '#0F1A2E' : '#C4D82E'}/>
          <circle cx="23" cy="65" r="3" fill={active ? '#0F1A2E' : '#C4D82E'}/>
          {/* legs */}
          <rect x="-12" y="70" width="8" height="32" rx="3" fill={active ? '#FAFAF7' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
          <rect x="4" y="70" width="8" height="32" rx="3" fill={active ? '#FAFAF7' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
          {/* feet */}
          <ellipse cx="-8" cy="104" rx="6" ry="2" fill={active ? '#0F1A2E' : '#0F1A2E'}/>
          <ellipse cx="8" cy="104" rx="6" ry="2" fill={active ? '#0F1A2E' : '#0F1A2E'}/>
        </g>
        {/* shadow */}
        <ellipse cx="50" cy="110" rx="22" ry="3" fill="#000" opacity="0.18"/>
      </svg>
    );
  }

  if (kind === 'dog') {
    const legA = Math.sin(t * 4) * (large ? 4 : 1);
    const legB = -legA;
    return (
      <svg width={size * 1.4} height={size} viewBox="0 0 140 100" style={{ overflow: 'visible' }}>
        <g transform={`translate(0, ${bob * 0.4})`}>
          {/* tail */}
          <line x1="20" y1="48" x2="8" y2="40" stroke={active ? '#C4D82E' : '#C4D82E'} strokeWidth="2.5" strokeLinecap="round"/>
          {/* body */}
          <rect x="22" y="40" width="74" height="28" rx="8" fill={active ? '#FAFAF7' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
          {/* shoulder seam */}
          <line x1="60" y1="42" x2="60" y2="66" stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="0.8" opacity="0.4"/>
          {/* indicator */}
          <rect x="40" y="48" width="14" height="3" rx="1" fill="#C4D82E"/>
          <rect x="40" y="54" width="9" height="2" rx="1" fill="#FF6B4A" opacity="0.8"/>
          {/* head */}
          <rect x="92" y="32" width="24" height="22" rx="5" fill={active ? '#C4D82E' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
          {/* sensor eye */}
          <circle cx="108" cy="42" r="3" fill={active ? '#0F1A2E' : '#C4D82E'}/>
          <circle cx="108" cy="42" r="1" fill="#FF6B4A"/>
          {/* ear / scanner */}
          <line x1="100" y1="32" x2="100" y2="26" stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
          <circle cx="100" cy="25" r="1.5" fill="#FF6B4A"/>
          {/* legs (4) — articulated lines */}
          {[
            { x: 32, off: legA },
            { x: 50, off: legB },
            { x: 76, off: legA },
            { x: 90, off: legB },
          ].map((l, i) => (
            <g key={i}>
              <line x1={l.x} y1="66" x2={l.x - 2} y2="80" stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="2.5" strokeLinecap="round"/>
              <line x1={l.x - 2} y1="80" x2={l.x + l.off} y2="92" stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="2.5" strokeLinecap="round"/>
            </g>
          ))}
        </g>
        <ellipse cx="70" cy="96" rx="40" ry="3" fill="#000" opacity="0.18"/>
      </svg>
    );
  }

  if (kind === 'feeder') {
    // Ball arc emerging from feeder
    const arc = (t * 1.3) % 2;
    const arcVisible = arc < 1;
    const ax = 60 + arc * 60;
    const ay = 30 - Math.sin(arc * Math.PI) * 22;
    return (
      <svg width={size * 1.6} height={size} viewBox="0 0 160 100" style={{ overflow: 'visible' }}>
        {/* base / wheels */}
        <rect x="20" y="68" width="80" height="16" rx="4" fill={active ? '#C4D82E' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
        <circle cx="34" cy="86" r="6" fill={active ? '#0F1A2E' : '#1A2740'} stroke={active ? '#FAFAF7' : '#C4D82E'} strokeWidth="1.5"/>
        <circle cx="86" cy="86" r="6" fill={active ? '#0F1A2E' : '#1A2740'} stroke={active ? '#FAFAF7' : '#C4D82E'} strokeWidth="1.5"/>
        {/* body / hopper */}
        <path d={`M 28 30 L 92 30 L 100 68 L 20 68 Z`} fill={active ? '#FAFAF7' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
        {/* hopper balls */}
        <circle cx="44" cy="42" r="4" fill="#C4D82E"/>
        <circle cx="58" cy="40" r="4" fill="#C4D82E"/>
        <circle cx="72" cy="42" r="4" fill="#C4D82E"/>
        <circle cx="50" cy="52" r="4" fill="#C4D82E"/>
        <circle cx="66" cy="52" r="4" fill="#C4D82E"/>
        {/* barrel / launcher */}
        <rect x="92" y="52" width="34" height="10" rx="2" fill={active ? '#0F1A2E' : '#1A2740'} stroke={active ? '#C4D82E' : '#C4D82E'} strokeWidth="1.5"/>
        <circle cx="124" cy="57" r="2" fill="#FF6B4A"/>
        {/* launched ball */}
        {arcVisible && <circle cx={ax} cy={ay} r="4" fill="#C4D82E"/>}
        {/* trajectory hint */}
        <path d="M 124 57 Q 145 22 200 50" fill="none" stroke="rgba(196, 216, 46, 0.25)" strokeWidth="1" strokeDasharray="2 3"/>
        {/* status light */}
        <circle cx="36" cy="38" r="2" fill="#FF6B4A"/>
        <ellipse cx="60" cy="92" rx="42" ry="3" fill="#000" opacity="0.18"/>
      </svg>
    );
  }

  // sweeper
  const wheelRot = (t * 200) % 360;
  return (
    <svg width={size * 1.4} height={size * 0.85} viewBox="0 0 140 88" style={{ overflow: 'visible' }}>
      {/* body */}
      <ellipse cx="70" cy="50" rx="48" ry="22" fill={active ? '#FAFAF7' : '#1A2740'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1.5"/>
      {/* top dome */}
      <ellipse cx="70" cy="40" rx="24" ry="10" fill={active ? '#C4D82E' : '#0F1A2E'} stroke={active ? '#0F1A2E' : '#C4D82E'} strokeWidth="1"/>
      {/* sensor */}
      <circle cx="70" cy="38" r="3" fill={active ? '#FF6B4A' : '#FF6B4A'}/>
      {/* indicator strip */}
      <rect x="50" y="56" width="40" height="3" rx="1" fill="#C4D82E"/>
      <rect x="50" y="62" width="28" height="2" rx="1" fill="#FF6B4A" opacity="0.8"/>
      {/* wheels */}
      <g transform={`translate(34, 70) rotate(${wheelRot})`}>
        <circle r="6" fill={active ? '#0F1A2E' : '#0F1A2E'} stroke="#C4D82E" strokeWidth="1"/>
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#C4D82E" strokeWidth="1"/>
      </g>
      <g transform={`translate(106, 70) rotate(${wheelRot})`}>
        <circle r="6" fill={active ? '#0F1A2E' : '#0F1A2E'} stroke="#C4D82E" strokeWidth="1"/>
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#C4D82E" strokeWidth="1"/>
      </g>
      {/* collected balls trailing */}
      <circle cx="20" cy="62" r="3" fill="#C4D82E" opacity="0.7"/>
      <circle cx="12" cy="58" r="3" fill="#C4D82E" opacity="0.4"/>
      <ellipse cx="70" cy="80" rx="40" ry="3" fill="#000" opacity="0.18"/>
    </svg>
  );
}

window.RobotCrew = RobotCrew;
