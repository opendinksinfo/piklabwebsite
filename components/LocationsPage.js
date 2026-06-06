// LocationsPage — hero band + timeline strip for locations.html.
import React from 'react';

const h = React.createElement;

const locGridBg = h('svg', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 } },
  h('defs', null,
    h('pattern', { id: 'loc-grid', width: 48, height: 48, patternUnits: 'userSpaceOnUse' },
      h('path', { d: 'M 48 0 L 0 0 0 48', fill: 'none', stroke: 'rgba(196, 216, 46, 0.08)', strokeWidth: '1' })
    )
  ),
  h('rect', { width: '100%', height: '100%', fill: 'url(#loc-grid)' })
);

export function LocationsHero() {
  return h('section', { style: { background: 'var(--navy)', color: 'var(--off-white)', padding: 'clamp(80px, 12vw, 160px) 0 clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' } },
    locGridBg,
    h('div', { className: 'container', style: { position: 'relative' } },
      h('div', { className: 'eyebrow', style: { color: 'var(--green)' } }, 'Locations'),
      h('h1', { className: 'h-display', style: { fontSize: 'clamp(3rem, 8vw, 6.5rem)', color: 'var(--off-white)', marginTop: 16, maxWidth: '18ch' } },
        'One pilot live.', h('br'),
        h('span', { style: { color: 'var(--green)', fontStyle: 'italic', fontWeight: 500 } }, 'Four more on the way.')
      ),
      h('p', { style: { color: 'rgba(250, 250, 247, 0.7)', fontSize: '1.15rem', maxWidth: '56ch', marginTop: 24, lineHeight: 1.6 } },
        'Our first pilot is live at Indoor Pickleball X Concord — 9 courts, 4,000+ players running on PikLab software since late 2025. Fresno opens Winter 2026 as our robotics flagship. Sacramento, Portland, and San Jose follow in 2027.'
      )
    )
  );
}

const milestones = [
  { date: 'Late 2025',   label: 'Concord pilot live', status: 'done' },
  { date: 'Winter 2026', label: 'Fresno opens',       status: 'next' },
  { date: 'Q2 2027',     label: 'Sacramento',         status: 'planned' },
  { date: 'Q3 2027',     label: 'Portland',           status: 'planned' },
  { date: 'Q4 2027',     label: 'San Jose',           status: 'planned' },
  { date: '2028',        label: 'East coast pilot',   status: 'future' },
];

export function LocationsTimeline() {
  return h('section', { className: 'section-tight', style: { background: 'var(--off-white)', borderBottom: '1px solid var(--gray-200)' } },
    h('div', { className: 'container' },
      h('div', { className: 'eyebrow', style: { marginBottom: 32 } }, 'Roadmap'),
      h('div', { className: 'timeline-grid', style: { position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${milestones.length}, 1fr)`, gap: 16 } },
        h('div', { style: { position: 'absolute', top: 8, left: 0, right: 0, height: 2, background: 'var(--gray-200)' } }),
        h('div', { style: { position: 'absolute', top: 8, left: 0, width: '16.5%', height: 2, background: 'var(--green)' } }),
        ...milestones.map((m, i) =>
          h('div', { key: i, style: { paddingTop: 24, position: 'relative' } },
            h('div', { style: { position: 'absolute', top: 2, left: 8, width: 14, height: 14, borderRadius: '50%', background: m.status === 'done' ? 'var(--green)' : 'white', border: `2px solid ${m.status === 'done' ? 'var(--green)' : m.status === 'next' ? 'var(--coral)' : 'var(--gray-300)'}` } }),
            h('div', { className: 'mono', style: { fontSize: '0.66rem', color: 'var(--warm-gray)' } }, m.date),
            h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', marginTop: 4, letterSpacing: '-0.01em' } }, m.label)
          )
        )
      )
    ),
    h('style', null, '@media (max-width: 720px) { .timeline-grid { grid-template-columns: 1fr !important; } .timeline-grid > div::before { display: none; } }')
  );
}

export default { LocationsHero, LocationsTimeline };
