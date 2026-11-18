import { AppShell, Center, Stack } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { getNavigationItemsForSurface } from "../config/navigationItems";
import { useSearchUrl } from "../hooks/useSearchUrl";
import { useStableNavigate } from "../providers/Navigate";
import { useTrendingUrl } from "../providers/TrendingFilters";
import { AppVersion } from "./AppVersion";
import { ButtonSyncData } from "./ButtonSyncData";
import { Logo } from "./Logo";
import { NavbarLink } from "./NavbarLink";
import classes from "./Navigation.module.css";
import { PlayerSpace } from "./Player";

const NAVIGATION_WIDTH = 88;

const DESKTOP_ITEMS = getNavigationItemsForSurface("desktop");

export const Navigation = memo(() => {
  const { t } = useTranslation();
  const navigate = useStableNavigate();
  // Search and Trending navigate to a URL that carries the current
  // query/filters rather than their bare `activePath` — called
  // unconditionally here (not per-item) to keep every item's rendering
  // uniform regardless of which one needs an override.
  const searchUrl = useSearchUrl();
  const trendingUrl = useTrendingUrl();
  const urlOverrides: Partial<Record<string, string>> = {
    search: searchUrl,
    trending: trendingUrl,
  };

  return (
    <AppShell.Navbar
      aria-label="App navigation"
      w={{ base: NAVIGATION_WIDTH }}
      className={classes.navbar}
    >
      <Center>
        <Logo />
      </Center>
      <AppShell.Section grow mt={24}>
        <Stack justify="center" gap="sm">
          {DESKTOP_ITEMS.filter((item) => item.section === "primary").map(
            (item) => (
              <NavbarLink
                key={item.id}
                icon={item.icon}
                label={t(item.translationKey)}
                activePath={item.activePath}
                onClick={
                  urlOverrides[item.id]
                    ? () => navigate(urlOverrides[item.id] as string)
                    : undefined
                }
              />
            ),
          )}
        </Stack>
      </AppShell.Section>
      <AppShell.Section>
        <Stack justify="center" gap="sm">
          <ButtonSyncData />
          {DESKTOP_ITEMS.filter((item) => item.section === "secondary").map(
            (item) => (
              <NavbarLink
                key={item.id}
                icon={item.icon}
                label={t(item.translationKey)}
                activePath={item.activePath}
              />
            ),
          )}
          <AppVersion align="center" />
        </Stack>
        <PlayerSpace />
      </AppShell.Section>
    </AppShell.Navbar>
  );
});
