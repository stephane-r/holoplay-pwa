import { memo } from "react";

import { Navigation } from "../components/Navigation";
import { useIsDesktop } from "../hooks/useIsMobile";

export const NavigationContainer = memo(() => {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return null;
  }

  return <Navigation />;
});
