import {
  Box,
  Card,
  Divider,
  Flex,
  ScrollArea,
  Space,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { usePlayerUrl, usePlayerVideo } from "../providers/Player";
import { usePlayerPlaylist } from "../providers/PlayerPlaylist";
import { Video, VideoThumbnail } from "../types/interfaces/Video";
import { ButtonDownload } from "./ButtonDownload";
import { ButtonFavorite } from "./ButtonFavorite";
import { ButtonPlayerModeVideo } from "./ButtonPlayerModeVideo";
import { ButtonRepeat } from "./ButtonRepeat";
import { ButtonShare } from "./ButtonShare";
import { ButtonVolume } from "./Player";
import { PlayerActions } from "./PlayerActions";
import { PlayerBackground } from "./PlayerBackground";
import { PlayerLoadingOverlay } from "./PlayerLoadingOverlay";
import { PlayerProgress } from "./PlayerProgress";
import { VideoList } from "./VideoList";

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
        <VideoInformations hideDescription titleLineClamp={2} />
        <Space h="xl" />
        <Flex gap="md">
          <ButtonDownload iconSize={16} />
          <ButtonShare iconSize={16} />
          <ButtonPlayerModeVideo render="button" iconSize={16} />
          <ButtonVolume />
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

interface VideoInformationsProps {
  titleLineClamp?: number;
  hideDescription?: boolean;
}

const VideoInformations: React.FC<VideoInformationsProps> = memo(
  ({ titleLineClamp = 1, hideDescription = false }) => {
    const { video } = usePlayerVideo();
    const { classes } = useStyles();

    useDocumentTitle(`${video?.title as string} - HoloPlay`);

    if (!video) {
      return null;
    }

    const image = video.videoThumbnails.find(
      (thumbnail) => thumbnail.quality === "maxresdefault",
    ) as VideoThumbnail;

    return (
      <Box style={{ textAlign: "center", maxWidth: 400 }}>
        <img src={image.url} alt={video.title} className={classes.thumbnail} />
        <div>
          <Text color="white" weight={600} lineClamp={titleLineClamp}>
            {video.title}
          </Text>
          {hideDescription ? null : (
            <Text lineClamp={1} size="sm" maw="100%">
              {video.description}
            </Text>
          )}
        </div>
      </Box>
    );
  },
);
