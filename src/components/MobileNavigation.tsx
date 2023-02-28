import { createStyles, Divider, Space } from "@mantine/core";
import { memo } from "react";
import { Box, NavLink } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { navigationItems, navigationItemsSecondary } from "./Navigation";

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    zIndex: 2,
    left: 0,
    top: "100%",
    right: 0,
    height: "calc(100vh - 50px)",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

interface MobileNavigationProps {
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = memo(
  ({ onClose }) => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (routeName: string) => {
      navigate(routeName);
      onClose();
    };

    const isActive = (routeName: string) => ({
      onClick: () => handleNavigate(routeName),
      active: location.pathname === routeName,
    });

    return (
      <Box className={classes.container} role="navigation">
        <Space h="sm" />
        {navigationItems.map((navItem) => (
          <NavLink
            icon={<navItem.icon size={16} stroke={1.5} />}
            label={navItem.label}
            {...isActive(navItem.route)}
          />
        ))}
        <Space h="sm" />
        <Divider />
        <Space h="sm" />
        {navigationItemsSecondary.map((navItem) => (
          <NavLink
            icon={<navItem.icon size={16} stroke={1.5} />}
            label={navItem.label}
            {...isActive(navItem.route)}
          />
        ))}
      </Box>
    );
  }
);
