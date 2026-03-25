/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Cone with elliptical cross-section.
 * Equivalent to Geant4's G4EllipticalCone.
 *
 * @param {string} pName      - Name of the solid
 * @param {number} pSemiAxisX - Semi-axis along X (scales with height)
 * @param {number} pSemiAxisY - Semi-axis along Y (scales with height)
 * @param {number} pZTopCut   - Upper cut plane in Z in centimeters
 * @param {number} pHeight    - Full height of the cone in centimeters
 */

import * as THREE from 'three';
import { CSG } from '../CSGMesh.js';

class G4EllipticalCone extends THREE.BufferGeometry {
  constructor(pName, pSemiAxisX, pSemiAxisY, pZTopCut, pHeight) {
    super();

    if (pSemiAxisX <= 0) pSemiAxisX = 0.01;
    if (pSemiAxisY <= 0) pSemiAxisY = 0.01;
    if (pZTopCut <= 0) pZTopCut = 0.01;
    if (pHeight <= pZTopCut) pHeight = pZTopCut + 0.01;

    this.type = 'G4EllipticalCone';

    const topRadius =
      pSemiAxisX * ((pHeight - pZTopCut) / (pHeight + pZTopCut));
    const coneGeometry = new THREE.CylinderGeometry(
      topRadius,
      pSemiAxisX,
      pZTopCut * 2,
      32,
      32
    );
    const coneMesh = new THREE.Mesh(
      coneGeometry,
      new THREE.MeshLambertMaterial()
    );

    coneMesh.scale.z = pSemiAxisY / pSemiAxisX;
    coneMesh.updateMatrix();

    const finalGeometry = CSG.toGeometry(CSG.fromMesh(coneMesh));
    finalGeometry.rotateX(Math.PI / 2);
    finalGeometry.type = 'G4EllipticalCone';
    finalGeometry.parameters = {
      pName,
      pSemiAxisX,
      pSemiAxisY,
      pZTopCut,
      pHeight,
    };

    Object.assign(this, finalGeometry);
    this.name = pName || 'G4EllipticalCone';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'ellipticalCone',
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
        pHeight: {
          type: 'number',
          label: 'Height',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.5,
          geometryKey: 'pHeight',
        },
        pZTopCut: {
          type: 'number',
          label: 'TopCut',
          min: 0.01,
          max: (params) => params.pHeight - 0.01,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pZTopCut',
        },
      },
      validate: (params) => {
        if (params.pSemiAxisX <= 0) params.pSemiAxisX = 0.01;
        if (params.pSemiAxisY <= 0) params.pSemiAxisY = 0.01;
        if (params.pZTopCut <= 0) params.pZTopCut = 0.01;
        if (params.pHeight <= params.pZTopCut)
          params.pHeight = params.pZTopCut + 0.01;
        return params;
      },
      createGeometry: (params) =>
        new G4EllipticalCone(
          params.pName,
          params.pSemiAxisX,
          params.pSemiAxisY,
          params.pZTopCut,
          params.pHeight
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4EllipticalCone';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pSemiAxisX, pSemiAxisY, pZTopCut, pHeight } =
      data.parameters;
    return new G4EllipticalCone(
      pName,
      pSemiAxisX,
      pSemiAxisY,
      pZTopCut,
      pHeight
    );
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4EllipticalCone };
