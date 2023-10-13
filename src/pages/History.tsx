import { memo } from "react";
import { useTranslation } from "react-i18next";

import { HistoryList } from "../components/HistoryList";
import { PageHeader } from "../components/PageHeader";

export const HistoryPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t("page.history.title")} />
      <HistoryList />
    </div>
  );
});
