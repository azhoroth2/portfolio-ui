import '../tokens/tokens.css';
import '../button/button.css';
import './hero.css';

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">`;
function injectFont() {
  if (!document.getElementById('hero-font')) {
    const d = document.createElement('div');
    d.id = 'hero-font';
    d.innerHTML = FONTS;
    document.head.append(...d.children);
  }
}

function renderHero({ withStats = true, withBg = true } = {}) {
  injectFont();
  return `
    <section class="hero" style="background:var(--color-bg-primary);padding:64px 48px;">
      ${withBg ? '<div class="hero__bg"></div>' : ''}
      <div class="hero__content">
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
          Available for work
        </div>
        <h1 class="hero__title">
          Senior Product<br>
          <span class="hero__title-accent">Designer.</span>
        </h1>
        <p class="hero__subtitle">
          7+ years shaping enterprise SaaS — digital adoption, biotech,
          governance, ERP. The work is the signal; the site is the frame.
        </p>
        <div class="hero__actions">
          <a href="#" class="btn btn-primary">View Work</a>
          <a href="#" class="btn btn-secondary">Download CV</a>
        </div>
        ${withStats ? `
        <div class="hero__stats">
          <div>
            <div class="hero__stat-value">7+</div>
            <div class="hero__stat-label">Years experience</div>
          </div>
          <div>
            <div class="hero__stat-value">40+</div>
            <div class="hero__stat-label">Products shipped</div>
          </div>
          <div>
            <div class="hero__stat-value">12</div>
            <div class="hero__stat-label">Enterprise clients</div>
          </div>
        </div>
        ` : ''}
      </div>
    </section>
  `;
}

export default {
  title: 'Components/Hero',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Hero section with pulsing status badge, large heading with accent colour, subtitle, action buttons, and optional stats strip.
      `.trim(),
      },
    },
  },
  argTypes: {
    withStats: { control: 'boolean', description: 'Show stats row' },
    withBg: { control: 'boolean', description: 'Show background gradient blob' },
  },
};

export const Default = {
  args: { withStats: true, withBg: true },
  render: (args) => renderHero(args),
};

export const NoStats = {
  name: 'Without Stats',
  args: { withStats: false, withBg: true },
  render: (args) => renderHero(args),
};

export const NoBg = {
  name: 'Without BG Blob',
  args: { withStats: true, withBg: false },
  render: (args) => renderHero(args),
};
