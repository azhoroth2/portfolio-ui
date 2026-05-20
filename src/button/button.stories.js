import '../tokens/tokens.css';
import './button.css';
import { createButton, icons } from './Button.js';

const wrapStyle = `
  background: var(--color-bg-primary);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const gridStyle = `
  background: var(--color-bg-primary);
  min-height: 100vh;
  padding: 48px;
`;

/* ------------------------------------------------------------------ */
/*  Storybook meta                                                      */
/* ------------------------------------------------------------------ */

export default {
  title: 'Components/Button',
  parameters: {
    docs: {
      description: {
        component: `
Two-variant button component — **Primary** (amber fill, radial hover glow) and **Secondary** (ghost, border).

Both render as \`<button>\` by default or \`<a>\` when \`href\` is provided.
The primary variant tracks mouse position to paint a directional radial glow on hover.

**Sizes**: \`sm\` · \`md\` (default) · \`lg\`
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
      description: 'Visual variant',
      defaultValue: 'primary',
    },
    label: {
      control: 'text',
      description: 'Button label text',
      defaultValue: 'View Work',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    withIcon: {
      control: 'boolean',
      description: 'Show arrow-right icon',
      defaultValue: false,
    },
    href: {
      control: 'text',
      description: 'When set, renders as <a> tag',
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Render helper                                                       */
/* ------------------------------------------------------------------ */

function renderBtn(args) {
  const { variant, label, size, disabled, withIcon, href } = args;
  const btn = createButton({
    variant,
    label,
    size,
    disabled,
    href,
    iconSvg: withIcon ? icons.arrowRight : '',
  });
  const wrap = document.createElement('div');
  wrap.setAttribute('style', wrapStyle);
  wrap.appendChild(btn);
  return wrap;
}

/* ------------------------------------------------------------------ */
/*  Stories                                                             */
/* ------------------------------------------------------------------ */

export const Primary = {
  args: {
    variant: 'primary',
    label: 'View Work',
    size: 'md',
    disabled: false,
    withIcon: false,
  },
  render: (args) => renderBtn(args),
};

export const PrimaryWithIcon = {
  name: 'Primary / With Icon',
  args: {
    variant: 'primary',
    label: 'View Case Studies',
    size: 'md',
    disabled: false,
    withIcon: true,
  },
  render: (args) => renderBtn(args),
};

export const PrimaryLarge = {
  name: 'Primary / Large',
  args: {
    variant: 'primary',
    label: 'Get in Touch',
    size: 'lg',
    disabled: false,
    withIcon: true,
  },
  render: (args) => renderBtn(args),
};

export const PrimarySmall = {
  name: 'Primary / Small',
  args: {
    variant: 'primary',
    label: 'Contact',
    size: 'sm',
    disabled: false,
    withIcon: false,
  },
  render: (args) => renderBtn(args),
};

export const PrimaryDisabled = {
  name: 'Primary / Disabled',
  args: {
    variant: 'primary',
    label: 'Unavailable',
    size: 'md',
    disabled: true,
    withIcon: false,
  },
  render: (args) => renderBtn(args),
};

export const Secondary = {
  args: {
    variant: 'secondary',
    label: 'Read Case Study',
    size: 'md',
    disabled: false,
    withIcon: false,
  },
  render: (args) => renderBtn(args),
};

export const SecondaryWithIcon = {
  name: 'Secondary / With Icon',
  args: {
    variant: 'secondary',
    label: 'Open LinkedIn',
    size: 'md',
    disabled: false,
    withIcon: true,
  },
  render: (args) => renderBtn(args),
};

export const SecondaryLarge = {
  name: 'Secondary / Large',
  args: {
    variant: 'secondary',
    label: 'Download CV',
    size: 'lg',
    disabled: false,
    withIcon: false,
  },
  render: (args) => renderBtn(args),
};

export const SecondaryDisabled = {
  name: 'Secondary / Disabled',
  args: {
    variant: 'secondary',
    label: 'Unavailable',
    size: 'md',
    disabled: true,
    withIcon: false,
  },
  render: (args) => renderBtn(args),
};

/* ------------------------------------------------------------------ */
/*  Showcase: all variants side by side                                 */
/* ------------------------------------------------------------------ */

export const AllVariants = {
  name: 'All Variants',
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
  render: () => {
    const wrap = document.createElement('div');
    wrap.setAttribute('style', gridStyle);

    const sections = [
      {
        heading: 'Primary',
        items: [
          { label: 'Small', size: 'sm', withIcon: false },
          { label: 'Medium', size: 'md', withIcon: false },
          { label: 'Large', size: 'lg', withIcon: false },
          { label: 'With Icon', size: 'md', withIcon: true },
          { label: 'Disabled', size: 'md', disabled: true },
        ],
        variant: 'primary',
      },
      {
        heading: 'Secondary',
        items: [
          { label: 'Small', size: 'sm', withIcon: false },
          { label: 'Medium', size: 'md', withIcon: false },
          { label: 'Large', size: 'lg', withIcon: false },
          { label: 'With Icon', size: 'md', withIcon: true },
          { label: 'Disabled', size: 'md', disabled: true },
        ],
        variant: 'secondary',
      },
    ];

    sections.forEach(({ heading, items, variant }) => {
      const section = document.createElement('div');
      section.style.cssText = 'margin-bottom: 48px;';

      const h = document.createElement('p');
      h.style.cssText = `
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-text-tertiary);
        margin-bottom: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--color-border);
      `;
      h.textContent = heading;
      section.appendChild(h);

      const row = document.createElement('div');
      row.style.cssText = 'display: flex; align-items: center; flex-wrap: wrap; gap: 16px;';

      items.forEach(({ label, size, withIcon, disabled }) => {
        const container = document.createElement('div');
        container.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';

        const btn = createButton({
          variant,
          label,
          size: size || 'md',
          disabled: disabled || false,
          iconSvg: withIcon ? icons.arrowRight : '',
        });

        const cap = document.createElement('span');
        cap.style.cssText = `
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-text-tertiary);
        `;
        cap.textContent = size + (disabled ? ' · disabled' : '') + (withIcon ? ' · icon' : '');

        container.appendChild(btn);
        container.appendChild(cap);
        row.appendChild(container);
      });

      section.appendChild(row);
      wrap.appendChild(section);
    });

    return wrap;
  },
};
