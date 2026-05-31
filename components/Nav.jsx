function Nav({ active = 'home' }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="index.html" className="logo" aria-label="PikLab home">
          <span className="logo-mark"></span>
          <span>PikLab</span>
        </a>
        <div className="nav-links">
          <a href="club.html" className={`nav-link ${active === 'club' ? 'active' : ''}`}>The Club</a>
          <a href="lab.html" className={`nav-link ${active === 'lab' ? 'active' : ''}`}>The Lab</a>
          <a href="locations.html" className={`nav-link ${active === 'locations' ? 'active' : ''}`}>Locations</a>
          <a href="locations.html" className="btn btn-green" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            Visit Concord
          </a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
