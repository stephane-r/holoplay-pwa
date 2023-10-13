import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";

import { Navigation } from "../components/Navigation";

export const NavigationContainer = memo(() => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  if (!matches) {
    return null;
  }

  return <Navigation />;
});
