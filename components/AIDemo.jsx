// Animated AI demo: ball-tracking on a top-down court
function AIDemo() {
  const [mode, setMode] = React.useState(window.__pikDemoMode || 'rally'); // 'rally' | 'drills' | 'heatmap'
  React.useEffect(() => {
    const h = (e) => setMode(e.detail);
    window.addEventListener('pik-demo-mode', h);
    return () => window.removeEventListener('pik-demo-mode', h);
  }, []);
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

  return (
    <section className="section dark" id="tech" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* faint grid background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }} aria-hidden>
        <defs>
          <pattern id="bg-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(196, 216, 46, 0.08)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid)"/>
      </svg>

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 600 }}>
            <div className="eyebrow">03 — The lab</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', marginTop: 16, color: 'var(--off-white)' }}>
              Computer vision that<br/>
              <span style={{ color: 'var(--green)' }}>actually watches the ball.</span>
            </h2>
            <p style={{ color: 'rgba(250, 250, 247, 0.7)', fontSize: '1.05rem', marginTop: 20, lineHeight: 1.65 }}>
              Six overhead cameras per court. On-prem inference at 120 fps. We track every ball position, paddle angle, and player movement and turn it into something useful — a coaching report, a drill plan, an honest line call.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, padding: 4, background: 'rgba(196, 216, 46, 0.08)', borderRadius: 999, border: '1px solid rgba(196, 216, 46, 0.15)' }}>
            {['rally', 'drills', 'heatmap'].map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="mono"
                style={{
                  padding: '10px 18px',
                  borderRadius: 999,
                  fontSize: '0.72rem',
                  background: mode === m ? 'var(--green)' : 'transparent',
                  color: mode === m ? 'var(--navy)' : 'rgba(250, 250, 247, 0.7)',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <CourtViz mode={mode} t={t} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, marginTop: 32, background: 'rgba(196, 216, 46, 0.15)', borderRadius: 12, overflow: 'hidden' }}>
          {[
            { k: 'Cameras', v: '6', sub: 'per court' },
            { k: 'Latency', v: '< 40ms', sub: 'edge inference' },
            { k: 'Tracking', v: '120 fps', sub: 'ball + paddle + player' },
            { k: 'Accuracy', v: '99.4%', sub: 'in/out calls' },
          ].map(s => (
            <div key={s.k} style={{ background: 'var(--navy-2)', padding: '24px 28px' }}>
              <div className="mono" style={{ color: 'var(--green)', fontSize: '0.7rem' }}>{s.k}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', letterSpacing: '-0.02em', marginTop: 6 }}>{s.v}</div>
              <div style={{ color: 'rgba(250, 250, 247, 0.5)', fontSize: '0.8rem', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Top-down court visualization with ball trajectory, heatmap, etc.
function CourtViz({ mode, t }) {
  // Court dims (world units): 880 wide x 480 tall
  const W = 880, H = 480;

  // Rally: ball bounces between sides. Guard against NaN/negative t.
  const safeT = Number.isFinite(t) && t >= 0 ? t : 0;
  const rallyBeats = 8;
  const beat = (safeT * 0.9) % rallyBeats;
  const beatIdx = ((Math.floor(beat) % rallyBeats) + rallyBeats) % rallyBeats;
  const beatProgress = beat - Math.floor(beat);
  // Predefined rally points (alternating sides) — kitchen line area
  const rallyPoints = [
    { x: 200, y: 240 }, // left dink
    { x: 680, y: 240 }, // right dink
    { x: 220, y: 180 }, // left dink high
    { x: 660, y: 300 }, // right dink low
    { x: 180, y: 280 }, // left dink wide
    { x: 700, y: 200 }, // right speed-up
    { x: 250, y: 240 }, // left counter
    { x: 660, y: 240 }, // right reset
  ];
  const from = rallyPoints[beatIdx];
  const to = rallyPoints[(beatIdx + 1) % rallyPoints.length];
  const ballX = from.x + (to.x - from.x) * beatProgress;
  // Parabolic Y for visual interest (height implied)
  const arc = Math.sin(beatProgress * Math.PI) * 30;
  const ballY = from.y + (to.y - from.y) * beatProgress - arc;

  // Trail of recent positions
  const trail = [];
  for (let i = 1; i <= 14; i++) {
    const tb = beat - i * 0.04;
    if (tb < 0) continue;
    const tbIdx = ((Math.floor(tb) % rallyPoints.length) + rallyPoints.length) % rallyPoints.length;
    const tbp = tb - Math.floor(tb);
    const f = rallyPoints[tbIdx];
    const tt = rallyPoints[(tbIdx + 1) % rallyPoints.length];
    trail.push({
      x: f.x + (tt.x - f.x) * tbp,
      y: f.y + (tt.y - f.y) * tbp - Math.sin(tbp * Math.PI) * 30,
      o: 1 - i / 14,
    });
  }

  // Drills: robot at one end, ball fed to a target
  const drillBeat = (safeT * 0.6) % 4;
  const drillIdx = ((Math.floor(drillBeat) % 4) + 4) % 4;
  const drillProg = drillBeat - Math.floor(drillBeat);
  const drillTargets = [
    { x: 660, y: 100 }, // back right
    { x: 660, y: 380 }, // back left
    { x: 720, y: 240 }, // far middle
    { x: 580, y: 240 }, // mid
  ];
  const drillFrom = { x: 200, y: 240 }; // robot
  const drillTo = drillTargets[drillIdx];
  const dBallX = drillFrom.x + (drillTo.x - drillFrom.x) * drillProg;
  const dBallY = drillFrom.y + (drillTo.y - drillFrom.y) * drillProg - Math.sin(drillProg * Math.PI) * 50;

  return (
    <div style={{
      position: 'relative',
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid rgba(196, 216, 46, 0.2)',
      background: 'linear-gradient(180deg, #0A1426 0%, #0F1A2E 100%)',
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', width: '100%', height: 'auto' }}>
        {/* Court paint */}
        <rect x="60" y="60" width={W - 120} height={H - 120} fill="rgba(196, 216, 46, 0.04)" stroke="rgba(196, 216, 46, 0.4)" strokeWidth="2"/>
        {/* Net */}
        <line x1={W / 2} y1="50" x2={W / 2} y2={H - 50} stroke="rgba(255, 107, 74, 0.6)" strokeWidth="2" strokeDasharray="4 4"/>
        {/* Kitchen */}
        <rect x={W / 2 - 100} y="60" width="100" height={H - 120} fill="rgba(196, 216, 46, 0.06)" stroke="rgba(196, 216, 46, 0.25)" strokeWidth="1"/>
        <rect x={W / 2} y="60" width="100" height={H - 120} fill="rgba(196, 216, 46, 0.06)" stroke="rgba(196, 216, 46, 0.25)" strokeWidth="1"/>
        {/* Service line */}
        <line x1="60" y1={H / 2} x2={W / 2 - 100} y2={H / 2} stroke="rgba(196, 216, 46, 0.25)" strokeWidth="1"/>
        <line x1={W / 2 + 100} y1={H / 2} x2={W - 60} y2={H / 2} stroke="rgba(196, 216, 46, 0.25)" strokeWidth="1"/>

        {/* Corner labels */}
        <text x="72" y="80" fill="rgba(196, 216, 46, 0.5)" fontFamily="var(--font-mono)" fontSize="11">A1</text>
        <text x={W - 92} y="80" fill="rgba(196, 216, 46, 0.5)" fontFamily="var(--font-mono)" fontSize="11">B1</text>
        <text x="72" y={H - 68} fill="rgba(196, 216, 46, 0.5)" fontFamily="var(--font-mono)" fontSize="11">A2</text>
        <text x={W - 92} y={H - 68} fill="rgba(196, 216, 46, 0.5)" fontFamily="var(--font-mono)" fontSize="11">B2</text>

        {/* MODE: heatmap */}
        {mode === 'heatmap' && (
          <g>
            {[
              { x: 220, y: 240, r: 90, o: 0.5 },
              { x: 200, y: 200, r: 70, o: 0.4 },
              { x: 660, y: 240, r: 95, o: 0.55 },
              { x: 680, y: 280, r: 75, o: 0.4 },
              { x: 440, y: 240, r: 50, o: 0.25 },
              { x: 280, y: 320, r: 60, o: 0.35 },
              { x: 600, y: 180, r: 55, o: 0.3 },
            ].map((b, i) => (
              <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="url(#heat)" opacity={b.o}/>
            ))}
            <defs>
              <radialGradient id="heat">
                <stop offset="0%" stopColor="#FF6B4A" stopOpacity="0.8"/>
                <stop offset="40%" stopColor="#C4D82E" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#C4D82E" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <text x={W / 2} y={H - 20} fill="rgba(196, 216, 46, 0.6)" fontFamily="var(--font-mono)" fontSize="11" textAnchor="middle">
              SHOT DENSITY · LAST 50 RALLIES · KITCHEN-HEAVY
            </text>
          </g>
        )}

        {/* MODE: rally */}
        {mode === 'rally' && (
          <g>
            {/* Trail */}
            {trail.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={4 - i * 0.2} fill="#C4D82E" opacity={p.o * 0.4}/>
            ))}
            {/* Ball */}
            <circle cx={ballX} cy={ballY} r="9" fill="#C4D82E"/>
            <circle cx={ballX} cy={ballY} r="14" fill="none" stroke="#C4D82E" strokeWidth="1" opacity="0.4"/>
            {/* Reticle */}
            <g transform={`translate(${ballX}, ${ballY})`}>
              <rect x="-26" y="-26" width="52" height="52" fill="none" stroke="#FF6B4A" strokeWidth="1" strokeDasharray="3 3" opacity="0.7"/>
            </g>
            {/* Players (dots) */}
            <PlayerDot x={140} y={180} label="P1"/>
            <PlayerDot x={140} y={300} label="P2"/>
            <PlayerDot x={740} y={180} label="P3"/>
            <PlayerDot x={740} y={300} label="P4"/>
            {/* Telemetry */}
            <g transform={`translate(${ballX + 20}, ${ballY - 20})`}>
              <rect x="0" y="0" width="86" height="44" rx="4" fill="rgba(15, 26, 46, 0.9)" stroke="rgba(196, 216, 46, 0.4)"/>
              <text x="8" y="16" fill="#C4D82E" fontFamily="var(--font-mono)" fontSize="9">VEL {(22 + Math.sin(t * 3) * 4).toFixed(1)} mph</text>
              <text x="8" y="28" fill="#C4D82E" fontFamily="var(--font-mono)" fontSize="9">SPN {1200 + Math.round(Math.sin(t) * 200)} rpm</text>
              <text x="8" y="40" fill="#FF6B4A" fontFamily="var(--font-mono)" fontSize="9">→ DINK</text>
            </g>
          </g>
        )}

        {/* MODE: drills */}
        {mode === 'drills' && (
          <g>
            {/* Robot */}
            <g transform={`translate(${drillFrom.x}, ${drillFrom.y})`}>
              <rect x="-22" y="-18" width="44" height="36" rx="4" fill="#1A2740" stroke="#C4D82E" strokeWidth="2"/>
              <circle cx="0" cy="-4" r="6" fill="#C4D82E"/>
              <circle cx="0" cy="-4" r="2" fill="#0F1A2E"/>
              <text x="0" y="34" fill="#C4D82E" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">FEEDER · M-7</text>
            </g>

            {/* Player (you) */}
            <PlayerDot x={720} y={240} label="YOU" color="#FF6B4A"/>

            {/* Targets */}
            {drillTargets.map((tg, i) => (
              <g key={i} transform={`translate(${tg.x}, ${tg.y})`}>
                <circle r="22" fill="none" stroke={i === drillIdx ? '#FF6B4A' : 'rgba(196, 216, 46, 0.3)'} strokeWidth={i === drillIdx ? 2 : 1} strokeDasharray={i === drillIdx ? '0' : '3 3'}/>
                <text x="0" y="4" fill={i === drillIdx ? '#FF6B4A' : 'rgba(196, 216, 46, 0.4)'} fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">{i + 1}</text>
              </g>
            ))}

            {/* Trajectory line */}
            <path
              d={`M ${drillFrom.x} ${drillFrom.y} Q ${(drillFrom.x + drillTo.x) / 2} ${Math.min(drillFrom.y, drillTo.y) - 60} ${drillTo.x} ${drillTo.y}`}
              fill="none"
              stroke="rgba(196, 216, 46, 0.3)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />

            {/* Ball */}
            <circle cx={dBallX} cy={dBallY} r="8" fill="#C4D82E"/>

            <text x={W / 2} y={H - 20} fill="rgba(196, 216, 46, 0.6)" fontFamily="var(--font-mono)" fontSize="11" textAnchor="middle">
              DRILL · BACKHAND CORNER FEED · 4-SHOT PATTERN
            </text>
          </g>
        )}
      </svg>

      {/* Mode label */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(15, 26, 46, 0.85)',
        border: '1px solid rgba(196, 216, 46, 0.3)',
        padding: '6px 12px',
        borderRadius: 999,
      }}>
        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#FF6B4A' }} className="pulse-dot"></span>
        <span className="mono" style={{ color: 'var(--green)', fontSize: '0.7rem' }}>LIVE · COURT 04 · {mode.toUpperCase()}</span>
      </div>
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(15, 26, 46, 0.85)',
        border: '1px solid rgba(196, 216, 46, 0.3)',
        padding: '6px 12px',
        borderRadius: 999,
        fontSize: '0.7rem',
        color: 'var(--green)',
        fontFamily: 'var(--font-mono)',
      }}>
        {new Date(Date.now() - 1000).toTimeString().slice(0, 8)}
      </div>
    </div>
  );
}

function PlayerDot({ x, y, label, color = '#FAFAF7' }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="14" fill={color} opacity="0.15"/>
      <circle r="8" fill={color}/>
      <text x="0" y="28" fill={color} fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle" opacity="0.8">{label}</text>
    </g>
  );
}

window.AIDemo = AIDemo;
