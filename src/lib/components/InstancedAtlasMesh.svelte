<script lang="ts">
  import { T } from "@threlte/core";
  import { useTexture } from "@threlte/extras";
  import {
    BoxGeometry,
    Matrix4,
    MeshLambertMaterial,
    NearestFilter,
    type Vector3Tuple,
  } from "three";
  import { InstancedUniformsMesh } from "three-instanced-uniforms-mesh";
  import { makeAtlasMaterial } from "./atlasMaterial";

  // 40k cubes
  const cols = 200;
  const rows = 200;

  const atlasSize = 8; // 8x8 atlas

  const baseMaterial = new MeshLambertMaterial();
  const instancedMaterial = makeAtlasMaterial(baseMaterial);

  const count = cols * rows;
  const mesh = new InstancedUniformsMesh(
    new BoxGeometry(1, 1, 1),
    instancedMaterial,
    count
  );

  // instance updating is ugly (matrix transforms)
  const tempMatrix = new Matrix4();
  const updatePosition = (id: number, position: Vector3Tuple) => {
    tempMatrix.setPosition(...position);
    mesh.setMatrixAt(id, tempMatrix);
  };

  for (let x = 0; x < cols; x++) {
    for (let z = 0; z < rows; z++) {
      const i = x * cols + z;

      updatePosition(i, [x * 1.3, Math.sin(x * z) * 0.5, z * 1.3]);
    }
  }

  // when te texture loads, set up filtering and update instances
  useTexture("/atlas.png", {
    transform: (texture) => {
      texture.minFilter = NearestFilter;
      texture.magFilter = NearestFilter;

      instancedMaterial.map = texture;

      // might as well pick a random texture for each cube here
      for (let x = 0; x < cols; x++) {
        for (let z = 0; z < rows; z++) {
          const i = x * cols + z;

          mesh.setUniformAt(
            "pickedX",
            i,
            Math.floor(Math.random() * atlasSize)
          );
          mesh.setUniformAt(
            "pickedY",
            i,
            Math.floor(Math.random() * atlasSize)
          );
        }
      }
    },
  });
</script>

<T is={mesh} />
