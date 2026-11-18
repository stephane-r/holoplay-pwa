import { ActionIcon, Box, CloseButton, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight, IconInfoCircle } from "@tabler/icons-react";
import { YouTubeVideo } from "@videojs/react/media/youtube-video";
import { VideoPlayer, VideoSkin } from "@videojs/react/video";
import "@videojs/react/video/skin.css";
import type { YouTubeAdapter } from "@videojs/youtube-video";
import { memo, useCallback, useRef } from "react";

import { usePlayVideo } from "../hooks/usePlayVideo";
import {
  usePlayerAudio,
  usePlayerState,
  usePlayerVideo,
} from "../providers/Player";
import { useSetPlayerMode } from "../providers/PlayerMode";
import { useSetVideoIframeVisibility } from "../providers/VideoIframeVisibility";
import { usePlaybackService } from "../services/playback/usePlaybackService";
import { ModalVideoIframeInformation } from "./ModalVideoIframeInformation";
import classes from "./VideoIframe.module.css";

export const VideoIframe = memo(() => {
  const { video } = usePlayerVideo();
  const playerState = usePlayerState();

  if (!video) {
    return null;
  }

  return (
    <Box className={classes.box}>
      <ButtonHide />
      <ButtonInformation />
      <ButtonClose />
      <Video
        loop={playerState.repeat}
        video={video}
        startTime={playerState.currentTime as number}
      />
    </Box>
  );
});

type PlayingVideo = NonNullable<ReturnType<typeof usePlayerVideo>["video"]>;

const Video = ({
  loop,
  video,
  startTime,
}: {
  loop: boolean;
  video: PlayingVideo;
  startTime: number;
}) => {
  const playerAudio = usePlayerAudio();
  const { nextVideoId } = usePlaybackService();
  const { handlePlay: play } = usePlayVideo();
  const setPlayerMode = useSetPlayerMode();
  const mediaRef = useRef<YouTubeAdapter>(null);

  const onSeeked = useCallback(() => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    if (audio && mediaRef.current) {
      audio.currentTime = Math.round(mediaRef.current.currentTime);
    }
  }, [playerAudio]);

  const onEnded = useCallback(() => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    if (!audio.loop && nextVideoId) {
      setPlayerMode("audio");
      play(nextVideoId);
    }
  }, [play, playerAudio, setPlayerMode, nextVideoId]);

  return (
    <VideoPlayer>
      <VideoSkin className={classes.skin}>
        <YouTubeVideo
          mediaRef={mediaRef}
          autoplay
          loop={loop}
          source={{
            src: video.videoId,
            engine: { youtube: { start: Math.floor(startTime) } },
          }}
          onSeeked={onSeeked}
          onEnded={onEnded}
        />
      </VideoSkin>
    </VideoPlayer>
  );
};

const ButtonClose = memo(() => {
  const setPlayerMode = useSetPlayerMode();
  const playerAudio = usePlayerAudio();

  const handleClick = () => {
    setPlayerMode("audio");

    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    audio.play();
  };

  return (
    <CloseButton
      size="md"
      className={`${classes.buttonClose} ${classes.button}`}
      onClick={handleClick}
      title="Close"
    />
  );
});

const ButtonHide = memo(() => {
  const setVideoIframeVisibility = useSetVideoIframeVisibility();

  return (
    <ActionIcon
      className={`${classes.buttonHide} ${classes.button}`}
      title="Hide"
      onClick={() => setVideoIframeVisibility(false)}
    >
      <IconChevronRight />
    </ActionIcon>
  );
});

const ButtonInformation = memo(() => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tooltip label="Information" position="left">
        <ActionIcon
          className={`${classes.buttonInfo} ${classes.button}`}
          onClick={open}
        >
          <IconInfoCircle />
        </ActionIcon>
      </Tooltip>
      <ModalVideoIframeInformation opened={opened} onClose={close} />
    </>
  );
});
