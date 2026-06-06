// Footer — ES module (React.createElement form). Drop-in replacement for Footer.jsx
// on pages migrated off in-browser Babel. Other pages still use Footer.jsx.
const h = React.createElement;

const linkCol = (heading, links) =>
  h('div', null,
    h('div', { className: 'mono', style: { color: 'var(--green)', marginBottom: 14 } }, heading),
    h('ul', { style: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: '0.92rem' } },
      ...links.map((l, i) =>
        h('li', { key: i }, h('a', { href: l.href }, l.label, l.badge))
      )
    )
  );

const pilotBadge = h('span', { style: { color: 'var(--green)', fontSize: '0.72rem', marginLeft: 4 } }, '● PILOT');

export function Footer() {
  return h('footer', { className: 'footer' },
    h('div', { className: 'container' },
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 48, marginBottom: 64 } },
        // Brand column
        h('div', null,
          h('div', { className: 'logo', style: { color: 'var(--off-white)', marginBottom: 16 } },
            h('span', { className: 'logo-mark', style: { background: 'var(--green)' } }),
            h('span', null, 'PikLab')
          ),
          h('p', { style: { color: 'rgba(250, 250, 247, 0.6)', fontSize: '0.92rem', maxWidth: 280, lineHeight: 1.6 } },
            'Robotics for physical spaces. Starting at the pickleball club.'
          ),
          h('div', { style: { marginTop: 20 } },
            h('div', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.66rem', letterSpacing: '0.14em', marginBottom: 6 } }, 'CONTACT'),
            h('a', { href: 'mailto:info@piklab.ai', style: { color: 'var(--off-white)', fontSize: '0.95rem', borderBottom: '1px solid rgba(196, 216, 46, 0.3)', paddingBottom: 1 } }, 'info@piklab.ai')
          )
        ),
        linkCol('Visit', [
          { href: 'concord.html', label: 'Concord ', badge: pilotBadge },
          { href: 'fresno.html', label: 'Fresno' },
          { href: 'sacramento.html', label: 'Sacramento' },
          { href: 'portland.html', label: 'Portland' },
          { href: 'sanjose.html', label: 'San Jose' },
        ]),
        linkCol('Club', [
          { href: '#', label: 'Coaching' },
          { href: '#', label: 'Open play' },
          { href: '#', label: 'Leagues' },
          { href: '#', label: 'Private events' },
        ]),
        linkCol('Lab', [
          { href: 'lab.html', label: 'Field notes' },
          { href: 'lab.html#crew', label: 'Robotics' },
          { href: 'lab.html#careers', label: 'Careers' },
          { href: '#', label: 'Press' },
        ]),
        linkCol('Platform', [
          { href: 'lab.html#ai-robotics', label: 'How it works' },
          { href: 'lab.html#crew', label: 'The fleet' },
          { href: 'lab.html#spinouts', label: 'Spinouts' },
          { href: '#', label: 'Use cases' },
        ])
      ),
      // Bottom bar
      h('div', { style: { paddingTop: 32, borderTop: '1px solid rgba(250, 250, 247, 0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, fontSize: '0.84rem', color: 'rgba(250, 250, 247, 0.5)' } },
        h('div', { className: 'mono' }, '© 2026 PikLab Holdings, Inc. — Pilot live at Indoor Pickleball X · Concord, CA'),
        h('div', { style: { display: 'flex', gap: 24 } },
          h('a', { href: '#' }, 'Privacy'),
          h('a', { href: '#' }, 'Terms'),
          h('a', { href: 'mailto:info@piklab.ai' }, 'info@piklab.ai')
        )
      )
    )
  );
}

export default Footer;
