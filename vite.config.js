import { defineConfig } from 'vite';
import path from 'path'; // a node.js built-in module to handle file system paths
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  // adjust base for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/g4web/' : '/',
  // prevent Vite from scanning the submodule for dependencies
  optimizeDeps: {
    entries: ['./index.html'], // Only scan your root HTML
    exclude: ['three/editor'], // Don't try to pre-bundle the editor files
  },
  resolve: {
    alias: {
      'three/addons/environments/ColorEnvironment.js': path.resolve(
        __dirname,
        'vendor/threejs/examples/jsm/environments/ColorEnvironment.js'
      ),
      // map the editor imports to local folder
      'three/editor': path.resolve(__dirname, 'vendor/threejs/editor'),

      // redirect the editor's internal relative paths to node_modules
      '/build/three.module.js': path.resolve(
        __dirname,
        'node_modules/three/build/three.module.js'
      ),
      '../../build/three.module.js': path.resolve(
        __dirname,
        'node_modules/three/build/three.module.js'
      ),
      'three/addons': path.resolve(
        __dirname,
        'node_modules/three/examples/jsm'
      ),
      '../../examples/jsm': path.resolve(
        __dirname,
        'node_modules/three/examples/jsm'
      ),
      'three/webgpu': path.resolve(
        __dirname,
        'node_modules/three/build/three.webgpu.js'
      ),
    },
  },
  build: {
    // ensure Rollup only looks at the main entry point
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});
