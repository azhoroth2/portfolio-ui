import '../tokens/tokens.css';
import '../button/button.css';
import './cta.css';

export default {
  title: 'Components/CTA Section',
  parameters: {
    docs: {
      description: {
        component: `
CTA (Call to Action) sections used at the bottom of pages to guide users to the contact page.
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
  gap: 64px;
`;

export const Default = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    // 1. Standard CTA Section
    const ctaSec1 = document.createElement('div');
    const label1 = document.createElement('p');
    label1.style.cssText = `
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-tertiary);
      margin-bottom: 24px;
      text-align: center;
    `;
    label1.textContent = 'Standard CTA Section';
    ctaSec1.appendChild(label1);

    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'cta';
    ctaDiv.innerHTML = `
      <h2 class="cta__title">Let's build something great</h2>
      <p class="cta__subtitle">Interested in working together or just want to chat? Drop a line and I'll get back to you.</p>
      <a href="#" class="btn-primary">GET IN TOUCH →</a>
    `;
    ctaSec1.appendChild(ctaDiv);
    wrap.appendChild(ctaSec1);

    // 2. Home Page CTA
    const ctaSec2 = document.createElement('div');
    const label2 = document.createElement('p');
    label2.style.cssText = label1.style.cssText;
    label2.textContent = 'Homepage CTA Section';
    ctaSec2.appendChild(label2);

    const homeCtaDiv = document.createElement('div');
    homeCtaDiv.className = 'home-cta';
    homeCtaDiv.innerHTML = `
      <div class="home-cta__inner">
        <h2 class="home-cta__title">Let's work together</h2>
        <p class="home-cta__sub">Have a project or an opportunity? I'd love to hear about it.</p>
        <a href="#" class="btn-primary" style="text-transform: uppercase; letter-spacing: 0.08em;">GET IN TOUCH →</a>
      </div>
    `;
    ctaSec2.appendChild(homeCtaDiv);
    wrap.appendChild(ctaSec2);

    // Add glow logic to buttons in stories
    setTimeout(() => {
      const attachGlow = (btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          btn.style.setProperty('--glow-x', `${x}%`);
          btn.style.setProperty('--glow-y', `${y}%`);
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.removeProperty('--glow-x');
          btn.style.removeProperty('--glow-y');
        });
      };
      wrap.querySelectorAll('.btn-primary').forEach(attachGlow);
    }, 100);

    return wrap;
  },
};
