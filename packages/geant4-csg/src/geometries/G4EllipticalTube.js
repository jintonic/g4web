/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Tube with elliptical cross-section.
 * Equivalent to Geant4's G4EllipticalTube.
 *
 * @param {string} pName - Name of the solid
 * @param {number} pDx   - Semi-axis along X in centimeters
 * @param {number} pDy   - Semi-axis along Y in centimeters
 * @param {number} pDz   - Half-length along Z in centimeters
 *
 * Cross-section satisfies: (x/pDx)^2 + (y/pDy)^2 <= 1
 */

import * as THREE from 'three';
import { CSG } from '../CSGMesh.js';

class G4EllipticalTube extends THREE.BufferGeometry {
  constructor(pName, pDx, pDy, pDz) {
    super();

    if (pDx <= 0) pDx = 0.01;
    if (pDy <= 0) pDy = 0.01;
    if (pDz <= 0) pDz = 0.01;

    this.type = 'G4EllipticalTube';

    const ratioZ = pDy / pDx;
    const cylinderGeometry = new THREE.CylinderGeometry(pDx, pDx, pDz * 2, 64);
    const cylinderMesh = new THREE.Mesh(
      cylinderGeometry,
      new THREE.MeshLambertMaterial()
    );

    cylinderMesh.scale.z = ratioZ;
    cylinderMesh.rotateX(Math.PI / 2);
    cylinderMesh.updateMatrix();

    const finalGeometry = CSG.toGeometry(CSG.fromMesh(cylinderMesh));
    finalGeometry.type = 'G4EllipticalTube';
    finalGeometry.parameters = { pName, pDx, pDy, pDz };

    Object.assign(this, finalGeometry);
    this.name = pName || 'G4EllipticalTube';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'ellipticalTube',
          geometryKey: 'pName',
        },
        pDx: {
          type: 'number',
          label: 'Semiaxis in X',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.5,
          geometryKey: 'pDx',
        },
        pDy: {
          type: 'number',
          label: 'Semiaxis in Y',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pDy',
        },
        pDz: {
          type: 'number',
          label: 'Half length Z',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pDz',
        },
      },
      validate: (params) => {
        if (params.pDx <= 0) params.pDx = 0.01;
        if (params.pDy <= 0) params.pDy = 0.01;
        if (params.pDz <= 0) params.pDz = 0.01;
        return params;
      },
      createGeometry: (params) =>
        new G4EllipticalTube(params.pName, params.pDx, params.pDy, params.pDz),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4EllipticalTube';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pDx, pDy, pDz } = data.parameters;
    return new G4EllipticalTube(pName, pDx, pDy, pDz);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4EllipticalTube };
