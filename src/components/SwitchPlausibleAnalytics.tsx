import { Alert, Switch } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import { useSettings } from "../providers/Settings";

export const SwitchPlausibleAnalytics = memo(() => {
  const settings = useSettings();
  const { t } = useTranslation();

  const handleChange = async () => {
    await database.updateSettings({ analytics: !settings.analytics });
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
