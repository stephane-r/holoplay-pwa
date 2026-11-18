import { useSyncExternalStore } from "react";

import { playbackService } from ".";

export const usePlaybackService = () =>
  useSyncExternalStore(playbackService.subscribe, playbackService.getSnapshot);
