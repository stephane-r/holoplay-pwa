import { useCallback, useEffect } from "react";

import {
  usePlayerAudio,
  usePlayerState,
  usePlayerVideo,
} from "../providers/Player";
import type { SponsorBlockSegment } from "../types/interfaces/SponsorBlock";

const inRange = (num: number, min: number, max: number) =>
  num >= min && num <= max;

const getNextSegment = (
  currentTime: number,
  segments: SponsorBlockSegment[],
) => {
  return segments.find(
    (segment) => Math.round(segment.startTime) >= currentTime - 1,
  );
};

export const useSponsorBlock = () => {
  const playerVideo = usePlayerVideo();
  const playerState = usePlayerState();
  const playerAudio = usePlayerAudio();

  const handleSeek = useCallback(
    (currentTime: number) => {
      // @ts-ignore
      const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
      audio.currentTime = currentTime;
    },
    [playerAudio],
  );

  useEffect(() => {
    if (playerVideo.sponsorBlockSegments && playerState.currentTime) {
      const nextSegment = getNextSegment(
        playerState.currentTime,
        playerVideo.sponsorBlockSegments,
      );

      if (
        nextSegment &&
        inRange(
          playerState.currentTime,
          nextSegment.startTime,
          nextSegment.endTime,
        )
      ) {
        handleSeek(nextSegment.endTime);
      }
    }
  }, [
    playerVideo,
    playerState.currentTime,
    playerVideo.sponsorBlockSegments,
    handleSeek,
  ]);

  return null;
};
