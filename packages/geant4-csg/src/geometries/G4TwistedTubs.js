/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Cylindrical tube twisted along the Z axis.
 * Equivalent to Geant4's G4TwistedTubs.
 *
 * @param {string} pName         - Name of the solid
 * @param {number} pTwistedAngle - Twist angle in degrees
 * @param {number} pRmin         - Inner radius in centimeters
 * @param {number} pRmax         - Outer radius in centimeters
 * @param {number} pDz           - Half-length along Z in centimeters
 * @param {number} pSPhi         - Starting phi angle in degrees
 * @param {number} pDPhi         - Delta phi angle in degrees
 *
 * The tube is twisted so that the top face is rotated by pTwistedAngle
 * relative to the bottom face.
 */

import * as THREE from 'three';

class G4TwistedTubs extends THREE.BufferGeometry {
  constructor(pName, pTwistedAngle, pRmin, pRmax, pDz, pSPhi, pDPhi) {
    super();

    this.type = 'G4TwistedTubs';

    const numSide = 120;
    const halfDPhi = pDPhi / 2;
    const startAngle = THREE.MathUtils.degToRad(pSPhi - halfDPhi);
    const totalAngle = THREE.MathUtils.degToRad(pDPhi);
    const angleIncrement = totalAngle / numSide;

    const z = [-pDz, pDz];
    const rInner = [pRmin, pRmin];
    const rOuter = [pRmax, pRmax];

    const positions = [];
    const normals = [];
    const indices = [];
    let vertexCount = 0;

    const addTriangle = (v1, v2, v3, outward = true) => {
      positions.push(...v1, ...v2, ...v3);

      const e1 = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
      const e2 = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]];

      let n = [
        e1[1] * e2[2] - e1[2] * e2[1],
        e1[2] * e2[0] - e1[0] * e2[2],
        e1[0] * e2[1] - e1[1] * e2[0],
      ];

      const len = Math.sqrt(n[0] ** 2 + n[1] ** 2 + n[2] ** 2);
      n = n.map((v) => v / len);

      if (!outward) n = n.map((v) => -v);

