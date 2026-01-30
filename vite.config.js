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
    exclude: ['three', 'three/editor'], // Don't try to pre-bundle the editor files
  },
  resolve: {
    alias: {
      'three/editor': path.resolve(__dirname, 'vendor/threejs/editor'),
      'three/addons': path.resolve(__dirname, 'vendor/threejs/examples/jsm'),
      'three/examples': path.resolve(__dirname, 'vendor/threejs/examples'),
      'three/webgpu': path.resolve(
        __dirname,
        'vendor/threejs/build/three.webgpu.js'
      ),
      three: path.resolve(__dirname, 'vendor/threejs/build/three.module.js'),
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
