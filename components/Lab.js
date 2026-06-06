// Lab — four lab.html-only sections: LabHero, LabFieldNotes, LabSpinouts, LabCareers.
import React from 'react';

const h = React.createElement;
const { useEffect } = React;

// ---- Shared helpers ----

const rightArrow = h('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none' },
  h('path', { d: 'M3 8h10M9 4l4 4-4 4', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' })
);

const labGridBg = h('svg', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 } },
  h('defs', null,
    h('pattern', { id: 'lab-grid', width: 48, height: 48, patternUnits: 'userSpaceOnUse' },
      h('path', { d: 'M 48 0 L 0 0 0 48', fill: 'none', stroke: 'rgba(196, 216, 46, 0.08)', strokeWidth: '1' })
    )
  ),
  h('rect', { width: '100%', height: '100%', fill: 'url(#lab-grid)' })
);

// ---- LabHero ----

export function LabHero() {
  return h('section', { style: { background: 'var(--navy)', color: 'var(--off-white)', padding: 'clamp(96px, 13vw, 180px) 0 clamp(64px, 8vw, 120px)', position: 'relative', overflow: 'hidden' } },
    labGridBg,
    h('div', { className: 'container', style: { position: 'relative' } },
      h('div', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.7rem', letterSpacing: '0.18em', marginBottom: 28 } }, '◉ PIKLAB · THE LAB'),
      h('h1', { className: 'h-display', style: { fontSize: 'clamp(3rem, 8vw, 6.5rem)', color: 'var(--off-white)', maxWidth: '14ch' } },
        'Robots that work', h('br'),
        h('span', { style: { color: 'var(--green)', fontStyle: 'italic', fontWeight: 500 } }, 'in the real world.')
      ),
      h('p', { style: { color: 'rgba(250, 250, 247, 0.75)', fontSize: '1.15rem', maxWidth: '60ch', marginTop: 24, lineHeight: 1.6 } },
        'Robots that work in the real world. Pickleball is the testbed. Generalize from there.'
      ),
      h('div', { style: { display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' } },
        h('a', { href: '#careers', className: 'btn btn-green' }, 'Join the lab', rightArrow),
        h('a', { href: '#field-notes', className: 'btn btn-ghost-light' }, 'Read field notes')
      )
    )
  );
}

// ---- LabFieldNotes ----

const posts = [
  { tag: 'ROBOTICS',     title: 'Why Birdie can\'t do stairs (yet)',                author: 'Mei Park',      role: 'Robotics lead',     date: 'Apr 28, 2026', readTime: '7 min' },
  { tag: 'AI',           title: '"Book me a court near the window at 6"',           author: 'Dani Calderón', role: 'AI engineer',       date: 'Apr 21, 2026', readTime: '5 min' },
  { tag: 'ROBOTICS',     title: 'M-7\'s third wheel: the case for asymmetric spin', author: 'Kai Wei',       role: 'Mechanical',        date: 'Apr 14, 2026', readTime: '9 min' },
  { tag: 'ON THE FLOOR', title: 'What court 04 looked like last Saturday',          author: 'Operations',    role: 'Fresno',            date: 'Apr 07, 2026', readTime: '4 min' },
  { tag: 'PICKLEBALL',   title: 'The kitchen line is a sensor problem',             author: 'Anil Singh',    role: 'Coaching research', date: 'Mar 31, 2026', readTime: '6 min' },
  { tag: 'AI',           title: 'Why Atlas waits two beats before saying hello',    author: 'Dani Calderón', role: 'AI engineer',       date: 'Mar 24, 2026', readTime: '8 min' },
];

const sidebarStats = [
  ['Posts', `${posts.length}`],
  ['Authors', '6'],
  ['Robots cited', '14'],
  ['Bricked feeders', '1'],
];

const fieldNotesStyles = '@media (max-width: 980px) { .lab-fn-grid { grid-template-columns: 1fr !important; } .lab-fn-aside { position: static !important; } } @media (max-width: 720px) { .lab-fn-row { grid-template-columns: 1fr !important; padding: 20px !important; gap: 12px !important; } .lab-fn-row > span:last-child { display: none; } }';

export function LabFieldNotes() {
  useEffect(() => {
    // Trigger X widget rescan once React has rendered the timeline placeholder
    if (window.twttr && window.twttr.widgets) window.twttr.widgets.load();
  }, []);

  return h('section', { className: 'section', id: 'field-notes', style: { background: 'var(--navy)', color: 'var(--off-white)', borderTop: '1px solid rgba(196, 216, 46, 0.2)' } },
    h('div', { className: 'container' },
      h('div', { style: { marginBottom: 32 } },
        h('div', { className: 'eyebrow', style: { color: 'var(--green)' } }, 'Field notes'),
        h('h2', { className: 'h-section', style: { fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--off-white)', marginTop: 14 } }, 'From the floor.'),
        h('p', { style: { color: 'rgba(250, 250, 247, 0.65)', marginTop: 12, maxWidth: '60ch', fontSize: '0.96rem', lineHeight: 1.6 } },
          'Engineering posts from the floor. What we tried. What worked. What broke.'
        )
      ),
      h('div', { className: 'lab-fn-grid', style: { display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 40, alignItems: 'flex-start' } },
        // Posts list
        h('div', { style: { display: 'grid', gap: 1, background: 'rgba(196, 216, 46, 0.18)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(196, 216, 46, 0.2)' } },
          ...posts.map((p, i) =>
            h('div', { key: i, className: 'lab-fn-row', style: { display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 24, alignItems: 'center', padding: '24px 28px', background: 'var(--navy)' } },
              h('span', { className: 'mono', style: { color: 'var(--coral)', fontSize: '0.66rem', letterSpacing: '0.14em' } }, p.tag),
              h('div', null,
                h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.15rem', letterSpacing: '-0.01em', lineHeight: 1.2, color: 'var(--off-white)' } }, p.title),
                h('div', { className: 'mono', style: { display: 'flex', gap: 14, marginTop: 10, color: 'rgba(250, 250, 247, 0.4)', flexWrap: 'wrap' } },
                  h('span', { style: { fontSize: '0.66rem' } }, `${p.author.toUpperCase()} · ${p.role.toUpperCase()}`),
                  h('span', { style: { fontSize: '0.66rem' } }, `· ${p.date.toUpperCase()}`),
                  h('span', { style: { fontSize: '0.66rem' } }, `· ${p.readTime.toUpperCase()}`)
                )
              ),
              h('span', { className: 'mono', style: { color: 'rgba(250, 250, 247, 0.3)', fontSize: '0.62rem', letterSpacing: '0.12em' } }, 'SOON')
            )
          )
        ),
        // Sidebar — X feed + stats
        h('aside', { className: 'lab-fn-aside', style: { display: 'grid', gap: 20, position: 'sticky', top: 24 } },
          h('div', { style: { background: 'var(--navy-2)', border: '1px solid rgba(196, 216, 46, 0.2)', borderRadius: 16, padding: 8, overflow: 'hidden' } },
            h('a', { className: 'twitter-timeline', 'data-theme': 'dark', 'data-chrome': 'transparent noborders', 'data-height': '600', href: 'https://twitter.com/PikLab001?ref_src=twsrc%5Etfw' },
              'Tweets by @PikLab001'
            )
          ),
          h('div', { style: { background: 'var(--navy-2)', border: '1px solid rgba(196, 216, 46, 0.18)', borderRadius: 16, padding: '8px 0' } },
            ...sidebarStats.map(([k, v], i) =>
              h('div', { key: k, style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 22px', borderTop: i === 0 ? 'none' : '1px solid rgba(196, 216, 46, 0.08)' } },
                h('span', { className: 'mono', style: { color: 'rgba(250, 250, 247, 0.45)', fontSize: '0.7rem', letterSpacing: '0.1em' } }, k.toUpperCase()),
                h('span', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--off-white)', fontSize: '1.05rem' } }, v)
              )
            )
          )
        )
      ),
      h('style', null, fieldNotesStyles)
    )
  );
}

// ---- LabSpinouts ----

const opendinksLogo = h('svg', { width: 32, height: 32, viewBox: '0 0 32 32', fill: 'none' },
  h('ellipse', { cx: 13, cy: 13, rx: 10, ry: 11, fill: '#F25C2D' }),
  h('rect', { x: 11, y: 22, width: 4, height: 8, rx: 1.5, fill: '#FAFAF7' }),
  h('circle', { cx: 9, cy: 11, r: 1.4, fill: '#FBF7F1' }),
  h('circle', { cx: 15, cy: 9, r: 1.4, fill: '#FBF7F1' }),
  h('circle', { cx: 17, cy: 15, r: 1.4, fill: '#FBF7F1' }),
  h('circle', { cx: 11, cy: 17, r: 1.4, fill: '#FBF7F1' })
);

const opendinksFeed = [
  { who: 'Priya',  tone: '#F5D547', body: 'Ladder night Thu — 12 spots. Who\'s in?' },
  { who: 'Marcus', tone: '#1F4F87', body: 'Court 3 free at 6:30, anyone want a game?' },
  { who: 'Jordan', tone: '#F25C2D', body: '🥒 Beat Tomás 11–9. Rematch Saturday.' },
];

export function LabSpinouts() {
  return h('section', { className: 'section', id: 'spinouts', style: { background: 'var(--navy)', color: 'var(--off-white)', borderTop: '1px solid rgba(196, 216, 46, 0.2)' } },
    h('div', { className: 'container' },
      h('div', { style: { marginBottom: 36 } },
        h('div', { className: 'eyebrow', style: { color: 'var(--green)' } }, 'Spinouts'),
        h('h2', { className: 'h-section', style: { fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--off-white)', marginTop: 14 } }, 'What the lab ships.'),
        h('p', { style: { color: 'rgba(250, 250, 247, 0.65)', marginTop: 14, maxWidth: '58ch', fontSize: '0.98rem', lineHeight: 1.6 } },
          'Some of what we build graduates into a product. First out: OpenDinks.'
        )
      ),
      h('a', {
        href: 'https://opendinks.com', target: '_blank', rel: 'noopener',
        className: 'lab-spinout-card',
        style: { display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 0, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(196, 216, 46, 0.25)', background: 'var(--navy-2)', textDecoration: 'none', color: 'var(--off-white)', transition: 'border-color 200ms' },
        onMouseEnter: (e) => { e.currentTarget.style.borderColor = '#F25C2D'; },
        onMouseLeave: (e) => { e.currentTarget.style.borderColor = 'rgba(196, 216, 46, 0.25)'; },
      },
        // Left — copy
        h('div', { style: { padding: '40px 44px 44px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 } },
            opendinksLogo,
            h('span', { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.4rem', letterSpacing: '-0.01em' } }, 'OpenDinks'),
            h('span', { className: 'mono', style: { fontSize: '0.62rem', letterSpacing: '0.16em', color: '#F25C2D', border: '1px solid #F25C2D', padding: '3px 8px', borderRadius: 999 } }, 'LIVE')
          ),
          h('h3', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, color: 'var(--off-white)' } },
            'The software running our clubs,', h('br'),
            h('span', { style: { color: '#F25C2D' } }, 'now sold to others.')
          ),
          h('p', { style: { color: 'rgba(250, 250, 247, 0.72)', fontSize: '1rem', marginTop: 18, lineHeight: 1.6, maxWidth: '46ch' } },
            'Community feed, court ops, member CRM. The booking app players actually open every day. Pickleball clubs — independent of any PikLab hardware — run their floor on it.'
          ),
          h('div', { style: { display: 'flex', gap: 22, marginTop: 28, flexWrap: 'wrap', color: 'rgba(250, 250, 247, 0.7)' } },
            ...[['72%', 'weekly active'], ['<2%', 'no-shows'], ['0%', 'revenue cut']].map(([v, k]) =>
              h('div', { key: k },
                h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem', color: '#F25C2D', letterSpacing: '-0.02em' } }, v),
                h('div', { className: 'mono', style: { fontSize: '0.66rem', letterSpacing: '0.12em', marginTop: 2 } }, k.toUpperCase())
              )
            )
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 32, color: '#F25C2D', fontSize: '0.94rem', fontWeight: 500 } },
            h('span', null, 'Visit opendinks.com'),
            h('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none' },
              h('path', { d: 'M5 11L11 5M11 5H6M11 5V10', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' })
            )
          )
        ),
        // Right — mock device card
        h('div', { style: { background: 'linear-gradient(135deg, #FBF7F1 0%, #F2EDE3 100%)', position: 'relative', overflow: 'hidden', minHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 } },
          h('div', { style: { width: '100%', maxWidth: 320, background: '#FFFEFB', borderRadius: 14, boxShadow: '0 20px 50px rgba(20, 17, 13, 0.18), 0 4px 12px rgba(20, 17, 13, 0.08)', border: '1px solid rgba(20, 17, 13, 0.06)', overflow: 'hidden', transform: 'rotate(-3deg)' } },
            h('div', { style: { padding: '14px 18px', borderBottom: '1px solid rgba(20, 17, 13, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                h('svg', { width: 16, height: 16, viewBox: '0 0 32 32' },
                  h('ellipse', { cx: 13, cy: 13, rx: 10, ry: 11, fill: '#F25C2D' }),
                  h('rect', { x: 11, y: 22, width: 4, height: 8, rx: 1.5, fill: '#14110D' })
                ),
                h('span', { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.84rem', color: '#14110D' } }, 'Riverside PB')
              ),
              h('span', { style: { fontSize: '0.66rem', color: '#9A938A', fontFamily: 'var(--font-mono)' } }, 'Today · Tue')
            ),
            h('div', { style: { padding: '14px 18px' } },
              h('div', { style: { fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: '#F25C2D', letterSpacing: '0.12em', marginBottom: 8 } }, 'FEED · 4 NEW'),
              ...opendinksFeed.map((p, i) =>
                h('div', { key: i, style: { display: 'flex', gap: 10, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(20, 17, 13, 0.05)' } },
                  h('div', { style: { width: 22, height: 22, borderRadius: 999, background: p.tone, color: '#14110D', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.6rem', flexShrink: 0 } }, p.who[0]),
                  h('div', { style: { fontSize: '0.78rem', color: '#14110D', lineHeight: 1.4 } },
                    h('span', { style: { fontWeight: 600 } }, p.who), ` · ${p.body}`
                  )
                )
              )
            )
          )
        )
      ),
      h('style', null, '@media (max-width: 880px) { .lab-spinout-card { grid-template-columns: 1fr !important; } }')
    )
  );
}

// ---- LabCareers ----

const roles = [
  { t: 'Robotics engineer',   l: 'Fresno, CA',       x: 'Build the hardware stack — motors, sensors, perception.' },
  { t: 'Mechanical engineer', l: 'Fresno, CA',       x: 'Robot mechanical design — durability, manufacturability.' },
  { t: 'AI engineer',         l: 'Fresno or remote', x: 'Train the models that let the fleet see, plan, and respond.' },
  { t: 'Full-stack engineer', l: 'Fresno or remote', x: 'Member app, scheduling, the backend that ties it all together.' },
];

export function LabCareers() {
  return h('section', { className: 'section', id: 'careers', style: { background: 'var(--navy)', color: 'var(--off-white)', borderTop: '1px solid rgba(196, 216, 46, 0.2)' } },
    h('div', { className: 'container' },
      h('div', { className: 'lab-careers-grid', style: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, alignItems: 'flex-start' } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { color: 'var(--green)' } }, 'Careers'),
          h('h2', { className: 'h-section', style: { fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--off-white)', marginTop: 14 } }, 'We’re hiring.'),
          h('p', { style: { color: 'rgba(250, 250, 247, 0.7)', marginTop: 18, lineHeight: 1.6 } },
            'Small team. Real hardware. Ship every week. Office at the Fresno club — your testbed walks in the door at 6am.'
          )
        ),
        h('div', { style: { display: 'grid', gap: 12 } },
          ...roles.map(r =>
            h('a', { key: r.t, href: '#', style: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', padding: '22px 24px', borderRadius: 14, border: '1px solid rgba(196, 216, 46, 0.25)', background: 'rgba(196, 216, 46, 0.04)', color: 'var(--off-white)', textDecoration: 'none' } },
              h('div', null,
                h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em' } }, r.t),
                h('div', { style: { color: 'rgba(250, 250, 247, 0.6)', fontSize: '0.92rem', marginTop: 4 } }, r.x)
              ),
              h('div', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.72rem', letterSpacing: '0.12em' } }, `${r.l.toUpperCase()} →`)
            )
          )
        )
      ),
      h('style', null, '@media (max-width: 900px) { .lab-careers-grid { grid-template-columns: 1fr !important; } }')
    )
  );
}
