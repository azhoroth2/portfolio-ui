import '../tokens/tokens.css';
import './timeline.css';

export default {
  title: 'Components/Timeline',
  parameters: {
    docs: {
      description: {
        component: `
Experience Timeline component showcasing career steps, with support for active/current role status.
        `.trim(),
      },
    },
  },
};

const wrapStyle = `
  background: var(--color-bg-primary);
  min-height: 100vh;
  padding: 48px;
`;

export const Default = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    const timeline = document.createElement('div');
    timeline.className = 'timeline';

    const items = [
      {
        company: 'Stripe',
        location: 'San Francisco, CA',
        role: 'Senior Product Designer',
        period: '2023 — Present',
        isCurrent: true,
        description: 'Leading design efforts on billing and subscriptions for global enterprise merchants.',
        bullets: [
          'Redesigned checkout flows improving conversion rate by 14%.',
          'Collaborated closely with PM and Engineering on Stripe Tax features.',
          'Mentored junior designers and established billing design patterns.',
        ],
      },
      {
        company: 'Vercel',
        location: 'Remote',
        role: 'Product Designer',
        period: '2021 — 2023',
        description: 'Worked on developer experience and Next.js dashboards.',
        bullets: [
          'Designed Vercel Analytics dashboard from scratch.',
          'Maintained and contributed to Vercel design system components.',
        ],
      },
      {
        company: 'Linear',
        location: 'Remote',
        role: 'UX Designer',
        period: '2019 — 2021',
        description: 'Collaborated on product flow redesigns and desktop app integrations.',
        bullets: [],
      },
    ];

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = `timeline__item ${item.isCurrent ? 'timeline__item--current' : ''}`;

      const dot = document.createElement('div');
      dot.className = 'timeline__dot';
      el.appendChild(dot);

      const header = document.createElement('div');
      header.className = 'timeline__header';

      const meta = document.createElement('div');
      meta.className = 'timeline__meta';

      const comp = document.createElement('span');
      comp.className = 'timeline__company-name';
      comp.textContent = item.company;

      const loc = document.createElement('span');
      loc.className = 'timeline__location';
      loc.textContent = `· ${item.location}`;

      const role = document.createElement('div');
      role.className = 'timeline__role';
      role.textContent = item.role;

      meta.appendChild(comp);
      meta.appendChild(loc);
      meta.appendChild(role);

      const period = document.createElement('div');
      period.className = 'timeline__period';
      period.textContent = item.period;

      header.appendChild(meta);
      header.appendChild(period);
      el.appendChild(header);

      const body = document.createElement('div');
      body.className = 'timeline__body';

      if (item.description) {
        const desc = document.createElement('p');
        desc.className = 'timeline__description';
        desc.textContent = item.description;
        body.appendChild(desc);
      }

      if (item.bullets && item.bullets.length > 0) {
        const bulletsList = document.createElement('ul');
        bulletsList.className = 'timeline__bullets';
        item.bullets.forEach(b => {
          const li = document.createElement('li');
          li.textContent = b;
          bulletsList.appendChild(li);
        });
        body.appendChild(bulletsList);
      }

      el.appendChild(body);
      timeline.appendChild(el);
    });

    wrap.appendChild(timeline);
    return wrap;
  },
};
