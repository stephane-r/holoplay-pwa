import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

// Single source of truth for the mobile/desktop layout breakpoint. Header,
// Navigation, MobileNavigation and Player each had their own
// `useMediaQuery` call, and Header used a hardcoded 768px while the rest
// used `theme.breakpoints.md` (992px) — between those two widths, Header
// rendered its desktop variant while Navigation/Player still rendered
// their mobile one.
export const useIsMobile = () => {
  const theme = useMantineTheme();
  return useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
};

export const useIsDesktop = () => {
  const theme = useMantineTheme();
  return useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
};
