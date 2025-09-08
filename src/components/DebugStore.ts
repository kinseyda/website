import { persistentMap } from "@nanostores/persistent";

export type DebugOptions = {
  debugMode: boolean;
};

export const debugOptions = persistentMap<DebugOptions>(
  "debugOptions:",
  {
    debugMode: true,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
