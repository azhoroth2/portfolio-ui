import '../tokens/tokens.css';
import './footer.css';

export default {
  title: 'Components/Footer',
  parameters: {
    docs: {
      description: {
        component: `
Footer component displaying copyright information and a custom made-with attribution. Responsive stack layout on tablet and mobile viewports.
        `.trim(),
      },
    },
  },
};

const wrapStyle = `
  background: var(--color-bg-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Default = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="footer__inner">
        <p class="footer__copyright">© ${new Date().getFullYear()} Stanislav. All rights reserved.</p>
        <p class="footer__made">
          Made in <a href="#" class="footer__made-link">Hugo</a> & <a href="#" class="footer__made-link">Vercel</a>
        </p>
      </div>
    `;

    wrap.appendChild(footer);
    return wrap;
  },
};
