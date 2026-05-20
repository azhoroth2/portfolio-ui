/**
 * Button factory — vanilla JS, no framework.
 * Matches Hugo template output exactly.
 *
 * @param {Object} options
 * @param {'primary'|'secondary'} options.variant
 * @param {string}  options.label
 * @param {string}  [options.href]        - renders as <a> when set
 * @param {'sm'|'md'|'lg'} [options.size] - defaults to 'md'
 * @param {boolean} [options.disabled]
 * @param {string}  [options.iconSvg]     - raw SVG string for leading icon
 * @param {string}  [options.id]
 * @returns {HTMLElement}
 */
export function createButton({
  variant = 'primary',
  label = 'Button',
  href,
  size = 'md',
  disabled = false,
  iconSvg = '',
  id,
} = {}) {
  const tag = href ? 'a' : 'button';
  const el = document.createElement(tag);

  // Base class
  const baseClass = variant === 'secondary' ? 'btn btn-secondary' : 'btn btn-primary';
  const sizeClass =
    size === 'sm' ? ` btn-${variant}--sm` :
    size === 'lg' ? ` btn-${variant}--lg` : '';

  el.className = baseClass + sizeClass;

  if (id) el.id = id;
  if (href) el.href = href;
  if (disabled) {
    el.disabled = true;
    el.setAttribute('aria-disabled', 'true');
  }

  // Icon
  if (iconSvg) {
    const iconWrap = document.createElement('span');
    iconWrap.className = 'btn__icon';
    iconWrap.setAttribute('aria-hidden', 'true');
    iconWrap.innerHTML = iconSvg;
    el.appendChild(iconWrap);
  }

  // Label span (sits above glow layer)
  const labelSpan = document.createElement('span');
  labelSpan.textContent = label;
  el.appendChild(labelSpan);

  // Radial glow — track mouse position for primary buttons
  if (variant === 'primary') {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--glow-x', `${x}%`);
      el.style.setProperty('--glow-y', `${y}%`);
    });
  }

  return el;
}

/* ------------------------------------------------------------------ */
/*  Common icon SVGs (inline, 16×16)                                   */
/* ------------------------------------------------------------------ */

export const icons = {
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  externalLink: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
};
