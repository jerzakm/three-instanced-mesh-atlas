import * as THREE from "three";
import { DEG2RAD } from "three/src/math/MathUtils";

const GRID_SIZE = 100;

export const makeAtlas = (scene: THREE.Scene, texture: THREE.Texture) => {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    wireframe: false,
    side: THREE.DoubleSide,
  });

  for (let x = 0; x < GRID_SIZE; x++) {
    for (let z = 0; z < GRID_SIZE; z++) {
      const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
      const atlasSize = { width: 8, height: 8 };

      const texturePosition = {
        x: Math.floor(Math.random() * atlasSize.width),
        y: Math.floor(Math.random() * atlasSize.height),
      };

      const startX = texturePosition.x * (1 / atlasSize.width);
      const endX = startX + 1 / atlasSize.width;

      const startY = texturePosition.y * (1 / atlasSize.width);
      const endY = startY + 1 / atlasSize.width;

      const uvs = geometry.attributes.uv.array;

      // bottom left
      uvs[0] = startX;
      uvs[1] = endY;
      // bottom right
      uvs[2] = endX;
      uvs[3] = endY;
      // top left
      uvs[4] = startX;
      uvs[5] = startY;
      // top right
      uvs[6] = endX;
      uvs[7] = startY;

      geometry.attributes.uv.needsUpdate = true;

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x - GRID_SIZE / 2, Math.random(), z - GRID_SIZE / 2);
      mesh.rotateX(-DEG2RAD * 90);

      scene.add(mesh);
    }
  }
};
