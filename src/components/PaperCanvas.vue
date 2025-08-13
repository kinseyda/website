<template>
  <canvas class="w-full h-full" ref="paperCanvas" />
</template>

<script lang="ts">
import paper from "paper";
import type { RedrawEvent } from "../utils/PaperUtils";
export default {
  data() {
    return {};
  },
  props: {
    // Point of using Vue here is so that we can pass a function that will be
    // called to redraw the canvas, Astro can only do this by serializing the
    // function
    // (https://docs.astro.build/en/guides/framework-components/#passing-props-to-framework-components)
    redrawFunction: {
      type: Function, // Expects type (event: RedrawEvent, project: paper.Project, view: paper.View) => void
      required: true,
    },
  },
  methods: {
    updateDrawing(
      event: RedrawEvent,
      project: paper.Project,
      view: paper.View
    ) {
      // Clear the canvas
      paper.project.activeLayer.removeChildren();
      // Call the redraw function passed as a prop
      this.redrawFunction(event, project, view);
    },
  },
  mounted() {
    paper.setup(this.$refs.paperCanvas as HTMLCanvasElement);

    paper.view.onFrame = (event: RedrawEvent) => {
      // Call the redraw function with the event, project, and view
      this.updateDrawing(event, paper.project, paper.view);
    };
  },
};
</script>

<style scoped></style>
