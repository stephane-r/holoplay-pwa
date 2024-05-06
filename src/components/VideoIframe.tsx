import { ActionIcon, Box, CloseButton, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight, IconInfoCircle } from "@tabler/icons-react";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import "videojs-youtube";

import { usePlayVideo } from "../hooks/usePlayVideo";
import {
  usePlayerAudio,
  usePlayerState,
  usePlayerVideo,
} from "../providers/Player";
import { useSetPlayerMode } from "../providers/PlayerMode";
import { usePreviousNextVideos } from "../providers/PreviousNextTrack";
import { useSetVideoIframeVisibility } from "../providers/VideoIframeVisibility";
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
        src={`https://www.youtube-nocookie.com/embed/${
          video.videoId
        }&start=${Math.floor(playerState.currentTime as number)}`}
      />
    </Box>
  );
});

const Video = ({ loop, src }: { loop: boolean; src: string }) => {
  const videoRef = useRef();
  const playerRef = useRef<Player>();
  const playerAudio = usePlayerAudio();
  const { videosIds } = usePreviousNextVideos();
  const { handlePlay: play } = usePlayVideo();
  const setPlayerMode = useSetPlayerMode();

  const onReady = useCallback(
    (player: Player) => {
      player.on("seeked", () => {
        // @ts-ignore
        const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
        audio.currentTime = Math.round(player.currentTime() as number);
      });
    },
    [playerAudio],
  );

  const onEnded = useCallback(() => {
    // @ts-ignore
    const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
    if (!audio.loop && videosIds.nextVideoId) {
      setPlayerMode("audio");
      play(videosIds.nextVideoId);
    }
  }, [play, playerAudio, setPlayerMode, videosIds.nextVideoId]);

  const options = useMemo(
    () => ({
      techOrder: ["youtube"],
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      liveui: true,
      loop,
      sources: [
        {
          src,
          type: "video/youtube",
        },
      ],
    }),
    [loop, src],
  );

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");

      if (!videoRef.current) {
        return;
      }

      (videoRef.current as HTMLElement).appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady(player);
      }));

      player.on("ended", () => {
        onEnded();
      });
    } else {
      const player = playerRef.current as any;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [onEnded, onReady, options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = undefined;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      {/* @ts-ignore */}
      <div ref={videoRef} />
    </div>
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
