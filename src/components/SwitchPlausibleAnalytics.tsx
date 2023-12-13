import { Alert, Switch } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { db } from "../database";
import { useSetSettings, useSettings } from "../providers/Settings";
import type { Settings } from "../types/interfaces/Settings";

export const SwitchPlausibleAnalytics = memo(() => {
  const settings = useSettings();
  const setSettings = useSetSettings();
  const { t } = useTranslation();

  const handleChange = () => {
    const analytics = !settings.analytics;
    db.update("settings", { ID: 1 }, (data: Settings) => ({
      analytics,
    }));
    db.commit();
    setSettings((previousState) => ({
      ...previousState,
      analytics,
    }));
  };

  return (
    <>
      <Alert mb="lg">
        {t("settings.general.analytics.info")}{" "}
        <a
          href="https://plausible.holoplay.io/holoplay.io"
          target="_blank"
          rel="noreferrer"
        >
          {t("settings.general.analytics.link")}
        </a>
      </Alert>
      <Switch
        size="md"
        checked={settings.analytics}
        label={t("settings.general.analytics.label")}
        onChange={handleChange}
      />
    </>
  );
});
