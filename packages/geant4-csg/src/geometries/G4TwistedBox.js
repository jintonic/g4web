/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Box geometry twisted along the Z axis.
 * Equivalent to Geant4's G4TwistedBox.
 *
 * @param {string} pName         - Name of the solid
 * @param {number} pTwistedAngle - Twist angle in degrees
 * @param {number} pDx           - Half-length along X in centimeters
 * @param {number} pDy           - Half-length along Y in centimeters
 * @param {number} pDz           - Half-length along Z in centimeters
 */

import * as THREE from 'three';
import { CSG } from '../CSGMesh.js';

class G4TwistedBox extends THREE.BufferGeometry {
  constructor(pName, pTwistedAngle, pDx, pDy, pDz) {
    super();

    if (pDx <= 0) pDx = 0.01;
    if (pDy <= 0) pDy = 0.01;
    if (pDz <= 0) pDz = 0.01;

    this.type = 'G4TwistedBox';

    const geometry = new THREE.BoxGeometry(
      pDz * 2,
      pDx * 2,
      pDy * 2,
      32,
      32,
      32
    );
    const positionAttribute = geometry.getAttribute('position');
    const axis = new THREE.Vector3(0, 1, 0);
    const vec3 = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vec3.fromBufferAttribute(positionAttribute, i);
      vec3.applyAxisAngle(
        axis,
        ((vec3.y / pDy) * pTwistedAngle * Math.PI) / 180
      );
      geometry.attributes.position.setXYZ(i, vec3.x, vec3.y, vec3.z);
    }

    let mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
    mesh.rotateX(Math.PI / 2);
    mesh.rotateZ(Math.PI / 2);
    mesh.updateMatrix();

    let aCSG = CSG.fromMesh(mesh);
    mesh = CSG.toMesh(
      aCSG,
      new THREE.Matrix4(),
      new THREE.MeshLambertMaterial()
    );
    const finalGeometry = CSG.toGeometry(CSG.fromMesh(mesh));
    finalGeometry.type = 'G4TwistedBox';
    finalGeometry.parameters = { pName, pTwistedAngle, pDx, pDy, pDz };

    Object.assign(this, finalGeometry);
    this.name = pName || 'G4TwistedBox';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'twistedBox',
          geometryKey: 'pName',
        },
        pDx: {
          type: 'number',
          label: 'Half length X',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.5,
          geometryKey: 'pDx',
        },
        pDy: {
          type: 'number',
          label: 'Half length Y',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.7,
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
        pTwistedAngle: {
          type: 'angle',
          label: 'Twist angle',
          min: -180,
          max: 180,
          step: 1,
          default: 5,
          geometryKey: 'pTwistedAngle',
        },
      },
      validate: (params) => {
        if (params.pDx <= 0) params.pDx = 0.01;
        if (params.pDy <= 0) params.pDy = 0.01;
        if (params.pDz <= 0) params.pDz = 0.01;
        return params;
      },
      createGeometry: (params) =>
        new G4TwistedBox(
          params.pName,
          params.pTwistedAngle,
          params.pDx,
          params.pDy,
          params.pDz
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4TwistedBox';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pTwistedAngle, pDx, pDy, pDz } = data.parameters;
    return new G4TwistedBox(pName, pTwistedAngle, pDx, pDy, pDz);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4TwistedBox };
