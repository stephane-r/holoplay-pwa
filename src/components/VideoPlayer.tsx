import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type MotionStyle, motion } from "framer-motion";
import { memo, useMemo, useRef } from "react";

import { useVideoIframeVisibility } from "../providers/VideoIframeVisibility";
import { ButtonToggleVideoIframeVisibility } from "./ButtonToggleVideoIframeVisibility";
import { VideoIframe } from "./VideoIframe";

export const VideoPlayer = memo(() => {
  const theme = useMantineTheme();
  const constraintsRef = useRef(null);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const visible = useVideoIframeVisibility();

  const iframeSize = useMemo(
    () => ({
      width: isMobile ? 300 : 400,
      height: isMobile ? 150 : 200,
    }),
    [isMobile],
  );

  const containerStyles: MotionStyle = useMemo(
    () => ({
      position: "absolute",
      bottom: 0,
      right: 0,
      transition: "0.2s",
      maxWidth: "100vw",
      pointerEvents: "none",
      overflow: "hidden",
      top: isMobile ? "20vh" : "60vh",
      left: 0,
    }),
    [isMobile],
  );

  const commonStyles: MotionStyle = useMemo(
    () => ({
      zIndex: 4,
      pointerEvents: "all",
      position: "absolute",
      backgroundColor: theme.colors.blue[7],
      borderRadius: theme.radius.md,
      transition: "0.2s",
      opacity: 1,
      visibility: "visible",
      ...iframeSize,
    }),
    [theme, iframeSize],
  );

  const visibleStyles: MotionStyle = {
    ...commonStyles,
  };

  const hiddenStyles: MotionStyle = {
    ...commonStyles,
    opacity: 0,
    visibility: "hidden",
  };

  const iframeContainerStyles = visible ? visibleStyles : hiddenStyles;

  return (
    <motion.div ref={constraintsRef} style={containerStyles}>
      <ButtonToggleVideoIframeVisibility />
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        style={iframeContainerStyles}
      >
        <VideoIframe {...iframeSize} />
      </motion.div>
    </motion.div>
  );
});
