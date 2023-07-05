import { LoadingOverlay } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getTrendings } from "../services/trending";
import { CardList } from "./CardList";
import { useTrendingFiltersValues } from "../providers/TrendingFilters";

export const Trending = memo(() => {
  const trendingFiltersValues = useTrendingFiltersValues();
  const query = useQuery(
    `trending-${trendingFiltersValues.type}-${trendingFiltersValues.region}`,
    () => getTrendings(trendingFiltersValues)
  );
  const { t } = useTranslation();

  if (!query.data) {
    return <LoadingOverlay visible />;
  }

  if (query.error) {
    return <div>{t("error")}</div>;
  }

  return <CardList data={query.data} />;
});
