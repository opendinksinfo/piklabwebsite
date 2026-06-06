// AIRobotics — LLM orchestrator + robot fleet.
import React from 'react';

const h = React.createElement;
const { useState, useEffect, Fragment } = React;

const messages = [
  { from: 'sensors', to: 'brain',    label: 'court 04 finished · 2 min idle', cmd: 'state.update' },
  { from: 'brain',   to: 'dog',      label: 'reset court 04 · collect balls', cmd: 'birdie.dispatch' },
  { from: 'member',  to: 'brain',    label: '"book a drill at 6pm, work my backhand"', cmd: 'intent.parse' },
  { from: 'brain',   to: 'feeder',   label: 'M-7 → court 04 · backhand pattern · 6:00pm', cmd: 'm7.queue' },
  { from: 'brain',   to: 'humanoid', label: 'greet member at door · hand paddle', cmd: 'atlas.dispatch' },
];

const brainItems = [
  { k: 'INTENT',  v: 'Sentences → robot sessions' },
  { k: 'PLAN',    v: '24h ahead · courts + robots + coaches' },
  { k: 'TRAFFIC', v: 'Real-time balance' },
  { k: 'MEMORY',  v: 'Your level. Your goals. Your knee.' },
];

const robotItems = [
  { name: 'atlas',  role: 'humanoid',  verbs: 'greet · check_in · escort · deliver_paddle' },
  { name: 'birdie', role: 'quadruped', verbs: 'patrol · collect_balls · reset_court · scan_floor' },
  { name: 'm7',     role: 'feeder',    verbs: 'queue_drill · feed_pattern · adjust_spin' },
  { name: 'sweep',  role: 'roller',    verbs: 'collect · refill_hopper · return_dock' },
];

const capabilityItems = [
  { k: 'Reservations', v: 'natural language', sub: '"6pm tomorrow, court near the window"' },
  { k: 'Member flow',  v: 'auto check-in',    sub: 'face / tag / phone — under 3 sec' },
  { k: 'Court mgmt',   v: 'self-resetting',   sub: 'birdie patrols between sessions' },
  { k: 'Drills',       v: 'on-demand',        sub: 'M-7 + plan from your last match report' },
];

function KV({ k, v }) {
  return h('div', { style: { display: 'flex', gap: 8, alignItems: 'baseline' } },
    h('span', { className: 'mono', style: { fontSize: '0.62rem', color: 'rgba(250, 250, 247, 0.45)', letterSpacing: '0.14em' } }, k),
    h('span', { className: 'mono', style: { fontSize: '0.74rem', color: 'var(--green)' } }, v)
  );
}

const gridBg = h('svg', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 } },
  h('defs', null,
    h('pattern', { id: 'ar-grid', width: 48, height: 48, patternUnits: 'userSpaceOnUse' },
      h('path', { d: 'M 48 0 L 0 0 0 48', fill: 'none', stroke: 'rgba(196, 216, 46, 0.08)', strokeWidth: '1' })
    )
  ),
  h('rect', { width: '100%', height: '100%', fill: 'url(#ar-grid)' })
);

