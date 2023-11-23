import { memo } from "react";
import { useTranslation } from "next-i18next";

import { HistoryList } from "../components/HistoryList";
import { PageHeader } from "../components/PageHeader";

export const HistoryPage = memo(() => {
  const { t } = useTranslation("common");

  return (
    <div>
      <PageHeader title={t("page.history.title")} />
      <HistoryList />
    </div>
  );
});
