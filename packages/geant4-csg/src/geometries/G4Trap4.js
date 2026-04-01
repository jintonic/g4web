/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Simple trapezoid with 4 parameters.
 * Equivalent to Geant4's G4Trap(pName, pZ, pY, pX, pLTX).
 *
 * @param {string} pName  - Name of the solid
 * @param {number} pZ     - Half-length along Z in centimeters
 * @param {number} pY     - Half-length along Y in centimeters
 * @param {number} pX     - Half-length along X at -pY in centimeters
 * @param {number} pLTX   - Half-length along X at +pY in centimeters
 */

import * as THREE from 'three';

class G4Trap4 extends THREE.BufferGeometry {
  constructor(pName, pZ, pY, pX, pLTX) {
    super();

    if (pZ <= 0) pZ = 0.01;
    if (pY <= 0) pY = 0.01;
    if (pX <= 0) pX = 0.01;
    if (pLTX < 0) pLTX = 0;

    this.type = 'G4Trap4';

    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const positions = boxGeometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      const t = (y + 1) / 2;

      positions[i + 2] = z * pZ;
      positions[i + 1] = y * pY;

      if (x < 0) {
        positions[i] = -pX + t * (pLTX - pX) * 0;
        positions[i] = x < 0 ? -pX : pX - t * (pX - pLTX);
      }

      positions[i] = x < 0 ? -pX : -pX + 2 * pX * (1 - t) + pLTX * t;
    }

    boxGeometry.attributes.position.needsUpdate = true;
    boxGeometry.computeVertexNormals();

    this.setAttribute('position', boxGeometry.getAttribute('position'));
    this.setAttribute('normal', boxGeometry.getAttribute('normal'));
    this.setAttribute('uv', boxGeometry.getAttribute('uv'));
    this.setIndex(boxGeometry.getIndex());

    this.parameters = { pName, pZ, pY, pX, pLTX };
    this.name = pName || 'G4Trap4';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'trap4',
          geometryKey: 'pName',
        },
        pZ: {
          type: 'number',
          label: 'Length in Z',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 2.0,
          geometryKey: 'pZ',
        },
        pY: {
          type: 'number',
          label: 'Length in Y',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 2.0,
          geometryKey: 'pY',
        },
        pX: {
          type: 'number',
          label: 'Length in X',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 2.0,
          geometryKey: 'pX',
        },
        pLTX: {
          type: 'number',
          label: 'Length along X at the narrower side',
          min: 0,
          max: Infinity,
          step: 0.1,
          default: 0.4,
          geometryKey: 'pLTX',
        },
      },
      validate: (params) => {
        ['pZ', 'pY', 'pX'].forEach((k) => {
          if (params[k] <= 0) params[k] = 0.01;
        });
        if (params.pLTX < 0) params.pLTX = 0;
        return params;
      },
      createGeometry: (params) =>
        new G4Trap4(params.pName, params.pZ, params.pY, params.pX, params.pLTX),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Trap4';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pZ, pY, pX, pLTX } = data.parameters;
    return new G4Trap4(pName, pZ, pY, pX, pLTX);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Trap4 };
