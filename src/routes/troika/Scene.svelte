<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import InstancedAtlasMesh from "./InstancedAtlasMesh.svelte";
</script>

<T.PerspectiveCamera makeDefault position={[-10, 20, 10]} fov={15}>
  <OrbitControls
    autoRotate
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0.5}
    target.x={20}
    target.z={20} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={1.2} />

<InstancedAtlasMesh />
