# Installation

This guide covers installation of g4web for local development and self-hosting.

## Prerequisites

| Requirement | Minimum version | Notes                             |
| ----------- | --------------- | --------------------------------- |
| Node.js     | 18.x            | [nodejs.org](https://nodejs.org/) |
| npm         | 9.x             | Bundled with Node.js              |
| Git         | 2.x             | Must support `git submodule`      |

## Clone the Repository

g4web includes the Three.js editor as a Git submodule. You must clone recursively:

```bash
git clone --recursive https://github.com/jintonic/g4web.git
cd g4web
```

If you already cloned without `--recursive`, initialise the submodule manually:

```bash
git submodule update --init --recursive
```

## Install Dependencies

```bash
npm install
```

This installs all root dependencies (Vite, Prettier, Husky, etc.) and resolves
workspace packages (the `geant4-csg` package under `packages/`).

## Start the Development Server

```bash
npm run dev
```

Vite starts a local server (default: `http://localhost:5173`).  
Hot-module replacement is enabled — edits to source files are reflected
immediately without a full page reload.

## Production Build

```bash
npm run build
```

The output is written to `dist/`. To preview it locally before deploying:

```bash
npm run preview
```

## GitHub Pages Deployment

Commits pushed to the `main` branch are automatically built and deployed to
GitHub Pages via the workflow in `.github/workflows/deploy.yml`. The live site
is available at https://jintonic.github.io/g4web/.

No manual deployment step is required.

## Updating Three.js

Three.js is pinned as a Git submodule. To pull the latest upstream commit:

```bash
npm run sync-three
```

After updating, verify the build still works:

```bash
npm run build
```

Commit the submodule pointer update in a dedicated pull request so the change
can be reviewed independently.

## Troubleshooting

**`git submodule` errors after cloning**

Run `git submodule update --init --recursive` to populate `vendor/threejs/`.

**Port already in use**

Vite will automatically pick the next available port. Check the terminal output
for the actual URL.

**`npm install` fails on Node.js < 18**

Upgrade Node.js. Using [nvm](https://github.com/nvm-sh/nvm) is recommended:

```bash
nvm install 20
nvm use 20
```
