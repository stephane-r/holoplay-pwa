import { showNotification } from "@mantine/notifications";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useServiceWorker } from "../hooks/useServiceWorker";

export const AppUpdate = memo(() => {
  const { waitingWorker, showReload, reloadPage } = useServiceWorker();
  const { t } = useTranslation();

  useEffect(() => {
    if (showReload && waitingWorker) {
      showNotification({
        title: t("app.update.title"),
        message: t("app.update.message"),
        autoClose: false,
        disallowClose: true,
        onClick: reloadPage,
      });
    }
  }, [reloadPage, showReload, waitingWorker, t]);

  return null;
});
