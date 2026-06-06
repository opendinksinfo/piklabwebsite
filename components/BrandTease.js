// BrandTease — ES module. For index.html (production module path).
// React is resolved via the document's import map (see index.html).
import React from 'react';

const h = React.createElement;

const arrowIcon = h('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none' },
  h('path', { d: 'M3 8h10M9 4l4 4-4 4', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' })
);

const clubVisual = h('svg', { viewBox: '0 0 400 220', style: { position: 'absolute', right: -20, top: 0, width: '60%', opacity: 0.7, pointerEvents: 'none' } },
  h('rect', { x: 40, y: 40, width: 320, height: 140, fill: 'none', stroke: 'var(--navy)', strokeWidth: '1.4' }),
  h('line', { x1: 200, y1: 40, x2: 200, y2: 180, stroke: 'var(--coral)', strokeWidth: '1.2', strokeDasharray: '3 3' }),
  h('rect', { x: 160, y: 40, width: 40, height: 140, fill: 'none', stroke: 'var(--navy)', strokeWidth: '0.8', opacity: '0.5' }),
  h('rect', { x: 200, y: 40, width: 40, height: 140, fill: 'none', stroke: 'var(--navy)', strokeWidth: '0.8', opacity: '0.5' }),
  h('circle', { cx: 285, cy: 130, r: 6, fill: 'var(--green)' }),
  h('path', { d: 'M 145 110 L 285 130', stroke: 'var(--green)', strokeWidth: '1.2', strokeDasharray: '2 4', opacity: '0.6' })
);

const labVisual = h('svg', { viewBox: '0 0 400 220', style: { position: 'absolute', right: -10, top: 10, width: '60%', opacity: 0.6, pointerEvents: 'none' } },
  h('defs', null,
    h('pattern', { id: 'bt-grid', width: 24, height: 24, patternUnits: 'userSpaceOnUse' },
      h('path', { d: 'M 24 0 L 0 0 0 24', fill: 'none', stroke: 'rgba(196, 216, 46, 0.15)', strokeWidth: '1' })
    )
  ),
  h('rect', { width: '400', height: '220', fill: 'url(#bt-grid)' }),
  h('rect', { x: 40, y: 60, width: 80, height: 40, rx: 4, fill: 'rgba(15, 26, 46, 0.8)', stroke: 'var(--green)', strokeWidth: '1.2' }),
  h('rect', { x: 180, y: 60, width: 80, height: 40, rx: 4, fill: 'rgba(15, 26, 46, 0.8)', stroke: 'var(--green)', strokeWidth: '1.2' }),
  h('rect', { x: 320, y: 60, width: 60, height: 40, rx: 4, fill: 'rgba(15, 26, 46, 0.8)', stroke: 'var(--green)', strokeWidth: '1.2' }),
  h('line', { x1: 120, y1: 80, x2: 180, y2: 80, stroke: 'var(--coral)', strokeWidth: '1.2', strokeDasharray: '3 3' }),
  h('line', { x1: 260, y1: 80, x2: 320, y2: 80, stroke: 'var(--coral)', strokeWidth: '1.2', strokeDasharray: '3 3' }),
  h('text', { x: 80, y: 84, fill: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 9, textAnchor: 'middle' }, 'VISION'),
  h('text', { x: 220, y: 84, fill: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 9, textAnchor: 'middle' }, 'PLAN'),
  h('text', { x: 350, y: 84, fill: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 9, textAnchor: 'middle' }, 'ACT')
);

function bullet(color, text) {
  return h('li', { key: text, style: { display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: color === 'coral' ? 'var(--navy)' : 'rgba(250, 250, 247, 0.85)' } },
    h('span', { style: { width: 5, height: 5, borderRadius: '50%', background: color === 'coral' ? 'var(--coral)' : 'var(--green)' } }),
    text
  );
}

export function BrandTease() {
  const clubBullets = ['Pilot live · Concord', 'Software runs the floor', 'Robotics flagship · Fresno 2026', '5 cities by 2027'];
  const labBullets = ['Embodied agents', 'LLM facility orchestrator', 'Vision + tracking', 'Open papers · hiring'];
  const locs = [
    { c: 'Concord', s: 'CA', l: 'Pilot live', href: 'concord.html', primary: true },
    { c: 'Fresno', s: 'CA', l: 'Winter 2026 · Flagship', href: 'fresno.html' },
    { c: 'Sacramento', s: 'CA', l: 'Q2 2027', href: 'sacramento.html' },
    { c: 'Portland', s: 'OR', l: 'Q3 2027', href: 'portland.html' },
    { c: 'San Jose', s: 'CA', l: 'Q4 2027', href: 'sanjose.html' },
  ];

  return h('section', { className: 'section', style: { background: 'var(--off-white)' } },
    h('div', { className: 'container' },
      // Tagline
      h('div', { style: { maxWidth: 840, marginBottom: 64 } },
        h('div', { className: 'eyebrow' }, 'PikLab is two things at once'),
        h('h2', { className: 'h-section', style: { fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: 18 } },
          'Two halves: a club, and the lab that runs it.'
        )
      ),
      // Side-by-side tease
      h('div', { className: 'bt-grid', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch' } },
        // CLUB card
        h('a', { href: 'club.html', className: 'card bt-card', style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(28px, 4vw, 48px)', minHeight: 420, background: 'var(--off-white)', position: 'relative', overflow: 'hidden' } },
          clubVisual,
          h('div', { style: { position: 'relative' } },
            h('div', { className: 'mono', style: { fontSize: '0.7rem', color: 'var(--coral)', letterSpacing: '0.16em' } }, 'SIDE A · THE CLUB'),
            h('h3', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', letterSpacing: '-0.025em', marginTop: 18, lineHeight: 1.05, maxWidth: '14ch' } },
              'Open play, leagues, clinics, drills.'
            )
          ),
          h('div', { style: { position: 'relative', marginTop: 32 } },
            h('ul', { style: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 } },
              ...clubBullets.map(x => bullet('coral', x))
            ),
            h('div', { style: { marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--coral)', fontSize: '1rem', paddingBottom: 4, borderBottom: '2px solid var(--coral)' } },
              'See the club',
              arrowIcon
            )
          )
        ),
        // LAB card
        h('a', { href: 'lab.html', className: 'card bt-card', style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(28px, 4vw, 48px)', minHeight: 420, background: 'var(--navy)', color: 'var(--off-white)', border: '1px solid var(--navy)', position: 'relative', overflow: 'hidden' } },
          labVisual,
          h('div', { style: { position: 'relative' } },
            h('div', { className: 'mono', style: { fontSize: '0.7rem', color: 'var(--green)', letterSpacing: '0.16em' } }, 'SIDE B · THE LAB'),
            h('h3', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', letterSpacing: '-0.025em', marginTop: 18, lineHeight: 1.05, color: 'var(--off-white)', maxWidth: '14ch' } },
              'LLM-orchestrated robots, embodied research.'
            )
          ),
          h('div', { style: { position: 'relative', marginTop: 32 } },
            h('ul', { style: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 } },
              ...labBullets.map(x => bullet('green', x))
            ),
            h('div', { style: { marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--green)', fontSize: '1rem', paddingBottom: 4, borderBottom: '2px solid var(--green)' } },
              'See research & openings',
              arrowIcon
            )
          )
        )
      ),
      // Locations strip
      h('div', { style: { marginTop: 48, padding: '24px clamp(20px, 3vw, 36px)', borderRadius: 16, background: 'var(--gray-100)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' } },
        h('div', null,
          h('div', { className: 'mono', style: { color: 'var(--warm-gray)', fontSize: '0.66rem', letterSpacing: '0.16em' } }, 'LOCATIONS'),
          h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.02em', marginTop: 4 } },
            'Find your home club'
          )
        ),
        h('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
          ...locs.map(loc =>
            h('a', { key: loc.c, href: loc.href, style: { padding: '12px 18px', borderRadius: 999, background: loc.primary ? 'var(--navy)' : 'white', color: loc.primary ? 'var(--off-white)' : 'var(--navy)', border: `1px solid ${loc.primary ? 'var(--navy)' : 'var(--gray-300)'}`, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', gap: 10, alignItems: 'center' } },
              `${loc.c}, ${loc.s}`,
              h('span', { className: 'mono', style: { fontSize: '0.62rem', letterSpacing: '0.12em', color: loc.primary ? 'var(--green)' : 'var(--warm-gray)', fontWeight: 500 } }, loc.l.toUpperCase())
            )
          )
        )
      )
    ),
    h('style', null, '@media (max-width: 860px) { .bt-grid { grid-template-columns: 1fr !important; } } .bt-card { transition: transform 220ms ease, box-shadow 220ms ease; } .bt-card:hover { transform: translateY(-3px); }')
  );
}

export default BrandTease;
