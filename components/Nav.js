// Nav — site nav, used by every page except the brand front door.
import React from 'react';

const h = React.createElement;
const { useState, useEffect } = React;

export function Nav({ active = 'home' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const link = (id, href, label) =>
    h('a', { href, className: `nav-link ${active === id ? 'active' : ''}` }, label);

  return h('nav', { className: `nav ${scrolled ? 'scrolled' : ''}` },
    h('div', { className: 'container nav-inner' },
      h('a', { href: 'index.html', className: 'logo', 'aria-label': 'PikLab home' },
        h('span', { className: 'logo-mark' }),
        h('span', null, 'PikLab')
      ),
      h('div', { className: 'nav-links' },
        link('club', 'club.html', 'The Club'),
        link('lab', 'lab.html', 'The Lab'),
        link('locations', 'locations.html', 'Locations'),
        h('a', { href: 'locations.html', className: 'btn btn-green', style: { padding: '10px 18px', fontSize: '0.88rem' } }, 'Visit Concord')
      )
    )
  );
}

export default Nav;
