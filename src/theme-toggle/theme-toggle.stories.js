import '../tokens/tokens.css';
import './theme-toggle.css';
import { createThemeToggle } from './ThemeToggle.js';

export default {
  title: 'Components/ThemeToggle',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Circular ghost button that toggles between dark and light themes by swapping \`data-theme\` on \`<html>\`.

Uses sun (☀) icon in dark mode, moon (☾) icon in light mode.
Click the button in the canvas to see the live toggle in action.
        `.trim(),
      },
    },
  },
};

export const Default = {
  name: 'Default',
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;align-items:center;justify-content:center;padding:40px;background:var(--color-bg-primary);border-radius:16px;';
    wrap.appendChild(createThemeToggle());
    return wrap;
  },
};

export const InContext = {
  name: 'In Navbar Context',
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;align-items:center;gap:16px;padding:20px 32px;background:var(--color-nav-scrolled);backdrop-filter:blur(20px);border:1px solid var(--color-border);border-radius:var(--radius-full);';
    const label = document.createElement('span');
    label.style.cssText = 'font-family:var(--font-mono);font-size:11px;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:0.1em;';
    label.textContent = 'Navbar context';
    wrap.appendChild(label);
    wrap.appendChild(createThemeToggle());
    return wrap;
  },
};
