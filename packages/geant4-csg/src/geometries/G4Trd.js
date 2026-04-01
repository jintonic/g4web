/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Trapezoid with different rectangular cross-sections at each Z end.
 * Equivalent to Geant4's G4Trd.
 *
 * @param {string} pName - Name of the solid
 * @param {number} pDx1  - Half-length along X at -pDz in centimeters
 * @param {number} pDx2  - Half-length along X at +pDz in centimeters
 * @param {number} pDy1  - Half-length along Y at -pDz in centimeters
 * @param {number} pDy2  - Half-length along Y at +pDz in centimeters
 * @param {number} pDz   - Half-length along Z in centimeters
 */

import * as THREE from 'three';

class G4Trd extends THREE.BufferGeometry {
  constructor(pName, pDx1, pDx2, pDy1, pDy2, pDz) {
    super();

    if (pDx1 <= 0) pDx1 = 0.01;
    if (pDx2 <= 0) pDx2 = 0.01;
    if (pDy1 <= 0) pDy1 = 0.01;
    if (pDy2 <= 0) pDy2 = 0.01;
    if (pDz <= 0) pDz = 0.01;

    this.type = 'G4Trd';

    const maxWidth = Math.max(pDx1, pDx2);
    const maxHeight = Math.max(pDy1, pDy2);

    const boxGeometry = new THREE.BoxGeometry(
      maxWidth * 2,
      maxHeight * 2,
      pDz * 2
    );
    const positions = boxGeometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 2] > 0) {
        positions[i] *= pDx2 / maxWidth;
        positions[i + 1] *= pDy2 / maxHeight;
      } else {
        positions[i] *= pDx1 / maxWidth;
        positions[i + 1] *= pDy1 / maxHeight;
      }
    }

    boxGeometry.attributes.position.needsUpdate = true;
    boxGeometry.computeVertexNormals();
    boxGeometry.type = 'G4Trd';
    boxGeometry.parameters = { pName, pDx1, pDx2, pDy1, pDy2, pDz };

    Object.assign(this, boxGeometry);
    this.parameters = { pName, pDx1, pDx2, pDy1, pDy2, pDz };
    this.name = pName || 'G4Trd';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'trd',
          geometryKey: 'pName',
        },
        pDx1: {
          type: 'number',
          label: 'Half length in X at -dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.5,
          geometryKey: 'pDx1',
        },
        pDx2: {
          type: 'number',
          label: 'Half length in X at +dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.5,
          geometryKey: 'pDx2',
        },
        pDy1: {
          type: 'number',
          label: 'Half length in Y at -dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.5,
          geometryKey: 'pDy1',
        },
        pDy2: {
          type: 'number',
          label: 'Half length in Y at +dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.5,
          geometryKey: 'pDy2',
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
      },
      validate: (params) => {
        ['pDx1', 'pDx2', 'pDy1', 'pDy2', 'pDz'].forEach((k) => {
          if (params[k] <= 0) params[k] = 0.01;
        });
        return params;
      },
      createGeometry: (params) =>
        new G4Trd(
          params.pName,
          params.pDx1,
          params.pDx2,
          params.pDy1,
          params.pDy2,
          params.pDz
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Trd';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pDx1, pDx2, pDy1, pDy2, pDz } = data.parameters;
    return new G4Trd(pName, pDx1, pDx2, pDy1, pDy2, pDz);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Trd };
