import { Box, Drawer, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { getNavigationItemsForSurface } from "../config/navigationItems";
import { useIsMobile } from "../hooks/useIsMobile";
import { useSearchUrl } from "../hooks/useSearchUrl";
import { MobileNavigation } from "../components/MobileNavigation";
import { NavbarLink } from "../components/NavbarLink";
import { useStableNavigate } from "../providers/Navigate";
import classes from "./MobileNavigation.module.css";

const MOBILE_BAR_ITEMS = getNavigationItemsForSurface("mobileBar");

export const MobileNavigationContainer = memo(() => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const navigate = useStableNavigate();
  // Same reasoning as the desktop Navigation: Search should preserve the
  // current query/filters instead of resetting to a blank search form.
  const searchUrl = useSearchUrl();
  const urlOverrides: Partial<Record<string, string>> = { search: searchUrl };

  if (!isMobile) return null;

  return (
    <Box className={classes.container}>
      <Flex h={60}>
        {MOBILE_BAR_ITEMS.map((item) => (
          <NavbarLink
            key={item.id}
            label={t(item.translationKey)}
            icon={item.icon}
            activePath={item.activePath}
            onClick={
              urlOverrides[item.id]
                ? () => navigate(urlOverrides[item.id] as string)
                : undefined
            }
          />
        ))}
        <NavigationDrawer />
      </Flex>
    </Box>
  );
});

const NavigationDrawer = memo(() => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        withCloseButton={false}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        size={230}
        padding={0}
      >
        <MobileNavigation onClose={close} />
      </Drawer>
      <NavbarLink label="More" icon={IconDotsVertical} onClick={open} />
    </>
  );
});
