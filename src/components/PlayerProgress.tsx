import { Box, Flex, Slider, Text } from "@mantine/core";
import { memo } from "react";

import { useDevices } from "../hooks/useDevices";
import { useSponsorBlock } from "../hooks/useSponsorBlock";
import { usePlayerAudio, usePlayerState } from "../providers/Player";
import { SponsorBlockBar } from "./SponsorBlockBar";

export const PlayerProgress = memo(() => {
  const playerAudio = usePlayerAudio();
  const playerState = usePlayerState();
  const { isLarge } = useDevices();

  useSponsorBlock();

  const handleChangeEnd = (currentTime: number) => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    audio.currentTime = (currentTime * audio.duration) / 100;
  };

  return (
    <Flex align="center" gap={isLarge ? "xl" : "md"} style={{ flex: 1 }}>
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
