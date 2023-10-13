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
  createStyles,
  rem,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconChevronUp } from "@tabler/icons-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { usePlayerState, usePlayerVideo } from "../providers/Player";
import { usePlayerPlaylist } from "../providers/PlayerPlaylist";
import { DrawerPlayerVideo } from "./DrawerPlayer";
import { PlayerActions } from "./PlayerActions";
import { PlayerBackground } from "./PlayerBackground";
import { VideoList } from "./VideoList";

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    bottom: rem(50),
    paddingBottom: rem(10),
    left: 0,
    right: 0,
    zIndex: 2,
  },
  content: {
    padding: theme.spacing.xs,
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    gap: theme.spacing.xs,
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export const MobilePlayer = memo(() => {
  const { classes } = useStyles();

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
  const videos = usePlayerPlaylist();
  const { t } = useTranslation();
  const { height } = useViewportSize();

  return (
    <>
      <ActionIcon onClick={() => setOpen((state) => !state)}>
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
          <Title order={3}>{t("player.queue")}</Title>
          <Space h="xl" />
          <VideoList videos={videos} />
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
  const playerState = usePlayerState();

  return (
    <Slider
      label={null}
      value={playerState.percentage as number}
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
