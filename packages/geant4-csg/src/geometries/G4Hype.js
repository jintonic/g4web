/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Hyperboloid of revolution — tube with hyperbolic profile.
 * Equivalent to Geant4's G4Hype.
 *
 * @param {string} pName         - Name of the solid
 * @param {number} pInnerRadius  - Inner radius at z=0 in centimeters
 * @param {number} pOuterRadius  - Outer radius at z=0 in centimeters
 * @param {number} pInnerStereo  - Inner stereo angle in degrees
 * @param {number} pOuterStereo  - Outer stereo angle in degrees
 * @param {number} pDz           - Half-length along Z in centimeters
 *
 * Radius at height z: r(z)^2 = r0^2 + (z * tan(stereo))^2
 * Setting stereo angles to 0 gives a plain cylindrical tube.
 */

import * as THREE from 'three';

class G4Hype extends THREE.BufferGeometry {
  constructor(
    pName,
    pInnerRadius,
    pOuterRadius,
    pInnerStereo,
    pOuterStereo,
    pDz
  ) {
    super();

    if (pOuterRadius <= pInnerRadius) pOuterRadius = pInnerRadius + 0.01;
    if (pDz <= 0) pDz = 0.01;

    this.type = 'G4Hype';

    const innerStereoRad = (pInnerStereo * Math.PI) / 180;
    const outerStereoRad = (pOuterStereo * Math.PI) / 180;
    const slopeOut = Math.tan(outerStereoRad);
    const slopeIn = Math.tan(innerStereoRad);

    const radialSegments = 64;
    const heightSegments = 32;

    const outerProfile = [];
    for (let i = 0; i <= heightSegments; i++) {
      const z = -pDz + (2 * pDz * i) / heightSegments;
      const r = Math.sqrt(pOuterRadius * pOuterRadius + (z * slopeOut) ** 2);
      outerProfile.push(new THREE.Vector2(r, z));
    }

    let innerProfile = [];
    if (pInnerRadius > 0) {
      for (let i = heightSegments; i >= 0; i--) {
        const z = -pDz + (2 * pDz * i) / heightSegments;
        const r = Math.sqrt(pInnerRadius * pInnerRadius + (z * slopeIn) ** 2);
        innerProfile.push(new THREE.Vector2(r, z));
      }
    }

    const profilePoints =
      pInnerRadius > 0
        ? [...outerProfile, ...innerProfile, outerProfile[0].clone()]
        : outerProfile;

    const latheGeometry = new THREE.LatheGeometry(
      profilePoints,
      radialSegments,
      0,
      Math.PI * 2
    );

    this.copy(latheGeometry);
    this.rotateX(Math.PI / 2);
    this.computeVertexNormals();
    this.type = 'G4Hype';
    this.parameters = {
      pName,
      pInnerRadius,
      pOuterRadius,
      pInnerStereo,
      pOuterStereo,
      pDz,
    };
    this.name = pName || 'G4Hype';
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'hype',
          geometryKey: 'pName',
        },
        pInnerRadius: {
          type: 'number',
          label: 'Inner radius',
          min: 0,
          max: (params) => params.pOuterRadius - 0.01,
          step: 0.1,
          default: 0.6,
          geometryKey: 'pInnerRadius',
        },
        pOuterRadius: {
          type: 'number',
          label: 'Outer radius',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 0.8,
          geometryKey: 'pOuterRadius',
        },
        pInnerStereo: {
          type: 'angle',
          label: 'Inner stereo angle',
          min: 0,
          max: 89,
          step: 1,
          default: 30,
          geometryKey: 'pInnerStereo',
        },
        pOuterStereo: {
          type: 'angle',
          label: 'Outer stereo angle',
          min: 0,
          max: 89,
          step: 1,
          default: 45,
          geometryKey: 'pOuterStereo',
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
      },
      validate: (params) => {
        if (params.pOuterRadius <= params.pInnerRadius)
          params.pOuterRadius = params.pInnerRadius + 0.01;
        if (params.pDz <= 0) params.pDz = 0.01;
        return params;
      },
      createGeometry: (params) =>
        new G4Hype(
          params.pName,
          params.pInnerRadius,
          params.pOuterRadius,
          params.pInnerStereo,
          params.pOuterStereo,
          params.pDz
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Hype';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const {
      pName,
      pInnerRadius,
      pOuterRadius,
      pInnerStereo,
      pOuterStereo,
      pDz,
    } = data.parameters;
    return new G4Hype(
      pName,
      pInnerRadius,
      pOuterRadius,
      pInnerStereo,
      pOuterStereo,
      pDz
    );
  }

  copy(source) {
    super.copy(source);
    if (source.parameters)
      this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Hype };
