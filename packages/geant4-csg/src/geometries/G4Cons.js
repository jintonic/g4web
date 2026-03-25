/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Conical section geometry with inner/outer radii at both ends and angular cuts.
 * Equivalent to Geant4's G4Cons.
 *
 * @param {string} pName  - Name of the solid
 * @param {number} pRmin1 - Inner radius at -pDz end in centimeters
 * @param {number} pRmax1 - Outer radius at -pDz end in centimeters
 * @param {number} pRmin2 - Inner radius at +pDz end in centimeters
 * @param {number} pRmax2 - Outer radius at +pDz end in centimeters
 * @param {number} pDz    - Half-length along Z axis in centimeters
 * @param {number} pSPhi  - Starting phi angle in degrees
 * @param {number} pDPhi  - Delta phi angle in degrees
 *
 * Setting pRmin1 = pRmin2 = 0 gives a solid cone.
 * Setting pRmin1 = pRmax1 gives a flat bottom cap (disc).
 * pDPhi < 360 cuts a phi segment out of the cone.
 */

import * as THREE from 'three';
import { CSG } from '../CSGMesh.js';

class G4Cons extends THREE.BufferGeometry {
  constructor(pName, pRmin1, pRmax1, pRmin2, pRmax2, pDz, pSPhi, pDPhi) {
    super();

    const SPhi = (Math.PI * pSPhi) / 180;
    const DPhi = (Math.PI * pDPhi) / 180;

    const maxRadius = Math.max(pRmax1, pRmax2);

    const outerGeometry = new THREE.CylinderGeometry(
      pRmax2,
      pRmax1,
      pDz * 2,
      32,
      32
    );
    const innerGeometry = new THREE.CylinderGeometry(
      pRmin2,
      pRmin1,
      pDz * 2,
      32,
      32
    );

    let resultCSG = CSG.fromGeometry(outerGeometry);

    if (DPhi < Math.PI * 2) {
      const pieShape = new THREE.Shape();
      pieShape.absarc(0, 0, maxRadius, SPhi, SPhi + DPhi, false);
      pieShape.lineTo(0, 0);
      const pieGeometry = new THREE.ExtrudeGeometry(pieShape, {
        depth: pDz * 2,
        bevelEnabled: false,
      });
      pieGeometry.translate(0, 0, -pDz);
      pieGeometry.rotateX(Math.PI / 2);
      resultCSG = resultCSG.intersect(CSG.fromGeometry(pieGeometry));
    }

    if (pRmin1 > 0 || pRmin2 > 0) {
      resultCSG = resultCSG.subtract(CSG.fromGeometry(innerGeometry));
    }

    const finalGeometry = CSG.toGeometry(resultCSG);
    finalGeometry.rotateX(Math.PI / 2);
    finalGeometry.rotateX(Math.PI);
    finalGeometry.type = 'G4Cons';
    finalGeometry.name = pName || 'G4Cons';
    finalGeometry.parameters = {
      pName,
      pRmin1,
      pRmax1,
      pRmin2,
      pRmax2,
      pDz,
      pSPhi,
      pDPhi,
    };

    return finalGeometry;
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'cons',
          geometryKey: 'pName',
        },
        pRmin1: {
          type: 'number',
          label: 'Inside radius at -pDz',
          min: 0,
          max: Infinity,
          step: 0.1,
          default: 0.1,
          geometryKey: 'pRmin1',
        },
        pRmax1: {
          type: 'number',
          label: 'Outside radius at -pDz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.3,
          geometryKey: 'pRmax1',
        },
        pRmin2: {
          type: 'number',
          label: 'Inside radius at +pDz',
          min: 0,
          max: Infinity,
          step: 0.1,
          default: 0.6,
          geometryKey: 'pRmin2',
        },
        pRmax2: {
          type: 'number',
          label: 'Outside radius at +pDz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.8,
          geometryKey: 'pRmax2',
        },
        pDz: {
          type: 'number',
          label: 'Half length in Z',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pDz',
        },
        pSPhi: {
          type: 'angle',
          label: 'Starting phi angle',
          min: 0,
          max: 360,
          step: 5,
          default: 90,
          geometryKey: 'pSPhi',
        },
        pDPhi: {
          type: 'angle',
          label: 'Angle of the segment',
          min: 1,
          max: 360,
          step: 1,
          default: 270,
          geometryKey: 'pDPhi',
        },
      },
      validate: (params) => {
        if (params.pRmax1 <= params.pRmin1)
          params.pRmax1 = params.pRmin1 + 0.01;
        if (params.pRmax2 <= params.pRmin2)
          params.pRmax2 = params.pRmin2 + 0.01;
        if (params.pDz <= 0) params.pDz = 0.01;
        if (params.pDPhi <= 0) params.pDPhi = 1;
        return params;
      },
      createGeometry: (params) => {
        return new G4Cons(
          params.pName,
          params.pRmin1,
          params.pRmax1,
          params.pRmin2,
          params.pRmax2,
          params.pDz,
          params.pSPhi,
          params.pDPhi
        );
      },
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Cons';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pRmin1, pRmax1, pRmin2, pRmax2, pDz, pSPhi, pDPhi } =
      data.parameters;
    return new G4Cons(pName, pRmin1, pRmax1, pRmin2, pRmax2, pDz, pSPhi, pDPhi);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Cons };
