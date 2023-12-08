import { AppShell, Center, Stack } from "@mantine/core";
import {
  IconHeart,
  IconHistory,
  IconHome2,
  IconInfoCircle,
  IconMusic,
  IconSearch,
  IconSettings,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

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

export const Navigation = memo(() => {
  const { t } = useTranslation();

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
          <NavbarLink
            icon={IconHome2}
            label={t("navigation.dashboard")}
            activePath="/"
          />
          <SearchLink />
          <TrendingLink />
          <NavbarLink
            icon={IconUsers}
            label={t("navigation.most-popular")}
            activePath="/most-popular"
          />
          <NavbarLink
            icon={IconHeart}
            label={t("navigation.favorites")}
            activePath="/favorites"
          />
          <NavbarLink
            icon={IconMusic}
            label={t("navigation.playlists")}
            activePath="/playlists"
          />
          <NavbarLink
            icon={IconHistory}
            label={t("navigation.history")}
            activePath="/history"
          />
        </Stack>
      </AppShell.Section>
      <AppShell.Section>
        <Stack justify="center" gap="sm">
          <ButtonSyncData />
          <NavbarLink
            icon={IconInfoCircle}
            label={t("navigation.about")}
            activePath="/about"
          />
          <NavbarLink
            icon={IconSettings}
            label={t("navigation.settings")}
            activePath="/settings"
          />
          <AppVersion align="center" />
        </Stack>
        <PlayerSpace />
      </AppShell.Section>
    </AppShell.Navbar>
  );
});

const SearchLink = memo(() => {
  const navigate = useStableNavigate();
  const url = useSearchUrl();
  const { t } = useTranslation();

  return (
    <NavbarLink
      icon={IconSearch}
      label={t("navigation.search")}
      onClick={() => navigate(url)}
      activePath="/search"
    />
  );
});

const TrendingLink = memo(() => {
  const navigate = useStableNavigate();
  const url = useTrendingUrl();
  const { t } = useTranslation();

  return (
    <NavbarLink
      icon={IconTrendingUp}
      label={t("navigation.trending")}
      onClick={() => navigate(url)}
      activePath="/trending"
    />
  );
});
