import {
  ActionIcon,
  Group,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useAppColorScheme } from "../hooks/useAppColorScheme";

export const ColorScheme = memo(() => {
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useAppColorScheme();

  return (
    <ActionIcon
      variant="filled"
      radius="md"
      color="gray"
      style={{ height: 36, width: 36 }}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      aria-label="Toggle color scheme"
    >
      {colorScheme === "dark" ? (
        <IconSun size={18} />
      ) : (
        <IconMoonStars size={18} />
      )}
    </ActionIcon>
  );
});

export const SwitchColorScheme = memo(() => {
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useAppColorScheme();
  const { t } = useTranslation();

  const theme = useMantineTheme();

  return (
    <Group onChange={() => toggleColorScheme()}>
      <Switch
        size="md"
        color={colorScheme === "dark" ? "gray" : "dark"}
        label={t("settings.general.darkmode")}
        onLabel={
          <IconMoonStars
            size="1rem"
            stroke={2.5}
            color={theme.colors.blue[6]}
          />
        }
        offLabel={
          <IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />
        }
      />
    </Group>
  );
});
