/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Parallelepiped geometry — a box with sheared faces.
 * Equivalent to Geant4's G4Para.
 *
 * @param {string} pName   - Name of the solid
 * @param {number} pDx     - Half-length along X in centimeters
 * @param {number} pDy     - Half-length along Y in centimeters
 * @param {number} pDz     - Half-length along Z in centimeters
 * @param {number} pAlpha  - Shear angle of Y faces with respect to Z axis (degrees)
 * @param {number} pTheta  - Polar angle of the line joining -pDz and +pDz centres (degrees)
 * @param {number} pPhi    - Azimuthal angle of the above line (degrees)
 *
 * Setting pAlpha = pTheta = pPhi = 0 gives a plain rectangular box.
 */

import * as THREE from 'three';

class G4Para extends THREE.BufferGeometry {
  constructor(pName, pDx, pDy, pDz, pAlpha, pTheta, pPhi) {
    super();

    if (pDx <= 0) pDx = 0.01;
    if (pDy <= 0) pDy = 0.01;
    if (pDz <= 0) pDz = 0.01;

    this.type = 'G4Para';
    this.name = pName || 'G4Para';

    const alphaRad = (-pAlpha * Math.PI) / 180;
    const thetaRad = (-pTheta * Math.PI) / 180;
    const phiRad = (-pPhi * Math.PI) / 180;

    const boxGeometry = new THREE.BoxGeometry(pDx * 2, pDy * 2, pDz * 2);

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

    const transformMatrix = new THREE.Matrix4()
      .multiply(shearXZ)
      .multiply(shearYX);
    boxGeometry.applyMatrix4(transformMatrix);
    boxGeometry.rotateX(Math.PI);

    this.copy(boxGeometry);
    this.computeVertexNormals();
    this.type = 'G4Para';
    this.parameters = { pName, pDx, pDy, pDz, pAlpha, pTheta, pPhi };
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'Para',
          geometryKey: 'pName',
        },
        pDx: {
          type: 'number',
          label: 'Half length in X',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pDx',
        },
        pDy: {
          type: 'number',
          label: 'Half length in Y',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pDy',
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
        pAlpha: {
          type: 'angle',
          label: 'Alpha',
          min: -89,
          max: 89,
          step: 1,
          default: 10,
          geometryKey: 'pAlpha',
        },
        pTheta: {
          type: 'angle',
          label: 'Theta',
          min: 0,
          max: 89,
          step: 1,
          default: 10,
          geometryKey: 'pTheta',
        },
        pPhi: {
          type: 'angle',
          label: 'Phi',
          min: 0,
          max: 360,
          step: 5,
          default: 10,
          geometryKey: 'pPhi',
        },
      },
      validate: (params) => {
        ['pDx', 'pDy', 'pDz'].forEach((k) => {
          if (params[k] <= 0) params[k] = 0.01;
        });
        return params;
      },
      createGeometry: (params) =>
        new G4Para(
          params.pName,
          params.pDx,
          params.pDy,
          params.pDz,
          params.pAlpha,
          params.pTheta,
          params.pPhi
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Para';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pDx, pDy, pDz, pAlpha, pTheta, pPhi } = data.parameters;
    return new G4Para(pName, pDx, pDy, pDz, pAlpha, pTheta, pPhi);
  }

  copy(source) {
    super.copy(source);
    if (source.parameters)
      this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Para };
