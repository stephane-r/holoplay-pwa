import { Box } from "@mantine/core";
import { Suspense, lazy, memo } from "react";

import { MobilePlayer } from "../components/MobilePlayer";
import { Player } from "../components/Player";
import { PlayerAudio } from "../components/PlayerAudio";
import { useIsMobile } from "../hooks/useIsMobile";
import { usePlayerUrl } from "../providers/Player";
import { usePlayerMode } from "../providers/PlayerMode";
import { useSettings } from "../providers/Settings";

// The @videojs player stack is only needed for users who enable video
// mode — audio-only listening (the default) never touches it, so it
// shouldn't be in everyone's initial bundle.
const VideoPlayerContainer = lazy(() =>
  import("./VideoPlayer").then((m) => ({ default: m.VideoPlayerContainer })),
);

export const PlayerContainer = memo(() => {
  const isMobile = useIsMobile();
  const playerUrl = usePlayerUrl();
  const playerMode = usePlayerMode();
  const settings = useSettings();

  if (!playerUrl) return null;

  return (
    <Box style={{ zIndex: 4 }}>
      <PlayerAudio />
      {settings.videoMode && playerMode === "video" ? (
        <Suspense fallback={null}>
          <VideoPlayerContainer />
        </Suspense>
      ) : null}
      {isMobile ? <MobilePlayer /> : <Player />}
    </Box>
  );
});
