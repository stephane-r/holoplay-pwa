import { Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";

import { Header } from "../components/Header";

export const HeaderMobileContainer = memo(() => {
  const matches = useMediaQuery("(max-width: 768px)");

  if (!matches) return null;

  return (
    // TODO: move inline CSS to CSS module on upgrade to Mantine v7
    <Box style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
      <Header />
    </Box>
  );
});

export const HeaderDesktopContainer = memo(() => {
  const matches = useMediaQuery("(min-width: 768px)");

  if (!matches) return null;

  return <Header />;
});
