import {
  ActionIcon,
  Box,
  Flex,
  LoadingOverlay,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import hexToRgba from "hex-to-rgba";
import { type FC, memo } from "react";

import { usePlayVideo } from "../hooks/usePlayVideo";
import { usePlayerAudio, usePlayerVideo } from "../providers/Player";
import { useSettings } from "../providers/Settings";
import type { Video as VideoType } from "../types/interfaces/Video";
import { getThumbnailQuality } from "../utils/formatData";
import { Image } from "./Image";
import classes from "./Video.module.css";

interface VideoProps {
  video: VideoType;
  withThumbnail?: boolean;
}

export const Video: FC<VideoProps> = memo(({ video, withThumbnail = true }) => {
  const { video: playedVideo, primaryColor } = usePlayerVideo();
  const { handlePlay, loading } = usePlayVideo();
  const playerAudio = usePlayerAudio();
  const { currentInstance } = useSettings();

  const imageSrc =
    video.thumbnail ?? getThumbnailQuality(video.videoThumbnails, "default");

  const isPlaying = playedVideo?.videoId === video.videoId;

  const handleClick = () => {
    if (isPlaying) {
      // @ts-ignore
      const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
      audio.pause();
    } else {
      handlePlay(video.videoId);
    }
  };

  return (
    <UnstyledButton
      onClick={() => handleClick()}
      style={{ width: "100%", maxWidth: "100%" }}
    >
      <Flex
        align="center"
        gap="md"
        p="sm"
        className={classes.container}
        style={{
          background: isPlaying
            ? hexToRgba(primaryColor?.color as string, "0.6")
            : undefined,
        }}
      >
        <LoadingOverlay visible={loading} />
        <Flex align="center" style={{ flex: 1 }} gap="md">
          {withThumbnail ? (
            <Box className={classes.image}>
              <VideoThumbnail
                src={imageSrc}
                domain={currentInstance?.uri}
                title={video.title}
              />
            </Box>
          ) : null}
          {/* Fixing possibility to have very large text without space */}
          <Box maw="calc(100vw - 140px)" style={{ overflow: "hidden" }}>
            <Text size="sm" lineClamp={1}>
              {isPlaying ? <strong>{video.title}</strong> : video.title}
            </Text>
          </Box>
        </Flex>
        {isPlaying ? null : (
          <ActionIcon
            variant="filled"
            radius="md"
            size="lg"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <IconPlayerPause size={16} />
            ) : (
              <IconPlayerPlay size={16} />
            )}
          </ActionIcon>
        )}
      </Flex>
    </UnstyledButton>
  );
});

interface VideoThumbnailProps {
  src: string;
  title: string;
  domain?: string;
}

const VideoThumbnail: FC<VideoThumbnailProps> = memo(
  ({ src, title, domain = "" }) => {
    const domainUrl = src.startsWith("https") ? "" : domain;

    return (
      <Box className={classes.image}>
        <Image
          src={`${domainUrl}${src}`}
          title={title}
          className={classes.image}
        />
      </Box>
    );
  },
);
