import { memo } from "react";
import { useTranslation } from "react-i18next";

import { PageHeader } from "../components/PageHeader";
import { Popular } from "../components/Popular";

export const PopularPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t("page.most-populars.title")} />
      <Popular />
    </div>
  );
});
