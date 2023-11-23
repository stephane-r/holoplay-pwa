import {
  NavLink,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";

import { useStableNavigate } from "../providers/Navigate";
import classes from "./NavbarLink.module.css";
import { useRouter } from "next/router";

export type RoutePath =
  | "/"
  | "/search"
  | "/favorites"
  | "/trending"
  | "/most-popular"
  | "/playlists"
  | "/history"
  | "/about"
  | "/settings";

interface NavbarLinkProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick?(): void;
  activePath?: RoutePath;
}

const useNavbarLink = (routeName: string, callback?: () => void) => {
  const navigate = useStableNavigate();
  const router = useRouter();

  return {
    onClick: () => {
      navigate(routeName);
      if (callback) {
        callback();
      }
    },
    active: router.pathname === routeName,
  };
};

export const NavbarLink = memo(
  ({ icon: Icon, label, onClick, activePath }: NavbarLinkProps) => {
    const link = useNavbarLink(activePath as RoutePath);
    const theme = useMantineTheme();
    const matches = useMediaQuery(
      `screen and (max-width: ${theme.breakpoints.sm})`,
    );

    return (
      <Tooltip label={label} position="right" disabled={matches}>
        <UnstyledButton
          onClick={onClick ?? link.onClick}
          className={classes.link}
          data-active={link.active}
        >
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
  },
);

interface MobileNavbarLinkProps extends NavbarLinkProps {
  onClose: () => void;
}

export const MobileNavbarLink = memo(
  ({ icon: Icon, label, activePath, onClose }: MobileNavbarLinkProps) => {
    const link = useNavbarLink(activePath as RoutePath, onClose);

    return (
      <NavLink
        leftSection={<Icon />}
        label={label}
        onClick={link.onClick}
        active={link.active}
      />
    );
  },
);
