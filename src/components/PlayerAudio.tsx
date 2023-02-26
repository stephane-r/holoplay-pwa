import { Box } from "@mantine/core";
import { memo } from "react";
import ReactAudioPlayer from "react-audio-player";
import {
  usePlayerAudio,
  usePlayerUrl,
  useSetPlayerState,
} from "../providers/Player";
import { displayTimeBySeconds } from "../utils/displayTimeBySeconds";

export const PlayerAudio = memo(() => {
  const playerAudio = usePlayerAudio();
  const playerUrl = usePlayerUrl();
  const setPlayerState = useSetPlayerState();

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

  const handleEnd = () => {};

  const handleListen = (currentTime: number) => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    setPlayerState((previousState) => ({
      ...previousState,
      duration: displayTimeBySeconds(audio.duration),
      currentTime: displayTimeBySeconds(currentTime, audio.duration),
      percentage: (100 * currentTime) / Number(audio.duration.toFixed(2)),
    }));
  };

  const handleVolumeChanged = (event: any) => {
    setPlayerState((previousState) => ({
      ...previousState,
      volume: (event.target as HTMLAudioElement).volume,
    }));
  };

  return (
    <Box style={{ display: "none" }} aria-hidden="true">
      <ReactAudioPlayer
        ref={playerAudio}
        src={playerUrl as string}
        // src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        autoPlay
        controls
        listenInterval={100}
        onPause={handlePause}
        onPlay={handlePlay}
        onEnded={handleEnd}
        onListen={handleListen}
        onVolumeChanged={handleVolumeChanged}
      />
    </Box>
  );
});
