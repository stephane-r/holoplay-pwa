import { Box } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { memo, useEffect, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useTranslation } from "react-i18next";

import { useAudioElement } from "../hooks/useAudioElement";
import { usePlayVideo } from "../hooks/usePlayVideo";
import {
  initialPlayerState,
  initialPlayerTime,
  usePlayerAudio,
  usePlayerState,
  usePlayerUrl,
  useSetPlayerState,
  useSetPlayerTime,
} from "../providers/Player";
import { usePlayerMode, useSetPlayerMode } from "../providers/PlayerMode";
import { database } from "../services/database";
import { usePlaybackService } from "../services/playback/usePlaybackService";
import { displayTimeBySeconds } from "../utils/displayTimeBySeconds";

export const PlayerAudio = memo(() => {
  const playerAudio = usePlayerAudio();
  const audioElement = useAudioElement();
  const playerUrl = usePlayerUrl();
  const setPlayerState = useSetPlayerState();
  const setPlayerTime = useSetPlayerTime();
  const { handlePlay: play } = usePlayVideo();
  const { nextVideoId, currentVideoId } = usePlaybackService();
  const playerMode = usePlayerMode();
  const playerState = usePlayerState();
  const setPlayerMode = useSetPlayerMode();
  const { t } = useTranslation();

  // `playerUrl` changes on more than just an actual video switch — e.g. a
  // re-fetched signed URL for the SAME video (which happens coming back to
  // the app after a while). Only a real video change should drop
  // `loopingChapter`, whose boundaries are meaningless for a different
  // video; a same-video URL refresh should leave it alone.
  const previousVideoIdRef = useRef(currentVideoId);

  useEffect(() => {
    const isNewVideo = previousVideoIdRef.current !== currentVideoId;
    previousVideoIdRef.current = currentVideoId;

    setPlayerState((previousState) => ({
      ...initialPlayerState,
      repeat: previousState.repeat,
      volume: previousState.volume,
      loopingChapter: isNewVideo ? null : previousState.loopingChapter,
    }));
    setPlayerTime(initialPlayerTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerUrl]);

  const handlePressSpace = () => {
    if (!audioElement) return;

    if (playerState.paused) {
      audioElement.play();
      handlePlay();
    } else {
      audioElement.pause();
      handlePause();
    }
  };

  useHotkeys([["space", handlePressSpace]]);

  const handlePause = () => {
    setPlayerState((previousState) => ({
      ...previousState,
      paused: true,
    }));
  };

  const handlePlay = () => {
    setPlayerState((previousState) => ({
      ...previousState,
      paused: false,
    }));
  };

  const handleEnd = () => {
    if (!audioElement) return;
    if (!audioElement.loop && nextVideoId) {
      play(nextVideoId);
    }
  };

  const handleListen = (currentTime: number) => {
    if (!audioElement) return;
    setPlayerTime({
      audioDuration: Math.round(audioElement.duration),
      duration: displayTimeBySeconds(audioElement.duration),
      currentTime: Math.round(currentTime),
      formatedCurrentTime: displayTimeBySeconds(
        currentTime,
        audioElement.duration,
      ),
      percentage: (100 * currentTime) / Number(audioElement.duration.toFixed(2)),
    });
  };

  const handleVolumeChanged = (event: Event) => {
    const volume = (event.target as HTMLAudioElement).volume;
    setPlayerState((previousState) => ({
      ...previousState,
      volume,
    }));
    database.updateSettings({ volume });
  };

  const handleCanPlay = () => {
    setPlayerState((previousState) => ({
      ...previousState,
      loading: false,
    }));
  };

  const handleError = () => {
    setPlayerState((previousState) => ({
      ...previousState,
      loading: false,
    }));
    setPlayerMode("video");
    showNotification({
      title: t("error"),
      message: t("player.mode.audio.error.message"),
    });
  };

  return (
    <Box style={{ display: "none" }} aria-hidden="true">
      <ReactAudioPlayer
        ref={playerAudio}
        src={playerUrl as string}
        autoPlay={playerMode === "audio"}
        controls
        listenInterval={100}
        onError={handleError}
        onPause={handlePause}
        onPlay={handlePlay}
        onCanPlay={handleCanPlay}
        onEnded={handleEnd}
        onListen={handleListen}
        onVolumeChanged={handleVolumeChanged}
        volume={playerState.volume}
      />
    </Box>
  );
});
