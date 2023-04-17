import { createStyles, Divider, Space } from "@mantine/core";
import { memo } from "react";
import { Box, NavLink } from "@mantine/core";
import {
  IconHistory,
  IconInfoCircle,
  IconSettings,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigation } from "./Navigation";
import { useTranslation } from "react-i18next";

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
    const { isActive } = useNavigation();
    const { t } = useTranslation();

    return (
      <Box className={classes.container} role="navigation">
        <Space h="xs" />
        <NavLink
          icon={<IconTrendingUp size={20} stroke={1.5} />}
          label={t("navigation.trending")}
          {...isActive("/trending", onClose)}
        />
        <NavLink
          icon={<IconUsers size={20} stroke={1.5} />}
          label={t("navigation.most-popular")}
          {...isActive("/most-popular", onClose)}
        />
        <NavLink
          icon={<IconHistory size={20} stroke={1.5} />}
          label={t("navigation.history")}
          {...isActive("/history", onClose)}
        />
        <Space h="xs" />
        <Divider />
        <Space h="xs" />
        <NavLink
          icon={<IconSettings size={20} stroke={1.5} />}
          label={t("navigation.settings")}
          {...isActive("/settings", onClose)}
        />
        <NavLink
          icon={<IconInfoCircle size={20} stroke={1.5} />}
          label={t("navigation.about")}
          {...isActive("/about", onClose)}
        />
        <Space h="xs" />
      </Box>
    );
  }
);
