export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  // Maps a value from one range to another linearly
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export function sumOfSines(
  freqs: number[],
  time: number,
  speed: number
): (x: number) => number {
  return (x) => {
    // Calculate the sum of sine waves for the given frequencies, time, and speed
    let sum = 0;
    for (let i = 0; i < freqs.length; i++) {
      sum += Math.sin((x + time * speed) * freqs[i]);
    }
    return sum / freqs.length; // Normalize by the number of frequencies
  };
}
