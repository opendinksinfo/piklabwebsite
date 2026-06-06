// AIDemo — animated top-down court demo.
import React from 'react';

const h = React.createElement;
const { useState, useEffect } = React;

function PlayerDot({ x, y, label, color = '#FAFAF7' }) {
  return h('g', { transform: `translate(${x}, ${y})` },
    h('circle', { r: 14, fill: color, opacity: '0.15' }),
    h('circle', { r: 8, fill: color }),
    h('text', { x: 0, y: 28, fill: color, fontFamily: 'var(--font-mono)', fontSize: 9, textAnchor: 'middle', opacity: '0.8' }, label)
  );
}

function CourtViz({ mode, t }) {
  const W = 880, H = 480;
  const safeT = Number.isFinite(t) && t >= 0 ? t : 0;
  const rallyBeats = 8;
  const beat = (safeT * 0.9) % rallyBeats;
  const beatIdx = ((Math.floor(beat) % rallyBeats) + rallyBeats) % rallyBeats;
  const beatProgress = beat - Math.floor(beat);
  const rallyPoints = [
    { x: 200, y: 240 }, { x: 680, y: 240 }, { x: 220, y: 180 }, { x: 660, y: 300 },
    { x: 180, y: 280 }, { x: 700, y: 200 }, { x: 250, y: 240 }, { x: 660, y: 240 },
  ];
  const from = rallyPoints[beatIdx];
  const to = rallyPoints[(beatIdx + 1) % rallyPoints.length];
  const ballX = from.x + (to.x - from.x) * beatProgress;
  const arc = Math.sin(beatProgress * Math.PI) * 30;
  const ballY = from.y + (to.y - from.y) * beatProgress - arc;

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

  const drillBeat = (safeT * 0.6) % 4;
  const drillIdx = ((Math.floor(drillBeat) % 4) + 4) % 4;
  const drillProg = drillBeat - Math.floor(drillBeat);
  const drillTargets = [
    { x: 660, y: 100 }, { x: 660, y: 380 }, { x: 720, y: 240 }, { x: 580, y: 240 },
  ];
  const drillFrom = { x: 200, y: 240 };
  const drillTo = drillTargets[drillIdx];
  const dBallX = drillFrom.x + (drillTo.x - drillFrom.x) * drillProg;
  const dBallY = drillFrom.y + (drillTo.y - drillFrom.y) * drillProg - Math.sin(drillProg * Math.PI) * 50;

  const courtPaint = h(React.Fragment, null,
    h('rect', { x: 60, y: 60, width: W - 120, height: H - 120, fill: 'rgba(196, 216, 46, 0.04)', stroke: 'rgba(196, 216, 46, 0.4)', strokeWidth: '2' }),
    h('line', { x1: W / 2, y1: 50, x2: W / 2, y2: H - 50, stroke: 'rgba(255, 107, 74, 0.6)', strokeWidth: '2', strokeDasharray: '4 4' }),
    h('rect', { x: W / 2 - 100, y: 60, width: 100, height: H - 120, fill: 'rgba(196, 216, 46, 0.06)', stroke: 'rgba(196, 216, 46, 0.25)', strokeWidth: '1' }),
    h('rect', { x: W / 2, y: 60, width: 100, height: H - 120, fill: 'rgba(196, 216, 46, 0.06)', stroke: 'rgba(196, 216, 46, 0.25)', strokeWidth: '1' }),
    h('line', { x1: 60, y1: H / 2, x2: W / 2 - 100, y2: H / 2, stroke: 'rgba(196, 216, 46, 0.25)', strokeWidth: '1' }),
    h('line', { x1: W / 2 + 100, y1: H / 2, x2: W - 60, y2: H / 2, stroke: 'rgba(196, 216, 46, 0.25)', strokeWidth: '1' }),
    h('text', { x: 72, y: 80, fill: 'rgba(196, 216, 46, 0.5)', fontFamily: 'var(--font-mono)', fontSize: 11 }, 'A1'),
    h('text', { x: W - 92, y: 80, fill: 'rgba(196, 216, 46, 0.5)', fontFamily: 'var(--font-mono)', fontSize: 11 }, 'B1'),
    h('text', { x: 72, y: H - 68, fill: 'rgba(196, 216, 46, 0.5)', fontFamily: 'var(--font-mono)', fontSize: 11 }, 'A2'),
    h('text', { x: W - 92, y: H - 68, fill: 'rgba(196, 216, 46, 0.5)', fontFamily: 'var(--font-mono)', fontSize: 11 }, 'B2')
  );

  const heatmapMode = mode === 'heatmap' ? h('g', null,
    h('defs', null,
      h('radialGradient', { id: 'heat' },
        h('stop', { offset: '0%', stopColor: '#FF6B4A', stopOpacity: '0.8' }),
        h('stop', { offset: '40%', stopColor: '#C4D82E', stopOpacity: '0.5' }),
        h('stop', { offset: '100%', stopColor: '#C4D82E', stopOpacity: '0' })
      )
    ),
    ...[
      { x: 220, y: 240, r: 90, o: 0.5 },
      { x: 200, y: 200, r: 70, o: 0.4 },
      { x: 660, y: 240, r: 95, o: 0.55 },
      { x: 680, y: 280, r: 75, o: 0.4 },
      { x: 440, y: 240, r: 50, o: 0.25 },
      { x: 280, y: 320, r: 60, o: 0.35 },
      { x: 600, y: 180, r: 55, o: 0.3 },
    ].map((b, i) => h('circle', { key: i, cx: b.x, cy: b.y, r: b.r, fill: 'url(#heat)', opacity: b.o })),
    h('text', { x: W / 2, y: H - 20, fill: 'rgba(196, 216, 46, 0.6)', fontFamily: 'var(--font-mono)', fontSize: 11, textAnchor: 'middle' },
      'SHOT DENSITY · LAST 50 RALLIES · KITCHEN-HEAVY'
    )
  ) : null;

  const rallyMode = mode === 'rally' ? h('g', null,
    ...trail.map((p, i) => h('circle', { key: i, cx: p.x, cy: p.y, r: 4 - i * 0.2, fill: '#C4D82E', opacity: p.o * 0.4 })),
    h('circle', { cx: ballX, cy: ballY, r: 9, fill: '#C4D82E' }),
    h('circle', { cx: ballX, cy: ballY, r: 14, fill: 'none', stroke: '#C4D82E', strokeWidth: '1', opacity: '0.4' }),
    h('g', { transform: `translate(${ballX}, ${ballY})` },
      h('rect', { x: -26, y: -26, width: 52, height: 52, fill: 'none', stroke: '#FF6B4A', strokeWidth: '1', strokeDasharray: '3 3', opacity: '0.7' })
    ),
    h(PlayerDot, { x: 140, y: 180, label: 'P1' }),
    h(PlayerDot, { x: 140, y: 300, label: 'P2' }),
    h(PlayerDot, { x: 740, y: 180, label: 'P3' }),
    h(PlayerDot, { x: 740, y: 300, label: 'P4' }),
    h('g', { transform: `translate(${ballX + 20}, ${ballY - 20})` },
      h('rect', { x: 0, y: 0, width: 86, height: 44, rx: 4, fill: 'rgba(15, 26, 46, 0.9)', stroke: 'rgba(196, 216, 46, 0.4)' }),
      h('text', { x: 8, y: 16, fill: '#C4D82E', fontFamily: 'var(--font-mono)', fontSize: 9 }, `VEL ${(22 + Math.sin(t * 3) * 4).toFixed(1)} mph`),
      h('text', { x: 8, y: 28, fill: '#C4D82E', fontFamily: 'var(--font-mono)', fontSize: 9 }, `SPN ${1200 + Math.round(Math.sin(t) * 200)} rpm`),
      h('text', { x: 8, y: 40, fill: '#FF6B4A', fontFamily: 'var(--font-mono)', fontSize: 9 }, '→ DINK')
    )
  ) : null;

  const drillsMode = mode === 'drills' ? h('g', null,
    h('g', { transform: `translate(${drillFrom.x}, ${drillFrom.y})` },
      h('rect', { x: -22, y: -18, width: 44, height: 36, rx: 4, fill: '#1A2740', stroke: '#C4D82E', strokeWidth: '2' }),
      h('circle', { cx: 0, cy: -4, r: 6, fill: '#C4D82E' }),
      h('circle', { cx: 0, cy: -4, r: 2, fill: '#0F1A2E' }),
      h('text', { x: 0, y: 34, fill: '#C4D82E', fontFamily: 'var(--font-mono)', fontSize: 9, textAnchor: 'middle' }, 'FEEDER · M-7')
    ),
    h(PlayerDot, { x: 720, y: 240, label: 'YOU', color: '#FF6B4A' }),
    ...drillTargets.map((tg, i) =>
      h('g', { key: i, transform: `translate(${tg.x}, ${tg.y})` },
        h('circle', { r: 22, fill: 'none', stroke: i === drillIdx ? '#FF6B4A' : 'rgba(196, 216, 46, 0.3)', strokeWidth: i === drillIdx ? 2 : 1, strokeDasharray: i === drillIdx ? '0' : '3 3' }),
        h('text', { x: 0, y: 4, fill: i === drillIdx ? '#FF6B4A' : 'rgba(196, 216, 46, 0.4)', fontFamily: 'var(--font-mono)', fontSize: 9, textAnchor: 'middle' }, i + 1)
      )
    ),
    h('path', { d: `M ${drillFrom.x} ${drillFrom.y} Q ${(drillFrom.x + drillTo.x) / 2} ${Math.min(drillFrom.y, drillTo.y) - 60} ${drillTo.x} ${drillTo.y}`, fill: 'none', stroke: 'rgba(196, 216, 46, 0.3)', strokeWidth: '1', strokeDasharray: '2 4' }),
    h('circle', { cx: dBallX, cy: dBallY, r: 8, fill: '#C4D82E' }),
    h('text', { x: W / 2, y: H - 20, fill: 'rgba(196, 216, 46, 0.6)', fontFamily: 'var(--font-mono)', fontSize: 11, textAnchor: 'middle' },
      'DRILL · BACKHAND CORNER FEED · 4-SHOT PATTERN'
    )
  ) : null;

  return h('div', { style: { position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(196, 216, 46, 0.2)', background: 'linear-gradient(180deg, #0A1426 0%, #0F1A2E 100%)' } },
    h('svg', { viewBox: `0 0 ${W} ${H}`, style: { display: 'block', width: '100%', height: 'auto' } },
      courtPaint, heatmapMode, rallyMode, drillsMode
    ),
    h('div', { style: { position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(15, 26, 46, 0.85)', border: '1px solid rgba(196, 216, 46, 0.3)', padding: '6px 12px', borderRadius: 999 } },
      h('span', { className: 'pulse-dot', style: { display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#FF6B4A' } }),
      h('span', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.7rem' } }, `LIVE · COURT 04 · ${mode.toUpperCase()}`)
    ),
    h('div', { style: { position: 'absolute', top: 16, right: 16, background: 'rgba(15, 26, 46, 0.85)', border: '1px solid rgba(196, 216, 46, 0.3)', padding: '6px 12px', borderRadius: 999, fontSize: '0.7rem', color: 'var(--green)', fontFamily: 'var(--font-mono)' } },
      new Date(Date.now() - 1000).toTimeString().slice(0, 8)
    )
  );
}

const bgGrid = h('svg', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 } },
  h('defs', null,
    h('pattern', { id: 'bg-grid', width: 48, height: 48, patternUnits: 'userSpaceOnUse' },
      h('path', { d: 'M 48 0 L 0 0 0 48', fill: 'none', stroke: 'rgba(196, 216, 46, 0.08)', strokeWidth: '1' })
    )
  ),
  h('rect', { width: '100%', height: '100%', fill: 'url(#bg-grid)' })
);

export function AIDemo() {
  const [mode, setMode] = useState(window.__pikDemoMode || 'rally');
  const [t, setT] = useState(0);

  useEffect(() => {
    const onMode = (e) => setMode(e.detail);
    window.addEventListener('pik-demo-mode', onMode);
    return () => window.removeEventListener('pik-demo-mode', onMode);
  }, []);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return h('section', { className: 'section dark', id: 'tech', style: { position: 'relative', overflow: 'hidden' } },
    bgGrid,
    h('div', { className: 'container', style: { position: 'relative' } },
      h('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 56, flexWrap: 'wrap' } },
        h('div', { style: { maxWidth: 600 } },
          h('div', { className: 'eyebrow' }, '03 — The lab'),
          h('h2', { className: 'h-section', style: { fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', marginTop: 16, color: 'var(--off-white)' } },
            'Computer vision that', h('br'),
            h('span', { style: { color: 'var(--green)' } }, 'actually watches the ball.')
          ),
          h('p', { style: { color: 'rgba(250, 250, 247, 0.7)', fontSize: '1.05rem', marginTop: 20, lineHeight: 1.65 } },
            'Six cameras. 120 fps. Every ball, paddle, player — tracked and useful.'
          )
        ),
        h('div', { style: { display: 'flex', gap: 8, padding: 4, background: 'rgba(196, 216, 46, 0.08)', borderRadius: 999, border: '1px solid rgba(196, 216, 46, 0.15)' } },
          ...['rally', 'drills', 'heatmap'].map(m =>
            h('button', { key: m, onClick: () => setMode(m), className: 'mono', style: { padding: '10px 18px', borderRadius: 999, fontSize: '0.72rem', background: mode === m ? 'var(--green)' : 'transparent', color: mode === m ? 'var(--navy)' : 'rgba(250, 250, 247, 0.7)', fontWeight: 600, transition: 'all 200ms ease' } }, m)
          )
        )
      ),
      h(CourtViz, { mode, t }),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, marginTop: 32, background: 'rgba(196, 216, 46, 0.15)', borderRadius: 12, overflow: 'hidden' } },
        ...[
          { k: 'Cameras', v: '6', sub: 'per court' },
          { k: 'Latency', v: '< 40ms', sub: 'edge inference' },
          { k: 'Tracking', v: '120 fps', sub: 'ball + paddle + player' },
          { k: 'Accuracy', v: '99.4%', sub: 'in/out calls' },
        ].map(s =>
          h('div', { key: s.k, style: { background: 'var(--navy-2)', padding: '24px 28px' } },
            h('div', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.7rem' } }, s.k),
            h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', letterSpacing: '-0.02em', marginTop: 6 } }, s.v),
            h('div', { style: { color: 'rgba(250, 250, 247, 0.5)', fontSize: '0.8rem', marginTop: 2 } }, s.sub)
          )
        )
      )
    )
  );
}

export default AIDemo;
