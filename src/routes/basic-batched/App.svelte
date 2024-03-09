<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import { PerfMonitor } from "@threlte/extras";
</script>

<Canvas>
  <Scene />
  <PerfMonitor />
</Canvas>
