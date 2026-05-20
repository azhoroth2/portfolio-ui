import '../tokens/tokens.css';
import './badge.css';

function injectFont() {
  if (document.getElementById('badge-font')) return;
  const l = document.createElement('link');
  l.id = 'badge-font';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400&family=JetBrains+Mono:wght@400&display=swap';
  document.head.appendChild(l);
}

export default {
  title: 'Components/Badge',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Three badge patterns used across the portfolio:
- **Status badge** — pulsing dot + mono text (available/unavailable)
- **Tag pill** — small bordered pill for categories and skills
- **Category label** — amber mono uppercase label for project type
      `.trim(),
      },
    },
  },
};

export const StatusBadge = {
  name: 'Status Badge',
  render: () => {
    injectFont();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:40px;display:flex;flex-direction:column;gap:20px;';
    [
      { color: 'success', label: 'Available for work' },
      { color: 'warning', label: 'Partially available' },
      { color: 'accent', label: 'Currently on a project' },
    ].forEach(({ color, label }) => {
      const el = document.createElement('div');
      el.innerHTML = `
        <div class="home-badge">
          <span class="home-badge__dot home-badge__dot--${color}"></span>
          ${label}
        </div>
      `;
      wrap.appendChild(el);
    });
    return wrap;
  },
};

export const TagPill = {
  name: 'Tag Pill',
  render: () => {
    injectFont();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:40px;display:flex;flex-wrap:wrap;gap:8px;';
    ['UX Research', 'Design Systems', 'Biotech', 'Enterprise SaaS', 'Figma', 'Prototyping', 'User Testing'].forEach(t => {
      wrap.innerHTML += `<span class="tag">${t}</span>`;
    });
    return wrap;
  },
};

export const CategoryLabel = {
  name: 'Category Label',
  render: () => {
    injectFont();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:40px;display:flex;flex-direction:column;gap:12px;';
    ['Product Design', 'UX Research', 'Design System', 'Interaction Design'].forEach(c => {
      wrap.innerHTML += `<span class="category-label">${c}</span>`;
    });
    return wrap;
  },
};
