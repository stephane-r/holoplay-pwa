import { Box, Divider, Space } from "@mantine/core";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { getNavigationItemsForSurface } from "../config/navigationItems";
import { useTrendingUrl } from "../providers/TrendingFilters";
import classes from "./MobileNavigation.module.css";
import { MobileNavbarLink } from "./NavbarLink";

interface MobileNavigationProps {
  onClose: () => void;
}

const DRAWER_ITEMS = getNavigationItemsForSurface("mobileDrawer");

export const MobileNavigation: FC<MobileNavigationProps> = memo(
  ({ onClose }) => {
    const { t } = useTranslation();
    // Same reasoning as the desktop Navigation: Trending should preserve
    // the current filters instead of resetting them.
    const trendingUrl = useTrendingUrl();
    const urlOverrides: Partial<Record<string, string>> = {
      trending: trendingUrl,
    };

    return (
      <Box className={classes.container} role="navigation">
        <Space h="xs" />
        {DRAWER_ITEMS.filter((item) => item.section === "primary").map(
          (item) => (
            <MobileNavbarLink
              key={item.id}
              icon={item.icon}
              label={t(item.translationKey)}
              onClose={onClose}
              activePath={item.activePath}
              url={urlOverrides[item.id]}
            />
          ),
        )}
        <Space h="xs" />
        <Divider />
        <Space h="xs" />
        {DRAWER_ITEMS.filter((item) => item.section === "secondary").map(
          (item) => (
            <MobileNavbarLink
              key={item.id}
              icon={item.icon}
              label={t(item.translationKey)}
              onClose={onClose}
              activePath={item.activePath}
            />
          ),
        )}
        <Space h="xs" />
      </Box>
    );
  },
);
