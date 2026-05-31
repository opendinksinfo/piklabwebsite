function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 48, marginBottom: 64 }}>
          <div>
            <div className="logo" style={{ color: 'var(--off-white)', marginBottom: 16 }}>
              <span className="logo-mark" style={{ background: 'var(--green)' }}></span>
              <span>PikLab</span>
            </div>
            <p style={{ color: 'rgba(250, 250, 247, 0.6)', fontSize: '0.92rem', maxWidth: 280, lineHeight: 1.6 }}>
              Robotics for physical spaces. Starting at the pickleball club.
            </p>
            <div style={{ marginTop: 20 }}>
              <div className="mono" style={{ color: 'var(--green)', fontSize: '0.66rem', letterSpacing: '0.14em', marginBottom: 6 }}>CONTACT</div>
              <a href="mailto:info@piklab.ai" style={{ color: 'var(--off-white)', fontSize: '0.95rem', borderBottom: '1px solid rgba(196, 216, 46, 0.3)', paddingBottom: 1 }}>
                info@piklab.ai
              </a>
            </div>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--green)', marginBottom: 14 }}>Visit</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: '0.92rem' }}>
              <li><a href="concord.html">Concord <span style={{ color: 'var(--green)', fontSize: '0.72rem', marginLeft: 4 }}>● PILOT</span></a></li>
              <li><a href="fresno.html">Fresno</a></li>
              <li><a href="sacramento.html">Sacramento</a></li>
              <li><a href="portland.html">Portland</a></li>
              <li><a href="sanjose.html">San Jose</a></li>
            </ul>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--green)', marginBottom: 14 }}>Club</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: '0.92rem' }}>
              <li><a href="#">Coaching</a></li>
              <li><a href="#">Open play</a></li>
              <li><a href="#">Leagues</a></li>
              <li><a href="#">Private events</a></li>
            </ul>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--green)', marginBottom: 14 }}>Lab</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: '0.92rem' }}>
              <li><a href="lab.html">Field notes</a></li>
              <li><a href="lab.html#crew">Robotics</a></li>
              <li><a href="lab.html#careers">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--green)', marginBottom: 14 }}>Platform</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: '0.92rem' }}>
              <li><a href="lab.html#ai-robotics">How it works</a></li>
              <li><a href="lab.html#crew">The fleet</a></li>
              <li><a href="lab.html#spinouts">Spinouts</a></li>
              <li><a href="#">Use cases</a></li>
            </ul>
          </div>
        </div>
        <div style={{
          paddingTop: 32,
          borderTop: '1px solid rgba(250, 250, 247, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: '0.84rem',
          color: 'rgba(250, 250, 247, 0.5)'
        }}>
          <div className="mono">© 2026 PikLab Holdings, Inc. — Pilot live at Indoor Pickleball X · Concord, CA</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="mailto:info@piklab.ai">info@piklab.ai</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
