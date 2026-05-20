import '../tokens/tokens.css';
import './skill-tag.css';

export default {
  title: 'Components/Skill Tag',
  parameters: {
    docs: {
      description: {
        component: `
Individual skill tags and grid layout with hover animations. Extracted from the about page skills lists.
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
  gap: 24px;
`;

export const DefaultGrid = {
  name: 'Default Grid',
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    const label = document.createElement('p');
    label.style.cssText = `
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-tertiary);
      margin-bottom: 8px;
    `;
    label.textContent = 'Skills Grid (Responsive)';
    wrap.appendChild(label);

    const grid = document.createElement('div');
    grid.className = 'skills-grid';

    const skills = [
      'Product Strategy',
      'Interaction Design',
      'UX Writing',
      'Frontend Dev',
      'Webflow',
      'User Flows',
      'Information Arch',
      'Visual Design',
      'Prototyping',
      'Figma Systems',
    ];

    skills.forEach(skill => {
      const tag = document.createElement('div');
      tag.className = 'skill-tag';
      tag.textContent = skill;
      grid.appendChild(tag);
    });

    wrap.appendChild(grid);
    return wrap;
  },
};
