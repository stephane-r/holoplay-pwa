import { Switch } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import { useSettings } from "../providers/Settings";

export const SwitchVideoMode = memo(() => {
  const settings = useSettings();
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.player",
  });

  const handleChange = async () => {
    await database.updateSettings({ videoMode: !settings.videoMode });
  };

  return (
    <Switch
      checked={settings.videoMode}
      label={t("video.mode.label")}
      onChange={handleChange}
    />
  );
});
