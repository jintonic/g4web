# Geometry Export

g4web can export a detector geometry to two files that can be consumed
directly by Geant4-based simulation tools.

---

## Exported File Formats

### `detector.tg` — Text-based Geometry

The `.tg` format is a human-readable text description of a Geant4 geometry.
It is supported by [GEARS](https://github.com/jintonic/gears) (Geant4 Examples
with Almighty Retrospective Simulation) and other tools that have a built-in
text geometry reader.

Each solid in the scene is translated to one `:solid` command, one `:volume`
command, and one `:place` command:

```text
// Half x, Half y, Half z
:solid myBox BOX 5*cm 5*cm 5*cm

:volu myBox G4_WATER myBox

:place myBox 1 world 0 0 0
```

Rotation matrices are emitted as `:rotm` commands when an object has non-zero
rotation.

#### Supported Solid Types

| g4web geometry   | `.tg` keyword  | Geant4 class     |
| ---------------- | -------------- | ---------------- |
| G4Box            | BOX            | G4Box            |
| G4Tubs           | TUBS           | G4Tubs           |
| G4Cons           | CONS           | G4Cons           |
| G4Sphere         | SPHERE         | G4Sphere         |
| G4Torus          | TORUS          | G4Torus          |
| G4Para           | PARA           | G4Para           |
| G4Trd            | TRD            | G4Trd            |
| G4Trap           | TRAP           | G4Trap           |
| G4Trap4          | TRAP           | G4Trap (4-param) |
| G4Ellipsoid      | ELLIPSOID      | G4Ellipsoid      |
| G4EllipticalTube | ELLIPTICALTUBE | G4EllipticalTube |
| G4EllipticalCone | ELLIPTICALCONE | G4EllipticalCone |
| G4Hype           | HYPE           | G4Hype           |
| G4Polycone       | POLYCONE       | G4Polycone       |
| G4Polyhedra      | POLYHEDRA      | G4Polyhedra      |
| G4TwistedBox     | TWISTEDBOX     | G4TwistedBox     |
| G4TwistedTrd     | TWISTEDTRD     | G4TwistedTrd     |
| G4TwistedTrap    | TWISTEDTRAP    | G4TwistedTrap    |
| G4TwistedTubs    | TWISTEDTUBS    | G4TwistedTubs    |

### `run.mac` — Geant4 Run Macro

A starter macro that:

1. Initialises the geometry and physics list.
2. Configures an isotropic gamma-ray point source at 2.6 MeV.
3. Opens a visualisation driver and draws the geometry.
4. Runs 100 events.

```
/control/verbose 1
/run/initialize
/gps/particle gamma
/gps/energy 2.6 MeV
/gps/ang/type iso
/vis/open
/vis/drawVolume
/vis/scene/add/trajectories
/vis/scene/endOfEventAction accumulate
/run/beamOn 100
```

Customise the particle type, energy, and number of events before running your
full simulation.

---

## Using the Exported Files with GEARS

1. Install [GEARS](https://github.com/jintonic/gears) following its README.
2. Place `detector.tg` and `run.mac` in the same directory.
3. Specify the geometry file in `run.mac` by adding:
   ```
   /geometry/importTextGeometry detector.tg
   ```
   (exact command depends on your GEARS version; refer to the GEARS documentation).
4. Run the simulation:
   ```bash
   gears run.mac
   ```

---

## Units Convention

All length parameters exported by g4web are in **centimetres** (e.g., `5*cm`).
Angular parameters are in **degrees**.

This matches the default unit system used by GEARS and the Geant4 Text-based
Geometry reader.

---

## Custom Materials in the Export

If a material is assigned to a volume and it is not a standard NIST material,
a `:mixt` or `:elem` line is prepended to the `.tg` file. Standard NIST
materials (those whose names start with `G4_`) do not require a custom
definition because they are built into Geant4.

---

## Limitations

- **CSG (Boolean) operations** (union, subtraction, intersection) are not yet
  exported. Objects constructed with Boolean operations in the viewport will be
  omitted from the `.tg` file. This is planned for a future release.
- **Sensitive detector** assignment is not yet reflected in the `.tg` export.
- The **world volume** is assumed to be defined externally (by GEARS). g4web
  exports only the user-defined solids.
