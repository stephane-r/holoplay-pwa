import {
  ActionIcon,
  ColorScheme as ColorSchemeTypes,
  Group,
  Switch,
  useMantineTheme,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { memo } from "react";

export const ColorScheme = memo(() => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorSchemeTypes>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const dark = colorScheme === "dark";

  const toggleColorScheme = (value?: ColorSchemeTypes) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ActionIcon
      variant="filled"
      radius="md"
      style={{ height: 36, width: 36 }}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
});

export const SwitchColorScheme = memo(() => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorSchemeTypes>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const { t } = useTranslation();

  const toggleColorScheme = (value?: ColorSchemeTypes) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const theme = useMantineTheme();

  return (
    <Group onChange={() => toggleColorScheme()}>
      <Switch
        size="md"
        color={theme.colorScheme === "dark" ? "gray" : "dark"}
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
