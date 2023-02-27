import { ActionIcon, ActionIconProps, Flex } from "@mantine/core";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
} from "@tabler/icons-react";
import { memo } from "react";
import { usePlayVideo } from "../hooks/usePlayVideo";
import { usePlayerAudio, usePlayerState } from "../providers/Player";
import { usePreviousNextVideos } from "../providers/PreviousNextTrack";

interface PlayerActionsProps {
  showTrackPrevious?: boolean;
  showTrackNext?: boolean;
}

export const PlayerActions: React.FC<PlayerActionsProps> = memo(
  ({ showTrackPrevious = true, showTrackNext = true }) => {
    const iconPlayPauseOnly = !showTrackPrevious && !showTrackNext;
    const iconPlayPauseOnlyProps: ActionIconProps = {
      size: iconPlayPauseOnly ? "lg" : "xl",
      radius: iconPlayPauseOnly ? "md" : "lg",
    };

    return (
      <Flex align="center" gap="lg">
        {showTrackPrevious ? <ButtonPreviousVideo /> : null}
        <ButtonPlayPause
          {...iconPlayPauseOnlyProps}
          iconSize={iconPlayPauseOnly ? 16 : undefined}
        />
        {showTrackNext ? <ButtonNextVideo /> : null}
      </Flex>
    );
  }
);

interface ButtonNextVideoProps extends ActionIconProps {
  iconSize?: number;
}

export const ButtonPlayPause: React.FC<ButtonNextVideoProps> = memo(
  ({ size, radius, iconSize }) => {
    const playerState = usePlayerState();
    const playerAudio = usePlayerAudio();

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
        variant="filled"
        size={size}
        radius={radius}
        title={playerState.paused ? "Play" : "Pause"}
        onClick={handlePlayPause}
      >
        {playerState.paused ? (
          <IconPlayerPlay size={iconSize} />
        ) : (
          <IconPlayerPause size={iconSize} />
        )}
      </ActionIcon>
    );
  }
);

const ButtonPreviousVideo = memo(() => {
  const { handlePlay, loading } = usePlayVideo();
  const { videosIds } = usePreviousNextVideos();

  const handlePlayPreviousVideo = () => {
    handlePlay(videosIds.previousVideoId as string);
  };

  return (
    <ActionIcon
      size="lg"
      radius="md"
      title="Previous video"
      disabled={!videosIds.previousVideoId}
      onClick={handlePlayPreviousVideo}
      loading={loading}
    >
      <IconPlayerTrackPrev size={16} />
    </ActionIcon>
  );
});

const ButtonNextVideo = memo(() => {
  const { handlePlay, loading } = usePlayVideo();
  const { videosIds } = usePreviousNextVideos();

  const handlePlayNextVideo = () => {
    handlePlay(videosIds.nextVideoId as string);
  };

  return (
    <ActionIcon
      size="lg"
      radius="md"
      title="Next video"
      disabled={!videosIds.nextVideoId}
      onClick={handlePlayNextVideo}
      loading={loading}
    >
      <IconPlayerTrackNext size={16} />
    </ActionIcon>
  );
});
