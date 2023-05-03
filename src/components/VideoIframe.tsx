import { MutableRefObject, memo, useRef } from "react";
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
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconHandMove,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useSetPlayerMode } from "../providers/PlayerMode";
import { useDisclosure } from "@mantine/hooks";
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
    const iframe = useRef() as MutableRefObject<HTMLIFrameElement>;
    const playerState = usePlayerState();
    const theme = useMantineTheme();

    if (!video) {
      return null;
    }

    return (
      <Box className={classes.box}>
        <ButtonMove />
        <ButtonHide />
        <ButtonInformation />
        <ButtonClose />
        <iframe
          ref={iframe}
          title="Invidious Video Player"
          width={width}
          height={height}
          src={`https://www.youtube-nocookie.com/embed/${
            video.videoId
          }?rel=0;&autoplay=1&start=${Math.floor(
            playerState.currentTime as number
          )}`}
          style={{ border: "none", borderRadius: theme.radius.md }}
        ></iframe>
      </Box>
    );
  }
);

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
