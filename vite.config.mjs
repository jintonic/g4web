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
        find: './Sidebar.Geometry.js',
        replacement: path.resolve(__dirname, 'js/Sidebar.Geometry.js'),
      },
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
        if (id.includes('Sidebar.Scene.js')) {
          const cleanCode = code.replace(
            `container.setPaddingTop( '20px' );`,
            `container.setPaddingTop( '20px' );

          const gridInfoBanner = document.createElement('div');
          gridInfoBanner.textContent = 'The grid is 30×30 cm, each square = 1 cm.';
          container.dom.appendChild(gridInfoBanner);`
          );
          return { code: cleanCode, map: null };
        }

        if (id.includes('Editor.js')) {
          const cleanCode = code.replace(
            `var loader = new THREE.ObjectLoader();`,
            `const { G4CSGLoader } = await import('/packages/geant4-csg/src/G4CSGLoader.js');
        var loader = new G4CSGLoader();`
          );
          return { code: cleanCode, map: null };
        }

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
            )
            .replace(
              `// Export DRC`,
              `// Export TG

              option = new UIRow();
              option.setClass( 'option' );
              option.setTextContent( 'TG' );
              option.onClick( async function () {
                const { TGExporter } = await import( '/js/TGExporter.js' );
                const result = await TGExporter.exportTg( editor );
                if ( result ) {
                  const blob = new Blob( [ result ], { type: 'text/plain' } );
                  editor.utils.save( blob, 'scene.tg' );
                }
              } );
              fileExportSubmenu.add( option );

              // Export DRC`
            );
          return {
            code: cleanCode,
            map: null,
          };
        }

        if (id.includes('Strings.js')) {
          return {
            code: code
              .replace(
                `'sidebar/properties/object': 'Object'`,
                `'sidebar/properties/object': 'Volume'`
              )
              .replace(
                `'sidebar/properties/geometry': 'Geometry'`,
                `'sidebar/properties/geometry': 'Solid'`
              ),
            map: null,
          };
        }

        if (id.includes('Sidebar.Material.ColorProperty.js')) {
          return {
            code: code
              .replace(
                `const color = new UIColor().onInput( onChange );`,
                `const color = new UIColor().setHexValue( 'ff5c5c' ).onInput( onChange );`
              )
              .replace(
                `color.setHexValue( material[ property ].getHexString() );`,
                `if ( !material[ property ] || material[ property ].getHexString() === 'ffffff' ) {
                    material[ property ] = new THREE.Color( 0xff5c5c );
                  }
                  color.setHexValue( material[ property ].getHexString() );`
              )
              .replace(
                `signals.objectSelected.add( update );`,
                `signals.objectSelected.add( function ( selected ) {
                  object = selected;
                  materialSlot = 0;
                  if ( object && object.material && property in object.material ) {
                    if ( !object.material[ property ] || object.material[ property ].getHexString() === 'ffffff' ) {
                      object.material[ property ] = new THREE.Color( 0xff5c5c );
                      editor.execute( new SetMaterialColorCommand( editor, object, property, 0xff5c5c, 0 ) );
                    }
                  }
                  update( selected );
                } );`
              ),
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
