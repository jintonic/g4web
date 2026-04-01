/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Trapezoid geometry twisted along the Z axis.
 * Equivalent to Geant4's G4TwistedTrd.
 *
 * @param {string} pName         - Name of the solid
 * @param {number} pDx1          - Half-length along X at -pDz in centimeters
 * @param {number} pDx2          - Half-length along X at +pDz in centimeters
 * @param {number} pDy1          - Half-length along Y at -pDz in centimeters
 * @param {number} pDy2          - Half-length along Y at +pDz in centimeters
 * @param {number} pDz           - Half-length along Z in centimeters
 * @param {number} pTwistedAngle - Twist angle in degrees
 */

import * as THREE from 'three';

class G4TwistedTrd extends THREE.BufferGeometry {
  constructor(pName, pDx1, pDx2, pDy1, pDy2, pDz, pTwistedAngle) {
    super();

    if (pDx1 <= 0) pDx1 = 0.01;
    if (pDx2 <= 0) pDx2 = 0.01;
    if (pDy1 <= 0) pDy1 = 0.01;
    if (pDy2 <= 0) pDy2 = 0.01;
    if (pDz <= 0) pDz = 0.01;

    this.type = 'G4TwistedTrd';

    const boxGeometry = new THREE.BoxGeometry(2, 2, 2, 5, 5, 5);
    const positions = boxGeometry.attributes.position.array.slice();

    for (let i = 0; i < positions.length; i += 3) {
      let x = positions[i];
      let y = positions[i + 1];
      let z = positions[i + 2];

      const zRatio = (z + 1) / 2;
      const xScale = pDx1 + (pDx2 - pDx1) * zRatio;
      const yScale = pDy1 + (pDy2 - pDy1) * zRatio;

      x *= xScale;
      y *= yScale;

      const twistAmount = ((pTwistedAngle * Math.PI) / 180) * (zRatio - 0.5);
      const newX = x * Math.cos(twistAmount) - y * Math.sin(twistAmount);
      const newY = x * Math.sin(twistAmount) + y * Math.cos(twistAmount);

      positions[i] = newX;
      positions[i + 1] = newY;
      positions[i + 2] = z * pDz;
    }

    this.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.setIndex([...boxGeometry.index.array]);
    this.computeVertexNormals();

    this.parameters = { pName, pDx1, pDx2, pDy1, pDy2, pDz, pTwistedAngle };
    this.name = pName || 'G4TwistedTrd';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'twistedTrd',
          geometryKey: 'pName',
        },
        pDx1: {
          type: 'number',
          label: 'Half length in X at -dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.6,
          geometryKey: 'pDx1',
        },
        pDx2: {
          type: 'number',
          label: 'Half length in X at +dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.3,
          geometryKey: 'pDx2',
        },
        pDy1: {
          type: 'number',
          label: 'Half length in Y at -dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.8,
          geometryKey: 'pDy1',
        },
        pDy2: {
          type: 'number',
          label: 'Half length in Y at +dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.4,
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
        pTwistedAngle: {
          type: 'angle',
          label: 'Twist angle',
          min: -180,
          max: 180,
          step: 1,
          default: 30,
          geometryKey: 'pTwistedAngle',
        },
      },
      validate: (params) => {
        ['pDx1', 'pDx2', 'pDy1', 'pDy2', 'pDz'].forEach((k) => {
          if (params[k] <= 0) params[k] = 0.01;
        });
        return params;
      },
      createGeometry: (params) =>
        new G4TwistedTrd(
          params.pName,
          params.pDx1,
          params.pDx2,
          params.pDy1,
          params.pDy2,
          params.pDz,
          params.pTwistedAngle
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4TwistedTrd';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pDx1, pDx2, pDy1, pDy2, pDz, pTwistedAngle } =
      data.parameters;
    return new G4TwistedTrd(pName, pDx1, pDx2, pDy1, pDy2, pDz, pTwistedAngle);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4TwistedTrd };
