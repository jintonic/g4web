---
title: 'g4web: A web-based user interface for Geant4 detector definition'
tags:
  - Geant4
  - particle physics
  - detector simulation
  - JavaScript
  - Three.js
  - web application
authors:
  - name: Jing Liu
    orcid: 0000-0003-1869-2407
    affiliation: 1
affiliations:
  - name: University of South Dakota
    index: 1
date: 24 May 2026
bibliography: paper.bib
---

# Summary

`g4web` is a browser-based graphical user interface for defining detector
geometry for [Geant4](https://geant4.web.cern.ch)-based particle physics
simulations [@agostinelli2003; @allison2016]. Users construct three-dimensional
detector volumes interactively in a 3D viewport — placing, sizing, and
configuring Geant4 solid shapes by clicking and dragging — and then export the
resulting geometry to a Text-based Geometry (`.tg`) file and a starter Geant4
run macro (`.mac`) that can be consumed directly by Geant4-based simulation
tools such as GEARS [@gears].

`g4web` is built on the official [Three.js Editor](https://threejs.org/editor/)
[@threejs] and extends it with Geant4-specific solid geometries (20+ types,
implemented in the companion `geant4-csg` npm package), a complete NIST
material database browser, and a custom export pipeline. The application runs
entirely in the browser: it requires no server-side computation and no local
software installation beyond a modern web browser. A live instance is deployed
automatically to GitHub Pages at <https://jintonic.github.io/g4web/>.

# Statement of Need

Defining detector geometry for Geant4 simulations has historically required
writing C++ code or learning a domain-specific text format. Both approaches
present a significant barrier for new users — students, experimental physicists
outside the software-development mainstream, and researchers who need to
iterate on detector designs quickly. While Geant4 provides a Text-based
Geometry reader that accepts a simpler macro-like syntax, constructing even a
modest multi-volume detector by hand is tedious and error-prone.

Several dedicated geometry editors exist for high-energy physics, but they
typically require local installation of large software stacks (ROOT, GDML
readers, or full Geant4 builds) and impose a steep learning curve before any
geometry can be visualised. Web-based alternatives that cover the full
Geant4 solid library and produce simulation-ready output files do not currently
exist.

`g4web` fills this gap by providing:

1. **Zero-installation access.** Any user with a modern browser can open the
   live demo and begin constructing detectors within minutes.
2. **Geant4-native vocabulary.** All shape names, parameter names, and material
   names match their Geant4 counterparts exactly, so the resulting `.tg` files
   require no manual translation.
3. **Complete NIST material database.** The sidebar exposes the full set of
   Geant4 NIST pre-defined materials, organised by category, so users do not
   need to memorise material string identifiers.
4. **Direct export to simulation-ready files.** The exported `.tg` and `.mac`
   files can be passed directly to GEARS [@gears] or any other tool with a
   built-in Text-based Geometry reader.

# Research Impact

`g4web` lowers the barrier to Geant4-based simulation in two ways. First, it
allows experimentalists who are not software developers to prototype and verify
detector geometries without writing any C++ or macro code. Second, it serves as
a pedagogical tool in university courses and workshops where students must
produce Geant4 geometries as part of a curriculum that emphasises physics
rather than software engineering.

The application is already deployed as a publicly accessible web service and
has been used in teaching activities. The underlying `geant4-csg` package is
independently published on npm and can be reused in other Three.js-based
scientific visualisation tools.

The non-destructive customisation architecture — in which all Geant4-specific
behaviour is applied via Vite module aliases, CSS overrides, and signal hooks,
without modifying any Three.js vendor files — means that `g4web` can adopt
upstream Three.js improvements by simply advancing a Git submodule pointer.
This design choice makes long-term maintenance sustainable for a small team.

# Acknowledgements

The author thanks the Three.js community for the editor framework and the
Geant4 collaboration for the simulation toolkit that motivates this work.
Development was supported in part by NSF Awards 2411825 & 2437416.

# References
