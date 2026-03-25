/**
 * @chitrashensah/geant4-csg
 * Geant4 solid geometries for Three.js - detector modeling
 *
 * Copyright (c) 2025 Chitrashen Sah
 * Licensed under MIT License
 */

import { G4Box } from './geometries/G4Box.js';
import { G4Cons } from './geometries/G4Cons.js';
import { G4Ellipsoid } from './geometries/G4Ellipsoid.js';
import { G4EllipticalCone } from './geometries/G4EllipticalCone.js';
import { G4EllipticalTube } from './geometries/G4EllipticalTube.js';
import { G4Hype } from './geometries/G4Hype.js';
import { G4Para } from './geometries/G4Para.js';
import { G4Polycone } from './geometries/G4Polycone.js';
import { G4Polyhedra } from './geometries/G4Polyhedra.js';
import { G4Sphere } from './geometries/G4Sphere.js';
import { G4Tet } from './geometries/G4Tet.js';
import { G4Torus } from './geometries/G4Torus.js';
import { G4Trap } from './geometries/G4Trap.js';
import { G4Trd } from './geometries/G4Trd.js';
import { G4Tubs } from './geometries/G4Tubs.js';
import { G4TwistedBox } from './geometries/G4TwistedBox.js';
import { G4TwistedTrap } from './geometries/G4TwistedTrap.js';
import { G4TwistedTrd } from './geometries/G4TwistedTrd.js';
import { G4TwistedTubs } from './geometries/G4TwistedTubs.js';
import { G4Trap4 } from './geometries/G4Trap4.js';
import { CSG } from './CSGMesh.js';

export {
  G4Box,
  G4Cons,
  G4Ellipsoid,
  G4EllipticalCone,
  G4EllipticalTube,
  G4Hype,
  G4Para,
  G4Polycone,
  G4Polyhedra,
  G4Sphere,
  G4Tet,
  G4Torus,
  G4Trap,
  G4Trd,
  G4Tubs,
  G4TwistedBox,
  G4TwistedTrap,
  G4TwistedTrd,
  G4TwistedTubs,
  G4Trap4,
  CSG,
};

export const GEOMETRY_CLASSES = {
  G4Box,
  G4Cons,
  G4Ellipsoid,
  G4EllipticalCone,
  G4EllipticalTube,
  G4Hype,
  G4Para,
  G4Polycone,
  G4Polyhedra,
  G4Sphere,
  G4Tet,
  G4Torus,
  G4Trap,
  G4Trd,
  G4Tubs,
  G4TwistedBox,
  G4TwistedTrap,
  G4TwistedTrd,
  G4TwistedTubs,
  G4Trap4,
};

export function getEditorConfig(geometryType, SetGeometryCommand) {
  const GeometryClass = GEOMETRY_CLASSES[geometryType];
  if (!GeometryClass || !GeometryClass.getEditorConfig) return null;
  const config = GeometryClass.getEditorConfig();
  config.SetGeometryCommand = SetGeometryCommand;
  return config;
}
