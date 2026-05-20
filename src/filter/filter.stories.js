import '../tokens/tokens.css';
import './filter.css';

export default {
  title: 'Components/Filters & Tags',
  parameters: {
    docs: {
      description: {
        component: `
Category filters, tag filters, and skill tags. Extracted from the homepage portfolio category selectors and the about page skills lists.
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
  gap: 40px;
`;

export const InteractiveFilters = {
  name: 'Interactive Filters',
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    // 1. Category Filter Section
    const catSec = document.createElement('div');
    const catLabel = document.createElement('p');
    catLabel.style.cssText = `
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-tertiary);
      margin-bottom: 16px;
    `;
    catLabel.textContent = 'Category Filter';
    catSec.appendChild(catLabel);

    const catDiv = document.createElement('div');
    catDiv.className = 'category-filter';

    const categories = ['All', 'Product', 'SaaS', 'Branding', 'Mobile'];
    categories.forEach((cat, idx) => {
      const btn = document.createElement('button');
      btn.className = `category-filter__btn ${idx === 0 ? 'category-filter__btn--active' : ''}`;
      btn.textContent = cat;
      btn.type = 'button';
      btn.addEventListener('click', () => {
        catDiv.querySelectorAll('.category-filter__btn').forEach(b => {
          b.classList.remove('category-filter__btn--active');
        });
        btn.classList.add('category-filter__btn--active');
      });
      catDiv.appendChild(btn);
    });
    catSec.appendChild(catDiv);
    wrap.appendChild(catSec);

    // 2. Tag Filter Section
    const tagSec = document.createElement('div');
    const tagLabel = document.createElement('p');
    tagLabel.style.cssText = `
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-tertiary);
      margin-bottom: 16px;
    `;
    tagLabel.textContent = 'Tag Filter';
    tagSec.appendChild(tagLabel);

    const tagDiv = document.createElement('div');
    tagDiv.className = 'tag-filter';

    const tags = ['All', 'UX Research', 'Figma', 'Prototyping', 'User Testing', 'Design System'];
    tags.forEach((tag, idx) => {
      const btn = document.createElement('button');
      btn.className = `tag-filter__btn ${idx === 0 ? 'tag-filter__btn--active' : ''}`;
      btn.textContent = tag;
      btn.type = 'button';
      btn.addEventListener('click', () => {
        tagDiv.querySelectorAll('.tag-filter__btn').forEach(b => {
          b.classList.remove('tag-filter__btn--active');
        });
        btn.classList.add('tag-filter__btn--active');
      });
      tagDiv.appendChild(btn);
    });
    tagSec.appendChild(tagDiv);
    wrap.appendChild(tagSec);

    // 3. Skill Tags Section
    const skillSec = document.createElement('div');
    const skillLabel = document.createElement('p');
    skillLabel.style.cssText = `
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-tertiary);
      margin-bottom: 16px;
    `;
    skillLabel.textContent = 'Skill Tags Grid (Hover Lift)';
    skillSec.appendChild(skillLabel);

    const skillDiv = document.createElement('div');
    skillDiv.className = 'skills-grid';

    const skills = [
      'Product Strategy',
      'Interaction Design',
      'UX Writing',
      'Frontend Dev',
      'Webflow',
      'User Flows',
      'Information Arch',
      'Visual Design',
    ];
    skills.forEach(skill => {
      const tag = document.createElement('div');
      tag.className = 'skill-tag';
      tag.textContent = skill;
      skillDiv.appendChild(tag);
    });
    skillSec.appendChild(skillDiv);
    wrap.appendChild(skillSec);

    return wrap;
  },
};
