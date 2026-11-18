import { Box, Flex, Slider, Text } from "@mantine/core";
import { memo } from "react";

import { useDevices } from "../hooks/useDevices";
import { useSponsorBlock } from "../hooks/useSponsorBlock";
import { usePlayerAudio, usePlayerTime } from "../providers/Player";
import { SponsorBlockBar } from "./SponsorBlockBar";

export const PlayerProgress = memo(() => {
  const playerAudio = usePlayerAudio();
  const playerTime = usePlayerTime();
  const { isLarge } = useDevices();

  useSponsorBlock();

  const handleChangeEnd = (currentTime: number) => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    audio.currentTime = (currentTime * audio.duration) / 100;
  };

  return (
    <Flex align="center" gap={isLarge ? "xl" : "md"} style={{ flex: 1 }}>
      <Text size="xs" c="white">
        {String(playerTime.formatedCurrentTime ?? "00:00")}
      </Text>
      <Box pos="relative" style={{ flex: 1 }}>
        <Slider
          label={null}
          value={playerTime.percentage as number}
          onChangeEnd={handleChangeEnd}
          size="xs"
        />
        <SponsorBlockBar />
      </Box>
      <Text size="xs" c="white">
        {String(playerTime.duration ?? "00:00")}
      </Text>
    </Flex>
  );
});
