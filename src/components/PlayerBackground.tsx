import { Box } from "@mantine/core";
import hexToRgba from "hex-to-rgba";
import { memo } from "react";

import { usePlayerVideo } from "../providers/Player";
import classes from "./PlayerBackground.module.css";

export const PlayerBackground = memo(() => {
  const { primaryColor } = usePlayerVideo();

  return (
    <Box
      className={classes.background}
      style={{
        backgroundColor: hexToRgba(primaryColor?.color as string, "0.8"),
      }}
    />
  );
});
