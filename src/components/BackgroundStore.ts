import { map } from "nanostores";

export type BackgroundOptions = {
  isBackgroundEnabled: boolean;
  showPoints: boolean;
  showGuideWave: boolean;
  samples: number;
};

export const backgroundOptions = map<BackgroundOptions>({
  isBackgroundEnabled: true,
  showPoints: false,
  showGuideWave: false,
  samples: 20,
});
