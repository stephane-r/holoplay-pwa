import { memo } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { Trending } from "../components/Trending";

export const TrendingPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t("page.trending.title")} />
      <Trending />
    </div>
  );
});
