import '../tokens/tokens.css';
import './social-links.css';

export default {
  title: 'Components/Social Links',
  parameters: {
    docs: {
      description: {
        component: `
Social Links pill row and the text divider "OR" separating socials from contact form. Responsive layout changes from 4 columns on desktop to 2 columns on mobile.
        `.trim(),
      },
    },
  },
};

const wrapStyle = `
  background: var(--color-bg-primary);
  min-height: 100vh;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const icons = {
  linkedin: `<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  dribbble: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56"/></svg>`,
  readcv: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M7 17a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4"/></svg>`,
};

export const DefaultGrid = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    // Contact social row
    const socialDiv = document.createElement('div');
    socialDiv.className = 'contact-social';

    const links = [
      { name: 'LinkedIn', key: 'linkedin', href: '#' },
      { name: 'GitHub', key: 'github', href: '#' },
      { name: 'Dribbble', key: 'dribbble', href: '#' },
      { name: 'Read.cv', key: 'readcv', href: '#' },
    ];

    links.forEach(l => {
      const a = document.createElement('a');
      a.className = 'contact-social__link';
      a.href = l.href;
      a.innerHTML = `${icons[l.key]}<span>${l.name}</span>`;
      socialDiv.appendChild(a);
    });

    wrap.appendChild(socialDiv);

    // Contact "OR" divider
    const orDiv = document.createElement('div');
    orDiv.className = 'contact-or';

    const line1 = document.createElement('div');
    line1.className = 'contact-or__line';

    const label = document.createElement('span');
    label.className = 'contact-or__label';
    label.textContent = 'Or send a message';

    const line2 = document.createElement('div');
    line2.className = 'contact-or__line';

    orDiv.appendChild(line1);
    orDiv.appendChild(label);
    orDiv.appendChild(line2);

    wrap.appendChild(orDiv);

    return wrap;
  },
};
