import { LoadingOverlay } from "@mantine/core";
import { memo } from "react";

import { usePlayerState } from "../providers/Player";
import { usePlayerMode } from "../providers/PlayerMode";

export const PlayerLoadingOverlay = memo(() => {
  const playerState = usePlayerState();
  const playerMode = usePlayerMode();

  if (playerMode === "video" || !playerState.loading) {
    return null;
  }

  return (
    <div aria-label="Player loading" role="status">
      <LoadingOverlay aria-label="Player loading" visible />
    </div>
  );
});
