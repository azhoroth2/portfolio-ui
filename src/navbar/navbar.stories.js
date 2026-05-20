import '../tokens/tokens.css';
import './navbar.css';

const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">`;

function injectFont() {
  if (document.getElementById('nb-font')) return;
  const d = document.createElement('div');
  d.id = 'nb-font';
  d.innerHTML = fontLink;
  document.head.append(...d.children);
}

const NAV_LINKS = [
  { label: 'Work', href: '#', active: false },
  { label: 'About', href: '#', active: false },
  { label: 'Contact', href: '#', active: false },
];

/* ------------------------------------------------------------------ */
/*  Standard Navbar                                                     */
/* ------------------------------------------------------------------ */

function renderNavbar({ scrolled = false, activeLink = '' } = {}) {
  injectFont();
  return `
    <div style="position:relative;height:80px;background:var(--color-bg-primary);">
      <nav class="navbar${scrolled ? ' scrolled' : ''}" style="position:absolute;">
        <div class="navbar__inner">
          <a class="navbar__logo" href="#">
            <span class="navbar__logo-text">SS</span>
          </a>
          <div class="navbar__links">
            ${NAV_LINKS.map(l => `
              <a href="${l.href}" class="navbar__link${l.label === activeLink ? ' navbar__link--active' : ''}">${l.label}</a>
            `).join('')}
            <a href="#" class="navbar__contact-btn">Hire me</a>
          </div>
        </div>
      </nav>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Pill Navbar                                                         */
/* ------------------------------------------------------------------ */

function renderPill({ activeLink = '' } = {}) {
  injectFont();
  return `
    <div style="position:relative;height:100px;background:var(--color-bg-primary);">
      <div class="nav-cluster" style="position:absolute;">
        <nav class="navbar-pill">
          <div class="navbar-pill__links">
            ${NAV_LINKS.map(l => `
              <a href="${l.href}" class="navbar-pill__link${l.label === activeLink ? ' navbar-pill__link--active' : ''}">${l.label}</a>
            `).join('')}
            <div class="navbar-pill__divider"></div>
            <a href="#" class="navbar-pill__contact">Hire me</a>
          </div>
        </nav>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export default {
  title: 'Components/Navbar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Two navigation variants:
- **Standard** — fixed top bar, becomes frosted glass on scroll
- **Pill** — floating glassmorphism pill used on the homepage and inner pages
        `.trim(),
      },
    },
  },
  argTypes: {
    scrolled: { control: 'boolean', description: 'Scrolled/frosted state' },
    activeLink: {
      control: { type: 'select' },
      options: ['', 'Work', 'About', 'Contact'],
      description: 'Active link',
    },
  },
};

export const Standard = {
  args: { scrolled: false, activeLink: 'Work' },
  render: (args) => renderNavbar(args),
};

export const StandardScrolled = {
  name: 'Standard / Scrolled',
  args: { scrolled: true, activeLink: 'Work' },
  render: (args) => renderNavbar(args),
};

export const Pill = {
  args: { activeLink: 'Work' },
  render: (args) => renderPill(args),
};
