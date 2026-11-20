import { ActionIcon, Flex, Text, UnstyledButton } from "@mantine/core";
import { IconRepeat, IconRepeatOnce } from "@tabler/icons-react";
import hexToRgba from "hex-to-rgba";
import { type FC, type MouseEvent, memo } from "react";
import { useTranslation } from "react-i18next";

import { useAudioElement } from "../hooks/useAudioElement";
import {
  usePlayerState,
  usePlayerTime,
  usePlayerVideo,
  useSetPlayerState,
} from "../providers/Player";
import type { Chapter } from "../types/interfaces/Chapter";
import { displayTimeBySeconds } from "../utils/displayTimeBySeconds";

interface ChapterListProps {
  chapters: Chapter[];
}

export const ChapterList: FC<ChapterListProps> = memo(({ chapters }) => {
  return chapters.map((chapter) => (
    <ChapterItem key={chapter.startTime} chapter={chapter} />
  ));
});

interface ChapterItemProps {
  chapter: Chapter;
}

const ChapterItem: FC<ChapterItemProps> = memo(({ chapter }) => {
  const { t } = useTranslation();
  const audioElement = useAudioElement();
  const { video, primaryColor } = usePlayerVideo();
  const playerTime = usePlayerTime();
  const playerState = usePlayerState();
  const setPlayerState = useSetPlayerState();

  const isCurrent =
    playerTime.currentTime !== null &&
    playerTime.currentTime >= chapter.startTime &&
    playerTime.currentTime < chapter.endTime;
  const isLooping =
    playerState.loopingChapter?.startTime === chapter.startTime;

  const handleJump = () => {
    if (!audioElement) return;
    audioElement.currentTime = chapter.startTime;
    audioElement.play();
  };

  const handleToggleLoop = (event: MouseEvent) => {
    // Shares the row with handleJump below — toggling the loop shouldn't
    // also seek.
    event.stopPropagation();
    setPlayerState((state) => ({
      ...state,
      loopingChapter: isLooping ? null : chapter,
    }));
  };

  return (
    <UnstyledButton onClick={handleJump} style={{ width: "100%" }}>
      <Flex
        align="center"
        gap="md"
        p="sm"
        style={{
          background: isCurrent
            ? hexToRgba(primaryColor?.color as string, "0.6")
            : undefined,
        }}
      >
        <Text size="sm" c="dimmed" style={{ flexShrink: 0 }}>
          {displayTimeBySeconds(chapter.startTime, video?.lengthSeconds)}
        </Text>
        <Text size="sm" lineClamp={1} style={{ flex: 1 }}>
          {isCurrent ? <strong>{chapter.title}</strong> : chapter.title}
        </Text>
        <ActionIcon
          variant={isLooping ? "filled" : "subtle"}
          radius="md"
          onClick={handleToggleLoop}
          title={t("player.chapters.repeat")}
        >
          {isLooping ? <IconRepeatOnce size={16} /> : <IconRepeat size={16} />}
        </ActionIcon>
      </Flex>
    </UnstyledButton>
  );
});
