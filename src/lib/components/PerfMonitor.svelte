<script lang="ts">
  import { useStage, useTask, useThrelte } from "@threlte/core";
  import { ThreePerf } from "three-perf";

  const { renderer, renderStage } = useThrelte();

  const perf = new ThreePerf({
    anchorX: "left",
    anchorY: "top",
    domElement: document.body, // or other canvas rendering wrapper
    renderer: renderer, // three js renderer instance you use for rendering
  });

  const afterRenderStage = useStage("after-render", {
    after: renderStage,
  });

  const beforeRenderStage = useStage("before-render", {
    before: renderStage,
  });

  useTask(
    () => {
      perf.begin();
    },
    {
      stage: beforeRenderStage,
    }
  );

  useTask(
    () => {
      perf.end();
    },
    {
      stage: afterRenderStage,
    }
  );
</script>
