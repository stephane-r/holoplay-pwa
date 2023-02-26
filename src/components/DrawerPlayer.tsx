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
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";
import { usePlayerUrl, usePlayerVideo } from "../providers/Player";
import { usePlayerPlaylist } from "../providers/PlayerPlaylist";
import { VideoThumbnail } from "../types/interfaces/Video";
import { PlayerActions } from "./PlayerActions";
import { PlayerBackground } from "./PlayerBackground";
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
    maxWidth: 320,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.xl,
  },
}));

export const DrawerPlayer = memo(() => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 2140px)");
  const playerUrl = usePlayerUrl();
  const playerPlaylist = usePlayerPlaylist();

  if (!matches) {
    return null;
  }

  const cardStyles = {
    width: playerUrl ? 500 : 0,
    opacity: playerUrl ? 1 : 0,
    boxShadow: "0 -10px 10px rgb(0 0 0 / 20%)",
  };

  return (
    <Card className={classes.card} style={cardStyles} radius={0} p={0}>
      <PlayerBackground />
      <Box>
        <Box p="xl">
          <Title order={3}>Now playing</Title>
          <Space h={36} />
          <Flex justify="center" align="center" direction="column">
            <VideoInformations />
            <Space h="xl" />
            <Box style={{ width: "100%", paddingLeft: 40, paddingRight: 40 }}>
              <PlayerProgress />
            </Box>
            <Space h="xl" />
            <PlayerActions />
          </Flex>
        </Box>
        <Space h="md" />
        <Divider />
        <Space h="md" />
        <Box p="xl">
          <Title order={3}>Your queue</Title>
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

const VideoInformations = memo(() => {
  const { video } = usePlayerVideo();
  const { classes } = useStyles();

  if (!video) {
    return null;
  }

  const image = video.videoThumbnails.find(
    (thumbnail) => thumbnail.quality === "maxresdefault"
  ) as VideoThumbnail;

  return (
    <Box style={{ textAlign: "center", maxWidth: 400 }}>
      <img src={image.url} alt={video.title} className={classes.thumbnail} />
      <Text color="white" weight={600} lineClamp={1}>
        {video.title}
      </Text>
      <Text lineClamp={1} size="sm">
        {video.description}
      </Text>
    </Box>
  );
});
