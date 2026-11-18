import { ActionIcon, Box, CloseButton, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight, IconInfoCircle } from "@tabler/icons-react";
import { YouTubeVideo } from "@videojs/react/media/youtube-video";
import { VideoPlayer, VideoSkin } from "@videojs/react/video";
import "@videojs/react/video/skin.css";
import type { YouTubeAdapter } from "@videojs/youtube-video";
import { memo, useCallback, useMemo, useRef } from "react";

import { usePlayVideo } from "../hooks/usePlayVideo";
import {
  usePlayerAudio,
  usePlayerState,
  usePlayerTime,
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
  const playerTime = usePlayerTime();

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
        startTime={playerTime.currentTime as number}
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

  // Captured once per video, not re-derived on every playback tick: `startTime`
  // (sourced from the audio element's continuously-updating currentTime) is
  // only meant to resume position when a video starts, not to be tracked live.
  // Omitting it from the deps intentionally "freezes" whatever value was in
  // scope the moment `video.videoId` last changed — recomputing this object on
  // every tick was causing the YouTube embed to re-derive its source and
  // reload roughly 10x/second during playback.
  const source = useMemo(
    () => ({
      src: video.videoId,
      engine: { youtube: { start: Math.floor(startTime) } },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [video.videoId],
  );

  return (
    <VideoPlayer>
      <VideoSkin className={classes.skin}>
        <YouTubeVideo
          mediaRef={mediaRef}
          autoplay
          loop={loop}
          source={source}
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
