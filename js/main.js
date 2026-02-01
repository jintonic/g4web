import { Editor } from 'three/editor/js/Editor.js';
const editor = new Editor();
window.editor = editor;

console.log('create editor UI');

import { Viewport } from 'three/editor/js/Viewport.js';
import { Menubar } from 'three/editor/js/Menubar.js';
import { Toolbar } from 'three/editor/js/Toolbar.js';
import { Sidebar } from 'three/editor/js/Sidebar.js';
import { Resizer } from 'three/editor/js/Resizer.js';

const viewport = new Viewport(editor);
const menubar = new Menubar(editor);
const toolbar = new Toolbar(editor);
const sidebar = new Sidebar(editor);
const resizer = new Resizer(editor);

// keep everything above viewport
document.body.appendChild(viewport.dom);
document.body.appendChild(menubar.dom);
document.body.appendChild(toolbar.dom);
document.body.appendChild(sidebar.dom);
document.body.appendChild(resizer.dom);

import * as THREE from 'three';
window.THREE = THREE;
// create a renderer to render the scene
editor.signals.rendererCreated.dispatch(
  new THREE.WebGLRenderer({ antialias: true })
);
// trigger re-rendering upon window resize
window.addEventListener('resize', () => editor.signals.windowResize.dispatch());
editor.signals.windowResize.dispatch();

console.log('editor UI created');

console.log('enable auto save');
import { autoSave } from './Storage.js';
autoSave(editor);
console.log('auto save enabled');

console.log('enable file drop');
import { FileDropHandler } from './FileDropHandler.js';
new FileDropHandler(editor);
console.log('file drop enabled');
