// replace Viewport.Pathtracer.js
export class ViewportPathtracer {
  constructor() {
    // Provide empty methods so Viewport calls don't fail
    this.init = () => {};
    this.reset = () => {};
    this.update = () => {};
    this.setSize = () => {};
    this.getSamples = () => {};
    this.setBackground = () => {};
    this.setEnvironment = () => {};
    this.updateMaterials = () => {};
  }
}

// replace Sidebar.Project.js
import { UIPanel } from 'three/editor/js/libs/ui.js';
export function SidebarProject(editor) {
  return new UIPanel();
}
