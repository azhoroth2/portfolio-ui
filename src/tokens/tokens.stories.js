import '../tokens/tokens.css';

/* ------------------------------------------------------------------ */
/*  Shared story styles                                                 */
/* ------------------------------------------------------------------ */
const storyStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

  body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }

  .token-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
    padding: 24px;
  }
  .token-swatch {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--color-border);
    background: var(--color-bg-secondary);
    font-family: var(--font-mono);
    font-size: 11px;
  }
  .token-swatch__color {
    height: 64px;
    width: 100%;
  }
  .token-swatch__body {
    padding: 8px 10px;
  }
  .token-swatch__name {
    font-weight: 600;
    color: var(--color-text-primary);
    word-break: break-all;
    margin-bottom: 2px;
  }
  .token-swatch__value {
    color: var(--color-text-tertiary);
    word-break: break-all;
  }

  .token-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--color-border);
  }
  .token-row__label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-tertiary);
    width: 160px;
    flex-shrink: 0;
  }
  .token-row__value {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-text-secondary);
    width: 100px;
    flex-shrink: 0;
  }
  .token-row__demo {
    flex: 1;
  }

  .section-label {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-tertiary);
    padding: 20px 24px 8px;
    border-bottom: 1px solid var(--color-border);
  }

  .story-wrap {
    background: var(--color-bg-primary);
    min-height: 100vh;
    color: var(--color-text-primary);
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
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function colorSwatch(name, cssVar, resolvedValue) {
  return `
    <div class="token-swatch">
      <div class="token-swatch__color" style="background: var(${cssVar})"></div>
      <div class="token-swatch__body">
        <div class="token-swatch__name">${name}</div>
        <div class="token-swatch__value">${cssVar}</div>
      </div>
    </div>
  `;
}

function spacingRow(name, cssVar, size) {
  return `
    <div class="token-row">
      <span class="token-row__label">${name}</span>
      <span class="token-row__value">${cssVar}</span>
      <div class="token-row__demo">
        <div style="height: 12px; width: var(${cssVar}); background: var(--color-accent-warm); border-radius: 3px; min-width: 2px;"></div>
      </div>
    </div>
  `;
}

function radiusRow(name, cssVar) {
  return `
    <div class="token-row">
      <span class="token-row__label">${name}</span>
      <span class="token-row__value">${cssVar}</span>
      <div class="token-row__demo">
        <div style="width: 80px; height: 40px; background: var(--color-accent-warm); border-radius: var(${cssVar});"></div>
      </div>
    </div>
  `;
}

function shadowRow(name, cssVar) {
  return `
    <div class="token-row" style="align-items: center; padding: 20px 24px;">
      <span class="token-row__label">${name}</span>
      <span class="token-row__value" style="width: 160px;">${cssVar}</span>
      <div class="token-row__demo">
        <div style="
          width: 80px;
          height: 48px;
          background: var(--color-bg-secondary);
          border-radius: 10px;
          box-shadow: var(${cssVar});
          border: 1px solid var(--color-border);
        "></div>
      </div>
    </div>
  `;
}

function motionRow(name, durationVar, easingVar) {
  return `
    <div class="token-row" style="align-items: center; padding: 16px 24px; gap: 24px;">
      <span class="token-row__label">${name}</span>
      <span class="token-row__value" style="width: 200px;">${durationVar}<br><span style="color: var(--color-text-tertiary);">${easingVar}</span></span>
      <div class="token-row__demo">
        <div
          class="motion-demo"
          data-duration="${durationVar}"
          data-easing="${easingVar}"
          style="
            width: 40px; height: 40px;
            background: var(--color-accent-warm);
            border-radius: 8px;
            cursor: pointer;
            transition: transform var(${durationVar}) var(${easingVar});
          "
          onmouseenter="this.style.transform='translateX(120px)'"
          onmouseleave="this.style.transform='translateX(0)'"
          title="Hover to see easing"
        ></div>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Story: Colors                                                       */
/* ------------------------------------------------------------------ */

const colorGroups = [
  {
    label: 'Backgrounds',
    swatches: [
      ['BG Primary', '--color-bg-primary'],
      ['BG Secondary', '--color-bg-secondary'],
      ['BG Tertiary', '--color-bg-tertiary'],
      ['BG Elevated', '--color-bg-elevated'],
      ['BG Surface', '--color-bg-surface'],
      ['BG Surface Hover', '--color-bg-surface-hover'],
    ],
  },
  {
    label: 'Accents',
    swatches: [
      ['Accent Warm', '--color-accent-warm'],
      ['Accent Warm Hover', '--color-accent-warm-hover'],
      ['Accent Warm Muted', '--color-accent-warm-muted'],
      ['Accent Cool', '--color-accent-cool'],
      ['Accent Cool Hover', '--color-accent-cool-hover'],
      ['Accent Cool Muted', '--color-accent-cool-muted'],
    ],
  },
  {
    label: 'Text',
    swatches: [
      ['Text Primary', '--color-text-primary'],
      ['Text Secondary', '--color-text-secondary'],
      ['Text Tertiary', '--color-text-tertiary'],
      ['Text Inverse', '--color-text-inverse'],
    ],
  },
  {
    label: 'Borders',
    swatches: [
      ['Border', '--color-border'],
      ['Border Hover', '--color-border-hover'],
      ['Border Accent', '--color-border-accent'],
    ],
  },
  {
    label: 'Semantic',
    swatches: [
      ['Success', '--color-success'],
      ['Error', '--color-error'],
      ['Warning', '--color-warning'],
    ],
  },
];

function renderColors() {
  injectStyle('tokens-story-styles', storyStyles);
  const html = colorGroups.map(group => `
    <div class="section-label">${group.label}</div>
    <div class="token-grid">
      ${group.swatches.map(([name, cssVar]) => colorSwatch(name, cssVar)).join('')}
    </div>
  `).join('');
  return `<div class="story-wrap">${html}</div>`;
}

/* ------------------------------------------------------------------ */
/*  Story: Spacing                                                      */
/* ------------------------------------------------------------------ */

const spacingTokens = [
  ['Space 1 (4px)', '--space-1'],
  ['Space 2 (8px)', '--space-2'],
  ['Space 3 (12px)', '--space-3'],
  ['Space 4 (16px)', '--space-4'],
  ['Space 5 (20px)', '--space-5'],
  ['Space 6 (24px)', '--space-6'],
  ['Space 8 (32px)', '--space-8'],
  ['Space 10 (40px)', '--space-10'],
  ['Space 12 (48px)', '--space-12'],
  ['Space 16 (64px)', '--space-16'],
  ['Space 20 (80px)', '--space-20'],
  ['Space 24 (96px)', '--space-24'],
  ['Space 32 (128px)', '--space-32'],
];

function renderSpacing() {
  injectStyle('tokens-story-styles', storyStyles);
  const html = `
    <div class="section-label">Spacing Scale</div>
    ${spacingTokens.map(([name, cssVar]) => spacingRow(name, cssVar)).join('')}
  `;
  return `<div class="story-wrap">${html}</div>`;
}

/* ------------------------------------------------------------------ */
/*  Story: Shadows                                                      */
/* ------------------------------------------------------------------ */

const shadowTokens = [
  ['Shadow SM', '--shadow-sm'],
  ['Shadow MD', '--shadow-md'],
  ['Shadow LG', '--shadow-lg'],
  ['Shadow XL', '--shadow-xl'],
  ['Shadow Glow Warm', '--shadow-glow-warm'],
  ['Shadow Glow Cool', '--shadow-glow-cool'],
];

function renderShadows() {
  injectStyle('tokens-story-styles', storyStyles);
  const html = `
    <div class="section-label">Elevation & Shadow</div>
    ${shadowTokens.map(([name, cssVar]) => shadowRow(name, cssVar)).join('')}
  `;
  return `<div class="story-wrap">${html}</div>`;
}

/* ------------------------------------------------------------------ */
/*  Story: Radii                                                        */
/* ------------------------------------------------------------------ */

const radiiTokens = [
  ['Radius SM (8px)', '--radius-sm'],
  ['Radius MD (16px)', '--radius-md'],
  ['Radius LG (24px)', '--radius-lg'],
  ['Radius XL (32px)', '--radius-xl'],
  ['Radius 2XL (48px)', '--radius-2xl'],
  ['Radius Full (9999px)', '--radius-full'],
];

function renderRadii() {
  injectStyle('tokens-story-styles', storyStyles);
  const html = `
    <div class="section-label">Border Radius</div>
    ${radiiTokens.map(([name, cssVar]) => radiusRow(name, cssVar)).join('')}
  `;
  return `<div class="story-wrap">${html}</div>`;
}

/* ------------------------------------------------------------------ */
/*  Story: Motion                                                       */
/* ------------------------------------------------------------------ */

function renderMotion() {
  injectStyle('tokens-story-styles', storyStyles);
  const durationCombos = [
    ['Fast + Expo', '--duration-fast', '--ease-out-expo'],
    ['Fast + Quart', '--duration-fast', '--ease-out-quart'],
    ['Normal + Expo', '--duration-normal', '--ease-out-expo'],
    ['Normal + Quart', '--duration-normal', '--ease-out-quart'],
    ['Slow + Expo', '--duration-slow', '--ease-out-expo'],
    ['Slow + In-Out', '--duration-slow', '--ease-in-out'],
    ['Slower + Expo', '--duration-slower', '--ease-out-expo'],
  ];
  const html = `
    <div class="section-label">Motion — Hover each box to preview easing</div>
    ${durationCombos.map(([name, d, e]) => motionRow(name, d, e)).join('')}
  `;
  return `<div class="story-wrap">${html}</div>`;
}

/* ------------------------------------------------------------------ */
/*  Storybook export                                                    */
/* ------------------------------------------------------------------ */

export default {
  title: 'Design Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
All CSS custom properties extracted from the Portfolio design system.
Toggle the **Theme** button in the toolbar to preview dark/light values.
        `.trim(),
      },
    },
  },
};

export const Colors = {
  name: 'Colors',
  render: () => renderColors(),
};

export const Spacing = {
  name: 'Spacing',
  render: () => renderSpacing(),
};

export const Shadows = {
  name: 'Shadows & Elevation',
  render: () => renderShadows(),
};

export const Radii = {
  name: 'Border Radius',
  render: () => renderRadii(),
};

export const Motion = {
  name: 'Motion & Easing',
  render: () => renderMotion(),
};
