/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Cylindrical tube section geometry with inner/outer radius and angular cuts.
 * Equivalent to Geant4's G4Tubs.
 *
 * @param {string} pName  - Name of the solid
 * @param {number} pRmin  - Inner radius in centimeters (0 for solid cylinder)
 * @param {number} pRmax  - Outer radius in centimeters
 * @param {number} pDz    - Half-length along Z axis in centimeters
 * @param {number} pSPhi  - Starting phi angle in degrees
 * @param {number} pDPhi  - Delta phi angle in degrees (360 for full cylinder)
 */

import * as THREE from 'three';
import { CSG } from '../CSGMesh.js';

class G4Tubs extends THREE.BufferGeometry {
  constructor(pName, pRmin, pRmax, pDz, pSPhi, pDPhi) {
    super();

    if (pRmax <= pRmin) pRmax = pRmin + 0.01;
    if (pDz <= 0) pDz = 0.01;
    if (pDPhi <= 0) pDPhi = 1;

    this.type = 'G4Tubs';

    const pSPhi_rad = (Math.PI * pSPhi) / 180;
    const pDPhi_rad = (Math.PI * pDPhi) / 180;

    const outerGeometry = new THREE.CylinderGeometry(pRmax, pRmax, pDz * 2, 32);
    let resultCSG = CSG.fromGeometry(outerGeometry);

    if (pRmin > 0) {
      if (pRmin > pRmax) pRmin = pRmax - 0.01;
      const innerGeometry = new THREE.CylinderGeometry(
        pRmin,
        pRmin,
        pDz * 2,
        32
      );
      resultCSG = resultCSG.subtract(CSG.fromGeometry(innerGeometry));
    }

    if (pDPhi_rad < Math.PI * 2) {
      const pieShape = new THREE.Shape();
      pieShape.absarc(0, 0, pRmax, pSPhi_rad, pSPhi_rad + pDPhi_rad, false);
      pieShape.lineTo(0, 0);
      const pieGeometry = new THREE.ExtrudeGeometry(pieShape, {
        depth: pDz * 2,
        bevelEnabled: false,
      });
      pieGeometry.translate(0, 0, -pDz);
      pieGeometry.rotateX(Math.PI / 2);
      resultCSG = resultCSG.intersect(CSG.fromGeometry(pieGeometry));
    }

    const finalGeometry = CSG.toGeometry(resultCSG);
    finalGeometry.rotateX(Math.PI / 2);
    finalGeometry.rotateX(Math.PI);
    finalGeometry.type = 'G4Tubs';
    finalGeometry.parameters = { pName, pRmin, pRmax, pDz, pSPhi, pDPhi };

    Object.assign(this, finalGeometry);
    this.name = pName || 'G4Tubs';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'tubs',
          geometryKey: 'pName',
        },
        pRmax: {
          type: 'number',
          label: 'Outer radius',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pRmax',
        },
        pRmin: {
          type: 'number',
          label: 'Inner radius',
          min: 0,
          max: (params) => params.pRmax - 0.01,
          step: 0.1,
          default: 0.5,
          geometryKey: 'pRmin',
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
          step: 1,
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
        if (params.pRmax <= params.pRmin) params.pRmax = params.pRmin + 0.01;
        if (params.pDz <= 0) params.pDz = 0.01;
        if (params.pDPhi <= 0) params.pDPhi = 1;
        return params;
      },
      createGeometry: (params) =>
        new G4Tubs(
          params.pName,
          params.pRmin,
          params.pRmax,
          params.pDz,
          params.pSPhi,
          params.pDPhi
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Tubs';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pRmin, pRmax, pDz, pSPhi, pDPhi } = data.parameters;
    return new G4Tubs(pName, pRmin, pRmax, pDz, pSPhi, pDPhi);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Tubs };
