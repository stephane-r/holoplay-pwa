import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  ScrollArea,
  Space,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useStableNavigate } from "../providers/Navigate";
import { usePlayerUrl, usePlayerVideo } from "../providers/Player";
import { usePlayerPlaylist } from "../providers/PlayerPlaylist";
import type { CardVideo } from "../types/interfaces/Card";
import type { Video, VideoThumbnail } from "../types/interfaces/Video";
import { ButtonDevicesAvailable } from "./ButtonDevicesAvailable";
import { ButtonDownload } from "./ButtonDownload";
import { ButtonFavorite } from "./ButtonFavorite";
import { ButtonPlayerModeVideo } from "./ButtonPlayerModeVideo";
import { ButtonRepeat } from "./ButtonRepeat";
import { ButtonShare } from "./ButtonShare";
import classes from "./DrawerPlayer.module.css";
import { ButtonVolume } from "./Player";
import { PlayerActions } from "./PlayerActions";
import { PlayerBackground } from "./PlayerBackground";
import { PlayerLoadingOverlay } from "./PlayerLoadingOverlay";
import { PlayerProgress } from "./PlayerProgress";
import { VideoList } from "./VideoList";

export const DrawerPlayer = memo(() => {
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
  const { video } = usePlayerVideo() as { video: Video };

  return (
    <>
      <Flex justify="center" align="center" direction="column">
        <VideoInformations />
        <Space h="md" />
        <ButtonDevicesAvailable variant="text" />
        <Space h="md" />
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
          <ButtonFavorite card={video as CardVideo} variant="transparent" />
        </Flex>
      </Flex>
    </>
  );
});

const VideoInformations = memo(() => {
  const { video } = usePlayerVideo();
  const [descriptionLineClamp, setDescriptionLineClamp] = useState<
    number | undefined
  >(1);
  const navigate = useStableNavigate();

  useDocumentTitle(`${video?.title as string} - HoloPlay`);

  if (!video) {
    return null;
  }

  const handleToggleDescription = () => {
    setDescriptionLineClamp(descriptionLineClamp ? undefined : 1);
  };

  const image = video.videoThumbnails.find(
    (thumbnail) => thumbnail.quality === "maxresdefault",
  ) as VideoThumbnail;

  return (
    <Box style={{ textAlign: "center", maxWidth: 400 }}>
      <img src={image.url} alt={video.title} className={classes.thumbnail} />
      <div>
        <Text c="white">
          <strong>{video.title}</strong>
        </Text>
        <UnstyledButton
          mah={120}
          style={{ overflow: "auto" }}
          onClick={handleToggleDescription}
        >
          <Text lineClamp={descriptionLineClamp} size="sm" mt="xs">
            {video.description}
          </Text>
        </UnstyledButton>
        <Button
          variant="subtle"
          onClick={() => navigate(`/channels/${video.authorId}`)}
          radius="md"
        >
          {video.author}
        </Button>
      </div>
    </Box>
  );
});
