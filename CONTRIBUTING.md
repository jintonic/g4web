# Contributing to Geant4 Web UI

Thank you for your interest in contributing! Please read the [Design Philosophy](#design-philosophy) section below to understand the recommended way to modify the code, and then follow the [Development Workflow](#development-workflow) section to make changes.

## Design Philosophy

If we can modify the official [three.js][] [editor][]'s behavior and appearance without changing any original files, we can clearly separate our code from the original code. This will make it easier to adapt updates to the [three.js][] [editor][] in the future.

This non-destructive editor customization is possible through the following methods:

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

## Pull Request Process

1. **Sync Dependencies:** Ensure all dependencies are correctly listed in `package.json` and `package-lock.json`.
2. **Quality Check:** Verify that your code passes the Prettier check by running:
   ```bash
   npx prettier --check .
   # or
   npm run format:check
   ```
