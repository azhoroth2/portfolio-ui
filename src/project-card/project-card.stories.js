import '../tokens/tokens.css';
import './project-card.css';

function injectFont() {
  if (document.getElementById('pc-font')) return;
  const l = document.createElement('link');
  l.id = 'pc-font';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@600&family=JetBrains+Mono:wght@400&display=swap';
  document.head.appendChild(l);
}

const PLACEHOLDER_IMG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375" viewBox="0 0 600 375"><rect width="600" height="375" fill="#201f1f"/><text x="300" y="195" font-family="monospace" font-size="13" fill="#909378" text-anchor="middle">Project Image</text></svg>`)}`;

function renderCard({ locked = false } = {}) {
  injectFont();
  if (locked) {
    return `
      <div class="project-card">
        <div class="project-card__image project-card__image--locked" style="background:var(--color-bg-tertiary);min-height:200px;">
          <div class="project-card__lock">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input class="project-card__password" type="password" placeholder="Password">
          </div>
        </div>
        <div class="project-card__body">
          <div class="project-card__category">NDA Protected</div>
          <div class="project-card__title">Confidential Project</div>
          <div class="project-card__tagline">This case study is password-protected. Request access to view details.</div>
        </div>
        <div class="project-card__tags">
          <span class="project-card__tag">Enterprise</span>
          <span class="project-card__tag">SaaS</span>
        </div>
      </div>
    `;
  }
  return `
    <div class="project-card">
      <div class="project-card__image">
        <img src="${PLACEHOLDER_IMG}" alt="Project screenshot">
      </div>
      <div class="project-card__body">
        <div class="project-card__category">Product Design</div>
        <div class="project-card__title">Digital Adoption Platform</div>
        <div class="project-card__tagline">Redesigned onboarding flows reducing time-to-value by 40% across enterprise accounts.</div>
      </div>
      <div class="project-card__tags">
        <span class="project-card__tag">UX Research</span>
        <span class="project-card__tag">Design Systems</span>
        <span class="project-card__tag">Enterprise</span>
      </div>
    </div>
  `;
}

function renderStackCard({ wide = false, construction = false } = {}) {
  injectFont();
  return `
    <div class="stack-card${wide ? ' stack-card--wide' : ''}${construction ? ' stack-card--construction' : ''}" style="max-width:${wide ? '700px' : '340px'};">
      <div class="project-card--stack" style="height:100%;">
        <div class="project-card--stack__image-wrap">
          <img class="project-card--stack__image" src="${PLACEHOLDER_IMG}" alt="Project">
        </div>
        <div class="project-card--stack__footer">
          <div class="project-card--stack__title">Enterprise Platform</div>
          <div class="project-card--stack__tagline">Governance & compliance tooling for biotech orgs.</div>
        </div>
      </div>
    </div>
  `;
}

export default {
  title: 'Components/ProjectCard',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Three project card variants used across the portfolio:
- **Default** — image + category label + title + tagline + tags
- **Locked** — password-protected NDA case study
- **Stack** — homepage grid card (standard + wide + under-construction marquee)
      `.trim(),
      },
    },
  },
  argTypes: {
    locked: { control: 'boolean', description: 'Password-locked variant' },
  },
};

export const Default = {
  args: { locked: false },
  render: (args) => {
    injectFont();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:40px;max-width:480px;';
    wrap.innerHTML = renderCard(args);
    return wrap;
  },
};

export const Locked = {
  args: { locked: true },
  render: (args) => {
    injectFont();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:40px;max-width:480px;';
    wrap.innerHTML = renderCard(args);
    return wrap;
  },
};

export const Grid = {
  name: 'Grid (2-column)',
  parameters: { layout: 'fullscreen' },
  render: () => {
    injectFont();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:48px;';
    wrap.innerHTML = `
      <div class="project-grid">
        ${renderCard()}
        ${renderCard({ locked: true })}
      </div>
    `;
    return wrap;
  },
};

export const StackDefault = {
  name: 'Stack / Default',
  render: () => {
    injectFont();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:40px;';
    wrap.innerHTML = renderStackCard();
    return wrap;
  },
};

export const StackWide = {
  name: 'Stack / Wide (featured)',
  render: () => {
    injectFont();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:40px;';
    wrap.innerHTML = renderStackCard({ wide: true });
    return wrap;
  },
};

export const StackConstruction = {
  name: 'Stack / Under Construction',
  render: () => {
    injectFont();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:40px;';
    wrap.innerHTML = renderStackCard({ construction: true });
    return wrap;
  },
};
