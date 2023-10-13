import { memo } from "react";

import { VideoPlayer } from "../components/VideoPlayer";
import { VideoIframeVisibilityProvider } from "../providers/VideoIframeVisibility";

export const VideoPlayerContainer = memo(() => {
  return (
    <VideoIframeVisibilityProvider>
      <VideoPlayer />
    </VideoIframeVisibilityProvider>
  );
});
