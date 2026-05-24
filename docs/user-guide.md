# User Guide

## Overview

g4web presents a 3D viewport in the centre of the screen, a **left panel** of
Geant4 solid shapes, and a **right sidebar** with _Object_, _Geometry_,
_Material_, and _Script_ tabs for configuration.

---

## 1. Adding a Solid

Click any shape icon in the **left panel** to place it in the 3D scene.
Available shapes include:

| Icon group  | Geant4 solid types                                       |
| ----------- | -------------------------------------------------------- |
| Primitives  | G4Box, G4Tubs, G4Cons, G4Sphere, G4Torus                 |
| Polyhedral  | G4Para, G4Trd, G4Trap, G4Trap4                           |
| Curvilinear | G4Ellipsoid, G4EllipticalTube, G4EllipticalCone, G4Hype  |
| Polysurface | G4Polycone, G4Polyhedra, G4Tet                           |
| Twisted     | G4TwistedBox, G4TwistedTrd, G4TwistedTrap, G4TwistedTubs |

The solid is placed at the cursor position in the scene.

---

## 2. Selecting and Moving Objects

- **Left-click** an object in the viewport to select it.
- Use the **transform gizmo** (top-left toolbar) to translate, rotate, or scale.
- Numeric values can also be edited directly in the _Object_ tab of the sidebar.

---

## 3. Editing Geometry Parameters

1. Select an object in the viewport.
2. Open the **Geometry** tab in the right sidebar.
3. Adjust the dimension parameters (e.g., half-lengths, radii, angles).

Parameters correspond 1-to-1 to Geant4 constructor arguments. Units are in
centimetres for lengths and degrees for angles.

---

## 4. Assigning a Geant4 Material

1. Select an object in the viewport.
2. Open the **Material** tab in the right sidebar.
3. Choose a **Category**:
   - _Elements (Periodic Table)_ — pure elements, e.g. `G4_H`, `G4_Fe`
   - _NIST Compounds_ — pre-defined NIST materials, e.g. `G4_WATER`, `G4_AIR`
   - _HEP & Nuclear_ — detector-specific materials, e.g. `G4_lH2`, `G4_IN2`
   - _Space Materials_ — e.g. `G4_KEVLAR`
   - _Bio-Chemical_ — e.g. `G4_CYTOSINE`
4. Select the desired **material** from the drop-down list.

The selected material is stored in `object.userData.g4Material` and serialised
with the scene.

---

## 5. Inspecting the Geometry

- **Orbit**: left-click and drag.
- **Zoom**: scroll wheel.
- **Pan**: right-click and drag (or middle-click and drag).
- Use the **View** menu to toggle helpers (grid, axes, etc.).

---

## 6. Saving the Scene

The scene is **auto-saved** to browser local storage as you work. To save it as
a JSON file for backup or sharing, use **File → Export → Scene (JSON)** from
the Three.js Editor menubar.

---

## 7. Exporting for Geant4

g4web can export the scene to two files:

### `detector.tg` — Text-based Geometry

A human-readable geometry description accepted by
[GEARS](https://github.com/jintonic/gears) and other tools that support the
GEANT4 Text-based Geometry format.

### `run.mac` — Geant4 macro

A starter macro that initialises the geometry, configures a gamma-ray source,
and runs 100 events.

**To export:**

1. Click the **Export** button (or use the export entry in the menu).
2. A preview panel shows both the `.tg` and `.mac` content.
3. Use the **download** buttons to save the files to your computer.

For details on the `.tg` format and further simulation steps, see
[docs/geometry-export.md](geometry-export.md).

---

## 8. Importing Geometry

Drag and drop a previously exported `.json` scene file, or a supported 3D file
(OBJ, STL, GLTF), onto the viewport to import it.

---

## Keyboard Shortcuts

| Key            | Action                 |
| -------------- | ---------------------- |
| `W`            | Move (translate) mode  |
| `E`            | Rotate mode            |
| `R`            | Scale mode             |
| `Del`          | Delete selected object |
| `Ctrl+Z`       | Undo                   |
| `Ctrl+Shift+Z` | Redo                   |
| `Ctrl+S`       | Save to local storage  |
