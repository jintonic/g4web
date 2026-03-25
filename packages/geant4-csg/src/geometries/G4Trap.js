/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Generic trapezoid with 8 vertices and 6 trapezoidal faces.
 * Equivalent to Geant4's G4Trap.
 *
 * @param {string} pName    - Name of the solid
 * @param {number} pDz      - Half-length along Z in centimeters
 * @param {number} pTheta   - Polar angle of line joining face centres (degrees)
 * @param {number} pPhi     - Azimuthal angle of above line (degrees)
 * @param {number} pDy1     - Half-length along Y at -pDz in centimeters
 * @param {number} pDx1     - Half-length along X at -pDz/-pDy1 edge in centimeters
 * @param {number} pDx2     - Half-length along X at -pDz/+pDy1 edge in centimeters
 * @param {number} pAlpha1  - Slant angle of sides at -pDz face (degrees)
 * @param {number} pDy2     - Half-length along Y at +pDz in centimeters
 * @param {number} pDx3     - Half-length along X at +pDz/-pDy2 edge in centimeters
 * @param {number} pDx4     - Half-length along X at +pDz/+pDy2 edge in centimeters
 * @param {number} pAlpha2  - Slant angle of sides at +pDz face (degrees)
 */

import * as THREE from 'three';

class G4Trap extends THREE.BufferGeometry {
  constructor(
    pName,
    pDz,
    pTheta,
    pPhi,
    pDy1,
    pDx1,
    pDx2,
    pAlpha1,
    pDy2,
    pDx3,
    pDx4,
    pAlpha2
  ) {
    super();

    if (pDz <= 0) pDz = 0.01;
    if (pDy1 <= 0) pDy1 = 0.01;
    if (pDx1 <= 0) pDx1 = 0.01;
    if (pDx2 <= 0) pDx2 = 0.01;
    if (pDy2 <= 0) pDy2 = 0.01;
    if (pDx3 <= 0) pDx3 = 0.01;
    if (pDx4 <= 0) pDx4 = 0.01;

    this.type = 'G4Trap';
    this.name = pName || 'G4Trap';

    const thetaRad = (pTheta * Math.PI) / 180;
    const phiRad = (pPhi * Math.PI) / 180;
    const alpha1Rad = (pAlpha1 * Math.PI) / 180;
    const alpha2Rad = (pAlpha2 * Math.PI) / 180;

    const tTheta = Math.tan(thetaRad);

    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const positions = boxGeometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      const t = (z + 1) / 2;
      const newZ = z * pDz;
      const newY = y * ((1 - t) * pDy1 + t * pDy2);

      let xScale;
      if (y >= 0) {
        xScale = (1 - t) * pDx2 + t * pDx4;
      } else {
        xScale = (1 - t) * pDx1 + t * pDx3;
      }

      const alphaRad = (1 - t) * alpha1Rad + t * alpha2Rad;
      let newX = x * xScale + newY * Math.tan(alphaRad);
      newX += newZ * tTheta * Math.cos(phiRad);
      const finalY = newY + newZ * tTheta * Math.sin(phiRad);

      positions[i] = newX;
      positions[i + 1] = finalY;
      positions[i + 2] = newZ;
    }

    boxGeometry.attributes.position.needsUpdate = true;
    boxGeometry.computeVertexNormals();

    this.setAttribute('position', boxGeometry.getAttribute('position'));
    this.setAttribute('normal', boxGeometry.getAttribute('normal'));
    this.setAttribute('uv', boxGeometry.getAttribute('uv'));
    this.setIndex(boxGeometry.getIndex());

    this.parameters = {
      pName,
      pDz,
      pTheta,
      pPhi,
      pDy1,
      pDx1,
      pDx2,
      pAlpha1,
      pDy2,
      pDx3,
      pDx4,
      pAlpha2,
    };
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'Trap',
          geometryKey: 'pName',
        },
        _info: {
          type: 'info',
          label:
            'Valid shapes: dx1 must equal dx2 and dx3 must equal dx4 (both ends rectangular only)',
        },
        pDz: {
          type: 'number',
          label: 'Half Dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pDz',
        },
        pTheta: {
          type: 'angle',
          label: 'theta',
          min: 0,
          max: 89,
          step: 1,
          default: 0,
          geometryKey: 'pTheta',
        },
        pPhi: {
          type: 'angle',
          label: 'phi',
          min: 0,
          max: 360,
          step: 5,
          default: 0,
          geometryKey: 'pPhi',
        },
        pDy1: {
          type: 'number',
          label: 'Half Dy1 at -Dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.4,
          geometryKey: 'pDy1',
        },
        pDx1: {
          type: 'number',
          label: 'Half Dx1 at -Dy,-Dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.2,
          geometryKey: 'pDx1',
          mirror: 'pDx2',
        },
        pDx2: {
          type: 'number',
          label: 'Half Dx2 at +Dy,-Dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.2,
          geometryKey: 'pDx2',
          mirror: 'pDx1',
        },
        pAlpha1: {
          type: 'angle',
          label: 'alpha1',
          min: -89,
          max: 89,
          step: 1,
          default: 15,
          geometryKey: 'pAlpha1',
        },
        pDy2: {
          type: 'number',
          label: 'Half Dy2 at +Dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.2,
          geometryKey: 'pDy2',
        },
        pDx3: {
          type: 'number',
          label: 'Half Dx3 at +Dz,-Dy',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.4,
          geometryKey: 'pDx3',
          mirror: 'pDx4',
        },
        pDx4: {
          type: 'number',
          label: 'Half Dx4 at +Dz,+Dy',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.4,
          geometryKey: 'pDx4',
          mirror: 'pDx3',
        },
        pAlpha2: {
          type: 'angle',
          label: 'alpha2',
          min: -89,
          max: 89,
          step: 1,
          default: 15,
          geometryKey: 'pAlpha2',
        },
      },
      validate: (params) => {
        ['pDz', 'pDy1', 'pDx1', 'pDx2', 'pDy2', 'pDx3', 'pDx4'].forEach((k) => {
          if (params[k] <= 0) params[k] = 0.01;
        });
        // enforce mirror constraints
        params.pDx2 = params.pDx1;
        params.pDx4 = params.pDx3;
        return params;
      },
      createGeometry: (params) =>
        new G4Trap(
          params.pName,
          params.pDz,
          params.pTheta,
          params.pPhi,
          params.pDy1,
          params.pDx1,
          params.pDx2,
          params.pAlpha1,
          params.pDy2,
          params.pDx3,
          params.pDx4,
          params.pAlpha2
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Trap';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const {
      pName,
      pDz,
      pTheta,
      pPhi,
      pDy1,
      pDx1,
      pDx2,
      pAlpha1,
      pDy2,
      pDx3,
      pDx4,
      pAlpha2,
    } = data.parameters;
    return new G4Trap(
      pName,
      pDz,
      pTheta,
      pPhi,
      pDy1,
      pDx1,
      pDx2,
      pAlpha1,
      pDy2,
      pDx3,
      pDx4,
      pAlpha2
    );
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Trap };