export function AIRobotics() {
  const [t, setT] = useState(0);
  const [activeMsg, setActiveMsg] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      setT(elapsed);
      setActiveMsg(Math.floor(elapsed / 2.4) % messages.length);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const brainCard = h('div', { style: { borderRadius: 16, border: '1px solid rgba(196, 216, 46, 0.25)', padding: 32, background: 'rgba(196, 216, 46, 0.04)' } },
    h('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 } },
      h('span', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.66rem', letterSpacing: '0.16em' } }, 'AI · ORCHESTRATOR'),
      h('span', { className: 'pulse-dot', style: { width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)' } })
    ),
    h('h3', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.7rem', color: 'var(--off-white)', margin: '8px 0 14px', letterSpacing: '-0.02em' } },
      'The brain that thinks in sentences.'
    ),
    h('p', { style: { color: 'rgba(250, 250, 247, 0.72)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 } },
      'A custom LLM stack with read access to every court, sensor, member profile, and booking — and write access to the robot fleet. It manages physical flow: who plays where, when courts reset, which robot does what next.'
    ),
    h('div', { style: { display: 'grid', gap: 10, marginTop: 24 } },
      ...brainItems.map(item =>
        h('div', { key: item.k, style: { display: 'grid', gridTemplateColumns: '78px 1fr', gap: 14, padding: '12px 14px', borderRadius: 8, background: 'rgba(15, 26, 46, 0.4)', border: '1px solid rgba(196, 216, 46, 0.15)' } },
          h('span', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.66rem', letterSpacing: '0.14em', alignSelf: 'center' } }, item.k),
          h('span', { style: { color: 'rgba(250, 250, 247, 0.85)', fontSize: '0.9rem' } }, item.v)
        )
      )
    )
  );

  const robotCard = h('div', { style: { borderRadius: 16, border: '1px solid rgba(255, 107, 74, 0.35)', padding: 32, background: 'rgba(255, 107, 74, 0.04)' } },
    h('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 } },
      h('span', { className: 'mono', style: { color: 'var(--coral)', fontSize: '0.66rem', letterSpacing: '0.16em' } }, 'ROBOTICS · FLEET'),
      h('span', { className: 'pulse-dot', style: { width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' } })
    ),
    h('h3', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.7rem', color: 'var(--off-white)', margin: '8px 0 14px', letterSpacing: '-0.02em' } },
      'The body that does the work.'
    ),
    h('p', { style: { color: 'rgba(250, 250, 247, 0.72)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 } },
      'Four robot classes carry out what the brain plans. Each one exposes a small tool API to the LLM — short verbs, structured arguments, no surprises.'
    ),
    h('div', { style: { display: 'grid', gap: 8, marginTop: 24 } },
      ...robotItems.map(r =>
        h('div', { key: r.name, style: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, padding: '12px 14px', borderRadius: 8, background: 'rgba(15, 26, 46, 0.4)', border: '1px solid rgba(255, 107, 74, 0.18)' } },
          h('div', null,
            h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--coral)' } },
              r.name,
              h('span', { style: { color: 'rgba(250, 250, 247, 0.4)' } }, `.{${r.verbs.split(' · ').length} verbs}`)
            ),
            h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(250, 250, 247, 0.5)', marginTop: 4 } }, r.verbs)
          ),
          h('span', { className: 'mono', style: { fontSize: '0.6rem', color: 'rgba(250, 250, 247, 0.5)', alignSelf: 'center', letterSpacing: '0.12em' } }, r.role.toUpperCase())
        )
      )
    )
  );

  const messageBus = h('div', { style: { borderRadius: 16, border: '1px solid rgba(196, 216, 46, 0.2)', overflow: 'hidden', background: 'rgba(15, 26, 46, 0.6)' } },
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid rgba(196, 216, 46, 0.15)', background: 'rgba(15, 26, 46, 0.85)' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        h('span', { className: 'pulse-dot', style: { width: 7, height: 7, borderRadius: '50%', background: 'var(--coral)' } }),
        h('span', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.7rem' } }, 'LIVE · ORCHESTRATOR LOG · FRESNO')
      ),
      h('span', { className: 'mono', style: { fontSize: '0.66rem', color: 'rgba(250, 250, 247, 0.4)' } }, `${Math.floor(t * 13) % 9999} msgs/min`)
    ),
    h('div', { className: 'msg-grid', style: { display: 'grid', gridTemplateColumns: '120px 1fr 120px', gap: 0, padding: '8px 0' } },
      ...messages.flatMap((m, i) => {
        const isActive = activeMsg === i;
        const fromColor = m.from === 'brain' ? '#C4D82E' : m.from === 'member' ? '#FF6B4A' : 'rgba(250,250,247,0.6)';
        const toColor = m.to === 'brain' ? '#C4D82E' : '#FF6B4A';
        return [
          h('div', { key: `f${i}`, className: 'mono', style: { padding: '12px 20px', fontSize: '0.74rem', color: fromColor, opacity: isActive ? 1 : 0.5, textAlign: 'right', borderRight: '1px solid rgba(196, 216, 46, 0.1)' } }, m.from),
          h('div', { key: `m${i}`, style: { padding: '12px 24px', borderRight: '1px solid rgba(196, 216, 46, 0.1)', position: 'relative', overflow: 'hidden' } },
            h('div', { className: 'mono', style: { fontSize: '0.66rem', color: 'rgba(250, 250, 247, 0.4)', marginBottom: 4 } },
              `${m.cmd}() `,
              isActive ? h('span', { style: { color: 'var(--green)' } }, '← active') : null
            ),
            h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: isActive ? 'var(--off-white)' : 'rgba(250, 250, 247, 0.55)' } }, m.label),
            isActive ? h('div', { style: { position: 'absolute', bottom: 0, left: 0, height: 2, background: 'var(--green)', animation: 'msgflow 2.4s linear' } }) : null
          ),
          h('div', { key: `t${i}`, className: 'mono', style: { padding: '12px 20px', fontSize: '0.74rem', color: toColor, opacity: isActive ? 1 : 0.5 } }, `→ ${m.to}`),
        ];
      })
    ),
    h('div', { style: { display: 'flex', gap: 24, padding: '14px 20px', borderTop: '1px solid rgba(196, 216, 46, 0.15)', background: 'rgba(15, 26, 46, 0.85)', flexWrap: 'wrap' } },
      h(KV, { k: 'MODEL', v: 'piklab-orchestrator-v3' }),
      h(KV, { k: 'TOOL CALLS', v: '184/min' }),
      h(KV, { k: 'AVG LATENCY', v: '240ms' }),
      h(KV, { k: 'ROBOTS ONLINE', v: '14 / 14' }),
      h(KV, { k: 'MEMBERS NOW', v: `${72 + Math.floor(Math.sin(t / 4) * 8)}` })
    )
  );

  return h('section', { className: 'section dark', id: 'ai-robotics', style: { position: 'relative', overflow: 'hidden' } },
    gridBg,
    h('div', { className: 'container', style: { position: 'relative' } },
      h('div', { style: { maxWidth: 760, marginBottom: 48 } },
        h('div', { className: 'eyebrow', style: { color: 'var(--green)' } }, '03b — Physical flow, orchestrated'),
        h('h2', { className: 'h-section', style: { fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', marginTop: 16, color: 'var(--off-white)' } },
          'Physical flow,', h('br'),
          h('span', { style: { color: 'var(--green)' } }, 'orchestrated by AI.')
        ),
        h('p', { style: { color: 'rgba(250, 250, 247, 0.7)', fontSize: '1.05rem', marginTop: 20, lineHeight: 1.65 } },
          'One LLM. Four robot classes. Tuned on a real club every day.'
        )
      ),
      h('div', { className: 'ar-cols', style: { display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 24, marginBottom: 32 } },
        brainCard, robotCard
      ),
      messageBus,
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, marginTop: 24, background: 'rgba(196, 216, 46, 0.15)', borderRadius: 12, overflow: 'hidden' } },
        ...capabilityItems.map(s =>
          h('div', { key: s.k, style: { background: 'var(--navy-2)', padding: '20px 22px' } },
            h('div', { className: 'mono', style: { color: 'var(--green)', fontSize: '0.66rem' } }, s.k.toUpperCase()),
            h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.01em', marginTop: 6, color: 'var(--off-white)' } }, s.v),
            h('div', { style: { color: 'rgba(250, 250, 247, 0.5)', fontSize: '0.8rem', marginTop: 4 } }, s.sub)
          )
        )
      )
    ),
    h('style', null, '@keyframes msgflow { from { width: 0%; } to { width: 100%; } } @media (max-width: 880px) { .ar-cols { grid-template-columns: 1fr !important; } .msg-grid { grid-template-columns: 80px 1fr 80px !important; } }')
  );
}

export default AIRobotics;
