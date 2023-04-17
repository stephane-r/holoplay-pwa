import {
  Box,
  Drawer,
  Flex,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { memo } from "react";
import { NavbarLink } from "../components/NavbarLink";
import {
  IconDotsVertical,
  IconHeart,
  IconHome2,
  IconMusic,
  IconSearch,
} from "@tabler/icons-react";
import { useNavigation } from "../components/Navigation";
import { MobileNavigation } from "../components/MobileNavigation";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  container: {
    position: "sticky",
    bottom: 0,
    background: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    backdropFilter: "blur(8px)",
    zIndex: 4,
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
  },
}));

export const MobileNavigationContainer = memo(() => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const { isActive } = useNavigation();
  const { t } = useTranslation();

  if (!matches) return null;

  return (
    <Box className={classes.container}>
      <Flex h={60}>
        <NavbarLink
          label={t("navigation.dashboard")}
          icon={IconHome2}
          {...isActive("/")}
        />
        <NavbarLink
          label={t("navigation.search")}
          icon={IconSearch}
          {...isActive("/search")}
        />
        <NavbarLink
          label={t("navigation.favorites")}
          icon={IconHeart}
          {...isActive("/favorites")}
        />
        <NavbarLink
          label={t("navigation.playlists")}
          icon={IconMusic}
          {...isActive("/playlists")}
        />
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
