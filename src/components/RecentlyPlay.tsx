import { Alert, Space, Text, Title } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "next-i18next";

import { useHistory } from "../providers/History";
import { HorizontalGridList } from "./HorizontalGridList";

export const RecentlyPlay = memo(() => {
  const videos = useHistory();
  const data = videos.slice(0, 10);
  const { t } = useTranslation("common");

  return (
    <>
      <Title order={2}>{t("recently.play.title")}</Title>
      <Space h="lg" />
      {!videos.length ? (
        <Alert title={t("recently.play.alert.title")}>
          <Text>{t("recently.play.alert.message")}</Text>
        </Alert>
      ) : (
        <HorizontalGridList data={data} keyPrefix="recently-play" />
      )}
    </>
  );
});
