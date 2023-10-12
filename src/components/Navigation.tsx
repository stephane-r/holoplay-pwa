import { memo } from "react";
import { Navbar, Center, createStyles, Stack } from "@mantine/core";
import {
  IconHome2,
  IconSettings,
  IconInfoCircle,
  IconHeart,
  IconSearch,
  IconMusic,
  IconHistory,
  IconUsers,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Logo } from "./Logo";
import { useSearchUrl } from "../hooks/useSearchUrl";
import { PlayerSpace } from "./Player";
import { AppVersion } from "./AppVersion";
import { useTranslation } from "react-i18next";
import { NavbarLink } from "./NavbarLink";
import { ButtonSyncData } from "./ButtonSyncData";
import { useTrendingUrl } from "../providers/TrendingFilters";
import { useStableNavigate } from "../providers/Navigate";

export const NAVIGATION_WIDTH = 88;

const useStyles = createStyles((theme) => ({
  navbar: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

export const Navigation = memo(() => {
  const { cx, classes } = useStyles();
  const { t } = useTranslation();

  return (
    <Navbar
      width={{ base: NAVIGATION_WIDTH }}
      p="md"
      zIndex={1}
      className={cx(classes.navbar)}
    >
      <Center>
        <Logo />
      </Center>
      <Navbar.Section grow mt={32}>
        <Stack justify="center" spacing={0}>
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
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
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
      </Navbar.Section>
    </Navbar>
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
