import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { IconVideo } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { usePlayerAudio } from "../providers/Player";
import { usePlayerMode, useSetPlayerMode } from "../providers/PlayerMode";

interface ButtonPlayerModeVideoProps {
  iconSize?: number;
  render: "menu" | "button";
}

export const ButtonPlayerModeVideo: React.FC<ButtonPlayerModeVideoProps> = memo(
  ({ iconSize, render = "button" }) => {
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

    if (render === "menu") {
      return (
        <Menu.Item onClick={handleClick} icon={<IconVideo />}>
          Video mode
        </Menu.Item>
      );
    }

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
  },
);
