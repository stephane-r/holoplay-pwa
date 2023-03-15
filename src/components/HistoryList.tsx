import { Alert, Text } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "../providers/History";
import { CardList } from "./CardList";

export const HistoryList = memo(() => {
  const videos = useHistory();
  const { t } = useTranslation();

  if (!videos.length) {
    return (
      <Alert title={t("history.empty.title")}>
        <Text>{t("history.empty.message")}</Text>
      </Alert>
    );
  }

  return <CardList data={videos} />;
});
