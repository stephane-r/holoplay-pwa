import { ActionIcon, type ActionIconProps, Flex } from "@mantine/core";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
} from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { useToggleAudioPlayPause } from "../hooks/useAudioElement";
import { usePlayVideo } from "../hooks/usePlayVideo";
import { usePlayerState } from "../providers/Player";
import { usePlayerMode } from "../providers/PlayerMode";
import { usePlaybackService } from "../services/playback/usePlaybackService";

interface PlayerActionsProps {
  showTrackPrevious?: boolean;
  showTrackNext?: boolean;
}

export const PlayerActions: FC<PlayerActionsProps> = memo(
  ({ showTrackPrevious = true, showTrackNext = true }) => {
    const playerMode = usePlayerMode();
    const iconPlayPauseOnly = !showTrackPrevious && !showTrackNext;
    const iconPlayPauseOnlyProps: ActionIconProps = {
      size: iconPlayPauseOnly ? "lg" : "xl",
      radius: iconPlayPauseOnly ? "md" : "lg",
    };

    return (
      <Flex
        align="center"
        gap="lg"
        style={{ pointerEvents: playerMode === "video" ? "none" : "all" }}
      >
        {showTrackPrevious ? <ButtonPreviousVideo /> : null}
        <ButtonPlayPause
          {...iconPlayPauseOnlyProps}
          iconSize={iconPlayPauseOnly ? 16 : undefined}
        />
        {showTrackNext ? <ButtonNextVideo /> : null}
      </Flex>
    );
  },
);

interface ButtonNextVideoProps extends ActionIconProps {
  iconSize?: number;
}

const ButtonPlayPause: FC<ButtonNextVideoProps> = memo(
  ({ size, radius, iconSize }) => {
    const playerState = usePlayerState();
    const handlePlayPause = useToggleAudioPlayPause();

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
  },
);

const ButtonPreviousVideo = memo(() => {
  const { previousVideoId } = usePlaybackService();
  const { handlePlay, loading } = usePlayVideo(previousVideoId ?? undefined);
  const { t } = useTranslation();

  const handlePlayPreviousVideo = () => {
    handlePlay(previousVideoId as string);
  };

  return (
    <ActionIcon
      size="lg"
      radius="md"
      title={t("player.previous.video")}
      disabled={!previousVideoId}
      onClick={handlePlayPreviousVideo}
      loading={loading}
    >
      <IconPlayerTrackPrev size={16} />
    </ActionIcon>
  );
});

const ButtonNextVideo = memo(() => {
  const { nextVideoId } = usePlaybackService();
  const { handlePlay, loading } = usePlayVideo(nextVideoId ?? undefined);
  const { t } = useTranslation();

  const handlePlayNextVideo = () => {
    handlePlay(nextVideoId as string);
  };

  return (
    <ActionIcon
      size="lg"
      radius="md"
      title={t("player.next.video")}
      disabled={!nextVideoId}
      onClick={handlePlayNextVideo}
      loading={loading}
    >
      <IconPlayerTrackNext size={16} />
    </ActionIcon>
  );
});
