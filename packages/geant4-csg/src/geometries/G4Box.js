/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Box geometry with full-length dimensions.
 * Equivalent to Geant4's G4Box.
 *
 * @param {string} pName  - Name of the solid
 * @param {number} pX     - Half-length along X axis in centimeters
 * @param {number} pY     - Half-length along Y axis in centimeters
 * @param {number} pZ     - Half-length along Z axis in centimeters
 *
 * The full dimensions of the box will be:
 *   2*pX (width) x 2*pY (height) x 2*pZ (depth)
 */

import * as THREE from 'three';

class G4Box extends THREE.BufferGeometry {
  constructor(pName, pX, pY, pZ) {
    super();

    this.type = 'G4Box';

    const boxGeometry = new THREE.BoxGeometry(pX * 2, pY * 2, pZ * 2);
    const finalGeometry = boxGeometry;
    finalGeometry.type = 'G4Box';
    finalGeometry.parameters = { pName, pX, pY, pZ };

    Object.assign(this, finalGeometry);

    this.name = pName || 'G4Box';
    this.parameters = { pName, pX, pY, pZ };
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          name: 'box',
          default: 'box',
          geometryKey: 'pName',
        },
        pX: {
          type: 'number',
          label: 'Half X',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1,
          geometryKey: 'pX',
        },
        pY: {
          type: 'number',
          label: 'Half Y',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1,
          geometryKey: 'pY',
        },
        pZ: {
          type: 'number',
          label: 'Half Z',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1,
          geometryKey: 'pZ',
        },
      },
      validate: (params) => {
        if (params.pX <= 0) params.pX = 0.01;
        if (params.pY <= 0) params.pY = 0.01;
        if (params.pZ <= 0) params.pZ = 0.01;
        return params;
      },
      createGeometry: (params) => {
        return new G4Box(params.pName, params.pX, params.pY, params.pZ);
      },
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Box';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pX, pY, pZ } = data.parameters;
    return new G4Box(pName, pX, pY, pZ);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Box };
