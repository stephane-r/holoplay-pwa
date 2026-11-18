import { useCallback, useEffect } from "react";

import { usePlayerTime, usePlayerVideo } from "../providers/Player";
import type { SponsorBlockSegment } from "../types/interfaces/SponsorBlock";
import { useAudioElement } from "./useAudioElement";

const inRange = (num: number, min: number, max: number) =>
  num >= min && num <= max;

// Finds the segment `currentTime` currently falls inside, regardless of how
// it got there — matches both continuous forward playback ticking into a
// segment and the user dragging the seek bar directly into the middle of
// one (which a previous version, matching only an "upcoming" segment by
// startTime, missed).
const getCurrentSegment = (
  currentTime: number,
  segments: SponsorBlockSegment[],
) => {
  return segments.find((segment) =>
    inRange(currentTime, segment.startTime, segment.endTime),
  );
};

export const useSponsorBlock = () => {
  const playerVideo = usePlayerVideo();
  const playerTime = usePlayerTime();
  const audioElement = useAudioElement();

  const handleSeek = useCallback(
    (currentTime: number) => {
      if (!audioElement) return;
      audioElement.currentTime = currentTime;
    },
    [audioElement],
  );

  useEffect(() => {
    if (!playerVideo.sponsorBlockSegments || !playerTime.currentTime) {
      return;
    }

    const segment = getCurrentSegment(
      playerTime.currentTime,
      playerVideo.sponsorBlockSegments,
    );

    if (segment) {
      handleSeek(segment.endTime);
    }
  }, [
    playerVideo,
    playerTime.currentTime,
    playerVideo.sponsorBlockSegments,
    handleSeek,
  ]);

  return null;
};
