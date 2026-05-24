# Verification

This page describes how to verify that your local setup is working correctly.

## 1. Code Formatting

g4web uses [Prettier](https://prettier.io/) for consistent code style. To check
whether all files conform to the configured style:

```bash
npm run format:check
```

A zero-exit code means all files pass. To auto-fix any formatting issues:

```bash
npm run format
```

The Prettier configuration is in `.prettierrc`. Ignored paths are listed in
`.prettierignore`.

---

## 2. Package-Level Tests

The `geant4-csg` workspace package (under `packages/geant4-csg/`) contains its
own test suite. To run all workspace tests:

```bash
npm test
```

This calls `npm run test --workspaces --if-present`, which only runs in
packages that define a `test` script.

---

## 3. Production Build

To confirm the Vite build pipeline produces a valid bundle:

```bash
npm run build
```

A successful run writes output to `dist/` and exits with code 0. To preview
the built site locally:

```bash
npm run preview
```

---

## 4. CI Verification

Two GitHub Actions workflows run automatically on every pull request and push
to `main`:

| Workflow | File                             | What it checks                                          |
| -------- | -------------------------------- | ------------------------------------------------------- |
| Deploy   | `.github/workflows/deploy.yml`   | `npm install`, `npm run build`, GitHub Pages deployment |
| Prettier | `.github/workflows/prettier.yml` | `npm run format:check`                                  |

The badges on the [README](../README.md) reflect the current status of these
workflows.

---

## 5. Manual Browser Smoke Test

After starting the development server (`npm run dev`), open the URL printed in
the terminal and perform the following checks:

1. The 3D viewport loads and shows the grid/axes helpers.
2. Clicking a solid icon in the left panel adds a mesh to the scene.
3. The _Material_ tab in the sidebar shows the Geant4 material categories.
4. The export button opens the preview panel and both `.tg` and `.mac` tabs are
   populated.

These steps confirm the core user-facing functionality works end-to-end.
