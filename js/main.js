import * as THREE from 'three';

// Use the aliases defined in the importmap
import { Editor } from 'three/editor/Editor.js';
import { Viewport } from 'three/editor/Viewport.js';
import { Toolbar } from 'three/editor/Toolbar.js';
import { Sidebar } from 'three/editor/Sidebar.js';
import { Menubar } from 'three/editor/Menubar.js';

// 1. Core Editor Setup
const editor = new Editor();

// 2. Initialize UI
const viewport = new Viewport(editor);
const toolbar = new Toolbar(editor);
const sidebar = new Sidebar(editor);
const menubar = new Menubar(editor);

// 3. Mount UI to DOM
document.body.appendChild(viewport.dom);
document.body.appendChild(toolbar.dom);
document.body.appendChild(sidebar.dom);
document.body.appendChild(menubar.dom);

// 4. Geant4 Bridge
const eventCountLabel = document.getElementById('event-count');

window.runSimulation = async function() {
    console.log("Starting Geant4 Simulation...");
    
    // Dynamically load the command to keep initial load light
    const { AddObjectCommand } = await import('three/editor/commands/AddObjectCommand.js');

    // Dummy geometry to represent a detected particle path or volume
    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 5);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.name = "G4_Track_Alpha";

    // Add to editor with undo/redo capability
    editor.execute(new AddObjectCommand(editor, cylinder));

    // Update your custom UI overlay
    if (eventCountLabel) {
        eventCountLabel.innerText = parseInt(eventCountLabel.innerText) + 1;
    }
};

// 5. Lifecycle Signals
window.addEventListener('resize', () => {
    editor.signals.windowResize.dispatch();
});

// Example: Listen for when the user changes the scene
editor.signals.sceneGraphChanged.add(() => {
    console.log('Scene changed: Update Geant4 state if necessary.');
});

console.log("Geant4 UI linked to Three.js Editor via Import Maps.");
