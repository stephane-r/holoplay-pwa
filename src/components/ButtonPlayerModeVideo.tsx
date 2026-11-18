import { ActionIcon, Menu } from "@mantine/core";
import { IconVideo } from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { useAudioElement } from "../hooks/useAudioElement";
import { usePlayerMode, useSetPlayerMode } from "../providers/PlayerMode";

interface ButtonPlayerModeVideoProps {
  iconSize?: number;
  render: "menu" | "button";
}

export const ButtonPlayerModeVideo: FC<ButtonPlayerModeVideoProps> = memo(
  ({ iconSize, render = "button" }) => {
    const setPlayerMode = useSetPlayerMode();
    const playerMode = usePlayerMode();
    const audioElement = useAudioElement();
    const { t } = useTranslation();

    const handleClick = () => {
      setPlayerMode("video");
      audioElement?.pause();
    };

    if (render === "menu") {
      return (
        <Menu.Item onClick={handleClick} leftSection={<IconVideo />}>
          Video mode
        </Menu.Item>
      );
    }

    return (
      <ActionIcon
        onClick={handleClick}
        color="transparent"
        title={t("video.mode")}
        variant={playerMode === "video" ? "filled" : undefined}
      >
        <IconVideo size={iconSize} />
      </ActionIcon>
    );
  },
);
