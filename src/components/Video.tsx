import {
  ActionIcon,
  Box,
  createStyles,
  Flex,
  LoadingOverlay,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import hexToRgba from "hex-to-rgba";
import { memo } from "react";
import { usePlayVideo } from "../hooks/usePlayVideo";
import { usePlayerAudio, usePlayerVideo } from "../providers/Player";
import { Video as VideoType, VideoThumbnail } from "../types/interfaces/Video";

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    borderRadius: theme.radius.md,
    transition: "0.2s",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },
  image: {
    maxWidth: 100,
    borderRadius: theme.radius.md,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
}));

interface VideoProps {
  video: VideoType;
  withThumbnail?: boolean;
}

export const Video: React.FC<VideoProps> = memo(
  ({ video, withThumbnail = true }) => {
    const { classes } = useStyles();
    const { video: playedVideo, primaryColor } = usePlayerVideo();
    const { handlePlay, loading } = usePlayVideo();
    const playerAudio = usePlayerAudio();

    const image = video.videoThumbnails.find(
      (thumbnail) => thumbnail.quality === "default"
    ) as VideoThumbnail;

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
      <UnstyledButton onClick={() => handleClick()} style={{ width: "100%" }}>
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
                <img
                  src={image.url}
                  alt={video.title}
                  className={classes.image}
                />
              </Box>
            ) : null}
            <Text size="sm" lineClamp={1} weight={isPlaying ? 600 : undefined}>
              {video.title}
            </Text>
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
  }
);
