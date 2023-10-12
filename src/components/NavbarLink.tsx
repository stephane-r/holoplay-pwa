import {
  NavLink,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";
import { useStableNavigate } from "../providers/Navigate";
import { useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    margin: "auto",

    [`@media (min-width: ${theme.breakpoints.md})`]: {
      marginBottom: theme.spacing.sm,
      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      },
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
  const location = useLocation();

  return {
    onClick: () => {
      navigate(routeName);
      if (callback) {
        callback();
      }
    },
    active: location.pathname === routeName,
  };
};

export const NavbarLink = memo(
  ({ icon: Icon, label, onClick, activePath }: NavbarLinkProps) => {
    const { classes, cx } = useStyles();
    const link = useNavbarLink(activePath as RoutePath);
    const theme = useMantineTheme();
    const matches = useMediaQuery(
      `screen and (max-width: ${theme.breakpoints.sm})`
    );

    return (
      <Tooltip label={label} position="right" disabled={matches}>
        <UnstyledButton
          onClick={onClick ?? link.onClick}
          className={cx(classes.link, { [classes.active]: link.active })}
        >
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
  }
);

interface MobileNavbarLinkProps extends NavbarLinkProps {
  onClose: () => void;
}

export const MobileNavbarLink = memo(
  ({ icon: Icon, label, activePath, onClose }: MobileNavbarLinkProps) => {
    const link = useNavbarLink(activePath as RoutePath, onClose);

    return (
      <NavLink
        icon={<Icon />}
        label={label}
        onClick={link.onClick}
        active={link.active}
      />
    );
  }
);
