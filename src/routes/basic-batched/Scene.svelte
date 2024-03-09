<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { OrbitControls, useTexture } from "@threlte/extras";
  import { onMount } from "svelte";
  import { makeAtlas } from "./makeAtlas";
  import { NearestFilter } from "three";

  const { scene, renderer } = useThrelte();

  useTexture("/atlas.png", {
    transform: (texture) => {
      texture.minFilter = texture.magFilter = NearestFilter;
      texture.flipY = true;
      texture.needsUpdate = true;
      makeAtlas(scene, texture);
    },
  });
</script>

<T.PerspectiveCamera makeDefault position={[15, 30, 15]} fov={15}>
  <OrbitControls
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0.5}
    target.x={0}
    target.z={0} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={1.2} />
