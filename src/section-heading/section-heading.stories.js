import '../tokens/tokens.css';
import './section-heading.css';

function injectFont() {
  if (document.getElementById('sh-font')) return;
  const l = document.createElement('link');
  l.id = 'sh-font';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@400&display=swap';
  document.head.appendChild(l);
}

function renderHeading({ label = 'Selected Work', title = 'Case Studies', subtitle = '', showSubtitle = true } = {}) {
  injectFont();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'background:var(--color-bg-primary);padding:48px;';
  wrap.innerHTML = `
    <div class="section-heading">
      <span class="section-heading__label">${label}</span>
      <h2 class="section-heading__title">${title}</h2>
      ${showSubtitle && subtitle ? `<p class="section-heading__subtitle">${subtitle}</p>` : ''}
    </div>
  `;
  return wrap;
}

export default {
  title: 'Components/SectionHeading',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Consistent section header pattern: mono uppercase label with leading accent line, bold heading, optional subtitle.
      `.trim(),
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    showSubtitle: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    label: 'Selected Work',
    title: 'Case Studies',
    subtitle: 'Enterprise SaaS products across digital adoption, biotech, and governance.',
    showSubtitle: true,
  },
  render: (args) => renderHeading(args),
};

export const NoSubtitle = {
  name: 'Without Subtitle',
  args: { label: 'Experience', title: 'Where I\'ve Worked', showSubtitle: false, subtitle: '' },
  render: (args) => renderHeading(args),
};

export const AllSections = {
  name: 'All Section Labels',
  parameters: { controls: { disable: true } },
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--color-bg-primary);padding:48px;display:flex;flex-direction:column;gap:48px;';
    [
      { label: 'Selected Work', title: 'Case Studies' },
      { label: 'Experience', title: 'Where I\'ve Worked' },
      { label: 'About', title: 'Who I Am' },
      { label: 'Get in Touch', title: 'Let\'s Talk' },
    ].forEach(({ label, title }) => {
      injectFont();
      const block = document.createElement('div');
      block.innerHTML = `
        <div class="section-heading">
          <span class="section-heading__label">${label}</span>
          <h2 class="section-heading__title">${title}</h2>
        </div>
      `;
      wrap.appendChild(block);
    });
    return wrap;
  },
};
