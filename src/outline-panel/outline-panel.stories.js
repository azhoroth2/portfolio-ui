import '../tokens/tokens.css';
import './outline-panel.css';

export default {
  title: 'Interactive/Outline Panel',
  parameters: {
    docs: {
      description: {
        component: `
Outline Panel / Table of Contents widget for Case Studies. Suspended on the left side of the screen on desktop. Hovering over the list icon slides open the menu. On tablets it floats above the button, and on mobile it transforms into a native bottom sheet.
        `.trim(),
      },
    },
  },
};

const wrapStyle = `
  background: var(--color-bg-primary);
  min-height: 100vh;
  position: relative;
  padding: 48px;
`;

export const Default = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    // Inside storybook, let's also render a fake case study content to scroll/click
    const content = document.createElement('div');
    content.style.cssText = `
      max-width: 600px;
      margin: 0 auto;
      font-family: var(--font-body);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
      padding-left: 100px;
    `;
    content.innerHTML = `
      <h1 style="color:var(--color-text-primary); margin-bottom:16px;">Case Study: Stripe Billing</h1>
      <p style="margin-bottom:24px;">This is a demonstration of the outline panel. On the left side of the viewport, you will see a list icon. Hover over it to slide open the navigation panel. On tablet or mobile, check the viewport controls to see it rearrange itself to the bottom right / bottom sheet.</p>
      <h2 style="color:var(--color-text-primary); margin-top:32px; margin-bottom:12px;">01. Overview</h2>
      <p style="margin-bottom:24px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat.</p>
      <h2 style="color:var(--color-text-primary); margin-top:32px; margin-bottom:12px;">02. Research</h2>
      <p style="margin-bottom:24px;">Integer interdum dictum elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra.</p>
      <h2 style="color:var(--color-text-primary); margin-top:32px; margin-bottom:12px;">03. Execution</h2>
      <p style="margin-bottom:24px;">Proin hendrerit vel nisl ut porta. Quisque eget rhoncus augue, non laoreet nulla.</p>
    `;
    wrap.appendChild(content);

    // Outline Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'outline-backdrop';
    wrap.appendChild(backdrop);

    // Outline Wrap
    const outlineWrap = document.createElement('div');
    outlineWrap.className = 'outline-wrap is-active';

    // Outline Pill button
    const pill = document.createElement('button');
    pill.className = 'outline-pill';
    pill.type = 'button';
    pill.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
      <span class="outline-pill__label">Outline</span>
    `;
    outlineWrap.appendChild(pill);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'outline-panel';
    panel.innerHTML = `
      <h3 class="outline-panel__label">Outline</h3>
      <ul class="outline-panel__list">
        <li><a href="#" class="outline-panel__link is-active" data-sec="overview">01. Overview</a></li>
        <li><a href="#" class="outline-panel__link" data-sec="research">02. Research</a></li>
        <li><a href="#" class="outline-panel__link" data-sec="execution">03. Execution</a></li>
      </ul>
    `;
    outlineWrap.appendChild(panel);
    wrap.appendChild(outlineWrap);

    // Interaction JS code
    setTimeout(() => {
      // Toggle for mobile/tablet drawer-open
      const toggleDrawer = () => {
        const isOpen = outlineWrap.classList.contains('drawer-open');
        if (isOpen) {
          outlineWrap.classList.remove('drawer-open');
          backdrop.classList.remove('is-visible');
        } else {
          outlineWrap.classList.add('drawer-open');
          backdrop.classList.add('is-visible');
        }
      };

      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDrawer();
      });

      backdrop.addEventListener('click', () => {
        outlineWrap.classList.remove('drawer-open');
        backdrop.classList.remove('is-visible');
      });

      // Clicking link updates active item
      const links = panel.querySelectorAll('.outline-panel__link');
      links.forEach(l => {
        l.addEventListener('click', (e) => {
          e.preventDefault();
          links.forEach(link => link.classList.remove('is-active'));
          l.classList.add('is-active');

          // On mobile, close sheet when link is tapped
          if (window.innerWidth <= 1099) {
            outlineWrap.classList.remove('drawer-open');
            backdrop.classList.remove('is-visible');
          }
        });
      });
    }, 100);

    return wrap;
  },
};
