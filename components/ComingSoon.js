// ComingSoon — ES module (React.createElement form). Per-city placeholder.
const h = React.createElement;
const { Fragment } = React;

const externalArrow = h('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none' },
  h('path', { d: 'M5 11L11 5M11 5H6M11 5V10', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' })
);

const rightArrow = h('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none' },
  h('path', { d: 'M3 8h10M9 4l4 4-4 4', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' })
);

const gridBg = h('svg', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 } },
  h('defs', null,
    h('pattern', { id: 'cs-grid', width: 48, height: 48, patternUnits: 'userSpaceOnUse' },
      h('path', { d: 'M 48 0 L 0 0 0 48', fill: 'none', stroke: 'rgba(196, 216, 46, 0.08)', strokeWidth: '1' })
    )
  ),
  h('rect', { width: '100%', height: '100%', fill: 'url(#cs-grid)' })
);

export function ComingSoon({ city, state, status, dateLabel, address, courts, sqft, members, hours, description, accent = 'green' }) {
  const isOpen = status === 'open';
  const accentColor = accent === 'coral' ? 'var(--coral)' : 'var(--green)';

  const badge = h('div', { className: 'mono', style: { display: 'inline-flex', alignItems: 'center', gap: 8, color: accentColor, fontSize: '0.7rem', letterSpacing: '0.18em', marginBottom: 28, padding: '6px 12px', border: `1px solid ${accentColor}`, borderRadius: 999 } },
    isOpen
      ? h(Fragment, null,
          h('span', { className: 'pulse-dot', style: { width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)' } }),
          `OPEN TODAY · SINCE ${dateLabel.toUpperCase()}`
        )
      : `◉ COMING ${dateLabel.toUpperCase()}`
  );

  const statRows = [
    ['Address', address],
    ['Courts', String(courts)],
    isOpen ? ['Members', members || '—'] : ['Sq ft', sqft || '—'],
    isOpen ? ['Hours', hours || '24 / 7'] : ['Opens', dateLabel],
  ];

  const ctas = isOpen
    ? h(Fragment, null,
        h('a', { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', ' + city + ', ' + state)}`, target: '_blank', rel: 'noopener', className: 'btn btn-green' }, 'Get directions', externalArrow),
        h('a', { href: 'mailto:info@piklab.ai', className: 'btn btn-ghost-light' }, 'Contact us')
      )
    : h(Fragment, null,
        h('a', { href: 'concord.html', className: 'btn btn-green' }, 'See the Concord pilot', rightArrow),
        h('a', { href: 'locations.html', className: 'btn btn-ghost-light' }, 'All locations')
      );

  const note = isOpen
    ? 'FULL CONCORD MEMBER PAGE COMING SOON · QUESTIONS? INFO@PIKLAB.AI'
    : `FULL ${city.toUpperCase()} PAGE COMING SOON · QUESTIONS? INFO@PIKLAB.AI`;

  return h('section', { style: { background: 'var(--navy)', color: 'var(--off-white)', padding: 'clamp(96px, 13vw, 180px) 0 clamp(56px, 7vw, 96px)', position: 'relative', overflow: 'hidden' } },
    gridBg,
    h('div', { className: 'container', style: { position: 'relative' } },
      badge,
      h('h1', { className: 'h-display', style: { fontSize: 'clamp(3rem, 8vw, 6.5rem)', color: 'var(--off-white)', margin: 0, lineHeight: 1 } },
        `PikLab ${city}`,
        h('span', { style: { color: accentColor, fontStyle: 'italic', fontWeight: 500 } }, '.')
      ),
      h('p', { style: { color: 'rgba(250, 250, 247, 0.75)', fontSize: '1.15rem', maxWidth: '60ch', marginTop: 24, lineHeight: 1.6 } }, description),
      // Stats grid
      h('div', { style: { marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: 'rgba(196, 216, 46, 0.18)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(196, 216, 46, 0.2)', maxWidth: 880 } },
        ...statRows.map(([k, v]) =>
          h('div', { key: k, style: { background: 'var(--navy)', padding: '20px 22px' } },
            h('div', { className: 'mono', style: { color: accentColor, fontSize: '0.66rem', letterSpacing: '0.14em' } }, k.toUpperCase()),
            h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.08rem', letterSpacing: '-0.01em', marginTop: 6, color: 'var(--off-white)' } }, v)
          )
        )
      ),
      // CTAs
      h('div', { style: { display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' } }, ctas),
      // Note
      h('div', { className: 'mono', style: { marginTop: 56, fontSize: '0.66rem', letterSpacing: '0.14em', color: 'rgba(250, 250, 247, 0.4)' } }, note)
    )
  );
}

export default ComingSoon;
