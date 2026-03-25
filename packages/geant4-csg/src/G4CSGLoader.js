import * as THREE from 'three';
import { GEOMETRY_CLASSES } from './index.js';

class G4CSGLoader extends THREE.ObjectLoader {
  constructor(manager) {
    super(manager);
  }

  parseGeometries(json, shapes) {
    const geometries = {};

    if (json !== undefined) {
      const bufferGeometryLoader = new THREE.BufferGeometryLoader();

      for (let i = 0; i < json.length; i++) {
        let geometry;
        const data = json[i];

        switch (data.type) {
          case 'BufferGeometry':
          case 'InstancedBufferGeometry':
            geometry = bufferGeometryLoader.parse(data);
            break;

          default:
            if (data.type in GEOMETRY_CLASSES) {
              geometry = GEOMETRY_CLASSES[data.type].fromJSON(data);
            } else {
              console.warn(
                `G4CSGLoader: Unsupported geometry type "${data.type}"`
              );
            }
        }

        if (geometry) {
          geometry.uuid = data.uuid;
          if (data.name !== undefined) geometry.name = data.name;
          if (data.userData !== undefined) geometry.userData = data.userData;
          geometries[data.uuid] = geometry;
        }
      }
    }

    return geometries;
  }
}

export { G4CSGLoader };
