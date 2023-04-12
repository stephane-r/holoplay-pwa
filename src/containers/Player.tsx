import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";
import { Player } from "../components/Player";
import { MobilePlayer } from "../components/MobilePlayer";
import { PlayerAudio } from "../components/PlayerAudio";
import { usePlayerUrl } from "../providers/Player";

export const PlayerContainer = memo(() => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const playerUrl = usePlayerUrl();

  if (!playerUrl) return null;

  return (
    <>
      <PlayerAudio />
      {matches ? <MobilePlayer /> : <Player />}
    </>
  );
});
