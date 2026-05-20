import '../tokens/tokens.css';
import './custom-cursor.css';

export default {
  title: 'Interactive/Custom Cursor',
  parameters: {
    docs: {
      description: {
        component: `
Motion-blur custom cursor (Curzr). Smoothly follows the pointer, stretches/rotates according to move speed/direction, and scales up when hovering interactive elements.
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
  gap: 32px;
`;

export const LiveDemo = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = wrapStyle;

    const label = document.createElement('p');
    label.style.cssText = `
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--color-text-secondary);
      text-align: center;
      max-width: 500px;
    `;
    label.textContent = 'Hover over the buttons below to see the custom cursor scale up. Move the mouse quickly to see the motion blur effect.';
    wrap.appendChild(label);

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex; gap: 16px;';

    const btn1 = document.createElement('button');
    btn1.style.cssText = 'padding: 12px 24px; border-radius: 99px; border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text-primary); cursor: none;';
    btn1.textContent = 'Interactive Button';
    btnRow.appendChild(btn1);

    const link1 = document.createElement('a');
    link1.href = '#';
    link1.style.cssText = 'padding: 12px 24px; color: var(--color-accent-warm); text-decoration: underline; cursor: none;';
    link1.textContent = 'Interactive Link';
    btnRow.appendChild(link1);

    wrap.appendChild(btnRow);

    // Custom Cursor HTML structure
    const cursor = document.createElement('div');
    cursor.className = 'curzr';
    cursor.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">
        <defs>
          <filter id="curzr-motion-blur-story" x="-100%" y="-100%" width="400%" height="400%">
            <feGaussianBlur class="curzr-motion-blur" in="SourceGraphic" stdDeviation="0, 0"/>
          </filter>
        </defs>
        <circle cx="15" cy="15" r="10" fill="#ffffff" filter="url(#curzr-motion-blur-story)"/>
      </svg>
    `;
    wrap.appendChild(cursor);

    // Cursor JS Logic (adapted to run inside this story wrapper)
    let animationFrameId;
    setTimeout(() => {
      document.body.classList.add('custom-cursor-active');

      const filter = cursor.querySelector('.curzr-motion-blur');
      const cursorSvg = cursor.querySelector('svg');

      const cursorSize = 30;
      const degrees = 57.296;
      const position = { distanceX: 0, distanceY: 0, pointerX: 0, pointerY: 0 };
      let previousPointerX = 0;
      let previousPointerY = 0;
      let angle = 0;
      let previousAngle = 0;
      let moving = false;

      Object.assign(cursor.style, {
        boxSizing: 'border-box',
        position: 'fixed',
        top: (cursorSize / -2) + 'px',
        left: (cursorSize / -2) + 'px',
        width: cursorSize + 'px',
        height: cursorSize + 'px',
        borderRadius: '50%',
        overflow: 'visible',
        transition: '200ms, transform 2.2ms',
        userSelect: 'none',
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        display: 'block'
      });

      if (cursorSvg) {
        cursorSvg.style.transition = 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
        cursorSvg.style.transformOrigin = 'center';
      }

      const INTERACTIVE_SEL = 'button, a, [role="button"]';

      const onMouseOver = (e) => {
        const el = e.target.closest(INTERACTIVE_SEL);
        if (el) {
          if (cursorSvg) cursorSvg.style.transform = 'scale(3)';
        }
      };

      const onMouseOut = (e) => {
        const el = e.target.closest(INTERACTIVE_SEL);
        if (el && !el.contains(e.relatedTarget)) {
          if (cursorSvg) cursorSvg.style.transform = 'scale(1)';
        }
      };

      wrap.addEventListener('mouseover', onMouseOver);
      wrap.addEventListener('mouseout', onMouseOut);

      let stopTimeout;
      const stop = () => {
        stopTimeout = setTimeout(() => {
          if (filter) filter.setAttribute('stdDeviation', '0, 0');
          moving = false;
        }, 50);
      };

      const onMouseMove = (event) => {
        previousPointerX = position.pointerX;
        previousPointerY = position.pointerY;
        position.pointerX = event.clientX;
        position.pointerY = event.clientY;
        position.distanceX = Math.min(Math.max(previousPointerX - position.pointerX, -20), 20);
        position.distanceY = Math.min(Math.max(previousPointerY - position.pointerY, -20), 20);

        cursor.style.transform = `translate3d(${position.pointerX}px, ${position.pointerY}px, 0)`;

        const unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * degrees;

        if (isNaN(unsortedAngle)) {
          angle = previousAngle;
        } else {
          if (unsortedAngle <= 45) {
            angle = (position.distanceX * position.distanceY >= 0) ? +unsortedAngle : -unsortedAngle;
            if (filter) filter.setAttribute('stdDeviation', `${Math.abs(position.distanceX / 2)}, 0`);
          } else {
            angle = (position.distanceX * position.distanceY <= 0) ? (180 - unsortedAngle) : unsortedAngle;
            if (filter) filter.setAttribute('stdDeviation', `0, ${Math.abs(position.distanceY / 2)}`);
          }
        }

        cursor.style.transform += ` rotate(${angle}deg)`;
        previousAngle = angle;

        if (moving) {
          clearTimeout(stopTimeout);
          stop();
        } else {
          moving = true;
        }
      };

      window.addEventListener('mousemove', onMouseMove);

      // Save listeners for clean teardown
      wrap._cursorCleanup = () => {
        document.body.classList.remove('custom-cursor-active');
        window.removeEventListener('mousemove', onMouseMove);
        wrap.removeEventListener('mouseover', onMouseOver);
        wrap.removeEventListener('mouseout', onMouseOut);
        clearTimeout(stopTimeout);
      };
    }, 100);

    wrap.addEventListener('DOMNodeRemoved', () => {
      if (wrap._cursorCleanup) wrap._cursorCleanup();
    });

    return wrap;
  },
};
