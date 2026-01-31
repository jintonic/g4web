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
      {
        find: './Sidebar.Project.js',
        replacement: path.resolve(__dirname, 'js/replacement.js'),
      },
      {
        find: './Viewport.Pathtracer.js',
        replacement: path.resolve(__dirname, 'js/replacement.js'),
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
      {
        find: /^three$/,
        replacement: path.resolve(
          __dirname,
          'vendor/threejs/build/three.module.js'
        ),
      },
      {
        find: /.*\/build\/three\.(module|core)\.js$/,
        replacement: path.resolve(
          __dirname,
          'vendor/threejs/build/three.module.js'
        ),
      },
      {
        find: 'three/webgpu',
        replacement: path.resolve(
          __dirname,
          'vendor/threejs/build/three.module.js'
        ),
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
          if (id.includes('three.core.js')) {
            return 'three-core';
          }
          if (id.includes('three.module.js')) {
            return 'three-module';
          }
          if (id.includes('vendor/threejs/editor')) {
            return 'three-editor';
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
