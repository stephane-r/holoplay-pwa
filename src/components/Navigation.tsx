import { memo } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconSettings,
  IconInfoCircle,
  IconHeart,
  IconSearch,
  IconMusic,
} from "@tabler/icons-react";
import { Logo } from "./Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchUrl } from "../hooks/useSearchUrl";
import { PlayerSpace } from "./Player";

export const NAVIGATION_WIDTH = 88;

const useStyles = createStyles((theme) => ({
  navbar: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
  link: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    margin: "auto",
    marginBottom: theme.spacing.sm,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },
  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = memo(
  ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
    const { classes, cx } = useStyles();
    return (
      <Tooltip label={label} position="right">
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
  }
);

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cx, classes } = useStyles();

  const isActive = (routeName: string) => ({
    onClick: () => navigate(routeName),
    active: location.pathname === routeName,
  });

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
          <NavbarLink icon={IconHome2} label="Home" {...isActive("/")} />
          <SearchLink />
          <NavbarLink
            icon={IconGauge}
            label="Trending"
            {...isActive("/trending")}
          />
          <NavbarLink
            icon={IconDeviceDesktopAnalytics}
            label="Most popular"
            {...isActive("/most-popular")}
          />
          <NavbarLink
            icon={IconHeart}
            label="Favorites"
            {...isActive("/favorites")}
          />
          <NavbarLink
            icon={IconMusic}
            label="Playlists"
            {...isActive("/playlists")}
          />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconInfoCircle}
            label="About"
            {...isActive("/about")}
          />
          <NavbarLink
            icon={IconSettings}
            label="Settings"
            {...isActive("/settings")}
          />
        </Stack>
        <PlayerSpace />
      </Navbar.Section>
    </Navbar>
  );
};

const SearchLink = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = useSearchUrl();

  return (
    <NavbarLink
      icon={IconSearch}
      label="Search"
      onClick={() => navigate(url)}
      active={location.pathname === "/search"}
    />
  );
});
