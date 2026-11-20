import { Box, Flex, Slider, Text } from "@mantine/core";
import { memo } from "react";

import { useAudioElement } from "../hooks/useAudioElement";
import { useChapterLoop } from "../hooks/useChapterLoop";
import { useDevices } from "../hooks/useDevices";
import { useSponsorBlock } from "../hooks/useSponsorBlock";
import { usePlayerTime } from "../providers/Player";
import { SponsorBlockBar } from "./SponsorBlockBar";

export const PlayerProgress = memo(() => {
  const audioElement = useAudioElement();
  const playerTime = usePlayerTime();
  const { isLarge } = useDevices();

  useSponsorBlock();
  useChapterLoop();

  const handleChangeEnd = (currentTime: number) => {
    if (!audioElement) return;
    audioElement.currentTime = (currentTime * audioElement.duration) / 100;
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
