import {
  ActionIcon,
  Box,
  createStyles,
  Drawer,
  Flex,
  ScrollArea,
  Slider,
  Space,
  Text,
} from "@mantine/core";
import {
  IconPlaylist,
  IconRepeat,
  IconRepeatOnce,
  IconVolume,
} from "@tabler/icons-react";
import { memo, useState } from "react";
import {
  usePlayerAudio,
  usePlayerState,
  usePlayerUrl,
  usePlayerVideo,
  useSetPlayerState,
} from "../providers/Player";
import { PlayerAudio } from "./PlayerAudio";
import { useMediaQuery } from "@mantine/hooks";
import { usePlayerPlaylist } from "../providers/PlayerPlaylist";
import { VideoList } from "./VideoList";
import { PlayerActions } from "./PlayerActions";
import { PlayerProgress } from "./PlayerProgress";
import { PlayerBackground } from "./PlayerBackground";

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    zIndex: 2,
    right: 0,
    bottom: 0,
    left: 0,
    boxShadow: "10px 0 10px rgb(0 0 0 / 20%)",
  },
  thumbnail: {
    flex: "0 0 50px",
    height: 50,
    borderRadius: theme.radius.md,
  },
}));

export const Player = memo(() => {
  const { classes } = useStyles();
  const playerUrl = usePlayerUrl();
  const matches = useMediaQuery("(max-width: 2140px)");

  if (!playerUrl) {
    return null;
  }

  return (
    <Box
      className={classes.container}
      style={{ display: matches ? "block" : "none" }}
    >
      <Flex align="center" p="xl">
        <PlayerAudio />
        {matches ? (
          <>
            <PlayerBackground />
            <VideoInformations />
            <Space w={60} />
            <Flex align="center" style={{ flex: 1 }}>
              <PlayerActions />
              <Space w={60} />
              <PlayerProgress />
              <Space w={60} />
              <PlayerRepeat />
              <Space w={20} />
              <PlayerVolume />
              <Space w={60} />
              <PlayerPlaylist />
            </Flex>
          </>
        ) : null}
      </Flex>
    </Box>
  );
});

const VideoInformations = memo(() => {
  const { classes } = useStyles();
  const { video, thumbnailUrl } = usePlayerVideo();

  return (
    <Flex align="center" style={{ maxWidth: 400 }} gap="lg">
      <Box
        style={{
          background: `url(${thumbnailUrl}) center center / cover grey`,
        }}
        className={classes.thumbnail}
      />
      <Box>
        <Text color="white" lineClamp={1}>
          {video?.title}
        </Text>
        <Text color="white" size="sm" lineClamp={1}>
          {video?.description}
        </Text>
      </Box>
    </Flex>
  );
});

const PlayerRepeat = memo(() => {
  const playerState = usePlayerState();
  const playerAudio = usePlayerAudio();
  const setPlayerState = useSetPlayerState();

  const handleClick = () => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    audio.loop = !playerState.repeat;

    setPlayerState((previousState) => ({
      ...previousState,
      repeat: !previousState.repeat,
    }));
  };

  return (
    <ActionIcon onClick={handleClick}>
      {playerState.repeat ? <IconRepeatOnce /> : <IconRepeat />}
    </ActionIcon>
  );
});

const PlayerVolume = memo(() => {
  const playerState = usePlayerState();
  const playerAudio = usePlayerAudio();

  const handleChangeEnd = (volume: number) => {
    // @ts-ignorex
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    audio.volume = volume / 100;
  };

  return (
    <Flex align="center" gap="sm" w={200}>
      <ActionIcon>
        <IconVolume />
      </ActionIcon>
      <Box style={{ flex: 1 }}>
        <Slider
          value={playerState.volume * 100}
          size="xs"
          styles={{
            thumb: { display: "none" },
            bar: { background: "white" },
          }}
          onChangeEnd={handleChangeEnd}
        />
      </Box>
    </Flex>
  );
});

const PlayerPlaylist = memo(() => {
  const [opened, setOpened] = useState(false);
  const videosPlaylist = usePlayerPlaylist();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Next song"
        padding="xl"
        position="right"
        size="xl"
      >
        <ScrollArea style={{ height: "calc(100vh - 80px)" }}>
          <VideoList videos={videosPlaylist} />
        </ScrollArea>
      </Drawer>
      <ActionIcon onClick={() => setOpened(true)}>
        <IconPlaylist />
      </ActionIcon>
    </>
  );
});

export const PlayerSpace = memo(() => {
  const playerUrl = usePlayerUrl();
  const matches = useMediaQuery("(max-width: 2140px)");
  const height = playerUrl && matches ? 98 : 0;

  return <Box style={{ height }} />;
});
