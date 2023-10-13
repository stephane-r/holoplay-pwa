import { Box } from "@mantine/core";
import { memo } from "react";
import ReactAudioPlayer from "react-audio-player";

import { usePlayVideo } from "../hooks/usePlayVideo";
import {
  usePlayerAudio,
  usePlayerState,
  usePlayerUrl,
  useSetPlayerState,
} from "../providers/Player";
import { usePlayerMode } from "../providers/PlayerMode";
import { usePreviousNextVideos } from "../providers/PreviousNextTrack";
import { displayTimeBySeconds } from "../utils/displayTimeBySeconds";

export const PlayerAudio = memo(() => {
  const playerAudio = usePlayerAudio();
  const playerUrl = usePlayerUrl();
  const setPlayerState = useSetPlayerState();
  const { handlePlay: play } = usePlayVideo();
  const { videosIds } = usePreviousNextVideos();
  const playerMode = usePlayerMode();
  const playerState = usePlayerState();

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
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    if (!audio.loop && videosIds.nextVideoId) {
      play(videosIds.nextVideoId);
    }
  };

  const handleListen = (currentTime: number) => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    setPlayerState((previousState) => ({
      ...previousState,
      audioDuration: Math.round(audio.duration),
      duration: displayTimeBySeconds(audio.duration),
      currentTime: Math.round(currentTime),
      formatedCurrentTime: displayTimeBySeconds(currentTime, audio.duration),
      percentage: (100 * currentTime) / Number(audio.duration.toFixed(2)),
    }));
  };

  const handleVolumeChanged = (event: any) => {
    setPlayerState((previousState) => ({
      ...previousState,
      volume: (event.target as HTMLAudioElement).volume,
    }));
  };

  const handleCanPlay = () => {
    setPlayerState((previousState) => ({
      ...previousState,
      loading: false,
    }));
  };

  return (
    <Box style={{ display: "none" }} aria-hidden="true">
      <ReactAudioPlayer
        ref={playerAudio}
        src={playerUrl as string}
        autoPlay={playerMode === "audio"}
        controls
        listenInterval={100}
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
