# @chitrashensah/geant4-csg

[![npm version](https://img.shields.io/npm/v/@chitrashensah/geant4-csg.svg)](https://www.npmjs.com/package/@chitrashensah/geant4-csg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Geant4 solid geometries for Three.js — detector modeling for web-based particle physics simulations.

## Installation

```bash
npm install three @chitrashensah/geant4-csg
```

## Available Geometries

| Class              | Geant4 Equivalent | Description                       |
| ------------------ | ----------------- | --------------------------------- |
| `G4Box`            | G4Box             | Rectangular box                   |
| `G4Tubs`           | G4Tubs            | Cylindrical tube section          |
| `G4Cons`           | G4Cons            | Conical section                   |
| `G4Sphere`         | G4Sphere          | Spherical sector                  |
| `G4Torus`          | G4Torus           | Torus section                     |
| `G4Para`           | G4Para            | Parallelepiped                    |
| `G4Trd`            | G4Trd             | Trapezoid                         |
| `G4Trap`           | G4Trap            | Generic trapezoid                 |
| `G4Trap4`          | G4Trap (4-param)  | Simple trapezoid                  |
| `G4Ellipsoid`      | G4Ellipsoid       | Triaxial ellipsoid                |
| `G4EllipticalTube` | G4EllipticalTube  | Elliptical tube                   |
| `G4EllipticalCone` | G4EllipticalCone  | Elliptical cone                   |
| `G4Hype`           | G4Hype            | Hyperboloid                       |
| `G4Tet`            | G4Tet             | Tetrahedron                       |
| `G4Polycone`       | G4Polycone        | Multi-section solid of revolution |
| `G4Polyhedra`      | G4Polyhedra       | Polygonal prism                   |
| `G4TwistedBox`     | G4TwistedBox      | Twisted box                       |
| `G4TwistedTrd`     | G4TwistedTrd      | Twisted trapezoid                 |
| `G4TwistedTrap`    | G4TwistedTrap     | Twisted generic trapezoid         |
| `G4TwistedTubs`    | G4TwistedTubs     | Twisted tube                      |

## Quick Start

```javascript
import * as THREE from 'three';
import { G4Tubs, G4Sphere, G4Box } from '@chitrashensah/geant4-csg';

// Cylindrical tube: G4Tubs(name, rMin, rMax, halfZ, startPhi, deltaPhi)
const tube = new G4Tubs('myTube', 0.5, 1.0, 1.0, 0, 360);

// Sphere: G4Sphere(name, rMin, rMax, startPhi, deltaPhi, startTheta, deltaTheta)
const sphere = new G4Sphere('mySphere', 0, 1.0, 0, 360, 0, 180);

// Box: G4Box(name, halfX, halfY, halfZ)
const box = new G4Box('myBox', 1.0, 1.0, 1.0);

// All geometries extend THREE.BufferGeometry
const mesh = new THREE.Mesh(tube, new THREE.MeshStandardMaterial());
scene.add(mesh);
```

All dimensions are in **centimeters**. All angles are in **degrees**.

## Scene Persistence with G4CSGLoader

By default, Three.js `ObjectLoader` does not know how to deserialize custom geometry types. Use `G4CSGLoader` to correctly save and reload scenes containing Geant4 geometries:

```javascript
import { G4CSGLoader } from '@chitrashensah/geant4-csg';

// Replace THREE.ObjectLoader with G4CSGLoader when loading scenes
const loader = new G4CSGLoader();
const scene = await loader.parseAsync(json.scene);
```

`G4CSGLoader` extends `THREE.ObjectLoader` so it handles all standard Three.js objects identically — only custom Geant4 geometry types are handled differently.

## Editor Integration

All geometries expose a static `getEditorConfig()` method for building parameter UIs dynamically:

```javascript
import { getEditorConfig, GEOMETRY_CLASSES } from '@chitrashensah/geant4-csg';

// Get config for a specific geometry type
const config = getEditorConfig('G4Tubs', SetGeometryCommand);

// config.parameters — parameter definitions with labels, min, max, step, defaults
// config.validate   — validation function to enforce constraints
// config.createGeometry — factory function to build the geometry from params
```

## JSON Serialization

All geometries support `toJSON` and `fromJSON` for scene serialization:

```javascript
// Serialize
const json = geometry.toJSON();

// Deserialize
const geometry = G4Tubs.fromJSON(json);
```

## Contributing

Contributions welcome. Please open an issue or pull request on [GitHub](https://github.com/chitrashensah/g4web_shapes).

## License

MIT © [Chitrashen Sah](https://github.com/chitrashensah)

## Author

**Chitrashen Sah** — Research Assistant, Physics Department, University of South Dakota

Developed as part of the [Geant4 Web Project](https://physino.xyz/g4web) — a web-based particle physics detector simulation platform built on Geant4 and Three.js.

## Acknowledgments

- **CSG Implementation** — Based on [THREE-CSGMesh](https://github.com/Sean-Bradley/THREE-CSGMesh) by Sean Bradley (MIT License), derived from original work by Evan Wallace
- **Dr. Jing Liu** — Advisor, USD Physics Department
- **Geant4 Collaboration**
- **Three.js Community**
