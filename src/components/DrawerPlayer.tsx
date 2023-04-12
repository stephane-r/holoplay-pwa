import {
  Box,
  Card,
  createStyles,
  Divider,
  Flex,
  ScrollArea,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { memo } from "react";
import { usePlayerUrl, usePlayerVideo } from "../providers/Player";
import { usePlayerPlaylist } from "../providers/PlayerPlaylist";
import { Video, VideoThumbnail } from "../types/interfaces/Video";
import { ButtonFavorite } from "./ButtonFavorite";
import { PlayerActions } from "./PlayerActions";
import { PlayerBackground } from "./PlayerBackground";
import { ButtonRepeat } from "./ButtonRepeat";
import { PlayerProgress } from "./PlayerProgress";
import { VideoList } from "./VideoList";
import { ButtonDownload } from "./ButtonDownload";
import { ButtonShare } from "./ButtonShare";
import { PlayerLoadingOverlay } from "./PlayerLoadingOverlay";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  card: {
    position: "sticky",
    top: 0,
    height: "100vh",
    transition: ".2s",
  },
  scrollArea: {
    height: "calc(100vh - 500px)",
  },
  thumbnail: {
    maxWidth: "100%",
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.xl,

    [`@media (min-width: ${theme.breakpoints.sm})`]: {
      maxWidth: 320,
    },
  },
  progressContainer: {
    width: "100%",

    [`@media (min-width: ${theme.breakpoints.sm})`]: {
      paddingLeft: theme.spacing.xl,
      paddingRight: theme.spacing.xl,
    },
  },
}));

export const DrawerPlayer = memo(() => {
  const { classes } = useStyles();
  const playerUrl = usePlayerUrl();
  const playerPlaylist = usePlayerPlaylist();
  const { t } = useTranslation();

  const cardStyles = {
    width: playerUrl ? 500 : 0,
    opacity: playerUrl ? 1 : 0,
    boxShadow: "0 -10px 10px rgb(0 0 0 / 20%)",
  };

  return (
    <Card className={classes.card} style={cardStyles} radius={0} p={0}>
      <PlayerBackground />
      <Box>
        <Box p="xl" pos="relative">
          <Title order={3}>{t("drawer.player.title")}</Title>
          <Space h={36} />
          <DrawerPlayerVideo />
          <PlayerLoadingOverlay />
          <Space h="md" />
        </Box>
        <Divider />
        <Space h="md" />
        <Box p="xl">
          <Title order={3}>{t("drawer.player.queue")}</Title>
        </Box>
        <Box p="xs">
          <ScrollArea className={classes.scrollArea}>
            <VideoList videos={playerPlaylist} />
          </ScrollArea>
        </Box>
      </Box>
    </Card>
  );
});

export const DrawerPlayerVideo = memo(() => {
  const { classes } = useStyles();
  const { video } = usePlayerVideo() as { video: Video };

  return (
    <>
      <Flex justify="center" align="center" direction="column">
        <VideoInformations />
        <Space h="xl" />
        <Flex gap="md">
          <ButtonDownload iconSize={16} />
          <ButtonShare iconSize={16} />
        </Flex>
        <Space h="xl" />
        <Flex className={classes.progressContainer}>
          <PlayerProgress />
        </Flex>
        <Space h="xl" />
        <Flex align="center" gap="xl">
          <ButtonRepeat iconSize={16} />
          <PlayerActions />
          <ButtonFavorite video={video} variant="transparent" />
        </Flex>
      </Flex>
    </>
  );
});

const VideoInformations = memo(() => {
  const { video } = usePlayerVideo();
  const { classes } = useStyles();

  useDocumentTitle(`${video?.title as string} - HoloPlay`);

  if (!video) {
    return null;
  }

  const image = video.videoThumbnails.find(
    (thumbnail) => thumbnail.quality === "maxresdefault"
  ) as VideoThumbnail;

  return (
    <Box style={{ textAlign: "center", maxWidth: 400 }}>
      <img src={image.url} alt={video.title} className={classes.thumbnail} />
      <div>
        <Text color="white" weight={600} lineClamp={1}>
          {video.title}
        </Text>
        <Text lineClamp={1} size="sm">
          {video.description}
        </Text>
      </div>
    </Box>
  );
});
