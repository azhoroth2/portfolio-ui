import '../tokens/tokens.css';

const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');`;

const styles = `
  ${fontImport}
  .story-wrap { background: var(--color-bg-primary); padding: 40px; min-height: 100vh; color: var(--color-text-primary); }
  .section-label {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-text-tertiary);
    margin-bottom: 16px;
    margin-top: 40px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-border);
  }
  .section-label:first-child { margin-top: 0; }
  .type-row {
    display: flex;
    align-items: baseline;
    gap: 24px;
    margin-bottom: 20px;
  }
  .type-row__meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-tertiary);
    width: 140px;
    flex-shrink: 0;
    line-height: 1.4;
  }
  .type-row__meta strong {
    display: block;
    color: var(--color-text-secondary);
    font-size: 12px;
  }
  .weight-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
  }
  .weight-row {
    display: flex;
    align-items: baseline;
    gap: 24px;
  }
  .weight-row__label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-tertiary);
    width: 180px;
    flex-shrink: 0;
  }
  .tracking-row {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 20px;
  }
  .tracking-row__label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-tertiary);
    width: 200px;
    flex-shrink: 0;
  }
`;

function injectStyle(id, css) {
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/* ------------------------------------------------------------------ */
/*  Story: Type Scale                                                   */
/* ------------------------------------------------------------------ */

const typeScale = [
  { name: '--text-5xl', label: 'Display / Hero', size: '3–5rem' },
  { name: '--text-4xl', label: 'Section Title', size: '2.5–4rem' },
  { name: '--text-3xl', label: 'Heading LG', size: '2–3rem' },
  { name: '--text-2xl', label: 'Heading MD', size: '1.5–2rem' },
  { name: '--text-xl', label: 'Heading SM', size: '1.2–1.5rem' },
  { name: '--text-lg', label: 'Subtitle / Lead', size: '1–1.2rem' },
  { name: '--text-base', label: 'Body', size: '0.9–1.06rem' },
  { name: '--text-sm', label: 'Small / Caption', size: '0.8–0.9rem' },
  { name: '--text-xs', label: 'Micro / Label', size: '0.7–0.8rem' },
];

function renderScale() {
  injectStyle('type-story-styles', styles);
  const rows = typeScale.map(t => `
    <div class="type-row">
      <div class="type-row__meta">
        <strong>${t.name}</strong>
        ${t.label}<br>${t.size}
      </div>
      <div style="font-family: var(--font-heading); font-size: var(${t.name}); font-weight: var(--weight-bold); color: var(--color-text-primary); line-height: var(--leading-tight);">
        The quick brown fox
      </div>
    </div>
  `).join('');
  return `<div class="story-wrap"><div class="section-label">Type Scale — Space Grotesk, fluid clamp()</div>${rows}</div>`;
}

/* ------------------------------------------------------------------ */
/*  Story: Headings (Space Grotesk, all weights)                       */
/* ------------------------------------------------------------------ */

const headingWeights = [
  { name: '--weight-light', label: 'Light 300', w: 300 },
  { name: '--weight-regular', label: 'Regular 400', w: 400 },
  { name: '--weight-medium', label: 'Medium 500', w: 500 },
  { name: '--weight-semibold', label: 'SemiBold 600', w: 600 },
  { name: '--weight-bold', label: 'Bold 700', w: 700 },
];

function renderHeadings() {
  injectStyle('type-story-styles', styles);
  const rows = headingWeights.map(wt => `
    <div class="weight-row">
      <span class="weight-row__label">${wt.name} · ${wt.label}</span>
      <div style="font-family: var(--font-heading); font-size: var(--text-3xl); font-weight: ${wt.w}; color: var(--color-text-primary); line-height: var(--leading-heading);">
        Stanislav Stefaniuk
      </div>
    </div>
  `).join('');
  return `
    <div class="story-wrap">
      <div class="section-label">Space Grotesk — Heading Font</div>
      <div class="weight-grid">${rows}</div>

      <div class="section-label">Heading with accent (warm)</div>
      <div style="font-family: var(--font-heading); font-size: var(--text-4xl); font-weight: var(--weight-bold); color: var(--color-text-primary); line-height: var(--leading-heading); letter-spacing: var(--tracking-tight);">
        Senior Product <span style="color: var(--color-accent-warm);">Designer</span>
      </div>

      <div class="section-label" style="margin-top: 32px;">Case study title style (tight tracking)</div>
      <div style="font-family: var(--font-heading); font-size: var(--text-4xl); font-weight: var(--weight-bold); color: var(--color-text-primary); line-height: var(--leading-heading); letter-spacing: var(--tracking-tighter);">
        Redesigning Enterprise<br>Adoption at Scale
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Story: Body (Inter, all leading variants)                           */
/* ------------------------------------------------------------------ */

const leadingVariants = [
  { name: '--leading-tight', label: 'Tight 1.1' },
  { name: '--leading-snug', label: 'Snug 1.25' },
  { name: '--leading-normal', label: 'Normal 1.5' },
  { name: '--leading-relaxed', label: 'Relaxed 1.7' },
];

function renderBody() {
  injectStyle('type-story-styles', styles);
  const rows = leadingVariants.map(lh => `
    <div style="margin-bottom: 32px;">
      <div class="section-label">${lh.name} · ${lh.label}</div>
      <p style="font-family: var(--font-body); font-size: var(--text-base); color: var(--color-text-secondary); line-height: var(${lh.name}); max-width: 600px;">
        Hiring managers scan quickly, deciding whether to dig deeper or move on.
        The portfolio should demonstrate design thinking, not describe it. Restraint
        is a choice, not a default — every element earns its place. If it can be
        removed without loss, remove it.
      </p>
    </div>
  `).join('');
  return `<div class="story-wrap"><div class="section-label">Inter — Body Font</div>${rows}</div>`;
}

/* ------------------------------------------------------------------ */
/*  Story: Mono (JetBrains Mono)                                       */
/* ------------------------------------------------------------------ */

function renderMono() {
  injectStyle('type-story-styles', styles);
  return `
    <div class="story-wrap">
      <div class="section-label">JetBrains Mono — Mono Font</div>

      <div style="margin-bottom: 32px;">
        <p style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-accent-warm); text-transform: uppercase; letter-spacing: var(--tracking-wider);">
          ✦ &nbsp; Available for work
        </p>
        <p style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: var(--tracking-wider); margin-top: 12px;">
          — &nbsp; Case Study
        </p>
        <p style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: var(--tracking-wider); margin-top: 12px;">
          ← Next Project
        </p>
      </div>

      <div class="section-label">Mono in context — Section heading label</div>
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
        <div style="width: 24px; height: 1px; background: var(--color-accent-warm);"></div>
        <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-accent-warm); text-transform: uppercase; letter-spacing: var(--tracking-wider);">Selected Work</span>
      </div>

      <div class="section-label">All weights</div>
      ${[400, 500, 700].map(w => `
        <div style="margin-bottom: 12px;">
          <span style="font-family: var(--font-mono); font-size: var(--text-sm); font-weight: ${w}; color: var(--color-text-secondary);">
            ${w} — const token = 'var(--color-accent-warm)';
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Story: Tracking (letter-spacing)                                    */
/* ------------------------------------------------------------------ */

const trackingTokens = [
  { name: '--tracking-tighter', label: 'Tighter −0.05em' },
  { name: '--tracking-tight', label: 'Tight −0.04em' },
  { name: '--tracking-normal', label: 'Normal 0' },
  { name: '--tracking-wide', label: 'Wide 0.05em' },
  { name: '--tracking-wider', label: 'Wider 0.1em' },
];

function renderTracking() {
  injectStyle('type-story-styles', styles);
  const rows = trackingTokens.map(t => `
    <div class="tracking-row">
      <span class="tracking-row__label">${t.name}<br><span style="color: var(--color-text-secondary);">${t.label}</span></span>
      <span style="font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: var(--weight-bold); letter-spacing: var(${t.name}); color: var(--color-text-primary);">
        Portfolio
      </span>
    </div>
  `).join('');
  return `<div class="story-wrap"><div class="section-label">Letter Spacing Scale</div>${rows}</div>`;
}

/* ------------------------------------------------------------------ */
/*  Storybook export                                                    */
/* ------------------------------------------------------------------ */

export default {
  title: 'Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Typography specimens for all three font families — Space Grotesk (headings), Inter (body), JetBrains Mono (labels/code).
Toggle **Theme** in the toolbar to preview both dark and light renderings.
        `.trim(),
      },
    },
  },
};

export const Scale = {
  name: 'Type Scale',
  render: () => renderScale(),
};

export const Headings = {
  name: 'Headings',
  render: () => renderHeadings(),
};

export const Body = {
  name: 'Body',
  render: () => renderBody(),
};

export const Mono = {
  name: 'Monospace',
  render: () => renderMono(),
};

export const Tracking = {
  name: 'Tracking',
  render: () => renderTracking(),
};
