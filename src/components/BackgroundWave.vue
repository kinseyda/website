<script lang="ts">
// Fancy background component using paper.js
// Wraps a canvas element and initializes paper.js on it
import PaperCanvas from "./PaperCanvas.vue";

import { fullWidthMathFunc, type RedrawEvent } from "../utils/PaperUtils";
import { sumOfSines } from "../utils/MathUtils";
import { getDaisyUIColor } from "../utils/StyleUtils";
import { backgroundOptions } from "./BackgroundStore";
import { useStore } from "@nanostores/vue";

export default {
  components: {
    PaperCanvas,
  },
  data() {
    return {
      drawFunctions: [
        (event: RedrawEvent, project: paper.Project, view: paper.View) => {
          // Low sample size but with smoothing makes for a neat, unpredictable wavy effect.
          // Add new paths based on the current time
          project.activeLayer.addChildren(
            fullWidthMathFunc(
              (x) => sumOfSines([54, 64, 81], event.time, 0.025)(x), // Slowing it way down
              // 54, 64, 81, are the pythagorean frequencies of a minor chord
              view.size.width,
              view.size.height,
              100, // Height of the wave
              50, // Padding around the wave
              getDaisyUIColor("--color-primary"),
              20,
              [0, 1],
              true
            )
          );
        },
        (event: RedrawEvent, project: paper.Project, view: paper.View) => {
          // Low sample size but with smoothing makes for a neat, unpredictable wavy effect.
          // Add new paths based on the current time
          project.activeLayer.addChildren(
            fullWidthMathFunc(
              (x) => sumOfSines([54, 64, 81], event.time, 0.025)(x), // Slowing it way down
              // 54, 64, 81, are the pythagorean frequencies of a minor chord
              view.size.width,
              view.size.height,
              100, // Height of the wave
              50, // Padding around the wave
              getDaisyUIColor("--color-secondary"),
              20,
              [0, 1],
              true
            )
          );
        },
      ],
    };
  },
  props: {},
  methods: {},
  setup() {
    const $backgroundOptions = useStore(backgroundOptions);
    return {
      backgroundOptions: $backgroundOptions,
    };
  },
};
</script>
<template>
  <PaperCanvas
    class="w-full h-full"
    :redrawFunction="
      drawFunctions[Math.floor(Math.random() * drawFunctions.length)]
    "
    v-if="backgroundOptions.isBackgroundEnabled"
  />
</template>
<style scoped>
canvas[resize] {
  width: 100%;
  height: 100%;
}
</style>
