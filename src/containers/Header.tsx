import { Box } from "@mantine/core";
import { memo } from "react";

import { Header } from "../components/Header";
import { useIsDesktop, useIsMobile } from "../hooks/useIsMobile";

export const HeaderMobileContainer = memo(() => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    // TODO: move inline CSS to CSS module on upgrade to Mantine v7
    <Box style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
      <Header />
    </Box>
  );
});

export const HeaderDesktopContainer = memo(() => {
  const isDesktop = useIsDesktop();

  if (!isDesktop) return null;

  return <Header />;
});
