import { useEffect } from "react";

import { usePlayVideo } from "./usePlayVideo";

export const useVideoShareListener = () => {
  const { handlePlay } = usePlayVideo();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const videoId = searchParams.get("v");

    if (videoId) {
      handlePlay(videoId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
