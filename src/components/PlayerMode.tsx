import { useTimeout } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  usePlayerState,
  usePlayerVideo,
  useSetPlayerState,
} from "../providers/Player";
import { usePlayerMode, useSetPlayerMode } from "../providers/PlayerMode";

export const PlayerMode = memo(() => {
  const playerState = usePlayerState();
  const setPlayerState = useSetPlayerState();
  const setPlayerMode = useSetPlayerMode();
  const { video } = usePlayerVideo();
  const playerMode = usePlayerMode();
  const { t } = useTranslation();

  const { start, clear } = useTimeout(
    () => {
      if (playerState.loading && playerMode === "audio") {
        setPlayerState((previousState) => ({
          ...previousState,
          loading: false,
        }));
        setPlayerMode("video");
        showNotification({
          title: t("error"),
          message: t("player.mode.audio.error.message"),
        });
      }
    },
    5000,
    { autoInvoke: true },
  );

  useEffect(() => {
    if (video) {
      start();
    }

    return () => clear();
  });

  return null;
});
