/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Triaxial ellipsoid geometry with optional Z cuts.
 * Equivalent to Geant4's G4Ellipsoid.
 *
 * @param {string} pName       - Name of the solid
 * @param {number} pSemiAxisX  - Semi-axis along X in centimeters
 * @param {number} pSemiAxisY  - Semi-axis along Y in centimeters
 * @param {number} pSemiAxisZ  - Semi-axis along Z in centimeters
 * @param {number} pZBottomCut - Lower cut in Z in centimeters (0 = no cut)
 * @param {number} pZTopCut    - Upper cut in Z in centimeters (0 = no cut)
 *
 * Setting pZBottomCut = pZTopCut = 0 gives a full ellipsoid.
 * pZBottomCut should be <= 0, pZTopCut should be >= 0.
 */

import * as THREE from 'three';
import { CSG } from '../CSGMesh.js';

class G4Ellipsoid extends THREE.BufferGeometry {
  constructor(
    pName,
    pSemiAxisX,
    pSemiAxisY,
    pSemiAxisZ,
    pZBottomCut,
    pZTopCut
  ) {
    super();

    if (pSemiAxisX <= 0) pSemiAxisX = 0.01;
    if (pSemiAxisY <= 0) pSemiAxisY = 0.01;
    if (pSemiAxisZ <= 0) pSemiAxisZ = 0.01;
    pZBottomCut = Math.min(Math.max(pZBottomCut, -pSemiAxisZ), pSemiAxisZ);
    pZTopCut = Math.min(Math.max(pZTopCut, -pSemiAxisZ), pSemiAxisZ);
    if (pZTopCut <= pZBottomCut) pZTopCut = pZBottomCut + 0.01;

    this.type = 'G4Ellipsoid';

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    sphereGeometry.scale(pSemiAxisX, pSemiAxisY, pSemiAxisZ);

    let resultCSG = CSG.fromGeometry(sphereGeometry);

    if (pZTopCut !== 0 || pZBottomCut !== 0) {
      if (pZTopCut !== 0) {
        const topBox = new THREE.BoxGeometry(
          pSemiAxisX * 2,
          pSemiAxisY * 2,
          pSemiAxisZ * 2
        );
        topBox.translate(0, 0, pSemiAxisZ + pZTopCut);
        resultCSG = resultCSG.subtract(CSG.fromGeometry(topBox));
      }
      if (pZBottomCut !== 0) {
        const bottomBox = new THREE.BoxGeometry(
          pSemiAxisX * 2,
          pSemiAxisY * 2,
          pSemiAxisZ * 2
        );
        bottomBox.translate(0, 0, -(pSemiAxisZ + Math.abs(pZBottomCut)));
        resultCSG = resultCSG.subtract(CSG.fromGeometry(bottomBox));
      }
    }

    const finalGeometry = CSG.toGeometry(resultCSG);
    finalGeometry.type = 'G4Ellipsoid';
    finalGeometry.parameters = {
      pName,
      pSemiAxisX,
      pSemiAxisY,
      pSemiAxisZ,
      pZBottomCut,
      pZTopCut,
    };

    Object.assign(this, finalGeometry);
    this.name = pName || 'G4Ellipsoid';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'ellipsoid',
          geometryKey: 'pName',
        },
        pSemiAxisX: {
          type: 'number',
          label: 'Semiaxis in X',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pSemiAxisX',
        },
        pSemiAxisY: {
          type: 'number',
          label: 'Semiaxis in Y',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.8,
          geometryKey: 'pSemiAxisY',
        },
        pSemiAxisZ: {
          type: 'number',
          label: 'Semiaxis in Z',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pSemiAxisZ',
        },
        pZBottomCut: {
          type: 'number',
          label: 'Bottom Cut',
          min: -Infinity,
          max: (params) => params.pZTopCut - 0.01,
          step: 0.1,
          default: -0.6,
          geometryKey: 'pZBottomCut',
        },
        pZTopCut: {
          type: 'number',
          label: 'Top Cut',
          min: (params) => params.pZBottomCut + 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.8,
          geometryKey: 'pZTopCut',
        },
      },
      validate: (params) => {
        if (params.pSemiAxisX <= 0) params.pSemiAxisX = 0.01;
        if (params.pSemiAxisY <= 0) params.pSemiAxisY = 0.01;
        if (params.pSemiAxisZ <= 0) params.pSemiAxisZ = 0.01;
        params.pZBottomCut = Math.min(
          Math.max(params.pZBottomCut, -params.pSemiAxisZ),
          params.pSemiAxisZ
        );
        params.pZTopCut = Math.min(
          Math.max(params.pZTopCut, -params.pSemiAxisZ),
          params.pSemiAxisZ
        );
        if (params.pZTopCut <= params.pZBottomCut)
          params.pZTopCut = params.pZBottomCut + 0.01;
        return params;
      },
      createGeometry: (params) =>
        new G4Ellipsoid(
          params.pName,
          params.pSemiAxisX,
          params.pSemiAxisY,
          params.pSemiAxisZ,
          params.pZBottomCut,
          params.pZTopCut
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Ellipsoid';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pSemiAxisX, pSemiAxisY, pSemiAxisZ, pZBottomCut, pZTopCut } =
      data.parameters;
    return new G4Ellipsoid(
      pName,
      pSemiAxisX,
      pSemiAxisY,
      pSemiAxisZ,
      pZBottomCut,
      pZTopCut
    );
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Ellipsoid };
