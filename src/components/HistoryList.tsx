import { Alert, Text } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { usePaginateData } from "../hooks/usePaginateData";
import { useHistory } from "../providers/History";
import { CardList } from "./CardList";

export const HistoryList = memo(() => {
  const videos = useHistory();
  const { data, ref } = usePaginateData(videos);

  if (!videos.length) {
    return <Empty />;
  }

  return (
    <>
      <CardList data={data} />
      <button ref={ref} style={{ opacity: 0 }} />
    </>
  );
});

const Empty = memo(() => {
  const { t } = useTranslation();

  return (
    <Alert title={t("history.empty.title")}>
      <Text>{t("history.empty.message")}</Text>
    </Alert>
  );
});
