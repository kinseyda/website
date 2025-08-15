import { persistentMap } from "@nanostores/persistent";

export type BackgroundOptions = {
  isBackgroundEnabled: boolean;
  showPoints: boolean;
  showGuideWave: boolean;
  samples: number;
};

export const backgroundOptions = persistentMap<BackgroundOptions>(
  "backgroundOptions:",
  {
    isBackgroundEnabled: true,
    showPoints: false,
    showGuideWave: false,
    samples: 20,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
