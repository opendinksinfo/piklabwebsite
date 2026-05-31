function PikLabTweaks() {
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "heroAccent": "coral",
    "density": "airy",
    "heroHeadline": "A pickleball club,|and the robotics company|building it.",
    "showTelemetry": true,
    "demoMode": "rally"
  }/*EDITMODE-END*/);

  // Apply theme via CSS vars
  React.useEffect(() => {
    const root = document.documentElement;
    if (tweaks.heroAccent === 'coral') {
      root.style.setProperty('--coral', '#FF6B4A');
    } else if (tweaks.heroAccent === 'green') {
      root.style.setProperty('--coral', '#C4D82E');
    } else if (tweaks.heroAccent === 'navy') {
      root.style.setProperty('--coral', '#0F1A2E');
    }
    // Density
    if (tweaks.density === 'compact') {
      root.style.setProperty('--pad-x', 'clamp(16px, 3vw, 36px)');
    } else {
      root.style.setProperty('--pad-x', 'clamp(20px, 4vw, 56px)');
    }
    // Telemetry visibility
    document.querySelectorAll('.telemetry').forEach(el => {
      el.style.display = tweaks.showTelemetry ? '' : 'none';
    });
    // Demo mode — set the toggle via a custom event
    window.__pikDemoMode = tweaks.demoMode;
    window.dispatchEvent(new CustomEvent('pik-demo-mode', { detail: tweaks.demoMode }));
    // Hero headline
    window.__pikHeadline = tweaks.heroHeadline.split('|');
    window.dispatchEvent(new CustomEvent('pik-headline'));
  }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Hero">
        <TweakText label="Headline (use | for line breaks)" value={tweaks.heroHeadline} onChange={v => setTweak('heroHeadline', v)} />
        <TweakRadio label="Accent color" value={tweaks.heroAccent} options={[
          { label: 'Coral', value: 'coral' },
          { label: 'Green', value: 'green' },
          { label: 'Navy', value: 'navy' },
        ]} onChange={v => setTweak('heroAccent', v)} />
        <TweakToggle label="Show live telemetry overlays" checked={tweaks.showTelemetry} onChange={v => setTweak('showTelemetry', v)} />
      </TweakSection>
      <TweakSection title="Lab demo">
        <TweakRadio label="Default mode" value={tweaks.demoMode} options={[
          { label: 'Rally', value: 'rally' },
          { label: 'Drills', value: 'drills' },
          { label: 'Heatmap', value: 'heatmap' },
        ]} onChange={v => setTweak('demoMode', v)} />
      </TweakSection>
      <TweakSection title="Layout">
        <TweakRadio label="Density" value={tweaks.density} options={[
          { label: 'Airy', value: 'airy' },
          { label: 'Compact', value: 'compact' },
        ]} onChange={v => setTweak('density', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

window.PikLabTweaks = PikLabTweaks;
