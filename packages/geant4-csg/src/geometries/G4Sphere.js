/**
 * @chitrashensah/geant4-csg
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

/**
 * Spherical sector geometry with inner/outer radius and angular cuts.
 * Equivalent to Geant4's G4Sphere.
 *
 * @param {string} pName    - Name of the solid
 * @param {number} pRmin    - Inner radius in centimeters
 * @param {number} pRmax    - Outer radius in centimeters
 * @param {number} pSPhi    - Starting phi angle in degrees
 * @param {number} pDPhi    - Delta phi angle in degrees
 * @param {number} pSTheta  - Starting theta angle in degrees
 * @param {number} pDTheta  - Delta theta angle in degrees
 */

import * as THREE from 'three';
import { CSG } from '../CSGMesh';

class G4Sphere extends THREE.BufferGeometry {
  constructor(pName, pRmin, pRmax, pSPhi, pDPhi, pSTheta, pDTheta) {
    super();

    if (pRmax <= pRmin) pRmax = pRmin + 0.01;

    this.type = 'G4Sphere';
    this.name = pName || 'G4Sphere';

    const pSTheta_rad = (pSTheta * Math.PI) / 180;
    const pDTheta_rad = (pDTheta * Math.PI) / 180;
    const pSPhi_rad = (pSPhi * Math.PI) / 180;
    const pDPhi_rad = (pDPhi * Math.PI) / 180;
    const pETheta = pSTheta_rad + pDTheta_rad;

    const sphereGeometry = new THREE.SphereGeometry(pRmax);
    const innerSphereGeometry = new THREE.SphereGeometry(pRmin);

    const boxGeometry = new THREE.BoxGeometry(pRmax * 2, pRmax, pRmax * 2);
    boxGeometry.rotateX(Math.PI / 2);
    boxGeometry.translate(0, 0, pRmax / 2);

    const cone1Geometry = new THREE.CylinderGeometry(
      pRmax * Math.tan(pSTheta_rad),
      0.00001,
      pRmax
    );
    cone1Geometry.rotateX(Math.PI / 2);
    cone1Geometry.translate(0, 0, pRmax / 2);

    const cone2Geometry = new THREE.CylinderGeometry(
      pRmax * Math.tan(pETheta),
      0.0001,
      pRmax
    );
    cone2Geometry.rotateX(Math.PI / 2);
    cone2Geometry.translate(0, 0, pRmax / 2);

    const cone3Geometry = new THREE.CylinderGeometry(
      0.0001,
      pRmax * Math.tan(Math.PI - pSTheta_rad),
      pRmax
    );
    cone3Geometry.rotateX(Math.PI / 2);
    cone3Geometry.translate(0, 0, -pRmax / 2);

    const cone4Geometry = new THREE.CylinderGeometry(
      0.0001,
      pRmax * Math.tan(Math.PI - pETheta),
      pRmax
    );
    cone4Geometry.rotateX(Math.PI / 2);
    cone4Geometry.translate(0, 0, -pRmax / 2);

    const pieShape = new THREE.Shape();
    pieShape.absarc(0, 0, pRmax, pSPhi_rad, pSPhi_rad + pDPhi_rad, false);
    pieShape.lineTo(0, 0);
    const extrusionSettings = { depth: 2 * pRmax, bevelEnabled: false };
    const pieGeometry = new THREE.ExtrudeGeometry(pieShape, extrusionSettings);
    pieGeometry.translate(0, 0, -pRmax);

    const sphereCSG = CSG.fromGeometry(sphereGeometry);
    const innerSphereCSG = CSG.fromGeometry(innerSphereGeometry);
    const cone1CSG = CSG.fromGeometry(cone1Geometry);
    const cone2CSG = CSG.fromGeometry(cone2Geometry);
    const cone3CSG = CSG.fromGeometry(cone3Geometry);
    const cone4CSG = CSG.fromGeometry(cone4Geometry);
    const boxCSG = CSG.fromGeometry(boxGeometry);
    const pieCSG = CSG.fromGeometry(pieGeometry);

    let resultCSG = sphereCSG;

    if (pSTheta_rad === 0 && pETheta > 0 && pETheta < Math.PI / 2) {
      resultCSG = cone2CSG.intersect(sphereCSG);
    } else if (pSTheta_rad === 0 && pETheta === Math.PI / 2) {
      resultCSG = boxCSG.intersect(sphereCSG);
    } else if (
      pSTheta_rad === 0 &&
      pETheta > Math.PI / 2 &&
      pETheta < Math.PI
    ) {
      resultCSG = sphereCSG.subtract(cone4CSG);
    } else if (
      pSTheta_rad > 0 &&
      pSTheta_rad < Math.PI / 2 &&
      pETheta > pSTheta_rad &&
      pETheta < Math.PI / 2
    ) {
      resultCSG = cone2CSG.subtract(cone1CSG).intersect(sphereCSG);
    } else if (
      pSTheta_rad > 0 &&
      pSTheta_rad < Math.PI / 2 &&
      pETheta === Math.PI / 2
    ) {
      resultCSG = boxCSG.subtract(cone1CSG).intersect(sphereCSG);
    } else if (
      pSTheta_rad > 0 &&
      pSTheta_rad < Math.PI / 2 &&
      pETheta > Math.PI / 2 &&
      pETheta < Math.PI
    ) {
      resultCSG = sphereCSG.subtract(cone1CSG).subtract(cone4CSG);
    } else if (
      pSTheta_rad > 0 &&
      pSTheta_rad < Math.PI / 2 &&
      pETheta === Math.PI
    ) {
      resultCSG = sphereCSG.subtract(cone1CSG);
    } else if (
      pSTheta_rad === Math.PI / 2 &&
      pETheta > Math.PI / 2 &&
      pETheta < Math.PI
    ) {
      resultCSG = sphereCSG.subtract(boxCSG).subtract(cone4CSG);
    } else if (pSTheta_rad === Math.PI / 2 && pETheta === Math.PI) {
      resultCSG = sphereCSG.subtract(boxCSG);
    } else if (
      pSTheta_rad > Math.PI / 2 &&
      pSTheta_rad < Math.PI &&
      pETheta > pSTheta_rad &&
      pETheta < Math.PI
    ) {
      resultCSG = cone3CSG.subtract(cone4CSG).intersect(sphereCSG);
    } else if (
      pSTheta_rad > Math.PI / 2 &&
      pSTheta_rad < Math.PI &&
      pETheta === Math.PI
    ) {
      resultCSG = sphereCSG.intersect(cone3CSG);
    }

    if (pDPhi_rad < Math.PI * 2) {
      resultCSG = resultCSG.intersect(pieCSG);
    }

    if (pRmin > 0) {
      resultCSG = resultCSG.subtract(innerSphereCSG);
    }

    const finalGeometry = CSG.toGeometry(resultCSG);
    finalGeometry.type = 'G4Sphere';
    finalGeometry.parameters = {
      pName,
      pRmin,
      pRmax,
      pSPhi,
      pDPhi,
      pSTheta,
      pDTheta,
    };

    Object.assign(this, finalGeometry);
  }

