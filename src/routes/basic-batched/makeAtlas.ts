import * as THREE from "three";
import { DEG2RAD } from "three/src/math/MathUtils";

export const makeAtlas = (scene: THREE.Scene, texture: THREE.Texture) => {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    wireframe: false,
    side: THREE.DoubleSide,
  });

  // 30x30 Plane Grid
  const GRID_SIZE = 100;

  const batchedMesh = new THREE.BatchedMesh(
    GRID_SIZE ** 2,
    GRID_SIZE ** 2 * 6,
    GRID_SIZE ** 2 * 6,
    material
  );

  const tempMatrix = new THREE.Matrix4();
  const tempV3 = new THREE.Vector3();
  const tempQ = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    DEG2RAD * 90
  );
  const scale = new THREE.Vector3(1, 1, 1);
  // tempQ.setFromAxisAngle([1,0,0], DEG2RAD*90)
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

      const batchedId = batchedMesh.addGeometry(geometry);

      tempMatrix.compose(
        tempV3.set(x - GRID_SIZE / 2, Math.random(), z - GRID_SIZE / 2),
        tempQ,
        scale
      );
      batchedMesh.setMatrixAt(batchedId, tempMatrix);
    }
  }

  scene.add(batchedMesh);
};
