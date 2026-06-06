// BrandHero — split two-door hero for index.html.
import React from 'react';

const h = React.createElement;
const { useState, useEffect } = React;

const arrowIcon = (translate) => h('svg', { width: 18, height: 18, viewBox: '0 0 16 16', fill: 'none', style: { transform: translate ? 'translateX(4px)' : 'none', transition: 'transform 220ms' } },
  h('path', { d: 'M3 8h10M9 4l4 4-4 4', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' })
);

const clubGridPattern = h('svg', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none' } },
  h('defs', null,
    h('pattern', { id: 'bh-court', width: 80, height: 80, patternUnits: 'userSpaceOnUse' },
      h('path', { d: 'M 80 0 L 0 0 0 80', fill: 'none', stroke: 'rgba(15, 26, 46, 0.04)', strokeWidth: '1' })
    )
  ),
  h('rect', { width: '100%', height: '100%', fill: 'url(#bh-court)' })
);

const clubArc = h('svg', { viewBox: '0 0 400 300', preserveAspectRatio: 'xMidYMid slice', style: { position: 'absolute', right: -40, top: 80, width: '70%', height: 320, opacity: 0.7, pointerEvents: 'none' } },
  h('path', { d: 'M 20 240 Q 200 40 380 240', fill: 'none', stroke: 'rgba(196, 216, 46, 0.5)', strokeWidth: '2', strokeDasharray: '4 6' }),
  h('circle', { cx: 20, cy: 240, r: 4, fill: 'rgba(196, 216, 46, 0.6)' })
);

const labGridPattern = h('svg', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none' } },
  h('defs', null,
    h('pattern', { id: 'bh-tech', width: 48, height: 48, patternUnits: 'userSpaceOnUse' },
      h('path', { d: 'M 48 0 L 0 0 0 48', fill: 'none', stroke: 'rgba(196, 216, 46, 0.08)', strokeWidth: '1' }),
      h('circle', { cx: 0, cy: 0, r: 1.5, fill: 'rgba(196, 216, 46, 0.2)' })
    )
  ),
  h('rect', { width: '100%', height: '100%', fill: 'url(#bh-tech)' })
);

const labDiagram = h('svg', { viewBox: '0 0 400 300', preserveAspectRatio: 'xMidYMid slice', style: { position: 'absolute', left: -40, top: 80, width: '70%', height: 320, opacity: 0.6, pointerEvents: 'none' } },
  h('rect', { x: 40, y: 50, width: 80, height: 50, rx: 4, fill: 'none', stroke: 'rgba(196, 216, 46, 0.5)', strokeWidth: '1.2' }),
  h('rect', { x: 180, y: 50, width: 80, height: 50, rx: 4, fill: 'none', stroke: 'rgba(196, 216, 46, 0.5)', strokeWidth: '1.2' }),
  h('rect', { x: 320, y: 50, width: 60, height: 50, rx: 4, fill: 'none', stroke: 'rgba(196, 216, 46, 0.5)', strokeWidth: '1.2' }),
  h('line', { x1: 120, y1: 75, x2: 180, y2: 75, stroke: 'rgba(255, 107, 74, 0.6)', strokeWidth: '1.4', strokeDasharray: '3 3' }),
  h('line', { x1: 260, y1: 75, x2: 320, y2: 75, stroke: 'rgba(255, 107, 74, 0.6)', strokeWidth: '1.4', strokeDasharray: '3 3' }),
  h('text', { x: 80, y: 78, fill: 'rgba(196, 216, 46, 0.7)', fontFamily: 'var(--font-mono)', fontSize: 9, textAnchor: 'middle' }, 'PERCEIVE'),
  h('text', { x: 220, y: 78, fill: 'rgba(196, 216, 46, 0.7)', fontFamily: 'var(--font-mono)', fontSize: 9, textAnchor: 'middle' }, 'REASON'),
  h('text', { x: 350, y: 78, fill: 'rgba(196, 216, 46, 0.7)', fontFamily: 'var(--font-mono)', fontSize: 9, textAnchor: 'middle' }, 'ACT')
);

export function BrandHero() {
  const [side, setSide] = useState(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      setT(Number.isFinite(elapsed) && elapsed >= 0 ? elapsed : 0);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const safeT = Number.isFinite(t) && t >= 0 ? t : 0;
  const cycle = (safeT % 4.2) / 4.2;
  const bx = 50 + Math.sin(cycle * Math.PI * 2) * 38;
  const by = 50 - Math.abs(Math.sin(cycle * Math.PI)) * 22;

  const clubSide = h('a', {
    href: 'club.html',
    onMouseEnter: () => setSide('club'),
    onMouseLeave: () => setSide(null),
    style: { position: 'relative', background: 'var(--off-white)', color: 'var(--navy)', padding: 'clamp(80px, 10vw, 140px) clamp(28px, 5vw, 80px) clamp(48px, 7vw, 96px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textDecoration: 'none', overflow: 'hidden', transition: 'filter 320ms ease', filter: side === 'lab' ? 'brightness(0.86) saturate(0.7)' : 'none' }
  },
    clubGridPattern,
    clubArc,
    h('div', { style: { position: 'relative' } },
      h('div', { className: 'mono', style: { color: 'var(--coral)', fontSize: '0.72rem', letterSpacing: '0.18em' } }, 'SIDE A'),
      h('div', { className: 'mono', style: { marginTop: 6, color: 'var(--warm-gray)', fontSize: '0.7rem', letterSpacing: '0.14em' } }, 'THE CLUB')
    ),
    h('div', { style: { position: 'relative', maxWidth: '24ch' } },
      h('h1', { className: 'h-display', style: { fontSize: 'clamp(2.6rem, 5.6vw, 5rem)', margin: 0, lineHeight: 0.94 } },
        'A pickleball', h('br'), 'club for', h('br'),
        h('span', { style: { fontStyle: 'italic', fontWeight: 500, color: 'var(--coral)' } }, 'actual players.')
      ),
      h('p', { style: { marginTop: 24, fontSize: '1.05rem', color: 'var(--warm-gray)', maxWidth: '40ch', lineHeight: 1.55 } },
        'Pilot live in Concord — 9 courts, 4,000+ players. Fresno 2026.'
      ),
      h('div', { style: { marginTop: 36, display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy)', paddingBottom: 6, borderBottom: `2px solid ${side === 'club' ? 'var(--coral)' : 'var(--navy)'}`, transition: 'border-color 220ms ease' } },
        'Step inside the club',
        arrowIcon(side === 'club')
      )
    )
  );

  const labSide = h('a', {
    href: 'lab.html',
    onMouseEnter: () => setSide('lab'),
    onMouseLeave: () => setSide(null),
    style: { position: 'relative', background: 'var(--navy)', color: 'var(--off-white)', padding: 'clamp(80px, 10vw, 140px) clamp(28px, 5vw, 80px) clamp(48px, 7vw, 96px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textDecoration: 'none', overflow: 'hidden', transition: 'filter 320ms ease', filter: side === 'club' ? 'brightness(0.7)' : 'none' }
  },
    labGridPattern,
    labDiagram,
    h('div', { style: { position: 'relative' } },
      h('div', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.72rem', letterSpacing: '0.18em' } }, 'SIDE B'),
      h('div', { className: 'mono', style: { marginTop: 6, color: 'rgba(250, 250, 247, 0.5)', fontSize: '0.7rem', letterSpacing: '0.14em' } }, 'THE LAB')
    ),
    h('div', { style: { position: 'relative', maxWidth: '24ch' } },
      h('h1', { className: 'h-display', style: { fontSize: 'clamp(2.6rem, 5.6vw, 5rem)', margin: 0, lineHeight: 0.94, color: 'var(--off-white)' } },
        'An AI &', h('br'), 'robotics lab,', h('br'),
        h('span', { style: { fontStyle: 'italic', fontWeight: 500, color: 'var(--green)' } }, 'by way of sport.')
      ),
      h('p', { style: { marginTop: 24, fontSize: '1.05rem', color: 'rgba(250, 250, 247, 0.65)', maxWidth: '40ch', lineHeight: 1.55 } },
        'LLM orchestrators. Autonomous floors. Real robots, real shifts.'
      ),
      h('div', { style: { marginTop: 36, display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--off-white)', paddingBottom: 6, borderBottom: `2px solid ${side === 'lab' ? 'var(--green)' : 'rgba(250, 250, 247, 0.5)'}`, transition: 'border-color 220ms ease' } },
        'Visit the lab',
        arrowIcon(side === 'lab')
      )
    )
  );

  return h('section', { className: 'brand-hero', style: { position: 'relative', minHeight: '100vh', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', background: 'var(--navy)' } },
    clubSide,
    labSide,
    // Seam
    h('div', { style: { position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'rgba(196, 216, 46, 0.4)', pointerEvents: 'none' } }),
    // Floating ball
    h('div', { style: { position: 'absolute', left: `${bx}%`, top: `${by}%`, width: 28, height: 28, marginLeft: -14, marginTop: -14, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 2px var(--navy), 0 0 24px rgba(196, 216, 46, 0.5)', pointerEvents: 'none', transform: 'translateZ(0)' } },
      h('div', { style: { position: 'absolute', inset: 4, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, transparent 60%, rgba(15, 26, 46, 0.15) 100%)' } })
    ),
    // Brand wordmark
    h('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' } },
      h('div', { className: 'mono', style: { background: 'var(--navy)', color: 'var(--green)', padding: '6px 14px', borderRadius: 999, fontSize: '0.66rem', letterSpacing: '0.2em' } }, 'PIKLAB · EST. 2026')
    ),
    // Bottom strip
    h('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(15, 26, 46, 0.96)', color: 'var(--off-white)', padding: '14px clamp(20px, 4vw, 56px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(196, 216, 46, 0.2)' } },
      h('div', { className: 'mono', style: { fontSize: '0.66rem', color: 'rgba(196, 216, 46, 0.7)', letterSpacing: '0.16em' } },
        '◉ CONCORD PILOT LIVE · FRESNO OPENING WINTER 2026'
      ),
      h('div', { style: { display: 'flex', gap: 24, alignItems: 'center' } },
        h('a', { href: 'locations.html', className: 'mono', style: { fontSize: '0.72rem', color: 'var(--off-white)', borderBottom: '1px solid rgba(250, 250, 247, 0.3)', paddingBottom: 2 } }, 'Find your club →'),
        h('a', { href: 'lab.html#careers', className: 'mono', style: { fontSize: '0.72rem', color: 'var(--off-white)', borderBottom: '1px solid rgba(250, 250, 247, 0.3)', paddingBottom: 2 } }, 'Lab careers →')
      )
    ),
    h('style', null, '@media (max-width: 860px) { .brand-hero { grid-template-columns: 1fr !important; } .brand-hero > a { min-height: 70vh; } }')
  );
}

export default BrandHero;
