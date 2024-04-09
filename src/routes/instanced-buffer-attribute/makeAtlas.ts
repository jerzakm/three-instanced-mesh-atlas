import * as THREE from "three";

import { DEG2RAD } from "three/src/math/MathUtils";
import vertexShader from "./_vs.glsl?raw";
import fragmentShader from "./_fs.glsl?raw";

const GRID_SIZE = 500;

export const makeAtlas = (scene: THREE.Scene, texture: THREE.Texture) => {
  const cols = GRID_SIZE;
  const rows = GRID_SIZE;

  const atlasSize = 8; // 8x8 atlas

  const data = Uint32Array.from(
    {
      length: cols * rows,
    },
    (_, i) => i
  );

  const uniforms = {
    uAtlas: {
      value: texture,
    },
    uAtlasSize: {
      value: atlasSize,
    },
  };

  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    fragmentShader,
    vertexShader,
    uniforms,
  });

  const count = cols * rows;
  const mesh = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(1, 1),
    material,
    count
  );

  // instance updating is ugly (matrix transforms)
  const tempMatrix = new THREE.Matrix4();
  const tempV3 = new THREE.Vector3();

  const tempQ = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    DEG2RAD * 90
  );
  const scale = new THREE.Vector3(1, 1, 1);

  for (let x = 0; x < cols; x++) {
    for (let z = 0; z < rows; z++) {
      const i = x * cols + z;

      tempMatrix.compose(
        tempV3.set(x - GRID_SIZE / 2, Math.random(), z - GRID_SIZE / 2),
        tempQ,
        scale
      );

      mesh.setMatrixAt(i, tempMatrix);

      // Rolls a random atlas tile id
      data[i] = Math.floor(Math.random() * atlasSize ** 2);
    }
  }

  mesh.geometry.setAttribute(
    "atlasId",
    new THREE.InstancedBufferAttribute(data, 1)
  );

  scene.add(mesh);
};
