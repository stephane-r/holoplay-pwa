import { Divider, Space } from "@mantine/core";
import { Box } from "@mantine/core";
import {
  IconHistory,
  IconInfoCircle,
  IconSettings,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import classes from "./MobileNavigation.module.css";
import { MobileNavbarLink } from "./NavbarLink";

interface MobileNavigationProps {
  onClose: () => void;
}

export const MobileNavigation: FC<MobileNavigationProps> = memo(
  ({ onClose }) => {
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
