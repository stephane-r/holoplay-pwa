import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";

import { DrawerPlayer } from "../components/DrawerPlayer";
import { usePlayerUrl } from "../providers/Player";

export const DrawerPlayerContainer = memo(() => {
  const matches = useMediaQuery("(min-width: 2140px)");
  const playerUrl = usePlayerUrl();

  if (!playerUrl || !matches) {
    return null;
  }

  return <DrawerPlayer />;
});
