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
      {
        find: './Sidebar.Material.js',
        replacement: path.resolve(__dirname, 'js/Sidebar.Material.js'),
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
        // remove Render from menubar
        if (id.endsWith('/Menubar.js')) {
          const cleanCode = code
            .replace(
              /import \{ MenubarRender \} from '\.\/Menubar\.Render\.js';\n/,
              ''
            )
            .replace(
              /\tcontainer\.add\( new MenubarRender\( editor \) \);\n/,
              ''
            );
          return {
            code: cleanCode,
            map: null,
          };
        }
        // remove Mesh submenu from Add menu
        if (id.includes('Menubar.Add.js')) {
          const cleanCode = code.replace(
            /\t\/\/ Mesh\n[\s\S]*?\n\n\t\/\/ Light/,
            '\t// Light'
          );
          return {
            code: cleanCode,
            map: null,
          };
        }
        // hide frustumCull, renderOrder, userData and export JSON in object sidebar
        if (
          id.includes('Sidebar.Object.js') &&
          !id.includes('Sidebar.Object3D')
        ) {
          const cleanCode = code
            .replace(
              'container.add( objectFrustumCulledRow );',
              "objectFrustumCulledRow.setDisplay( 'none' ); container.add( objectFrustumCulledRow );"
            )
            .replace(
              'container.add( objectRenderOrderRow );',
              "objectRenderOrderRow.setDisplay( 'none' ); container.add( objectRenderOrderRow );"
            )
            .replace(
              'container.add( objectUserDataRow );',
              "objectUserDataRow.setDisplay( 'none' ); container.add( objectUserDataRow );"
            )
            .replace(
              'container.add( exportJson );',
              "exportJson.setDisplay( 'none' ); container.add( exportJson );"
            );
          return {
            code: cleanCode,
            map: null,
          };
        }
        // remove fog controls from scene sidebar
        if (id.includes('Sidebar.Scene.js')) {
          const cleanCode = code
            // hide fog type row
            .replace(
              'container.add( fogTypeRow );',
              "fogTypeRow.setDisplay( 'none' ); container.add( fogTypeRow );"
            )
            // hide fog properties row
            .replace(
              'container.add( fogPropertiesRow );',
              "fogPropertiesRow.setDisplay( 'none' ); container.add( fogPropertiesRow );"
            )
            // hide environment row
            .replace(
              'container.add( environmentRow );',
              "environmentRow.setDisplay( 'none' ); container.add( environmentRow );"
            );
          return {
            code: cleanCode,
            map: null,
          };
        }
        // redirect Help menu links
        if (id.includes('Menubar.Help.js')) {
          const cleanCode = code
            .replace(
              'https://github.com/mrdoob/three.js/tree/master/editor',
              'https://github.com/jintonic/g4web'
            )
            .replace(
              'https://threejs.org',
              'https://github.com/jintonic/g4web#readme'
            )
            .replace(
              'https://github.com/mrdoob/three.js/wiki/Editor-Manual',
              'https://github.com/jintonic/g4web#readme'
            );
          return {
            code: cleanCode,
            map: null,
          };
        }
        // remove script tab and rename Object/Geometry tabs in sidebar properties
        if (id.includes('Sidebar.Properties.js')) {
          const cleanCode = code
            // rename Object tab to Volume
            .replace(
              "strings.getKey( 'sidebar/properties/object' )",
              "'Volume'"
            )
            // rename Geometry tab to Solid
            .replace(
              "strings.getKey( 'sidebar/properties/geometry' )",
              "'Solid'"
            )
            // remove SidebarScript import
            .replace(
              /import \{ SidebarScript \} from '\.\/Sidebar\.Script\.js';\n/,
              ''
            )
            // remove scriptTab addition
            .replace(
              /\tcontainer\.addTab\( 'scriptTab'[\s\S]*?new SidebarScript\( editor \) \);\n/,
              ''
            )
            // remove scriptTab variable
            .replace(
              /\tconst scriptTab = getTabByTabId\( container\.tabs, 'scriptTab' \);\n/,
              ''
            )
            // remove scriptTab visibility toggle
            .replace(
              /\n\t\tscriptTab\.setHidden\( object === editor\.camera \);/,
              ''
            )
            // remove scriptTab fallback selection
            .replace(
              /\} else if \( container\.selected === 'scriptTab' \) \{\n\n\t\t\tcontainer\.select\( scriptTab\.isHidden\(\) \? 'objectTab' : 'scriptTab' \);\n\n\t\t\}/,
              '}'
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
