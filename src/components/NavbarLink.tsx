import { Tooltip, UnstyledButton, createStyles } from "@mantine/core";
import { memo } from "react";

const useStyles = createStyles((theme) => ({
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

export const NavbarLink = memo(
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
