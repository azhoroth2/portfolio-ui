import '../tokens/tokens.css';
import './dot-grid.css';

export default {
  title: 'Interactive/Dot Grid Canvas',
  parameters: {
    docs: {
      description: {
        component: `
Interactive Dot Grid background canvas. Renders dots that get pushed away by the user's mouse and slowly return to their original position using spring physics.
        `.trim(),
      },
    },
  },
};

const wrapStyle = `
  background: var(--color-bg-primary);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LiveDemo = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    const label = document.createElement('p');
    label.style.cssText = `
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text-secondary);
      z-index: 10;
      pointer-events: none;
      background: var(--color-bg-secondary);
      padding: 16px 24px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    `;
    label.textContent = 'Move your cursor around to interact with the background dots';
    wrap.appendChild(label);

    const canvas = document.createElement('canvas');
    canvas.className = 'dot-grid-canvas';
    canvas.id = 'dot-grid-canvas-story';
    wrap.appendChild(canvas);

    // Grid rendering logic inside Storybook
    let animId;
    setTimeout(() => {
      const ctx = canvas.getContext('2d');
      const SPACING = 40;
      const DOT_RADIUS = 1.2;
      const MOUSE_RADIUS = 120;
      const PUSH_STRENGTH = 28;
      const RETURN_SPEED = 0.08;

      const mouse = { x: -9999, y: -9999 };
      let dots = [];
      let cols, rows;
      const dpr = window.devicePixelRatio || 1;

      const getDotColor = () => {
        return getComputedStyle(document.documentElement)
          .getPropertyValue('--color-text-tertiary').trim() || '#909378';
      };

      const buildGrid = () => {
        const rect = wrap.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        cols = Math.ceil(w / SPACING) + 1;
        rows = Math.ceil(h / SPACING) + 1;

        dots = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            dots.push({
              originX: c * SPACING,
              originY: r * SPACING,
              x: c * SPACING,
              y: r * SPACING,
            });
          }
        }
      };

      const draw = () => {
        const rect = wrap.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = getDotColor();

        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const dx = dot.originX - mouse.x;
          const dy = dot.originY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const force = (1 - dist / MOUSE_RADIUS) * PUSH_STRENGTH;
            const angle = Math.atan2(dy, dx);
            dot.x = dot.originX + Math.cos(angle) * force;
            dot.y = dot.originY + Math.sin(angle) * force;
          } else {
            dot.x += (dot.originX - dot.x) * RETURN_SPEED;
            dot.y += (dot.originY - dot.y) * RETURN_SPEED;
          }

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }

        animId = requestAnimationFrame(draw);
      };

      // Event Listeners on the wrap container
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      wrap.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
      });

      window.addEventListener('resize', buildGrid);

      buildGrid();
      draw();
    }, 100);

    // Storybook teardown callback when story changes
    wrap.addEventListener('DOMNodeRemoved', () => {
      if (animId) cancelAnimationFrame(animId);
    });

    return wrap;
  },
};
