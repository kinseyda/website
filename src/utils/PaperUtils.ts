import paper from "paper";
import { mapRange } from "./MathUtils";

export type RedrawEvent = paper.Event & {
  count: number; // Frame count
  time: number; // Time since the start of the animation in seconds
  delta: number; // Time since the last frame in seconds
};

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
export function fullWidthMathFunc(
  func: (x: number) => number,
  fullWidth: number,
  fullHeight: number,
  waveHeight: number,
  padding: number,
  color: string = "white",
  samples: number = 100,
  domain: [number, number] = [0, fullWidth],
  smoothing: boolean = true
): paper.Item[] {
  const path = new paper.Path();
  path.strokeColor = new paper.Color(color);
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
