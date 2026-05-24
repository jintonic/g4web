# Developer Guide

## Architecture Overview

g4web is a single-page application built on the official
[Three.js Editor](https://github.com/mrdoob/three.js/tree/master/editor).
The Three.js editor provides the 3D viewport, undo/redo command stack, signal
bus, and UI widget library. g4web adds Geant4-specific functionality on top
without modifying any vendor files.

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
│   ├── SimpleMaterialDatabase.js   # Simple material list
│   ├── CompoundMaterialDatabase.js # Compound material list
│   ├── Storage.js          # Auto-save to local storage
│   ├── FileDropHandler.js  # Drag-and-drop file import
│   ├── Replacement.js      # Empty stub for disabled Three.js modules
│   ├── Menubar.Share.js    # Share / screenshot button
│   └── ShareScreenshotPanel.js
├── css/
│   └── g4ui.css            # Style overrides (higher-specificity CSS)
├── packages/
│   └── geant4-csg/         # Workspace package: Geant4 Three.js geometries
├── vendor/
│   └── threejs/            # Git submodule: Three.js (never modified)
└── vite.config.mjs         # Build config + module alias definitions
```

---

## Non-Destructive Customization

The core rule of this project: **vendor files under `vendor/threejs/` are
never modified**. All customisation is applied through one of the following
mechanisms:

### 1. Vite Module Aliases

`vite.config.mjs` intercepts specific module imports and redirects them to
local replacements:

```javascript
// Disable unused Three.js panels
{ find: './Sidebar.Project.js',    replacement: '.../js/Replacement.js' },
{ find: './Viewport.Pathtracer.js',replacement: '.../js/Replacement.js' },

// Swap in Geant4-specific panels
{ find: './Sidebar.Material.js',   replacement: '.../js/Sidebar.Material.js' },
{ find: './Sidebar.Geometry.js',   replacement: '.../js/Sidebar.Geometry.js' },
```

**When to use:** Replacing an entire vendor module with a custom implementation.

### 2. CSS Variable Overrides

`css/g4ui.css` uses higher CSS specificity to override the Three.js editor's
default styles without touching `vendor/threejs/editor/css/`.

**When to use:** Layout, colour, or typography changes.

### 3. Signal Hooks

The editor exposes a central `signals` event bus. Custom logic can be attached
in `main.js` after the editor is created:

```javascript
editor.signals.objectAdded.add((object) => {
  // Set a default Geant4 material on every new object
  object.userData.g4Material ??= { name: 'G4_AIR' };
});
```

**When to use:** Reactive behaviour triggered by editor events.

### 4. Post-Initialisation DOM Injection

The `LeftPanelSolids` component (`js/Leftbar.js`) appends its DOM node after
the rest of the editor UI is mounted. This lets g4web add entirely new UI
regions without patching the editor's layout code.

---

## Adding a New Geant4 Solid

1. Implement the geometry in `packages/geant4-csg/src/geometries/` following
   the existing pattern (extend `THREE.BufferGeometry`, store Geant4 parameters
   on `this.parameters`).
2. Export it from `packages/geant4-csg/src/index.js`.
3. Import it in `js/Leftbar.js` and add an icon entry to the solid panel.
4. Add a `case` in `js/TGExporter.js` for the new geometry type, producing the
   correct `:solid` line for the `.tg` format.

---

## Adding a New Material Category

Material data lives in:

- `js/SimpleMaterialDatabase.js` — elements and simple NIST materials.
- `js/CompoundMaterialDatabase.js` — multi-component compounds.
- `js/MaterialDatabaseHandler.js` — aggregates both databases and exposes
  `getElements()`, `getMaterialsByCategory()`, and `getMaterial()` APIs.

Add entries to the appropriate database file and update the category
enumeration in `MaterialDatabaseHandler.js` if a new category is needed.

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

## Updating the Three.js Submodule

```bash
# Pull the latest upstream Three.js commit
npm run sync-three

# Rebuild and verify
npm run build
```

Commit the updated submodule pointer as a dedicated pull request so the
diff is easy to review.
