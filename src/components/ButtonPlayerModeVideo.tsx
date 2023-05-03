import { ActionIcon, Tooltip } from "@mantine/core";
import { IconVideo } from "@tabler/icons-react";
import { memo } from "react";
import { usePlayerMode, useSetPlayerMode } from "../providers/PlayerMode";
import { usePlayerAudio } from "../providers/Player";
import { useTranslation } from "react-i18next";

interface ButtonPlayerModeVideoProps {
  iconSize?: number;
}

export const ButtonPlayerModeVideo: React.FC<ButtonPlayerModeVideoProps> = memo(
  ({ iconSize }) => {
    const setPlayerMode = useSetPlayerMode();
    const playerMode = usePlayerMode();
    const playerAudio = usePlayerAudio();
    const { t } = useTranslation();

    const handleClick = () => {
      setPlayerMode("video");

      // @ts-ignore
      const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
      audio.pause();
    };

    return (
      <Tooltip label={t("video.mode")}>
        <ActionIcon
          onClick={handleClick}
          variant={playerMode === "video" ? "filled" : undefined}
        >
          <IconVideo size={iconSize} />
        </ActionIcon>
      </Tooltip>
    );
  }
);
