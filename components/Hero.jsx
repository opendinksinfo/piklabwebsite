// Hero v3 — pickleball + robots together on a stylized perspective court (defensive points guards)
console.log('[piklab] Hero.jsx v3 loaded');
function Hero() {
  const [t, setT] = React.useState(0);
  const [headline, setHeadline] = React.useState(window.__pikHeadline || ['A pickleball club,', 'and the robotics company', 'building it.']);
  React.useEffect(() => {
    const h = () => setHeadline(window.__pikHeadline || headline);
    window.addEventListener('pik-headline', h);
    return () => window.removeEventListener('pik-headline', h);
  }, []);
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

  // Source/target points across a perspective court (viewBox 1200x600)
  const points = [
    { x: 320, y: 360 },  // human player A
    { x: 880, y: 360 },  // human player B
    { x: 280, y: 380 },  // human player A again
    { x: 920, y: 340 },  // robot side return
  ];
  // Ball arcing across the court (loops). Guard against NaN/negative beats.
  const safeT = Number.isFinite(t) && t >= 0 ? t : 0;
  const beat = (safeT * 0.5) % points.length;
  const beatI = ((Math.floor(beat) % points.length) + points.length) % points.length;
  const bp = beat - Math.floor(beat);
  const from = points[beatI];
  const to = points[(beatI + 1) % points.length];
  const bx = from.x + (to.x - from.x) * bp;
  const by = from.y + (to.y - from.y) * bp - Math.sin(bp * Math.PI) * 80;

  // Trail
  const trail = [];
  for (let i = 1; i <= 12; i++) {
    const tb = beat - i * 0.04;
    if (tb < 0) continue;
    const ti = ((Math.floor(tb) % points.length) + points.length) % points.length;
    const tp = tb - Math.floor(tb);
    const f = points[ti];
    const tt = points[(ti + 1) % points.length];
    trail.push({
      x: f.x + (tt.x - f.x) * tp,
      y: f.y + (tt.y - f.y) * tp - Math.sin(tp * Math.PI) * 80,
      o: 1 - i / 12,
    });
  }

  // Subtle dog walking gait
  const dogStep = Math.sin(t * 5);

  return (
    <section className="hero" style={{ position: 'relative', overflow: 'hidden', background: 'var(--off-white)' }}>
      <div className="container hero-content">
        <div className="hero-grid">
          {/* LEFT — copy */}
          <div className="hero-copy">
            <div className="hero-eyebrow mono">
              <span className="pulse-dot" style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: 'var(--coral)', marginRight: 8, verticalAlign: 'middle'
              }}></span>
              Software pilot live in Concord · Robotics flagship Winter 2026 in Fresno
            </div>
            <h1 className="h-display hero-title">
              {headline.map((line, i) => (
                <React.Fragment key={i}>
                  {i === 1 ? <span className="hero-title-accent">{line}</span> : line}
                  {i < headline.length - 1 && i !== 1 ? ' ' : null}
                  {i < headline.length - 1 && <br/>}
                </React.Fragment>
              ))}
            </h1>
            <p className="hero-sub">
              AI and robotics for physical spaces. Software live in Concord today. Robots next, Fresno 2026.
            </p>
            <div className="hero-ctas">
              <a href="concord.html" className="btn btn-primary">
                See the pilot
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#crew" className="btn btn-ghost">Meet the crew</a>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-cell">
                <div className="mono hero-meta-k">Pilot players</div>
                <div className="hero-meta-v">4,000+</div>
              </div>
              <div className="hero-meta-cell">
                <div className="mono hero-meta-k">Software live</div>
                <div className="hero-meta-v">9 courts · Concord</div>
              </div>
              <div className="hero-meta-cell">
                <div className="mono hero-meta-k">Opening 2026</div>
                <div className="hero-meta-v">16 courts · Fresno</div>
              </div>
            </div>
          </div>

          {/* RIGHT — court scene */}
          <div className="hero-scene">
            <div className="court-frame">
              <svg viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }}>
                <defs>
                  <linearGradient id="court-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F1A2E"/>
                    <stop offset="100%" stopColor="#1A2740"/>
                  </linearGradient>
                  <linearGradient id="court-floor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C4D82E" stopOpacity="0.05"/>
                    <stop offset="100%" stopColor="#C4D82E" stopOpacity="0.18"/>
                  </linearGradient>
                  <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(196, 216, 46, 0.08)" strokeWidth="1"/>
                  </pattern>
                </defs>

                {/* Background */}
                <rect width="1200" height="720" fill="url(#court-bg)"/>
                <rect width="1200" height="720" fill="url(#hero-grid)"/>

                {/* Stands / horizon glow */}
                <rect x="0" y="80" width="1200" height="120" fill="rgba(196, 216, 46, 0.04)"/>
                <line x1="0" y1="200" x2="1200" y2="200" stroke="rgba(196, 216, 46, 0.2)" strokeWidth="1"/>

                {/* PERSPECTIVE COURT — trapezoid */}
                {/* Outer */}
                <path d="M 200 600 L 1000 600 L 880 220 L 320 220 Z" fill="url(#court-floor)" stroke="#C4D82E" strokeWidth="2.5" strokeOpacity="0.7"/>
                {/* Net */}
                <line x1="600" y1="220" x2="600" y2="600" stroke="#FF6B4A" strokeWidth="2" strokeDasharray="6 4" strokeOpacity="0.85"/>
                <rect x="595" y="218" width="10" height="6" fill="#FF6B4A" opacity="0.85"/>
                {/* Kitchen lines (perspective) */}
                <path d="M 360 440 L 840 440" stroke="#C4D82E" strokeWidth="1.2" strokeOpacity="0.55"/>
                {/* Service lines (center) */}
                <line x1="600" y1="220" x2="600" y2="600" stroke="rgba(196, 216, 46, 0.2)" strokeWidth="1"/>
                {/* Mid sideline marks */}
                <path d="M 200 600 L 320 220" stroke="rgba(196, 216, 46, 0.4)" strokeWidth="1.2"/>
                <path d="M 1000 600 L 880 220" stroke="rgba(196, 216, 46, 0.4)" strokeWidth="1.2"/>

                {/* Floor accent under court */}
                <path d="M 200 600 L 1000 600 L 1200 720 L 0 720 Z" fill="#0A1426"/>

                {/* TRAJECTORY arc dotted between human side and robot side */}
                <path d="M 360 380 Q 600 80 880 360" fill="none" stroke="rgba(196, 216, 46, 0.25)" strokeWidth="1" strokeDasharray="3 5"/>

                {/* TRAIL */}
                {trail.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={5 - i * 0.3} fill="#C4D82E" opacity={p.o * 0.5}/>
                ))}

                {/* BALL */}
                <circle cx={bx} cy={by} r="11" fill="#C4D82E"/>
                <circle cx={bx} cy={by} r="18" fill="none" stroke="#C4D82E" strokeWidth="1.5" opacity="0.4"/>
                <circle cx={bx} cy={by + 4} r="11" fill="rgba(0,0,0,0.18)" filter="blur(2px)" style={{ display: 'none' }}/>

                {/* RETICLE on ball */}
                <g transform={`translate(${bx}, ${by})`}>
                  <rect x="-28" y="-28" width="56" height="56" fill="none" stroke="#FF6B4A" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.7"/>
                  <line x1="-32" y1="0" x2="-22" y2="0" stroke="#FF6B4A" strokeWidth="1.2"/>
                  <line x1="22" y1="0" x2="32" y2="0" stroke="#FF6B4A" strokeWidth="1.2"/>
                  <line x1="0" y1="-32" x2="0" y2="-22" stroke="#FF6B4A" strokeWidth="1.2"/>
                  <line x1="0" y1="22" x2="0" y2="32" stroke="#FF6B4A" strokeWidth="1.2"/>
                </g>

                {/* HUMANS — left side player A */}
                <HumanPlayer x={300} y={400} side="left" t={t} accent="navy"/>
                {/* HUMANS — left side player B (back) */}
                <HumanPlayer x={420} y={310} side="left" t={t + 0.5} small accent="navy"/>

                {/* ROBOTS — right side */}
                {/* Humanoid (concierge / referee) standing center-right */}
                <Humanoid x={780} y={310} t={t}/>
                {/* Ball-feed bot — far right */}
                <Feeder x={930} y={420} t={t}/>
                {/* Quadruped dog — front near baseline */}
                <Dog x={520} y={580} t={t} step={dogStep}/>

                {/* Telemetry HUDs */}
                <Hud x={60} y={130} lines={[
                  ['VEL', `${(24 + Math.sin(t * 3) * 3).toFixed(1)} mph`],
                  ['SPN', `${1240 + Math.round(Math.sin(t) * 180)} rpm`],
                  ['CONF', `0.${94 + Math.round(Math.sin(t * 0.7) * 4)}`],
                ]}/>
                <Hud x={970} y={130} lines={[
                  ['COURT', '04 / 16'],
                  ['SESSION', '00:42:18'],
                  ['LIVE', '●'],
                ]} accent="coral"/>

                {/* Captioned tags pointing to people/robots */}
                <Tag x={300} y={400} dx={-110} dy={50} label="PLAYER" sub="P-1142"/>
                <Tag x={780} y={310} dx={130} dy={-80} label="HUMANOID" sub="ATLAS-01" accent="green"/>
                <Tag x={930} y={420} dx={-110} dy={70} label="FEEDER" sub="M-7" accent="green"/>
                <Tag x={520} y={580} dx={-150} dy={-70} label="QUADRUPED" sub="BIRDIE" accent="green"/>
              </svg>

              {/* Live status chip */}
              <div className="hero-live-chip">
                <span className="pulse-dot" style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--coral)' }}></span>
                <span className="mono">LIVE · COURT 04 · FRESNO</span>
              </div>
              {/* Score chip */}
              <div className="hero-score-chip">
                <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(250,250,247,0.5)', letterSpacing: '0.16em' }}>OPEN PLAY · GAME 03</div>
                <div className="mono" style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--green)' }}>09</span>
                  <span style={{ color: 'rgba(250,250,247,0.4)' }}>:</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--off-white)' }}>07</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-content {
          padding-top: clamp(40px, 6vw, 80px);
          padding-bottom: clamp(60px, 8vw, 100px);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }
        .hero-copy { max-width: 600px; }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          background: rgba(15, 26, 46, 0.06);
          border-radius: 999px;
          font-size: 0.7rem;
          color: var(--navy);
          margin-bottom: 28px;
          letter-spacing: 0.08em;
        }
        .hero-title {
          font-size: clamp(2.4rem, 5.6vw, 4.8rem);
          margin: 0 0 24px;
          color: var(--navy);
        }
        .hero-title-accent {
          color: var(--coral);
          font-style: italic;
          font-weight: 500;
        }
        .hero-sub {
          font-size: clamp(1rem, 1.3vw, 1.12rem);
          color: var(--warm-gray);
          max-width: 50ch;
          margin: 0 0 32px;
          line-height: 1.6;
        }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
        .hero-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid var(--gray-200);
          max-width: 460px;
        }
        .hero-meta-k { font-size: 0.62rem; color: var(--warm-gray); letterSpacing: 0.14em; }
        .hero-meta-v {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: -0.02em;
          margin-top: 4px;
        }

        .hero-scene { position: relative; }
        .court-frame {
          position: relative;
          aspect-ratio: 5/3;
          border-radius: 18px;
          overflow: hidden;
          background: var(--navy);
          box-shadow: 0 20px 60px rgba(15, 26, 46, 0.18), 0 8px 16px rgba(15, 26, 46, 0.08);
          border: 1px solid var(--navy);
        }
        .hero-live-chip {
          position: absolute;
          top: 18px;
          left: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          background: rgba(15, 26, 46, 0.85);
          border: 1px solid rgba(196, 216, 46, 0.3);
          border-radius: 999px;
          color: var(--green);
          font-size: 0.66rem;
          backdrop-filter: blur(8px);
        }
        .hero-score-chip {
          position: absolute;
          bottom: 18px;
          right: 18px;
          padding: 12px 18px;
          background: rgba(15, 26, 46, 0.85);
          border: 1px solid rgba(196, 216, 46, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(8px);
        }

        @media (max-width: 920px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-meta { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
}

// --- SVG figures ---

function HumanPlayer({ x, y, side, t, small, accent }) {
  // Slight bob + paddle swing
  const bob = Math.sin(t * 1.6) * 3;
  const swing = Math.sin(t * 1.6) * 18;
  const scale = small ? 0.75 : 1;
  return (
    <g transform={`translate(${x}, ${y + bob}) scale(${scale})`}>
      {/* shadow */}
      <ellipse cx="0" cy="58" rx="22" ry="3" fill="#000" opacity="0.25"/>
      {/* legs */}
      <rect x="-10" y="20" width="7" height="32" rx="3" fill="#0F1A2E"/>
      <rect x="3" y="20" width="7" height="32" rx="3" fill="#0F1A2E"/>
      {/* shorts */}
      <rect x="-12" y="6" width="24" height="18" rx="3" fill="#FAFAF7"/>
      {/* shirt — yellow-green */}
      <path d="M -16 -16 L -16 8 L 16 8 L 16 -16 L 10 -22 L -10 -22 Z" fill="#C4D82E"/>
      {/* number */}
      <text x="0" y="2" fill="#0F1A2E" fontFamily="var(--font-display)" fontWeight="700" fontSize="11" textAnchor="middle">04</text>
      {/* head */}
      <circle cx="0" cy="-28" r="9" fill="#E8C9A8"/>
      {/* hair */}
      <path d="M -8 -32 Q 0 -40 8 -32 L 8 -28 L -8 -28 Z" fill="#3A2A1A"/>
      {/* arm + paddle */}
      <g transform={`translate(${side === 'left' ? 14 : -14}, -8) rotate(${side === 'left' ? swing : -swing})`}>
        <rect x="-2" y="0" width="4" height="20" rx="2" fill="#E8C9A8"/>
        <rect x="-7" y="18" width="14" height="20" rx="3" fill="#FF6B4A"/>
        <rect x="-5" y="20" width="10" height="14" rx="1" fill="#0F1A2E" opacity="0.2"/>
      </g>
      {/* other arm */}
      <rect x={side === 'left' ? -20 : 16} y="-8" width="4" height="18" rx="2" fill="#E8C9A8"/>
    </g>
  );
}

function Humanoid({ x, y, t }) {
  const sway = Math.sin(t * 0.8) * 1.5;
  return (
    <g transform={`translate(${x + sway}, ${y})`}>
      <ellipse cx="0" cy="78" rx="26" ry="3.5" fill="#000" opacity="0.3"/>
      {/* legs */}
      <rect x="-11" y="34" width="9" height="42" rx="3" fill="#FAFAF7" stroke="#0F1A2E" strokeWidth="1"/>
      <rect x="2" y="34" width="9" height="42" rx="3" fill="#FAFAF7" stroke="#0F1A2E" strokeWidth="1"/>
      <ellipse cx="-7" cy="78" rx="7" ry="2.5" fill="#0F1A2E"/>
      <ellipse cx="7" cy="78" rx="7" ry="2.5" fill="#0F1A2E"/>
      {/* torso */}
      <rect x="-22" y="-14" width="44" height="50" rx="8" fill="#FAFAF7" stroke="#0F1A2E" strokeWidth="1.5"/>
      {/* chest indicator */}
      <rect x="-9" y="0" width="18" height="3" rx="1" fill="#C4D82E"/>
      <rect x="-9" y="7" width="12" height="2" rx="1" fill="#FF6B4A"/>
      <text x="0" y="22" fill="#0F1A2E" fontFamily="var(--font-mono)" fontSize="6" textAnchor="middle">PIKLAB</text>
      {/* arms */}
      <rect x="-32" y="-12" width="9" height="36" rx="3" fill="#C4D82E" stroke="#0F1A2E" strokeWidth="1"/>
      <rect x="23" y="-12" width="9" height="36" rx="3" fill="#C4D82E" stroke="#0F1A2E" strokeWidth="1"/>
      <circle cx="-27" cy="28" r="4" fill="#0F1A2E"/>
      <circle cx="27" cy="28" r="4" fill="#0F1A2E"/>
      {/* neck */}
      <rect x="-4" y="-20" width="8" height="6" fill="#0F1A2E"/>
      {/* head */}
      <rect x="-16" y="-46" width="32" height="28" rx="7" fill="#C4D82E" stroke="#0F1A2E" strokeWidth="1.5"/>
      {/* eyes — visor strip */}
      <rect x="-12" y="-36" width="24" height="6" rx="2" fill="#0F1A2E"/>
      <circle cx="-5" cy="-33" r="1.5" fill="#FF6B4A"/>
      <circle cx="5" cy="-33" r="1.5" fill="#C4D82E"/>
      {/* antenna */}
      <line x1="0" y1="-46" x2="0" y2="-54" stroke="#FF6B4A" strokeWidth="1.5"/>
      <circle cx="0" cy="-55" r="2" fill="#FF6B4A"/>
    </g>
  );
}

function Feeder({ x, y, t }) {
  const arc = (t * 1.0) % 2;
  const arcVisible = arc < 1;
  const ax = arc * 60;
  const ay = -arc * 80 + (arc * arc) * 60;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="0" cy="46" rx="48" ry="4" fill="#000" opacity="0.3"/>
      {/* base */}
      <rect x="-40" y="20" width="80" height="22" rx="5" fill="#C4D82E" stroke="#0F1A2E" strokeWidth="1.5"/>
      {/* wheels */}
      <circle cx="-26" cy="44" r="7" fill="#0F1A2E" stroke="#FAFAF7" strokeWidth="1.5"/>
      <circle cx="26" cy="44" r="7" fill="#0F1A2E" stroke="#FAFAF7" strokeWidth="1.5"/>
      {/* hopper */}
      <path d="M -32 -30 L 32 -30 L 38 20 L -38 20 Z" fill="#FAFAF7" stroke="#0F1A2E" strokeWidth="1.5"/>
      {/* hopper balls */}
      <circle cx="-18" cy="-12" r="5" fill="#C4D82E"/>
      <circle cx="-2" cy="-14" r="5" fill="#C4D82E"/>
      <circle cx="14" cy="-12" r="5" fill="#C4D82E"/>
      <circle cx="-10" cy="0" r="5" fill="#C4D82E"/>
      <circle cx="6" cy="0" r="5" fill="#C4D82E"/>
      <circle cx="20" cy="2" r="5" fill="#C4D82E"/>
      {/* launcher barrel */}
      <rect x="32" y="-2" width="34" height="12" rx="2" fill="#0F1A2E" stroke="#C4D82E" strokeWidth="1.2"/>
      <circle cx="64" cy="4" r="2" fill="#FF6B4A"/>
      {/* status */}
      <rect x="-36" y="-26" width="14" height="3" rx="1" fill="#FF6B4A"/>
      {/* launched ball */}
      {arcVisible && <circle cx={66 + ax} cy={4 + ay} r="5" fill="#C4D82E"/>}
    </g>
  );
}

function Dog({ x, y, t, step }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="0" cy="22" rx="36" ry="3.5" fill="#000" opacity="0.3"/>
      {/* tail */}
      <line x1="-30" y1="-2" x2="-42" y2="-10" stroke="#C4D82E" strokeWidth="3" strokeLinecap="round"/>
      {/* body */}
      <rect x="-30" y="-12" width="56" height="22" rx="6" fill="#FAFAF7" stroke="#0F1A2E" strokeWidth="1.5"/>
      <rect x="-12" y="-6" width="14" height="3" rx="1" fill="#C4D82E"/>
      <rect x="-12" y="0" width="9" height="2" rx="1" fill="#FF6B4A"/>
      {/* head */}
      <rect x="22" y="-18" width="22" height="20" rx="4" fill="#C4D82E" stroke="#0F1A2E" strokeWidth="1.5"/>
      <circle cx="36" cy="-8" r="2.5" fill="#0F1A2E"/>
      <circle cx="36" cy="-8" r="0.8" fill="#FF6B4A"/>
      {/* scanner */}
      <line x1="30" y1="-18" x2="30" y2="-24" stroke="#0F1A2E" strokeWidth="1.5"/>
      <circle cx="30" cy="-25" r="1.5" fill="#FF6B4A"/>
      {/* legs (4 articulated) */}
      {[
        { x: -22, off: step * 3 },
        { x: -8, off: -step * 3 },
        { x: 8, off: step * 3 },
        { x: 20, off: -step * 3 },
      ].map((l, i) => (
        <g key={i}>
          <line x1={l.x} y1="10" x2={l.x - 1} y2="20" stroke="#0F1A2E" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1={l.x - 1} y1="20" x2={l.x + l.off} y2="30" stroke="#0F1A2E" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
      ))}
    </g>
  );
}