  static getEditorConfig() {
    return {
      parameters: {
        pName: {
          type: 'string',
          label: 'Name',
          default: 'Sphere',
          geometryKey: 'pName',
        },
        pRmin: {
          type: 'number',
          label: 'Inner radius',
          min: 0,
          max: (params) => params.pRmax - 0.01,
          step: 0.1,
          default: 0.5,
          geometryKey: 'pRmin',
        },
        pRmax: {
          type: 'number',
          label: 'Outer radius',
          min: 0.01,
          max: Infinity,
          step: 0.1,
          default: 1.0,
          geometryKey: 'pRmax',
        },
        pSPhi: {
          type: 'angle',
          label: 'Starting Phi angle',
          min: 0,
          max: 360,
          step: 5,
          default: 90,
          geometryKey: 'pSPhi',
        },
        pDPhi: {
          type: 'angle',
          label: 'Delta Phi angle',
          min: 0,
          max: 360,
          step: 1,
          default: 270,
          geometryKey: 'pDPhi',
        },
        pSTheta: {
          type: 'angle',
          label: 'Starting Theta angle',
          min: 0,
          max: 180,
          step: 1,
          default: 90,
          geometryKey: 'pSTheta',
        },
        pDTheta: {
          type: 'angle',
          label: 'Delta Theta angle',
          min: 0,
          max: 180,
          step: 1,
          default: 90,
          geometryKey: 'pDTheta',
        },
      },
      validate: (params) => {
        if (params.pRmax <= params.pRmin) params.pRmax = params.pRmin + 0.01;
        if (params.pRmin >= params.pRmax) params.pRmin = params.pRmax - 0.01;
        return params;
      },
      createGeometry: (params) =>
        new G4Sphere(
          params.pName,
          params.pRmin,
          params.pRmax,
          params.pSPhi,
          params.pDPhi,
          params.pSTheta,
          params.pDTheta
        ),
    };
  }

  toJSON() {
    const data = super.toJSON();
    data.type = 'G4Sphere';
    data.parameters = this.parameters;
    return data;
  }

  static fromJSON(data) {
    const { pName, pRmin, pRmax, pSPhi, pDPhi, pSTheta, pDTheta } =
      data.parameters;
    return new G4Sphere(pName, pRmin, pRmax, pSPhi, pDPhi, pSTheta, pDTheta);
  }

  copy(source) {
    super.copy(source);
    this.parameters = Object.assign({}, source.parameters);
    return this;
  }
}

export { G4Sphere };
