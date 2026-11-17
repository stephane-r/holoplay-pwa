import { notifications } from "@mantine/notifications";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useServiceWorker } from "../hooks/useServiceWorker";

export const AppUpdate = memo(() => {
  const { showReload, reloadPage } = useServiceWorker();
  const { t } = useTranslation();

  useEffect(() => {
    if (showReload) {
      notifications.show({
        title: t("app.update.title"),
        message: t("app.update.message"),
        autoClose: false,
        onClick: reloadPage,
      });
    }
  }, [reloadPage, showReload, t]);

  return null;
});
