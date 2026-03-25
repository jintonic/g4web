/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Torus section geometry with inner/outer tube radius and angular cuts.
 * Equivalent to Geant4's G4Torus.
 *
 * @param {string} pName  - Name of the solid
 * @param {number} pRmin  - Inner radius of the torus tube in centimeters (0 for solid tube)
 * @param {number} pRmax  - Outer radius of the torus tube in centimeters
 * @param {number} pRtor  - Swept radius (distance from Z axis to tube center) in centimeters
 * @param {number} pSPhi  - Starting phi angle in degrees
 * @param {number} pDPhi  - Delta phi angle in degrees (360 for full torus)
 *
 * pRtor must be greater than pRmax to avoid self-intersection.
 * Setting pRmin = 0 gives a solid torus tube cross-section.
 */

import * as THREE from 'three';
import { CSG } from '../CSGMesh.js';

class G4Torus extends THREE.BufferGeometry {
  constructor(pName, pRmin, pRmax, pRtor, pSPhi, pDPhi) {
    super();

    if (pRmax <= pRmin) pRmax = pRmin + 0.01;
    if (pRtor <= pRmax) pRtor = pRmax + 0.01;
    if (pDPhi <= 0) pDPhi = 1;

    this.type = 'G4Torus';
    this.name = pName || 'G4Torus';

    const pSPhi_rad = (pSPhi * Math.PI) / 180;
    const pDPhi_rad = (pDPhi * Math.PI) / 180;

    const outerTorus = new THREE.TorusGeometry(pRtor, pRmax, 14, 35);
    let resultCSG = CSG.fromGeometry(outerTorus);

    if (pDPhi_rad < Math.PI * 2) {
      const pieShape = new THREE.Shape();
      pieShape.absarc(
        0,
        0,
        pRtor + pRmax + 0.3,
        pSPhi_rad,
        pSPhi_rad + pDPhi_rad,
        false
      );
      pieShape.lineTo(0, 0);
      const pieGeometry = new THREE.ExtrudeGeometry(pieShape, {
        depth: pRmax * 2,
        bevelEnabled: false,
      });
      pieGeometry.translate(0, 0, -pRmax);
      resultCSG = resultCSG.intersect(CSG.fromGeometry(pieGeometry));
    }

    if (pRmax > 0 && pRmin > 0) {
      const innerTorus = new THREE.TorusGeometry(pRtor, pRmin, 14, 35);
      resultCSG = resultCSG.subtract(CSG.fromGeometry(innerTorus));
    }

    const finalGeometry = CSG.toGeometry(resultCSG);
    finalGeometry.type = 'G4Torus';
    finalGeometry.parameters = { pName, pRmin, pRmax, pRtor, pSPhi, pDPhi };

    Object.assign(this, finalGeometry);
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'Torus',
          geometryKey: 'pName',
        },
        pRmin: {
          type: 'number',
          label: 'Inner radius',
          min: 0,
          max: (params) => params.pRmax - 0.01,
          step: 0.1,
          default: 0.1,
          geometryKey: 'pRmin',
        },
        pRmax: {
          type: 'number',
          label: 'Outer radius',
          min: 0.01,
          max: (params) => params.pRtor - 0.01,
          step: 0.1,
          default: 0.2,
          geometryKey: 'pRmax',
        },
        pRtor: {
          type: 'number',
          label: 'Swept radius of torus',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.5,
          geometryKey: 'pRtor',
        },
        pSPhi: {
          type: 'angle',
          label: 'Starting phi angle',
          min: 0,
          max: 360,
          step: 5,
          default: 0,
          geometryKey: 'pSPhi',
        },
        pDPhi: {
          type: 'angle',
          label: 'Angle of the segment',
          min: 1,
          max: 360,
          step: 1,
          default: 90,
          geometryKey: 'pDPhi',
        },
      },
      validate: (params) => {
        if (params.pRmax <= params.pRmin) params.pRmax = params.pRmin + 0.01;
        if (params.pRtor <= params.pRmax) params.pRtor = params.pRmax + 0.01;
        if (params.pDPhi <= 0) params.pDPhi = 1;
        return params;
      },
      createGeometry: (params) =>
        new G4Torus(
          params.pName,
          params.pRmin,
          params.pRmax,
          params.pRtor,
          params.pSPhi,
          params.pDPhi
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Torus';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pRmin, pRmax, pRtor, pSPhi, pDPhi } = data.parameters;
    return new G4Torus(pName, pRmin, pRmax, pRtor, pSPhi, pDPhi);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Torus };
