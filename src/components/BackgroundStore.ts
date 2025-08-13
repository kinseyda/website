import { useVModel } from "@nanostores/vue";
import { atom, map } from "nanostores";

export type BackgroundOptions = {
  isBackgroundEnabled: boolean;
};

export const backgroundOptions = map<BackgroundOptions>({
  isBackgroundEnabled: true,
});
