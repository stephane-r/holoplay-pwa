import { useCallback, useEffect } from "react";

import { usePlayerState, usePlayerTime } from "../providers/Player";
import { useAudioElement } from "./useAudioElement";

// Same mechanics as useSponsorBlock: a currentTime-driven effect, seeking
// the <audio> element imperatively. Instead of skipping forward past a
// segment, this seeks back to the chapter's start once playback crosses its
// end — self-correcting, since the seek itself brings currentTime back
// under chapter.endTime, so the effect won't refire until it climbs back up
// to it on the next loop.
//
// Clearing `loopingChapter` when the video actually changes is handled in
// PlayerAudio.tsx (next to the rest of the per-video state reset), not
// here — this hook can mount/unmount independently of any real video
// change (e.g. the mobile/desktop player bars each mount their own copy),
// so resetting state on this hook's own mount would clear it too eagerly.
export const useChapterLoop = () => {
  const playerState = usePlayerState();
  const playerTime = usePlayerTime();
  const audioElement = useAudioElement();

  const handleSeek = useCallback(
    (currentTime: number) => {
      if (!audioElement) return;
      // eslint-disable-next-line react-hooks/immutability
      audioElement.currentTime = currentTime;
    },
    [audioElement],
  );

  useEffect(() => {
    const chapter = playerState.loopingChapter;
    if (!chapter || playerTime.currentTime === null) return;

    if (playerTime.currentTime >= chapter.endTime) {
      handleSeek(chapter.startTime);
    }
  }, [playerState.loopingChapter, playerTime.currentTime, handleSeek]);

  return null;
};
