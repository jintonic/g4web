import * as THREE from 'three';
import Signal from 'signals';

// 1. Establish MUST-HAVE globals before ANY other imports
window.THREE = THREE;
window.signals = Signal;

// 2. Import the UI library as a module and globalize it
// ViewHelper uses these internally
import * as UI from 'three/editor/js/libs/ui.js';
import * as UIThree from 'three/editor/js/libs/ui.three.js';
window.UI = { ...UI, ...UIThree };

// 3. Now it is safe to import the Editor components
import { Editor } from 'three/editor/js/Editor.js';
import { Config } from 'three/editor/js/Config.js';
import { Viewport } from 'three/editor/js/Viewport.js';
import { Toolbar } from 'three/editor/js/Toolbar.js';
import { Sidebar } from 'three/editor/js/Sidebar.js';
import { Menubar } from 'three/editor/js/Menubar.js';

import 'three/editor/css/main.css';

// 4. Initialize in the correct order
const config = new Config();
const editor = new Editor();
editor.config = config;
window.editor = editor; // ViewHelper often looks for window.editor!

const viewport = new Viewport(editor);
const toolbar = new Toolbar(editor);
const sidebar = new Sidebar(editor);
const menubar = new Menubar(editor);

// 4. Mount
document.body.appendChild(viewport.dom);
document.body.appendChild(toolbar.dom);
document.body.appendChild(sidebar.dom);
document.body.appendChild(menubar.dom);

console.log('Modern Editor Initialized');
