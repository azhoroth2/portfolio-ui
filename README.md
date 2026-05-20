# portfolio-ui

> Component library for [azhoroth2/Portfolio](https://github.com/azhoroth2/Portfolio) — design tokens, typography, and interactive components.

[![Chromatic](https://img.shields.io/badge/Chromatic-Storybook-FF4785?logo=storybook&logoColor=white)](https://www.chromatic.com)
[![Built with Storybook](https://img.shields.io/badge/Built%20with-Storybook%208-FF4785?logo=storybook)](https://storybook.js.org)

---

## Stack

| | |
|---|---|
| **Stories** | Storybook 8 · HTML format (no framework) |
| **Styling** | Vanilla CSS · CSS custom properties |
| **Publishing** | Chromatic (visual regression + cloud hosting) |
| **CI** | GitHub Actions → Chromatic on push to `main` |

---

## Components (v1)

| Component | Stories | Status |
|---|---|---|
| 🎨 Design Tokens | Colors · Spacing · Shadows · Radii · Motion | ✅ |
| 🔤 Typography | Scale · Headings · Body · Mono · Tracking | ✅ |
| 🔘 Button | Primary · Secondary · All sizes · All states | ✅ |

---

## Local development

```bash
# Install dependencies
npm install

# Start Storybook dev server (http://localhost:6006)
npm run storybook

# Build static Storybook
npm run build-storybook
```

---

## Chromatic setup

1. Sign up at [chromatic.com](https://www.chromatic.com) (free tier)
2. Create a project linked to `azhoroth2/portfolio-ui`
3. Copy your **project token**
4. Go to GitHub → **Settings → Secrets and variables → Actions**
5. Add a new secret: `CHROMATIC_PROJECT_TOKEN` = your token

From that point, every push to `main` automatically publishes a new Storybook build and runs visual regression checks.

To publish manually:
```bash
npm run chromatic
```

---

## Design principles

This library mirrors the constraints defined in [`PRODUCT.md`](https://github.com/azhoroth2/Portfolio/blob/main/PRODUCT.md):

- **Restraint over decoration** — every token earns its place
- **Quiet confidence** — typography, spacing, and color do the work
- **Precision** — consistent tokens, no loose ends
- **Accessibility** — WCAG AA minimum, dark/light full-fidelity

---

## Adding new components

1. Create `src/<component>/` directory
2. Add `<component>.css` (extracted or new styles)
3. Add `<component>.js` factory function (vanilla JS, no framework)
4. Add `<component>.stories.js` with CSF3 format
5. Push to `main` → Chromatic publishes automatically

---

*Built alongside [azhoroth2/Portfolio](https://github.com/azhoroth2/Portfolio)*
