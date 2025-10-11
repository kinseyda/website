<script lang="ts">
// Fancy background component using paper.js
// Wraps a canvas element and initializes paper.js on it
import PaperCanvas from "./PaperCanvas.vue";

import type { RedrawEvent } from "../utils/PaperUtils";
import { mapRange, sumOfSines } from "../utils/MathUtils";
import { getDaisyUIColor } from "../utils/StyleUtils";
import { backgroundStore, type BackgroundOptions } from "./BackgroundStore";
import { useStore } from "@nanostores/vue";
import paper from "paper";

/**
 *
 * @param func Function to evaluate at each x
 * @param fullWidth Full width of the canvas in pixels
 * @param fullHeight Full height of the canvas in pixels
 * @param waveHeight Height of the wave to draw in pixels
 * @param padding Padding around the wave in pixels
 * @param color Color of the wave line
 * @param samples Number of samples to take across the width of the canvas
 * @param domain Domain we sample from over the full width of the canvas
 * @param smoothing
 */
function fullWidthMathFunc(
  func: (x: number) => number,
  fullWidth: number,
  fullHeight: number,
  waveHeight: number,
  padding: number,
  color: paper.Color,
  samples: number = 100,
  domain: [number, number] = [0, fullWidth],
  smoothing: boolean = true
): paper.Item[] {
  const path = new paper.Path();
  path.strokeColor = color;
  path.strokeWidth = 5;

  const startX = domain[0];
  const endX = domain[1];
  const step = (endX - startX) / samples;

  // Samples array to include the x values at the very start and end of the domain
  const samplesArray = Array.from(
    { length: samples + 1 },
    (_, i) => startX + i * step
  );

  for (const x of samplesArray) {
    const y = func(x);
    // Add points to the path, offsetting y by half the height to center it vertically
    // This centers the wave vertically in the canvas
    const mappedX = mapRange(
      x,
      domain[0],
      domain[1],
      -1 * padding,
      fullWidth + padding
    );
    path.add(new paper.Point(mappedX, waveHeight * y + fullHeight / 2));
  }
  if (smoothing) {
    // Smooth the path if requested
    path.smooth();
  }

  return [path];
}

export default {
  components: {
    PaperCanvas,
  },
  data() {
    return {};
  },
  props: {},
  methods: {
    redrawWithOptions(
      options: BackgroundOptions
    ): (event: RedrawEvent, project: paper.Project, view: paper.View) => void {
      return (event: RedrawEvent, project: paper.Project, view: paper.View) => {
        // If the background is not enabled, do not draw anything
        if (!options.isBackgroundEnabled) {
          return () => {};
        }
        // Clear the canvas
        project.activeLayer.removeChildren();

        const primaryColor = new paper.Color(
          getDaisyUIColor("--color-primary")
        );
        const secondaryColor = new paper.Color(
          getDaisyUIColor("--color-secondary")
        );

        // A low sample size but with smoothing makes for a neat, unpredictable
        // wavy effect. This comes from the fact that the amount of samples is
        // lower than the frequencies used in the wave function (see the Nyquist
        // theorem).

        const fOfX = (x: number) =>
          sumOfSines([54, 64, 81], event.time, 0.025)(x);

        const domain = [0, 1] as [number, number];
        const domainStep = (domain[1] - domain[0]) / options.samples;
        const horizontalPadding = 50; // Padding to the left and right of the wave

        project.activeLayer.addChildren(
          fullWidthMathFunc(
            fOfX, // Function to draw the wave
            // 54, 64, 81, are the pythagorean frequencies of a minor chord
            view.size.width,
            view.size.height,
            100, // Height of the wave
            horizontalPadding, // Padding to the left and right of the wave. This means the wave goes off the screen a bit, preventing the edges of any svg line being seen.
            primaryColor,
            options.samples,
            domain,
            true
          )
        );

        if (options.showPoints) {
          const points = [];

          for (let x = domain[0]; x <= domain[1]; x += domainStep) {
            const y = fOfX(x);
            const mappedX = mapRange(
              x,
              domain[0],
              domain[1],
              -1 * horizontalPadding,
              view.size.width + horizontalPadding
            );
            const mappedY = mapRange(
              y,
              -1,
              1,
              view.size.height / 2 - 100,
              view.size.height / 2 + 100
            );
            points.push(new paper.Point(mappedX, mappedY));
          }
          project.activeLayer.addChildren(
            points.map((point) => {
              const circle = new paper.Path.Circle(point, 8);
              circle.fillColor = secondaryColor;
              return circle;
            })
          );
        }
        if (options.showGuideWave) {
          // Draw the same wave, but with enough samples to ensure an accurate representation
          project.activeLayer.addChildren(
            fullWidthMathFunc(
              fOfX,
              view.size.width,
              view.size.height,
              100, // Height of the wave
              horizontalPadding, // Padding to the left and right of the wave
              secondaryColor,
              1000, // Higher sample count for the guide wave
              domain,
              true
            )
          );
        }
      };
    },
  },
  setup() {
    const $backgroundOptions = useStore(backgroundStore);
    return {
      backgroundOptions: $backgroundOptions,
    };
  },
};
</script>
<template>
  <PaperCanvas
    class="w-full h-full"
    :redrawFunction="redrawWithOptions(backgroundOptions)"
    v-if="backgroundOptions.isBackgroundEnabled"
  />
</template>
<style scoped>
canvas[resize] {
  width: 100%;
  height: 100%;
}
</style>
