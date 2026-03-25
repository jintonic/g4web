import * as THREE from 'three';
import {
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
} from '@chitrashensah/geant4-csg';
import { UIDiv, UIPanel } from '../vendor/threejs/editor/js/libs/ui.js';
import { AddObjectCommand } from '../vendor/threejs/editor/js/commands/AddObjectCommand.js';

import boxImg from '../packages/geant4-csg/images/aBox.jpg';
import consImg from '../packages/geant4-csg/images/aCons.jpg';
import ellipsoidImg from '../packages/geant4-csg/images/aEllipsoid.jpg';
import ellConeImg from '../packages/geant4-csg/images/aEllipticalCone.jpg';
import ellTubeImg from '../packages/geant4-csg/images/aEllipticalTube.jpg';
import hypeImg from '../packages/geant4-csg/images/aHyperboloid.jpg';
import paraImg from '../packages/geant4-csg/images/aPara.jpg';
import polyconeImg from '../packages/geant4-csg/images/aBREPSolidPCone.jpg';
import polyhedraImg from '../packages/geant4-csg/images/aBREPSolidPolyhedra.jpg';
import sphereImg from '../packages/geant4-csg/images/aOrb.jpg';
import tetImg from '../packages/geant4-csg/images/aTet.jpg';
import torusImg from '../packages/geant4-csg/images/aTorus.jpg';
import trapImg from '../packages/geant4-csg/images/aTrap.jpg';
import trdImg from '../packages/geant4-csg/images/aTrd.jpg';
import tubsImg from '../packages/geant4-csg/images/aTubs.jpg';
import twistedBoxImg from '../packages/geant4-csg/images/aTwistedBox.jpg';
import twistedTrapImg from '../packages/geant4-csg/images/aTwistedTrap.jpg';
import twistedTrdImg from '../packages/geant4-csg/images/aTwistedTrd.jpg';
import twistedTubsImg from '../packages/geant4-csg/images/aTwistedTubs.jpg';
import trap4Img from '../packages/geant4-csg/images/Trap4.jpg';

