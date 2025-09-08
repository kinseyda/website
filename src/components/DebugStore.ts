import { persistentMap } from "@nanostores/persistent";

export type DebugOptions = {
  debugMode: boolean;
};

export const debugOptions = persistentMap<DebugOptions>(
  "debugOptions:",
  {
    debugMode: false,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
