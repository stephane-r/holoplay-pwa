import { Divider, Space, createStyles } from "@mantine/core";
import { Box } from "@mantine/core";
import {
  IconHistory,
  IconInfoCircle,
  IconSettings,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { MobileNavbarLink } from "./NavbarLink";

const useStyles = createStyles((theme) => ({
  container: {
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
    const { t } = useTranslation();

    return (
      <Box className={classes.container} role="navigation">
        <Space h="xs" />
        <MobileNavbarLink
          icon={IconTrendingUp}
          label={t("navigation.trending")}
          onClose={onClose}
          activePath="/trending"
        />
        <MobileNavbarLink
          icon={IconUsers}
          label={t("navigation.most-popular")}
          onClose={onClose}
          activePath="/most-popular"
        />
        <MobileNavbarLink
          icon={IconHistory}
          label={t("navigation.history")}
          onClose={onClose}
          activePath="/history"
        />
        <Space h="xs" />
        <Divider />
        <Space h="xs" />
        <MobileNavbarLink
          icon={IconSettings}
          label={t("navigation.settings")}
          onClose={onClose}
          activePath="/settings"
        />
        <MobileNavbarLink
          icon={IconInfoCircle}
          label={t("navigation.about")}
          onClose={onClose}
          activePath="/about"
        />
        <Space h="xs" />
      </Box>
    );
  },
);
