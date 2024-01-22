<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import PerfMonitor from "./PerfMonitor.svelte";
</script>

<Canvas>
  <Scene />
  <PerfMonitor />
</Canvas>
