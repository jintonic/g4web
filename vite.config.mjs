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
        replacement: path.resolve(__dirname, 'js/Replacement.js'),
      },
      {
        find: './Viewport.Pathtracer.js',
        replacement: path.resolve(__dirname, 'js/Replacement.js'),
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
      onwarn(warning, warn) {
        // suppress the "dynamic import will not move module into another chunk" warnings
        if (
          warning.code === 'UNUSED_EXTERNAL_IMPORT' ||
          warning.message.includes(
            'dynamic import will not move module into another chunk'
          )
        ) {
          return;
        }
        // Use the default warning behavior for everything else
        warn(warning);
      },
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
    {
      name: 'modify-threejs-editor-code',
      transform(code, id) {
        // remove examples from Menubar.File.js
        if (id.includes('Menubar.File.js')) {
          const cleanCode = code
            .replace(/const examples = \[[\s\S]*?\];/g, 'const examples = [];')
            .replace(
              /for \( let i = 0; i < examples\.length; i \+\+ \) \{[\s\S]*?\}\( i \);/g,
              ''
            )
            .replace(
              /newProjectSubmenu\.add\( new UIHorizontalRule\(\) \);/g,
              ''
            );
          return {
            code: cleanCode,
            map: null,
          };
        }
        // move ViewHelper to bottom right
        if (id.includes('Viewport.ViewHelper.js')) {
          const cleanCode = code
            /* Change the interaction logic anchor */
            .replace(/this\.location\.top = 30;/g, 'this.location.bottom = 0;')

            /* Change the UI Panel positioning */
            .replace(
              /panel\.setTop\( '30px' \);/g,
              "panel.setBottom( '10px' );"
            )
            .replace(
              /panel\.setRight\( '0px' \);/g,
              "panel.setRight( '10px' );"
            );

          return {
            code: cleanCode,
            map: null,
          };
        }
      },
    },
  ],
});
