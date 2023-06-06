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
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchUrl } from "../hooks/useSearchUrl";
import { PlayerSpace } from "./Player";
import { AppVersion } from "./AppVersion";
import { useTranslation } from "react-i18next";
import { NavbarLink } from "./NavbarLink";
import { ButtonSyncData } from "./ButtonSyncData";

export const NAVIGATION_WIDTH = 88;

const useStyles = createStyles((theme) => ({
  navbar: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (routeName: string, onNavigate?: () => void) => ({
    onClick: () => {
      navigate(routeName);
      onNavigate?.();
    },
    active: location.pathname === routeName,
  });

  return {
    navigate,
    isActive,
  };
};

export const Navigation = memo(() => {
  const { isActive } = useNavigation();
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
            {...isActive("/")}
          />
          <SearchLink />
          <NavbarLink
            icon={IconTrendingUp}
            label={t("navigation.trending")}
            {...isActive("/trending")}
          />
          <NavbarLink
            icon={IconUsers}
            label={t("navigation.most-popular")}
            {...isActive("/most-popular")}
          />
          <NavbarLink
            icon={IconHeart}
            label={t("navigation.favorites")}
            {...isActive("/favorites")}
          />
          <NavbarLink
            icon={IconMusic}
            label={t("navigation.playlists")}
            {...isActive("/playlists")}
          />
          <NavbarLink
            icon={IconHistory}
            label={t("navigation.history")}
            {...isActive("/history")}
          />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <ButtonSyncData />
          <NavbarLink
            icon={IconInfoCircle}
            label={t("navigation.about")}
            {...isActive("/about")}
          />
          <NavbarLink
            icon={IconSettings}
            label={t("navigation.settings")}
            {...isActive("/settings")}
          />
          <AppVersion align="center" />
        </Stack>
        <PlayerSpace />
      </Navbar.Section>
    </Navbar>
  );
});

const SearchLink = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = useSearchUrl();
  const { t } = useTranslation();

  return (
    <NavbarLink
      icon={IconSearch}
      label={t("navigation.search")}
      onClick={() => navigate(url)}
      active={location.pathname === "/search"}
    />
  );
});
