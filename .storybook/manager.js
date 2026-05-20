import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const portfolioTheme = create({
  base: 'dark',

  // Brand
  brandTitle: 'portfolio-ui',
  brandUrl: 'https://github.com/azhoroth2/portfolio-ui',
  brandTarget: '_blank',

  // Colors — matches the portfolio dark palette
  colorPrimary: '#f5c518',   // --color-accent-warm
  colorSecondary: '#f5c518',

  // UI
  appBg:         '#131313',  // --color-bg-primary
  appContentBg:  '#1c1b1b',  // --color-bg-secondary
  appPreviewBg:  '#131313',
  appBorderColor: 'rgba(255, 255, 255, 0.08)',  // --color-border
  appBorderRadius: 8,

  // Text
  textColor:         '#e5e2e1',  // --color-text-primary
  textInverseColor:  '#1a1400',  // --color-text-inverse
  textMutedColor:    '#909378',  // --color-text-tertiary

  // Toolbar
  barTextColor:       '#c6c9ab',  // --color-text-secondary
  barHoverColor:      '#e5e2e1',
  barSelectedColor:   '#f5c518',  // --color-accent-warm
  barBg:              '#1c1b1b',  // --color-bg-secondary

  // Forms
  inputBg:            '#201f1f',  // --color-bg-tertiary
  inputBorder:        'rgba(255, 255, 255, 0.08)',
  inputTextColor:     '#e5e2e1',
  inputBorderRadius:  8,

  // Fonts
  fontBase: '"Inter", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", monospace',
});

addons.setConfig({
  theme: portfolioTheme,
});
