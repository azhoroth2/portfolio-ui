import '../tokens/tokens.css';
import './lightbox.css';

export default {
  title: 'Interactive/Lightbox',
  parameters: {
    docs: {
      description: {
        component: `
Lightbox modal component for image inspection. Clicking an image expands it in a fullscreen overlay with backdrop blur and escape key closing.
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
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const Default = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    // Create a mock image using SVG Data URL
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <rect width="100%" height="100%" fill="#a8b5aa" />
        <circle cx="300" cy="200" r="80" fill="#d4c99d" />
        <text x="50%" y="85%" font-family="sans-serif" font-size="20" fill="#1c1d16" text-anchor="middle">Click to Enlarge Case Study Image</text>
      </svg>
    `.trim();
    const encodedSvg = btoa(unescape(encodeURIComponent(svgContent)));
    const imgDataUrl = `data:image/svg+xml;base64,${encodedSvg}`;

    const label = document.createElement('p');
    label.style.cssText = `
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-tertiary);
    `;
    label.textContent = 'Click the image below to open lightbox';
    wrap.appendChild(label);

    const img = document.createElement('img');
    img.src = imgDataUrl;
    img.alt = 'Portfolio UI Mock Project Case Study';
    img.className = 'image-clickable';
    img.style.cssText = 'width: 300px; height: 200px; border-radius: 8px; border: 1px solid var(--color-border); object-fit: cover;';
    wrap.appendChild(img);

    // Lightbox Overlay Elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image preview');

    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox__img';
    lightboxImg.alt = '';
    lightbox.appendChild(lightboxImg);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox__close';
    closeBtn.setAttribute('aria-label', 'Close image preview');
    closeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    `;
    lightbox.appendChild(closeBtn);

    wrap.appendChild(lightbox);

    // Interactive Lightbox JS logic
    const openLightbox = () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('is-open');
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
    };

    img.addEventListener('click', openLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKeyDown);

    // Teardown
    wrap.addEventListener('DOMNodeRemoved', () => {
      window.removeEventListener('keydown', onKeyDown);
    });

    return wrap;
  },
};
