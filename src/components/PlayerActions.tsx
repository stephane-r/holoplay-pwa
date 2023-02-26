import { ActionIcon, Flex } from "@mantine/core";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
} from "@tabler/icons-react";
import { memo } from "react";
import { usePlayerAudio, usePlayerState } from "../providers/Player";

export const PlayerActions = memo(() => {
  const playerState = usePlayerState();
  const playerAudio = usePlayerAudio();

  const handlePlay = () => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <Flex align="center" gap="lg">
      <ActionIcon size="lg" radius="md" title="Previous track">
        <IconPlayerTrackPrev size={16} />
      </ActionIcon>
      <ActionIcon
        variant="filled"
        size="xl"
        radius="md"
        title={playerState.paused ? "Play" : "Pause"}
        onClick={handlePlay}
      >
        {playerState.paused ? <IconPlayerPlay /> : <IconPlayerPause />}
      </ActionIcon>
      <ActionIcon size="lg" radius="md" title="Next track">
        <IconPlayerTrackNext size={16} />
      </ActionIcon>
    </Flex>
  );
});
