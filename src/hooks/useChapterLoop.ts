import { useCallback, useEffect } from "react";

import {
  usePlayerState,
  usePlayerTime,
  usePlayerVideo,
  useSetPlayerState,
} from "../providers/Player";
import { useAudioElement } from "./useAudioElement";

// Same mechanics as useSponsorBlock: a currentTime-driven effect, seeking
// the <audio> element imperatively. Instead of skipping forward past a
// segment, this seeks back to the chapter's start once playback crosses its
// end — self-correcting, since the seek itself brings currentTime back
// under chapter.endTime, so the effect won't refire until it climbs back up
// to it on the next loop.
export const useChapterLoop = () => {
  const playerState = usePlayerState();
  const setPlayerState = useSetPlayerState();
  const playerTime = usePlayerTime();
  const { video } = usePlayerVideo();
  const audioElement = useAudioElement();

  const handleSeek = useCallback(
    (currentTime: number) => {
      if (!audioElement) return;
      // eslint-disable-next-line react-hooks/immutability
      audioElement.currentTime = currentTime;
    },
    [audioElement],
  );

  // A chapter's start/end only make sense for the video that defined them —
  // clear any active loop when the video changes instead of carrying stale
  // boundaries into an unrelated video.
  useEffect(() => {
    setPlayerState((state) =>
      state.loopingChapter ? { ...state, loopingChapter: null } : state,
    );
  }, [video?.videoId, setPlayerState]);

  useEffect(() => {
    const chapter = playerState.loopingChapter;
    if (!chapter || playerTime.currentTime === null) return;

    if (playerTime.currentTime >= chapter.endTime) {
      handleSeek(chapter.startTime);
    }
  }, [playerState.loopingChapter, playerTime.currentTime, handleSeek]);

  return null;
};
