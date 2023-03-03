import { LoadingOverlay } from "@mantine/core";
import { memo } from "react";
import { usePlayerState } from "../providers/Player";

export const PlayerLoadingOverlay = memo(() => {
  const playerState = usePlayerState();

  return <LoadingOverlay visible={playerState.loading} />;
});
