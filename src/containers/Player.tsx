import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";

import { MobilePlayer } from "../components/MobilePlayer";
import { Player } from "../components/Player";
import { PlayerAudio } from "../components/PlayerAudio";
import { PlayerMode } from "../components/PlayerMode";
import { usePlayerUrl } from "../providers/Player";
import { usePlayerMode } from "../providers/PlayerMode";
import { useSettings } from "../providers/Settings";
import { VideoPlayerContainer } from "./VideoPlayer";

export const PlayerContainer = memo(() => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const playerUrl = usePlayerUrl();
  const playerMode = usePlayerMode();
  const settings = useSettings();

  if (!playerUrl) return null;

  return (
    <>
      <PlayerAudio />
      {settings.videoMode ? <PlayerMode /> : null}
      {settings.videoMode && playerMode === "video" ? (
        <VideoPlayerContainer />
      ) : null}
      {matches ? <MobilePlayer /> : <Player />}
    </>
  );
});