      normals.push(...n, ...n, ...n);
      indices.push(vertexCount, vertexCount + 1, vertexCount + 2);
      vertexCount += 3;
    };

    const addQuad = (v1, v2, v3, v4, outward = true) => {
      addTriangle(v1, v2, v3, outward);
      addTriangle(v1, v3, v4, outward);
    };

    // ===== MAIN SURFACES =====
    for (let zIdx = 0; zIdx < 1; zIdx++) {
      const z1 = z[zIdx];
      const z2 = z[zIdx + 1];
      const rIn1 = rInner[zIdx];
      const rIn2 = rInner[zIdx + 1];
      const rOut1 = rOuter[zIdx];
      const rOut2 = rOuter[zIdx + 1];

      for (let phiIdx = 0; phiIdx < numSide; phiIdx++) {
        const phi1 = startAngle + phiIdx * angleIncrement;
        const phi2 = startAngle + (phiIdx + 1) * angleIncrement;

        const cos1 = Math.cos(phi1);
        const sin1 = Math.sin(phi1);
        const cos2 = Math.cos(phi2);
        const sin2 = Math.sin(phi2);

        // OUTER
        const outerV1 = [rOut1 * cos1, rOut1 * sin1, z1];
        const outerV2 = [rOut1 * cos2, rOut1 * sin2, z1];
        const outerV3 = [rOut2 * cos2, rOut2 * sin2, z2];
        const outerV4 = [rOut2 * cos1, rOut2 * sin1, z2];
        addQuad(outerV1, outerV2, outerV3, outerV4, true);

        // INNER (correct winding)
        const innerV1 = [rIn1 * cos1, rIn1 * sin1, z1];
        const innerV2 = [rIn1 * cos2, rIn1 * sin2, z1];
        const innerV3 = [rIn2 * cos2, rIn2 * sin2, z2];
        const innerV4 = [rIn2 * cos1, rIn2 * sin1, z2];
        addQuad(innerV1, innerV4, innerV3, innerV2, false);

        // BOTTOM CAP
        addQuad(innerV1, innerV2, outerV2, outerV1, false);

        // TOP CAP
        addQuad(innerV4, outerV4, outerV3, innerV3, true);
      }
    }

    // ===== PARTIAL PHI SIDE WALLS =====
    if (Math.abs(pDPhi - 360) > 0.001) {
      const numRadialSegments = numSide;

      // ---- FIRST SIDE ----
      const phi1 = startAngle;
      const cos1 = Math.cos(phi1);
      const sin1 = Math.sin(phi1);

      const innerBottom1 = [rInner[0] * cos1, rInner[0] * sin1, z[0]];
      const outerBottom1 = [rOuter[0] * cos1, rOuter[0] * sin1, z[0]];
      const innerTop1 = [rInner[1] * cos1, rInner[1] * sin1, z[1]];
      const outerTop1 = [rOuter[1] * cos1, rOuter[1] * sin1, z[1]];

      for (let i = 0; i < numRadialSegments; i++) {
        const t1 = i / numRadialSegments;
        const t2 = (i + 1) / numRadialSegments;

        const v1 = [
          innerBottom1[0] + t1 * (outerBottom1[0] - innerBottom1[0]),
          innerBottom1[1] + t1 * (outerBottom1[1] - innerBottom1[1]),
          z[0],
        ];
        const v2 = [
          innerBottom1[0] + t2 * (outerBottom1[0] - innerBottom1[0]),
          innerBottom1[1] + t2 * (outerBottom1[1] - innerBottom1[1]),
          z[0],
        ];
        const v3 = [
          innerTop1[0] + t2 * (outerTop1[0] - innerTop1[0]),
          innerTop1[1] + t2 * (outerTop1[1] - innerTop1[1]),
          z[1],
        ];
        const v4 = [
          innerTop1[0] + t1 * (outerTop1[0] - innerTop1[0]),
          innerTop1[1] + t1 * (outerTop1[1] - innerTop1[1]),
          z[1],
        ];

        addQuad(v1, v2, v3, v4, false);
      }

      // ---- SECOND SIDE ----
      const phi2 = startAngle + totalAngle;
      const cos2 = Math.cos(phi2);
      const sin2 = Math.sin(phi2);

      const innerBottom2 = [rInner[0] * cos2, rInner[0] * sin2, z[0]];
      const outerBottom2 = [rOuter[0] * cos2, rOuter[0] * sin2, z[0]];
      const innerTop2 = [rInner[1] * cos2, rInner[1] * sin2, z[1]];
      const outerTop2 = [rOuter[1] * cos2, rOuter[1] * sin2, z[1]];

      for (let i = 0; i < numRadialSegments; i++) {
        const t1 = i / numRadialSegments;
        const t2 = (i + 1) / numRadialSegments;

        const v1 = [
          innerBottom2[0] + t1 * (outerBottom2[0] - innerBottom2[0]),
          innerBottom2[1] + t1 * (outerBottom2[1] - innerBottom2[1]),
          z[0],
        ];
        const v2 = [
          innerBottom2[0] + t2 * (outerBottom2[0] - innerBottom2[0]),
          innerBottom2[1] + t2 * (outerBottom2[1] - innerBottom2[1]),
          z[0],
        ];
        const v3 = [
          innerTop2[0] + t2 * (outerTop2[0] - innerTop2[0]),
          innerTop2[1] + t2 * (outerTop2[1] - innerTop2[1]),
          z[1],
        ];
        const v4 = [
          innerTop2[0] + t1 * (outerTop2[0] - innerTop2[0]),
          innerTop2[1] + t1 * (outerTop2[1] - innerTop2[1]),
          z[1],
        ];

        addQuad(v2, v1, v4, v3, true);
      }
    }

    // ===== SET ATTRIBUTES =====
    this.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    this.setIndex(indices);

    // ===== TWIST =====
    const twistRad = (pTwistedAngle / 180) * Math.PI;
    const posAttr = this.getAttribute('position');
    const vec3 = new THREE.Vector3();

    const zMin = z[0];
    const zMax = z[1];
    const zRange = zMax - zMin;

    for (let i = 0; i < posAttr.count; i++) {
      vec3.fromBufferAttribute(posAttr, i);

      const normalizedZ = (vec3.z - zMin) / zRange;
      const centeredZ = normalizedZ - 0.5;
      const angle = centeredZ * twistRad;

      const r = Math.sqrt(vec3.x * vec3.x + vec3.y * vec3.y);
      const theta = Math.atan2(vec3.y, vec3.x);

      const newTheta = theta + angle;
      posAttr.setXYZ(i, r * Math.cos(newTheta), r * Math.sin(newTheta), vec3.z);
    }

    posAttr.needsUpdate = true;
    this.computeVertexNormals();

    this.parameters = {
      pName,
      pTwistedAngle,
      pRmin,
      pRmax,
      pDz,
      pSPhi,
      pDPhi,
    };
    this.name = pName || 'G4TwistedTubs';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'twistedTubs',
          geometryKey: 'pName',
        },
        pTwistedAngle: {
          type: 'angle',
          label: 'Twist Angle',
          min: -180,
          max: 180,
          step: 1,
          default: 45,
          geometryKey: 'pTwistedAngle',
        },
        pRmin: {
          type: 'number',
          label: 'Inner Radius',
          min: 0,
          max: Infinity,
          step: 0.1,
          default: 0.6,
          geometryKey: 'pRmin',
        },
        pRmax: {
          type: 'number',
          label: 'Outer Radius',
          min: 0.01,
          max: Infinity,
          step: 1.1,
          default: 1,
          geometryKey: 'pRmax',
        },
        pDz: {
          type: 'number',
          label: 'Half Z',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1,
          geometryKey: 'pDz',
        },
        pSPhi: {
          type: 'angle',
          label: 'Start Phi',
          min: 0,
          max: 360,
          step: 5,
          default: 0,
          geometryKey: 'pSPhi',
        },
        pDPhi: {
          type: 'angle',
          label: 'Angle of Segments',
          min: 1,
          max: 360,
          step: 1,
          default: 90,
          geometryKey: 'pDPhi',
        },
      },
      validate: (params) => {
        if (params.pRmax <= params.pRmin) params.pRmax = params.pRmin + 0.01;
        if (params.pDz <= 0) params.pDz = 0.01;
        return params;
      },
      createGeometry: (params) =>
        new G4TwistedTubs(
          params.pName,
          params.pTwistedAngle,
          params.pRmin,
          params.pRmax,
          params.pDz,
          params.pSPhi,
          params.pDPhi
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4TwistedTubs';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pTwistedAngle, pRmin, pRmax, pDz, pSPhi, pDPhi } =
      data.parameters;
    return new G4TwistedTubs(
      pName,
      pTwistedAngle,
      pRmin,
      pRmax,
      pDz,
      pSPhi,
      pDPhi
    );
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4TwistedTubs };
