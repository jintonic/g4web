import * as THREE from 'three';

import { Editor } from 'three/editor/js/Editor.js';
import { Config } from 'three/editor/js/Config.js';
import { Viewport } from 'three/editor/js/Viewport.js';
import { Toolbar } from 'three/editor/js/Toolbar.js';
import { Sidebar } from 'three/editor/js/Sidebar.js';
import { Menubar } from 'three/editor/js/Menubar.js';
import { Player } from 'three/editor/js/Player.js';
import { Resizer } from 'three/editor/js/Resizer.js';

const config = new Config();
const editor = new Editor();
editor.config = config;
window.editor = editor; // ViewHelper often looks for window.editor!
window.THREE = THREE;

const viewport = new Viewport(editor);
const toolbar = new Toolbar(editor);
const sidebar = new Sidebar(editor);
const menubar = new Menubar(editor);
const player = new Player(editor);
const resizer = new Resizer(editor);

document.body.appendChild(viewport.dom);
document.body.appendChild(toolbar.dom);
document.body.appendChild(sidebar.dom);
document.body.appendChild(menubar.dom);
document.body.appendChild(player.dom);
document.body.appendChild(resizer.dom);

console.log('Modern Editor Initialized');
