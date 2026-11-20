import {
  ActionIcon,
  Box,
  Divider,
  Drawer,
  Flex,
  ScrollArea,
  Slider,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconChevronUp } from "@tabler/icons-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { usePlayerTime, usePlayerVideo } from "../providers/Player";
import { usePlaybackService } from "../services/playback/usePlaybackService";
import { ChapterList } from "./ChapterList";
import { DrawerPlayerVideo } from "./DrawerPlayer";
import classes from "./MobilePlayer.module.css";
import { PlayerActions } from "./PlayerActions";
import { PlayerBackground } from "./PlayerBackground";
import {
  PlayerDrawerViewToggle,
  type PlayerDrawerView,
} from "./PlayerDrawerViewToggle";
import { VideoList } from "./VideoList";

export const MobilePlayer = memo(() => {
  return (
    <Box className={classes.container}>
      <PlayerBackground />
      <PlayerProgress />
      <Flex className={classes.content}>
        <ButtonOpenDrawer />
        <VideoInformations />
        <PlayerActions showTrackNext={false} showTrackPrevious={false} />
      </Flex>
    </Box>
  );
});

const ButtonOpenDrawer = memo(() => {
  const [isOpen, setOpen] = useState(false);
  const [view, setView] = useState<PlayerDrawerView>("queue");
  const { queue: videos } = usePlaybackService();
  const { video } = usePlayerVideo();
  const { t } = useTranslation();
  const { height } = useViewportSize();

  const chapters = video?.chapters ?? [];

  return (
    <>
      <ActionIcon
        color="transparent"
        onClick={() => setOpen((state) => !state)}
      >
        <IconChevronUp size={18} />
      </ActionIcon>
      <Drawer
        opened={isOpen}
        onClose={() => setOpen((state) => !state)}
        title={t("player.title")}
        padding="xl"
        size="full"
        position="bottom"
      >
        <ScrollArea style={{ height, maxWidth: "100%" }}>
          <DrawerPlayerVideo />
          <Space h="xl" />
          <Divider />
          <Space h="xl" />
          {chapters.length > 0 ? (
            <PlayerDrawerViewToggle value={view} onChange={setView} />
          ) : (
            <Title order={3}>{t("player.queue")}</Title>
          )}
          <Space h="xl" />
          {view === "chapters" ? (
            <ChapterList chapters={chapters} />
          ) : (
            <VideoList videos={videos} />
          )}
        </ScrollArea>
      </Drawer>
    </>
  );
});

const VideoInformations = memo(() => {
  const { video } = usePlayerVideo();

  if (!video) {
    return null;
  }

  return (
    <Box>
      <Text size="sm" lineClamp={1}>
        {video.title}
      </Text>
    </Box>
  );
});

const PlayerProgress = memo(() => {
  const playerTime = usePlayerTime();

  return (
    <Slider
      label={null}
      value={playerTime.percentage as number}
      mt="0"
      mb="0"
      size="xs"
      radius={0}
      styles={{
        thumb: { display: "none" },
      }}
    />
  );
});
