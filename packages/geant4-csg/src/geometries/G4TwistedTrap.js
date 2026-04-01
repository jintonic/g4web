/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Generic trapezoid twisted along the Z axis.
 * Equivalent to Geant4's G4TwistedTrap.
 *
 * @param {string} pName         - Name of the solid
 * @param {number} pTwistedAngle - Twist angle in degrees
 * @param {number} pDz           - Half-length along Z in centimeters
 * @param {number} pTheta        - Polar angle of line joining face centres (degrees)
 * @param {number} pPhi          - Azimuthal angle of above line (degrees)
 * @param {number} pDy1          - Half-length along Y at -pDz in centimeters
 * @param {number} pDx1          - Half-length along X at -pDz/-pDy1 edge in centimeters
 * @param {number} pDx2          - Half-length along X at -pDz/+pDy1 edge in centimeters
 * @param {number} pDy2          - Half-length along Y at +pDz in centimeters
 * @param {number} pDx3          - Half-length along X at +pDz/-pDy2 edge in centimeters
 * @param {number} pDx4          - Half-length along X at +pDz/+pDy2 edge in centimeters
 * @param {number} pAlpha        - Slant angle of lateral sides (degrees)
 */

import * as THREE from 'three';

class G4TwistedTrap extends THREE.BufferGeometry {
  constructor(
    pName,
    pTwistedAngle,
    pDz,
    pTheta,
    pPhi,
    pDy1,
    pDx1,
    pDx2,
    pDy2,
    pDx3,
    pDx4,
    pAlpha
  ) {
    super();

    if (pDz <= 0) pDz = 0.01;
    if (pDy1 <= 0) pDy1 = 0.01;
    if (pDx1 <= 0) pDx1 = 0.01;
    if (pDx2 <= 0) pDx2 = 0.01;
    if (pDy2 <= 0) pDy2 = 0.01;
    if (pDx3 <= 0) pDx3 = 0.01;
    if (pDx4 <= 0) pDx4 = 0.01;

    this.type = 'G4TwistedTrap';

    const alphaRad = (pAlpha * Math.PI) / 180;
    const thetaRad = (pTheta * Math.PI) / 180;
    const phiRad = (pPhi * Math.PI) / 180;
    const twistedRad = (pTwistedAngle * Math.PI) / 180;

    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const positions = boxGeometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      let newZ = z * pDz;
      let newY = y * (z >= 0 ? pDy2 : pDy1);
      let newX;

      if (z >= 0) {
        newX = x * (y >= 0 ? pDx4 : pDx3);
      } else {
        newX = x * (y >= 0 ? pDx2 : pDx1);
      }

      if (pTwistedAngle !== 0) {
        const twistAmount = z * (twistedRad / 2);
        const cos = Math.cos(twistAmount);
        const sin = Math.sin(twistAmount);
        const tx = newX;
        const ty = newY;
        newX = tx * cos - ty * sin;
        newY = tx * sin + ty * cos;
      }

      positions[i] = newX;
      positions[i + 1] = newY;
      positions[i + 2] = newZ;
    }

    const shearYX = new THREE.Matrix4().set(
      1,
      Math.tan(alphaRad),
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );

    const tanTheta = Math.tan(thetaRad);
    const shearXZ = new THREE.Matrix4().set(
      1,
      0,
      tanTheta * Math.cos(phiRad),
      0,
      0,
      1,
      tanTheta * Math.sin(phiRad),
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );

    boxGeometry.applyMatrix4(
      new THREE.Matrix4().multiply(shearXZ).multiply(shearYX)
    );
    boxGeometry.attributes.position.needsUpdate = true;
    boxGeometry.computeVertexNormals();

    this.setAttribute('position', boxGeometry.getAttribute('position'));
    this.setAttribute('normal', boxGeometry.getAttribute('normal'));
    this.setAttribute('uv', boxGeometry.getAttribute('uv'));
    this.setIndex(boxGeometry.getIndex());

