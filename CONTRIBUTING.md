# Contributing to Geant4 Web UI

Thank you for your interest in contributing! Start with [Getting Started](#getting-started) to run the project locally, then read [Design Philosophy](#design-philosophy) before making any code changes, and follow the [Development Workflow](#development-workflow) section for conventions.

## Architecture Overview

g4web is a single-page application built on the official [Three.js Editor][editor]. The editor provides the 3D viewport, undo/redo command stack, signal bus, and UI widget library. g4web layers Geant4-specific functionality on top **without modifying any vendor files**.

```
g4web/
├── index.html              # Application entry point
├── js/                     # g4web-specific source code
│   ├── main.js             # Bootstraps the editor and g4web modules
│   ├── Leftbar.js          # Left panel with Geant4 solid icons
│   ├── Sidebar.Material.js # Replaces Three.js material panel
│   ├── Sidebar.Geometry.js # Replaces Three.js geometry panel
│   ├── TGExporter.js       # Exports scene to .tg / .mac formats
│   ├── TGExportPanel.js    # Export preview UI panel
│   ├── MaterialDatabaseHandler.js  # NIST material registry
│   ├── SimpleMaterialDatabase.js   # Element data
│   ├── CompoundMaterialDatabase.js # Compound material data
│   ├── Storage.js          # Auto-save to local storage
│   ├── FileDropHandler.js  # Drag-and-drop file import
│   ├── Replacement.js      # Empty stub for disabled Three.js modules
│   ├── Menubar.Share.js    # Share / screenshot menu entry
│   └── ShareScreenshotPanel.js
├── css/
│   └── g4ui.css            # Style overrides (higher-specificity CSS)
├── packages/
│   └── geant4-csg/         # Workspace package: Geant4 Three.js geometries
├── vendor/
│   └── threejs/            # Git submodule: Three.js (never modified)
└── vite.config.mjs         # Build config + module alias definitions
```

## Getting Started

### Prerequisites

| Requirement | Minimum version | Notes                             |
| ----------- | --------------- | --------------------------------- |
| Node.js     | 18.x            | [nodejs.org](https://nodejs.org/) |
| npm         | 9.x             | Bundled with Node.js              |
| Git         | 2.x             | Must support `git submodule`      |

### Installation

```bash
# 1. Clone the repository and its Three.js submodule
git clone --recursive https://github.com/jintonic/g4web.git
cd g4web

# 2. Install dependencies
npm install
```

> **Note:** The `--recursive` flag is required because Three.js is included as a
> Git submodule under `vendor/threejs/`. If you already cloned without it, run:
> `git submodule update --init --recursive`

### Development Server

```bash
# Start the Vite development server with hot-reload
npm run dev
```

Open your browser at `http://localhost:5173` (or the port printed in the terminal).

To build a production bundle:

```bash
npm run build
# Preview the built site locally
npm run preview
```

### Verification

Run the following commands to check code formatting and execute package-level tests:

```bash
# Check code formatting (Prettier)
npm run format:check

# Run tests for all workspace packages (geant4-csg)
npm test

# Verify the production build compiles without errors
npm run build
```

See [docs/verification.md](docs/verification.md) for details on what each check covers.

## Design Philosophy

If we can modify the official [three.js][] [editor][]'s behavior and appearance without changing any original files, we can clearly separate our code from the original code. This will make it easier to adapt updates to the [three.js][] [editor][] in the future.

This non-destructive editor customization is possible through the following methods:

### Vite Module Aliases (Module Swaps)

`vite.config.mjs` intercepts specific Three.js editor module imports and redirects them to local replacements under `js/`. This is the foundational mechanism that lets us replace whole panels and disable unused modules without touching `vendor/threejs/`.

- **Best for**: Replacing an entire vendor module with a custom implementation, or stubbing out modules we don't use.
- **Implementation**: Add or modify an entry under `resolve.alias` in `vite.config.mjs`.

```javascript
// vite.config.mjs (excerpt)
resolve: {
  alias: [
    // Disable unused Three.js panels by aliasing them to empty stubs
    { find: './Sidebar.Project.js',     replacement: '.../js/Replacement.js' },
    { find: './Viewport.Pathtracer.js', replacement: '.../js/Replacement.js' },

    // Swap in Geant4-specific panels
    { find: './Sidebar.Material.js',    replacement: '.../js/Sidebar.Material.js' },
    { find: './Sidebar.Geometry.js',    replacement: '.../js/Sidebar.Geometry.js' },
  ],
}
```

`vite.config.mjs` also defines a `transform` plugin that performs targeted string rewrites on selected vendor files at build time (e.g. swapping `THREE.ObjectLoader` for `G4CSGLoader`, hiding unused menu entries, renaming "Object" → "Volume"). Treat that plugin as a load-bearing part of the customization surface — when updating the Three.js submodule, those string patterns are the first thing to re-verify.

### Global Signal Interception (Logic Hooks)

The `signals` object is the central nervous system of the editor. You can "hook" into any event to trigger Geant4-specific logic.

- **Best for**: Reactive behavior (e.g., "When an object is moved, recalculate dose").
- **Implementation**: Add these in `main.js` after the `editor` instance is created.

```javascript
editor.signals.objectAdded.add((object) => {
  console.log('G4 System: Object detected:', object.name);
  object.userData.geant4Material = 'G4_Galactic';
  object.userData.isSensitiveDetector = false;
});

editor.signals.materialChanged.add((material) => {
  console.log('G4 System: Updating physical volume properties...');
});
```

### Prototype Patching (Behavioral Changes)

Modify a class’s prototype before you create an instance. This changes how every instance of that class behaves globally.

Best for: Changing internal logic of vendor components (e.g., altering how the Sidebar handles panels).

```javascript
import { Sidebar } from 'three/editor/js/Sidebar.js';

// 1. Save the original method
const originalAdd = Sidebar.prototype.add;

// 2. Override the method
Sidebar.prototype.add = function (object) {
  // Custom logic: Hide the default 'Settings' panel to keep UI clean
  if (object.id === 'settings') {
    console.log('G4 UI: Skipping default settings panel');
    return;
  }

  // 3. Execute the original logic so functionality remains
  originalAdd.call(this, object);
};
```

### CSS Variable & Style Overrides

Use a local `css/g4ui.css` to override the editor's appearance using higher specificity.

Best for: Branding, colors, and layout dimensions.

### Post-Initialization DOM Manipulation

Every component (Sidebar, Menubar, Toolbar) has a .dom property. You can inject your own HTML elements into the UI at runtime.

Best for: Adding custom buttons, branding, or status indicators.

```javascript
const menubar = new Menubar(editor);

// Create a custom Geant4 Menu item
const g4Menu = document.createElement('div');
g4Menu.className = 'menu';
g4Menu.innerHTML = '<div class="title">Geant4</div>';
g4Menu.onclick = () => {
  console.log('G4 Command Triggered');
};

// Manually inject it into the Menubar's DOM
menubar.dom.appendChild(g4Menu);
```

### Class Extension

If a component needs massive changes, create a new class that extends the vendor class.

Best for: Creating entirely new functional areas (e.g., a specific "Physics Settings" sidebar).

```javascript
import { Sidebar } from 'three/editor/js/Sidebar.js';

export class G4Sidebar extends Sidebar {
  constructor(editor) {
    super(editor);

    // Add custom styling or initialization
    this.dom.style.borderLeft = '2px solid #004488';
  }
}
```

## Implementation

The [three.js][] [editor][] source code is not included in the [three.js][] npm package, so we include [three.js][]'s git repository as a submodule in the `vendor/threejs` directory to avoid manually adding 10s of MB files in [three.js][]`/{editor,build,examples}` folders to this repository.

```bash
# 1. shallow clone three.js (~370MB still...) into .git/modules/vendor/threejs
# a working copy is created in vendor/threejs
# .gitmodules is created to record the url and working copy path of the submodule
git submodule add --depth 1 https://github.com/mrdoob/three.js.git vendor/threejs
# 2. populate vendor/threejs
# --init: copy settings in .gitmodules (shared) to .git/config (local)
git submodule update --init
# 3. set sparse checkout and shallow clone in .git/config
git config submodule."vendor/threejs".sparseCheckout true
git config submodule."vendor/threejs".shallow true
# only checkout stuff used by editor
cd vendor/threejs
git sparse-checkout set --no-cone '/*' '!/*/' '/build/' '/editor/' '/examples/' '!/examples/*' '!/examples/*/' '/examples/jsm/' '/examples/models/' '!/examples/models/*/' '/examples/models/ldraw/'
```

The stable release of [threejs][] is the tip of its `master` branch, which is buried deep by new commits in the `dev` branch, and cannot be reached by a shallow clone. If we replace `--depth 1` with `-b master`, we will be forced to download the entire history of [threejs][] (> 1GB). `--depth 1` shallow clones the tip of the `dev` branch, which may not be stable. We just hope that the [editor][] part is stable enough.

To pull the latest changes from the [threejs][] repo:

```bash
git submodule update --remote
```

then commit the new pointer in the main repo.

To populate `vendor/threejs` in a newly cloned repository in another machine, skip step 1 and change step 2 to:

```bash
git submodule update --init
```

The rest steps are the same.

The same setting is also applied to the submodule in the devcontainer through the [.devcontainer/co3js.sh](.devcontainer/co3js.sh) script and the `postCreateCommand` in the [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json) file.

[three.js]: https://github.com/mrdoob/three.js
[editor]: https://github.com/mrdoob/three.js/tree/dev/editor

## Development Workflow

### Dependency Management

We use `package-lock.json` to ensure deterministic builds across all environments.

- **Always commit your lockfile:** If you add, remove, or update a dependency, include the updated `package-lock.json` in your commit.
- **Do not edit manually:** This file is automatically generated by npm; manual edits can lead to corruption.

### Code Style & Formatting

We use **Prettier** to enforce a consistent coding style.

- **Automated Formatting:** We use Git hooks to format code automatically (see _Tooling & Automation_ below), but you can also run `npm run format` manually.
- **Vendor Code:** Do not format files in the `vendor/` directory. These are excluded via `.prettierignore` to prevent merge conflicts with upstream libraries like Three.js.

---

## 🛠 Tooling & Automation

We use automated tools to ensure high code quality with minimal manual effort.

### 1. Editor Setup (VS Code / Antigravity / Cursor)

We have included a `.vscode/` configuration folder in this repository. When you open the project in a supported editor:

- **Format on Save:** This is enabled automatically for this workspace.
- **Recommended Extensions:** You will be prompted to install the **Prettier** extension if it is not already active.

### 2. Git Hooks (Husky & lint-staged)

To prevent unformatted code from entering the repository, we use Git hooks:

- **How it works:** When you run `git commit`, a "pre-commit" hook automatically runs Prettier on **only** the files you have staged (`git add`).
- **Syntax Safety:** If a commit fails, it is likely because Prettier encountered a syntax error it couldn't parse. Fix the error in your code and try the commit again.

### 3. Continuous Integration (GitHub Actions)

Every Pull Request is automatically checked by a GitHub Action. If local hooks were bypassed (e.g., using `--no-verify`), the **Code Quality** check on GitHub will fail, and the PR cannot be merged until formatting is corrected.

---

## Contribution Recipes

### Adding a New Geant4 Solid

1. Implement the geometry in `packages/geant4-csg/src/geometries/`, following the existing pattern: extend `THREE.BufferGeometry`, set `this.type = 'G4Foo'`, store Geant4 parameters on `this.parameters`, and expose a static `getEditorConfig()` returning `parameters`, `validate`, and `createGeometry`. Implement `toJSON()` / `fromJSON()` for scene persistence.
2. Export it from `packages/geant4-csg/src/index.js` (both the named export and the `GEOMETRY_CLASSES` map).
3. Import it in `js/Leftbar.js` and add an icon entry to the `solidsShapes` array; drop a thumbnail image into `packages/geant4-csg/images/`.
4. Add a `case` for the new `geometry.type` in `js/TGExporter.js` that produces the correct `:solid` line for the `.tg` format.

### Adding a New Material Category

Material data lives in three modules under `js/`:

- `SimpleMaterialDatabase.js` — pure elements (Z = 1..98); the numeric ID equals the atomic number.
- `CompoundMaterialDatabase.js` — multi-component compounds (NIST, HEP & Nuclear, Space, Bio-Chemical).
- `MaterialDatabaseHandler.js` — aggregates both, assigns IDs within reserved ranges per category, and exposes `getElements()`, `getMaterialsByCategory()`, `getMaterial()`.

To add entries, append to the appropriate database file. To add a new **category**, also extend the `CATEGORY` enum and the `ID_RANGES` map in `MaterialDatabaseHandler.js`, call `registerCategory()` for it, and add it to the category dropdown in `js/Sidebar.Material.js`.

### Updating the Three.js Submodule

```bash
# Pull the latest upstream Three.js commit pinned by the submodule
npm run sync-three

# Rebuild and verify the customization patches still apply
npm run build
```

Commit the updated submodule pointer as a dedicated pull request so the diff is easy to review. If `vite.config.mjs`'s `transform` plugin fails to find one of its string targets, that's the first place to look — upstream may have renamed or restructured the surrounding code.

---

## Technology Stack

| Technology                                           | Role                              |
| ---------------------------------------------------- | --------------------------------- |
| [Vite](https://vite.dev/)                            | Build tool and dev server         |
| [Three.js](https://threejs.org/)                     | 3D rendering and editor framework |
| [Prettier](https://prettier.io/)                     | Code formatting                   |
| [Husky](https://typicode.github.io/husky/)           | Git hook runner                   |
| [lint-staged](https://github.com/okonet/lint-staged) | Pre-commit formatting             |

---

## Pull Request Process

1. **One PR per issue:** Keep pull requests scoped to a single issue or feature so reviews stay focused and history stays easy to bisect. If your work touches multiple issues, open a separate PR for each.
2. **Sync Dependencies:** Ensure all dependencies are correctly listed in `package.json` and `package-lock.json`.
3. **Quality Check:** Verify that your code passes the Prettier check by running:
   ```bash
   npx prettier --check .
   # or
   npm run format:check
   ```
