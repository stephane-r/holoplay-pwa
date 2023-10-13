import { Box, createStyles } from "@mantine/core";
import hexToRgba from "hex-to-rgba";
import { memo } from "react";

import { usePlayerVideo } from "../providers/Player";

const useStyles = createStyles((theme) => ({
  background: {
    position: "absolute",
    zIndex: -1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backdropFilter: "blur(8px)",
  },
}));

export const PlayerBackground = memo(() => {
  const { primaryColor } = usePlayerVideo();
  const { classes } = useStyles();

  return (
    <Box
      className={classes.background}
      style={{
        backgroundColor: hexToRgba(primaryColor?.color as string, "0.8"),
      }}
    />
  );
});
