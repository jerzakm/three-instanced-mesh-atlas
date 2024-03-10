import * as THREE from "three";

import { createDerivedMaterial } from "troika-three-utils";
import { InstancedUniformsMesh } from "three-instanced-uniforms-mesh";
import { DEG2RAD } from "three/src/math/MathUtils";

const GRID_SIZE = 500;

/** replace base UVs with the altered  UV.
 * Should allow for supporting of most THREE base materials
 * TODO needs improvements
 */
const replaceUVs = (text: string, replacement: string) => {
  const lines = text.split("\n");
  const matUVs = /vMapUv|vAlphaMapUv|vNormalMapUv/g;

  const modifiedLines = lines.map((line) => {
    if (!line.includes("varying") && !line.includes("uniform")) {
      return line.replace(matUVs, replacement);
    }
    return line;
  });

  return modifiedLines.join("\n");
};

export const makeAtlasMaterial = (
  baseMaterial: THREE.Material
): THREE.ShaderMaterial => {
  const customMaterial = createDerivedMaterial(baseMaterial, {
    defines: {
      USE_UV: "",
    },
    uniforms: {
      atlasSize: { value: new THREE.Vector2(1, 1) },
      pickedTexture: { value: new THREE.Vector2() },
    },
    fragmentDefs: /*glsl*/ `
      uniform vec2 atlasSize;
      uniform vec2 pickedTexture;
    `,
    customRewriter: ({ vertexShader, fragmentShader }: any) => {
      // calculate sprite UV
      const newUvs = /*glsl*/ `			
        vec2 fSize = vec2(1.)/atlasSize;
        vec2 fOffset = pickedTexture*fSize;
        
        vec2 textureAtlasUv = fSize  * vUv + fOffset;      
			`;

      // inject new UVs calculation at the start of main
      fragmentShader = fragmentShader.replace(
        `void main() {`,
        `void main() {${newUvs}`
      );

      // replace standard material UVs with the atlas UV
      fragmentShader = replaceUVs(fragmentShader, "textureAtlasUv");

      return { vertexShader, fragmentShader };
    },
  });
  return customMaterial;
};

export const makeAtlas = (scene: THREE.Scene, texture: THREE.Texture) => {
  //

  const cols = GRID_SIZE;
  const rows = GRID_SIZE;

  const atlasSize = 8; // 8x8 atlas

  const baseMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const instancedMaterial = makeAtlasMaterial(baseMaterial);
  instancedMaterial.uniforms.atlasSize.value.x = 8;
  instancedMaterial.uniforms.atlasSize.value.y = 8;

  const count = cols * rows;
  const mesh = new InstancedUniformsMesh(
    new THREE.PlaneGeometry(1, 1),
    instancedMaterial,
    count
  );

  // instance updating is ugly (matrix transforms)
  const tempMatrix = new THREE.Matrix4();
  const tempV3 = new THREE.Vector3();
  const tempUniformV2 = new THREE.Vector2();

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

      tempUniformV2.set(
        Math.floor(Math.random() * atlasSize),
        Math.floor(Math.random() * atlasSize)
      );

      mesh.setUniformAt("pickedTexture", i, tempUniformV2);
    }
  }

  scene.add(mesh);
};
