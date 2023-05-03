import { LoadingOverlay } from "@mantine/core";
import { memo } from "react";
import { usePlayerState } from "../providers/Player";
import { usePlayerMode } from "../providers/PlayerMode";

export const PlayerLoadingOverlay = memo(() => {
  const playerState = usePlayerState();
  const playerMode = usePlayerMode();

  if (playerMode === "video") {
    return null;
  }

  return <LoadingOverlay visible={playerState.loading} />;
});
