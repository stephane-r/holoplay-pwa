import { Switch } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { db } from "../database";
import { useSetSettings, useSettings } from "../providers/Settings";
import type { Settings } from "../types/interfaces/Settings";

export const SwitchVideoMode = memo(() => {
  const settings = useSettings();
  const setSettings = useSetSettings();
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.player",
  });

  const handleChange = () => {
    const videoMode = !settings.videoMode;
    db.update("settings", { ID: 1 }, (data: Settings) => ({
      videoMode,
    }));
    db.commit();
    setSettings((previousState) => ({
      ...previousState,
      videoMode,
    }));
  };

  return (
    <Switch
      checked={settings.videoMode}
      label={t("video.mode.label")}
      onChange={handleChange}
    />
  );
});
