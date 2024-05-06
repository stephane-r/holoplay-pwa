import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Menu,
  Popover,
  ScrollArea,
  Space,
  Text,
} from "@mantine/core";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconPlaylist,
  IconVolume,
} from "@tabler/icons-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDevices } from "../hooks/useDevices";
import { useStableNavigate } from "../providers/Navigate";
import {
  usePlayerAudio,
  usePlayerState,
  usePlayerUrl,
  usePlayerVideo,
} from "../providers/Player";
import { usePlayerPlaylist } from "../providers/PlayerPlaylist";
import { ButtonDevicesAvailable } from "./ButtonDevicesAvailable";
import { ButtonDownload } from "./ButtonDownload";
import { ButtonFavorite } from "./ButtonFavorite";
import { ButtonPlayerModeVideo } from "./ButtonPlayerModeVideo";
import { ButtonRepeat } from "./ButtonRepeat";
import { ButtonShare } from "./ButtonShare";
import classes from "./Player.module.css";
import { PlayerActions } from "./PlayerActions";
import { PlayerBackground } from "./PlayerBackground";
import { PlayerLoadingOverlay } from "./PlayerLoadingOverlay";
import { PlayerProgress } from "./PlayerProgress";
import { VerticalSlider } from "./VerticalSlider";
import { VideoList } from "./VideoList";

export const Player = memo(() => {
  const showPlayerBar = useMediaQuery("(max-width: 2140px)");
  const { isMedium, isLarge, isLessThanLarge, isXlarge } = useDevices();

  return (
    <Box
      role="dialog"
      aria-label="Player"
      className={classes.container}
      data-visible={showPlayerBar}
    >
      <Flex align="center" className={classes.content}>
        <PlayerLoadingOverlay />
        {showPlayerBar ? (
          <>
            <PlayerBackground />
            <VideoInformations />
            <Space w={isXlarge ? 60 : 30} />
            <Flex align="center" style={{ flex: 1 }}>
              <PlayerActions />
              <Space w={isLessThanLarge ? 30 : 60} />
              {isMedium ? (
                <>
                  <PlayerProgress />
                  <Space w={isLarge ? 60 : 30} />
                </>
              ) : null}
              <ButtonDevicesAvailable variant="icon" />
              <Space w={20} />
              <ButtonRepeat iconSize={20} />
              <Space w={20} />
              <ButtonDownload iconSize={20} />
              <Space w={20} />
              <ButtonShare iconSize={20} />
              {isLarge ? (
                <>
                  <Space w={20} />
                  <ButtonFavorite iconSize={20} variant="transparent" />
                </>
              ) : null}
              <Space w={20} />
              <ButtonVolume />
              <Space w={20} />
              <PlayerPlaylist />
              {isLessThanLarge ? (
                <>
                  <Space w={20} />
                  <MoreSubMenu />
                </>
              ) : null}
            </Flex>
          </>
        ) : null}
      </Flex>
    </Box>
  );
});

const VideoInformations = memo(() => {
  const { video, thumbnailUrl } = usePlayerVideo();
  const navigate = useStableNavigate();

  useDocumentTitle(video?.title as string);

  if (!video) return null;

  return (
    <Flex
      align="center"
      className={classes.videoInformationsContainer}
      gap="lg"
    >
      <Box
        style={{
          background: `url(${thumbnailUrl}) center center / cover grey`,
        }}
        className={classes.thumbnail}
      />
      <Box maw="100%" pr="lg">
        <Text c="white" lineClamp={1} title={video.title}>
          {video.title}
        </Text>
        <Text c="white" size="sm" lineClamp={1}>
          {video.description}
        </Text>
        <Button
          variant="subtle"
          color="white"
          size="xs"
          p={0}
          onClick={() => navigate(`/channels/${video.authorId}`)}
        >
          {video.author}
        </Button>
      </Box>
    </Flex>
  );
});

export const ButtonVolume = memo(() => {
  const playerState = usePlayerState();
  const playerAudio = usePlayerAudio();

  const handleChangeEnd = (volume: number) => {
    // @ts-ignorex
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    audio.volume = volume / 100;
  };

  return (
    <Popover shadow="md">
      <Popover.Target>
        <ActionIcon color="transparent">
          <IconVolume size={20} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <VerticalSlider
          value={playerState.volume * 100}
          onChangeEnd={handleChangeEnd}
        />
      </Popover.Dropdown>
    </Popover>
  );
});

const PlayerPlaylist = memo(() => {
  const [opened, setOpened] = useState(false);
  const videosPlaylist = usePlayerPlaylist();
  const { t } = useTranslation();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={t("player.next.song")}
        padding="xl"
        position="right"
        size="xl"
      >
        <ScrollArea style={{ height: "calc(100vh - 80px)" }}>
          <VideoList videos={videosPlaylist} />
        </ScrollArea>
      </Drawer>
      <ActionIcon color="transparent" onClick={() => setOpened(true)}>
        <IconPlaylist size={20} />
      </ActionIcon>
    </>
  );
});

export const PlayerSpace = memo(() => {
  const playerUrl = usePlayerUrl();

  return <Box className={classes.spacer} data-visible={Boolean(playerUrl)} />;
});

const MoreSubMenu = memo(() => {
  return (
    <Menu shadow="md" width={200} position="top">
      <Menu.Target>
        <ActionIcon variant="transparent" c="white">
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <ButtonPlayerModeVideo render="menu" />
        <ButtonFavorite render="menu" />
      </Menu.Dropdown>
    </Menu>
  );
});
