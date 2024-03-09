import * as THREE from "three";
import { DEG2RAD } from "three/src/math/MathUtils";

export const makeAtlas = (scene: THREE.Scene, texture: THREE.Texture) => {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    wireframe: false,
    side: THREE.DoubleSide,
  });

  // 30x30 Plane Grid
  for (let x = 0; x < 30; x++) {
    for (let z = 0; z < 30; z++) {
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
      mesh.position.set(x - 15, Math.random(), z - 15);
      mesh.rotateX(-DEG2RAD * 90);

      scene.add(mesh);
    }
  }
};
