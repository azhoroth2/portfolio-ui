import '../src/tokens/tokens.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  // Global theme toolbar
  globalTypes: {
    theme: {
      description: 'Portfolio theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark',  title: 'Dark',  icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },

  // Wrap every story in a themed div with proper background
  decorators: [
    (storyFn, context) => {
      const theme = context.globals.theme || 'dark';

      // Set theme on root so CSS vars resolve correctly
      document.documentElement.setAttribute('data-theme', theme);

      // Story container
      const wrapper = document.createElement('div');
      wrapper.setAttribute('data-theme', theme);
      wrapper.style.cssText = `
        background: var(--color-bg-primary);
        min-height: 100vh;
        color: var(--color-text-primary);
        font-family: var(--font-body);
        -webkit-font-smoothing: antialiased;
        transition: background 0.4s ease, color 0.4s ease;
      `;

      const story = storyFn();
      if (typeof story === 'string') {
        wrapper.innerHTML = story;
      } else if (story instanceof Node) {
        wrapper.appendChild(story);
      } else {
        wrapper.innerHTML = String(story);
      }

      return wrapper;
    },
  ],

  parameters: {
    // Turn off the default light/dark background switcher — our theme toolbar handles it
    backgrounds: { disable: true },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },

    layout: 'centered',
  },
};

export default preview;
