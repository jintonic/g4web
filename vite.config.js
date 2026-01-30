import { visualizer } from 'rollup-plugin-visualizer';
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
    alias: [
      // Force all Three core variations to the same WebGPU file
      {
        find: /^three$/,
        replacement: path.resolve(
          __dirname,
          'vendor/threejs/build/three.webgpu.js'
        ),
      },
      {
        find: /^three\/webgpu$/,
        replacement: path.resolve(
          __dirname,
          'vendor/threejs/build/three.webgpu.js'
        ),
      },
      // Catch specific file references that might be used in the editor source
      {
        find: /.*\/build\/three\.core\.js$/,
        replacement: path.resolve(
          __dirname,
          'vendor/threejs/build/three.webgpu.js'
        ),
      },
      {
        find: /.*\/build\/three\.module\.js$/,
        replacement: path.resolve(
          __dirname,
          'vendor/threejs/build/three.webgpu.js'
        ),
      },

      // Mapping folders (standard string matching)
      // These will match anything starting with the "find" string
      {
        find: 'three/editor',
        replacement: path.resolve(__dirname, 'vendor/threejs/editor'),
      },
      {
        find: 'three/addons',
        replacement: path.resolve(__dirname, 'vendor/threejs/examples/jsm'),
      },
      {
        find: 'three/examples',
        replacement: path.resolve(__dirname, 'vendor/threejs/examples'),
      },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        // ensure Rollup only looks at the main entry point
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        // FORCE splitting even if Vite thinks they should stay together
        manualChunks(id) {
          // 1. All Three.js core files
          if (
            id.includes('three.webgpu.js') ||
            id.includes('three.core.js') ||
            id.includes('three.module.js')
          ) {
            return 'vendor-three';
          }
          // 2. The entire editor UI logic
          if (id.includes('vendor/threejs/editor')) {
            return 'vendor-editor';
          }
          // 3. Other npm dependencies (bvh, pathtracer, signals, etc)
          if (id.includes('node_modules')) {
            return 'vendor-libs';
          }
        },
      },
    },
  },
  plugins: [
    visualizer({
      open: false, // whether to open a browser window after you build
      filename: 'stats.html',
      gzipSize: true,
    }),
  ],
});
