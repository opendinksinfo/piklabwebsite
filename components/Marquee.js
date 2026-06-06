// Marquee — ES module. Scrolling stat strip. React via import map.
import React from 'react';

const h = React.createElement;

const items = [
  'Pilot live · Concord',
  'AI shot tracking',
  'Robotics flagship · Fresno 2026',
  'Built to generalize',
  '5 cities by 2027',
];

export function Marquee() {
  return h('section', { style: { background: 'var(--navy)', color: 'var(--off-white)', overflow: 'hidden', padding: '20px 0', borderTop: '1px solid rgba(196, 216, 46, 0.2)', borderBottom: '1px solid rgba(196, 216, 46, 0.2)' } },
    h('div', { style: { display: 'flex', gap: 56, whiteSpace: 'nowrap', animation: 'marquee 40s linear infinite' } },
      ...[...items, ...items, ...items].map((item, i) =>
        h('span', { key: i, className: 'mono', style: { color: i % 2 ? 'var(--green)' : 'var(--off-white)', fontSize: '0.85rem' } },
          h('span', { style: { color: 'var(--coral)', marginRight: 12 } }, '◆'),
          item
        )
      )
    ),
    h('style', null, '@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }')
  );
}

export default Marquee;