function LeftPanelSolids(editor) {
  const camera = editor.camera;

  const container = new UIPanel();
  container.setId('leftpanel');

  function getPositionFromMouse(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const renderer =
      document.getElementById('viewport') ||
      document.querySelector('.Viewport');

    if (!renderer) {
      return new THREE.Vector3(0, 0, 0);
    }

    const rect = renderer.getBoundingClientRect();
    const mouseSceneX = ((mouseX - rect.left) / rect.width) * 2 - 1;
    const mouseSceneY = -((mouseY - rect.top) / rect.height) * 2 + 1;

    const mouseScenePosition = new THREE.Vector3(mouseSceneX, mouseSceneY, 0);
    mouseScenePosition.unproject(camera);

    const direction = mouseScenePosition.sub(camera.position).normalize();
    const distance = -camera.position.y / direction.y;
    const position = camera.position
      .clone()
      .add(direction.multiplyScalar(distance));

    return position;
  }

  function createShapeItem(config) {
    const item = new UIDiv();
    item.setClass('Category-item');

    if (config.image) {
      item.dom.style.backgroundImage = `url(${config.image})`;
    } else {
      item.dom.classList.add('no-image');
    }

    item.dom.setAttribute('draggable', true);
    item.dom.setAttribute('item-type', config.type);

    const textDiv = document.createElement('div');
    textDiv.textContent = config.name;
    item.dom.appendChild(textDiv);

    item.onClick(function () {
      const geometry = config.createGeometry();
      const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
      mesh.name = `${config.displayName}_${mesh.uuid.substring(0, 6)}`;
      geometry.name = `${geometry.name}_${mesh.uuid.substring(0, 6)}`;
      geometry.type = config.type;
      editor.execute(new AddObjectCommand(editor, mesh));
    });

    item.dom.addEventListener('dragend', function (event) {
      const position = getPositionFromMouse(event);
      const geometry = config.createGeometry();
      const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
      mesh.name = `${config.displayName}_${mesh.uuid.substring(0, 6)}`;
      geometry.name = `${geometry.name}_${mesh.uuid.substring(0, 6)}`;
      geometry.type = config.type;

      mesh.position.copy(position);
      editor.execute(new AddObjectCommand(editor, mesh));
    });

    return item;
  }

  function createItem(title, shapes) {
    const section = new UIPanel();
    section.setClass('Panel-section');

    const header = new UIDiv();
    header.setClass('Panel-header');
    header.setTextContent(title);
    section.add(header);

    const widget = new UIPanel();
    widget.setClass('Category-widget');

    shapes.forEach((shapeConfig) => {
      const shapeItem = createShapeItem(shapeConfig);
      widget.add(shapeItem);
    });

    section.add(widget);

    let isCollapsed = false;
    header.onClick(function () {
      isCollapsed = !isCollapsed;
      widget.dom.style.display = isCollapsed ? 'none' : 'block';
    });

    return section;
  }

  function createDefaultGeometry(GeometryClass) {
    const config = GeometryClass.getEditorConfig();
    const params = {};
    Object.keys(config.parameters).forEach((key) => {
      params[key] = config.parameters[key].default;
    });
    return config.createGeometry(params);
  }

  const solidsShapes = [
    {
      name: 'G4Box',
      displayName: 'v',
      type: 'G4Box',
      image: boxImg,
      createGeometry: () => createDefaultGeometry(G4Box),
    },
    {
      name: 'G4Cons',
      displayName: 'v',
      type: 'G4Cons',
      image: consImg,
      createGeometry: () => createDefaultGeometry(G4Cons),
    },
    {
      name: 'G4Ellipsoid',
      displayName: 'v',
      type: 'G4Ellipsoid',
      image: ellipsoidImg,
      createGeometry: () => createDefaultGeometry(G4Ellipsoid),
    },
    {
      name: 'G4EllipticalCone',
      displayName: 'v',
      type: 'G4EllipticalCone',
      image: ellConeImg,
      createGeometry: () => createDefaultGeometry(G4EllipticalCone),
    },
    {
      name: 'G4EllipticalTube',
      displayName: 'v',
      type: 'G4EllipticalTube',
      image: ellTubeImg,
      createGeometry: () => createDefaultGeometry(G4EllipticalTube),
    },
    {
      name: 'G4Hype',
      displayName: 'v',
      type: 'G4Hype',
      image: hypeImg,
      createGeometry: () => createDefaultGeometry(G4Hype),
    },
    {
      name: 'G4Para',
      displayName: 'v',
      type: 'G4Para',
      image: paraImg,
      createGeometry: () => createDefaultGeometry(G4Para),
    },
    {
      name: 'G4Polycone',
      displayName: 'v',
      type: 'G4Polycone',
      image: polyconeImg,
      createGeometry: () => createDefaultGeometry(G4Polycone),
    },
    {
      name: 'G4Polyhedra',
      displayName: 'v',
      type: 'G4Polyhedra',
      image: polyhedraImg,
      createGeometry: () => createDefaultGeometry(G4Polyhedra),
    },
    {
      name: 'G4Sphere',
      displayName: 'v',
      type: 'G4Sphere',
      image: sphereImg,
      createGeometry: () => createDefaultGeometry(G4Sphere),
    },
    {
      name: 'G4Tet',
      displayName: 'v',
      type: 'G4Tet',
      image: tetImg,
      createGeometry: () => createDefaultGeometry(G4Tet),
    },
    {
      name: 'G4Torus',
      displayName: 'v',
      type: 'G4Torus',
      image: torusImg,
      createGeometry: () => createDefaultGeometry(G4Torus),
    },
    {
      name: 'G4Trap',
      displayName: 'v',
      type: 'G4Trap',
      image: trapImg,
      createGeometry: () => createDefaultGeometry(G4Trap),
    },
    {
      name: 'G4Trap4',
      displayName: 'v',
      type: 'G4Trap4',
      image: trap4Img,
      createGeometry: () => createDefaultGeometry(G4Trap4),
    },
    {
      name: 'G4Trd',
      displayName: 'v',
      type: 'G4Trd',
      image: trdImg,
      createGeometry: () => createDefaultGeometry(G4Trd),
    },
    {
      name: 'G4Tubs',
      displayName: 'v',
      type: 'G4Tubs',
      image: tubsImg,
      createGeometry: () => createDefaultGeometry(G4Tubs),
    },
    {
      name: 'G4TwistedBox',
      displayName: 'v',
      type: 'G4TwistedBox',
      image: twistedBoxImg,
      createGeometry: () => createDefaultGeometry(G4TwistedBox),
    },
    {
      name: 'G4TwistedTrap',
      displayName: 'v',
      type: 'G4TwistedTrap',
      image: twistedTrapImg,
      createGeometry: () => createDefaultGeometry(G4TwistedTrap),
    },
    {
      name: 'G4TwistedTrd',
      displayName: 'v',
      type: 'G4TwistedTrd',
      image: twistedTrdImg,
      createGeometry: () => createDefaultGeometry(G4TwistedTrd),
    },
    {
      name: 'G4TwistedTubs',
      displayName: 'v',
      type: 'G4TwistedTubs',
      image: twistedTubsImg,
      createGeometry: () => createDefaultGeometry(G4TwistedTubs),
    },
  ];

  const solidsSection = createItem('SOLIDS', solidsShapes);
  container.add(solidsSection);

  return container;
}

export { LeftPanelSolids };
