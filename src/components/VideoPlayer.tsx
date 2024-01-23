import { memo } from "react";

import { useVideoIframeVisibility } from "../providers/VideoIframeVisibility";
import { ButtonToggleVideoIframeVisibility } from "./ButtonToggleVideoIframeVisibility";
import { VideoIframe } from "./VideoIframe";
import classes from "./VideoPlayer.module.css";

export const VideoPlayer = memo(() => {
  const videoIframeVisibility = useVideoIframeVisibility();

  return (
    <div className={classes.container} data-visible={videoIframeVisibility}>
      <ButtonToggleVideoIframeVisibility />
      <VideoIframe />
    </div>
  );
});
