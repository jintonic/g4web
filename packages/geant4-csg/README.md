# @chitrashensah/geant4-csg

[![npm version](https://img.shields.io/npm/v/@chitrashensah/geant4-csg.svg)](https://www.npmjs.com/package/@chitrashensah/geant4-csg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Geant4 solid geometries for Three.js - detector modeling

## 🚀 Installation

```bash
npm install three @chitrashensah/geant4-csg
```

## 📖 Quick Start

```javascript
import * as THREE from 'three';
import { SphereGeometry } from '@chitrashensah/geant4-csg';

// Full sphere: SphereGeometry(pRMin, pRMax, pSTheta, pDTheta, pSPhi, pDPhi)
const sphere = new SphereGeometry(0, 50, 0, 180, 0, 360);
const mesh = new THREE.Mesh(sphere, new THREE.MeshStandardMaterial());
scene.add(mesh);
```

## 🤝 Contributing

Contributions welcome! Please open an issue or pull request.

## 📝 License

MIT © [Chitrashen Sah](https://github.com/chitrashensah)

## 👨‍💻 Author

**Chitrashen Sah** - Research Assistant, Physics Department, University of South Dakota

Developed as part of the [g4web Project](https://github.com/jintonic/g4web) - web-based particle physics simulation platform.

## 🙏 Acknowledgments

- **CSG Implementation**: Based on [THREE-CSGMesh](https://github.com/Sean-Bradley/THREE-CSGMesh) by Sean Bradley (MIT License), derived from original work by Evan Wallace
- **Dr. Jing Liu** - Advisor, USD Physics Department
- **Geant4 Collaboration**
- **Three.js Community**
