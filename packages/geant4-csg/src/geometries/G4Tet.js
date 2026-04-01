/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Tetrahedron defined by 4 vertex points.
 * Equivalent to Geant4's G4Tet.
 *
 * @param {string}   pName  - Name of the solid
 * @param {number[]} anchor - First vertex [x, y, z] in centimeters
 * @param {number[]} pP2    - Second vertex [x, y, z] in centimeters
 * @param {number[]} pP3    - Third vertex [x, y, z] in centimeters
 * @param {number[]} pP4    - Fourth vertex [x, y, z] in centimeters
 *
 * The four vertices must not be coplanar.
 */

import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';

class G4Tet extends THREE.BufferGeometry {
  constructor(pName, anchor, pP2, pP3, pP4) {
    super();

    this.type = 'G4Tet';

    const points = [
      new THREE.Vector3(...anchor),
      new THREE.Vector3(...pP2),
      new THREE.Vector3(...pP3),
      new THREE.Vector3(...pP4),
    ];

    const convexGeometry = new ConvexGeometry(points);
    const mesh = new THREE.Mesh(
      convexGeometry,
      new THREE.MeshLambertMaterial()
    );
    mesh.rotateX(Math.PI / 2);
    mesh.updateMatrix();

    const finalGeometry = mesh.geometry.clone();
    finalGeometry.type = 'G4Tet';
    finalGeometry.parameters = {
      pName,
      anchor: anchor.slice(),
      pP2: pP2.slice(),
      pP3: pP3.slice(),
      pP4: pP4.slice(),
    };

    Object.assign(this, finalGeometry);
    this.parameters = finalGeometry.parameters;
    this.name = pName || 'G4Tet';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'tet',
          geometryKey: 'pName',
        },
        anchor: {
          type: 'vector3',
          label: 'anchor',
          default: [0, 0.5, 0],
          geometryKey: 'anchor',
        },
        pP2: {
          type: 'vector3',
          label: 'point2',
          default: [0, -0.5, 1.0],
          geometryKey: 'pP2',
        },
        pP3: {
          type: 'vector3',
          label: 'point3',
          default: [-0.8, -0.5, -0.5],
          geometryKey: 'pP3',
        },
        pP4: {
          type: 'vector3',
          label: 'point4',
          default: [0.8, -0.5, -0.5],
          geometryKey: 'pP4',
        },
      },
      validate: (params) => params,
      createGeometry: (params) =>
        new G4Tet(
          params.pName,
          params.anchor,
          params.pP2,
          params.pP3,
          params.pP4
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Tet';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, anchor, pP2, pP3, pP4 } = data.parameters;
    return new G4Tet(pName, anchor, pP2, pP3, pP4);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Tet };
