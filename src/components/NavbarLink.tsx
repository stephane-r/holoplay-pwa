import {
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";

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

interface NavbarLinkProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick?(): void;
}

export const NavbarLink = memo(
  ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
    const { classes, cx } = useStyles();
    const theme = useMantineTheme();
    const matches = useMediaQuery(
      `screen and (max-width: ${theme.breakpoints.sm})`
    );

    return (
      <Tooltip label={label} position="right" disabled={matches}>
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
