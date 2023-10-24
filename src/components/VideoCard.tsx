import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Group,
  LoadingOverlay,
  Card as MCard,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconMusic,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { usePlayVideo } from "../hooks/usePlayVideo";
import {
  usePlayerAudio,
  usePlayerState,
  usePlayerVideo,
} from "../providers/Player";
import type { CardVideo } from "../types/interfaces/Card";
import { displayTimeBySeconds } from "../utils/displayTimeBySeconds";
import { getThumbnailQuality } from "../utils/formatData";
import { ButtonFavorite } from "./ButtonFavorite";
import classes from "./Card.module.css";
import { CardImage } from "./CardImage";
import { CardMenu } from "./CardMenu";

interface VideoCardProps {
  video: CardVideo;
  component?: "div" | "li";
  currentInstanceUri: string;
}

export const isLiveStream = (video: CardVideo) =>
  video.type === "livestream" || video.liveNow || video.lengthSeconds === 0;

export const VideoCard: FC<VideoCardProps> = memo(
  ({ video, component = "div", currentInstanceUri }) => {
    const { handlePlay, loading } = usePlayVideo();
    const { t } = useTranslation();

    const image =
      video.thumbnail ??
      getThumbnailQuality(video.videoThumbnails ?? [], "maxresdefault");

    return (
      <MCard
        withBorder
        component={component}
        className={classes.card}
        radius="md"
      >
        <CardPlaying videoId={video.videoId} />
        <HackedCardPress videoId={video.videoId} />
        <LoadingOverlay visible={loading} />
        <UnstyledButton
          style={{ width: "100%" }}
          onClick={() => handlePlay(video.videoId)}
        >
          <CardImage
            src={image}
            domain={currentInstanceUri}
            title={video.title}
          >
            <Flex align="center" gap="xs" className={classes.cardImageOverlay}>
              {video.lengthSeconds > 0 ? (
                <Badge variant="filled" size="xs">
                  {displayTimeBySeconds(video.lengthSeconds)}
                </Badge>
              ) : null}
              {isLiveStream(video) ? (
                <Badge variant="filled" size="xs" color="red">
                  {t("live")}
                </Badge>
              ) : null}
            </Flex>
          </CardImage>
          <Group className={classes.section} mt="sm" p={0}>
            <Text
              lineClamp={2}
              className={classes.videoTitle}
              title={video.title}
            >
              {video.title}
            </Text>
          </Group>
        </UnstyledButton>
        <Group mt="xs" className={classes.cardActions}>
          <ButtonPlayPause
            onClick={() => handlePlay(video.videoId)}
            videoId={video.videoId}
          />
          <ButtonFavorite card={video} />
          <CardMenu card={video} />
        </Group>
      </MCard>
    );
  },
);

const HackedCardPress = memo(({ videoId }: { videoId: string }) => {
  const { video } = usePlayerVideo();

  if (video?.videoId !== videoId) {
    return null;
  }

  return <Box className={classes.absoluteCardPress} />;
});

const ButtonPlayPause = memo(
  ({ onClick, videoId }: { onClick: () => void; videoId: string }) => {
    const { video } = usePlayerVideo();

    if (video?.videoId === videoId) {
      return <ButtonAudioPlayPause />;
    }

    return <ButtonPlay onClick={onClick} />;
  },
);

const ButtonPlay = memo(({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <ActionIcon
      variant="default"
      size={36}
      onClick={() => onClick()}
      title={t("button.play")}
      className={classes.buttonPlay}
      radius="md"
    >
      <IconPlayerPlay size={18} stroke={1.5} />
    </ActionIcon>
  );
});

const ButtonAudioPlayPause = memo(() => {
  const playerAudio = usePlayerAudio();
  const playerState = usePlayerState();
  const { t } = useTranslation();

  const handlePlayPause = () => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <ActionIcon
      variant="default"
      className={classes.buttonPlay}
      size={36}
      title={playerState.paused ? t("button.play") : t("button.pause")}
      onClick={handlePlayPause}
      radius="md"
    >
      {playerState.paused ? <IconPlayerPlay /> : <IconPlayerPause />}
    </ActionIcon>
  );
});

const CardPlaying = memo(({ videoId }: { videoId: string }) => {
  const { video } = usePlayerVideo();
  const playerAudio = usePlayerAudio();

  if (video?.videoId !== videoId) {
    return null;
  }

  const handlePlayPause = () => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <UnstyledButton className={classes.buttonPlaying} onClick={handlePlayPause}>
      <Flex align="center" justify="center">
        <IconMusic size={60} />
      </Flex>
    </UnstyledButton>
  );
});
