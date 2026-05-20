import '../tokens/tokens.css';
import '../button/button.css';
import './form.css';

export default {
  title: 'Components/Contact Form',
  parameters: {
    docs: {
      description: {
        component: `
Contact Form fields, textareas, focused states, and validation styles. Renders inputs, labels, and submission button.
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
  gap: 48px;
`;

export const DefaultForm = {
  name: 'Default Form',
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    const buildForm = (statusType = '', statusText = '') => {
      const form = document.createElement('form');
      form.className = 'contact-form';
      form.setAttribute('novalidate', '');
      form.addEventListener('submit', (e) => e.preventDefault());

      const fields = [
        { label: 'Name', type: 'text', placeholder: 'Stanislav' },
        { label: 'Email Address', type: 'email', placeholder: 'stan@example.com' },
      ];

      fields.forEach(f => {
        const group = document.createElement('div');
        group.className = 'form-group';

        const label = document.createElement('label');
        label.textContent = f.label;
        group.appendChild(label);

        const input = document.createElement('input');
        input.type = f.type;
        input.placeholder = f.placeholder;
        group.appendChild(input);

        form.appendChild(group);
      });

      // Message textarea
      const msgGroup = document.createElement('div');
      msgGroup.className = 'form-group';

      const label = document.createElement('label');
      label.textContent = 'Message';
      msgGroup.appendChild(label);

      const textarea = document.createElement('textarea');
      textarea.placeholder = 'How can I help you?';
      msgGroup.appendChild(textarea);
      form.appendChild(msgGroup);

      // Submit Button
      const submitBtn = document.createElement('button');
      submitBtn.className = 'btn-primary form-submit';
      submitBtn.type = 'submit';
      submitBtn.textContent = 'SEND MESSAGE →';
      form.appendChild(submitBtn);

      // Status
      if (statusText) {
        const status = document.createElement('div');
        status.className = `contact-form__status contact-form__status--${statusType}`;
        status.textContent = statusText;
        form.appendChild(status);
      }

      return form;
    };

    const container1 = document.createElement('div');
    const label1 = document.createElement('p');
    label1.style.cssText = `
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-tertiary);
      margin-bottom: 16px;
    `;
    label1.textContent = 'Empty Form';
    container1.appendChild(label1);
    container1.appendChild(buildForm());
    wrap.appendChild(container1);

    const container2 = document.createElement('div');
    const label2 = document.createElement('p');
    label2.style.cssText = label1.style.cssText;
    label2.textContent = 'Form with Success Status';
    container2.appendChild(label2);
    container2.appendChild(buildForm('success', 'Thank you! Your message has been sent successfully.'));
    wrap.appendChild(container2);

    const container3 = document.createElement('div');
    const label3 = document.createElement('p');
    label3.style.cssText = label1.style.cssText;
    label3.textContent = 'Form with Error Status';
    container3.appendChild(label3);
    container3.appendChild(buildForm('error', 'Something went wrong. Please check your email and try again.'));
    wrap.appendChild(container3);

    return wrap;
  },
};
