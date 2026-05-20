import '../tokens/tokens.css';
import './protected-gate.css';

export default {
  title: 'Components/Protected Gate',
  parameters: {
    docs: {
      description: {
        component: `
Locked case study gating component. Includes lock SVG icon, password input with focused outline, and interactive shake animation on wrong credentials.
        `.trim(),
      },
    },
  },
};

const wrapStyle = `
  background: var(--color-bg-primary);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Default = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    const gate = document.createElement('div');
    gate.className = 'protected-page';

    const inner = document.createElement('div');
    inner.className = 'protected-page__inner';

    inner.innerHTML = `
      <div class="protected-page__lock">
        <svg viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <h1 class="protected-page__title">Protected Content</h1>
      <p class="protected-page__subtitle">This project is confidential. Please enter the password to view the case study.</p>
      <input type="password" class="protected-page__password" placeholder="Password" id="gate-pass-input">
      <p style="font-size:12px; color:var(--color-text-tertiary); margin-top:8px;">Hint: Type anything except <strong>letmein</strong> to test shake error animation.</p>
    `;

    gate.appendChild(inner);
    wrap.appendChild(gate);

    // Interactive shake validation demo
    setTimeout(() => {
      const input = wrap.querySelector('#gate-pass-input');
      if (input) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            if (input.value === 'letmein') {
              alert('Unlocked successfully!');
              input.value = '';
            } else {
              input.value = '';
              input.classList.add('shake');
              setTimeout(() => {
                input.classList.remove('shake');
              }, 400);
            }
          }
        });
      }
    }, 100);

    return wrap;
  },
};
