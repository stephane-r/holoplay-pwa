import { Box, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Suspense, lazy, memo } from "react";

import { MobilePlayer } from "../components/MobilePlayer";
import { Player } from "../components/Player";
import { PlayerAudio } from "../components/PlayerAudio";
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
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
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
      {matches ? <MobilePlayer /> : <Player />}
    </Box>
  );
});
