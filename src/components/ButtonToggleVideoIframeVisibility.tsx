import { ActionIcon, Tooltip } from "@mantine/core";
import { IconVideo } from "@tabler/icons-react";
import { memo } from "react";

import {
  useSetVideoIframeVisibility,
  useVideoIframeVisibility,
} from "../providers/VideoIframeVisibility";
import classes from "./ButtonToggleVideoIframeVisibility.module.css";

export const ButtonToggleVideoIframeVisibility = memo(() => {
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
