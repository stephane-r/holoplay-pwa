import { ActionIcon, Tooltip, createStyles } from "@mantine/core";
import { IconChevronLeft, IconVideo } from "@tabler/icons-react";
import { memo } from "react";
import {
  useSetVideoIframeVisibility,
  useVideoIframeVisibility,
} from "../providers/VideoIframeVisibility";

const useStyles = createStyles((theme) => ({
  button: {
    position: "absolute",
    right: 0,
    top: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: 5,
    transition: "0.2s",

    [`@media (min-width: 2140px)`]: {
      bottom: 0,
      right: "calc(50% - 20px)",
      top: "auto",
      borderTopRightRadius: theme.radius.md,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
}));

export const ButtonToggleVideoIframeVisibility = memo(() => {
  const { classes } = useStyles();
  const visible = useVideoIframeVisibility();
  const setVisibility = useSetVideoIframeVisibility();

  return (
    <Tooltip label="Show video">
      <ActionIcon
        className={classes.button}
        style={{
          pointerEvents: Number(!visible) ? "all" : undefined,
          opacity: Number(!visible),
        }}
        size="xl"
        radius="md"
        onClick={() => setVisibility(true)}
      >
        <IconVideo />
      </ActionIcon>
    </Tooltip>
  );
});
