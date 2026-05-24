# g4web

[![Deploy to GitHub Pages](https://github.com/jintonic/g4web/actions/workflows/deploy.yml/badge.svg)](https://github.com/jintonic/g4web/actions/workflows/deploy.yml)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)

**g4web** is a browser-based graphical user interface for defining detector geometry for [Geant4](https://geant4.web.cern.ch)-based particle physics simulations. It is built on top of the official [Three.js Editor](https://threejs.org/editor/) and extends it with Geant4-specific solid geometries, material assignment, and geometry export to the Text-based Geometry (TG) format accepted by [GEARS](https://github.com/jintonic/gears).

A live demo is available at **https://jintonic.github.io/g4web/**.

---

## Table of Contents

- [What does g4web do?](#what-does-g4web-do)
- [Who is it for?](#who-is-it-for)
- [Features](#features)
- [Installation](#installation)
- [Development Setup](#development-setup)
- [Basic Usage](#basic-usage)
- [Verification](#verification)
- [Screenshots](#screenshots)
- [Citation](#citation)
- [Contributing](#contributing)
- [License](#license)

---

## What does g4web do?

g4web provides a point-and-click interface for constructing Geant4 detector geometries without writing any C++ or macro code. Users can:

- Place and configure Geant4 solid shapes (Box, Tube, Sphere, Cone, Torus, and more) in a 3D viewport.
- Assign Geant4 NIST materials (including elements, compounds, HEP/nuclear materials, space materials, and bio-chemical materials) to volumes.
- Inspect the detector geometry interactively in the browser.
- Export the geometry to `.tg` (Text-based Geometry) and `.mac` (Geant4 macro) files for use with Geant4-based simulation tools such as [GEARS](https://github.com/jintonic/gears).

---

## Who is it for?

g4web is designed for:

- **Experimental physicists** who need to prototype detector geometries quickly without deep C++ expertise.
- **Nuclear and particle physics students** learning Geant4 simulation for the first time.
- **Educators** teaching detector simulation in courses or workshops.
- **Researchers** who use Geant4-based tools (e.g., GEARS) and want a visual geometry editor.

---

## Features

- 20+ Geant4 solid types: `G4Box`, `G4Tubs`, `G4Cons`, `G4Sphere`, `G4Torus`, `G4Para`, `G4Trd`, `G4Trap`, `G4Polycone`, `G4Polyhedra`, `G4Ellipsoid`, twisted solids, and more.
- Full [NIST material database](https://geant4-userdoc.web.cern.ch/UsersGuides/ForApplicationDeveloper/html/Appendix/materialNames.html) browsable by category (elements, NIST compounds, HEP & nuclear, space, bio-chemical).
- Export to `.tg` (Text-based Geometry) and `.mac` (Geant4 run macro) formats.
- Auto-save of the scene to browser local storage.
- File drag-and-drop import.
- Non-destructive customization pattern — vendor (Three.js) files are never modified.
- Deployed automatically to GitHub Pages on every push to `main`.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later and npm (bundled with Node.js).
- [Git](https://git-scm.com/) with submodule support.

### Steps

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

For more detail, see [docs/installation.md](docs/installation.md).

---

## Development Setup

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

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/developer-guide.md](docs/developer-guide.md) for the project's non-destructive customization approach before making UI changes.

---

## Basic Usage

1. **Add a solid** — Click a shape icon in the left panel (e.g., Box) to place it in the scene.
2. **Configure geometry** — Select the object and edit its dimensions in the right sidebar under the _Geometry_ tab.
3. **Assign a material** — Under the _Material_ tab, choose a category and select a Geant4 NIST material.
4. **Inspect in 3D** — Orbit, zoom, and pan in the viewport to verify the geometry.
5. **Export** — Use the export menu to download `detector.tg` and `run.mac` files for use with GEARS or other Geant4 tools.

For a step-by-step walkthrough, see [docs/user-guide.md](docs/user-guide.md) and [examples/README.md](examples/README.md).

---

## Verification

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

---

## Screenshots

![g4web interface screenshot](public/images/G4web.png)

A screenshot of the g4web user interface showing the 3D viewport, left solid palette, and Geant4 material selection panel.

---

## Citation

If you use g4web in research that leads to a publication, please cite:

```bibtex
@article{g4web_joss,
  author  = {Liu, Jing},
  title   = {g4web: A web-based user interface for Geant4 detector definition},
  journal = {Journal of Open Source Software},
  year    = {2026},
  note    = {(submitted)}
}
```

See [CITATION.cff](CITATION.cff) for machine-readable citation metadata.

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first — this project uses a non-destructive customization pattern to keep vendor (Three.js) files pristine.

For bug reports and feature requests, use the [GitHub issue tracker](https://github.com/jintonic/g4web/issues).

---

## License

g4web is licensed under the [GNU Affero General Public License v3.0](LICENSE) (AGPL-3.0).

The bundled Three.js editor (`vendor/threejs/`) is licensed under the [MIT License](vendor/threejs/LICENSE).