function Hud({ x, y, lines, accent = 'green' }) {
  const color = accent === 'coral' ? '#FF6B4A' : '#C4D82E';
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="160" height={lines.length * 22 + 12} rx="6" fill="rgba(15, 26, 46, 0.7)" stroke={color} strokeOpacity="0.4"/>
      {lines.map(([k, v], i) => (
        <g key={i} transform={`translate(12, ${i * 22 + 22})`}>
          <text x="0" y="0" fill={color} opacity="0.6" fontFamily="var(--font-mono)" fontSize="9">{k}</text>
          <text x="56" y="0" fill="#FAFAF7" fontFamily="var(--font-mono)" fontSize="10">{v}</text>
        </g>
      ))}
    </g>
  );
}

function Tag({ x, y, dx, dy, label, sub, accent }) {
  const color = accent === 'green' ? '#C4D82E' : '#FAFAF7';
  const tx = x + dx;
  const ty = y + dy;
  return (
    <g>
      <line x1={x} y1={y} x2={tx} y2={ty} stroke={color} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5"/>
      <circle cx={x} cy={y} r="2.5" fill={color}/>
      <g transform={`translate(${tx}, ${ty})`}>
        <text x="0" y="-4" fill={color} fontFamily="var(--font-mono)" fontSize="9" opacity="0.7" letterSpacing="1">{label}</text>
        <text x="0" y="8" fill={color} fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">{sub}</text>
      </g>
    </g>
  );
}

window.Hero = Hero;
