import { useSyncExternalStore } from "react";

import { playbackQueue } from ".";

export const usePlaybackQueue = () =>
  useSyncExternalStore(playbackQueue.subscribe, playbackQueue.getSnapshot);
