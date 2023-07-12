import { Box, Flex, Slider, Text } from "@mantine/core";
import { memo } from "react";
import { usePlayerAudio, usePlayerState } from "../providers/Player";
import { SponsorBlockBar } from "./SponsorBlockBar";
import { useSponsorBlock } from "../hooks/useSponsorBlock";

export const PlayerProgress = memo(() => {
  const playerAudio = usePlayerAudio();
  const playerState = usePlayerState();

  useSponsorBlock();

  const handleChangeEnd = (currentTime: number) => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    audio.currentTime = (currentTime * audio.duration) / 100;
  };

  return (
    <Flex align="center" gap="xl" style={{ flex: 1 }}>
      <Text size="xs" color="white">
        {String(playerState.formatedCurrentTime ?? "00:00")}
      </Text>
      <Box pos="relative" style={{ flex: 1 }}>
        <Slider
          label={null}
          value={playerState.percentage as number}
          onChangeEnd={handleChangeEnd}
          size="xs"
        />
        <SponsorBlockBar />
      </Box>
      <Text size="xs" color="white">
        {String(playerState.duration ?? "00:00")}
      </Text>
    </Flex>
  );
});
