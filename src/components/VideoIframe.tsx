import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import {
  usePlayerAudio,
  usePlayerState,
  usePlayerVideo,
} from "../providers/Player";
import {
  ActionIcon,
  Box,
  CloseButton,
  Tooltip,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";
import {
  IconChevronDown,
  IconHandMove,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import { useSetPlayerMode } from "../providers/PlayerMode";
import { ModalVideoIframeInformation } from "./ModalVideoIframeInformation";
import { useSetVideoIframeVisibility } from "../providers/VideoIframeVisibility";

const useStyles = createStyles((theme) => ({
  box: {
    "&:hover": {
      [`& .${getStylesRef("button ")}`]: {
        opacity: 1,
        top: rem(8),
      },
    },
  },
  button: {
    ref: getStylesRef("button"),
    position: "absolute",
    top: rem(8),
    color: "black",
    background: "white",
    zIndex: 5,

    "&:hover": {
      color: "black",
      background: "white",
    },

    [`@media (min-width: ${theme.breakpoints.lg})`]: {
      opacity: 0,
      transition: "0.2s",
      top: rem(-22),
    },
  },
  buttonClose: {
    left: rem(8),
  },
  buttonHide: {
    left: rem(44),
  },
  buttonMove: {
    right: rem(8),
  },
  buttonInfo: {
    right: rem(44),
  },
}));

interface VideoIframeProps {
  width: number;
  height: number;
}

export const VideoIframe: React.FC<VideoIframeProps> = memo(
  ({ width, height }) => {
    const { classes } = useStyles();
    const { video } = usePlayerVideo();
    const playerState = usePlayerState();

    if (!video) {
      return null;
    }

    return (
      <Box className={classes.box}>
        <ButtonMove />
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
  }
);

const Video = ({ loop, src }: { loop: boolean; src: string }) => {
  const videoRef = useRef();
  const playerRef = useRef<Player>();
  const playerAudio = usePlayerAudio();

  const onReady = useCallback(
    (player: Player) => {
      player.on("seeked", () => {
        // @ts-ignore
        const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
        audio.currentTime = Math.round(player.currentTime());
      });
    },
    [playerAudio]
  );

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
    [loop, src]
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
    } else {
      const player = playerRef.current as any;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [onReady, options, videoRef]);

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
  const { classes } = useStyles();
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
  const { classes } = useStyles();
  const setVideoIframeVisibility = useSetVideoIframeVisibility();

  return (
    <ActionIcon
      className={`${classes.buttonHide} ${classes.button}`}
      title="Hide"
      onClick={() => setVideoIframeVisibility(false)}
    >
      <IconChevronDown />
    </ActionIcon>
  );
});

const ButtonInformation = memo(() => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();

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

const ButtonMove = memo(() => {
  const { classes } = useStyles();

  return (
    <ActionIcon
      className={`${classes.buttonMove} ${classes.button}`}
      title="Drag"
    >
      <IconHandMove />
    </ActionIcon>
  );
});
