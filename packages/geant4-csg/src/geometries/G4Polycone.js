/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Multi-section solid of revolution defined by Z-plane data.
 * Equivalent to Geant4's G4Polycone.
 *
 * @param {string} pName      - Name of the solid
 * @param {number} pSPhi      - Starting phi angle in degrees
 * @param {number} pDPhi      - Delta phi angle in degrees
 * @param {number} numZPlanes - Number of Z planes
 * @param {number[]} zPlaneData - Flat array of [z, rInner, rOuter] per plane in centimeters
 *
 * Each Z plane defines a cross-sectional annulus.
 * zPlaneData layout: [z0, rInner0, rOuter0, z1, rInner1, rOuter1, ...]
 */

import * as THREE from 'three';

class G4Polycone extends THREE.BufferGeometry {
  constructor(pName, pSPhi, pDPhi, numZPlanes, zPlaneData) {
    super();

    this.type = 'G4Polycone';

    const z = [],
      rInner = [],
      rOuter = [];
    for (let i = 0; i < numZPlanes; i++) {
      const b = i * 3;
      z.push(zPlaneData[b]);
      rInner.push(zPlaneData[b + 1] === 0 ? 0.00001 : zPlaneData[b + 1]);
      rOuter.push(Math.max(zPlaneData[b + 2], 0.001));
    }

    const startAngle = THREE.MathUtils.degToRad(pSPhi);
    const totalAngle = THREE.MathUtils.degToRad(pDPhi);
    const phiSegments = Math.max(Math.ceil(pDPhi / 15), 8);
    const angleIncrement = totalAngle / phiSegments;

    const positions = [],
      normals = [],
      indices = [];
    let vertexCount = 0;

    const addTriangle = (v1, v2, v3, normalIsOutward = true) => {
      positions.push(...v1, ...v2, ...v3);
      const edge1 = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
      const edge2 = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]];
      let normal = [
        edge1[1] * edge2[2] - edge1[2] * edge2[1],
        edge1[2] * edge2[0] - edge1[0] * edge2[2],
        edge1[0] * edge2[1] - edge1[1] * edge2[0],
      ];
      const length = Math.sqrt(
        normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2
      );
      if (length > 0)
        normal = [normal[0] / length, normal[1] / length, normal[2] / length];
      if (!normalIsOutward) normal = [-normal[0], -normal[1], -normal[2]];
      normals.push(...normal, ...normal, ...normal);
      indices.push(vertexCount, vertexCount + 1, vertexCount + 2);
      vertexCount += 3;
    };

    const addQuad = (v1, v2, v3, v4, normalIsOutward = true) => {
      addTriangle(v1, v2, v3, normalIsOutward);
      addTriangle(v1, v3, v4, normalIsOutward);
    };

    for (let zIdx = 0; zIdx < numZPlanes - 1; zIdx++) {
      const z1 = z[zIdx],
        z2 = z[zIdx + 1];
      const rIn1 = rInner[zIdx],
        rIn2 = rInner[zIdx + 1];
      const rOut1 = rOuter[zIdx],
        rOut2 = rOuter[zIdx + 1];

      for (let phiIdx = 0; phiIdx < phiSegments; phiIdx++) {
        const phi1 = startAngle + phiIdx * angleIncrement;
        const phi2 = startAngle + (phiIdx + 1) * angleIncrement;
        const cos1 = Math.cos(phi1),
          sin1 = Math.sin(phi1);
        const cos2 = Math.cos(phi2),
          sin2 = Math.sin(phi2);

        const outerV1 = [rOut1 * cos1, rOut1 * sin1, z1];
        const outerV2 = [rOut1 * cos2, rOut1 * sin2, z1];
        const outerV3 = [rOut2 * cos2, rOut2 * sin2, z2];
        const outerV4 = [rOut2 * cos1, rOut2 * sin1, z2];
        addQuad(outerV1, outerV2, outerV3, outerV4, true);

        if (rIn1 > 0 && rIn2 > 0) {
          const innerV1 = [rIn1 * cos1, rIn1 * sin1, z1];
          const innerV2 = [rIn1 * cos2, rIn1 * sin2, z1];
          const innerV3 = [rIn2 * cos2, rIn2 * sin2, z2];
          const innerV4 = [rIn2 * cos1, rIn2 * sin1, z2];
          addQuad(innerV1, innerV4, innerV3, innerV2, false);
          addQuad(innerV1, innerV2, outerV2, outerV1, false);
          addQuad(innerV4, outerV4, outerV3, innerV3, true);
        } else {
          if (zIdx === 0 || rInner[zIdx - 1] > 0) {
            addTriangle([0, 0, z1], outerV1, outerV2, false);
          }
          if (zIdx === numZPlanes - 2 || rInner[zIdx + 2] > 0) {
            addTriangle([0, 0, z2], outerV3, outerV4, true);
          }
        }
      }
    }

    if (Math.abs(pDPhi - 360) > 0.001) {
      for (let zIdx = 0; zIdx < numZPlanes - 1; zIdx++) {
        const z1 = z[zIdx],
          z2 = z[zIdx + 1];
        const rIn1 = rInner[zIdx],
          rIn2 = rInner[zIdx + 1];
        const rOut1 = rOuter[zIdx],
          rOut2 = rOuter[zIdx + 1];

        const phi = startAngle;
        const cosPhi = Math.cos(phi),
          sinPhi = Math.sin(phi);

        if (rIn1 > 0 && rIn2 > 0) {
          addQuad(
            [rIn1 * cosPhi, rIn1 * sinPhi, z1],
            [rOut1 * cosPhi, rOut1 * sinPhi, z1],
            [rOut2 * cosPhi, rOut2 * sinPhi, z2],
            [rIn2 * cosPhi, rIn2 * sinPhi, z2],
            false
          );
        } else {
          addQuad(
            [0, 0, z1],
            [rOut1 * cosPhi, rOut1 * sinPhi, z1],
            [rOut2 * cosPhi, rOut2 * sinPhi, z2],
            [0, 0, z2],
            false
          );
        }
      }

      for (let zIdx = 0; zIdx < numZPlanes - 1; zIdx++) {
        const z1 = z[zIdx],
          z2 = z[zIdx + 1];
        const rIn1 = rInner[zIdx],
          rIn2 = rInner[zIdx + 1];
        const rOut1 = rOuter[zIdx],
          rOut2 = rOuter[zIdx + 1];

        const phi = startAngle + totalAngle;
        const cosPhi = Math.cos(phi),
          sinPhi = Math.sin(phi);

        if (rIn1 > 0 && rIn2 > 0) {
          addQuad(
            [rOut1 * cosPhi, rOut1 * sinPhi, z1],
            [rIn1 * cosPhi, rIn1 * sinPhi, z1],
            [rIn2 * cosPhi, rIn2 * sinPhi, z2],
            [rOut2 * cosPhi, rOut2 * sinPhi, z2],
            true
          );
        } else {
          addQuad(
            [rOut1 * cosPhi, rOut1 * sinPhi, z1],
            [0, 0, z1],
            [0, 0, z2],
            [rOut2 * cosPhi, rOut2 * sinPhi, z2],
            true
          );
        }
      }
    }

    this.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    this.setIndex(indices);
    this.computeVertexNormals();

    this.parameters = {
      pName,
      pSPhi,
      pDPhi,
      numZPlanes,
      zPlaneData: zPlaneData.slice(),
    };
    this.name = pName || 'G4Polycone';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'polycone',
          geometryKey: 'pName',
        },
        pSPhi: {
          type: 'angle',
          label: 'Initial Phi starting angle',
          default: 90,
          min: 0,
          max: 360,
          step: 5,
          geometryKey: 'pSPhi',
        },
        pDPhi: {
          type: 'angle',
          label: 'Total Phi angle',
          default: 270,
          min: 1,
          max: 360,
          step: 1,
          geometryKey: 'pDPhi',
        },
        numZPlanes: {
          type: 'integer',
          label: 'Number of Z planes',
          default: 4,
          min: 2,
          geometryKey: 'numZPlanes',
        },
        zPlaneData: {
          type: 'zplane',
          label: 'Z Planes',
          default: [
            -0.6, 0.4, 0.5, 0.575, 0.4, 0.5, 0.5751, 0.4, 0.6, 0.7, 0.4, 0.6,
          ],
          geometryKey: 'zPlaneData',
        },
      },
      validate: (params) => params,
      createGeometry: (params) =>
        new G4Polycone(
          params.pName,
          params.pSPhi,
          params.pDPhi,
          params.numZPlanes,
          params.zPlaneData
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Polycone';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pSPhi, pDPhi, numZPlanes, zPlaneData } = data.parameters;
    return new G4Polycone(pName, pSPhi, pDPhi, numZPlanes, zPlaneData);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Polycone };