    this.parameters = {
      pName,
      pTwistedAngle,
      pDz,
      pTheta,
      pPhi,
      pDy1,
      pDx1,
      pDx2,
      pDy2,
      pDx3,
      pDx4,
      pAlpha,
    };
    this.name = pName || 'G4TwistedTrap';
  }

  static getEditorConfig() {
    const max_value = 0.0001;
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'twistedTrap',
          geometryKey: 'pName',
        },
        _info: {
          type: 'info',
          label:
            'Either both ends rectangular (dx1=dx2, dx3=dx4) OR both trapezoids (if dx1≠dx2 and dx3≠dx4, then dy2=dy1×(dx3-dx4)/(dx1-dx2)). No mixed shapes allowed.',
        },
        pTwistedAngle: {
          type: 'angle',
          label: 'Twist angle',
          min: -180,
          max: 180,
          step: 1,
          default: 1,
          geometryKey: 'pTwistedAngle',
        },
        pDz: {
          type: 'number',
          label: 'Half Dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.5,
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
          default: 0.3,
          geometryKey: 'pDx1',
        },
        pDx2: {
          type: 'number',
          label: 'Half Dx2 at +Dy,-Dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.4,
          geometryKey: 'pDx2',
        },
        pDy2: {
          type: 'number',
          label: 'Half Dy2 at +Dz',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.16,
          geometryKey: 'pDy2',
        },
        pDx3: {
          type: 'number',
          label: 'Half Dx3 at +Dz,-Dy',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.1,
          geometryKey: 'pDx3',
        },
        pDx4: {
          type: 'number',
          label: 'Half Dx4 at +Dz,+Dy',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.14,
          geometryKey: 'pDx4',
        },
        pAlpha: {
          type: 'angle',
          label: 'alpha',
          min: -89,
          max: 89,
          step: 1,
          default: 0,
          geometryKey: 'pAlpha',
        },
      },

      validate: (params) => {
        ['pDz', 'pDy1', 'pDx1', 'pDx2', 'pDy2', 'pDx3', 'pDx4'].forEach((k) => {
          if (params[k] <= 0) params[k] = 0.01;
        });

        // enforce dx1 < dx2 and dx3 < dx4
        if (params.pDx1 >= params.pDx2) params.pDx2 = params.pDx1 + 0.01;
        if (params.pDx3 >= params.pDx4) params.pDx4 = params.pDx3 + 0.01;

        const max_value = 0.0001;
        const isFirstEndRectangular =
          Math.abs(params.pDx1 - params.pDx2) < max_value;
        const isSecondEndRectangular =
          Math.abs(params.pDx3 - params.pDx4) < max_value;

        // both trapezoids — auto-calculate pDy2
        if (!isFirstEndRectangular && !isSecondEndRectangular) {
          const denom = params.pDx1 - params.pDx2;
          if (Math.abs(denom) > max_value) {
            const calculatedDy2 =
              (params.pDy1 * (params.pDx3 - params.pDx4)) / denom;
            if (calculatedDy2 > 0) {
              params.pDy2 = calculatedDy2;
            }
          }
        }

        return params;
      },

      createGeometry: (params) =>
        new G4TwistedTrap(
          params.pName,
          params.pTwistedAngle,
          params.pDz,
          params.pTheta,
          params.pPhi,
          params.pDy1,
          params.pDx1,
          params.pDx2,
          params.pDy2,
          params.pDx3,
          params.pDx4,
          params.pAlpha
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4TwistedTrap';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const {
      pName,
      pTwistedAngle,
      pDz,
      pTheta,
      pPhi,
      pDy1,
      pDx1,
      pDx2,
      pDy2,
      pDx3,
      pDx4,
      pAlpha,
    } = data.parameters;
    return new G4TwistedTrap(
      pName,
      pTwistedAngle,
      pDz,
      pTheta,
      pPhi,
      pDy1,
      pDx1,
      pDx2,
      pDy2,
      pDx3,
      pDx4,
      pAlpha
    );
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4TwistedTrap };
